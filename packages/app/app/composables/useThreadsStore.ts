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
    messages.value[msg.id as string] = msg;
  }

  const messagesList = computed(() =>
    Object.values(messages.value).toSorted((a, b) => {
      // Sort by index first, then by created_at as a safety net
      if (a.index !== b.index) {
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

  let messagesChannel: BroadcastChannel;
  function setActiveThread(threadId: string | null) {
    if (import.meta.client) {
      activeThread.value = threadId;
      messages.value = {};
      if (threadId) {
        const { $sync } = useNuxtApp();
        $sync.getMessagesForThread?.(threadId).then((msgs: any[]) => {
          msgs.forEach((msg) => (messages.value[msg.id] = msg));
        });
      }
      if (messagesChannel) {
        messagesChannel.close();
      }
      messagesChannel = new BroadcastChannel(`messages-channel-${threadId}`);
      messagesChannel.onmessage = (
        event: MessageEvent<{ type: string; payload: any }>,
      ) => {
        const { type, payload } = event.data;
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
        const initialThreadsArray = await $sync.getThreads!();
        if (initialThreadsArray) {
          addThreads(initialThreadsArray);
        }
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
