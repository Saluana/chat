<template>
  <div class="prose dark:prose-invert" v-html="micromark(content)" />
</template>

<script setup lang="ts">
import { micromark } from "micromark";
const { content } = defineProps<{ content: string }>();
</script>
