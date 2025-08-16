<template>
  <div
    ref="root"
    class="prose dark:prose-invert [&>div:last-child>p:last-child]:mb-0 [&>div:first-child>p:first-child]:mt-0 overflow-x-auto"
  >
    <template v-if="!allReady">
      <!-- show a single skeleton block as placeholder until first chunk resolves -->
      <MarkdownSkeleton :variant="variant" />
    </template>
    <template v-else>
      <MarkdownChunkRenderer
        v-for="(b, index) in blocks"
        :key="index"
        :block="b"
        :variant="variant"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { marked } from "marked";
import { useIntersectionObserver } from "@vueuse/core";

const emit = defineEmits(["rendered"]);
const { content, chunked, variant } = withDefaults(
  defineProps<{
    content: string;
    chunked?: boolean;
    variant?: "user" | "assistant";
  }>(),
  { variant: "assistant" },
);
const blocks = computed(() =>
  chunked ? marked.lexer(content || "").map((block) => block.raw) : [content],
);
const allReady = ref(false);
const root = ref<HTMLElement | null>(null);
const inView = ref(false);

onMounted(() => {
  const { stop } = useIntersectionObserver(
    root,
    ([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) {
        inView.value = true;
        // Once visible, stop observing
        stop();
      }
    },
    { rootMargin: "200px 0px 200px 0px", threshold: 0.01 },
  );
});

async function preRenderAll() {
  allReady.value = false;
  const { renderMarkdownChunk } = await import("~/utils/markdown-lazy");
  await Promise.all((blocks.value || []).map((b) => renderMarkdownChunk(b)));
  allReady.value = true;
  emit("rendered");
}

watch(
  [() => content, inView],
  async () => {
    if (!inView.value) {
      allReady.value = false;
      return;
    }
    await preRenderAll();
  },
  { immediate: true },
);
</script>
