<template>
  <ClientOnly>
    <div ref="root" class="min-h-[200px]">
      <ThreadListSkeleton v-if="!visible" />
      <template v-else>
        <LazyChatThread
          v-if="pinned?.pinned?.length"
          :threads="pinned"
          :pinned="true"
        />
        <LazyChatThread :threads="unpinned" :pinned="false" />
        <div class="h-10" />
      </template>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
const props = defineProps<{ pinned: any; unpinned: any }>();
const root = ref<HTMLElement | null>(null);
const visible = ref(false);

onMounted(() => {
  const { stop } = useIntersectionObserver(
    root,
    ([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) {
        visible.value = true;
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
