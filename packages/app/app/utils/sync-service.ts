import type { Thread } from "../composables/useThreadsStore";
import type { PushEvent } from "@nuxflare-chat/api/types";

const THREADS_CHANNEL_NAME = "threads-channel";
const threadsChannel = new BroadcastChannel(THREADS_CHANNEL_NAME);
let _clock = 0;
let messageQueue: any[] = [];
let isQueuePaused = false;
const QUEUE_PROCESSING_INTERVAL = 10;

let syncReadyResolvers: Array<() => void> = [];
let isSyncReady = false;
function waitForSync(): Promise<void> {
  if (isSyncReady) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    syncReadyResolvers.push(resolve);
  });
}

const sanitizeFtsTerm = (term: string): string => {
  const escapedTerm = term.replace(/"/g, '""');
  return `"${escapedTerm}"`;
};

function mapRowToThread(rowArray: any[], columnNames: string[]): Thread {
  const rowObj = columnNames.reduce((acc, name, idx) => {
    acc[name] = rowArray[idx];
    return acc;
  }, {} as any);

  return {
    id: rowObj.id,
    title: rowObj.title,
    created_at: Number(rowObj.created_at),
    updated_at: Number(rowObj.updated_at),
    last_message_at: Number(rowObj.last_message_at),
    parent_thread_id: rowObj.parent_thread_id,
    status: rowObj.status,
    deleted: !!rowObj.deleted,
    pinned: !!rowObj.pinned,
    clock: rowObj.clock !== null ? Number(rowObj.clock) : undefined,
  };
}

const THREAD_COLUMNS = [
  "id",
  "title",
  "created_at",
  "updated_at",
  "last_message_at",
  "parent_thread_id",
  "status",
  "deleted",
  "pinned",
  "clock",
];

async function initService() {
  const { rows } = await dbExec({
    sql: `SELECT clock FROM clock WHERE id = 1`,
    bindings: undefined,
  });
  if (rows.length > 0) {
    _clock = rows[0][0] as number;
  }
}

export function syncServiceProvider() {
  initService().then(() => {
    startMessageQueue();
  });

  const convertToMs = (s?: number | string | null): number => {
    if (s === undefined || s === null) return 0;
    const num = Number(s);
    if (isNaN(num)) return 0;
    return num < 100000000000 ? num * 1000 : num; // Heuristic: if < 12 digits, assume seconds
  };

  function getMessageChannelName(threadId: string): string {
    return `messages-channel-${threadId}`;
  }

  async function updateClock(newClock: number) {
    if (newClock > _clock) {
      _clock = newClock;
      await dbExec({
        sql: `UPDATE clock SET clock = ? WHERE id = 1`,
        bindings: [_clock],
      });
    }
  }

  async function applyChange(msg: any) {
    if (msg.type === "thread" && msg.data) {
      const backendThread = msg.data;
      const newClock = msg.clock;

      if (!backendThread.id || newClock === undefined || newClock === null) {
        console.error("Invalid thread data or clock for applyChange:", msg);
        return;
      }

      // Use UPSERT pattern with clock-based conflict resolution
      const { changes } = await dbExec({
        sql: `
        INSERT INTO threads (id, title, created_at, updated_at, last_message_at, parent_thread_id, status, deleted, pinned, clock)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          title = excluded.title,
          updated_at = excluded.updated_at,
          last_message_at = excluded.last_message_at,
          status = excluded.status,
          deleted = excluded.deleted,
          pinned = excluded.pinned,
          clock = excluded.clock
        WHERE excluded.clock > threads.clock OR threads.clock IS NULL;
        `,
        bindings: [
          backendThread.id,
          backendThread.title ?? "Untitled",
          convertToMs(backendThread.created_at),
          convertToMs(backendThread.updated_at),
          convertToMs(backendThread.last_message_at),
          backendThread.parent_thread_id,
          backendThread.status ?? "ready",
          backendThread.deleted ? 1 : 0,
          backendThread.pinned ? 1 : 0,
          newClock,
        ],
      });
      await updateClock(newClock);
      if (changes > 0) {
        const updatedThread = await api.getThread(backendThread.id);
        if (updatedThread) {
          threadsChannel.postMessage({
            type: "thread_update",
            payload: updatedThread,
          });
        }
      }
    } else if (msg.type === "message" && msg.data) {
      const backendMessage = msg.data;
      const newClock = msg.clock;

      if (
        !backendMessage.id ||
        !backendMessage.thread_id ||
        newClock === undefined ||
        newClock === null
      ) {
        console.error("Invalid message data or clock for applyChange:", msg);
        return;
      }

      // Use UPSERT pattern with clock-based conflict resolution
      const { changes } = await dbExec({
        sql: `
        INSERT INTO messages (id, role, content, data, created_at, updated_at, error, deleted, thread_id, clock, stream_id, message_index)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          role = excluded.role,
          content = excluded.content,
          data = excluded.data,
          updated_at = excluded.updated_at,
          error = excluded.error,
          deleted = excluded.deleted,
          stream_id = excluded.stream_id,
          message_index = excluded.message_index,
          clock = excluded.clock
        WHERE (excluded.clock > messages.clock OR messages.clock IS NULL) AND thread_id = ?;
        `,
        bindings: [
          backendMessage.id,
          backendMessage.role ?? "user",
          backendMessage.content ?? backendMessage.data?.content ?? "",
          backendMessage.data ? JSON.stringify(backendMessage.data) : null,
          convertToMs(backendMessage.created_at),
          convertToMs(backendMessage.updated_at),
          backendMessage.error,
          backendMessage.deleted ? 1 : 0,
          backendMessage.thread_id,
          newClock,
          backendMessage.stream_id,
          backendMessage.index ?? 0,
          backendMessage.thread_id,
        ],
      });
      await updateClock(newClock);
      if (changes > 0) {
        const updatedMessage = await api.getMessage(backendMessage.id);
        if (updatedMessage) {
          const messageChannel = new BroadcastChannel(
            getMessageChannelName(backendMessage.thread_id),
          );
          messageChannel.postMessage({
            type: "message_update",
            payload: updatedMessage,
          });
          messageChannel.close();
        }
      }
    } else if (msg.type === "kv" && msg.data) {
      const backendKV = msg.data;
      const newClock = msg.clock;

      if (
        !backendKV.id ||
        !backendKV.name ||
        newClock === undefined ||
        newClock === null
      ) {
        console.error("Invalid KV data or clock for applyChange:", msg);
        return;
      }

      // Use UPSERT pattern with clock-based conflict resolution
      await dbExec({
        sql: `
        INSERT INTO kv (id, name, value, created_at, updated_at, clock)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(name) DO UPDATE SET
          value = excluded.value,
          updated_at = excluded.updated_at,
          clock = excluded.clock
        WHERE excluded.clock > kv.clock OR kv.clock IS NULL;
        `,
        bindings: [
          backendKV.id,
          backendKV.name,
          backendKV.value,
          convertToMs(backendKV.created_at),
          convertToMs(backendKV.updated_at),
          newClock,
        ],
      });
      await updateClock(newClock);
    }
  }

  let wsSendFunction: ((data: string | ArrayBuffer | Blob) => void) | null =
    null;
  let _token: string, _endpoint: string;

  let messageQueueTimeout: any;
  async function startMessageQueue() {
    messageQueueTimeout = setTimeout(
      processMessageQueue,
      QUEUE_PROCESSING_INTERVAL,
    );
  }
  async function processMessageQueue() {
    if (messageQueueTimeout) clearTimeout(messageQueueTimeout);
    while (messageQueue.length > 0 && !isQueuePaused) {
      const msg = messageQueue[0];
      if (msg.clock > _clock + 1) {
        console.log(
          `Missed events. Local clock: ${_clock}, message clock: ${msg.clock}. Pulling changes.`,
        );
        await pullChanges();
      } else {
        messageQueue.shift();
        await applyChange(msg);
      }
    }
    messageQueueTimeout = setTimeout(
      processMessageQueue,
      QUEUE_PROCESSING_INTERVAL,
    );
  }

  async function restartWebsocketsServer() {
    const { send } = useWebSocket(_endpoint, {
      heartbeat: {
        message: "ping",
        responseMessage: "pong",
        interval: 10000,
        pongTimeout: 2000,
      },
      autoReconnect: {
        retries: 1000,
        onFailed: () => {
          console.log("retry failed!");
        },
      },
      protocols: [_token, "nuxflare-chat"],
      onDisconnected() {
        console.log("disconnected!");
      },
      onConnected() {
        console.log("connected!");
      },
      onMessage: async (_ws, event) => {
        try {
          const msg = JSON.parse(event.data as string);
          messageQueue.push(msg);
          startMessageQueue();
        } catch (e) {
          console.error(
            "Error processing message from backend:",
            e,
            event.data,
          );
        }
      },
    });
    wsSendFunction = send;
  }

  async function pullChanges() {
    isQueuePaused = true;
    try {
      const response = await fetch(`${_endpoint}/pull?clock=${_clock}`, {
        headers: {
          Authentication: `Bearer ${_token}`,
        },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to pull changes: ${response.status} ${response.statusText}`,
        );
      }
      const data = await response.json();
      if (data.threads && Array.isArray(data.threads)) {
        for (const thread of data.threads) {
          await applyChange({
            type: "thread",
            clock: thread.clock,
            data: thread,
          });
        }
      }
      if (data.messages && Array.isArray(data.messages)) {
        for (const message of data.messages) {
          await applyChange({
            type: "message",
            clock: message.clock,
            data: message,
          });
        }
      }
      if (data.kvs && Array.isArray(data.kvs)) {
        for (const kv of data.kvs) {
          await applyChange({
            type: "kv",
            clock: kv.clock,
            data: kv,
          });
        }
      }
      console.log(
        `pulled ${data.kvs.length + data.messages.length + data.threads.length} changes!`,
      );
    } catch (error) {
      console.error("Error pulling changes:", error);
    } finally {
      isQueuePaused = false;
    }
  }

  const api = {
    isReady() {
      return true;
    },
    isSyncReady() {
      return isSyncReady;
    },
    async setAuthInfo(endpoint: string, token: string) {
      await waitForDatabase();
      if (endpoint !== _endpoint || token !== _token) {
        _endpoint = endpoint;
        _token = token;
        pullChanges()
          .then(() => {
            restartWebsocketsServer();
          })
          .then(() => {
            isSyncReady = true;
            console.log("sync ready!");
            syncReadyResolvers.forEach((resolve) => resolve());
            syncReadyResolvers = [];
          });
      }
    },
    async newThread(params: {
      content: string;
      attachments?: any[];
      title?: string;
      options?: { name: string; thinkingBudget?: string };
    }) {
      await waitForSync();
      const threadId = crypto.randomUUID();
      const messageId = crypto.randomUUID();
      const title =
        params.title || params.content.substring(0, 50) || "New Chat";
      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "new_thread",
            data: {
              id: threadId,
              title,
            },
          },
          {
            type: "new_message",
            data: {
              id: messageId,
              data: {
                content: params.content,
                attachments: params.attachments,
              },
              role: "user",
              threadId,
            },
          },
          {
            type: "run_thread",
            data: {
              threadId,
              options: params.options,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
      return { threadId };
    },
    async getThread(threadId: string): Promise<Thread | null> {
      const { rows } = await dbExec({
        sql: `SELECT ${THREAD_COLUMNS.join(", ")} FROM threads WHERE id = ?`,
        bindings: [threadId],
      });
      const thread = rows[0] ? mapRowToThread(rows[0], THREAD_COLUMNS) : null;
      return thread;
    },
    async searchThreads(query: string): Promise<any[]> {
      const ftsQuery = query
        .trim()
        .split(/\s+/)
        .filter((term) => term.length > 0)
        .map((term) => {
          const sanitized = sanitizeFtsTerm(term);
          return `${sanitized}*`;
        })
        .join(" AND ");
      const { rows } = await dbExec({
        sql: `SELECT t.* FROM threads AS t JOIN threads_fts AS fts ON t.id = fts.thread_id
              WHERE fts.threads_fts MATCH ? AND t.deleted = 0
              ORDER BY fts.rank;`,
        bindings: [ftsQuery],
      });
      const threads = rows.map((row) => mapRowToThread(row, THREAD_COLUMNS));
      return threads;
    },
    async getMessage(messageId: string): Promise<any | null> {
      const { rows } = await dbExec({
        sql: `SELECT id, role, content, data, created_at, updated_at, error, deleted, thread_id, clock, stream_id, message_index
         FROM messages WHERE id = ?`,
        bindings: [messageId],
      });
      const messages = rows.map((row) => ({
        id: row[0],
        role: row[1],
        content: row[2],
        data: row[3] ? JSON.parse(row[3]) : null,
        created_at: Number(row[4]),
        updated_at: Number(row[5]),
        error: row[6],
        deleted: !!row[7],
        thread_id: row[8],
        clock: row[9] !== null ? Number(row[9]) : undefined,
        stream_id: row[10] || "",
        index: row[11] !== null ? Number(row[11]) : 0,
      }));
      return messages[0];
    },
    async getThreads(): Promise<Thread[]> {
      const { rows } = await dbExec({
        sql: `SELECT ${THREAD_COLUMNS.join(", ")} FROM threads WHERE deleted = 0 ORDER BY last_message_at DESC`,
        bindings: undefined,
      });
      const threads = rows.map((row) => mapRowToThread(row, THREAD_COLUMNS));
      return threads;
    },
    async getMessagesForThread(threadId: string): Promise<any[]> {
      const { rows } = await dbExec({
        sql: `SELECT id, role, content, data, created_at, updated_at, error, deleted, thread_id, clock, stream_id, message_index
         FROM messages WHERE thread_id = ? AND deleted = 0 ORDER BY message_index ASC, created_at ASC`,
        bindings: [threadId],
      });
      const messages = rows.map((row) => ({
        id: row[0],
        role: row[1],
        content: row[2],
        data: row[3] ? JSON.parse(row[3]) : null,
        created_at: Number(row[4]),
        updated_at: Number(row[5]),
        error: row[6],
        deleted: !!row[7],
        thread_id: row[8],
        clock: row[9] !== null ? Number(row[9]) : undefined,
        stream_id: row[10] || "",
        index: row[11] !== null ? Number(row[11]) : 0,
      }));
      return messages;
    },
    async updateThread(id: string, update: any) {
      await waitForSync();
      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "update_thread",
            data: {
              id,
              ...update,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
    },
    async sendMessage(params: {
      threadId: string;
      content: string;
      attachments?: any[];
      options?: { model: string; thinkingBudget?: string };
    }) {
      await waitForSync();
      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "new_message",
            data: {
              id: crypto.randomUUID(),
              threadId: params.threadId,
              data: {
                content: params.content,
                attachments: params.attachments,
              },
              role: "user",
            },
          },
          {
            type: "run_thread",
            data: {
              threadId: params.threadId,
              options: params.options,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
    },
    async updateMessage(id: string, update: { data?: any; deleted?: boolean }) {
      await waitForSync();
      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "update_message",
            data: {
              id,
              ...update,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
    },
    async retryMessage(
      messageId: string,
      options?: { name: string; thinkingBudget?: string },
    ) {
      await waitForSync();

      // First get the message to find the thread ID
      const { rows } = await dbExec({
        sql: `SELECT thread_id FROM messages WHERE id = ?`,
        bindings: [messageId],
      });

      if (!rows[0]) {
        throw new Error("Message not found");
      }

      const threadId = rows[0][0];

      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "run_thread",
            data: {
              threadId,
              messageId,
              options: options,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
    },
    async branchThread(
      threadId: string,
      messageId: string,
      newThreadId: string,
    ) {
      await waitForSync();
      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "branch_thread",
            data: {
              newThreadId,
              threadId,
              messageId,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
      return newThreadId;
    },
    async getKV(name: string): Promise<string | null> {
      const { rows } = await dbExec({
        sql: `SELECT value FROM kv WHERE name = ?`,
        bindings: [name],
      });
      return rows[0] ? rows[0][0] : null;
    },
    async setKV(name: string, value: string) {
      await waitForSync();
      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "set_kv",
            data: {
              name,
              value,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
    },
    async clear() {
      await clearAllOPFSStorage();
    },
  };
  return createSharedServicePort(api);
}
