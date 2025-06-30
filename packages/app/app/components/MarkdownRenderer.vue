<template>
  <div
    class="prose dark:prose-invert [&>div:last-child>p:last-child]:mb-0 [&>div:first-child>p:first-child]:mt-0 overflow-x-auto"
  >
    <MarkdownChunkRenderer
      v-for="(b, index) in blocks"
      :key="index"
      :block="b"
    />
  </div>
</template>

<script setup lang="ts">
import { marked } from "marked";

const { content, chunked } = defineProps<{
  content: string;
  chunked?: boolean;
}>();
const blocks = computed(() =>
  chunked ? marked.lexer(content || "").map((block) => block.raw) : [content],
);
</script>
