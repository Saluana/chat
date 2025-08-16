<template>
  <div v-for="(threads, category) in threads" :key="category" class="space-y-1">
    <h3
      class="mb-2 flex items-center gap-1 text-xs uppercase font-semibold tracking-wide"
      :class="[
        category.toLowerCase() === 'pinned'
          ? 'text-primary-600/80 dark:text-primary-400/80'
          : 'text-neutral-700 dark:text-neutral-300',
      ]"
    >
      <UIcon
        v-if="category.toLowerCase() === 'pinned'"
        name="i-codicon:pinned"
        class="size-3.5"
      />
      {{ category }}
    </h3>
    <div
      v-for="thread in threads"
      :key="thread.id"
      @click="switchThread(thread)"
      class="p-1.5 rounded-lg hover:bg-white dark:hover:bg-neutral-800 cursor-pointer group overflow-hidden"
      :class="[
        popperThreadId === thread.id || activeThread === thread.id
          ? 'bg-white dark:bg-neutral-800'
          : '',
      ]"
    >
      <div class="flex justify-start gap-2 items-center relative">
        <UIcon
          v-if="thread.parent_thread_id"
          name="i-carbon:branch"
          class="size-3.5"
        />
        <span
          v-if="editableThreadId != thread.id"
          class="text-sm font-medium text-neutral-500 dark:text-neutral-400 truncate"
          @dblclick="editThread(thread)"
          :title="thread.title"
        >
          {{ thread.title }}
        </span>
        <UInput
          v-if="editableThreadId === thread.id"
          :id="`thread-input-${thread.id}`"
          v-model="thread.title"
          class="w-full"
          :ui="{
            base: 'truncate p-0 pb-0.5 ring-0 focus-visible:ring-0 border-b border-b-neutral-600/50 rounded-none bg-transparent',
          }"
          @blur="saveThread(thread)"
          @keydown.enter="saveThread(thread)"
        />

        <div
          @click.stop
          class="h-full absolute right-0 pl-3 pr-0.5 gap-1 flex items-center group-hover:translate-x-1 rounded-lg transition-transform duration-100 bg-[linear-gradient(to_right,_transparent_0%,_white_20%,_white_100%)] dark:bg-[linear-gradient(to_right,_transparent_0%,_#262626_20%,_#262626_100%)]"
          :class="[
            popperThreadId === thread.id
              ? 'transform translate-x-1'
              : 'transform translate-x-[120%]',
          ]"
        >
          <UTooltip
            :disableHoverableContent="true"
            :text="pinned ? unpinnedAction.tooltip : pinnedAction.tooltip"
          >
            <UButton
              :icon="pinned ? unpinnedAction.icon : pinnedAction.icon"
              variant="ghost"
              color="neutral"
              size="xs"
              class="dark:hover:bg-neutral-700/70 rounded-md flex items-center"
              @click="
                pinned
                  ? unpinnedAction.action(thread.id)
                  : pinnedAction.action(thread.id)
              "
            />
          </UTooltip>

          <UPopover
            @update:open="
              (isOpen: boolean) => (popperThreadId = isOpen ? thread.id : null)
            "
            :open="popperThreadId === thread.id"
          >
            <UButton
              :icon="moreOptionsAction.icon"
              variant="ghost"
              color="neutral"
              size="xs"
              :title="popperThreadId"
              class="dark:hover:bg-neutral-700/70 rounded-md flex items-center"
              :class="[
                popperThreadId === thread.id ? 'dark:bg-neutral-700/70' : '',
              ]"
            />
            <template #content>
              <LazyFragmentsThreadMenu
                :moreActions="moreActions"
                :thread="thread"
              />
            </template>
          </UPopover>
        </div>
      </div>
    </div>
  </div>

  <DeleteModal
    v-model="openDeleteModal"
    :thread="threadToDelete"
    @cancelDelete="cancelDelete"
    @confirmDelete="confirmDelete"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  threads: {
    type: Object,
    default: () => {},
  },
  pinned: {
    type: Boolean,
    default: false,
  },
});
const threadsStore = useThreadsStore();
const popperThreadId = ref<number | null>(null);
const { activeThread } = storeToRefs(threadsStore);
const { $sync } = useNuxtApp();

function switchThread(thread: any) {
  navigateTo(`/${thread.id}`);
}

const editableThreadId = ref<number | null>(null);
const editThread = (thread: any) => {
  editableThreadId.value = thread.id;
  requestAnimationFrame(() => {
    const input = document.getElementById(`thread-input-${thread.id}`);
    input?.focus();
  });
};

const saveThread = (thread: any) => {
  editableThreadId.value = null;
  $sync.updateThread(thread.id, { title: thread.title });
};

const pinnedAction = ref({
  icon: "i-codicon:pinned",
  tooltip: "Pin Thread",
  action: (id: string) => {
    useNuxtApp().$sync.updateThread(id, { pinned: true });
  },
});

const unpinnedAction = ref({
  icon: "i-mdi-light:pin-off",
  tooltip: "Unpin Thread",
  action: (id: string) => {
    useNuxtApp().$sync.updateThread(id, { pinned: false });
  },
});

const moreOptionsAction = ref({
  icon: "heroicons:ellipsis-horizontal-solid",
  tooltip: "More options",
});

const openDeleteModal = ref(false);
const threadToDelete = ref<any>(null);

const moreActions = ref([
  {
    icon: props.pinned ? unpinnedAction.value.icon : pinnedAction.value.icon,
    name: props.pinned ? "Unpin" : "Pin",
    action: (thread: any) => {
      if (props.pinned) {
        unpinnedAction.value.action(thread.id);
      } else {
        pinnedAction.value.action(thread.id);
      }
    },
  },
  {
    icon: "heroicons:pencil-square",
    name: "Rename",
    action: (thread) => {
      editThread(thread);
    },
  },
  {
    icon: "heroicons:trash",
    name: "Delete",
    action: (thread) => {
      popperThreadId.value = null;
      threadToDelete.value = thread;
      openDeleteModal.value = true;
    },
  },
  {
    icon: "heroicons:arrow-down-tray-20-solid",
    name: "Export",
    action: () => {
      // Implement action to edit message
    },
  },
]);

const cancelDelete = () => {
  openDeleteModal.value = false;
  threadToDelete.value = null;
};

const confirmDelete = () => {
  useNuxtApp().$sync.updateThread(threadToDelete.value?.id, { deleted: true });
  openDeleteModal.value = false;
  threadToDelete.value = null;
};
</script>

<script lang="ts">
export default {};
</script>

<style scoped>
.gradient-bg-light {
  background: linear-gradient(to right, transparent 0%, #fff 20%, #fff 100%);
}

.gradient-bg-dark {
  background: linear-gradient(
    to right,
    transparent 0%,
    #262626 20%,
    #262626 100%
  );
}
</style>
