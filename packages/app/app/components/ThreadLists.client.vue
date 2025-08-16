<template>
  <ClientOnly>
    <div ref="root" class="min-h-[200px]">
      <ThreadListSkeleton v-if="!visible" />
      <template v-else>
        <LazyChatThread
          v-if="pinnedThreads.pinned?.length"
          :threads="pinnedThreads"
          :pinned="true"
        />
        <LazyChatThread :threads="unpinnedGroups" :pinned="false" />
        <div class="h-10" />
      </template>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { useThreadsPreview } from "../composables/useThreadsPreview";
// No props now; the component owns preview state when visible
const root = ref<HTMLElement | null>(null);
const visible = ref(false);
const { items, init } = useThreadsPreview();

const getThreadTime = (t: any) =>
  Math.max(t.last_message_at || 0, t.updated_at || 0);

const pinnedThreads = computed(() => {
  const result: Record<string, any[]> = { pinned: [] };
  for (const t of items.value) {
    if (t.pinned === 1 && t.deleted === 0) result.pinned!.push(t as any);
  }
  result.pinned!.sort((a, b) => getThreadTime(b) - getThreadTime(a));
  return result;
});

const unpinnedGroups = computed(() => {
  const now = Date.now();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const groups: Record<string, any[]> = {
    today: [],
    yesterday: [],
    "last 7 days": [],
    "last 30 days": [],
    older: [],
  };

  const unpinned = items.value
    .filter((t) => t.pinned !== 1 && t.deleted === 0)
    .slice()
    .sort((a, b) => getThreadTime(b) - getThreadTime(a));

  unpinned.forEach((t) => {
    const d = new Date(t.last_message_at || 0);
    if (d >= today) groups.today!.push(t as any);
    else if (d >= yesterday) groups.yesterday!.push(t as any);
    else if (d >= sevenDaysAgo) groups["last 7 days"]!.push(t as any);
    else if (d >= thirtyDaysAgo) groups["last 30 days"]!.push(t as any);
    else groups.older!.push(t as any);
  });

  for (const k of Object.keys(groups)) {
    if (groups[k]!.length === 0) delete groups[k];
  }
  return groups;
});

onMounted(() => {
  const { stop } = useIntersectionObserver(
    root,
    ([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) {
        visible.value = true;
        // Only initialize preview once visible
        init().catch(() => {});
        stop();
      }
    },
    { rootMargin: "200px 0px", threshold: 0.01 },
  );
});
</script>

<script lang="ts">
export default {
  components: {
    ThreadListSkeleton: () => import("./ThreadListSkeleton.vue"),
  },
};
</script>
