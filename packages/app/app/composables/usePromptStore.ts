export const usePromptStore = defineStore("prompt", () => {
  const currentModel = ref({
    label: "Gemini 2.5 Flash",
    apiModel: "google/gemini-2.5-flash",
    imageUploads: true,
    webSearch: true,
    pdfUploads: true,
    reasoningAbility: true,
    generateImage: false,
  });
  const thinkingBudget = ref({});
  const webSearch = ref(false);
  const { input: message } = useTextareaAutosize();
  const attachmentFiles = ref<File[]>([]);
  const attachmentTooltip = ref("Add an attachment");
  const responseStreaming = ref(false);

  function setCurrentModel(model: any) {
    currentModel.value = model;
  }

  function toggleResponseStreaming(value?: boolean) {
    if (value !== undefined) {
      responseStreaming.value = value;
    } else {
      responseStreaming.value = !responseStreaming.value;
    }
  }

  function setThinkingBudget(budget: any) {
    thinkingBudget.value = budget;
  }

  function toggleWebSearch() {
    webSearch.value = !webSearch.value;
  }

  function setMessage(msg: string) {
    message.value = msg;
  }

  function resetMessage() {
    message.value = "";
  }

  function setAttachmentFiles(newFiles: File[]) {
    attachmentFiles.value = newFiles;
  }

  function addAttachmentFile(file: File) {
    attachmentFiles.value.push(file);
  }

  function removeAttachmentFile(index: number) {
    if (index >= 0 && index < attachmentFiles.value.length) {
      attachmentFiles.value.splice(index, 1);
    } else {
      console.warn("Invalid index for removing attachment file");
    }
  }

  function clearAttachmentFiles() {
    attachmentFiles.value = [];
  }

  function setAttachmentTooltip() {
    const model = currentModel.value;
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

  const init = () => {
    setAttachmentTooltip();
  };

  init();

  return {
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
    addAttachmentFile,
    removeAttachmentFile,
    clearAttachmentFiles,
    setAttachmentTooltip,
    toggleResponseStreaming,
  };
});
