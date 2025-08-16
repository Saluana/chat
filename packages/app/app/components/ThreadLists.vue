<template>
  <div ref="root">
    <ThreadListSkeleton v-if="!hydrated" />
    <template v-else>
      <ChatThread
        v-if="pinned?.pinned?.length"
        :threads="pinned"
        :pinned="true"
      />
      <ChatThread :threads="unpinned" :pinned="false" />
      <div class="h-10" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
const props = defineProps<{ pinned: any; unpinned: any }>();
const root = ref<HTMLElement | null>(null);
const hydrated = ref(false);

if (import.meta.client) {
  // hydrate immediately on client, but schedule list rendering next tick to unblock paint
  queueMicrotask(() => (hydrated.value = true));
}

onMounted(() => {
  // Optional: attach observer to pre-hydrate when near viewport without blocking
  const { stop } = useIntersectionObserver(
    root,
    ([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) {
        hydrated.value = true;
        stop();
      }
    },
    { rootMargin: "300px 0px", threshold: 0.01 },
  );
});
</script>

<script lang="ts">
export default {
  components: {
    ThreadListSkeleton: () => import("./ThreadListSkeleton.vue"),
    ChatThread: () => import("./ChatThread.vue"),
  },
};
</script>
