import { useModelStore } from "./useModelStore";
import { useThreadsStore } from "./useThreadsStore";

export interface Prompt {
  threadId: string;
  currentModel: any;
  thinkingBudget: string;
  webSearch: boolean;
  message: string | null;
  attachmentFiles: File[];
  attachmentTooltip: string;
  uploadingAttachment?: boolean;
}

export const usePromptStore = defineStore("prompt", () => {
  const threadsStore = useThreadsStore();
  const modelStore = useModelStore();
  const { activeThread } = storeToRefs(threadsStore);

  const prompts = ref<Record<string, Prompt>>({});
  const defaultModel = modelStore.models[0];

  const uploadingAttachment = ref(false);

  watch(uploadingAttachment, (newValue) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].uploadingAttachment = newValue;
    }
  });

  function setUploadingAttachment(value: boolean) {
    uploadingAttachment.value = value;
  }

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
      prompts.value[threadId].currentModel = newModel;
      setAttachmentTooltip(threadId);
    }
  });

  function setCurrentModel(threadId: string) {
    currentModel.value = threadId
      ? prompts.value[threadId]?.currentModel || defaultModel
      : defaultModel;
  }

  const newChatId = ref("");

  function removeNewChatFromPrompts() {
    // if(newChatId.value === '') return;
    delete prompts.value?.[newChatId.value];
    newChatId.value = "";
  }

  watch(activeThread, (newThreadId) => {
    if (newThreadId && !newThreadId.split("-").includes("new")) {
      initializePromptsFromThreads(newThreadId);
    } else {
      // first step
      if (!newChatId.value) {
        newChatId.value = `new-${crypto.randomUUID()}`;
        prompts.value[newChatId.value] = {
          threadId: newChatId.value,
          currentModel: defaultModel,
          thinkingBudget: "high",
          webSearch: false,
          message: null,
          attachmentFiles: [],
          attachmentTooltip:
            "Add an attachment\nAccepts: Text, PNG, JPEG, GIF, PDF",
        };
        activeThread.value = newChatId.value;
      } else {
        const chatId = newChatId.value;
        activeThread.value = newChatId.value;
        setCurrentModel(chatId);
        setAttachmentTooltip(chatId);
        setThinkingBudget(chatId);
        setWebSearch(chatId);
        setAttachmentFiles(chatId);
        setMessage(chatId);
      }
    }
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

  function setThinkingBudget(threadId: string) {
    thinkingBudget.value = threadId
      ? prompts.value[threadId]?.thinkingBudget || "high"
      : "high";
  }

  function toggleWebSearch() {
    webSearch.value = !webSearch.value;
  }

  function setWebSearch(threadId?: string | null) {
    webSearch.value = threadId
      ? prompts.value[threadId]?.webSearch || false
      : false;
  }

  function setMessage(threadId?: string | null) {
    message.value = threadId ? prompts.value[threadId]?.message || "" : "";
  }

  function resetMessage() {
    message.value = "";
  }

  function setAttachmentFiles(threadId?: string | null) {
    const currentThreadId = threadId || activeThread.value;
    attachmentFiles.value = currentThreadId
      ? prompts.value[currentThreadId]?.attachmentFiles || []
      : [];
  }

  function addAttachmentFile(file: File) {
    attachmentFiles.value.push(file);
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
      resetValues(threadId);
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

          const chatId = newChatId.value;
          // Extract values with defaults
          let currentModel =
            prompts.value[chatId]?.currentModel || defaultModel;
          if (lastMessage.data.modelOptions && models) {
            const matchedModel = models.find(
              (model) => model.label === lastMessage.data.modelOptions.name,
            );
            if (matchedModel) {
              currentModel = matchedModel;
            }
          }

          const thinkingBudget =
            lastMessage.data?.modelOptions?.thinkingBudget ||
            prompts.value[chatId]?.thinkingBudget ||
            "high";
          const webSearch =
            lastMessage.data?.modelOptions?.webSearch ||
            prompts.value[chatId]?.webSearch ||
            false;

          // Initialize or update prompt object
          prompts.value[threadId] = {
            threadId,
            currentModel,
            thinkingBudget,
            webSearch,
            message: null,
            attachmentFiles: [],
            attachmentTooltip:
              prompts.value[chatId]?.attachmentTooltip || "Add an attachment",
          };

          resetValues(threadId);
          removeNewChatFromPrompts();
        } else {
          resetMessage();
          clearAttachmentFiles();
          const chatId = newChatId.value;
          setCurrentModel(chatId);
          setAttachmentTooltip(chatId);
          setThinkingBudget(chatId);
          setWebSearch(chatId);
          setAttachmentFiles(chatId);
        }
      });
    }
  }

  function resetValues(threadId: string) {
    setCurrentModel(threadId);
    setAttachmentTooltip(threadId);
    setThinkingBudget(threadId);
    setWebSearch(threadId);
    setAttachmentFiles(threadId);
    setMessage(threadId);
  }

  return {
    prompts,
    currentModel,
    thinkingBudget,
    webSearch,
    message,
    attachmentFiles,
    attachmentTooltip,
    uploadingAttachment,
    setUploadingAttachment,
    removeNewChatFromPrompts,
    setCurrentModel,
    setThinkingBudget,
    toggleWebSearch,
    setMessage,
    resetMessage,
    setAttachmentFiles,
    addAttachmentFile,
    removeAttachmentFile,
    clearAttachmentFiles,
    setAttachmentTooltip,
    initializePromptsFromThreads,
  };
});
