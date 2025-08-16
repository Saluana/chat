---
artifact_id: c1f4d0c0-8f2e-4f1e-9c96-61f2a9fe7e8f
---

# requirements.md

## Introduction

Add an OpenRouter model catalog experience so users can search models, curate their personal picker list, and use those models in chat. Integrate seamlessly with existing OpenRouter-first auth and chat flow.

## User Roles

- User: browses and filters models, selects favorites for quick access, and uses them in chat.

## Functional Requirements

1. Model Catalog Browsing

- User Story: As a user, I want to browse and search OpenRouter models so I can find what I need.
- Acceptance Criteria:
  - WHEN the user opens Models in Settings THEN the app SHALL fetch https://openrouter.ai/api/v1/models (with Authorization header if available) and cache the results.
  - The catalog SHALL support search (by name/description/id) and filters (e.g., supports images, context length min, reasoning capability if flagged, pricing presence, category when available).
  - The list SHALL show name, provider slug/id, context length, simple price chips, and badges for capabilities.

2. Select Models for Dropdown

- User Story: As a user, I want to pick favorite models to appear in the chat model dropdown.
- Acceptance Criteria:
  - WHEN the user checks/selects models in the catalog THEN the selection SHALL be persisted (localStorage for instant UX, and KV key `openrouter_selected_models` for sync).
  - WHEN the user returns to chat THEN the model dropdown SHALL list only the selected models (fallback to a sensible default if none).
  - The selection SHALL survive refresh and multi-tab usage.

3. Use Selected Models in Chat

- User Story: As a user, I want to run with my selected model.
- Acceptance Criteria:
  - WHEN the user picks a model in the dropdown THEN run_thread SHALL send options.name = <model id> to the server OpenRouter provider.
  - IF the selected model supports reasoning or web search, the UI SHALL enable those toggles; otherwise they SHALL be disabled/grayed out.

4. Refresh and Fallbacks

- User Story: As a user, I want the models list to remain current and not block my session if offline.
- Acceptance Criteria:
  - The app SHALL cache the last successful model list to use offline.
  - A manual “Refresh” button SHALL re-fetch models and update the cache.
  - IF fetching fails THEN the app SHALL show a toast and fall back to cached or minimal built-in list.

5. Error Handling & Performance

- User Story: As a user, I want responsive UI and clear errors.
- Acceptance Criteria:
  - Loading states SHALL be displayed during fetch; empty/error states SHALL be rendered when appropriate.
  - Fetching and filtering SHALL happen within ~150ms perceived delay on typical networks; pagination or virtualization SHALL be used for long lists.

## Non-Functional Requirements

- Security: Use HTTPS; pass Authorization: Bearer <OpenRouter key> when present (do not log).
- Performance: Cache model list; debounce client-side search.
- Accessibility: Keyboard navigation, ARIA labels on filters/buttons.
- Consistency: Use Nuxt UI components to match the app style.

## Integration Requirements

- OpenRouter Models API: GET https://openrouter.ai/api/v1/models with optional query params.
- Persistence: localStorage + KV key `openrouter_selected_models`.
