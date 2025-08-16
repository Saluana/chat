This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.github/
  FUNDING.yml
packages/
  api/
    drizzle/
      meta/
        _journal.json
        0000_snapshot.json
      0000_brave_gladiator.sql
      migrations.js
    .dev.vars
    drizzle.config.ts
    index.ts
    package.json
    schema.ts
    system-prompt.md
    types.ts
    worker-configuration.d.ts
    wrangler.toml
  app/
    app/
      assets/
        css/
          main.css
        icons/
          nuxflare.svg
      components/
        chat/
          ChatMessage.client.vue
          ChatPrompt.vue
        color-mode/
          ColorModeToggle.vue
        content/
          Center.vue
          CodeCopy.vue
          ProseA.vue
          ProseBlockquote.vue
          ProseCode.vue
          ProseCodeBlock.vue
          ProseEm.vue
          ProseH1.vue
          ProseH2.vue
          ProseH3.vue
          ProseH4.vue
          ProseH5.vue
          ProseH6.vue
          ProseHr.vue
          ProseImg.vue
          ProseLi.vue
          ProseOl.vue
          ProseP.vue
          ProsePre.vue
          ProseStrong.vue
          ProseTable.vue
          ProseTbody.vue
          ProseTd.vue
          ProseTh.vue
          ProseThead.vue
          ProseTr.vue
          ProseUl.vue
        AssistantErrorMessage.vue
        AssistantMessage.vue
        ChatThread.vue
        DeleteModal.vue
        LoaderSpin.vue
        MarkdownChunkRenderer.client.vue
        MarkdownRenderer.vue
        ModelSelector.vue
        Reasoning.vue
        ReasoningBudget.vue
        SearchBox.client.vue
        Settings.vue
        Sidebar.vue
        StreamingMessage.vue
        WebSearch.vue
      composables/
        useModelStore.ts
        usePromptStore.ts
        useSearchRef.ts
        useSettingsRef.ts
        useThreadsStore.ts
      layouts/
        chat.vue
      pages/
        [[id]].vue
      plugins/
        sync.client.ts
      utils/
        markdown.ts
        shared-service.js
        showToast.ts
        sqlite.ts
        sync-service.ts
      workers/
        database.ts
      app.config.ts
      app.vue
    public/
      robots.txt
      SharedService_ServiceWorker.js
    server/
      tsconfig.json
    nuxt.config.ts
    package.json
    tsconfig.json
  wa-sqlite/
    src/
      examples/
        AccessHandlePoolVFS.js
        IDBBatchAtomicVFS.js
        IDBMirrorVFS.js
        MemoryAsyncVFS.js
        MemoryVFS.js
        OPFSAdaptiveVFS.js
        OPFSAnyContextVFS.js
        OPFSCoopSyncVFS.js
        OPFSPermutedVFS.js
        README.md
        tag.js
      types/
        globals.d.ts
        index.d.ts
        tsconfig.json
      asyncify_imports.json
      exported_functions.json
      extra_exported_runtime_methods.json
      FacadeVFS.js
      jspi_exports.json
      libadapters.h
      libadapters.js
      libauthorizer.c
      libauthorizer.js
      libfunction.c
      libfunction.js
      libhook.c
      libhook.js
      libprogress.c
      libprogress.js
      libvfs.c
      libvfs.js
      main.c
      sqlite-api.js
      sqlite-constants.js
      VFS.js
      WebLocksMixin.js
    .editorconfig
    .gitignore
    .yarnrc.yml
    ACKNOWLEDGMENTS.md
    jsconfig.json
    Makefile
    package.json
    README.md
    typedoc.json
    web-test-runner.config.mjs
.env.example
.gitignore
.prettierrc.json
AGENTS.md
alchemy.run.ts
LICENSE.md
package.json
README.md
```

# Files

## File: .github/FUNDING.yml
````yaml
# These are supported funding model platforms

github: [tanayvk]
patreon: # Replace with a single Patreon username
open_collective: # Replace with a single Open Collective username
ko_fi: # Replace with a single Ko-fi username
tidelift: # Replace with a single Tidelift platform-name/package-name e.g., npm/babel
community_bridge: # Replace with a single Community Bridge project-name e.g., cloud-foundry
liberapay: # Replace with a single Liberapay username
issuehunt: # Replace with a single IssueHunt username
lfx_crowdfunding: # Replace with a single LFX Crowdfunding project-name e.g., cloud-foundry
polar: # Replace with a single Polar username
buy_me_a_coffee: # Replace with a single Buy Me a Coffee username
thanks_dev: # Replace with a single thanks.dev username
custom: # Replace with up to 4 custom sponsorship URLs e.g., ['link1', 'link2']
````

## File: packages/api/drizzle/0000_brave_gladiator.sql
````sql
CREATE TABLE `attachments` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted` integer DEFAULT false NOT NULL,
	`clock` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `kv` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`value` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`clock` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `kv_name_unique` ON `kv` (`name`);--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text,
	`role` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`error` text,
	`deleted` integer DEFAULT false NOT NULL,
	`thread_id` text NOT NULL,
	`index` integer NOT NULL,
	`clock` integer NOT NULL,
	`stream_id` text
);
--> statement-breakpoint
CREATE TABLE `threads` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`last_message_at` integer,
	`parent_thread_id` text,
	`status` text DEFAULT 'ready' NOT NULL,
	`deleted` integer DEFAULT false NOT NULL,
	`pinned` integer DEFAULT false NOT NULL,
	`clock` integer NOT NULL
);
````

## File: packages/api/.dev.vars
````
AUTH_URL="https://auth.chat.nuxflare.com"
AUTH_CLIENT_ID="nuxflare-chat"
````

## File: packages/api/drizzle.config.ts
````typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./schema.ts",
  dialect: "sqlite",
  driver: "durable-sqlite",
});
````

## File: packages/api/package.json
````json
{
  "name": "@nuxflare-chat/api",
  "version": "0.0.0",
  "type": "module",
  "export": {
    "./types": "./types"
  },
  "devDependencies": {
    "drizzle-kit": "^0.31.1",
    "wrangler": "^4.20.0"
  },
  "dependencies": {
    "@ai-sdk/google": "^1.2.19",
    "@nuxflare-chat/common": "workspace:*",
    "@openrouter/ai-sdk-provider": "^0.7.2",
    "ai": "^4.3.16",
    "drizzle-orm": "^0.44.2",
    "hono": "^4.7.11",
    "valibot": "^1.1.0"
  }
}
````

## File: packages/api/system-prompt.md
````markdown
I am Nuxflare Chat. My role is to assist and engage in conversation while being helpful, respectful, and engaging.

- The current date and time including timezone is {{time}}.
- Always use LaTeX for mathematical expressions:
  - Inline math must be wrapped in escaped parentheses: \( content \)
  - Do not use single dollar signs for inline math
  - Display math must be wrapped in double dollar signs: $$ content $$
- Do not use the backslash character to escape parenthesis. Use the actual parentheses instead.
- Ensure code is properly formatted using Prettier with a print width of 80 characters
- Present code in Markdown code blocks with the correct language extension indicated
````

## File: packages/app/app/assets/icons/nuxflare.svg
````
<svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="250" cy="250" r="150" fill="#FF6500" fill-opacity="0.1"/>
<circle cx="250" cy="250" r="210" fill="#FF6500" fill-opacity="0.1"/>
<circle cx="250" cy="250" r="240" fill="#FF6500" fill-opacity="0.1"/>
<circle cx="250" cy="250" r="239" stroke="#C40C0C" stroke-opacity="0.1" stroke-width="2"/>
<g filter="url(#filter0_f_262_50)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M212.146 152.653L176.677 217.732C161.793 245.049 154.345 258.7 158.445 269.429L158.654 269.963C162.997 280.534 175.855 280.534 201.558 280.534C215.841 280.534 222.988 280.534 227.459 286.236L227.69 286.551L272.541 214.764L272.309 214.449C267.919 208.622 267.919 199.322 267.919 180.708V175.838C267.919 124.236 267.919 98.4433 257.228 93.9979C246.536 89.5524 235.069 110.586 212.146 152.653Z" fill="#FF8A08"/>
<path opacity="0.5" d="M232.081 320.292V325.162C232.081 376.748 232.081 402.557 242.772 407.002C253.463 411.448 264.931 390.414 287.866 348.347L323.334 283.268C338.207 255.951 345.655 242.3 341.555 231.571L341.346 231.037C337.002 220.466 324.145 220.466 298.441 220.466C284.159 220.466 277.012 220.466 272.541 214.764L227.69 286.551C232.081 292.378 232.081 301.678 232.081 320.292Z" fill="#FF8A08"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M212.146 152.653L176.677 217.732C161.793 245.049 154.345 258.7 158.445 269.429L158.654 269.963C162.997 280.534 175.855 280.534 201.558 280.534C215.841 280.534 222.988 280.534 227.459 286.236L227.69 286.551L272.541 214.764L272.309 214.449C267.919 208.622 267.919 199.322 267.919 180.708V175.838C267.919 124.236 267.919 98.4433 257.228 93.9979C246.536 89.5524 235.069 110.586 212.146 152.653Z" fill="#FF8A08"/>
<path opacity="0.5" d="M232.081 320.292V325.162C232.081 376.748 232.081 402.557 242.772 407.002C253.463 411.448 264.931 390.414 287.866 348.347L323.334 283.268C338.207 255.951 345.655 242.3 341.555 231.571L341.346 231.037C337.002 220.466 324.145 220.466 298.441 220.466C284.159 220.466 277.012 220.466 272.541 214.764L227.69 286.551C232.081 292.378 232.081 301.678 232.081 320.292Z" fill="#FF8A08"/>
<defs>
<filter id="filter0_f_262_50" x="81" y="32" width="338" height="437" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="15" result="effect1_foregroundBlur_262_50"/>
</filter>
</defs>
</svg>
````

## File: packages/app/app/components/color-mode/ColorModeToggle.vue
````vue
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
````

## File: packages/app/app/components/content/Center.vue
````vue
<template>
  <div class="w-full flex justify-center">
    <slot />
  </div>
</template>
````

## File: packages/app/app/components/content/ProseA.vue
````vue
<template>
  <NuxtLink
    :href="href"
    :target="target"
    :external="external"
    class="font-semibold underline underline-offset-4"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const { href = "", external = false } = defineProps<{
  href?: string;
  target?: any;
  external?: boolean;
}>();
</script>
````

## File: packages/app/app/components/content/ProseBlockquote.vue
````vue
<template>
  <blockquote class="border-l-2 pl-6 italic [&:not(:first-child)]:mt-6">
    <slot />
  </blockquote>
</template>
````

## File: packages/app/app/components/content/ProseCodeBlock.vue
````vue
<template>
  <UCard
    :ui="{ body: 'px-0 py-0 sm:p-0' }"
    class="mt-4 relative overflow-hidden [&:not(:first-child)]:mt-5 [&:not(:last-child)]:mb-5"
    :class="[
      inGroup && 'mb-0 rounded-t-none border-none shadow-none',
      inStack && 'mb-0 rounded-none border-none shadow-none',
    ]"
  >
    <div
      v-if="!inGroup && filename"
      class="flex items-center border-b border-gray-200 dark:border-gray-800 px-3 py-2 font-mono text-sm"
    >
      <UIcon v-if="icon" :name="icon" class="mr-1.5 self-center" />
      {{ filename }}
      <CodeCopy :code class="ml-auto" />
    </div>

    <span v-if="!filename" class="absolute right-2 top-2 z-10">
      <CodeCopy :code />
    </span>
    <div class="bg-gray-200/5 dark:bg-gray-800/5">
      <div
        class="overflow-x-auto py-3 text-sm"
        :class="[
          !inGroup && !filename && 'inline-copy',
          !language && 'pl-3',
          !inGroup,
        ]"
      >
        <slot />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { BuiltinLanguage } from "shiki";

const props = defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String as PropType<BuiltinLanguage>,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  inGroup: {
    type: Boolean,
    default: false,
  },
  inStack: {
    type: Boolean,
    default: false,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
});

const iconMap = new Map();
const icon =
  iconMap.get(props.filename?.toLowerCase()) || iconMap.get(props.language);
</script>

<style>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.shiki .line.highlight {
  background-color: hsl(var(--muted) / 0.8);
}

.shiki .line {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.inline-copy .line {
  padding-right: 2.75rem;
}
</style>
````

## File: packages/app/app/components/content/ProseEm.vue
````vue
<template>
  <em>
    <slot />
  </em>
</template>
````

## File: packages/app/app/components/content/ProseH1.vue
````vue
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
````

## File: packages/app/app/components/content/ProseH2.vue
````vue
<template>
  <h2
    :id
    class="scroll-m-20 mb-8 text-4xl font-semibold tracking-tight transition-colors [&:not(:first-child)]:mt-10"
  >
    <NuxtLink v-if="id && generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h2>
</template>

<script setup lang="ts">
const { id } = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
  () =>
    id &&
    (headings?.anchorLinks === true ||
      (typeof headings?.anchorLinks !== "boolean" &&
        headings?.anchorLinks?.h2)),
);
</script>
````

## File: packages/app/app/components/content/ProseH3.vue
````vue
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
````

## File: packages/app/app/components/content/ProseH4.vue
````vue
<template>
  <h4
    :id
    class="scroll-m-20 text-xl font-semibold tracking-tight [&:not(:first-child)]:mt-6"
  >
    <NuxtLink v-if="id && generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h4>
</template>

<script setup lang="ts">
const { id } = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
  () =>
    id &&
    (headings?.anchorLinks === true ||
      (typeof headings?.anchorLinks !== "boolean" &&
        headings?.anchorLinks?.h4)),
);
</script>
````

## File: packages/app/app/components/content/ProseH5.vue
````vue
<template>
  <h5
    :id
    class="scroll-m-20 text-lg font-semibold tracking-tight [&:not(:first-child)]:mt-6"
  >
    <NuxtLink v-if="id && generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h5>
</template>

<script setup lang="ts">
const { id } = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
  () =>
    id &&
    (headings?.anchorLinks === true ||
      (typeof headings?.anchorLinks !== "boolean" &&
        headings?.anchorLinks?.h5)),
);
</script>
````

## File: packages/app/app/components/content/ProseH6.vue
````vue
<template>
  <h6
    :id
    class="scroll-m-20 text-lg font-semibold tracking-tight [&:not(:first-child)]:mt-6"
  >
    <NuxtLink v-if="id && generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h6>
</template>

<script setup lang="ts">
const { id } = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
  () =>
    id &&
    (headings?.anchorLinks === true ||
      (typeof headings?.anchorLinks !== "boolean" &&
        headings?.anchorLinks?.h6)),
);
</script>
````

## File: packages/app/app/components/content/ProseHr.vue
````vue
<template>
  <hr
    class="border-primary-400 dark:border-primary-800 [&:not(:first-child)]:mt-6"
  />
</template>
````

## File: packages/app/app/components/content/ProseImg.vue
````vue
<template>
  <img
    :src="refinedSrc"
    :alt
    :width
    :height
    class="rounded-md [&:not(:first-child)]:mt-8 [&:not(:last-child)]:mb-8"
  />
</template>

<script setup lang="ts">
import { joinURL, withLeadingSlash, withTrailingSlash } from "ufo";
import { computed, useRuntimeConfig } from "#imports";

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
});

const refinedSrc = computed(() => {
  if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
    const _base = withLeadingSlash(
      withTrailingSlash(useRuntimeConfig().app.baseURL),
    );
    if (_base !== "/" && !props.src.startsWith(_base))
      return joinURL(_base, props.src);
  }
  return props.src;
});
</script>
````

## File: packages/app/app/components/content/ProseLi.vue
````vue
<template>
  <li class="[&>ol]:!mt-2 [&>ul]:!mt-2">
    <slot />
  </li>
</template>
````

## File: packages/app/app/components/content/ProseOl.vue
````vue
<template>
  <ol
    class="ml-10 list-decimal [&:not(:first-child)]:mt-6 [&:not(:last-child)]:mb-6 [&>li:not(:first-child)]:mt-2"
  >
    <slot />
  </ol>
</template>
````

## File: packages/app/app/components/content/ProseP.vue
````vue
<template>
  <p class="leading-8 [&:not(:first-child)]:mt-6 tracking-wide text-xl">
    <slot />
  </p>
</template>
````

## File: packages/app/app/components/content/ProsePre.vue
````vue
<template>
  <ProseCodeBlock
    :code="code"
    :language="language"
    :filename="filename"
    :highlights="highlights"
    :meta="meta"
  >
    <pre class="px-2" :class="$props.class" :style="style"><slot /></pre>
  </ProseCodeBlock>
</template>

<script setup lang="ts">
import type { BuiltinLanguage } from "shiki";

defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String as PropType<BuiltinLanguage>,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
  style: {
    type: [String, Object],
    default: null,
  },
});
</script>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
````

## File: packages/app/app/components/content/ProseStrong.vue
````vue
<template>
  <strong class="font-semibold">
    <slot />
  </strong>
</template>
````

## File: packages/app/app/components/content/ProseTable.vue
````vue
<template>
  <div
    class="w-full overflow-y-auto [&:not(:first-child)]:mt-6 [&:not(:last-child)]:mb-6"
  >
    <table class="w-full">
      <slot />
    </table>
  </div>
</template>
````

## File: packages/app/app/components/content/ProseTbody.vue
````vue
<template>
  <tbody>
    <slot />
  </tbody>
</template>
````

## File: packages/app/app/components/content/ProseTd.vue
````vue
<template>
  <td
    class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
  >
    <slot />
  </td>
</template>
````

## File: packages/app/app/components/content/ProseTh.vue
````vue
<template>
  <th
    class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
  >
    <slot />
  </th>
</template>
````

## File: packages/app/app/components/content/ProseThead.vue
````vue
<template>
  <thead>
    <slot />
  </thead>
</template>
````

## File: packages/app/app/components/content/ProseTr.vue
````vue
<template>
  <tr class="m-0 border-t p-0 even:bg-muted/50">
    <slot />
  </tr>
</template>
````

## File: packages/app/app/components/content/ProseUl.vue
````vue
<template>
  <ul
    class="ml-6 list-disc [&:not(:first-child)]:mt-6 [&:not(:last-child)]:mb-6 [&>li:not(:first-child)]:mt-2"
  >
    <slot />
  </ul>
</template>
````

## File: packages/app/app/components/LoaderSpin.vue
````vue
<template>
  <div class="flex flex-col gap-2 items-center justify-center">
    <span
      v-if="props.text"
      class="text-primary text-sm text-center max-w-[60%]"
      >{{ props.text }}</span
    >
    <UIcon
      class="text-primary-400 animate-spin"
      :class="[`w-${props.size || 6}`, `h-${props.size || 6}`]"
      name="i-heroicons-arrow-path-20-solid"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text?: string;
  size?: number;
}>();
</script>
````

## File: packages/app/app/components/WebSearch.vue
````vue
<template>
  <UAccordion
    :items="items"
    :ui="{
      content: 'p-3 rounded-lg bg-white dark:bg-neutral-800',
      body: 'text-md',
      trigger: 'cursor-pointer relative',
      trailingIcon: 'absolute left-0',
    }"
  >
    <template #default="{ item }">
      <p class="text-[15px] font-semibold ml-8">{{ item.label }}</p>
    </template>
  </UAccordion>
</template>

<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";
interface Props {
  content: string;
}
const props = defineProps<Props>();
const open = ref(false);
const items = ref<AccordionItem[]>([
  {
    label: "Web Search",
    content: props.content,
  },
]);
</script>
````

## File: packages/app/app/composables/useSearchRef.ts
````typescript
export const useSearchRef = () => {
  const searchRef = useState("searchRef", () => false);
  return {
    searchRef,
  };
};
````

## File: packages/app/app/composables/useSettingsRef.ts
````typescript
export const useSettingsRef = () => {
  const settingsRef = useState("settingsRef", () => false);
  return {
    settingsRef,
  };
};
````

## File: packages/app/app/utils/showToast.ts
````typescript
export default function showToast(message: string = "", error: string = "") {
  const toast = useToast();
  toast.add({
    title: message,
    icon: error ? "material-symbols:error-outline" : "i-lucide:check-circle",
    duration: 2000,
    close: {
      class: "hidden",
    },
    color: error ? "error" : "primary",
  });
}
````

## File: packages/app/public/robots.txt
````

````

## File: packages/app/server/tsconfig.json
````json
{
  "extends": "../.nuxt/tsconfig.server.json"
}
````

## File: packages/app/tsconfig.json
````json
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "extends": "./.nuxt/tsconfig.json"
}
````

## File: packages/wa-sqlite/src/examples/AccessHandlePoolVFS.js
````javascript
// Copyright 2023 Roy T. Hashimoto. All Rights Reserved.
import { FacadeVFS } from '../FacadeVFS.js';
import * as VFS from '../VFS.js';

const SECTOR_SIZE = 4096;

// Each OPFS file begins with a fixed-size header with metadata. The
// contents of the file follow immediately after the header.
const HEADER_MAX_PATH_SIZE = 512;
const HEADER_FLAGS_SIZE = 4;
const HEADER_DIGEST_SIZE = 8;
const HEADER_CORPUS_SIZE = HEADER_MAX_PATH_SIZE + HEADER_FLAGS_SIZE;
const HEADER_OFFSET_FLAGS = HEADER_MAX_PATH_SIZE;
const HEADER_OFFSET_DIGEST = HEADER_CORPUS_SIZE;
const HEADER_OFFSET_DATA = SECTOR_SIZE;

// These file types are expected to persist in the file system outside
// a session. Other files will be removed on VFS start.
const PERSISTENT_FILE_TYPES =
  VFS.SQLITE_OPEN_MAIN_DB |
  VFS.SQLITE_OPEN_MAIN_JOURNAL |
  VFS.SQLITE_OPEN_SUPER_JOURNAL |
  VFS.SQLITE_OPEN_WAL;

const DEFAULT_CAPACITY = 6;

/**
 * This VFS uses the updated Access Handle API with all synchronous methods
 * on FileSystemSyncAccessHandle (instead of just read and write). It will
 * work with the regular SQLite WebAssembly build, i.e. the one without
 * Asyncify.
 */
export class AccessHandlePoolVFS extends FacadeVFS {
  log = null; //function(...args) { console.log(`[${contextName}]`, ...args) };

  // All the OPFS files the VFS uses are contained in one flat directory
  // specified in the constructor. No other files should be written here.
  #directoryPath;
  #directoryHandle;

  // The OPFS files all have randomly-generated names that do not match
  // the SQLite files whose data they contain. This map links those names
  // with their respective OPFS access handles.
  #mapAccessHandleToName = new Map();

  // When a SQLite file is associated with an OPFS file, that association
  // is kept in #mapPathToAccessHandle. Each access handle is in exactly
  // one of #mapPathToAccessHandle or #availableAccessHandles.
  #mapPathToAccessHandle = new Map();
  #availableAccessHandles = new Set();

  #mapIdToFile = new Map();

  static async create(name, module) {
    const vfs = new AccessHandlePoolVFS(name, module);
    await vfs.isReady();
    return vfs;
  }
  
  constructor(name, module) {
    super(name, module);
    this.#directoryPath = name;
  }

  /**
   * @param {string?} zName 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {number}
   */
  jOpen(zName, fileId, flags, pOutFlags) {
    try {
      // First try to open a path that already exists in the file system.
      const path = zName ? this.#getPath(zName) : Math.random().toString(36);
      let accessHandle = this.#mapPathToAccessHandle.get(path);
      if (!accessHandle && (flags & VFS.SQLITE_OPEN_CREATE)) {
        // File not found so try to create it.
        if (this.getSize() < this.getCapacity()) {
          // Choose an unassociated OPFS file from the pool.
          ([accessHandle] = this.#availableAccessHandles.keys());
          this.#setAssociatedPath(accessHandle, path, flags);
        } else {
          // Out of unassociated files. This can be fixed by calling
          // addCapacity() from the application.
          throw new Error('cannot create file');
        }
      }
      if (!accessHandle) {
        throw new Error('file not found');
      }
      // Subsequent methods are only passed the fileId, so make sure we have
      // a way to get the file resources.
      const file = { path, flags, accessHandle };
      this.#mapIdToFile.set(fileId, file);

      pOutFlags.setInt32(0, flags, true);
      return VFS.SQLITE_OK;
    } catch (e) {
      console.error(e.message);
      return VFS.SQLITE_CANTOPEN;
    }
  }

  /**
   * @param {number} fileId 
   * @returns {number}
   */
  jClose(fileId) {
    const file = this.#mapIdToFile.get(fileId);
    if (file) {
      file.accessHandle.flush();
      this.#mapIdToFile.delete(fileId);
      if (file.flags & VFS.SQLITE_OPEN_DELETEONCLOSE) {
        this.#deletePath(file.path);
      }
    }
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  jRead(fileId, pData, iOffset) {
    const file = this.#mapIdToFile.get(fileId);
    const nBytes = file.accessHandle.read(
      pData.subarray(),
      { at: HEADER_OFFSET_DATA + iOffset });
    if (nBytes < pData.byteLength) {
      pData.fill(0, nBytes, pData.byteLength);
      return VFS.SQLITE_IOERR_SHORT_READ;
    }
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  jWrite(fileId, pData, iOffset) {
    const file = this.#mapIdToFile.get(fileId);
    const nBytes = file.accessHandle.write(
      pData.subarray(),
      { at: HEADER_OFFSET_DATA + iOffset });
    return nBytes === pData.byteLength ? VFS.SQLITE_OK : VFS.SQLITE_IOERR;
  }

  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {number}
   */
  jTruncate(fileId, iSize) {
    const file = this.#mapIdToFile.get(fileId);
    file.accessHandle.truncate(HEADER_OFFSET_DATA + iSize);
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  jSync(fileId, flags) {
    const file = this.#mapIdToFile.get(fileId);
    file.accessHandle.flush();
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {number}
   */
  jFileSize(fileId, pSize64) {
    const file = this.#mapIdToFile.get(fileId);
    const size = file.accessHandle.getSize() - HEADER_OFFSET_DATA;
    pSize64.setBigInt64(0, BigInt(size), true);
    return VFS.SQLITE_OK;
  }

  jSectorSize(fileId) {
    return SECTOR_SIZE;
  }

  jDeviceCharacteristics(fileId) {
    return VFS.SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN;
  }

  /**
   * @param {string} zName 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {number}
   */
  jAccess(zName, flags, pResOut) {
    const path = this.#getPath(zName);
    pResOut.setInt32(0, this.#mapPathToAccessHandle.has(path) ? 1 : 0, true);
    return VFS.SQLITE_OK;
  }

  /**
   * @param {string} zName 
   * @param {number} syncDir 
   * @returns {number}
   */
  jDelete(zName, syncDir) {
    const path = this.#getPath(zName);
    this.#deletePath(path);
    return VFS.SQLITE_OK;
  }

  async close() {
    await this.#releaseAccessHandles();
  }

  async isReady() {
    if (!this.#directoryHandle) {
      // All files are stored in a single directory.
      let handle = await navigator.storage.getDirectory();
      for (const d of this.#directoryPath.split('/')) {
        if (d) {
          handle = await handle.getDirectoryHandle(d, { create: true });
        }
      }
      this.#directoryHandle = handle;

      await this.#acquireAccessHandles();
      if (this.getCapacity() === 0) {
        await this.addCapacity(DEFAULT_CAPACITY);
      }
    }
    return true;
  }

  /**
   * Returns the number of SQLite files in the file system.
   * @returns {number}
   */
  getSize() {
    return this.#mapPathToAccessHandle.size;
  }

  /**
   * Returns the maximum number of SQLite files the file system can hold.
   * @returns {number}
   */
  getCapacity() {
    return this.#mapAccessHandleToName.size;
  }

  /**
   * Increase the capacity of the file system by n.
   * @param {number} n 
   * @returns {Promise<number>} 
   */
  async addCapacity(n) {
    for (let i = 0; i < n; ++i) {
      const name = Math.random().toString(36).replace('0.', '');
      const handle = await this.#directoryHandle.getFileHandle(name, { create: true });
      const accessHandle = await handle.createSyncAccessHandle();
      this.#mapAccessHandleToName.set(accessHandle, name);

      this.#setAssociatedPath(accessHandle, '', 0);
    }
    return n;
  }

  /**
   * Decrease the capacity of the file system by n. The capacity cannot be
   * decreased to fewer than the current number of SQLite files in the
   * file system.
   * @param {number} n 
   * @returns {Promise<number>}
   */
  async removeCapacity(n) {
    let nRemoved = 0;
    for (const accessHandle of Array.from(this.#availableAccessHandles)) {
      if (nRemoved == n || this.getSize() === this.getCapacity()) return nRemoved;

      const name = this.#mapAccessHandleToName.get(accessHandle);
      await accessHandle.close();
      await this.#directoryHandle.removeEntry(name);
      this.#mapAccessHandleToName.delete(accessHandle);
      this.#availableAccessHandles.delete(accessHandle);
      ++nRemoved;
    }
    return nRemoved;
  }

  async #acquireAccessHandles() {
    // Enumerate all the files in the directory.
    const files = [];
    for await (const [name, handle] of this.#directoryHandle) {
      if (handle.kind === 'file') {
        files.push([name, handle]);
      }
    }

    // Open access handles in parallel, separating associated and unassociated.
    await Promise.all(files.map(async ([name, handle]) => {
      const accessHandle = await handle.createSyncAccessHandle();
      this.#mapAccessHandleToName.set(accessHandle, name);
      const path = this.#getAssociatedPath(accessHandle);
      if (path) {
        this.#mapPathToAccessHandle.set(path, accessHandle);
      } else {
        this.#availableAccessHandles.add(accessHandle);
      }
    }));
  }

  #releaseAccessHandles() {
    for (const accessHandle of this.#mapAccessHandleToName.keys()) {
      accessHandle.close();
    }
    this.#mapAccessHandleToName.clear();
    this.#mapPathToAccessHandle.clear();
    this.#availableAccessHandles.clear();
  }

  /**
   * Read and return the associated path from an OPFS file header.
   * Empty string is returned for an unassociated OPFS file.
   * @param accessHandle FileSystemSyncAccessHandle
   * @returns {string} path or empty string
   */
  #getAssociatedPath(accessHandle) {
    // Read the path and digest of the path from the file.
    const corpus = new Uint8Array(HEADER_CORPUS_SIZE);
    accessHandle.read(corpus, { at: 0 })

    // Delete files not expected to be present.
    const dataView = new DataView(corpus.buffer, corpus.byteOffset);
    const flags = dataView.getUint32(HEADER_OFFSET_FLAGS);
    if (corpus[0] &&
        ((flags & VFS.SQLITE_OPEN_DELETEONCLOSE) ||
         (flags & PERSISTENT_FILE_TYPES) === 0)) {
      console.warn(`Remove file with unexpected flags ${flags.toString(16)}`);
      this.#setAssociatedPath(accessHandle, '', 0);
      return '';
    }

    const fileDigest = new Uint32Array(HEADER_DIGEST_SIZE / 4);
    accessHandle.read(fileDigest, { at: HEADER_OFFSET_DIGEST });

    // Verify the digest.
    const computedDigest = this.#computeDigest(corpus);
    if (fileDigest.every((value, i) => value === computedDigest[i])) {
      // Good digest. Decode the null-terminated path string.
      const pathBytes = corpus.findIndex(value => value === 0);
      if (pathBytes === 0) {
        // Ensure that unassociated files are empty. Unassociated files are
        // truncated in #setAssociatedPath after the header is written. If
        // an interruption occurs right before the truncation then garbage
        // may remain in the file.
        accessHandle.truncate(HEADER_OFFSET_DATA);
      }
      return new TextDecoder().decode(corpus.subarray(0, pathBytes));
    } else {
      // Bad digest. Repair this header.
      console.warn('Disassociating file with bad digest.');
      this.#setAssociatedPath(accessHandle, '', 0);
      return '';
    }
  }

  /**
   * Set the path on an OPFS file header.
   * @param accessHandle FileSystemSyncAccessHandle
   * @param {string} path
   * @param {number} flags
   */
  #setAssociatedPath(accessHandle, path, flags) {
    // Convert the path string to UTF-8.
    const corpus = new Uint8Array(HEADER_CORPUS_SIZE);
    const encodedResult = new TextEncoder().encodeInto(path, corpus);
    if (encodedResult.written >= HEADER_MAX_PATH_SIZE) {
      throw new Error('path too long');
    }

    // Add the creation flags.
    const dataView = new DataView(corpus.buffer, corpus.byteOffset);
    dataView.setUint32(HEADER_OFFSET_FLAGS, flags);

    // Write the OPFS file header, including the digest.
    const digest = this.#computeDigest(corpus);
    accessHandle.write(corpus, { at: 0 });
    accessHandle.write(digest, { at: HEADER_OFFSET_DIGEST });
    accessHandle.flush();

    if (path) {
      this.#mapPathToAccessHandle.set(path, accessHandle);
      this.#availableAccessHandles.delete(accessHandle);
    } else {
      // This OPFS file doesn't represent any SQLite file so it doesn't
      // need to keep any data.
      accessHandle.truncate(HEADER_OFFSET_DATA);
      this.#availableAccessHandles.add(accessHandle);
    }
  }

  /**
   * We need a synchronous digest function so can't use WebCrypto.
   * Adapted from https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
   * @param {Uint8Array} corpus 
   * @returns {ArrayBuffer} 64-bit digest
   */
  #computeDigest(corpus) {
    if (!corpus[0]) {
      // Optimization for deleted file.
      return new Uint32Array([0xfecc5f80, 0xaccec037]);
    }

    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    
    for (const value of corpus) {
      h1 = Math.imul(h1 ^ value, 2654435761);
      h2 = Math.imul(h2 ^ value, 1597334677);
    }
    
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    
    return new Uint32Array([h1 >>> 0, h2 >>> 0]);
  };
  
  /**
   * Convert a bare filename, path, or URL to a UNIX-style path.
   * @param {string|URL} nameOrURL
   * @returns {string} path
   */
  #getPath(nameOrURL) {
    const url = typeof nameOrURL === 'string' ?
      new URL(nameOrURL, 'file://localhost/') :
      nameOrURL;
    return url.pathname;
  }

  /**
   * Remove the association between a path and an OPFS file.
   * @param {string} path 
   */
  #deletePath(path) {
    const accessHandle = this.#mapPathToAccessHandle.get(path);
    if (accessHandle) {
      // Un-associate the SQLite path from the OPFS file.
      this.#mapPathToAccessHandle.delete(path);
      this.#setAssociatedPath(accessHandle, '', 0);
    }
  }
}
````

## File: packages/wa-sqlite/src/examples/IDBBatchAtomicVFS.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
import { FacadeVFS } from '../FacadeVFS.js';
import * as VFS from '../VFS.js';
import { WebLocksMixin } from '../WebLocksMixin.js';

const RETRYABLE_ERRORS = new Set([
  'TransactionInactiveError',
  'InvalidStateError'
]);

/**
 * @typedef Metadata
 * @property {string} name
 * @property {number} fileSize
 * @property {number} version
 * @property {number} [pendingVersion]
 */

class File {
  /** @type {string} */ path;
  /** @type {number} */ flags;

  /** @type {Metadata} */ metadata;
  /** @type {number} */ fileSize = 0;

  /** @type {boolean} */ needsMetadataSync = false;
  /** @type {Metadata} */ rollback = null;
  /** @type {Set<number>} */ changedPages = new Set();

  /** @type {string} */ synchronous = 'full';
  /** @type {IDBTransactionOptions} */ txOptions = { durability: 'strict' };

  constructor(path, flags, metadata) {
    this.path = path;
    this.flags = flags;
    this.metadata = metadata;
  }
}

export class IDBBatchAtomicVFS extends WebLocksMixin(FacadeVFS) {
  /** @type {Map<number, File>} */ mapIdToFile = new Map();
  lastError = null;

  log = null; // console.log

  /** @type {Promise} */ #isReady;
  /** @type {IDBContext} */ #idb;

  static async create(name, module, options) {
    const vfs = new IDBBatchAtomicVFS(name, module, options);
    await vfs.isReady();
    return vfs;
  }

  constructor(name, module, options = {}) {
    super(name, module, options);
    this.#isReady = this.#initialize(options.idbName ?? name);
  }

  async #initialize(name) {
    this.#idb = await IDBContext.create(name);
  }

  close() {
    this.#idb.close();
  }
  
  async isReady() {
    await super.isReady();
    await this.#isReady;
  }

  getFilename(fileId) {
    const pathname = this.mapIdToFile.get(fileId).path;
    return `IDB(${this.name}):${pathname}`
  }
  
  /**
   * @param {string?} zName 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {Promise<number>}
   */
  async jOpen(zName, fileId, flags, pOutFlags) {
    try {
      const url = new URL(zName || Math.random().toString(36).slice(2), 'file://');
      const path = url.pathname;

      let meta = await this.#idb.q(({ metadata }) => metadata.get(path));
      if (!meta && (flags & VFS.SQLITE_OPEN_CREATE)) {
        meta = {
          name: path,
          fileSize: 0,
          version: 0
        };
        await this.#idb.q(({ metadata }) => metadata.put(meta), 'rw');
      }
      
      if (!meta) {
        throw new Error(`File ${path} not found`);
      }

      const file = new File(path, flags, meta);
      this.mapIdToFile.set(fileId, file);
      pOutFlags.setInt32(0, flags, true);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_CANTOPEN;
    }
  }

  /**
   * @param {string} zName 
   * @param {number} syncDir 
   * @returns {Promise<number>}
   */
  async jDelete(zName, syncDir) {
    try {
      const url = new URL(zName, 'file://');
      const path = url.pathname;

      this.#idb.q(({ metadata, blocks }) => {
        const range = IDBKeyRange.bound([path, -Infinity], [path, Infinity]);
        blocks.delete(range);
        metadata.delete(path);
      }, 'rw');

      if (syncDir) {
        await this.#idb.sync(false);
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_DELETE;
    }
  }

  /**
   * @param {string} zName 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {Promise<number>}
   */
  async jAccess(zName, flags, pResOut) {
    try {
      const url = new URL(zName, 'file://');
      const path = url.pathname;

      const meta = await this.#idb.q(({ metadata }) => metadata.get(path));
      pResOut.setInt32(0, meta ? 1 : 0, true);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_ACCESS;
    } 
  }

  /**
   * @param {number} fileId 
   * @returns {Promise<number>}
   */
  async jClose(fileId) {
    try {
      const file = this.mapIdToFile.get(fileId);
      this.mapIdToFile.delete(fileId);

      if (file.flags & VFS.SQLITE_OPEN_DELETEONCLOSE) {
        await this.#idb.q(({ metadata, blocks }) => {
          metadata.delete(file.path);
          blocks.delete(IDBKeyRange.bound([file.path, 0], [file.path, Infinity]));
        }, 'rw');        
      }

      if (file.needsMetadataSync) {
        this.#idb.q(({ metadata }) => metadata.put(file.metadata), 'rw');
      }
      await this.#idb.sync(file.synchronous === 'full');
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_CLOSE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {Promise<number>}
   */
  async jRead(fileId, pData, iOffset) {
    try {
      const file = this.mapIdToFile.get(fileId);

      let pDataOffset = 0;
      while (pDataOffset < pData.byteLength) {
        // Fetch the IndexedDB block for this file location.
        const fileOffset = iOffset + pDataOffset;
        const block = await this.#idb.q(({ blocks }) => {
          const range = IDBKeyRange.bound([file.path, -fileOffset], [file.path, Infinity]);
          return blocks.get(range);
        });       
        
        if (!block || block.data.byteLength - block.offset <= fileOffset) {
          pData.fill(0, pDataOffset);
          return VFS.SQLITE_IOERR_SHORT_READ;
        }

        // Copy block data.
        const dst = pData.subarray(pDataOffset);
        const srcOffset = fileOffset + block.offset;
        const nBytesToCopy = Math.min(
          Math.max(block.data.byteLength - srcOffset, 0),
          dst.byteLength);
        dst.set(block.data.subarray(srcOffset, srcOffset + nBytesToCopy));
        pDataOffset += nBytesToCopy;
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_READ;
    }
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  jWrite(fileId, pData, iOffset) {
    try {
      const file = this.mapIdToFile.get(fileId);
      if (file.flags & VFS.SQLITE_OPEN_MAIN_DB) {
        if (!file.rollback) {
          // Begin a new write transaction.
          // Add pendingVersion to the metadata in IndexedDB. If we crash
          // during the transaction, this lets subsequent connections
          // know to remove blocks from the failed transaction.
          const pending = Object.assign(
            { pendingVersion: file.metadata.version - 1 },
            file.metadata);
          this.#idb.q(({ metadata }) => metadata.put(pending), 'rw', file.txOptions);

          file.rollback = Object.assign({}, file.metadata);
          file.metadata.version--;
        }
      }

      if (file.flags & VFS.SQLITE_OPEN_MAIN_DB) {
        file.changedPages.add(iOffset);
      }

      const data = pData.slice();
      const version = file.metadata.version;
      const isOverwrite = iOffset < file.metadata.fileSize;
      if (!isOverwrite ||
          file.flags & VFS.SQLITE_OPEN_MAIN_DB ||
          file.flags & VFS.SQLITE_OPEN_TEMP_DB) {
        const block = {
          path: file.path,
          offset: -iOffset,
          version: version,
          data: pData.slice()
        };
        this.#idb.q(({ blocks }) => {
          blocks.put(block);
          file.changedPages.add(iOffset);
        }, 'rw', file.txOptions);
      } else {
        this.#idb.q(async ({ blocks }) => {
          // Read the existing block.
          const range = IDBKeyRange.bound(
            [file.path, -iOffset],
            [file.path, Infinity]);
          const block = await blocks.get(range);

          // Modify the block data.
          // @ts-ignore
          block.data.subarray(iOffset + block.offset).set(data);

          // Write back.
          blocks.put(block);
        }, 'rw', file.txOptions);

      }

      if (file.metadata.fileSize < iOffset + pData.length) {
        file.metadata.fileSize = iOffset + pData.length;
        file.needsMetadataSync = true;
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_WRITE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {number}
   */
  jTruncate(fileId, iSize) {
    try {
      const file = this.mapIdToFile.get(fileId);
      if (iSize < file.metadata.fileSize) {
        this.#idb.q(({ blocks }) => {
          const range = IDBKeyRange.bound(
            [file.path, -Infinity],
            [file.path, -iSize, Infinity]);
          blocks.delete(range);
        }, 'rw', file.txOptions);
        file.metadata.fileSize = iSize;
        file.needsMetadataSync = true;
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_TRUNCATE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {Promise<number>}
   */
  async jSync(fileId, flags) {
    try {
      const file = this.mapIdToFile.get(fileId);
      if (file.needsMetadataSync) {
        this.#idb.q(({ metadata }) => metadata.put(file.metadata), 'rw', file.txOptions);
        file.needsMetadataSync = false;
      }

      if (file.flags & VFS.SQLITE_OPEN_MAIN_DB) {
        // Sync is only needed here for durability. Visibility for other
        // connections is ensured in jUnlock().
        if (file.synchronous === 'full') {
          await this.#idb.sync(true);
        }
      } else {
        await this.#idb.sync(file.synchronous === 'full');
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_FSYNC;
    }
  }

  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {number}
   */
  jFileSize(fileId, pSize64) {
    try {
      const file = this.mapIdToFile.get(fileId);
      pSize64.setBigInt64(0, BigInt(file.metadata.fileSize), true);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_FSTAT;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {Promise<number>}
   */
  async jLock(fileId, lockType) {
    // Call the actual lock implementation.
    const file = this.mapIdToFile.get(fileId);
    const result = await super.jLock(fileId, lockType);

    if (lockType === VFS.SQLITE_LOCK_SHARED) {
      // Update metadata.
      file.metadata = await this.#idb.q(async ({ metadata, blocks }) => {
        // @ts-ignore
        /** @type {Metadata} */ const m = await metadata.get(file.path);
        if (m.pendingVersion) {
          console.warn(`removing failed transaction ${m.pendingVersion}`);
          await new Promise((resolve, reject) => {
            const range = IDBKeyRange.bound([m.name, -Infinity], [m.name, Infinity]);
            const request = blocks.openCursor(range);
            request.onsuccess = () => {
              const cursor = request.result;
              if (cursor) {
                const block = cursor.value;
                if (block.version < m.version) {
                  cursor.delete();
                }
                cursor.continue();
              } else {
                resolve();
              }
            };
            request.onerror = () => reject(request.error);
          })

          delete m.pendingVersion;
          metadata.put(m);
        }
        return m;
      }, 'rw', file.txOptions);
    }
    return result;
  }

  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {Promise<number>}
   */
  async jUnlock(fileId, lockType) {
    if (lockType === VFS.SQLITE_LOCK_NONE) {
      const file = this.mapIdToFile.get(fileId);
      await this.#idb.sync(file.synchronous === 'full');
    }

    // Call the actual unlock implementation.
    return super.jUnlock(fileId, lockType);
  }

  /**
   * @param {number} fileId
   * @param {number} op
   * @param {DataView} pArg
   * @returns {number|Promise<number>}
   */
  jFileControl(fileId, op, pArg) {
    try {
      const file = this.mapIdToFile.get(fileId);
      switch (op) {
        case VFS.SQLITE_FCNTL_PRAGMA:
          const key = extractString(pArg, 4);
          const value = extractString(pArg, 8);
          this.log?.('xFileControl', file.path, 'PRAGMA', key, value);
          const setPragmaResponse = response => {
            const encoded = new TextEncoder().encode(response);
            const out = this._module._sqlite3_malloc(encoded.byteLength);
            const outArray = this._module.HEAPU8.subarray(out, out + encoded.byteLength);
            outArray.set(encoded);
            pArg.setUint32(0, out, true);
            return VFS.SQLITE_ERROR;
          };
          switch (key.toLowerCase()) {
            case 'page_size':
              if (file.flags & VFS.SQLITE_OPEN_MAIN_DB) {
                // Don't allow changing the page size.
                if (value && file.metadata.fileSize) {
                  return VFS.SQLITE_ERROR;
                }
              }
              break;
            case 'synchronous':
              if (value) {
                switch (value.toLowerCase()) {
                  case '0':
                  case 'off':
                    file.synchronous = 'off';
                    file.txOptions = { durability: 'relaxed' };
                    break;
                  case '1':
                  case 'normal':
                    file.synchronous = 'normal';
                    file.txOptions = { durability: 'relaxed' };
                    break;
                  case '2':
                  case '3':
                  case 'full':
                  case 'extra':
                    file.synchronous = 'full';
                    file.txOptions = { durability: 'strict' };
                    break;
                }
              }
              break;
            case 'write_hint':
              return super.jFileControl(fileId, WebLocksMixin.WRITE_HINT_OP_CODE, null);
            }
          break;
        case VFS.SQLITE_FCNTL_SYNC:
          this.log?.('xFileControl', file.path, 'SYNC');
          if (file.rollback) {
            const commitMetadata = Object.assign({}, file.metadata);
            const prevFileSize = file.rollback.fileSize
            this.#idb.q(({ metadata, blocks }) => {
              metadata.put(commitMetadata);

              // Remove old page versions.
              for (const offset of file.changedPages) {
                if (offset < prevFileSize) {
                  const range = IDBKeyRange.bound(
                    [file.path, -offset, commitMetadata.version],
                    [file.path, -offset, Infinity],
                    true);
                  blocks.delete(range);
                }
              }
              file.changedPages.clear();
            }, 'rw', file.txOptions);
            file.needsMetadataSync = false;
            file.rollback = null;
          }
          break;
        case VFS.SQLITE_FCNTL_BEGIN_ATOMIC_WRITE:
          // Every write transaction is atomic, so this is a no-op.
          this.log?.('xFileControl', file.path, 'BEGIN_ATOMIC_WRITE');
          return VFS.SQLITE_OK;
        case VFS.SQLITE_FCNTL_COMMIT_ATOMIC_WRITE:
          // Every write transaction is atomic, so this is a no-op.
          this.log?.('xFileControl', file.path, 'COMMIT_ATOMIC_WRITE');
          return VFS.SQLITE_OK;
        case VFS.SQLITE_FCNTL_ROLLBACK_ATOMIC_WRITE:
          this.log?.('xFileControl', file.path, 'ROLLBACK_ATOMIC_WRITE');
          file.metadata = file.rollback;
          const rollbackMetadata = Object.assign({}, file.metadata);
          this.#idb.q(({ metadata, blocks }) => {
            metadata.put(rollbackMetadata);

            // Remove pages.
            for (const offset of file.changedPages) {
              blocks.delete([file.path, -offset, rollbackMetadata.version - 1]);
            }
            file.changedPages.clear();
          }, 'rw', file.txOptions);
          file.needsMetadataSync = false;
          file.rollback = null;
          return VFS.SQLITE_OK;
      }
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR;
    }
    return super.jFileControl(fileId, op, pArg);
  }
  
  /**
   * @param {number} pFile
   * @returns {number|Promise<number>}
   */
  jDeviceCharacteristics(pFile) {
    return 0
    | VFS.SQLITE_IOCAP_BATCH_ATOMIC
    | VFS.SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN;
  }

  /**
   * @param {Uint8Array} zBuf 
   * @returns {number|Promise<number>}
   */
  jGetLastError(zBuf) {
    if (this.lastError) {
      console.error(this.lastError);
      const outputArray = zBuf.subarray(0, zBuf.byteLength - 1);
      const { written } = new TextEncoder().encodeInto(this.lastError.message, outputArray);
      zBuf[written] = 0;
    }
    return VFS.SQLITE_OK
  }
}

function extractString(dataView, offset) {
  const p = dataView.getUint32(offset, true);
  if (p) {
    const chars = new Uint8Array(dataView.buffer, p);
    return new TextDecoder().decode(chars.subarray(0, chars.indexOf(0)));
  }
  return null;
}

export class IDBContext {
  /** @type {IDBDatabase} */ #database;

  /** @type {Promise} */ #chain = null;
  /** @type {Promise<any>} */ #txComplete = Promise.resolve();
  /** @type {IDBRequest?} */ #request = null;
  /** @type {WeakSet<IDBTransaction>} */ #txPending = new WeakSet();
  
  log = null;

  static async create(name) {
    const database = await new Promise((resolve, reject) => {
      const request = indexedDB.open(name, 6);
      request.onupgradeneeded = async event => {
        const db = request.result;
        if (event.oldVersion) {
          console.log(`Upgrading IndexedDB from version ${event.oldVersion}`);
        }
        switch (event.oldVersion) {
          case 0:
            // Start with the original schema.
            db.createObjectStore('blocks', { keyPath: ['path', 'offset', 'version']})
              .createIndex('version', ['path', 'version']);
            // fall through intentionally
          case 5:
            const tx = request.transaction;
            const blocks = tx.objectStore('blocks');
            blocks.deleteIndex('version');
            const metadata = db.createObjectStore('metadata', { keyPath: 'name' });

            await new Promise((resolve, reject) => {
              // Iterate over all the blocks.
              let lastBlock = {};
              const request = tx.objectStore('blocks').openCursor();
              request.onsuccess = () => {
                const cursor = request.result;
                if (cursor) {
                  const block = cursor.value;
                  if (typeof block.offset !== 'number' ||
                      (block.path === lastBlock.path && block.offset === lastBlock.offset)) {
                    // Remove superceded block (or the "purge" info).
                    cursor.delete();
                  } else if (block.offset === 0) {
                    // Move metadata to its own store.
                    metadata.put({
                      name: block.path,
                      fileSize: block.fileSize,
                      version: block.version
                    });

                    delete block.fileSize;
                    cursor.update(block);
                  }
                  lastBlock = block;
                  cursor.continue();
                } else {
                  resolve();
                }
              };
              request.onerror = () => reject(request.error);
            });
            break;
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    return new IDBContext(database);
  }

  constructor(database) {
    this.#database = database;
  }

  close() {
    this.#database.close();
  }

  /**
   * @param {(stores: Object.<string, IDBObjectStore>) => any} f 
   * @param {'ro'|'rw'} mode 
   * @returns {Promise<any>}
   */
  q(f, mode = 'ro', options = {}) {
    /** @type {IDBTransactionMode} */
    const txMode = mode === 'ro' ? 'readonly' : 'readwrite';
    const txOptions = Object.assign({
      /** @type {IDBTransactionDurability} */ durability: 'default'
    }, options);

    // Ensure that queries run sequentially. If any function rejects,
    // or any request has an error, or the transaction does not commit,
    // then no subsequent functions will run until sync() or reset().
    this.#chain = (this.#chain || Promise.resolve())
      .then(() => this.#q(f, txMode, txOptions));
    return this.#chain;
  }

  /**
   * @param {(stores: Object.<string, IDBObjectStore>) => any} f 
   * @param {IDBTransactionMode} mode 
   * @param {IDBTransactionOptions} options
   * @returns {Promise<any>}
   */
  async #q(f, mode, options) {
    /** @type {IDBTransaction} */ let tx;
    if (this.#request &&
        this.#txPending.has(this.#request.transaction) &&
        this.#request.transaction.mode >= mode &&
        this.#request.transaction.durability === options.durability) {
      // The previous request transaction is compatible and has
      // not yet completed.
      tx = this.#request.transaction;

      // If the previous request is pending, wait for it to complete.
      // This ensures that the transaction will be active.
      if (this.#request.readyState === 'pending') {
        await new Promise(resolve => {
          this.#request.addEventListener('success', resolve, { once: true });
          this.#request.addEventListener('error', resolve, { once: true });
        });
      }
    }

    for (let i = 0; i < 2; ++i) {
      if (!tx) {
        // The current transaction is missing or doesn't match so
        // replace it with a new one. wait for the previous
        // transaction to complete so the lifetimes do not overlap.
        await this.#txComplete;

        // Create the new transaction.
        // @ts-ignore
        tx = this.#database.transaction(this.#database.objectStoreNames, mode, options);
        this.log?.('IDBTransaction open', mode);
        this.#txPending.add(tx);
        this.#txComplete = new Promise((resolve, reject) => {
          tx.addEventListener('complete', () => {
            this.log?.('IDBTransaction complete');
            this.#txPending.delete(tx);
            resolve();
          });
          tx.addEventListener('abort', () => {
            this.#txPending.delete(tx);
            reject(new Error('transaction aborted'));
          });
        });
      }

      try {
        // @ts-ignore
        // Create object store proxies.
        const objectStores = [...tx.objectStoreNames].map(name => {
          return [name, this.proxyStoreOrIndex(tx.objectStore(name))];
        });

        // Execute the function.
        return await f(Object.fromEntries(objectStores));
      } catch (e) {
        // Use a new transaction if this one was inactive. This will
        // happen if the last request in the transaction completed
        // in a previous task but the transaction has not yet committed.
        if (!i && RETRYABLE_ERRORS.has(e.name)) {
          this.log?.(`${e.name}, retrying`);
          tx = null;
          continue;
        }
        throw e;
      }
    }
  }

  /**
   * Object store methods that return an IDBRequest, except for cursor
   * creation, are wrapped to return a Promise. In addition, the
   * request is used internally for chaining.
   * @param {IDBObjectStore} objectStore 
   * @returns 
   */
  proxyStoreOrIndex(objectStore) {
    return new Proxy(objectStore, {
      get: (target, property, receiver) => {
        const result = Reflect.get(target, property, receiver);
        if (typeof result === 'function') {
          return (...args) => {
            const maybeRequest = Reflect.apply(result, target, args);
            // @ts-ignore
            if (maybeRequest instanceof IDBRequest && !property.endsWith('Cursor')) {
              // // Debug logging.
              // this.log?.(`${target.name}.${String(property)}`, args);
              // maybeRequest.addEventListener('success', () => {
              //   this.log?.(`${target.name}.${String(property)} success`, maybeRequest.result);
              // });
              // maybeRequest.addEventListener('error', () => {
              //   this.log?.(`${target.name}.${String(property)} error`, maybeRequest.error);
              // });
              
              // Save the request.
              this.#request = maybeRequest;

              // Abort the transaction on error.
              maybeRequest.addEventListener('error', () => {
                console.error(maybeRequest.error);
                maybeRequest.transaction.abort();
              }, { once: true });              

              // Return a Promise.
              return wrap(maybeRequest);
            }
            return maybeRequest;
          }
        }
        return result;
      }
    });
  }

  /**
   * @param {boolean} durable 
   */
  async sync(durable) {
    if (this.#chain) {
      // This waits for all IndexedDB calls to be made.
      await this.#chain;
      if (durable) {
        // This waits for the final transaction to commit.
        await this.#txComplete;
      }
      this.reset();
    }
  }

  reset() {
    this.#chain = null;
    this.#txComplete = Promise.resolve();
    this.#request = null;
  }
}

/**
 * @param {IDBRequest} request 
 * @returns {Promise}
 */
function wrap(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
````

## File: packages/wa-sqlite/src/examples/IDBMirrorVFS.js
````javascript
import { FacadeVFS } from '../FacadeVFS.js';
import * as VFS from '../VFS.js';

// Options for navigator.locks.request().
/** @type {LockOptions} */ const SHARED = { mode: 'shared' };
/** @type {LockOptions} */ const POLL_SHARED = { ifAvailable: true, mode: 'shared' };
/** @type {LockOptions} */ const POLL_EXCLUSIVE = { ifAvailable: true, mode: 'exclusive' };

// Used only for debug logging.
const contextId = Math.random().toString(36).slice(2);

/**
 * @typedef {Object} Transaction
 * @property {string} [path]
 * @property {number} txId
 * @property {Map<number, Uint8Array?>} [blocks]
 * @property {number} [fileSize]
 */

class File {
  /** @type {string} */ path;
  /** @type {number} */ flags;

  /** @type {number} */ blockSize;
  /** @type {Map<number, Uint8Array>} */ blocks;

  // Members below are only used for SQLITE_OPEN_MAIN_DB.

  /** @type {Transaction} */ viewTx; // last transaction incorporated
  /** @type {function?} */ viewReleaser;

  /** @type {BroadcastChannel} */ broadcastChannel;
  /** @type {Transaction[]} */ broadcastReceived;

  /** @type {number} */ lockState;
  /** @type {{write?: function, reserved?: function, hint?: function}} */ locks;

  /** @type {AbortController} */ abortController;

  /** @type {Transaction?} */ txActive;
  /** @type {boolean} */ txWriteHint;
  /** @type {boolean} */ txOverwrite;

  /** @type {string} */ synchronous;

  constructor(pathname, flags) {
    this.path = pathname;
    this.flags = flags;

    this.blockSize = 0;
    this.blocks = new Map();
    if (flags & VFS.SQLITE_OPEN_MAIN_DB) {
      this.viewTx = null;
      this.viewReleaser = null;
      this.broadcastChannel = new BroadcastChannel('mirror:' + pathname);
      this.broadcastReceived = [];
      this.lockState = VFS.SQLITE_LOCK_NONE;
      this.locks = {};
      this.txActive = null;
      this.txWriteHint = false;
      this.txOverwrite = false;
      this.synchronous = 'full';
    }
  }
}

export class IDBMirrorVFS extends FacadeVFS {
  /** @type {Map<number, File>} */ #mapIdToFile = new Map();
  /** @type {Map<string, File>} */ #mapPathToFile = new Map();
  #lastError = null;

  /** @type {IDBDatabase} */ #idb;

  log = null; // console.log;

  /** @type {Promise} */ #isReady;

  static async create(name, module, options) {
    const instance = new IDBMirrorVFS(name, module, options);
    await instance.isReady();
    return instance;
  }

  constructor(name, module, options = {}) {
    super(name, module);
    this.#isReady = this.#initialize(name);
  }

  async #initialize(name) {
    // Open IndexedDB database, creating it if necessary.
    this.#idb = await new Promise((resolve, reject) => {
      const request = indexedDB.open(name, 1);
      request.onupgradeneeded = (event) => {
        const db = request.result;
        switch (event.oldVersion) {
          case 0:
            db.createObjectStore('blocks', { keyPath: ['path', 'offset'] });
            db.createObjectStore('tx', { keyPath: ['path', 'txId'] });
            break;
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  close() {
    return this.#idb.close();
  }

  async isReady() {
    await super.isReady();
    return this.#isReady;
  }

  /**
   * @param {string?} zName 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {Promise<number>}
   */
  async jOpen(zName, fileId, flags, pOutFlags) {
    try {
      const url = new URL(zName || Math.random().toString(36).slice(2), 'file://');
      const path = url.pathname;

      let file;
      if (flags & VFS.SQLITE_OPEN_MAIN_DB) {
        // TODO
        file = new File(path, flags);

        const idbTx = this.#idb.transaction(['blocks', 'tx'], 'readwrite');
        const blocks = idbTx.objectStore('blocks');
        if (await idbX(blocks.count([path, 0])) === 0) {
          // File does not yet exist.
          if (flags & VFS.SQLITE_OPEN_CREATE) {
            await idbX(blocks.put({ path, offset: 0, data: new Uint8Array(0) }));
          } else {
            throw new Error('File not found');
          }
        }
  
        // Load pages into memory from IndexedDB.
        await new Promise((resolve, reject) => {
          const range = IDBKeyRange.bound([path, 0], [path, Infinity]);
          const request = blocks.openCursor(range);
          request.onsuccess = () => {
            const cursor = request.result;
            if (cursor) {
              const { offset, data } = cursor.value;
              file.blocks.set(offset, data);
              cursor.continue();
            } else {
              resolve();
            }
          };
          request.onerror = () => reject(request.error);
        });
        file.blockSize = file.blocks.get(0)?.byteLength ?? 0;

        // Get the last transaction id.
        const transactions = idbTx.objectStore('tx');
        file.viewTx = await new Promise((resolve, reject) => {
          const range = IDBKeyRange.bound([path, 0], [path, Infinity]);
          const request = transactions.openCursor(range, 'prev');
          request.onsuccess = () => {
            const cursor = request.result;
            if (cursor) {
              resolve(cursor.value);
            } else {
              resolve({ txId: 0 });
            }
          };
          request.onerror = () => reject(request.error);
        });

        // Publish our view of the database. This prevents other connections
        // from overwriting file data we still need.
        await this.#setView(file, file.viewTx);

        // Listen for broadcasts. Messages are cached until the database
        // is unlocked.
        file.broadcastChannel.addEventListener('message', event => {
          file.broadcastReceived.push(event.data);
          if (file.lockState === VFS.SQLITE_LOCK_NONE) {
            this.#processBroadcasts(file);
          }
        });
      } else {
        // Not a main database so not stored in IndexedDB.
        file = this.#mapPathToFile.get(path);
        if (!file) {
          if (flags & VFS.SQLITE_OPEN_CREATE) {
            file = new File(path, flags);
            file.blocks.set(0, new Uint8Array(0));
          } else {
            throw new Error('File not found');
          }
        }
      }

      pOutFlags.setInt32(0, flags, true);
      this.#mapIdToFile.set(fileId, file);
      this.#mapPathToFile.set(path, file);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.#lastError = e;
      return VFS.SQLITE_CANTOPEN;
    }
  }

  /**
   * @param {string} zName 
   * @param {number} syncDir 
   * @returns {Promise<number>}
   */
  async jDelete(zName, syncDir) {
    try {
      const url = new URL(zName, 'file://');
      const pathname = url.pathname;

      const result = await this.#deleteFile(pathname);
      if (syncDir) {
        await result;
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      return VFS.SQLITE_IOERR_DELETE;
    }
  }

  /**
   * @param {string} zName 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {Promise<number>}
   */
  async jAccess(zName, flags, pResOut) {
    try {
      const url = new URL(zName, 'file://');
      const pathname = url.pathname;

      // This test ignores main database files that have not been opened
      // with this connection. SQLite does not call jAccess() on main
      // database files, so avoiding an IndexedDB test saves time.
      const exists = this.#mapPathToFile.has(pathname);
      pResOut.setInt32(0, exists ? 1 : 0, true);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.#lastError = e;
      return VFS.SQLITE_IOERR_ACCESS;
    }
  }

  /**
   * @param {number} fileId 
   * @returns {Promise<number>}
   */
  async jClose(fileId) {
    try {
      const file = this.#mapIdToFile.get(fileId);
      this.#mapIdToFile.delete(fileId);

      if (file?.flags & VFS.SQLITE_OPEN_MAIN_DB) {
        file.broadcastChannel.close();
        file.viewReleaser?.();
      }

      if (file?.flags & VFS.SQLITE_OPEN_DELETEONCLOSE) {
        this.#deleteFile(file.path);
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      return VFS.SQLITE_IOERR_CLOSE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  jRead(fileId, pData, iOffset) {
    try {
      const file = this.#mapIdToFile.get(fileId);

      let bytesRead = 0;
      let pDataOffset = 0;
      while (pDataOffset < pData.byteLength) {
        // File data is stored in fixed-size blocks. Get the next block
        // needed.
        const fileOffset = iOffset + pDataOffset;
        const blockIndex = Math.floor(fileOffset / file.blockSize);
        const blockOffset = fileOffset % file.blockSize;
        const block =
          file.txActive?.blocks.get(blockIndex * file.blockSize) ??
          file.blocks.get(blockIndex * file.blockSize);
        if (!block) {
          break;
        }

        // Copy block data to the read buffer.
        const blockLength = Math.min(
          block.byteLength - blockOffset,
          pData.byteLength - pDataOffset);
        pData.set(block.subarray(blockOffset, blockOffset + blockLength), pDataOffset);
        pDataOffset += blockLength;
        bytesRead += blockLength;
      }

      if (bytesRead < pData.byteLength) {
        pData.fill(0, bytesRead);
        return VFS.SQLITE_IOERR_SHORT_READ;
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.#lastError = e;
      return VFS.SQLITE_IOERR_READ;
    }
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  jWrite(fileId, pData, iOffset) {
    try {
      const file = this.#mapIdToFile.get(fileId);

      if (file.flags & VFS.SQLITE_OPEN_MAIN_DB) {
        this.#requireTxActive(file);
        // SQLite is not necessarily written sequentially, so fill in the
        // unwritten blocks here.
        for (let fillOffset = file.txActive.fileSize;
             fillOffset < iOffset; fillOffset += pData.byteLength) {
          file.txActive.blocks.set(fillOffset, new Uint8Array(pData.byteLength));
        }
        file.txActive.blocks.set(iOffset, pData.slice());
        file.txActive.fileSize = Math.max(file.txActive.fileSize, iOffset + pData.byteLength);
        file.blockSize = pData.byteLength;
      } else {
        // All files that are not main databases are stored in a single
        // block.
        let block = file.blocks.get(0);
        if (iOffset + pData.byteLength > block.byteLength) {
          // Resize the block buffer.
          const newSize = Math.max(iOffset + pData.byteLength, 2 * block.byteLength);
          const newBlock = new Uint8Array(newSize);
          newBlock.set(block);
          file.blocks.set(0, newBlock);
          block = newBlock;
        }
        block.set(pData, iOffset);
        file.blockSize = Math.max(file.blockSize, iOffset + pData.byteLength);
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_WRITE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {number}
   */
  jTruncate(fileId, iSize) {
    try {
      const file = this.#mapIdToFile.get(fileId);

      if (file.flags & VFS.SQLITE_OPEN_MAIN_DB) {
        this.#requireTxActive(file);
        file.txActive.fileSize = iSize;
      } else {
        // All files that are not main databases are stored in a single
        // block.
        if (iSize < file.blockSize) {
          const block = file.blocks.get(0);
          file.blocks.set(0, block.subarray(0, iSize));
          file.blockSize = iSize;
        }
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      console.error(e);
      this.lastError = e;
      return VFS.SQLITE_IOERR_TRUNCATE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {number|Promise<number>}
   */
  jFileSize(fileId, pSize64) {
    const file = this.#mapIdToFile.get(fileId);
    const size = file.txActive?.fileSize ?? file.blockSize * file.blocks.size;
    pSize64.setBigInt64(0, BigInt(size), true);
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {Promise<number>}
   */
  async jLock(fileId, lockType) {
    const file = this.#mapIdToFile.get(fileId);
    if (lockType <= file.lockState) return VFS.SQLITE_OK;
    switch (lockType) {
      case VFS.SQLITE_LOCK_SHARED:
        if (file.txWriteHint) {
            // xFileControl() has hinted that this transaction will
            // write. Acquire the hint lock, which is required to reach
            // the RESERVED state.
            if (!await this.#lock(file, 'hint')) {
              return VFS.SQLITE_BUSY;
            }
        }
        break;
      case VFS.SQLITE_LOCK_RESERVED:
        // Ideally we should already have the hint lock, but if not
        // poll for it here.
        if (!file.locks.hint && !await this.#lock(file, 'hint', POLL_EXCLUSIVE)) {
          return VFS.SQLITE_BUSY;
        }

        if (!await this.#lock(file, 'reserved', POLL_EXCLUSIVE)) {
          file.locks.hint();
          return VFS.SQLITE_BUSY;
        }

        // In order to write, our view of the database must be up to date.
        // To check this, first fetch all transactions in IndexedDB equal to
        // or greater than our view.
        const idbTx = this.#idb.transaction(['blocks', 'tx']);
        const range = IDBKeyRange.bound(
          [file.path, file.viewTx.txId],
          [file.path, Infinity]);

        /** @type {Transaction[]} */
        const entries = await idbX(idbTx.objectStore('tx').getAll(range));

        // Ideally the fetched list of transactions should contain one
        // entry matching our view. If not then our view is out of date.
        if (entries.length && entries.at(-1).txId > file.viewTx.txId) {
          // There are newer transactions in IndexedDB that we haven't
          // seen via broadcast. Ensure that they are incorporated on unlock,
          // and force the application to retry.
          const blocks = idbTx.objectStore('blocks');
          for (const entry of entries) {
            // When transactions are stored to IndexedDB, the page data is
            // stripped to save time and space. Restore the page data here.
            for (const offset of Array.from(entry.blocks.keys())) {
              const value = await idbX(blocks.get([file.path, offset]));
              entry.blocks.set(offset, value.data);
            }
          }
          file.broadcastReceived.push(...entries);
          file.locks.reserved();
          return VFS.SQLITE_BUSY
        }

        console.assert(entries[0]?.txId === file.viewTx.txId || !file.viewTx.txId);
        break;
      case VFS.SQLITE_LOCK_EXCLUSIVE:
        await this.#lock(file, 'write');
        break;
    }
    file.lockState = lockType;
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {number}
   */
  jUnlock(fileId, lockType) {
    const file = this.#mapIdToFile.get(fileId);
    if (lockType >= file.lockState) return VFS.SQLITE_OK;
    switch (lockType) {
      case VFS.SQLITE_LOCK_SHARED:
        file.locks.write?.();
        file.locks.reserved?.();
        file.locks.hint?.();
        break;
      case VFS.SQLITE_LOCK_NONE:
        // Don't release the read lock here. It will be released on demand
        // when a broadcast notifies us that another connections wants to
        // VACUUM.
        this.#processBroadcasts(file);
        file.locks.write?.();
        file.locks.reserved?.();
        file.locks.hint?.();
        break;
    }
    file.lockState = lockType;
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId
   * @param {DataView} pResOut 
   * @returns {Promise<number>}
   */
  async jCheckReservedLock(fileId, pResOut) {
    try {
      const file = this.#mapIdToFile.get(fileId);
      console.assert(file.flags & VFS.SQLITE_OPEN_MAIN_DB);
      if (await this.#lock(file, 'reserved', POLL_SHARED)) {
        // This looks backwards, but if we get the lock then no one
        // else had it.
        pResOut.setInt32(0, 0, true);
        file.locks.reserved();
      } else {
        pResOut.setInt32(0, 1, true);
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      console.error(e);
      this.lastError = e;
      return VFS.SQLITE_IOERR_LOCK;
    }
  }

  /**
   * @param {number} fileId
   * @param {number} op
   * @param {DataView} pArg
   * @returns {Promise<number>}
   */
  async jFileControl(fileId, op, pArg) {
    try {
      const file = this.#mapIdToFile.get(fileId);
      switch (op) {
        case VFS.SQLITE_FCNTL_PRAGMA:
          const key = cvtString(pArg, 4);
          const value = cvtString(pArg, 8);
          this.log?.('xFileControl', file.path, 'PRAGMA', key, value);
          switch (key.toLowerCase()) {
            case 'page_size':
              // Don't allow changing the page size.
              if (value && file.blockSize && Number(value) !== file.blockSize) {
                return VFS.SQLITE_ERROR;
              }
              break;
            case 'synchronous':
              // This VFS only recognizes 'full' and not 'full'.
              if (value) {
                switch (value.toLowerCase()) {
                  case 'full':
                  case '2':
                  case 'extra':
                  case '3':
                    file.synchronous = 'full';
                    break;
                  case 'normal':
                  case '1':
                    file.synchronous = 'normal';
                    break;
                  default:
                    console.warn(`unsupported synchronous mode: ${value}`);
                    return VFS.SQLITE_ERROR;
                  }
              }
              break;
            }
          break;
        case VFS.SQLITE_FCNTL_BEGIN_ATOMIC_WRITE:
          this.log?.('xFileControl', 'BEGIN_ATOMIC_WRITE', file.path);
          return VFS.SQLITE_OK;
        case VFS.SQLITE_FCNTL_COMMIT_ATOMIC_WRITE:
          this.log?.('xFileControl', 'COMMIT_ATOMIC_WRITE', file.path);
          return VFS.SQLITE_OK;
        case VFS.SQLITE_FCNTL_ROLLBACK_ATOMIC_WRITE:
          this.#dropTx(file);
          return VFS.SQLITE_OK;
        case VFS.SQLITE_FCNTL_SYNC:
          // Propagate database writes to IndexedDB and other clients. Most
          // often this is a SQLite transaction, but it can also be a
          // journal rollback.
          //
          // If SQLITE_FCNTL_OVERWRITE has been received then propagation is
          // deferred until SQLITE_FCNTL_COMMIT_PHASETWO for file truncation.
          this.log?.('xFileControl', 'SYNC', file.path);
          if (file.txActive && !file.txOverwrite) {
            await this.#commitTx(file);
          }
          break;
        case VFS.SQLITE_FCNTL_OVERWRITE:
          // Marks the beginning of a VACUUM.
          file.txOverwrite = true;
          break;
        case VFS.SQLITE_FCNTL_COMMIT_PHASETWO:
            // Commit database writes for VACUUM. Other writes will already
            // be propagated by SQLITE_FCNTL_SYNC.
            this.log?.('xFileControl', 'COMMIT_PHASETWO', file.path);
            if (file.txActive) {
              await this.#commitTx(file);
            }
            file.txOverwrite = false;
            break;
        }
    } catch (e) {
      this.#lastError = e;
      return VFS.SQLITE_IOERR;
    }
    return VFS.SQLITE_NOTFOUND;
  }

  /**
   * @param {number} fileId
   * @returns {number|Promise<number>}
   */
  jDeviceCharacteristics(fileId) {
    return 0
    | VFS.SQLITE_IOCAP_BATCH_ATOMIC
    | VFS.SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN;
  }

  /**
   * @param {Uint8Array} zBuf 
   * @returns {number}
   */
  jGetLastError(zBuf) {
    if (this.#lastError) {
      console.error(this.#lastError);
      const outputArray = zBuf.subarray(0, zBuf.byteLength - 1);
      const { written } = new TextEncoder().encodeInto(this.#lastError.message, outputArray);
      zBuf[written] = 0;
    }
    return VFS.SQLITE_OK
  }

  /**
   * 
   * @param {File} file 
   * @param {Transaction} tx 
   */
  #acceptTx(file, tx) {
    // Add/update transaction pages.
    for (const [offset, data] of tx.blocks) {
      file.blocks.set(offset, data);
      if (file.blockSize === 0) {
        file.blockSize = data.byteLength;
      }
    }

    let truncated = tx.fileSize + file.blockSize;
    while (file.blocks.delete(truncated)) {
      truncated += file.blockSize;
    }

    file.viewTx = tx;
  }

  /**
   * @param {File} file 
   */
  async #commitTx(file) {
    // Advance our own view. Even if we received our own broadcasts (we
    // don't), we want our view to be updated synchronously.
    this.#acceptTx(file, file.txActive);
    this.#setView(file, file.txActive);

    const oldestTxId = await this.#getOldestTxInUse(file);

    // Update IndexedDB page data.
    const idbTx = this.#idb.transaction(['blocks', 'tx'], 'readwrite');
    const blocks = idbTx.objectStore('blocks');
    for (const [offset, data] of file.txActive.blocks) {
      blocks.put({ path: file.path, offset, data });
    }

    // Delete obsolete transactions no longer needed.
    const oldRange = IDBKeyRange.bound(
      [file.path, -Infinity], [file.path, oldestTxId],
      false, true);
    idbTx.objectStore('tx').delete(oldRange);

    // Save transaction object. Omit page data as an optimization.
    const txSansData = Object.assign({}, file.txActive);
    txSansData.blocks = new Map(Array.from(file.txActive.blocks, ([k]) => [k, null]));
    idbTx.objectStore('tx').put(txSansData);

    // Broadcast transaction once it commits.
    const complete = new Promise((resolve, reject) => {
      const message = file.txActive;
      idbTx.oncomplete = () => {
        file.broadcastChannel.postMessage(message);
        resolve();
      };
      idbTx.onabort = () => reject(idbTx.error);
      idbTx.commit();
    });

    if (file.synchronous === 'full') {
      await complete;
    }

    file.txActive = null;
    file.txWriteHint = false;
  }

  /**
   * @param {File} file 
   */
  #dropTx(file) {
    file.txActive = null;
    file.txWriteHint = false;
  }

  /**
   * @param {File} file 
   */
  #requireTxActive(file) {
    if (!file.txActive) {
      file.txActive = {
        path: file.path,
        txId: file.viewTx.txId + 1,
        blocks: new Map(),
        fileSize: file.blockSize * file.blocks.size,
      };
    }
  }

  /**
   * @param {string} path 
   * @returns {Promise}
   */
  async #deleteFile(path) {
    this.#mapPathToFile.delete(path);

    // Only main databases are stored in IndexedDB and SQLite never
    // deletes main databases, but delete blocks here anyway for
    // standalone use.
    const request = this.#idb.transaction(['blocks'], 'readwrite')
      .objectStore('blocks')
      .delete(IDBKeyRange.bound([path, 0], [path, Infinity]));
    await new Promise((resolve, reject) => {
      const idbTx = request.transaction;
      idbTx.oncomplete = resolve;
      idbTx.onerror = () => reject(idbTx.error);
    });
  }

  /**
   * @param {File} file 
   * @returns {Promise<number>}
   */
  async #getOldestTxInUse(file) {
    // Each connection holds a shared Web Lock with a name that encodes
    // the latest transaction it knows about. We can find the oldest
    // transaction by listing the those locks and extracting the earliest
    // transaction id.
    const TX_LOCK_REGEX = /^(.*)@@\[(\d+)\]$/;
    let oldestTxId = file.viewTx.txId;
    const locks = await navigator.locks.query();
    for (const { name } of locks.held) {
      const m = TX_LOCK_REGEX.exec(name);
      if (m && m[1] === file.path) {
        oldestTxId = Math.min(oldestTxId, Number(m[2]));
      }
    }
    return oldestTxId;
  }

  /**
   * Acquire one of the database file internal Web Locks.
   * @param {File} file 
   * @param {'write'|'reserved'|'hint'} name 
   * @param {LockOptions} options 
   * @returns {Promise<boolean>}
   */
  #lock(file, name, options = {}) {
    return new Promise(resolve => {
      const lockName = `${file.path}@@${name}`;
      navigator.locks.request(lockName, options, lock => {
        if (lock) {
          return new Promise(release => {
            file.locks[name] = () => {
              release();
              file.locks[name] = null;
            };
            resolve(true);
          });
        } else {
          file.locks[name] = null;
          resolve(false);
        }
      }).catch(e => {
        if (e.name !== 'AbortError') throw e;
      });
    });
  }

  /**
   * Handle prevously received messages from other connections.
   * @param {File} file 
   */
  #processBroadcasts(file) {
    // Sort transaction messages by id.
    file.broadcastReceived.sort((a, b) => a.txId - b.txId);

    let nHandled = 0;
    let newTx = file.viewTx;
    for (const message of file.broadcastReceived) {
      if (message.txId <= newTx.txId) {
        // This transaction is already incorporated into our view.
      } else if (message.txId === newTx.txId + 1) {
        // This is the next expected transaction.
        this.log?.(`accept tx ${message.txId}`);
        this.#acceptTx(file, message);
        newTx = message;
      } else {
        // There is a gap in the transaction sequence.
        console.warn(`missing tx ${newTx.txId + 1} (got ${message.txId})`);
        break;
      }
      nHandled++;
    }

    // Remove handled messages from the list.
    file.broadcastReceived.splice(0, nHandled);

    // Tell other connections about a change in our view.
    if (newTx.txId > file.viewTx.txId) {
      // No need to await here.
      this.#setView(file, newTx);
    }
  }

  /**
   * @param {File} file 
   * @param {Transaction} tx 
   */
  async #setView(file, tx) {
    // Publish our view of the database with a lock name that includes
    // the transaction id. As long as we hold the lock, no other connection
    // will overwrite data we are using.
    file.viewTx = tx;
    const lockName = `${file.path}@@[${tx.txId}]`;
    const newReleaser = await new Promise(resolve => {
      navigator.locks.request(lockName, SHARED, lock => {
        return new Promise(release => {
          resolve(release);
        });
      });
    });

    // The new lock is acquired so release the old one.
    file.viewReleaser?.();
    file.viewReleaser = newReleaser;
  }
}

/**
 * Wrap IndexedDB request with a Promise.
 * @param {IDBRequest} request 
 * @returns 
 */
function idbX(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Extract a C string from WebAssembly memory.
 * @param {DataView} dataView 
 * @param {number} offset 
 * @returns 
 */
function cvtString(dataView, offset) {
  const p = dataView.getUint32(offset, true);
  if (p) {
    const chars = new Uint8Array(dataView.buffer, p);
    return new TextDecoder().decode(chars.subarray(0, chars.indexOf(0)));
  }
  return null;
}
````

## File: packages/wa-sqlite/src/examples/MemoryAsyncVFS.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
import { MemoryVFS } from './MemoryVFS.js';

// Sample asynchronous in-memory filesystem. This filesystem requires an
// asynchronous WebAssembly build (Asyncify or JSPI).
export class MemoryAsyncVFS extends MemoryVFS {

  static async create(name, module) {
    const vfs = new MemoryVFS(name, module);
    await vfs.isReady();
    return vfs;
  }

  constructor(name, module) {
    super(name, module);
  }

  async close() {
    for (const fileId of this.mapIdToFile.keys()) {
      await this.xClose(fileId);
    }
  }

  /**
   * @param {string?} name 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {Promise<number>}
   */
  async jOpen(name, fileId, flags, pOutFlags) {
    return super.jOpen(name, fileId, flags, pOutFlags);
  }

  /**
   * @param {number} fileId 
   * @returns {Promise<number>}
   */
  async jClose(fileId) {
    return super.jClose(fileId);
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {Promise<number>}
   */
  async jRead(fileId, pData, iOffset) {
    return super.jRead(fileId, pData, iOffset);
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {Promise<number>}
   */
  async jWrite(fileId, pData, iOffset) {
    return super.jWrite(fileId, pData, iOffset);
  }

  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {Promise<number>}
   */
  async xTruncate(fileId, iSize) {
    return super.jTruncate(fileId, iSize);
  }

  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {Promise<number>}
   */
  async jFileSize(fileId, pSize64) {
    return super.jFileSize(fileId, pSize64);
  }

  /**
   * 
   * @param {string} name 
   * @param {number} syncDir 
   * @returns {Promise<number>}
   */
  async jDelete(name, syncDir) {
    return super.jDelete(name, syncDir);
  }

  /**
   * @param {string} name 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {Promise<number>}
   */
  async jAccess(name, flags, pResOut) {
    return super.jAccess(name, flags, pResOut);
  }
}
````

## File: packages/wa-sqlite/src/examples/MemoryVFS.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
import { FacadeVFS } from '../FacadeVFS.js';
import * as VFS from '../VFS.js';

// Sample in-memory filesystem.
export class MemoryVFS extends FacadeVFS {
  // Map of existing files, keyed by filename.
  mapNameToFile = new Map();

  // Map of open files, keyed by id (sqlite3_file pointer).
  mapIdToFile = new Map();

  static async create(name, module) {
    const vfs = new MemoryVFS(name, module);
    await vfs.isReady();
    return vfs;
  }

  constructor(name, module) {
    super(name, module);
  }

  close() {
    for (const fileId of this.mapIdToFile.keys()) {
      this.jClose(fileId);
    }
  }

  /**
   * @param {string?} filename 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {number|Promise<number>}
   */
  jOpen(filename, fileId, flags, pOutFlags) {
    const url = new URL(filename || Math.random().toString(36).slice(2), 'file://');
    const pathname = url.pathname;

    let file = this.mapNameToFile.get(pathname);
    if (!file) {
      if (flags & VFS.SQLITE_OPEN_CREATE) {
        // Create a new file object.
        file = {
          pathname,
          flags,
          size: 0,
          data: new ArrayBuffer(0)
        };
        this.mapNameToFile.set(pathname, file);
      } else {
        return VFS.SQLITE_CANTOPEN;
      }
    }

    // Put the file in the opened files map.
    this.mapIdToFile.set(fileId, file);
    pOutFlags.setInt32(0, flags, true);
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @returns {number|Promise<number>}
   */
  jClose(fileId) {
    const file = this.mapIdToFile.get(fileId);
    this.mapIdToFile.delete(fileId);

    if (file.flags & VFS.SQLITE_OPEN_DELETEONCLOSE) {
      this.mapNameToFile.delete(file.pathname);
    }
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number|Promise<number>}
   */
  jRead(fileId, pData, iOffset) {
    const file = this.mapIdToFile.get(fileId);

    // Clip the requested read to the file boundary.
    const bgn = Math.min(iOffset, file.size);
    const end = Math.min(iOffset + pData.byteLength, file.size);
    const nBytes = end - bgn;

    if (nBytes) {
      pData.set(new Uint8Array(file.data, bgn, nBytes));
    }

    if (nBytes < pData.byteLength) {
      // Zero unused area of read buffer.
      pData.fill(0, nBytes);
      return VFS.SQLITE_IOERR_SHORT_READ;
    }
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number|Promise<number>}
   */
  jWrite(fileId, pData, iOffset) {
    const file = this.mapIdToFile.get(fileId);
    if (iOffset + pData.byteLength > file.data.byteLength) {
      // Resize the ArrayBuffer to hold more data.
      const newSize = Math.max(iOffset + pData.byteLength, 2 * file.data.byteLength);
      const data = new ArrayBuffer(newSize);
      new Uint8Array(data).set(new Uint8Array(file.data, 0, file.size));
      file.data = data;
    }

    // Copy data.
    new Uint8Array(file.data, iOffset, pData.byteLength).set(pData.subarray());
    file.size = Math.max(file.size, iOffset + pData.byteLength);
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {number|Promise<number>}
   */
  jTruncate(fileId, iSize) {
    const file = this.mapIdToFile.get(fileId);

    // For simplicity we don't make the ArrayBuffer smaller.
    file.size = Math.min(file.size, iSize);
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {number|Promise<number>}
   */
  jFileSize(fileId, pSize64) {
    const file = this.mapIdToFile.get(fileId);

    pSize64.setBigInt64(0, BigInt(file.size), true);
    return VFS.SQLITE_OK;
  }

  /**
   * @param {string} name 
   * @param {number} syncDir 
   * @returns {number|Promise<number>}
   */
  jDelete(name, syncDir) {
    const url = new URL(name, 'file://');
    const pathname = url.pathname;

    this.mapNameToFile.delete(pathname);
    return VFS.SQLITE_OK;
  }

  /**
   * @param {string} name 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {number|Promise<number>}
   */
  jAccess(name, flags, pResOut) {
    const url = new URL(name, 'file://');
    const pathname = url.pathname;

    const file = this.mapNameToFile.get(pathname);
    pResOut.setInt32(0, file ? 1 : 0, true);
    return VFS.SQLITE_OK;
  }
}
````

## File: packages/wa-sqlite/src/examples/OPFSAdaptiveVFS.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
import { FacadeVFS } from '../FacadeVFS.js';
import * as VFS from '../VFS.js';
import { WebLocksMixin } from '../WebLocksMixin.js';

const LOCK_NOTIFY_INTERVAL = 1000;

const hasUnsafeAccessHandle =
  globalThis.FileSystemSyncAccessHandle.prototype.hasOwnProperty('mode');

/**
 * @param {string} pathname 
 * @param {boolean} create 
 * @returns {Promise<[FileSystemDirectoryHandle, string]>}
 */
async function getPathComponents(pathname, create) {
  const [_, directories, filename] = pathname.match(/[/]?(.*)[/](.*)$/);

  let directoryHandle = await navigator.storage.getDirectory();
  for (const directory of directories.split('/')) {
    if (directory) {
      directoryHandle = await directoryHandle.getDirectoryHandle(directory, { create });
    }
  }
  return [directoryHandle, filename];
};

class File {
  /** @type {string} */ pathname;
  /** @type {number} */ flags;
  /** @type {FileSystemFileHandle} */ fileHandle;
  /** @type {FileSystemSyncAccessHandle} */ accessHandle;

  // The rest of the properties are for platforms without readwrite-unsafe
  // access handles. Only one connection can have an open access handle
  // so coordination is needed in addition to the SQLite locking model.
  //
  // Opening and closing the access handle is expensive so we leave the
  // handle open unless another connection signals on BroadcastChannel.
  /** @type {BroadcastChannel} */ handleRequestChannel;
  /** @type {function} */ handleLockReleaser = null;
  /** @type {boolean} */ isHandleRequested = false;
  /** @type {boolean} */ isFileLocked = false;

  // SQLite makes one read on file open that is not protected by a lock.
  // This needs to be handled as a special case.
  /** @type {function} */ openLockReleaser = null;

  constructor(pathname, flags) {
    this.pathname = pathname;
    this.flags = flags;
  }
}

export class OPFSAdaptiveVFS extends WebLocksMixin(FacadeVFS) {
  /** @type {Map<number, File>} */ mapIdToFile = new Map();
  lastError = null;

  log = null;

  static async create(name, module, options) {
    const vfs = new OPFSAdaptiveVFS(name, module, options);
    await vfs.isReady();
    return vfs;
  }

  constructor(name, module, options = {}) {
    super(name, module, options);
  }
  
  getFilename(fileId) {
    const pathname = this.mapIdToFile.get(fileId).pathname;
    return `OPFS:${pathname}`
  }

  /**
   * @param {string?} zName 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {Promise<number>}
   */
  async jOpen(zName, fileId, flags, pOutFlags) {
    try {
      const url = new URL(zName || Math.random().toString(36).slice(2), 'file://');
      const pathname = url.pathname;

      const file = new File(pathname, flags);
      this.mapIdToFile.set(fileId, file);

      const create = !!(flags & VFS.SQLITE_OPEN_CREATE);
      const [directoryHandle, filename] = await getPathComponents(pathname, create);
      file.fileHandle = await directoryHandle.getFileHandle(filename, { create });

      if ((flags & VFS.SQLITE_OPEN_MAIN_DB) && !hasUnsafeAccessHandle) {
        file.handleRequestChannel = new BroadcastChannel(this.getFilename(fileId));

        // Acquire the access handle lock. The first read of a database
        // file is done outside xLock/xUnlock so we get that lock here.
        function notify() {
          file.handleRequestChannel.postMessage(null);
        }
        const notifyId = setInterval(notify, LOCK_NOTIFY_INTERVAL);
        setTimeout(notify);

        file.openLockReleaser = await new Promise((resolve, reject) => {
          navigator.locks.request(this.getFilename(fileId), lock => {
            clearInterval(notifyId);
            if (!lock) return reject();
            return new Promise(release => {
              resolve(release);
            });
          });
        });
        this.log?.('access handle acquired for open');
      }

      // @ts-ignore
      file.accessHandle = await file.fileHandle.createSyncAccessHandle({
        mode: 'readwrite-unsafe'
      });
  
      pOutFlags.setInt32(0, flags, true);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_CANTOPEN;
    }
  }

  /**
   * @param {string} zName 
   * @param {number} syncDir 
   * @returns {Promise<number>}
   */
  async jDelete(zName, syncDir) {
    try {
      const url = new URL(zName, 'file://');
      const pathname = url.pathname;
   
      const [directoryHandle, name] = await getPathComponents(pathname, false);
      const result = directoryHandle.removeEntry(name, { recursive: false });
      if (syncDir) {
        await result;
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      return VFS.SQLITE_IOERR_DELETE;
    }
  }

  /**
   * @param {string} zName 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {Promise<number>}
   */
  async jAccess(zName, flags, pResOut) {
    try {
      const url = new URL(zName, 'file://');
      const pathname = url.pathname;

      const [directoryHandle, dbName] = await getPathComponents(pathname, false);
      const fileHandle = await directoryHandle.getFileHandle(dbName, { create: false });
      pResOut.setInt32(0, 1, true);
      return VFS.SQLITE_OK;
    } catch (e) {
      if (e.name === 'NotFoundError') {
        pResOut.setInt32(0, 0, true);
        return VFS.SQLITE_OK;
      }
      this.lastError = e;
      return VFS.SQLITE_IOERR_ACCESS;
    }
  }

  /**
   * @param {number} fileId 
   * @returns {Promise<number>}
   */
  async jClose(fileId) {
    try {
      const file = this.mapIdToFile.get(fileId);
      this.mapIdToFile.delete(fileId);
      await file?.accessHandle?.close();

      if (file?.flags & VFS.SQLITE_OPEN_DELETEONCLOSE) {
        const [directoryHandle, name] = await getPathComponents(file.pathname, false);
        await directoryHandle.removeEntry(name, { recursive: false });
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      return VFS.SQLITE_IOERR_DELETE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  jRead(fileId, pData, iOffset) {
    try {
      const file = this.mapIdToFile.get(fileId);

      // On Chrome (at least), passing pData to accessHandle.read() is
      // an error because pData is a Proxy of a Uint8Array. Calling
      // subarray() produces a real Uint8Array and that works.
      const bytesRead = file.accessHandle.read(pData.subarray(), { at: iOffset });
      if (file.openLockReleaser) {
        // We obtained the access handle on file open.
        file.accessHandle.close();
        file.accessHandle = null;
        file.openLockReleaser();
        file.openLockReleaser = null;
        this.log?.('access handle released for open');
      }

      if (bytesRead < pData.byteLength) {
        pData.fill(0, bytesRead);
        return VFS.SQLITE_IOERR_SHORT_READ;
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_READ;
    }
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  jWrite(fileId, pData, iOffset) {
    try {
      const file = this.mapIdToFile.get(fileId);

      // On Chrome (at least), passing pData to accessHandle.write() is
      // an error because pData is a Proxy of a Uint8Array. Calling
      // subarray() produces a real Uint8Array and that works.
      file.accessHandle.write(pData.subarray(), { at: iOffset });
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_WRITE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {number}
   */
  jTruncate(fileId, iSize) {
    try {
      const file = this.mapIdToFile.get(fileId);
      file.accessHandle.truncate(iSize);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_TRUNCATE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  jSync(fileId, flags) {
    try {
      const file = this.mapIdToFile.get(fileId);
      file.accessHandle.flush();
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_FSYNC;
    }
  }

  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {number}
   */
  jFileSize(fileId, pSize64) {
    try {
      const file = this.mapIdToFile.get(fileId);
      const size = file.accessHandle.getSize();
      pSize64.setBigInt64(0, BigInt(size), true);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_FSTAT;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {Promise<number>}
   */
  async jLock(fileId, lockType) {
    if (hasUnsafeAccessHandle) return super.jLock(fileId, lockType);

    const file = this.mapIdToFile.get(fileId);
    if (!file.isFileLocked) {
      file.isFileLocked = true;
      if (!file.handleLockReleaser) {
        // Listen for other connections wanting the access handle.
        file.handleRequestChannel.onmessage = event => {
          if(!file.isFileLocked) {
            // We have the access handle but the file is not locked.
            // Release the access handle for the requester.
            file.accessHandle.close();
            file.accessHandle = null;
            file.handleLockReleaser();
            file.handleLockReleaser = null;
            this.log?.('access handle requested and released');
          } else {
            // We're still using the access handle, so mark it to be
            // released when we're done.
            file.isHandleRequested = true;
            this.log?.('access handle requested');
          }
          file.handleRequestChannel.onmessage = null;
        };

        // We don't have the access handle. First acquire the lock.
        file.handleLockReleaser = await new Promise((resolve, reject) => {
          // Tell everyone we want the access handle.
          function notify() {
            file.handleRequestChannel.postMessage(null);
          }
          const notifyId = setInterval(notify, LOCK_NOTIFY_INTERVAL);
          setTimeout(notify);

          navigator.locks.request(this.getFilename(fileId), lock => {
            clearInterval(notifyId);
            if (!lock) return reject();
            return new Promise(release => {
              resolve(release);
            });
          });
        });

        // The access handle should now be available.
        file.accessHandle = await file.fileHandle.createSyncAccessHandle();
        this.log?.('access handle acquired');
      }

    }
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {Promise<number>}
   */
  async jUnlock(fileId, lockType) {
    if (hasUnsafeAccessHandle) return super.jUnlock(fileId, lockType);

    if (lockType === VFS.SQLITE_LOCK_NONE) {
      const file = this.mapIdToFile.get(fileId);
      if (file.isHandleRequested) {
        if (file.handleLockReleaser) {
          // Another connection wants the access handle.
          file.accessHandle.close();
          file.accessHandle = null;
          file.handleLockReleaser();
          file.handleLockReleaser = null;
          this.log?.('access handle released');
        }
        file.isHandleRequested = false;
      }
      file.isFileLocked = false;
    }
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId
   * @param {number} op
   * @param {DataView} pArg
   * @returns {number|Promise<number>}
   */
  jFileControl(fileId, op, pArg) {
    try {
      const file = this.mapIdToFile.get(fileId);
      switch (op) {
        case VFS.SQLITE_FCNTL_PRAGMA:
          const key = extractString(pArg, 4);
          const value = extractString(pArg, 8);
          this.log?.('xFileControl', file.pathname, 'PRAGMA', key, value);
          switch (key.toLowerCase()) {
            case 'journal_mode':
              if (value &&
                  !hasUnsafeAccessHandle && 
                  !['off', 'memory', 'delete', 'wal'].includes(value.toLowerCase())) {
                throw new Error('journal_mode must be "off", "memory", "delete", or "wal"');
              }
              break;
            case 'write_hint':
              return super.jFileControl(fileId, WebLocksMixin.WRITE_HINT_OP_CODE, null);
          }
          break;
      }
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR;
    }
    return super.jFileControl(fileId, op, pArg);
  }

  jGetLastError(zBuf) {
    if (this.lastError) {
      console.error(this.lastError);
      const outputArray = zBuf.subarray(0, zBuf.byteLength - 1);
      const { written } = new TextEncoder().encodeInto(this.lastError.message, outputArray);
      zBuf[written] = 0;
    }
    return VFS.SQLITE_OK
  }
}

function extractString(dataView, offset) {
  const p = dataView.getUint32(offset, true);
  if (p) {
    const chars = new Uint8Array(dataView.buffer, p);
    return new TextDecoder().decode(chars.subarray(0, chars.indexOf(0)));
  }
  return null;
}
````

## File: packages/wa-sqlite/src/examples/OPFSAnyContextVFS.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
import { FacadeVFS } from '../FacadeVFS.js';
import * as VFS from '../VFS.js';
import { WebLocksMixin } from '../WebLocksMixin.js';

/**
 * @param {string} pathname 
 * @param {boolean} create 
 * @returns {Promise<[FileSystemDirectoryHandle, string]>}
 */
async function getPathComponents(pathname, create) {
  const [_, directories, filename] = pathname.match(/[/]?(.*)[/](.*)$/);

  let directoryHandle = await navigator.storage.getDirectory();
  for (const directory of directories.split('/')) {
    if (directory) {
      directoryHandle = await directoryHandle.getDirectoryHandle(directory, { create });
    }
  }
  return [directoryHandle, filename];
};

class File {
  /** @type {string} */ pathname;
  /** @type {number} */ flags;
  /** @type {FileSystemFileHandle} */ fileHandle;
  /** @type {Blob?} */ blob;
  /** @type {FileSystemWritableFileStream?} */ writable;

  constructor(pathname, flags) {
    this.pathname = pathname;
    this.flags = flags;
  }
}

export class OPFSAnyContextVFS extends WebLocksMixin(FacadeVFS) {
  /** @type {Map<number, File>} */ mapIdToFile = new Map();
  lastError = null;

  log = null;

  static async create(name, module, options) {
    const vfs = new OPFSAnyContextVFS(name, module, options);
    await vfs.isReady();
    return vfs;
  }

  constructor(name, module, options = {}) {
    super(name, module, options);
  }
  
  getFilename(fileId) {
    const pathname = this.mapIdToFile.get(fileId).pathname;
    return `OPFS:${pathname}`
  }

  /**
   * @param {string?} zName 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {Promise<number>}
   */
  async jOpen(zName, fileId, flags, pOutFlags) {
    try {
      const url = new URL(zName || Math.random().toString(36).slice(2), 'file://');
      const pathname = url.pathname;

      const file = new File(pathname, flags);
      this.mapIdToFile.set(fileId, file);

      const create = !!(flags & VFS.SQLITE_OPEN_CREATE);
      const [directoryHandle, filename] = await getPathComponents(pathname, create);
      file.fileHandle = await directoryHandle.getFileHandle(filename, { create });
  
      pOutFlags.setInt32(0, flags, true);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_CANTOPEN;
    }
  }

  /**
   * @param {string} zName 
   * @param {number} syncDir 
   * @returns {Promise<number>}
   */
  async jDelete(zName, syncDir) {
    try {
      const url = new URL(zName, 'file://');
      const pathname = url.pathname;
   
      const [directoryHandle, name] = await getPathComponents(pathname, false);
      const result = directoryHandle.removeEntry(name, { recursive: false });
      if (syncDir) {
        await result;
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      return VFS.SQLITE_IOERR_DELETE;
    }
  }

  /**
   * @param {string} zName 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {Promise<number>}
   */
  async jAccess(zName, flags, pResOut) {
    try {
      const url = new URL(zName, 'file://');
      const pathname = url.pathname;

      const [directoryHandle, dbName] = await getPathComponents(pathname, false);
      const fileHandle = await directoryHandle.getFileHandle(dbName, { create: false });
      pResOut.setInt32(0, 1, true);
      return VFS.SQLITE_OK;
    } catch (e) {
      if (e.name === 'NotFoundError') {
        pResOut.setInt32(0, 0, true);
        return VFS.SQLITE_OK;
      }
      this.lastError = e;
      return VFS.SQLITE_IOERR_ACCESS;
    }
  }

  /**
   * @param {number} fileId 
   * @returns {Promise<number>}
   */
  async jClose(fileId) {
    try {
      const file = this.mapIdToFile.get(fileId);
      this.mapIdToFile.delete(fileId);

      await file.writable?.close();
      if (file?.flags & VFS.SQLITE_OPEN_DELETEONCLOSE) {
        const [directoryHandle, name] = await getPathComponents(file.pathname, false);
        await directoryHandle.removeEntry(name, { recursive: false });
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      return VFS.SQLITE_IOERR_DELETE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {Promise<number>}
   */
  async jRead(fileId, pData, iOffset) {
    try {
      const file = this.mapIdToFile.get(fileId);

      if (file.writable) {
        await file.writable.close();
        file.writable = null;
        file.blob = null;
      }
      if (!file.blob) {
        file.blob = await file.fileHandle.getFile();
      }

      const bytesRead = await file.blob.slice(iOffset, iOffset + pData.byteLength)
        .arrayBuffer()
        .then(arrayBuffer => {
          pData.set(new Uint8Array(arrayBuffer));
          return arrayBuffer.byteLength;
        });

      if (bytesRead < pData.byteLength) {
        pData.fill(0, bytesRead);
        return VFS.SQLITE_IOERR_SHORT_READ;
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_READ;
    }
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {Promise<number>}
   */
  async jWrite(fileId, pData, iOffset) {
    try {
      const file = this.mapIdToFile.get(fileId);

      if (!file.writable) {
        file.writable = await file.fileHandle.createWritable({ keepExistingData: true });
      }
      await file.writable.seek(iOffset);
      await file.writable.write(pData.subarray());
      file.blob = null;

      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_WRITE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {Promise<number>}
   */
  async jTruncate(fileId, iSize) {
    try {
      const file = this.mapIdToFile.get(fileId);

      if (!file.writable) {
        file.writable = await file.fileHandle.createWritable({ keepExistingData: true });
      }
      await file.writable.truncate(iSize);
      file.blob = null;
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_TRUNCATE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {Promise<number>}
   */
  async jSync(fileId, flags) {
    try {
      const file = this.mapIdToFile.get(fileId);
      await file.writable?.close();
      file.writable = null;
      file.blob = null;
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_FSYNC;
    }
  }

  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {Promise<number>}
   */
  async jFileSize(fileId, pSize64) {
    try {
      const file = this.mapIdToFile.get(fileId);

      if (file.writable) {
        await file.writable.close();
        file.writable = null;
        file.blob = null;
      }
      if (!file.blob) {
        file.blob = await file.fileHandle.getFile();
      }
      pSize64.setBigInt64(0, BigInt(file.blob.size), true);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_FSTAT;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {Promise<number>}
   */
  async jLock(fileId, lockType) {
    if (lockType === VFS.SQLITE_LOCK_SHARED) {
      // Make sure to get a current readable view of the file.
      const file = this.mapIdToFile.get(fileId);
      file.blob = null;
    }

    // Call the actual unlock implementation.
    return super.jLock(fileId, lockType);
  }

  jGetLastError(zBuf) {
    if (this.lastError) {
      console.error(this.lastError);
      const outputArray = zBuf.subarray(0, zBuf.byteLength - 1);
      const { written } = new TextEncoder().encodeInto(this.lastError.message, outputArray);
      zBuf[written] = 0;
    }
    return VFS.SQLITE_OK
  }
}
````

## File: packages/wa-sqlite/src/examples/OPFSCoopSyncVFS.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
import { FacadeVFS } from '../FacadeVFS.js';
import * as VFS from '../VFS.js';

const DEFAULT_TEMPORARY_FILES = 10;
const LOCK_NOTIFY_INTERVAL = 1000;

const DB_RELATED_FILE_SUFFIXES = ['', '-journal', '-wal'];

const finalizationRegistry = new FinalizationRegistry(releaser => releaser());

class File {
  /** @type {string} */ path
  /** @type {number} */ flags;
  /** @type {FileSystemSyncAccessHandle} */ accessHandle;

  /** @type {PersistentFile?} */ persistentFile;

  constructor(path, flags) {
    this.path = path;
    this.flags = flags;
  }
}

class PersistentFile {
  /** @type {FileSystemFileHandle} */ fileHandle
  /** @type {FileSystemSyncAccessHandle} */ accessHandle = null

  // The following properties are for main database files.

  /** @type {boolean} */ isLockBusy = false;
  /** @type {boolean} */ isFileLocked = false;
  /** @type {boolean} */ isRequestInProgress = false;
  /** @type {function} */ handleLockReleaser = null;

  /** @type {BroadcastChannel} */ handleRequestChannel;
  /** @type {boolean} */ isHandleRequested = false;

  constructor(fileHandle) {
    this.fileHandle = fileHandle;
  }
}

export class OPFSCoopSyncVFS extends FacadeVFS {
  /** @type {Map<number, File>} */ mapIdToFile = new Map();

  lastError = null;
  log = null; //function(...args) { console.log(`[${contextName}]`, ...args) };
  
  /** @type {Map<string, PersistentFile>} */ persistentFiles = new Map();
  /** @type {Map<string, FileSystemSyncAccessHandle>} */ boundAccessHandles = new Map();
  /** @type {Set<FileSystemSyncAccessHandle>} */ unboundAccessHandles = new Set();
  /** @type {Set<string>} */ accessiblePaths = new Set();
  releaser = null;

  static async create(name, module) {
    const vfs = new OPFSCoopSyncVFS(name, module);
    await Promise.all([
      vfs.isReady(),
      vfs.#initialize(DEFAULT_TEMPORARY_FILES),
    ]);
    return vfs;
  }

  constructor(name, module) {
    super(name, module);
  }

  async #initialize(nTemporaryFiles) {
    // Delete temporary directories no longer in use.
    const root = await navigator.storage.getDirectory();
    // @ts-ignore
    for await (const entry of root.values()) {
      if (entry.kind === 'directory' && entry.name.startsWith('.ahp-')) {
        // A lock with the same name as the directory protects it from
        // being deleted.
        await navigator.locks.request(entry.name, { ifAvailable: true }, async lock => {
          if (lock) {
            this.log?.(`Deleting temporary directory ${entry.name}`);
            await root.removeEntry(entry.name, { recursive: true });
          } else {
            this.log?.(`Temporary directory ${entry.name} is in use`);
          }
        });
      }
    }

    // Create our temporary directory.
    const tmpDirName = `.ahp-${Math.random().toString(36).slice(2)}`;
    this.releaser = await new Promise(resolve => {
      navigator.locks.request(tmpDirName, () => {
        return new Promise(release => {
          resolve(release);
        });
      });
    });
    finalizationRegistry.register(this, this.releaser);
    const tmpDir = await root.getDirectoryHandle(tmpDirName, { create: true });

    // Populate temporary directory.
    for (let i = 0; i < nTemporaryFiles; i++) {
      const tmpFile = await tmpDir.getFileHandle(`${i}.tmp`, { create: true });
      const tmpAccessHandle = await tmpFile.createSyncAccessHandle();
      this.unboundAccessHandles.add(tmpAccessHandle);
    }
  }

  /**
   * @param {string?} zName 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {number}
   */
  jOpen(zName, fileId, flags, pOutFlags) {
    try {
      const url = new URL(zName || Math.random().toString(36).slice(2), 'file://');
      const path = url.pathname;

      if (flags & VFS.SQLITE_OPEN_MAIN_DB) {
        const persistentFile = this.persistentFiles.get(path);
        if (persistentFile?.isRequestInProgress) {
          // Should not reach here unless SQLite itself retries an open.
          // Otherwise, asynchronous operations started on a previous
          // open try should have completed.
          return VFS.SQLITE_BUSY;
        } else if (!persistentFile) {
          // This is the usual starting point for opening a database.
          // Register a Promise that resolves when the database and related
          // files are ready to be used.
          this.log?.(`creating persistent file for ${path}`);
          const create = !!(flags & VFS.SQLITE_OPEN_CREATE);
          this._module.retryOps.push((async () => {
            try {
              // Get the path directory handle.
              let dirHandle = await navigator.storage.getDirectory();
              const directories = path.split('/').filter(d => d);
              const filename = directories.pop();
              for (const directory of directories) {
                dirHandle = await dirHandle.getDirectoryHandle(directory, { create });
              }

              // Get file handles for the database and related files,
              // and create persistent file instances.
              for (const suffix of DB_RELATED_FILE_SUFFIXES) {
                const fileHandle = await dirHandle.getFileHandle(filename + suffix, { create });
                await this.#createPersistentFile(fileHandle);
              }

              // Get access handles for the files.
              const file = new File(path, flags);
              file.persistentFile = this.persistentFiles.get(path);
              await this.#requestAccessHandle(file);
            } catch (e) {
              // Use an invalid persistent file to signal this error
              // for the retried open.
              const persistentFile = new PersistentFile(null);
              this.persistentFiles.set(path, persistentFile);
              console.error(e);
            }
          })());
          return VFS.SQLITE_BUSY;
        } else if (!persistentFile.fileHandle) {
          // The asynchronous open operation failed.
          this.persistentFiles.delete(path);
          return VFS.SQLITE_CANTOPEN;
        } else if (!persistentFile.accessHandle) {
          // This branch is reached if the database was previously opened
          // and closed.
          this._module.retryOps.push((async () => {
            const file = new File(path, flags);
            file.persistentFile = this.persistentFiles.get(path);
            await this.#requestAccessHandle(file);
          })());
          return VFS.SQLITE_BUSY;
        }
      }

      if (!this.accessiblePaths.has(path) &&
          !(flags & VFS.SQLITE_OPEN_CREATE)) {
        throw new Error(`File ${path} not found`);
      }

      const file = new File(path, flags);
      this.mapIdToFile.set(fileId, file);

      if (this.persistentFiles.has(path)) {
        file.persistentFile = this.persistentFiles.get(path);
      } else if (this.boundAccessHandles.has(path)) {
        // This temporary file was previously created and closed. Reopen
        // the same access handle.
        file.accessHandle = this.boundAccessHandles.get(path);
      } else if (this.unboundAccessHandles.size) {
        // Associate an unbound access handle to this file.
        file.accessHandle = this.unboundAccessHandles.values().next().value;
        file.accessHandle.truncate(0);
        this.unboundAccessHandles.delete(file.accessHandle);
        this.boundAccessHandles.set(path, file.accessHandle);
      }
      this.accessiblePaths.add(path);
  
      pOutFlags.setInt32(0, flags, true);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_CANTOPEN;
    }
  }

  /**
   * @param {string} zName 
   * @param {number} syncDir 
   * @returns {number}
   */
  jDelete(zName, syncDir) {
    try {
      const url = new URL(zName, 'file://');
      const path = url.pathname;
      if (this.persistentFiles.has(path)) {
        const persistentFile = this.persistentFiles.get(path);
        persistentFile.accessHandle.truncate(0);
      } else {
        this.boundAccessHandles.get(path)?.truncate(0);
      }
      this.accessiblePaths.delete(path);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_DELETE;
    }
  }

  /**
   * @param {string} zName 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {number}
   */
  jAccess(zName, flags, pResOut) {
    try {
      const url = new URL(zName, 'file://');
      const path = url.pathname;
      pResOut.setInt32(0, this.accessiblePaths.has(path) ? 1 : 0, true);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_ACCESS;
    } 
  }

  /**
   * @param {number} fileId 
   * @returns {number}
   */
  jClose(fileId) {
    try {
      const file = this.mapIdToFile.get(fileId);
      this.mapIdToFile.delete(fileId);

      if (file?.flags & VFS.SQLITE_OPEN_MAIN_DB) {
        if (file.persistentFile?.handleLockReleaser) {
          this.#releaseAccessHandle(file);
        }
      } else if (file?.flags & VFS.SQLITE_OPEN_DELETEONCLOSE) {
        file.accessHandle.truncate(0);
        this.accessiblePaths.delete(file.path);
        if (!this.persistentFiles.has(file.path)) {
          this.boundAccessHandles.delete(file.path);
          this.unboundAccessHandles.add(file.accessHandle);
        }
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_CLOSE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  jRead(fileId, pData, iOffset) {
    try {
      const file = this.mapIdToFile.get(fileId);

      // On Chrome (at least), passing pData to accessHandle.read() is
      // an error because pData is a Proxy of a Uint8Array. Calling
      // subarray() produces a real Uint8Array and that works.
      const accessHandle = file.accessHandle || file.persistentFile.accessHandle;
      const bytesRead = accessHandle.read(pData.subarray(), { at: iOffset });

      // Opening a database file performs one read without a xLock call.
      if ((file.flags & VFS.SQLITE_OPEN_MAIN_DB) && !file.persistentFile.isFileLocked) {
        this.#releaseAccessHandle(file);
      }

      if (bytesRead < pData.byteLength) {
        pData.fill(0, bytesRead);
        return VFS.SQLITE_IOERR_SHORT_READ;
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_READ;
    }
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  jWrite(fileId, pData, iOffset) {
    try {
      const file = this.mapIdToFile.get(fileId);

      // On Chrome (at least), passing pData to accessHandle.write() is
      // an error because pData is a Proxy of a Uint8Array. Calling
      // subarray() produces a real Uint8Array and that works.
      const accessHandle = file.accessHandle || file.persistentFile.accessHandle;
      const nBytes = accessHandle.write(pData.subarray(), { at: iOffset });
      if (nBytes !== pData.byteLength) throw new Error('short write');
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_WRITE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {number}
   */
  jTruncate(fileId, iSize) {
    try {
      const file = this.mapIdToFile.get(fileId);
      const accessHandle = file.accessHandle || file.persistentFile.accessHandle;
      accessHandle.truncate(iSize);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_TRUNCATE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  jSync(fileId, flags) {
    try {
      const file = this.mapIdToFile.get(fileId);
      const accessHandle = file.accessHandle || file.persistentFile.accessHandle;
      accessHandle.flush();
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_FSYNC;
    }
  }

  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {number}
   */
  jFileSize(fileId, pSize64) {
    try {
      const file = this.mapIdToFile.get(fileId);
      const accessHandle = file.accessHandle || file.persistentFile.accessHandle;
      const size = accessHandle.getSize();
      pSize64.setBigInt64(0, BigInt(size), true);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR_FSTAT;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {number}
   */
  jLock(fileId, lockType) {
    const file = this.mapIdToFile.get(fileId);
    if (file.persistentFile.isRequestInProgress) {
      file.persistentFile.isLockBusy = true;
      return VFS.SQLITE_BUSY;
    }

    file.persistentFile.isFileLocked = true;
    if (!file.persistentFile.handleLockReleaser) {
      // Start listening for notifications from other connections.
      // This is before we actually get access handles, but waiting to
      // listen until then allows a race condition where notifications
      // are missed. 
      file.persistentFile.handleRequestChannel.onmessage = () => {
        this.log?.(`received notification for ${file.path}`);
        if (file.persistentFile.isFileLocked) {
          // We're still using the access handle, so mark it to be
          // released when we're done.
          file.persistentFile.isHandleRequested = true;
        } else {
          // Release the access handles immediately.
          this.#releaseAccessHandle(file);
        }
        file.persistentFile.handleRequestChannel.onmessage = null;
      };

      this.#requestAccessHandle(file);
      this.log?.('returning SQLITE_BUSY');
      file.persistentFile.isLockBusy = true;
      return VFS.SQLITE_BUSY;
    }
    file.persistentFile.isLockBusy = false;
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {number}
   */
  jUnlock(fileId, lockType) {
    const file = this.mapIdToFile.get(fileId);
    if (lockType === VFS.SQLITE_LOCK_NONE) {
      // Don't change any state if this unlock is because xLock returned
      // SQLITE_BUSY.
      if (!file.persistentFile.isLockBusy) {
        if (file.persistentFile.isHandleRequested) {
            // Another connection wants the access handle.
          this.#releaseAccessHandle(file);
          file.persistentFile.isHandleRequested = false;
        }
        file.persistentFile.isFileLocked = false;
      }
    }
    return VFS.SQLITE_OK;
  }
  
  /**
   * @param {number} fileId
   * @param {number} op
   * @param {DataView} pArg
   * @returns {number|Promise<number>}
   */
  jFileControl(fileId, op, pArg) {
    try {
      const file = this.mapIdToFile.get(fileId);
      switch (op) {
        case VFS.SQLITE_FCNTL_PRAGMA:
          const key = extractString(pArg, 4);
          const value = extractString(pArg, 8);
          this.log?.('xFileControl', file.path, 'PRAGMA', key, value);
          switch (key.toLowerCase()) {
            case 'journal_mode':
              if (value &&
                  !['off', 'memory', 'delete', 'wal'].includes(value.toLowerCase())) {
                throw new Error('journal_mode must be "off", "memory", "delete", or "wal"');
              }
              break;
          }
          break;
      }
    } catch (e) {
      this.lastError = e;
      return VFS.SQLITE_IOERR;
    }
    return VFS.SQLITE_NOTFOUND;
  }

  /**
   * @param {Uint8Array} zBuf 
   * @returns 
   */
  jGetLastError(zBuf) {
    if (this.lastError) {
      console.error(this.lastError);
      const outputArray = zBuf.subarray(0, zBuf.byteLength - 1);
      const { written } = new TextEncoder().encodeInto(this.lastError.message, outputArray);
      zBuf[written] = 0;
    }
    return VFS.SQLITE_OK
  }

  /**
   * @param {FileSystemFileHandle} fileHandle 
   * @returns {Promise<PersistentFile>}
   */
  async #createPersistentFile(fileHandle) {
    const persistentFile = new PersistentFile(fileHandle);
    const root = await navigator.storage.getDirectory();
    const relativePath = await root.resolve(fileHandle);
    const path = `/${relativePath.join('/')}`;
    persistentFile.handleRequestChannel = new BroadcastChannel(`ahp:${path}`);
    this.persistentFiles.set(path, persistentFile);

    const f = await fileHandle.getFile();
    if (f.size) {
      this.accessiblePaths.add(path);
    }
    return persistentFile;
  }

  /**
   * @param {File} file 
   */
  #requestAccessHandle(file) {
    console.assert(!file.persistentFile.handleLockReleaser);
    if (!file.persistentFile.isRequestInProgress) {
      file.persistentFile.isRequestInProgress = true;
      this._module.retryOps.push((async () => {
        // Acquire the Web Lock.
        file.persistentFile.handleLockReleaser = await this.#acquireLock(file.persistentFile);

        // Get access handles for the database and releated files in parallel.
        this.log?.(`creating access handles for ${file.path}`)
        await Promise.all(DB_RELATED_FILE_SUFFIXES.map(async suffix => {
          const persistentFile = this.persistentFiles.get(file.path + suffix);
          if (persistentFile) {
            persistentFile.accessHandle =
              await persistentFile.fileHandle.createSyncAccessHandle();
          }
        }));
        file.persistentFile.isRequestInProgress = false;
      })());
      return this._module.retryOps.at(-1);
    }
    return Promise.resolve();
  }

  /**
   * @param {File} file 
   */
  async #releaseAccessHandle(file) {
    DB_RELATED_FILE_SUFFIXES.forEach(async suffix => {
      const persistentFile = this.persistentFiles.get(file.path + suffix);
      if (persistentFile) {
        persistentFile.accessHandle?.close();
        persistentFile.accessHandle = null;
      }
    });
    this.log?.(`access handles closed for ${file.path}`)

    file.persistentFile.handleLockReleaser?.();
    file.persistentFile.handleLockReleaser = null;
    this.log?.(`lock released for ${file.path}`)
  }

  /**
   * @param {PersistentFile} persistentFile 
   * @returns  {Promise<function>} lock releaser
   */
  #acquireLock(persistentFile) {
    return new Promise(resolve => {
      // Tell other connections we want the access handle.
      const lockName = persistentFile.handleRequestChannel.name;
      const notify = () => {
        this.log?.(`notifying for ${lockName}`);
        persistentFile.handleRequestChannel.postMessage(null);
      }
      const notifyId = setInterval(notify, LOCK_NOTIFY_INTERVAL);
      setTimeout(notify);

      this.log?.(`lock requested: ${lockName}`)
      navigator.locks.request(lockName, lock => {
        // We have the lock. Stop asking other connections for it.
        this.log?.(`lock acquired: ${lockName}`, lock);
        clearInterval(notifyId);
        return new Promise(resolve);
      });
    });
  }
}

function extractString(dataView, offset) {
  const p = dataView.getUint32(offset, true);
  if (p) {
    const chars = new Uint8Array(dataView.buffer, p);
    return new TextDecoder().decode(chars.subarray(0, chars.indexOf(0)));
  }
  return null;
}
````

## File: packages/wa-sqlite/src/examples/OPFSPermutedVFS.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
import { FacadeVFS } from '../FacadeVFS.js';
import * as VFS from '../VFS.js';
import { WebLocksMixin } from '../WebLocksMixin.js';

// Options for navigator.locks.request().
/** @type {LockOptions} */ const SHARED = { mode: 'shared' };
/** @type {LockOptions} */ const POLL_SHARED = { ifAvailable: true, mode: 'shared' };
/** @type {LockOptions} */ const POLL_EXCLUSIVE = { ifAvailable: true, mode: 'exclusive' };

// Default number of transactions between flushing the OPFS file and
// reclaiming free page offsets. Used only when synchronous! = 'full'.
const DEFAULT_FLUSH_INTERVAL = 64;

// Used only for debug logging.
const contextId = Math.random().toString(36).slice(2);

/**
 * @typedef {Object} Transaction
 * @property {number} txId
 * @property {Map<number, { offset: number, digest: Uint32Array }>} [pages]
 * @property {number} [fileSize]
 * @property {number} [oldestTxId]
 * @property {number[]} [reclaimable]
 */

/**
 * @typedef {Object} AccessRequest
 * @property {boolean} exclusive
 */

class File {
  /** @type {string} */ path;
  /** @type {number} */ flags;
  /** @type {FileSystemSyncAccessHandle} */ accessHandle;

  // Members below are only used for SQLITE_OPEN_MAIN_DB.

  /** @type {number} */ pageSize;
  /** @type {number} */ fileSize; // virtual file size exposed to SQLite

  /** @type {IDBDatabase} */ idb;

  /** @type {Transaction} */ viewTx; // last transaction incorporated
  /** @type {function?} */ viewReleaser;

  /** @type {BroadcastChannel} */ broadcastChannel;
  /** @type {(Transaction|AccessRequest)[]} */ broadcastReceived;

  /** @type {Map<number, number>} */ mapPageToOffset;
  /** @type {Map<number, Transaction>} */ mapTxToPending;
  /** @type {Set<number>} */ freeOffsets;

  /** @type {number} */ lockState;
  /** @type {{read?: function, write?: function, reserved?: function, hint?: function}} */ locks;

  /** @type {AbortController} */ abortController;

  /** @type {Transaction?} */ txActive; // transaction in progress
  /** @type {number} */ txRealFileSize; // physical file size
  /** @type {boolean} */ txIsOverwrite; // VACUUM in progress
  /** @type {boolean} */ txWriteHint;

  /** @type {'full'|'normal'} */ synchronous;
  /** @type {number} */ flushInterval;

  /**
   * @param {string} pathname 
   * @param {number} flags 
   */
  constructor(pathname, flags) {
    this.path = pathname;
    this.flags = flags;
  }

  /**
   * @param {string} pathname 
   * @param {number} flags 
   * @returns 
   */
  static async create(pathname, flags) {
    const file = new File(pathname, flags);

    const create = !!(flags & VFS.SQLITE_OPEN_CREATE);
    const [directory, filename] = await getPathComponents(pathname, create);
    const handle = await directory.getFileHandle(filename, { create });
    // @ts-ignore
    file.accessHandle = await handle.createSyncAccessHandle({ mode: 'readwrite-unsafe' });

    if (flags & VFS.SQLITE_OPEN_MAIN_DB) {
      file.idb = await new Promise((resolve, reject) => {
        const request = indexedDB.open(pathname);
        request.onupgradeneeded = () => {
          const db = request.result;
          db.createObjectStore('pages', { keyPath: 'i' });
          db.createObjectStore('pending', { keyPath: 'txId'});
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    return file;
  }
}

export class OPFSPermutedVFS extends FacadeVFS {
  /** @type {Map<number, File>} */ #mapIdToFile = new Map();
  #lastError = null;

  log = null; // (...args) => console.debug(contextId, ...args);

  /**
   * @param {string} name 
   * @param {*} module 
   * @returns 
   */
  static async create(name, module) {
    const vfs = new OPFSPermutedVFS(name, module);
    await vfs.isReady();
    return vfs;
  }

  /**
   * @param {string?} zName 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {Promise<number>}
   */
  async jOpen(zName, fileId, flags, pOutFlags) {
    /** @type {(() => void)[]} */ const onFinally = [];
    try {
      const url = new URL(zName || Math.random().toString(36).slice(2), 'file://');
      const path = url.pathname;

      const file = await File.create(path, flags);
      if (flags & VFS.SQLITE_OPEN_MAIN_DB) {
        file.pageSize = 0;
        file.fileSize = 0;
        file.viewTx = { txId: 0 };
        file.broadcastChannel = new BroadcastChannel(`permuted:${path}`);
        file.broadcastReceived = [];
        file.mapPageToOffset = new Map();
        file.mapTxToPending = new Map();
        file.freeOffsets = new Set();
        file.lockState = VFS.SQLITE_LOCK_NONE;
        file.locks = {};
        file.abortController = new AbortController();
        file.txIsOverwrite = false;
        file.txActive = null;
        file.synchronous = 'full';
        file.flushInterval = DEFAULT_FLUSH_INTERVAL;

        // Take the write lock so no other connection changes state
        // during our initialization.
        await this.#lock(file, 'write');
        onFinally.push(() => file.locks.write());

        // Load the initial page map from the database.
        const tx = file.idb.transaction(['pages', 'pending']);
        const pages = await idbX(tx.objectStore('pages').getAll());
        file.pageSize = this.#getPageSize(file);
        file.fileSize = pages.length * file.pageSize;

        // Begin with adding all file offsets to the free list.
        const opfsFileSize = file.accessHandle.getSize();
        for (let i = 0; i < opfsFileSize; i += file.pageSize) {
          file.freeOffsets.add(i);
        }

        // Incorporate the page map data.
        for (const { i, o } of pages) {
          file.mapPageToOffset.set(i, o);
          file.freeOffsets.delete(o);
        }

        // Incorporate pending transactions.
        try {
          /** @type {Transaction[]} */
          const transactions = await idbX(tx.objectStore('pending').getAll());
          for (const transaction of transactions) {
            // Verify checksums for all pages in this transaction.
            for (const [index, { offset, digest }] of transaction.pages) {
              const data = new Uint8Array(file.pageSize);
              file.accessHandle.read(data, { at: offset });
              if (checksum(data).some((v, i) => v !== digest[i])) {
                throw Object.assign(new Error('checksum error'), { txId: transaction.txId });
              }
            }
            this.#acceptTx(file, transaction);
            file.viewTx = transaction;
          }
        } catch (e) {
          if (e.message === 'checksum error') {
            console.warn(`Checksum error, removing tx ${e.txId}+`)
            const tx = file.idb.transaction('pending', 'readwrite');
            const txCommit = new Promise((resolve, reject) => {
              tx.oncomplete = resolve;
              tx.onabort = () => reject(tx.error);
            });
            const range = IDBKeyRange.lowerBound(e.txId);
            tx.objectStore('pending').delete(range);
            tx.commit();
            await txCommit;
          } else {
            throw e;
          }
        }

        // Publish our view of the database. This prevents other connections
        // from overwriting file data we still need.
        await this.#setView(file, file.viewTx);

        // Listen for broadcasts. Messages are cached until the database
        // is unlocked.
        file.broadcastChannel.addEventListener('message', event => {
          file.broadcastReceived.push(event.data);
          if (file.lockState === VFS.SQLITE_LOCK_NONE) {
            this.#processBroadcasts(file);
          }
        });

        // Connections usually hold this shared read lock so they don't
        // acquire and release it for every transaction. The only time
        // it is released is when a connection wants to VACUUM, which
        // it signals with a broadcast message.
        await this.#lock(file, 'read', SHARED)
      }

      pOutFlags.setInt32(0, flags, true);
      this.#mapIdToFile.set(fileId, file);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.#lastError = e;
      return VFS.SQLITE_CANTOPEN;
    } finally {
      while (onFinally.length) {
        await onFinally.pop()();
      }
    }
  }

  /**
   * @param {string} zName 
   * @param {number} syncDir 
   * @returns {Promise<number>}
   */
  async jDelete(zName, syncDir) {
    try {
      const url = new URL(zName, 'file://');
      const pathname = url.pathname;
   
      const [directoryHandle, name] = await getPathComponents(pathname, false);
      const result = directoryHandle.removeEntry(name, { recursive: false });
      if (syncDir) {
        await result;
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      return VFS.SQLITE_IOERR_DELETE;
    }
  }

  /**
   * @param {string} zName 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {Promise<number>}
   */
  async jAccess(zName, flags, pResOut) {
    try {
      const url = new URL(zName, 'file://');
      const pathname = url.pathname;

      const [directoryHandle, dbName] = await getPathComponents(pathname, false);
      await directoryHandle.getFileHandle(dbName, { create: false });
      pResOut.setInt32(0, 1, true);
      return VFS.SQLITE_OK;
    } catch (e) {
      if (e.name === 'NotFoundError') {
        pResOut.setInt32(0, 0, true);
        return VFS.SQLITE_OK;
      }
      this.#lastError = e;
      return VFS.SQLITE_IOERR_ACCESS;
    }
  }

  /**
   * @param {number} fileId 
   * @returns {Promise<number>}
   */
  async jClose(fileId) {
    try {
      const file = this.#mapIdToFile.get(fileId);
      this.#mapIdToFile.delete(fileId);
      file?.accessHandle?.close();

      if (file?.flags & VFS.SQLITE_OPEN_MAIN_DB) {
        file.broadcastChannel.close();
        file.viewReleaser?.();
      }

      if (file?.flags & VFS.SQLITE_OPEN_DELETEONCLOSE) {
        const [directoryHandle, name] = await getPathComponents(file.path, false);
        await directoryHandle.removeEntry(name, { recursive: false });
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      return VFS.SQLITE_IOERR_CLOSE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  jRead(fileId, pData, iOffset) {
    try {
      const file = this.#mapIdToFile.get(fileId);

      let bytesRead = 0;
      if (file.flags & VFS.SQLITE_OPEN_MAIN_DB) {
        file.abortController.signal.throwIfAborted();

        // Look up the page location in the file. Check the pages in
        // any active write transaction first, then the main map.
        const pageIndex = file.pageSize ?
          Math.trunc(iOffset / file.pageSize) + 1:
          1;
        const pageOffset = file.txActive?.pages.has(pageIndex) ?
          file.txActive.pages.get(pageIndex).offset :
          file.mapPageToOffset.get(pageIndex);
        if (pageOffset >= 0) {
          this.log?.(`read page ${pageIndex} at ${pageOffset}`);
          bytesRead = file.accessHandle.read(
            pData.subarray(),
            { at: pageOffset + (file.pageSize ? iOffset % file.pageSize : 0) });
        }

        // Get page size if not already known.
        if (!file.pageSize && iOffset <= 16 && iOffset + bytesRead >= 18) {
          const dataView = new DataView(pData.slice(16 - iOffset, 18 - iOffset).buffer);
          file.pageSize = dataView.getUint16(0);
          if (file.pageSize === 1) {
            file.pageSize = 65536;
          }
          this.log?.(`set page size ${file.pageSize}`);
        }
      } else {
        // On Chrome (at least), passing pData to accessHandle.read() is
        // an error because pData is a Proxy of a Uint8Array. Calling
        // subarray() produces a real Uint8Array and that works.
        bytesRead = file.accessHandle.read(pData.subarray(), { at: iOffset });
      }

      if (bytesRead < pData.byteLength) {
        pData.fill(0, bytesRead);
        return VFS.SQLITE_IOERR_SHORT_READ;
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.#lastError = e;
      return VFS.SQLITE_IOERR_READ;
    }
  }

  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  jWrite(fileId, pData, iOffset) {
    try {
      const file = this.#mapIdToFile.get(fileId);

      if (file.flags & VFS.SQLITE_OPEN_MAIN_DB) {
        file.abortController.signal.throwIfAborted();
        if (!file.pageSize) {
          this.log?.(`set page size ${pData.byteLength}`)
          file.pageSize = pData.byteLength;
        }

        // The first write begins a transaction. Note that xLock/xUnlock
        // is not a good way to determine transaction boundaries because
        // PRAGMA locking_mode can change the behavior.
        if (!file.txActive) {
          this.#beginTx(file);
        }

        // Choose the offset in the file to write this page.
        let pageOffset;
        const pageIndex = Math.trunc(iOffset / file.pageSize) + 1;
        if (file.txIsOverwrite) {
          // For VACUUM, use the identity mapping to write each page
          // at its canonical offset.
          pageOffset = iOffset;
        } else if (file.txActive.pages.has(pageIndex)) {
          // This page has already been written in this transaction.
          // Use the same offset.
          pageOffset = file.txActive.pages.get(pageIndex).offset;
          this.log?.(`overwrite page ${pageIndex} at ${pageOffset}`);
        } else if (pageIndex === 1 && file.freeOffsets.delete(0)) {
          // Offset 0 is available for page 1.
          pageOffset = 0;
          this.log?.(`write page ${pageIndex} at ${pageOffset}`);
        } else {
          // Use the first unused non-zero offset within the file.
          for (const maybeOffset of file.freeOffsets) {
            if (maybeOffset) {
              if (maybeOffset < file.txRealFileSize) {
                pageOffset = maybeOffset;
                file.freeOffsets.delete(pageOffset);
                this.log?.(`write page ${pageIndex} at ${pageOffset}`);
                break;
              } else {
                // This offset is beyond the end of the file.
                file.freeOffsets.delete(maybeOffset);
              }
            }
          }

          if (pageOffset === undefined) {
            // Write to the end of the file.
            pageOffset = file.txRealFileSize;
            this.log?.(`append page ${pageIndex} at ${pageOffset}`);
          }
        }
        file.accessHandle.write(pData.subarray(), { at: pageOffset });

        // Update the transaction.
        file.txActive.pages.set(pageIndex, {
          offset: pageOffset,
          digest: checksum(pData.subarray())
        });
        file.txActive.fileSize = Math.max(file.txActive.fileSize, pageIndex * file.pageSize);

        // Track the actual file size.
        file.txRealFileSize = Math.max(file.txRealFileSize, pageOffset + pData.byteLength);
      } else {
        // On Chrome (at least), passing pData to accessHandle.write() is
        // an error because pData is a Proxy of a Uint8Array. Calling
        // subarray() produces a real Uint8Array and that works.
        file.accessHandle.write(pData.subarray(), { at: iOffset });
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.#lastError = e;
      return VFS.SQLITE_IOERR_WRITE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {number}
   */
  jTruncate(fileId, iSize) {
    try {
      const file = this.#mapIdToFile.get(fileId);
      if ((file.flags & VFS.SQLITE_OPEN_MAIN_DB) && !file.txIsOverwrite) {
        file.abortController.signal.throwIfAborted();
        if (!file.txActive) {
          this.#beginTx(file);
        }
        file.txActive.fileSize = iSize;

        // Remove now obsolete pages from file.txActive.pages
        for (const [index, { offset }] of file.txActive.pages) {
          // Page indices are 1-based.
          if (index * file.pageSize > iSize) {
            file.txActive.pages.delete(index);
            file.freeOffsets.add(offset);
          }
        }
        return VFS.SQLITE_OK;
      }
      file.accessHandle.truncate(iSize);
      return VFS.SQLITE_OK;
    } catch (e) {
      console.error(e);
      this.lastError = e;
      return VFS.SQLITE_IOERR_TRUNCATE;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  jSync(fileId, flags) {
    try {
      // Main DB sync is handled by SQLITE_FCNTL_SYNC.
      const file = this.#mapIdToFile.get(fileId);
      if (!(file.flags & VFS.SQLITE_OPEN_MAIN_DB)) {
        file.accessHandle.flush();
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      this.#lastError = e;
      return VFS.SQLITE_IOERR_FSYNC;
    }
  }

  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {number}
   */
  jFileSize(fileId, pSize64) {
    try {
      const file = this.#mapIdToFile.get(fileId);

      let size;
      if (file.flags & VFS.SQLITE_OPEN_MAIN_DB) {
        file.abortController.signal.throwIfAborted();
        size = file.txActive?.fileSize ?? file.fileSize;
      } else {
        size = file.accessHandle.getSize();
      }

      pSize64.setBigInt64(0, BigInt(size), true);
      return VFS.SQLITE_OK;
    } catch (e) {
      this.#lastError = e;
      return VFS.SQLITE_IOERR_FSTAT;
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {Promise<number>}
   */
  async jLock(fileId, lockType) {
    const file = this.#mapIdToFile.get(fileId);
    if (lockType <= file.lockState) return VFS.SQLITE_OK;
    switch (lockType) {
      case VFS.SQLITE_LOCK_SHARED:
        if (file.txWriteHint) {
            // xFileControl() has hinted that this transaction will
            // write. Acquire the hint lock, which is required to reach
            // the RESERVED state.
            if (!await this.#lock(file, 'hint')) {
              return VFS.SQLITE_BUSY;
            }
        }

        if (!file.locks.read) {
          // Reacquire lock if it was released by a broadcast request.
          await this.#lock(file, 'read', SHARED);
        }
        break;
      case VFS.SQLITE_LOCK_RESERVED:
        // Ideally we should already have the hint lock, but if not
        // poll for it here.
        if (!file.locks.hint && !await this.#lock(file, 'hint', POLL_EXCLUSIVE)) {
          return VFS.SQLITE_BUSY;
        }

        if (!await this.#lock(file, 'reserved', POLL_EXCLUSIVE)) {
          file.locks.hint();
          return VFS.SQLITE_BUSY;
        }

        // In order to write, our view of the database must be up to date.
        // To check this, first fetch all transactions in IndexedDB equal to
        // or greater than our view.
        const tx = file.idb.transaction(['pending']);
        const range = IDBKeyRange.lowerBound(file.viewTx.txId);

        /** @type {Transaction[]} */
        const entries = await idbX(tx.objectStore('pending').getAll(range));

        // Ideally the fetched list of transactions should contain one
        // entry matching our view. If not then our view is out of date.
        if (entries.length && entries.at(-1).txId > file.viewTx.txId) {
          // There are newer transactions in IndexedDB that we haven't
          // seen via broadcast. Ensure that they are incorporated on unlock,
          // and force the application to retry.
          file.broadcastReceived.push(...entries);
          file.locks.reserved();
          return VFS.SQLITE_BUSY
        }
        break;
      case VFS.SQLITE_LOCK_EXCLUSIVE:
        await this.#lock(file, 'write');
        break;
    }
    file.lockState = lockType;
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {number}
   */
  jUnlock(fileId, lockType) {
    const file = this.#mapIdToFile.get(fileId);
    if (lockType >= file.lockState) return VFS.SQLITE_OK;
    switch (lockType) {
      case VFS.SQLITE_LOCK_SHARED:
        file.locks.write?.();
        file.locks.reserved?.();
        file.locks.hint?.();
        break;
      case VFS.SQLITE_LOCK_NONE:
        // Don't release the read lock here. It will be released on demand
        // when a broadcast notifies us that another connections wants to
        // VACUUM.
        this.#processBroadcasts(file);
        file.locks.write?.();
        file.locks.reserved?.();
        file.locks.hint?.();
        break;
    }
    file.lockState = lockType;
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId
   * @param {DataView} pResOut 
   * @returns {Promise<number>}
   */
  async jCheckReservedLock(fileId, pResOut) {
    try {
      const file = this.#mapIdToFile.get(fileId);
      if (await this.#lock(file, 'reserved', POLL_SHARED)) {
        // This looks backwards, but if we get the lock then no one
        // else had it.
        pResOut.setInt32(0, 0, true);
        file.locks.reserved();
      } else {
        pResOut.setInt32(0, 1, true);
      }
      return VFS.SQLITE_OK;
    } catch (e) {
      console.error(e);
      this.lastError = e;
      return VFS.SQLITE_IOERR_LOCK;
    }
  }

  /**
   * @param {number} fileId
   * @param {number} op
   * @param {DataView} pArg
   * @returns {Promise<number>}
   */
  async jFileControl(fileId, op, pArg) {
    try {
      const file = this.#mapIdToFile.get(fileId);
      switch (op) {
        case VFS.SQLITE_FCNTL_PRAGMA:
          const key = cvtString(pArg, 4);
          const value = cvtString(pArg, 8);
          this.log?.('xFileControl', file.path, 'PRAGMA', key, value);
          switch (key.toLowerCase()) {
            case 'page_size':
              // Don't allow changing the page size.
              if (value && file.pageSize && Number(value) !== file.pageSize) {
                return VFS.SQLITE_ERROR;
              }
              break;
            case 'synchronous':
              // This VFS only recognizes 'full' and not 'full'.
              if (value) {
                switch (value.toLowerCase()) {
                  case 'full':
                  case '2':
                  case 'extra':
                  case '3':
                    file.synchronous = 'full';
                    break;
                  default:
                    file.synchronous = 'normal';
                    break;
                }
              }
              break;
            case 'flush_interval':
              if (value) {
                const interval = Number(value);
                if (interval > 0) {
                  file.flushInterval = Number(value);
                } else {
                  return VFS.SQLITE_ERROR;
                }
              } else {
                // Report current value.
                const buffer = new TextEncoder().encode(file.flushInterval.toString());
                const s = this._module._sqlite3_malloc64(buffer.byteLength + 1);
                new Uint8Array(this._module.HEAPU8.buffer, s, buffer.byteLength + 1)
                  .fill(0)
                  .set(buffer);

                pArg.setUint32(0, s, true);
                return VFS.SQLITE_OK;
              }
              break;
            case 'write_hint':
              return this.jFileControl(fileId, WebLocksMixin.WRITE_HINT_OP_CODE, null);
            }
          break;
        case VFS.SQLITE_FCNTL_BEGIN_ATOMIC_WRITE:
          this.log?.('xFileControl', 'BEGIN_ATOMIC_WRITE', file.path);
          return VFS.SQLITE_OK;
        case VFS.SQLITE_FCNTL_COMMIT_ATOMIC_WRITE:
          this.log?.('xFileControl', 'COMMIT_ATOMIC_WRITE', file.path);
          return VFS.SQLITE_OK;
        case VFS.SQLITE_FCNTL_ROLLBACK_ATOMIC_WRITE:
          this.log?.('xFileControl', 'ROLLBACK_ATOMIC_WRITE', file.path);
          this.#rollbackTx(file);
          return VFS.SQLITE_OK;
        case VFS.SQLITE_FCNTL_OVERWRITE:
          // This is a VACUUM.
          this.log?.('xFileControl', 'OVERWRITE', file.path);
          await this.#prepareOverwrite(file);
          break;
        case VFS.SQLITE_FCNTL_COMMIT_PHASETWO:
          // Finish any transaction. Note that the transaction may not
          // exist if there is a BEGIN IMMEDIATE...COMMIT block that
          // does not actually call xWrite.
          this.log?.('xFileControl', 'COMMIT_PHASETWO', file.path);
          if (file.txActive) {
            await this.#commitTx(file);
          }
          break;
        case WebLocksMixin.WRITE_HINT_OP_CODE:
          file.txWriteHint = true;
          break;
      }
    } catch (e) {
      this.#lastError = e;
      return VFS.SQLITE_IOERR;
    }
    return VFS.SQLITE_NOTFOUND;
  }

  /**
   * @param {number} fileId
   * @returns {number|Promise<number>}
   */
  jDeviceCharacteristics(fileId) {
    return 0
    | VFS.SQLITE_IOCAP_BATCH_ATOMIC
    | VFS.SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN;
  }

  /**
   * @param {Uint8Array} zBuf 
   * @returns {number}
   */
  jGetLastError(zBuf) {
    if (this.#lastError) {
      console.error(this.#lastError);
      const outputArray = zBuf.subarray(0, zBuf.byteLength - 1);
      const { written } = new TextEncoder().encodeInto(this.#lastError.message, outputArray);
      zBuf[written] = 0;
    }
    return VFS.SQLITE_OK
  }

  /**
   * Return the database page size, or 0 if not yet known.
   * @param {File} file 
   * @returns {number}
   */
  #getPageSize(file) {
    // Offset 0 will always contain a page 1. Even if it is out of
    // date it will have a valid page size.
    // https://sqlite.org/fileformat.html#page_size
    const header = new DataView(new ArrayBuffer(2));
    const n = file.accessHandle.read(header, { at: 16 });
    if (n !== header.byteLength) return 0;
    const pageSize = header.getUint16(0);
    switch (pageSize) {
      case 1:
        return 65536;
      default:
        return pageSize;
    }
  }

  /**
   * Acquire one of the database file internal Web Locks.
   * @param {File} file 
   * @param {'read'|'write'|'reserved'|'hint'} name 
   * @param {LockOptions} options 
   * @returns {Promise<boolean>}
   */
  #lock(file, name, options = {}) {
    return new Promise(resolve => {
      const lockName = `${file.path}@@${name}`;
      navigator.locks.request(lockName, options, lock => {
        if (lock) {
          return new Promise(release => {
            file.locks[name] = () => {
              release();
              file.locks[name] = null;
            };
            resolve(true);
          });
        } else {
          file.locks[name] = null;
          resolve(false);
        }
      }).catch(e => {
        if (e.name !== 'AbortError') throw e;
      });
    });
  }

  /**
   * @param {File} file 
   * @param {Transaction} tx 
   */
  async #setView(file, tx) {
    // Publish our view of the database with a lock name that includes
    // the transaction id. As long as we hold the lock, no other connection
    // will overwrite data we are using.
    file.viewTx = tx;
    const lockName = `${file.path}@@[${tx.txId}]`;
    const newReleaser = await new Promise(resolve => {
      navigator.locks.request(lockName, SHARED, lock => {
        return new Promise(release => {
          resolve(release);
        });
      });
    });

    // The new lock is acquired so release the old one.
    file.viewReleaser?.();
    file.viewReleaser = newReleaser;
  }

  /**
   * Handle prevously received messages from other connections.
   * @param {File} file 
   */
  #processBroadcasts(file) {
    // Sort transaction messages by id. Move other messages to the front.
    // @ts-ignore
    file.broadcastReceived.sort((a, b) => (a.txId ?? -1) - (b.txId ?? -1));

    let nHandled = 0;
    let newTx = file.viewTx;
    for (const message of file.broadcastReceived) {
      if (Object.hasOwn(message, 'txId')) {
        const messageTx = /** @type {Transaction} */ (message)
        if (messageTx.txId <= newTx.txId) {
          // This transaction is already incorporated into our view.
        } else if (messageTx.txId === newTx.txId + 1) {
          // This is the next expected transaction.
          this.log?.(`accept tx ${messageTx.txId}`);
          this.#acceptTx(file, messageTx);
          newTx = messageTx;
        } else {
          // There is a gap in the transaction sequence.
          console.warn(`missing tx ${newTx.txId + 1} (got ${messageTx.txId})`);
          break;
        }
      } else if (Object.hasOwn(message, 'exclusive')) {
        // Release the read lock if we have it.
        this.log?.('releasing read lock');
        console.assert(file.lockState === VFS.SQLITE_LOCK_NONE);
        file.locks.read?.();
      }
      nHandled++;
    }

    // Remove handled messages from the list.
    file.broadcastReceived.splice(0, nHandled);

    // Tell other connections about a change in our view.
    if (newTx.txId > file.viewTx.txId) {
      // No need to await here.
      this.#setView(file, newTx);
    }
  }

  /**
   * @param {File} file 
   * @param {Transaction} message 
   */
  #acceptTx(file, message) {
    file.pageSize = file.pageSize || this.#getPageSize(file);

    // Add list of pages made obsolete by this transaction. These pages
    // can be moved to the free list when all connections have reached
    // this point.
    message.reclaimable = [];

    // Update page mapping with transaction pages.
    for (const [index, { offset }] of message.pages) {
      if (file.mapPageToOffset.has(index)) {
        // Remember overwritten pages that can be reused when all
        // connections have seen this transaction.
        message.reclaimable.push(file.mapPageToOffset.get(index));
      }
      file.mapPageToOffset.set(index, offset);
      file.freeOffsets.delete(offset);
    }

    // Remove mappings for truncated pages.
    const oldPageCount = file.fileSize / file.pageSize;
    const newPageCount = message.fileSize / file.pageSize;
    for (let index = newPageCount + 1; index <= oldPageCount; index++) {
      message.reclaimable.push(file.mapPageToOffset.get(index));
      file.mapPageToOffset.delete(index);
    }

    file.fileSize = message.fileSize;
    file.mapTxToPending.set(message.txId, message);
    if (message.oldestTxId) {
      // Finalize pending transactions that are no longer needed.
      for (const tx of file.mapTxToPending.values()) {
        if (tx.txId > message.oldestTxId) break;

        // Return no longer referenced pages to the free list.
        for (const offset of tx.reclaimable) {
          this.log?.(`reclaim offset ${offset}`);
          file.freeOffsets.add(offset);
        }
        file.mapTxToPending.delete(tx.txId);
      }
    }
  }

  /**
   * @param {File} file 
   */
  #beginTx(file) {
    // Start a new transaction.
    file.txActive = {
      txId: file.viewTx.txId + 1,
      pages: new Map(),
      fileSize: file.fileSize
    };
    file.txRealFileSize = file.accessHandle.getSize();
    this.log?.(`begin transaction ${file.txActive.txId}`);
  }

  /**
   * @param {File} file 
   */
  async #commitTx(file) {
    // Determine whether to finalize pending transactions, i.e. transfer
    // them to the IndexedDB pages store.
    if (file.synchronous === 'full' ||
        file.txIsOverwrite ||
        (file.txActive.txId % file.flushInterval) === 0) {
      file.txActive.oldestTxId = await this.#getOldestTxInUse(file);
    }

    const tx = file.idb.transaction(
      ['pages', 'pending'],
      'readwrite',
      { durability: file.synchronous === 'full' ? 'strict' : 'relaxed'});

    if (file.txActive.oldestTxId) {
      // Ensure that all pending data is safely on storage.
      if (file.txIsOverwrite) {
        file.accessHandle.truncate(file.txActive.fileSize);
      }
      file.accessHandle.flush();
      
      // Transfer page mappings to the pages store for all pending
      // transactions that are no longer in use.
      const pageStore = tx.objectStore('pages');
      for (const tx of file.mapTxToPending.values()) {
        if (tx.txId > file.txActive.oldestTxId) break;

        for (const [index, { offset }] of tx.pages) {
          pageStore.put({ i: index, o: offset });
        }
      }

      // Delete pending store entries that are no longer needed.
      tx.objectStore('pending')
        .delete(IDBKeyRange.upperBound(file.txActive.oldestTxId));
    }

    // Publish the transaction via broadcast and IndexedDB.
    this.log?.(`commit transaction ${file.txActive.txId}`);
    tx.objectStore('pending').put(file.txActive);

    const txComplete = new Promise((resolve, reject) => {
      const message = file.txActive;
      tx.oncomplete = () => {
        file.broadcastChannel.postMessage(message);
        resolve();
      };
      tx.onabort = () => {
        file.abortController.abort();
        reject(tx.error);
      };
      tx.commit();
    });

    if (file.synchronous === 'full') {
      await txComplete;
    }

    // Advance our own view. Even if we received our own broadcasts (we
    // don't), we want our view to be updated synchronously.
    this.#acceptTx(file, file.txActive);
    this.#setView(file, file.txActive);
    file.txActive = null;
    file.txWriteHint = false;

    if (file.txIsOverwrite) {
      // Wait until all connections have seen the transaction.
      while (file.viewTx.txId !== await this.#getOldestTxInUse(file)) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      // Downgrade the exclusive read lock to a shared lock.
      file.locks.read();
      await this.#lock(file, 'read', SHARED);

      // There should be no extra space in the file now.
      file.freeOffsets.clear();

      file.txIsOverwrite = false;
    }
  }

  /**
   * @param {File} file 
   */
  #rollbackTx(file) {
    // Return offsets to the free list.
    this.log?.(`rollback transaction ${file.txActive.txId}`);
    for (const { offset } of file.txActive.pages.values()) {
      file.freeOffsets.add(offset);
    }
    file.txActive = null;
    file.txWriteHint = false;
  }

  /**
   * @param {File} file 
   */
  async #prepareOverwrite(file) {
    // Get an exclusive read lock to prevent other connections from
    // seeing the database in an inconsistent state.
    file.locks.read?.();
    if (!await this.#lock(file, 'read', POLL_EXCLUSIVE)) {
      // We didn't get the read lock because other connections have
      // it. Notify them that we want the lock and wait.
      const lockRequest = this.#lock(file, 'read');
      file.broadcastChannel.postMessage({ exclusive: true });
      await lockRequest;
    }

    // Create a intermediate transaction to copy all current page data to
    // an offset past fileSize. 
    file.txActive = {
      txId: file.viewTx.txId + 1,
      pages: new Map(),
      fileSize: file.fileSize
    };

    // This helper generator provides offsets above fileSize.
    const offsetGenerator = (function*() {
      for (const offset of file.freeOffsets) {
        if (offset >= file.fileSize) {
          yield offset;
        }
      }

      while (true) {
        yield file.accessHandle.getSize();
      }
    })();

    const pageBuffer = new Uint8Array(file.pageSize);
    for (let offset = 0; offset < file.fileSize; offset += file.pageSize) {
      const pageIndex = offset / file.pageSize + 1;
      const oldOffset = file.mapPageToOffset.get(pageIndex);
      if (oldOffset < file.fileSize) {
        // This page is stored below fileSize. Read it into memory.
        if (file.accessHandle.read(pageBuffer, { at: oldOffset }) !== file.pageSize) {
          throw new Error('Failed to read page');
        }
        
        // Perform the copy.
        const newOffset = offsetGenerator.next().value;
        if (file.accessHandle.write(pageBuffer, { at: newOffset }) !== file.pageSize) {
          throw new Error('Failed to write page');
        }

        file.txActive.pages.set(pageIndex, {
          offset: newOffset,
          digest: checksum(pageBuffer)
        });
      }
    }
    file.accessHandle.flush();
    file.freeOffsets.clear();
    
    // Publish transaction for others.
    file.broadcastChannel.postMessage(file.txActive);
    const tx = file.idb.transaction('pending', 'readwrite');
    const txComplete = new Promise((resolve, reject) => {
      tx.oncomplete = resolve;
      tx.onabort = () => reject(tx.error);
    });
    tx.objectStore('pending').put(file.txActive);
    tx.commit();
    await txComplete;

    // Incorporate the transaction into our view.
    this.#acceptTx(file, file.txActive);
    this.#setView(file, file.txActive);
    file.txActive = null;

    // Now all pages are in the file above fileSize. The VACUUM operation
    // will now copy the pages below fileSize in the proper order. After
    // that once all connections are up to date the file can be truncated.

    // This flag tells xWrite to write pages at their canonical offset.
    file.txIsOverwrite = true;
  }

  /**
   * @param {File} file 
   * @returns {Promise<number>}
   */
  async #getOldestTxInUse(file) {
    // Each connection holds a shared Web Lock with a name that encodes
    // the latest transaction it knows about. We can find the oldest
    // transaction by listing the those locks and extracting the earliest
    // transaction id.
    const TX_LOCK_REGEX = /^(.*)@@\[(\d+)\]$/;
    let oldestTxId = file.viewTx.txId;
    const locks = await navigator.locks.query();
    for (const { name } of locks.held) {
      const m = TX_LOCK_REGEX.exec(name);
      if (m && m[1] === file.path) {
        oldestTxId = Math.min(oldestTxId, Number(m[2]));
      }
    }
    return oldestTxId;
  }
}

/**
 * Wrap IndexedDB request with a Promise.
 * @param {IDBRequest} request 
 * @returns 
 */
function idbX(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Given a path, return the directory handle and filename.
 * @param {string} path 
 * @param {boolean} create 
 * @returns {Promise<[FileSystemDirectoryHandle, string]>}
 */
async function getPathComponents(path, create) {
  const components = path.split('/');
  const filename = components.pop();
  let directory = await navigator.storage.getDirectory();
  for (const component of components.filter(s => s)) {
    directory = await directory.getDirectoryHandle(component, { create });
  }
  return [directory, filename];
}

/**
 * Extract a C string from WebAssembly memory.
 * @param {DataView} dataView 
 * @param {number} offset 
 * @returns 
 */
function cvtString(dataView, offset) {
  const p = dataView.getUint32(offset, true);
  if (p) {
    const chars = new Uint8Array(dataView.buffer, p);
    return new TextDecoder().decode(chars.subarray(0, chars.indexOf(0)));
  }
  return null;
}

/**
 * Compute a page checksum.
 * @param {ArrayBufferView} data 
 * @returns {Uint32Array}
 */
function checksum(data) {
  const array = new Uint32Array(
    data.buffer,
    data.byteOffset,
    data.byteLength / Uint32Array.BYTES_PER_ELEMENT);

  // https://en.wikipedia.org/wiki/Fletcher%27s_checksum
  let h1 = 0;
  let h2 = 0;
  for (const value of array) {
    h1 = (h1 + value) % 4294967295;
    h2 = (h2 + h1) % 4294967295;
  }
  return new Uint32Array([h1, h2]);
}
````

## File: packages/wa-sqlite/src/examples/README.md
````markdown
# wa-sqlite example code
These examples are intended to help developers get started with writing extensions,
and to experiment with interesting approaches and techniques. Using them as-is in
production is not prohibited but that isn't their primary purpose.

## VFS examples
### MemoryVFS and MemoryAsyncVFS
These implementations store database pages in memory. The default SQLite VFS already does that, so their value is mainly to provide minimal working examples for writing a VFS or to help debugging investigations by providing a comparative baseline for behavior and/or performance. First-time VFS implementers should probably start by looking at these classes, as well as the [SQLite VFS documentation](https://www.sqlite.org/vfs.html).

### IDBBatchAtomicVFS
This VFS stores database pages in IndexedDB. IndexedDB works on all contexts - Window, Worker, SharedWorker, service worker, extension - which makes IDBBatchAtomicVFS a good general purpose VFS.

SQLite supports a special mode for filesystems that can make "batch atomic" writes, i.e. guaranteeing that an arbitrary set of changes is made either completely or not at all, and IDBBatchAtomicVFS leverages IndexedDB to do this. When this mode can be used, an external journal file is not needed which improves performance. The journal will instead be kept in the page cache, so a requirement for triggering batch atomic mode is that the cache size must be set large enough to hold the journal.

IDBBatchAtomicVFS can trade durability for performance by setting `PRAGMA synchronous=normal`.

Changing the page size after the database is created is not supported (this is a change from pre-1.0).

### IDBMirrorVFS
This VFS keeps all files in memory, persisting database files to IndexedDB. It works on all contexts.

IDBMirrorVFS can trade durability for performance by setting `PRAGMA synchronous=normal`.

Changing the page size after the database is created is not supported.

IDBMirrorVFS has the same characteristics as IDBBatchAtomicVFS in the table below. The differences from IDBBatchAtomicVFS are (1) it is much faster both with and without contention, and (2) it can only use databases that fit in available memory.

### AccessHandlePoolVFS
This is an OPFS VFS that has all synchronous methods, i.e. they don't return Promises. This allows it to be used with a with a synchronous WebAssembly build and that has definite performance advantages.

AccessHandlePoolVFS works by pre-opening a number of access handles and associating them with SQLite open requests as needed. Operation is restricted to a single wa-sqlite instance, so multiple connections are not supported.

The silver lining to not allowing multiple connections is that there is no drawback to using `PRAGMA locking_mode=exclusive`. This in turn allows `PRAGMA journal_mode=wal`, which can significantly reduce write transaction overhead.

This VFS is not filesystem transparent, which means that its database files in OPFS cannot be directly imported and exported.

### OPFSAdaptiveVFS
This VFS is fundamentally a straightforward mapping of OPFS access handles to VFS methods, but adds two different techniques to support multiple connections.

The current OPFS spec allows only one open access handle on a file at a time. Supporting multiple connections to a database thus requires closing the access handle on one connection before opening it on another. This open/close is expensive so OPFSAdaptiveVFS does this lazily, i.e. it only closes the access handle when another connection needs it.

A proposed change to OPFS allows there to be multiple open access handles on a file. OPFSAdaptiveVFS will take advantage of this on browsers that support it, and this will improve performance as well as allow overlapping multiple read transactions with a write transaction.

If multiple open access handles are not supported then only journaling modes "delete" (default), "memory", and "off" are allowed.

### OPFSAnyContextVFS
This VFS uses the slower File and FileSystemWritableFileStream OPFS APIs instead of synchronous access handles. This should allow it to be used on any context, i.e. not just a dedicated Worker.

Read performance should be only somewhat slower, and might even be better than messaging overhead to communicate with a Worker. Write performance, however, will be very bad and will be increasingly worse as the file grows. It is recommended to use it only for read-only or nearly read-only databases.

### OPFSCoopSyncVFS
This VFS is a synchronous OPFS VFS (like AccessHandlePoolVFS) that allows multiple connections and is filesystem transparent (unlike AccessHandlePoolVFS).

OPFSCoopSyncVFS uses an access handle pool for files other than the main database and its journal file. For the shared files, it closes them lazily (like OPFSAdaptiveVFS) to support multiple connections while retaining performance with a single connection.

To keep all the methods synchronous, when asynchronous operations are necessary (e.g. for locking) a method returns an error. The library wrapper API internally handles the error, waits for the asynchronous operation to complete, and then repeats the operation. This is not very efficient, but is only necessary when opening a database or under active multiple connection contention.

Transactions that access more than one main (non-temporary) database are not supported.

### OPFSPermutedVFS
This is a hybrid OPFS/IndexedDB VFS that allows high concurrency - simultaneous access by multiple readers and a single writer. It requires the proposed "readwrite-unsafe" locking mode for OPFS access handles (only on Chromium browsers as of June 2024).

OPFSPermutedVFS is a lot like SQLite WAL except that it writes directly to the database file instead of a separate write-ahead log file, so there may be more than one version of a page in the file and the location of pages is generally not sequential. All the page data is stored in the file and IndexedDB is used to manage the page versions and locations.

OPFSPermutedVFS can trade durability for performance by setting `PRAGMA synchronous=normal`.

Changing the page size after the database is created is not supported. Not filesystem transparent except immediately after VACUUM.

## VFS Comparison

||MemoryVFS|MemoryAsyncVFS|IDBBatchAtomicVFS|OPFSAdaptiveVFS|AccessHandlePoolVFS|OPFSAnyContextVFS|OPFSCoopSyncVFS|OPFSPermutedVFS|
|-|-|-|-|-|-|-|-|-|
|Storage|RAM|RAM|IndexedDB|OPFS|OPFS|OPFS|OPFS|OPFS/IndexedDB|
|Synchronous build|✅|:x:|:x:|:x:|✅|:x:|✅|:x:|
|Asyncify build|✅|✅|✅|✅|✅|✅|✅|
|JSPI build|✅|✅|✅|✅|✅|✅|✅|✅|
|Contexts|All|All|All|Worker|Worker|All|Worker|Worker|
|Multiple connections|:x:|:x:|✅|✅|:x:|✅|✅|✅[^1]|
|Full durability|✅|✅|✅|✅|✅|✅|✅|✅|
|Relaxed durability|:x:|:x:|✅|:x:|:x:|:x:|:x:|✅|
|Filesystem transparency|:x:|:x:|:x:|✅|:x:|✅|✅|:x:[^2]|
|Write-ahead logging|:x:|:x:|:x:|:x:|:x:|:x:|:x:|✅[^3]|
|Multi-database transactions|✅|✅|✅|✅|✅|✅|:x:|✅|
|Change page size|✅|✅|:x:|✅|✅|✅|✅|:x:|
|No COOP/COEP requirements|✅|✅|✅|✅|✅|✅|✅|✅|

[^1]: Requires FileSystemSyncAccessHandle readwrite-unsafe locking mode support.
[^2]: Only filesystem transparent immediately after VACUUM.
[^3]: [Sort of](https://github.com/rhashimoto/wa-sqlite/discussions/152).
````

## File: packages/wa-sqlite/src/examples/tag.js
````javascript
import * as SQLite from '../sqlite-api.js';

/**
 * @typedef SQLiteResults
 * @property {string[]} columns
 * @property {SQLiteCompatibleType[][]} rows
 */

/**
 * Build a query function for a database.
 * 
 * The returned function can be invoke in two ways, (1) as a template
 * tag, or (2) as a regular function.
 * 
 * When used as a template tag, multiple SQL statements are accepted and
 * string interpolants can be used, e.g.
 * ```
 *   const results = await tag`
 *     PRAGMA integrity_check;
 *     SELECT * FROM ${tblName};
 *   `;
 * ```
 * 
 * When called as a regular function, only one statement can be used
 * and SQLite placeholder substitution is performed, e.g.
 * ```
 *   const results = await tag('INSERT INTO tblName VALUES (?, ?)', [
 *     ['foo', 1],
 *     ['bar', 17],
 *     ['baz', 42]
 *   ]);
 * ```
 * @param {SQLiteAPI} sqlite3 
 * @param {number} db 
 * @returns {(sql: string|TemplateStringsArray, ...values: string[]|SQLiteCompatibleType[][][]) => Promise<SQLiteResults[]>}
 */
export function createTag(sqlite3, db) {
  // Helper function to execute the query.
  async function execute(sql, bindings) {
    const results = [];
    for await (const stmt of sqlite3.statements(db, sql)) {
      let columns;
      for (const binding of bindings ?? [[]]) {
        sqlite3.reset(stmt);
        if (bindings) {
          sqlite3.bind_collection(stmt, binding);
        }

        const rows = [];
        while (await sqlite3.step(stmt) === SQLite.SQLITE_ROW) {
          const row = sqlite3.row(stmt);
          rows.push(row);
        }
  
        columns = columns ?? sqlite3.column_names(stmt)
        if (columns.length) {
          results.push({ columns, rows });
        }
      }
  
      // When binding parameters, only a single statement is executed.
      if (bindings) {
        return results;
      }
    }
    return results;
  }
  
  return async function(sql, ...values) {
    if (Array.isArray(sql)) {
      // Tag usage.
      const interleaved = [];
      sql.forEach((s, i) => {
        interleaved.push(s, values[i]);
      });
      return execute(interleaved.join(''));
    } else {
      // Binding usage.
      return execute(sql, values[0]);
    }
  }
}
````

## File: packages/wa-sqlite/src/types/globals.d.ts
````typescript
declare namespace Asyncify {
  function handleAsync(f: () => Promise<any>);
}

declare function UTF8ToString(ptr: number): string;
declare function lengthBytesUTF8(s: string): number;
declare function stringToUTF8(s: string, p: number, n: number);
declare function ccall(name: string, returns: string, args: Array<any>, options?: object): any;
declare function getValue(ptr: number, type: string): number;
declare function setValue(ptr: number, value: number, type: string): number;
declare function mergeInto(library: object, methods: object): void;

declare var HEAPU8: Uint8Array;
declare var HEAP32: Int32Array;
declare var LibraryManager;
declare var Module;
declare var _vfsAccess;
declare var _vfsCheckReservedLock;
declare var _vfsClose;
declare var _vfsDelete;
declare var _vfsDeviceCharacteristics;
declare var _vfsFileControl;
declare var _vfsFileSize;
declare var _vfsLock;
declare var _vfsOpen;
declare var _vfsRead;
declare var _vfsSectorSize;
declare var _vfsSync;
declare var _vfsTruncate;
declare var _vfsUnlock;
declare var _vfsWrite;

declare var _jsFunc;
declare var _jsStep;
declare var _jsFinal;

declare var _modStruct;
declare var _modCreate;
declare var _modConnect;
declare var _modBestIndex;
declare var _modDisconnect;
declare var _modDestroy;
declare var _modOpen;
declare var _modClose;
declare var _modFilter;
declare var _modNext;
declare var _modEof;
declare var _modColumn;
declare var _modRowid;
declare var _modUpdate;
declare var _modBegin;
declare var _modSync;
declare var _modCommit;
declare var _modRollback;
declare var _modFindFunction;
declare var _modRename;

declare var _jsAuth;

declare var _jsProgress;
````

## File: packages/wa-sqlite/src/types/index.d.ts
````typescript
/**
 * This is a WebAssembly build of SQLite with experimental support for
 * writing SQLite virtual file systems and modules (for virtual tables)
 * in Javascript. Also see the
 * [GitHub repository](https://github.com/rhashimoto/wa-sqlite) and the
 * [online demo](https://rhashimoto.github.io/wa-sqlite/demo/).
 * @module
 */

/**
 *  Javascript types that SQLite can use
 * 
 * C integer and floating-point types both map to/from Javascript `number`.
 * Blob data can be provided to SQLite as `Uint8Array` or `number[]` (with
 * each element converted to a byte); SQLite always returns blob data as
 * `Uint8Array`
 */
type SQLiteCompatibleType = number|string|Uint8Array|Array<number>|bigint|null;

/**
 * SQLite Virtual File System object
 * 
 * Objects with this interface can be passed to {@link SQLiteAPI.vfs_register}
 * to define a new filesystem.
 * 
 * There are examples of a synchronous
 * [MemoryVFS.js](https://github.com/rhashimoto/wa-sqlite/blob/master/src/examples/MemoryVFS.js),
 * and asynchronous
 * [MemoryAsyncVFS.js](https://github.com/rhashimoto/wa-sqlite/blob/master/src/examples/MemoryAsyncVFS.js)
 * and
 * [IndexedDbVFS.js](https://github.com/rhashimoto/wa-sqlite/blob/master/src/examples/IndexedDbVFS.js).
 * 
 * @see https://sqlite.org/vfs.html
 * @see https://sqlite.org/c3ref/io_methods.html
 */
declare interface SQLiteVFS {
  /** Maximum length of a file path in UTF-8 bytes (default 64) */
  mxPathName?: number;

  close(): void|Promise<void>;
  isReady(): boolean|Promise<boolean>;

  /** @see https://sqlite.org/c3ref/io_methods.html */
  xClose(fileId: number): number|Promise<number>;

  /** @see https://sqlite.org/c3ref/io_methods.html */
  xRead(
    fileId: number,
    pData: number,
    iAmt: number,
    iOffsetLo: number,
    iOffsetHi: number
  ): number|Promise<number>;

  /** @see https://sqlite.org/c3ref/io_methods.html */
  xWrite(
    fileId: number,
    pData: number,
    iAmt: number,
    iOffsetLo: number,
    iOffsetHi: number
  ): number|Promise<number>;

  /** @see https://sqlite.org/c3ref/io_methods.html */
  xTruncate(fileId: number, iSizeLo: number, iSizeHi): number|Promise<number>;

  /** @see https://sqlite.org/c3ref/io_methods.html */
  xSync(fileId: number, flags: number): number|Promise<number>;

  /** @see https://sqlite.org/c3ref/io_methods.html */
  xFileSize(
    fileId: number,
    pSize64: number
  ): number|Promise<number>;

  /** @see https://sqlite.org/c3ref/io_methods.html */
  xLock(fileId: number, flags: number): number|Promise<number>;

  /** @see https://sqlite.org/c3ref/io_methods.html */
  xUnlock(fileId: number, flags: number): number|Promise<number>;

  /** @see https://sqlite.org/c3ref/io_methods.html */
  xCheckReservedLock(
    fileId: number,
    pResOut: number
  ): number|Promise<number>;

  /** @see https://sqlite.org/c3ref/io_methods.html */
  xFileControl(
    fileId: number,
    flags: number,
    pOut: number
  ): number|Promise<number>;

  /** @see https://sqlite.org/c3ref/io_methods.html */
  xDeviceCharacteristics(fileId: number): number|Promise<number>;

  /** @see https://sqlite.org/c3ref/vfs.html */
  xOpen(
    pVfs: number,
    zName: number,
    pFile: number,
    flags: number,
    pOutFlags: number
  ): number|Promise<number>;

  /** @see https://sqlite.org/c3ref/vfs.html */
  xDelete(pVfs: number, zName: number, syncDir: number): number|Promise<number>;

  /** @see https://sqlite.org/c3ref/vfs.html */
  xAccess(
    pVfs: number,
    zName: number,
    flags: number,
    pResOut: number
  ): number|Promise<number>;
}

/**
 * Options object argument for {@link SQLiteAPI.statements}
 */
declare interface SQLitePrepareOptions {
  /**
   * Statement handles prepared and yielded by {@link SQLiteAPI.statements}
   * are normally valid only within the scope of an iteration.
   * Set `unscoped` to `true` to give iterated statements an arbitrary
   * lifetime.
   */
  unscoped?: boolean;

  /**
   * SQLITE_PREPARE_* flags
   * @see https://www.sqlite.org/c3ref/c_prepare_normalize.html#sqlitepreparepersistent
   */
  flags?: number;
}

/**
 * Javascript wrappers for the SQLite C API (plus a few convenience functions)
 * 
 * Function signatures have been slightly modified to be more
 * Javascript-friendly. For the C functions that return an error code,
 * the corresponding Javascript wrapper will throw an exception with a
 * `code` property on an error.
 * 
 * Note that a few functions return a Promise in order to accomodate
 * either a synchronous or asynchronous SQLite build, generally those
 * involved with opening/closing a database or executing a statement.
 * 
 * To create an instance of the API, follow these steps:
 * 
 * ```javascript
 * // Import an ES6 module factory function from one of the
 * // package builds, either 'wa-sqlite.mjs' (synchronous) or
 * // 'wa-sqlite-async.mjs' (asynchronous). You should only
 * // use the asynchronous build if you plan to use an
 * // asynchronous VFS or module.
 * import SQLiteESMFactory from 'wa-sqlite/dist/wa-sqlite.mjs';
 * 
 * // Import the Javascript API wrappers.
 * import * as SQLite from 'wa-sqlite';
 * 
 * // Use an async function to simplify Promise handling.
 * (async function() {
 *   // Invoke the ES6 module factory to create the SQLite
 *   // Emscripten module. This will fetch and compile the
 *   // .wasm file.
 *   const module = await SQLiteESMFactory();
 * 
 *   // Use the module to build the API instance.
 *   const sqlite3 = SQLite.Factory(module);
 * 
 *   // Use the API to open and access a database.
 *   const db = await sqlite3.open_v2('myDB');
 *   ...
 * })();
 * ```
 * 
 * @see https://sqlite.org/c3ref/funclist.html
 */
declare interface SQLiteAPI {
  /**
   * Bind a collection of values to a statement
   * 
   * This convenience function binds values from either an array or object
   * to a prepared statement with placeholder parameters.
   * 
   * Array example using numbered parameters (numbering is implicit in
   * this example):
   * ```
   * const sql = 'INSERT INTO tbl VALUES (?, ?, ?)';
   * for await (const stmt of sqlite3.statements(db, sql) {
   *   sqlite3.bind_collection(stmt, [42, 'hello', null]);
   *   ...
   * }
   * ```
   * 
   * Object example using named parameters (':', '@', or '$' prefixes
   * are allowed):
   * ```
   * const sql = 'INSERT INTO tbl VALUES (?, ?, ?)';
   * for await (const stmt of sqlite3.statements(db, sql) {
   *   sqlite3.bind_collection(stmt, {
   *     '@foo': 42,
   *     '@bar': 'hello',
   *     '@baz': null,
   *   });
   *   ...
   * }
   * ```
   * 
   * Note that SQLite bindings are indexed beginning with 1, but when
   * binding values from an array `a` the values begin with `a[0]`.
   * @param stmt prepared statement pointer
   * @param bindings 
   * @returns `SQLITE_OK` (throws exception on error)
   */
  bind_collection(
    stmt: number,
    bindings: {[index: string]: SQLiteCompatibleType|null}|Array<SQLiteCompatibleType|null>
  ): number;

  /**
   * Bind value to prepared statement
   * 
   * This convenience function calls the appropriate `bind_*` function
   * based on the type of `value`. Note that binding indices begin with 1.
   * @param stmt prepared statement pointer
   * @param i binding index
   * @param value 
   * @returns `SQLITE_OK` (throws exception on error)
   */
  bind(stmt: number, i: number, value: SQLiteCompatibleType|null): number;

  /**
   * Bind blob to prepared statement parameter
   * 
   * Note that binding indices begin with 1.
   * @see https://www.sqlite.org/c3ref/bind_blob.html
   * @param stmt prepared statement pointer
   * @param i binding index
   * @param value 
   * @returns `SQLITE_OK` (throws exception on error)
   */
  bind_blob(stmt: number, i: number, value: Uint8Array|Array<number>): number;

  /**
   * Bind number to prepared statement parameter
   * 
   * Note that binding indices begin with 1.
   * @see https://www.sqlite.org/c3ref/bind_blob.html
   * @param stmt prepared statement pointer
   * @param i binding index
   * @param value 
   * @returns `SQLITE_OK` (throws exception on error)
   */
   bind_double(stmt: number, i: number, value: number): number;

   /**
   * Bind number to prepared statement parameter
   * 
   * Note that binding indices begin with 1.
   * @see https://www.sqlite.org/c3ref/bind_blob.html
   * @param stmt prepared statement pointer
   * @param i binding index
   * @param value 
   * @returns `SQLITE_OK` (throws exception on error)
   */
  bind_int(stmt: number, i: number, value: number): number;

   /**
   * Bind number to prepared statement parameter
   * 
   * Note that binding indices begin with 1.
   * @see https://www.sqlite.org/c3ref/bind_blob.html
   * @param stmt prepared statement pointer
   * @param i binding index
   * @param value 
   * @returns `SQLITE_OK` (throws exception on error)
   */
   bind_int64(stmt: number, i: number, value: bigint): number;

    /**
   * Bind null to prepared statement
   * 
   * Note that binding indices begin with 1.
   * @see https://www.sqlite.org/c3ref/bind_blob.html
   * @param stmt prepared statement pointer
   * @param i binding index
   * @returns `SQLITE_OK` (throws exception on error)
   */
  bind_null(stmt: number, i: number): number;

  /**
   * Get number of bound parameters
   * @see https://www.sqlite.org/c3ref/bind_parameter_count.html
   * @param stmt prepared statement pointer
   * @returns number of statement binding locations
   */
  bind_parameter_count(stmt: number): number;

  /**
   * Get name of bound parameter
   * 
   * Note that binding indices begin with 1.
   * @see https://www.sqlite.org/c3ref/bind_parameter_name.html
   * @param stmt prepared statement pointer
   * @param i binding index
   * @returns binding name
   */
  bind_parameter_name(stmt: number, i: number): string;

   /**
   * Bind string to prepared statement
   * 
   * Note that binding indices begin with 1.
   * @see https://www.sqlite.org/c3ref/bind_blob.html
   * @param stmt prepared statement pointer
   * @param i binding index
   * @param value 
   * @returns `SQLITE_OK` (throws exception on error)
   */
  bind_text(stmt: number, i: number, value: string): number;

  /**
   * Get count of rows modified by last insert/update
   * @see https://www.sqlite.org/c3ref/changes.html
   * @param db database pointer
   * @returns number of rows modified
   */
  changes(db): number;

  /**
   * Reset all bindings on a prepared statement.
   * @see https://www.sqlite.org/c3ref/clear_bindings.html
   * @param stmt prepared statement pointer
   * @returns `SQLITE_OK` (throws exception on error)
   */
  clear_bindings(stmt: number): number;

  /**
   * Close database connection
   * @see https://www.sqlite.org/c3ref/close.html
   * @param db database pointer
   * @returns `SQLITE_OK` (throws exception on error)
   */
  close(db): Promise<number>;

  /**
   * Call the appropriate `column_*` function based on the column type
   * 
   * The type is determined by calling {@link column_type}, which may
   * not match the type declared in `CREATE TABLE`. Note that if the column
   * value is a blob then as with `column_blob` the result may be invalid
   * after the next SQLite call; copy if it needs to be retained.
   * 
   * Integer values are returned as Number if within the min/max safe
   * integer bounds, otherwise they are returned as BigInt.
   * @param stmt prepared statement pointer
   * @param i column index
   * @returns column value
   */
  column(stmt: number, i: number): SQLiteCompatibleType;

  /**
   * Extract a column value from a row after a prepared statment {@link step}
   * 
   * The contents of the returned buffer may be invalid after the
   * next SQLite call. Make a copy of the data (e.g. with `.slice()`)
   * if longer retention is required.
   * @see https://www.sqlite.org/c3ref/column_blob.html
   * @param stmt prepared statement pointer
   * @param i column index
   * @returns column value
   */
  column_blob(stmt: number, i: number): Uint8Array;

  /**
   * Get storage size for column text or blob
   * @see https://www.sqlite.org/c3ref/column_blob.html
   * @param stmt prepared statement pointer
   * @param i column index
   * @returns number of bytes in column text or blob
   */
  column_bytes(stmt: number, i: number): number;

  /**
   * Get number of columns for a prepared statement
   * @see https://www.sqlite.org/c3ref/column_blob.html
   * @param stmt prepared statement pointer
   * @returns number of columns
   */
  column_count(stmt: number): number;

  /**
   * Extract a column value from a row after a prepared statment {@link step}
   * @see https://www.sqlite.org/c3ref/column_blob.html
   * @param stmt prepared statement pointer
   * @param i column index
   * @returns column value
   */
  column_double(stmt: number, i: number): number;

  /**
   * Extract a column value from a row after a prepared statment {@link step}
   * @see https://www.sqlite.org/c3ref/column_blob.html
   * @param stmt prepared statement pointer
   * @param i column index
   * @returns column value
   */
  column_int(stmt: number, i: number): number;

  /**
   * Extract a column value from a row after a prepared statment {@link step}
   * @see https://www.sqlite.org/c3ref/column_blob.html
   * @param stmt prepared statement pointer
   * @param i column index
   * @returns column value
   */
  column_int64(stmt: number, i: number): bigint;

   /**
   * Get a column name for a prepared statement
   * @see https://www.sqlite.org/c3ref/column_blob.html
   * @param stmt prepared statement pointer
   * @param i column index
   * @returns column name
   */
  column_name(stmt: number, i: number): string;

  /**
   * Get names for all columns of a prepared statement
   * 
   * This is a convenience function that calls {@link column_count} and
   * {@link column_name}.
   * @param stmt 
   * @returns array of column names
   */
  column_names(stmt: number): Array<string>;

  /**
   * Extract a column value from a row after a prepared statment {@link step}
   * @see https://www.sqlite.org/c3ref/column_blob.html
   * @param stmt prepared statement pointer
   * @param i column index
   * @returns column value
   */
  column_text(stmt: number, i: number): string;

  /**
   * Get column type for a prepared statement
   * 
   * Note that this type may not match the type declared in `CREATE TABLE`.
   * @see https://www.sqlite.org/c3ref/column_blob.html
   * @param stmt prepared statement pointer
   * @param i column index
   * @returns enumeration value for type
   */
  column_type(stmt: number, i: number): number;

  /**
   * Register a commit hook
   * 
   * @see https://www.sqlite.org/c3ref/commit_hook.html
   *
   * @param db database pointer
   * @param callback If a non-zero value is returned, commit is converted into
   * a rollback; disables callback when null
   */
  commit_hook(
    db: number,
    callback: (() => number) | null): void;

  /**
   * Create or redefine SQL functions
   * 
   * The application data passed is ignored. Use closures instead.
   * 
   * If any callback function returns a Promise, that function must
   * be declared `async`, i.e. it must allow use of `await`.
   * @see https://sqlite.org/c3ref/create_function.html
   * @param db database pointer
   * @param zFunctionName 
   * @param nArg number of function arguments
   * @param eTextRep text encoding (and other flags)
   * @param pApp application data (ignored)
   * @param xFunc 
   * @param xStep 
   * @param xFinal 
   * @returns `SQLITE_OK` (throws exception on error)
   */
  create_function(
    db: number,
    zFunctionName: string,
    nArg: number,
    eTextRep: number,
    pApp: number,
    xFunc?: (context: number, values: Uint32Array) => void|Promise<void>,
    xStep?: (context: number, values: Uint32Array) => void|Promise<void>,
    xFinal?: (context: number) => void|Promise<void>): number;

  /**
   * Get number of columns in current row of a prepared statement
   * @see https://www.sqlite.org/c3ref/data_count.html
   * @param stmt prepared statement pointer
   * @returns number of columns
   */
  data_count(stmt: number): number;

  /**
   * One-step query execution interface
   * 
   * The implementation of this function uses {@link row}, which makes a
   * copy of blobs and returns BigInt for integers outside the safe integer
   * bounds for Number.
   * @see https://www.sqlite.org/c3ref/exec.html
   * @param db database pointer
   * @param zSQL queries
   * @param callback called for each output row
   * @returns Promise resolving to `SQLITE_OK` (rejects on error)
   */
  exec(
    db: number,
    zSQL: string,
    callback?: (row: Array<SQLiteCompatibleType|null>, columns: string[]) => void
  ): Promise<number>;

  /**
   * Destroy a prepared statement object compiled by {@link statements}
   * with the `unscoped` option set to `true`
   * 
   * This function does *not* throw on error.
   * @see https://www.sqlite.org/c3ref/finalize.html
   * @param stmt prepared statement pointer
   * @returns Promise resolving to `SQLITE_OK` or error status
   */
  finalize(stmt: number): Promise<number>;

  /**
   * Test for autocommit mode
   * @see https://sqlite.org/c3ref/get_autocommit.html
   * @param db database pointer
   * @returns Non-zero if autocommit mode is on, zero otherwise
   */
  get_autocommit(db: number): number;

  /**
   * Get SQLite library version
   * @see https://www.sqlite.org/c3ref/libversion.html
   * @returns version string, e.g. '3.35.5'
   */
  libversion(): string;

  /**
   * Get SQLite library version
   * @see https://www.sqlite.org/c3ref/libversion.html
   * @returns version number, e.g. 3035005
   */
  libversion_number(): number

  /**
   * Set a usage limit on a connection.
   * @see https://www.sqlite.org/c3ref/limit.html
   * @param db database pointer
   * @param id limit category
   * @param newVal 
   * @returns previous setting
   */
  limit(
    db: number,
    id: number,
    newVal: number): number;

  /**
   * Opening a new database connection.
   * 
   * Note that this function differs from the C API in that it
   * returns the Promise-wrapped database pointer (instead of a
   * result code).
   * @see https://sqlite.org/c3ref/open.html
   * @param zFilename 
   * @param iFlags `SQLite.SQLITE_OPEN_CREATE | SQLite.SQLITE_OPEN_READWRITE` (0x6) if omitted
   * @param zVfs VFS name
   * @returns Promise-wrapped database pointer.
   */
  open_v2(
    zFilename: string,
    iFlags?: number,
    zVfs?: string    
  ): Promise<number>;

  /**
   * Specify callback to be invoked between long-running queries
   * 
   * The application data passed is ignored. Use closures instead.
   * 
   * If any callback function returns a Promise, that function must
   * be declared `async`, i.e. it must allow use of `await`.
   * @param db database pointer
   * @param nProgressOps target number of database operations between handler invocations
   * @param handler 
   * @param userData 
   */
  progress_handler(db: number, nProgressOps: number, handler: (userData: any) => number|Promise<number>, userData);

  /**
   * Reset a prepared statement object
   * @see https://www.sqlite.org/c3ref/reset.html
   * @param stmt prepared statement pointer
   * @returns Promise-wrapped `SQLITE_OK` (rejects on error)
   */
  reset(stmt: number): Promise<number>;

  /**
   * Convenience function to call `result_*` based of the type of `value`
   * @param context context pointer
   * @param value 
   */
  result(context: number, value: (SQLiteCompatibleType|number[])|null): void;

  /**
   * Set the result of a function or vtable column
   * @see https://sqlite.org/c3ref/result_blob.html
   * @param context context pointer
   * @param value 
   */
  result_blob(context: number, value: Uint8Array|number[]): void;

  /**
   * Set the result of a function or vtable column
   * @see https://sqlite.org/c3ref/result_blob.html
   * @param context context pointer
   * @param value 
   */
  result_double(context: number, value: number): void;

  /**
   * Set the result of a function or vtable column
   * @see https://sqlite.org/c3ref/result_blob.html
   * @param context context pointer
   * @param value 
   */
  result_int(context: number, value: number): void;

  /**
   * Set the result of a function or vtable column
   * @see https://sqlite.org/c3ref/result_blob.html
   * @param context context pointer
   * @param value 
   */
  result_int64(context: number, value: bigint): void;

  /**
   * Set the result of a function or vtable column
   * @see https://sqlite.org/c3ref/result_blob.html
   * @param context context pointer
   */
  result_null(context: number): void;

  /**
   * Set the result of a function or vtable column
   * @see https://sqlite.org/c3ref/result_blob.html
   * @param context context pointer
   * @param value 
   */
   result_text(context: number, value: string): void;

   /**
    * Get all column data for a row from a prepared statement step
    * 
    * This convenience function will return a copy of any blob, unlike
    * {@link column_blob} which returns a value referencing volatile WASM
    * memory with short validity. Like {@link column}, it will return a
    * BigInt for integers outside the safe integer bounds for Number.
    * @param stmt prepared statement pointer
    * @returns row data
    */
  row(stmt: number): Array<SQLiteCompatibleType|null>;

  /**
   * Register a callback function that is invoked to authorize certain SQL statement actions.
   * @see https://www.sqlite.org/c3ref/set_authorizer.html
   * @param db database pointer
   * @param authFunction 
   * @param userData 
   */
  set_authorizer(
    db: number,
    authFunction: (userData: any, iActionCode: number, param3: string|null, param4: string|null, param5: string|null, param6: string|null) => number|Promise<number>,
    userData: any): number;
  
  /**
   * Get statement SQL
   * @see https://www.sqlite.org/c3ref/expanded_sql.html
   * @param stmt prepared statement pointer
   * @returns SQL
   */
  sql(stmt: number): string;

  /**
   * SQL statement iterator
   * 
   * This function manages statement compilation by creating an async
   * iterator that yields a prepared statement handle on each iteration.
   * It is typically used with a `for await` loop (in an async function),
   * like this:
   * ```javascript
   * // Compile one statement on each iteration of this loop.
   * for await (const stmt of sqlite3.statements(db, sql)) {
   *   // Bind parameters here if using SQLite placeholders.
   * 
   *   // Execute the statement with this loop.
   *   while (await sqlite3.step(stmt) === SQLite.SQLITE_ROW) {
   *     // Collect row data here.
   *   }
   *
   *   // Change bindings, reset, and execute again if desired.
   * }
   * ```
   * 
   * By default, the lifetime of a yielded prepared statement is managed
   * automatically by the iterator, ending at the end of each iteration.
   * {@link finalize} should *not* be called on a statement provided by
   * the iterator unless the `unscoped` option is set to `true` (that
   * option is provided for applications that wish to manage statement
   * lifetimes manually).
   * 
   * If using the iterator manually, i.e. by calling its `next`
   * method, be sure to call the `return` method if iteration
   * is abandoned before completion (`for await` and other implicit
   * traversals provided by Javascript do this automatically)
   * to ensure that all allocated resources are released.
   * @see https://www.sqlite.org/c3ref/prepare.html
   * @param db database pointer
   * @param sql 
   * @param options
   */
  statements(db: number, sql: string, options?: SQLitePrepareOptions): AsyncIterable<number>;

  /**
   * Evaluate an SQL statement
   * @see https://www.sqlite.org/c3ref/step.html
   * @param stmt prepared statement pointer
   * @returns Promise resolving to `SQLITE_ROW` or `SQLITE_DONE`
   * (rejects on error)
   */
  step(stmt: number): Promise<number>;

   /**
   * Register an update hook
   * 
   * The callback is invoked whenever a row is updated, inserted, or deleted
   * in a rowid table on this connection.
   * @see https://www.sqlite.org/c3ref/update_hook.html
   *
   * updateType is one of:
   * - SQLITE_DELETE: 9
   * - SQLITE_INSERT: 18
   * - SQLITE_UPDATE: 23
   * @see https://www.sqlite.org/c3ref/c_alter_table.html
   * 
   * @param db database pointer
   * @param callback
   */
   update_hook(
    db: number,
    callback: (updateType: number, dbName: string|null, tblName: string|null, rowid: bigint) => void): void;

  /**
   * Extract a value from `sqlite3_value`
   * 
   * This is a convenience function that calls the appropriate `value_*`
   * function based on its type. Note that if the value is a blob then as
   * with `value_blob` the result may be invalid after the next SQLite call.
   * 
   * Integer values are returned as Number if within the min/max safe
   * integer bounds, otherwise they are returned as BigInt.
   * @param pValue `sqlite3_value` pointer
   * @returns value
   */
  value(pValue: number): SQLiteCompatibleType;

  /**
   * Extract a value from `sqlite3_value`
   * 
   * The contents of the returned buffer may be invalid after the
   * next SQLite call. Make a copy of the data (e.g. with `.slice()`)
   * if longer retention is required.
   * @see https://sqlite.org/c3ref/value_blob.html
   * @param pValue `sqlite3_value` pointer
   * @returns value
   */
  value_blob(pValue: number): Uint8Array;

  /**
   * Get blob or text size for value
   * @see https://sqlite.org/c3ref/value_blob.html
   * @param pValue `sqlite3_value` pointer
   * @returns size
   */
  value_bytes(pValue: number): number;

  /**
   * Extract a value from `sqlite3_value`
   * @see https://sqlite.org/c3ref/value_blob.html
   * @param pValue `sqlite3_value` pointer
   * @returns value
   */
  value_double(pValue: number): number;

  /**
   * Extract a value from `sqlite3_value`
   * @see https://sqlite.org/c3ref/value_blob.html
   * @param pValue `sqlite3_value` pointer
   * @returns value
   */
  value_int(pValue: number): number;

  /**
   * Extract a value from `sqlite3_value`
   * @see https://sqlite.org/c3ref/value_blob.html
   * @param pValue `sqlite3_value` pointer
   * @returns value
   */
   value_int64(pValue: number): bigint;

  /**
   * Extract a value from `sqlite3_value`
   * @see https://sqlite.org/c3ref/value_blob.html
   * @param pValue `sqlite3_value` pointer
   * @returns value
   */
  value_text(pValue: number): string;

  /**
   * Get type of `sqlite3_value`
   * @see https://sqlite.org/c3ref/value_blob.html
   * @param pValue `sqlite3_value` pointer
   * @returns enumeration value for type
   */
  value_type(pValue: number): number;
  
  /**
   * Register a new Virtual File System.
   * 
   * @see https://www.sqlite.org/c3ref/vfs_find.html
   * @param vfs VFS object
   * @param makeDefault 
   * @returns `SQLITE_OK` (throws exception on error)
   */
  vfs_register(vfs: SQLiteVFS, makeDefault?: boolean): number;
}

/** @ignore */
declare module 'wa-sqlite/src/sqlite-constants.js' {
  export const SQLITE_OK: 0;
  export const SQLITE_ERROR: 1;
  export const SQLITE_INTERNAL: 2;
  export const SQLITE_PERM: 3;
  export const SQLITE_ABORT: 4;
  export const SQLITE_BUSY: 5;
  export const SQLITE_LOCKED: 6;
  export const SQLITE_NOMEM: 7;
  export const SQLITE_READONLY: 8;
  export const SQLITE_INTERRUPT: 9;
  export const SQLITE_IOERR: 10;
  export const SQLITE_CORRUPT: 11;
  export const SQLITE_NOTFOUND: 12;
  export const SQLITE_FULL: 13;
  export const SQLITE_CANTOPEN: 14;
  export const SQLITE_PROTOCOL: 15;
  export const SQLITE_EMPTY: 16;
  export const SQLITE_SCHEMA: 17;
  export const SQLITE_TOOBIG: 18;
  export const SQLITE_CONSTRAINT: 19;
  export const SQLITE_MISMATCH: 20;
  export const SQLITE_MISUSE: 21;
  export const SQLITE_NOLFS: 22;
  export const SQLITE_AUTH: 23;
  export const SQLITE_FORMAT: 24;
  export const SQLITE_RANGE: 25;
  export const SQLITE_NOTADB: 26;
  export const SQLITE_NOTICE: 27;
  export const SQLITE_WARNING: 28;
  export const SQLITE_ROW: 100;
  export const SQLITE_DONE: 101;
  export const SQLITE_IOERR_ACCESS: 3338;
  export const SQLITE_IOERR_CHECKRESERVEDLOCK: 3594;
  export const SQLITE_IOERR_CLOSE: 4106;
  export const SQLITE_IOERR_DATA: 8202;
  export const SQLITE_IOERR_DELETE: 2570;
  export const SQLITE_IOERR_DELETE_NOENT: 5898;
  export const SQLITE_IOERR_DIR_FSYNC: 1290;
  export const SQLITE_IOERR_FSTAT: 1802;
  export const SQLITE_IOERR_FSYNC: 1034;
  export const SQLITE_IOERR_GETTEMPPATH: 6410;
  export const SQLITE_IOERR_LOCK: 3850;
  export const SQLITE_IOERR_NOMEM: 3082;
  export const SQLITE_IOERR_READ: 266;
  export const SQLITE_IOERR_RDLOCK: 2314;
  export const SQLITE_IOERR_SEEK: 5642;
  export const SQLITE_IOERR_SHORT_READ: 522;
  export const SQLITE_IOERR_TRUNCATE: 1546;
  export const SQLITE_IOERR_UNLOCK: 2058;
  export const SQLITE_IOERR_VNODE: 6922;
  export const SQLITE_IOERR_WRITE: 778;
  export const SQLITE_IOERR_BEGIN_ATOMIC: 7434;
  export const SQLITE_IOERR_COMMIT_ATOMIC: 7690;
  export const SQLITE_IOERR_ROLLBACK_ATOMIC: 7946;
  export const SQLITE_CONSTRAINT_CHECK: 275;
  export const SQLITE_CONSTRAINT_COMMITHOOK: 531;
  export const SQLITE_CONSTRAINT_FOREIGNKEY: 787;
  export const SQLITE_CONSTRAINT_FUNCTION: 1043;
  export const SQLITE_CONSTRAINT_NOTNULL: 1299;
  export const SQLITE_CONSTRAINT_PINNED: 2835;
  export const SQLITE_CONSTRAINT_PRIMARYKEY: 1555;
  export const SQLITE_CONSTRAINT_ROWID: 2579;
  export const SQLITE_CONSTRAINT_TRIGGER: 1811;
  export const SQLITE_CONSTRAINT_UNIQUE: 2067;
  export const SQLITE_CONSTRAINT_VTAB: 2323;
  export const SQLITE_OPEN_READONLY: 1;
  export const SQLITE_OPEN_READWRITE: 2;
  export const SQLITE_OPEN_CREATE: 4;
  export const SQLITE_OPEN_DELETEONCLOSE: 8;
  export const SQLITE_OPEN_EXCLUSIVE: 16;
  export const SQLITE_OPEN_AUTOPROXY: 32;
  export const SQLITE_OPEN_URI: 64;
  export const SQLITE_OPEN_MEMORY: 128;
  export const SQLITE_OPEN_MAIN_DB: 256;
  export const SQLITE_OPEN_TEMP_DB: 512;
  export const SQLITE_OPEN_TRANSIENT_DB: 1024;
  export const SQLITE_OPEN_MAIN_JOURNAL: 2048;
  export const SQLITE_OPEN_TEMP_JOURNAL: 4096;
  export const SQLITE_OPEN_SUBJOURNAL: 8192;
  export const SQLITE_OPEN_SUPER_JOURNAL: 16384;
  export const SQLITE_OPEN_NOMUTEX: 32768;
  export const SQLITE_OPEN_FULLMUTEX: 65536;
  export const SQLITE_OPEN_SHAREDCACHE: 131072;
  export const SQLITE_OPEN_PRIVATECACHE: 262144;
  export const SQLITE_OPEN_WAL: 524288;
  export const SQLITE_OPEN_NOFOLLOW: 16777216;
  export const SQLITE_LOCK_NONE: 0;
  export const SQLITE_LOCK_SHARED: 1;
  export const SQLITE_LOCK_RESERVED: 2;
  export const SQLITE_LOCK_PENDING: 3;
  export const SQLITE_LOCK_EXCLUSIVE: 4;
  export const SQLITE_IOCAP_ATOMIC: 1;
  export const SQLITE_IOCAP_ATOMIC512: 2;
  export const SQLITE_IOCAP_ATOMIC1K: 4;
  export const SQLITE_IOCAP_ATOMIC2K: 8;
  export const SQLITE_IOCAP_ATOMIC4K: 16;
  export const SQLITE_IOCAP_ATOMIC8K: 32;
  export const SQLITE_IOCAP_ATOMIC16K: 64;
  export const SQLITE_IOCAP_ATOMIC32K: 128;
  export const SQLITE_IOCAP_ATOMIC64K: 256;
  export const SQLITE_IOCAP_SAFE_APPEND: 512;
  export const SQLITE_IOCAP_SEQUENTIAL: 1024;
  export const SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN: 2048;
  export const SQLITE_IOCAP_POWERSAFE_OVERWRITE: 4096;
  export const SQLITE_IOCAP_IMMUTABLE: 8192;
  export const SQLITE_IOCAP_BATCH_ATOMIC: 16384;
  export const SQLITE_ACCESS_EXISTS: 0;
  export const SQLITE_ACCESS_READWRITE: 1;
  export const SQLITE_ACCESS_READ: 2;
  export const SQLITE_FCNTL_LOCKSTATE: 1;
  export const SQLITE_FCNTL_GET_LOCKPROXYFILE: 2;
  export const SQLITE_FCNTL_SET_LOCKPROXYFILE: 3;
  export const SQLITE_FCNTL_LAST_ERRNO: 4;
  export const SQLITE_FCNTL_SIZE_HINT: 5;
  export const SQLITE_FCNTL_CHUNK_SIZE: 6;
  export const SQLITE_FCNTL_FILE_POINTER: 7;
  export const SQLITE_FCNTL_SYNC_OMITTED: 8;
  export const SQLITE_FCNTL_WIN32_AV_RETRY: 9;
  export const SQLITE_FCNTL_PERSIST_WAL: 10;
  export const SQLITE_FCNTL_OVERWRITE: 11;
  export const SQLITE_FCNTL_VFSNAME: 12;
  export const SQLITE_FCNTL_POWERSAFE_OVERWRITE: 13;
  export const SQLITE_FCNTL_PRAGMA: 14;
  export const SQLITE_FCNTL_BUSYHANDLER: 15;
  export const SQLITE_FCNTL_TEMPFILENAME: 16;
  export const SQLITE_FCNTL_MMAP_SIZE: 18;
  export const SQLITE_FCNTL_TRACE: 19;
  export const SQLITE_FCNTL_HAS_MOVED: 20;
  export const SQLITE_FCNTL_SYNC: 21;
  export const SQLITE_FCNTL_COMMIT_PHASETWO: 22;
  export const SQLITE_FCNTL_WIN32_SET_HANDLE: 23;
  export const SQLITE_FCNTL_WAL_BLOCK: 24;
  export const SQLITE_FCNTL_ZIPVFS: 25;
  export const SQLITE_FCNTL_RBU: 26;
  export const SQLITE_FCNTL_VFS_POINTER: 27;
  export const SQLITE_FCNTL_JOURNAL_POINTER: 28;
  export const SQLITE_FCNTL_WIN32_GET_HANDLE: 29;
  export const SQLITE_FCNTL_PDB: 30;
  export const SQLITE_FCNTL_BEGIN_ATOMIC_WRITE: 31;
  export const SQLITE_FCNTL_COMMIT_ATOMIC_WRITE: 32;
  export const SQLITE_FCNTL_ROLLBACK_ATOMIC_WRITE: 33;
  export const SQLITE_FCNTL_LOCK_TIMEOUT: 34;
  export const SQLITE_FCNTL_DATA_VERSION: 35;
  export const SQLITE_FCNTL_SIZE_LIMIT: 36;
  export const SQLITE_FCNTL_CKPT_DONE: 37;
  export const SQLITE_FCNTL_RESERVE_BYTES: 38;
  export const SQLITE_FCNTL_CKPT_START: 39;
  export const SQLITE_INTEGER: 1;
  export const SQLITE_FLOAT: 2;
  export const SQLITE_TEXT: 3;
  export const SQLITE_BLOB: 4;
  export const SQLITE_NULL: 5;
  export const SQLITE_STATIC: 0;
  export const SQLITE_TRANSIENT: -1;
  export const SQLITE_UTF8: 1;
  export const SQLITE_UTF16LE: 2;
  export const SQLITE_UTF16BE: 3;
  export const SQLITE_UTF16: 4;
  export const SQLITE_INDEX_CONSTRAINT_EQ: 2;
  export const SQLITE_INDEX_CONSTRAINT_GT: 4;
  export const SQLITE_INDEX_CONSTRAINT_LE: 8;
  export const SQLITE_INDEX_CONSTRAINT_LT: 16;
  export const SQLITE_INDEX_CONSTRAINT_GE: 32;
  export const SQLITE_INDEX_CONSTRAINT_MATCH: 64;
  export const SQLITE_INDEX_CONSTRAINT_LIKE: 65;
  export const SQLITE_INDEX_CONSTRAINT_GLOB: 66;
  export const SQLITE_INDEX_CONSTRAINT_REGEXP: 67;
  export const SQLITE_INDEX_CONSTRAINT_NE: 68;
  export const SQLITE_INDEX_CONSTRAINT_ISNOT: 69;
  export const SQLITE_INDEX_CONSTRAINT_ISNOTNULL: 70;
  export const SQLITE_INDEX_CONSTRAINT_ISNULL: 71;
  export const SQLITE_INDEX_CONSTRAINT_IS: 72;
  export const SQLITE_INDEX_CONSTRAINT_FUNCTION: 150;
  export const SQLITE_INDEX_SCAN_UNIQUE: 1;
  export const SQLITE_DETERMINISTIC: 0x000000800;
  export const SQLITE_DIRECTONLY: 0x000080000;
  export const SQLITE_SUBTYPE: 0x000100000;
  export const SQLITE_INNOCUOUS: 0x000200000;
  export const SQLITE_SYNC_NORMAL: 0x00002;
  export const SQLITE_SYNC_FULL: 0x00003;
  export const SQLITE_SYNC_DATAONLY: 0x00010;
  export const SQLITE_CREATE_INDEX: 1;
  export const SQLITE_CREATE_TABLE: 2;
  export const SQLITE_CREATE_TEMP_INDEX: 3;
  export const SQLITE_CREATE_TEMP_TABLE: 4;
  export const SQLITE_CREATE_TEMP_TRIGGER: 5;
  export const SQLITE_CREATE_TEMP_VIEW: 6;
  export const SQLITE_CREATE_TRIGGER: 7;
  export const SQLITE_CREATE_VIEW: 8;
  export const SQLITE_DELETE: 9;
  export const SQLITE_DROP_INDEX: 10;
  export const SQLITE_DROP_TABLE: 11;
  export const SQLITE_DROP_TEMP_INDEX: 12;
  export const SQLITE_DROP_TEMP_TABLE: 13;
  export const SQLITE_DROP_TEMP_TRIGGER: 14;
  export const SQLITE_DROP_TEMP_VIEW: 15;
  export const SQLITE_DROP_TRIGGER: 16;
  export const SQLITE_DROP_VIEW: 17;
  export const SQLITE_INSERT: 18;
  export const SQLITE_PRAGMA: 19;
  export const SQLITE_READ: 20;
  export const SQLITE_SELECT: 21;
  export const SQLITE_TRANSACTION: 22;
  export const SQLITE_UPDATE: 23;
  export const SQLITE_ATTACH: 24;
  export const SQLITE_DETACH: 25;
  export const SQLITE_ALTER_TABLE: 26;
  export const SQLITE_REINDEX: 27;
  export const SQLITE_ANALYZE: 28;
  export const SQLITE_CREATE_VTABLE: 29;
  export const SQLITE_DROP_VTABLE: 30;
  export const SQLITE_FUNCTION: 31;
  export const SQLITE_SAVEPOINT: 32;
  export const SQLITE_COPY: 0;
  export const SQLITE_RECURSIVE: 33;
  export const SQLITE_DENY: 1;
  export const SQLITE_IGNORE: 2;
  export const SQLITE_LIMIT_LENGTH: 0;
  export const SQLITE_LIMIT_SQL_LENGTH: 1;
  export const SQLITE_LIMIT_COLUMN: 2;
  export const SQLITE_LIMIT_EXPR_DEPTH: 3;
  export const SQLITE_LIMIT_COMPOUND_SELECT: 4;
  export const SQLITE_LIMIT_VDBE_OP: 5;
  export const SQLITE_LIMIT_FUNCTION_ARG: 6;
  export const SQLITE_LIMIT_ATTACHED: 7;
  export const SQLITE_LIMIT_LIKE_PATTERN_LENGTH: 8;
  export const SQLITE_LIMIT_VARIABLE_NUMBER: 9;
  export const SQLITE_LIMIT_TRIGGER_DEPTH: 10;
  export const SQLITE_LIMIT_WORKER_THREADS: 11;
  export const SQLITE_PREPARE_PERSISTENT: 0x01;
  export const SQLITE_PREPARE_NORMALIZED: 0x02;
  export const SQLITE_PREPARE_NO_VTAB: 0x04;
}

declare module 'wa-sqlite' {
  export * from 'wa-sqlite/src/sqlite-constants.js';

  /**
   * @ignore
   * Builds a Javascript API from the Emscripten module. This API is still
   * low-level and closely corresponds to the C API exported by the module,
   * but differs in some specifics like throwing exceptions on errors.
   * @param {*} Module SQLite module
   * @returns {SQLiteAPI}
   */
  export function Factory(Module: any): SQLiteAPI;

  export class SQLiteError extends Error {
      constructor(message: any, code: any);
      code: any;
  }
}

/** @ignore */
declare module 'wa-sqlite/dist/wa-sqlite.mjs' {
  function ModuleFactory(config?: object): Promise<any>;
  export = ModuleFactory;
}

/** @ignore */
declare module 'wa-sqlite/dist/wa-sqlite-async.mjs' {
  function ModuleFactory(config?: object): Promise<any>;
  export = ModuleFactory;
}

/** @ignore */
declare module 'wa-sqlite/src/VFS.js' {
  export * from 'wa-sqlite/src/sqlite-constants.js';

  export class Base {
    mxPathName: number;
    /**
     * @param {number} fileId
     * @returns {number|Promise<number>}
     */
    xClose(fileId: number): number;
    /**
     * @param {number} fileId
     * @param {Uint8Array} pData
     * @param {number} iOffset
     * @returns {number}
     */
    xRead(fileId: number, pData: {
        size: number;
        value: Uint8Array;
    }, iOffset: number): number;
    /**
     * @param {number} fileId
     * @param {Uint8Array} pData
     * @param {number} iOffset
     * @returns {number}
     */
    xWrite(fileId: number, pData: {
        size: number;
        value: Uint8Array;
    }, iOffset: number): number;
    /**
     * @param {number} fileId
     * @param {number} iSize
     * @returns {number}
     */
    xTruncate(fileId: number, iSize: number): number;
    /**
     * @param {number} fileId
     * @param {*} flags
     * @returns {number}
     */
    xSync(fileId: number, flags: any): number;
    /**
     * @param {number} fileId
     * @param {DataView} pSize64
     * @returns {number|Promise<number>}
     */
    xFileSize(fileId: number, pSize64: DataView): number;
    /**
     * @param {number} fileId
     * @param {number} flags
     * @returns {number}
     */
    xLock(fileId: number, flags: number): number;
    /**
     * @param {number} fileId
     * @param {number} flags
     * @returns {number}
     */
    xUnlock(fileId: number, flags: number): number;
    /**
     * @param {number} fileId
     * @param {DataView} pResOut
     * @returns {number}
     */
    xCheckReservedLock(fileId: number, pResOut: DataView): number;
    /**
     * @param {number} fileId
     * @param {number} flags
     * @param {DataView} pArg
     * @returns {number}
     */
    xFileControl(fileId: number, flags: number, pArg: DataView): number;
    /**
     * @param {number} fileId
     * @returns {number}
     */
    xSectorSize(fileId: number): number;
    /**
     * @param {number} fileId
     * @returns {number}
     */
    xDeviceCharacteristics(fileId: number): number;
    /**
     * @param {string?} name
     * @param {number} fileId
     * @param {number} flags
     * @param {DataView} pOutFlags
     * @returns {number}
     */
    xOpen(name: string | null, fileId: number, flags: number, pOutFlags: DataView): number;
    /**
     *
     * @param {string} name
     * @param {number} syncDir
     * @returns {number}
     */
    xDelete(name: string, syncDir: number): number;
    /**
     * @param {string} name
     * @param {number} flags
     * @param {DataView} pResOut
     * @returns {number}
     */
    xAccess(name: string, flags: number, pResOut: DataView): number;
    /**
     * Handle asynchronous operation. This implementation will be overriden on
     * registration by an Asyncify build.
     * @param {function(): Promise<number>} f
     * @returns {number}
     */
    handleAsync(f: () => Promise<number>): number;
  }
}

/** @ignore */
declare module 'wa-sqlite/src/examples/IndexedDbVFS.js' {
  import * as VFS from "wa-sqlite/src/VFS.js";
  export class IndexedDbVFS extends VFS.Base {
    /**
     * @param {string} idbName Name of IndexedDB database.
     */
    constructor(idbName?: string);
    name: string;
    mapIdToFile: Map<any, any>;
    cacheSize: number;
    db: any;
    close(): Promise<void>;
    /**
     * Delete a file from IndexedDB.
     * @param {string} name
     */
    deleteFile(name: string): Promise<void>;
    /**
     * Forcibly clear an orphaned file lock.
     * @param {string} name
     */
    forceClearLock(name: string): Promise<void>;
    _getStore(mode?: string): any;
    /**
     * Returns the key for file metadata.
     * @param {string} name
     * @returns
     */
    _metaKey(name: string): string;
    /**
     * Returns the key for file block data.
     * @param {string} name
     * @param {number} index
     * @returns
     */
    _blockKey(name: string, index: number): string;
    _getBlock(store: any, file: any, index: any): Promise<any>;
    _putBlock(store: any, file: any, index: any, blockData: any): void;
    _purgeCache(store: any, file: any, size?: number): void;
    _flushCache(store: any, file: any): Promise<void>;
    _sync(file: any): Promise<void>;
    /**
     * Helper function that deletes all keys greater or equal to `key`
     * provided they start with `prefix`.
     * @param {string} key
     * @param {string} [prefix]
     * @returns
     */
    _delete(key: string, prefix?: string): Promise<any>;
  }
}

/** @ignore */
declare module 'wa-sqlite/src/examples/MemoryVFS.js' {
  import * as VFS from "wa-sqlite/src/VFS.js";
  /** @ignore */
  export class MemoryVFS extends VFS.Base {
    name: string;
    mapNameToFile: Map<any, any>;
    mapIdToFile: Map<any, any>;
  }
}

/** @ignore */
declare module 'wa-sqlite/src/examples/MemoryAsyncVFS.js' {
  import { MemoryVFS } from "wa-sqlite/src/examples/MemoryVFS.js";
  export class MemoryAsyncVFS extends MemoryVFS {
  }
}

/** @ignore */
declare module 'wa-sqlite/src/examples/tag.js' {
  /**
   * @ignore
   * Template tag builder. This function creates a tag with an API and
   * database from the same module, then the tag can be used like this:
   * ```
   * const sql = tag(sqlite3, db);
   * const results = await sql`
   *   SELECT 1 + 1;
   *   SELECT 6 * 7;
   * `;
   * ```
   * The returned Promise value contains an array of results for each
   * SQL statement that produces output. Each result is an object with
   * properties `columns` (array of names) and `rows` (array of array
   * of values).
   * @param {SQLiteAPI} sqlite3
   * @param {number} db
   * @returns {function(TemplateStringsArray, ...any): Promise<object[]>}
   */
  export function tag(sqlite3: any, db: number): (arg0: TemplateStringsArray, ...args: any[]) => Promise<object[]>;
}
````

## File: packages/wa-sqlite/src/types/tsconfig.json
````json
{
  "compilerOptions": {
    "target": "ES2020"
  },
  "files": ["index.d.ts"]
}
````

## File: packages/wa-sqlite/src/asyncify_imports.json
````json
[
  "ipp",
  "ipp_async",
  "ippp",
  "ippp_async",
  "vppp",
  "vppp_async",
  "ipppj",
  "ipppj_async",
  "ipppi",
  "ipppi_async",
  "ipppp",
  "ipppp_async",
  "ipppip",
  "ipppip_async",
  "vpppip",
  "vpppip_async",
  "ippppi",
  "ippppi_async",
  "ippppij",
  "ippppij_async",
  "ipppiii",
  "ipppiii_async",
  "ippppip",
  "ippppip_async",
  "ippipppp",
  "ippipppp_async",
  "ipppppip",
  "ipppppip_async",
  "ipppiiip",
  "ipppiiip_async",
  "vppippii",
  "vppippii_async"
]
````

## File: packages/wa-sqlite/src/exported_functions.json
````json
[
  "_RegisterExtensionFunctions",
  "_main",
  "_malloc",
  "_free",
  "_sqlite3_aggregate_context",
  "_sqlite3_auto_extension",
  "_sqlite3_autovacuum_pages",
  "_sqlite3_backup_finish",
  "_sqlite3_backup_init",
  "_sqlite3_backup_pagecount",
  "_sqlite3_backup_remaining",
  "_sqlite3_backup_step",
  "_sqlite3_bind_blob",
  "_sqlite3_bind_blob64",
  "_sqlite3_bind_double",
  "_sqlite3_bind_int",
  "_sqlite3_bind_int64",
  "_sqlite3_bind_null",
  "_sqlite3_bind_parameter_count",
  "_sqlite3_bind_parameter_index",
  "_sqlite3_bind_parameter_name",
  "_sqlite3_bind_pointer",
  "_sqlite3_bind_text",
  "_sqlite3_bind_text16",
  "_sqlite3_bind_text64",
  "_sqlite3_bind_value",
  "_sqlite3_bind_zeroblob",
  "_sqlite3_bind_zeroblob64",
  "_sqlite3_blob_bytes",
  "_sqlite3_blob_close",
  "_sqlite3_blob_open",
  "_sqlite3_blob_read",
  "_sqlite3_blob_reopen",
  "_sqlite3_blob_write",
  "_sqlite3_busy_handler",
  "_sqlite3_busy_timeout",
  "_sqlite3_cancel_auto_extension",
  "_sqlite3_changes",
  "_sqlite3_changes64",
  "_sqlite3_clear_bindings",
  "_sqlite3_close",
  "_sqlite3_close_v2",
  "_sqlite3_collation_needed",
  "_sqlite3_collation_needed16",
  "_sqlite3_column_blob",
  "_sqlite3_column_bytes",
  "_sqlite3_column_bytes16",
  "_sqlite3_column_count",
  "_sqlite3_column_double",
  "_sqlite3_column_int",
  "_sqlite3_column_int64",
  "_sqlite3_column_name",
  "_sqlite3_column_name16",
  "_sqlite3_column_text",
  "_sqlite3_column_text16",
  "_sqlite3_column_type",
  "_sqlite3_column_value",
  "_sqlite3_commit_hook",
  "_sqlite3_compileoption_get",
  "_sqlite3_compileoption_used",
  "_sqlite3_complete",
  "_sqlite3_complete16",
  "_sqlite3_config",
  "_sqlite3_context_db_handle",
  "_sqlite3_create_collation",
  "_sqlite3_create_collation16",
  "_sqlite3_create_collation_v2",
  "_sqlite3_create_filename",
  "_sqlite3_create_function",
  "_sqlite3_create_function16",
  "_sqlite3_create_function_v2",
  "_sqlite3_create_module",
  "_sqlite3_create_module_v2",
  "_sqlite3_create_window_function",
  "_sqlite3_data_count",
  "_sqlite3_database_file_object",
  "_sqlite3_db_cacheflush",
  "_sqlite3_db_config",
  "_sqlite3_db_filename",
  "_sqlite3_db_handle",
  "_sqlite3_db_mutex",
  "_sqlite3_db_name",
  "_sqlite3_db_readonly",
  "_sqlite3_db_release_memory",
  "_sqlite3_db_status",
  "_sqlite3_declare_vtab",
  "_sqlite3_deserialize",
  "_sqlite3_drop_modules",
  "_sqlite3_errcode",
  "_sqlite3_errmsg",
  "_sqlite3_errmsg16",
  "_sqlite3_error_offset",
  "_sqlite3_errstr",
  "_sqlite3_exec",
  "_sqlite3_expanded_sql",
  "_sqlite3_extended_errcode",
  "_sqlite3_extended_result_codes",
  "_sqlite3_file_control",
  "_sqlite3_filename_database",
  "_sqlite3_filename_journal",
  "_sqlite3_filename_wal",
  "_sqlite3_finalize",
  "_sqlite3_free",
  "_sqlite3_free_filename",
  "_sqlite3_free_table",
  "_sqlite3_get_autocommit",
  "_sqlite3_get_auxdata",
  "_sqlite3_get_clientdata",
  "_sqlite3_get_table",
  "_sqlite3_hard_heap_limit64",
  "_sqlite3_initialize",
  "_sqlite3_interrupt",
  "_sqlite3_is_interrupted",
  "_sqlite3_keyword_check",
  "_sqlite3_keyword_count",
  "_sqlite3_keyword_name",
  "_sqlite3_last_insert_rowid",
  "_sqlite3_libversion",
  "_sqlite3_libversion_number",
  "_sqlite3_limit",
  "_sqlite3_log",
  "_sqlite3_malloc",
  "_sqlite3_malloc64",
  "_sqlite3_memory_highwater",
  "_sqlite3_memory_used",
  "_sqlite3_mprintf",
  "_sqlite3_msize",
  "_sqlite3_next_stmt",
  "_sqlite3_open",
  "_sqlite3_open16",
  "_sqlite3_open_v2",
  "_sqlite3_os_end",
  "_sqlite3_os_init",
  "_sqlite3_overload_function",
  "_sqlite3_prepare",
  "_sqlite3_prepare16",
  "_sqlite3_prepare16_v2",
  "_sqlite3_prepare16_v3",
  "_sqlite3_prepare_v2",
  "_sqlite3_prepare_v3",
  "_sqlite3_progress_handler",
  "_sqlite3_randomness",
  "_sqlite3_realloc",
  "_sqlite3_realloc64",
  "_sqlite3_release_memory",
  "_sqlite3_reset",
  "_sqlite3_reset_auto_extension",
  "_sqlite3_result_blob",
  "_sqlite3_result_blob64",
  "_sqlite3_result_double",
  "_sqlite3_result_error",
  "_sqlite3_result_error16",
  "_sqlite3_result_error_code",
  "_sqlite3_result_error_nomem",
  "_sqlite3_result_error_toobig",
  "_sqlite3_result_int",
  "_sqlite3_result_int64",
  "_sqlite3_result_null",
  "_sqlite3_result_pointer",
  "_sqlite3_result_subtype",
  "_sqlite3_result_text",
  "_sqlite3_result_text16",
  "_sqlite3_result_text16be",
  "_sqlite3_result_text16le",
  "_sqlite3_result_text64",
  "_sqlite3_result_value",
  "_sqlite3_result_zeroblob",
  "_sqlite3_result_zeroblob64",
  "_sqlite3_rollback_hook",
  "_sqlite3_serialize",
  "_sqlite3_set_authorizer",
  "_sqlite3_set_auxdata",
  "_sqlite3_set_clientdata",
  "_sqlite3_set_last_insert_rowid",
  "_sqlite3_shutdown",
  "_sqlite3_sleep",
  "_sqlite3_snprintf",
  "_sqlite3_soft_heap_limit64",
  "_sqlite3_sourceid",
  "_sqlite3_sql",
  "_sqlite3_status",
  "_sqlite3_status64",
  "_sqlite3_step",
  "_sqlite3_stmt_busy",
  "_sqlite3_stmt_explain",
  "_sqlite3_stmt_isexplain",
  "_sqlite3_stmt_readonly",
  "_sqlite3_stmt_status",
  "_sqlite3_str_append",
  "_sqlite3_str_appendall",
  "_sqlite3_str_appendchar",
  "_sqlite3_str_appendf",
  "_sqlite3_str_errcode",
  "_sqlite3_str_finish",
  "_sqlite3_str_length",
  "_sqlite3_str_new",
  "_sqlite3_str_reset",
  "_sqlite3_str_value",
  "_sqlite3_str_vappendf",
  "_sqlite3_strglob",
  "_sqlite3_stricmp",
  "_sqlite3_strlike",
  "_sqlite3_strnicmp",
  "_sqlite3_system_errno",
  "_sqlite3_table_column_metadata",
  "_sqlite3_test_control",
  "_sqlite3_threadsafe",
  "_sqlite3_total_changes",
  "_sqlite3_total_changes64",
  "_sqlite3_trace_v2",
  "_sqlite3_txn_state",
  "_sqlite3_update_hook",
  "_sqlite3_uri_boolean",
  "_sqlite3_uri_int64",
  "_sqlite3_uri_key",
  "_sqlite3_uri_parameter",
  "_sqlite3_user_data",
  "_sqlite3_value_blob",
  "_sqlite3_value_bytes",
  "_sqlite3_value_bytes16",
  "_sqlite3_value_double",
  "_sqlite3_value_dup",
  "_sqlite3_value_encoding",
  "_sqlite3_value_free",
  "_sqlite3_value_frombind",
  "_sqlite3_value_int",
  "_sqlite3_value_int64",
  "_sqlite3_value_nochange",
  "_sqlite3_value_numeric_type",
  "_sqlite3_value_pointer",
  "_sqlite3_value_subtype",
  "_sqlite3_value_text",
  "_sqlite3_value_text16",
  "_sqlite3_value_text16be",
  "_sqlite3_value_text16le",
  "_sqlite3_value_type",
  "_sqlite3_version",
  "_sqlite3_vfs_find",
  "_sqlite3_vfs_register",
  "_sqlite3_vfs_unregister",
  "_sqlite3_vmprintf",
  "_sqlite3_vsnprintf",
  "_sqlite3_vtab_collation",
  "_sqlite3_vtab_config",
  "_sqlite3_vtab_distinct",
  "_sqlite3_vtab_in",
  "_sqlite3_vtab_in_first",
  "_sqlite3_vtab_in_next",
  "_sqlite3_vtab_nochange",
  "_sqlite3_vtab_on_conflict",
  "_sqlite3_vtab_rhs_value",
  "_sqlite3_wal_autocheckpoint",
  "_sqlite3_wal_checkpoint",
  "_sqlite3_wal_checkpoint_v2",
  "_sqlite3_wal_hook"
]
````

## File: packages/wa-sqlite/src/extra_exported_runtime_methods.json
````json
[
  "addFunction",
  "ccall",
  "cwrap",
  "getTempRet0",
  "getValue",
  "setValue",
  "lengthBytesUTF8",
  "stringToUTF8",
  "stringToUTF16",
  "stringToUTF32",
  "AsciiToString",
  "HEAP32",
  "HEAPU8",
  "UTF8ToString",
  "UTF16ToString",
  "UTF32ToString",
  "intArrayFromString",
  "intArrayToString",
  "writeArrayToMemory"
]
````

## File: packages/wa-sqlite/src/FacadeVFS.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
import * as VFS from './VFS.js';

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

// Convenience base class for a JavaScript VFS.
// The raw xOpen, xRead, etc. function signatures receive only C primitives
// which aren't easy to work with. This class provides corresponding calls
// like jOpen, jRead, etc., which receive JavaScript-friendlier arguments
// such as string, Uint8Array, and DataView.
export class FacadeVFS extends VFS.Base {
  /**
   * @param {string} name 
   * @param {object} module 
   */
  constructor(name, module) {
    super(name, module);
  }

  /**
   * Override to indicate which methods are asynchronous.
   * @param {string} methodName 
   * @returns {boolean}
   */
  hasAsyncMethod(methodName) {
    // The input argument is a string like "xOpen", so convert to "jOpen".
    // Then check if the method exists and is async.
    const jMethodName = `j${methodName.slice(1)}`;
    return this[jMethodName] instanceof AsyncFunction;
  }
  
  /**
   * Return the filename for a file id for use by mixins.
   * @param {number} pFile 
   * @returns {string}
   */
  getFilename(pFile) {
    throw new Error('unimplemented');
  }

  /**
   * @param {string?} filename 
   * @param {number} pFile 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {number|Promise<number>}
   */
  jOpen(filename, pFile, flags, pOutFlags) {
    return VFS.SQLITE_CANTOPEN;
  }

  /**
   * @param {string} filename 
   * @param {number} syncDir 
   * @returns {number|Promise<number>}
   */
  jDelete(filename, syncDir) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {string} filename 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {number|Promise<number>}
   */
  jAccess(filename, flags, pResOut) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {string} filename 
   * @param {Uint8Array} zOut 
   * @returns {number|Promise<number>}
   */
  jFullPathname(filename, zOut) {
    // Copy the filename to the output buffer.
    const { read, written } = new TextEncoder().encodeInto(filename, zOut);
    if (read < filename.length) return VFS.SQLITE_IOERR;
    if (written >= zOut.length) return VFS.SQLITE_IOERR;
    zOut[written] = 0;
    return VFS.SQLITE_OK;
  }

  /**
   * @param {Uint8Array} zBuf 
   * @returns {number|Promise<number>}
   */
  jGetLastError(zBuf) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  jClose(pFile) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @param {Uint8Array} pData 
   * @param {number} iOffset 
   * @returns {number|Promise<number>}
   */
  jRead(pFile, pData, iOffset) {
    pData.fill(0);
    return VFS.SQLITE_IOERR_SHORT_READ;
  }

  /**
   * @param {number} pFile 
   * @param {Uint8Array} pData 
   * @param {number} iOffset 
   * @returns {number|Promise<number>}
   */
  jWrite(pFile, pData, iOffset) {
    return VFS.SQLITE_IOERR_WRITE;
  }

  /**
   * @param {number} pFile 
   * @param {number} size 
   * @returns {number|Promise<number>}
   */
  jTruncate(pFile, size) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @param {number} flags 
   * @returns {number|Promise<number>}
   */
  jSync(pFile, flags) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @param {DataView} pSize
   * @returns {number|Promise<number>}
   */
  jFileSize(pFile, pSize) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @param {number} lockType 
   * @returns {number|Promise<number>}
   */
  jLock(pFile, lockType) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @param {number} lockType 
   * @returns {number|Promise<number>}
   */
  jUnlock(pFile, lockType) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @param {DataView} pResOut 
   * @returns {number|Promise<number>}
   */
  jCheckReservedLock(pFile, pResOut) {
    pResOut.setInt32(0, 0, true);
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile
   * @param {number} op
   * @param {DataView} pArg
   * @returns {number|Promise<number>}
   */
  jFileControl(pFile, op, pArg) {
    return VFS.SQLITE_NOTFOUND;
  }

  /**
   * @param {number} pFile
   * @returns {number|Promise<number>}
   */
  jSectorSize(pFile) {
    return super.xSectorSize(pFile);
  }

  /**
   * @param {number} pFile
   * @returns {number|Promise<number>}
   */
  jDeviceCharacteristics(pFile) {
    return 0;
  }

  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} pFile 
   * @param {number} flags 
   * @param {number} pOutFlags 
   * @returns {number|Promise<number>}
   */
  xOpen(pVfs, zName, pFile, flags, pOutFlags) {
    const filename = this.#decodeFilename(zName, flags);
    const pOutFlagsView = this.#makeTypedDataView('Int32', pOutFlags);
    this['log']?.('jOpen', filename, pFile, '0x' + flags.toString(16));
    return this.jOpen(filename, pFile, flags, pOutFlagsView);
  }

  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} syncDir 
   * @returns {number|Promise<number>}
   */
  xDelete(pVfs, zName, syncDir) {
    const filename = this._module.UTF8ToString(zName);
    this['log']?.('jDelete', filename, syncDir);
    return this.jDelete(filename, syncDir);
  }

  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} flags 
   * @param {number} pResOut 
   * @returns {number|Promise<number>}
   */
  xAccess(pVfs, zName, flags, pResOut) {
    const filename = this._module.UTF8ToString(zName);
    const pResOutView = this.#makeTypedDataView('Int32', pResOut);
    this['log']?.('jAccess', filename, flags);
    return this.jAccess(filename, flags, pResOutView);
  }

  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} nOut 
   * @param {number} zOut 
   * @returns {number|Promise<number>}
   */
  xFullPathname(pVfs, zName, nOut, zOut) {
    const filename = this._module.UTF8ToString(zName);
    const zOutArray = this._module.HEAPU8.subarray(zOut, zOut + nOut);
    this['log']?.('jFullPathname', filename, nOut);
    return this.jFullPathname(filename, zOutArray);
  }

  /**
   * @param {number} pVfs 
   * @param {number} nBuf 
   * @param {number} zBuf 
   * @returns {number|Promise<number>}
   */
  xGetLastError(pVfs, nBuf, zBuf) {
    const zBufArray = this._module.HEAPU8.subarray(zBuf, zBuf + nBuf);
    this['log']?.('jGetLastError', nBuf);
    return this.jGetLastError(zBufArray);
  }

  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  xClose(pFile) {
    this['log']?.('jClose', pFile);
    return this.jClose(pFile);
  }

  /**
   * @param {number} pFile 
   * @param {number} pData 
   * @param {number} iAmt 
   * @param {number} iOffsetLo 
   * @param {number} iOffsetHi 
   * @returns {number|Promise<number>}
   */
  xRead(pFile, pData, iAmt, iOffsetLo, iOffsetHi) {
    const pDataArray = this.#makeDataArray(pData, iAmt);
    const iOffset = delegalize(iOffsetLo, iOffsetHi);
    this['log']?.('jRead', pFile, iAmt, iOffset);
    return this.jRead(pFile, pDataArray, iOffset);
  }

  /**
   * @param {number} pFile 
   * @param {number} pData 
   * @param {number} iAmt 
   * @param {number} iOffsetLo 
   * @param {number} iOffsetHi 
   * @returns {number|Promise<number>}
   */
  xWrite(pFile, pData, iAmt, iOffsetLo, iOffsetHi) {
    const pDataArray = this.#makeDataArray(pData, iAmt);
    const iOffset = delegalize(iOffsetLo, iOffsetHi);
    this['log']?.('jWrite', pFile, pDataArray, iOffset);
    return this.jWrite(pFile, pDataArray, iOffset);
  }

  /**
   * @param {number} pFile 
   * @param {number} sizeLo 
   * @param {number} sizeHi 
   * @returns {number|Promise<number>}
   */
  xTruncate(pFile, sizeLo, sizeHi) {
    const size = delegalize(sizeLo, sizeHi);
    this['log']?.('jTruncate', pFile, size);
    return this.jTruncate(pFile, size);
  }

  /**
   * @param {number} pFile 
   * @param {number} flags 
   * @returns {number|Promise<number>}
   */
  xSync(pFile, flags) {
    this['log']?.('jSync', pFile, flags);
    return this.jSync(pFile, flags);
  }

  /**
   * 
   * @param {number} pFile 
   * @param {number} pSize 
   * @returns {number|Promise<number>}
   */
  xFileSize(pFile, pSize) {
    const pSizeView = this.#makeTypedDataView('BigInt64', pSize);
    this['log']?.('jFileSize', pFile);
    return this.jFileSize(pFile, pSizeView);
  }

  /**
   * @param {number} pFile 
   * @param {number} lockType 
   * @returns {number|Promise<number>}
   */
  xLock(pFile, lockType) {
    this['log']?.('jLock', pFile, lockType);
    return this.jLock(pFile, lockType);
  }

  /**
   * @param {number} pFile 
   * @param {number} lockType 
   * @returns {number|Promise<number>}
   */
  xUnlock(pFile, lockType) {
    this['log']?.('jUnlock', pFile, lockType);
    return this.jUnlock(pFile, lockType);
  } 

  /**
   * @param {number} pFile 
   * @param {number} pResOut 
   * @returns {number|Promise<number>}
   */
  xCheckReservedLock(pFile, pResOut) {
    const pResOutView = this.#makeTypedDataView('Int32', pResOut);
    this['log']?.('jCheckReservedLock', pFile);
    return this.jCheckReservedLock(pFile, pResOutView);
  }

  /**
   * @param {number} pFile 
   * @param {number} op 
   * @param {number} pArg 
   * @returns {number|Promise<number>}
   */
  xFileControl(pFile, op, pArg) {
    const pArgView = new DataView(
      this._module.HEAPU8.buffer,
      this._module.HEAPU8.byteOffset + pArg);
    this['log']?.('jFileControl', pFile, op, pArgView);
    return this.jFileControl(pFile, op, pArgView);
  }

  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  xSectorSize(pFile) {
    this['log']?.('jSectorSize', pFile);
    return this.jSectorSize(pFile);
  }

  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  xDeviceCharacteristics(pFile) {
    this['log']?.('jDeviceCharacteristics', pFile);
    return this.jDeviceCharacteristics(pFile);
  }

  /**
   * Wrapped DataView for pointer arguments.
   * Pointers to a single value are passed using a DataView-like class.
   * This wrapper class prevents use of incorrect type or endianness, and
   * reacquires the underlying buffer when the WebAssembly memory is resized.
   * @param {'Int32'|'BigInt64'} type 
   * @param {number} byteOffset 
   * @returns {DataView}
   */
  #makeTypedDataView(type, byteOffset) {
    // @ts-ignore
    return new DataViewProxy(this._module, byteOffset, type);
  }

  /**
   * Wrapped Uint8Array for buffer arguments.
   * Memory blocks are passed as a Uint8Array-like class. This wrapper
   * class reacquires the underlying buffer when the WebAssembly memory
   * is resized.
   * @param {number} byteOffset 
   * @param {number} byteLength 
   * @returns {Uint8Array}
   */
  #makeDataArray(byteOffset, byteLength) {
    // @ts-ignore
    return new Uint8ArrayProxy(this._module, byteOffset, byteLength);
  }

  #decodeFilename(zName, flags) {
    if (flags & VFS.SQLITE_OPEN_URI) {
      // The first null-terminated string is the URI path. Subsequent
      // strings are query parameter keys and values.
      // https://www.sqlite.org/c3ref/open.html#urifilenamesinsqlite3open
      let pName = zName;
      let state = 1;
      const charCodes = [];
      while (state) {
        const charCode = this._module.HEAPU8[pName++];
        if (charCode) {
          charCodes.push(charCode);
        } else {
          if (!this._module.HEAPU8[pName]) state = null;
          switch (state) {
            case 1: // path
              charCodes.push('?'.charCodeAt(0));
              state = 2;
              break;
            case 2: // key
              charCodes.push('='.charCodeAt(0));
              state = 3;
              break;
            case 3: // value
              charCodes.push('&'.charCodeAt(0));
              state = 2;
              break;
          }
        }
      }
      return  new TextDecoder().decode(new Uint8Array(charCodes));
    }
    return zName ? this._module.UTF8ToString(zName) : null;
  }
}

// Emscripten "legalizes" 64-bit integer arguments by passing them as
// two 32-bit signed integers.
function delegalize(lo32, hi32) {
  return (hi32 * 0x100000000) + lo32 + (lo32 < 0 ? 2**32 : 0);
}

// This class provides a Uint8Array-like interface for a WebAssembly memory
// buffer. It is used to access memory blocks passed as arguments to
// xRead, xWrite, etc. The class reacquires the underlying buffer when the
// WebAssembly memory is resized, which can happen when the memory is
// detached and resized by the WebAssembly module.
//
// Note that although this class implements the same methods as Uint8Array,
// it is not a real Uint8Array and passing it to functions that expect
// a Uint8Array may not work. Use subarray() to get a real Uint8Array
// if needed.
class Uint8ArrayProxy {
  #module;

  #_array = new Uint8Array()
  get #array() {
    if (this.#_array.buffer.byteLength === 0) {
      // WebAssembly memory resize detached the buffer so re-create the
      // array with the new buffer.
      this.#_array = this.#module.HEAPU8.subarray(
        this.byteOffset,
        this.byteOffset + this.byteLength);
    }
    return this.#_array;
  }

  /**
   * @param {*} module
   * @param {number} byteOffset 
   * @param {number} byteLength 
   */
  constructor(module, byteOffset, byteLength) {
    this.#module = module;
    this.byteOffset = byteOffset;
    this.length = this.byteLength = byteLength;
  }

  get buffer() {
    return this.#array.buffer;
  }

  at(index) {
    return this.#array.at(index);
  }
  copyWithin(target, start, end) {
    this.#array.copyWithin(target, start, end);
  }
  entries() {
    return this.#array.entries();
  }
  every(predicate) {
    return this.#array.every(predicate);
  }
  fill(value, start, end) {
    this.#array.fill(value, start, end);
  }
  filter(predicate) {
    return this.#array.filter(predicate);
  }
  find(predicate) {
    return this.#array.find(predicate);
  }
  findIndex(predicate) {
    return this.#array.findIndex(predicate);
  }
  findLast(predicate) {
    return this.#array.findLast(predicate);
  }
  findLastIndex(predicate) {
    return this.#array.findLastIndex(predicate);
  }
  forEach(callback) {
    this.#array.forEach(callback);
  }
  includes(value, start) {
    return this.#array.includes(value, start);
  }
  indexOf(value, start) {
    return this.#array.indexOf(value, start);
  }
  join(separator) {
    return this.#array.join(separator);
  }
  keys() {
    return this.#array.keys();
  }
  lastIndexOf(value, start) {
    return this.#array.lastIndexOf(value, start);
  }
  map(callback) {
    return this.#array.map(callback);
  }
  reduce(callback, initialValue) {
    return this.#array.reduce(callback, initialValue);
  }
  reduceRight(callback, initialValue) {
    return this.#array.reduceRight(callback, initialValue);
  }
  reverse() {
    this.#array.reverse();
  }
  set(array, offset) {
    this.#array.set(array, offset);
  }
  slice(start, end) {
    return this.#array.slice(start, end);
  }
  some(predicate) {
    return this.#array.some(predicate);
  }
  sort(compareFn) {
    this.#array.sort(compareFn);
  }
  subarray(begin, end) {
    return this.#array.subarray(begin, end);
  }
  toLocaleString(locales, options) {
    // @ts-ignore
    return this.#array.toLocaleString(locales, options);
  }
  toReversed() {
    return this.#array.toReversed();
  }
  toSorted(compareFn) {
    return this.#array.toSorted(compareFn);
  }
  toString() {
    return this.#array.toString();
  }
  values() {
    return this.#array.values();
  }
  with(index, value) {
    return this.#array.with(index, value);
  }
  [Symbol.iterator]() {
    return this.#array[Symbol.iterator]();
  }
}

// This class provides a DataView-like interface for a WebAssembly memory
// buffer, restricted to either Int32 or BigInt64 types. It also reacquires
// the underlying buffer when the WebAssembly memory is resized, which can
// happen when the memory is detached and resized by the WebAssembly module.
class DataViewProxy {
  #module;
  #type;

  #_view = new DataView(new ArrayBuffer(0));
  get #view() {
    if (this.#_view.buffer.byteLength === 0) {
      // WebAssembly memory resize detached the buffer so re-create the
      // view with the new buffer.
      this.#_view = new DataView(
        this.#module.HEAPU8.buffer,
        this.#module.HEAPU8.byteOffset + this.byteOffset);
    }
    return this.#_view;
  }

  /**
   * @param {*} module
   * @param {number} byteOffset 
   * @param {'Int32'|'BigInt64'} type
   */
  constructor(module, byteOffset, type) {
    this.#module = module;
    this.byteOffset = byteOffset;
    this.#type = type;
  }

  get buffer() {
    return this.#view.buffer;
  }
  get byteLength() {
    return this.#type === 'Int32' ? 4 : 8;
  }

  getInt32(byteOffset, littleEndian) {
    if (this.#type !== 'Int32') {
      throw new Error('invalid type');
    }
    if (!littleEndian) throw new Error('must be little endian');
    return this.#view.getInt32(byteOffset, littleEndian);
  }
  setInt32(byteOffset, value, littleEndian) {
    if (this.#type !== 'Int32') {
      throw new Error('invalid type');
    }
    if (!littleEndian) throw new Error('must be little endian');
    this.#view.setInt32(byteOffset, value, littleEndian);
  }
  getBigInt64(byteOffset, littleEndian) {
    if (this.#type !== 'BigInt64') {
      throw new Error('invalid type');
    }
    if (!littleEndian) throw new Error('must be little endian');
    return this.#view.getBigInt64(byteOffset, littleEndian);
  }
  setBigInt64(byteOffset, value, littleEndian) {
    if (this.#type !== 'BigInt64') {
      throw new Error('invalid type');
    }
    if (!littleEndian) throw new Error('must be little endian');
    this.#view.setBigInt64(byteOffset, value, littleEndian);
  }
}
````

## File: packages/wa-sqlite/src/jspi_exports.json
````json
[
  "sqlite3_close",
  "sqlite3_finalize",
  "sqlite3_open_v2",
  "sqlite3_prepare",
  "sqlite3_prepare16",
  "sqlite3_prepare_v2",
  "sqlite3_prepare16_v2",
  "sqlite3_prepare_v3",
  "sqlite3_prepare16_v3",
  "sqlite3_reset",
  "sqlite3_step"
]
````

## File: packages/wa-sqlite/src/libadapters.h
````
#ifndef __LIBADAPTERS_H__
#define __LIBADAPTERS_H__

// Declarations for synchronous and asynchronous JavaScript relay methods.
// The function name contains the C signature of the JavaScript function.
// The first two arguments of each relay method is the target (e.g. VFS)
// and method name (e.g. xOpen) to call. The remaining arguments are the
// parameters to the method.
//
// Relaying is necessary because Emscripten only allows calling a statically
// defined JavaScript function via a C function pointer.
#define P const void*
#define I int
#define J int64_t
#define DECLARE(TYPE, NAME, ...) \
  extern TYPE NAME(__VA_ARGS__); \
  extern TYPE NAME##_async(__VA_ARGS__);

DECLARE(I, ipp, P, P);
DECLARE(I, ippp, P, P, P);
DECLARE(void, vppp, P, P, P);
DECLARE(I, ipppj, P, P, P, J);
DECLARE(I, ipppi, P, P, P, I);
DECLARE(I, ipppp, P, P, P, P);
DECLARE(I, ipppip, P, P, P, I, P);
DECLARE(void, vpppip, P, P, P, I, P);
DECLARE(I, ippppi, P, P, P, P, I);
DECLARE(I, ipppiii, P, P, P, I, I, I);
DECLARE(I, ippppij, P, P, P, P, I, J);
DECLARE(I, ippppip, P, P, P, P, I, P);
DECLARE(I, ippipppp, P, P, I, P, P, P, P);
DECLARE(I, ipppppip, P, P, P, P, P, I, P);
DECLARE(I, ipppiiip, P, P, P, I, I, I, P);
DECLARE(void, vppippii, P, P, I, P, P, I, I);
#undef DECLARE
#undef P
#undef I
#undef J

#endif
````

## File: packages/wa-sqlite/src/libadapters.js
````javascript
// Method names for these signatures must be in src/asyncify_imports.json.
const SIGNATURES = [
  'ipp', // xProgress, xCommitHook
  'ippp', // xClose, xSectorSize, xDeviceCharacteristics
  'vppp', // xShmBarrier, xFinal
  'ipppj', // xTruncate
  'ipppi', // xSleep, xSync, xLock, xUnlock, xShmUnmap
  'ipppp', // xFileSize, xCheckReservedLock, xCurrentTime, xCurrentTimeInt64
  'ipppip', // xFileControl, xRandomness, xGetLastError
  'vpppip', // xFunc, xStep
  'ippppi', // xDelete
  'ippppij', // xRead, xWrite
  'ipppiii', // xShmLock
  'ippppip', // xAccess, xFullPathname
  'ippipppp', // xAuthorize
  'ipppppip', // xOpen
  'ipppiiip', // xShmMap
  'vppippii', // xUpdateHook
];

// This object will define the methods callable from WebAssembly.
// See https://emscripten.org/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html#implement-a-c-api-in-javascript
//
// At this writing, asynchronous JavaScript functions to be called from
// WebAssembly must be statically defined, i.e. they cannot be registered
// at runtime. The workaround here is to define synchronous and asynchronous
// relaying functions for each needed call signature.
//
// On the C side, calls are made to the relaying function with one or two
// prepended arguments - the first argument is a key to look up the callback
// object and the second argument is the name of the method if the callback
// object is not a function.
const adapters = {
  $adapters_support: function() {
    // @ts-ignore
    // Expose handleAsync to library code.
    const handleAsync = typeof Asyncify === 'object' ?
      Asyncify.handleAsync.bind(Asyncify) :
      null;
    Module['handleAsync'] = handleAsync;

    // This map contains the objects to which calls will be relayed, e.g.
    // a VFS. The key is typically the corresponding WebAssembly pointer.
    const targets = new Map();
    Module['setCallback'] = (key, target) => targets.set(key, target);
    Module['getCallback'] = key => targets.get(key);
    Module['deleteCallback'] = key => targets.delete(key);

    // @ts-ignore
    // Overwrite this function with the relay service function.
    adapters_support = function(isAsync, key, ...args) {
      // If the receiver found with the key is a function, just call it.
      // Otherwise, the next argument is the name of the method to be called.
      const receiver = targets.get(key);
      let methodName = null;
      const f = typeof receiver === 'function' ?
        receiver :
        receiver[methodName = UTF8ToString(args.shift())];
      
      if (isAsync) {
        // Call async function via handleAsync. This works for both
        // Asyncify and JSPI builds.
        if (handleAsync) {
          return handleAsync(() => f.apply(receiver, args));
        }
        throw new Error('Synchronous WebAssembly cannot call async function');
      }

      // The function should not be async so call it directly.
      const result = f.apply(receiver, args);
      if (typeof result?.then == 'function') {
        console.error('unexpected Promise', f);
        throw new Error(`${methodName} unexpectedly returned a Promise`);
      }
      return result;
    };
  },
  $adapters_support__deps: ['$UTF8ToString'],
  $adapters_support__postset: 'adapters_support();',
};

function injectMethod(signature, isAsync) {
  const method = `${signature}${isAsync ? '_async' : ''}`;
  adapters[`${method}`] = isAsync ?
    // @ts-ignore
    function(...args) { return adapters_support(true, ...args) } :
    // @ts-ignore
    function(...args) { return adapters_support(false, ...args) };
  adapters[`${method}__deps`] = ['$adapters_support'];
  adapters[`${method}__async`] = isAsync;

  // Emscripten "legalizes" 64-bit integer arguments by passing them as
  // two 32-bit signed integers.
  adapters[`${method}__sig`] = `${signature[0]}${signature.substring(1).replaceAll('j', 'ii')}`;
}

// For each function signature, inject a synchronous and asynchronous
// relaying method definition.
for (const signature of SIGNATURES) {
  injectMethod(signature, false);
  injectMethod(signature, true);
}

// @ts-ignore
addToLibrary(adapters);
````

## File: packages/wa-sqlite/src/libauthorizer.c
````cpp
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
#include <stdio.h>
#include <emscripten.h>
#include <sqlite3.h>

#include "libadapters.h"

#define CALL_JS(SIGNATURE, KEY, ...) \
  (asyncFlags ? \
    SIGNATURE##_async(KEY, __VA_ARGS__) : \
    SIGNATURE(KEY, __VA_ARGS__))

static int libauthorizer_xAuthorize(
  void* pApp,
  int iAction,
  const char* param3,
  const char* param4,
  const char* param5,
  const char* param6) {
  const int asyncFlags = pApp ? *(int *)pApp : 0;
  return CALL_JS(ippipppp, pApp, pApp, iAction, param3, param4, param5, param6);
}

int EMSCRIPTEN_KEEPALIVE libauthorizer_set_authorizer(
  sqlite3* db,
  int xAuthorizer,
  void* pApp) {
  return sqlite3_set_authorizer(
    db,
    xAuthorizer ? &libauthorizer_xAuthorize : NULL,
    pApp);
}
````

## File: packages/wa-sqlite/src/libauthorizer.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
// This file should be included in the build with --post-js.

(function() {
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  let pAsyncFlags = 0;

  Module['set_authorizer'] = function(db, xAuthorizer, pApp) {
    if (pAsyncFlags) {
      Module['deleteCallback'](pAsyncFlags);
      Module['_sqlite3_free'](pAsyncFlags);
      pAsyncFlags = 0;
    }

    pAsyncFlags = Module['_sqlite3_malloc'](4);
    setValue(pAsyncFlags, xAuthorizer instanceof AsyncFunction ? 1 : 0, 'i32');

    const result = ccall(
      'libauthorizer_set_authorizer',
      'number',
      ['number', 'number', 'number'],
      [db, xAuthorizer ? 1 : 0, pAsyncFlags]);
    if (!result && xAuthorizer) {
      Module['setCallback'](pAsyncFlags, (_, iAction, p3, p4, p5, p6) => {
        return xAuthorizer(pApp, iAction, p3, p4, p5, p6);
      });
    }
    return result;
  };
})();
````

## File: packages/wa-sqlite/src/libfunction.c
````cpp
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
#include <stdio.h>
#include <string.h>
#include <strings.h>
#include <emscripten.h>
#include <sqlite3.h>

#include "libadapters.h"

enum {
  xFunc,
  xStep,
  xFinal
};

#define FUNC_JS(SIGNATURE, KEY, METHOD, ...) \
  (asyncFlags & (1 << METHOD) ? \
    SIGNATURE##_async(KEY, #METHOD, __VA_ARGS__) : \
    SIGNATURE(KEY, #METHOD, __VA_ARGS__))

static void libfunction_xFunc(sqlite3_context* ctx, int argc, sqlite3_value** argv) {
  const void* pApp = sqlite3_user_data(ctx);
  const int asyncFlags = pApp ? *(int *)pApp : 0;
  FUNC_JS(vpppip, pApp, xFunc, ctx, argc, argv);
}

static void libfunction_xStep(sqlite3_context* ctx, int argc, sqlite3_value** argv) {
  const void* pApp = sqlite3_user_data(ctx);
  const int asyncFlags = pApp ? *(int *)pApp : 0;
  FUNC_JS(vpppip, pApp, xStep, ctx, argc, argv);
}

static void libfunction_xFinal(sqlite3_context* ctx) {
  const void* pApp = sqlite3_user_data(ctx);
  const int asyncFlags = pApp ? *(int *)pApp : 0;
  FUNC_JS(vppp, pApp, xFinal, ctx);
}

int EMSCRIPTEN_KEEPALIVE libfunction_create_function(
  sqlite3* db,
  const char* zFunctionName,
  int nArg,
  int eTextRep,
  void* pApp,
  void* xFunc,
  void* xStep,
  void* xFinal) {
  return sqlite3_create_function_v2(
    db,
    zFunctionName,
    nArg,
    eTextRep,
    pApp,
    xFunc ? &libfunction_xFunc : NULL,
    xStep ? &libfunction_xStep : NULL,
    xFinal ? &libfunction_xFinal : NULL,
    &sqlite3_free);
}
````

## File: packages/wa-sqlite/src/libfunction.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
// This file should be included in the build with --post-js.

(function() {
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

  // This list of methods must match exactly with libfunction.c.
  const FUNC_METHODS = [
    'xFunc',
    'xStep',
    'xFinal'
  ];

  const mapFunctionNameToKey = new Map();

  Module['create_function'] = function(db, zFunctionName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
    // Allocate some memory to store the async flags. In addition, this
    // pointer is passed to SQLite as the application data (the user's
    // application data is ignored), and is used to look up the JavaScript
    // target object.
    const pAsyncFlags = Module['_sqlite3_malloc'](4);
    const target = { xFunc, xStep, xFinal };
    setValue(pAsyncFlags, FUNC_METHODS.reduce((mask, method, i) => {
      if (target[method] instanceof AsyncFunction) {
        return mask | 1 << i;
      }
      return mask;
    }, 0), 'i32');

    const result = ccall(
      'libfunction_create_function',
      'number',
      ['number', 'string', 'number', 'number', 'number', 'number', 'number', 'number'],
      [
        db,
        zFunctionName,
        nArg,
        eTextRep,
        pAsyncFlags,
        xFunc ? 1 : 0,
        xStep ? 1 : 0,
        xFinal? 1 : 0
      ]);
    if (!result) {
      if (mapFunctionNameToKey.has(zFunctionName)) {
        // Reclaim the old resources used with this name.
        const oldKey = mapFunctionNameToKey.get(zFunctionName);
        Module['deleteCallback'](oldKey);
      }
      mapFunctionNameToKey.set(zFunctionName, pAsyncFlags);
      Module['setCallback'](pAsyncFlags, { xFunc, xStep, xFinal });
    }
    return result;
  };
})();
````

## File: packages/wa-sqlite/src/libhook.c
````cpp
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
#include <stdio.h>
#include <emscripten.h>
#include <sqlite3.h>

#include "libadapters.h"

#define CALL_JS(SIGNATURE, KEY, ...) \
  (asyncFlags ? \
    SIGNATURE##_async(KEY, __VA_ARGS__) : \
    SIGNATURE(KEY, __VA_ARGS__))

static int libhook_xCommitHook(void* pApp) {
  const int asyncFlags = pApp ? *(int *)pApp : 0;
  return CALL_JS(ipp, pApp, pApp);
}

static void libhook_xUpdateHook(
  void* pApp,
  int iUpdateType,
  const char* dbName,
  const char* tblName,
  sqlite3_int64 rowid) {
  int hi32 = ((rowid & 0xFFFFFFFF00000000LL) >> 32);
  int lo32 = (rowid & 0xFFFFFFFFLL);
  const int asyncFlags = pApp ? *(int *)pApp : 0;
  CALL_JS(vppippii, pApp, pApp, iUpdateType, dbName, tblName, lo32, hi32);
}

void EMSCRIPTEN_KEEPALIVE libhook_commit_hook(sqlite3* db, int xCommitHook, void* pApp) {
  sqlite3_commit_hook(db, xCommitHook ? &libhook_xCommitHook : NULL, pApp);
}

void EMSCRIPTEN_KEEPALIVE libhook_update_hook(sqlite3* db, int xUpdateHook, void* pApp) {
  sqlite3_update_hook(db, xUpdateHook ? &libhook_xUpdateHook : NULL, pApp);
}
````

## File: packages/wa-sqlite/src/libhook.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
// This file should be included in the build with --post-js.

(function() {
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  let pAsyncFlags = 0;

  Module['update_hook'] = function(db, xUpdateHook) {
    if (pAsyncFlags) {
      Module['deleteCallback'](pAsyncFlags);
      Module['_sqlite3_free'](pAsyncFlags);
      pAsyncFlags = 0;
    }

    pAsyncFlags = Module['_sqlite3_malloc'](4);
    setValue(pAsyncFlags, xUpdateHook instanceof AsyncFunction ? 1 : 0, 'i32');

    ccall(
      'libhook_update_hook',
      'void',
      ['number', 'number', 'number'],
      [db, xUpdateHook ? 1 : 0, pAsyncFlags]);
    if (xUpdateHook) {
      Module['setCallback'](pAsyncFlags, (_, iUpdateType, dbName, tblName, lo32, hi32) => {
        return xUpdateHook(iUpdateType, dbName, tblName, lo32, hi32);
      });
    }
  };
})();

(function() {
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  let pAsyncFlags = 0;

  Module['commit_hook'] = function(db, xCommitHook) {
    if (pAsyncFlags) {
      Module['deleteCallback'](pAsyncFlags);
      Module['_sqlite3_free'](pAsyncFlags);
      pAsyncFlags = 0;
    }

    pAsyncFlags = Module['_sqlite3_malloc'](4);
    setValue(pAsyncFlags, xCommitHook instanceof AsyncFunction ? 1 : 0, 'i32');

    ccall(
      'libhook_commit_hook',
      'void',
      ['number', 'number', 'number'],
      [db, xCommitHook ? 1 : 0, pAsyncFlags]);
    if (xCommitHook) {
      Module['setCallback'](pAsyncFlags, (_) => {
        return xCommitHook();
      });
    }
  };
})();
````

## File: packages/wa-sqlite/src/libprogress.c
````cpp
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
#include <stdio.h>
#include <emscripten.h>
#include <sqlite3.h>

#include "libadapters.h"

#define PROGRESS_JS(SIGNATURE, KEY, ...) \
  (asyncFlags ? \
    SIGNATURE##_async(KEY, __VA_ARGS__) : \
    SIGNATURE(KEY, __VA_ARGS__))

static int libprogress_xProgress(void* pApp) {
  const int asyncFlags = pApp ? *(int *)pApp : 0;
  return PROGRESS_JS(ipp, pApp, pApp);
}

void EMSCRIPTEN_KEEPALIVE libprogress_progress_handler(
  sqlite3* db,
  int nOps,
  int xProgress,
  void* pApp) {
  sqlite3_progress_handler(
    db,
    nOps,
    xProgress ? &libprogress_xProgress : NULL,
    pApp);
}
````

## File: packages/wa-sqlite/src/libprogress.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
// This file should be included in the build with --post-js.

(function() {
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  let pAsyncFlags = 0;

  Module['progress_handler'] = function(db, nOps, xProgress, pApp) {
    if (pAsyncFlags) {
      Module['deleteCallback'](pAsyncFlags);
      Module['_sqlite3_free'](pAsyncFlags);
      pAsyncFlags = 0;
    }

    pAsyncFlags = Module['_sqlite3_malloc'](4);
    setValue(pAsyncFlags, xProgress instanceof AsyncFunction ? 1 : 0, 'i32');

    ccall(
      'libprogress_progress_handler',
      'number',
      ['number', 'number', 'number', 'number'],
      [db, nOps, xProgress ? 1 : 0, pAsyncFlags]);
    if (xProgress) {
      Module['setCallback'](pAsyncFlags, _ => xProgress(pApp));
    }
  };
})();
````

## File: packages/wa-sqlite/src/libvfs.c
````cpp
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
#include <stdio.h>
#include <string.h>
#include <strings.h>
#include <emscripten.h>
#include <sqlite3.h>

#include "libadapters.h"

// This list of methods must match exactly with libvfs.js.
enum {
  xOpen,
  xDelete,
  xAccess,
  xFullPathname,
  xRandomness,
  xSleep,
  xCurrentTime,
  xGetLastError,
  xCurrentTimeInt64,

  xClose,
  xRead,
  xWrite,
  xTruncate,
  xSync,
  xFileSize,
  xLock,
  xUnlock,
  xCheckReservedLock,
  xFileControl,
  xSectorSize,
  xDeviceCharacteristics,
  xShmMap,
  xShmLock,
  xShmBarrier,
  xShmUnmap
};

// Attach extra information to the VFS and file objects.
typedef struct VFS {
  sqlite3_vfs base;
  int methodMask; // Bitmask of methods defined in JavaScript.
  int asyncMask;  // Bitmask of methods that are asynchronous.
} VFS;

typedef struct VFSFile {
  sqlite3_file base;
  VFS* pVfs; // Pointer back to the VFS.
} VFSFile;

#define VFS_JS(SIGNATURE, KEY, METHOD, ...) \
  (((VFS*)KEY)->asyncMask & (1 << METHOD) ? \
    SIGNATURE##_async(KEY, #METHOD, __VA_ARGS__) : \
    SIGNATURE(KEY, #METHOD, __VA_ARGS__))

static int libvfs_xClose(sqlite3_file* pFile) {
  return VFS_JS(ippp, ((VFSFile*)pFile)->pVfs, xClose, pFile);
}

static int libvfs_xRead(sqlite3_file* pFile, void* pData, int iAmt, sqlite3_int64 iOffset) {
  return VFS_JS(ippppij, ((VFSFile*)pFile)->pVfs, xRead, pFile, pData, iAmt, iOffset);
}

static int libvfs_xWrite(sqlite3_file* pFile, const void* pData, int iAmt, sqlite3_int64 iOffset) {
  return VFS_JS(ippppij, ((VFSFile*)pFile)->pVfs, xWrite, pFile, pData, iAmt, iOffset);
}

static int libvfs_xTruncate(sqlite3_file* pFile, sqlite3_int64 size) {
  return VFS_JS(ipppj, ((VFSFile*)pFile)->pVfs, xTruncate, pFile, size);
}

static int libvfs_xSync(sqlite3_file* pFile, int flags) {
  return VFS_JS(ipppi, ((VFSFile*)pFile)->pVfs, xSync, pFile, flags);
}

static int libvfs_xFileSize(sqlite3_file* pFile, sqlite3_int64* pSize) {
  return VFS_JS(ipppp, ((VFSFile*)pFile)->pVfs, xFileSize, pFile, pSize);
}

static int libvfs_xLock(sqlite3_file* pFile, int lockType) {
  return VFS_JS(ipppi, ((VFSFile*)pFile)->pVfs, xLock, pFile, lockType);
}

static int libvfs_xUnlock(sqlite3_file* pFile, int lockType) {
  return VFS_JS(ipppi, ((VFSFile*)pFile)->pVfs, xUnlock, pFile, lockType);
}

static int libvfs_xCheckReservedLock(sqlite3_file* pFile, int* pResOut) {
  return VFS_JS(ipppp, ((VFSFile*)pFile)->pVfs, xCheckReservedLock, pFile, pResOut);
}

static int libvfs_xFileControl(sqlite3_file* pFile, int flags, void* pOut) {
  return VFS_JS(ipppip, ((VFSFile*)pFile)->pVfs, xFileControl, pFile, flags, pOut);
}

static int libvfs_xSectorSize(sqlite3_file* pFile) {
  return VFS_JS(ippp, ((VFSFile*)pFile)->pVfs, xSectorSize, pFile);
}

static int libvfs_xDeviceCharacteristics(sqlite3_file* pFile) {
  return VFS_JS(ippp, ((VFSFile*)pFile)->pVfs, xDeviceCharacteristics, pFile);
}

static int libvfs_xShmMap(sqlite3_file* pFile, int iPg, int pgsz, int unused, void volatile** p) {
  return VFS_JS(ipppiiip, ((VFSFile*)pFile)->pVfs, xShmMap, pFile, iPg, pgsz, unused, p);
}

static int libvfs_xShmLock(sqlite3_file* pFile, int offset, int n, int flags) {
  return VFS_JS(ipppiii, ((VFSFile*)pFile)->pVfs, xShmLock, pFile, offset, n, flags);
}

static void libvfs_xShmBarrier(sqlite3_file* pFile) {
  VFS_JS(vppp, ((VFSFile*)pFile)->pVfs, xShmBarrier, pFile);
}

static int libvfs_xShmUnmap(sqlite3_file* pFile, int deleteFlag) {
  return VFS_JS(ipppi, ((VFSFile*)pFile)->pVfs, xShmUnmap, pFile, deleteFlag);
}


static int libvfs_xOpen(sqlite3_vfs* pVfs, const char* zName, sqlite3_file* pFile, int flags, int* pOutFlags) {
  const int result = VFS_JS(ipppppip, pVfs, xOpen, pVfs, (void*)zName, pFile, flags, pOutFlags);

  VFS* pVfsExt = (VFS*)pVfs;
  sqlite3_io_methods* pMethods = (sqlite3_io_methods*)sqlite3_malloc(sizeof(sqlite3_io_methods));
  pMethods->iVersion = 2;
#define METHOD(NAME) pMethods->NAME = (pVfsExt->methodMask & (1 << NAME)) ? libvfs_##NAME : NULL
  METHOD(xClose);
  METHOD(xRead);
  METHOD(xWrite);
  METHOD(xTruncate);
  METHOD(xSync);
  METHOD(xFileSize);
  METHOD(xLock);
  METHOD(xUnlock);
  METHOD(xCheckReservedLock);
  METHOD(xFileControl);
  METHOD(xSectorSize);
  METHOD(xDeviceCharacteristics);
  METHOD(xShmMap);
  METHOD(xShmLock);
  METHOD(xShmBarrier);
  METHOD(xShmUnmap);
#undef METHOD
  pFile->pMethods = pMethods;
  ((VFSFile*)pFile)->pVfs = pVfsExt;
  return result;
}

static int libvfs_xDelete(sqlite3_vfs* pVfs, const char* zName, int syncDir) {
  return VFS_JS(ippppi, pVfs, xDelete, pVfs, zName, syncDir);
}

static int libvfs_xAccess(sqlite3_vfs* pVfs, const char* zName, int flags, int* pResOut) {
  return VFS_JS(ippppip, pVfs, xAccess, pVfs, zName, flags, pResOut);
}

static int libvfs_xFullPathname(sqlite3_vfs* pVfs, const char* zName, int nOut, char* zOut) {
  return VFS_JS(ippppip, pVfs, xFullPathname, pVfs, zName, nOut, zOut);
}

static int libvfs_xRandomness(sqlite3_vfs* pVfs, int nBuf, char* zBuf) {
  return VFS_JS(ipppip, pVfs, xRandomness, pVfs, nBuf, zBuf);
}

static int libvfs_xSleep(sqlite3_vfs* pVfs, int microseconds) {
  return VFS_JS(ipppi, pVfs, xSleep, pVfs, microseconds);
}

static int libvfs_xCurrentTime(sqlite3_vfs* pVfs, double* pJulianDay) {
  return VFS_JS(ipppp, pVfs, xCurrentTime, pVfs, pJulianDay);
}

static int libvfs_xGetLastError(sqlite3_vfs* pVfs, int nBuf, char* zBuf) {
  return VFS_JS(ipppip, pVfs, xGetLastError, pVfs, nBuf, zBuf);
}

static int libvfs_xCurrentTimeInt64(sqlite3_vfs* pVfs, sqlite3_int64* pTime) {
  return VFS_JS(ipppp, pVfs, xCurrentTimeInt64, pVfs, pTime);
}

int EMSCRIPTEN_KEEPALIVE libvfs_vfs_register(
  const char* zName,
  int mxPathName,
  int methodMask,
  int asyncMask,
  int makeDefault,
  void** ppVfs) {
  // Get the current default VFS to use if methods are not defined.
  const sqlite3_vfs* backupVfs = sqlite3_vfs_find(NULL);

  // Allocate and populate the new VFS.
  VFS* vfs = (VFS*)sqlite3_malloc(sizeof(VFS));
  if (!vfs) return SQLITE_NOMEM;
  bzero(vfs, sizeof(VFS));

  vfs->base.iVersion = 2;
  vfs->base.szOsFile = sizeof(VFSFile);
  vfs->base.mxPathname = mxPathName;
  vfs->base.zName = strdup(zName);

  // The VFS methods go to the adapter implementations in this file,
  // or to the default VFS if the JavaScript method is not defined.
#define METHOD(NAME) vfs->base.NAME = \
  (methodMask & (1 << NAME)) ? libvfs_##NAME : backupVfs->NAME

  METHOD(xOpen);
  METHOD(xDelete);
  METHOD(xAccess);
  METHOD(xFullPathname);
  METHOD(xRandomness);
  METHOD(xSleep);
  METHOD(xCurrentTime);
  METHOD(xGetLastError);
  METHOD(xCurrentTimeInt64);
#undef METHOD

  vfs->methodMask = methodMask;
  vfs->asyncMask = asyncMask;

  *ppVfs = vfs;
  return sqlite3_vfs_register(&vfs->base, makeDefault);
}
````

## File: packages/wa-sqlite/src/libvfs.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
// This file should be included in the build with --post-js.

(function() {
  // This list of methods must match exactly with libvfs.c.
  const VFS_METHODS = [
    'xOpen',
    'xDelete',
    'xAccess',
    'xFullPathname',
    'xRandomness',
    'xSleep',
    'xCurrentTime',
    'xGetLastError',
    'xCurrentTimeInt64',

    'xClose',
    'xRead',
    'xWrite',
    'xTruncate',
    'xSync',
    'xFileSize',
    'xLock',
    'xUnlock',
    'xCheckReservedLock',
    'xFileControl',
    'xSectorSize',
    'xDeviceCharacteristics',
    'xShmMap',
    'xShmLock',
    'xShmBarrier',
    'xShmUnmap'
  ];

  const mapVFSNameToKey = new Map();

  Module['vfs_register'] = function(vfs, makeDefault) {
    // Determine which methods exist and which are asynchronous. This is
    // needed for the C wrapper to know which relaying function to call.
    let methodMask = 0;
    let asyncMask = 0;
    VFS_METHODS.forEach((method, i) => {
      if (vfs[method]) {
        methodMask |= 1 << i;
        if (vfs['hasAsyncMethod'](method)) {
          asyncMask |= 1 << i;
        }
      }
    });

    // Allocate space for libvfs_vfs_register to write the sqlite3_vfs
    // pointer. This pointer will be used to look up the JavaScript VFS
    // object.
    const vfsReturn = Module['_sqlite3_malloc'](4);
    try {
      // Call the C function that makes the sqlite3_vfs_register() call.
      const result = ccall(
        'libvfs_vfs_register',
        'number',
        ['string', 'number', 'number', 'number', 'number', 'number'],
        [vfs.name, vfs.mxPathname, methodMask, asyncMask, makeDefault ? 1 : 0, vfsReturn]);
      if (!result) {
        if (mapVFSNameToKey.has(vfs.name)) {
          // Reclaim the old resources used with this name.
          const oldKey = mapVFSNameToKey.get(vfs.name);
          Module['deleteCallback'](oldKey);
        }

        // Associate the sqlite3_vfs* pointer with the JavaScript VFS instance.
        const key = getValue(vfsReturn, '*');
        mapVFSNameToKey.set(vfs.name, key);
        Module['setCallback'](key, vfs);
      }
      return result;
    } finally {
      Module['_sqlite3_free'](vfsReturn);
    }
  };
})();
````

## File: packages/wa-sqlite/src/main.c
````cpp
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
#include <emscripten.h>
#include <sqlite3.h>

// Some SQLite API functions take a pointer to a function that frees
// memory. Although we could add a C binding to a JavaScript function
// that calls sqlite3_free(), it is more efficient to pass the sqlite3_free
// function pointer directly. This function provides the C pointer to
// JavaScript.
void* EMSCRIPTEN_KEEPALIVE getSqliteFree() {
  return sqlite3_free;
}

int main() {
  sqlite3_initialize();
  return 0;
}
````

## File: packages/wa-sqlite/src/sqlite-api.js
````javascript
// Copyright 2021 Roy T. Hashimoto. All Rights Reserved.

import * as SQLite from './sqlite-constants.js';
export * from './sqlite-constants.js';

const MAX_INT64 = 0x7fffffffffffffffn;
const MIN_INT64 = -0x8000000000000000n;

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

export class SQLiteError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const async = true;

/**
 * Builds a Javascript API from the Emscripten module. This API is still
 * low-level and closely corresponds to the C API exported by the module,
 * but differs in some specifics like throwing exceptions on errors.
 * @param {*} Module SQLite Emscripten module
 * @returns {SQLiteAPI}
 */
export function Factory(Module) {
  /** @type {SQLiteAPI} */ const sqlite3 = {};

  Module.retryOps = [];
  const sqliteFreeAddress = Module._getSqliteFree();

  // Allocate some space for 32-bit returned values.
  const tmp = Module._malloc(8);
  const tmpPtr = [tmp, tmp + 4];

  const textEncoder = new TextEncoder();
  // Convert a JS string to a C string. sqlite3_malloc is used to allocate
  // memory (use sqlite3_free to deallocate).
  function createUTF8(s) {
    if (typeof s !== 'string') return 0;
    const utf8 = textEncoder.encode(s);
    const zts = Module._sqlite3_malloc(utf8.byteLength + 1);
    Module.HEAPU8.set(utf8, zts);
    Module.HEAPU8[zts + utf8.byteLength] = 0;
    return zts;
  }

  /**
   * Concatenate 32-bit numbers into a 64-bit (signed) BigInt.
   * @param {number} lo32
   * @param {number} hi32
   * @returns {bigint}
   */
  function cvt32x2ToBigInt(lo32, hi32) {
    return (BigInt(hi32) << 32n) | (BigInt(lo32) & 0xffffffffn);
  }

  /**
   * Concatenate 32-bit numbers and return as number or BigInt, depending
   * on the value.
   * @param {number} lo32 
   * @param {number} hi32 
   * @returns {number|bigint}
   */
  const cvt32x2AsSafe = (function() {
    const hiMax = BigInt(Number.MAX_SAFE_INTEGER) >> 32n;
    const hiMin = BigInt(Number.MIN_SAFE_INTEGER) >> 32n;

    return function(lo32, hi32) {
      if (hi32 > hiMax || hi32 < hiMin) {
        // Can't be expressed as a Number so use BigInt.
        return cvt32x2ToBigInt(lo32, hi32);
      } else {
        // Combine the upper and lower 32-bit numbers. The complication is
        // that lo32 is a signed integer which makes manipulating its bits
        // a little tricky - the sign bit gets handled separately.
        return (hi32 * 0x100000000) + (lo32 & 0x7fffffff) - (lo32 & 0x80000000);
      }
    }
  })();

  const databases = new Set();
  function verifyDatabase(db) {
    if (!databases.has(db)) {
      throw new SQLiteError('not a database', SQLite.SQLITE_MISUSE);
    }
  }

  const mapStmtToDB = new Map();
  function verifyStatement(stmt) {
    if (!mapStmtToDB.has(stmt)) {
      throw new SQLiteError('not a statement', SQLite.SQLITE_MISUSE);
    }
  }

  sqlite3.bind_collection = function(stmt, bindings) {
    verifyStatement(stmt);
    const isArray = Array.isArray(bindings);
    const nBindings = sqlite3.bind_parameter_count(stmt);
    for (let i = 1; i <= nBindings; ++i) {
      const key = isArray ? i - 1 : sqlite3.bind_parameter_name(stmt, i);
      const value = bindings[key];
      if (value !== undefined) {
        sqlite3.bind(stmt, i, value);
      }
    }
    return SQLite.SQLITE_OK;
  };

  sqlite3.bind = function(stmt, i, value) {
    verifyStatement(stmt);
    switch (typeof value) {
      case 'number':
        if (value === (value | 0)) {
          return sqlite3.bind_int(stmt, i, value);
        } else {
          return sqlite3.bind_double(stmt, i, value);
        }
      case 'string':
        return sqlite3.bind_text(stmt, i, value);
      case "boolean":
        return sqlite3.bind_int(stmt, i, value ? 1 : 0);
      default:
        if (value instanceof Uint8Array || Array.isArray(value)) {
          return sqlite3.bind_blob(stmt, i, value);
        } else if (value === null) {
          return sqlite3.bind_null(stmt, i);
        } else if (typeof value === 'bigint') {
          return sqlite3.bind_int64(stmt, i, value);
        } else if (value === undefined) {
          // Existing binding (or NULL) will be used.
          return SQLite.SQLITE_NOTICE;
        } else {
          console.warn('unknown binding converted to null', value);
          return sqlite3.bind_null(stmt, i);
        }
    }
  };

  sqlite3.bind_blob = (function() {
    const fname = 'sqlite3_bind_blob';
    const f = Module.cwrap(fname, ...decl('nnnnn:n'));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      // @ts-ignore
      const byteLength = value.byteLength ?? value.length;
      const ptr = Module._sqlite3_malloc(byteLength);
      Module.HEAPU8.subarray(ptr).set(value);
      const result = f(stmt, i, ptr, byteLength, sqliteFreeAddress);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();

  sqlite3.bind_parameter_count = (function() {
    const fname = 'sqlite3_bind_parameter_count';
    const f = Module.cwrap(fname, ...decl('n:n'));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  })();

  sqlite3.bind_double = (function() {
    const fname = 'sqlite3_bind_double';
    const f = Module.cwrap(fname, ...decl('nnn:n'));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const result = f(stmt, i, value);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();

  sqlite3.bind_int = (function() {
    const fname = 'sqlite3_bind_int';
    const f = Module.cwrap(fname, ...decl('nnn:n'));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      if (value > 0x7fffffff || value < -0x80000000) return SQLite.SQLITE_RANGE;

      const result = f(stmt, i, value);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();

  sqlite3.bind_int64 = (function() {
    const fname = 'sqlite3_bind_int64';
    const f = Module.cwrap(fname, ...decl('nnnn:n'));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      if (value > MAX_INT64 || value < MIN_INT64) return SQLite.SQLITE_RANGE;

      const lo32 = value & 0xffffffffn;
      const hi32 = value >> 32n;
      const result = f(stmt, i, Number(lo32), Number(hi32));
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();

  sqlite3.bind_null = (function() {
    const fname = 'sqlite3_bind_null';
    const f = Module.cwrap(fname, ...decl('nn:n'));
    return function(stmt, i) {
      verifyStatement(stmt);
      const result = f(stmt, i);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();

  sqlite3.bind_parameter_name = (function() {
    const fname = 'sqlite3_bind_parameter_name';
    const f = Module.cwrap(fname, ...decl('n:s'));
    return function(stmt, i) {
      verifyStatement(stmt);
      const result = f(stmt, i);
      return result;
    };
  })();

  sqlite3.bind_text = (function() {
    const fname = 'sqlite3_bind_text';
    const f = Module.cwrap(fname, ...decl('nnnnn:n'));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const ptr = createUTF8(value);
      const result = f(stmt, i, ptr, -1, sqliteFreeAddress);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();

  sqlite3.changes = (function() {
    const fname = 'sqlite3_changes';
    const f = Module.cwrap(fname, ...decl('n:n'));
    return function(db) {
      verifyDatabase(db);
      const result = f(db);
      return result;
    };
  })();

  sqlite3.clear_bindings = (function() {
    const fname = 'sqlite3_clear_bindings';
    const f = Module.cwrap(fname, ...decl('n:n'));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();
  
  sqlite3.close = (function() {
    const fname = 'sqlite3_close';
    const f = Module.cwrap(fname, ...decl('n:n'), { async });
    return async function(db) {
      verifyDatabase(db);
      const result = await f(db);
      databases.delete(db);
      return check(fname, result, db);
    };
  })();

  sqlite3.column = function(stmt, iCol) {
    verifyStatement(stmt);
    const type = sqlite3.column_type(stmt, iCol);
    switch (type) {
      case SQLite.SQLITE_BLOB:
        return sqlite3.column_blob(stmt, iCol);
      case SQLite.SQLITE_FLOAT:
        return sqlite3.column_double(stmt, iCol);
      case SQLite.SQLITE_INTEGER:
        const lo32 = sqlite3.column_int(stmt, iCol);
        const hi32 = Module.getTempRet0();
        return cvt32x2AsSafe(lo32, hi32);
      case SQLite.SQLITE_NULL:
        return null;
      case SQLite.SQLITE_TEXT:
        return sqlite3.column_text(stmt, iCol);
      default:
        throw new SQLiteError('unknown type', type);
    }
  };

  sqlite3.column_blob = (function() {
    const fname = 'sqlite3_column_blob';
    const f = Module.cwrap(fname, ...decl('nn:n'));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const nBytes = sqlite3.column_bytes(stmt, iCol);
      const address = f(stmt, iCol);
      const result = Module.HEAPU8.subarray(address, address + nBytes);
      return result;
    };
  })();

  sqlite3.column_bytes = (function() {
    const fname = 'sqlite3_column_bytes';
    const f = Module.cwrap(fname, ...decl('nn:n'));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  })();

  sqlite3.column_count = (function() {
    const fname = 'sqlite3_column_count';
    const f = Module.cwrap(fname, ...decl('n:n'));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  })();

  sqlite3.column_double = (function() {
    const fname = 'sqlite3_column_double';
    const f = Module.cwrap(fname, ...decl('nn:n'));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  })();

  sqlite3.column_int = (function() {
    // Retrieve int64 but use only the lower 32 bits. The upper 32-bits are
    // accessible with Module.getTempRet0().
    const fname = 'sqlite3_column_int64';
    const f = Module.cwrap(fname, ...decl('nn:n'));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  })();

  sqlite3.column_int64 = (function() {
    const fname = 'sqlite3_column_int64';
    const f = Module.cwrap(fname, ...decl('nn:n'));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const lo32 = f(stmt, iCol);
      const hi32 = Module.getTempRet0();
      const result = cvt32x2ToBigInt(lo32, hi32);
      return result;
    };
  })();

  sqlite3.column_name = (function() {
    const fname = 'sqlite3_column_name';
    const f = Module.cwrap(fname, ...decl('nn:s'));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  })();

  sqlite3.column_names = function(stmt) {
    const columns = [];
    const nColumns = sqlite3.column_count(stmt);
    for (let i = 0; i < nColumns; ++i) {
      columns.push(sqlite3.column_name(stmt, i));
    }
    return columns;
  };

  sqlite3.column_text = (function() {
    const fname = 'sqlite3_column_text';
    const f = Module.cwrap(fname, ...decl('nn:s'));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  })();

  sqlite3.column_type = (function() {
    const fname = 'sqlite3_column_type';
    const f = Module.cwrap(fname, ...decl('nn:n'));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  })();

  sqlite3.create_function = function(db, zFunctionName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
    verifyDatabase(db);
    
    // Convert SQLite callback arguments to JavaScript-friendly arguments.
    function adapt(f) {
      return f instanceof AsyncFunction ?
        (async (ctx, n, values) => f(ctx, Module.HEAP32.subarray(values / 4, values / 4 + n))) :
        ((ctx, n, values) => f(ctx, Module.HEAP32.subarray(values / 4, values / 4 + n)));
    }

    const result = Module.create_function(
      db,
      zFunctionName,
      nArg,
      eTextRep,
      pApp,
      xFunc && adapt(xFunc),
      xStep && adapt(xStep),
      xFinal);
    return check('sqlite3_create_function', result, db);
  };

  sqlite3.data_count = (function() {
    const fname = 'sqlite3_data_count';
    const f = Module.cwrap(fname, ...decl('n:n'));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  })();

  sqlite3.exec = async function(db, sql, callback) {
    for await (const stmt of sqlite3.statements(db, sql)) {
      let columns;
      while (await sqlite3.step(stmt) === SQLite.SQLITE_ROW) {
        if (callback) {
          columns = columns ?? sqlite3.column_names(stmt);
          const row = sqlite3.row(stmt);
          await callback(row, columns);
        }
      }
    }
    return SQLite.SQLITE_OK;
  };

  sqlite3.finalize = (function() {
    const fname = 'sqlite3_finalize';
    const f = Module.cwrap(fname, ...decl('n:n'), { async });
    return async function(stmt) {
      const result = await f(stmt);
      mapStmtToDB.delete(stmt)

      // Don't throw on error here. Typically the error has already been
      // thrown and finalize() is part of the cleanup.
      return result;
    };
  })();

  sqlite3.get_autocommit = (function() {
    const fname = 'sqlite3_get_autocommit';
    const f = Module.cwrap(fname, ...decl('n:n'));
    return function(db) {
      const result = f(db);
      return result;
    };
  })();

  sqlite3.libversion = (function() {
    const fname = 'sqlite3_libversion';
    const f = Module.cwrap(fname, ...decl(':s'));
    return function() {
      const result = f();
      return result;
    };
  })();

  sqlite3.libversion_number = (function() {
    const fname = 'sqlite3_libversion_number';
    const f = Module.cwrap(fname, ...decl(':n'));
    return function() {
      const result = f();
      return result;
    };
  })();

  sqlite3.limit = (function() {
    const fname = 'sqlite3_limit';
    const f = Module.cwrap(fname, ...decl('nnn:n'));
    return function(db, id, newVal) {
      const result = f(db, id, newVal);
      return result;
    };
  })();

  sqlite3.open_v2 = (function() {
    const fname = 'sqlite3_open_v2';
    const f = Module.cwrap(fname, ...decl('snnn:n'), { async });
    return async function(zFilename, flags, zVfs) {
      flags = flags || SQLite.SQLITE_OPEN_CREATE | SQLite.SQLITE_OPEN_READWRITE;
      zVfs = createUTF8(zVfs);
      try {
        // Allow retry operations.
        const rc = await retry(() => f(zFilename, tmpPtr[0], flags, zVfs));

        const db = Module.getValue(tmpPtr[0], '*');
        databases.add(db);

        Module.ccall('RegisterExtensionFunctions', 'void', ['number'], [db]);
        check(fname, rc);
        return db;
      } finally {
        Module._sqlite3_free(zVfs);
      }
    };
  })();

  sqlite3.progress_handler = function(db, nProgressOps, handler, userData) {
    verifyDatabase(db);
    Module.progress_handler(db, nProgressOps, handler, userData);
  };;

  sqlite3.reset = (function() {
    const fname = 'sqlite3_reset';
    const f = Module.cwrap(fname, ...decl('n:n'), { async });
    return async function(stmt) {
      verifyStatement(stmt);
      const result = await f(stmt);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();

  sqlite3.result = function(context, value) {
    switch (typeof value) {
      case 'number':
        if (value === (value | 0)) {
          sqlite3.result_int(context, value);
        } else {
          sqlite3.result_double(context, value);
        }
        break;
      case 'string':
        sqlite3.result_text(context, value);
        break;
      default:
        if (value instanceof Uint8Array || Array.isArray(value)) {
          sqlite3.result_blob(context, value);
        } else if (value === null) {
          sqlite3.result_null(context);
        } else if (typeof value === 'bigint') {
          return sqlite3.result_int64(context, value);
        } else {
          console.warn('unknown result converted to null', value);
          sqlite3.result_null(context);
        }
        break;
    }

  };

  sqlite3.result_blob = (function() {
    const fname = 'sqlite3_result_blob';
    const f = Module.cwrap(fname, ...decl('nnnn:n'));
    return function(context, value) {
      // @ts-ignore
      const byteLength = value.byteLength ?? value.length;
      const ptr = Module._sqlite3_malloc(byteLength);
      Module.HEAPU8.subarray(ptr).set(value);
      f(context, ptr, byteLength, sqliteFreeAddress); // void return
    };
  })();

  sqlite3.result_double = (function() {
    const fname = 'sqlite3_result_double';
    const f = Module.cwrap(fname, ...decl('nn:n'));
    return function(context, value) {
      f(context, value); // void return
    };
  })();

  sqlite3.result_int = (function() {
    const fname = 'sqlite3_result_int';
    const f = Module.cwrap(fname, ...decl('nn:n'));
    return function(context, value) {
      f(context, value); // void return
    };
  })();

  sqlite3.result_int64 = (function() {
    const fname = 'sqlite3_result_int64';
    const f = Module.cwrap(fname, ...decl('nnn:n'));
    return function(context, value) {
      if (value > MAX_INT64 || value < MIN_INT64) return SQLite.SQLITE_RANGE;

      const lo32 = value & 0xffffffffn;
      const hi32 = value >> 32n;
      f(context, Number(lo32), Number(hi32)); // void return
    };
  })();

  sqlite3.result_null = (function() {
    const fname = 'sqlite3_result_null';
    const f = Module.cwrap(fname, ...decl('n:n'));
    return function(context) {
      f(context); // void return
    };
  })();

  sqlite3.result_text = (function() {
    const fname = 'sqlite3_result_text';
    const f = Module.cwrap(fname, ...decl('nnnn:n'));
    return function(context, value) {
      const ptr = createUTF8(value);
      f(context, ptr, -1, sqliteFreeAddress); // void return
    };
  })();

  sqlite3.row = function(stmt) {
    const row = [];
    const nColumns = sqlite3.data_count(stmt);
    for (let i = 0; i < nColumns; ++i) {
      const value = sqlite3.column(stmt, i);

      // Copy blob if aliasing volatile WebAssembly memory. This avoids an
      // unnecessary copy if users monkey patch column_blob to copy.
      // @ts-ignore
      row.push(value?.buffer === Module.HEAPU8.buffer ? value.slice() : value);
    }
    return row;
  };

  sqlite3.set_authorizer = function(db, xAuth, pApp) {
    verifyDatabase(db);

    // Convert SQLite callback arguments to JavaScript-friendly arguments.
    function cvtArgs(_, iAction, p3, p4, p5, p6) {
      return [
        _,
        iAction,
        Module.UTF8ToString(p3),
        Module.UTF8ToString(p4),
        Module.UTF8ToString(p5),
        Module.UTF8ToString(p6)
      ];
    };
    function adapt(f) {
      return f instanceof AsyncFunction ?
        (async (_, iAction, p3, p4, p5, p6) => f(...cvtArgs(_, iAction, p3, p4, p5, p6))) :
        ((_, iAction, p3, p4, p5, p6) => f(...cvtArgs(_, iAction, p3, p4, p5, p6)));
    }

    const result = Module.set_authorizer(db, adapt(xAuth), pApp);
    return check('sqlite3_set_authorizer', result, db);
  };;
  
  sqlite3.sql = (function() {
    const fname = 'sqlite3_sql';
    const f = Module.cwrap(fname, ...decl('n:s'));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  })();

  sqlite3.statements = function(db, sql, options = {}) {
    const prepare = Module.cwrap(
      'sqlite3_prepare_v3',
      'number',
      ['number', 'number', 'number', 'number', 'number', 'number'],
      { async: true });

    return (async function*() {
      const onFinally = [];
      try {
        // Encode SQL string to UTF-8.
        const utf8 = textEncoder.encode(sql);

        // Copy encoded string to WebAssembly memory. The SQLite docs say
        // zero-termination is a minor optimization so add room for that.
        // Also add space for the statement handle and SQL tail pointer.
        const allocSize = utf8.byteLength - (utf8.byteLength % 4) + 12;
        const pzHead = Module._sqlite3_malloc(allocSize);
        const pzEnd = pzHead + utf8.byteLength + 1;
        onFinally.push(() => Module._sqlite3_free(pzHead));
        Module.HEAPU8.set(utf8, pzHead);
        Module.HEAPU8[pzEnd - 1] = 0;
  
        // Use extra space for the statement handle and SQL tail pointer.
        const pStmt = pzHead + allocSize - 8;
        const pzTail = pzHead + allocSize - 4;

        // Ensure that statement handles are not leaked.
        let stmt;
        function maybeFinalize() {
          if (stmt && !options.unscoped) {
            sqlite3.finalize(stmt);
          }
          stmt = 0;
        }
        onFinally.push(maybeFinalize);
        
        // Loop over statements.
        Module.setValue(pzTail, pzHead, '*');
        do {
          // Reclaim resources for the previous iteration.
          maybeFinalize();

          // Call sqlite3_prepare_v3() for the next statement.
          // Allow retry operations.
          const zTail = Module.getValue(pzTail, '*');
          const rc = await retry(() => {
            return prepare(
              db,
              zTail,
              pzEnd - pzTail,
              options.flags || 0,
              pStmt,
              pzTail);
          });

          if (rc !== SQLite.SQLITE_OK) {
            check('sqlite3_prepare_v3', rc, db);
          }
          
          stmt = Module.getValue(pStmt, '*');
          if (stmt) {
            mapStmtToDB.set(stmt, db);
            yield stmt;
          }
        } while (stmt);
      } finally {
        while (onFinally.length) {
          onFinally.pop()();
        }
      }
    })();
  };

  sqlite3.step = (function() {
    const fname = 'sqlite3_step';
    const f = Module.cwrap(fname, ...decl('n:n'), { async });
    return async function(stmt) {
      verifyStatement(stmt);

      // Allow retry operations.
      const rc = await retry(() => f(stmt));

      return check(fname, rc, mapStmtToDB.get(stmt), [SQLite.SQLITE_ROW, SQLite.SQLITE_DONE]);
    };
  })();

  sqlite3.commit_hook = function(db, xCommitHook) {
    verifyDatabase(db);
    Module.commit_hook(db, xCommitHook);
  };

  sqlite3.update_hook = function(db, xUpdateHook) {
    verifyDatabase(db);

    // Convert SQLite callback arguments to JavaScript-friendly arguments.
    function cvtArgs(iUpdateType, dbName, tblName, lo32, hi32) {
      return [
        iUpdateType,
        Module.UTF8ToString(dbName),
        Module.UTF8ToString(tblName),
		cvt32x2ToBigInt(lo32, hi32)
      ];
    };
    function adapt(f) {
      return f instanceof AsyncFunction ?
        (async (iUpdateType, dbName, tblName, lo32, hi32) => f(...cvtArgs(iUpdateType, dbName, tblName, lo32, hi32))) :
        ((iUpdateType, dbName, tblName, lo32, hi32) => f(...cvtArgs(iUpdateType, dbName, tblName, lo32, hi32)));
    }

    Module.update_hook(db, adapt(xUpdateHook));
  };;

  sqlite3.value = function(pValue) {
    const type = sqlite3.value_type(pValue);
    switch (type) {
      case SQLite.SQLITE_BLOB:
        return sqlite3.value_blob(pValue);
      case SQLite.SQLITE_FLOAT:
        return sqlite3.value_double(pValue);
      case SQLite.SQLITE_INTEGER:
        const lo32 = sqlite3.value_int(pValue);
        const hi32 = Module.getTempRet0();
        return cvt32x2AsSafe(lo32, hi32);
      case SQLite.SQLITE_NULL:
        return null;
      case SQLite.SQLITE_TEXT:
        return sqlite3.value_text(pValue);
      default:
        throw new SQLiteError('unknown type', type);
    }
  };

  sqlite3.value_blob = (function() {
    const fname = 'sqlite3_value_blob';
    const f = Module.cwrap(fname, ...decl('n:n'));
    return function(pValue) {
      const nBytes = sqlite3.value_bytes(pValue);
      const address = f(pValue);
      const result = Module.HEAPU8.subarray(address, address + nBytes);
      return result;
    };
  })();

  sqlite3.value_bytes = (function() {
    const fname = 'sqlite3_value_bytes';
    const f = Module.cwrap(fname, ...decl('n:n'));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  })();

  sqlite3.value_double = (function() {
    const fname = 'sqlite3_value_double';
    const f = Module.cwrap(fname, ...decl('n:n'));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  })();

  sqlite3.value_int = (function() {
    const fname = 'sqlite3_value_int64';
    const f = Module.cwrap(fname, ...decl('n:n'));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  })();

  sqlite3.value_int64 = (function() {
    const fname = 'sqlite3_value_int64';
    const f = Module.cwrap(fname, ...decl('n:n'));
    return function(pValue) {
      const lo32 = f(pValue);
      const hi32 = Module.getTempRet0();
      const result = cvt32x2ToBigInt(lo32, hi32);
      return result;
    };
  })();

  sqlite3.value_text = (function() {
    const fname = 'sqlite3_value_text';
    const f = Module.cwrap(fname, ...decl('n:s'));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  })();

  sqlite3.value_type = (function() {
    const fname = 'sqlite3_value_type';
    const f = Module.cwrap(fname, ...decl('n:n'));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  })();

  sqlite3.vfs_register = function(vfs, makeDefault) {
    const result = Module.vfs_register(vfs, makeDefault);
    return check('sqlite3_vfs_register', result);
  };

  function check(fname, result, db = null, allowed = [SQLite.SQLITE_OK]) {
    if (allowed.includes(result)) return result;
    const message = db ?
      Module.ccall('sqlite3_errmsg', 'string', ['number'], [db]) :
      fname;
    throw new SQLiteError(message, result);
  }

  // This function is used to automatically retry failed calls that
  // have pending retry operations that should allow the retry to
  // succeed.
  async function retry(f) {
    let rc;
    do {
      // Wait for all pending retry operations to complete. This is
      // normally empty on the first loop iteration.
      if (Module.retryOps.length) {
        await Promise.all(Module.retryOps);
        Module.retryOps = [];
      }
      
      rc = await f();

      // Retry on failure with new pending retry operations.
    } while (rc && Module.retryOps.length);
    return rc;
  }

  return sqlite3;
}

// Helper function to use a more compact signature specification.
function decl(s) {
  const result = [];
  const m = s.match(/([ns@]*):([nsv@])/);
  switch (m[2]) {
    case 'n': result.push('number'); break;
    case 's': result.push('string'); break;
    case 'v': result.push(null); break;
  }

  const args = [];
  for (let c of m[1]) {
    switch (c) {
      case 'n': args.push('number'); break;
      case 's': args.push('string'); break;
    }
  }
  result.push(args);
  return result;
}
````

## File: packages/wa-sqlite/src/sqlite-constants.js
````javascript
// Primary result codes.
// https://www.sqlite.org/rescode.html
export const SQLITE_OK = 0;
export const SQLITE_ERROR = 1;
export const SQLITE_INTERNAL = 2;
export const SQLITE_PERM = 3;
export const SQLITE_ABORT = 4;
export const SQLITE_BUSY = 5;
export const SQLITE_LOCKED = 6;
export const SQLITE_NOMEM = 7;
export const SQLITE_READONLY = 8;
export const SQLITE_INTERRUPT = 9;
export const SQLITE_IOERR = 10;
export const SQLITE_CORRUPT = 11;
export const SQLITE_NOTFOUND = 12;
export const SQLITE_FULL = 13;
export const SQLITE_CANTOPEN = 14;
export const SQLITE_PROTOCOL = 15;
export const SQLITE_EMPTY = 16;
export const SQLITE_SCHEMA = 17;
export const SQLITE_TOOBIG = 18;
export const SQLITE_CONSTRAINT = 19;
export const SQLITE_MISMATCH = 20;
export const SQLITE_MISUSE = 21;
export const SQLITE_NOLFS = 22;
export const SQLITE_AUTH = 23;
export const SQLITE_FORMAT = 24;
export const SQLITE_RANGE = 25;
export const SQLITE_NOTADB = 26;
export const SQLITE_NOTICE = 27;
export const SQLITE_WARNING = 28;
export const SQLITE_ROW = 100;
export const SQLITE_DONE = 101;

// Extended error codes.
export const SQLITE_IOERR_ACCESS = 3338;
export const SQLITE_IOERR_CHECKRESERVEDLOCK = 3594;
export const SQLITE_IOERR_CLOSE = 4106;
export const SQLITE_IOERR_DATA = 8202;
export const SQLITE_IOERR_DELETE = 2570;
export const SQLITE_IOERR_DELETE_NOENT = 5898;
export const SQLITE_IOERR_DIR_FSYNC = 1290;
export const SQLITE_IOERR_FSTAT = 1802;
export const SQLITE_IOERR_FSYNC = 1034;
export const SQLITE_IOERR_GETTEMPPATH = 6410;
export const SQLITE_IOERR_LOCK = 3850;
export const SQLITE_IOERR_NOMEM = 3082;
export const SQLITE_IOERR_READ = 266;
export const SQLITE_IOERR_RDLOCK = 2314;
export const SQLITE_IOERR_SEEK = 5642;
export const SQLITE_IOERR_SHORT_READ = 522;
export const SQLITE_IOERR_TRUNCATE = 1546;
export const SQLITE_IOERR_UNLOCK = 2058;
export const SQLITE_IOERR_VNODE = 6922;
export const SQLITE_IOERR_WRITE = 778;
export const SQLITE_IOERR_BEGIN_ATOMIC = 7434;
export const SQLITE_IOERR_COMMIT_ATOMIC = 7690;
export const SQLITE_IOERR_ROLLBACK_ATOMIC = 7946;

// Other extended result codes.
export const SQLITE_CONSTRAINT_CHECK = 275;
export const SQLITE_CONSTRAINT_COMMITHOOK = 531;
export const SQLITE_CONSTRAINT_FOREIGNKEY = 787;
export const SQLITE_CONSTRAINT_FUNCTION = 1043;
export const SQLITE_CONSTRAINT_NOTNULL = 1299;
export const SQLITE_CONSTRAINT_PINNED = 2835;
export const SQLITE_CONSTRAINT_PRIMARYKEY = 1555;
export const SQLITE_CONSTRAINT_ROWID = 2579;
export const SQLITE_CONSTRAINT_TRIGGER = 1811;
export const SQLITE_CONSTRAINT_UNIQUE = 2067;
export const SQLITE_CONSTRAINT_VTAB = 2323;

// Open flags.
// https://www.sqlite.org/c3ref/c_open_autoproxy.html
export const SQLITE_OPEN_READONLY = 0x00000001;
export const SQLITE_OPEN_READWRITE = 0x00000002;
export const SQLITE_OPEN_CREATE = 0x00000004;
export const SQLITE_OPEN_DELETEONCLOSE = 0x00000008;
export const SQLITE_OPEN_EXCLUSIVE = 0x00000010;
export const SQLITE_OPEN_AUTOPROXY = 0x00000020;
export const SQLITE_OPEN_URI = 0x00000040;
export const SQLITE_OPEN_MEMORY = 0x00000080;
export const SQLITE_OPEN_MAIN_DB = 0x00000100;
export const SQLITE_OPEN_TEMP_DB = 0x00000200;
export const SQLITE_OPEN_TRANSIENT_DB = 0x00000400;
export const SQLITE_OPEN_MAIN_JOURNAL = 0x00000800;
export const SQLITE_OPEN_TEMP_JOURNAL = 0x00001000;
export const SQLITE_OPEN_SUBJOURNAL = 0x00002000;
export const SQLITE_OPEN_SUPER_JOURNAL = 0x00004000;
export const SQLITE_OPEN_NOMUTEX = 0x00008000;
export const SQLITE_OPEN_FULLMUTEX = 0x00010000;
export const SQLITE_OPEN_SHAREDCACHE = 0x00020000;
export const SQLITE_OPEN_PRIVATECACHE = 0x00040000;
export const SQLITE_OPEN_WAL = 0x00080000;
export const SQLITE_OPEN_NOFOLLOW = 0x01000000;

// Locking levels.
// https://www.sqlite.org/c3ref/c_lock_exclusive.html
export const SQLITE_LOCK_NONE = 0;
export const SQLITE_LOCK_SHARED = 1;
export const SQLITE_LOCK_RESERVED = 2;
export const SQLITE_LOCK_PENDING = 3;
export const SQLITE_LOCK_EXCLUSIVE = 4;

// Device characteristics.
// https://www.sqlite.org/c3ref/c_iocap_atomic.html
export const SQLITE_IOCAP_ATOMIC = 0x00000001;
export const SQLITE_IOCAP_ATOMIC512 = 0x00000002;
export const SQLITE_IOCAP_ATOMIC1K = 0x00000004;
export const SQLITE_IOCAP_ATOMIC2K = 0x00000008;
export const SQLITE_IOCAP_ATOMIC4K = 0x00000010;
export const SQLITE_IOCAP_ATOMIC8K = 0x00000020;
export const SQLITE_IOCAP_ATOMIC16K = 0x00000040;
export const SQLITE_IOCAP_ATOMIC32K = 0x00000080;
export const SQLITE_IOCAP_ATOMIC64K = 0x00000100;
export const SQLITE_IOCAP_SAFE_APPEND = 0x00000200;
export const SQLITE_IOCAP_SEQUENTIAL = 0x00000400;
export const SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN = 0x00000800;
export const SQLITE_IOCAP_POWERSAFE_OVERWRITE = 0x00001000;
export const SQLITE_IOCAP_IMMUTABLE = 0x00002000;
export const SQLITE_IOCAP_BATCH_ATOMIC = 0x00004000;

// xAccess flags.
// https://www.sqlite.org/c3ref/c_access_exists.html
export const SQLITE_ACCESS_EXISTS = 0;
export const SQLITE_ACCESS_READWRITE = 1;
export const SQLITE_ACCESS_READ = 2;

// File control opcodes
// https://www.sqlite.org/c3ref/c_fcntl_begin_atomic_write.html#sqlitefcntlbeginatomicwrite
export const SQLITE_FCNTL_LOCKSTATE = 1; 
export const SQLITE_FCNTL_GET_LOCKPROXYFILE = 2; 
export const SQLITE_FCNTL_SET_LOCKPROXYFILE = 3; 
export const SQLITE_FCNTL_LAST_ERRNO = 4; 
export const SQLITE_FCNTL_SIZE_HINT = 5; 
export const SQLITE_FCNTL_CHUNK_SIZE = 6; 
export const SQLITE_FCNTL_FILE_POINTER = 7; 
export const SQLITE_FCNTL_SYNC_OMITTED = 8; 
export const SQLITE_FCNTL_WIN32_AV_RETRY = 9; 
export const SQLITE_FCNTL_PERSIST_WAL = 10; 
export const SQLITE_FCNTL_OVERWRITE = 11; 
export const SQLITE_FCNTL_VFSNAME = 12; 
export const SQLITE_FCNTL_POWERSAFE_OVERWRITE = 13; 
export const SQLITE_FCNTL_PRAGMA = 14; 
export const SQLITE_FCNTL_BUSYHANDLER = 15; 
export const SQLITE_FCNTL_TEMPFILENAME = 16; 
export const SQLITE_FCNTL_MMAP_SIZE = 18; 
export const SQLITE_FCNTL_TRACE = 19; 
export const SQLITE_FCNTL_HAS_MOVED = 20; 
export const SQLITE_FCNTL_SYNC = 21; 
export const SQLITE_FCNTL_COMMIT_PHASETWO = 22; 
export const SQLITE_FCNTL_WIN32_SET_HANDLE = 23; 
export const SQLITE_FCNTL_WAL_BLOCK = 24; 
export const SQLITE_FCNTL_ZIPVFS = 25; 
export const SQLITE_FCNTL_RBU = 26; 
export const SQLITE_FCNTL_VFS_POINTER = 27; 
export const SQLITE_FCNTL_JOURNAL_POINTER = 28; 
export const SQLITE_FCNTL_WIN32_GET_HANDLE = 29; 
export const SQLITE_FCNTL_PDB = 30; 
export const SQLITE_FCNTL_BEGIN_ATOMIC_WRITE = 31; 
export const SQLITE_FCNTL_COMMIT_ATOMIC_WRITE = 32; 
export const SQLITE_FCNTL_ROLLBACK_ATOMIC_WRITE = 33; 
export const SQLITE_FCNTL_LOCK_TIMEOUT = 34; 
export const SQLITE_FCNTL_DATA_VERSION = 35; 
export const SQLITE_FCNTL_SIZE_LIMIT = 36; 
export const SQLITE_FCNTL_CKPT_DONE = 37; 
export const SQLITE_FCNTL_RESERVE_BYTES = 38; 
export const SQLITE_FCNTL_CKPT_START = 39;

// Fundamental datatypes.
// https://www.sqlite.org/c3ref/c_blob.html
export const SQLITE_INTEGER = 1;
export const SQLITE_FLOAT = 2;
export const SQLITE_TEXT = 3;
export const SQLITE_BLOB = 4;
export const SQLITE_NULL = 5;

// Special destructor behavior.
// https://www.sqlite.org/c3ref/c_static.html
export const SQLITE_STATIC = 0;
export const SQLITE_TRANSIENT = -1;

// Text encodings.
// https://sqlite.org/c3ref/c_any.html
export const SQLITE_UTF8 = 1;     /* IMP: R-37514-35566 */
export const SQLITE_UTF16LE = 2;  /* IMP: R-03371-37637 */
export const SQLITE_UTF16BE = 3;  /* IMP: R-51971-34154 */
export const SQLITE_UTF16 = 4;    /* Use native byte order */

// Module constraint ops.
export const SQLITE_INDEX_CONSTRAINT_EQ        = 2;
export const SQLITE_INDEX_CONSTRAINT_GT        = 4;
export const SQLITE_INDEX_CONSTRAINT_LE        = 8;
export const SQLITE_INDEX_CONSTRAINT_LT        = 16;
export const SQLITE_INDEX_CONSTRAINT_GE        = 32;
export const SQLITE_INDEX_CONSTRAINT_MATCH     = 64;
export const SQLITE_INDEX_CONSTRAINT_LIKE      = 65;
export const SQLITE_INDEX_CONSTRAINT_GLOB      = 66;
export const SQLITE_INDEX_CONSTRAINT_REGEXP    = 67;
export const SQLITE_INDEX_CONSTRAINT_NE        = 68;
export const SQLITE_INDEX_CONSTRAINT_ISNOT     = 69;
export const SQLITE_INDEX_CONSTRAINT_ISNOTNULL = 70;
export const SQLITE_INDEX_CONSTRAINT_ISNULL    = 71;
export const SQLITE_INDEX_CONSTRAINT_IS        = 72;
export const SQLITE_INDEX_CONSTRAINT_FUNCTION  = 150;
export const SQLITE_INDEX_SCAN_UNIQUE          = 1;  /* Scan visits at most = 1 row */

// Function flags
export const SQLITE_DETERMINISTIC = 0x000000800;
export const SQLITE_DIRECTONLY    = 0x000080000;
export const SQLITE_SUBTYPE       = 0x000100000;
export const SQLITE_INNOCUOUS     = 0x000200000;

// Sync flags
export const SQLITE_SYNC_NORMAL   = 0x00002;
export const SQLITE_SYNC_FULL     = 0x00003;
export const SQLITE_SYNC_DATAONLY = 0x00010;

// Authorizer action codes
export const SQLITE_CREATE_INDEX        = 1;
export const SQLITE_CREATE_TABLE        = 2;
export const SQLITE_CREATE_TEMP_INDEX   = 3;
export const SQLITE_CREATE_TEMP_TABLE   = 4;
export const SQLITE_CREATE_TEMP_TRIGGER = 5;
export const SQLITE_CREATE_TEMP_VIEW    = 6;
export const SQLITE_CREATE_TRIGGER      = 7;
export const SQLITE_CREATE_VIEW         = 8;
export const SQLITE_DELETE              = 9;
export const SQLITE_DROP_INDEX          = 10;
export const SQLITE_DROP_TABLE          = 11;
export const SQLITE_DROP_TEMP_INDEX     = 12;
export const SQLITE_DROP_TEMP_TABLE     = 13;
export const SQLITE_DROP_TEMP_TRIGGER   = 14;
export const SQLITE_DROP_TEMP_VIEW      = 15;
export const SQLITE_DROP_TRIGGER        = 16;
export const SQLITE_DROP_VIEW           = 17;
export const SQLITE_INSERT              = 18;
export const SQLITE_PRAGMA              = 19;
export const SQLITE_READ                = 20;
export const SQLITE_SELECT              = 21;
export const SQLITE_TRANSACTION         = 22;
export const SQLITE_UPDATE              = 23;
export const SQLITE_ATTACH              = 24;
export const SQLITE_DETACH              = 25;
export const SQLITE_ALTER_TABLE         = 26;
export const SQLITE_REINDEX             = 27;
export const SQLITE_ANALYZE             = 28;
export const SQLITE_CREATE_VTABLE       = 29;
export const SQLITE_DROP_VTABLE         = 30;
export const SQLITE_FUNCTION            = 31;
export const SQLITE_SAVEPOINT           = 32;
export const SQLITE_COPY                = 0;
export const SQLITE_RECURSIVE           = 33;

// Authorizer return codes
export const SQLITE_DENY   = 1;
export const SQLITE_IGNORE = 2;

// Limit categories
export const SQLITE_LIMIT_LENGTH              = 0;
export const SQLITE_LIMIT_SQL_LENGTH          = 1;
export const SQLITE_LIMIT_COLUMN              = 2;
export const SQLITE_LIMIT_EXPR_DEPTH          = 3;
export const SQLITE_LIMIT_COMPOUND_SELECT     = 4;
export const SQLITE_LIMIT_VDBE_OP             = 5;
export const SQLITE_LIMIT_FUNCTION_ARG        = 6;
export const SQLITE_LIMIT_ATTACHED            = 7;
export const SQLITE_LIMIT_LIKE_PATTERN_LENGTH = 8;
export const SQLITE_LIMIT_VARIABLE_NUMBER     = 9;
export const SQLITE_LIMIT_TRIGGER_DEPTH       = 10;
export const SQLITE_LIMIT_WORKER_THREADS      = 11;

export const SQLITE_PREPARE_PERSISTENT = 0x01;
export const SQLITE_PREPARE_NORMALIZED = 0x02;
export const SQLITE_PREPARE_NO_VTAB = 0x04;
````

## File: packages/wa-sqlite/src/VFS.js
````javascript
// Copyright 2024 Roy T. Hashimoto. All Rights Reserved.
import * as VFS from './sqlite-constants.js';
export * from './sqlite-constants.js';

const DEFAULT_SECTOR_SIZE = 512;

// Base class for a VFS.
export class Base {
  name;
  mxPathname = 64;
  _module;

  /**
   * @param {string} name 
   * @param {object} module 
   */
  constructor(name, module) {
    this.name = name;
    this._module = module;
  }

  /**
   * @returns {void|Promise<void>} 
   */
  close() {
  }

  /**
   * @returns {boolean|Promise<boolean>}
   */
  isReady() {
    return true;
  }

  /**
   * Overload in subclasses to indicate which methods are asynchronous.
   * @param {string} methodName 
   * @returns {boolean}
   */
  hasAsyncMethod(methodName) {
    return false;
  }

  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} pFile 
   * @param {number} flags 
   * @param {number} pOutFlags 
   * @returns {number|Promise<number>}
   */
  xOpen(pVfs, zName, pFile, flags, pOutFlags) {
    return VFS.SQLITE_CANTOPEN;
  }

  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} syncDir 
   * @returns {number|Promise<number>}
   */
  xDelete(pVfs, zName, syncDir) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} flags 
   * @param {number} pResOut 
   * @returns {number|Promise<number>}
   */
  xAccess(pVfs, zName, flags, pResOut) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} nOut 
   * @param {number} zOut 
   * @returns {number|Promise<number>}
   */
  xFullPathname(pVfs, zName, nOut, zOut) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pVfs 
   * @param {number} nBuf 
   * @param {number} zBuf 
   * @returns {number|Promise<number>}
   */
  xGetLastError(pVfs, nBuf, zBuf) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  xClose(pFile) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @param {number} pData 
   * @param {number} iAmt 
   * @param {number} iOffsetLo 
   * @param {number} iOffsetHi 
   * @returns {number|Promise<number>}
   */
  xRead(pFile, pData, iAmt, iOffsetLo, iOffsetHi) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @param {number} pData 
   * @param {number} iAmt 
   * @param {number} iOffsetLo 
   * @param {number} iOffsetHi 
   * @returns {number|Promise<number>}
   */
  xWrite(pFile, pData, iAmt, iOffsetLo, iOffsetHi) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @param {number} sizeLo 
   * @param {number} sizeHi 
   * @returns {number|Promise<number>}
   */
  xTruncate(pFile, sizeLo, sizeHi) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @param {number} flags 
   * @returns {number|Promise<number>}
   */
  xSync(pFile, flags) {
    return VFS.SQLITE_OK;
  }

  /**
   * 
   * @param {number} pFile 
   * @param {number} pSize 
   * @returns {number|Promise<number>}
   */
  xFileSize(pFile, pSize) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @param {number} lockType 
   * @returns {number|Promise<number>}
   */
  xLock(pFile, lockType) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @param {number} lockType 
   * @returns {number|Promise<number>}
   */
  xUnlock(pFile, lockType) {
    return VFS.SQLITE_OK;
  } 

  /**
   * @param {number} pFile 
   * @param {number} pResOut 
   * @returns {number|Promise<number>}
   */
  xCheckReservedLock(pFile, pResOut) {
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} pFile 
   * @param {number} op 
   * @param {number} pArg 
   * @returns {number|Promise<number>}
   */
  xFileControl(pFile, op, pArg) {
    return VFS.SQLITE_NOTFOUND;
  }

  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  xSectorSize(pFile) {
    return DEFAULT_SECTOR_SIZE;
  }

  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  xDeviceCharacteristics(pFile) {
    return 0;
  }
}

export const FILE_TYPE_MASK = [
  VFS.SQLITE_OPEN_MAIN_DB,
  VFS.SQLITE_OPEN_MAIN_JOURNAL,
  VFS.SQLITE_OPEN_TEMP_DB,
  VFS.SQLITE_OPEN_TEMP_JOURNAL,
  VFS.SQLITE_OPEN_TRANSIENT_DB,
  VFS.SQLITE_OPEN_SUBJOURNAL,
  VFS.SQLITE_OPEN_SUPER_JOURNAL,
  VFS.SQLITE_OPEN_WAL
].reduce((mask, element) => mask | element);
````

## File: packages/wa-sqlite/src/WebLocksMixin.js
````javascript
import * as VFS from './VFS.js';

// Options for navigator.locks.request().
/** @type {LockOptions} */ const SHARED = { mode: 'shared' };
/** @type {LockOptions} */ const POLL_SHARED = { ifAvailable: true, mode: 'shared' };
/** @type {LockOptions} */ const POLL_EXCLUSIVE = { ifAvailable: true, mode: 'exclusive' };

const POLICIES = ['exclusive', 'shared', 'shared+hint'];

/**
 * @typedef LockState
 * @property {string} baseName
 * @property {number} type
 * @property {boolean} writeHint
 * 
 * These properties are functions that release a specific lock.
 * @property {(() => void)?} [gate]
 * @property {(() => void)?} [access]
 * @property {(() => void)?} [reserved]
 * @property {(() => void)?} [hint]
 */

/**
 * Mix-in for FacadeVFS that implements the SQLite VFS locking protocol.
 * @param {*} superclass FacadeVFS (or subclass)
 * @returns 
 */
export const WebLocksMixin = superclass => class extends superclass {
  #options = {
    lockPolicy: 'exclusive',
    lockTimeout: Infinity
  };

  /** @type {Map<number, LockState>} */ #mapIdToState = new Map();

  constructor(name, module, options) {
    super(name, module, options);
    Object.assign(this.#options, options);
    if (POLICIES.indexOf(this.#options.lockPolicy) === -1) {
      throw new Error(`WebLocksMixin: invalid lock mode: ${options.lockPolicy}`);
    }
  }

  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {Promise<number>}
   */
  async jLock(fileId, lockType) {
    try {
      // Create state on first lock.
      if (!this.#mapIdToState.has(fileId)) {
        const name = this.getFilename(fileId);
        const state = {
          baseName: name,
          type: VFS.SQLITE_LOCK_NONE,
          writeHint: false
        };
        this.#mapIdToState.set(fileId, state);
      }

      const lockState = this.#mapIdToState.get(fileId);
      if (lockType <= lockState.type) return VFS.SQLITE_OK;
  
      switch (this.#options.lockPolicy) {
        case 'exclusive':
          return await this.#lockExclusive(lockState, lockType);
        case 'shared':
        case 'shared+hint':
          return await this.#lockShared(lockState, lockType);
      }
    } catch (e) {
      console.error('WebLocksMixin: lock error', e);
      return VFS.SQLITE_IOERR_LOCK;
    }
  }
  
  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {Promise<number>}
   */
  async jUnlock(fileId, lockType) {
    try {
      // SQLite can call xUnlock() without ever calling xLock() so
      // the state may not exist.
      const lockState = this.#mapIdToState.get(fileId);
      if (!(lockType < lockState?.type)) return VFS.SQLITE_OK;
  
      switch (this.#options.lockPolicy) {
        case 'exclusive':
          return await this.#unlockExclusive(lockState, lockType);
        case 'shared':
        case 'shared+hint':
            return await this.#unlockShared(lockState, lockType);
      }
    } catch (e) {
      console.error('WebLocksMixin: unlock error', e);
      return VFS.SQLITE_IOERR_UNLOCK;
    }
  }

  /**
   * @param {number} fileId 
   * @param {DataView} pResOut 
   * @returns {Promise<number>}
   */
  async jCheckReservedLock(fileId, pResOut) {
    try {
      const lockState = this.#mapIdToState.get(fileId);
      switch (this.#options.lockPolicy) {
        case 'exclusive':
          return this.#checkReservedExclusive(lockState, pResOut);
        case 'shared':
        case 'shared+hint':
          return await this.#checkReservedShared(lockState, pResOut);
      }
    } catch (e) {
      console.error('WebLocksMixin: check reserved lock error', e);
      return VFS.SQLITE_IOERR_CHECKRESERVEDLOCK;
    }
    pResOut.setInt32(0, 0, true);
    return VFS.SQLITE_OK;
  }

  /**
   * @param {number} fileId
   * @param {number} op
   * @param {DataView} pArg
   * @returns {number|Promise<number>}
   */
  jFileControl(fileId, op, pArg) {
    const lockState = this.#mapIdToState.get(fileId) ??
      (() => {
        // Call jLock() to create the lock state.
        this.jLock(fileId, VFS.SQLITE_LOCK_NONE);
        return this.#mapIdToState.get(fileId);
      })();
    if (op === WebLocksMixin.WRITE_HINT_OP_CODE &&
        this.#options.lockPolicy === 'shared+hint'){
      lockState.writeHint = true;
    }
    return VFS.SQLITE_NOTFOUND;
  }

  /**
   * @param {LockState} lockState 
   * @param {number} lockType 
   * @returns 
   */
  async #lockExclusive(lockState, lockType) {
    if (!lockState.access) {
      if (!await this.#acquire(lockState, 'access')) {
        return VFS.SQLITE_BUSY;
      }
      console.assert(!!lockState.access);
    }
    lockState.type = lockType;
    return VFS.SQLITE_OK;
  }

  /**
   * @param {LockState} lockState 
   * @param {number} lockType 
   * @returns {number}
   */
  #unlockExclusive(lockState, lockType) {
    if (lockType === VFS.SQLITE_LOCK_NONE) {
      lockState.access?.();
      console.assert(!lockState.access);
    }
    lockState.type = lockType;
    return VFS.SQLITE_OK;
  }

  /**
   * @param {LockState} lockState 
   * @param {DataView} pResOut 
   * @returns {number}
   */
  #checkReservedExclusive(lockState, pResOut) {
    pResOut.setInt32(0, 0, true);
    return VFS.SQLITE_OK;
  }

  /**
   * @param {LockState} lockState 
   * @param {number} lockType 
   * @returns 
   */
  async #lockShared(lockState, lockType) {
    switch (lockState.type) {
      case VFS.SQLITE_LOCK_NONE:
        switch (lockType) {
          case VFS.SQLITE_LOCK_SHARED:
            if (lockState.writeHint) {
              // xFileControl() has hinted that this transaction will
              // write. Acquire the hint lock, which is required to reach
              // the RESERVED state.
              if (!await this.#acquire(lockState, 'hint')) {
                // Timeout before lock acquired.
                return VFS.SQLITE_BUSY;
              }
            }

            // Must have the gate lock to request the access lock.
            if (!await this.#acquire(lockState, 'gate', SHARED)) {
                // Timeout before lock acquired.
                lockState.hint?.();
              return VFS.SQLITE_BUSY;
            }
            await this.#acquire(lockState, 'access', SHARED);
            lockState.gate();
            console.assert(!lockState.gate);
            console.assert(!!lockState.access);
            console.assert(!lockState.reserved);
            break;

          default:
            throw new Error('unsupported lock transition');
        }
        break;
      case VFS.SQLITE_LOCK_SHARED:
        switch (lockType) {
          case VFS.SQLITE_LOCK_RESERVED:
            if (this.#options.lockPolicy === 'shared+hint') {
              // Ideally we should already have the hint lock, but if not
              // poll for it here.
              if (!lockState.hint &&
                !await this.#acquire(lockState, 'hint', POLL_EXCLUSIVE)) {
                // Another connection has the hint lock so this is a
                // deadlock. This connection must retry.
                return VFS.SQLITE_BUSY;
              }
            }

            // Poll for the reserved lock. This should always succeed
            // if all clients use the 'shared+hint' policy.
            if (!await this.#acquire(lockState, 'reserved', POLL_EXCLUSIVE)) {
              // This is a deadlock. The connection holding the reserved
              // lock blocks us, and it can't acquire an exclusive access
              // lock because we hold a shared access lock. This connection
              // must retry.
              lockState.hint?.();
              return VFS.SQLITE_BUSY;
            }
            lockState.access();
            console.assert(!lockState.gate);
            console.assert(!lockState.access);
            console.assert(!!lockState.reserved);
            break;

          case VFS.SQLITE_LOCK_EXCLUSIVE:
            // Jumping directly from SHARED to EXCLUSIVE without passing
            // through RESERVED is only done with a hot journal.
            if (!await this.#acquire(lockState, 'gate')) {
              // Timeout before lock acquired.
              return VFS.SQLITE_BUSY;
            }
            lockState.access();
            if (!await this.#acquire(lockState, 'access')) {
              // Timeout before lock acquired.
              lockState.gate();
              return VFS.SQLITE_BUSY;
            }
            console.assert(!!lockState.gate);
            console.assert(!!lockState.access);
            console.assert(!lockState.reserved);
            break;

          default:
            throw new Error('unsupported lock transition');
        }
        break;
      case VFS.SQLITE_LOCK_RESERVED:
        switch (lockType) {
          case VFS.SQLITE_LOCK_EXCLUSIVE:
            // Prevent other connections from entering the SHARED state.
            if (!await this.#acquire(lockState, 'gate')) {
              // Timeout before lock acquired.
              return VFS.SQLITE_BUSY;
            }

            // Block until all other connections exit the SHARED state.
            if (!await this.#acquire(lockState, 'access')) {
              // Timeout before lock acquired.
              lockState.gate();
              return VFS.SQLITE_BUSY;
            }
            console.assert(!!lockState.gate);
            console.assert(!!lockState.access);
            console.assert(!!lockState.reserved);
            break;

          default:
            throw new Error('unsupported lock transition');
        }
        break;
    }
    lockState.type = lockType;
    return VFS.SQLITE_OK;
  }

  /**
   * @param {LockState} lockState 
   * @param {number} lockType 
   * @returns 
   */
  async #unlockShared(lockState, lockType) {
    // lockType can only be SQLITE_LOCK_SHARED or SQLITE_LOCK_NONE.
    if (lockType === VFS.SQLITE_LOCK_NONE) {
      lockState.access?.();
      lockState.gate?.();
      lockState.reserved?.();
      lockState.hint?.();
      lockState.writeHint = false;
      console.assert(!lockState.access);
      console.assert(!lockState.gate);
      console.assert(!lockState.reserved);
      console.assert(!lockState.hint);
    } else { // lockType === VFS.SQLITE_LOCK_SHARED
      switch (lockState.type) {
        case VFS.SQLITE_LOCK_EXCLUSIVE:
          // Release our exclusive access lock and reacquire it with a
          // shared lock. This should always succeed because we hold
          // the gate lock.
          lockState.access();
          await this.#acquire(lockState, 'access', SHARED);

          // Release our gate and reserved locks. We might not have a
          // reserved lock if we were handling a hot journal.
          lockState.gate();
          lockState.reserved?.();
          lockState.hint?.();
          console.assert(!!lockState.access);
          console.assert(!lockState.gate);
          console.assert(!lockState.reserved);
          break;

        case VFS.SQLITE_LOCK_RESERVED:
          // This transition is rare, probably only on an I/O error
          // while writing to a journal file.
          await this.#acquire(lockState, 'access', SHARED);
          lockState.reserved();
          lockState.hint?.();
          console.assert(!!lockState.access);
          console.assert(!lockState.gate);
          console.assert(!lockState.reserved);
          break;
      }
    }
    lockState.type = lockType;
    return VFS.SQLITE_OK;
  }

  /**
   * @param {LockState} lockState 
   * @param {DataView} pResOut 
   * @returns {Promise<number>}
   */
  async #checkReservedShared(lockState, pResOut) {
    if (await this.#acquire(lockState, 'reserved', POLL_SHARED)) {
      // We were able to get the lock so it was not reserved.
      lockState.reserved();
      pResOut.setInt32(0, 0, true);
    } else {
      pResOut.setInt32(0, 1, true);
    }
    return VFS.SQLITE_OK;
  }

  /**
   * @param {LockState} lockState 
   * @param {'gate'|'access'|'reserved'|'hint'} name
   * @param {LockOptions} options 
   * @returns {Promise<boolean>}
   */
  #acquire(lockState, name, options = {}) {
    console.assert(!lockState[name]);
    return new Promise(resolve => {
      if (!options.ifAvailable && this.#options.lockTimeout < Infinity) {
        // Add a timeout to the lock request.
        const controller = new AbortController();
        options = Object.assign({}, options, { signal: controller.signal });
        setTimeout(() => {
          controller.abort();
          resolve?.(false);
        }, this.#options.lockTimeout);
      }

      const lockName = `lock##${lockState.baseName}##${name}`;
      navigator.locks.request(lockName, options, lock => {
        if (lock) {
          return new Promise(release => {
            lockState[name] = () => {
              release();
              lockState[name] = null;
            };
            resolve(true);
            resolve = null;
          });
        } else {
          lockState[name] = null;
          resolve(false);
          resolve = null;
        }
      }).catch(e => {
        if (e.name !== 'AbortError') throw e;
      });
    });
  }
}

WebLocksMixin.WRITE_HINT_OP_CODE = -9999;
````

## File: packages/wa-sqlite/.editorconfig
````
root = true

[*]
end_of_line = lf
insert_final_newline = true

[*.{js,json,.yml}]
charset = utf-8
indent_style = space
indent_size = 2
````

## File: packages/wa-sqlite/.gitignore
````
.DS_Store

# https://yarnpkg.com/getting-started/qa/#which-files-should-be-gitignored
.yarn/*
!.yarn/patches
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/versions
.pnp.*

/cache
/debug
/deps
/tmp
````

## File: packages/wa-sqlite/.yarnrc.yml
````yaml
compressionLevel: mixed

enableGlobalCache: false

yarnPath: .yarn/releases/yarn-4.9.2.cjs
````

## File: packages/wa-sqlite/ACKNOWLEDGMENTS.md
````markdown
# Acknowledgments
This project does not use code from [SQL.js](https://sql.js.org/#/), but is inspired and influenced by it.

This project uses or derives material from the following sources.

## [sqlite-wasm](https://github.com/mandel59/sqlite-wasm)
Copyright 2017 Ryusei Yamaguchi

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## [monaco-editor](https://github.com/microsoft/monaco-editor)
Copyright (c) 2016 - present Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## [github-corners](https://github.com/tholman/github-corners)
Copyright (c) 2016 Tim Holman

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Pull Request submitters
[//]: # "Use this format (replace 'name' and 'username'): * [name](your URL choice) - [PRs](https://github.com/rhashimoto/wa-sqlite/pulls?q=is%3Apr+author%3Ausername)"
````

## File: packages/wa-sqlite/jsconfig.json
````json
{
  "exclude": [".yarn", "dist", "debug"],
  "compilerOptions": {
    "checkJs": true,
    "target":"ESNext",
    "module": "ESNext",
    "moduleResolution": "Node",
    "lib": ["DOM", "ESNext", "WebWorker"]
  },
  "typeAcquisition": {
    "include": ["jasmine"]
  }
}
````

## File: packages/wa-sqlite/Makefile
````
# dependencies
SQLITE_VERSION = version-3.50.1
SQLITE_TARBALL_URL = https://www.sqlite.org/src/tarball/sqlite.tar.gz?r=${SQLITE_VERSION}

EXTENSION_FUNCTIONS = extension-functions.c
EXTENSION_FUNCTIONS_URL = https://www.sqlite.org/contrib/download/extension-functions.c?get=25
EXTENSION_FUNCTIONS_SHA3 = ee39ddf5eaa21e1d0ebcbceeab42822dd0c4f82d8039ce173fd4814807faabfa

# source files
CFILES = \
	sqlite3.c \
	extension-functions.c \
	main.c \
	libauthorizer.c \
	libfunction.c \
	libhook.c \
	libprogress.c \
	libvfs.c \
	$(CFILES_EXTRA)

JSFILES = \
	src/libauthorizer.js \
	src/libfunction.js \
	src/libhook.js \
	src/libprogress.js \
	src/libvfs.js

vpath %.c src
vpath %.c deps
vpath %.c deps/$(SQLITE_VERSION)

EXPORTED_FUNCTIONS = src/exported_functions.json
EXPORTED_RUNTIME_METHODS = src/extra_exported_runtime_methods.json
ASYNCIFY_IMPORTS = src/asyncify_imports.json
JSPI_EXPORTS = src/jspi_exports.json

# intermediate files
OBJ_FILES_DEBUG = $(patsubst %.c,tmp/obj/debug/%.o,$(CFILES))
OBJ_FILES_DIST = $(patsubst %.c,tmp/obj/dist/%.o,$(CFILES))

# build options
EMCC ?= emcc

CFLAGS_COMMON = \
	-I'deps/$(SQLITE_VERSION)' \
	-Wno-non-literal-null-conversion \
	$(CFLAGS_EXTRA)
CFLAGS_DEBUG = -g $(CFLAGS_COMMON)
CFLAGS_DIST =  -Oz -flto $(CFLAGS_COMMON)

EMFLAGS_COMMON = \
	-s ALLOW_MEMORY_GROWTH=1 \
	-s WASM=1 \
	-s INVOKE_RUN \
	-s ENVIRONMENT="web,worker" \
	-s STACK_SIZE=512KB \
	-s WASM_BIGINT=0 \
	$(EMFLAGS_EXTRA)

EMFLAGS_DEBUG = \
	-s ASSERTIONS=1 \
	-g -Oz \
	$(EMFLAGS_COMMON)

EMFLAGS_DIST = \
	-Oz \
	-flto \
	$(EMFLAGS_COMMON)

EMFLAGS_INTERFACES = \
	-s EXPORTED_FUNCTIONS=@$(EXPORTED_FUNCTIONS) \
	-s EXPORTED_RUNTIME_METHODS=@$(EXPORTED_RUNTIME_METHODS)

EMFLAGS_LIBRARIES = \
	--js-library src/libadapters.js \
	--post-js src/libauthorizer.js \
	--post-js src/libfunction.js \
	--post-js src/libhook.js \
	--post-js src/libprogress.js \
	--post-js src/libvfs.js

EMFLAGS_ASYNCIFY_COMMON = \
	-s ASYNCIFY \
	-s ASYNCIFY_IMPORTS=@src/asyncify_imports.json

EMFLAGS_ASYNCIFY_DEBUG = \
	$(EMFLAGS_ASYNCIFY_COMMON) \
	-s ASYNCIFY_STACK_SIZE=24576

EMFLAGS_ASYNCIFY_DIST = \
	$(EMFLAGS_ASYNCIFY_COMMON) \
	-s ASYNCIFY_STACK_SIZE=16384

EMFLAGS_JSPI = \
	-s JSPI \
	-s ASYNCIFY_IMPORTS=@src/asyncify_imports.json \
	-s JSPI_EXPORTS=@src/jspi_exports.json

# https://www.sqlite.org/compile.html
WASQLITE_DEFINES = \
	-DSQLITE_DEFAULT_MEMSTATUS=0 \
	-DSQLITE_DEFAULT_WAL_SYNCHRONOUS=1 \
	-DSQLITE_DQS=0 \
	-DSQLITE_LIKE_DOESNT_MATCH_BLOBS \
	-DSQLITE_MAX_EXPR_DEPTH=0 \
	-DSQLITE_OMIT_AUTOINIT \
	-DSQLITE_OMIT_DECLTYPE \
	-DSQLITE_OMIT_DEPRECATED \
	-DSQLITE_OMIT_LOAD_EXTENSION \
	-DSQLITE_OMIT_SHARED_CACHE \
	-DSQLITE_THREADSAFE=0 \
	-DSQLITE_USE_ALLOCA \
	-DSQLITE_ENABLE_BATCH_ATOMIC_WRITE \
	-DSQLITE_ENABLE_FTS5 \
	$(WASQLITE_EXTRA_DEFINES)

# directories
.PHONY: all
all: dist

.PHONY: clean
clean:
	rm -rf dist debug tmp

.PHONY: spotless
spotless:
	rm -rf dist debug tmp deps cache

## cache
.PHONY: clean-cache
clean-cache:
	rm -rf cache

cache/$(EXTENSION_FUNCTIONS):
	mkdir -p cache
	curl -LsSf '$(EXTENSION_FUNCTIONS_URL)' -o $@

## deps
.PHONY: clean-deps
clean-deps:
	rm -rf deps

deps/$(SQLITE_VERSION)/sqlite3.h deps/$(SQLITE_VERSION)/sqlite3.c:
	mkdir -p cache/$(SQLITE_VERSION)
	curl -LsS $(SQLITE_TARBALL_URL) | tar -xzf - -C cache/$(SQLITE_VERSION)/ --strip-components=1
	mkdir -p deps/$(SQLITE_VERSION)
	(cd deps/$(SQLITE_VERSION); ../../cache/$(SQLITE_VERSION)/configure --enable-all && make sqlite3.c)

deps/$(EXTENSION_FUNCTIONS): cache/$(EXTENSION_FUNCTIONS)
	mkdir -p deps
	openssl dgst -sha3-256 -r cache/$(EXTENSION_FUNCTIONS) | sed -e 's/\s.*//' > deps/sha3
	echo $(EXTENSION_FUNCTIONS_SHA3) | cmp deps/sha3
	rm -rf deps/sha3 $@
	cp 'cache/$(EXTENSION_FUNCTIONS)' $@

## tmp
.PHONY: clean-tmp
clean-tmp:
	rm -rf tmp

tmp/obj/debug/%.o: %.c
	mkdir -p tmp/obj/debug
	$(EMCC) $(CFLAGS_DEBUG) $(WASQLITE_DEFINES) $^ -c -o $@

tmp/obj/dist/%.o: %.c
	mkdir -p tmp/obj/dist
	$(EMCC) $(CFLAGS_DIST) $(WASQLITE_DEFINES) $^ -c -o $@


## debug
.PHONY: clean-debug
clean-debug:
	rm -rf debug

.PHONY: debug
debug: debug/wa-sqlite.mjs debug/wa-sqlite-async.mjs debug/wa-sqlite-jspi.mjs

debug/wa-sqlite.mjs: $(OBJ_FILES_DEBUG) $(JSFILES) $(EXPORTED_FUNCTIONS) $(EXPORTED_RUNTIME_METHODS)
	mkdir -p debug
	$(EMCC) $(EMFLAGS_DEBUG) \
	  $(EMFLAGS_INTERFACES) \
	  $(EMFLAGS_LIBRARIES) \
	  $(OBJ_FILES_DEBUG) -o $@

debug/wa-sqlite-async.mjs: $(OBJ_FILES_DEBUG) $(JSFILES) $(EXPORTED_FUNCTIONS) $(EXPORTED_RUNTIME_METHODS) $(ASYNCIFY_IMPORTS)
	mkdir -p debug
	$(EMCC) $(EMFLAGS_DEBUG) \
	  $(EMFLAGS_INTERFACES) \
	  $(EMFLAGS_LIBRARIES) \
	  $(EMFLAGS_ASYNCIFY_DEBUG) \
	  $(OBJ_FILES_DEBUG) -o $@

debug/wa-sqlite-jspi.mjs: $(OBJ_FILES_DEBUG) $(JSFILES) $(EXPORTED_FUNCTIONS) $(EXPORTED_RUNTIME_METHODS) $(ASYNCIFY_IMPORTS)
	mkdir -p debug
	$(EMCC) $(EMFLAGS_DEBUG) \
	  $(EMFLAGS_INTERFACES) \
	  $(EMFLAGS_LIBRARIES) \
	  $(EMFLAGS_JSPI) \
	  $(OBJ_FILES_DEBUG) -o $@

## dist
.PHONY: clean-dist
clean-dist:
	rm -rf dist

.PHONY: dist
dist: dist/wa-sqlite.mjs dist/wa-sqlite-async.mjs dist/wa-sqlite-jspi.mjs

dist/wa-sqlite.mjs: $(OBJ_FILES_DIST) $(JSFILES) $(EXPORTED_FUNCTIONS) $(EXPORTED_RUNTIME_METHODS)
	mkdir -p dist
	$(EMCC) $(EMFLAGS_DIST) \
	  $(EMFLAGS_INTERFACES) \
	  $(EMFLAGS_LIBRARIES) \
	  $(OBJ_FILES_DIST) -o $@

dist/wa-sqlite-async.mjs: $(OBJ_FILES_DIST) $(JSFILES) $(EXPORTED_FUNCTIONS) $(EXPORTED_RUNTIME_METHODS) $(ASYNCIFY_IMPORTS)
	mkdir -p dist
	$(EMCC) $(EMFLAGS_DIST) \
	  $(EMFLAGS_INTERFACES) \
	  $(EMFLAGS_LIBRARIES) \
	  $(EMFLAGS_ASYNCIFY_DIST) \
	  $(OBJ_FILES_DIST) -o $@

dist/wa-sqlite-jspi.mjs: $(OBJ_FILES_DIST) $(JSFILES) $(EXPORTED_FUNCTIONS) $(EXPORTED_RUNTIME_METHODS) $(ASYNCIFY_IMPORTS)
	mkdir -p dist
	$(EMCC) $(EMFLAGS_DIST) \
	  $(EMFLAGS_INTERFACES) \
	  $(EMFLAGS_LIBRARIES) \
	  $(EMFLAGS_JSPI) \
	  $(OBJ_FILES_DIST) -o $@
````

## File: packages/wa-sqlite/package.json
````json
{
  "name": "wa-sqlite",
  "version": "1.0.8",
  "type": "module",
  "main": "src/sqlite-api.js",
  "types": "src/types/index.d.ts",
  "files": [
    "src/sqlite-constants.js",
    "src/sqlite-api.js",
    "src/types/*",
    "src/FacadeVFS.js",
    "src/VFS.js",
    "src/WebLocksMixin.js",
    "src/examples/*",
    "dist/*",
    "test/*"
  ],
  "scripts": {
    "build-docs": "typedoc",
    "start": "web-dev-server --node-resolve",
    "test": "web-test-runner",
    "test-manual": "web-test-runner --manual"
  },
  "devDependencies": {
    "@types/jasmine": "^5.1.4",
    "@web/dev-server": "^0.4.6",
    "@web/test-runner": "^0.20.0",
    "@web/test-runner-core": "^0.13.4",
    "comlink": "^4.4.1",
    "jasmine-core": "^4.5.0",
    "monaco-editor": "^0.34.1",
    "typedoc": "^0.25.7",
    "typescript": "^5.3.3",
    "web-test-runner-jasmine": "^0.0.6"
  },
  "dependenciesMeta": {
    "monaco-editor@0.34.1": {
      "unplugged": true
    },
    "web-test-runner-jasmine@0.0.6": {
      "unplugged": true
    }
  },
  "packageManager": "yarn@4.9.2"
}
````

## File: packages/wa-sqlite/README.md
````markdown
[![wa-sqlite CI](https://github.com/rhashimoto/wa-sqlite/actions/workflows/ci.yml/badge.svg)](https://github.com/rhashimoto/wa-sqlite/actions/workflows/ci.yml)

# wa-sqlite
This is a WebAssembly build of SQLite with support for writing SQLite virtual filesystems completely in Javascript. This allows alternative browser storage options such as IndexedDB and Origin Private File System. Applications can opt to use either a synchronous or asynchronous (using Asyncify or JSPI) SQLite library build (an asynchronous build is required for asynchronous extensions).

IndexedDB and several Origin Private File System virtual file systems are among the examples provided as proof of concept. A table comparing the different VFS classes is [here](https://github.com/rhashimoto/wa-sqlite/tree/master/src/examples#vfs-comparison).

[Try the demo](https://rhashimoto.github.io/wa-sqlite/demo/?build=asyncify&config=IDBBatchAtomicVFS&reset) or run [benchmarks](https://rhashimoto.github.io/wa-sqlite/demo/benchmarks/?config=asyncify,IDBBatchAtomicVFS;asyncify,IDBMirrorVFS;default,AccessHandlePoolVFS;default,OPFSCoopSyncVFS;asyncify,OPFSAdaptiveVFS;asyncify,OPFSPermutedVFS) with a modern desktop web browser. More information is available in the [FAQ](https://github.com/rhashimoto/wa-sqlite/issues?q=is%3Aissue+label%3Afaq+), [discussion forums](https://github.com/rhashimoto/wa-sqlite/discussions), and [API reference](https://rhashimoto.github.io/wa-sqlite/docs/).

## Build
The primary motivation for this project is to enable additions to SQLite with only Javascript. Most developers should be able to use the pre-built artifacts in
[./dist](https://github.com/rhashimoto/wa-sqlite/tree/master/dist).
Note that earlier versions of the project only provided pre-built artifacts in the
"buildless" branch; that branch will no longer be maintained.

Minor build customization (e.g. changing build defines or flags) can be done with [make arguments](https://github.com/rhashimoto/wa-sqlite/discussions/128), and the helper project [sqwab](https://github.com/rhashimoto/sqwab) can be used to build without a local build environment.

If you do want to build yourself, here are the prerequisites:

* Building on Debian Linux is known to work, compatibility with other platforms is unknown.
* `yarn` - If you use a different package manager (e.g. `npm`) then file paths in the demo will need adjustment.
* [Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html) 3.1.61+.
* `curl`, `make`, `openssl`, `sed`, `tclsh`, `unzip`

Here are the build steps:
* Make sure `emcc` works.
* `git clone git@github.com:rhashimoto/wa-sqlite.git`
* `cd wa-sqlite`
* `yarn install`
* `make`

The default build produces ES6 modules + WASM, [synchronous and asynchronous](https://github.com/rhashimoto/wa-sqlite/issues/7) (using Asyncify and JSPI) in `dist/`.

## API
Javascript wrappers for core SQLITE C API functions (and some others) are provided. Some convenience functions are also provided to reduce boilerplate. Here is sample code to load the library and call the API:

```javascript
  import SQLiteESMFactory from 'wa-sqlite/dist/wa-sqlite.mjs';
  import * as SQLite from 'wa-sqlite';

  async function hello() {
    const module = await SQLiteESMFactory();
    const sqlite3 = SQLite.Factory(module);
    const db = await sqlite3.open_v2('myDB');
    await sqlite3.exec(db, `SELECT 'Hello, world!'`, (row, columns) => {
      console.log(row);
    });
    await sqlite3.close(db);
  }

  hello();
```

There is a slightly more complicated example [here](https://github.com/rhashimoto/wa-sqlite/tree/master/demo/hello) that also shows how to use a virtual filesystem (VFS) for persistent storage.

The [implementation of `sqlite3.exec`](https://github.com/rhashimoto/wa-sqlite/blob/eb6e62584b2864d5029f51c6afe155d71ba0caa8/src/sqlite-api.js#L409-L418) may be of interest to anyone wanting more fine-grained use of SQLite statement objects (e.g. for binding parameters, explicit column datatypes, etc.).

[API reference](https://rhashimoto.github.io/wa-sqlite/docs/)

## Demo
To serve the demo directly from the source tree:
* `yarn start`
* Open a browser on http://localhost:8000/demo/?build=asyncify&config=IDBBatchAtomicVFS&reset

The demo page provides access to databases on multiple VFS implementations. Query parameters on the demo page URL can be used to specify the configuration and initial state:

| Parameter | Purpose | Values | Default |
|----|----|----|----|
| build | Emscripten build type | default, asyncify, jspi | default |
| config | select VFS | MemoryVFS, MemoryAsyncVFS, IDBBatchAtomicVFS, IDBMirrorVFS, AccessHandlePoolVFS, OPFSAdaptiveVFS, OPFSAnyContextVFS, OPFSCoopSyncVFS, OPFSPermutedVFS | uses SQLite internal memory |
| reset | clear persistent storage | | |

For convenience, if any text region is selected in the editor, only that region will be executed. In addition, the editor contents are restored across page reloads using browser localStorage.

## License
MIT License as of February 10, 2023, changed by generous sponsors
[Fleet Device Management](https://fleetdm.com/) and [Reflect](https://reflect.app/).
Existing licensees may continue under the GPLv3 or switch to the new license.
````

## File: packages/wa-sqlite/typedoc.json
````json
{
  "disableSources": true,
  "entryPoints": ["src/types/index.d.ts"],
  "excludeNotDocumented": true,
  "out": "docs",
  "readme": "none",
  "tsconfig": "src/types/tsconfig.json"
}
````

## File: packages/wa-sqlite/web-test-runner.config.mjs
````
import { chromeLauncher } from '@web/test-runner';
import { jasmineTestRunnerConfig } from 'web-test-runner-jasmine';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  ...jasmineTestRunnerConfig(),
  testFramework: {
    config: {
      defaultTimeoutInterval: 5 * 60 * 1000
    },
  },
  browserLogs: true,
  browserStartTimeout: 60_000,
  nodeResolve: true,
  files: ['./test/*.test.js'],
  concurrency: 1,
  concurrentBrowsers: 1,
  browsers: [
    chromeLauncher({
      launchOptions: {
        args: [
          '--flag-switches-begin',
          '--enable-features=WebAssemblyExperimentalJSPI',
          '--flag-switches-end'
        ],
      },
    }),
  ],
});
````

## File: .prettierrc.json
````json
{}
````

## File: AGENTS.md
````markdown
You are **Nuxflare Chat**, a helpful, respectful, and engaging assistant for a Nuxt-based chat app running on edge infrastructure.

**Time & context**

- Current date/time (with timezone): **{{time}}**.
- Operate statelessly per request; rely on provided messages/context only.

**Security & auth (critical)**

- The app authenticates users via server-managed, httpOnly cookies and short-lived WebSocket tickets. **Never** ask users to paste access/refresh tokens; never echo secrets. If a request requires identifying the user, assume the server has already validated the session and proceed accordingly.
- Do not reveal internal tokens, cookies, headers, or ticket values. If a response might expose credentials or PII, redact and explain briefly why.

**Answer style (default)**

- Write clearly and concisely. Prefer **summary → breakdown → optional deep dive** with headings and bullets.
- When offering steps, make them numbered and executable.
- When you’re unsure, say so briefly and offer the most likely safe path forward.
- Do **not** claim to do work “in the background” or promise future results; complete what you can in the current response.

**Math & code formatting**

- Use LaTeX for math:
  - Inline: `\( content \)` (use real parentheses, not escaped backslashes).
  - Display: `$$ content $$`
- Present code in fenced blocks with the correct language tag.
- Format code as if run through Prettier with **print width 80**.
- Provide copy-pastable, minimal, production-sane examples; include key imports and file paths when helpful.

**Data handling & limits**

- Keep outputs reasonably sized for edge/runtime constraints; prefer focused examples over massive dumps.
- Summarize long content and offer expansion paths instead of posting large blobs.

**Citations & external info**

- If you cite or summarize external material, attribute sources succinctly and place citations at the end of the paragraph. Avoid raw URLs if the UI handles link rendering.

**Behavioral guardrails**

- Be polite, neutral, and nonjudgmental. Decline unsafe requests with a brief reason and a safer alternative.
- Do not provide disallowed content or detailed instructions that meaningfully enable wrongdoing.

**UI fit & ergonomics**

- Use headings, bullets, and tables where they improve scannability.
- Name things clearly (functions, files, env vars) and prefer repo-consistent paths and conventions.

**When writing examples for this app**

- Assume persistence is message/thread-based; keep thread titles short and descriptive when asked.
- Prefer examples that play nicely with SQLite/Drizzle patterns and Nuxt server APIs used here.

**If the user asks about authentication or sessions**

- Explain flows at a high level (cookies + short-lived WS ticket) without leaking implementation secrets.
- Recommend re-authentication (sign-in) rather than manual token handling.

(End of system prompt)

Keep tests concise, readable, and 100% working.

- **Check Code**: After tests, verify source files match. Fix issues, not tests.

## Code Rules

- **No Guesses**: Review files first to understand.
- **Performance**: Think basics—cut waste, cache smart, scale well.
- **Refactor**: Update old code to standards without breaking.
- **Commits**: "[Type] Short note on changes."

## Workflow

- **Bugs**: Fix root causes. Ask if unclear.
- **Docs**: Update files like README for changes.
- **Think Simple**: Explain steps at a basic level, but solve like an expert.

## Notes

- **Bun Tips**: Use fast features; check docs for updates.
- **Solo Work**: Keep code clean for easy future changes.

## TESTING

- Always test as you go to ensure correctness

## Completing tasks

- **Follow the plan**: If provided stick to the steps outlined in the planning documents.
- **Use the provided files**: If there are files in the planning folder, use them as a reference for your implementation. This includes files like `requirements.md`, `tasks.md`, and `design.md`, but only if the user has provided them, or the tasks file.
- **Cross of items as you go**: If there is a planning document with a tasks.md file that you are working from, please cross off items as you complete them. example location: `planning/cool-feature/tasks.md`
````

## File: LICENSE.md
````markdown
Copyright 2025 Tanay Karnik

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
````

## File: packages/api/drizzle/meta/_journal.json
````json
{
  "version": "7",
  "dialect": "sqlite",
  "entries": [
    {
      "idx": 0,
      "version": "6",
      "when": 1750270263463,
      "tag": "0000_brave_gladiator",
      "breakpoints": true
    }
  ]
}
````

## File: packages/api/drizzle/meta/0000_snapshot.json
````json
{
  "version": "6",
  "dialect": "sqlite",
  "id": "1861a687-bc0e-4e2d-9f4b-15064feb1982",
  "prevId": "00000000-0000-0000-0000-000000000000",
  "tables": {
    "attachments": {
      "name": "attachments",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "type": {
          "name": "type",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(unixepoch())"
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(unixepoch())"
        },
        "deleted": {
          "name": "deleted",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "clock": {
          "name": "clock",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "kv": {
      "name": "kv",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "value": {
          "name": "value",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(unixepoch())"
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(unixepoch())"
        },
        "clock": {
          "name": "clock",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {
        "kv_name_unique": {
          "name": "kv_name_unique",
          "columns": ["name"],
          "isUnique": true
        }
      },
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "messages": {
      "name": "messages",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "data": {
          "name": "data",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(unixepoch())"
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(unixepoch())"
        },
        "error": {
          "name": "error",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "deleted": {
          "name": "deleted",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "thread_id": {
          "name": "thread_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "index": {
          "name": "index",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "clock": {
          "name": "clock",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "stream_id": {
          "name": "stream_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "threads": {
      "name": "threads",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(unixepoch())"
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(unixepoch())"
        },
        "last_message_at": {
          "name": "last_message_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "parent_thread_id": {
          "name": "parent_thread_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "status": {
          "name": "status",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'ready'"
        },
        "deleted": {
          "name": "deleted",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "pinned": {
          "name": "pinned",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "clock": {
          "name": "clock",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    }
  },
  "views": {},
  "enums": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "indexes": {}
  }
}
````

## File: packages/api/drizzle/migrations.js
````javascript
import journal from "./meta/_journal.json";
import m0000 from "./0000_brave_gladiator.sql";

export default {
  journal,
  migrations: {
    m0000,
  },
};
````

## File: packages/api/schema.ts
````typescript
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const threads = sqliteTable("threads", {
  id: text("id").notNull().primaryKey(),
  title: text("title"),
  created_at: int("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updated_at: int("updated_at")
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`),
  last_message_at: int("last_message_at"),
  parent_thread_id: text("parent_thread_id"),
  status: text("status").notNull().default("ready"),
  deleted: int("deleted", { mode: "boolean" }).notNull().default(false),
  pinned: int("pinned", { mode: "boolean" }).notNull().default(false),
  clock: int("clock").notNull(),
});

export const messages = sqliteTable("messages", {
  id: text("id").notNull().primaryKey(),
  data: text("data", { mode: "json" }),
  role: text("role").notNull(),
  created_at: int("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updated_at: int("updated_at")
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`),
  error: text("error"),
  deleted: int("deleted", { mode: "boolean" }).notNull().default(false),
  thread_id: text("thread_id").notNull(),
  index: int("index").notNull(),
  clock: int("clock").notNull(),
  stream_id: text(),
});

export const kv = sqliteTable("kv", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull().unique(),
  value: text("value"),
  created_at: int("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updated_at: int("updated_at")
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`),
  clock: int("clock").notNull(),
});

export const attachments = sqliteTable("attachments", {
  id: text("id").notNull().primaryKey(),
  type: text("type").notNull(),
  name: text("name").notNull(),
  created_at: int("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updated_at: int("updated_at")
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`),
  deleted: int("deleted", { mode: "boolean" }).notNull().default(false),
  clock: int("clock").notNull(),
});
````

## File: packages/app/app/assets/css/main.css
````css
@import "tailwindcss" theme(static);
@import "@nuxt/ui";
@plugin "@tailwindcss/typography";

.dark {
  .shiki,
  .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    /* Optional, if you also want font styles */
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
}

:root {
  --sidebar-bg: #f1f1f3; /* Light mode color */
}

.dark {
  --sidebar-bg: #141416; /* Dark mode color */
}

.sidebar-bg {
  background-color: var(--sidebar-bg);
}

@theme static {
  --font-sans: "Mona Sans", sans-serif;
}

.floating-actions {
  @apply p-1 bg-neutral-400/20 dark:bg-neutral-200/10 rounded-md gap-1 backdrop-blur-sm;
}

.chat-prompt-icons {
  @apply font-medium rounded-2xl py-1.5 px-2.5 dark:text-neutral-400 dark:hover:text-white text-neutral-700 hover:text-neutral-900;
}

.sidebar-chat-actions-container {
  /* @apply bg-[linear-gradient(to_right, _transparent_0%, _#fff_20%, _#fff_100%)] dark:bg-[linear-gradient(to_right, _transparent_0%, _#262626_20%, _#262626_100%)]; */
}

.scrollbar-custom {
  scrollbar-width: thin;
  scrollbar-color: rgba(214, 214, 214, 0.8) rgba(240, 240, 240, 0.6);
}

.scrollbar-custom::-webkit-scrollbar {
  height: 2px;
  width: 2px;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background: rgba(240, 240, 240, 0.6);
  border-radius: 1px;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: rgba(200, 200, 200, 0.8);
  border-radius: 1px;
  transition: background-color 0.2s ease;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background-color: rgba(170, 170, 170, 0.5) !important;
}

.dark .scrollbar-custom {
  scrollbar-color: rgba(71, 71, 71, 0.8) rgba(48, 48, 48, 0.4);
}

.dark .scrollbar-custom::-webkit-scrollbar-track {
  background: rgba(48, 48, 48, 0.4);
}

.dark .scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: rgba(96, 96, 96, 0.8);
}

.dark .scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background-color: rgba(115, 115, 115, 0.9);
}
````

## File: packages/app/app/components/content/CodeCopy.vue
````vue
<template>
  <div class="flex">
    <UButton
      v-if="copied === false"
      size="xs"
      color="neutral"
      variant="ghost"
      icon="i-heroicons-clipboard-document"
      @click="handleCopy"
    />
    <UButton
      v-else
      ref="checkIconRef"
      size="xs"
      color="neutral"
      variant="ghost"
      icon="i-heroicons-check"
    />
  </div>
</template>

<script setup lang="ts">
import showToast from "~/utils/showToast";
const { code } = defineProps<{
  code: string;
}>();
const { copy } = useClipboard({ source: code });
const copied = ref(false);

async function handleCopy() {
  await copy(code);
  copied.value = true;
  showToast("Copied to clipboard!");
}

const checkIconRef = ref<HTMLElement>();
onClickOutside(checkIconRef, () => {
  copied.value = false;
});
</script>
````

## File: packages/app/app/components/content/ProseCode.vue
````vue
<template>
  <code
    class="inline-code font-mono relative rounded bg-primary-100/20 border border-primary-100/50 px-[4px] py-[1px] font-mono"
  >
    <slot />
  </code>
</template>

<style scoped>
.inline-code:not(
  h1 > code,
  h1 > a > code,
  h2 > a > code,
  h3 > a > code,
  h4 > a > code,
  h5 > a > code,
  strong > a > code
) {
  /* text-sm */
  font-size: 0.875rem;
}
</style>
````

## File: packages/app/app/components/AssistantErrorMessage.vue
````vue
<template>
  <UAlert
    :title="obj.message || 'Something went wrong'"
    variant="subtle"
    color="error"
  />
</template>

<script setup lang="ts">
interface AssistantErrorMessageProps {
  error?: string;
}
const { error } = defineProps<AssistantErrorMessageProps>();
const obj = computed(() => {
  try {
    return JSON.parse(error || "");
  } catch {
    return {};
  }
});
</script>
````

## File: packages/app/app/components/AssistantMessage.vue
````vue
<template>
  <div>
    <Reasoning class="mb-2" v-if="reasoning?.length" :content="reasoning" />
    <div class="flex flex-col">
      <VueSpinnerDots
        v-if="message.stream_id && !reasoning?.length && !content?.length"
        class="w-10"
      />
      <MarkdownRenderer :content="content" :chunked="!!message.stream_id" />
      <AssistantErrorMessage
        :error="message.error"
        v-if="!message.stream_id && message.error"
      />
    </div>
    <WebSearch v-if="message.webSearch" :content="message.webSearch" />
  </div>
</template>

<script setup lang="ts">
import { VueSpinnerDots } from "vue3-spinners";

const { message } = defineProps<{ message: any }>();
const content = computed(() =>
  message.stream_id ? streamContent.value : message.data?.content,
);
const reasoning = computed(() =>
  message.stream_id ? streamReasoning.value : message.data?.reasoning,
);
const streamContent = ref("");
const streamReasoning = ref("");
const config = useRuntimeConfig();

// TODO: make sure each http call is only made once for a tab
async function fetchStream(streamId: string, streamRef: Ref) {
  try {
    const streamUrl = `${config.public.apiUrl}/stream/${streamId}`;
    const response = await fetch(streamUrl);
    if (!response.ok) {
      throw new Error(`Stream error: ${response.status}`);
    }
    const reader = response.body?.getReader();
    if (!reader) return;
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      streamRef.value += chunk;
    }
  } catch (error) {
    console.error("Error streaming message:", error);
  }
}

watch(
  () => message.stream_id,
  (streamId) => {
    if (streamId) {
      streamReasoning.value = "";
      streamContent.value = "";
      fetchStream(streamId, streamContent);
      fetchStream(streamId + "?reasoning=true", streamReasoning);
    }
  },
  {
    immediate: true,
  },
);
</script>
````

## File: packages/app/app/composables/useModelStore.ts
````typescript
export const useModelStore = defineStore("model", () => {
  const models = ref([
    {
      label: "Gemini 2.5 Flash",
      apiModel: "google/gemini-2.5-flash",
      imageUploads: true,
      webSearch: true,
      pdfUploads: true,
      reasoningAbility: true,
      generateImage: false,
      keyPlatforms: ["gemini", "openrouter"],
    },
    {
      label: "Gemini 2.5 Pro Preview 06-05",
      apiModel: "google/gemini-2.5-pro-preview-06-05",
      imageUploads: true,
      webSearch: true,
      pdfUploads: true,
      reasoningAbility: true,
      generateImage: false,
      keyPlatforms: ["gemini", "openrouter"],
    },
    {
      label: "o4 mini",
      apiModel: "openai/o4-mini",
      imageUploads: true,
      webSearch: false,
      pdfUploads: false,
      reasoningAbility: true,
      generateImage: false,
      keyPlatforms: ["openai", "openrouter"],
    },
    {
      label: "Claude 4 Sonnet",
      apiModel: "anthropic/claude-sonnet-4",
      imageUploads: true,
      webSearch: false,
      pdfUploads: true,
      reasoningAbility: true,
      generateImage: false,
      keyPlatforms: ["anthropic", "openrouter"],
    },
    {
      label: "DeepSeek: R1 0528 (free)",
      apiModel: "deepseek/deepseek-r1-0528:free",
      imageUploads: false,
      webSearch: false,
      pdfUploads: false,
      reasoningAbility: true,
      generateImage: false,
      keyPlatforms: ["openrouter"],
    },
    {
      label: "DeepSeek: R1 Distill Qwen 14B (free)",
      apiModel: "deepseek/deepseek-r1-distill-qwen-14b:free",
      imageUploads: false,
      webSearch: false,
      pdfUploads: false,
      reasoningAbility: true,
      generateImage: false,
      keyPlatforms: ["openrouter"],
    },
    {
      label: "Gemini 2.0 Flash Experimental (free)",
      apiModel: "google/gemini-2.0-flash-exp:free",
      imageUploads: true,
      webSearch: true,
      pdfUploads: true,
      reasoningAbility: false,
      generateImage: false,
      keyPlatforms: ["gemini", "openrouter"],
    },
  ]);

  const modelsByCategory: Record<string, any> = ref({
    gemini: {
      name: "Gemini",
      keyName: "gemini",
      link: "https://aistudio.google.com/app/apikey",
      apiKey: "",
      icon: "i-material-icon-theme:gemini-ai",
      models: [],
      saving: false,
    },
    openai: {
      name: "OpenAI",
      keyName: "openai",
      link: "https://platform.openai.com/api-keys",
      apiKey: "",
      icon: "i-ri:openai-fill",
      models: [],
      saving: false,
    },
    anthropic: {
      name: "Anthropic",
      keyName: "anthropic",
      link: "https://console.anthropic.com/settings/keys",
      apiKey: "",
      icon: "i-ri:anthropic-fill",
      models: [],
      saving: false,
    },
    openrouter: {
      name: "OpenRouter",
      keyName: "openrouter",
      link: "https://openrouter.ai/keys",
      apiKey: "",
      image: "openrouter.ico",
      models: [],
      saving: false,
    },
  });

  const categorizeModels = () => {
    // Reset models arrays
    Object.values(modelsByCategory.value).forEach((category: any) => {
      category.models = [];
    });

    // Populate models by platform
    models.value.forEach((model) => {
      model.keyPlatforms.forEach((platform) => {
        if (platform in modelsByCategory.value) {
          modelsByCategory.value[platform].models.push(model);
        }
      });
    });
  };

  const saveApiKey = async (platform: string) => {
    const apiKey = modelsByCategory.value[platform].apiKey;
    await setApiKeyInKV(platform, apiKey);
  };

  const setApiKeyInKV = async (platform: string, key: string) => {
    const { $sync } = useNuxtApp();
    try {
      modelsByCategory.value[platform].saving = true;
      if (platform === "openrouter") {
        await $sync.setKV("openrouter_api_key", key);
      } else if (platform === "gemini") {
        await $sync.setKV("gemini_api_key", key);
      } else if (platform === "openai") {
        await $sync.setKV("openai_api_key", key);
      } else if (platform === "anthropic") {
        await $sync.setKV("anthropic_api_key", key);
      }
      showToast("Saved settings!");
    } catch (error) {
      console.error("Failed to save API key:", error);
    } finally {
      modelsByCategory.value[platform].saving = false;
    }
  };

  function setApiKey(platform: string, key: string) {
    if (platform in modelsByCategory.value) {
      modelsByCategory.value[platform].apiKey = key;
    }
  }

  if (import.meta.client) {
    const { $sync } = useNuxtApp();

    const fetchApiKeysFromKV = async () => {
      try {
        const savedOpenRouterKey = await $sync.getKV("openrouter_api_key");
        if (savedOpenRouterKey) {
          setApiKey("openrouter", savedOpenRouterKey);
        }

        const savedGeminiKey = await $sync.getKV("gemini_api_key");
        if (savedGeminiKey) {
          setApiKey("gemini", savedGeminiKey);
        }

        const savedOpenaiKey = await $sync.getKV("openai_api_key");
        if (savedOpenaiKey) {
          setApiKey("openai", savedOpenaiKey);
        }

        const savedAnthropicKey = await $sync.getKV("anthropic_api_key");
        if (savedAnthropicKey) {
          setApiKey("anthropic", savedAnthropicKey);
        }
      } catch (error) {
        console.error("Failed to load API key:", error);
      }
    };

    fetchApiKeysFromKV();
  }
  // Run on initialization
  categorizeModels();

  return {
    models,
    modelsByCategory,
    setApiKey,
    saveApiKey,
  };
});
````

## File: packages/app/app/utils/markdown.ts
````typescript
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import { unified } from "unified";

const chunkCache = new Map<string, string>();
const processingQueue = new Map<string, Promise<string>>();

export async function processMarkdownChunk(chunk: string): Promise<string> {
  const hash = await crypto.subtle
    .digest("SHA-1", new TextEncoder().encode(chunk))
    .then((buf) =>
      Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""),
    );

  if (chunkCache.has(hash)) {
    return chunkCache.get(hash)!;
  }

  if (processingQueue.has(hash)) {
    return processingQueue.get(hash)!;
  }

  const processing = markdownProcessor
    .process(chunk)
    .then((file) => file.toString());
  processingQueue.set(hash, processing);

  const result = await processing;
  chunkCache.set(hash, result);
  processingQueue.delete(hash);

  return result;
}

export const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeShiki, {
    defaultLanguage: "txt",
    fallbackLanguage: "txt",
    themes: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
  })
  .use(rehypeKatex)
  .use(rehypeStringify);
````

## File: packages/app/app/utils/shared-service.js
````javascript
const PROVIDER_REQUEST_TIMEOUT = 1000;

export class SharedService extends EventTarget {
  /** @type {string} */ #serviceName;
  /** @type {Promise<string>} */ #clientId;
  /** @type {() => MessagePort|Promise<MessagePort>} */ #portProviderFunc;

  // This BroadcastChannel is used for client messaging. The provider
  // must have a separate BroadcastChannel in case the instance is
  // both client and provider.
  #clientChannel = new BroadcastChannel("SharedService");

  /** @type {AbortController} */ #onDeactivate;
  /** @type {AbortController} */ #onClose = new AbortController();

  // This is client state to track the provider. The provider state is
  // mostly managed within activate().
  /** @type {Promise<MessagePort>} */ #providerPort;
  /** @type {Map<string, { resolve, reject }>} */ providerCallbacks = new Map();
  #providerCounter = 0;
  #providerChangeCleanup = [];

  /** @type {{ [method: string] : (...args: any) => Promise<*> }} */ proxy;

  /**
   * @param {string} serviceName
   * @param {() => MessagePort|Promise<MessagePort>} portProviderFunc
   */
  constructor(serviceName, portProviderFunc) {
    super();

    this.#serviceName = serviceName;
    this.#portProviderFunc = portProviderFunc;

    this.#clientId = this.#getClientId();

    // Connect to the current provider and future providers.
    this.#providerPort = this.#providerChange();
    this.#clientChannel.addEventListener(
      "message",
      ({ data }) => {
        if (
          data?.type === "provider" &&
          data?.sharedService === this.#serviceName
        ) {
          // A context (possibly this one) announced itself as the new provider.
          // Discard any old provider and connect to the new one.
          this.#closeProviderPort(this.#providerPort);
          this.#providerPort = this.#providerChange();
        }
      },
      { signal: this.#onClose.signal },
    );

    this.proxy = this.#createProxy();
  }

  activate() {
    if (this.#onDeactivate) return;

    // When acquire a lock on the service name then we become the service
    // provider. Only one instance at a time will get the lock; the rest
    // will wait their turn.
    this.#onDeactivate = new AbortController();
    navigator.locks.request(
      `SharedService-${this.#serviceName}`,
      { signal: this.#onDeactivate.signal },
      async () => {
        // Get the port to request client ports.
        const port = await this.#portProviderFunc();
        port.start();

        // Listen for client requests. A separate BroadcastChannel
        // instance is necessary because we may be serving our own
        // request.
        const providerId = await this.#clientId;
        const broadcastChannel = new BroadcastChannel("SharedService");
        broadcastChannel.addEventListener(
          "message",
          async ({ data }) => {
            if (
              data?.type === "request" &&
              data?.sharedService === this.#serviceName
            ) {
              // Get a port to send to the client.
              const requestedPort = await new Promise((resolve) => {
                port.addEventListener(
                  "message",
                  (event) => {
                    resolve(event.ports[0]);
                  },
                  { once: true },
                );
                port.postMessage(data.clientId);
              });

              this.#sendPortToClient(data, requestedPort);
            }
          },
          { signal: this.#onDeactivate.signal },
        );

        // Tell everyone that we are the new provider.
        broadcastChannel.postMessage({
          type: "provider",
          sharedService: this.#serviceName,
          providerId,
        });

        // Release the lock only on user abort or context destruction.
        return new Promise((_, reject) => {
          this.#onDeactivate.signal.addEventListener("abort", () => {
            broadcastChannel.close();
            reject(this.#onDeactivate.signal.reason);
          });
        });
      },
    );
  }

  deactivate() {
    this.#onDeactivate?.abort();
    this.#onDeactivate = null;
  }

  close() {
    this.deactivate();
    this.#onClose.abort();
    for (const { reject } of this.providerCallbacks.values()) {
      reject(new Error("SharedService closed"));
    }
  }

  async #sendPortToClient(message, port) {
    // Return the port to the client via the service worker.
    const serviceWorker = await navigator.serviceWorker.ready;
    serviceWorker.active.postMessage(message, [port]);
  }

  async #getClientId() {
    // Getting the clientId from the service worker accomplishes two things:
    // 1. It gets the clientId for this context.
    // 2. It ensures that the service worker is activated.
    //
    // It is possible to do this without polling but it requires about the
    // same amount of code and using fetch makes 100% certain the service
    // worker is handling requests.
    // let clientId;
    // while (!clientId) {
    //   clientId = await fetch("./clientId").then(async (response) => {
    //     if (response.ok) {
    //       const id = await response.text();
    //       // uuid
    //       if (id.length < 40) return id;
    //     }
    //     console.warn("service worker not ready, retrying...");
    //     return new Promise((resolve) => setTimeout(resolve, 100));
    //   });
    // }

    let sendClient;
    const clientIdPromise = new Promise((res) => {
      sendClient = res;
    });
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data?.client_id) return sendClient(event.data.client_id);
      event.data.ports = event.ports;
      this.dispatchEvent(new MessageEvent("message", { data: event.data }));
    });
    await navigator.serviceWorker.ready.then((reg) => {
      reg.active?.postMessage({ get_client_id: true });
    });
    const clientId = await clientIdPromise;
    // Acquire a Web Lock named after the clientId. This lets other contexts
    // track this context's lifetime.
    // TODO: It would be better to lock on the clientId+serviceName (passing
    // that lock name in the service request). That would allow independent
    // instance lifetime tracking.
    await SharedService.#acquireContextLock(clientId);

    return clientId;
  }

  async #providerChange() {
    // Multiple calls to this function could be in flight at once. If that
    // happens, we only care about the most recent call, i.e. the one
    // assigned to this.#providerPort. This counter lets us determine
    // whether this call is still the most recent.
    const providerCounter = ++this.#providerCounter;

    // Obtain a MessagePort from the provider. The request can fail during
    // a provider transition, so retry until successful.
    /** @type {MessagePort} */ let providerPort;
    const clientId = await this.#clientId;
    while (!providerPort && providerCounter === this.#providerCounter) {
      // Broadcast a request for the port.
      const nonce = randomString();
      this.#clientChannel.postMessage({
        type: "request",
        nonce,
        sharedService: this.#serviceName,
        clientId,
      });

      // Wait for the provider to respond (via the service worker) or
      // timeout. A timeout can occur if there is no provider to receive
      // the broadcast or if the provider is too busy.
      const providerPortReady = new Promise((resolve) => {
        const abortController = new AbortController();
        this.addEventListener(
          "message",
          (event) => {
            if (event.data?.nonce === nonce) {
              resolve(event.data.ports[0]);
              abortController.abort();
            }
          },
          { signal: abortController.signal },
        );
        this.#providerChangeCleanup.push(() => abortController.abort());
      });

      providerPort = await Promise.race([
        providerPortReady,
        new Promise((resolve) =>
          setTimeout(() => resolve(null), PROVIDER_REQUEST_TIMEOUT),
        ),
      ]);

      if (!providerPort) {
        // The provider request timed out. If it does eventually arrive
        // just close it.
        providerPortReady.then((port) => port?.close());
      }
    }

    if (providerPort && providerCounter === this.#providerCounter) {
      // Clean up all earlier attempts to get the provider port.
      this.#providerChangeCleanup.forEach((f) => f());
      this.#providerChangeCleanup = [];

      // Configure the port.
      providerPort.addEventListener("message", ({ data }) => {
        const callbacks = this.providerCallbacks.get(data.nonce);
        if (!data.error) {
          callbacks.resolve(data.result);
        } else {
          callbacks.reject(Object.assign(new Error(), data.error));
        }
      });
      providerPort.start();
      return providerPort;
    } else {
      // Either there is no port because this request timed out, or there
      // is a port but it is already obsolete because a new provider has
      // announced itself.
      providerPort?.close();
      return null;
    }
  }

  #closeProviderPort(providerPort) {
    providerPort.then((port) => port?.close());
    for (const { reject } of this.providerCallbacks.values()) {
      reject(new Error("SharedService provider change"));
    }
  }

  #createProxy() {
    return new Proxy(
      {},
      {
        get: (_, method) => {
          return async (...args) => {
            // Use a nonce to match up requests and responses. This allows
            // the responses to be out of order.
            const nonce = randomString();

            const providerPort = await this.#providerPort;
            return new Promise((resolve, reject) => {
              this.providerCallbacks.set(nonce, { resolve, reject });
              providerPort.postMessage({ nonce, method, args });
            }).finally(() => {
              this.providerCallbacks.delete(nonce);
            });
          };
        },
      },
    );
  }

  static #acquireContextLock = (function () {
    let p;
    return function (clientId) {
      return p
        ? p
        : (p = new Promise((resolve) => {
            navigator.locks.request(
              clientId,
              () =>
                new Promise((_) => {
                  resolve();
                }),
            );
          }));
    };
  })();
}

/**
 * Wrap a target with MessagePort for proxying.
 * @param {{ [method: string]: (...args) => any }} target
 * @returns
 */
export function createSharedServicePort(target) {
  const { port1: providerPort1, port2: providerPort2 } = new MessageChannel();
  providerPort1.addEventListener("message", ({ data: clientId }) => {
    const { port1, port2 } = new MessageChannel();

    // The port requester holds a lock while using the channel. When the
    // lock is released by the requester, clean up the port on this side.
    navigator.locks.request(clientId, () => {
      port1.close();
    });

    port1.addEventListener("message", async ({ data }) => {
      const response = { nonce: data.nonce };
      try {
        response.result = await target[data.method](...data.args);
      } catch (e) {
        // Error is not structured cloneable so copy into POJO.
        const error =
          e instanceof Error
            ? Object.fromEntries(
                Object.getOwnPropertyNames(e).map((k) => [k, e[k]]),
              )
            : e;
        response.error = error;
      }
      port1.postMessage(response);
    });
    port1.start();
    providerPort1.postMessage(null, [port2]);
  });
  providerPort1.start();
  return providerPort2;
}

function randomString() {
  return Math.random().toString(36).replace("0.", "");
}
````

## File: packages/app/app/utils/sqlite.ts
````typescript
import * as SQLite from "wa-sqlite";
````

## File: packages/app/app/app.config.ts
````typescript
export default defineAppConfig({
  ui: {
    colors: {
      neutral: "zinc",
      primary: "blue",
    },
    tooltip: {
      slots: {
        text: "whitespace-pre-line leading-snug",
        content:
          "flex items-center gap-1 bg-white dark:bg-black text-highlighted shadow-sm rounded-sm ring ring-default h-auto px-2.5 py-2 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto",
      },
    },
    button: {
      slots: {
        base: "cursor-pointer",
      },
      defaultVariants: {
        size: "sm",
      },
    },
    toast: {
      slots: {
        progress: "hidden",
        root: "bg-gray-100 dark:bg-neutral-900",
      },
    },
  },
});
````

## File: packages/app/app/app.vue
````vue
<template>
  <UApp>
    <NuxtLayout> <NuxtPage /> </NuxtLayout
  ></UApp>
</template>

<script setup lang="ts">
onMounted(() => {
  // warm up markdown processor
  processMarkdownChunk("# test");
});
</script>
````

## File: .env.example
````
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
ALCHEMY_PASSWORD=please_change_this_to_a_random_string
````

## File: packages/app/app/components/DeleteModal.vue
````vue
<template>
  <UModal
    :overlay="false"
    v-model:open="openDeleteModal"
    color="neutral"
    :ui="{
      overlay: 'bg-white/60 dark:bg-black/60',
      content:
        'bg-neutral-100/50 dark:bg-neutral-700/30 backdrop-blur-md rounded-xl',
      header: 'hidden',
      body: ' rounded-lg mx-4 mt-4 border-none',
      footer: 'p-4',
    }"
    class="absolute left-1/2 transform -translate-x-1/2"
  >
    <template #body>
      <div class="flex flex-col items-start gap-4">
        <h3 class="text-lg font-semibold">
          Delete {{ thread ? "Thread" : "Message" }}
        </h3>
        <p class="text-neutral-700 dark:text-neutral-400 mb-4">
          <span v-if="thread">
            Are you sure you want to delete "{{ thread?.title }}"? This action
            cannot be undone.
          </span>
          <span v-else>
            Are you sure you want to delete this message? This action cannot be
            undone.
          </span>
        </p>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end w-full gap-3">
        <UButton
          variant="ghost"
          size="md"
          color="neutral"
          @click="cancelDelete"
        >
          Cancel
        </UButton>
        <UButton
          variant="subtle"
          size="md"
          color="error"
          @click="confirmDelete"
        >
          Delete
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const openDeleteModal = defineModel<boolean>();

interface Props {
  thread?: any;
}
const { thread } = defineProps<Props>();
const emit = defineEmits(["cancelDelete", "confirmDelete"]);

const cancelDelete = () => {
  emit("cancelDelete");
};

const confirmDelete = () => {
  emit("confirmDelete");
};
</script>
````

## File: packages/app/app/components/MarkdownChunkRenderer.client.vue
````vue
<template>
  <div v-html="html" />
</template>

<script setup lang="ts">
const { block } = defineProps<{ block: string }>();
const html = ref(block);

watch(
  [() => block],
  async () => {
    if (block) {
      html.value = await processMarkdownChunk(block);
    }
  },
  { immediate: true },
);
</script>
````

## File: packages/app/app/components/ReasoningBudget.vue
````vue
<template>
  <USelectMenu
    v-model="selectedBudget"
    :icon="selectedBudget?.icon"
    :trailing-icon="false"
    :searchInput="false"
    color="neutral"
    variant="subtle"
    :items="budgets"
    :ui="{
      base: 'min-w-fit inline-flex justify-center text-xs rounded-full cursor-pointer font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white light:hover:bg-neutral-200 dark:hover:bg-neutral-700/70',
      content: 'min-w-40 p-0 dark:bg-black',
      item: 'text-neutral-700 dark:text-neutral-400 data-highlighted:bg-neutral-100 dark:data-highlighted:bg-neutral-800 rounded-md',
      leading: 'w-auto mx-auto flex items-center justify-between',
      leadingIcon:
        'font-normal dark:text-neutral-400 dark:hover:text-white text-neutral-600 hover:text-neutral-800',
    }"
  />
</template>

<script setup lang="ts">
const budgets = ref([
  {
    label: "High",
    value: "High",
    icon: "i-uil:brain",
    action: () => {},
  },
  {
    label: "Medium",
    value: "Medium",
    icon: "i-lucide:brain",
    action: () => {},
  },
  {
    label: "Low",
    value: "Low",
    icon: "i-bx:brain",
    action: () => {},
  },
]);

const promptStore = usePromptStore();
const { thinkingBudget } = storeToRefs(promptStore);
const selectedBudget = ref(
  budgets.value.find(
    (b) => b.value.toLowerCase() === thinkingBudget.value.toLowerCase(),
  ),
);

watch(
  thinkingBudget,
  () => {
    selectedBudget.value = budgets.value.find(
      (b) => b.value.toLowerCase() === thinkingBudget.value.toLowerCase(),
    );
  },
  { immediate: true },
);

watch(
  selectedBudget,
  (newBudget) => {
    if (newBudget) {
      promptStore.thinkingBudget = newBudget.value.toLowerCase();
    }
  },
  { immediate: true },
);
</script>
````

## File: packages/app/app/components/SearchBox.client.vue
````vue
<template>
  <UCommandPalette
    v-model:search-term="searchTerm"
    @update:open="update"
    :groups="groupedThreads"
    :close="{
      color: 'neutral',
      variant: 'outline',
      size: 'xs',
      class: 'rounded-full',
    }"
    :loading="status === 'pending'"
    icon="i-lucide-search"
    :ui="{
      root: 'p-3 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full lg:min-w-180 max-h-120 overflow-y-auto bg-neutral-100/70 ring ring-neutral-200 dark:ring-neutral-800 dark:bg-neutral-700/30 backdrop-blur-md shadow-lg rounded-xl',
      content:
        'bg-white/80 dark:bg-neutral-900 rounded-lg p-1.5 mx-auto w-full scrollbar-custom',
      label: 'text-neutral-400',
      item: 'p-3 rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-800',
      input:
        '[&>input]:placeholder-neutral-600 dark:[&>input]:placeholder-neutral-400',
    }"
    @update:model-value="onSelect"
  >
    <template #item="{ item }">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide:message-circle" class="size-5 text-neutral-500" />
        <span>{{ item.label }}</span>
        <span class="text-neutral-500 dark:text-neutral-400">{{
          item.time
        }}</span>
      </div>
    </template>
  </UCommandPalette>
</template>

<script setup lang="ts">
import type { Thread } from "~/composables/useThreadsStore";

const { searchRef } = useSearchRef();
const router = useRouter();

const searchTerm = ref("");
const debouncedSearchTerm = debouncedRef(searchTerm, 200);
const { $sync } = useNuxtApp();

const getThreadTime = (thread: Thread) => {
  return Math.max(thread.created_at, thread.last_message_at);
};

const formatThreadTime = (thread: Thread) => {
  const threadTime = getThreadTime(thread);
  const now = Date.now();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const threadDate = new Date(threadTime);

  if (threadDate >= today) {
    return threadDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (threadDate >= yesterday) {
    return "Yesterday";
  } else {
    return threadDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  }
};

const { data: searchResults, status } = await useAsyncData(
  "search",
  async () => {
    if (!debouncedSearchTerm.value.trim()) return [];
    return await $sync.searchThreads(debouncedSearchTerm.value);
  },
  {
    watch: [debouncedSearchTerm],
    default: () => [],
  },
);

const groupedThreads = computed(() => {
  if (!searchResults.value || searchResults.value.length === 0) {
    return [];
  }
  return [
    {
      id: "threads",
      label: "Threads",
      items: searchResults.value.map((thread: any) => ({
        id: thread.id,
        label: thread.title,
        threadId: thread.id,
        time: formatThreadTime(thread),
      })),
      ignoreFilter: true,
    },
  ];
});

const update = (val: boolean) => {
  searchRef.value = val;
};

const onSelect = (item: any) => {
  if (item?.threadId) {
    router.push(`/${item.threadId}`);
    searchRef.value = false;
  }
};

// defineShortcuts({
//   meta_g: () => {
//     searchRef.value = !searchRef.value;
//   },
// });
</script>
````

## File: packages/app/app/layouts/chat.vue
````vue
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
        :overlay="false"
        v-model:open="settingsRef"
        :ui="{
          content: 'bg-transparent w-auto max-w-none mx-auto',
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
````

## File: packages/app/public/SharedService_ServiceWorker.js
````javascript
"use strict";

// Install the service worker as soon as possible.
globalThis.addEventListener(
  "install",
  (/** @type {ExtendableEvent} */ event) => {
    event.waitUntil(globalThis.skipWaiting());
  },
);
globalThis.addEventListener(
  "activate",
  (/** @type {ExtendableEvent} */ event) => {
    event.waitUntil(globalThis.clients.claim());
  },
);

async function log(text) {
  await new Promise((res) => setTimeout(res, 0));
  throw new Error(text);
}

// Forward messages (and ports) from client to client.
globalThis.addEventListener("message", async (event) => {
  if (event.data?.get_client_id) {
    event.source.postMessage({
      client_id: event.source.id,
    });
  } else if (event.data?.sharedService) {
    const client = await globalThis.clients.get(event.data.clientId);
    client.postMessage(event.data, event.ports);
  }
});

// Tell clients their clientId. A service worker isn't actually needed
// for a context to get its clientId, but this also doubles as a way
// to verify that the service worker is active.
globalThis.addEventListener(
  "fetch",
  async (/** @type {FetchEvent} */ event) => {
    if (event.request.url === globalThis.registration.scope + "clientId") {
      return event.respondWith(
        new Response(event.clientId, {
          headers: { "Content-Type": "text/plain" },
        }),
      );
    }
  },
);
````

## File: .gitignore
````
# tmp files
.#*

# Nuxt dev/build outputs
.output
.data
.nuxt
.nitro
.cache
dist

# Node dependencies
node_modules

# Logs
logs
*.log

# Misc
.DS_Store
.fleet
.idea

# Local env files
.env
.env.*
!.env.example

# ai coding
.aider*
.opencode

# wrangler
.wrangler

# alchemy
.alchemy
wrangler.jsonc
````

## File: packages/api/types.ts
````typescript
import * as v from "valibot";

export const NewThreadSchema = v.object({
  type: v.literal("new_thread"),
  data: v.object({
    id: v.string(),
    title: v.optional(v.string()),
    parent_thread_id: v.optional(v.string()),
  }),
});

export const UpdateThreadSchema = v.object({
  type: v.literal("update_thread"),
  data: v.object({
    id: v.string(),
    title: v.optional(v.string()),
    deleted: v.optional(v.boolean()),
    pinned: v.optional(v.boolean()),
  }),
});

const ModelOptionsSchema = v.object({
  name: v.string(),
  thinkingBudget: v.optional(v.picklist(["low", "medium", "high"])),
  webSearch: v.optional(v.boolean()),
});

const MessageDataSchema = v.object({
  content: v.string(),

  // for assistant messages, we store what model and options were used to generate the message.
  modelOptions: v.optional(ModelOptionsSchema),

  // for user messages, images/pdfs attached to the message
  attachments: v.optional(
    v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        type: v.picklist([
          "image/jpeg",
          "image/png",
          "image/webp",
          "application/pdf",
        ]),
      }),
    ),
  ),
});

export const NewMessageSchema = v.object({
  type: v.literal("new_message"),
  data: v.object({
    id: v.string(),
    data: MessageDataSchema,
    role: v.picklist(["user", "assistant", "system"]),
    threadId: v.string(),
  }),
});

export const UpdateMessageSchema = v.object({
  type: v.literal("update_message"),
  data: v.object({
    id: v.string(),
    data: v.optional(v.partial(MessageDataSchema)),
    deleted: v.optional(v.boolean()),
  }),
});

export const RunThreadSchema = v.object({
  type: v.literal("run_thread"),
  data: v.object({
    threadId: v.string(),
    messageId: v.optional(v.string()),
    options: v.optional(v.partial(ModelOptionsSchema)),
  }),
});

export const SetKVSchema = v.object({
  type: v.literal("set_kv"),
  data: v.object({
    name: v.string(),
    value: v.optional(v.string()),
  }),
});

export const StopThreadSchema = v.object({
  type: v.literal("stop_thread"),
  data: v.object({
    threadId: v.string(),
  }),
});

export const BranchThreadSchema = v.object({
  type: v.literal("branch_thread"),
  data: v.object({
    newThreadId: v.string(),
    threadId: v.string(),
    messageId: v.string(),
  }),
});

export const PushEventSchema = v.object({
  id: v.string(),
  events: v.array(
    v.union([
      NewThreadSchema,
      UpdateThreadSchema,
      NewMessageSchema,
      UpdateMessageSchema,
      RunThreadSchema,
      SetKVSchema,
      StopThreadSchema,
      BranchThreadSchema,
    ]),
  ),
});

export type PushEvent = v.InferOutput<typeof PushEventSchema>;

export type SyncEvent = {
  type: "thread" | "message" | "kv";
  clock: number;
  data: any;
};
````

## File: packages/api/wrangler.toml
````toml
name = "nuxflare-chat-api"
main = "index.ts"
compatibility_date = "2024-11-12"
compatibility_flags = [ "nodejs_compat", "enable_request_signal" ]

[[durable_objects.bindings]]
name = "USER"
class_name = "User"
[[durable_objects.bindings]]
name = "STREAM"
class_name = "Stream"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["User", "Stream"]

[[r2_buckets]]
binding = "BLOB"
bucket_name = "blobs"

# OpenRouter env bindings
[vars]
# Client ID and secret for OpenRouter OAuth
OPENROUTER_CLIENT_ID = ""
OPENROUTER_CLIENT_SECRET = ""
OPENROUTER_AUTH_URL = ""
OPENROUTER_TOKEN_URL = ""
OPENROUTER_USERINFO_URL = ""
OPENROUTER_REDIRECT_URI = ""

[[rules]] 
type = "Text"
globs = ["**/*.sql", "**/*.md"]
fallthrough = true
````

## File: packages/app/app/components/Reasoning.vue
````vue
<template>
  <UAccordion
    :items="items"
    :ui="{
      root: 'rounded-lg px-2 bg-neutral-100 dark:bg-neutral-800',
      content: 'px-2 pb-2',
      body: 'text-md',
      trigger: 'cursor-pointer relative',
      trailingIcon:
        'group-data-[state=open]:rotate-0 group-data-[state=closed]:-rotate-90 absolute left-0',
    }"
  >
    <template #default="{ item }">
      <p class="text-[15px] font-medium ml-8">{{ item.label }}</p>
    </template>
    <template #content>
      <MarkdownRenderer :content="content" />
    </template>
  </UAccordion>
</template>

<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";
interface Props {
  content: string;
}
const { content } = defineProps<Props>();
const items = ref<AccordionItem[]>([
  {
    label: "Reasoning",
  },
]);

// preprocess markdown
onMounted(() => {
  processMarkdownChunk(content);
});
</script>
````

## File: packages/app/app/components/Settings.vue
````vue
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
````

## File: packages/app/app/components/Sidebar.vue
````vue
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

const actions = [
  {
    icon: "i-lucide:settings",
    name: "Settings",
    action: () => {
      settingsRef.value = true;
      popperOpen.value = false;
    },
  },
  {
    icon: "i-heroicons-solid:logout",
    name: "Logout",
    action: async () => {
      console.log("implement");
    },
  },
];

const threadsStore = useThreadsStore();
const {
  pinnedThreads: pinnedThreadsFromStore,
  unpinnedThreads: groupedThreadsFromStore,
} = storeToRefs(threadsStore);
</script>
````

## File: package.json
````json
{
  "name": "nuxflare-chat",
  "version": "0.0.0",
  "scripts": {
    "deploy": "nuxflare deploy",
    "format": "prettier -w ."
  },
  "workspaces": [
    "packages/*"
  ],
  "devDependencies": {
    "prettier": "3.6.0"
  },
  "dependencies": {
    "alchemy": "^0.40.1"
  },
  "trustedDependencies": [
    "@nuxflare-chat/app",
    "@parcel/watcher",
    "@swc/core",
    "@tailwindcss/oxide"
  ]
}
````

## File: packages/app/app/components/chat/ChatPrompt.vue
````vue
<template>
  <div
    class="backdrop-blur-md bg-neutral-100/90 dark:bg-neutral-800/80 ring-neutral-300/80 dark:ring-neutral-200/20"
    :class="[!bottom ? 'rounded-xl ring-1' : 'rounded-t-xl ring-2']"
  >
    <div class="p-2 px-3 rounded-t-xl w-full h-full">
      <!-- Selected files preview -->
      <div
        v-if="attachmentFiles.length > 0"
        class="mb-3 flex overflow-x-auto py-2 gap-3 scrollbar-custom"
      >
        <div
          v-for="(file, index) in attachmentFiles"
          :key="index"
          class="relative flex-shrink-0"
        >
          <div
            v-if="file.type.startsWith('image/')"
            class="w-16 h-16 rounded-md overflow-hidden bg-neutral-200 dark:bg-neutral-600"
          >
            <img
              :src="getImagePreview(file)"
              :alt="file.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div
            v-else
            class="w-16 h-16 rounded-md bg-neutral-200/80 dark:bg-neutral-700 flex flex-col items-center justify-center"
          >
            <div class="text-lg">
              {{ file.type === "application/pdf" ? "📄" : "📄" }}
            </div>
            <span
              class="text-xs text-neutral-600 dark:text-neutral-400 truncate w-full text-center px-1"
              >{{ file.name }}</span
            >
          </div>
          <UButton
            @click="removeFile(index)"
            variant="ghost"
            icon="i-heroicons:x-mark"
            size="xs"
            color="neutral"
            class="absolute -top-2 -right-2 bg-neutral-900 dark:bg-neutral-200 hover:bg-neutral-900 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm p-0.5 dark:neutral-800 rounded-full z-20 dark:border-neutral-800"
          />
        </div>
      </div>

      <UTextarea
        v-model="message"
        autoresize
        :maxrows="8"
        placeholder="Type your message here..."
        :ui="{
          root: 'w-full py-2',
          base: 'p-0 bg-transparent ring-0 w-full focus-visible:ring-0 text-md placeholder:text-black/40 dark:placeholder:text-white/40 text-black dark:text-white',
        }"
        @keydown.enter.exact.prevent="handleSubmit"
      />
      <div class="py-1 flex justify-between">
        <div class="space-x-2 flex items-center">
          <ModelSelector @changeModel="changeModel" />

          <ReasoningBudget v-if="currentModel.reasoningAbility" />

          <UButton
            v-if="currentModel.webSearch"
            @click="toggleWebSearch"
            variant="subtle"
            icon="i-heroicons:globe-alt"
            label="Search"
            size="sm"
            :color="webSearch ? 'primary' : 'neutral'"
            class="chat-prompt-icons"
            :class="[
              webSearch
                ? 'text-neutral-800! dark:text-white! bg-primary-400/20 dark:bg-primary-500/20'
                : '',
            ]"
          />

          <UTooltip :text="attachmentTooltip">
            <div>
              <UButton
                @click="openFileExplorer"
                variant="subtle"
                icon="i-iconoir:attachment"
                size="sm"
                color="neutral"
                class="chat-prompt-icons"
              />
            </div>
          </UTooltip>
        </div>

        <div></div>
        <UTooltip
          :disabled="!!message.trim() && !responseStreaming"
          :text="
            responseStreaming
              ? 'Stop response generation'
              : uploadingAttachment
                ? 'Uploading attachment'
                : 'Message requires text'
          "
        >
          <UButton
            :loading="stopStreaming"
            @click="handleSubmit"
            variant="subtle"
            :icon="
              responseStreaming && !stopStreaming
                ? 'i-material-symbols:stop-rounded'
                : 'i-lucide:arrow-up'
            "
            :disabled="
              (!message.trim() && !responseStreaming) || uploadingAttachment
            "
            size="md"
            :ui="{
              base: 'disabled:bg-primary-500/50 disabled:dark:bg-primary-400/20 bg-primary-800/80 hover:bg-primary-800/70 dark:bg-primary-700/30 hover:dark:bg-primary-700/20 disabled:dark:text-white/40 text-white/80',
            }"
          />
        </UTooltip>
      </div>
    </div>

    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      multiple
      class="hidden"
      @change="handleFileSelection"
      :accept="acceptedFileTypes"
    />
  </div>
</template>

<script setup lang="ts">
const promptStore = usePromptStore();
const { message, uploadingAttachment } = storeToRefs(promptStore);

const threadsStore = useThreadsStore();
const { responseStreaming, stopStreaming } = storeToRefs(threadsStore);

const emit = defineEmits(["send"]);

const handleSubmit = () => {
  if (responseStreaming.value) {
    stopStreaming.value = true;
    // TODO: logic for stopping the response generation
  } else {
    if (message.value.trim()) {
      emit("send", message.value);
    }
  }
};

const { bottom } = defineProps({
  bottom: {
    type: Boolean,
    default: () => false,
  },
});

const { attachmentTooltip } = storeToRefs(promptStore);
const { currentModel } = storeToRefs(promptStore);
const { webSearch } = storeToRefs(promptStore);

const changeModel = (model: any) => {
  if (!model.webSearch) promptStore.toggleWebSearch();
  if (
    !model.imageUploads === currentModel.value.imageUploads ||
    !model.pdfUploads === currentModel.value.pdfUploads
  ) {
    promptStore.clearAttachmentFiles();
  }
};

const fileInput = ref<HTMLInputElement>();
const { attachmentFiles } = storeToRefs(promptStore);

const openFileExplorer = () => {
  fileInput.value?.click();
};

const handleFileSelection = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    [...files].forEach((file) => promptStore.addAttachmentFile(file));
    (event.target as HTMLInputElement).value = "";
  }
};

const getImagePreview = (file: File) => {
  return URL.createObjectURL(file);
};

const removeFile = (index: number) => {
  promptStore.removeAttachmentFile(index);
};

const acceptedFileTypes = computed(() => {
  const model = currentModel.value as any;
  const types = ["text/*"];
  if (model.imageUploads) {
    types.push("image/png", "image/jpeg", "image/webp");
  }
  if (model.pdfUploads) {
    types.push("application/pdf");
  }
  return types.join(",");
});

const toggleWebSearch = () => {
  promptStore.toggleWebSearch();
};
</script>
````

## File: packages/app/app/components/ChatThread.vue
````vue
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
        <UTooltip
          v-if="editableThreadId != thread.id"
          :text="thread.title"
          :disableHoverableContent="true"
        >
          <span
            class="text-sm font-medium text-neutral-500 dark:text-neutral-400 truncate"
            @dblclick="editThread(thread)"
          >
            {{ thread.title }}
          </span>
        </UTooltip>
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
              <div class="p-1 bg-white dark:bg-black rounded-lg min-w-35">
                <div
                  v-for="moreAction in moreActions"
                  :key="moreAction.icon"
                  class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800/70 font-semibold rounded cursor-pointer"
                  @click="moreAction.action(thread)"
                >
                  <UIcon :name="moreAction.icon" class="size-4" />
                  <span>{{ moreAction.name }}</span>
                </div>
              </div>
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
````

## File: packages/app/app/components/MarkdownRenderer.vue
````vue
<template>
  <div
    class="prose dark:prose-invert [&>div:last-child>p:last-child]:mb-0 [&>div:first-child>p:first-child]:mt-0 overflow-x-auto"
  >
    <MarkdownChunkRenderer
      v-for="(b, index) in blocks"
      :key="index"
      :block="b"
    />
  </div>
</template>

<script setup lang="ts">
import { marked } from "marked";

const { content, chunked } = defineProps<{
  content: string;
  chunked?: boolean;
}>();
const blocks = computed(() =>
  chunked ? marked.lexer(content || "").map((block) => block.raw) : [content],
);
</script>
````

## File: packages/app/app/composables/usePromptStore.ts
````typescript
import { useModelStore } from "./useModelStore";
import { useThreadsStore } from "./useThreadsStore";

export interface Prompt {
  threadId: string;
  currentModel: any;
  thinkingBudget: string;
  webSearch: boolean;
  message: string | null;
  attachmentFiles: File[];
  attachmentTooltip: string;
  uploadingAttachment?: boolean;
}

export const usePromptStore = defineStore("prompt", () => {
  const threadsStore = useThreadsStore();
  const modelStore = useModelStore();
  const { activeThread } = storeToRefs(threadsStore);

  const prompts = ref<Record<string, Prompt>>({});
  const defaultModel = modelStore.models[0];

  const uploadingAttachment = ref(false);

  watch(uploadingAttachment, (newValue) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].uploadingAttachment = newValue;
    }
  });

  function setUploadingAttachment(value: boolean) {
    uploadingAttachment.value = value;
  }

  const { input: message } = useTextareaAutosize();

  watch(message, (newMessage) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].message = newMessage;
    }
  });

  const currentModel = ref<any>(defaultModel);

  watch(currentModel, (newModel) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].currentModel = newModel;
      setAttachmentTooltip(threadId);
    }
  });

  function setCurrentModel(threadId: string) {
    currentModel.value = threadId
      ? prompts.value[threadId]?.currentModel || defaultModel
      : defaultModel;
  }

  const newChatId = ref("");

  function removeNewChatFromPrompts() {
    // if(newChatId.value === '') return;
    delete prompts.value?.[newChatId.value];
    newChatId.value = "";
  }

  watch(activeThread, (newThreadId) => {
    if (newThreadId && !newThreadId.split("-").includes("new")) {
      initializePromptsFromThreads(newThreadId);
    } else {
      // first step
      if (!newChatId.value) {
        newChatId.value = `new-${crypto.randomUUID()}`;
        prompts.value[newChatId.value] = {
          threadId: newChatId.value,
          currentModel: defaultModel,
          thinkingBudget: "high",
          webSearch: false,
          message: null,
          attachmentFiles: [],
          attachmentTooltip:
            "Add an attachment\nAccepts: Text, PNG, JPEG, GIF, PDF",
        };
        activeThread.value = newChatId.value;
      } else {
        const chatId = newChatId.value;
        activeThread.value = newChatId.value;
        setCurrentModel(chatId);
        setAttachmentTooltip(chatId);
        setThinkingBudget(chatId);
        setWebSearch(chatId);
        setAttachmentFiles(chatId);
        setMessage(chatId);
      }
    }
  });

  const thinkingBudget = ref("high");

  watch(thinkingBudget, (newBudget) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].thinkingBudget = newBudget;
    }
  });

  const webSearch = ref(false);

  watch(webSearch, (newWebSearch) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].webSearch = newWebSearch;
    }
  });

  const attachmentFiles = ref<File[]>([]);

  watch(attachmentFiles, (newFiles) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].attachmentFiles = newFiles;
    }
  });

  const attachmentTooltip = ref("Add an attachment");

  watch(attachmentTooltip, (newTooltip) => {
    const threadId = activeThread.value;
    if (threadId && prompts.value[threadId]) {
      prompts.value[threadId].attachmentTooltip = newTooltip;
    }
  });

  function setThinkingBudget(threadId: string) {
    thinkingBudget.value = threadId
      ? prompts.value[threadId]?.thinkingBudget || "high"
      : "high";
  }

  function toggleWebSearch() {
    webSearch.value = !webSearch.value;
  }

  function setWebSearch(threadId?: string | null) {
    webSearch.value = threadId
      ? prompts.value[threadId]?.webSearch || false
      : false;
  }

  function setMessage(threadId?: string | null) {
    message.value = threadId ? prompts.value[threadId]?.message || "" : "";
  }

  function resetMessage() {
    message.value = "";
  }

  function setAttachmentFiles(threadId?: string | null) {
    const currentThreadId = threadId || activeThread.value;
    attachmentFiles.value = currentThreadId
      ? prompts.value[currentThreadId]?.attachmentFiles || []
      : [];
  }

  function addAttachmentFile(file: File) {
    attachmentFiles.value.push(file);
  }

  function removeAttachmentFile(index: number) {
    attachmentFiles.value = attachmentFiles.value || [];

    if (index >= 0 && index < attachmentFiles.value.length) {
      attachmentFiles.value.splice(index, 1);
    } else {
      console.warn("Invalid index for removing attachment file");
    }
  }

  function clearAttachmentFiles() {
    attachmentFiles.value = [];
  }

  function setAttachmentTooltip(threadId: string | null) {
    if (threadId && prompts.value[threadId]) {
      const model = prompts.value[threadId].currentModel as any;
      if (model.imageUploads && model.pdfUploads) {
        attachmentTooltip.value =
          "Add an attachment\nAccepts: Text, PNG, JPEG, GIF, PDF";
      } else if (model.imageUploads) {
        attachmentTooltip.value =
          "Add an attachment\nAccepts: Text, PNG, JPEG, GIF";
      } else if (model.pdfUploads) {
        attachmentTooltip.value = "Add an attachment\nAccepts: Text, PDF";
      } else {
        attachmentTooltip.value = "Add an attachment\nAccepts: Text";
      }
    }
  }

  function initializePromptsFromThreads(threadId: string) {
    if (!threadId) return;
    const messagesList = ref<any[]>([]);

    // Check if thread already exists in prompts
    if (prompts.value[threadId]) {
      resetValues(threadId);
      return;
    }

    if (import.meta.client) {
      const { $sync } = useNuxtApp();
      $sync.getMessagesForThread?.(threadId).then((msgs: any[]) => {
        messagesList.value = msgs;

        const modelStore = useModelStore();
        const { models } = modelStore;

        // Take the last item from messagesList
        if (messagesList && messagesList.value.length > 0) {
          const lastMessage = messagesList.value[messagesList.value.length - 1];

          const chatId = newChatId.value;
          // Extract values with defaults
          let currentModel =
            prompts.value[chatId]?.currentModel || defaultModel;
          if (lastMessage.data.modelOptions && models) {
            const matchedModel = models.find(
              (model) => model.label === lastMessage.data.modelOptions.name,
            );
            if (matchedModel) {
              currentModel = matchedModel;
            }
          }

          const thinkingBudget =
            lastMessage.data?.modelOptions?.thinkingBudget ||
            prompts.value[chatId]?.thinkingBudget ||
            "high";
          const webSearch =
            lastMessage.data?.modelOptions?.webSearch ||
            prompts.value[chatId]?.webSearch ||
            false;

          // Initialize or update prompt object
          prompts.value[threadId] = {
            threadId,
            currentModel,
            thinkingBudget,
            webSearch,
            message: null,
            attachmentFiles: [],
            attachmentTooltip:
              prompts.value[chatId]?.attachmentTooltip || "Add an attachment",
          };

          resetValues(threadId);
          removeNewChatFromPrompts();
        } else {
          resetMessage();
          clearAttachmentFiles();
          const chatId = newChatId.value;
          setCurrentModel(chatId);
          setAttachmentTooltip(chatId);
          setThinkingBudget(chatId);
          setWebSearch(chatId);
          setAttachmentFiles(chatId);
        }
      });
    }
  }

  function resetValues(threadId: string) {
    setCurrentModel(threadId);
    setAttachmentTooltip(threadId);
    setThinkingBudget(threadId);
    setWebSearch(threadId);
    setAttachmentFiles(threadId);
    setMessage(threadId);
  }

  return {
    prompts,
    currentModel,
    thinkingBudget,
    webSearch,
    message,
    attachmentFiles,
    attachmentTooltip,
    uploadingAttachment,
    setUploadingAttachment,
    removeNewChatFromPrompts,
    setCurrentModel,
    setThinkingBudget,
    toggleWebSearch,
    setMessage,
    resetMessage,
    setAttachmentFiles,
    addAttachmentFile,
    removeAttachmentFile,
    clearAttachmentFiles,
    setAttachmentTooltip,
    initializePromptsFromThreads,
  };
});
````

## File: packages/api/worker-configuration.d.ts
````typescript
/* eslint-disable */
// Generated by Wrangler by running `wrangler types` (hash: ba094bc28a92200dcae646727baed67e)
// Runtime types generated with workerd@1.20250617.0 2024-11-12 enable_request_signal,nodejs_compat
declare namespace Cloudflare {
  interface Env {
    AUTH_URL: string;
    AUTH_CLIENT_ID: string;
    USER: DurableObjectNamespace<import("./index").User>;
    STREAM: DurableObjectNamespace<import("./index").Stream>;
    BLOB: R2Bucket;
  }
}
interface Env extends Cloudflare.Env {}
declare module "*.sql" {
  const value: string;
  export default value;
}
declare module "*.md" {
  const value: string;
  export default value;
}
// Begin runtime types
/*! *****************************************************************************
Copyright (c) Cloudflare. All rights reserved.
Copyright (c) Microsoft Corporation. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* eslint-disable */
// noinspection JSUnusedGlobalSymbols
declare var onmessage: never;
/**
 * An abnormal event (called an exception) which occurs as a result of calling a method or accessing a property of a web API.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMException)
 */
declare class DOMException extends Error {
  constructor(message?: string, name?: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMException/message) */
  readonly message: string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMException/name) */
  readonly name: string;
  /**
   * @deprecated
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMException/code)
   */
  readonly code: number;
  static readonly INDEX_SIZE_ERR: number;
  static readonly DOMSTRING_SIZE_ERR: number;
  static readonly HIERARCHY_REQUEST_ERR: number;
  static readonly WRONG_DOCUMENT_ERR: number;
  static readonly INVALID_CHARACTER_ERR: number;
  static readonly NO_DATA_ALLOWED_ERR: number;
  static readonly NO_MODIFICATION_ALLOWED_ERR: number;
  static readonly NOT_FOUND_ERR: number;
  static readonly NOT_SUPPORTED_ERR: number;
  static readonly INUSE_ATTRIBUTE_ERR: number;
  static readonly INVALID_STATE_ERR: number;
  static readonly SYNTAX_ERR: number;
  static readonly INVALID_MODIFICATION_ERR: number;
  static readonly NAMESPACE_ERR: number;
  static readonly INVALID_ACCESS_ERR: number;
  static readonly VALIDATION_ERR: number;
  static readonly TYPE_MISMATCH_ERR: number;
  static readonly SECURITY_ERR: number;
  static readonly NETWORK_ERR: number;
  static readonly ABORT_ERR: number;
  static readonly URL_MISMATCH_ERR: number;
  static readonly QUOTA_EXCEEDED_ERR: number;
  static readonly TIMEOUT_ERR: number;
  static readonly INVALID_NODE_TYPE_ERR: number;
  static readonly DATA_CLONE_ERR: number;
  get stack(): any;
  set stack(value: any);
}
type WorkerGlobalScopeEventMap = {
  fetch: FetchEvent;
  scheduled: ScheduledEvent;
  queue: QueueEvent;
  unhandledrejection: PromiseRejectionEvent;
  rejectionhandled: PromiseRejectionEvent;
};
declare abstract class WorkerGlobalScope extends EventTarget<WorkerGlobalScopeEventMap> {
  EventTarget: typeof EventTarget;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console) */
interface Console {
  "assert"(condition?: boolean, ...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/clear_static) */
  clear(): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/count_static) */
  count(label?: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/countReset_static) */
  countReset(label?: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/debug_static) */
  debug(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/dir_static) */
  dir(item?: any, options?: any): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/dirxml_static) */
  dirxml(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/error_static) */
  error(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/group_static) */
  group(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/groupCollapsed_static) */
  groupCollapsed(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/groupEnd_static) */
  groupEnd(): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/info_static) */
  info(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/log_static) */
  log(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/table_static) */
  table(tabularData?: any, properties?: string[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/time_static) */
  time(label?: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/timeEnd_static) */
  timeEnd(label?: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/timeLog_static) */
  timeLog(label?: string, ...data: any[]): void;
  timeStamp(label?: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/trace_static) */
  trace(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/warn_static) */
  warn(...data: any[]): void;
}
declare const console: Console;
type BufferSource = ArrayBufferView | ArrayBuffer;
type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;
declare namespace WebAssembly {
  class CompileError extends Error {
    constructor(message?: string);
  }
  class RuntimeError extends Error {
    constructor(message?: string);
  }
  type ValueType =
    | "anyfunc"
    | "externref"
    | "f32"
    | "f64"
    | "i32"
    | "i64"
    | "v128";
  interface GlobalDescriptor {
    value: ValueType;
    mutable?: boolean;
  }
  class Global {
    constructor(descriptor: GlobalDescriptor, value?: any);
    value: any;
    valueOf(): any;
  }
  type ImportValue = ExportValue | number;
  type ModuleImports = Record<string, ImportValue>;
  type Imports = Record<string, ModuleImports>;
  type ExportValue = Function | Global | Memory | Table;
  type Exports = Record<string, ExportValue>;
  class Instance {
    constructor(module: Module, imports?: Imports);
    readonly exports: Exports;
  }
  interface MemoryDescriptor {
    initial: number;
    maximum?: number;
    shared?: boolean;
  }
  class Memory {
    constructor(descriptor: MemoryDescriptor);
    readonly buffer: ArrayBuffer;
    grow(delta: number): number;
  }
  type ImportExportKind = "function" | "global" | "memory" | "table";
  interface ModuleExportDescriptor {
    kind: ImportExportKind;
    name: string;
  }
  interface ModuleImportDescriptor {
    kind: ImportExportKind;
    module: string;
    name: string;
  }
  abstract class Module {
    static customSections(module: Module, sectionName: string): ArrayBuffer[];
    static exports(module: Module): ModuleExportDescriptor[];
    static imports(module: Module): ModuleImportDescriptor[];
  }
  type TableKind = "anyfunc" | "externref";
  interface TableDescriptor {
    element: TableKind;
    initial: number;
    maximum?: number;
  }
  class Table {
    constructor(descriptor: TableDescriptor, value?: any);
    readonly length: number;
    get(index: number): any;
    grow(delta: number, value?: any): number;
    set(index: number, value?: any): void;
  }
  function instantiate(module: Module, imports?: Imports): Promise<Instance>;
  function validate(bytes: BufferSource): boolean;
}
/**
 * This ServiceWorker API interface represents the global execution context of a service worker.
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope)
 */
interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  DOMException: typeof DOMException;
  WorkerGlobalScope: typeof WorkerGlobalScope;
  btoa(data: string): string;
  atob(data: string): string;
  setTimeout(callback: (...args: any[]) => void, msDelay?: number): number;
  setTimeout<Args extends any[]>(
    callback: (...args: Args) => void,
    msDelay?: number,
    ...args: Args
  ): number;
  clearTimeout(timeoutId: number | null): void;
  setInterval(callback: (...args: any[]) => void, msDelay?: number): number;
  setInterval<Args extends any[]>(
    callback: (...args: Args) => void,
    msDelay?: number,
    ...args: Args
  ): number;
  clearInterval(timeoutId: number | null): void;
  queueMicrotask(task: Function): void;
  structuredClone<T>(value: T, options?: StructuredSerializeOptions): T;
  reportError(error: any): void;
  fetch(
    input: RequestInfo | URL,
    init?: RequestInit<RequestInitCfProperties>,
  ): Promise<Response>;
  self: ServiceWorkerGlobalScope;
  crypto: Crypto;
  caches: CacheStorage;
  scheduler: Scheduler;
  performance: Performance;
  Cloudflare: Cloudflare;
  readonly origin: string;
  Event: typeof Event;
  ExtendableEvent: typeof ExtendableEvent;
  CustomEvent: typeof CustomEvent;
  PromiseRejectionEvent: typeof PromiseRejectionEvent;
  FetchEvent: typeof FetchEvent;
  TailEvent: typeof TailEvent;
  TraceEvent: typeof TailEvent;
  ScheduledEvent: typeof ScheduledEvent;
  MessageEvent: typeof MessageEvent;
  CloseEvent: typeof CloseEvent;
  ReadableStreamDefaultReader: typeof ReadableStreamDefaultReader;
  ReadableStreamBYOBReader: typeof ReadableStreamBYOBReader;
  ReadableStream: typeof ReadableStream;
  WritableStream: typeof WritableStream;
  WritableStreamDefaultWriter: typeof WritableStreamDefaultWriter;
  TransformStream: typeof TransformStream;
  ByteLengthQueuingStrategy: typeof ByteLengthQueuingStrategy;
  CountQueuingStrategy: typeof CountQueuingStrategy;
  ErrorEvent: typeof ErrorEvent;
  EventSource: typeof EventSource;
  ReadableStreamBYOBRequest: typeof ReadableStreamBYOBRequest;
  ReadableStreamDefaultController: typeof ReadableStreamDefaultController;
  ReadableByteStreamController: typeof ReadableByteStreamController;
  WritableStreamDefaultController: typeof WritableStreamDefaultController;
  TransformStreamDefaultController: typeof TransformStreamDefaultController;
  CompressionStream: typeof CompressionStream;
  DecompressionStream: typeof DecompressionStream;
  TextEncoderStream: typeof TextEncoderStream;
  TextDecoderStream: typeof TextDecoderStream;
  Headers: typeof Headers;
  Body: typeof Body;
  Request: typeof Request;
  Response: typeof Response;
  WebSocket: typeof WebSocket;
  WebSocketPair: typeof WebSocketPair;
  WebSocketRequestResponsePair: typeof WebSocketRequestResponsePair;
  AbortController: typeof AbortController;
  AbortSignal: typeof AbortSignal;
  TextDecoder: typeof TextDecoder;
  TextEncoder: typeof TextEncoder;
  navigator: Navigator;
  Navigator: typeof Navigator;
  URL: typeof URL;
  URLSearchParams: typeof URLSearchParams;
  URLPattern: typeof URLPattern;
  Blob: typeof Blob;
  File: typeof File;
  FormData: typeof FormData;
  Crypto: typeof Crypto;
  SubtleCrypto: typeof SubtleCrypto;
  CryptoKey: typeof CryptoKey;
  CacheStorage: typeof CacheStorage;
  Cache: typeof Cache;
  FixedLengthStream: typeof FixedLengthStream;
  IdentityTransformStream: typeof IdentityTransformStream;
  HTMLRewriter: typeof HTMLRewriter;
}
declare function addEventListener<Type extends keyof WorkerGlobalScopeEventMap>(
  type: Type,
  handler: EventListenerOrEventListenerObject<WorkerGlobalScopeEventMap[Type]>,
  options?: EventTargetAddEventListenerOptions | boolean,
): void;
declare function removeEventListener<
  Type extends keyof WorkerGlobalScopeEventMap,
>(
  type: Type,
  handler: EventListenerOrEventListenerObject<WorkerGlobalScopeEventMap[Type]>,
  options?: EventTargetEventListenerOptions | boolean,
): void;
/**
 * Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)
 */
declare function dispatchEvent(
  event: WorkerGlobalScopeEventMap[keyof WorkerGlobalScopeEventMap],
): boolean;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/btoa) */
declare function btoa(data: string): string;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/atob) */
declare function atob(data: string): string;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/setTimeout) */
declare function setTimeout(
  callback: (...args: any[]) => void,
  msDelay?: number,
): number;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/setTimeout) */
declare function setTimeout<Args extends any[]>(
  callback: (...args: Args) => void,
  msDelay?: number,
  ...args: Args
): number;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/clearTimeout) */
declare function clearTimeout(timeoutId: number | null): void;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/setInterval) */
declare function setInterval(
  callback: (...args: any[]) => void,
  msDelay?: number,
): number;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/setInterval) */
declare function setInterval<Args extends any[]>(
  callback: (...args: Args) => void,
  msDelay?: number,
  ...args: Args
): number;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/clearInterval) */
declare function clearInterval(timeoutId: number | null): void;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/queueMicrotask) */
declare function queueMicrotask(task: Function): void;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/structuredClone) */
declare function structuredClone<T>(
  value: T,
  options?: StructuredSerializeOptions,
): T;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/reportError) */
declare function reportError(error: any): void;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch) */
declare function fetch(
  input: RequestInfo | URL,
  init?: RequestInit<RequestInitCfProperties>,
): Promise<Response>;
declare const self: ServiceWorkerGlobalScope;
/**
 * The Web Crypto API provides a set of low-level functions for common cryptographic tasks.
 * The Workers runtime implements the full surface of this API, but with some differences in
 * the [supported algorithms](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/#supported-algorithms)
 * compared to those implemented in most browsers.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/)
 */
declare const crypto: Crypto;
/**
 * The Cache API allows fine grained control of reading and writing from the Cloudflare global network cache.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/cache/)
 */
declare const caches: CacheStorage;
declare const scheduler: Scheduler;
/**
 * The Workers runtime supports a subset of the Performance API, used to measure timing and performance,
 * as well as timing of subrequests and other operations.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/performance/)
 */
declare const performance: Performance;
declare const Cloudflare: Cloudflare;
declare const origin: string;
declare const navigator: Navigator;
interface TestController {}
interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
  props: any;
}
type ExportedHandlerFetchHandler<Env = unknown, CfHostMetadata = unknown> = (
  request: Request<CfHostMetadata, IncomingRequestCfProperties<CfHostMetadata>>,
  env: Env,
  ctx: ExecutionContext,
) => Response | Promise<Response>;
type ExportedHandlerTailHandler<Env = unknown> = (
  events: TraceItem[],
  env: Env,
  ctx: ExecutionContext,
) => void | Promise<void>;
type ExportedHandlerTraceHandler<Env = unknown> = (
  traces: TraceItem[],
  env: Env,
  ctx: ExecutionContext,
) => void | Promise<void>;
type ExportedHandlerTailStreamHandler<Env = unknown> = (
  event: TailStream.TailEvent,
  env: Env,
  ctx: ExecutionContext,
) => TailStream.TailEventHandlerType | Promise<TailStream.TailEventHandlerType>;
type ExportedHandlerScheduledHandler<Env = unknown> = (
  controller: ScheduledController,
  env: Env,
  ctx: ExecutionContext,
) => void | Promise<void>;
type ExportedHandlerQueueHandler<Env = unknown, Message = unknown> = (
  batch: MessageBatch<Message>,
  env: Env,
  ctx: ExecutionContext,
) => void | Promise<void>;
type ExportedHandlerTestHandler<Env = unknown> = (
  controller: TestController,
  env: Env,
  ctx: ExecutionContext,
) => void | Promise<void>;
interface ExportedHandler<
  Env = unknown,
  QueueHandlerMessage = unknown,
  CfHostMetadata = unknown,
> {
  fetch?: ExportedHandlerFetchHandler<Env, CfHostMetadata>;
  tail?: ExportedHandlerTailHandler<Env>;
  trace?: ExportedHandlerTraceHandler<Env>;
  tailStream?: ExportedHandlerTailStreamHandler<Env>;
  scheduled?: ExportedHandlerScheduledHandler<Env>;
  test?: ExportedHandlerTestHandler<Env>;
  email?: EmailExportedHandler<Env>;
  queue?: ExportedHandlerQueueHandler<Env, QueueHandlerMessage>;
}
interface StructuredSerializeOptions {
  transfer?: any[];
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/PromiseRejectionEvent) */
declare abstract class PromiseRejectionEvent extends Event {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/PromiseRejectionEvent/promise) */
  readonly promise: Promise<any>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/PromiseRejectionEvent/reason) */
  readonly reason: any;
}
declare abstract class Navigator {
  sendBeacon(
    url: string,
    body?:
      | ReadableStream
      | string
      | (ArrayBuffer | ArrayBufferView)
      | Blob
      | FormData
      | URLSearchParams
      | URLSearchParams,
  ): boolean;
  readonly userAgent: string;
  readonly hardwareConcurrency: number;
}
/**
 * The Workers runtime supports a subset of the Performance API, used to measure timing and performance,
 * as well as timing of subrequests and other operations.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/performance/)
 */
interface Performance {
  /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/performance/#performancetimeorigin) */
  readonly timeOrigin: number;
  /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/performance/#performancenow) */
  now(): number;
}
interface AlarmInvocationInfo {
  readonly isRetry: boolean;
  readonly retryCount: number;
}
interface Cloudflare {
  readonly compatibilityFlags: Record<string, boolean>;
}
interface DurableObject {
  fetch(request: Request): Response | Promise<Response>;
  alarm?(alarmInfo?: AlarmInvocationInfo): void | Promise<void>;
  webSocketMessage?(
    ws: WebSocket,
    message: string | ArrayBuffer,
  ): void | Promise<void>;
  webSocketClose?(
    ws: WebSocket,
    code: number,
    reason: string,
    wasClean: boolean,
  ): void | Promise<void>;
  webSocketError?(ws: WebSocket, error: unknown): void | Promise<void>;
}
type DurableObjectStub<
  T extends Rpc.DurableObjectBranded | undefined = undefined,
> = Fetcher<
  T,
  "alarm" | "webSocketMessage" | "webSocketClose" | "webSocketError"
> & {
  readonly id: DurableObjectId;
  readonly name?: string;
};
interface DurableObjectId {
  toString(): string;
  equals(other: DurableObjectId): boolean;
  readonly name?: string;
}
interface DurableObjectNamespace<
  T extends Rpc.DurableObjectBranded | undefined = undefined,
> {
  newUniqueId(
    options?: DurableObjectNamespaceNewUniqueIdOptions,
  ): DurableObjectId;
  idFromName(name: string): DurableObjectId;
  idFromString(id: string): DurableObjectId;
  get(
    id: DurableObjectId,
    options?: DurableObjectNamespaceGetDurableObjectOptions,
  ): DurableObjectStub<T>;
  jurisdiction(
    jurisdiction: DurableObjectJurisdiction,
  ): DurableObjectNamespace<T>;
}
type DurableObjectJurisdiction = "eu" | "fedramp" | "fedramp-high";
interface DurableObjectNamespaceNewUniqueIdOptions {
  jurisdiction?: DurableObjectJurisdiction;
}
type DurableObjectLocationHint =
  | "wnam"
  | "enam"
  | "sam"
  | "weur"
  | "eeur"
  | "apac"
  | "oc"
  | "afr"
  | "me";
interface DurableObjectNamespaceGetDurableObjectOptions {
  locationHint?: DurableObjectLocationHint;
}
interface DurableObjectState {
  waitUntil(promise: Promise<any>): void;
  readonly id: DurableObjectId;
  readonly storage: DurableObjectStorage;
  container?: Container;
  blockConcurrencyWhile<T>(callback: () => Promise<T>): Promise<T>;
  acceptWebSocket(ws: WebSocket, tags?: string[]): void;
  getWebSockets(tag?: string): WebSocket[];
  setWebSocketAutoResponse(maybeReqResp?: WebSocketRequestResponsePair): void;
  getWebSocketAutoResponse(): WebSocketRequestResponsePair | null;
  getWebSocketAutoResponseTimestamp(ws: WebSocket): Date | null;
  setHibernatableWebSocketEventTimeout(timeoutMs?: number): void;
  getHibernatableWebSocketEventTimeout(): number | null;
  getTags(ws: WebSocket): string[];
  abort(reason?: string): void;
}
interface DurableObjectTransaction {
  get<T = unknown>(
    key: string,
    options?: DurableObjectGetOptions,
  ): Promise<T | undefined>;
  get<T = unknown>(
    keys: string[],
    options?: DurableObjectGetOptions,
  ): Promise<Map<string, T>>;
  list<T = unknown>(
    options?: DurableObjectListOptions,
  ): Promise<Map<string, T>>;
  put<T>(
    key: string,
    value: T,
    options?: DurableObjectPutOptions,
  ): Promise<void>;
  put<T>(
    entries: Record<string, T>,
    options?: DurableObjectPutOptions,
  ): Promise<void>;
  delete(key: string, options?: DurableObjectPutOptions): Promise<boolean>;
  delete(keys: string[], options?: DurableObjectPutOptions): Promise<number>;
  rollback(): void;
  getAlarm(options?: DurableObjectGetAlarmOptions): Promise<number | null>;
  setAlarm(
    scheduledTime: number | Date,
    options?: DurableObjectSetAlarmOptions,
  ): Promise<void>;
  deleteAlarm(options?: DurableObjectSetAlarmOptions): Promise<void>;
}
interface DurableObjectStorage {
  get<T = unknown>(
    key: string,
    options?: DurableObjectGetOptions,
  ): Promise<T | undefined>;
  get<T = unknown>(
    keys: string[],
    options?: DurableObjectGetOptions,
  ): Promise<Map<string, T>>;
  list<T = unknown>(
    options?: DurableObjectListOptions,
  ): Promise<Map<string, T>>;
  put<T>(
    key: string,
    value: T,
    options?: DurableObjectPutOptions,
  ): Promise<void>;
  put<T>(
    entries: Record<string, T>,
    options?: DurableObjectPutOptions,
  ): Promise<void>;
  delete(key: string, options?: DurableObjectPutOptions): Promise<boolean>;
  delete(keys: string[], options?: DurableObjectPutOptions): Promise<number>;
  deleteAll(options?: DurableObjectPutOptions): Promise<void>;
  transaction<T>(
    closure: (txn: DurableObjectTransaction) => Promise<T>,
  ): Promise<T>;
  getAlarm(options?: DurableObjectGetAlarmOptions): Promise<number | null>;
  setAlarm(
    scheduledTime: number | Date,
    options?: DurableObjectSetAlarmOptions,
  ): Promise<void>;
  deleteAlarm(options?: DurableObjectSetAlarmOptions): Promise<void>;
  sync(): Promise<void>;
  sql: SqlStorage;
  transactionSync<T>(closure: () => T): T;
  getCurrentBookmark(): Promise<string>;
  getBookmarkForTime(timestamp: number | Date): Promise<string>;
  onNextSessionRestoreBookmark(bookmark: string): Promise<string>;
}
interface DurableObjectListOptions {
  start?: string;
  startAfter?: string;
  end?: string;
  prefix?: string;
  reverse?: boolean;
  limit?: number;
  allowConcurrency?: boolean;
  noCache?: boolean;
}
interface DurableObjectGetOptions {
  allowConcurrency?: boolean;
  noCache?: boolean;
}
interface DurableObjectGetAlarmOptions {
  allowConcurrency?: boolean;
}
interface DurableObjectPutOptions {
  allowConcurrency?: boolean;
  allowUnconfirmed?: boolean;
  noCache?: boolean;
}
interface DurableObjectSetAlarmOptions {
  allowConcurrency?: boolean;
  allowUnconfirmed?: boolean;
}
declare class WebSocketRequestResponsePair {
  constructor(request: string, response: string);
  get request(): string;
  get response(): string;
}
interface AnalyticsEngineDataset {
  writeDataPoint(event?: AnalyticsEngineDataPoint): void;
}
interface AnalyticsEngineDataPoint {
  indexes?: ((ArrayBuffer | string) | null)[];
  doubles?: number[];
  blobs?: ((ArrayBuffer | string) | null)[];
}
/**
 * An event which takes place in the DOM.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event)
 */
declare class Event {
  constructor(type: string, init?: EventInit);
  /**
   * Returns the type of event, e.g. "click", "hashchange", or "submit".
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/type)
   */
  get type(): string;
  /**
   * Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PHASE.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/eventPhase)
   */
  get eventPhase(): number;
  /**
   * Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composed)
   */
  get composed(): boolean;
  /**
   * Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/bubbles)
   */
  get bubbles(): boolean;
  /**
   * Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelable)
   */
  get cancelable(): boolean;
  /**
   * Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/defaultPrevented)
   */
  get defaultPrevented(): boolean;
  /**
   * @deprecated
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/returnValue)
   */
  get returnValue(): boolean;
  /**
   * Returns the object whose event listener's callback is currently being invoked.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/currentTarget)
   */
  get currentTarget(): EventTarget | undefined;
  /**
   * Returns the object to which event is dispatched (its target).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/target)
   */
  get target(): EventTarget | undefined;
  /**
   * @deprecated
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/srcElement)
   */
  get srcElement(): EventTarget | undefined;
  /**
   * Returns the event's timestamp as the number of milliseconds measured relative to the time origin.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/timeStamp)
   */
  get timeStamp(): number;
  /**
   * Returns true if event was dispatched by the user agent, and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/isTrusted)
   */
  get isTrusted(): boolean;
  /**
   * @deprecated
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)
   */
  get cancelBubble(): boolean;
  /**
   * @deprecated
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)
   */
  set cancelBubble(value: boolean);
  /**
   * Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopImmediatePropagation)
   */
  stopImmediatePropagation(): void;
  /**
   * If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)
   */
  preventDefault(): void;
  /**
   * When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation)
   */
  stopPropagation(): void;
  /**
   * Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is "closed" that are not reachable from event's currentTarget.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composedPath)
   */
  composedPath(): EventTarget[];
  static readonly NONE: number;
  static readonly CAPTURING_PHASE: number;
  static readonly AT_TARGET: number;
  static readonly BUBBLING_PHASE: number;
}
interface EventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}
type EventListener<EventType extends Event = Event> = (
  event: EventType,
) => void;
interface EventListenerObject<EventType extends Event = Event> {
  handleEvent(event: EventType): void;
}
type EventListenerOrEventListenerObject<EventType extends Event = Event> =
  | EventListener<EventType>
  | EventListenerObject<EventType>;
/**
 * EventTarget is a DOM interface implemented by objects that can receive events and may have listeners for them.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget)
 */
declare class EventTarget<
  EventMap extends Record<string, Event> = Record<string, Event>,
> {
  constructor();
  /**
   * Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.
   *
   * The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture.
   *
   * When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.
   *
   * When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners.
   *
   * When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed.
   *
   * If an AbortSignal is passed for options's signal, then the event listener will be removed when signal is aborted.
   *
   * The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)
   */
  addEventListener<Type extends keyof EventMap>(
    type: Type,
    handler: EventListenerOrEventListenerObject<EventMap[Type]>,
    options?: EventTargetAddEventListenerOptions | boolean,
  ): void;
  /**
   * Removes the event listener in target's event listener list with the same type, callback, and options.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener)
   */
  removeEventListener<Type extends keyof EventMap>(
    type: Type,
    handler: EventListenerOrEventListenerObject<EventMap[Type]>,
    options?: EventTargetEventListenerOptions | boolean,
  ): void;
  /**
   * Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)
   */
  dispatchEvent(event: EventMap[keyof EventMap]): boolean;
}
interface EventTargetEventListenerOptions {
  capture?: boolean;
}
interface EventTargetAddEventListenerOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
  signal?: AbortSignal;
}
interface EventTargetHandlerObject {
  handleEvent: (event: Event) => any | undefined;
}
/**
 * A controller object that allows you to abort one or more DOM requests as and when desired.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController)
 */
declare class AbortController {
  constructor();
  /**
   * Returns the AbortSignal object associated with this object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController/signal)
   */
  get signal(): AbortSignal;
  /**
   * Invoking this method will set this object's AbortSignal's aborted flag and signal to any observers that the associated activity is to be aborted.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController/abort)
   */
  abort(reason?: any): void;
}
/**
 * A signal object that allows you to communicate with a DOM request (such as a Fetch) and abort it if required via an AbortController object.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal)
 */
declare abstract class AbortSignal extends EventTarget {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/abort_static) */
  static abort(reason?: any): AbortSignal;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/timeout_static) */
  static timeout(delay: number): AbortSignal;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/any_static) */
  static any(signals: AbortSignal[]): AbortSignal;
  /**
   * Returns true if this AbortSignal's AbortController has signaled to abort, and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/aborted)
   */
  get aborted(): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/reason) */
  get reason(): any;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/abort_event) */
  get onabort(): any | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/abort_event) */
  set onabort(value: any | null);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/throwIfAborted) */
  throwIfAborted(): void;
}
interface Scheduler {
  wait(delay: number, maybeOptions?: SchedulerWaitOptions): Promise<void>;
}
interface SchedulerWaitOptions {
  signal?: AbortSignal;
}
/**
 * Extends the lifetime of the install and activate events dispatched on the global scope as part of the service worker lifecycle. This ensures that any functional events (like FetchEvent) are not dispatched until it upgrades database schemas and deletes the outdated cache entries.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ExtendableEvent)
 */
declare abstract class ExtendableEvent extends Event {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ExtendableEvent/waitUntil) */
  waitUntil(promise: Promise<any>): void;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CustomEvent) */
declare class CustomEvent<T = any> extends Event {
  constructor(type: string, init?: CustomEventCustomEventInit);
  /**
   * Returns any custom data event was created with. Typically used for synthetic events.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CustomEvent/detail)
   */
  get detail(): T;
}
interface CustomEventCustomEventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail?: any;
}
/**
 * A file-like object of immutable, raw data. Blobs represent data that isn't necessarily in a JavaScript-native format. The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob)
 */
declare class Blob {
  constructor(
    type?: ((ArrayBuffer | ArrayBufferView) | string | Blob)[],
    options?: BlobOptions,
  );
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/size) */
  get size(): number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/type) */
  get type(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/slice) */
  slice(start?: number, end?: number, type?: string): Blob;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/arrayBuffer) */
  arrayBuffer(): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/bytes) */
  bytes(): Promise<Uint8Array>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/text) */
  text(): Promise<string>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/stream) */
  stream(): ReadableStream;
}
interface BlobOptions {
  type?: string;
}
/**
 * Provides information about files and allows JavaScript in a web page to access their content.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/File)
 */
declare class File extends Blob {
  constructor(
    bits: ((ArrayBuffer | ArrayBufferView) | string | Blob)[] | undefined,
    name: string,
    options?: FileOptions,
  );
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/name) */
  get name(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/lastModified) */
  get lastModified(): number;
}
interface FileOptions {
  type?: string;
  lastModified?: number;
}
/**
 * The Cache API allows fine grained control of reading and writing from the Cloudflare global network cache.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/cache/)
 */
declare abstract class CacheStorage {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CacheStorage/open) */
  open(cacheName: string): Promise<Cache>;
  readonly default: Cache;
}
/**
 * The Cache API allows fine grained control of reading and writing from the Cloudflare global network cache.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/cache/)
 */
declare abstract class Cache {
  /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/cache/#delete) */
  delete(
    request: RequestInfo | URL,
    options?: CacheQueryOptions,
  ): Promise<boolean>;
  /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/cache/#match) */
  match(
    request: RequestInfo | URL,
    options?: CacheQueryOptions,
  ): Promise<Response | undefined>;
  /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/cache/#put) */
  put(request: RequestInfo | URL, response: Response): Promise<void>;
}
interface CacheQueryOptions {
  ignoreMethod?: boolean;
}
/**
 * The Web Crypto API provides a set of low-level functions for common cryptographic tasks.
 * The Workers runtime implements the full surface of this API, but with some differences in
 * the [supported algorithms](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/#supported-algorithms)
 * compared to those implemented in most browsers.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/)
 */
declare abstract class Crypto {
  /**
   * Available only in secure contexts.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Crypto/subtle)
   */
  get subtle(): SubtleCrypto;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Crypto/getRandomValues) */
  getRandomValues<
    T extends
      | Int8Array
      | Uint8Array
      | Int16Array
      | Uint16Array
      | Int32Array
      | Uint32Array
      | BigInt64Array
      | BigUint64Array,
  >(buffer: T): T;
  /**
   * Available only in secure contexts.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Crypto/randomUUID)
   */
  randomUUID(): string;
  DigestStream: typeof DigestStream;
}
/**
 * This Web Crypto API interface provides a number of low-level cryptographic functions. It is accessed via the Crypto.subtle properties available in a window context (via Window.crypto).
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto)
 */
declare abstract class SubtleCrypto {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/encrypt) */
  encrypt(
    algorithm: string | SubtleCryptoEncryptAlgorithm,
    key: CryptoKey,
    plainText: ArrayBuffer | ArrayBufferView,
  ): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/decrypt) */
  decrypt(
    algorithm: string | SubtleCryptoEncryptAlgorithm,
    key: CryptoKey,
    cipherText: ArrayBuffer | ArrayBufferView,
  ): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/sign) */
  sign(
    algorithm: string | SubtleCryptoSignAlgorithm,
    key: CryptoKey,
    data: ArrayBuffer | ArrayBufferView,
  ): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/verify) */
  verify(
    algorithm: string | SubtleCryptoSignAlgorithm,
    key: CryptoKey,
    signature: ArrayBuffer | ArrayBufferView,
    data: ArrayBuffer | ArrayBufferView,
  ): Promise<boolean>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/digest) */
  digest(
    algorithm: string | SubtleCryptoHashAlgorithm,
    data: ArrayBuffer | ArrayBufferView,
  ): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/generateKey) */
  generateKey(
    algorithm: string | SubtleCryptoGenerateKeyAlgorithm,
    extractable: boolean,
    keyUsages: string[],
  ): Promise<CryptoKey | CryptoKeyPair>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/deriveKey) */
  deriveKey(
    algorithm: string | SubtleCryptoDeriveKeyAlgorithm,
    baseKey: CryptoKey,
    derivedKeyAlgorithm: string | SubtleCryptoImportKeyAlgorithm,
    extractable: boolean,
    keyUsages: string[],
  ): Promise<CryptoKey>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/deriveBits) */
  deriveBits(
    algorithm: string | SubtleCryptoDeriveKeyAlgorithm,
    baseKey: CryptoKey,
    length?: number | null,
  ): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/importKey) */
  importKey(
    format: string,
    keyData: (ArrayBuffer | ArrayBufferView) | JsonWebKey,
    algorithm: string | SubtleCryptoImportKeyAlgorithm,
    extractable: boolean,
    keyUsages: string[],
  ): Promise<CryptoKey>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/exportKey) */
  exportKey(format: string, key: CryptoKey): Promise<ArrayBuffer | JsonWebKey>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/wrapKey) */
  wrapKey(
    format: string,
    key: CryptoKey,
    wrappingKey: CryptoKey,
    wrapAlgorithm: string | SubtleCryptoEncryptAlgorithm,
  ): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/unwrapKey) */
  unwrapKey(
    format: string,
    wrappedKey: ArrayBuffer | ArrayBufferView,
    unwrappingKey: CryptoKey,
    unwrapAlgorithm: string | SubtleCryptoEncryptAlgorithm,
    unwrappedKeyAlgorithm: string | SubtleCryptoImportKeyAlgorithm,
    extractable: boolean,
    keyUsages: string[],
  ): Promise<CryptoKey>;
  timingSafeEqual(
    a: ArrayBuffer | ArrayBufferView,
    b: ArrayBuffer | ArrayBufferView,
  ): boolean;
}
/**
 * The CryptoKey dictionary of the Web Crypto API represents a cryptographic key.
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey)
 */
declare abstract class CryptoKey {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/type) */
  readonly type: string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/extractable) */
  readonly extractable: boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/algorithm) */
  readonly algorithm:
    | CryptoKeyKeyAlgorithm
    | CryptoKeyAesKeyAlgorithm
    | CryptoKeyHmacKeyAlgorithm
    | CryptoKeyRsaKeyAlgorithm
    | CryptoKeyEllipticKeyAlgorithm
    | CryptoKeyArbitraryKeyAlgorithm;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/usages) */
  readonly usages: string[];
}
interface CryptoKeyPair {
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}
interface JsonWebKey {
  kty: string;
  use?: string;
  key_ops?: string[];
  alg?: string;
  ext?: boolean;
  crv?: string;
  x?: string;
  y?: string;
  d?: string;
  n?: string;
  e?: string;
  p?: string;
  q?: string;
  dp?: string;
  dq?: string;
  qi?: string;
  oth?: RsaOtherPrimesInfo[];
  k?: string;
}
interface RsaOtherPrimesInfo {
  r?: string;
  d?: string;
  t?: string;
}
interface SubtleCryptoDeriveKeyAlgorithm {
  name: string;
  salt?: ArrayBuffer | ArrayBufferView;
  iterations?: number;
  hash?: string | SubtleCryptoHashAlgorithm;
  $public?: CryptoKey;
  info?: ArrayBuffer | ArrayBufferView;
}
interface SubtleCryptoEncryptAlgorithm {
  name: string;
  iv?: ArrayBuffer | ArrayBufferView;
  additionalData?: ArrayBuffer | ArrayBufferView;
  tagLength?: number;
  counter?: ArrayBuffer | ArrayBufferView;
  length?: number;
  label?: ArrayBuffer | ArrayBufferView;
}
interface SubtleCryptoGenerateKeyAlgorithm {
  name: string;
  hash?: string | SubtleCryptoHashAlgorithm;
  modulusLength?: number;
  publicExponent?: ArrayBuffer | ArrayBufferView;
  length?: number;
  namedCurve?: string;
}
interface SubtleCryptoHashAlgorithm {
  name: string;
}
interface SubtleCryptoImportKeyAlgorithm {
  name: string;
  hash?: string | SubtleCryptoHashAlgorithm;
  length?: number;
  namedCurve?: string;
  compressed?: boolean;
}
interface SubtleCryptoSignAlgorithm {
  name: string;
  hash?: string | SubtleCryptoHashAlgorithm;
  dataLength?: number;
  saltLength?: number;
}
interface CryptoKeyKeyAlgorithm {
  name: string;
}
interface CryptoKeyAesKeyAlgorithm {
  name: string;
  length: number;
}
interface CryptoKeyHmacKeyAlgorithm {
  name: string;
  hash: CryptoKeyKeyAlgorithm;
  length: number;
}
interface CryptoKeyRsaKeyAlgorithm {
  name: string;
  modulusLength: number;
  publicExponent: ArrayBuffer | ArrayBufferView;
  hash?: CryptoKeyKeyAlgorithm;
}
interface CryptoKeyEllipticKeyAlgorithm {
  name: string;
  namedCurve: string;
}
interface CryptoKeyArbitraryKeyAlgorithm {
  name: string;
  hash?: CryptoKeyKeyAlgorithm;
  namedCurve?: string;
  length?: number;
}
declare class DigestStream extends WritableStream<
  ArrayBuffer | ArrayBufferView
> {
  constructor(algorithm: string | SubtleCryptoHashAlgorithm);
  readonly digest: Promise<ArrayBuffer>;
  get bytesWritten(): number | bigint;
}
/**
 * A decoder for a specific method, that is a specific character encoding, like utf-8, iso-8859-2, koi8, cp1261, gbk, etc. A decoder takes a stream of bytes as input and emits a stream of code points. For a more scalable, non-native library, see StringView – a C-like representation of strings based on typed arrays.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextDecoder)
 */
declare class TextDecoder {
  constructor(label?: string, options?: TextDecoderConstructorOptions);
  /**
   * Returns the result of running encoding's decoder. The method can be invoked zero or more times with options's stream set to true, and then once without options's stream (or set to false), to process a fragmented input. If the invocation without options's stream (or set to false) has no input, it's clearest to omit both arguments.
   *
   * ```
   * var string = "", decoder = new TextDecoder(encoding), buffer;
   * while(buffer = next_chunk()) {
   *   string += decoder.decode(buffer, {stream:true});
   * }
   * string += decoder.decode(); // end-of-queue
   * ```
   *
   * If the error mode is "fatal" and encoding's decoder returns error, throws a TypeError.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextDecoder/decode)
   */
  decode(
    input?: ArrayBuffer | ArrayBufferView,
    options?: TextDecoderDecodeOptions,
  ): string;
  get encoding(): string;
  get fatal(): boolean;
  get ignoreBOM(): boolean;
}
/**
 * TextEncoder takes a stream of code points as input and emits a stream of bytes. For a more scalable, non-native library, see StringView – a C-like representation of strings based on typed arrays.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder)
 */
declare class TextEncoder {
  constructor();
  /**
   * Returns the result of running UTF-8's encoder.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder/encode)
   */
  encode(input?: string): Uint8Array;
  /**
   * Runs the UTF-8 encoder on source, stores the result of that operation into destination, and returns the progress made as an object wherein read is the number of converted code units of source and written is the number of bytes modified in destination.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder/encodeInto)
   */
  encodeInto(
    input: string,
    buffer: ArrayBuffer | ArrayBufferView,
  ): TextEncoderEncodeIntoResult;
  get encoding(): string;
}
interface TextDecoderConstructorOptions {
  fatal: boolean;
  ignoreBOM: boolean;
}
interface TextDecoderDecodeOptions {
  stream: boolean;
}
interface TextEncoderEncodeIntoResult {
  read: number;
  written: number;
}
/**
 * Events providing information related to errors in scripts or in files.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ErrorEvent)
 */
declare class ErrorEvent extends Event {
  constructor(type: string, init?: ErrorEventErrorEventInit);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ErrorEvent/filename) */
  get filename(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ErrorEvent/message) */
  get message(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ErrorEvent/lineno) */
  get lineno(): number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ErrorEvent/colno) */
  get colno(): number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ErrorEvent/error) */
  get error(): any;
}
interface ErrorEventErrorEventInit {
  message?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  error?: any;
}
/**
 * Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data".
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData)
 */
declare class FormData {
  constructor();
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/append) */
  append(name: string, value: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/append) */
  append(name: string, value: Blob, filename?: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/delete) */
  delete(name: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/get) */
  get(name: string): (File | string) | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/getAll) */
  getAll(name: string): (File | string)[];
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/has) */
  has(name: string): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/set) */
  set(name: string, value: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/set) */
  set(name: string, value: Blob, filename?: string): void;
  /* Returns an array of key, value pairs for every entry in the list. */
  entries(): IterableIterator<[key: string, value: File | string]>;
  /* Returns a list of keys in the list. */
  keys(): IterableIterator<string>;
  /* Returns a list of values in the list. */
  values(): IterableIterator<File | string>;
  forEach<This = unknown>(
    callback: (
      this: This,
      value: File | string,
      key: string,
      parent: FormData,
    ) => void,
    thisArg?: This,
  ): void;
  [Symbol.iterator](): IterableIterator<[key: string, value: File | string]>;
}
interface ContentOptions {
  html?: boolean;
}
declare class HTMLRewriter {
  constructor();
  on(
    selector: string,
    handlers: HTMLRewriterElementContentHandlers,
  ): HTMLRewriter;
  onDocument(handlers: HTMLRewriterDocumentContentHandlers): HTMLRewriter;
  transform(response: Response): Response;
}
interface HTMLRewriterElementContentHandlers {
  element?(element: Element): void | Promise<void>;
  comments?(comment: Comment): void | Promise<void>;
  text?(element: Text): void | Promise<void>;
}
interface HTMLRewriterDocumentContentHandlers {
  doctype?(doctype: Doctype): void | Promise<void>;
  comments?(comment: Comment): void | Promise<void>;
  text?(text: Text): void | Promise<void>;
  end?(end: DocumentEnd): void | Promise<void>;
}
interface Doctype {
  readonly name: string | null;
  readonly publicId: string | null;
  readonly systemId: string | null;
}
interface Element {
  tagName: string;
  readonly attributes: IterableIterator<string[]>;
  readonly removed: boolean;
  readonly namespaceURI: string;
  getAttribute(name: string): string | null;
  hasAttribute(name: string): boolean;
  setAttribute(name: string, value: string): Element;
  removeAttribute(name: string): Element;
  before(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Element;
  after(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Element;
  prepend(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Element;
  append(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Element;
  replace(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Element;
  remove(): Element;
  removeAndKeepContent(): Element;
  setInnerContent(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Element;
  onEndTag(handler: (tag: EndTag) => void | Promise<void>): void;
}
interface EndTag {
  name: string;
  before(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): EndTag;
  after(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): EndTag;
  remove(): EndTag;
}
interface Comment {
  text: string;
  readonly removed: boolean;
  before(content: string, options?: ContentOptions): Comment;
  after(content: string, options?: ContentOptions): Comment;
  replace(content: string, options?: ContentOptions): Comment;
  remove(): Comment;
}
interface Text {
  readonly text: string;
  readonly lastInTextNode: boolean;
  readonly removed: boolean;
  before(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Text;
  after(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Text;
  replace(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Text;
  remove(): Text;
}
interface DocumentEnd {
  append(content: string, options?: ContentOptions): DocumentEnd;
}
/**
 * This is the event type for fetch events dispatched on the service worker global scope. It contains information about the fetch, including the request and how the receiver will treat the response. It provides the event.respondWith() method, which allows us to provide a response to this fetch.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FetchEvent)
 */
declare abstract class FetchEvent extends ExtendableEvent {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FetchEvent/request) */
  readonly request: Request;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FetchEvent/respondWith) */
  respondWith(promise: Response | Promise<Response>): void;
  passThroughOnException(): void;
}
type HeadersInit =
  | Headers
  | Iterable<Iterable<string>>
  | Record<string, string>;
/**
 * This Fetch API interface allows you to perform various actions on HTTP request and response headers. These actions include retrieving, setting, adding to, and removing. A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.  You can add to this using methods like append() (see Examples.) In all methods of this interface, header names are matched by case-insensitive byte sequence.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers)
 */
declare class Headers {
  constructor(init?: HeadersInit);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/get) */
  get(name: string): string | null;
  getAll(name: string): string[];
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/getSetCookie) */
  getSetCookie(): string[];
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/has) */
  has(name: string): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/set) */
  set(name: string, value: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/append) */
  append(name: string, value: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/delete) */
  delete(name: string): void;
  forEach<This = unknown>(
    callback: (this: This, value: string, key: string, parent: Headers) => void,
    thisArg?: This,
  ): void;
  /* Returns an iterator allowing to go through all key/value pairs contained in this object. */
  entries(): IterableIterator<[key: string, value: string]>;
  /* Returns an iterator allowing to go through all keys of the key/value pairs contained in this object. */
  keys(): IterableIterator<string>;
  /* Returns an iterator allowing to go through all values of the key/value pairs contained in this object. */
  values(): IterableIterator<string>;
  [Symbol.iterator](): IterableIterator<[key: string, value: string]>;
}
type BodyInit =
  | ReadableStream<Uint8Array>
  | string
  | ArrayBuffer
  | ArrayBufferView
  | Blob
  | URLSearchParams
  | FormData;
declare abstract class Body {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/body) */
  get body(): ReadableStream | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/bodyUsed) */
  get bodyUsed(): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/arrayBuffer) */
  arrayBuffer(): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/bytes) */
  bytes(): Promise<Uint8Array>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/text) */
  text(): Promise<string>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/json) */
  json<T>(): Promise<T>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/formData) */
  formData(): Promise<FormData>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/blob) */
  blob(): Promise<Blob>;
}
/**
 * This Fetch API interface represents the response to a request.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response)
 */
declare var Response: {
  prototype: Response;
  new (body?: BodyInit | null, init?: ResponseInit): Response;
  error(): Response;
  redirect(url: string, status?: number): Response;
  json(any: any, maybeInit?: ResponseInit | Response): Response;
};
/**
 * This Fetch API interface represents the response to a request.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response)
 */
interface Response extends Body {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/clone) */
  clone(): Response;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/status) */
  status: number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/statusText) */
  statusText: string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/headers) */
  headers: Headers;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/ok) */
  ok: boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/redirected) */
  redirected: boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/url) */
  url: string;
  webSocket: WebSocket | null;
  cf: any | undefined;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/type) */
  type: "default" | "error";
}
interface ResponseInit {
  status?: number;
  statusText?: string;
  headers?: HeadersInit;
  cf?: any;
  webSocket?: WebSocket | null;
  encodeBody?: "automatic" | "manual";
}
type RequestInfo<CfHostMetadata = unknown, Cf = CfProperties<CfHostMetadata>> =
  | Request<CfHostMetadata, Cf>
  | string;
/**
 * This Fetch API interface represents a resource request.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request)
 */
declare var Request: {
  prototype: Request;
  new <CfHostMetadata = unknown, Cf = CfProperties<CfHostMetadata>>(
    input: RequestInfo<CfProperties> | URL,
    init?: RequestInit<Cf>,
  ): Request<CfHostMetadata, Cf>;
};
/**
 * This Fetch API interface represents a resource request.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request)
 */
interface Request<CfHostMetadata = unknown, Cf = CfProperties<CfHostMetadata>>
  extends Body {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/clone) */
  clone(): Request<CfHostMetadata, Cf>;
  /**
   * Returns request's HTTP method, which is "GET" by default.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/method)
   */
  method: string;
  /**
   * Returns the URL of request as a string.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/url)
   */
  url: string;
  /**
   * Returns a Headers object consisting of the headers associated with request. Note that headers added in the network layer by the user agent will not be accounted for in this object, e.g., the "Host" header.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/headers)
   */
  headers: Headers;
  /**
   * Returns the redirect mode associated with request, which is a string indicating how redirects for the request will be handled during fetching. A request will follow redirects by default.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/redirect)
   */
  redirect: string;
  fetcher: Fetcher | null;
  /**
   * Returns the signal associated with request, which is an AbortSignal object indicating whether or not request has been aborted, and its abort event handler.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/signal)
   */
  signal: AbortSignal;
  cf: Cf | undefined;
  /**
   * Returns request's subresource integrity metadata, which is a cryptographic hash of the resource being fetched. Its value consists of multiple hashes separated by whitespace. [SRI]
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/integrity)
   */
  integrity: string;
  /**
   * Returns a boolean indicating whether or not request can outlive the global in which it was created.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/keepalive)
   */
  keepalive: boolean;
  /**
   * Returns the cache mode associated with request, which is a string indicating how the request will interact with the browser's cache when fetching.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/cache)
   */
  cache?: "no-store";
}
interface RequestInit<Cf = CfProperties> {
  /* A string to set request's method. */
  method?: string;
  /* A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
  headers?: HeadersInit;
  /* A BodyInit object or null to set request's body. */
  body?: BodyInit | null;
  /* A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
  redirect?: string;
  fetcher?: Fetcher | null;
  cf?: Cf;
  /* A string indicating how the request will interact with the browser's cache to set request's cache. */
  cache?: "no-store";
  /* A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
  integrity?: string;
  /* An AbortSignal to set request's signal. */
  signal?: AbortSignal | null;
  encodeResponseBody?: "automatic" | "manual";
}
type Service<T extends Rpc.WorkerEntrypointBranded | undefined = undefined> =
  Fetcher<T>;
type Fetcher<
  T extends Rpc.EntrypointBranded | undefined = undefined,
  Reserved extends string = never,
> = (T extends Rpc.EntrypointBranded
  ? Rpc.Provider<T, Reserved | "fetch" | "connect">
  : unknown) & {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
  connect(address: SocketAddress | string, options?: SocketOptions): Socket;
};
interface KVNamespaceListKey<Metadata, Key extends string = string> {
  name: Key;
  expiration?: number;
  metadata?: Metadata;
}
type KVNamespaceListResult<Metadata, Key extends string = string> =
  | {
      list_complete: false;
      keys: KVNamespaceListKey<Metadata, Key>[];
      cursor: string;
      cacheStatus: string | null;
    }
  | {
      list_complete: true;
      keys: KVNamespaceListKey<Metadata, Key>[];
      cacheStatus: string | null;
    };
interface KVNamespace<Key extends string = string> {
  get(
    key: Key,
    options?: Partial<KVNamespaceGetOptions<undefined>>,
  ): Promise<string | null>;
  get(key: Key, type: "text"): Promise<string | null>;
  get<ExpectedValue = unknown>(
    key: Key,
    type: "json",
  ): Promise<ExpectedValue | null>;
  get(key: Key, type: "arrayBuffer"): Promise<ArrayBuffer | null>;
  get(key: Key, type: "stream"): Promise<ReadableStream | null>;
  get(
    key: Key,
    options?: KVNamespaceGetOptions<"text">,
  ): Promise<string | null>;
  get<ExpectedValue = unknown>(
    key: Key,
    options?: KVNamespaceGetOptions<"json">,
  ): Promise<ExpectedValue | null>;
  get(
    key: Key,
    options?: KVNamespaceGetOptions<"arrayBuffer">,
  ): Promise<ArrayBuffer | null>;
  get(
    key: Key,
    options?: KVNamespaceGetOptions<"stream">,
  ): Promise<ReadableStream | null>;
  get(key: Array<Key>, type: "text"): Promise<Map<string, string | null>>;
  get<ExpectedValue = unknown>(
    key: Array<Key>,
    type: "json",
  ): Promise<Map<string, ExpectedValue | null>>;
  get(
    key: Array<Key>,
    options?: Partial<KVNamespaceGetOptions<undefined>>,
  ): Promise<Map<string, string | null>>;
  get(
    key: Array<Key>,
    options?: KVNamespaceGetOptions<"text">,
  ): Promise<Map<string, string | null>>;
  get<ExpectedValue = unknown>(
    key: Array<Key>,
    options?: KVNamespaceGetOptions<"json">,
  ): Promise<Map<string, ExpectedValue | null>>;
  list<Metadata = unknown>(
    options?: KVNamespaceListOptions,
  ): Promise<KVNamespaceListResult<Metadata, Key>>;
  put(
    key: Key,
    value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
    options?: KVNamespacePutOptions,
  ): Promise<void>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    options?: Partial<KVNamespaceGetOptions<undefined>>,
  ): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    type: "text",
  ): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: Key,
    type: "json",
  ): Promise<KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    type: "arrayBuffer",
  ): Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    type: "stream",
  ): Promise<KVNamespaceGetWithMetadataResult<ReadableStream, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    options: KVNamespaceGetOptions<"text">,
  ): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: Key,
    options: KVNamespaceGetOptions<"json">,
  ): Promise<KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    options: KVNamespaceGetOptions<"arrayBuffer">,
  ): Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    options: KVNamespaceGetOptions<"stream">,
  ): Promise<KVNamespaceGetWithMetadataResult<ReadableStream, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Array<Key>,
    type: "text",
  ): Promise<Map<string, KVNamespaceGetWithMetadataResult<string, Metadata>>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: Array<Key>,
    type: "json",
  ): Promise<
    Map<string, KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>
  >;
  getWithMetadata<Metadata = unknown>(
    key: Array<Key>,
    options?: Partial<KVNamespaceGetOptions<undefined>>,
  ): Promise<Map<string, KVNamespaceGetWithMetadataResult<string, Metadata>>>;
  getWithMetadata<Metadata = unknown>(
    key: Array<Key>,
    options?: KVNamespaceGetOptions<"text">,
  ): Promise<Map<string, KVNamespaceGetWithMetadataResult<string, Metadata>>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: Array<Key>,
    options?: KVNamespaceGetOptions<"json">,
  ): Promise<
    Map<string, KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>
  >;
  delete(key: Key): Promise<void>;
}
interface KVNamespaceListOptions {
  limit?: number;
  prefix?: string | null;
  cursor?: string | null;
}
interface KVNamespaceGetOptions<Type> {
  type: Type;
  cacheTtl?: number;
}
interface KVNamespacePutOptions {
  expiration?: number;
  expirationTtl?: number;
  metadata?: any | null;
}
interface KVNamespaceGetWithMetadataResult<Value, Metadata> {
  value: Value | null;
  metadata: Metadata | null;
  cacheStatus: string | null;
}
type QueueContentType = "text" | "bytes" | "json" | "v8";
interface Queue<Body = unknown> {
  send(message: Body, options?: QueueSendOptions): Promise<void>;
  sendBatch(
    messages: Iterable<MessageSendRequest<Body>>,
    options?: QueueSendBatchOptions,
  ): Promise<void>;
}
interface QueueSendOptions {
  contentType?: QueueContentType;
  delaySeconds?: number;
}
interface QueueSendBatchOptions {
  delaySeconds?: number;
}
interface MessageSendRequest<Body = unknown> {
  body: Body;
  contentType?: QueueContentType;
  delaySeconds?: number;
}
interface QueueRetryOptions {
  delaySeconds?: number;
}
interface Message<Body = unknown> {
  readonly id: string;
  readonly timestamp: Date;
  readonly body: Body;
  readonly attempts: number;
  retry(options?: QueueRetryOptions): void;
  ack(): void;
}
interface QueueEvent<Body = unknown> extends ExtendableEvent {
  readonly messages: readonly Message<Body>[];
  readonly queue: string;
  retryAll(options?: QueueRetryOptions): void;
  ackAll(): void;
}
interface MessageBatch<Body = unknown> {
  readonly messages: readonly Message<Body>[];
  readonly queue: string;
  retryAll(options?: QueueRetryOptions): void;
  ackAll(): void;
}
interface R2Error extends Error {
  readonly name: string;
  readonly code: number;
  readonly message: string;
  readonly action: string;
  readonly stack: any;
}
interface R2ListOptions {
  limit?: number;
  prefix?: string;
  cursor?: string;
  delimiter?: string;
  startAfter?: string;
  include?: ("httpMetadata" | "customMetadata")[];
}
declare abstract class R2Bucket {
  head(key: string): Promise<R2Object | null>;
  get(
    key: string,
    options: R2GetOptions & {
      onlyIf: R2Conditional | Headers;
    },
  ): Promise<R2ObjectBody | R2Object | null>;
  get(key: string, options?: R2GetOptions): Promise<R2ObjectBody | null>;
  put(
    key: string,
    value:
      | ReadableStream
      | ArrayBuffer
      | ArrayBufferView
      | string
      | null
      | Blob,
    options?: R2PutOptions & {
      onlyIf: R2Conditional | Headers;
    },
  ): Promise<R2Object | null>;
  put(
    key: string,
    value:
      | ReadableStream
      | ArrayBuffer
      | ArrayBufferView
      | string
      | null
      | Blob,
    options?: R2PutOptions,
  ): Promise<R2Object>;
  createMultipartUpload(
    key: string,
    options?: R2MultipartOptions,
  ): Promise<R2MultipartUpload>;
  resumeMultipartUpload(key: string, uploadId: string): R2MultipartUpload;
  delete(keys: string | string[]): Promise<void>;
  list(options?: R2ListOptions): Promise<R2Objects>;
}
interface R2MultipartUpload {
  readonly key: string;
  readonly uploadId: string;
  uploadPart(
    partNumber: number,
    value: ReadableStream | (ArrayBuffer | ArrayBufferView) | string | Blob,
    options?: R2UploadPartOptions,
  ): Promise<R2UploadedPart>;
  abort(): Promise<void>;
  complete(uploadedParts: R2UploadedPart[]): Promise<R2Object>;
}
interface R2UploadedPart {
  partNumber: number;
  etag: string;
}
declare abstract class R2Object {
  readonly key: string;
  readonly version: string;
  readonly size: number;
  readonly etag: string;
  readonly httpEtag: string;
  readonly checksums: R2Checksums;
  readonly uploaded: Date;
  readonly httpMetadata?: R2HTTPMetadata;
  readonly customMetadata?: Record<string, string>;
  readonly range?: R2Range;
  readonly storageClass: string;
  readonly ssecKeyMd5?: string;
  writeHttpMetadata(headers: Headers): void;
}
interface R2ObjectBody extends R2Object {
  get body(): ReadableStream;
  get bodyUsed(): boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  bytes(): Promise<Uint8Array>;
  text(): Promise<string>;
  json<T>(): Promise<T>;
  blob(): Promise<Blob>;
}
type R2Range =
  | {
      offset: number;
      length?: number;
    }
  | {
      offset?: number;
      length: number;
    }
  | {
      suffix: number;
    };
interface R2Conditional {
  etagMatches?: string;
  etagDoesNotMatch?: string;
  uploadedBefore?: Date;
  uploadedAfter?: Date;
  secondsGranularity?: boolean;
}
interface R2GetOptions {
  onlyIf?: R2Conditional | Headers;
  range?: R2Range | Headers;
  ssecKey?: ArrayBuffer | string;
}
interface R2PutOptions {
  onlyIf?: R2Conditional | Headers;
  httpMetadata?: R2HTTPMetadata | Headers;
  customMetadata?: Record<string, string>;
  md5?: (ArrayBuffer | ArrayBufferView) | string;
  sha1?: (ArrayBuffer | ArrayBufferView) | string;
  sha256?: (ArrayBuffer | ArrayBufferView) | string;
  sha384?: (ArrayBuffer | ArrayBufferView) | string;
  sha512?: (ArrayBuffer | ArrayBufferView) | string;
  storageClass?: string;
  ssecKey?: ArrayBuffer | string;
}
interface R2MultipartOptions {
  httpMetadata?: R2HTTPMetadata | Headers;
  customMetadata?: Record<string, string>;
  storageClass?: string;
  ssecKey?: ArrayBuffer | string;
}
interface R2Checksums {
  readonly md5?: ArrayBuffer;
  readonly sha1?: ArrayBuffer;
  readonly sha256?: ArrayBuffer;
  readonly sha384?: ArrayBuffer;
  readonly sha512?: ArrayBuffer;
  toJSON(): R2StringChecksums;
}
interface R2StringChecksums {
  md5?: string;
  sha1?: string;
  sha256?: string;
  sha384?: string;
  sha512?: string;
}
interface R2HTTPMetadata {
  contentType?: string;
  contentLanguage?: string;
  contentDisposition?: string;
  contentEncoding?: string;
  cacheControl?: string;
  cacheExpiry?: Date;
}
type R2Objects = {
  objects: R2Object[];
  delimitedPrefixes: string[];
} & (
  | {
      truncated: true;
      cursor: string;
    }
  | {
      truncated: false;
    }
);
interface R2UploadPartOptions {
  ssecKey?: ArrayBuffer | string;
}
declare abstract class ScheduledEvent extends ExtendableEvent {
  readonly scheduledTime: number;
  readonly cron: string;
  noRetry(): void;
}
interface ScheduledController {
  readonly scheduledTime: number;
  readonly cron: string;
  noRetry(): void;
}
interface QueuingStrategy<T = any> {
  highWaterMark?: number | bigint;
  size?: (chunk: T) => number | bigint;
}
interface UnderlyingSink<W = any> {
  type?: string;
  start?: (controller: WritableStreamDefaultController) => void | Promise<void>;
  write?: (
    chunk: W,
    controller: WritableStreamDefaultController,
  ) => void | Promise<void>;
  abort?: (reason: any) => void | Promise<void>;
  close?: () => void | Promise<void>;
}
interface UnderlyingByteSource {
  type: "bytes";
  autoAllocateChunkSize?: number;
  start?: (controller: ReadableByteStreamController) => void | Promise<void>;
  pull?: (controller: ReadableByteStreamController) => void | Promise<void>;
  cancel?: (reason: any) => void | Promise<void>;
}
interface UnderlyingSource<R = any> {
  type?: "" | undefined;
  start?: (
    controller: ReadableStreamDefaultController<R>,
  ) => void | Promise<void>;
  pull?: (
    controller: ReadableStreamDefaultController<R>,
  ) => void | Promise<void>;
  cancel?: (reason: any) => void | Promise<void>;
  expectedLength?: number | bigint;
}
interface Transformer<I = any, O = any> {
  readableType?: string;
  writableType?: string;
  start?: (
    controller: TransformStreamDefaultController<O>,
  ) => void | Promise<void>;
  transform?: (
    chunk: I,
    controller: TransformStreamDefaultController<O>,
  ) => void | Promise<void>;
  flush?: (
    controller: TransformStreamDefaultController<O>,
  ) => void | Promise<void>;
  cancel?: (reason: any) => void | Promise<void>;
  expectedLength?: number;
}
interface StreamPipeOptions {
  /**
   * Pipes this readable stream to a given writable stream destination. The way in which the piping process behaves under various error conditions can be customized with a number of passed options. It returns a promise that fulfills when the piping process completes successfully, or rejects if any errors were encountered.
   *
   * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
   *
   * Errors and closures of the source and destination streams propagate as follows:
   *
   * An error in this source readable stream will abort destination, unless preventAbort is truthy. The returned promise will be rejected with the source's error, or with any error that occurs during aborting the destination.
   *
   * An error in destination will cancel this source readable stream, unless preventCancel is truthy. The returned promise will be rejected with the destination's error, or with any error that occurs during canceling the source.
   *
   * When this source readable stream closes, destination will be closed, unless preventClose is truthy. The returned promise will be fulfilled once this process completes, unless an error is encountered while closing the destination, in which case it will be rejected with that error.
   *
   * If destination starts out closed or closing, this source readable stream will be canceled, unless preventCancel is true. The returned promise will be rejected with an error indicating piping to a closed stream failed, or with any error that occurs during canceling the source.
   *
   * The signal option can be set to an AbortSignal to allow aborting an ongoing pipe operation via the corresponding AbortController. In this case, this source readable stream will be canceled, and destination aborted, unless the respective options preventCancel or preventAbort are set.
   */
  preventClose?: boolean;
  preventAbort?: boolean;
  preventCancel?: boolean;
  signal?: AbortSignal;
}
type ReadableStreamReadResult<R = any> =
  | {
      done: false;
      value: R;
    }
  | {
      done: true;
      value?: undefined;
    };
/**
 * This Streams API interface represents a readable stream of byte data. The Fetch API offers a concrete instance of a ReadableStream through the body property of a Response object.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream)
 */
interface ReadableStream<R = any> {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/locked) */
  get locked(): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/cancel) */
  cancel(reason?: any): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/getReader) */
  getReader(): ReadableStreamDefaultReader<R>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/getReader) */
  getReader(options: ReadableStreamGetReaderOptions): ReadableStreamBYOBReader;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/pipeThrough) */
  pipeThrough<T>(
    transform: ReadableWritablePair<T, R>,
    options?: StreamPipeOptions,
  ): ReadableStream<T>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/pipeTo) */
  pipeTo(
    destination: WritableStream<R>,
    options?: StreamPipeOptions,
  ): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/tee) */
  tee(): [ReadableStream<R>, ReadableStream<R>];
  values(options?: ReadableStreamValuesOptions): AsyncIterableIterator<R>;
  [Symbol.asyncIterator](
    options?: ReadableStreamValuesOptions,
  ): AsyncIterableIterator<R>;
}
/**
 * This Streams API interface represents a readable stream of byte data. The Fetch API offers a concrete instance of a ReadableStream through the body property of a Response object.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream)
 */
declare const ReadableStream: {
  prototype: ReadableStream;
  new (
    underlyingSource: UnderlyingByteSource,
    strategy?: QueuingStrategy<Uint8Array>,
  ): ReadableStream<Uint8Array>;
  new <R = any>(
    underlyingSource?: UnderlyingSource<R>,
    strategy?: QueuingStrategy<R>,
  ): ReadableStream<R>;
};
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultReader) */
declare class ReadableStreamDefaultReader<R = any> {
  constructor(stream: ReadableStream);
  get closed(): Promise<void>;
  cancel(reason?: any): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultReader/read) */
  read(): Promise<ReadableStreamReadResult<R>>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultReader/releaseLock) */
  releaseLock(): void;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader) */
declare class ReadableStreamBYOBReader {
  constructor(stream: ReadableStream);
  get closed(): Promise<void>;
  cancel(reason?: any): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader/read) */
  read<T extends ArrayBufferView>(
    view: T,
  ): Promise<ReadableStreamReadResult<T>>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader/releaseLock) */
  releaseLock(): void;
  readAtLeast<T extends ArrayBufferView>(
    minElements: number,
    view: T,
  ): Promise<ReadableStreamReadResult<T>>;
}
interface ReadableStreamBYOBReaderReadableStreamBYOBReaderReadOptions {
  min?: number;
}
interface ReadableStreamGetReaderOptions {
  /**
   * Creates a ReadableStreamBYOBReader and locks the stream to the new reader.
   *
   * This call behaves the same way as the no-argument variant, except that it only works on readable byte streams, i.e. streams which were constructed specifically with the ability to handle "bring your own buffer" reading. The returned BYOB reader provides the ability to directly read individual chunks from the stream via its read() method, into developer-supplied buffers, allowing more precise control over allocation.
   */
  mode: "byob";
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest) */
declare abstract class ReadableStreamBYOBRequest {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/view) */
  get view(): Uint8Array | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/respond) */
  respond(bytesWritten: number): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/respondWithNewView) */
  respondWithNewView(view: ArrayBuffer | ArrayBufferView): void;
  get atLeast(): number | null;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController) */
declare abstract class ReadableStreamDefaultController<R = any> {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController/desiredSize) */
  get desiredSize(): number | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController/close) */
  close(): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController/enqueue) */
  enqueue(chunk?: R): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController/error) */
  error(reason: any): void;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController) */
declare abstract class ReadableByteStreamController {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/byobRequest) */
  get byobRequest(): ReadableStreamBYOBRequest | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/desiredSize) */
  get desiredSize(): number | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/close) */
  close(): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/enqueue) */
  enqueue(chunk: ArrayBuffer | ArrayBufferView): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/error) */
  error(reason: any): void;
}
/**
 * This Streams API interface represents a controller allowing control of a WritableStream's state. When constructing a WritableStream, the underlying sink is given a corresponding WritableStreamDefaultController instance to manipulate.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultController)
 */
declare abstract class WritableStreamDefaultController {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultController/signal) */
  get signal(): AbortSignal;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultController/error) */
  error(reason?: any): void;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController) */
declare abstract class TransformStreamDefaultController<O = any> {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController/desiredSize) */
  get desiredSize(): number | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController/enqueue) */
  enqueue(chunk?: O): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController/error) */
  error(reason: any): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController/terminate) */
  terminate(): void;
}
interface ReadableWritablePair<R = any, W = any> {
  /**
   * Provides a convenient, chainable way of piping this readable stream through a transform stream (or any other { writable, readable } pair). It simply pipes the stream into the writable side of the supplied pair, and returns the readable side for further use.
   *
   * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
   */
  writable: WritableStream<W>;
  readable: ReadableStream<R>;
}
/**
 * This Streams API interface provides a standard abstraction for writing streaming data to a destination, known as a sink. This object comes with built-in backpressure and queuing.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream)
 */
declare class WritableStream<W = any> {
  constructor(
    underlyingSink?: UnderlyingSink,
    queuingStrategy?: QueuingStrategy,
  );
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/locked) */
  get locked(): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/abort) */
  abort(reason?: any): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/close) */
  close(): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/getWriter) */
  getWriter(): WritableStreamDefaultWriter<W>;
}
/**
 * This Streams API interface is the object returned by WritableStream.getWriter() and once created locks the < writer to the WritableStream ensuring that no other streams can write to the underlying sink.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter)
 */
declare class WritableStreamDefaultWriter<W = any> {
  constructor(stream: WritableStream);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/closed) */
  get closed(): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/ready) */
  get ready(): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/desiredSize) */
  get desiredSize(): number | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/abort) */
  abort(reason?: any): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/close) */
  close(): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/write) */
  write(chunk?: W): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/releaseLock) */
  releaseLock(): void;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStream) */
declare class TransformStream<I = any, O = any> {
  constructor(
    transformer?: Transformer<I, O>,
    writableStrategy?: QueuingStrategy<I>,
    readableStrategy?: QueuingStrategy<O>,
  );
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStream/readable) */
  get readable(): ReadableStream<O>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStream/writable) */
  get writable(): WritableStream<I>;
}
declare class FixedLengthStream extends IdentityTransformStream {
  constructor(
    expectedLength: number | bigint,
    queuingStrategy?: IdentityTransformStreamQueuingStrategy,
  );
}
declare class IdentityTransformStream extends TransformStream<
  ArrayBuffer | ArrayBufferView,
  Uint8Array
> {
  constructor(queuingStrategy?: IdentityTransformStreamQueuingStrategy);
}
interface IdentityTransformStreamQueuingStrategy {
  highWaterMark?: number | bigint;
}
interface ReadableStreamValuesOptions {
  preventCancel?: boolean;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CompressionStream) */
declare class CompressionStream extends TransformStream<
  ArrayBuffer | ArrayBufferView,
  Uint8Array
> {
  constructor(format: "gzip" | "deflate" | "deflate-raw");
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/DecompressionStream) */
declare class DecompressionStream extends TransformStream<
  ArrayBuffer | ArrayBufferView,
  Uint8Array
> {
  constructor(format: "gzip" | "deflate" | "deflate-raw");
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoderStream) */
declare class TextEncoderStream extends TransformStream<string, Uint8Array> {
  constructor();
  get encoding(): string;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextDecoderStream) */
declare class TextDecoderStream extends TransformStream<
  ArrayBuffer | ArrayBufferView,
  string
> {
  constructor(label?: string, options?: TextDecoderStreamTextDecoderStreamInit);
  get encoding(): string;
  get fatal(): boolean;
  get ignoreBOM(): boolean;
}
interface TextDecoderStreamTextDecoderStreamInit {
  fatal?: boolean;
  ignoreBOM?: boolean;
}
/**
 * This Streams API interface provides a built-in byte length queuing strategy that can be used when constructing streams.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ByteLengthQueuingStrategy)
 */
declare class ByteLengthQueuingStrategy
  implements QueuingStrategy<ArrayBufferView>
{
  constructor(init: QueuingStrategyInit);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ByteLengthQueuingStrategy/highWaterMark) */
  get highWaterMark(): number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ByteLengthQueuingStrategy/size) */
  get size(): (chunk?: any) => number;
}
/**
 * This Streams API interface provides a built-in byte length queuing strategy that can be used when constructing streams.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CountQueuingStrategy)
 */
declare class CountQueuingStrategy implements QueuingStrategy {
  constructor(init: QueuingStrategyInit);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CountQueuingStrategy/highWaterMark) */
  get highWaterMark(): number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CountQueuingStrategy/size) */
  get size(): (chunk?: any) => number;
}
interface QueuingStrategyInit {
  /**
   * Creates a new ByteLengthQueuingStrategy with the provided high water mark.
   *
   * Note that the provided high water mark will not be validated ahead of time. Instead, if it is negative, NaN, or not a number, the resulting ByteLengthQueuingStrategy will cause the corresponding stream constructor to throw.
   */
  highWaterMark: number;
}
interface ScriptVersion {
  id?: string;
  tag?: string;
  message?: string;
}
declare abstract class TailEvent extends ExtendableEvent {
  readonly events: TraceItem[];
  readonly traces: TraceItem[];
}
interface TraceItem {
  readonly event:
    | (
        | TraceItemFetchEventInfo
        | TraceItemJsRpcEventInfo
        | TraceItemScheduledEventInfo
        | TraceItemAlarmEventInfo
        | TraceItemQueueEventInfo
        | TraceItemEmailEventInfo
        | TraceItemTailEventInfo
        | TraceItemCustomEventInfo
        | TraceItemHibernatableWebSocketEventInfo
      )
    | null;
  readonly eventTimestamp: number | null;
  readonly logs: TraceLog[];
  readonly exceptions: TraceException[];
  readonly diagnosticsChannelEvents: TraceDiagnosticChannelEvent[];
  readonly scriptName: string | null;
  readonly entrypoint?: string;
  readonly scriptVersion?: ScriptVersion;
  readonly dispatchNamespace?: string;
  readonly scriptTags?: string[];
  readonly outcome: string;
  readonly executionModel: string;
  readonly truncated: boolean;
  readonly cpuTime: number;
  readonly wallTime: number;
}
interface TraceItemAlarmEventInfo {
  readonly scheduledTime: Date;
}
interface TraceItemCustomEventInfo {}
interface TraceItemScheduledEventInfo {
  readonly scheduledTime: number;
  readonly cron: string;
}
interface TraceItemQueueEventInfo {
  readonly queue: string;
  readonly batchSize: number;
}
interface TraceItemEmailEventInfo {
  readonly mailFrom: string;
  readonly rcptTo: string;
  readonly rawSize: number;
}
interface TraceItemTailEventInfo {
  readonly consumedEvents: TraceItemTailEventInfoTailItem[];
}
interface TraceItemTailEventInfoTailItem {
  readonly scriptName: string | null;
}
interface TraceItemFetchEventInfo {
  readonly response?: TraceItemFetchEventInfoResponse;
  readonly request: TraceItemFetchEventInfoRequest;
}
interface TraceItemFetchEventInfoRequest {
  readonly cf?: any;
  readonly headers: Record<string, string>;
  readonly method: string;
  readonly url: string;
  getUnredacted(): TraceItemFetchEventInfoRequest;
}
interface TraceItemFetchEventInfoResponse {
  readonly status: number;
}
interface TraceItemJsRpcEventInfo {
  readonly rpcMethod: string;
}
interface TraceItemHibernatableWebSocketEventInfo {
  readonly getWebSocketEvent:
    | TraceItemHibernatableWebSocketEventInfoMessage
    | TraceItemHibernatableWebSocketEventInfoClose
    | TraceItemHibernatableWebSocketEventInfoError;
}
interface TraceItemHibernatableWebSocketEventInfoMessage {
  readonly webSocketEventType: string;
}
interface TraceItemHibernatableWebSocketEventInfoClose {
  readonly webSocketEventType: string;
  readonly code: number;
  readonly wasClean: boolean;
}
interface TraceItemHibernatableWebSocketEventInfoError {
  readonly webSocketEventType: string;
}
interface TraceLog {
  readonly timestamp: number;
  readonly level: string;
  readonly message: any;
}
interface TraceException {
  readonly timestamp: number;
  readonly message: string;
  readonly name: string;
  readonly stack?: string;
}
interface TraceDiagnosticChannelEvent {
  readonly timestamp: number;
  readonly channel: string;
  readonly message: any;
}
interface TraceMetrics {
  readonly cpuTime: number;
  readonly wallTime: number;
}
interface UnsafeTraceMetrics {
  fromTrace(item: TraceItem): TraceMetrics;
}
/**
 * The URL interface represents an object providing static methods used for creating object URLs.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL)
 */
declare class URL {
  constructor(url: string | URL, base?: string | URL);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/origin) */
  get origin(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/href) */
  get href(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/href) */
  set href(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/protocol) */
  get protocol(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/protocol) */
  set protocol(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/username) */
  get username(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/username) */
  set username(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/password) */
  get password(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/password) */
  set password(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/host) */
  get host(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/host) */
  set host(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/hostname) */
  get hostname(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/hostname) */
  set hostname(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/port) */
  get port(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/port) */
  set port(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/pathname) */
  get pathname(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/pathname) */
  set pathname(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/search) */
  get search(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/search) */
  set search(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/hash) */
  get hash(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/hash) */
  set hash(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/searchParams) */
  get searchParams(): URLSearchParams;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/toJSON) */
  toJSON(): string;
  /*function toString() { [native code] }*/
  toString(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/canParse_static) */
  static canParse(url: string, base?: string): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/parse_static) */
  static parse(url: string, base?: string): URL | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/createObjectURL_static) */
  static createObjectURL(object: File | Blob): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/revokeObjectURL_static) */
  static revokeObjectURL(object_url: string): void;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams) */
declare class URLSearchParams {
  constructor(
    init?: Iterable<Iterable<string>> | Record<string, string> | string,
  );
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/size) */
  get size(): number;
  /**
   * Appends a specified key/value pair as a new search parameter.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/append)
   */
  append(name: string, value: string): void;
  /**
   * Deletes the given search parameter, and its associated value, from the list of all search parameters.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/delete)
   */
  delete(name: string, value?: string): void;
  /**
   * Returns the first value associated to the given search parameter.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/get)
   */
  get(name: string): string | null;
  /**
   * Returns all the values association with a given search parameter.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/getAll)
   */
  getAll(name: string): string[];
  /**
   * Returns a Boolean indicating if such a search parameter exists.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/has)
   */
  has(name: string, value?: string): boolean;
  /**
   * Sets the value associated to a given search parameter to the given value. If there were several values, delete the others.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/set)
   */
  set(name: string, value: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/sort) */
  sort(): void;
  /* Returns an array of key, value pairs for every entry in the search params. */
  entries(): IterableIterator<[key: string, value: string]>;
  /* Returns a list of keys in the search params. */
  keys(): IterableIterator<string>;
  /* Returns a list of values in the search params. */
  values(): IterableIterator<string>;
  forEach<This = unknown>(
    callback: (
      this: This,
      value: string,
      key: string,
      parent: URLSearchParams,
    ) => void,
    thisArg?: This,
  ): void;
  /*function toString() { [native code] } Returns a string containing a query string suitable for use in a URL. Does not include the question mark. */
  toString(): string;
  [Symbol.iterator](): IterableIterator<[key: string, value: string]>;
}
declare class URLPattern {
  constructor(
    input?: string | URLPatternInit,
    baseURL?: string | URLPatternOptions,
    patternOptions?: URLPatternOptions,
  );
  get protocol(): string;
  get username(): string;
  get password(): string;
  get hostname(): string;
  get port(): string;
  get pathname(): string;
  get search(): string;
  get hash(): string;
  test(input?: string | URLPatternInit, baseURL?: string): boolean;
  exec(
    input?: string | URLPatternInit,
    baseURL?: string,
  ): URLPatternResult | null;
}
interface URLPatternInit {
  protocol?: string;
  username?: string;
  password?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  baseURL?: string;
}
interface URLPatternComponentResult {
  input: string;
  groups: Record<string, string>;
}
interface URLPatternResult {
  inputs: (string | URLPatternInit)[];
  protocol: URLPatternComponentResult;
  username: URLPatternComponentResult;
  password: URLPatternComponentResult;
  hostname: URLPatternComponentResult;
  port: URLPatternComponentResult;
  pathname: URLPatternComponentResult;
  search: URLPatternComponentResult;
  hash: URLPatternComponentResult;
}
interface URLPatternOptions {
  ignoreCase?: boolean;
}
/**
 * A CloseEvent is sent to clients using WebSockets when the connection is closed. This is delivered to the listener indicated by the WebSocket object's onclose attribute.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CloseEvent)
 */
declare class CloseEvent extends Event {
  constructor(type: string, initializer?: CloseEventInit);
  /**
   * Returns the WebSocket connection close code provided by the server.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CloseEvent/code)
   */
  readonly code: number;
  /**
   * Returns the WebSocket connection close reason provided by the server.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CloseEvent/reason)
   */
  readonly reason: string;
  /**
   * Returns true if the connection closed cleanly; false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CloseEvent/wasClean)
   */
  readonly wasClean: boolean;
}
interface CloseEventInit {
  code?: number;
  reason?: string;
  wasClean?: boolean;
}
/**
 * A message received by a target object.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent)
 */
declare class MessageEvent extends Event {
  constructor(type: string, initializer: MessageEventInit);
  /**
   * Returns the data of the message.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/data)
   */
  readonly data: ArrayBuffer | string;
}
interface MessageEventInit {
  data: ArrayBuffer | string;
}
type WebSocketEventMap = {
  close: CloseEvent;
  message: MessageEvent;
  open: Event;
  error: ErrorEvent;
};
/**
 * Provides the API for creating and managing a WebSocket connection to a server, as well as for sending and receiving data on the connection.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket)
 */
declare var WebSocket: {
  prototype: WebSocket;
  new (url: string, protocols?: string[] | string): WebSocket;
  readonly READY_STATE_CONNECTING: number;
  readonly CONNECTING: number;
  readonly READY_STATE_OPEN: number;
  readonly OPEN: number;
  readonly READY_STATE_CLOSING: number;
  readonly CLOSING: number;
  readonly READY_STATE_CLOSED: number;
  readonly CLOSED: number;
};
/**
 * Provides the API for creating and managing a WebSocket connection to a server, as well as for sending and receiving data on the connection.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket)
 */
interface WebSocket extends EventTarget<WebSocketEventMap> {
  accept(): void;
  /**
   * Transmits data using the WebSocket connection. data can be a string, a Blob, an ArrayBuffer, or an ArrayBufferView.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/send)
   */
  send(message: (ArrayBuffer | ArrayBufferView) | string): void;
  /**
   * Closes the WebSocket connection, optionally using code as the the WebSocket connection close code and reason as the the WebSocket connection close reason.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/close)
   */
  close(code?: number, reason?: string): void;
  serializeAttachment(attachment: any): void;
  deserializeAttachment(): any | null;
  /**
   * Returns the state of the WebSocket object's connection. It can have the values described below.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/readyState)
   */
  readyState: number;
  /**
   * Returns the URL that was used to establish the WebSocket connection.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/url)
   */
  url: string | null;
  /**
   * Returns the subprotocol selected by the server, if any. It can be used in conjunction with the array form of the constructor's second argument to perform subprotocol negotiation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/protocol)
   */
  protocol: string | null;
  /**
   * Returns the extensions selected by the server, if any.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/extensions)
   */
  extensions: string | null;
}
declare const WebSocketPair: {
  new (): {
    0: WebSocket;
    1: WebSocket;
  };
};
interface SqlStorage {
  exec<T extends Record<string, SqlStorageValue>>(
    query: string,
    ...bindings: any[]
  ): SqlStorageCursor<T>;
  get databaseSize(): number;
  Cursor: typeof SqlStorageCursor;
  Statement: typeof SqlStorageStatement;
}
declare abstract class SqlStorageStatement {}
type SqlStorageValue = ArrayBuffer | string | number | null;
declare abstract class SqlStorageCursor<
  T extends Record<string, SqlStorageValue>,
> {
  next():
    | {
        done?: false;
        value: T;
      }
    | {
        done: true;
        value?: never;
      };
  toArray(): T[];
  one(): T;
  raw<U extends SqlStorageValue[]>(): IterableIterator<U>;
  columnNames: string[];
  get rowsRead(): number;
  get rowsWritten(): number;
  [Symbol.iterator](): IterableIterator<T>;
}
interface Socket {
  get readable(): ReadableStream;
  get writable(): WritableStream;
  get closed(): Promise<void>;
  get opened(): Promise<SocketInfo>;
  get upgraded(): boolean;
  get secureTransport(): "on" | "off" | "starttls";
  close(): Promise<void>;
  startTls(options?: TlsOptions): Socket;
}
interface SocketOptions {
  secureTransport?: string;
  allowHalfOpen: boolean;
  highWaterMark?: number | bigint;
}
interface SocketAddress {
  hostname: string;
  port: number;
}
interface TlsOptions {
  expectedServerHostname?: string;
}
interface SocketInfo {
  remoteAddress?: string;
  localAddress?: string;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource) */
declare class EventSource extends EventTarget {
  constructor(url: string, init?: EventSourceEventSourceInit);
  /**
   * Aborts any instances of the fetch algorithm started for this EventSource object, and sets the readyState attribute to CLOSED.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/close)
   */
  close(): void;
  /**
   * Returns the URL providing the event stream.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/url)
   */
  get url(): string;
  /**
   * Returns true if the credentials mode for connection requests to the URL providing the event stream is set to "include", and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/withCredentials)
   */
  get withCredentials(): boolean;
  /**
   * Returns the state of this EventSource object's connection. It can have the values described below.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/readyState)
   */
  get readyState(): number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/open_event) */
  get onopen(): any | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/open_event) */
  set onopen(value: any | null);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/message_event) */
  get onmessage(): any | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/message_event) */
  set onmessage(value: any | null);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/error_event) */
  get onerror(): any | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/error_event) */
  set onerror(value: any | null);
  static readonly CONNECTING: number;
  static readonly OPEN: number;
  static readonly CLOSED: number;
  static from(stream: ReadableStream): EventSource;
}
interface EventSourceEventSourceInit {
  withCredentials?: boolean;
  fetcher?: Fetcher;
}
interface Container {
  get running(): boolean;
  start(options?: ContainerStartupOptions): void;
  monitor(): Promise<void>;
  destroy(error?: any): Promise<void>;
  signal(signo: number): void;
  getTcpPort(port: number): Fetcher;
}
interface ContainerStartupOptions {
  entrypoint?: string[];
  enableInternet: boolean;
  env?: Record<string, string>;
}
type AiImageClassificationInput = {
  image: number[];
};
type AiImageClassificationOutput = {
  score?: number;
  label?: string;
}[];
declare abstract class BaseAiImageClassification {
  inputs: AiImageClassificationInput;
  postProcessedOutputs: AiImageClassificationOutput;
}
type AiImageToTextInput = {
  image: number[];
  prompt?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  seed?: number;
  repetition_penalty?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  raw?: boolean;
  messages?: RoleScopedChatInput[];
};
type AiImageToTextOutput = {
  description: string;
};
declare abstract class BaseAiImageToText {
  inputs: AiImageToTextInput;
  postProcessedOutputs: AiImageToTextOutput;
}
type AiImageTextToTextInput = {
  image: string;
  prompt?: string;
  max_tokens?: number;
  temperature?: number;
  ignore_eos?: boolean;
  top_p?: number;
  top_k?: number;
  seed?: number;
  repetition_penalty?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  raw?: boolean;
  messages?: RoleScopedChatInput[];
};
type AiImageTextToTextOutput = {
  description: string;
};
declare abstract class BaseAiImageTextToText {
  inputs: AiImageTextToTextInput;
  postProcessedOutputs: AiImageTextToTextOutput;
}
type AiObjectDetectionInput = {
  image: number[];
};
type AiObjectDetectionOutput = {
  score?: number;
  label?: string;
}[];
declare abstract class BaseAiObjectDetection {
  inputs: AiObjectDetectionInput;
  postProcessedOutputs: AiObjectDetectionOutput;
}
type AiSentenceSimilarityInput = {
  source: string;
  sentences: string[];
};
type AiSentenceSimilarityOutput = number[];
declare abstract class BaseAiSentenceSimilarity {
  inputs: AiSentenceSimilarityInput;
  postProcessedOutputs: AiSentenceSimilarityOutput;
}
type AiAutomaticSpeechRecognitionInput = {
  audio: number[];
};
type AiAutomaticSpeechRecognitionOutput = {
  text?: string;
  words?: {
    word: string;
    start: number;
    end: number;
  }[];
  vtt?: string;
};
declare abstract class BaseAiAutomaticSpeechRecognition {
  inputs: AiAutomaticSpeechRecognitionInput;
  postProcessedOutputs: AiAutomaticSpeechRecognitionOutput;
}
type AiSummarizationInput = {
  input_text: string;
  max_length?: number;
};
type AiSummarizationOutput = {
  summary: string;
};
declare abstract class BaseAiSummarization {
  inputs: AiSummarizationInput;
  postProcessedOutputs: AiSummarizationOutput;
}
type AiTextClassificationInput = {
  text: string;
};
type AiTextClassificationOutput = {
  score?: number;
  label?: string;
}[];
declare abstract class BaseAiTextClassification {
  inputs: AiTextClassificationInput;
  postProcessedOutputs: AiTextClassificationOutput;
}
type AiTextEmbeddingsInput = {
  text: string | string[];
};
type AiTextEmbeddingsOutput = {
  shape: number[];
  data: number[][];
};
declare abstract class BaseAiTextEmbeddings {
  inputs: AiTextEmbeddingsInput;
  postProcessedOutputs: AiTextEmbeddingsOutput;
}
type RoleScopedChatInput = {
  role:
    | "user"
    | "assistant"
    | "system"
    | "tool"
    | (string & NonNullable<unknown>);
  content: string;
  name?: string;
};
type AiTextGenerationToolLegacyInput = {
  name: string;
  description: string;
  parameters?: {
    type: "object" | (string & NonNullable<unknown>);
    properties: {
      [key: string]: {
        type: string;
        description?: string;
      };
    };
    required: string[];
  };
};
type AiTextGenerationToolInput = {
  type: "function" | (string & NonNullable<unknown>);
  function: {
    name: string;
    description: string;
    parameters?: {
      type: "object" | (string & NonNullable<unknown>);
      properties: {
        [key: string]: {
          type: string;
          description?: string;
        };
      };
      required: string[];
    };
  };
};
type AiTextGenerationFunctionsInput = {
  name: string;
  code: string;
};
type AiTextGenerationResponseFormat = {
  type: string;
  json_schema?: any;
};
type AiTextGenerationInput = {
  prompt?: string;
  raw?: boolean;
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  seed?: number;
  repetition_penalty?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  messages?: RoleScopedChatInput[];
  response_format?: AiTextGenerationResponseFormat;
  tools?:
    | AiTextGenerationToolInput[]
    | AiTextGenerationToolLegacyInput[]
    | (object & NonNullable<unknown>);
  functions?: AiTextGenerationFunctionsInput[];
};
type AiTextGenerationOutput = {
  response?: string;
  tool_calls?: {
    name: string;
    arguments: unknown;
  }[];
};
declare abstract class BaseAiTextGeneration {
  inputs: AiTextGenerationInput;
  postProcessedOutputs: AiTextGenerationOutput;
}
type AiTextToSpeechInput = {
  prompt: string;
  lang?: string;
};
type AiTextToSpeechOutput =
  | Uint8Array
  | {
      audio: string;
    };
declare abstract class BaseAiTextToSpeech {
  inputs: AiTextToSpeechInput;
  postProcessedOutputs: AiTextToSpeechOutput;
}
type AiTextToImageInput = {
  prompt: string;
  negative_prompt?: string;
  height?: number;
  width?: number;
  image?: number[];
  image_b64?: string;
  mask?: number[];
  num_steps?: number;
  strength?: number;
  guidance?: number;
  seed?: number;
};
type AiTextToImageOutput = ReadableStream<Uint8Array>;
declare abstract class BaseAiTextToImage {
  inputs: AiTextToImageInput;
  postProcessedOutputs: AiTextToImageOutput;
}
type AiTranslationInput = {
  text: string;
  target_lang: string;
  source_lang?: string;
};
type AiTranslationOutput = {
  translated_text?: string;
};
declare abstract class BaseAiTranslation {
  inputs: AiTranslationInput;
  postProcessedOutputs: AiTranslationOutput;
}
type Ai_Cf_Baai_Bge_Base_En_V1_5_Input =
  | {
      text: string | string[];
      /**
       * The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.
       */
      pooling?: "mean" | "cls";
    }
  | {
      /**
       * Batch of the embeddings requests to run using async-queue
       */
      requests: {
        text: string | string[];
        /**
         * The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.
         */
        pooling?: "mean" | "cls";
      }[];
    };
type Ai_Cf_Baai_Bge_Base_En_V1_5_Output =
  | {
      shape?: number[];
      /**
       * Embeddings of the requested text values
       */
      data?: number[][];
      /**
       * The pooling method used in the embedding process.
       */
      pooling?: "mean" | "cls";
    }
  | AsyncResponse;
interface AsyncResponse {
  /**
   * The async request id that can be used to obtain the results.
   */
  request_id?: string;
}
declare abstract class Base_Ai_Cf_Baai_Bge_Base_En_V1_5 {
  inputs: Ai_Cf_Baai_Bge_Base_En_V1_5_Input;
  postProcessedOutputs: Ai_Cf_Baai_Bge_Base_En_V1_5_Output;
}
type Ai_Cf_Openai_Whisper_Input =
  | string
  | {
      /**
       * An array of integers that represent the audio data constrained to 8-bit unsigned integer values
       */
      audio: number[];
    };
interface Ai_Cf_Openai_Whisper_Output {
  /**
   * The transcription
   */
  text: string;
  word_count?: number;
  words?: {
    word?: string;
    /**
     * The second this word begins in the recording
     */
    start?: number;
    /**
     * The ending second when the word completes
     */
    end?: number;
  }[];
  vtt?: string;
}
declare abstract class Base_Ai_Cf_Openai_Whisper {
  inputs: Ai_Cf_Openai_Whisper_Input;
  postProcessedOutputs: Ai_Cf_Openai_Whisper_Output;
}
type Ai_Cf_Meta_M2M100_1_2B_Input =
  | {
      /**
       * The text to be translated
       */
      text: string;
      /**
       * The language code of the source text (e.g., 'en' for English). Defaults to 'en' if not specified
       */
      source_lang?: string;
      /**
       * The language code to translate the text into (e.g., 'es' for Spanish)
       */
      target_lang: string;
    }
  | {
      /**
       * Batch of the embeddings requests to run using async-queue
       */
      requests: {
        /**
         * The text to be translated
         */
        text: string;
        /**
         * The language code of the source text (e.g., 'en' for English). Defaults to 'en' if not specified
         */
        source_lang?: string;
        /**
         * The language code to translate the text into (e.g., 'es' for Spanish)
         */
        target_lang: string;
      }[];
    };
type Ai_Cf_Meta_M2M100_1_2B_Output =
  | {
      /**
       * The translated text in the target language
       */
      translated_text?: string;
    }
  | AsyncResponse;
declare abstract class Base_Ai_Cf_Meta_M2M100_1_2B {
  inputs: Ai_Cf_Meta_M2M100_1_2B_Input;
  postProcessedOutputs: Ai_Cf_Meta_M2M100_1_2B_Output;
}
type Ai_Cf_Baai_Bge_Small_En_V1_5_Input =
  | {
      text: string | string[];
      /**
       * The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.
       */
      pooling?: "mean" | "cls";
    }
  | {
      /**
       * Batch of the embeddings requests to run using async-queue
       */
      requests: {
        text: string | string[];
        /**
         * The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.
         */
        pooling?: "mean" | "cls";
      }[];
    };
type Ai_Cf_Baai_Bge_Small_En_V1_5_Output =
  | {
      shape?: number[];
      /**
       * Embeddings of the requested text values
       */
      data?: number[][];
      /**
       * The pooling method used in the embedding process.
       */
      pooling?: "mean" | "cls";
    }
  | AsyncResponse;
declare abstract class Base_Ai_Cf_Baai_Bge_Small_En_V1_5 {
  inputs: Ai_Cf_Baai_Bge_Small_En_V1_5_Input;
  postProcessedOutputs: Ai_Cf_Baai_Bge_Small_En_V1_5_Output;
}
type Ai_Cf_Baai_Bge_Large_En_V1_5_Input =
  | {
      text: string | string[];
      /**
       * The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.
       */
      pooling?: "mean" | "cls";
    }
  | {
      /**
       * Batch of the embeddings requests to run using async-queue
       */
      requests: {
        text: string | string[];
        /**
         * The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.
         */
        pooling?: "mean" | "cls";
      }[];
    };
type Ai_Cf_Baai_Bge_Large_En_V1_5_Output =
  | {
      shape?: number[];
      /**
       * Embeddings of the requested text values
       */
      data?: number[][];
      /**
       * The pooling method used in the embedding process.
       */
      pooling?: "mean" | "cls";
    }
  | AsyncResponse;
declare abstract class Base_Ai_Cf_Baai_Bge_Large_En_V1_5 {
  inputs: Ai_Cf_Baai_Bge_Large_En_V1_5_Input;
  postProcessedOutputs: Ai_Cf_Baai_Bge_Large_En_V1_5_Output;
}
type Ai_Cf_Unum_Uform_Gen2_Qwen_500M_Input =
  | string
  | {
      /**
       * The input text prompt for the model to generate a response.
       */
      prompt?: string;
      /**
       * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
       */
      raw?: boolean;
      /**
       * Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
       */
      top_p?: number;
      /**
       * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
       */
      top_k?: number;
      /**
       * Random seed for reproducibility of the generation.
       */
      seed?: number;
      /**
       * Penalty for repeated tokens; higher values discourage repetition.
       */
      repetition_penalty?: number;
      /**
       * Decreases the likelihood of the model repeating the same lines verbatim.
       */
      frequency_penalty?: number;
      /**
       * Increases the likelihood of the model introducing new topics.
       */
      presence_penalty?: number;
      image: number[] | (string & NonNullable<unknown>);
      /**
       * The maximum number of tokens to generate in the response.
       */
      max_tokens?: number;
    };
interface Ai_Cf_Unum_Uform_Gen2_Qwen_500M_Output {
  description?: string;
}
declare abstract class Base_Ai_Cf_Unum_Uform_Gen2_Qwen_500M {
  inputs: Ai_Cf_Unum_Uform_Gen2_Qwen_500M_Input;
  postProcessedOutputs: Ai_Cf_Unum_Uform_Gen2_Qwen_500M_Output;
}
type Ai_Cf_Openai_Whisper_Tiny_En_Input =
  | string
  | {
      /**
       * An array of integers that represent the audio data constrained to 8-bit unsigned integer values
       */
      audio: number[];
    };
interface Ai_Cf_Openai_Whisper_Tiny_En_Output {
  /**
   * The transcription
   */
  text: string;
  word_count?: number;
  words?: {
    word?: string;
    /**
     * The second this word begins in the recording
     */
    start?: number;
    /**
     * The ending second when the word completes
     */
    end?: number;
  }[];
  vtt?: string;
}
declare abstract class Base_Ai_Cf_Openai_Whisper_Tiny_En {
  inputs: Ai_Cf_Openai_Whisper_Tiny_En_Input;
  postProcessedOutputs: Ai_Cf_Openai_Whisper_Tiny_En_Output;
}
interface Ai_Cf_Openai_Whisper_Large_V3_Turbo_Input {
  /**
   * Base64 encoded value of the audio data.
   */
  audio: string;
  /**
   * Supported tasks are 'translate' or 'transcribe'.
   */
  task?: string;
  /**
   * The language of the audio being transcribed or translated.
   */
  language?: string;
  /**
   * Preprocess the audio with a voice activity detection model.
   */
  vad_filter?: boolean;
  /**
   * A text prompt to help provide context to the model on the contents of the audio.
   */
  initial_prompt?: string;
  /**
   * The prefix it appended the the beginning of the output of the transcription and can guide the transcription result.
   */
  prefix?: string;
}
interface Ai_Cf_Openai_Whisper_Large_V3_Turbo_Output {
  transcription_info?: {
    /**
     * The language of the audio being transcribed or translated.
     */
    language?: string;
    /**
     * The confidence level or probability of the detected language being accurate, represented as a decimal between 0 and 1.
     */
    language_probability?: number;
    /**
     * The total duration of the original audio file, in seconds.
     */
    duration?: number;
    /**
     * The duration of the audio after applying Voice Activity Detection (VAD) to remove silent or irrelevant sections, in seconds.
     */
    duration_after_vad?: number;
  };
  /**
   * The complete transcription of the audio.
   */
  text: string;
  /**
   * The total number of words in the transcription.
   */
  word_count?: number;
  segments?: {
    /**
     * The starting time of the segment within the audio, in seconds.
     */
    start?: number;
    /**
     * The ending time of the segment within the audio, in seconds.
     */
    end?: number;
    /**
     * The transcription of the segment.
     */
    text?: string;
    /**
     * The temperature used in the decoding process, controlling randomness in predictions. Lower values result in more deterministic outputs.
     */
    temperature?: number;
    /**
     * The average log probability of the predictions for the words in this segment, indicating overall confidence.
     */
    avg_logprob?: number;
    /**
     * The compression ratio of the input to the output, measuring how much the text was compressed during the transcription process.
     */
    compression_ratio?: number;
    /**
     * The probability that the segment contains no speech, represented as a decimal between 0 and 1.
     */
    no_speech_prob?: number;
    words?: {
      /**
       * The individual word transcribed from the audio.
       */
      word?: string;
      /**
       * The starting time of the word within the audio, in seconds.
       */
      start?: number;
      /**
       * The ending time of the word within the audio, in seconds.
       */
      end?: number;
    }[];
  }[];
  /**
   * The transcription in WebVTT format, which includes timing and text information for use in subtitles.
   */
  vtt?: string;
}
declare abstract class Base_Ai_Cf_Openai_Whisper_Large_V3_Turbo {
  inputs: Ai_Cf_Openai_Whisper_Large_V3_Turbo_Input;
  postProcessedOutputs: Ai_Cf_Openai_Whisper_Large_V3_Turbo_Output;
}
type Ai_Cf_Baai_Bge_M3_Input =
  | BGEM3InputQueryAndContexts
  | BGEM3InputEmbedding
  | {
      /**
       * Batch of the embeddings requests to run using async-queue
       */
      requests: (BGEM3InputQueryAndContexts1 | BGEM3InputEmbedding1)[];
    };
interface BGEM3InputQueryAndContexts {
  /**
   * A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts
   */
  query?: string;
  /**
   * List of provided contexts. Note that the index in this array is important, as the response will refer to it.
   */
  contexts: {
    /**
     * One of the provided context content
     */
    text?: string;
  }[];
  /**
   * When provided with too long context should the model error out or truncate the context to fit?
   */
  truncate_inputs?: boolean;
}
interface BGEM3InputEmbedding {
  text: string | string[];
  /**
   * When provided with too long context should the model error out or truncate the context to fit?
   */
  truncate_inputs?: boolean;
}
interface BGEM3InputQueryAndContexts1 {
  /**
   * A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts
   */
  query?: string;
  /**
   * List of provided contexts. Note that the index in this array is important, as the response will refer to it.
   */
  contexts: {
    /**
     * One of the provided context content
     */
    text?: string;
  }[];
  /**
   * When provided with too long context should the model error out or truncate the context to fit?
   */
  truncate_inputs?: boolean;
}
interface BGEM3InputEmbedding1 {
  text: string | string[];
  /**
   * When provided with too long context should the model error out or truncate the context to fit?
   */
  truncate_inputs?: boolean;
}
type Ai_Cf_Baai_Bge_M3_Output =
  | BGEM3OuputQuery
  | BGEM3OutputEmbeddingForContexts
  | BGEM3OuputEmbedding
  | AsyncResponse;
interface BGEM3OuputQuery {
  response?: {
    /**
     * Index of the context in the request
     */
    id?: number;
    /**
     * Score of the context under the index.
     */
    score?: number;
  }[];
}
interface BGEM3OutputEmbeddingForContexts {
  response?: number[][];
  shape?: number[];
  /**
   * The pooling method used in the embedding process.
   */
  pooling?: "mean" | "cls";
}
interface BGEM3OuputEmbedding {
  shape?: number[];
  /**
   * Embeddings of the requested text values
   */
  data?: number[][];
  /**
   * The pooling method used in the embedding process.
   */
  pooling?: "mean" | "cls";
}
declare abstract class Base_Ai_Cf_Baai_Bge_M3 {
  inputs: Ai_Cf_Baai_Bge_M3_Input;
  postProcessedOutputs: Ai_Cf_Baai_Bge_M3_Output;
}
interface Ai_Cf_Black_Forest_Labs_Flux_1_Schnell_Input {
  /**
   * A text description of the image you want to generate.
   */
  prompt: string;
  /**
   * The number of diffusion steps; higher values can improve quality but take longer.
   */
  steps?: number;
}
interface Ai_Cf_Black_Forest_Labs_Flux_1_Schnell_Output {
  /**
   * The generated image in Base64 format.
   */
  image?: string;
}
declare abstract class Base_Ai_Cf_Black_Forest_Labs_Flux_1_Schnell {
  inputs: Ai_Cf_Black_Forest_Labs_Flux_1_Schnell_Input;
  postProcessedOutputs: Ai_Cf_Black_Forest_Labs_Flux_1_Schnell_Output;
}
type Ai_Cf_Meta_Llama_3_2_11B_Vision_Instruct_Input = Prompt | Messages;
interface Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  image?: number[] | (string & NonNullable<unknown>);
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
  /**
   * Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.
   */
  lora?: string;
}
interface Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role?: string;
    /**
     * The tool call id. Must be supplied for tool calls for Mistral-3. If you don't know what to put here you can fall back to 000000001
     */
    tool_call_id?: string;
    content?:
      | string
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        }[]
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        };
  }[];
  image?: number[] | (string & NonNullable<unknown>);
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  /**
   * If true, the response will be streamed back incrementally.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
type Ai_Cf_Meta_Llama_3_2_11B_Vision_Instruct_Output = {
  /**
   * The generated text response from the model
   */
  response?: string;
  /**
   * An array of tool calls requests made during the response generation
   */
  tool_calls?: {
    /**
     * The arguments passed to be passed to the tool call request
     */
    arguments?: object;
    /**
     * The name of the tool to be called
     */
    name?: string;
  }[];
};
declare abstract class Base_Ai_Cf_Meta_Llama_3_2_11B_Vision_Instruct {
  inputs: Ai_Cf_Meta_Llama_3_2_11B_Vision_Instruct_Input;
  postProcessedOutputs: Ai_Cf_Meta_Llama_3_2_11B_Vision_Instruct_Output;
}
type Ai_Cf_Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Input =
  | Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Prompt
  | Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Messages
  | AsyncBatch;
interface Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  /**
   * Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.
   */
  lora?: string;
  response_format?: JSONMode;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
interface JSONMode {
  type?: "json_object" | "json_schema";
  json_schema?: unknown;
}
interface Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role: string;
    /**
     * The content of the message as a string.
     */
    content: string;
  }[];
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  response_format?: JSONMode;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
interface AsyncBatch {
  requests?: {
    /**
     * User-supplied reference. This field will be present in the response as well it can be used to reference the request and response. It's NOT validated to be unique.
     */
    external_reference?: string;
    /**
     * Prompt for the text generation model
     */
    prompt?: string;
    /**
     * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
     */
    stream?: boolean;
    /**
     * The maximum number of tokens to generate in the response.
     */
    max_tokens?: number;
    /**
     * Controls the randomness of the output; higher values produce more random results.
     */
    temperature?: number;
    /**
     * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
     */
    top_p?: number;
    /**
     * Random seed for reproducibility of the generation.
     */
    seed?: number;
    /**
     * Penalty for repeated tokens; higher values discourage repetition.
     */
    repetition_penalty?: number;
    /**
     * Decreases the likelihood of the model repeating the same lines verbatim.
     */
    frequency_penalty?: number;
    /**
     * Increases the likelihood of the model introducing new topics.
     */
    presence_penalty?: number;
    response_format?: JSONMode;
  }[];
}
type Ai_Cf_Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Output =
  | {
      /**
       * The generated text response from the model
       */
      response: string;
      /**
       * Usage statistics for the inference request
       */
      usage?: {
        /**
         * Total number of tokens in input
         */
        prompt_tokens?: number;
        /**
         * Total number of tokens in output
         */
        completion_tokens?: number;
        /**
         * Total number of input and output tokens
         */
        total_tokens?: number;
      };
      /**
       * An array of tool calls requests made during the response generation
       */
      tool_calls?: {
        /**
         * The arguments passed to be passed to the tool call request
         */
        arguments?: object;
        /**
         * The name of the tool to be called
         */
        name?: string;
      }[];
    }
  | AsyncResponse;
declare abstract class Base_Ai_Cf_Meta_Llama_3_3_70B_Instruct_Fp8_Fast {
  inputs: Ai_Cf_Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Input;
  postProcessedOutputs: Ai_Cf_Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Output;
}
interface Ai_Cf_Meta_Llama_Guard_3_8B_Input {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender must alternate between 'user' and 'assistant'.
     */
    role: "user" | "assistant";
    /**
     * The content of the message as a string.
     */
    content: string;
  }[];
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Dictate the output format of the generated response.
   */
  response_format?: {
    /**
     * Set to json_object to process and output generated text as JSON.
     */
    type?: string;
  };
}
interface Ai_Cf_Meta_Llama_Guard_3_8B_Output {
  response?:
    | string
    | {
        /**
         * Whether the conversation is safe or not.
         */
        safe?: boolean;
        /**
         * A list of what hazard categories predicted for the conversation, if the conversation is deemed unsafe.
         */
        categories?: string[];
      };
  /**
   * Usage statistics for the inference request
   */
  usage?: {
    /**
     * Total number of tokens in input
     */
    prompt_tokens?: number;
    /**
     * Total number of tokens in output
     */
    completion_tokens?: number;
    /**
     * Total number of input and output tokens
     */
    total_tokens?: number;
  };
}
declare abstract class Base_Ai_Cf_Meta_Llama_Guard_3_8B {
  inputs: Ai_Cf_Meta_Llama_Guard_3_8B_Input;
  postProcessedOutputs: Ai_Cf_Meta_Llama_Guard_3_8B_Output;
}
interface Ai_Cf_Baai_Bge_Reranker_Base_Input {
  /**
   * A query you wish to perform against the provided contexts.
   */
  query: string;
  /**
   * Number of returned results starting with the best score.
   */
  top_k?: number;
  /**
   * List of provided contexts. Note that the index in this array is important, as the response will refer to it.
   */
  contexts: {
    /**
     * One of the provided context content
     */
    text?: string;
  }[];
}
interface Ai_Cf_Baai_Bge_Reranker_Base_Output {
  response?: {
    /**
     * Index of the context in the request
     */
    id?: number;
    /**
     * Score of the context under the index.
     */
    score?: number;
  }[];
}
declare abstract class Base_Ai_Cf_Baai_Bge_Reranker_Base {
  inputs: Ai_Cf_Baai_Bge_Reranker_Base_Input;
  postProcessedOutputs: Ai_Cf_Baai_Bge_Reranker_Base_Output;
}
type Ai_Cf_Qwen_Qwen2_5_Coder_32B_Instruct_Input =
  | Qwen2_5_Coder_32B_Instruct_Prompt
  | Qwen2_5_Coder_32B_Instruct_Messages;
interface Qwen2_5_Coder_32B_Instruct_Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  /**
   * Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.
   */
  lora?: string;
  response_format?: JSONMode;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
interface Qwen2_5_Coder_32B_Instruct_Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role: string;
    /**
     * The content of the message as a string.
     */
    content: string;
  }[];
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  response_format?: JSONMode;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
type Ai_Cf_Qwen_Qwen2_5_Coder_32B_Instruct_Output = {
  /**
   * The generated text response from the model
   */
  response: string;
  /**
   * Usage statistics for the inference request
   */
  usage?: {
    /**
     * Total number of tokens in input
     */
    prompt_tokens?: number;
    /**
     * Total number of tokens in output
     */
    completion_tokens?: number;
    /**
     * Total number of input and output tokens
     */
    total_tokens?: number;
  };
  /**
   * An array of tool calls requests made during the response generation
   */
  tool_calls?: {
    /**
     * The arguments passed to be passed to the tool call request
     */
    arguments?: object;
    /**
     * The name of the tool to be called
     */
    name?: string;
  }[];
};
declare abstract class Base_Ai_Cf_Qwen_Qwen2_5_Coder_32B_Instruct {
  inputs: Ai_Cf_Qwen_Qwen2_5_Coder_32B_Instruct_Input;
  postProcessedOutputs: Ai_Cf_Qwen_Qwen2_5_Coder_32B_Instruct_Output;
}
type Ai_Cf_Qwen_Qwq_32B_Input = Qwen_Qwq_32B_Prompt | Qwen_Qwq_32B_Messages;
interface Qwen_Qwq_32B_Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  /**
   * JSON schema that should be fulfilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
interface Qwen_Qwq_32B_Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role?: string;
    /**
     * The tool call id. Must be supplied for tool calls for Mistral-3. If you don't know what to put here you can fall back to 000000001
     */
    tool_call_id?: string;
    content?:
      | string
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        }[]
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        };
  }[];
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  /**
   * JSON schema that should be fufilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
type Ai_Cf_Qwen_Qwq_32B_Output = {
  /**
   * The generated text response from the model
   */
  response: string;
  /**
   * Usage statistics for the inference request
   */
  usage?: {
    /**
     * Total number of tokens in input
     */
    prompt_tokens?: number;
    /**
     * Total number of tokens in output
     */
    completion_tokens?: number;
    /**
     * Total number of input and output tokens
     */
    total_tokens?: number;
  };
  /**
   * An array of tool calls requests made during the response generation
   */
  tool_calls?: {
    /**
     * The arguments passed to be passed to the tool call request
     */
    arguments?: object;
    /**
     * The name of the tool to be called
     */
    name?: string;
  }[];
};
declare abstract class Base_Ai_Cf_Qwen_Qwq_32B {
  inputs: Ai_Cf_Qwen_Qwq_32B_Input;
  postProcessedOutputs: Ai_Cf_Qwen_Qwq_32B_Output;
}
type Ai_Cf_Mistralai_Mistral_Small_3_1_24B_Instruct_Input =
  | Mistral_Small_3_1_24B_Instruct_Prompt
  | Mistral_Small_3_1_24B_Instruct_Messages;
interface Mistral_Small_3_1_24B_Instruct_Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  /**
   * JSON schema that should be fulfilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
interface Mistral_Small_3_1_24B_Instruct_Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role?: string;
    /**
     * The tool call id. Must be supplied for tool calls for Mistral-3. If you don't know what to put here you can fall back to 000000001
     */
    tool_call_id?: string;
    content?:
      | string
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        }[]
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        };
  }[];
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  /**
   * JSON schema that should be fufilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
type Ai_Cf_Mistralai_Mistral_Small_3_1_24B_Instruct_Output = {
  /**
   * The generated text response from the model
   */
  response: string;
  /**
   * Usage statistics for the inference request
   */
  usage?: {
    /**
     * Total number of tokens in input
     */
    prompt_tokens?: number;
    /**
     * Total number of tokens in output
     */
    completion_tokens?: number;
    /**
     * Total number of input and output tokens
     */
    total_tokens?: number;
  };
  /**
   * An array of tool calls requests made during the response generation
   */
  tool_calls?: {
    /**
     * The arguments passed to be passed to the tool call request
     */
    arguments?: object;
    /**
     * The name of the tool to be called
     */
    name?: string;
  }[];
};
declare abstract class Base_Ai_Cf_Mistralai_Mistral_Small_3_1_24B_Instruct {
  inputs: Ai_Cf_Mistralai_Mistral_Small_3_1_24B_Instruct_Input;
  postProcessedOutputs: Ai_Cf_Mistralai_Mistral_Small_3_1_24B_Instruct_Output;
}
type Ai_Cf_Google_Gemma_3_12B_It_Input =
  | Google_Gemma_3_12B_It_Prompt
  | Google_Gemma_3_12B_It_Messages;
interface Google_Gemma_3_12B_It_Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  /**
   * JSON schema that should be fufilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
interface Google_Gemma_3_12B_It_Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role?: string;
    content?:
      | string
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        }[]
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        };
  }[];
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  /**
   * JSON schema that should be fufilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
type Ai_Cf_Google_Gemma_3_12B_It_Output = {
  /**
   * The generated text response from the model
   */
  response: string;
  /**
   * Usage statistics for the inference request
   */
  usage?: {
    /**
     * Total number of tokens in input
     */
    prompt_tokens?: number;
    /**
     * Total number of tokens in output
     */
    completion_tokens?: number;
    /**
     * Total number of input and output tokens
     */
    total_tokens?: number;
  };
  /**
   * An array of tool calls requests made during the response generation
   */
  tool_calls?: {
    /**
     * The arguments passed to be passed to the tool call request
     */
    arguments?: object;
    /**
     * The name of the tool to be called
     */
    name?: string;
  }[];
};
declare abstract class Base_Ai_Cf_Google_Gemma_3_12B_It {
  inputs: Ai_Cf_Google_Gemma_3_12B_It_Input;
  postProcessedOutputs: Ai_Cf_Google_Gemma_3_12B_It_Output;
}
type Ai_Cf_Meta_Llama_4_Scout_17B_16E_Instruct_Input =
  | Ai_Cf_Meta_Llama_4_Prompt
  | Ai_Cf_Meta_Llama_4_Messages;
interface Ai_Cf_Meta_Llama_4_Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  /**
   * JSON schema that should be fulfilled for the response.
   */
  guided_json?: object;
  response_format?: JSONMode;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
interface Ai_Cf_Meta_Llama_4_Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role?: string;
    /**
     * The tool call id. If you don't know what to put here you can fall back to 000000001
     */
    tool_call_id?: string;
    content?:
      | string
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        }[]
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        };
  }[];
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  response_format?: JSONMode;
  /**
   * JSON schema that should be fufilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
type Ai_Cf_Meta_Llama_4_Scout_17B_16E_Instruct_Output = {
  /**
   * The generated text response from the model
   */
  response: string;
  /**
   * Usage statistics for the inference request
   */
  usage?: {
    /**
     * Total number of tokens in input
     */
    prompt_tokens?: number;
    /**
     * Total number of tokens in output
     */
    completion_tokens?: number;
    /**
     * Total number of input and output tokens
     */
    total_tokens?: number;
  };
  /**
   * An array of tool calls requests made during the response generation
   */
  tool_calls?: {
    /**
     * The tool call id.
     */
    id?: string;
    /**
     * Specifies the type of tool (e.g., 'function').
     */
    type?: string;
    /**
     * Details of the function tool.
     */
    function?: {
      /**
       * The name of the tool to be called
       */
      name?: string;
      /**
       * The arguments passed to be passed to the tool call request
       */
      arguments?: object;
    };
  }[];
};
declare abstract class Base_Ai_Cf_Meta_Llama_4_Scout_17B_16E_Instruct {
  inputs: Ai_Cf_Meta_Llama_4_Scout_17B_16E_Instruct_Input;
  postProcessedOutputs: Ai_Cf_Meta_Llama_4_Scout_17B_16E_Instruct_Output;
}
interface AiModels {
  "@cf/huggingface/distilbert-sst-2-int8": BaseAiTextClassification;
  "@cf/stabilityai/stable-diffusion-xl-base-1.0": BaseAiTextToImage;
  "@cf/runwayml/stable-diffusion-v1-5-inpainting": BaseAiTextToImage;
  "@cf/runwayml/stable-diffusion-v1-5-img2img": BaseAiTextToImage;
  "@cf/lykon/dreamshaper-8-lcm": BaseAiTextToImage;
  "@cf/bytedance/stable-diffusion-xl-lightning": BaseAiTextToImage;
  "@cf/myshell-ai/melotts": BaseAiTextToSpeech;
  "@cf/microsoft/resnet-50": BaseAiImageClassification;
  "@cf/facebook/detr-resnet-50": BaseAiObjectDetection;
  "@cf/meta/llama-2-7b-chat-int8": BaseAiTextGeneration;
  "@cf/mistral/mistral-7b-instruct-v0.1": BaseAiTextGeneration;
  "@cf/meta/llama-2-7b-chat-fp16": BaseAiTextGeneration;
  "@hf/thebloke/llama-2-13b-chat-awq": BaseAiTextGeneration;
  "@hf/thebloke/mistral-7b-instruct-v0.1-awq": BaseAiTextGeneration;
  "@hf/thebloke/zephyr-7b-beta-awq": BaseAiTextGeneration;
  "@hf/thebloke/openhermes-2.5-mistral-7b-awq": BaseAiTextGeneration;
  "@hf/thebloke/neural-chat-7b-v3-1-awq": BaseAiTextGeneration;
  "@hf/thebloke/llamaguard-7b-awq": BaseAiTextGeneration;
  "@hf/thebloke/deepseek-coder-6.7b-base-awq": BaseAiTextGeneration;
  "@hf/thebloke/deepseek-coder-6.7b-instruct-awq": BaseAiTextGeneration;
  "@cf/deepseek-ai/deepseek-math-7b-instruct": BaseAiTextGeneration;
  "@cf/defog/sqlcoder-7b-2": BaseAiTextGeneration;
  "@cf/openchat/openchat-3.5-0106": BaseAiTextGeneration;
  "@cf/tiiuae/falcon-7b-instruct": BaseAiTextGeneration;
  "@cf/thebloke/discolm-german-7b-v1-awq": BaseAiTextGeneration;
  "@cf/qwen/qwen1.5-0.5b-chat": BaseAiTextGeneration;
  "@cf/qwen/qwen1.5-7b-chat-awq": BaseAiTextGeneration;
  "@cf/qwen/qwen1.5-14b-chat-awq": BaseAiTextGeneration;
  "@cf/tinyllama/tinyllama-1.1b-chat-v1.0": BaseAiTextGeneration;
  "@cf/microsoft/phi-2": BaseAiTextGeneration;
  "@cf/qwen/qwen1.5-1.8b-chat": BaseAiTextGeneration;
  "@cf/mistral/mistral-7b-instruct-v0.2-lora": BaseAiTextGeneration;
  "@hf/nousresearch/hermes-2-pro-mistral-7b": BaseAiTextGeneration;
  "@hf/nexusflow/starling-lm-7b-beta": BaseAiTextGeneration;
  "@hf/google/gemma-7b-it": BaseAiTextGeneration;
  "@cf/meta-llama/llama-2-7b-chat-hf-lora": BaseAiTextGeneration;
  "@cf/google/gemma-2b-it-lora": BaseAiTextGeneration;
  "@cf/google/gemma-7b-it-lora": BaseAiTextGeneration;
  "@hf/mistral/mistral-7b-instruct-v0.2": BaseAiTextGeneration;
  "@cf/meta/llama-3-8b-instruct": BaseAiTextGeneration;
  "@cf/fblgit/una-cybertron-7b-v2-bf16": BaseAiTextGeneration;
  "@cf/meta/llama-3-8b-instruct-awq": BaseAiTextGeneration;
  "@hf/meta-llama/meta-llama-3-8b-instruct": BaseAiTextGeneration;
  "@cf/meta/llama-3.1-8b-instruct": BaseAiTextGeneration;
  "@cf/meta/llama-3.1-8b-instruct-fp8": BaseAiTextGeneration;
  "@cf/meta/llama-3.1-8b-instruct-awq": BaseAiTextGeneration;
  "@cf/meta/llama-3.2-3b-instruct": BaseAiTextGeneration;
  "@cf/meta/llama-3.2-1b-instruct": BaseAiTextGeneration;
  "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b": BaseAiTextGeneration;
  "@cf/facebook/bart-large-cnn": BaseAiSummarization;
  "@cf/llava-hf/llava-1.5-7b-hf": BaseAiImageToText;
  "@cf/baai/bge-base-en-v1.5": Base_Ai_Cf_Baai_Bge_Base_En_V1_5;
  "@cf/openai/whisper": Base_Ai_Cf_Openai_Whisper;
  "@cf/meta/m2m100-1.2b": Base_Ai_Cf_Meta_M2M100_1_2B;
  "@cf/baai/bge-small-en-v1.5": Base_Ai_Cf_Baai_Bge_Small_En_V1_5;
  "@cf/baai/bge-large-en-v1.5": Base_Ai_Cf_Baai_Bge_Large_En_V1_5;
  "@cf/unum/uform-gen2-qwen-500m": Base_Ai_Cf_Unum_Uform_Gen2_Qwen_500M;
  "@cf/openai/whisper-tiny-en": Base_Ai_Cf_Openai_Whisper_Tiny_En;
  "@cf/openai/whisper-large-v3-turbo": Base_Ai_Cf_Openai_Whisper_Large_V3_Turbo;
  "@cf/baai/bge-m3": Base_Ai_Cf_Baai_Bge_M3;
  "@cf/black-forest-labs/flux-1-schnell": Base_Ai_Cf_Black_Forest_Labs_Flux_1_Schnell;
  "@cf/meta/llama-3.2-11b-vision-instruct": Base_Ai_Cf_Meta_Llama_3_2_11B_Vision_Instruct;
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast": Base_Ai_Cf_Meta_Llama_3_3_70B_Instruct_Fp8_Fast;
  "@cf/meta/llama-guard-3-8b": Base_Ai_Cf_Meta_Llama_Guard_3_8B;
  "@cf/baai/bge-reranker-base": Base_Ai_Cf_Baai_Bge_Reranker_Base;
  "@cf/qwen/qwen2.5-coder-32b-instruct": Base_Ai_Cf_Qwen_Qwen2_5_Coder_32B_Instruct;
  "@cf/qwen/qwq-32b": Base_Ai_Cf_Qwen_Qwq_32B;
  "@cf/mistralai/mistral-small-3.1-24b-instruct": Base_Ai_Cf_Mistralai_Mistral_Small_3_1_24B_Instruct;
  "@cf/google/gemma-3-12b-it": Base_Ai_Cf_Google_Gemma_3_12B_It;
  "@cf/meta/llama-4-scout-17b-16e-instruct": Base_Ai_Cf_Meta_Llama_4_Scout_17B_16E_Instruct;
}
type AiOptions = {
  /**
   * Send requests as an asynchronous batch job, only works for supported models
   * https://developers.cloudflare.com/workers-ai/features/batch-api
   */
  queueRequest?: boolean;
  gateway?: GatewayOptions;
  returnRawResponse?: boolean;
  prefix?: string;
  extraHeaders?: object;
};
type ConversionResponse = {
  name: string;
  mimeType: string;
  format: "markdown";
  tokens: number;
  data: string;
};
type AiModelsSearchParams = {
  author?: string;
  hide_experimental?: boolean;
  page?: number;
  per_page?: number;
  search?: string;
  source?: number;
  task?: string;
};
type AiModelsSearchObject = {
  id: string;
  source: number;
  name: string;
  description: string;
  task: {
    id: string;
    name: string;
    description: string;
  };
  tags: string[];
  properties: {
    property_id: string;
    value: string;
  }[];
};
interface InferenceUpstreamError extends Error {}
interface AiInternalError extends Error {}
type AiModelListType = Record<string, any>;
declare abstract class Ai<AiModelList extends AiModelListType = AiModels> {
  aiGatewayLogId: string | null;
  gateway(gatewayId: string): AiGateway;
  autorag(autoragId: string): AutoRAG;
  run<
    Name extends keyof AiModelList,
    Options extends AiOptions,
    InputOptions extends AiModelList[Name]["inputs"],
  >(
    model: Name,
    inputs: InputOptions,
    options?: Options,
  ): Promise<
    Options extends {
      returnRawResponse: true;
    }
      ? Response
      : InputOptions extends {
            stream: true;
          }
        ? ReadableStream
        : AiModelList[Name]["postProcessedOutputs"]
  >;
  models(params?: AiModelsSearchParams): Promise<AiModelsSearchObject[]>;
  toMarkdown(
    files: {
      name: string;
      blob: Blob;
    }[],
    options?: {
      gateway?: GatewayOptions;
      extraHeaders?: object;
    },
  ): Promise<ConversionResponse[]>;
  toMarkdown(
    files: {
      name: string;
      blob: Blob;
    },
    options?: {
      gateway?: GatewayOptions;
      extraHeaders?: object;
    },
  ): Promise<ConversionResponse>;
}
type GatewayRetries = {
  maxAttempts?: 1 | 2 | 3 | 4 | 5;
  retryDelayMs?: number;
  backoff?: "constant" | "linear" | "exponential";
};
type GatewayOptions = {
  id: string;
  cacheKey?: string;
  cacheTtl?: number;
  skipCache?: boolean;
  metadata?: Record<string, number | string | boolean | null | bigint>;
  collectLog?: boolean;
  eventId?: string;
  requestTimeoutMs?: number;
  retries?: GatewayRetries;
};
type AiGatewayPatchLog = {
  score?: number | null;
  feedback?: -1 | 1 | null;
  metadata?: Record<string, number | string | boolean | null | bigint> | null;
};
type AiGatewayLog = {
  id: string;
  provider: string;
  model: string;
  model_type?: string;
  path: string;
  duration: number;
  request_type?: string;
  request_content_type?: string;
  status_code: number;
  response_content_type?: string;
  success: boolean;
  cached: boolean;
  tokens_in?: number;
  tokens_out?: number;
  metadata?: Record<string, number | string | boolean | null | bigint>;
  step?: number;
  cost?: number;
  custom_cost?: boolean;
  request_size: number;
  request_head?: string;
  request_head_complete: boolean;
  response_size: number;
  response_head?: string;
  response_head_complete: boolean;
  created_at: Date;
};
type AIGatewayProviders =
  | "workers-ai"
  | "anthropic"
  | "aws-bedrock"
  | "azure-openai"
  | "google-vertex-ai"
  | "huggingface"
  | "openai"
  | "perplexity-ai"
  | "replicate"
  | "groq"
  | "cohere"
  | "google-ai-studio"
  | "mistral"
  | "grok"
  | "openrouter"
  | "deepseek"
  | "cerebras"
  | "cartesia"
  | "elevenlabs"
  | "adobe-firefly";
type AIGatewayHeaders = {
  "cf-aig-metadata":
    | Record<string, number | string | boolean | null | bigint>
    | string;
  "cf-aig-custom-cost":
    | {
        per_token_in?: number;
        per_token_out?: number;
      }
    | {
        total_cost?: number;
      }
    | string;
  "cf-aig-cache-ttl": number | string;
  "cf-aig-skip-cache": boolean | string;
  "cf-aig-cache-key": string;
  "cf-aig-event-id": string;
  "cf-aig-request-timeout": number | string;
  "cf-aig-max-attempts": number | string;
  "cf-aig-retry-delay": number | string;
  "cf-aig-backoff": string;
  "cf-aig-collect-log": boolean | string;
  Authorization: string;
  "Content-Type": string;
  [key: string]: string | number | boolean | object;
};
type AIGatewayUniversalRequest = {
  provider: AIGatewayProviders | string; // eslint-disable-line
  endpoint: string;
  headers: Partial<AIGatewayHeaders>;
  query: unknown;
};
interface AiGatewayInternalError extends Error {}
interface AiGatewayLogNotFound extends Error {}
declare abstract class AiGateway {
  patchLog(logId: string, data: AiGatewayPatchLog): Promise<void>;
  getLog(logId: string): Promise<AiGatewayLog>;
  run(
    data: AIGatewayUniversalRequest | AIGatewayUniversalRequest[],
    options?: {
      gateway?: GatewayOptions;
      extraHeaders?: object;
    },
  ): Promise<Response>;
  getUrl(provider?: AIGatewayProviders | string): Promise<string>; // eslint-disable-line
}
interface AutoRAGInternalError extends Error {}
interface AutoRAGNotFoundError extends Error {}
interface AutoRAGUnauthorizedError extends Error {}
interface AutoRAGNameNotSetError extends Error {}
type ComparisonFilter = {
  key: string;
  type: "eq" | "ne" | "gt" | "gte" | "lt" | "lte";
  value: string | number | boolean;
};
type CompoundFilter = {
  type: "and" | "or";
  filters: ComparisonFilter[];
};
type AutoRagSearchRequest = {
  query: string;
  filters?: CompoundFilter | ComparisonFilter;
  max_num_results?: number;
  ranking_options?: {
    ranker?: string;
    score_threshold?: number;
  };
  rewrite_query?: boolean;
};
type AutoRagAiSearchRequest = AutoRagSearchRequest & {
  stream?: boolean;
};
type AutoRagAiSearchRequestStreaming = Omit<
  AutoRagAiSearchRequest,
  "stream"
> & {
  stream: true;
};
type AutoRagSearchResponse = {
  object: "vector_store.search_results.page";
  search_query: string;
  data: {
    file_id: string;
    filename: string;
    score: number;
    attributes: Record<string, string | number | boolean | null>;
    content: {
      type: "text";
      text: string;
    }[];
  }[];
  has_more: boolean;
  next_page: string | null;
};
type AutoRagListResponse = {
  id: string;
  enable: boolean;
  type: string;
  source: string;
  vectorize_name: string;
  paused: boolean;
  status: string;
}[];
type AutoRagAiSearchResponse = AutoRagSearchResponse & {
  response: string;
};
declare abstract class AutoRAG {
  list(): Promise<AutoRagListResponse>;
  search(params: AutoRagSearchRequest): Promise<AutoRagSearchResponse>;
  aiSearch(params: AutoRagAiSearchRequestStreaming): Promise<Response>;
  aiSearch(params: AutoRagAiSearchRequest): Promise<AutoRagAiSearchResponse>;
  aiSearch(
    params: AutoRagAiSearchRequest,
  ): Promise<AutoRagAiSearchResponse | Response>;
}
interface BasicImageTransformations {
  /**
   * Maximum width in image pixels. The value must be an integer.
   */
  width?: number;
  /**
   * Maximum height in image pixels. The value must be an integer.
   */
  height?: number;
  /**
   * Resizing mode as a string. It affects interpretation of width and height
   * options:
   *  - scale-down: Similar to contain, but the image is never enlarged. If
   *    the image is larger than given width or height, it will be resized.
   *    Otherwise its original size will be kept.
   *  - contain: Resizes to maximum size that fits within the given width and
   *    height. If only a single dimension is given (e.g. only width), the
   *    image will be shrunk or enlarged to exactly match that dimension.
   *    Aspect ratio is always preserved.
   *  - cover: Resizes (shrinks or enlarges) to fill the entire area of width
   *    and height. If the image has an aspect ratio different from the ratio
   *    of width and height, it will be cropped to fit.
   *  - crop: The image will be shrunk and cropped to fit within the area
   *    specified by width and height. The image will not be enlarged. For images
   *    smaller than the given dimensions it's the same as scale-down. For
   *    images larger than the given dimensions, it's the same as cover.
   *    See also trim.
   *  - pad: Resizes to the maximum size that fits within the given width and
   *    height, and then fills the remaining area with a background color
   *    (white by default). Use of this mode is not recommended, as the same
   *    effect can be more efficiently achieved with the contain mode and the
   *    CSS object-fit: contain property.
   *  - squeeze: Stretches and deforms to the width and height given, even if it
   *    breaks aspect ratio
   */
  fit?: "scale-down" | "contain" | "cover" | "crop" | "pad" | "squeeze";
  /**
   * When cropping with fit: "cover", this defines the side or point that should
   * be left uncropped. The value is either a string
   * "left", "right", "top", "bottom", "auto", or "center" (the default),
   * or an object {x, y} containing focal point coordinates in the original
   * image expressed as fractions ranging from 0.0 (top or left) to 1.0
   * (bottom or right), 0.5 being the center. {fit: "cover", gravity: "top"} will
   * crop bottom or left and right sides as necessary, but won’t crop anything
   * from the top. {fit: "cover", gravity: {x:0.5, y:0.2}} will crop each side to
   * preserve as much as possible around a point at 20% of the height of the
   * source image.
   */
  gravity?:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "center"
    | "auto"
    | "entropy"
    | BasicImageTransformationsGravityCoordinates;
  /**
   * Background color to add underneath the image. Applies only to images with
   * transparency (such as PNG). Accepts any CSS color (#RRGGBB, rgba(…),
   * hsl(…), etc.)
   */
  background?: string;
  /**
   * Number of degrees (90, 180, 270) to rotate the image by. width and height
   * options refer to axes after rotation.
   */
  rotate?: 0 | 90 | 180 | 270 | 360;
}
interface BasicImageTransformationsGravityCoordinates {
  x?: number;
  y?: number;
  mode?: "remainder" | "box-center";
}
/**
 * In addition to the properties you can set in the RequestInit dict
 * that you pass as an argument to the Request constructor, you can
 * set certain properties of a `cf` object to control how Cloudflare
 * features are applied to that new Request.
 *
 * Note: Currently, these properties cannot be tested in the
 * playground.
 */
interface RequestInitCfProperties extends Record<string, unknown> {
  cacheEverything?: boolean;
  /**
   * A request's cache key is what determines if two requests are
   * "the same" for caching purposes. If a request has the same cache key
   * as some previous request, then we can serve the same cached response for
   * both. (e.g. 'some-key')
   *
   * Only available for Enterprise customers.
   */
  cacheKey?: string;
  /**
   * This allows you to append additional Cache-Tag response headers
   * to the origin response without modifications to the origin server.
   * This will allow for greater control over the Purge by Cache Tag feature
   * utilizing changes only in the Workers process.
   *
   * Only available for Enterprise customers.
   */
  cacheTags?: string[];
  /**
   * Force response to be cached for a given number of seconds. (e.g. 300)
   */
  cacheTtl?: number;
  /**
   * Force response to be cached for a given number of seconds based on the Origin status code.
   * (e.g. { '200-299': 86400, '404': 1, '500-599': 0 })
   */
  cacheTtlByStatus?: Record<string, number>;
  scrapeShield?: boolean;
  apps?: boolean;
  image?: RequestInitCfPropertiesImage;
  minify?: RequestInitCfPropertiesImageMinify;
  mirage?: boolean;
  polish?: "lossy" | "lossless" | "off";
  r2?: RequestInitCfPropertiesR2;
  /**
   * Redirects the request to an alternate origin server. You can use this,
   * for example, to implement load balancing across several origins.
   * (e.g.us-east.example.com)
   *
   * Note - For security reasons, the hostname set in resolveOverride must
   * be proxied on the same Cloudflare zone of the incoming request.
   * Otherwise, the setting is ignored. CNAME hosts are allowed, so to
   * resolve to a host under a different domain or a DNS only domain first
   * declare a CNAME record within your own zone’s DNS mapping to the
   * external hostname, set proxy on Cloudflare, then set resolveOverride
   * to point to that CNAME record.
   */
  resolveOverride?: string;
}
interface RequestInitCfPropertiesImageDraw extends BasicImageTransformations {
  /**
   * Absolute URL of the image file to use for the drawing. It can be any of
   * the supported file formats. For drawing of watermarks or non-rectangular
   * overlays we recommend using PNG or WebP images.
   */
  url: string;
  /**
   * Floating-point number between 0 (transparent) and 1 (opaque).
   * For example, opacity: 0.5 makes overlay semitransparent.
   */
  opacity?: number;
  /**
   * - If set to true, the overlay image will be tiled to cover the entire
   *   area. This is useful for stock-photo-like watermarks.
   * - If set to "x", the overlay image will be tiled horizontally only
   *   (form a line).
   * - If set to "y", the overlay image will be tiled vertically only
   *   (form a line).
   */
  repeat?: true | "x" | "y";
  /**
   * Position of the overlay image relative to a given edge. Each property is
   * an offset in pixels. 0 aligns exactly to the edge. For example, left: 10
   * positions left side of the overlay 10 pixels from the left edge of the
   * image it's drawn over. bottom: 0 aligns bottom of the overlay with bottom
   * of the background image.
   *
   * Setting both left & right, or both top & bottom is an error.
   *
   * If no position is specified, the image will be centered.
   */
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}
interface RequestInitCfPropertiesImage extends BasicImageTransformations {
  /**
   * Device Pixel Ratio. Default 1. Multiplier for width/height that makes it
   * easier to specify higher-DPI sizes in <img srcset>.
   */
  dpr?: number;
  /**
   * Allows you to trim your image. Takes dpr into account and is performed before
   * resizing or rotation.
   *
   * It can be used as:
   * - left, top, right, bottom - it will specify the number of pixels to cut
   *   off each side
   * - width, height - the width/height you'd like to end up with - can be used
   *   in combination with the properties above
   * - border - this will automatically trim the surroundings of an image based on
   *   it's color. It consists of three properties:
   *    - color: rgb or hex representation of the color you wish to trim (todo: verify the rgba bit)
   *    - tolerance: difference from color to treat as color
   *    - keep: the number of pixels of border to keep
   */
  trim?:
    | "border"
    | {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
        width?: number;
        height?: number;
        border?:
          | boolean
          | {
              color?: string;
              tolerance?: number;
              keep?: number;
            };
      };
  /**
   * Quality setting from 1-100 (useful values are in 60-90 range). Lower values
   * make images look worse, but load faster. The default is 85. It applies only
   * to JPEG and WebP images. It doesn’t have any effect on PNG.
   */
  quality?: number | "low" | "medium-low" | "medium-high" | "high";
  /**
   * Output format to generate. It can be:
   *  - avif: generate images in AVIF format.
   *  - webp: generate images in Google WebP format. Set quality to 100 to get
   *    the WebP-lossless format.
   *  - json: instead of generating an image, outputs information about the
   *    image, in JSON format. The JSON object will contain image size
   *    (before and after resizing), source image’s MIME type, file size, etc.
   * - jpeg: generate images in JPEG format.
   * - png: generate images in PNG format.
   */
  format?:
    | "avif"
    | "webp"
    | "json"
    | "jpeg"
    | "png"
    | "baseline-jpeg"
    | "png-force"
    | "svg";
  /**
   * Whether to preserve animation frames from input files. Default is true.
   * Setting it to false reduces animations to still images. This setting is
   * recommended when enlarging images or processing arbitrary user content,
   * because large GIF animations can weigh tens or even hundreds of megabytes.
   * It is also useful to set anim:false when using format:"json" to get the
   * response quicker without the number of frames.
   */
  anim?: boolean;
  /**
   * What EXIF data should be preserved in the output image. Note that EXIF
   * rotation and embedded color profiles are always applied ("baked in" into
   * the image), and aren't affected by this option. Note that if the Polish
   * feature is enabled, all metadata may have been removed already and this
   * option may have no effect.
   *  - keep: Preserve most of EXIF metadata, including GPS location if there's
   *    any.
   *  - copyright: Only keep the copyright tag, and discard everything else.
   *    This is the default behavior for JPEG files.
   *  - none: Discard all invisible EXIF metadata. Currently WebP and PNG
   *    output formats always discard metadata.
   */
  metadata?: "keep" | "copyright" | "none";
  /**
   * Strength of sharpening filter to apply to the image. Floating-point
   * number between 0 (no sharpening, default) and 10 (maximum). 1.0 is a
   * recommended value for downscaled images.
   */
  sharpen?: number;
  /**
   * Radius of a blur filter (approximate gaussian). Maximum supported radius
   * is 250.
   */
  blur?: number;
  /**
   * Overlays are drawn in the order they appear in the array (last array
   * entry is the topmost layer).
   */
  draw?: RequestInitCfPropertiesImageDraw[];
  /**
   * Fetching image from authenticated origin. Setting this property will
   * pass authentication headers (Authorization, Cookie, etc.) through to
   * the origin.
   */
  "origin-auth"?: "share-publicly";
  /**
   * Adds a border around the image. The border is added after resizing. Border
   * width takes dpr into account, and can be specified either using a single
   * width property, or individually for each side.
   */
  border?:
    | {
        color: string;
        width: number;
      }
    | {
        color: string;
        top: number;
        right: number;
        bottom: number;
        left: number;
      };
  /**
   * Increase brightness by a factor. A value of 1.0 equals no change, a value
   * of 0.5 equals half brightness, and a value of 2.0 equals twice as bright.
   * 0 is ignored.
   */
  brightness?: number;
  /**
   * Increase contrast by a factor. A value of 1.0 equals no change, a value of
   * 0.5 equals low contrast, and a value of 2.0 equals high contrast. 0 is
   * ignored.
   */
  contrast?: number;
  /**
   * Increase exposure by a factor. A value of 1.0 equals no change, a value of
   * 0.5 darkens the image, and a value of 2.0 lightens the image. 0 is ignored.
   */
  gamma?: number;
  /**
   * Increase contrast by a factor. A value of 1.0 equals no change, a value of
   * 0.5 equals low contrast, and a value of 2.0 equals high contrast. 0 is
   * ignored.
   */
  saturation?: number;
  /**
   * Flips the images horizontally, vertically, or both. Flipping is applied before
   * rotation, so if you apply flip=h,rotate=90 then the image will be flipped
   * horizontally, then rotated by 90 degrees.
   */
  flip?: "h" | "v" | "hv";
  /**
   * Slightly reduces latency on a cache miss by selecting a
   * quickest-to-compress file format, at a cost of increased file size and
   * lower image quality. It will usually override the format option and choose
   * JPEG over WebP or AVIF. We do not recommend using this option, except in
   * unusual circumstances like resizing uncacheable dynamically-generated
   * images.
   */
  compression?: "fast";
}
interface RequestInitCfPropertiesImageMinify {
  javascript?: boolean;
  css?: boolean;
  html?: boolean;
}
interface RequestInitCfPropertiesR2 {
  /**
   * Colo id of bucket that an object is stored in
   */
  bucketColoId?: number;
}
/**
 * Request metadata provided by Cloudflare's edge.
 */
type IncomingRequestCfProperties<HostMetadata = unknown> =
  IncomingRequestCfPropertiesBase &
    IncomingRequestCfPropertiesBotManagementEnterprise &
    IncomingRequestCfPropertiesCloudflareForSaaSEnterprise<HostMetadata> &
    IncomingRequestCfPropertiesGeographicInformation &
    IncomingRequestCfPropertiesCloudflareAccessOrApiShield;
interface IncomingRequestCfPropertiesBase extends Record<string, unknown> {
  /**
   * [ASN](https://www.iana.org/assignments/as-numbers/as-numbers.xhtml) of the incoming request.
   *
   * @example 395747
   */
  asn: number;
  /**
   * The organization which owns the ASN of the incoming request.
   *
   * @example "Google Cloud"
   */
  asOrganization: string;
  /**
   * The original value of the `Accept-Encoding` header if Cloudflare modified it.
   *
   * @example "gzip, deflate, br"
   */
  clientAcceptEncoding?: string;
  /**
   * The number of milliseconds it took for the request to reach your worker.
   *
   * @example 22
   */
  clientTcpRtt?: number;
  /**
   * The three-letter [IATA](https://en.wikipedia.org/wiki/IATA_airport_code)
   * airport code of the data center that the request hit.
   *
   * @example "DFW"
   */
  colo: string;
  /**
   * Represents the upstream's response to a
   * [TCP `keepalive` message](https://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html)
   * from cloudflare.
   *
   * For workers with no upstream, this will always be `1`.
   *
   * @example 3
   */
  edgeRequestKeepAliveStatus: IncomingRequestCfPropertiesEdgeRequestKeepAliveStatus;
  /**
   * The HTTP Protocol the request used.
   *
   * @example "HTTP/2"
   */
  httpProtocol: string;
  /**
   * The browser-requested prioritization information in the request object.
   *
   * If no information was set, defaults to the empty string `""`
   *
   * @example "weight=192;exclusive=0;group=3;group-weight=127"
   * @default ""
   */
  requestPriority: string;
  /**
   * The TLS version of the connection to Cloudflare.
   * In requests served over plaintext (without TLS), this property is the empty string `""`.
   *
   * @example "TLSv1.3"
   */
  tlsVersion: string;
  /**
   * The cipher for the connection to Cloudflare.
   * In requests served over plaintext (without TLS), this property is the empty string `""`.
   *
   * @example "AEAD-AES128-GCM-SHA256"
   */
  tlsCipher: string;
  /**
   * Metadata containing the [`HELLO`](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.1.2) and [`FINISHED`](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.9) messages from this request's TLS handshake.
   *
   * If the incoming request was served over plaintext (without TLS) this field is undefined.
   */
  tlsExportedAuthenticator?: IncomingRequestCfPropertiesExportedAuthenticatorMetadata;
}
interface IncomingRequestCfPropertiesBotManagementBase {
  /**
   * Cloudflare’s [level of certainty](https://developers.cloudflare.com/bots/concepts/bot-score/) that a request comes from a bot,
   * represented as an integer percentage between `1` (almost certainly a bot) and `99` (almost certainly human).
   *
   * @example 54
   */
  score: number;
  /**
   * A boolean value that is true if the request comes from a good bot, like Google or Bing.
   * Most customers choose to allow this traffic. For more details, see [Traffic from known bots](https://developers.cloudflare.com/firewall/known-issues-and-faq/#how-does-firewall-rules-handle-traffic-from-known-bots).
   */
  verifiedBot: boolean;
  /**
   * A boolean value that is true if the request originates from a
   * Cloudflare-verified proxy service.
   */
  corporateProxy: boolean;
  /**
   * A boolean value that's true if the request matches [file extensions](https://developers.cloudflare.com/bots/reference/static-resources/) for many types of static resources.
   */
  staticResource: boolean;
  /**
   * List of IDs that correlate to the Bot Management heuristic detections made on a request (you can have multiple heuristic detections on the same request).
   */
  detectionIds: number[];
}
interface IncomingRequestCfPropertiesBotManagement {
  /**
   * Results of Cloudflare's Bot Management analysis
   */
  botManagement: IncomingRequestCfPropertiesBotManagementBase;
  /**
   * Duplicate of `botManagement.score`.
   *
   * @deprecated
   */
  clientTrustScore: number;
}
interface IncomingRequestCfPropertiesBotManagementEnterprise
  extends IncomingRequestCfPropertiesBotManagement {
  /**
   * Results of Cloudflare's Bot Management analysis
   */
  botManagement: IncomingRequestCfPropertiesBotManagementBase & {
    /**
     * A [JA3 Fingerprint](https://developers.cloudflare.com/bots/concepts/ja3-fingerprint/) to help profile specific SSL/TLS clients
     * across different destination IPs, Ports, and X509 certificates.
     */
    ja3Hash: string;
  };
}
interface IncomingRequestCfPropertiesCloudflareForSaaSEnterprise<HostMetadata> {
  /**
   * Custom metadata set per-host in [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/).
   *
   * This field is only present if you have Cloudflare for SaaS enabled on your account
   * and you have followed the [required steps to enable it]((https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/)).
   */
  hostMetadata: HostMetadata;
}
interface IncomingRequestCfPropertiesCloudflareAccessOrApiShield {
  /**
   * Information about the client certificate presented to Cloudflare.
   *
   * This is populated when the incoming request is served over TLS using
   * either Cloudflare Access or API Shield (mTLS)
   * and the presented SSL certificate has a valid
   * [Certificate Serial Number](https://ldapwiki.com/wiki/Certificate%20Serial%20Number)
   * (i.e., not `null` or `""`).
   *
   * Otherwise, a set of placeholder values are used.
   *
   * The property `certPresented` will be set to `"1"` when
   * the object is populated (i.e. the above conditions were met).
   */
  tlsClientAuth:
    | IncomingRequestCfPropertiesTLSClientAuth
    | IncomingRequestCfPropertiesTLSClientAuthPlaceholder;
}
/**
 * Metadata about the request's TLS handshake
 */
interface IncomingRequestCfPropertiesExportedAuthenticatorMetadata {
  /**
   * The client's [`HELLO` message](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.1.2), encoded in hexadecimal
   *
   * @example "44372ba35fa1270921d318f34c12f155dc87b682cf36a790cfaa3ba8737a1b5d"
   */
  clientHandshake: string;
  /**
   * The server's [`HELLO` message](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.1.2), encoded in hexadecimal
   *
   * @example "44372ba35fa1270921d318f34c12f155dc87b682cf36a790cfaa3ba8737a1b5d"
   */
  serverHandshake: string;
  /**
   * The client's [`FINISHED` message](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.9), encoded in hexadecimal
   *
   * @example "084ee802fe1348f688220e2a6040a05b2199a761f33cf753abb1b006792d3f8b"
   */
  clientFinished: string;
  /**
   * The server's [`FINISHED` message](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.9), encoded in hexadecimal
   *
   * @example "084ee802fe1348f688220e2a6040a05b2199a761f33cf753abb1b006792d3f8b"
   */
  serverFinished: string;
}
/**
 * Geographic data about the request's origin.
 */
interface IncomingRequestCfPropertiesGeographicInformation {
  /**
   * The [ISO 3166-1 Alpha 2](https://www.iso.org/iso-3166-country-codes.html) country code the request originated from.
   *
   * If your worker is [configured to accept TOR connections](https://support.cloudflare.com/hc/en-us/articles/203306930-Understanding-Cloudflare-Tor-support-and-Onion-Routing), this may also be `"T1"`, indicating a request that originated over TOR.
   *
   * If Cloudflare is unable to determine where the request originated this property is omitted.
   *
   * The country code `"T1"` is used for requests originating on TOR.
   *
   * @example "GB"
   */
  country?: Iso3166Alpha2Code | "T1";
  /**
   * If present, this property indicates that the request originated in the EU
   *
   * @example "1"
   */
  isEUCountry?: "1";
  /**
   * A two-letter code indicating the continent the request originated from.
   *
   * @example "AN"
   */
  continent?: ContinentCode;
  /**
   * The city the request originated from
   *
   * @example "Austin"
   */
  city?: string;
  /**
   * Postal code of the incoming request
   *
   * @example "78701"
   */
  postalCode?: string;
  /**
   * Latitude of the incoming request
   *
   * @example "30.27130"
   */
  latitude?: string;
  /**
   * Longitude of the incoming request
   *
   * @example "-97.74260"
   */
  longitude?: string;
  /**
   * Timezone of the incoming request
   *
   * @example "America/Chicago"
   */
  timezone?: string;
  /**
   * If known, the ISO 3166-2 name for the first level region associated with
   * the IP address of the incoming request
   *
   * @example "Texas"
   */
  region?: string;
  /**
   * If known, the ISO 3166-2 code for the first-level region associated with
   * the IP address of the incoming request
   *
   * @example "TX"
   */
  regionCode?: string;
  /**
   * Metro code (DMA) of the incoming request
   *
   * @example "635"
   */
  metroCode?: string;
}
/** Data about the incoming request's TLS certificate */
interface IncomingRequestCfPropertiesTLSClientAuth {
  /** Always `"1"`, indicating that the certificate was presented */
  certPresented: "1";
  /**
   * Result of certificate verification.
   *
   * @example "FAILED:self signed certificate"
   */
  certVerified: Exclude<CertVerificationStatus, "NONE">;
  /** The presented certificate's revokation status.
   *
   * - A value of `"1"` indicates the certificate has been revoked
   * - A value of `"0"` indicates the certificate has not been revoked
   */
  certRevoked: "1" | "0";
  /**
   * The certificate issuer's [distinguished name](https://knowledge.digicert.com/generalinformation/INFO1745.html)
   *
   * @example "CN=cloudflareaccess.com, C=US, ST=Texas, L=Austin, O=Cloudflare"
   */
  certIssuerDN: string;
  /**
   * The certificate subject's [distinguished name](https://knowledge.digicert.com/generalinformation/INFO1745.html)
   *
   * @example "CN=*.cloudflareaccess.com, C=US, ST=Texas, L=Austin, O=Cloudflare"
   */
  certSubjectDN: string;
  /**
   * The certificate issuer's [distinguished name](https://knowledge.digicert.com/generalinformation/INFO1745.html) ([RFC 2253](https://www.rfc-editor.org/rfc/rfc2253.html) formatted)
   *
   * @example "CN=cloudflareaccess.com, C=US, ST=Texas, L=Austin, O=Cloudflare"
   */
  certIssuerDNRFC2253: string;
  /**
   * The certificate subject's [distinguished name](https://knowledge.digicert.com/generalinformation/INFO1745.html) ([RFC 2253](https://www.rfc-editor.org/rfc/rfc2253.html) formatted)
   *
   * @example "CN=*.cloudflareaccess.com, C=US, ST=Texas, L=Austin, O=Cloudflare"
   */
  certSubjectDNRFC2253: string;
  /** The certificate issuer's distinguished name (legacy policies) */
  certIssuerDNLegacy: string;
  /** The certificate subject's distinguished name (legacy policies) */
  certSubjectDNLegacy: string;
  /**
   * The certificate's serial number
   *
   * @example "00936EACBE07F201DF"
   */
  certSerial: string;
  /**
   * The certificate issuer's serial number
   *
   * @example "2489002934BDFEA34"
   */
  certIssuerSerial: string;
  /**
   * The certificate's Subject Key Identifier
   *
   * @example "BB:AF:7E:02:3D:FA:A6:F1:3C:84:8E:AD:EE:38:98:EC:D9:32:32:D4"
   */
  certSKI: string;
  /**
   * The certificate issuer's Subject Key Identifier
   *
   * @example "BB:AF:7E:02:3D:FA:A6:F1:3C:84:8E:AD:EE:38:98:EC:D9:32:32:D4"
   */
  certIssuerSKI: string;
  /**
   * The certificate's SHA-1 fingerprint
   *
   * @example "6b9109f323999e52259cda7373ff0b4d26bd232e"
   */
  certFingerprintSHA1: string;
  /**
   * The certificate's SHA-256 fingerprint
   *
   * @example "acf77cf37b4156a2708e34c4eb755f9b5dbbe5ebb55adfec8f11493438d19e6ad3f157f81fa3b98278453d5652b0c1fd1d71e5695ae4d709803a4d3f39de9dea"
   */
  certFingerprintSHA256: string;
  /**
   * The effective starting date of the certificate
   *
   * @example "Dec 22 19:39:00 2018 GMT"
   */
  certNotBefore: string;
  /**
   * The effective expiration date of the certificate
   *
   * @example "Dec 22 19:39:00 2018 GMT"
   */
  certNotAfter: string;
}
/** Placeholder values for TLS Client Authorization */
interface IncomingRequestCfPropertiesTLSClientAuthPlaceholder {
  certPresented: "0";
  certVerified: "NONE";
  certRevoked: "0";
  certIssuerDN: "";
  certSubjectDN: "";
  certIssuerDNRFC2253: "";
  certSubjectDNRFC2253: "";
  certIssuerDNLegacy: "";
  certSubjectDNLegacy: "";
  certSerial: "";
  certIssuerSerial: "";
  certSKI: "";
  certIssuerSKI: "";
  certFingerprintSHA1: "";
  certFingerprintSHA256: "";
  certNotBefore: "";
  certNotAfter: "";
}
/** Possible outcomes of TLS verification */
declare type CertVerificationStatus =
  /** Authentication succeeded */
  | "SUCCESS"
  /** No certificate was presented */
  | "NONE"
  /** Failed because the certificate was self-signed */
  | "FAILED:self signed certificate"
  /** Failed because the certificate failed a trust chain check */
  | "FAILED:unable to verify the first certificate"
  /** Failed because the certificate not yet valid */
  | "FAILED:certificate is not yet valid"
  /** Failed because the certificate is expired */
  | "FAILED:certificate has expired"
  /** Failed for another unspecified reason */
  | "FAILED";
/**
 * An upstream endpoint's response to a TCP `keepalive` message from Cloudflare.
 */
declare type IncomingRequestCfPropertiesEdgeRequestKeepAliveStatus =
  | 0 /** Unknown */
  | 1 /** no keepalives (not found) */
  | 2 /** no connection re-use, opening keepalive connection failed */
  | 3 /** no connection re-use, keepalive accepted and saved */
  | 4 /** connection re-use, refused by the origin server (`TCP FIN`) */
  | 5; /** connection re-use, accepted by the origin server */
/** ISO 3166-1 Alpha-2 codes */
declare type Iso3166Alpha2Code =
  | "AD"
  | "AE"
  | "AF"
  | "AG"
  | "AI"
  | "AL"
  | "AM"
  | "AO"
  | "AQ"
  | "AR"
  | "AS"
  | "AT"
  | "AU"
  | "AW"
  | "AX"
  | "AZ"
  | "BA"
  | "BB"
  | "BD"
  | "BE"
  | "BF"
  | "BG"
  | "BH"
  | "BI"
  | "BJ"
  | "BL"
  | "BM"
  | "BN"
  | "BO"
  | "BQ"
  | "BR"
  | "BS"
  | "BT"
  | "BV"
  | "BW"
  | "BY"
  | "BZ"
  | "CA"
  | "CC"
  | "CD"
  | "CF"
  | "CG"
  | "CH"
  | "CI"
  | "CK"
  | "CL"
  | "CM"
  | "CN"
  | "CO"
  | "CR"
  | "CU"
  | "CV"
  | "CW"
  | "CX"
  | "CY"
  | "CZ"
  | "DE"
  | "DJ"
  | "DK"
  | "DM"
  | "DO"
  | "DZ"
  | "EC"
  | "EE"
  | "EG"
  | "EH"
  | "ER"
  | "ES"
  | "ET"
  | "FI"
  | "FJ"
  | "FK"
  | "FM"
  | "FO"
  | "FR"
  | "GA"
  | "GB"
  | "GD"
  | "GE"
  | "GF"
  | "GG"
  | "GH"
  | "GI"
  | "GL"
  | "GM"
  | "GN"
  | "GP"
  | "GQ"
  | "GR"
  | "GS"
  | "GT"
  | "GU"
  | "GW"
  | "GY"
  | "HK"
  | "HM"
  | "HN"
  | "HR"
  | "HT"
  | "HU"
  | "ID"
  | "IE"
  | "IL"
  | "IM"
  | "IN"
  | "IO"
  | "IQ"
  | "IR"
  | "IS"
  | "IT"
  | "JE"
  | "JM"
  | "JO"
  | "JP"
  | "KE"
  | "KG"
  | "KH"
  | "KI"
  | "KM"
  | "KN"
  | "KP"
  | "KR"
  | "KW"
  | "KY"
  | "KZ"
  | "LA"
  | "LB"
  | "LC"
  | "LI"
  | "LK"
  | "LR"
  | "LS"
  | "LT"
  | "LU"
  | "LV"
  | "LY"
  | "MA"
  | "MC"
  | "MD"
  | "ME"
  | "MF"
  | "MG"
  | "MH"
  | "MK"
  | "ML"
  | "MM"
  | "MN"
  | "MO"
  | "MP"
  | "MQ"
  | "MR"
  | "MS"
  | "MT"
  | "MU"
  | "MV"
  | "MW"
  | "MX"
  | "MY"
  | "MZ"
  | "NA"
  | "NC"
  | "NE"
  | "NF"
  | "NG"
  | "NI"
  | "NL"
  | "NO"
  | "NP"
  | "NR"
  | "NU"
  | "NZ"
  | "OM"
  | "PA"
  | "PE"
  | "PF"
  | "PG"
  | "PH"
  | "PK"
  | "PL"
  | "PM"
  | "PN"
  | "PR"
  | "PS"
  | "PT"
  | "PW"
  | "PY"
  | "QA"
  | "RE"
  | "RO"
  | "RS"
  | "RU"
  | "RW"
  | "SA"
  | "SB"
  | "SC"
  | "SD"
  | "SE"
  | "SG"
  | "SH"
  | "SI"
  | "SJ"
  | "SK"
  | "SL"
  | "SM"
  | "SN"
  | "SO"
  | "SR"
  | "SS"
  | "ST"
  | "SV"
  | "SX"
  | "SY"
  | "SZ"
  | "TC"
  | "TD"
  | "TF"
  | "TG"
  | "TH"
  | "TJ"
  | "TK"
  | "TL"
  | "TM"
  | "TN"
  | "TO"
  | "TR"
  | "TT"
  | "TV"
  | "TW"
  | "TZ"
  | "UA"
  | "UG"
  | "UM"
  | "US"
  | "UY"
  | "UZ"
  | "VA"
  | "VC"
  | "VE"
  | "VG"
  | "VI"
  | "VN"
  | "VU"
  | "WF"
  | "WS"
  | "YE"
  | "YT"
  | "ZA"
  | "ZM"
  | "ZW";
/** The 2-letter continent codes Cloudflare uses */
declare type ContinentCode = "AF" | "AN" | "AS" | "EU" | "NA" | "OC" | "SA";
type CfProperties<HostMetadata = unknown> =
  | IncomingRequestCfProperties<HostMetadata>
  | RequestInitCfProperties;
interface D1Meta {
  duration: number;
  size_after: number;
  rows_read: number;
  rows_written: number;
  last_row_id: number;
  changed_db: boolean;
  changes: number;
  /**
   * The region of the database instance that executed the query.
   */
  served_by_region?: string;
  /**
   * True if-and-only-if the database instance that executed the query was the primary.
   */
  served_by_primary?: boolean;
  timings?: {
    /**
     * The duration of the SQL query execution by the database instance. It doesn't include any network time.
     */
    sql_duration_ms: number;
  };
}
interface D1Response {
  success: true;
  meta: D1Meta & Record<string, unknown>;
  error?: never;
}
type D1Result<T = unknown> = D1Response & {
  results: T[];
};
interface D1ExecResult {
  count: number;
  duration: number;
}
type D1SessionConstraint =
  // Indicates that the first query should go to the primary, and the rest queries
  // using the same D1DatabaseSession will go to any replica that is consistent with
  // the bookmark maintained by the session (returned by the first query).
  | "first-primary"
  // Indicates that the first query can go anywhere (primary or replica), and the rest queries
  // using the same D1DatabaseSession will go to any replica that is consistent with
  // the bookmark maintained by the session (returned by the first query).
  | "first-unconstrained";
type D1SessionBookmark = string;
declare abstract class D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
  /**
   * Creates a new D1 Session anchored at the given constraint or the bookmark.
   * All queries executed using the created session will have sequential consistency,
   * meaning that all writes done through the session will be visible in subsequent reads.
   *
   * @param constraintOrBookmark Either the session constraint or the explicit bookmark to anchor the created session.
   */
  withSession(
    constraintOrBookmark?: D1SessionBookmark | D1SessionConstraint,
  ): D1DatabaseSession;
  /**
   * @deprecated dump() will be removed soon, only applies to deprecated alpha v1 databases.
   */
  dump(): Promise<ArrayBuffer>;
}
declare abstract class D1DatabaseSession {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  /**
   * @returns The latest session bookmark across all executed queries on the session.
   *          If no query has been executed yet, `null` is returned.
   */
  getBookmark(): D1SessionBookmark | null;
}
declare abstract class D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName: string): Promise<T | null>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  raw<T = unknown[]>(options: {
    columnNames: true;
  }): Promise<[string[], ...T[]]>;
  raw<T = unknown[]>(options?: { columnNames?: false }): Promise<T[]>;
}
// `Disposable` was added to TypeScript's standard lib types in version 5.2.
// To support older TypeScript versions, define an empty `Disposable` interface.
// Users won't be able to use `using`/`Symbol.dispose` without upgrading to 5.2,
// but this will ensure type checking on older versions still passes.
// TypeScript's interface merging will ensure our empty interface is effectively
// ignored when `Disposable` is included in the standard lib.
interface Disposable {}
/**
 * An email message that can be sent from a Worker.
 */
interface EmailMessage {
  /**
   * Envelope From attribute of the email message.
   */
  readonly from: string;
  /**
   * Envelope To attribute of the email message.
   */
  readonly to: string;
}
/**
 * An email message that is sent to a consumer Worker and can be rejected/forwarded.
 */
interface ForwardableEmailMessage extends EmailMessage {
  /**
   * Stream of the email message content.
   */
  readonly raw: ReadableStream<Uint8Array>;
  /**
   * An [Headers object](https://developer.mozilla.org/en-US/docs/Web/API/Headers).
   */
  readonly headers: Headers;
  /**
   * Size of the email message content.
   */
  readonly rawSize: number;
  /**
   * Reject this email message by returning a permanent SMTP error back to the connecting client including the given reason.
   * @param reason The reject reason.
   * @returns void
   */
  setReject(reason: string): void;
  /**
   * Forward this email message to a verified destination address of the account.
   * @param rcptTo Verified destination address.
   * @param headers A [Headers object](https://developer.mozilla.org/en-US/docs/Web/API/Headers).
   * @returns A promise that resolves when the email message is forwarded.
   */
  forward(rcptTo: string, headers?: Headers): Promise<void>;
  /**
   * Reply to the sender of this email message with a new EmailMessage object.
   * @param message The reply message.
   * @returns A promise that resolves when the email message is replied.
   */
  reply(message: EmailMessage): Promise<void>;
}
/**
 * A binding that allows a Worker to send email messages.
 */
interface SendEmail {
  send(message: EmailMessage): Promise<void>;
}
declare abstract class EmailEvent extends ExtendableEvent {
  readonly message: ForwardableEmailMessage;
}
declare type EmailExportedHandler<Env = unknown> = (
  message: ForwardableEmailMessage,
  env: Env,
  ctx: ExecutionContext,
) => void | Promise<void>;
declare module "cloudflare:email" {
  let _EmailMessage: {
    prototype: EmailMessage;
    new (from: string, to: string, raw: ReadableStream | string): EmailMessage;
  };
  export { _EmailMessage as EmailMessage };
}
interface Hyperdrive {
  /**
   * Connect directly to Hyperdrive as if it's your database, returning a TCP socket.
   *
   * Calling this method returns an idential socket to if you call
   * `connect("host:port")` using the `host` and `port` fields from this object.
   * Pick whichever approach works better with your preferred DB client library.
   *
   * Note that this socket is not yet authenticated -- it's expected that your
   * code (or preferably, the client library of your choice) will authenticate
   * using the information in this class's readonly fields.
   */
  connect(): Socket;
  /**
   * A valid DB connection string that can be passed straight into the typical
   * client library/driver/ORM. This will typically be the easiest way to use
   * Hyperdrive.
   */
  readonly connectionString: string;
  /*
   * A randomly generated hostname that is only valid within the context of the
   * currently running Worker which, when passed into `connect()` function from
   * the "cloudflare:sockets" module, will connect to the Hyperdrive instance
   * for your database.
   */
  readonly host: string;
  /*
   * The port that must be paired the the host field when connecting.
   */
  readonly port: number;
  /*
   * The username to use when authenticating to your database via Hyperdrive.
   * Unlike the host and password, this will be the same every time
   */
  readonly user: string;
  /*
   * The randomly generated password to use when authenticating to your
   * database via Hyperdrive. Like the host field, this password is only valid
   * within the context of the currently running Worker instance from which
   * it's read.
   */
  readonly password: string;
  /*
   * The name of the database to connect to.
   */
  readonly database: string;
}
// Copyright (c) 2024 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0
type ImageInfoResponse =
  | {
      format: "image/svg+xml";
    }
  | {
      format: string;
      fileSize: number;
      width: number;
      height: number;
    };
type ImageTransform = {
  width?: number;
  height?: number;
  background?: string;
  blur?: number;
  border?:
    | {
        color?: string;
        width?: number;
      }
    | {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
      };
  brightness?: number;
  contrast?: number;
  fit?: "scale-down" | "contain" | "pad" | "squeeze" | "cover" | "crop";
  flip?: "h" | "v" | "hv";
  gamma?: number;
  gravity?:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "center"
    | "auto"
    | "entropy"
    | {
        x?: number;
        y?: number;
        mode: "remainder" | "box-center";
      };
  rotate?: 0 | 90 | 180 | 270;
  saturation?: number;
  sharpen?: number;
  trim?:
    | "border"
    | {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
        width?: number;
        height?: number;
        border?:
          | boolean
          | {
              color?: string;
              tolerance?: number;
              keep?: number;
            };
      };
};
type ImageDrawOptions = {
  opacity?: number;
  repeat?: boolean | string;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};
type ImageOutputOptions = {
  format:
    | "image/jpeg"
    | "image/png"
    | "image/gif"
    | "image/webp"
    | "image/avif"
    | "rgb"
    | "rgba";
  quality?: number;
  background?: string;
};
interface ImagesBinding {
  /**
   * Get image metadata (type, width and height)
   * @throws {@link ImagesError} with code 9412 if input is not an image
   * @param stream The image bytes
   */
  info(stream: ReadableStream<Uint8Array>): Promise<ImageInfoResponse>;
  /**
   * Begin applying a series of transformations to an image
   * @param stream The image bytes
   * @returns A transform handle
   */
  input(stream: ReadableStream<Uint8Array>): ImageTransformer;
}
interface ImageTransformer {
  /**
   * Apply transform next, returning a transform handle.
   * You can then apply more transformations, draw, or retrieve the output.
   * @param transform
   */
  transform(transform: ImageTransform): ImageTransformer;
  /**
   * Draw an image on this transformer, returning a transform handle.
   * You can then apply more transformations, draw, or retrieve the output.
   * @param image The image (or transformer that will give the image) to draw
   * @param options The options configuring how to draw the image
   */
  draw(
    image: ReadableStream<Uint8Array> | ImageTransformer,
    options?: ImageDrawOptions,
  ): ImageTransformer;
  /**
   * Retrieve the image that results from applying the transforms to the
   * provided input
   * @param options Options that apply to the output e.g. output format
   */
  output(options: ImageOutputOptions): Promise<ImageTransformationResult>;
}
interface ImageTransformationResult {
  /**
   * The image as a response, ready to store in cache or return to users
   */
  response(): Response;
  /**
   * The content type of the returned image
   */
  contentType(): string;
  /**
   * The bytes of the response
   */
  image(): ReadableStream<Uint8Array>;
}
interface ImagesError extends Error {
  readonly code: number;
  readonly message: string;
  readonly stack?: string;
}
type Params<P extends string = any> = Record<P, string | string[]>;
type EventContext<Env, P extends string, Data> = {
  request: Request<unknown, IncomingRequestCfProperties<unknown>>;
  functionPath: string;
  waitUntil: (promise: Promise<any>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Env & {
    ASSETS: {
      fetch: typeof fetch;
    };
  };
  params: Params<P>;
  data: Data;
};
type PagesFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>,
> = (context: EventContext<Env, Params, Data>) => Response | Promise<Response>;
type EventPluginContext<Env, P extends string, Data, PluginArgs> = {
  request: Request<unknown, IncomingRequestCfProperties<unknown>>;
  functionPath: string;
  waitUntil: (promise: Promise<any>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Env & {
    ASSETS: {
      fetch: typeof fetch;
    };
  };
  params: Params<P>;
  data: Data;
  pluginArgs: PluginArgs;
};
type PagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>,
  PluginArgs = unknown,
> = (
  context: EventPluginContext<Env, Params, Data, PluginArgs>,
) => Response | Promise<Response>;
declare module "assets:*" {
  export const onRequest: PagesFunction;
}
// Copyright (c) 2022-2023 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0
declare module "cloudflare:pipelines" {
  export abstract class PipelineTransformationEntrypoint<
    Env = unknown,
    I extends PipelineRecord = PipelineRecord,
    O extends PipelineRecord = PipelineRecord,
  > {
    protected env: Env;
    protected ctx: ExecutionContext;
    constructor(ctx: ExecutionContext, env: Env);
    /**
     * run recieves an array of PipelineRecord which can be
     * transformed and returned to the pipeline
     * @param records Incoming records from the pipeline to be transformed
     * @param metadata Information about the specific pipeline calling the transformation entrypoint
     * @returns A promise containing the transformed PipelineRecord array
     */
    public run(records: I[], metadata: PipelineBatchMetadata): Promise<O[]>;
  }
  export type PipelineRecord = Record<string, unknown>;
  export type PipelineBatchMetadata = {
    pipelineId: string;
    pipelineName: string;
  };
  export interface Pipeline<T extends PipelineRecord = PipelineRecord> {
    /**
     * The Pipeline interface represents the type of a binding to a Pipeline
     *
     * @param records The records to send to the pipeline
     */
    send(records: T[]): Promise<void>;
  }
}
// PubSubMessage represents an incoming PubSub message.
// The message includes metadata about the broker, the client, and the payload
// itself.
// https://developers.cloudflare.com/pub-sub/
interface PubSubMessage {
  // Message ID
  readonly mid: number;
  // MQTT broker FQDN in the form mqtts://BROKER.NAMESPACE.cloudflarepubsub.com:PORT
  readonly broker: string;
  // The MQTT topic the message was sent on.
  readonly topic: string;
  // The client ID of the client that published this message.
  readonly clientId: string;
  // The unique identifier (JWT ID) used by the client to authenticate, if token
  // auth was used.
  readonly jti?: string;
  // A Unix timestamp (seconds from Jan 1, 1970), set when the Pub/Sub Broker
  // received the message from the client.
  readonly receivedAt: number;
  // An (optional) string with the MIME type of the payload, if set by the
  // client.
  readonly contentType: string;
  // Set to 1 when the payload is a UTF-8 string
  // https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html#_Toc3901063
  readonly payloadFormatIndicator: number;
  // Pub/Sub (MQTT) payloads can be UTF-8 strings, or byte arrays.
  // You can use payloadFormatIndicator to inspect this before decoding.
  payload: string | Uint8Array;
}
// JsonWebKey extended by kid parameter
interface JsonWebKeyWithKid extends JsonWebKey {
  // Key Identifier of the JWK
  readonly kid: string;
}
interface RateLimitOptions {
  key: string;
}
interface RateLimitOutcome {
  success: boolean;
}
interface RateLimit {
  /**
   * Rate limit a request based on the provided options.
   * @see https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
   * @returns A promise that resolves with the outcome of the rate limit.
   */
  limit(options: RateLimitOptions): Promise<RateLimitOutcome>;
}
// Namespace for RPC utility types. Unfortunately, we can't use a `module` here as these types need
// to referenced by `Fetcher`. This is included in the "importable" version of the types which
// strips all `module` blocks.
declare namespace Rpc {
  // Branded types for identifying `WorkerEntrypoint`/`DurableObject`/`Target`s.
  // TypeScript uses *structural* typing meaning anything with the same shape as type `T` is a `T`.
  // For the classes exported by `cloudflare:workers` we want *nominal* typing (i.e. we only want to
  // accept `WorkerEntrypoint` from `cloudflare:workers`, not any other class with the same shape)
  export const __RPC_STUB_BRAND: "__RPC_STUB_BRAND";
  export const __RPC_TARGET_BRAND: "__RPC_TARGET_BRAND";
  export const __WORKER_ENTRYPOINT_BRAND: "__WORKER_ENTRYPOINT_BRAND";
  export const __DURABLE_OBJECT_BRAND: "__DURABLE_OBJECT_BRAND";
  export const __WORKFLOW_ENTRYPOINT_BRAND: "__WORKFLOW_ENTRYPOINT_BRAND";
  export interface RpcTargetBranded {
    [__RPC_TARGET_BRAND]: never;
  }
  export interface WorkerEntrypointBranded {
    [__WORKER_ENTRYPOINT_BRAND]: never;
  }
  export interface DurableObjectBranded {
    [__DURABLE_OBJECT_BRAND]: never;
  }
  export interface WorkflowEntrypointBranded {
    [__WORKFLOW_ENTRYPOINT_BRAND]: never;
  }
  export type EntrypointBranded =
    | WorkerEntrypointBranded
    | DurableObjectBranded
    | WorkflowEntrypointBranded;
  // Types that can be used through `Stub`s
  export type Stubable = RpcTargetBranded | ((...args: any[]) => any);
  // Types that can be passed over RPC
  // The reason for using a generic type here is to build a serializable subset of structured
  //   cloneable composite types. This allows types defined with the "interface" keyword to pass the
  //   serializable check as well. Otherwise, only types defined with the "type" keyword would pass.
  type Serializable<T> =
    // Structured cloneables
    | BaseType
    // Structured cloneable composites
    | Map<
        T extends Map<infer U, unknown> ? Serializable<U> : never,
        T extends Map<unknown, infer U> ? Serializable<U> : never
      >
    | Set<T extends Set<infer U> ? Serializable<U> : never>
    | ReadonlyArray<T extends ReadonlyArray<infer U> ? Serializable<U> : never>
    | {
        [K in keyof T]: K extends number | string ? Serializable<T[K]> : never;
      }
    // Special types
    | Stub<Stubable>
    // Serialized as stubs, see `Stubify`
    | Stubable;
  // Base type for all RPC stubs, including common memory management methods.
  // `T` is used as a marker type for unwrapping `Stub`s later.
  interface StubBase<T extends Stubable> extends Disposable {
    [__RPC_STUB_BRAND]: T;
    dup(): this;
  }
  export type Stub<T extends Stubable> = Provider<T> & StubBase<T>;
  // This represents all the types that can be sent as-is over an RPC boundary
  type BaseType =
    | void
    | undefined
    | null
    | boolean
    | number
    | bigint
    | string
    | TypedArray
    | ArrayBuffer
    | DataView
    | Date
    | Error
    | RegExp
    | ReadableStream<Uint8Array>
    | WritableStream<Uint8Array>
    | Request
    | Response
    | Headers;
  // Recursively rewrite all `Stubable` types with `Stub`s
  // prettier-ignore
  type Stubify<T> = T extends Stubable ? Stub<T> : T extends Map<infer K, infer V> ? Map<Stubify<K>, Stubify<V>> : T extends Set<infer V> ? Set<Stubify<V>> : T extends Array<infer V> ? Array<Stubify<V>> : T extends ReadonlyArray<infer V> ? ReadonlyArray<Stubify<V>> : T extends BaseType ? T : T extends {
        [key: string | number]: any;
    } ? {
        [K in keyof T]: Stubify<T[K]>;
    } : T;
  // Recursively rewrite all `Stub<T>`s with the corresponding `T`s.
  // Note we use `StubBase` instead of `Stub` here to avoid circular dependencies:
  // `Stub` depends on `Provider`, which depends on `Unstubify`, which would depend on `Stub`.
  // prettier-ignore
  type Unstubify<T> = T extends StubBase<infer V> ? V : T extends Map<infer K, infer V> ? Map<Unstubify<K>, Unstubify<V>> : T extends Set<infer V> ? Set<Unstubify<V>> : T extends Array<infer V> ? Array<Unstubify<V>> : T extends ReadonlyArray<infer V> ? ReadonlyArray<Unstubify<V>> : T extends BaseType ? T : T extends {
        [key: string | number]: unknown;
    } ? {
        [K in keyof T]: Unstubify<T[K]>;
    } : T;
  type UnstubifyAll<A extends any[]> = {
    [I in keyof A]: Unstubify<A[I]>;
  };
  // Utility type for adding `Provider`/`Disposable`s to `object` types only.
  // Note `unknown & T` is equivalent to `T`.
  type MaybeProvider<T> = T extends object ? Provider<T> : unknown;
  type MaybeDisposable<T> = T extends object ? Disposable : unknown;
  // Type for method return or property on an RPC interface.
  // - Stubable types are replaced by stubs.
  // - Serializable types are passed by value, with stubable types replaced by stubs
  //   and a top-level `Disposer`.
  // Everything else can't be passed over PRC.
  // Technically, we use custom thenables here, but they quack like `Promise`s.
  // Intersecting with `(Maybe)Provider` allows pipelining.
  // prettier-ignore
  type Result<R> = R extends Stubable ? Promise<Stub<R>> & Provider<R> : R extends Serializable<R> ? Promise<Stubify<R> & MaybeDisposable<R>> & MaybeProvider<R> : never;
  // Type for method or property on an RPC interface.
  // For methods, unwrap `Stub`s in parameters, and rewrite returns to be `Result`s.
  // Unwrapping `Stub`s allows calling with `Stubable` arguments.
  // For properties, rewrite types to be `Result`s.
  // In each case, unwrap `Promise`s.
  type MethodOrProperty<V> = V extends (...args: infer P) => infer R
    ? (...args: UnstubifyAll<P>) => Result<Awaited<R>>
    : Result<Awaited<V>>;
  // Type for the callable part of an `Provider` if `T` is callable.
  // This is intersected with methods/properties.
  type MaybeCallableProvider<T> = T extends (...args: any[]) => any
    ? MethodOrProperty<T>
    : unknown;
  // Base type for all other types providing RPC-like interfaces.
  // Rewrites all methods/properties to be `MethodOrProperty`s, while preserving callable types.
  // `Reserved` names (e.g. stub method names like `dup()`) and symbols can't be accessed over RPC.
  export type Provider<
    T extends object,
    Reserved extends string = never,
  > = MaybeCallableProvider<T> & {
    [K in Exclude<
      keyof T,
      Reserved | symbol | keyof StubBase<never>
    >]: MethodOrProperty<T[K]>;
  };
}
declare namespace Cloudflare {
  interface Env {}
}
declare module "cloudflare:workers" {
  export type RpcStub<T extends Rpc.Stubable> = Rpc.Stub<T>;
  export const RpcStub: {
    new <T extends Rpc.Stubable>(value: T): Rpc.Stub<T>;
  };
  export abstract class RpcTarget implements Rpc.RpcTargetBranded {
    [Rpc.__RPC_TARGET_BRAND]: never;
  }
  // `protected` fields don't appear in `keyof`s, so can't be accessed over RPC
  export abstract class WorkerEntrypoint<Env = unknown>
    implements Rpc.WorkerEntrypointBranded
  {
    [Rpc.__WORKER_ENTRYPOINT_BRAND]: never;
    protected ctx: ExecutionContext;
    protected env: Env;
    constructor(ctx: ExecutionContext, env: Env);
    fetch?(request: Request): Response | Promise<Response>;
    tail?(events: TraceItem[]): void | Promise<void>;
    trace?(traces: TraceItem[]): void | Promise<void>;
    scheduled?(controller: ScheduledController): void | Promise<void>;
    queue?(batch: MessageBatch<unknown>): void | Promise<void>;
    test?(controller: TestController): void | Promise<void>;
  }
  export abstract class DurableObject<Env = unknown>
    implements Rpc.DurableObjectBranded
  {
    [Rpc.__DURABLE_OBJECT_BRAND]: never;
    protected ctx: DurableObjectState;
    protected env: Env;
    constructor(ctx: DurableObjectState, env: Env);
    fetch?(request: Request): Response | Promise<Response>;
    alarm?(alarmInfo?: AlarmInvocationInfo): void | Promise<void>;
    webSocketMessage?(
      ws: WebSocket,
      message: string | ArrayBuffer,
    ): void | Promise<void>;
    webSocketClose?(
      ws: WebSocket,
      code: number,
      reason: string,
      wasClean: boolean,
    ): void | Promise<void>;
    webSocketError?(ws: WebSocket, error: unknown): void | Promise<void>;
  }
  export type WorkflowDurationLabel =
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "week"
    | "month"
    | "year";
  export type WorkflowSleepDuration =
    | `${number} ${WorkflowDurationLabel}${"s" | ""}`
    | number;
  export type WorkflowDelayDuration = WorkflowSleepDuration;
  export type WorkflowTimeoutDuration = WorkflowSleepDuration;
  export type WorkflowRetentionDuration = WorkflowSleepDuration;
  export type WorkflowBackoff = "constant" | "linear" | "exponential";
  export type WorkflowStepConfig = {
    retries?: {
      limit: number;
      delay: WorkflowDelayDuration | number;
      backoff?: WorkflowBackoff;
    };
    timeout?: WorkflowTimeoutDuration | number;
  };
  export type WorkflowEvent<T> = {
    payload: Readonly<T>;
    timestamp: Date;
    instanceId: string;
  };
  export type WorkflowStepEvent<T> = {
    payload: Readonly<T>;
    timestamp: Date;
    type: string;
  };
  export abstract class WorkflowStep {
    do<T extends Rpc.Serializable<T>>(
      name: string,
      callback: () => Promise<T>,
    ): Promise<T>;
    do<T extends Rpc.Serializable<T>>(
      name: string,
      config: WorkflowStepConfig,
      callback: () => Promise<T>,
    ): Promise<T>;
    sleep: (name: string, duration: WorkflowSleepDuration) => Promise<void>;
    sleepUntil: (name: string, timestamp: Date | number) => Promise<void>;
    waitForEvent<T extends Rpc.Serializable<T>>(
      name: string,
      options: {
        type: string;
        timeout?: WorkflowTimeoutDuration | number;
      },
    ): Promise<WorkflowStepEvent<T>>;
  }
  export abstract class WorkflowEntrypoint<
    Env = unknown,
    T extends Rpc.Serializable<T> | unknown = unknown,
  > implements Rpc.WorkflowEntrypointBranded
  {
    [Rpc.__WORKFLOW_ENTRYPOINT_BRAND]: never;
    protected ctx: ExecutionContext;
    protected env: Env;
    constructor(ctx: ExecutionContext, env: Env);
    run(
      event: Readonly<WorkflowEvent<T>>,
      step: WorkflowStep,
    ): Promise<unknown>;
  }
  export const env: Cloudflare.Env;
}
interface SecretsStoreSecret {
  /**
   * Get a secret from the Secrets Store, returning a string of the secret value
   * if it exists, or throws an error if it does not exist
   */
  get(): Promise<string>;
}
declare module "cloudflare:sockets" {
  function _connect(
    address: string | SocketAddress,
    options?: SocketOptions,
  ): Socket;
  export { _connect as connect };
}
declare namespace TailStream {
  interface Header {
    readonly name: string;
    readonly value: string;
  }
  interface FetchEventInfo {
    readonly type: "fetch";
    readonly method: string;
    readonly url: string;
    readonly cfJson: string;
    readonly headers: Header[];
  }
  interface JsRpcEventInfo {
    readonly type: "jsrpc";
    readonly methodName: string;
  }
  interface ScheduledEventInfo {
    readonly type: "scheduled";
    readonly scheduledTime: Date;
    readonly cron: string;
  }
  interface AlarmEventInfo {
    readonly type: "alarm";
    readonly scheduledTime: Date;
  }
  interface QueueEventInfo {
    readonly type: "queue";
    readonly queueName: string;
    readonly batchSize: number;
  }
  interface EmailEventInfo {
    readonly type: "email";
    readonly mailFrom: string;
    readonly rcptTo: string;
    readonly rawSize: number;
  }
  interface TraceEventInfo {
    readonly type: "trace";
    readonly traces: (string | null)[];
  }
  interface HibernatableWebSocketEventInfoMessage {
    readonly type: "message";
  }
  interface HibernatableWebSocketEventInfoError {
    readonly type: "error";
  }
  interface HibernatableWebSocketEventInfoClose {
    readonly type: "close";
    readonly code: number;
    readonly wasClean: boolean;
  }
  interface HibernatableWebSocketEventInfo {
    readonly type: "hibernatableWebSocket";
    readonly info:
      | HibernatableWebSocketEventInfoClose
      | HibernatableWebSocketEventInfoError
      | HibernatableWebSocketEventInfoMessage;
  }
  interface Resume {
    readonly type: "resume";
    readonly attachment?: any;
  }
  interface CustomEventInfo {
    readonly type: "custom";
  }
  interface FetchResponseInfo {
    readonly type: "fetch";
    readonly statusCode: number;
  }
  type EventOutcome =
    | "ok"
    | "canceled"
    | "exception"
    | "unknown"
    | "killSwitch"
    | "daemonDown"
    | "exceededCpu"
    | "exceededMemory"
    | "loadShed"
    | "responseStreamDisconnected"
    | "scriptNotFound";
  interface ScriptVersion {
    readonly id: string;
    readonly tag?: string;
    readonly message?: string;
  }
  interface Trigger {
    readonly traceId: string;
    readonly invocationId: string;
    readonly spanId: string;
  }
  interface Onset {
    readonly type: "onset";
    readonly dispatchNamespace?: string;
    readonly entrypoint?: string;
    readonly executionModel: string;
    readonly scriptName?: string;
    readonly scriptTags?: string[];
    readonly scriptVersion?: ScriptVersion;
    readonly trigger?: Trigger;
    readonly info:
      | FetchEventInfo
      | JsRpcEventInfo
      | ScheduledEventInfo
      | AlarmEventInfo
      | QueueEventInfo
      | EmailEventInfo
      | TraceEventInfo
      | HibernatableWebSocketEventInfo
      | Resume
      | CustomEventInfo;
  }
  interface Outcome {
    readonly type: "outcome";
    readonly outcome: EventOutcome;
    readonly cpuTime: number;
    readonly wallTime: number;
  }
  interface Hibernate {
    readonly type: "hibernate";
  }
  interface SpanOpen {
    readonly type: "spanOpen";
    readonly name: string;
    readonly info?: FetchEventInfo | JsRpcEventInfo | Attributes;
  }
  interface SpanClose {
    readonly type: "spanClose";
    readonly outcome: EventOutcome;
  }
  interface DiagnosticChannelEvent {
    readonly type: "diagnosticChannel";
    readonly channel: string;
    readonly message: any;
  }
  interface Exception {
    readonly type: "exception";
    readonly name: string;
    readonly message: string;
    readonly stack?: string;
  }
  interface Log {
    readonly type: "log";
    readonly level: "debug" | "error" | "info" | "log" | "warn";
    readonly message: string;
  }
  interface Return {
    readonly type: "return";
    readonly info?: FetchResponseInfo;
  }
  interface Link {
    readonly type: "link";
    readonly label?: string;
    readonly traceId: string;
    readonly invocationId: string;
    readonly spanId: string;
  }
  interface Attribute {
    readonly name: string;
    readonly value:
      | string
      | string[]
      | boolean
      | boolean[]
      | number
      | number[]
      | bigint
      | bigint[];
  }
  interface Attributes {
    readonly type: "attributes";
    readonly info: Attribute[];
  }
  interface TailEvent {
    readonly traceId: string;
    readonly invocationId: string;
    readonly spanId: string;
    readonly timestamp: Date;
    readonly sequence: number;
    readonly event:
      | Onset
      | Outcome
      | Hibernate
      | SpanOpen
      | SpanClose
      | DiagnosticChannelEvent
      | Exception
      | Log
      | Return
      | Link
      | Attributes;
  }
  type TailEventHandler = (event: TailEvent) => void | Promise<void>;
  type TailEventHandlerName =
    | "outcome"
    | "hibernate"
    | "spanOpen"
    | "spanClose"
    | "diagnosticChannel"
    | "exception"
    | "log"
    | "return"
    | "link"
    | "attributes";
  type TailEventHandlerObject = Record<TailEventHandlerName, TailEventHandler>;
  type TailEventHandlerType = TailEventHandler | TailEventHandlerObject;
}
// Copyright (c) 2022-2023 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0
/**
 * Data types supported for holding vector metadata.
 */
type VectorizeVectorMetadataValue = string | number | boolean | string[];
/**
 * Additional information to associate with a vector.
 */
type VectorizeVectorMetadata =
  | VectorizeVectorMetadataValue
  | Record<string, VectorizeVectorMetadataValue>;
type VectorFloatArray = Float32Array | Float64Array;
interface VectorizeError {
  code?: number;
  error: string;
}
/**
 * Comparison logic/operation to use for metadata filtering.
 *
 * This list is expected to grow as support for more operations are released.
 */
type VectorizeVectorMetadataFilterOp = "$eq" | "$ne";
/**
 * Filter criteria for vector metadata used to limit the retrieved query result set.
 */
type VectorizeVectorMetadataFilter = {
  [field: string]:
    | Exclude<VectorizeVectorMetadataValue, string[]>
    | null
    | {
        [Op in VectorizeVectorMetadataFilterOp]?: Exclude<
          VectorizeVectorMetadataValue,
          string[]
        > | null;
      };
};
/**
 * Supported distance metrics for an index.
 * Distance metrics determine how other "similar" vectors are determined.
 */
type VectorizeDistanceMetric = "euclidean" | "cosine" | "dot-product";
/**
 * Metadata return levels for a Vectorize query.
 *
 * Default to "none".
 *
 * @property all      Full metadata for the vector return set, including all fields (including those un-indexed) without truncation. This is a more expensive retrieval, as it requires additional fetching & reading of un-indexed data.
 * @property indexed  Return all metadata fields configured for indexing in the vector return set. This level of retrieval is "free" in that no additional overhead is incurred returning this data. However, note that indexed metadata is subject to truncation (especially for larger strings).
 * @property none     No indexed metadata will be returned.
 */
type VectorizeMetadataRetrievalLevel = "all" | "indexed" | "none";
interface VectorizeQueryOptions {
  topK?: number;
  namespace?: string;
  returnValues?: boolean;
  returnMetadata?: boolean | VectorizeMetadataRetrievalLevel;
  filter?: VectorizeVectorMetadataFilter;
}
/**
 * Information about the configuration of an index.
 */
type VectorizeIndexConfig =
  | {
      dimensions: number;
      metric: VectorizeDistanceMetric;
    }
  | {
      preset: string; // keep this generic, as we'll be adding more presets in the future and this is only in a read capacity
    };
/**
 * Metadata about an existing index.
 *
 * This type is exclusively for the Vectorize **beta** and will be deprecated once Vectorize RC is released.
 * See {@link VectorizeIndexInfo} for its post-beta equivalent.
 */
interface VectorizeIndexDetails {
  /** The unique ID of the index */
  readonly id: string;
  /** The name of the index. */
  name: string;
  /** (optional) A human readable description for the index. */
  description?: string;
  /** The index configuration, including the dimension size and distance metric. */
  config: VectorizeIndexConfig;
  /** The number of records containing vectors within the index. */
  vectorsCount: number;
}
/**
 * Metadata about an existing index.
 */
interface VectorizeIndexInfo {
  /** The number of records containing vectors within the index. */
  vectorCount: number;
  /** Number of dimensions the index has been configured for. */
  dimensions: number;
  /** ISO 8601 datetime of the last processed mutation on in the index. All changes before this mutation will be reflected in the index state. */
  processedUpToDatetime: number;
  /** UUIDv4 of the last mutation processed by the index. All changes before this mutation will be reflected in the index state. */
  processedUpToMutation: number;
}
/**
 * Represents a single vector value set along with its associated metadata.
 */
interface VectorizeVector {
  /** The ID for the vector. This can be user-defined, and must be unique. It should uniquely identify the object, and is best set based on the ID of what the vector represents. */
  id: string;
  /** The vector values */
  values: VectorFloatArray | number[];
  /** The namespace this vector belongs to. */
  namespace?: string;
  /** Metadata associated with the vector. Includes the values of other fields and potentially additional details. */
  metadata?: Record<string, VectorizeVectorMetadata>;
}
/**
 * Represents a matched vector for a query along with its score and (if specified) the matching vector information.
 */
type VectorizeMatch = Pick<Partial<VectorizeVector>, "values"> &
  Omit<VectorizeVector, "values"> & {
    /** The score or rank for similarity, when returned as a result */
    score: number;
  };
/**
 * A set of matching {@link VectorizeMatch} for a particular query.
 */
interface VectorizeMatches {
  matches: VectorizeMatch[];
  count: number;
}
/**
 * Results of an operation that performed a mutation on a set of vectors.
 * Here, `ids` is a list of vectors that were successfully processed.
 *
 * This type is exclusively for the Vectorize **beta** and will be deprecated once Vectorize RC is released.
 * See {@link VectorizeAsyncMutation} for its post-beta equivalent.
 */
interface VectorizeVectorMutation {
  /* List of ids of vectors that were successfully processed. */
  ids: string[];
  /* Total count of the number of processed vectors. */
  count: number;
}
/**
 * Result type indicating a mutation on the Vectorize Index.
 * Actual mutations are processed async where the `mutationId` is the unique identifier for the operation.
 */
interface VectorizeAsyncMutation {
  /** The unique identifier for the async mutation operation containing the changeset. */
  mutationId: string;
}
/**
 * A Vectorize Vector Search Index for querying vectors/embeddings.
 *
 * This type is exclusively for the Vectorize **beta** and will be deprecated once Vectorize RC is released.
 * See {@link Vectorize} for its new implementation.
 */
declare abstract class VectorizeIndex {
  /**
   * Get information about the currently bound index.
   * @returns A promise that resolves with information about the current index.
   */
  public describe(): Promise<VectorizeIndexDetails>;
  /**
   * Use the provided vector to perform a similarity search across the index.
   * @param vector Input vector that will be used to drive the similarity search.
   * @param options Configuration options to massage the returned data.
   * @returns A promise that resolves with matched and scored vectors.
   */
  public query(
    vector: VectorFloatArray | number[],
    options?: VectorizeQueryOptions,
  ): Promise<VectorizeMatches>;
  /**
   * Insert a list of vectors into the index dataset. If a provided id exists, an error will be thrown.
   * @param vectors List of vectors that will be inserted.
   * @returns A promise that resolves with the ids & count of records that were successfully processed.
   */
  public insert(vectors: VectorizeVector[]): Promise<VectorizeVectorMutation>;
  /**
   * Upsert a list of vectors into the index dataset. If a provided id exists, it will be replaced with the new values.
   * @param vectors List of vectors that will be upserted.
   * @returns A promise that resolves with the ids & count of records that were successfully processed.
   */
  public upsert(vectors: VectorizeVector[]): Promise<VectorizeVectorMutation>;
  /**
   * Delete a list of vectors with a matching id.
   * @param ids List of vector ids that should be deleted.
   * @returns A promise that resolves with the ids & count of records that were successfully processed (and thus deleted).
   */
  public deleteByIds(ids: string[]): Promise<VectorizeVectorMutation>;
  /**
   * Get a list of vectors with a matching id.
   * @param ids List of vector ids that should be returned.
   * @returns A promise that resolves with the raw unscored vectors matching the id set.
   */
  public getByIds(ids: string[]): Promise<VectorizeVector[]>;
}
/**
 * A Vectorize Vector Search Index for querying vectors/embeddings.
 *
 * Mutations in this version are async, returning a mutation id.
 */
declare abstract class Vectorize {
  /**
   * Get information about the currently bound index.
   * @returns A promise that resolves with information about the current index.
   */
  public describe(): Promise<VectorizeIndexInfo>;
  /**
   * Use the provided vector to perform a similarity search across the index.
   * @param vector Input vector that will be used to drive the similarity search.
   * @param options Configuration options to massage the returned data.
   * @returns A promise that resolves with matched and scored vectors.
   */
  public query(
    vector: VectorFloatArray | number[],
    options?: VectorizeQueryOptions,
  ): Promise<VectorizeMatches>;
  /**
   * Use the provided vector-id to perform a similarity search across the index.
   * @param vectorId Id for a vector in the index against which the index should be queried.
   * @param options Configuration options to massage the returned data.
   * @returns A promise that resolves with matched and scored vectors.
   */
  public queryById(
    vectorId: string,
    options?: VectorizeQueryOptions,
  ): Promise<VectorizeMatches>;
  /**
   * Insert a list of vectors into the index dataset. If a provided id exists, an error will be thrown.
   * @param vectors List of vectors that will be inserted.
   * @returns A promise that resolves with a unique identifier of a mutation containing the insert changeset.
   */
  public insert(vectors: VectorizeVector[]): Promise<VectorizeAsyncMutation>;
  /**
   * Upsert a list of vectors into the index dataset. If a provided id exists, it will be replaced with the new values.
   * @param vectors List of vectors that will be upserted.
   * @returns A promise that resolves with a unique identifier of a mutation containing the upsert changeset.
   */
  public upsert(vectors: VectorizeVector[]): Promise<VectorizeAsyncMutation>;
  /**
   * Delete a list of vectors with a matching id.
   * @param ids List of vector ids that should be deleted.
   * @returns A promise that resolves with a unique identifier of a mutation containing the delete changeset.
   */
  public deleteByIds(ids: string[]): Promise<VectorizeAsyncMutation>;
  /**
   * Get a list of vectors with a matching id.
   * @param ids List of vector ids that should be returned.
   * @returns A promise that resolves with the raw unscored vectors matching the id set.
   */
  public getByIds(ids: string[]): Promise<VectorizeVector[]>;
}
/**
 * The interface for "version_metadata" binding
 * providing metadata about the Worker Version using this binding.
 */
type WorkerVersionMetadata = {
  /** The ID of the Worker Version using this binding */
  id: string;
  /** The tag of the Worker Version using this binding */
  tag: string;
  /** The timestamp of when the Worker Version was uploaded */
  timestamp: string;
};
interface DynamicDispatchLimits {
  /**
   * Limit CPU time in milliseconds.
   */
  cpuMs?: number;
  /**
   * Limit number of subrequests.
   */
  subRequests?: number;
}
interface DynamicDispatchOptions {
  /**
   * Limit resources of invoked Worker script.
   */
  limits?: DynamicDispatchLimits;
  /**
   * Arguments for outbound Worker script, if configured.
   */
  outbound?: {
    [key: string]: any;
  };
}
interface DispatchNamespace {
  /**
   * @param name Name of the Worker script.
   * @param args Arguments to Worker script.
   * @param options Options for Dynamic Dispatch invocation.
   * @returns A Fetcher object that allows you to send requests to the Worker script.
   * @throws If the Worker script does not exist in this dispatch namespace, an error will be thrown.
   */
  get(
    name: string,
    args?: {
      [key: string]: any;
    },
    options?: DynamicDispatchOptions,
  ): Fetcher;
}
declare module "cloudflare:workflows" {
  /**
   * NonRetryableError allows for a user to throw a fatal error
   * that makes a Workflow instance fail immediately without triggering a retry
   */
  export class NonRetryableError extends Error {
    public constructor(message: string, name?: string);
  }
}
declare abstract class Workflow<PARAMS = unknown> {
  /**
   * Get a handle to an existing instance of the Workflow.
   * @param id Id for the instance of this Workflow
   * @returns A promise that resolves with a handle for the Instance
   */
  public get(id: string): Promise<WorkflowInstance>;
  /**
   * Create a new instance and return a handle to it. If a provided id exists, an error will be thrown.
   * @param options Options when creating an instance including id and params
   * @returns A promise that resolves with a handle for the Instance
   */
  public create(
    options?: WorkflowInstanceCreateOptions<PARAMS>,
  ): Promise<WorkflowInstance>;
  /**
   * Create a batch of instances and return handle for all of them. If a provided id exists, an error will be thrown.
   * `createBatch` is limited at 100 instances at a time or when the RPC limit for the batch (1MiB) is reached.
   * @param batch List of Options when creating an instance including name and params
   * @returns A promise that resolves with a list of handles for the created instances.
   */
  public createBatch(
    batch: WorkflowInstanceCreateOptions<PARAMS>[],
  ): Promise<WorkflowInstance[]>;
}
type WorkflowDurationLabel =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";
type WorkflowSleepDuration =
  | `${number} ${WorkflowDurationLabel}${"s" | ""}`
  | number;
type WorkflowRetentionDuration = WorkflowSleepDuration;
interface WorkflowInstanceCreateOptions<PARAMS = unknown> {
  /**
   * An id for your Workflow instance. Must be unique within the Workflow.
   */
  id?: string;
  /**
   * The event payload the Workflow instance is triggered with
   */
  params?: PARAMS;
  /**
   * The retention policy for Workflow instance.
   * Defaults to the maximum retention period available for the owner's account.
   */
  retention?: {
    successRetention?: WorkflowRetentionDuration;
    errorRetention?: WorkflowRetentionDuration;
  };
}
type InstanceStatus = {
  status:
    | "queued" // means that instance is waiting to be started (see concurrency limits)
    | "running"
    | "paused"
    | "errored"
    | "terminated" // user terminated the instance while it was running
    | "complete"
    | "waiting" // instance is hibernating and waiting for sleep or event to finish
    | "waitingForPause" // instance is finishing the current work to pause
    | "unknown";
  error?: string;
  output?: object;
};
interface WorkflowError {
  code?: number;
  message: string;
}
declare abstract class WorkflowInstance {
  public id: string;
  /**
   * Pause the instance.
   */
  public pause(): Promise<void>;
  /**
   * Resume the instance. If it is already running, an error will be thrown.
   */
  public resume(): Promise<void>;
  /**
   * Terminate the instance. If it is errored, terminated or complete, an error will be thrown.
   */
  public terminate(): Promise<void>;
  /**
   * Restart the instance.
   */
  public restart(): Promise<void>;
  /**
   * Returns the current status of the instance.
   */
  public status(): Promise<InstanceStatus>;
  /**
   * Send an event to this instance.
   */
  public sendEvent({
    type,
    payload,
  }: {
    type: string;
    payload: unknown;
  }): Promise<void>;
}
````

## File: packages/app/app/components/ModelSelector.vue
````vue
<template>
  <USelectMenu
    v-model="currentModel"
    :searchInput="false"
    color="neutral"
    variant="ghost"
    :items="models"
    :content="{ align: 'start' }"
    :ui="{
      base: 'w-auto cursor-pointer text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white light:hover:bg-neutral-200 dark:hover:bg-neutral-700/70',
      label: 'text-xs',
      input: 'border-none text-black data-highlighted:text-black',
      content: 'w-auto max-h-200 dark:bg-black px-2',
      item: 'text-neutral-700 dark:text-neutral-400 my-2 data-highlighted:bg-neutral-100 dark:data-highlighted:bg-neutral-800 rounded-md',
      itemTrailingIcon: 'font-bold',
    }"
  >
    <template #item="{ item }">
      <div class="flex items-center justify-between gap-2 w-full">
        <span>{{ item.label }}</span>
        <div class="flex items-center gap-1.5 ml-2">
          <UTooltip
            v-for="icon in getModelIcons(item)"
            :key="icon.ability"
            :text="icon.tooltip"
          >
            <div
              class="rounded-md flex items-center justify-center p-1"
              :class="[icon.bgColor]"
            >
              <UIcon :name="icon.icon" class="w-4 h-4" :class="[icon.color]" />
            </div>
          </UTooltip>
        </div>
      </div>
    </template>
  </USelectMenu>
</template>

<script setup lang="ts">
const promptStore = usePromptStore();
const { currentModel } = storeToRefs(promptStore);
const modelStore = useModelStore();
const { models } = storeToRefs(modelStore);

const icons = ref([
  {
    icon: "i-heroicons:photo",
    ability: "imageUploads",
    color: "text-green-400/80 dark:text-green-300",
    bgColor: "bg-green-300/20",
    tooltip: "Supports image uploads and analysis",
    action: () => console.log("Image upload action"),
  },
  {
    icon: "i-heroicons:globe-alt",
    ability: "webSearch",
    color: "text-indigo-400/80 dark:text-indigo-300",
    bgColor: "bg-indigo-300/20",
    tooltip: "Web search capabilities",
    action: () => console.log("Web search action"),
  },
  {
    icon: "i-heroicons:document-text",
    ability: "pdfUploads",
    color: "text-purple-400/80 dark:text-purple-300",
    bgColor: "bg-purple-300/20",
    tooltip: "PDF upload and processing",
    action: () => console.log("PDF upload action"),
  },
  {
    icon: "i-heroicons:light-bulb",
    ability: "reasoningAbility",
    color: "text-yellow-400/80 dark:text-yellow-300",
    bgColor: "bg-yellow-300/20",
    tooltip: "Advanced reasoning abilities",
    action: () => console.log("Reasoning action"),
  },
  {
    icon: "i-heroicons:sparkles",
    ability: "generateImage",
    color: "text-red-400/80 dark:text-red-300",
    bgColor: "bg-red-300/20",
    tooltip: "Image generation capabilities",
    action: () => console.log("Image generation action"),
  },
]);

const getModelIcons = (model: any) => {
  return icons.value.filter((icon) => model[icon.ability]);
};

const emit = defineEmits(["changeModel"]);
</script>
````

## File: packages/app/app/workers/database.ts
````typescript
import SQLiteESMFactory from "wa-sqlite/dist/wa-sqlite.mjs";
// @ts-ignore
import { AccessHandlePoolVFS } from "wa-sqlite/src/examples/AccessHandlePoolVFS.js";
import * as SQLite from "wa-sqlite";

/**
 * A generic key-value store built on IndexedDB.
 *
 * @template K The type of the keys in the store. Must be an IndexedDB valid key type.
 * @template V The type of the values in the store. Can be any valid JavaScript type supported by IndexedDB.
 */
class IndexedDBStore<K extends IDBValidKey, V> {
  private dbName: string;
  private storeName: string;
  private db: IDBDatabase | null = null;
  private dbOpenPromise: Promise<IDBDatabase> | null = null;

  /**
   * Creates an instance of IndexedDBStore.
   * @param dbName The name of the IndexedDB database.
   * @param storeName The name of the object store within the database.
   */
  constructor(dbName = "myAppDB", storeName = "keyValStore") {
    this.dbName = dbName;
    this.storeName = storeName;
  }

  /**
   * Internal method to get or open the IndexedDB database connection.
   * Ensures the database is only opened once and handles upgrades.
   * @returns A promise that resolves with the IDBDatabase instance.
   */
  private async _getDB(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db;
    }

    if (this.dbOpenPromise) {
      return this.dbOpenPromise;
    }

    this.dbOpenPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
        this.dbOpenPromise = null; // Clear the promise once resolved
      };

      request.onerror = (event: Event) => {
        const error = (event.target as IDBRequest).error;
        console.error(
          `IndexedDB error: ${error?.name} - ${error?.message}`,
          event,
        );
        reject(
          new Error(
            `Failed to open IndexedDB: ${error?.message || "Unknown error"}`,
          ),
        );
        this.dbOpenPromise = null; // Clear the promise on error
      };
    });

    return this.dbOpenPromise;
  }

  /**
   * Sets (puts or updates) a value in the store.
   * @param key The key to associate with the value.
   * @param value The value to store.
   * @returns A promise that resolves when the value has been successfully stored.
   */
  public async set(key: K, value: V): Promise<void> {
    const db = await this._getDB();
    return new Promise((resolve, reject) => {
      // Specify 'readwrite' mode for writing operations
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      // put() method will add or update the value based on the key
      const request = store.put(value, key);

      request.onsuccess = () => resolve();
      request.onerror = (event: Event) => {
        const error = (event.target as IDBRequest).error;
        console.error(`Set error: ${error?.name} - ${error?.message}`, event);
        reject(
          new Error(
            `Failed to set value: ${error?.message || "Unknown error"}`,
          ),
        );
      };
    });
  }

  /**
   * Retrieves a value from the store by its key.
   * @param key The key of the value to retrieve.
   * @returns A promise that resolves with the retrieved value, or `undefined` if the key does not exist.
   */
  public async get(key: K): Promise<V | undefined> {
    const db = await this._getDB();
    return new Promise((resolve, reject) => {
      // Specify 'readonly' mode for reading operations
      const transaction = db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);

      const request = store.get(key);

      request.onsuccess = (event: Event) => {
        // Cast the result to the expected value type V
        resolve((event.target as IDBRequest).result as V | undefined);
      };
      request.onerror = (event: Event) => {
        const error = (event.target as IDBRequest).error;
        console.error(`Get error: ${error?.name} - ${error?.message}`, event);
        reject(
          new Error(
            `Failed to get value: ${error?.message || "Unknown error"}`,
          ),
        );
      };
    });
  }

  /**
   * Deletes a value from the store by its key.
   * @param key The key of the value to delete.
   * @returns A promise that resolves when the value has been successfully deleted.
   */
  public async delete(key: K): Promise<void> {
    const db = await this._getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = (event: Event) => {
        const error = (event.target as IDBRequest).error;
        console.error(
          `Delete error: ${error?.name} - ${error?.message}`,
          event,
        );
        reject(
          new Error(
            `Failed to delete value: ${error?.message || "Unknown error"}`,
          ),
        );
      };
    });
  }

  /**
   * Clears all key-value pairs from the object store.
   * @returns A promise that resolves when the store has been successfully cleared.
   */
  public async clear(): Promise<void> {
    const db = await this._getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = (event: Event) => {
        const error = (event.target as IDBRequest).error;
        console.error(`Clear error: ${error?.name} - ${error?.message}`, event);
        reject(
          new Error(
            `Failed to clear store: ${error?.message || "Unknown error"}`,
          ),
        );
      };
    });
  }
}

const kvStore = new IndexedDBStore<string, string>();

let sqlite3: ReturnType<typeof SQLite.Factory>;
let db: number;
let vfs: any;

let dbReadyResolvers: Array<() => void> = [];
let isDbReady = false;

async function clearDirectoryRecursive(
  directoryHandle: FileSystemDirectoryHandle,
) {
  for await (const entry of directoryHandle.values()) {
    if (entry.kind === "file") {
      await directoryHandle.removeEntry(entry.name);
    } else if (entry.kind === "directory") {
      await clearDirectoryRecursive(entry);
      await directoryHandle.removeEntry(entry.name);
    }
  }
}

export async function clearAllOPFSStorage() {
  try {
    if (db) await sqlite3.close(db);
    if (vfs) await vfs.close();
    db = 0;
    vfs = null;
    isDbReady = false;
    const rootDirHandle = await navigator.storage.getDirectory();
    await clearDirectoryRecursive(rootDirHandle);
    console.log("cleared!");
  } catch (error) {
    console.error("Error clearing OPFS storage:", error);
    throw error;
  }
}

export const waitForDatabase = async () => {
  if (isDbReady) {
    return Promise.resolve();
  }
  initDatabase();
  return new Promise((resolve) => {
    dbReadyResolvers.push(resolve as any);
  });
};

let isStarting = false;
export const initDatabase = async () => {
  if (isStarting) return;
  isStarting = true;

  // force clear opfs on breaking updates
  const updateId = "one";
  if ((await kvStore.get("clear")) !== updateId) {
    console.log("clearing opfs...");
    await clearAllOPFSStorage();
    await kvStore.set("clear", updateId);
    console.log("clearing opfs... done.");
  }

  const module = await SQLiteESMFactory();
  sqlite3 = SQLite.Factory(module);
  vfs = await AccessHandlePoolVFS.create("ahp", module);
  sqlite3.vfs_register(vfs, true);
  db = await sqlite3.open_v2("mydb");

  await sqlite3.exec(
    db,
    [
      "PRAGMA locking_mode = exclusive;",
      "PRAGMA journal_mode = wal;",
      "PRAGMA synchronous = NORMAL;",
    ].join(""),
  );

  // Initialize threads table
  await sqlite3.exec(
    db,
    `
      CREATE TABLE IF NOT EXISTS threads (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        last_message_at INTEGER NOT NULL,
        parent_thread_id TEXT,
        status TEXT NOT NULL DEFAULT 'ready',
        deleted INTEGER DEFAULT 0,
        pinned INTEGER DEFAULT 0,
        clock INTEGER
      )
    `,
  );

  // Initialize messages table
  await sqlite3.exec(
    db,
    `
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        data TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        error TEXT,
        deleted INTEGER DEFAULT 0,
        thread_id TEXT NOT NULL,
        stream_id TEXT,
        message_index INTEGER NOT NULL DEFAULT 0,
        clock INTEGER
      )
    `,
  );

  // Initialize kv table
  await sqlite3.exec(
    db,
    `
      CREATE TABLE IF NOT EXISTS kv (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        value TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        clock INTEGER
      )
    `,
  );

  // Initialize clock
  await sqlite3.exec(
    db,
    `
      CREATE TABLE IF NOT EXISTS clock (
        id INTEGER PRIMARY KEY,
        clock INTEGER
      );
    `,
  );
  await sqlite3.exec(
    db,
    `INSERT OR IGNORE INTO clock (id, clock) VALUES (1, 0);`,
  );

  let checkFTS = false;
  await sqlite3.exec(
    db,
    "SELECT name FROM sqlite_master WHERE type='table' AND name='threads_fts';",
    (row) => {
      if (row[0] === "threads_fts") checkFTS = true;
    },
  );

  await sqlite3.exec(
    db,
    `
    CREATE VIRTUAL TABLE IF NOT EXISTS threads_fts USING fts5(
      title,
      messages_content,
      thread_id,
    );
  `,
  );

  // Triggers to keep threads_fts in sync with the threads table
  await sqlite3.exec(
    db,
    `
    -- When a new thread is created, insert a corresponding row into the FTS table.
    -- The messages_content is initially empty.
    CREATE TRIGGER IF NOT EXISTS threads_after_insert
    AFTER INSERT ON threads
    BEGIN
      INSERT INTO threads_fts(thread_id, title, messages_content)
      VALUES (new.id, new.title, '');
    END;

    -- When a thread is deleted, delete its FTS entry.
    CREATE TRIGGER IF NOT EXISTS threads_after_delete
    AFTER DELETE ON threads
    BEGIN
      DELETE FROM threads_fts WHERE thread_id = old.id;
    END;

    -- When a thread's title is updated, update the FTS entry.
    CREATE TRIGGER IF NOT EXISTS threads_after_update
    AFTER UPDATE OF title ON threads
    BEGIN
      UPDATE threads_fts SET title = new.title WHERE thread_id = new.id;
    END;
  `,
  );

  // Triggers to keep threads_fts in sync with the messages table
  await sqlite3.exec(
    db,
    `
    -- A helper function to rebuild the messages_content for a given thread.
    -- This is the most robust way to handle message INSERT, UPDATE, and DELETE.
    CREATE TRIGGER IF NOT EXISTS messages_after_insert
    AFTER INSERT ON messages
    BEGIN
      UPDATE threads_fts
      SET messages_content = (
        SELECT GROUP_CONCAT(content, ' ')
        FROM messages
        WHERE thread_id = new.thread_id
      )
      WHERE thread_id = new.thread_id;
    END;

    -- When a message is updated, rebuild the content for the entire thread.
    CREATE TRIGGER IF NOT EXISTS messages_after_update
    AFTER UPDATE OF content ON messages
    BEGIN
      UPDATE threads_fts
      SET messages_content = (
        SELECT GROUP_CONCAT(content, ' ')
        FROM messages
        WHERE thread_id = new.thread_id
      )
      WHERE thread_id = new.thread_id;
    END;

    -- When a message is deleted, rebuild the content for the entire thread.
    CREATE TRIGGER IF NOT EXISTS messages_after_delete
    AFTER DELETE ON messages
    BEGIN
      UPDATE threads_fts
      SET messages_content = (
        SELECT GROUP_CONCAT(content, ' ')
        FROM messages
        WHERE thread_id = old.thread_id
      )
      WHERE thread_id = old.thread_id;
    END;
  `,
  );

  if (!checkFTS) {
    console.log("rebuilding fts index...");
    await sqlite3.exec(db, "DELETE FROM threads_fts;");
    await sqlite3.exec(
      db,
      `
      INSERT INTO threads_fts (thread_id, title, messages_content)
      SELECT
        t.id,
        t.title,
        COALESCE(GROUP_CONCAT(m.content, ' '), '')
      FROM
        threads AS t
      LEFT JOIN
        messages AS m ON t.id = m.thread_id
      GROUP BY
        t.id;
    `,
    );
    console.log("rebuilding fts index... done.");
  }

  isDbReady = true;
  console.log("db ready!");
  dbReadyResolvers.forEach((resolve) => resolve());
  dbReadyResolvers = [];
};

export const dbExec = async ({
  sql,
  bindings,
}: {
  sql: string;
  bindings: any;
}) => {
  await waitForDatabase();
  let columns: any[] = [];
  const rows: any[] = [];
  for await (const stmt of sqlite3.statements(db, sql)) {
    if (bindings) {
      sqlite3.bind_collection(stmt, bindings);
    }
    while ((await sqlite3.step(stmt)) === SQLite.SQLITE_ROW) {
      columns = columns.length === 0 ? sqlite3.column_names(stmt) : columns;
      const row = sqlite3.row(stmt);
      rows.push(row);
    }
  }
  return {
    rows: rows,
    columns: columns,
    changes: sqlite3.changes(db),
  };
};
````

## File: README.md
````markdown
# Nuxflare Chat

> Nuxflare Chat was originally started as a project for the T3 Chat Cloneathon (https://cloneathon.t3.chat).

Nuxflare Chat is a blazing-fast, open-source AI chat app built with Cloudflare and Nuxt.

## ✨ What Makes It Special

### 🏎️ **Lightning Fast & Local-First**

- Store everything in your browser with wa-sqlite + OPFS
- Switch between threads instantly—no network waiting
- Full-text search through all your chats locally with SQLite FTS5
- Smart tab coordination: one WebSocket connection and database connection shared across all tabs

### 🔄 **Real-Time Everything**

- Custom sync engine with logical clocks
- Durable, resumable streams that survive network hiccups
- Live updates across all your tabs and devices
- Built on Cloudflare Durable Objects for global edge performance

### 🎨 **Beautiful & Thoughtful Design**

- Gorgeous light/dark modes with glassmorphic effects
- Optimized chunked markdown rendering
- Code syntax highlighting + LaTeX support with KaTeX
- Smooth animations that don't get in your way

### 🧠 **AI Superpowers**

- Any OpenRouter model + provider-specific keys
- Thinking models with reasoning streams
- Edit/delete messages, branch conversations, retry generations
- Image and PDF attachments support
- Web search grounding

### 🛠️ **Developer Experience**

- Deploy to your Cloudflare account in one command with [Alchemy](https://alchemy.run)
- Works with any OpenAuth.js endpoint
- Clean subdomain architecture (auth, api, app)
- Zero-config development setup

## 🚀 Quick Start

### Prerequisites

- Cloudflare account with R2 enabled
- Domain pointed to Cloudflare nameservers
- Google OAuth credentials

### Deploy to Production

1. **Clone and configure**

   ```bash
   git clone https://github.com/nuxflare/chat
   cd nuxflare-chat
   cp .env.example .env
   ```

2. **Set up environment**
   Edit `.env` with your Google OAuth credentials:

   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_secret
   ```

3. **Configure domain**
   Edit `alchemy.run.ts` with your domain and Cloudflare zone ID.

4. **Deploy everything**
   ```bash
   bun install
   bun run alchemy.run.ts --stage production
   ```

That's it! Your chat app is live at `https://your-domain.com` 🎉

### Local Development

```bash
bun install

# Terminal 1: Frontend
cd packages/app && bun run dev

# Terminal 2: API
cd packages/api && bunx wrangler dev
```

**Auth Setup for Development**

By default, development mode uses `auth.chat.nuxflare.com` as the auth endpoint—you can keep using this for quick development.

To use your own auth endpoint:

- Deploy once with the production steps above
- Update the auth URL in `packages/api/.dev.vars` to point to your deployment

Alternatively, run the auth server locally:

```bash
# Terminal 3: Auth (optional)
cd packages/auth && bunx wrangler dev
```

## 🏗️ Architecture

**Edge-First Design**

- **Frontend**: Nuxt 3 + Nuxt UI + Tailwind v4
- **Backend**: Cloudflare Workers + Durable Objects + R2
- **AI**: OpenRouter + Vercel AI SDK
- **Auth**: OpenAuth.js compatible

**Smart Client Coordination**

Multiple tabs? No problem. We use web locks + service workers to ensure only one tab handles the WebSocket connection and database, then broadcasts updates to others. Saves bandwidth and prevents conflicts.

**Durable Objects Magic**

- `User DO`: Your personal data store, located close to you
- `Stream DO`: Handles resumable AI response streams

## 🛣️ What's Next

We're just getting started. Coming soon:

- 🔌 MCP servers integration
- 👥 Teams and multi-user chats
- 🤖 More agentic workflows
- 🎛️ Custom model/provider management
- ✨ Smoother animations and UX

_Basically, if you see a cool feature in any chat app, let us know and we WILL start working on it._

## 🤝 Contributing

Found a bug? Have an idea? PRs and issues welcome! This started as a hackathon project but has grown into something the community can build on together.

## 📄 License

MIT - Go wild, build cool stuff.

---

_Made with ☕_
````

## File: packages/app/app/components/StreamingMessage.vue
````vue
<template>
  <div>
    <VueSpinnerDots
      v-if="!(content.length > 0) && !(reasoning.length > 0)"
      class="w-10"
    />
    <MarkdownRenderer :content="content" />
  </div>
</template>

<script setup lang="ts">
import { VueSpinnerDots } from "vue3-spinners";
const props = defineProps<{ streamId: string }>();
const content = ref("");
const reasoning = ref("");
const isStreaming = ref(true);
const config = useRuntimeConfig();
// TODO: make sure each http call is only made once for a tab

onMounted(async () => {
  try {
    const streamUrl = `${config.public.apiUrl}/stream/${props.streamId}`;
    const response = await fetch(streamUrl);
    if (!response.ok) {
      throw new Error(`Stream error: ${response.status}`);
    }
    const reader = response.body?.getReader();
    if (!reader) return;
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        isStreaming.value = false;
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      content.value += chunk;
    }
  } catch (error) {
    console.error("Error streaming message:", error);
    isStreaming.value = false;
  }
});
</script>
````

## File: packages/app/app/composables/useThreadsStore.ts
````typescript
export interface Thread {
  id: string;
  title: string;
  created_at: number;
  updated_at: number;
  last_message_at: number;
  parent_thread_id?: string | null;
  status: "ready" | "streaming" | "error";
  deleted?: boolean;
  pinned?: boolean;
  clock?: number;
}

export interface GroupedThreads {
  [groupName: string]: Thread[];
}

const getThreadTime = (thread: any) => {
  return Math.max(thread.created_at, thread.last_message_at);
};

export const useThreadsStore = defineStore("threads", () => {
  const threads = ref<Record<string, Thread>>({});
  const activeThread = ref<string | null>(null);
  const messages = ref<Record<string, any>>({});
  const responseStreaming = ref(false);
  const stopStreaming = ref(false);

  watch(
    threads,
    (newThreads) => {
      if (import.meta.client) {
        if (activeThread.value) {
          const thread = newThreads[activeThread.value];
          if (thread) {
            responseStreaming.value = thread.status === "streaming";
            if (thread.status != "streaming") {
              stopStreaming.value = false;
            }
          } else {
            responseStreaming.value = false;
          }
        }
      }
    },
    { deep: true },
  );

  function addMessage(msg: any) {
    messages.value[msg.id as string] = msg;
  }

  const messagesList = computed(() =>
    Object.values(messages.value).toSorted((a, b) => {
      // Sort by index first, then by created_at as a safety net
      if (a.index !== b.index) {
        return (a.index || 0) - (b.index || 0);
      }
      return a.created_at - b.created_at;
    }),
  );

  const pinnedThreads = computed(() => {
    const result: GroupedThreads = { pinned: [] };
    for (const thread of Object.values(threads.value)) {
      if (thread.pinned && !thread.deleted) {
        result.pinned!.push(thread);
      }
    }
    result.pinned!.sort((a, b) => getThreadTime(b) - getThreadTime(a));
    return result;
  });

  const unpinnedThreads = computed(() => {
    const now = Date.now();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const groups: GroupedThreads = {
      today: [],
      yesterday: [],
      "last 7 days": [],
      "last 30 days": [],
      older: [],
    };

    const unpinned = Object.values(threads.value)
      .filter((thread) => !thread.pinned && !thread.deleted)
      .sort((a, b) => getThreadTime(b) - getThreadTime(a));

    unpinned.forEach((thread) => {
      const threadDate = new Date(thread.last_message_at);
      if (threadDate >= today) {
        groups.today!.push(thread);
      } else if (threadDate >= yesterday) {
        groups.yesterday!.push(thread);
      } else if (threadDate >= sevenDaysAgo) {
        groups["last 7 days"]!.push(thread);
      } else if (threadDate >= thirtyDaysAgo) {
        groups["last 30 days"]!.push(thread);
      } else {
        groups.older!.push(thread);
      }
    });

    for (const groupName of Object.keys(groups)) {
      if (groups[groupName]!.length === 0) {
        delete groups[groupName];
      }
    }

    return groups;
  });

  let messagesChannel: BroadcastChannel;
  function setActiveThread(threadId: string | null) {
    if (import.meta.client) {
      activeThread.value = threadId;
      messages.value = {};
      if (threadId) {
        const { $sync } = useNuxtApp();
        $sync.getMessagesForThread?.(threadId).then((msgs: any[]) => {
          msgs.forEach((msg) => (messages.value[msg.id] = msg));
        });
      }
      if (messagesChannel) {
        messagesChannel.close();
      }
      messagesChannel = new BroadcastChannel(`messages-channel-${threadId}`);
      messagesChannel.onmessage = (
        event: MessageEvent<{ type: string; payload: any }>,
      ) => {
        const { type, payload } = event.data;
        if (type === "message_update") {
          if (payload.thread_id !== activeThread.value) return;
          if (payload.deleted) delete messages.value[payload.id];
          else messages.value[payload.id] = payload;
        }
      };
    }
  }

  function setThread(thread: Thread) {
    threads.value[thread.id] = thread;
  }

  function addThreads(newThreads: Thread[]) {
    newThreads.forEach((thread) => {
      threads.value[thread.id] = thread;
    });
  }

  function removeThread(threadId: string) {
    if (threads.value[threadId]) {
      delete threads.value[threadId];
    }
  }

  if (import.meta.client) {
    const { $sync } = useNuxtApp();

    const fetchInitialThreads = async () => {
      try {
        const initialThreadsArray = await $sync.getThreads!();
        if (initialThreadsArray) {
          addThreads(initialThreadsArray);
        }
      } catch (error) {
        console.error("Failed to fetch initial threads:", error);
      }
    };

    fetchInitialThreads();

    const threadsChannel = new BroadcastChannel("threads-channel");
    threadsChannel.onmessage = (event: MessageEvent) => {
      const { type, payload } = event.data as { type: string; payload: any };
      if (type === "thread_update") {
        const thread = payload as Thread;
        if (thread.deleted) removeThread(thread.id);
        else setThread(thread);
      }
    };
  }

  const activeThreadObject = computed(
    () => threads.value[activeThread.value || ""] || null,
  );

  return {
    threads,
    responseStreaming,
    stopStreaming,
    messages,
    messagesList,
    activeThread,
    activeThreadObject,
    pinnedThreads,
    unpinnedThreads,
    setThread,
    setActiveThread,
    addThreads,
    removeThread,
    addMessage,
  };
});
````

## File: packages/app/nuxt.config.ts
````typescript
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  build: {
    transpile: ["wa-sqlite", "estree-walker"],
  },
  vite: {
    optimizeDeps: {
      exclude: ["wa-sqlite", "estree-walker"],
    },
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "nuxt-svgo",
    "@pinia/nuxt",
    "nuxt-workers",
  ],
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css",
          integrity:
            "sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: "http://localhost:8787",
      authUrl: "https://auth.chat.nuxflare.com",
      authClientID: "nuxflare-chat",
      sessionInterval: 5 * 60 * 1000,
      openRouterRedirectUri: process.env.OPENROUTER_REDIRECT_URI || "",
    },
    openRouterClientId: process.env.OPENROUTER_CLIENT_ID || "",
    openRouterClientSecret: process.env.OPENROUTER_CLIENT_SECRET || "",
    openRouterAuthUrl: process.env.OPENROUTER_AUTH_URL || "",
    openRouterTokenUrl: process.env.OPENROUTER_TOKEN_URL || "",
    openRouterUserinfoUrl: process.env.OPENROUTER_USERINFO_URL || "",
  },
  css: ["~/assets/css/main.css"],
  svgo: {
    componentPrefix: "icon",
    autoImportPath: "~/assets/icons",
  },
});
````

## File: alchemy.run.ts
````typescript
import alchemy from "alchemy";
import {
  Worker,
  DurableObjectNamespace,
  R2Bucket,
  Nuxt,
  KVNamespace,
} from "alchemy/cloudflare";

// config
const appName = "nuxflare-chat";
const context = await alchemy(appName, {
  password: process.env.ALCHEMY_PASSWORD,
});
const domain =
  context.stage === "production"
    ? "chat.nuxflare.com"
    : `chat-${context.stage}.nuxflare.com`;
const zoneId = "4d534b83ec6eb19b914f40c66dc31510";
const authClientID = "nuxflare-chat";

const blobsBucket = await R2Bucket("blobs", {
  name: `${appName}-${context.stage}-blobs`,
});

const userDO = new DurableObjectNamespace("user-do", {
  className: "User",
  sqlite: true,
});
const streamDO = new DurableObjectNamespace("stream-do", {
  className: "Stream",
  sqlite: true,
});

const authKV = await KVNamespace("auth-kv", {
  title: `${appName}-${context.stage}-auth-kv`,
});
const auth = await Worker("auth", {
  name: `${appName}-${context.stage}-auth`,
  entrypoint: "./packages/auth/index.ts",
  compatibilityFlags: ["nodejs_compat"],
  domains: [
    {
      domainName: `auth.${domain}`,
      adopt: true,
      zoneId,
    },
  ],
  bindings: {
    KV: authKV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: alchemy.secret(process.env.GOOGLE_CLIENT_SECRET!),
  },
});

const api = await Worker("api", {
  name: `${appName}-${context.stage}-api`,
  entrypoint: "./packages/api/index.ts",
  compatibilityFlags: ["nodejs_compat", "enable_request_signal"],
  bundle: {
    loader: {
      ".md": "text",
    },
  },
  rules: [
    {
      globs: ["**/*.js", "**/*.mjs", "**/*.wasm", "**/*.sql"],
    },
    {
      globs: ["**/*.md"],
    },
  ],
  domains: [
    {
      domainName: `api.${domain}`,
      adopt: true,
      zoneId,
    },
  ],
  bindings: {
    BLOB: blobsBucket,
    USER: userDO,
    STREAM: streamDO,
    AUTH_URL: `https://auth.${domain}`,
    AUTH_CLIENT_ID: authClientID,
  },
});

const app = await Nuxt("app", {
  name: `${appName}-${context.stage}-app`,
  main: "./packages/app/.output/server/index.mjs",
  command: `[ -z "$SKIP_BUILD" ] && cd packages/app && NITRO_PRESET=cloudflare-module bun run build || ( [ -n "$SKIP_BUILD" ] && echo "Skipping build." )`,
  assets: "./packages/app/.output/public",
  wrangler: false,
  domains: [
    {
      domainName: domain,
      adopt: true,
      zoneId,
    },
  ],
  env: {
    NUXT_PUBLIC_API_URL: `https://api.${domain}`,
    NUXT_PUBLIC_AUTH_URL: `https://auth.${domain}`,
    NUXT_PUBLIC_AUTH_CLIENT_ID: authClientID,
  },
});

await context.finalize();
````

## File: packages/app/package.json
````json
{
  "name": "@nuxflare-chat/app",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "@ai-sdk/anthropic": "^1.2.12",
    "@ai-sdk/openai": "^1.3.22",
    "@nuxflare-chat/api": "workspace:*",
    "@nuxflare-chat/common": "workspace:*",
    "@nuxt/fonts": "0.11.4",
    "@nuxt/image": "^1.10.0",
    "@nuxt/ui": "3.1.3",
    "@pinia/nuxt": "0.11.1",
    "@shikijs/rehype": "^3.7.0",
    "@tailwindcss/typography": "^0.5.16",
    "@unhead/vue": "^2.0.3",
    "@vueuse/nuxt": "13.3.0",
    "marked": "^16.0.0",
    "nuxt": "3.17.5",
    "nuxt-svgo": "4.0.17",
    "nuxt-workers": "0.1.0",
    "pinia": "^3.0.3",
    "rehype-katex": "^7.0.1",
    "rehype-stringify": "^10.0.1",
    "remark-gfm": "^4.0.1",
    "remark-math": "^6.0.0",
    "remark-parse": "^11.0.0",
    "remark-rehype": "^11.1.2",
    "typescript": "^5.6.3",
    "unified": "^11.0.5",
    "vue": "latest",
    "vue3-spinners": "^1.3.1",
    "wa-sqlite": "file:../wa-sqlite"
  },
  "devDependencies": {
    "@iconify-json/carbon": "^1.2.10",
    "@iconify-json/flat-color-icons": "^1.2.1",
    "@iconify-json/heroicons": "^1.2.2",
    "@iconify-json/lucide": "^1.2.53",
    "@iconify-json/material-icon-theme": "^1.2.15",
    "@iconify-json/material-symbols": "^1.2.28",
    "@iconify-json/ri": "^1.2.5"
  }
}
````

## File: packages/app/app/components/chat/ChatMessage.client.vue
````vue
<template>
  <div class="flex flex-col">
    <!-- User message -->
    <div v-if="message.role === 'user'" class="flex justify-end mb-2 group">
      <div class="flex flex-col items-end space-y-2 w-full">
        <!-- show attachment files -->
        <div
          v-if="
            message.data?.attachments && message.data.attachments.length > 0
          "
          class="max-w-[80%] ml-auto flex justify-end flex-wrap gap-2 mb-2"
        >
          <div
            v-for="attachment in message.data.attachments"
            :key="attachment.id"
            class="flex items-stretch gap-2 px-3 py-2 rounded-lg ring-1 ring-neutral-300 dark:ring-neutral-700"
          >
            <div
              class="rounded-lg bg-primary-600/80 flex items-center justify-center w-10 h-10"
            >
              <Icon
                :name="
                  attachment.type.startsWith('image/')
                    ? 'i-lucide:image'
                    : 'i-lucide:file'
                "
                class="size-4.5 text-white"
              />
            </div>

            <div class="flex flex-col items-start dark:text-neutral-300 gap-1">
              <span class="text-sm font-medium truncate max-w-[200px]">
                {{ attachment.name }}
              </span>
              <span class="text-xs font-light uppercase">{{
                attachment.type.split("/")[1]
              }}</span>
            </div>
          </div>
        </div>

        <div
          v-if="!editUserMessage"
          class="max-w-[80%] flex p-3 rounded-lg ring-1 ring-primary-400/30 dark:ring-0 bg-primary-100/50 dark:bg-neutral-500/20"
        >
          <div class="flex flex-col text-md">
            <MarkdownRenderer :content="message.content" />
          </div>
        </div>

        <div
          v-if="editUserMessage"
          class="w-full max-w-[80%] flex p-3 rounded-lg bg-primary-100/40 dark:bg-neutral-800/50 ring-2 ring-primary-300/50 dark:ring-neutral-200/20"
        >
          <UTextarea
            :rows="1"
            :maxrows="8"
            autoresize
            :id="`message-input`"
            v-model="editedMessageContent"
            class="w-full"
            :ui="{
              base: 'p-0 pb-0.5 ring-0 focus-visible:ring-0 rounded-none bg-transparent',
              root: '',
            }"
            @keydown.enter.exact.prevent="saveMessage()"
            @update:model-value="updateUserMessage($event)"
          />
        </div>

        <!-- Action icons - shown on hover -->
        <div
          class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
        >
          <UTooltip
            v-for="actionItem in userMessageActions"
            :key="actionItem.icon"
            :text="actionItem.tooltip"
          >
            <UButton
              variant="ghost"
              size="sm"
              :icon="actionItem.icon"
              :color="(actionItem.color as any) || 'neutral'"
              class="hover:bg-primary-100/50 dark:hover:bg-primary-400/10"
              @click="actionItem.action"
            />
          </UTooltip>
        </div>
      </div>
    </div>

    <!-- Assistant message -->
    <div v-else class="flex justify-start mb-2 group">
      <div class="w-full p-3 space-y-2">
        <AssistantMessage :message="message" />

        <!-- Action icons - shown on hover -->
        <div
          class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
        >
          <UTooltip
            v-for="actionItem in assistantMessageActions"
            :key="actionItem.icon"
            :text="actionItem.tooltip"
          >
            <UButton
              v-if="actionItem"
              variant="ghost"
              size="sm"
              :icon="actionItem.icon"
              :color="actionItem.color || 'neutral'"
              class="hover:bg-primary-100/50 dark:hover:bg-primary-400/10"
              @click="actionItem.action"
            />
          </UTooltip>
          <span class="capitalize text-xs">{{ modelName }}</span>
        </div>
      </div>
    </div>

    <DeleteModal
      v-model="openDeleteModal"
      @cancelDelete="cancelDelete"
      @confirmDelete="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import showToast from "~/utils/showToast";

interface ChatMessageProps {
  message: any;
  showTimestamp?: boolean;
}

const props = withDefaults(defineProps<ChatMessageProps>(), {
  showTimestamp: false,
});

const modelName = computed(() => {
  return props.message.data?.modelOptions?.name
    .split("/")[1]
    .split("-")
    .join(" ");
});

const emit = defineEmits(["retryMessage", "branchThread"]);
const threadsStore = useThreadsStore();
const { responseStreaming } = storeToRefs(threadsStore);

const { $sync } = useNuxtApp();

const editUserMessage = ref(false);
const { input: editedMessageContent } = useTextareaAutosize();
const copiedState = ref(false);

const editMessage = (message: any) => {
  editUserMessage.value = !editUserMessage.value;
  if (editUserMessage.value) {
    editedMessageContent.value = message.content;
    requestAnimationFrame(() => {
      const input = document.getElementById(`message-input`);
      input?.focus();
    });
  }
};

const saveMessage = async () => {
  const newContent = editedMessageContent.value.trim();
  if (newContent && newContent !== props.message.content) {
    try {
      await $sync.updateMessage(props.message.id, {
        data: { ...toRaw(props.message.data), content: newContent },
      });
      showToast("Message updated successfully");
    } catch (error) {
      showToast("Failed to update message", "error");
    }
  }
  editUserMessage.value = false;
};

const updateUserMessage = (value: string) => {
  editedMessageContent.value = value;
};

const openDeleteModal = ref(false);

const userMessageActions = computed(() => [
  {
    icon: editUserMessage.value ? "i-lucide:check" : "i-lucide:edit",
    tooltip: editUserMessage.value ? "Save changes" : "Edit message",
    action: () => {
      editUserMessage.value ? saveMessage() : editMessage(props.message);
    },
  },
  ...(editUserMessage.value
    ? [
        {
          icon: "i-lineicons:xmark",
          tooltip: "Cancel edit",
          action: () => {
            editUserMessage.value = false;
            editedMessageContent.value = "";
          },
        },
      ]
    : []),
  {
    icon: "i-carbon:branch",
    tooltip: "Branch off",
    action: () => {
      emit("branchThread", props.message.id);
    },
  },
  {
    icon: copiedState.value ? "i-lucide:check" : "i-lucide:copy",
    tooltip: "Copy message",
    color: copiedState.value ? "success" : "neutral",
    action: async () => {
      if (copiedState.value) return;
      try {
        await navigator.clipboard.writeText(props.message.content);
        copiedState.value = true;
        setTimeout(() => {
          copiedState.value = false;
        }, 2000);
        showToast("Copied to clipboard");
      } catch (error) {
        showToast("Failed to copy to clipboard", "error");
      }
    },
  },
  {
    icon: "i-lucide:trash",
    tooltip: "Delete message",
    action: () => {
      openDeleteModal.value = true;
    },
  },
]);

const assistantMessageActions = computed(() => [
  {
    icon: "carbon:branch",
    tooltip: "Branch off",
    action: () => {
      emit("branchThread", props.message.id);
    },
  },
  props.message &&
    !props.message.stream_id &&
    !responseStreaming.value && {
      icon: "i-lucide:refresh-ccw",
      tooltip: "Retry message",
      action: () => {
        emit("retryMessage");
      },
    },
  {
    icon: copiedState.value ? "i-lucide:check" : "i-lucide:copy",
    tooltip: "Copy message",
    color: copiedState.value ? "success" : "neutral",
    action: async () => {
      if (copiedState.value) return;
      try {
        await navigator.clipboard.writeText(props.message.content);
        copiedState.value = true;
        setTimeout(() => {
          copiedState.value = false;
        }, 2000);
        showToast("Copied to clipboard");
      } catch (error) {
        showToast("Failed to copy to clipboard", "error");
      }
    },
  },
  {
    icon: "i-lucide:trash",
    tooltip: "Delete message",
    action: () => {
      openDeleteModal.value = true;
    },
  },
]);

const cancelDelete = () => {
  openDeleteModal.value = false;
};

const confirmDelete = async () => {
  try {
    await $sync.updateMessage(props.message.id, { deleted: true });
    showToast("Message deleted successfully");
  } catch (error) {
    showToast("Failed to delete message", "error");
  }
  openDeleteModal.value = false;
};
</script>
````

## File: packages/app/app/pages/[[id]].vue
````vue
<template>
  <div v-if="currentThreadId && !(activeThreadObject?.deleted === false)">
    <div
      class="flex flex-col items-center justify-center min-h-screen text-center gap-5"
    >
      <LoaderSpin :size="10" />
      <div v-if="!waiting" class="space-y-3">
        <h1 class="lg:text-lg">
          This chat may have been deleted or may not exist.
        </h1>
        <UButton label="New Chat" variant="subtle" size="lg" to="/" />
      </div>
    </div>
  </div>

  <div v-else class="h-full flex flex-col relative">
    <div class="overflow-y-auto flex-grow" ref="messagesContainer">
      <UContainer
        class="max-w-4xl h-auto flex flex-col"
        :class="[!currentThreadId ? 'mt-[250px]' : 'mt-0']"
      >
        <div
          v-if="!currentThreadId"
          class="flex-grow flex flex-col justify-center gap-6"
        >
          <div
            class="mb-4 text-center text-neutral-500 dark:text-neutral-300 space-y-3"
          >
            <span class="block text-3xl font-light"
              >{{ greeting }}, {{ userName }}</span
            >
            <span class="block text-4xl font-semibold"
              >How can I help you today?</span
            >
          </div>

          <ChatPrompt @send="sendMessage" />

          <!-- Show example prompts or questions based on selection -->
          <Transition name="pop">
            <div
              v-if="!selectedPrompt"
              class="flex justify-center flex-wrap mx-w-full mx-auto gap-3"
            >
              <button
                v-for="prompt in examplePrompts"
                :key="prompt.name"
                :class="[
                  'p-1 md:px-4 rounded-lg ring-1 ring-neutral-400/40 dark:ring-neutral-200/30 cursor-pointer w-auto',
                  'hover:bg-neutral-200/40 dark:bg-neutral-500/20 dark:hover:bg-neutral-500/30 text-neutral-500/80 dark:text-neutral-300/70 flex items-center gap-2',
                ]"
                @click="selectPrompt(prompt)"
              >
                <UIcon :name="prompt.icon" class="text-xl" />
                <span
                  class="text-md font-medium text-neutral-500 dark:text-neutral-300 break-words"
                >
                  {{ prompt.name }}
                </span>
              </button>
            </div>
          </Transition>

          <!-- Show questions for selected prompt -->

          <Transition name="pop">
            <div
              v-if="selectedPrompt"
              class="space-y-4 ring ring-neutral-300/80 dark:ring-neutral-200/20 bg-neutral-100/70 dark:bg-neutral-800/40 rounded-xl p-4"
            >
              <div class="flex items-center justify-between mb-4">
                <h3
                  class="font-medium text-neutral-600 dark:text-neutral-300 flex items-center gap-2"
                >
                  <UIcon :name="selectedPrompt.icon" class="text-lg" />
                  {{ selectedPrompt.name }}
                </h3>
                <UButton
                  icon="i-carbon:close"
                  variant="ghost"
                  size="md"
                  color="neutral"
                  @click="selectedPrompt = null"
                  class="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                />
              </div>

              <div class="space-y-3">
                <button
                  v-for="question in selectedPrompt.questions"
                  :key="question"
                  @click="sendMessage(question)"
                  class="w-full p-3 rounded-lg ring-1 ring-neutral-400/40 dark:ring-neutral-200/30 cursor-pointer hover:bg-neutral-200/40 dark:bg-neutral-500/20 dark:hover:bg-neutral-500/30 text-left flex items-center gap-3"
                >
                  <UIcon
                    name="i-proicons:search"
                    class="text-lg text-neutral-500 dark:text-neutral-300 flex-shrink-0"
                  />
                  <span class="text-sm text-neutral-600 dark:text-neutral-300">
                    {{ question }}
                  </span>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Display messages if there are any -->
        <div
          class="pt-20 flex flex-col gap-6"
          :style="{ paddingBottom: `${chatPromptHeight + 24}px` }"
        >
          <ChatMessage
            v-for="(message, index) in messagesList"
            :key="index"
            :message="message"
            @retryMessage="() => retryMessage(message.id)"
            @branchThread="() => branchThread(message.id)"
          />
          <div
            v-if="uploadingAttachment && currentThreadId"
            class="max-w-[80%] ml-auto flex items-center justify-between gap-2 p-3 rounded-lg ring-1 ring-primary-400/30 dark:ring-0 bg-primary-100/50 dark:bg-neutral-500/20"
          >
            <LoaderSpin :size="5" />
            <div class="text-blue-700 dark:text-blue-300">
              Uploading files & sending...
            </div>
          </div>

          <div ref="containerBottom" />
        </div>
      </UContainer>
    </div>

    <!-- Fixed chat input area at bottom -->
    <div
      v-if="currentThreadId"
      class="w-full absolute bottom-0 left-0 bg-transparent"
      ref="chatPromptContainer"
    >
      <!-- Scroll to bottom button -->
      <div
        v-if="!isAtBottom"
        class="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10"
      >
        <UButton
          label="Scroll to bottom"
          trailing-icon="i-carbon:chevron-down"
          variant="solid"
          color="neutral"
          class="px-2 rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 ring ring-neutral-300/20 text-neutral-500 dark:text-neutral-300/80"
          @click="scrollToBottom"
        />
      </div>

      <UContainer class="max-w-4xl px-1.5">
        <ChatPrompt :bottom="true" @send="sendMessage" />
      </UContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "chat",
});
const route = useRoute();
const threadsStore = useThreadsStore();
const { messagesList, activeThreadObject } = storeToRefs(threadsStore);
const promptStore = usePromptStore();
const { uploadingAttachment } = storeToRefs(promptStore);
const { $sync } = useNuxtApp();

const waiting = ref(true);
const currentThreadId = computed(() => route.params.id?.toString() || "");

onMounted(() =>
  setTimeout(() => {
    waiting.value = false;
  }, 3000),
);

onMounted(async () => {
  const endpoint = useRuntimeConfig().public.apiUrl;
});

const userName = "User";

const selectedPrompt = ref<any>(null);

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
});

const examplePrompts = [
  {
    name: "Write",
    icon: "i-iconoir:edit-pencil",
    questions: [
      "Write a short story about a time traveler.",
      "Help me write a professional email.",
      "Create a poem about nature.",
    ],
  },
  {
    name: "Learn",
    icon: "i-iconoir:graduation-cap",
    questions: [
      "Explain quantum computing in simple terms.",
      "How does the stock market work?",
      "What are the basics of machine learning?",
    ],
  },
  {
    name: "Code",
    icon: "i-iconoir:code",
    questions: [
      "Help me debug this JavaScript function.",
      "Explain the difference between REST and GraphQL.",
      "Show me how to create a responsive CSS layout.",
    ],
  },
  {
    name: "Explore",
    icon: "i-iconoir:globe",
    questions: [
      "What are some recipes for a beginner cook?",
      "Suggest some travel destinations for a solo trip.",
      "What are some interesting science facts?",
    ],
  },
  {
    name: "Compare",
    icon: "i-carbon:scales",
    questions: [
      "Compare Python vs JavaScript for web development.",
      "What's the difference between iPhone and Android?",
      "Compare electric cars vs gasoline cars.",
    ],
  },
];

const selectPrompt = (prompt: any) => {
  selectedPrompt.value = prompt;
};

watch(
  () => route.params.id,
  async (newId) => {
    const newThreadId = newId as string | null;
    threadsStore.setActiveThread(newThreadId);
  },
  { immediate: true },
);

const { currentModel, thinkingBudget, webSearch, attachmentFiles, message } =
  storeToRefs(promptStore);

const sendMessage = async (text: string) => {
  const attachments = await (async () => {
    if (attachmentFiles.value.length) {
      promptStore.setUploadingAttachment(true);
    }

    const uploadedAttachments = [];
    if (attachmentFiles.value.length) {
      for (const file of attachmentFiles.value) {
        const response = await fetch(
          `${useRuntimeConfig().public.apiUrl}/blob`,
          {
            method: "PUT",
            headers: {
              "content-type": file.type,
            },
            body: file,
          },
        );
        uploadedAttachments.push({
          id: (await response.json()).id,
          name: file.name,
          type: file.type,
        });
      }
    }
    return uploadedAttachments;
  })();

  selectedPrompt.value = null;
  const currentThreadId = route.params.id as string | undefined;
  const options: any = {};
  if (currentModel.value?.apiModel) {
    options.name = currentModel.value.apiModel;
  }
  if (thinkingBudget.value && currentModel.value?.reasoningAbility) {
    options.thinkingBudget = thinkingBudget.value.toLowerCase();
  }
  if (webSearch.value && currentModel.value?.webSearch) {
    options.webSearch = webSearch.value;
  }
  if (!currentThreadId) {
    try {
      const { threadId: newThreadId } = await $sync.newThread({
        content: text,
        attachments,
        options,
      });
      navigateTo(`/${newThreadId}`);
    } catch (error) {
      console.error("Failed to create new thread:", error);
    }
  } else {
    await $sync.sendMessage({
      threadId: currentThreadId,
      content: text,
      attachments,
      options,
    });
  }
  promptStore.resetMessage();
  promptStore.clearAttachmentFiles();
  promptStore.setUploadingAttachment(false);
};

const retryMessage = async (messageId: string) => {
  try {
    const options: any = {};
    if (currentModel.value?.apiModel) {
      options.name = currentModel.value.apiModel;
    }
    if (thinkingBudget.value && currentModel.value?.reasoningAbility) {
      options.thinkingBudget = thinkingBudget.value.toLowerCase();
    }
    await $sync.retryMessage(messageId, options);
  } catch (error) {
    console.error("Failed to retry message:", error);
    // TODO: Show error to user
  }
};

const branchThread = async (messageId: string) => {
  const newThreadId = crypto.randomUUID();
  navigateTo(`/${newThreadId}`);
  await $sync.branchThread(currentThreadId.value, messageId, newThreadId);
};

const messagesContainer = useTemplateRef("messagesContainer");
const messagesContainerBottom = useTemplateRef("containerBottom");
const chatPromptContainer = useTemplateRef("chatPromptContainer");
const { height: chatPromptHeight } = useElementBounding(chatPromptContainer);

const isAtBottom = useElementVisibility(messagesContainerBottom);

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};
</script>

<style scoped>
.appear-enter-active,
.appear-leave-active {
  transition: transform 0.1s ease-in-out;
}

.appear-enter-from,
.appear-leave-to {
  transform: scale(0.5);
}

.appear-enter-to,
.appear-leave-from {
  transform: scale(1);
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.1s ease-in-out;
}

.pop-enter-from,
.pop-leave-to {
  transform: scale(0.5);
}

.pop-enter-to,
.pop-leave-from {
  transform: scale(1);
}
</style>
````

## File: packages/app/app/plugins/sync.client.ts
````typescript
export default defineNuxtPlugin({
  name: "sync",
  async setup() {
    await navigator.serviceWorker
      .register("SharedService_ServiceWorker.js")
      .then(() => navigator.serviceWorker.ready);
    const sharedService = new SharedService(
      "sync-service",
      syncServiceProvider,
    );
    sharedService.activate();

    let _ready = false;
    let _syncReady = false;
    const readyResolvers: Function[] = [];
    const syncReadyResolvers: Function[] = [];
    (async () => {
      while (!_ready) {
        await new Promise((res) => setTimeout(res, 30));
        try {
          _ready = await Promise.race([
            new Promise((res) => setTimeout(res, 100)),
            sharedService.proxy["isReady"]!(),
          ]);
        } catch (err) {
          console.log("err", err);
          // retry
        }
      }
      console.log("_ready");
      readyResolvers.forEach((res) => res());
      while (!_syncReady) {
        await new Promise((res) => setTimeout(res, 30));
        try {
          _syncReady = await sharedService.proxy["isSyncReady"]!();
        } catch {
          // retry
        }
      }
      console.log("_syncReady");
      syncReadyResolvers.forEach((res) => res());
    })();

    async function isReady() {
      if (_ready) return true;
      return new Promise((res) => {
        readyResolvers.push(res);
      });
    }
    async function isSyncReady() {
      if (_syncReady) return true;
      return new Promise((res) => {
        syncReadyResolvers.push(res);
      });
    }

    return {
      provide: {
        sync: {
          async setAuthInfo(endpoint: string, token: string) {
            await isReady();
            return await sharedService.proxy["setAuthInfo"]!(endpoint, token);
          },
          async newThread(params: {
            content: string;
            attachments?: any[];
            options: { name: string; thinkingBudget: string };
          }) {
            await isSyncReady();
            return await sharedService.proxy["newThread"]!(params);
          },
          async getThreads() {
            await isReady();
            return await sharedService.proxy["getThreads"]!();
          },
          async getMessagesForThread(threadId: string) {
            await isReady();
            return await sharedService.proxy["getMessagesForThread"]!(threadId);
          },
          async updateThread(id: string, update: any) {
            await isSyncReady();
            return await sharedService.proxy["updateThread"]!(id, update);
          },
          async sendMessage(params: {
            threadId: string;
            content: string;
            attachments?: any[];
            options: { name: string; thinkingBudget: string };
          }) {
            await isSyncReady();
            return await sharedService.proxy["sendMessage"]!(params);
          },
          async getKV(name: string) {
            await isSyncReady();
            return await sharedService.proxy["getKV"]!(name);
          },
          async setKV(name: string, value: string) {
            await isSyncReady();
            return await sharedService.proxy["setKV"]!(name, value);
          },
          async retryMessage(
            messageId: string,
            options?: { model?: string; thinkingBudget?: string },
          ) {
            await isSyncReady();
            return await sharedService.proxy["retryMessage"]!(
              messageId,
              options,
            );
          },
          async branchThread(
            threadId: string,
            messageId: string,
            newThreadId: string,
          ) {
            await isSyncReady();
            return await sharedService.proxy["branchThread"]!(
              threadId,
              messageId,
              newThreadId,
            );
          },
          async updateMessage(
            id: string,
            update: { data?: any; deleted?: boolean },
          ) {
            await isSyncReady();
            return await sharedService.proxy["updateMessage"]!(id, update);
          },
          async searchThreads(query: string) {
            await isReady();
            return await sharedService.proxy["searchThreads"]!(query);
          },
          async clear() {
            await isReady();
            return await sharedService.proxy["clear"]!();
          },
        },
      },
    };
  },
});
````

## File: packages/app/app/utils/sync-service.ts
````typescript
import type { Thread } from "../composables/useThreadsStore";
import type { PushEvent } from "@nuxflare-chat/api/types";

const THREADS_CHANNEL_NAME = "threads-channel";
const threadsChannel = new BroadcastChannel(THREADS_CHANNEL_NAME);
let _clock = 0;
let messageQueue: any[] = [];
let isQueuePaused = false;
const QUEUE_PROCESSING_INTERVAL = 10;

let syncReadyResolvers: Array<() => void> = [];
let isSyncReady = false;
function waitForSync(): Promise<void> {
  if (isSyncReady) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    syncReadyResolvers.push(resolve);
  });
}

const sanitizeFtsTerm = (term: string): string => {
  const escapedTerm = term.replace(/"/g, '""');
  return `"${escapedTerm}"`;
};

function mapRowToThread(rowArray: any[], columnNames: string[]): Thread {
  const rowObj = columnNames.reduce((acc, name, idx) => {
    acc[name] = rowArray[idx];
    return acc;
  }, {} as any);

  return {
    id: rowObj.id,
    title: rowObj.title,
    created_at: Number(rowObj.created_at),
    updated_at: Number(rowObj.updated_at),
    last_message_at: Number(rowObj.last_message_at),
    parent_thread_id: rowObj.parent_thread_id,
    status: rowObj.status,
    deleted: !!rowObj.deleted,
    pinned: !!rowObj.pinned,
    clock: rowObj.clock !== null ? Number(rowObj.clock) : undefined,
  };
}

const THREAD_COLUMNS = [
  "id",
  "title",
  "created_at",
  "updated_at",
  "last_message_at",
  "parent_thread_id",
  "status",
  "deleted",
  "pinned",
  "clock",
];

async function initClock() {
  const { rows } = await dbExec({
    sql: `SELECT clock FROM clock WHERE id = 1`,
    bindings: undefined,
  });
  console.log("clock", rows);
  if (rows.length > 0) {
    _clock = rows[0][0] as number;
  }
}

export function syncServiceProvider() {
  initClock().then(() => {
    startMessageQueue();
  });

  const convertToMs = (s?: number | string | null): number => {
    if (s === undefined || s === null) return 0;
    const num = Number(s);
    if (isNaN(num)) return 0;
    return num < 100000000000 ? num * 1000 : num; // Heuristic: if < 12 digits, assume seconds
  };

  function getMessageChannelName(threadId: string): string {
    return `messages-channel-${threadId}`;
  }

  async function updateClock(newClock: number) {
    if (newClock > _clock) {
      _clock = newClock;
      await dbExec({
        sql: `UPDATE clock SET clock = ? WHERE id = 1`,
        bindings: [_clock],
      });
    }
  }

  async function applyChange(msg: any) {
    if (msg.type === "thread" && msg.data) {
      const backendThread = msg.data;
      const newClock = msg.clock;

      if (!backendThread.id || newClock === undefined || newClock === null) {
        console.error("Invalid thread data or clock for applyChange:", msg);
        return;
      }

      // Use UPSERT pattern with clock-based conflict resolution
      const { changes } = await dbExec({
        sql: `
        INSERT INTO threads (id, title, created_at, updated_at, last_message_at, parent_thread_id, status, deleted, pinned, clock)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          title = excluded.title,
          updated_at = excluded.updated_at,
          last_message_at = excluded.last_message_at,
          status = excluded.status,
          deleted = excluded.deleted,
          pinned = excluded.pinned,
          clock = excluded.clock
        WHERE excluded.clock > threads.clock OR threads.clock IS NULL;
        `,
        bindings: [
          backendThread.id,
          backendThread.title ?? "Untitled",
          convertToMs(backendThread.created_at),
          convertToMs(backendThread.updated_at),
          convertToMs(backendThread.last_message_at),
          backendThread.parent_thread_id,
          backendThread.status ?? "ready",
          backendThread.deleted ? 1 : 0,
          backendThread.pinned ? 1 : 0,
          newClock,
        ],
      });
      await updateClock(newClock);
      if (changes > 0) {
        const updatedThread = await api.getThread(backendThread.id);
        if (updatedThread) {
          threadsChannel.postMessage({
            type: "thread_update",
            payload: updatedThread,
          });
        }
      }
    } else if (msg.type === "message" && msg.data) {
      const backendMessage = msg.data;
      const newClock = msg.clock;

      if (
        !backendMessage.id ||
        !backendMessage.thread_id ||
        newClock === undefined ||
        newClock === null
      ) {
        console.error("Invalid message data or clock for applyChange:", msg);
        return;
      }

      // Use UPSERT pattern with clock-based conflict resolution
      const { changes } = await dbExec({
        sql: `
        INSERT INTO messages (id, role, content, data, created_at, updated_at, error, deleted, thread_id, clock, stream_id, message_index)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          role = excluded.role,
          content = excluded.content,
          data = excluded.data,
          updated_at = excluded.updated_at,
          error = excluded.error,
          deleted = excluded.deleted,
          stream_id = excluded.stream_id,
          message_index = excluded.message_index,
          clock = excluded.clock
        WHERE (excluded.clock > messages.clock OR messages.clock IS NULL) AND thread_id = ?;
        `,
        bindings: [
          backendMessage.id,
          backendMessage.role ?? "user",
          backendMessage.content ?? backendMessage.data?.content ?? "",
          backendMessage.data ? JSON.stringify(backendMessage.data) : null,
          convertToMs(backendMessage.created_at),
          convertToMs(backendMessage.updated_at),
          backendMessage.error,
          backendMessage.deleted ? 1 : 0,
          backendMessage.thread_id,
          newClock,
          backendMessage.stream_id,
          backendMessage.index ?? 0,
          backendMessage.thread_id,
        ],
      });
      await updateClock(newClock);
      if (changes > 0) {
        const updatedMessage = await api.getMessage(backendMessage.id);
        if (updatedMessage) {
          const messageChannel = new BroadcastChannel(
            getMessageChannelName(backendMessage.thread_id),
          );
          messageChannel.postMessage({
            type: "message_update",
            payload: updatedMessage,
          });
          messageChannel.close();
        }
      }
    } else if (msg.type === "kv" && msg.data) {
      const backendKV = msg.data;
      const newClock = msg.clock;

      if (
        !backendKV.id ||
        !backendKV.name ||
        newClock === undefined ||
        newClock === null
      ) {
        console.error("Invalid KV data or clock for applyChange:", msg);
        return;
      }

      // Use UPSERT pattern with clock-based conflict resolution
      await dbExec({
        sql: `
        INSERT INTO kv (id, name, value, created_at, updated_at, clock)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(name) DO UPDATE SET
          value = excluded.value,
          updated_at = excluded.updated_at,
          clock = excluded.clock
        WHERE excluded.clock > kv.clock OR kv.clock IS NULL;
        `,
        bindings: [
          backendKV.id,
          backendKV.name,
          backendKV.value,
          convertToMs(backendKV.created_at),
          convertToMs(backendKV.updated_at),
          newClock,
        ],
      });
      await updateClock(newClock);
    }
  }

  let wsSendFunction: ((data: string | ArrayBuffer | Blob) => void) | null =
    null;
  let _token: string, _endpoint: string;

  let messageQueueTimeout: any;
  async function startMessageQueue() {
    messageQueueTimeout = setTimeout(
      processMessageQueue,
      QUEUE_PROCESSING_INTERVAL,
    );
  }
  async function processMessageQueue() {
    if (messageQueueTimeout) clearTimeout(messageQueueTimeout);
    while (messageQueue.length > 0 && !isQueuePaused) {
      const msg = messageQueue[0];
      if (msg.clock > _clock + 1) {
        console.log(
          `Missed events. Local clock: ${_clock}, message clock: ${msg.clock}. Pulling changes.`,
        );
        await pullChanges();
      } else {
        messageQueue.shift();
        await applyChange(msg);
      }
    }
    messageQueueTimeout = setTimeout(
      processMessageQueue,
      QUEUE_PROCESSING_INTERVAL,
    );
  }

  async function restartWebsocketsServer() {
    const { send } = useWebSocket(_endpoint, {
      heartbeat: {
        message: "ping",
        responseMessage: "pong",
        interval: 10000,
        pongTimeout: 2000,
      },
      autoReconnect: {
        retries: 1000,
        onFailed: () => {
          console.log("retry failed!");
        },
      },
      protocols: [_token, "nuxflare-chat"],
      onDisconnected() {
        console.log("disconnected!");
      },
      onConnected() {
        console.log("connected!");
      },
      onMessage: async (_ws, event) => {
        try {
          const msg = JSON.parse(event.data as string);
          messageQueue.push(msg);
          startMessageQueue();
        } catch (e) {
          console.error(
            "Error processing message from backend:",
            e,
            event.data,
          );
        }
      },
    });
    wsSendFunction = send;
  }

  async function pullChanges() {
    isQueuePaused = true;
    try {
      const response = await fetch(`${_endpoint}/pull?clock=${_clock}`, {
        headers: {
          Authentication: `Bearer ${_token}`,
        },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to pull changes: ${response.status} ${response.statusText}`,
        );
      }
      const data = await response.json();
      if (data.threads && Array.isArray(data.threads)) {
        for (const thread of data.threads) {
          await applyChange({
            type: "thread",
            clock: thread.clock,
            data: thread,
          });
        }
      }
      if (data.messages && Array.isArray(data.messages)) {
        for (const message of data.messages) {
          await applyChange({
            type: "message",
            clock: message.clock,
            data: message,
          });
        }
      }
      if (data.kvs && Array.isArray(data.kvs)) {
        for (const kv of data.kvs) {
          await applyChange({
            type: "kv",
            clock: kv.clock,
            data: kv,
          });
        }
      }
      console.log(
        `pulled ${data.kvs.length + data.messages.length + data.threads.length} changes!`,
      );
    } catch (error) {
      console.error("Error pulling changes:", error);
    } finally {
      isQueuePaused = false;
    }
  }

  const api = {
    isReady() {
      return true;
    },
    isSyncReady() {
      return isSyncReady;
    },
    async setAuthInfo(endpoint: string, token: string) {
      await waitForDatabase();
      if (endpoint !== _endpoint || token !== _token) {
        _endpoint = endpoint;
        _token = token;
        (async () => {
          await initClock();
          await pullChanges();
          await restartWebsocketsServer();
          isSyncReady = true;
          console.log("sync ready!");
          syncReadyResolvers.forEach((resolve) => resolve());
          syncReadyResolvers = [];
        })();
      }
    },
    async newThread(params: {
      content: string;
      attachments?: any[];
      title?: string;
      options?: { name: string; thinkingBudget?: string };
    }) {
      await waitForSync();
      const threadId = crypto.randomUUID();
      const messageId = crypto.randomUUID();
      const title =
        params.title || params.content.substring(0, 50) || "New Chat";
      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "new_thread",
            data: {
              id: threadId,
              title,
            },
          },
          {
            type: "new_message",
            data: {
              id: messageId,
              data: {
                content: params.content,
                attachments: params.attachments,
              },
              role: "user",
              threadId,
            },
          },
          {
            type: "run_thread",
            data: {
              threadId,
              options: params.options,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
      return { threadId };
    },
    async getThread(threadId: string): Promise<Thread | null> {
      const { rows } = await dbExec({
        sql: `SELECT ${THREAD_COLUMNS.join(", ")} FROM threads WHERE id = ?`,
        bindings: [threadId],
      });
      const thread = rows[0] ? mapRowToThread(rows[0], THREAD_COLUMNS) : null;
      return thread;
    },
    async searchThreads(query: string): Promise<any[]> {
      const ftsQuery = query
        .trim()
        .split(/\s+/)
        .filter((term) => term.length > 0)
        .map((term) => {
          const sanitized = sanitizeFtsTerm(term);
          return `${sanitized}*`;
        })
        .join(" AND ");
      const { rows } = await dbExec({
        sql: `SELECT t.* FROM threads AS t JOIN threads_fts AS fts ON t.id = fts.thread_id
              WHERE fts.threads_fts MATCH ? AND t.deleted = 0
              ORDER BY fts.rank;`,
        bindings: [ftsQuery],
      });
      const threads = rows.map((row) => mapRowToThread(row, THREAD_COLUMNS));
      return threads;
    },
    async getMessage(messageId: string): Promise<any | null> {
      const { rows } = await dbExec({
        sql: `SELECT id, role, content, data, created_at, updated_at, error, deleted, thread_id, clock, stream_id, message_index
         FROM messages WHERE id = ?`,
        bindings: [messageId],
      });
      const messages = rows.map((row) => ({
        id: row[0],
        role: row[1],
        content: row[2],
        data: row[3] ? JSON.parse(row[3]) : null,
        created_at: Number(row[4]),
        updated_at: Number(row[5]),
        error: row[6],
        deleted: !!row[7],
        thread_id: row[8],
        clock: row[9] !== null ? Number(row[9]) : undefined,
        stream_id: row[10] || "",
        index: row[11] !== null ? Number(row[11]) : 0,
      }));
      return messages[0];
    },
    async getThreads(): Promise<Thread[]> {
      const { rows } = await dbExec({
        sql: `SELECT ${THREAD_COLUMNS.join(", ")} FROM threads WHERE deleted = 0 ORDER BY last_message_at DESC`,
        bindings: undefined,
      });
      const threads = rows.map((row) => mapRowToThread(row, THREAD_COLUMNS));
      return threads;
    },
    async getMessagesForThread(threadId: string): Promise<any[]> {
      const { rows } = await dbExec({
        sql: `SELECT id, role, content, data, created_at, updated_at, error, deleted, thread_id, clock, stream_id, message_index
         FROM messages WHERE thread_id = ? AND deleted = 0 ORDER BY message_index ASC, created_at ASC`,
        bindings: [threadId],
      });
      const messages = rows.map((row) => ({
        id: row[0],
        role: row[1],
        content: row[2],
        data: row[3] ? JSON.parse(row[3]) : null,
        created_at: Number(row[4]),
        updated_at: Number(row[5]),
        error: row[6],
        deleted: !!row[7],
        thread_id: row[8],
        clock: row[9] !== null ? Number(row[9]) : undefined,
        stream_id: row[10] || "",
        index: row[11] !== null ? Number(row[11]) : 0,
      }));
      return messages;
    },
    async updateThread(id: string, update: any) {
      await waitForSync();
      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "update_thread",
            data: {
              id,
              ...update,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
    },
    async sendMessage(params: {
      threadId: string;
      content: string;
      attachments?: any[];
      options?: { model: string; thinkingBudget?: string };
    }) {
      await waitForSync();
      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "new_message",
            data: {
              id: crypto.randomUUID(),
              threadId: params.threadId,
              data: {
                content: params.content,
                attachments: params.attachments,
              },
              role: "user",
            },
          },
          {
            type: "run_thread",
            data: {
              threadId: params.threadId,
              options: params.options,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
    },
    async updateMessage(id: string, update: { data?: any; deleted?: boolean }) {
      await waitForSync();
      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "update_message",
            data: {
              id,
              ...update,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
    },
    async retryMessage(
      messageId: string,
      options?: { name: string; thinkingBudget?: string },
    ) {
      await waitForSync();

      // First get the message to find the thread ID
      const { rows } = await dbExec({
        sql: `SELECT thread_id FROM messages WHERE id = ?`,
        bindings: [messageId],
      });

      if (!rows[0]) {
        throw new Error("Message not found");
      }

      const threadId = rows[0][0];

      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "run_thread",
            data: {
              threadId,
              messageId,
              options: options,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
    },
    async branchThread(
      threadId: string,
      messageId: string,
      newThreadId: string,
    ) {
      await waitForSync();
      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "branch_thread",
            data: {
              newThreadId,
              threadId,
              messageId,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
      return newThreadId;
    },
    async getKV(name: string): Promise<string | null> {
      const { rows } = await dbExec({
        sql: `SELECT value FROM kv WHERE name = ?`,
        bindings: [name],
      });
      return rows[0] ? rows[0][0] : null;
    },
    async setKV(name: string, value: string) {
      await waitForSync();
      const pushObj: PushEvent = {
        id: crypto.randomUUID(),
        events: [
          {
            type: "set_kv",
            data: {
              name,
              value,
            },
          },
        ],
      };
      wsSendFunction?.(JSON.stringify(pushObj));
    },
    async clear() {
      await clearAllOPFSStorage();
    },
  };
  return createSharedServicePort(api);
}
````

## File: packages/api/index.ts
````typescript
/// <reference types="./worker-configuration.d.ts" />

import { drizzle, DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";
import { DurableObject } from "cloudflare:workers";
import { migrate } from "drizzle-orm/durable-sqlite/migrator";
import migrations from "./drizzle/migrations";
// @ts-ignore
import systemPrompt from "./system-prompt.md";
import * as schema from "./schema";
import { sql } from "drizzle-orm";
import * as v from "valibot";
import { PushEvent, SyncEvent, PushEventSchema } from "./types";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

// Authless: use a single global durable object namespace and random blob IDs.

// TODO: keep server minimal and stateless; no authentication layer.

export class User extends DurableObject {
  storage: DurableObjectStorage;
  db: DrizzleSqliteDODatabase<typeof schema>;
  clock: number;
  env: Env;
  miniBucket: any;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.storage = ctx.storage;
    this.env = env;
    this.db = drizzle(this.storage, { logger: false, schema });
    ctx.blockConcurrencyWhile(async () => {
      this.clock = (await this.storage.get<number>("clock")) || 0;
      await this.#migrate();
      this.ctx.setWebSocketAutoResponse(
        new WebSocketRequestResponsePair("ping", "pong"),
      );
    });
  }

  #tick(inc = 1) {
    this.clock += inc;
    this.storage.put("clock", this.clock);
    return this.clock;
  }

  #sendEvents(events: SyncEvent[]) {
    const websockets = this.ctx.getWebSockets();
    // TODO: batch objects?
    for (const ws of websockets) {
      for (const event of events) {
        ws.send(JSON.stringify(event));
      }
    }
  }

  async #getBlob(id: string) {
    return await this.env.BLOB.get(id);
  }

  async fetch(request: Request): Promise<Response> {
    const app = new Hono<{ Bindings: Env }>();
    app.get("/pull", async (c) => {
      const clockParam = c.req.query("clock");
      const clock = typeof clockParam === "string" ? Number(clockParam) : -1;
      const [threads, messages, kvs] = await Promise.all([
        this.db.query.threads.findMany({
          where: (threads, { gt }) => gt(threads.clock, clock),
        }),
        this.db.query.messages.findMany({
          where: (messages, { gt }) => gt(messages.clock, clock),
        }),
        this.db.query.kv.findMany({
          where: (kv, { gt }) => gt(kv.clock, clock),
        }),
      ]);
      return c.json({ threads, messages, kvs });
    });
    app.post("/push", async (c) => {
      const { id: _requestId, events } = await v.parseAsync(
        PushEventSchema,
        c.req.json(),
      );
      this.#processEvents(events);
    });
    app.all("*", (c) => {
      if (c.req.header("Upgrade") === "websocket") {
        const webSocketPair = new WebSocketPair();
        const [clientWs, serverWs] = Object.values(webSocketPair);
        if (serverWs) {
          this.ctx.acceptWebSocket(serverWs);
        }
        const res = new Response(null, { status: 101, webSocket: clientWs });
        res.headers.set("sec-websocket-protocol", "nuxflare-chat");
        return res;
      }
      return c.text("", 400);
    });
    return app.fetch(request, this.env);
  }

  async #processEvents(events: PushEvent["events"]) {
    const syncEvents: SyncEvent[] = [];
    try {
      for (const event of events) {
        if (event.type === "new_thread") {
          const { id, title, parent_thread_id } = event.data;
          const clock = this.#tick();
          const thread = this.db
            .insert(schema.threads)
            .values({
              id,
              title: title || "New Thread",
              parent_thread_id,
              clock,
              deleted: false,
              pinned: false,
            })
            .returning()
            .get();
          syncEvents.push({
            type: "thread",
            clock,
            data: thread,
          });
        } else if (event.type === "update_thread") {
          const { id, title, deleted, pinned } = event.data;
          const clock = this.#tick();
          const thread = this.db
            .update(schema.threads)
            .set({
              ...(title !== undefined && {
                title,
              }),
              ...(deleted !== undefined && {
                deleted: deleted,
              }),
              ...(pinned !== undefined && {
                pinned: pinned,
              }),
              clock,
            })
            .where(sql`id = ${id}`)
            .returning()
            .get();
          if (thread) {
            syncEvents.push({
              type: "thread",
              clock,
              data: thread,
            });
          }
        } else if (event.type === "new_message") {
          const { id, data, role, threadId } = event.data;
          // TODO: do we want to let database do this with foreign keys?
          const thread = await this.db.query.threads.findFirst({
            where: (threads, { eq }) => eq(threads.id, threadId),
          });
          if (!thread) continue;

          const maxIndexResult = await this.db.query.messages.findFirst({
            where: (messages, { eq, and, eq: equal }) =>
              and(
                eq(messages.thread_id, threadId),
                equal(messages.deleted, false),
              ),
            orderBy: (messages, { desc }) => [desc(messages.index)],
          });
          const nextIndex = (maxIndexResult?.index ?? -1) + 1;

          const clock = this.#tick();
          const message = this.db
            .insert(schema.messages)
            .values({
              id,
              thread_id: threadId,
              data,
              role,
              index: nextIndex,
              clock,
              deleted: false,
            })
            .returning()
            .get();
          syncEvents.push({
            type: "message",
            clock,
            data: message,
          });
          const threadClock = this.#tick();
          const updatedThread = this.db
            .update(schema.threads)
            .set({
              last_message_at: message.updated_at,
              clock: threadClock,
            })
            .where(sql`id = ${threadId}`)
            .returning()
            .get();
          if (updatedThread) {
            syncEvents.push({
              type: "thread",
              clock: threadClock,
              data: updatedThread,
            });
          }
        } else if (event.type === "update_message") {
          const { id, data, deleted } = event.data;
          const clock = this.#tick();
          const message = this.db
            .update(schema.messages)
            .set({
              ...(data !== undefined && { data: data }),
              ...(deleted !== undefined && {
                deleted: deleted,
              }),
              clock,
            })
            .where(sql`id = ${id}`)
            .returning()
            .get();
          if (message) {
            syncEvents.push({
              type: "message",
              clock,
              data: message,
            });
            const threadClock = this.#tick();
            const updatedThread = this.db
              .update(schema.threads)
              .set({
                last_message_at: message.updated_at,
                clock: threadClock,
              })
              .where(sql`id = ${message.thread_id}`)
              .returning()
              .get();
            if (updatedThread) {
              syncEvents.push({
                type: "thread",
                clock: threadClock,
                data: updatedThread,
              });
            }
          }
        } else if (event.type === "run_thread") {
          const { threadId, messageId, options } = event.data;

          const currentThread = await this.db.query.threads.findFirst({
            where: (threads, { eq }) => eq(threads.id, threadId),
          });
          if (!currentThread) continue;
          if (currentThread.status === "streaming") continue;

          const streamId = crypto.randomUUID();

          let messages = await this.db.query.messages.findMany({
            where: (messages, { eq, and, eq: equal }) =>
              and(
                eq(messages.thread_id, threadId),
                equal(messages.deleted, false),
              ),
            orderBy: (messages, { asc }) => [
              asc(messages.index),
              asc(messages.created_at),
            ],
          });

          if (messageId) {
            const retryMessage = messages.find((msg) => msg.id === messageId);
            if (retryMessage) {
              messages = messages.filter(
                (msg) => msg.index < retryMessage.index,
              );
            }
          }

          const formattedMessages = (
            await Promise.all(
              messages.map(async (msg: any) => {
                const data = msg.data;
                const content: any[] = [];
                if (data?.content) {
                  content.push({ type: "text", text: data.content });
                }
                if (data?.attachments) {
                  for (const attachment of data.attachments) {
                    try {
                      const blob = await this.#getBlob(attachment.id);
                      const isPDF = attachment.type === "application/pdf";
                      if (blob) {
                        const attachmentObj = {
                          type: isPDF ? "file" : "image",
                          ...(isPDF
                            ? {
                                data: await blob.arrayBuffer(),
                                mimeType: attachment.type,
                              }
                            : { image: await blob.arrayBuffer() }),
                        };
                        content.push(attachmentObj);
                      }
                    } catch {}
                  }
                }
                return {
                  role: msg.role,
                  content,
                };
              }),
            )
          ).filter(
            (message) =>
              !!message.content.find((c) => c.type === "text" && c.text),
          );

          let message: any;
          let messageIdToUse: string;

          if (messageId) {
            messageIdToUse = messageId;
            const clock = this.#tick();
            message = this.db
              .update(schema.messages)
              .set({
                data: { content: "" },
                stream_id: streamId,
                clock,
              })
              .where(sql`id = ${messageId}`)
              .returning()
              .get();
          } else {
            messageIdToUse = crypto.randomUUID();
            const maxIndexResult = await this.db.query.messages.findFirst({
              where: (messages, { eq, and, eq: equal }) =>
                and(
                  eq(messages.thread_id, threadId),
                  equal(messages.deleted, false),
                ),
              orderBy: (messages, { desc }) => [desc(messages.index)],
            });
            const nextIndex = (maxIndexResult?.index ?? -1) + 1;

            const clock = this.#tick();
            message = this.db
              .insert(schema.messages)
              .values({
                id: messageIdToUse,
                thread_id: threadId,
                role: "assistant",
                data: { content: "" },
                stream_id: streamId,
                index: nextIndex,
                clock,
                deleted: false,
              })
              .returning()
              .get();
          }

          if (message) {
            syncEvents.push({
              type: "message",
              clock: message.clock,
              data: message,
            });
          }

          const threadClock = this.#tick();
          const updatedThread = this.db
            .update(schema.threads)
            .set({
              status: "streaming",
              last_message_at: message.updated_at,
              clock: threadClock,
            })
            .where(sql`id = ${threadId}`)
            .returning()
            .get();

          if (updatedThread) {
            syncEvents.push({
              type: "thread",
              clock: threadClock,
              data: updatedThread,
            });
          }
          this.#sendEvents(syncEvents);

          const streamBinding = this.env.STREAM;
          const streamStub = streamBinding.get(
            streamBinding.idFromName(streamId),
          );

          (async () => {
            try {
              const [
                openrouterApiKey,
                geminiApiKey,
                openaiApiKey,
                anthropicApiKey,
              ] = await Promise.all([
                this.db.query.kv.findFirst({
                  where: (kv, { eq }) => eq(kv.name, "openrouter_api_key"),
                }),
                this.db.query.kv.findFirst({
                  where: (kv, { eq }) => eq(kv.name, "gemini_api_key"),
                }),
                this.db.query.kv.findFirst({
                  where: (kv, { eq }) => eq(kv.name, "openai_api_key"),
                }),
                this.db.query.kv.findFirst({
                  where: (kv, { eq }) => eq(kv.name, "anthropic_api_key"),
                }),
              ]);
              const keys = {
                openrouter: openrouterApiKey?.value || "",
                gemini: geminiApiKey?.value || "",
                openai: openaiApiKey?.value || "",
                anthropic: anthropicApiKey?.value || "",
              };
              const { content, reasoning } = await streamStub.init(
                formattedMessages,
                options,
                keys,
              );
              const syncEvents: SyncEvent[] = [];
              const finalClock = this.#tick();
              const updatedMessage = this.db
                .update(schema.messages)
                .set({
                  data: { content, reasoning, modelOptions: options },
                  stream_id: null,
                  error: null,
                  clock: finalClock,
                })
                .where(sql`id = ${messageIdToUse}`)
                .returning()
                .get();
              if (updatedMessage) {
                syncEvents.push({
                  type: "message",
                  clock: finalClock,
                  data: updatedMessage,
                });
              }

              const finalThreadClock = this.#tick();
              const finalThread = this.db
                .update(schema.threads)
                .set({
                  status: "ready",
                  clock: finalThreadClock,
                })
                .where(sql`id = ${threadId}`)
                .returning()
                .get();
              if (finalThread) {
                syncEvents.push({
                  type: "thread",
                  clock: finalThreadClock,
                  data: finalThread,
                });
              }
              this.#sendEvents(syncEvents);
            } catch (error) {
              const syncEvents: SyncEvent[] = [];

              let partialContent = "";
              let partialReasoning = "";
              try {
                const { content, reasoning } =
                  await streamStub.getPartialResponse();
                partialContent = content;
                partialReasoning = reasoning;
              } catch (e) {
                console.error("Error getting partial response:", e);
              }

              let errorMsg = "An error occurred while generating the message";
              let errorType = "StreamError";

              if (error instanceof Error) {
                if (error.message.includes("API key")) {
                  errorMsg = error.message;
                  errorType = "APIKeyError";
                } else if (
                  error.message.includes("rate limit") ||
                  error.message.includes("quota")
                ) {
                  errorMsg = "Rate limit exceeded. Please try again later.";
                  errorType = "RateLimitError";
                } else if (error.message.includes("timeout")) {
                  errorMsg = "Request timed out. Please try again.";
                  errorType = "TimeoutError";
                } else if (
                  error.message.includes("network") ||
                  error.message.includes("connection")
                ) {
                  errorMsg =
                    "Network error. Please check your connection and try again.";
                  errorType = "NetworkError";
                } else {
                  errorMsg = `Generation failed: ${error.message}`;
                }
              }

              const errorClock = this.#tick();
              const errorMessage = this.db
                .update(schema.messages)
                .set({
                  data: {
                    content: partialContent,
                    reasoning: partialReasoning,
                    modelOptions: options,
                  },
                  error: JSON.stringify({
                    type: errorType,
                    message: errorMsg,
                  }),
                  stream_id: null,
                  clock: errorClock,
                })
                .where(sql`id = ${messageIdToUse}`)
                .returning()
                .get();
              if (errorMessage) {
                syncEvents.push({
                  type: "message",
                  clock: errorClock,
                  data: errorMessage,
                });
              }

              const finalThreadClock = this.#tick();
              const finalThread = this.db
                .update(schema.threads)
                .set({
                  status: "ready",
                  clock: finalThreadClock,
                })
                .where(sql`id = ${threadId}`)
                .returning()
                .get();
              if (finalThread) {
                syncEvents.push({
                  type: "thread",
                  clock: finalThreadClock,
                  data: finalThread,
                });
              }

              this.#sendEvents(syncEvents);
            }
          })();
        } else if (event.type === "stop_thread") {
          // TODO: Implement stop_thread logic
        } else if (event.type === "branch_thread") {
          const { threadId, messageId, newThreadId } = event.data;

          const sourceThread = await this.db.query.threads.findFirst({
            where: (threads, { eq }) => eq(threads.id, threadId),
          });
          if (!sourceThread) continue;
          const branchMessage = await this.db.query.messages.findFirst({
            where: (messages, { eq }) => eq(messages.id, messageId),
          });
          if (!branchMessage) continue;

          const messagesToCopy = await this.db.query.messages.findMany({
            where: (messages, { eq, and, lte, eq: equal }) =>
              and(
                eq(messages.thread_id, threadId),
                lte(messages.index, branchMessage.index),
                equal(messages.deleted, false),
              ),
            orderBy: (messages, { asc }) => [
              asc(messages.index),
              asc(messages.created_at),
            ],
          });

          const threadClock = this.#tick();
          const newThread = this.db
            .insert(schema.threads)
            .values({
              id: newThreadId,
              title: sourceThread.title,
              parent_thread_id: threadId,
              clock: threadClock,
              deleted: false,
              pinned: false,
            })
            .returning()
            .get();

          syncEvents.push({
            type: "thread",
            clock: threadClock,
            data: newThread,
          });

          for (const message of messagesToCopy) {
            const newMessageId = crypto.randomUUID();
            const messageClock = this.#tick();
            const copiedMessage = this.db
              .insert(schema.messages)
              .values({
                id: newMessageId,
                thread_id: newThreadId,
                data: message.data,
                role: message.role,
                index: message.index,
                clock: messageClock,
                deleted: false,
                created_at: message.created_at,
                error: message.error,
              })
              .returning()
              .get();

            syncEvents.push({
              type: "message",
              clock: messageClock,
              data: copiedMessage,
            });
          }
          if (messagesToCopy.length > 0) {
            const lastMessage = messagesToCopy[messagesToCopy.length - 1];
            const finalThreadClock = this.#tick();
            const updatedNewThread = this.db
              .update(schema.threads)
              .set({
                last_message_at: lastMessage.updated_at,
                clock: finalThreadClock,
              })
              .where(sql`id = ${newThreadId}`)
              .returning()
              .get();
            if (updatedNewThread) {
              syncEvents.push({
                type: "thread",
                clock: finalThreadClock,
                data: updatedNewThread,
              });
            }
          }
        } else if (event.type === "set_kv") {
          const { name, value } = event.data;
          const clock = this.#tick();
          const kv = this.db
            .insert(schema.kv)
            .values({
              id: crypto.randomUUID(),
              name,
              value,
              clock,
            })
            .onConflictDoUpdate({
              target: schema.kv.name,
              set: {
                value,
                clock,
                updated_at: sql`(unixepoch())`,
              },
            })
            .returning()
            .get();
          syncEvents.push({
            type: "kv",
            clock,
            data: kv,
          });
        }
      }
    } finally {
      // TODO: compression?
      if (syncEvents.length > 0) {
        this.#sendEvents(syncEvents);
      }
    }
  }

  async webSocketMessage(_ws: WebSocket, msgBuffer: ArrayBuffer | string) {
    const msgString = msgBuffer.toString();
    try {
      const msgObj = JSON.parse(msgString);
      const { id: _requestId, events } = await v.parseAsync(
        PushEventSchema,
        msgObj,
      );
      this.#processEvents(events);
    } catch (err) {
      console.error("Message processing error:", err);
    }
  }

  async #migrate() {
    await migrate(this.db, migrations);
  }
}

export class Stream extends DurableObject {
  ctx: DurableObjectState;
  env: Env;
  content: string;
  reasoning: string;
  done: boolean;
  contentStreams: any[];
  reasoningStreams: any[];
  initialized: boolean;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.ctx = ctx;
    this.env = env;
    this.content = "";
    this.reasoning = "";
    this.contentStreams = [];
    this.reasoningStreams = [];
    this.done = false;
    this.initialized = false;
  }

  async init(messages: any[], options: any = {}, keys: Record<string, string>) {
    this.initialized = true;
    this.content = "";
    this.reasoning = "";
    try {
      const getModel = (name: string) => {
        // use base model name for provider specific api keys
        const baseModelName = name.match(/.*\/([^:]*):?.*/)?.[1] || "";
        if (name.startsWith("google/") && keys.gemini) {
          return createGoogleGenerativeAI({ apiKey: keys.gemini })(
            baseModelName,
            {
              useSearchGrounding: !!options.webSearch,
            },
          );
        }
        if (name.startsWith("openai/") && keys.openai) {
          return createOpenAI({ apiKey: keys.openai })(baseModelName);
        }
        if (name.startsWith("anthropic/") && keys.anthropic) {
          return createAnthropic({ apiKey: keys.anthropic })(baseModelName);
        }
        if (!keys.openrouter) {
          throw new Error(
            `OpenRouter API key is required to use model "${name}". Please set your OpenRouter API key in settings to use this model.`,
          );
        }
        return createOpenRouter({ apiKey: keys.openrouter })(options.name);
      };

      const streamConfig: any = {
        model: getModel(options.name),
        messages,
        system: systemPrompt.replaceAll("{{time}}", new Date().toISOString()),
        providerOptions: {
          // TODO: set thinking budget and other options for all providers
          google: {
            thinkingConfig: {
              includeThoughts: true,
            },
          },
          openrouter: {
            reasoning: {
              effort: options.thinkingBudget || "low",
              exclude: false,
            },
          },
        },
        onError: (error: any) => {
          for (const controller of [
            this.contentStreams,
            this.reasoningStreams,
          ].flat()) {
            try {
              controller.close();
            } catch (e) {
              console.error("Error closing stream", e);
            }
          }
          this.contentStreams = [];
          this.reasoningStreams = [];
          this.done = true;
          throw error;
        },
      };
      const res = streamText(streamConfig);
      const { fullStream } = res;
      for await (const part of fullStream) {
        if (part.type === "reasoning") {
          this.reasoning += part.textDelta;
          for (const controller of this.reasoningStreams) {
            try {
              controller.enqueue(part.textDelta);
            } catch {}
          }
        } else if (part.type === "text-delta") {
          this.content += part.textDelta;
          for (const controller of this.contentStreams) {
            try {
              controller.enqueue(part.textDelta);
            } catch {}
          }
        }
      }
      for (const controller of [
        this.contentStreams,
        this.reasoningStreams,
      ].flat()) {
        try {
          controller.close();
        } catch {}
      }
      this.contentStreams = [];
      this.reasoningStreams = [];
      this.done = true;
    } catch (error) {
      console.log("stream error", error);
      for (const controller of [
        this.contentStreams,
        this.reasoningStreams,
      ].flat()) {
        try {
          controller.error(error);
        } catch {}
      }
      this.contentStreams = [];
      this.reasoningStreams = [];
      this.done = true;
      throw error;
    }
    // TODO: should we return response like this or have the DO do a async callback.
    return {
      content: this.content,
      reasoning: this.reasoning,
    };
  }

  async getPartialResponse() {
    return {
      content: this.content,
      reasoning: this.reasoning,
    };
  }

  async fetch(request: Request) {
    if (!this.initialized) return new Response(null, { status: 404 });
    const isReasoning = new URL(request.url).searchParams.get("reasoning");
    try {
      if (this.done) {
        return new Response(isReasoning ? this.reasoning : this.content);
      }
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      const encoder = new TextEncoder();
      const response = isReasoning ? this.reasoning : this.content;
      if (response) {
        writer.write(encoder.encode(response));
      }
      if (this.done) {
        writer.close();
      } else {
        const controller = {
          enqueue: async (chunk: string) => {
            await writer.write(encoder.encode(chunk));
          },
          close: () => writer.close(),
          error: (err: any) => writer.abort(err),
        };
        if (isReasoning) this.reasoningStreams.push(controller);
        else this.contentStreams.push(controller);
        request.signal.addEventListener("abort", () => {
          const array = isReasoning
            ? this.reasoningStreams
            : this.contentStreams;
          const index = array.indexOf(controller);
          if (index >= 0) {
            array.splice(index, 1);
          }
        });
      }
      return new Response(readable, {
        headers: {
          "Content-Type": "text/event-stream",
        },
      });
    } catch (error) {
      console.error("Stream fetch error:", error);
      return new Response("An error occurred", { status: 500 });
    }
  }
}

const app = new Hono<{ Bindings: Env }>();
app.use(cors());
app.get("/stream/:id", async (c) => {
  const binding = c.env.STREAM;
  const stub = binding.get(binding.idFromName(c.req.param("id")));
  const res = await stub.fetch(c.req.raw);
  return res;
});
app.put("/blob", async (c) => {
  const id = crypto.randomUUID();
  const contentType = c.req.header("content-type");
  if (!contentType) {
    return c.text("content-type header is required", 400);
  }
  const validTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];
  if (!validTypes.includes(contentType)) {
    return c.text(`Unsupported file type: ${contentType}`, 400);
  }
  const contentLength = c.req.header("content-length");
  if (!contentLength || Number(contentLength) > 10 * 1024 * 1024) {
    return c.text("File size must be less than 10MB", 400);
  }
  await c.env.BLOB.put(id, await c.req.arrayBuffer());
  return c.json({ id }, 200);
});
app.all("*", async (c) => {
  const binding = c.env.USER;
  const stub = binding.get(binding.idFromName("global"));
  return await stub.fetch(c.req.raw);
});
export default app;
````
