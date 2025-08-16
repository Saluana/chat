<template>
  <div class="space-y-4 p-5">
    <div class="space-y-2">
      <div class="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
      <div class="space-y-2">
        <div
          v-for="i in 3"
          :key="`p-${i}`"
          class="h-8 w-full rounded bg-neutral-100 dark:bg-neutral-800/60"
        />
      </div>
    </div>
    <div class="space-y-2">
      <div class="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
      <div class="space-y-2">
        <div
          v-for="i in 7"
          :key="`u-${i}`"
          class="h-8 w-full rounded bg-neutral-100 dark:bg-neutral-800/60"
        />
      </div>
    </div>
    <div class="h-10" />
  </div>
</template>

<script setup lang="ts">
// Pure skeleton
</script>
