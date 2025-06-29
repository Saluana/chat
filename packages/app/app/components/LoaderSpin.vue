<template>
  <div class="flex flex-col gap-2 items-center justify-center">
    <span
      v-if="props.text"
      class="text-primary text-sm text-center max-w-[60%]"
      >{{ props.text }}</span
    >
    <UIcon
      class="text-primary-400 animate-spin"
      :class="[`w-${props.size || 6}`, `h-${props.size || 6}`]"
      name="i-heroicons-arrow-path-20-solid"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text?: string;
  size?: number;
}>();
</script>
