<template>
  <div
    class="flex flex-col p-0 h-screen overflow-y-auto scrollbar-custom relative sidebar-bg"
  >
    <div class="sticky top-0 p-5 space-y-4 z-10 sidebar-bg">
      <div class="w-full flex w-full justify-between items-center">
        <UButton
          icon="i-lucide-panel-left"
          variant="ghost"
          @click="$emit('toggle')"
        />

        <div class="flex items-center gap-1">
          <span class="text-lg font-bold text-neutral-500 dark:text-neutral-300"
            >Nuxflare Chat</span
          >
        </div>

        <UModal :overlay="false" v-model:open="searchRef">
          <UButton icon="i-lucide-search" variant="ghost" />
          <template #content>
            <SearchBox />
          </template>
        </UModal>
      </div>

      <div>
        <UButton
          actions
          @click="$emit('new')"
          to="/"
          variant="subtle"
          block
          size="xl"
          >New Chat</UButton
        >
      </div>
    </div>

    <div class="space-y-4 p-5">
      <ChatThread
        v-if="pinnedThreadsFromStore.pinned?.length"
        :threads="pinnedThreadsFromStore"
        :pinned="true"
      />
      <ChatThread :threads="groupedThreadsFromStore" :pinned="false" />
      <div class="h-10" />
    </div>
  </div>

  <!-- account -->
  <UPopover
    @update:open="
      (isOpen: boolean) => {
        popperOpen = isOpen ? true : false;
      }
    "
    class="sticky left-0 bottom-0 w-full z-10 sidebar-bg"
    :open="popperOpen"
  >
    <div class="p-2 border-t border-neutral-300 dark:border-neutral-800">
      <div
        class="p-2.5 flex justify-between items-center hover:bg-white hover:dark:bg-primary-200/10 rounded-lg"
        ref="pop"
      >
        <div class="space-x-2">
          <UAvatar
            :src="image"
            size="xs"
            :alt="name"
            :ui="{ root: 'bg-primary-800/80', fallback: 'text-white/80' }"
          />
          <span
            class="select-none text-sm font-medium text-neutral-800 dark:text-neutral-300"
            >{{ name }}</span
          >
        </div>

        <UIcon
          name="i-heroicons:chevron-up-down"
          class="size-5 hover:text-black dark:hover:text-white"
        />
      </div>
    </div>

    <template #content>
      <div
        class="p-1 bg-white dark:bg-black rounded-lg w-[var(--width)]"
        :style="cssVars"
      >
        <div
          v-for="action in actions"
          :key="action.icon"
          class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800/70 font-semibold cursor-pointer"
          @click="action.action()"
        >
          <UIcon :name="action.icon" class="size-4" />
          <span>{{ action.name }}</span>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const { searchRef } = useSearchRef();
const { settingsRef } = useSettingsRef();
const emit = defineEmits(["toggle", "new"]);
const pop = useTemplateRef("pop");

const user = useAuth().sessionState;
const name = computed(() => user.value.user?.name);
const image = computed(() => user.value.user?.image);
const { width } = useElementBounding(pop);
const popperOpen = ref(false);

const cssVars = computed(() => ({
  "--width": `${width.value}px`,
}));

const actions = [
  {
    icon: "i-lucide:settings",
    name: "Settings",
    action: () => {
      settingsRef.value = true;
    },
  },
  {
    icon: "i-heroicons-solid:logout",
    name: "Logout",
    action: async () => {
      await useSession().clear();
      navigateTo("/login");
    },
  },
];

const threadsStore = useThreadsStore();
const {
  pinnedThreads: pinnedThreadsFromStore,
  unpinnedThreads: groupedThreadsFromStore,
} = storeToRefs(threadsStore);
</script>
