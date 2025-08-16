---
artifact_id: 1f8c33b7-24dc-4f26-a4a5-3a3f1a9f154d
---

# requirements.md

## Introduction

This plan hardens and optimizes the Nuxflare Chat UI, removes legacy provider paths, and makes OpenRouter the primary authentication and model gateway. It also introduces a secure private sync key (SPSK) for client-to-Durable Object sync, ensuring only authorized clients can push/pull and run threads. Goals:

- Bug-free, fast, and resilient chat UX.
- PKCE OAuth with OpenRouter (plus manual key paste fallback).
- Strong sync/auth boundary via SPSK.
- Observability and tests.

## User Roles

- User: end-user using chat, connects to OpenRouter, sends messages, manages key.
- System: Durable Object (backend) enforcing key presence and SPSK.

## Functional Requirements

1. OpenRouter Authentication (PKCE + fallback)

- User Story: As a user, I want to connect my OpenRouter account with one click using OAuth PKCE so I can use my own key safely.
- Acceptance Criteria:
  - WHEN the user clicks “Login with OpenRouter” THEN the app SHALL redirect to openrouter.ai/auth with callback_url and S256 challenge.
  - WHEN redirected back with code/state THEN the app SHALL exchange code at https://openrouter.ai/api/v1/auth/keys, and SHALL store the returned key locally; it MAY also sync it to KV for multi-tab use.
  - IF code_verifier or state is invalid THEN the app SHALL show a clear error and not store any key.
  - IF the user pastes a key manually THEN the app SHALL validate minimal format and store locally.

2. Key Presence Required for Sends

- User Story: As a user, I want requests to fail fast if my OpenRouter key is missing so I know to connect first.
- Acceptance Criteria:
  - WHEN sending a message (new thread or existing) THEN the client SHALL include options.openrouterApiKey.
  - IF key is absent THEN the UI SHALL prompt to connect and block the send.

3. Secure Private Sync Key (SPSK)

- User Story: As a user, I want my client to use a private sync key so only my authorized device can sync and run threads.
- Acceptance Criteria:
  - WHEN the chat app first loads with an OpenRouter key THEN the client SHALL mint or retrieve an SPSK and set it as the sync token via setAuthInfo.
  - WHEN connecting via WebSocket THEN the server SHALL validate the SPSK before accepting /push or /pull.
  - SPSK SHALL be device-scoped, rotatable, and have an expiration.
  - IF SPSK is invalid/expired THEN the app SHALL attempt automatic rotation; otherwise prompt user to re-connect.

4. New Thread UX from Home

- User Story: As a user on the home page, I want sending a message to create a new thread, navigate to it, and start streaming.
- Acceptance Criteria:
  - WHEN the user sends from home THEN the app SHALL emit new_thread → new_message → run_thread in that order.
  - The UI SHALL navigate to /:threadId only after the thread exists locally.

5. Streaming and Attachments

- User Story: As a user, I want assistant responses to stream, and I can attach files/images that the model can use.
- Acceptance Criteria:
  - WHEN run_thread starts THEN the assistant placeholder message SHALL appear and stream until done or error.
  - WHEN attachments are added THEN the server SHALL include attachment blobs in formatted content for OpenRouter (image/file handling).

6. Connection Indicator & Settings

- User Story: As a user, I want to see whether I’m connected to OpenRouter and manage my key.
- Acceptance Criteria:
  - WHEN key exists locally or in KV THEN the indicator SHALL turn green; otherwise red.
  - The Settings page SHALL show login, paste key, and logout actions.

7. Error Handling & UX Feedback

- User Story: As a user, I want clear errors for key missing, rate limits, timeouts, and model errors.
- Acceptance Criteria:
  - IF the model or network fails THEN the assistant message SHALL capture error details; a toast SHALL show a concise message.
  - IF the SPSK fails validation THEN a toast SHALL prompt to reconnect.

8. Search and History

- User Story: As a user, I want to search my threads and see recent history clearly grouped.
- Acceptance Criteria:
  - WHEN I search THEN results SHALL return threads by recency and relevance.
  - History SHALL be grouped (today, yesterday, last 7/30 days, older) and respect pinned/deleted flags.

## Non-Functional Requirements

- Performance: initial load < 2s on typical network; streaming latency minimal (< 300ms overhead).
- Reliability: websockets reconnect automatically; offline cache via OPFS persists threads/messages.
- Security: SPSK not exfiltrated; OpenRouter key stays client-side; HTTPS enforced in production.
- Accessibility: keyboard navigation and ARIA attributes for major controls.
- Observability: basic logs for auth, sync connects, errors.

## Integration Requirements

- OpenRouter: PKCE OAuth per docs; direct exchange at /api/v1/auth/keys; Bearer usage for completions.
- Cloudflare DO + Hono: endpoints /pull, /push, /stream/:id; SPSK verification on WS connects and push/pull.
