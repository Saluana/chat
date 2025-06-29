<template>
  <UAccordion
    :items="items"
    :ui="{
      root: 'rounded-lg px-2 bg-neutral-100 dark:bg-neutral-800',
      content: 'px-2 pb-2',
      body: 'text-md',
      trigger: 'cursor-pointer relative',
      trailingIcon:
        'group-data-[state=open]:rotate-0 group-data-[state=closed]:-rotate-90 absolute left-0',
    }"
  >
    <template #default="{ item }">
      <p class="text-[15px] font-medium ml-8">{{ item.label }}</p>
    </template>
    <template #content>
      <MarkdownRenderer :content="content" />
    </template>
  </UAccordion>
</template>

<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";
interface Props {
  content: string;
}
const { content } = defineProps<Props>();
const items = ref<AccordionItem[]>([
  {
    label: "Reasoning",
  },
]);

// preprocess markdown
onMounted(() => {
  processMarkdownChunk(content);
});
</script>
