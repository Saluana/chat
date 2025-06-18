<template>
  <UModal
    :overlay="true"
    v-model:open="openDeleteModal"
    color="neutral"
    :ui="{
      overlay: 'bg-white/60 dark:bg-black/60',
      content:
        'bg-neutral-300/30 dark:bg-neutral-700/30 ring-0 ring-neutral-600 backdrop-blur-md shadow-lg rounded-xl',
      header: 'hidden',
      body: ' rounded-lg mx-4 mt-4 border-none',
      footer: 'p-4',
    }"
    class="absolute left-1/2 transform -translate-x-1/2"
  >
    <template #body>
      <div class="flex flex-col items-start gap-4">
        <h3 class="text-lg font-semibold">Delete Thread</h3>
        <p class="text-neutral-700 dark:text-neutral-400 mb-4">
          <span v-if="threadToDelete">
            Are you sure you want to delete "{{ threadToDelete?.title }}"? This
            action cannot be undone.
          </span>
          <span v-else>
            Are you sure you want to delete this message? This action cannot be
            undone.
          </span>
        </p>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end w-full gap-3">
        <UButton
          variant="ghost"
          size="md"
          color="neutral"
          @click="cancelDelete"
        >
          Cancel
        </UButton>
        <UButton
          variant="subtle"
          size="md"
          color="error"
          @click="confirmDelete"
        >
          Delete
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const openDeleteModal = defineModel<boolean>();

interface Props {
  threadToDelete?: Object;
}
const props = defineProps<Props>();
const emit = defineEmits(["cancelDelete", "confirmDelete"]);

const cancelDelete = () => {
  emit("cancelDelete");
};

const confirmDelete = () => {
  emit("confirmDelete");
};
</script>
