import SQLiteESMFactory from "wa-sqlite/dist/wa-sqlite.mjs";
import * as SQLite from "wa-sqlite";
import type { Thread } from "../composables/useThreadsStore";
import type { PushEvent } from "@nuxflare-chat/api/types";

let sqlite3: ReturnType<typeof SQLite.Factory>;
let db: number;
const THREADS_CHANNEL_NAME = "threads-channel";
let threadsChannel: BroadcastChannel;

// Helper to map array row to object based on explicit column list
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
  const module = await SQLiteESMFactory();
  sqlite3 = SQLite.Factory(module);
  db = await sqlite3.open_v2("myDB");

  // Initialize threads table
  await sqlite3.exec(
    db,
    `
      CREATE TABLE IF NOT EXISTS threads (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        last_message_at INTEGER NOT NULL,
        parent_thread_id TEXT,
        status TEXT NOT NULL DEFAULT 'ready',
        deleted INTEGER DEFAULT 0,
        pinned INTEGER DEFAULT 0,
        clock INTEGER
      )
    `,
  );

  // Initialize messages table
  await sqlite3.exec(
    db,
    `
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        data TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        error TEXT,
        deleted INTEGER DEFAULT 0,
        thread_id TEXT NOT NULL,
        stream_id TEXT,
        message_index INTEGER NOT NULL DEFAULT 0,
        clock INTEGER
      )
    `,
  );

  // Initialize kv table
  await sqlite3.exec(
    db,
    `
      CREATE TABLE IF NOT EXISTS kv (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        value TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        clock INTEGER
      )
    `,
  );
  threadsChannel = new BroadcastChannel(THREADS_CHANNEL_NAME);
}

// TODO: switch to OPFS in a worker

