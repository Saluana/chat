<template>
  <div class="w-screen h-screen scrollbar-custom">
    <div class="hidden lg:block w-full h-full" v-if="isServer || isLargeScreen">
      <SplitterGroup direction="horizontal" @layout="splitterLayout = $event">
        <SplitterPanel
          ref="desktopSidebarPanelRef"
          as="aside"
          @resize="handleDesktopSidebarResize"
          :default-size="splitterLayout?.[0] ?? targetDesktopSidebarSize"
          :max-size="50"
          class="z-[20] border-neutral-300 dark:border-neutral-800 bg-neutral-200/50 dark:bg-neutral-950/30 overflow-hidden"
          :class="[isDesktopSidebarOpen && 'border-r']"
        >
          <Sidebar @toggle="toggleDesktopSidebar" />
        </SplitterPanel>
        <SplitterResizeHandle v-if="isDesktopSidebarOpen" />
        <SplitterPanel
          :default-size="splitterLayout?.[1] ?? 100 - targetDesktopSidebarSize"
          as="main"
          class="bg-neutral-50 dark:bg-neutral-900"
        >
          <NuxtPage />
        </SplitterPanel>
      </SplitterGroup>
    </div>

    <div class="block lg:hidden" v-if="isServer || !isLargeScreen">
      <USlideover
        side="left"
        title="Sidebar"
        description="Browse chats"
        v-model:open="isMobileSidebarOpen"
      >
        <template #content>
          <Sidebar
            @toggle="isMobileSidebarOpen = false"
            @new="isMobileSidebarOpen = false"
          />
        </template>
      </USlideover>
    </div>

    <main
      class="h-full block lg:hidden bg-neutral-200/50 dark:bg-neutral-900"
      v-if="isServer || !isLargeScreen"
    >
      <NuxtPage />
    </main>

    <!-- Floating Action Buttons (Top Left) -->
    <ClientOnly>
      <div
        v-if="isLargeScreen && !isDesktopSidebarOpen"
        class="hidden lg:flex absolute top-4 left-4 floating-actions"
      >
        <UButton
          icon="i-lucide-panel-left"
          variant="ghost"
          color="neutral"
          @click="toggleDesktopSidebar()"
        />
        <UModal :overlay="false" v-model:open="searchRef">
          <UButton icon="i-lucide-search" variant="ghost" color="neutral" />
          <template #content>
            <SearchBox />
          </template>
        </UModal>
        <UButton icon="i-lucide-plus" variant="soft" to="/chat" />
      </div>
    </ClientOnly>

    <div
      v-if="isServer || !isLargeScreen"
      class="flex lg:hidden absolute z-[10] top-4 left-4 floating-actions"
    >
      <UButton
        icon="i-lucide-panel-left"
        variant="ghost"
        color="neutral"
        @click="isMobileSidebarOpen = true"
      />
      <UModal :overlay="false" v-model:open="searchRef">
        <UButton icon="i-lucide-search" variant="ghost" color="neutral" />
        <template #content>
          <SearchBox />
        </template>
      </UModal>
      <UButton icon="i-lucide-plus" variant="soft" to="/chat" />
    </div>

    <!-- Floating actions (Top Right) -->
    <div class="absolute z-[10] top-4 right-4 floating-actions">
      <ColorModeToggle />
      <UModal
        v-model:open="settingsRef"
        :ui="{
          content: 'bg-transparent',
        }"
      >
        <UTooltip text="Settings">
          <UButton icon="lucide:settings-2" variant="ghost" color="neutral" />
        </UTooltip>
        <template #content>
          <Settings />
        </template>
      </UModal>
    </div>
  </div>
</template>

<script setup lang="ts">
const { settingsRef } = useSettingsRef();
const { searchRef } = useSearchRef();
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from "reka-ui";
import { TransitionPresets, breakpointsTailwind } from "@vueuse/core";

// Constants
const DEFAULT_SIDEBAR_SIZE = 20;
const MIN_SIDEBAR_SIZE = computed(() => (isLargeScreen.value ? 15 : 20));

// State
const isServer = import.meta.server;
const breakpoints = useBreakpoints(breakpointsTailwind);
const isLargeScreen = breakpoints.greater("lg");
const splitterLayout = useCookie<number[]>("splitterLayout");
const desktopSidebarPanelRef = ref<typeof SplitterPanel | null>(null);
const lastDesktopSidebarSize = ref(
  splitterLayout.value?.[0] ?? DEFAULT_SIDEBAR_SIZE,
);
const targetDesktopSidebarSize = ref(lastDesktopSidebarSize.value);
const isDesktopSidebarOpen = ref(targetDesktopSidebarSize.value > 0);
const isMobileSidebarOpen = ref(false);
const isTransitioning = ref(false);

// Animated State
const animatedDesktopSidebarSize = useTransition(targetDesktopSidebarSize, {
  duration: 100,
  transition: TransitionPresets.easeInOutCubic,
  onStarted: () => (isTransitioning.value = true),
  onFinished: () => (isTransitioning.value = false),
});

// Resize the sidebar panel whenever the size animates
watch(animatedDesktopSidebarSize, (newSize) => {
  nextTick(() => {
    desktopSidebarPanelRef.value?.resize(newSize);
  });
});

const toggleDesktopSidebar = () => {
  if (isDesktopSidebarOpen.value) {
    // Closing
    isDesktopSidebarOpen.value = false;
    const currentSize = desktopSidebarPanelRef.value?.getSize();
    if (currentSize && currentSize > 0) {
      // Store the last known open size only if it was actually open
      lastDesktopSidebarSize.value = currentSize;
    }
    targetDesktopSidebarSize.value = 0;
  } else {
    // Opening
    isDesktopSidebarOpen.value = true;
    // Restore to last size, or default if last size was 0 or undefined
    targetDesktopSidebarSize.value =
      lastDesktopSidebarSize.value > 0
        ? lastDesktopSidebarSize.value
        : DEFAULT_SIDEBAR_SIZE;
  }
};

const handleDesktopSidebarResize = (size: number) => {
  // Prevent collapsing below min size during manual resize when open
  if (
    !isTransitioning.value &&
    isDesktopSidebarOpen.value &&
    size < MIN_SIDEBAR_SIZE.value &&
    desktopSidebarPanelRef.value
  ) {
    desktopSidebarPanelRef.value.resize(MIN_SIDEBAR_SIZE.value);
  }
};
</script>
