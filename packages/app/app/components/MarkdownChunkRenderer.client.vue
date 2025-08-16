<template>
  <div>
    <div v-if="!ready" class="py-2">
      <MarkdownSkeleton :variant="variant" />
    </div>
    <div v-else v-html="html" />
  </div>
</template>

<script setup lang="ts">
const { block, variant = "assistant" } = defineProps<{
  block: string;
  variant?: "user" | "assistant";
}>();
const emit = defineEmits(["ready"]);
const html = ref("");
const ready = ref(false);
// Lazy renderer
const { renderMarkdownChunk } = await import("~/utils/markdown-lazy");

watch(
  [() => block],
  async () => {
    if (block) {
      ready.value = false;
      html.value = await renderMarkdownChunk(block);
      ready.value = true;
      emit("ready");
    }
  },
  { immediate: true },
);
</script>
<script lang="ts">
export default {
  components: { MarkdownSkeleton: () => import("./MarkdownSkeleton.vue") },
};
</script>
