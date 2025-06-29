<template>
  <UCommandPalette
    v-model:search-term="searchTerm"
    @update:open="update"
    :groups="groupedThreads"
    :close="{
      color: 'neutral',
      variant: 'outline',
      size: 'xs',
      class: 'rounded-full',
    }"
    :loading="status === 'pending'"
    icon="i-lucide-search"
    :ui="{
      root: 'p-3 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full lg:min-w-180 max-h-120 overflow-y-scroll scrollbar-custom bg-neutral-200/30 dark:bg-neutral-700/30 ring-0 ring-neutral-600 backdrop-blur-md shadow-lg rounded-xl',
      content:
        'bg-white/80 dark:bg-neutral-900 rounded-lg p-1.5 mx-auto w-full',
      label: 'text-neutral-400',
      item: 'p-3 rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-800',
    }"
    @update:model-value="onSelect"
  >
    <template #item="{ item }">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide:message-circle" class="size-5 text-neutral-500" />
        <span>{{ item.label }}</span>
        <span class="text-neutral-500 dark:text-neutral-400">{{
          item.time
        }}</span>
      </div>
    </template>
  </UCommandPalette>
</template>

<script setup lang="ts">
import type { Thread } from "~/composables/useThreadsStore";

const { searchRef } = useSearchRef();
const router = useRouter();

const searchTerm = ref("");
const debouncedSearchTerm = debouncedRef(searchTerm, 200);
const { $sync } = useNuxtApp();

const getThreadTime = (thread: Thread) => {
  return Math.max(thread.created_at, thread.last_message_at);
};

const formatThreadTime = (thread: Thread) => {
  const threadTime = getThreadTime(thread);
  const now = Date.now();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const threadDate = new Date(threadTime);

  if (threadDate >= today) {
    return threadDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (threadDate >= yesterday) {
    return "Yesterday";
  } else {
    return threadDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  }
};

const { data: searchResults, status } = await useAsyncData(
  "search",
  async () => {
    if (!debouncedSearchTerm.value.trim()) return [];
    return await $sync.searchThreads(debouncedSearchTerm.value);
  },
  {
    watch: [debouncedSearchTerm],
    default: () => [],
  },
);

const groupedThreads = computed(() => {
  if (!searchResults.value || searchResults.value.length === 0) {
    return [];
  }
  return [
    {
      id: "threads",
      label: "Threads",
      items: searchResults.value.map((thread: any) => ({
        id: thread.id,
        label: thread.title,
        threadId: thread.id,
        time: formatThreadTime(thread),
      })),
      ignoreFilter: true,
    },
  ];
});

const update = (val: boolean) => {
  searchRef.value = val;
};

const onSelect = (item: any) => {
  if (item?.threadId) {
    router.push(`/${item.threadId}`);
    searchRef.value = false;
  }
};

// defineShortcuts({
//   meta_g: () => {
//     searchRef.value = !searchRef.value;
//   },
// });
</script>
