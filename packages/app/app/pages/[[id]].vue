<template>
  <div
    v-if="currentThreadId && activeThreadObject && activeThreadObject.deleted"
  >
    <div
      class="flex flex-col items-center justify-center min-h-screen text-center gap-5"
    >
      <LoaderSpin :size="10" />
      <div v-if="!waiting" class="space-y-3">
        <h1 class="lg:text-lg">
          This chat may have been deleted or may not exist.
        </h1>
        <UButton label="New Chat" variant="subtle" size="lg" to="/" />
      </div>
    </div>
  </div>

  <div v-else class="h-full flex flex-col relative">
    <div class="overflow-y-auto flex-grow" ref="messagesContainer">
      <UContainer
        class="max-w-4xl h-auto flex flex-col"
        :class="[!currentThreadId ? 'mt-[250px]' : 'mt-0']"
      >
        <div
          v-if="!currentThreadId"
          class="flex-grow flex flex-col justify-center gap-6"
        >
          <div
            class="mb-4 text-center text-neutral-500 dark:text-neutral-300 space-y-3"
          >
            <span class="block text-3xl font-light"
              >{{ greeting }}, {{ userName }}</span
            >
            <span class="block text-4xl font-semibold"
              >How can I help you today?</span
            >
          </div>

          <ChatPrompt @send="sendMessage" />

          <!-- Show example prompts or questions based on selection -->
          <Transition name="pop">
            <div
              v-if="!selectedPrompt"
              class="flex justify-center flex-wrap mx-w-full mx-auto gap-3"
            >
              <button
                v-for="prompt in examplePrompts"
                :key="prompt.name"
                :class="[
                  'p-1 md:px-4 rounded-lg ring-1 ring-neutral-400/40 dark:ring-neutral-200/30 cursor-pointer w-auto',
                  'hover:bg-neutral-200/40 dark:bg-neutral-500/20 dark:hover:bg-neutral-500/30 text-neutral-500/80 dark:text-neutral-300/70 flex items-center gap-2',
                ]"
                @click="selectPrompt(prompt)"
              >
                <UIcon :name="prompt.icon" class="text-xl" />
                <span
                  class="text-md font-medium text-neutral-500 dark:text-neutral-300 break-words"
                >
                  {{ prompt.name }}
                </span>
              </button>
            </div>
          </Transition>

          <!-- Show questions for selected prompt -->

          <Transition name="pop">
            <div
              v-if="selectedPrompt"
              class="space-y-4 ring ring-neutral-300/80 dark:ring-neutral-200/20 bg-neutral-100/70 dark:bg-neutral-800/40 rounded-xl p-4"
            >
              <div class="flex items-center justify-between mb-4">
                <h3
                  class="font-medium text-neutral-600 dark:text-neutral-300 flex items-center gap-2"
                >
                  <UIcon :name="selectedPrompt.icon" class="text-lg" />
                  {{ selectedPrompt.name }}
                </h3>
                <UButton
                  icon="i-carbon:close"
                  variant="ghost"
                  size="md"
                  color="neutral"
                  @click="selectedPrompt = null"
                  class="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                />
              </div>

              <div class="space-y-3">
                <button
                  v-for="question in selectedPrompt.questions"
                  :key="question"
                  @click="sendMessage(question)"
                  class="w-full p-3 rounded-lg ring-1 ring-neutral-400/40 dark:ring-neutral-200/30 cursor-pointer hover:bg-neutral-200/40 dark:bg-neutral-500/20 dark:hover:bg-neutral-500/30 text-left flex items-center gap-3"
                >
                  <UIcon
                    name="i-proicons:search"
                    class="text-lg text-neutral-500 dark:text-neutral-300 flex-shrink-0"
                  />
                  <span class="text-sm text-neutral-600 dark:text-neutral-300">
                    {{ question }}
                  </span>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Display messages if there are any -->
        <div
          class="pt-20 flex flex-col gap-6"
          :style="{ paddingBottom: `${chatPromptHeight + 24}px` }"
        >
          <ChatMessage
            v-for="message in messagesList"
            :key="message.id"
            :message="message"
            @retryMessage="() => retryMessage(message.id)"
            @branchThread="() => branchThread(message.id)"
          />
          <div
            v-if="uploadingAttachment && currentThreadId"
            class="max-w-[80%] ml-auto flex items-center justify-between gap-2 p-3 rounded-lg ring-1 ring-primary-400/30 dark:ring-0 bg-primary-100/50 dark:bg-neutral-500/20"
          >
            <LoaderSpin :size="5" />
            <div class="text-blue-700 dark:text-blue-300">
              Uploading files & sending...
            </div>
          </div>

          <div ref="containerBottom" />
        </div>
      </UContainer>
    </div>

    <!-- Fixed chat input area at bottom -->
    <div
      v-if="currentThreadId"
      class="w-full absolute bottom-0 left-0 bg-transparent"
      ref="chatPromptContainer"
    >
      <!-- Scroll to bottom button -->
      <div
        v-if="!isAtBottom"
        class="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10"
      >
        <UButton
          label="Scroll to bottom"
          trailing-icon="i-carbon:chevron-down"
          variant="solid"
          color="neutral"
          class="px-2 rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 ring ring-neutral-300/20 text-neutral-500 dark:text-neutral-300/80"
          @click="scrollToBottom"
        />
      </div>

      <UContainer class="max-w-4xl px-1.5">
        <ChatPrompt :bottom="true" @send="sendMessage" />
      </UContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { uuidv4 } from "~/utils/uuid";
definePageMeta({
  layout: "chat",
});
const route = useRoute();
const threadsStore = useThreadsStore();
const { messagesList, activeThreadObject } = storeToRefs(threadsStore);
const promptStore = usePromptStore();
const { uploadingAttachment } = storeToRefs(promptStore);
const { $sync } = useNuxtApp();

