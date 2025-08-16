import modelsService, {
  type OpenRouterModel,
  type PriceBucket,
} from "~/utils/models-service";

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

  // Model catalog placeholder must be declared before categorization runs so
  // categorizeModels can include fetched models in its pool during store init.
  const catalog = ref<OpenRouterModel[]>([]);

  const categorizeModels = () => {
    // Reset models arrays
    Object.values(modelsByCategory.value).forEach((category: any) => {
      category.models = [];
    });

    // Build a single pool combining any hardcoded 'models' and the fetched 'catalog'
    // This allows the UI (accordion pills, selectors) to show fetched models as well.
    const pool = [...models.value, ...catalog.value];

    // Populate models by platform, avoid duplicates by `id` when present
    pool.forEach((model: any) => {
      const platforms: string[] = model.keyPlatforms || [];
      platforms.forEach((platform) => {
        if (platform in modelsByCategory.value) {
          const list = modelsByCategory.value[platform].models as any[];
          const hasId = typeof model.id === "string" && model.id.length > 0;
          const exists = hasId
            ? list.some((m) => m && m.id === model.id)
            : false;
          if (!exists) list.push(model);
        }
      });
    });
  };

  const saveApiKey = async (platform: string) => {
    const apiKey = modelsByCategory.value[platform].apiKey;
    // persist locally for immediate UX and client-run usage
    if (platform === "openrouter" && typeof window !== "undefined") {
      if (apiKey) localStorage.setItem("openrouter_api_key", apiKey);
      else localStorage.removeItem("openrouter_api_key");
      try {
        window.dispatchEvent(new CustomEvent("openrouter:connected"));
      } catch {}
    }
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

  // Re-categorize whenever fetched catalog changes so UI updates reactively
  try {
    watch(catalog, () => {
      categorizeModels();
    });
  } catch (e) {
    // watch may not be available in some test environments; swallow safely
  }

  const selectedModelIds = ref<string[]>([]);
  const searchQuery = ref("");
  const filters = ref<{
    input?: string[];
    output?: string[];
    minContext?: number;
    parameters?: string[];
    price?: PriceBucket;
  }>({});

  const selectedModels = computed(() =>
    catalog.value.filter((m) => selectedModelIds.value.includes(m.id)),
  );

  const filteredCatalog = computed(() => {
    let list = [...catalog.value];
    if (searchQuery.value)
      list = modelsService.filterByText(list, searchQuery.value);
    if (filters.value.input?.length || filters.value.output?.length) {
      list = modelsService.filterByModalities(list, {
        input: filters.value.input,
        output: filters.value.output,
      });
    }
    if (filters.value.minContext)
      list = modelsService.filterByContextLength(
        list,
        filters.value.minContext,
      );
    if (filters.value.parameters?.length)
      list = modelsService.filterByParameters(list, filters.value.parameters);
    if (filters.value.price)
      list = modelsService.filterByPriceBucket(list, filters.value.price);
    return list;
  });

  async function fetchModels(opts?: { force?: boolean; ttlMs?: number }) {
    const list = await modelsService.fetchModels(opts);
    catalog.value = list;
    // Update categorized lists so fetched models show up in UI sections
    categorizeModels();
    return list;
  }

  function filterModels(
    q: string,
    f?: Partial<{
      input: string[];
      output: string[];
      minContext: number;
      parameters: string[];
      price: PriceBucket;
    }>,
  ) {
    searchQuery.value = q || "";
    filters.value = { ...filters.value, ...(f || {}) };
    return filteredCatalog.value;
  }

  function toggleSelected(id: string) {
    const i = selectedModelIds.value.indexOf(id);
    if (i >= 0) selectedModelIds.value.splice(i, 1);
    else selectedModelIds.value.push(id);
  }

  function saveSelectionLocal() {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem(
        "openrouter_selected_models",
        JSON.stringify(selectedModelIds.value),
      );
    } catch {}
  }

  async function saveSelection() {
    saveSelectionLocal();
    try {
      const { $sync } = useNuxtApp();
      await $sync.setKV(
        "openrouter_selected_models",
        JSON.stringify(selectedModelIds.value),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      showToast?.("Saved model selection!");
    } catch (e) {
      console.error("Failed to save selection to KV", e);
    }
  }

  function loadSelectionLocal(): string[] | null {
    try {
      if (typeof window === "undefined") return null;
      const raw = localStorage.getItem("openrouter_selected_models");
      if (!raw) return null;
      const arr = JSON.parse(raw);
      return Array.isArray(arr)
        ? arr.filter((x) => typeof x === "string")
        : null;
    } catch {
      return null;
    }
  }

  async function loadSelection() {
    // Prefer KV when available; use local as immediate fallback
    const local = loadSelectionLocal();
    if (local) selectedModelIds.value = [...new Set(local)];
    try {
      const { $sync } = useNuxtApp();
      const kv = await $sync.getKV("openrouter_selected_models");
      if (typeof kv === "string" && kv.length) {
        const arr = JSON.parse(kv);
        if (Array.isArray(arr)) {
          selectedModelIds.value = [
            ...new Set(arr.filter((x: unknown) => typeof x === "string")),
          ] as string[];
        }
        saveSelectionLocal(); // keep local in sync
      }
    } catch (e) {
      // KV may be unavailable offline; local already applied
      console.warn("KV not available for selected models", e);
    }
    return selectedModelIds.value;
  }

  // Client bootstrap: restore selection ASAP on load
  if (import.meta.client) {
    // Run after this setup function has defined refs and functions
    queueMicrotask(() => {
      try {
        const local = loadSelectionLocal();
        if (local) selectedModelIds.value = [...new Set(local)];
      } catch {}
      // Then fetch from KV in background
      void loadSelection();
    });
  }

  return {
    models,
    modelsByCategory,
    setApiKey,
    saveApiKey,
    setApiKeyInKV,
    // catalog & selection
    catalog,
    selectedModelIds,
    selectedModels,
    filteredCatalog,
    fetchModels,
    filterModels,
    toggleSelected,
    saveSelection,
    loadSelection,
  };
});
