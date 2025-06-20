<template>
  <div class="h-full flex flex-col relative">
    <div
      class="overflow-y-auto flex-grow"
      ref="messagesContainer"
      @scroll="handleScroll"
    >
      <UContainer
        class="max-w-4xl h-auto flex flex-col"
        :class="[!currentThreadId ? 'mt-[200px]' : 'mt-0']"
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

          <ChatPrompt
            @send="sendMessage"
            :messages="messagesList"
            @model-change="handleModelChange"
            @thinking-budget-change="handleThinkingBudgetChange"
          />

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
            v-for="(message, index) in messagesList"
            :key="index"
            :message="message"
            :loading="loading"
            @retryMessage="() => retryMessage(message.id)"
            @branchThread="() => branchThread(message.id)"
          />
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
        <ChatPrompt
          :bottom="true"
          @send="sendMessage"
          :messages="messagesList"
          @model-change="handleModelChange"
          @thinking-budget-change="handleThinkingBudgetChange"
        />
      </UContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "chat",
});

const route = useRoute();
const threadsStore = useThreadsStore();
const { $sync } = useNuxtApp();

onMounted(async () => {
  const endpoint = useRuntimeConfig().public.apiUrl;
  const token = getAccessToken();
  if (token && endpoint) {
    $sync.setAuthInfo(endpoint, token as string);
  } else {
    console.error("Missing token or API endpoint for WebSocket connection.");
  }
});

const { messagesList } = storeToRefs(threadsStore);
const session = useAuth().sessionState;
const userName = computed(() => session.value.user?.name.split(" ")[0]);

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

const loading = ref(false);

watch(
  () => route.params.id,
  async (newId) => {
    const newThreadId = newId as string | null;
    threadsStore.setActiveThread(newThreadId);
  },
  { immediate: true },
);

const currentThreadId = computed(() => route.params.id?.toString() || "");

// State for current model and thinking budget
const currentModel = ref<any>({});
const currentThinkingBudget = ref<string>();

// Handlers for model and thinking budget changes
const handleModelChange = (model: any) => {
  currentModel.value = model;
};

const handleThinkingBudgetChange = (budget: string) => {
  currentThinkingBudget.value = budget;
};

// Update sendMessage to store messages in the store
const sendMessage = async (text: string) => {
  selectedPrompt.value = null;

  const currentThreadId = route.params.id as string | undefined;

  // Prepare options with current model and thinking budget
  const options: any = {};
  if (currentModel.value?.apiModel) {
    options.model = currentModel.value.apiModel;
  }
  if (currentThinkingBudget.value && currentModel.value?.reasoningAbility) {
    options.thinkingBudget = currentThinkingBudget.value;
  }

  if (!currentThreadId) {
    try {
      // Title can be derived or passed explicitly if available
      const { threadId: newThreadId } = await $sync.newThread({
        messageContent: text,
        model: options.model,
        thinkingBudget: options.thinkingBudget,
      });
      navigateTo(`/${newThreadId}`);
    } catch (error) {
      console.error("Failed to create new thread:", error);
      // TODO: Show error to user
    }
  } else {
    await $sync.sendMessage(currentThreadId, { content: text }, options);
  }
};

// Retry message function
const retryMessage = async (messageId: string) => {
  try {
    // Prepare options with current model and thinking budget
    const options: any = {};
    if (currentModel.value?.apiModel) {
      options.model = currentModel.value.apiModel;
    }
    if (currentThinkingBudget.value && currentModel.value?.reasoningAbility) {
      options.thinkingBudget = currentThinkingBudget.value;
    }

    await $sync.retryMessage(messageId, options);
  } catch (error) {
    console.error("Failed to retry message:", error);
    // TODO: Show error to user
  }
};

const branchThread = async (messageId: string) => {
  const newThreadId = crypto.randomUUID();
  navigateTo(`/${newThreadId}`);
  await $sync.branchThread(currentThreadId.value, messageId, newThreadId);
};

const messagesContainer = ref<HTMLElement>();
const chatPromptContainer = ref<HTMLElement>();
const isAtBottom = ref(true);
const chatPromptHeight = ref(0);

onMounted(() => {
  handleScroll();
  updateChatPromptHeight();
});

// watch(
//   messagesList,
//   () => {
//     nextTick(() => {
//       handleScroll();
//       updateChatPromptHeight();
//     });
//   },
//   { deep: true },
// );

const updateChatPromptHeight = () => {
  nextTick(() => {
    if (chatPromptContainer.value) {
      chatPromptHeight.value = chatPromptContainer.value.offsetHeight;
    }
  });
};

let resizeObserver: ResizeObserver;
onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    updateChatPromptHeight();
  });
  if (chatPromptContainer.value) {
    resizeObserver.observe(chatPromptContainer.value);
  }
});

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect();
});

const handleScroll = () => {
  if (messagesContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value;
    isAtBottom.value = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold
  }
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    handleScroll();
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
