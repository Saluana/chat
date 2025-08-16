<template>
  <div>
    <Reasoning
      class="mb-2"
      v-if="reasoning?.length && contentReady"
      :content="reasoning"
    />
    <div class="flex flex-col">
      <VueSpinnerDots
        v-if="message.stream_id && !reasoning?.length && !content?.length"
        class="w-10"
      />
      <MarkdownRenderer
        :content="content"
        :chunked="!!message.stream_id"
        variant="assistant"
        @rendered="onRendered"
      />
      <AssistantErrorMessage
        :error="message.error"
        v-if="!message.stream_id && message.error"
      />
    </div>
    <WebSearch v-if="message.webSearch" :content="message.webSearch" />
  </div>
</template>

<script setup lang="ts">
import { VueSpinnerDots } from "vue3-spinners";

const { message } = defineProps<{ message: any }>();
const content = computed(() =>
  message.stream_id ? streamContent.value : message.data?.content,
);
const reasoning = computed(() =>
  message.stream_id ? streamReasoning.value : message.data?.reasoning,
);
const streamContent = ref("");
const streamReasoning = ref("");
const { isReady, markReady, reset } = useRenderGate();
const contentReady = computed(() => isReady(message.id));
const onRendered = () => {
  markReady(message.id);
};
const config = useRuntimeConfig();

// TODO: make sure each http call is only made once for a tab
async function fetchStream(streamId: string, streamRef: Ref) {
  try {
    const streamUrl = `${config.public.apiUrl}/stream/${streamId}`;
    const response = await fetch(streamUrl);
    if (!response.ok) {
      throw new Error(`Stream error: ${response.status}`);
    }
    const reader = response.body?.getReader();
    if (!reader) return;
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      streamRef.value += chunk;
    }
  } catch (error) {
    console.error("Error streaming message:", error);
  }
}

watch(
  () => message.stream_id,
  (streamId) => {
    if (streamId) {
      reset(message.id);
      streamReasoning.value = "";
      streamContent.value = "";
      fetchStream(streamId, streamContent);
      fetchStream(streamId + "?reasoning=true", streamReasoning);
    }
  },
  {
    immediate: true,
  },
);
</script>
