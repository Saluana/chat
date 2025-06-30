export const useModelStore = defineStore("model", () => {
  const models = ref([
    {
      label: "Gemini 2.5 Flash",
      apiModel: "google/gemini-2.5-flash",
      imageUploads: true,
      webSearch: true,
      pdfUploads: true,
      reasoningAbility: true,
      generateImage: false,
      keyPlatforms: ["gemini", "openrouter"],
    },
    {
      label: "Gemini 2.5 Pro Preview 06-05",
      apiModel: "google/gemini-2.5-pro-preview-06-05",
      imageUploads: true,
      webSearch: true,
      pdfUploads: true,
      reasoningAbility: true,
      generateImage: false,
      keyPlatforms: ["gemini", "openrouter"],
    },
    {
      label: "o4 mini",
      apiModel: "openai/o4-mini",
      imageUploads: true,
      webSearch: false,
      pdfUploads: false,
      reasoningAbility: true,
      generateImage: false,
      keyPlatforms: ["openai", "openrouter"],
    },
    {
      label: "Claude 4 Sonnet",
      apiModel: "anthropic/claude-sonnet-4",
      imageUploads: true,
      webSearch: false,
      pdfUploads: true,
      reasoningAbility: true,
      generateImage: false,
      keyPlatforms: ["anthropic", "openrouter"],
    },
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
    {
      label: "Gemini 2.0 Flash Experimental (free)",
      apiModel: "google/gemini-2.0-flash-exp:free",
      imageUploads: true,
      webSearch: true,
      pdfUploads: true,
      reasoningAbility: false,
      generateImage: false,
      keyPlatforms: ["gemini", "openrouter"],
    },
  ]);

  const modelsByCategory: Record<string, any> = ref({
    gemini: {
      name: "Gemini",
      keyName: "gemini",
      link: "https://aistudio.google.com/app/apikey",
      apiKey: "",
      icon: "i-material-icon-theme:gemini-ai",
      models: [],
      saving: false,
    },
    openai: {
      name: "OpenAI",
      keyName: "openai",
      link: "https://platform.openai.com/api-keys",
      apiKey: "",
      icon: "i-ri:openai-fill",
      models: [],
      saving: false,
    },
    anthropic: {
      name: "Anthropic",
      keyName: "anthropic",
      link: "https://console.anthropic.com/settings/keys",
      apiKey: "",
      icon: "i-ri:anthropic-fill",
      models: [],
      saving: false,
    },
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
      } else if (platform === "gemini") {
        await $sync.setKV("gemini_api_key", key);
      } else if (platform === "openai") {
        await $sync.setKV("openai_api_key", key);
      } else if (platform === "anthropic") {
        await $sync.setKV("anthropic_api_key", key);
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

        const savedGeminiKey = await $sync.getKV("gemini_api_key");
        if (savedGeminiKey) {
          setApiKey("gemini", savedGeminiKey);
        }

        const savedOpenaiKey = await $sync.getKV("openai_api_key");
        if (savedOpenaiKey) {
          setApiKey("openai", savedOpenaiKey);
        }

        const savedAnthropicKey = await $sync.getKV("anthropic_api_key");
        if (savedAnthropicKey) {
          setApiKey("anthropic", savedAnthropicKey);
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
