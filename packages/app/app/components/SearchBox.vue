<template>
  <UCommandPalette
    v-model="selectedChat"
    @update:open="update"
    :groups="chats"
    :close="{
      color: 'neutral',
      variant: 'outline',
      size: 'xs',
      class: 'rounded-full',
    }"
    icon="i-lucide-search"
    :ui="{
      root: 'p-3 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full lg:min-w-180 max-h-120 overflow-y-scroll scrollbar-custom bg-neutral-200/30 dark:bg-neutral-700/30 ring-0 ring-neutral-600 backdrop-blur-md shadow-lg rounded-xl',
      content:
        'bg-white/80 dark:bg-neutral-900 rounded-lg p-1.5 mx-auto w-full',
      label: 'text-neutral-400',
      item: 'p-3 rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-800',
      // group: 'border space-y-3'
    }"
  >
    <template #item="{ item }">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide:message-circle" class="size-5 text-neutral-500" />
        <span>{{ item.label }}</span>
      </div>
    </template>
  </UCommandPalette>
</template>

<script setup lang="ts">
const { searchRef } = useSearchRef();

const update = (event) => {
  searchRef.value = event;
};
const chats = ref([
  {
    id: "1",
    label: "Today",
    items: [
      {
        chatId: 1,
        date: "2:30 PM",
        label: "Help with React components djhfrijrefreofj",
      },
      { chatId: 2, date: "11:45 AM", label: "JavaScript array methods" },
    ],
  },
  {
    id: "2",
    label: "Yesterday",
    items: [
      {
        chatId: 1,
        date: "2:30 PM",
        label: "Help with React components djhfrijrefreofj",
      },
      { chatId: 2, date: "11:45 AM", label: "JavaScript array methods" },
    ],
  },
]);
const selectedChat = ref({});
</script>
