<template>
  <div class="prose dark:prose-invert [&>div:first-child>p]:m-0">
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
