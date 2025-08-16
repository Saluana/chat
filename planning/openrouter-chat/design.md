---
artifact_id: 9a1f9d1c-9d37-4f50-8e39-4b52b5b9f3da
---

# design.md

## Overview

Nuxflare Chat is a Nuxt 3 app with a Cloudflare Durable Object (DO) backend using Hono and Drizzle (durable-sqlite). The frontend stores a local mirror (OPFS via wa-sqlite). Sync occurs over a WebSocket to the DO. We will:

- Make OpenRouter the primary auth via PKCE (S256) with direct key exchange.
- Require the OpenRouter key for all model runs.
- Introduce a Secure Private Sync Key (SPSK) per device to authenticate the sync channel.
- Harden the new-thread flow and streaming UX.

## Architecture

```mermaid
flowchart TD
  A[User clicks Login with OpenRouter] --> B[openrouter.ai/auth?callback_url&code_challenge=S256]
  B --> C[Callback /openrouter-callback]
  C --> D[POST https://openrouter.ai/api/v1/auth/keys\n{ code, code_verifier, S256 }]
  D --> E[Key stored in localStorage + KV]
  E --> F[Mint SPSK]
  F --> G[setAuthInfo(apiUrl, SPSK)]
  G --> H[WebSocket connect to DO]
  H --> I[push/pull events]
  I --> J{run_thread}
  J --> K[Stream DO]
  K --> L[OpenRouter provider]
  L --> K
  K --> M[Sync back message updates]
  M --> N[OPFS local DB + UI]
```

## Core Components

- Frontend (Nuxt 3)
  - useOpenRouterAuth: PKCE S256; direct key exchange; state/verifier handling.
  - Sidebar/Settings: connection indicator, manage key, logout.
  - Chat page [[id]].vue: new_thread → new_message → run_thread; wait for local thread presence; streaming list; attachments upload.
  - sync-service: WebSocket client, setAuthInfo(SPSK), push/pull, local DB apply.
- Backend (Cloudflare DO + Hono)
  - DO: endpoints `/pull`, `/push`, `/stream/:id`; WebSocket upgrade handler; run_thread → Stream DO → OpenRouter.
  - SPSK verification on WS connect and /push.

## SPSK (Secure Private Sync Key)

- Purpose: Authenticate each client device for sync (push/pull and run_thread).
- Model: DO mints a token per device; token is opaque to client; DO stores a hash + metadata.
- Transport: Provided as the second WebSocket subprotocol (replacing the current "public") and sent in the `Authentication` header for HTTP pulls.
- Rotation: Time-based (e.g., 7 days) and manual revoke.

### Interfaces (TypeScript)

```ts
// Token minting
interface MintSpskRequest {
  deviceName?: string;
}
interface MintSpskResponse {
  token: string; // opaque to client
  expiresAt: number; // unix seconds
}

// On client
type SyncAuthToken = string; // SPSK

// Push/Run events already exist; extend model options
interface ModelRunOptions {
  name?: string;
  thinkingBudget?: "low" | "medium" | "high";
  webSearch?: boolean;
  openrouterApiKey: string; // required
}
```

### DO Changes

- Add `/auth/spsk/mint` (POST) to create a token; return `{ token, expiresAt }`.
- Store token hash and metadata in a new table.
- Verify token on:
  - WebSocket connect: check subprotocol includes valid token.
  - `/pull` and `/push`: check `Authentication: Bearer <token>`.

### Data Models (Drizzle durable-sqlite)

```ts
// New table for SPSK
export const client_tokens = sqliteTable("client_tokens", {
  id: text("id").primaryKey(),
  token_hash: text("token_hash").notNull(),
  device_name: text("device_name"),
  created_at: int("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  expires_at: int("expires_at").notNull(),
  revoked: int("revoked", { mode: "boolean" }).notNull().default(false),
  clock: int("clock").notNull(),
});
```

- Existing tables `threads`, `messages`, `kv` remain; we continue storing `openrouter_api_key` in `kv` for server-side runs as a fallback, but the client will always send `openrouterApiKey`.

## Error Handling

- Client:
  - Central toast helper for: missing key, SPSK invalid, network failures, timeouts, rate limits.
  - Stream UI shows partial text and an error badge on failure.
- Server/DO:
  - Validate SPSK; return 401 on invalid/expired; log context.
  - Validate presence of `openrouterApiKey` for run_thread; return 400.

## Testing Strategy

- Unit
  - PKCE helpers (sha256/base64url), options merging, storage helpers.
- Integration
  - SPSK mint + WS connect with valid/invalid tokens; /push rejects without token.
  - run_thread with and without key; attachment upload/consumption.
- E2E (Playwright)
  - Login with OpenRouter (mock exchange) → indicator green → send from home creates thread and streams.
  - Retry message, branch thread.
- Performance
  - WS reconnect under network flaps; pull batching; OPFS writes throughput.

## Security Considerations

- OpenRouter key stays client-side; do not log it.
- SPSK opaque and hashed at rest; expiration and manual revoke supported.
- CSRF protection via `state` param in PKCE.
- HTTPS and secure cookies in production.
