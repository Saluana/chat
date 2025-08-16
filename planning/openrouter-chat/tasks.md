---
artifact_id: d2b0b0d7-9f1a-4df6-b0ca-8ac3af5a0d6f
---

# tasks.md

## 1. Harden OpenRouter Auth (PKCE + fallback)

- [x] Implement S256 PKCE redirect with callback_url (use Web Crypto).
  - Requirements: 1
- [x] Directly exchange code at https://openrouter.ai/api/v1/auth/keys and store key locally; best-effort KV sync.
  - Requirements: 1, 2
- [x] Add logout to clear localStorage + KV and flip indicator.
  - Requirements: 6

## 2. Enforce Key on Sends

- [x] Ensure every run_thread includes options.openrouterApiKey; early-block sends if missing.
  - Requirements: 2
- [x] Add UI toast when key missing with quick “Login with OpenRouter” action.
  - Requirements: 2, 6, 7

## 3. Secure Private Sync Key (SPSK)

- [ ] Backend: Add `client_tokens` table in DO durable-sqlite (id, token_hash, device_name, created_at, expires_at, revoked, clock).
  - Requirements: 3
- [ ] Endpoint POST /auth/spsk/mint to generate and return `{ token, expiresAt }`; store hash.
  - Requirements: 3
- [ ] WS connect: require SPSK as a subprotocol (replace current static token). Validate on connect.
  - Requirements: 3
- [ ] /pull and /push: require `Authentication: Bearer <SPSK>` and validate.
  - Requirements: 3
- [ ] Client: on load, mint/reuse SPSK and call $sync.setAuthInfo(apiUrl, spsk).
  - Requirements: 3
- [ ] Rotation: auto-renew if `expiresAt` near; add manual revoke in settings.
  - Requirements: 3, 6

## 4. New Thread Flow and UX Polish

- [x] Event order fix in newThread: new_thread → new_message → run_thread.
  - Requirements: 4
- [x] Await local thread presence before navigating.
  - Requirements: 4
- [x] Fix not-found guard in `[[id]].vue` to only show when thread exists and is deleted.
  - Requirements: 4, 7

## 5. Streaming and Attachments

- [x] Ensure Stream DO writes partial content and final message; error path writes partials + error.
  - Requirements: 5, 7
- [x] Validate attachments upload (PUT /blob) and server-side inclusion in formatted messages (image/file types).
  - Requirements: 5

## 6. Settings & Indicator

- [ ] Sidebar indicator: prefer localStorage; listen to `openrouter:connected`, storage, visibilitychange, and route changes.
  - Requirements: 6
- [ ] Settings: add paste key, copy key masked, and logout.
  - Requirements: 6

## 7. Error Handling and UX Feedback

- [ ] Standardize ServiceResult-like errors from DO; map to user-friendly toasts.
  - Requirements: 7
- [ ] Add empty/error states for streaming message components.
  - Requirements: 7

## 8. Tests

- [ ] Unit: PKCE helpers; options merge; storage utils.
  - Requirements: 1, 2
- [ ] Integration: SPSK mint, WS auth; /push guard; run_thread missing key.
  - Requirements: 2, 3
- [ ] E2E: Login (mock exchange) → send from home → stream; retry; branch; logout.
  - Requirements: 1, 4, 5, 6, 7

## 9. Observability & Perf

- [ ] Add concise logs for WS connect/disconnect, SPSK validate, run_thread start/end.
  - Requirements: NFR
- [ ] Batch/pause applyChange under heavy load; measure OPFS write throughput.
  - Requirements: NFR

## 10. Deployment & Docs

- [ ] Document required envs (only for optional server exchange), prod HTTPS, and CSP.
  - Requirements: Integration, Security
- [ ] README section for OpenRouter setup and SPSK design.
  - Requirements: 1, 3

---

Notes:

- Keep the OpenRouter key strictly client-side; never log it.
- SPSK is opaque; store only a hash and metadata on the server (revocable and expiring).
- Map each UI action to clear toasts and inline states to avoid silent failures.
