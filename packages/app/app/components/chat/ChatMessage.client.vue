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
            <vue-markdown
              class="prose dark:prose-invert"
              :source="message.content"
            />
          </div>
        </div>

        <div
          v-if="editUserMessage"
          class="w-full max-w-[80%] flex p-3 rounded-lg ring-0 dark:ring-0 bg-primary-100/50 dark:bg-neutral-700/20 shadow-[inset_0_0px_5px_rgba(42,71,189)] dark:shadow-[inset_0_0px_5px_rgba(140,140,140)]"
        >
          <UInput
            :id="`message-input`"
            v-model="editedMessageContent"
            class="w-full"
            :ui="{
              base: 'p-0 pb-0.5 ring-0 focus-visible:ring-0 rounded-none bg-transparent',
              root: '',
            }"
            @keydown.enter="saveMessage($event)"
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
              :color="actionItem.color || 'neutral'"
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
          <vue-markdown
            class="prose dark:prose-invert"
            v-else
            :source="message.content"
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

    <VueSpinnerDots v-if="loading" class="w-10 my-10" />
    <DeleteModal
      v-model="openDeleteModal"
      @cancelDelete="cancelDelete"
      @confirmDelete="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { VueSpinnerDots } from "vue3-spinners";
import VueMarkdown from "vue-markdown-render";

interface ChatMessageProps {
  message: any;
  loading: boolean;
  showTimestamp?: boolean;
}

const props = withDefaults(defineProps<ChatMessageProps>(), {
  showTimestamp: false,
});
const emit = defineEmits(["retryMessage", "branchThread"]);

const editUserMessage = ref(false);
const editedMessageContent = ref("");
const copiedState = ref(false);

const editMessage = (message) => {
  editUserMessage.value = !editUserMessage.value;
  if (editUserMessage.value) {
    editedMessageContent.value = message.content;
    requestAnimationFrame(() => {
      const input = document.getElementById(`message-input`);
      input?.focus();
    });
  }
};

const saveMessage = (event) => {
  props.message.content =
    editedMessageContent.value.trim() || props.message.content;
  editUserMessage.value = false;
  //logic to send the new message
};

const updateUserMessage = (event) => {
  //logic to update the user message
  editedMessageContent.value = event.target.value;
};

const toast = useToast();

const openDeleteModal = ref(false);

const userMessageActions = computed(() => [
  {
    icon: "i-lucide:edit",
    tooltip: "Edit message",
    action: () => {
      editMessage(props.message);
    },
  },
  {
    icon: "carbon:branch",
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
      if (copiedState.value) return; // Disable copying while check icon is shown

      try {
        await navigator.clipboard.writeText(props.message.content);
        copiedState.value = true;
        setTimeout(() => {
          copiedState.value = false;
        }, 2000);
        toast.add({
          title: "Copied to clipboard",
          icon: "i-lucide:check-circle",
          duration: 2000,
          close: {
            class: "hidden",
          },
        });
      } catch (error) {
        toast.add({
          title: "Failed to copy to clipboard",
          icon: "i-lucide:x-circle",
          color: "red",
          duration: 2000,
          close: {
            class: "hidden",
          },
        });
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
  {
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
      if (copiedState.value) return; // Disable copying while check icon is shown

      try {
        await navigator.clipboard.writeText(props.message.content);
        copiedState.value = true;
        setTimeout(() => {
          copiedState.value = false;
        }, 2000);
        toast.add({
          title: "Copied to clipboard",
          icon: "i-lucide:check-circle",
          duration: 2000,
          close: {
            class: "hidden",
          },
        });
      } catch (error) {
        toast.add({
          title: "Failed to copy to clipboard",
          icon: "i-lucide:x-circle",
          color: "red",
          duration: 2000,
          close: {
            class: "hidden",
          },
        });
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
  threadToDelete.value = null;
};

const confirmDelete = () => {
  // delete logic here
  console.log("Deleting thread:", threadToDelete.value);
  openDeleteModal.value = false;
  threadToDelete.value = null;
};
</script>
