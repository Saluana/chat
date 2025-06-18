<template>
  <h3
    :id
    class="inline-block w-auto text-2xl font-semibold my-4 tracking-wide relative"
  >
    <NuxtLink v-if="id && generate" :href="`#${id}`" class="">
      <slot />
    </NuxtLink>
    <slot v-else />
    <div class="w-auto h-px"></div>
  </h3>
</template>

<script setup lang="ts">
const { id } = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
  () =>
    id &&
    (headings?.anchorLinks === true ||
      (typeof headings?.anchorLinks !== "boolean" &&
        headings?.anchorLinks?.h3)),
);
</script>
