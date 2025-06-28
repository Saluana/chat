<template>
  <USelectMenu
    v-model="selectedBudget"
    :icon="selectedBudget?.icon"
    :trailing-icon="false"
    :searchInput="false"
    color="neutral"
    variant="subtle"
    :items="budgets"
    :ui="{
      base: 'min-w-fit inline-flex justify-center text-xs rounded-full cursor-pointer font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white light:hover:bg-neutral-200 dark:hover:bg-neutral-700/70',
      content: 'min-w-40 p-0 dark:bg-black',
      item: 'text-neutral-700 dark:text-neutral-400 data-highlighted:bg-neutral-100 dark:data-highlighted:bg-neutral-800 rounded-md',
      leading: 'w-auto mx-auto flex items-center justify-between',
      leadingIcon:
        'font-normal dark:text-neutral-400 dark:hover:text-white text-neutral-600 hover:text-neutral-800',
    }"
  />
</template>

<script setup lang="ts">
const budgets = ref([
  {
    label: "High",
    value: "High",
    icon: "i-uil:brain",
    action: () => {},
  },
  {
    label: "Medium",
    value: "Medium",
    icon: "i-lucide:brain",
    action: () => {},
  },
  {
    label: "Low",
    value: "Low",
    icon: "i-bx:brain",
    action: () => {},
  },
]);

const promptStore = usePromptStore();
const { thinkingBudget } = storeToRefs(promptStore);
const selectedBudget = ref(
  budgets.value.find(
    (b) => b.value.toLowerCase() === thinkingBudget.value.toLowerCase(),
  ),
);

watch(
  selectedBudget,
  (newBudget) => {
    if (newBudget) {
      promptStore.thinkingBudget = newBudget.value;
    }
  },
  { immediate: true },
);
</script>
