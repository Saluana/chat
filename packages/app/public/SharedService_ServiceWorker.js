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
const handledNonces = new Set();
globalThis.addEventListener("message", async (event) => {
  if (event.data?.get_client_id) {
    event.source.postMessage({
      client_id: event.source.id,
    });
  } else if (event.data?.sharedService) {
    try {
      const nonce = event.data?.nonce;
      if (nonce && handledNonces.has(nonce)) return;
      if (nonce) handledNonces.add(nonce);
      const client = await globalThis.clients.get(event.data.clientId);
      client?.postMessage(event.data, event.ports);
    } catch (e) {
      // Ignore DataCloneError from reusing a neutered port
    }
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
