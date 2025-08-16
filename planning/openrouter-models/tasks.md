---
artifact_id: 8a7d5b36-6a0e-4e4e-8a2c-6f07a64c5a41
---

# tasks.md

## 1. Models API client

- [x] Create ModelsService to GET https://openrouter.ai/api/v1/models (attach Authorization if key exists).
  - Requirements: 1
- [x] Map API response to OpenRouterModel; cache in localStorage with fetchedAt.
  - Requirements: 4
- [x] Add simple filter helpers (by text, modalities, context length, parameters, price buckets).
  - Requirements: 1

## 2. Extend Pinia Model Store

- [x] Add catalog state, selectedModelIds, getters, and actions: fetchModels(), filterModels(), toggleSelected(), saveSelection(), loadSelection().
  - Requirements: 1, 2
- [x] Persist selectedModelIds to localStorage + KV (`openrouter_selected_models`).
  - Requirements: 2

## 3. Settings UI: Model Catalog

- [x] Add a new Settings panel: search bar, filter chips, Refresh button.
  - Requirements: 1, 4
- [x] Render model cards with select checkbox/star, key badges (image/text), context length and price. Virtualize list if > 200 items.
  - Requirements: 1
- [x] Save selection to store (localStorage + KV) and toast success.
  - Requirements: 2, 5

## 4. Chat Dropdown Integration

- [ ] Populate ChatPrompt model dropdown from selectedModels; fallback to curated default if empty.
  - Requirements: 2, 3
- [ ] On selection change, store `currentModelId` in store and use it for run_thread options.name.
  - Requirements: 3
- [ ] Disable/enable reasoning/web search toggles based on selected model capabilities (supported_parameters/modalities).
  - Requirements: 3

## 5. Caching & Refresh

- [ ] Use cached catalog if fetch fails; show toast and allow Retry.
  - Requirements: 4, 5
- [ ] Add manual Refresh to re-fetch models and update cache.
  - Requirements: 4

## 6. Error Handling & Perf

- [ ] Add loading/empty/error states; debounce search; paginate or virtualize.
  - Requirements: 5

## 7. Tests

- [ ] Unit: mapping and filter helpers; selection persistence.
  - Requirements: 1, 2
- [ ] Integration: selection drives dropdown; run_thread includes selected id; toggles reflect capabilities.
  - Requirements: 2, 3
- [ ] E2E: login → browse models → select → send → stream.
  - Requirements: 1, 2, 3

## 8. Docs

- [ ] README: Add short guide to using the Model Catalog and picker.
  - Requirements: 1, 2, 3
