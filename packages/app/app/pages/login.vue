<template>
  <div
    class="w-screen h-screen flex flex-col gap-10 items-center justify-center"
    :class="[colorMode.value === 'light' ? 'bg-gradient' : 'bg-gradient-dark']"
  >
    <!-- frosted card -->
    <div
      class="min-w-[500px] bg-white/30 dark:bg-neutral-100/5 text-center rounded-xl p-8 shadow-lg ring ring-neutral-100/40 dark:ring-neutral-100/15 flex flex-col items-center gap-0"
    >
      <img src="/nuxflare.png" alt="" class="w-20" />

      <div class="text-center space-y-1.5">
        <h1 class="text-4xl font-semibold text-neutral-800 dark:text-white">
          Nuxflare Chat
        </h1>
        <p class="text-neutral-900 dark:text-neutral-400">
          Sign in and chat with powerful AI models in one place.
        </p>
      </div>

      <UButton
        :to="url"
        :external="true"
        size="xl"
        :ui="{
          base: 'w-[90%] p-3 mt-8 rounded-xl text-center bg-primary-500 hover:bg-primary-700 dark:bg-primary-100/20 dark:hover:bg-primary-300 dark:text-primary-100 dark:hover:text-primary-900 font-SEMIBOLD',
          label: 'text-center border mx-auto',
        }"
        variant="solid"
      >
        <template #default>
          <div class="mx-auto flex items-center gap-4">
            <UIcon name="i-flat-color-icons:google" class="size-6" />
            Continue with Google
          </div>
        </template>
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { client, callback } = useAuth();
const colorMode = useColorMode();
const { url } = await client.authorize(callback, "code", {
  provider: "google",
});
</script>

<style scoped>
.bg-gradient {
  /* background: linear-gradient(90deg, #ffffff 0%, rgb(43, 127, 255) 100%); */
  background: radial-gradient(
    circle at top center,
    rgb(43, 127, 255),
    #ffffff 80%
  );
}

.bg-gradient-dark {
  background: radial-gradient(
    circle at top center,
    rgba(19, 43, 108, 0.8),
    #000000 80%
  );
}
</style>
