<template>
  <div class="w-full animate-pulse select-none">
    <div v-if="variant === 'user'" class="flex flex-col items-end gap-2">
      <div class="h-3 w-7/12 rounded bg-neutral-200 dark:bg-neutral-700" />
      <div class="h-3 w-5/12 rounded bg-neutral-200 dark:bg-neutral-700" />
    </div>
    <div v-else class="flex flex-col gap-2">
      <div class="h-3 w-9/12 rounded bg-neutral-200 dark:bg-neutral-700" />
      <div class="h-3 w-11/12 rounded bg-neutral-200 dark:bg-neutral-700" />
      <div class="h-3 w-10/12 rounded bg-neutral-200 dark:bg-neutral-700" />
      <div class="h-3 w-8/12 rounded bg-neutral-200 dark:bg-neutral-700" />
      <div class="h-3 w-6/12 rounded bg-neutral-200 dark:bg-neutral-700" />
      <div class="h-3 w-3/12 rounded bg-neutral-200 dark:bg-neutral-700" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ variant?: "user" | "assistant" }>(), {
  variant: "assistant",
});
</script>
