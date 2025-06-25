<template>
  <div class="flex">
    <UButton
      v-if="copied === false"
      size="xs"
      color="neutral"
      variant="ghost"
      icon="i-heroicons-clipboard-document"
      @click="handleCopy"
    />
    <UButton
      v-else
      ref="checkIconRef"
      size="xs"
      color="neutral"
      variant="ghost"
      icon="i-heroicons-check"
    />
  </div>
</template>

<script setup lang="ts">
import showToast from "~/utils/showToast";
const { code } = defineProps<{
  code: string;
}>();
const { copy } = useClipboard({ source: code });
const copied = ref(false);

async function handleCopy() {
  await copy(code);
  copied.value = true;
  showToast("Copied to clipboard!");
}

const checkIconRef = ref<HTMLElement>();
onClickOutside(checkIconRef, () => {
  copied.value = false;
});
</script>