const waiting = ref(true);
const currentThreadId = computed(() => route.params.id?.toString() || "");

onMounted(() =>
  setTimeout(() => {
    waiting.value = false;
  }, 3000),
);

onMounted(async () => {
  const endpoint = useRuntimeConfig().public.apiUrl;
  try {
    // Initialize sync service (websocket + pull) so sendMessage/newThread works
    await $sync.setAuthInfo(endpoint, "public");
  } catch (e) {
    console.error("Failed to initialize sync service", e);
  }
});

const userName = "User";

const selectedPrompt = ref<any>(null);

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
});

const examplePrompts = [
  {
    name: "Write",
    icon: "i-iconoir:edit-pencil",
    questions: [
      "Write a short story about a time traveler.",
      "Help me write a professional email.",
      "Create a poem about nature.",
    ],
  },
  {
    name: "Learn",
    icon: "i-iconoir:graduation-cap",
    questions: [
      "Explain quantum computing in simple terms.",
      "How does the stock market work?",
      "What are the basics of machine learning?",
    ],
  },
  {
    name: "Code",
    icon: "i-iconoir:code",
    questions: [
      "Help me debug this JavaScript function.",
      "Explain the difference between REST and GraphQL.",
      "Show me how to create a responsive CSS layout.",
    ],
  },
  {
    name: "Explore",
    icon: "i-iconoir:globe",
    questions: [
      "What are some recipes for a beginner cook?",
      "Suggest some travel destinations for a solo trip.",
      "What are some interesting science facts?",
    ],
  },
  {
    name: "Compare",
    icon: "i-carbon:scales",
    questions: [
      "Compare Python vs JavaScript for web development.",
      "What's the difference between iPhone and Android?",
      "Compare electric cars vs gasoline cars.",
    ],
  },
];

const selectPrompt = (prompt: any) => {
  selectedPrompt.value = prompt;
};

watch(
  () => route.params.id,
  async (newId) => {
    const newThreadId =
      typeof newId === "string" && newId.length > 0 ? newId : null;
    threadsStore.setActiveThread(newThreadId);
  },
  { immediate: true },
);

const { currentModel, thinkingBudget, webSearch, attachmentFiles, message } =
  storeToRefs(promptStore);

const sendMessage = async (text: string) => {
  const attachments = await (async () => {
    if (attachmentFiles.value.length) {
      promptStore.setUploadingAttachment(true);
    }

    const uploadedAttachments = [];
    if (attachmentFiles.value.length) {
      for (const file of attachmentFiles.value) {
        const response = await fetch(
          `${useRuntimeConfig().public.apiUrl}/blob`,
          {
            method: "PUT",
            headers: {
              "content-type": file.type,
            },
            body: file,
          },
        );
        uploadedAttachments.push({
          id: (await response.json()).id,
          name: file.name,
          type: file.type,
        });
      }
    }
    return uploadedAttachments;
  })();

  selectedPrompt.value = null;
  const currentThreadId = route.params.id as string | undefined;
  const options: any = {};
  if (currentModel.value?.apiModel) {
    options.name = currentModel.value.apiModel;
  }
  if (thinkingBudget.value && currentModel.value?.reasoningAbility) {
    options.thinkingBudget = thinkingBudget.value.toLowerCase();
  }
  if (webSearch.value && currentModel.value?.webSearch) {
    options.webSearch = webSearch.value;
  }
  if (!currentThreadId) {
    try {
      const newThreadResp = (await $sync.newThread({
        content: text,
        attachments,
        options,
      })) as any;
      const newThreadId = (newThreadResp &&
        (newThreadResp.threadId || newThreadResp.id)) as string;
      if (newThreadId) navigateTo(`/${newThreadId}`);
    } catch (error) {
      console.error("Failed to create new thread:", error);
    }
  } else {
    await $sync.sendMessage({
      threadId: currentThreadId,
      content: text,
      attachments,
      options,
    });
  }
  promptStore.resetMessage();
  promptStore.clearAttachmentFiles();
  promptStore.setUploadingAttachment(false);
};

const retryMessage = async (messageId: string) => {
  try {
    const options: any = {};
    if (currentModel.value?.apiModel) {
      options.name = currentModel.value.apiModel;
    }
    if (thinkingBudget.value && currentModel.value?.reasoningAbility) {
      options.thinkingBudget = thinkingBudget.value.toLowerCase();
    }
    await $sync.retryMessage(messageId, options);
  } catch (error) {
    console.error("Failed to retry message:", error);
    // TODO: Show error to user
  }
};

const branchThread = async (messageId: string) => {
  const newThreadId = uuidv4();
  navigateTo(`/${newThreadId}`);
  await $sync.branchThread(currentThreadId.value, messageId, newThreadId);
};

const messagesContainer = useTemplateRef("messagesContainer");
const messagesContainerBottom = useTemplateRef("containerBottom");
const chatPromptContainer = useTemplateRef("chatPromptContainer");
const { height: chatPromptHeight } = useElementBounding(chatPromptContainer);

const isAtBottom = useElementVisibility(messagesContainerBottom);

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};
</script>

<style scoped>
.appear-enter-active,
.appear-leave-active {
  transition: transform 0.1s ease-in-out;
}

.appear-enter-from,
.appear-leave-to {
  transform: scale(0.5);
}

.appear-enter-to,
.appear-leave-from {
  transform: scale(1);
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.1s ease-in-out;
}

.pop-enter-from,
.pop-leave-to {
  transform: scale(0.5);
}

.pop-enter-to,
.pop-leave-from {
  transform: scale(1);
}
</style>
