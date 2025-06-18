<template>
  <UAccordion
    :items="items"
    :ui="{
      content: 'p-3 rounded-lg bg-white dark:bg-neutral-800',
      body: 'text-md',
      trigger: 'cursor-pointer relative',
      trailingIcon: 'absolute left-0',
    }"
  >
    <template #default="{ item }">
      <p class="text-[15px] font-semibold ml-8">{{ item.label }}</p>
    </template>
  </UAccordion>
</template>

<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";
interface Props {
  content: string;
}
const props = defineProps<Props>();
const open = ref(false);
const items = ref<AccordionItem[]>([
  {
    label: "Web Search",
    content: props.content,
  },
]);
</script>
