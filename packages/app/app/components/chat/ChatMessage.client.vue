<template>
  <div class="flex flex-col">
    <!-- User message -->
    <div v-if="message.role === 'user'" class="flex justify-end mb-2 group">
      <div class="flex flex-col items-end space-y-2 w-full">
        <div
          v-if="!editUserMessage"
          class="max-w-[80%] flex p-3 rounded-lg ring-1 ring-primary-400/30 dark:ring-0 bg-primary-100/50 dark:bg-neutral-500/20"
        >
          <div class="flex flex-col text-md">
            <MarkdownRenderer :content="message.content" />
          </div>
        </div>

        <div
          v-if="editUserMessage"
          class="w-full max-w-[80%] flex p-3 rounded-lg bg-primary-100/40 dark:bg-neutral-800/50 ring-2 ring-primary-300/50 dark:ring-neutral-200/20"
        >
          <UTextarea
            :rows="1"
            :maxrows="8"
            autoresize
            :id="`message-input`"
            v-model="editedMessageContent"
            class="w-full"
            :ui="{
              base: 'p-0 pb-0.5 ring-0 focus-visible:ring-0 rounded-none bg-transparent',
              root: '',
            }"
            @keydown.enter.exact.prevent="saveMessage()"
            @update:model-value="updateUserMessage($event)"
          />
        </div>

        <!-- Action icons - shown on hover -->
        <div
          class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
        >
          <UTooltip
            v-for="actionItem in userMessageActions"
            :key="actionItem.icon"
            :text="actionItem.tooltip"
          >
            <UButton
              variant="ghost"
              size="sm"
              :icon="actionItem.icon"
              :color="(actionItem.color as any) || 'neutral'"
              class="hover:bg-primary-100/50 dark:hover:bg-primary-400/10"
              @click="actionItem.action"
            />
          </UTooltip>
        </div>
      </div>
    </div>

    <!-- Assistant message -->
    <div v-else class="flex justify-start mb-2 group">
      <div class="w-full p-3 space-y-2">
        <Reasoning v-if="message.reasoning" :content="message.reasoning" />
        <div class="flex flex-col">
          <StreamingMessage
            v-if="message.stream_id"
            :stream-id="message.stream_id"
          />
          <MarkdownRenderer :content="message.content" />
          <AssistantErrorMessage
            :error="message.error"
            v-if="!message.stream_id && message.error"
          />
        </div>
        <WebSearch v-if="message.webSearch" :content="message.webSearch" />

        <!-- Action icons - shown on hover -->
        <div
          class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
        >
          <UTooltip
            v-for="actionItem in assistantMessageActions"
            :key="actionItem.icon"
            :text="actionItem.tooltip"
          >
            <UButton
              v-if="actionItem"
              variant="ghost"
              size="sm"
              :icon="actionItem.icon"
              :color="actionItem.color || 'neutral'"
              class="hover:bg-primary-100/50 dark:hover:bg-primary-400/10"
              @click="actionItem.action"
            />
          </UTooltip>
        </div>
      </div>
    </div>

    <DeleteModal
      v-model="openDeleteModal"
      @cancelDelete="cancelDelete"
      @confirmDelete="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import showToast from "~/utils/showToast";

interface ChatMessageProps {
  message: any;
  showTimestamp?: boolean;
}

const props = withDefaults(defineProps<ChatMessageProps>(), {
  showTimestamp: false,
});
const emit = defineEmits(["retryMessage", "branchThread"]);
const promptStore = usePromptStore();
const { responseStreaming } = storeToRefs(promptStore);

const { $sync } = useNuxtApp();

const editUserMessage = ref(false);
const { input: editedMessageContent } = useTextareaAutosize();
const copiedState = ref(false);

const editMessage = (message: any) => {
  editUserMessage.value = !editUserMessage.value;
  if (editUserMessage.value) {
    editedMessageContent.value = message.content;
    requestAnimationFrame(() => {
      const input = document.getElementById(`message-input`);
      input?.focus();
    });
  }
};

const saveMessage = async () => {
  const newContent = editedMessageContent.value.trim();
  if (newContent && newContent !== props.message.content) {
    try {
      await $sync.updateMessage(props.message.id, {
        data: { ...toRaw(props.message.data), content: newContent },
      });
      showToast("Message updated successfully");
    } catch (error) {
      showToast("Failed to update message", "error");
    }
  }
  editUserMessage.value = false;
};

const updateUserMessage = (value: string) => {
  editedMessageContent.value = value;
};

const openDeleteModal = ref(false);

const userMessageActions = computed(() => [
  {
    icon: editUserMessage.value ? "i-lucide:check" : "i-lucide:edit",
    tooltip: editUserMessage.value ? "Save changes" : "Edit message",
    action: () => {
      editUserMessage.value ? saveMessage() : editMessage(props.message);
    },
  },
  ...(editUserMessage.value
    ? [
        {
          icon: "i-lineicons:xmark",
          tooltip: "Cancel edit",
          action: () => {
            editUserMessage.value = false;
            editedMessageContent.value = "";
          },
        },
      ]
    : []),
  {
    icon: "i-carbon:branch",
    tooltip: "Branch off",
    action: () => {
      emit("branchThread", props.message.id);
    },
  },
  {
    icon: copiedState.value ? "i-lucide:check" : "i-lucide:copy",
    tooltip: "Copy message",
    color: copiedState.value ? "success" : "neutral",
    action: async () => {
      if (copiedState.value) return;
      try {
        await navigator.clipboard.writeText(props.message.content);
        copiedState.value = true;
        setTimeout(() => {
          copiedState.value = false;
        }, 2000);
        showToast("Copied to clipboard");
      } catch (error) {
        showToast("Failed to copy to clipboard", "error");
      }
    },
  },
  {
    icon: "i-lucide:trash",
    tooltip: "Delete message",
    action: () => {
      openDeleteModal.value = true;
    },
  },
]);

const assistantMessageActions = computed(() => [
  {
    icon: "carbon:branch",
    tooltip: "Branch off",
    action: () => {
      emit("branchThread", props.message.id);
    },
  },
  props.message &&
    !props.message.stream_id &&
    !responseStreaming.value && {
      icon: "i-lucide:refresh-ccw",
      tooltip: "Retry message",
      action: () => {
        emit("retryMessage");
      },
    },
  {
    icon: copiedState.value ? "i-lucide:check" : "i-lucide:copy",
    tooltip: "Copy message",
    color: copiedState.value ? "success" : "neutral",
    action: async () => {
      if (copiedState.value) return;
      try {
        await navigator.clipboard.writeText(props.message.content);
        copiedState.value = true;
        setTimeout(() => {
          copiedState.value = false;
        }, 2000);
        showToast("Copied to clipboard");
      } catch (error) {
        showToast("Failed to copy to clipboard", "error");
      }
    },
  },
  {
    icon: "i-lucide:trash",
    tooltip: "Delete message",
    action: () => {
      openDeleteModal.value = true;
    },
  },
]);

const cancelDelete = () => {
  openDeleteModal.value = false;
};

const confirmDelete = async () => {
  try {
    await $sync.updateMessage(props.message.id, { deleted: true });
    showToast("Message deleted successfully");
  } catch (error) {
    showToast("Failed to delete message", "error");
  }
  openDeleteModal.value = false;
};
</script>
