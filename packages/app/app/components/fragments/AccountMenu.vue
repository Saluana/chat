<template>
  <div
    class="p-1 bg-white dark:bg-black rounded-lg w-[var(--width)]"
    :style="cssVars"
  >
    <div
      v-for="action in actions"
      :key="action.icon"
      class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800/70 font-semibold cursor-pointer"
      @click="action.action()"
    >
      <UIcon :name="action.icon" class="size-4" />
      <span>{{ action.name }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ actions: any[]; cssVars: any }>();
</script>
