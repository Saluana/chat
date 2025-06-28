<template>
  <div
    class="backdrop-blur-md bg-neutral-100/80 dark:bg-neutral-800/60 ring-neutral-300/80 dark:ring-neutral-200/20"
    :class="[!bottom ? 'rounded-xl ring-1' : 'rounded-t-xl ring-2']"
  >
    <div class="p-2 px-3 rounded-t-xl w-full h-full">
      <!-- Selected files preview -->
      <div
        v-if="attachmentFiles.length > 0"
        class="mb-3 flex overflow-x-auto py-2 gap-3 scrollbar-custom"
      >
        <div
          v-for="(file, index) in attachmentFiles"
          :key="index"
          class="relative flex-shrink-0"
        >
          <div
            v-if="file.type.startsWith('image/')"
            class="w-16 h-16 rounded-md overflow-hidden bg-neutral-200 dark:bg-neutral-600"
          >
            <img
              :src="getImagePreview(file)"
              :alt="file.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div
            v-else
            class="w-16 h-16 rounded-md bg-neutral-200/80 dark:bg-neutral-700 flex flex-col items-center justify-center"
          >
            <div class="text-lg">
              {{ file.type === "application/pdf" ? "📄" : "📄" }}
            </div>
            <span
              class="text-xs text-neutral-600 dark:text-neutral-400 truncate w-full text-center px-1"
              >{{ file.name }}</span
            >
          </div>
          <UButton
            @click="removeFile(index)"
            variant="ghost"
            icon="i-heroicons:x-mark"
            size="xs"
            color="neutral"
            class="absolute -top-2 -right-2 bg-neutral-900 dark:bg-neutral-200 hover:bg-neutral-900 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm p-0.5 dark:neutral-800 rounded-full z-20 dark:border-neutral-800"
          />
        </div>
      </div>

      <UTextarea
        v-model="message"
        autoresize
        :maxrows="8"
        placeholder="Type your message here..."
        :ui="{
          root: 'w-full py-2',
          base: 'p-0 bg-transparent ring-0 w-full focus-visible:ring-0 text-md placeholder:text-black/40 dark:placeholder:text-white/40 text-black dark:text-white',
        }"
        @keydown.enter.exact.prevent="handleSubmit"
      />
      <div class="py-1 flex justify-between">
        <div class="space-x-2 flex items-center">
          <ModelSelector @changeModel="changeModel" />

          <ReasoningBudget v-if="currentModel.reasoningAbility" />

          <UButton
            v-if="currentModel.webSearch"
            @click="toggleWebSearch"
            variant="subtle"
            icon="i-heroicons:globe-alt"
            label="Search"
            size="sm"
            :color="webSearch ? 'primary' : 'neutral'"
            class="chat-prompt-icons"
            :class="[
              webSearch
                ? 'text-neutral-800! dark:text-white! bg-primary-400/20 dark:bg-primary-500/20'
                : '',
            ]"
          />

          <UTooltip :text="attachmentTooltip">
            <div>
              <UButton
                @click="openFileExplorer"
                variant="subtle"
                icon="i-iconoir:attachment"
                size="sm"
                color="neutral"
                class="chat-prompt-icons"
              />
            </div>
          </UTooltip>
        </div>

        <div></div>
        <UTooltip
          :disabled="!!message.trim() && !responseStreaming"
          :text="
            responseStreaming
              ? 'Stop response generation'
              : 'Message requires text'
          "
        >
          <UButton
            @click="handleSubmit"
            variant="subtle"
            :icon="
              responseStreaming
                ? 'i-material-symbols:stop-rounded'
                : 'i-lucide:arrow-up'
            "
            :disabled="!message.trim() && !responseStreaming"
            size="md"
            :ui="{
              base: 'disabled:bg-primary-500/50 disabled:dark:bg-primary-400/20 bg-primary-800/80 hover:bg-primary-800/70 dark:bg-primary-700/30 hover:dark:bg-primary-700/20 disabled:dark:text-white/40 text-white/80',
            }"
          />
        </UTooltip>
      </div>
    </div>

    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      multiple
      class="hidden"
      @change="handleFileSelection"
      :accept="acceptedFileTypes"
    />
  </div>
</template>

<script setup lang="ts">
const promptStore = usePromptStore();
const { message } = storeToRefs(promptStore);
const { responseStreaming } = storeToRefs(promptStore);
const emit = defineEmits(["send"]);

const handleSubmit = () => {
  if (responseStreaming.value) {
    promptStore.toggleResponseStreaming();
    // logic for stopping the response generation
  } else {
    if (message.value.trim()) {
      emit("send", message.value);
      promptStore.resetMessage();
    }
  }
};

const { bottom } = defineProps({
  bottom: {
    type: Boolean,
    default: () => false,
  },
});

const { attachmentTooltip } = storeToRefs(promptStore);
const { currentModel } = storeToRefs(promptStore);
const { webSearch } = storeToRefs(promptStore);

const changeModel = (model: any) => {
  if (!model.webSearch) promptStore.toggleWebSearch();
  if (
    !model.imageUploads === currentModel.value.imageUploads ||
    !model.pdfUploads === currentModel.value.pdfUploads
  ) {
    promptStore.clearAttachmentFiles();
  }
};

const fileInput = ref<HTMLInputElement>();
const { attachmentFiles } = storeToRefs(promptStore);

const openFileExplorer = () => {
  fileInput.value?.click();
};

const handleFileSelection = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    [...files].forEach((file) => promptStore.addAttachmentFile(file));
    (event.target as HTMLInputElement).value = "";
  }
};

const getImagePreview = (file: File) => {
  return URL.createObjectURL(file);
};

const removeFile = (index: number) => {
  promptStore.removeAttachmentFile(index);
};

const acceptedFileTypes = computed(() => {
  const model = currentModel.value as any;
  const types = ["text/*"];
  if (model.imageUploads) {
    types.push("image/png", "image/jpeg", "image/webp");
  }
  if (model.pdfUploads) {
    types.push("application/pdf");
  }
  return types.join(",");
});

const toggleWebSearch = () => {
  promptStore.toggleWebSearch();
};
</script>
