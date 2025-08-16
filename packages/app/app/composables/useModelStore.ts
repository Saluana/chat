export const useModelStore = defineStore("model", () => {
  const models = ref([
    {
      label: "DeepSeek: R1 0528 (free)",
      apiModel: "deepseek/deepseek-r1-0528:free",
      imageUploads: false,
      webSearch: false,
      pdfUploads: false,
      reasoningAbility: true,
      generateImage: false,
      keyPlatforms: ["openrouter"],
    },
    {
      label: "DeepSeek: R1 Distill Qwen 14B (free)",
      apiModel: "deepseek/deepseek-r1-distill-qwen-14b:free",
      imageUploads: false,
      webSearch: false,
      pdfUploads: false,
      reasoningAbility: true,
      generateImage: false,
      keyPlatforms: ["openrouter"],
    },
  ]);

  const modelsByCategory: Record<string, any> = ref({
    openrouter: {
      name: "OpenRouter",
      keyName: "openrouter",
      link: "https://openrouter.ai/keys",
      apiKey: "",
      image: "openrouter.ico",
      models: [],
      saving: false,
    },
  });

  const categorizeModels = () => {
    // Reset models arrays
    Object.values(modelsByCategory.value).forEach((category: any) => {
      category.models = [];
    });

    // Populate models by platform
    models.value.forEach((model) => {
      model.keyPlatforms.forEach((platform) => {
        if (platform in modelsByCategory.value) {
          modelsByCategory.value[platform].models.push(model);
        }
      });
    });
  };

  const saveApiKey = async (platform: string) => {
    const apiKey = modelsByCategory.value[platform].apiKey;
    await setApiKeyInKV(platform, apiKey);
  };

  const setApiKeyInKV = async (platform: string, key: string) => {
    const { $sync } = useNuxtApp();
    try {
      modelsByCategory.value[platform].saving = true;
      if (platform === "openrouter") {
        await $sync.setKV("openrouter_api_key", key);
      }
      showToast("Saved settings!");
    } catch (error) {
      console.error("Failed to save API key:", error);
    } finally {
      modelsByCategory.value[platform].saving = false;
    }
  };

  function setApiKey(platform: string, key: string) {
    if (platform in modelsByCategory.value) {
      modelsByCategory.value[platform].apiKey = key;
    }
  }

  if (import.meta.client) {
    const { $sync } = useNuxtApp();

    const fetchApiKeysFromKV = async () => {
      try {
        const savedOpenRouterKey = await $sync.getKV("openrouter_api_key");
        if (savedOpenRouterKey) {
          setApiKey("openrouter", savedOpenRouterKey);
        }
      } catch (error) {
        console.error("Failed to load API key:", error);
      }
    };

    fetchApiKeysFromKV();
  }
  // Run on initialization
  categorizeModels();

  return {
    models,
    modelsByCategory,
    setApiKey,
    saveApiKey,
  };
});
