<template>
  <UAlert
    :title="obj.message || 'Something went wrong'"
    variant="subtle"
    color="error"
  />
</template>

<script setup lang="ts">
interface AssistantErrorMessageProps {
  error?: string;
}
const { error } = defineProps<AssistantErrorMessageProps>();
const obj = computed(() => {
  try {
    return JSON.parse(error || "");
  } catch {
    return {};
  }
});
</script>
