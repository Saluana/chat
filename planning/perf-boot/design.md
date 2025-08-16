---
artifact_id: e2b6dfe2-a19f-41a9-86df-4f0b7c3c4a8b
---

# design.md

## Overview

We will restructure the boot path so the interactive shell renders immediately and heavyweight features load behind the scenes. Key sources of startup cost from the repo:

- Markdown pipeline (unified + rehype-shiki + katex) created at app mount via `processMarkdownChunk` warmup.
- Global KaTeX CSS linked in `nuxt.config.ts` as render-blocking `<link rel="stylesheet">`.
- wa-sqlite package (and potential OPFS setup) is marked for transpile and excluded from optimizeDeps, increasing cold-start bundling/parse.
- Rich sidebar (icons, popovers, tooltips, store init) hydrates on first paint.

## Architecture

```mermaid
flowchart TD
  A[Initial HTML Shell] --> B[Minimal Hydration: Navbar + Input]
  B -->|idle| C[Preload non-blocking CSS (KaTeX)]
  B -->|user-visible| D[Lazy hydrate Sidebar + ThreadList]
  B -->|first markdown| E[Dynamic import Markdown worker]
  B -->|first DB use| F[Dynamic import wa-sqlite + DB worker]
```

### Core Changes

1. Defer Markdown initialization

- Replace synchronous `processMarkdownChunk` warmup in `app.vue` with lazy loader.
- Wrap unified pipeline inside an on-demand module/worker created only when a message is rendered.
- Use a small client component to stream markdown chunks and show plain text fallback until highlighter is ready.

2. Non-blocking KaTeX

- Swap render-blocking stylesheet with preload + media swap or programmatic injection on first math use.
- Add `<link rel="preconnect" ...>` to CDN to reduce handshake cost.

3. Progressive hydration for Sidebar/ThreadList

- Wrap Sidebar and non-critical sections in `<ClientOnly>` or component-level `lazy-hydrate` pattern (Nuxt islands), hydrate on visibility or after first input.
- Keep actionable minimal header controls interactive immediately.

4. Optimize wa-sqlite imports

- Ensure no eager import on boot; dynamic import in code paths that actually touch the DB.
- Use a small DB facade that returns cached data for the first paint and backfills from the worker.

5. Instrumentation

- Add performance marks: `app_start` (plugin), `shell_painted` (after first paint), `first_click_ready` (nextTick in app shell), `heavy_deps_loaded` (after markdown + db workers ready).

## Components and Interfaces

### MarkdownService (lazy)

```ts
// contracts
export interface MarkdownRenderRequest {
  text: string;
}
export interface MarkdownRenderResponse {
  html: string;
}

export interface MarkdownService {
  ready(): Promise<void>;
  render(text: string): Promise<string>;
}
```

- Implementation: a thin async module that dynamically imports `unified`, `remark-*`, `rehype-*` and caches a processor instance. Optionally run in a Web Worker for large content.

### DBFacade (lazy)

```ts
export interface DBFacade {
  init(): Promise<void>; // idempotent
  getThreadsPreview(): Promise<ThreadPreview[]>; // small, cached in memory/localStorage
}
```

- Implementation: `import('wa-sqlite')` only when needed. On first load, use a cached serialized preview (localStorage) to render immediately; update asynchronously when DB is ready.

## Data Models

- No schema changes.
- Add `localStorage` keys:
  - `ui_threads_preview_v1`: serialized minimal thread metadata for instant sidebar render.
  - `perf_boot_marks_v1`: last-session perf marks (for QA only; disabled in production builds if desired).

## Error Handling

- Lazy loaders must fail soft: fall back to plain text markdown and empty history placeholders.
- If dynamic import fails, show toast once, debounce retries.

## Testing Strategy

- Unit
  - MarkdownService lazy loader resolves and caches instance.
  - DBFacade init is idempotent; preview caching works.
- Integration
  - App boots with shell interactive even if workers fail to load.
  - Sidebar hydrates on visibility and updates with real data later.
- E2E
  - Measure first-input-delay and TTI with Lighthouse CI script; validate budgets.

## Implementation Notes

- Prefer `defineAsyncComponent` or dynamic import in setup blocks for heavy components.
- Use `requestIdleCallback` with a `setTimeout` fallback for Safari.
- Avoid adding global polyfills in `00-polyfills.client.ts` that increase bundle.
