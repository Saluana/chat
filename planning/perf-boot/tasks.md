---
artifact_id: 0b2f7c3a-7c10-4c3a-9c9b-7b1a3c3d6c42
---

# tasks.md

## 1. Instrument boot and define budgets

- [x] Add client plugin `plugins/perf.client.ts` with performance marks: app_start (immediate), shell_painted (after mount/nextTick), first_click_ready (set after first interaction hook), heavy_deps_loaded (after markdown/db workers ready). Requirements: 5.
- [x] Add a simple console reporter in dev only. Requirements: 5.
- [x] Create docs snippet in README for interpreting marks. Requirements: 5.

## 2. Remove render-blocking KaTeX CSS

- [x] Replace nuxt.config.ts head.link stylesheet with: preconnect + preload + on-demand injection script, or media="print" swap technique. Requirements: 3.
- [x] Verify math renders post-load in AssistantMessage markdown flow. Requirements: 6.

## 3. Defer Markdown pipeline

- [x] Delete warmup call in `app/app.vue` that calls `processMarkdownChunk("# test")`. Requirements: 2.
- [x] Create `utils/markdown-lazy.ts` that dynamically imports unified stack; export `render()` with internal singleton. Requirements: 2.
- [x] Update `MarkdownRenderer.vue` and `MarkdownChunkRenderer.client.vue` (if present) to call lazy renderer; show plain text fallback until ready. Requirements: 1,2,6.
- [x] Optional: move to a Web Worker if chunk size > threshold (phase 2). Requirements: 2.

## 4. Progressive hydration of Sidebar/ThreadList

- [ ] Wrap `Sidebar.vue` in a lightweight shell that renders header + New Chat instantly; lazy-load the thread lists using `defineAsyncComponent` or `ClientOnly` with `when-visible` sentinel. Requirements: 1,4.
- [x] Defer expensive icon sets and popovers until hover/focus (use dynamic import for popover content). Requirements: 4.

## 5. Lazy wa-sqlite/db initialization

- [x] Create `utils/db-facade.ts` to gate dynamic import('wa-sqlite'); export `init()` and `getThreadsPreview()` returning cached preview from localStorage on first call. Requirements: 2.
- [x] Hydrate preview cache whenever sidebar successfully loads threads; write to localStorage for future fast boots. Requirements: 2.

## 6. Vite/Nuxt build tuning

- [ ] Re-evaluate `transpile`/`optimizeDeps` for wa-sqlite and estree-walker to minimize dev-time bundling overhead; only transpile if necessary. Requirements: 1,2.
- [ ] Enable route-level code splitting where possible (ensure pages/[[id]].vue is standalone). Requirements: 1.

## 7. QA and perf verification

- [ ] Add a minimal Lighthouse CI script or manual instructions to measure TTI/FCP/BTI locally. Requirements: 5.
- [ ] Validate p95 budgets on cold and warm loads; capture numbers in a short perf report in PR. Requirements: 1,5.

## 8. Safeguards and regressions

- [ ] Add unit tests for lazy loaders; smoke test markdown with math and code blocks. Requirements: 6.
- [ ] Add fallback for `requestIdleCallback` using `setTimeout`. Requirements: 2.

## Notes / Phase 2 (optional)

- Worker-ize markdown processing for long documents, and stream tokens directly into renderer.
- Cache KaTeX CSS integrity-verified locally and ship with app to remove third-party fetch.
