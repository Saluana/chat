<template>
  <div
    class="flex flex-col p-0 h-screen overflow-y-auto scrollbar-custom relative sidebar-bg"
  >
    <div class="sticky top-0 p-5 space-y-4 z-10 sidebar-bg">
      <div class="w-full flex justify-between items-center">
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
        v-if="pinnedThreadsFromPreview.pinned?.length"
        :threads="pinnedThreadsFromPreview"
        :pinned="true"
      />
      <ChatThread :threads="groupedThreadsFromPreview" :pinned="false" />
      <div class="h-10" />
    </div>
  </div>

  <!-- account -->
  <ClientOnly>
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
          <div class="space-x-2 flex items-center">
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
            <!-- OpenRouter logo + connection dot -->
            <div class="flex items-center gap-2 ml-2">
              <!-- small OpenRouter logo -->
              <svg
                width="18"
                height="18"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                stroke="currentColor"
                class="text-neutral-500 dark:text-neutral-300"
              >
                <g clip-path="url(#clip0_205_3)">
                  <path
                    d="M3 248.945C18 248.945 76 236 106 219C136 202 136 202 198 158C276.497 102.293 332 120.945 423 120.945"
                    stroke-width="90"
                  />
                  <path
                    d="M511 121.5L357.25 210.268L357.25 32.7324L511 121.5Z"
                  />
                  <path
                    d="M0 249C15 249 73 261.945 103 278.945C133 295.945 133 295.945 195 339.945C273.497 395.652 329 377 420 377"
                    stroke-width="90"
                  />
                  <path
                    d="M508 376.445L354.25 287.678L354.25 465.213L508 376.445Z"
                  />
                </g>
              </svg>
              <span
                :title="
                  openrouterConnected
                    ? 'OpenRouter connected'
                    : 'OpenRouter disconnected'
                "
                :class="[
                  'w-3 h-3 rounded-full inline-block',
                  openrouterConnected ? 'bg-green-500' : 'bg-red-500',
                ]"
                aria-hidden="true"
              />
            </div>
          </div>

          <UIcon
            name="i-heroicons:chevron-up-down"
            class="size-5 hover:text-black dark:hover:text-white"
          />
        </div>
      </div>

      <template #content>
        <LazyAccountMenu :actions="actions" :cssVars="cssVars" />
      </template>
    </UPopover>
    <template #fallback>
      <AccountBarSkeleton />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useOpenRouterAuth } from "../composables/useOpenRouterAuth";
import { useThreadsPreview } from "../composables/useThreadsPreview";
const route = useRoute();
const { searchRef } = useSearchRef();
const { settingsRef } = useSettingsRef();
const emit = defineEmits(["toggle", "new"]);
const pop = useTemplateRef("pop");

const user = ref({
  user: {
    name: "User",
    image: "path/to/image.jpg",
  },
});
const name = computed(() => user.value.user?.name);
const image = computed(() => user.value.user?.image);
const { width } = useElementBounding(pop);
const popperOpen = ref(false);

const cssVars = computed(() => ({
  "--width": `${width.value}px`,
}));

const { startLogin, logoutOpenRouter } = useOpenRouterAuth?.() || {
  startLogin: () => {},
  logoutOpenRouter: () => {},
};

const actions = computed(() => {
  const base = [
    {
      icon: "i-lucide:settings",
      name: "Settings",
      action: () => {
        settingsRef.value = true;
        popperOpen.value = false;
      },
    },
  ];
  if (openrouterConnected.value) {
    base.push({
      icon: "i-heroicons-solid:logout",
      name: "Logout",
      action: async () => {
        popperOpen.value = false;
        try {
          await logoutOpenRouter();
        } catch (e) {
          console.error(e);
        }
      },
    });
  } else {
    base.push({
      icon: "i-carbon:login",
      name: "Login with OpenRouter",
      action: async () => {
        popperOpen.value = false;
        // Avoid awaiting navigation to preserve user gesture on iOS Safari
        try {
          setTimeout(() => {
            try {
              startLogin();
            } catch (e) {
              console.error(e);
            }
          }, 0);
        } catch (e) {
          console.error(e);
        }
      },
    });
  }
  return base;
});

// Preview-backed sidebar lists
const { items } = useThreadsPreview();

const getThreadTime = (t: any) => Math.max(t.last_message_at || 0, t.updated_at || 0);

const pinnedThreadsFromPreview = computed(() => {
  const result: Record<string, any[]> = { pinned: [] };
  for (const t of items.value) {
    if (t.pinned === 1 && t.deleted === 0) result.pinned!.push(t as any);
  }
  result.pinned!.sort((a, b) => getThreadTime(b) - getThreadTime(a));
  return result;
});

const groupedThreadsFromPreview = computed(() => {
  const now = Date.now();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const groups: Record<string, any[]> = {
    today: [],
    yesterday: [],
    "last 7 days": [],
    "last 30 days": [],
    older: [],
  };

  const unpinned = items.value
    .filter((t) => t.pinned !== 1 && t.deleted === 0)
    .slice()
    .sort((a, b) => getThreadTime(b) - getThreadTime(a));

  unpinned.forEach((t) => {
    const d = new Date(t.last_message_at || 0);
    if (d >= today) groups.today!.push(t as any);
    else if (d >= yesterday) groups.yesterday!.push(t as any);
    else if (d >= sevenDaysAgo) groups["last 7 days"]!.push(t as any);
    else if (d >= thirtyDaysAgo) groups["last 30 days"]!.push(t as any);
    else groups.older!.push(t as any);
  });

  for (const k of Object.keys(groups)) {
    if (groups[k]!.length === 0) delete groups[k];
  }
  return groups;
});

const openrouterConnected = ref(false);

async function checkOpenRouterKey() {
  // Check fast client storage first
  const localKey =
    typeof window !== "undefined"
      ? localStorage.getItem("openrouter_api_key")
      : null;
  if (localKey) {
    openrouterConnected.value = true;
    return;
  }
  // Then check synced KV
  try {
    const { $sync } = useNuxtApp();
    const kvKey = await $sync.getKV("openrouter_api_key").catch(() => null);
    openrouterConnected.value = !!kvKey;
  } catch (e) {
    openrouterConnected.value = false;
  }
}

onMounted(() => {
  checkOpenRouterKey();
  if (typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
      if (e.key === "openrouter_api_key") checkOpenRouterKey();
    });
    // also react to our custom event fired on successful OAuth exchange
    window.addEventListener("openrouter:connected", () => {
      checkOpenRouterKey();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        checkOpenRouterKey();
      }
    });
  }
});

watch(
  () => route.fullPath,
  () => {
    checkOpenRouterKey();
  },
);
</script>

<script lang="ts">
export default {
  components: {
    AccountBarSkeleton: () => import("./AccountBarSkeleton.vue"),
  },
};
</script>
