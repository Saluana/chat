<template>
  <USelectMenu
    v-model="currentModel"
    :searchInput="false"
    color="neutral"
    variant="ghost"
    :items="selectorItems"
    :content="{ align: 'start' }"
    :ui="{
      base: 'w-auto cursor-pointer text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white light:hover:bg-neutral-200 dark:hover:bg-neutral-700/70',
      label: 'text-xs',
      input: 'border-none text-black data-highlighted:text-black',
      content: 'w-auto max-h-200 dark:bg-black px-2',
      item: 'text-neutral-700 dark:text-neutral-400 my-2 data-highlighted:bg-neutral-100 dark:data-highlighted:bg-neutral-800 rounded-md',
      itemTrailingIcon: 'font-bold',
    }"
  >
    <template #item="{ item }">
      <div class="flex items-center justify-between gap-2 w-full">
        <span>{{ item.label }}</span>
        <div class="flex items-center gap-1.5 ml-2">
          <UTooltip
            v-for="icon in getModelIcons(item)"
            :key="icon.ability"
            :text="icon.tooltip"
          >
            <div
              class="rounded-md flex items-center justify-center p-1"
              :class="[icon.bgColor]"
            >
              <UIcon :name="icon.icon" class="w-4 h-4" :class="[icon.color]" />
            </div>
          </UTooltip>
        </div>
      </div>
    </template>
  </USelectMenu>
</template>

<script setup lang="ts">
const promptStore = usePromptStore();
const { currentModel } = storeToRefs(promptStore);
const modelStore = useModelStore();
const { models, selectedModels } = storeToRefs(modelStore);

const icons = ref([
  {
    icon: "i-heroicons:photo",
    ability: "imageUploads",
    color: "text-green-400/80 dark:text-green-300",
    bgColor: "bg-green-300/20",
    tooltip: "Supports image uploads and analysis",
    action: () => console.log("Image upload action"),
  },
  {
    icon: "i-heroicons:globe-alt",
    ability: "webSearch",
    color: "text-indigo-400/80 dark:text-indigo-300",
    bgColor: "bg-indigo-300/20",
    tooltip: "Web search capabilities",
    action: () => console.log("Web search action"),
  },
  {
    icon: "i-heroicons:document-text",
    ability: "pdfUploads",
    color: "text-purple-400/80 dark:text-purple-300",
    bgColor: "bg-purple-300/20",
    tooltip: "PDF upload and processing",
    action: () => console.log("PDF upload action"),
  },
  {
    icon: "i-heroicons:light-bulb",
    ability: "reasoningAbility",
    color: "text-yellow-400/80 dark:text-yellow-300",
    bgColor: "bg-yellow-300/20",
    tooltip: "Advanced reasoning abilities",
    action: () => console.log("Reasoning action"),
  },
  {
    icon: "i-heroicons:sparkles",
    ability: "generateImage",
    color: "text-red-400/80 dark:text-red-300",
    bgColor: "bg-red-300/20",
    tooltip: "Image generation capabilities",
    action: () => console.log("Image generation action"),
  },
]);

const getModelIcons = (model: any) => {
  return icons.value.filter((icon) => model[icon.ability]);
};

const emit = defineEmits(["changeModel"]);

// Build selector items: prefer user's selected models (mapped) else fallback to default static models
const selectorItems = computed(() => {
  const list = selectedModels.value || [];
  if (Array.isArray(list) && list.length) {
    return list.map((m: any) => ({
      label: m?.name || m?.id || "model",
      apiModel: m?.id,
      // derive capabilities from OpenRouter model shape
      imageUploads: Array.isArray(m?.architecture?.input_modalities)
        ? m.architecture.input_modalities.includes("image")
        : false,
      webSearch: Array.isArray(m?.supported_parameters)
        ? m.supported_parameters.includes("web_search")
        : false,
      pdfUploads: false,
      reasoningAbility: Array.isArray(m?.supported_parameters)
        ? m.supported_parameters.includes("reasoning")
        : false,
      generateImage: false,
      keyPlatforms: ["openrouter"],
    }));
  }
  return models.value;
});

// Ensure currentModel remains valid when the available items change
watch(
  selectorItems,
  (items) => {
    if (!items || !items.length) return;
    const cur = currentModel.value as any;
    const same = items.find(
      (x: any) => x?.apiModel === cur?.apiModel || x?.label === cur?.label,
    );
    if (!same) currentModel.value = items[0] as any;
  },
  { immediate: true },
);

onMounted(async () => {
  // Make sure models and selection are loaded after a page refresh
  try {
    // fetchModels fills catalog for selectedModels mapping; cheap if cached
    await modelStore.fetchModels();
  } catch {}
  try {
    await modelStore.loadSelection();
  } catch {}
});
</script>
