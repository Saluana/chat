<template>
  <div
    class="w-[98vw] md:w-[900px] md:max-w-[1000px] p-4 lg:p-6 flex flex-col gap-3 lg:gap-4 bg-neutral-100/40 dark:bg-neutral-700/30 backdrop-blur-md rounded-xl max-h-[90vh] overflow-hidden min-h-0 overscroll-contain"
  >
    <UAccordion
      :items="categoryList"
      :ui="{
        root: 'w-full',
        item: 'p-2 my-2 rounded-lg ring ring-neutral-300/40 dark:ring-neutral-700/40 bg-white dark:bg-neutral-900',
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
        <div class="rounded-lg p-3 mx-auto w-full mt-2">
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
            <UButton
              v-if="openrouterConnected"
              size="lg"
              color="neutral"
              variant="ghost"
              label="Logout"
              class="ml-2 mt-5"
              type="button"
              @click.prevent.stop="logout"
            />
          </div>
        </div>
      </template>
    </UAccordion>

    <!-- Models Catalog Panel -->
    <div
      class="w-full mt-1 p-3 lg:p-4 rounded-lg ring ring-neutral-300/40 dark:ring-neutral-700/40 bg-white dark:bg-neutral-900 flex flex-col min-h-0 flex-1 overflow-hidden"
    >
      <div class="flex items-center justify-between gap-3 mb-3">
        <div class="flex items-center gap-3 w-full">
          <UInput
            v-model="query"
            placeholder="Search models by name or id…"
            class="flex-1"
            size="lg"
            :ui="{
              base: 'ring-neutral-600/50 focus-visible:ring-neutral-500/80',
            }"
            @input="applyFilters"
          />
          <UButton
            color="primary"
            variant="soft"
            :loading="loading"
            @click="refresh"
            icon="i-lucide:refresh-cw"
            label="Refresh"
          />
          <UButton
            color="primary"
            variant="solid"
            class="ml-2"
            :loading="saving"
            @click="save"
            icon="i-lucide:save"
            label="Save"
            :ui="{ base: 'bg-primary-700 hover:bg-primary-600 text-white' }"
          />
        </div>
      </div>

      <!-- Filter chips -->
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <button
          class="px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-300/50 dark:border-neutral-700/50 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60"
          :class="{
            'bg-primary-100 text-primary-800 dark:bg-primary-700/40 dark:text-white':
              inputImage,
          }"
          @click="
            inputImage = !inputImage;
            applyFilters();
          "
        >
          Image input
        </button>
        <button
          class="px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-300/50 dark:border-neutral-700/50 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60"
          :class="{
            'bg-primary-100 text-primary-800 dark:bg-primary-700/40 dark:text-white':
              needsReasoning,
          }"
          @click="
            needsReasoning = !needsReasoning;
            applyFilters();
          "
        >
          Reasoning
        </button>
        <div class="flex items-center gap-2 ml-2">
          <span class="text-xs text-neutral-500">Min context</span>
          <UInput
            v-model.number="minContext"
            type="number"
            class="w-24"
            size="xs"
            @change="applyFilters"
          />
        </div>
        <div class="flex items-center gap-1 ml-2">
          <span class="text-xs text-neutral-500">Price</span>
          <select
            v-model="price"
            class="text-xs bg-transparent border border-neutral-300/50 dark:border-neutral-700/50 rounded-md px-2 py-1"
            @change="applyFilters"
          >
            <option value="any">Any</option>
            <option value="free">Free</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
          </select>
        </div>
      </div>

      <!-- List state -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="i in 6"
          :key="i"
          class="h-32 rounded-xl animate-pulse bg-neutral-200/60 dark:bg-neutral-800/60"
        />
      </div>
      <div v-else class="flex-1 min-h-0 overflow-hidden">
        <div
          v-if="filteredCatalog.length === 0"
          class="py-12 text-center text-neutral-500"
        >
          <p class="font-medium">No models match your filters.</p>
          <UButton size="sm" variant="soft" class="mt-3" @click="resetFilters"
            >Reset filters</UButton
          >
        </div>

        <div v-else class="flex-1 min-h-0">
          <div
            ref="listContainer"
            class="flex-1 min-h-0 overflow-auto pr-2 pb-2 overscroll-contain"
            style="-webkit-overflow-scrolling: touch"
            @scroll="onScroll"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
              <div
                v-for="m in limitedCatalog"
                :key="m.id"
                class="group p-3 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/60 dark:bg-neutral-900/50 hover:shadow-sm transition"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p
                      class="truncate font-semibold text-neutral-900 dark:text-neutral-100"
                    >
                      {{ m.name || prettyId(m.id) }}
                    </p>
                    <p class="truncate text-xs text-neutral-500">{{ m.id }}</p>
                  </div>
                  <button
                    class="inline-flex items-center justify-center w-8 h-8 rounded-full border border-neutral-300/50 dark:border-neutral-700/50 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60"
                    :class="{
                      'bg-primary-600 text-white border-primary-600':
                        isSelected(m.id),
                    }"
                    @click="toggle(m.id)"
                    :aria-pressed="isSelected(m.id)"
                    :title="isSelected(m.id) ? 'Deselect' : 'Select'"
                  >
                    <span
                      :class="
                        isSelected(m.id) ? 'i-lucide:star' : 'i-lucide:star-off'
                      "
                      class="w-4 h-4"
                    />
                  </button>
                </div>

                <div class="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    v-if="supportsTextIn(m)"
                    class="px-2 py-1 rounded-md text-[10px] font-medium bg-neutral-200/60 dark:bg-neutral-800/60"
                    >text</span
                  >
                  <span
                    v-if="supportsImageIn(m)"
                    class="px-2 py-1 rounded-md text-[10px] font-medium bg-neutral-200/60 dark:bg-neutral-800/60"
                    >image</span
                  >
                  <span
                    v-if="supportsReasoning(m)"
                    class="px-2 py-1 rounded-md text-[10px] font-medium bg-amber-200/60 dark:bg-amber-900/40"
                    >reasoning</span
                  >
                  <span
                    v-if="supportsWebSearch(m)"
                    class="px-2 py-1 rounded-md text-[10px] font-medium bg-sky-200/60 dark:bg-sky-900/40"
                    >web search</span
                  >
                  <span class="ml-auto text-xs text-neutral-500"
                    >ctx {{ contextLen(m) }}</span
                  >
                </div>

                <div
                  class="mt-2 flex items-center gap-3 text-[11px] text-neutral-600 dark:text-neutral-400"
                >
                  <span>prompt {{ pricePerM(m.pricing?.prompt) }}</span>
                  <span>•</span>
                  <span>completion {{ pricePerM(m.pricing?.completion) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-between">
        <p class="text-xs text-neutral-500">
          Selected: {{ selectedModelIds.length }}
        </p>
        <UButton color="primary" :loading="saving" @click="save"
          >Save selection</UButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 'useAuth' may be provided by the app's auth plugin via auto-imports — declare so TS won't error
declare const useAuth: any;

import { useOpenRouterAuth } from "../composables/useOpenRouterAuth";
import showToast from "~/utils/showToast";

// Track original body styles for scroll lock restore
let lockedScrollY: number = 0;
let originalBodyStyle: {
  overflow?: string;
  touchAction?: string;
  position?: string;
  top?: string;
  left?: string;
  right?: string;
  width?: string;
} = {};

const user =
  typeof useAuth === "function"
    ? useAuth().sessionState
    : ref({ value: { user: {} } });
const name = computed(() => user.value.user?.name);
const image = computed(() => user.value.user?.image);
const email = computed(() => user.value.user?.email);

const modelStore = useModelStore();
const { modelsByCategory, catalog, filteredCatalog, selectedModelIds } =
  storeToRefs(modelStore);

const categoryList = computed(() => Object.values(modelsByCategory.value));

const { startLogin, logoutOpenRouter } = useOpenRouterAuth();

// when saving API key manually, also update localStorage and notify UI
const originalSaveApiKey = modelStore.saveApiKey;
modelStore.saveApiKey = async (platform: string) => {
  await originalSaveApiKey(platform);
  if (platform === "openrouter") {
    const key = modelStore.modelsByCategory.openrouter.apiKey;
    if (typeof window !== "undefined") {
      if (key) localStorage.setItem("openrouter_api_key", key);
      else localStorage.removeItem("openrouter_api_key");
      try {
        window.dispatchEvent(new CustomEvent("openrouter:connected"));
      } catch {}
    }
  }
};

function logout() {
  logoutOpenRouter();
}

// Connection indicator state for conditional Login/Logout visibility
const openrouterConnected = ref(false);
async function checkOpenRouterKey() {
  const localKey =
    typeof window !== "undefined"
      ? localStorage.getItem("openrouter_api_key")
      : null;
  if (localKey) {
    openrouterConnected.value = true;
    return;
  }
  try {
    const { $sync } = useNuxtApp();
    const kvKey = await $sync.getKV("openrouter_api_key").catch(() => null);
    openrouterConnected.value = !!kvKey;
  } catch (e) {
    openrouterConnected.value = false;
  }
}

// Models panel state
const loading = ref(false);
const saving = ref(false);
const query = ref("");
const inputImage = ref(false);
const needsReasoning = ref(false);
const minContext = ref<number | null>(null);
const price = ref<"any" | "free" | "low" | "medium">("any");
// Virtualization
const listContainer = ref<HTMLElement | null>(null);
const cols = ref(1);

// Lazy load batches on top of virtualization
const pageSize = 400;
const displayLimit = ref(pageSize);
const limitedCatalog = computed(() =>
  filteredCatalog.value.slice(0, displayLimit.value),
);

// compute a max-height for the inner list so the entire modal fits inside 90vh
// height handled via flex layout (panel flex-col + list flex-1 min-h-0)

function updateCols() {
  const w = listContainer.value?.clientWidth || 0;
  cols.value = w >= 768 ? 2 : 1;
}

// manual pad calculations removed; using useVirtualList instead

// lazy-loading handled by watching limitedCatalog/displayLimit below

watch([filteredCatalog, displayLimit], () => {
  updateCols();
  if (listContainer.value) listContainer.value.scrollTop = 0;
});

function onScroll(e?: Event) {
  const el = (e?.target || listContainer.value) as HTMLElement | null;
  if (!el) return;
  const scrollEl = el instanceof HTMLElement ? el : listContainer.value;
  const remaining =
    (scrollEl?.scrollHeight || 0) -
    (scrollEl?.scrollTop || 0) -
    (scrollEl?.clientHeight || 0);
  const thresholdPx = 400; // when within 400px of bottom, load more
  if (
    remaining < thresholdPx &&
    displayLimit.value < filteredCatalog.value.length
  ) {
    displayLimit.value = Math.min(
      displayLimit.value + pageSize,
      filteredCatalog.value.length,
    );
  }
}

function applyFilters() {
  const params: string[] = [];
  if (needsReasoning.value) params.push("reasoning");
  modelStore.filterModels(query.value, {
    input: inputImage.value ? ["image"] : undefined,
    // output filter removed
    minContext: Number(minContext.value || 0) || 0,
    parameters: params.length ? params : undefined,
    price: price.value,
  });
  // reset scroll
  if (listContainer.value) listContainer.value.scrollTop = 0;
  displayLimit.value = pageSize;
  // displayLimit changed; virtual will update automatically
}

function resetFilters() {
  query.value = "";
  inputImage.value = false;
  needsReasoning.value = false;
  minContext.value = null;
  price.value = "any";
  applyFilters();
  updateCols();
  window.addEventListener("resize", () => {
    updateCols();
    // virtual adjusts on resize
  });
}

function isSelected(id: string) {
  return selectedModelIds.value.includes(id);
}
function toggle(id: string) {
  modelStore.toggleSelected(id);
}

function contextLen(m: any) {
  return m?.top_provider?.context_length ?? m?.context_length ?? 0;
}
function supportsTextIn(m: any) {
  return (m?.architecture?.input_modalities || ["text"]).includes("text");
}
function supportsImageIn(m: any) {
  return (m?.architecture?.input_modalities || []).includes("image");
}
function supportsReasoning(m: any) {
  return (m?.supported_parameters || []).includes("reasoning");
}
function supportsWebSearch(m: any) {
  return (m?.supported_parameters || []).includes("web_search");
}
function pricePerM(v?: string) {
  if (!v) return "$0/1M";
  const n = Number(v);
  if (!Number.isFinite(n)) return "—";
  const perM = n * 1_000_000;
  const digits = perM < 0.1 ? 4 : perM < 1 ? 3 : 2;
  return `$${perM.toFixed(digits)}/1M`;
}
function prettyId(id: string) {
  const [firstPart] = (id || "").split(":");
  const parts = (firstPart || "").split("/");
  const last = parts[parts.length - 1] || "";
  return last.replaceAll("-", " ");
}

async function refresh() {
  loading.value = true;
  try {
    await modelStore.fetchModels({ force: true });
    applyFilters();
  } catch (e) {
    showToast("Using cached models (refresh failed)", "error");
  } finally {
    loading.value = false;
  }
}

async function save() {
  saving.value = true;
  try {
    await modelStore.saveSelection();
    showToast("Saved model selection");
  } catch (e) {
    showToast("Failed to save selection", "error");
  } finally {
    saving.value = false;
  }
}

onMounted(async () => {
  // Lock background scroll while the modal is open (mobile-safe, incl. iOS)
  lockedScrollY = window.scrollY || window.pageYOffset || 0;
  originalBodyStyle = {
    overflow: document.body.style.overflow,
    touchAction: document.body.style.touchAction,
    position: document.body.style.position,
    top: document.body.style.top,
    left: document.body.style.left,
    right: document.body.style.right,
    width: document.body.style.width,
  };
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
  document.body.style.position = "fixed";
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";

  loading.value = true;
  try {
    await Promise.all([modelStore.fetchModels(), modelStore.loadSelection()]);
    applyFilters();
  } catch (e) {
    showToast("Loaded from cache (network failed)", "error");
  } finally {
    loading.value = false;
  }
  await checkOpenRouterKey();
  if (typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
      if (e.key === "openrouter_api_key") checkOpenRouterKey();
    });
    window.addEventListener("openrouter:connected", () => checkOpenRouterKey());
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") checkOpenRouterKey();
    });
  }
});

onBeforeUnmount(() => {
  // Restore body scroll when modal closes
  if (originalBodyStyle) {
    document.body.style.overflow = originalBodyStyle.overflow || "";
    document.body.style.touchAction = originalBodyStyle.touchAction || "";
    document.body.style.position = originalBodyStyle.position || "";
    document.body.style.top = originalBodyStyle.top || "";
    document.body.style.left = originalBodyStyle.left || "";
    document.body.style.right = originalBodyStyle.right || "";
    document.body.style.width = originalBodyStyle.width || "";
  }
  // Restore scroll position
  if (typeof window !== "undefined") {
    window.scrollTo(0, lockedScrollY || 0);
  }
});
</script>
