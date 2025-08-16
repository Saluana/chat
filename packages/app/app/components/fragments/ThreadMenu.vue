<template>
  <div class="p-1 bg-white dark:bg-black rounded-lg min-w-35">
    <div
      v-for="moreAction in moreActions"
      :key="moreAction.icon"
      class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800/70 font-semibold rounded cursor-pointer"
      @click="moreAction.action(thread)"
    >
      <UIcon :name="moreAction.icon" class="size-4" />
      <span>{{ moreAction.name }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ moreActions: any[]; thread: any }>();
</script>
