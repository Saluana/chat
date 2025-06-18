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
    <div
      class="bg-white/80 dark:bg-neutral-900 rounded-lg p-4 mx-auto flex-2/3"
    >
      <div class="flex items-center gap-2 font-semibold">
        <UIcon name="i-lucide:key" class="size-6" />
        <p class="text-xl">API Key</p>
      </div>
      <p class="text-neutral-400 mt-1">
        Bring your own 'OpenRouter' Key to use select models.
      </p>

      <div class="flex flex-col items-start justify-center mt-6">
        <UInput
          v-model="apiKey"
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
          @click="saveApiKey"
          :loading="saving"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useAuth().sessionState;
const name = computed(() => user.value.user?.name);
const image = computed(() => user.value.user?.image);
const email = computed(() => user.value.user?.email);
const toast = useToast();

const { $sync } = useNuxtApp();
const apiKey = ref("");
const saving = ref(false);

// Load the API key on mount
onMounted(async () => {
  try {
    const savedKey = await $sync.getKV("openrouter_api_key");
    if (savedKey) {
      apiKey.value = savedKey;
    }
  } catch (error) {
    console.error("Failed to load API key:", error);
  }
});

async function saveApiKey() {
  if (!apiKey.value.trim()) {
    return;
  }

  saving.value = true;
  try {
    await $sync.setKV("openrouter_api_key", apiKey.value);
    toast.add({
      title: "Saved settings!",
      icon: "i-lucide:check-circle",
      duration: 2000,
      close: {
        class: "hidden",
      },
    });
  } catch (error) {
    console.error("Failed to save API key:", error);
  } finally {
    saving.value = false;
  }
}
</script>
