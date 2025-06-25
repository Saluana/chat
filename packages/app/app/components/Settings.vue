<template>
  <div
    class="w-full lg:min-w-200 p-4 lg:p-8 flex flex-col lg:flex-row justify-between items-stretch gap-5 lg:gap-10 bg-neutral-200/30 dark:bg-neutral-700/30 ring-0 ring-neutral-600 backdrop-blur-md shadow-lg rounded-xl"
  >
    <!-- user -->
    <div class="flex flex-col items-center gap-4 flex-1/3">
      <UAvatar
        :src="image"
        alt="Komal Tolambia"
        :ui="{
          root: 'w-20 h-20 lg:w-30 lg:h-30 bg-primary-800/80',
          fallback: 'text-white/80',
        }"
      />
      <div class="text-center space-y-1">
        <p class="font-semibold text-lg">{{ name }}</p>
        <p
          class="text-neutral-500 dark:text-neutral-300 cursor-pointer flex items-center gap-1"
        >
          {{ email }}
        </p>
      </div>
    </div>

    <!-- api key -->
    <div class="flex flex-col items-center gap-4 flex-2/3">
      <div
        class="bg-white/80 dark:bg-neutral-900 rounded-lg p-4 mx-auto w-full"
      >
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide:key" class="size-5" />
          <p class="text-lg">OpenRouter API Key</p>
        </div>

        <div class="flex flex-col items-start justify-center mt-6">
          <UInput
            v-model="openRouterKey"
            size="xl"
            placeholder="Your API Key"
            type="password"
            class="w-full"
            :ui="{
              base: 'ring-neutral-600/50 focus-visible:ring-neutral-500/80',
            }"
          />
          <p class="text-sm text-neutral-400 mt-1">
            Get your key from
            <NuxtLink
              to="https://openrouter.ai/keys"
              target="_blank"
              external
              class="text-primary-400 hover:text-primary-500"
              >OpenRouter console </NuxtLink
            >.
          </p>

          <UButton
            size="lg"
            color="primary"
            variant="subtle"
            label="Save"
            class="ml-auto mt-5"
            @click="saveApiKey('Open Router')"
            :loading="savingOpenRouter"
          />
        </div>
      </div>

      <div
        class="bg-white/80 dark:bg-neutral-900 rounded-lg p-4 mx-auto w-full"
      >
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide:key" class="size-5" />
          <p class="text-lg">Gemini API Key</p>
        </div>

        <div class="flex flex-col items-start justify-center mt-6">
          <UInput
            v-model="geminiKey"
            size="xl"
            placeholder="Your API Key"
            type="password"
            class="w-full"
            :ui="{
              base: 'ring-neutral-600/50 focus-visible:ring-neutral-500/80',
            }"
          />
          <p class="text-sm text-neutral-400 mt-1">
            Get your key from
            <NuxtLink
              to="https://aistudio.google.com/app/apikey"
              target="_blank"
              external
              class="text-primary-400 hover:text-primary-500"
              >Gemini console </NuxtLink
            >.
          </p>

          <UButton
            size="lg"
            color="primary"
            variant="subtle"
            label="Save"
            class="ml-auto mt-5"
            @click="saveApiKey('Gemini')"
            :loading="savingGemini"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useAuth().sessionState;
const name = computed(() => user.value.user?.name);
const image = computed(() => user.value.user?.image);
const email = computed(() => user.value.user?.email);
import showToast from "~/utils/showToast";

const { $sync } = useNuxtApp();
const apiKey = ref("");
const openRouterKey = ref("");
const geminiKey = ref("");
const saving = ref(false);
const savingOpenRouter = ref(false);
const savingGemini = ref(false);

// Load the API key on mount
onMounted(async () => {
  try {
    const savedOpenRouterKey = await $sync.getKV("openrouter_api_key");
    const savedGeminiKey = await $sync.getKV("gemini_api_key");
    if (savedOpenRouterKey) {
      openRouterKey.value = savedOpenRouterKey;
    }
    if (savedGeminiKey) {
      geminiKey.value = savedGeminiKey;
    }
  } catch (error) {
    console.error("Failed to load API key:", error);
  }
});

async function saveApiKey(type: string) {
  if (type === "Open Router") {
    if (!openRouterKey.value.trim()) {
      return;
    } else {
      savingOpenRouter.value = true;
    }
  }

  if (type === "Gemini") {
    if (!geminiKey.value.trim()) {
      return;
    } else {
      savingGemini.value = true;
    }
  }

  const keyToSave =
    type === "Open Router" ? openRouterKey.value : geminiKey.value;
  const keyName =
    type === "Open Router" ? "openrouter_api_key" : "gemini_api_key";
  try {
    await $sync.setKV(keyName, keyToSave);
    showToast("Saved settings!");
  } catch (error) {
    console.error("Failed to save API key:", error);
  } finally {
    savingOpenRouter.value = false;
    savingGemini.value = false;
  }
}
</script>
