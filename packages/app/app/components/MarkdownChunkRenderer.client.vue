<template>
  <div v-html="html" />
</template>

<script setup lang="ts">
const { block } = defineProps<{ block: string }>();
const html = ref(block);

watch(
  [() => block],
  async () => {
    if (block) {
      html.value = await processMarkdownChunk(block);
    }
  },
  { immediate: true },
);
</script>
