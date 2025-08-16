// Lightweight DB facade: caches thread previews in IndexedDB with a localStorage fallback
// No runtime deps; can be swapped to Dexie later without changing callsites.

import type { ThreadPreview } from "./preview-cache";

const IDB_DB = "nuxflare-cache-v1";
const IDB_STORE = "threads_preview";
const LS_KEY = "ui_threads_preview_v1";

let idbOpenPromise: Promise<IDBDatabase> | null = null;

function openIDB(): Promise<IDBDatabase> {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(new Error("IndexedDB not available"));
  }
  if (!idbOpenPromise) {
    idbOpenPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(IDB_DB, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  return idbOpenPromise;
}

async function idbGet<T>(key: string): Promise<T | undefined> {
  const db = await openIDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readonly");
    const store = tx.objectStore(IDB_STORE);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet<T>(key: string, value: T): Promise<void> {
  const db = await openIDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite");
    const store = tx.objectStore(IDB_STORE);
    const req = store.put(value as any, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function init(): Promise<void> {
  try {
    await openIDB();
  } catch {
    // ignore
  }
}

export async function getThreadsPreview(): Promise<ThreadPreview[]> {
  // Fast path: IndexedDB
  try {
    const data = await idbGet<ThreadPreview[]>("preview");
    if (Array.isArray(data) && data.length) return data;
  } catch {}
  // Fallback: localStorage
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as ThreadPreview[];
    }
  } catch {}
  return [];
}

export async function setThreadsPreview(
  preview: ThreadPreview[],
): Promise<void> {
  // Store in both IDB and localStorage for super-fast boot fallback
  try {
    await idbSet("preview", preview);
  } catch {}
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(preview));
  } catch {}
}

// Optional helper: schedule a cache refresh without blocking
export function schedulePreviewRefresh(run: () => Promise<ThreadPreview[]>) {
  const schedule = (cb: () => void) =>
    (window as any).requestIdleCallback
      ? (window as any).requestIdleCallback(cb, { timeout: 1200 })
      : setTimeout(cb, 250);
  schedule(async () => {
    try {
      const data = await run();
      if (Array.isArray(data) && data.length) await setThreadsPreview(data);
    } catch {}
  });
}
