export interface Thread {
  id: string;
  title: string;
  created_at: number;
  updated_at: number;
  last_message_at: number;
  parent_thread_id?: string | null;
  status: "ready" | "streaming" | "error";
  deleted?: boolean;
  pinned?: boolean;
  clock?: number;
}

export interface GroupedThreads {
  [groupName: string]: Thread[];
}

const getThreadTime = (thread: any) => {
  return Math.max(thread.created_at, thread.last_message_at);
};

export const useThreadsStore = defineStore("threads", () => {
  const threads = ref<Record<string, Thread>>({});
  const activeThread = ref<string | null>(null);
  const messages = ref<Record<string, any>>({});
  const responseStreaming = ref(false);
  const stopStreaming = ref(false);

  watch(
    threads,
    (newThreads) => {
      if (import.meta.client) {
        if (activeThread.value) {
          const thread = newThreads[activeThread.value];
          if (thread) {
            responseStreaming.value = thread.status === "streaming";
            if (thread.status != "streaming") {
              stopStreaming.value = false;
            }
          } else {
            responseStreaming.value = false;
          }
        }
      }
    },
    { deep: true },
  );

  function addMessage(msg: any) {
    // Debug: record when an individual message is added
    try {
      console.log(
        "[ThreadsDebug] addMessage: id=",
        msg?.id,
        "thread_id=",
        msg?.thread_id,
      );
    } catch {}
    messages.value[msg.id as string] = msg;
  }

  const messagesList = computed(() =>
    // Avoid using the new `toSorted` API for broader runtime compatibility.
    Object.values(messages.value)
      .slice()
      .sort((a, b) => {
        // Sort by index first, then by created_at as a safety net
        if ((a.index || 0) !== (b.index || 0)) {
          return (a.index || 0) - (b.index || 0);
        }
        return a.created_at - b.created_at;
      }),
  );

  const pinnedThreads = computed(() => {
    const result: GroupedThreads = { pinned: [] };
    for (const thread of Object.values(threads.value)) {
      if (thread.pinned && !thread.deleted) {
        result.pinned!.push(thread);
      }
    }
    result.pinned!.sort((a, b) => getThreadTime(b) - getThreadTime(a));
    return result;
  });

  const unpinnedThreads = computed(() => {
    const now = Date.now();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const groups: GroupedThreads = {
      today: [],
      yesterday: [],
      "last 7 days": [],
      "last 30 days": [],
      older: [],
    };

    const unpinned = Object.values(threads.value)
      .filter((thread) => !thread.pinned && !thread.deleted)
      .sort((a, b) => getThreadTime(b) - getThreadTime(a));

    unpinned.forEach((thread) => {
      const threadDate = new Date(thread.last_message_at);
      if (threadDate >= today) {
        groups.today!.push(thread);
      } else if (threadDate >= yesterday) {
        groups.yesterday!.push(thread);
      } else if (threadDate >= sevenDaysAgo) {
        groups["last 7 days"]!.push(thread);
      } else if (threadDate >= thirtyDaysAgo) {
        groups["last 30 days"]!.push(thread);
      } else {
        groups.older!.push(thread);
      }
    });

    for (const groupName of Object.keys(groups)) {
      if (groups[groupName]!.length === 0) {
        delete groups[groupName];
      }
    }

    return groups;
  });

  let messagesChannel: BroadcastChannel | null = null;
  function setActiveThread(threadId: string | null) {
    if (import.meta.client) {
      console.log(
        "[ThreadsDebug] setActiveThread called with:",
        threadId,
        "(previous active=",
        activeThread.value,
        ")",
      );
      // If the active thread is already the requested one, avoid clearing and recreating channels.
      if (activeThread.value === threadId) {
        console.log(
          "[ThreadsDebug] setActiveThread: same thread requested, skipping re-init",
        );
        return;
      }
      activeThread.value = threadId;
      messages.value = {};
      console.log("[ThreadsDebug] messages cleared for new active thread");
      if (threadId) {
        const { $sync } = useNuxtApp();
        (async () => {
          try {
            console.log(
              "[ThreadsDebug] fetching messages for thread",
              threadId,
            );
            const msgs = ((await $sync.getMessagesForThread?.(threadId)) ??
              []) as any[];
            console.log(
              "[ThreadsDebug] fetched messages for thread",
              threadId,
              "count=",
              Array.isArray(msgs) ? msgs.length : typeof msgs,
            );
            if (Array.isArray(msgs)) {
              msgs.forEach((msg) => (messages.value[msg.id] = msg));
            }
            // Log final message keys count
            try {
              console.log(
                "[ThreadsDebug] messages populated, local count=",
                Object.keys(messages.value).length,
              );
            } catch {}
          } catch (e) {
            console.error("Failed to load messages for thread", threadId, e);
          }
        })();
      }
      if (messagesChannel) {
        console.log("[ThreadsDebug] closing previous messagesChannel");
        messagesChannel.close();
      }
      messagesChannel = new BroadcastChannel(`messages-channel-${threadId}`);
      console.log(
        "[ThreadsDebug] created messagesChannel=",
        `messages-channel-${threadId}`,
      );
      messagesChannel.onmessage = (
        event: MessageEvent<{ type: string; payload: any }>,
      ) => {
        const { type, payload } = event.data;
        console.log(
          "[ThreadsDebug] messagesChannel.onmessage: type=",
          type,
          "payload.id=",
          payload?.id,
          "payload.thread_id=",
          payload?.thread_id,
          "active=",
          activeThread.value,
        );
        if (type === "message_update") {
          if (payload.thread_id !== activeThread.value) return;
          if (payload.deleted) delete messages.value[payload.id];
          else messages.value[payload.id] = payload;
        }
      };
    }
  }

  function setThread(thread: Thread) {
    threads.value[thread.id] = thread;
  }

  function addThreads(newThreads: Thread[]) {
    newThreads.forEach((thread) => {
      threads.value[thread.id] = thread;
    });
  }

  function removeThread(threadId: string) {
    if (threads.value[threadId]) {
      delete threads.value[threadId];
    }
  }

  if (import.meta.client) {
    const { $sync } = useNuxtApp();

    const fetchInitialThreads = async () => {
      try {
        const initialThreadsArray = (await $sync.getThreads!()) as unknown;
        const arr = Array.isArray(initialThreadsArray)
          ? (initialThreadsArray as Thread[])
          : [];
        if (arr.length) addThreads(arr);
      } catch (error) {
        console.error("Failed to fetch initial threads:", error);
      }
    };

    fetchInitialThreads();

    const threadsChannel = new BroadcastChannel("threads-channel");
    threadsChannel.onmessage = (event: MessageEvent) => {
      const { type, payload } = event.data as { type: string; payload: any };
      if (type === "thread_update") {
        const thread = payload as Thread;
        if (thread.deleted) removeThread(thread.id);
        else setThread(thread);
      }
    };
  }

  const activeThreadObject = computed(
    () => threads.value[activeThread.value || ""] || null,
  );

  return {
    threads,
    responseStreaming,
    stopStreaming,
    messages,
    messagesList,
    activeThread,
    activeThreadObject,
    pinnedThreads,
    unpinnedThreads,
    setThread,
    setActiveThread,
    addThreads,
    removeThread,
    addMessage,
  };
});
