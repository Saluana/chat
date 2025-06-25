<template>
  <UAlert :title="message" variant="subtle" color="error" />
</template>

<script setup lang="ts">
interface AssistantErrorMessageProps {
  message?: string;
}

const props = defineProps<AssistantErrorMessageProps>();
</script>
