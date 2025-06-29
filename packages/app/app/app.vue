<template>
  <UApp>
    <NuxtLayout> <NuxtPage /> </NuxtLayout
  ></UApp>
</template>

<script setup lang="ts">
onMounted(() => {
  // warm up markdown processor
  processMarkdownChunk("# test");
});
</script>
