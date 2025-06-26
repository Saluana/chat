<template>
  <div>
    <VueSpinnerDots v-if="!(content.length > 0)" class="w-10" />
    <MarkdownRenderer :content="content" />
  </div>
</template>

<script setup lang="ts">
import { VueSpinnerDots } from "vue3-spinners";
const props = defineProps<{ streamId: string }>();
const content = ref("");
const isStreaming = ref(true);
const config = useRuntimeConfig();
const promptStore = usePromptStore();
// TODO: make sure each http call is only made once for a tab

onMounted(async () => {
  try {
    const streamUrl = `${config.public.apiUrl}/stream/${props.streamId}`;
    const response = await fetch(streamUrl);
    promptStore.toggleResponseStreaming(true);
    if (!response.ok) {
      throw new Error(`Stream error: ${response.status}`);
    }
    const reader = response.body?.getReader();
    if (!reader) return;
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        isStreaming.value = false;
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      content.value += chunk;
    }
  } catch (error) {
    console.error("Error streaming message:", error);
    isStreaming.value = false;
  } finally {
    promptStore.toggleResponseStreaming(false);
  }
});
</script>
