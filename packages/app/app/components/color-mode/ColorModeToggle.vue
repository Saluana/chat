<template>
  <ClientOnly>
    <UTooltip text="Theme">
      <UButton square color="neutral" variant="ghost" @click="switchMode">
        <Transition name="reveal-3d">
          <UIcon
            class="size-4 shrink-0"
            :name="colorMode.value === 'dark' ? icons.dark : icons.light"
            :key="colorMode.value"
          />
        </Transition>
      </UButton>
    </UTooltip>

    <template #fallback>
      <UTooltip text="Theme">
        <UButton
          color="neutral"
          variant="ghost"
          :icon="icons['dark']"
          @click="switchMode"
        />
      </UTooltip>
    </template>
  </ClientOnly>
</template>

<script setup>
const colorMode = useColorMode();
const switchMode = () => {
  const modes = ["light", "dark"];
  colorMode.preference =
    modes[(modes.indexOf(colorMode.value) + 1) % modes.length];
};
const icons = {
  light: "i-heroicons-moon",
  dark: "i-heroicons-sun",
};
</script>

<style scoped>
.reveal-3d-leave-active {
  position: absolute;
}
.reveal-3d-enter-active,
.reveal-3d-leave-active {
  transition: transform 0.1s ease-in-out;
}

.reveal-3d-enter-from,
.reveal-3d-leave-to {
  transform: scale(0.8) rotateZ(90deg);
}

.reveal-3d-enter-to,
.reveal-3d-leave-from {
  transform: scale(1) rotateZ(0deg);
}
</style>
