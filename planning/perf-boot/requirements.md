---
artifact_id: 5b6c2b7a-2b5c-4c8b-8b0f-4f4a2b7d9e12
---

# requirements.md

## Introduction

Goal: Make the app feel instant. Reduce time-to-interactive (TTI) from ~4s to sub-second on repeat visits and ≤1.5s p95 on cold loads by deferring heavy modules (Markdown/Shiki, wa-sqlite, workers), trimming render-blocking resources (KaTeX CSS), and adopting lazy hydration for non-critical UI.

Scope: Frontend (Nuxt 3) boot path and first-interaction readiness. No visual or feature regressions.

## User Roles

- Visitor: lands on the app and expects immediate click/typing responsiveness.
- Returning user: opens the app frequently and expects near-instant interactivity.

## Functional Requirements

1. Instant-feel initial render
   - User Story: As a visitor, I want the shell to render and be clickable in under a second.
   - Acceptance Criteria:
     - WHEN the app loads on a typical desktop (M2, Safari/Chrome) THEN the first button click SHALL be responsive within 500–800ms on repeat visits and ≤1.5s p95 on cold loads.
     - Core controls (New Chat, Model dropdown placeholder, input box) SHALL be operable immediately, even if background features are still loading.

2. Lazy-load heavy subsystems
   - User Story: As a visitor, I want non-essential code to load after I can interact.
   - Acceptance Criteria:
     - Markdown rendering pipeline (unified + rehype-shiki + katex) SHALL not be initialized during page mount; it SHALL be loaded on demand (first markdown render) or in an idle task.
     - wa-sqlite and any OPFS/DB worker SHALL not block first interaction; it SHALL initialize lazily when the sidebar/threads need it or via requestIdleCallback.
     - Web workers (markdown/db) SHALL be created only when first used.

3. Remove render-blocking resources
   - User Story: As a visitor, I don’t want third-party CSS/JS to delay interactivity.
   - Acceptance Criteria:
     - KaTeX stylesheet SHALL not block initial paint; it SHALL be preconnected and loaded with a non-blocking strategy (preload + apply, media swap, or on-demand injection).
     - Fonts SHALL not block interactivity; default system fonts acceptable during FOUT.

4. Progressive UI hydration
   - User Story: As a visitor, I want the above-the-fold shell to hydrate fast while secondary widgets hydrate later.
   - Acceptance Criteria:
     - Sidebar, thread list, and settings modal content SHALL be lazily hydrated (when visible or after first input).
     - Expensive icon packs/badges SHALL be lazy where feasible.

5. Performance instrumentation and budgets
   - User Story: As a developer, I want hard numbers and guardrails.
   - Acceptance Criteria:
     - The app SHALL emit Performance Marks for: app_start, shell_painted, first_click_ready, heavy_deps_loaded.
     - A lighthouse/Pagespeed budget SHALL be defined: TTI ≤ 1500ms p95 cold, JS < 250KB (gz) on landing route, main thread blocking time < 200ms p95.

6. No regressions in features or accessibility
   - User Story: As a user, I want the same functionality.
   - Acceptance Criteria:
     - All chat features (streaming, reasoning, model selection) SHALL work unchanged.
     - A11y: keyboard and ARIA behaviors SHALL remain intact for moved/lazy components.

## Non-Functional Requirements

- Reliability: Lazy modules must handle rapid user actions and offline gracefully.
- Security: No change to auth; do not expose secrets in performance logs.
- Compatibility: Works on evergreen browsers; degrades gracefully on older Safari (no hard reliance on requestIdleCallback without fallback).

## Integration Requirements

- Nuxt 3 build/runtime only; no backend changes required for boot perf.
- Keep existing @nuxt/ui and @vueuse; avoid global polyfills that increase bundle.
