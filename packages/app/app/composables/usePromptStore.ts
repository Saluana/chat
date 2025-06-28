import { useModelStore } from "./useModelStore";
import { useThreadsStore } from "./useThreadsStore";

export interface Prompt {
  threadId: string;
  currentModel: object;
  thinkingBudget: string;
  webSearch: boolean;
  message: string | null;
  attachmentFiles: File[];
  attachmentTooltip: string;
  responseStreaming: boolean;
}

export const usePromptStore = defineStore("prompt", () => {
  const threadsStore = useThreadsStore();
  const modelStore = useModelStore();
  const { activeThread } = storeToRefs(threadsStore);

  const prompts = ref<Record<string, Prompt>>({});
  const defaultModel = modelStore.models[0];

  const { input: message } = useTextareaAutosize();

  watch(message, (newMessage) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].message = newMessage;
    }
  });

  const currentModel = ref<any>(defaultModel);

  watch(currentModel, (newModel) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].currentModel = newModel!;
      setAttachmentTooltip(threadId);
    }
  });

  function setCurrentModel(threadId: string | null) {
    currentModel.value = threadId
      ? prompts.value[threadId]?.currentModel || defaultModel
      : defaultModel;
  }

  watch(activeThread, (newThreadId) => {
    if (newThreadId) {
      initializePromptsFromThreads(newThreadId);
    }

    setCurrentModel(newThreadId);
    setAttachmentTooltip(newThreadId);
    setThinkingBudget(newThreadId);
    toggleWebSearch(newThreadId);
    setResponseStreaming(newThreadId);
    setAttachmentFiles(newThreadId);
    setMessage(newThreadId);
  });

  const thinkingBudget = ref("high");

  watch(thinkingBudget, (newBudget) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].thinkingBudget = newBudget;
    }
  });

  const webSearch = ref(false);

  watch(webSearch, (newWebSearch) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].webSearch = newWebSearch;
    }
  });

  const attachmentFiles = ref<File[]>([]);

  watch(attachmentFiles, (newFiles) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].attachmentFiles = newFiles;
    }
  });

  const attachmentTooltip = ref("Add an attachment");

  watch(attachmentTooltip, (newTooltip) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].attachmentTooltip = newTooltip;
    }
  });

  const responseStreaming = ref(false);

  watch(responseStreaming, (newStreaming) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].responseStreaming = newStreaming;
    }
  });

  function toggleResponseStreaming(value?: boolean) {
    if (value) {
      responseStreaming.value = value;
    } else {
      responseStreaming.value = !responseStreaming.value;
    }
  }

  function setResponseStreaming(threadId?: string | null) {
    const currentThreadId = threadId || activeThread.value;
    responseStreaming.value = currentThreadId
      ? prompts.value[currentThreadId]?.responseStreaming || false
      : false;
  }

  function setThinkingBudget(threadId: string | null) {
    thinkingBudget.value = threadId
      ? prompts.value[threadId]?.thinkingBudget || "high"
      : "high";
  }

  function toggleWebSearch(threadId?: string | null) {
    const currentThreadId = threadId || activeThread.value;
    webSearch.value = currentThreadId
      ? (prompts.value[currentThreadId]?.webSearch ?? false)
      : false;
  }

  function setMessage(threadId?: string | null) {
    message.value = threadId ? prompts.value[threadId]?.message || "" : "";
  }

  function resetMessage() {
    message.value = "";
  }

  function setAttachmentFiles(threadId?: string | null, newFiles?: File[]) {
    const currentThreadId = threadId || activeThread.value;
    if (newFiles) {
      attachmentFiles.value = newFiles;
    } else {
      attachmentFiles.value = currentThreadId
        ? prompts.value[currentThreadId]?.attachmentFiles || []
        : [];
    }
  }

  function removeAttachmentFile(index: number) {
    attachmentFiles.value = attachmentFiles.value || [];

    if (index >= 0 && index < attachmentFiles.value.length) {
      attachmentFiles.value.splice(index, 1);
    } else {
      console.warn("Invalid index for removing attachment file");
    }
  }

  function clearAttachmentFiles() {
    attachmentFiles.value = [];
  }

  function setAttachmentTooltip(threadId: string | null) {
    if (threadId && prompts.value[threadId]) {
      const model = prompts.value[threadId].currentModel as any;
      if (model.imageUploads && model.pdfUploads) {
        attachmentTooltip.value =
          "Add an attachment\nAccepts: Text, PNG, JPEG, GIF, PDF";
      } else if (model.imageUploads) {
        attachmentTooltip.value =
          "Add an attachment\nAccepts: Text, PNG, JPEG, GIF";
      } else if (model.pdfUploads) {
        attachmentTooltip.value = "Add an attachment\nAccepts: Text, PDF";
      } else {
        attachmentTooltip.value = "Add an attachment\nAccepts: Text";
      }
    }
  }

  function initializePromptsFromThreads(threadId: string) {
    if (!threadId) return;
    const messagesList = ref<any[]>([]);

    // Check if thread already exists in prompts
    if (prompts.value[threadId]) {
      return;
    }

    if (import.meta.client) {
      const { $sync } = useNuxtApp();
      $sync.getMessagesForThread?.(threadId).then((msgs: any[]) => {
        messagesList.value = msgs;

        const modelStore = useModelStore();
        const { models } = modelStore;

        // Take the last item from messagesList
        if (messagesList && messagesList.value.length > 0) {
          const lastMessage = messagesList.value[messagesList.value.length - 1];

          // Extract values with defaults
          let currentModel = defaultModel;
          if (lastMessage.current_model && models) {
            const matchedModel = models.find(
              (model) => model.label === lastMessage.current_model,
            );
            if (matchedModel) {
              currentModel = matchedModel;
            }
          }
          const thinkingBudget = lastMessage.thinking_budget || "high";
          const webSearch = lastMessage.web_search ?? false;

          // Initialize or update prompt object
          prompts.value[threadId] = {
            threadId,
            currentModel,
            thinkingBudget,
            webSearch,
            message: null,
            attachmentFiles: [],
            attachmentTooltip: "Add an attachment",
            responseStreaming: false,
          };
        }
      });
    }
  }

  return {
    prompts,
    currentModel,
    thinkingBudget,
    webSearch,
    message,
    attachmentFiles,
    attachmentTooltip,
    responseStreaming,
    setCurrentModel,
    setThinkingBudget,
    toggleWebSearch,
    setMessage,
    resetMessage,
    setAttachmentFiles,
    removeAttachmentFile,
    clearAttachmentFiles,
    setAttachmentTooltip,
    toggleResponseStreaming,
    initializePromptsFromThreads,
  };
});