export function syncServiceProvider() {
  initService();

  const convertToMs = (s?: number | string | null): number => {
    if (s === undefined || s === null) return 0;
    const num = Number(s);
    if (isNaN(num)) return 0;
    return num < 100000000000 ? num * 1000 : num; // Heuristic: if < 12 digits, assume seconds
  };

  function getMessageChannelName(threadId: string): string {
    return `messages-channel-${threadId}`;
  }

  async function applyChange(msg: any) {
    if (!sqlite3 || !db) {
      console.error("Database not initialized, cannot apply change.");
      return;
    }

    if (msg.type === "thread" && msg.data) {
      const backendThread = msg.data;
      const newClock = msg.clock;

      if (!backendThread.id || newClock === undefined || newClock === null) {
        console.error("Invalid thread data or clock for applyChange:", msg);
        return;
      }

      // Use UPSERT pattern with clock-based conflict resolution
      await sqlite3.execWithParams(
        db,
        `
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
        [
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
      );

      // Check if any rows were affected
      const changes = sqlite3.changes(db);
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
      await sqlite3.execWithParams(
        db,
        `
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
        [
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
          backendMessage.thread_id, // Additional thread_id for WHERE clause
        ],
      );

      const changes = sqlite3.changes(db);
      if (changes > 0) {
        const messagesInThread = await api.getMessagesForThread(
          backendMessage.thread_id,
        );
        const updatedMessage = messagesInThread.find(
          (m) => m.id === backendMessage.id,
        );

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
      await sqlite3.execWithParams(
        db,
        `
        INSERT INTO kv (id, name, value, created_at, updated_at, clock)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(name) DO UPDATE SET
          value = excluded.value,
          updated_at = excluded.updated_at,
          clock = excluded.clock
        WHERE excluded.clock > kv.clock OR kv.clock IS NULL;
        `,
        [
          backendKV.id,
          backendKV.name,
          backendKV.value,
          convertToMs(backendKV.created_at),
          convertToMs(backendKV.updated_at),
          newClock,
        ],
      );
    }
  }

  let wsSendFunction: ((data: string | ArrayBuffer | Blob) => void) | null =
    null;
  let _token: string, _endpoint: string;

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
          console.log("SW WS received:", msg);
          await applyChange(msg);
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
    if (!_endpoint || !_token) {
      console.error("Cannot pull changes: endpoint or token not set");
      return;
    }

    try {
      const response = await fetch(`${_endpoint}/pull`, {
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

      // Process threads
      if (data.threads && Array.isArray(data.threads)) {
        for (const thread of data.threads) {
          await applyChange({
            type: "thread",
            clock: thread.clock,
            data: thread,
          });
        }
      }

      // Process messages
      if (data.messages && Array.isArray(data.messages)) {
        for (const message of data.messages) {
          await applyChange({
            type: "message",
            clock: message.clock,
            data: message,
          });
        }
      }

      // Process KV
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
        `Pull completed: processed ${data.threads?.length || 0} threads, ${
          data.messages?.length || 0
        } messages, and ${data.kvs?.length || 0} KV pairs`,
      );
    } catch (error) {
      console.error("Error pulling changes:", error);
    }
  }

  const api = {
    async setAuthInfo(endpoint: string, token: string) {
      if (endpoint !== _endpoint || token !== _token) {
        _endpoint = endpoint;
        _token = token;
        restartWebsocketsServer();
        pullChanges();
      }
      return null;
    },
    async newThread(params: {
      messageContent: string;
      title?: string;
      model?: string;
      thinkingBudget?: string;
    }) {
      if (!sqlite3 || !db) throw new Error("Database not initialized");
      const threadId = crypto.randomUUID();
      const messageId = crypto.randomUUID();
      const title =
        params.title || params.messageContent.substring(0, 50) || "New Chat";
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
              data: { content: params.messageContent },
              role: "user",
              threadId,
            },
          },
          {
            type: "run_thread",
            data: {
              threadId,
              options: {
                model: params.model,
                thinkingBudget: params.thinkingBudget,
              },
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
      return { threadId };
    },
    async getThread(threadId: string): Promise<Thread | null> {
      if (!sqlite3 || !db) throw new Error("Database not initialized");
      const { rows } = await sqlite3.execWithParams(
        db,
        `SELECT ${THREAD_COLUMNS.join(", ")} FROM threads WHERE id = ? AND deleted = 0`,
        [threadId],
      );
      const thread = rows[0] ? mapRowToThread(rows[0], THREAD_COLUMNS) : null;
      return thread;
    },
    async getThreads(): Promise<Thread[]> {
      if (!sqlite3 || !db) throw new Error("Database not initialized");
      const threads: Thread[] = [];
      await sqlite3.exec(
        db,
        `SELECT ${THREAD_COLUMNS.join(", ")} FROM threads WHERE deleted = 0 ORDER BY last_message_at DESC`,
        (row) => {
          threads.push(mapRowToThread(row, THREAD_COLUMNS));
        },
      );
      return threads;
    },
    async getMessagesForThread(threadId: string): Promise<any[]> {
      if (!sqlite3 || !db) throw new Error("Database not initialized");
      const { rows } = await sqlite3.execWithParams(
        db,
        `SELECT id, role, content, data, created_at, updated_at, error, deleted, thread_id, clock, stream_id, message_index
         FROM messages WHERE thread_id = ? AND deleted = 0 ORDER BY message_index ASC, created_at ASC`,
        [threadId],
      );
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
      if (!sqlite3 || !db) throw new Error("Database not initialized");
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
    async sendMessage(
      threadId: string,
      message: any,
      options?: { model?: string; thinkingBudget?: string },
    ) {
      if (!sqlite3 || !db) throw new Error("Database not initialized");
      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "new_message",
            data: {
              id: crypto.randomUUID(),
              threadId,
              data: message,
              role: "user",
            },
          },
          {
            type: "run_thread",
            data: {
              threadId,
              options: options || {},
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
    },
    async updateMessage() {
      // edit message, delete message, retry (delete + run thread)
    },
    async retryMessage(
      messageId: string,
      options?: { model?: string; thinkingBudget?: string },
    ) {
      if (!sqlite3 || !db) throw new Error("Database not initialized");

      // First get the message to find the thread ID
      const { rows } = await sqlite3.execWithParams(
        db,
        `SELECT thread_id FROM messages WHERE id = ?`,
        [messageId],
      );

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
              messageId, // Pass the messageId to update the existing message
              options: options || {},
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
    },
    async branchThread() {},
    async getKV(name: string): Promise<string | null> {
      if (!sqlite3 || !db) throw new Error("Database not initialized");
      const { rows } = await sqlite3.execWithParams(
        db,
        `SELECT value FROM kv WHERE name = ?`,
        [name],
      );
      return rows[0] ? rows[0][0] : null;
    },
    async setKV(name: string, value: string) {
      if (!sqlite3 || !db) throw new Error("Database not initialized");
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
  };
  return createSharedServicePort(api);
}
