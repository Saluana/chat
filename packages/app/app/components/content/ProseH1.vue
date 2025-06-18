<template>
  <h1
    :id
    class="inline-block scroll-m-20 text-3xl md:text-4xl lg:text-[55px] xl:text-6xl font-extrabold tracking-normal leading-12 lg:leading-22 font-mono"
  >
    <NuxtLink v-if="generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h1>
</template>

<script setup lang="ts">
const { id } = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
  () =>
    id &&
    (headings?.anchorLinks === true ||
      (typeof headings?.anchorLinks !== "boolean" &&
        headings?.anchorLinks?.h1)),
);
</script>
