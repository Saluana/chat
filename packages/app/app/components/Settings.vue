<template>
  <div
    class="w-full lg:w-[800px] p-4 lg:p-8 flex flex-col lg:flex-row justify-between items-start gap-5 lg:gap-10 bg-neutral-100/40 dark:bg-neutral-700/30 backdrop-blur-md rounded-xl"
  >
    <!-- user -->
    <div class="flex flex-col items-center gap-4 flex-1/3">
      <UAvatar
        :src="image"
        :alt="name"
        :ui="{
          root: 'w-20 h-20 lg:w-30 lg:h-30 bg-primary-800/80',
          fallback: 'text-white/80',
        }"
      />
      <div class="text-center space-y-1">
        <p class="font-bold text-lg">{{ name }}</p>
        <p
          class="text-neutral-800 dark:text-neutral-400 flex items-center gap-1"
        >
          {{ email }}
        </p>
      </div>
    </div>

    <UAccordion
      :items="Object.values(modelsByCategory)"
      :ui="{
        root: 'w-2/3',
        item: 'p-2.5 my-4 rounded-lg ring ring-neutral-300/40 dark:ring-neutral-700/40 bg-white dark:bg-neutral-900',
        trigger: 'cursor-pointer p-0.5',
        leadingIcon: '',
      }"
    >
      <template #default="{ item }">
        <div class="flex items-center gap-2">
          <img v-if="item.image" src="/openrouter.ico" alt="" class="w-5" />
          <p class="text-md font-medium dark:text-primary-50">
            {{ item.name }} API Key
          </p>
        </div>
      </template>
      <template #content="{ item }">
        <div class="rounded-lg p-4 mx-auto w-full mt-2">
          <!-- show pills here -->
          <div v-if="item.models" class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="model in item.models"
              class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-light bg-primary-100 text-primary-800 dark:bg-primary-700/50 dark:text-white"
            >
              {{ model.label }}
            </span>
          </div>

          <div class="flex flex-col items-start justify-center mt-6">
            <UInput
              v-model="item.apiKey"
              size="xl"
              placeholder="Your API Key"
              type="password"
              class="w-full"
              :ui="{
                base: 'ring-neutral-600/50 focus-visible:ring-neutral-500/80',
              }"
            />
            <p class="text-sm text-neutral-400 mt-1">
              Get your key from
              <NuxtLink
                :to="item.link"
                target="_blank"
                external
                class="px-0 text-primary-400 hover:text-primary-500"
                >{{ item.name }} console</NuxtLink
              >.
            </p>

            <UButton
              size="lg"
              color="primary"
              variant="solid"
              label="Save"
              class="ml-auto mt-5"
              @click="modelStore.saveApiKey(item.keyName)"
              :loading="item.saving"
              :ui="{
                base: 'bg-primary-700 hover:bg-primary-600 text-white',
              }"
            />
          </div>
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<script setup lang="ts">
const user = useAuth().sessionState;
const name = computed(() => user.value.user?.name);
const image = computed(() => user.value.user?.image);
const email = computed(() => user.value.user?.email);

const modelStore = useModelStore();
const { modelsByCategory } = storeToRefs(modelStore);
</script>
