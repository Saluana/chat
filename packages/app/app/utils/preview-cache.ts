/*
  PreviewCache: IndexedDB-backed preview cache with in-memory fallback.
  - Store name: 'threads_preview' in DB 'nuxflare-preview-cache'
  - Single-record per version key: 'v' + version
  - Safe on SSR: falls back to in-memory and never touches IDB on server
*/

export interface ThreadPreview {
  id: string;
  title: string;
  updated_at: number;
  last_message_at: number;
  pinned: 0 | 1;
  deleted: 0 | 1;
  last_message_snippet: string;
  message_count: number;
}

export interface PreviewEnvelope {
  version: number;
  generated_at: number; // epoch ms
  items: ThreadPreview[];
}

export const PREVIEW_CACHE_VERSION = 1 as const;
export const versionKeyFor = (version = PREVIEW_CACHE_VERSION) => `v${version}`;

const DB_NAME = "nuxflare-preview-cache";
const STORE = "threads_preview";

type MaybeEnvelope = PreviewEnvelope | undefined;

class PreviewCacheImpl {
  private memory = new Map<string, PreviewEnvelope>();
  private openPromise: Promise<IDBDatabase> | null = null;

  private hasIDB(): boolean {
    return typeof indexedDB !== "undefined" && !!indexedDB;
  }

  private async openDB(): Promise<IDBDatabase> {
    if (!this.hasIDB()) {
      // Dummy never-resolving promise if called accidentally on server; callers should catch
      // but we also guard all public calls to avoid reaching here when IDB is unavailable.
      return Promise.reject(new Error("IndexedDB unavailable"));
    }
    if (this.openPromise) return this.openPromise;
    this.openPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = (ev) => {
        const db = (ev.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      };
      req.onsuccess = (ev) => resolve((ev.target as IDBOpenDBRequest).result);
      req.onerror = (ev) => {
        this.openPromise = null;
        reject((ev.target as IDBOpenDBRequest).error ?? new Error("IDB error"));
      };
    });
    return this.openPromise;
  }

  private async idbGet(key: string): Promise<MaybeEnvelope> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE], "readonly");
      const store = tx.objectStore(STORE);
      const req = store.get(key);
      req.onsuccess = (ev) =>
        resolve((ev.target as IDBRequest).result as MaybeEnvelope);
      req.onerror = (ev) =>
        reject((ev.target as IDBRequest).error ?? new Error("get failed"));
    });
  }

  private async idbSet(key: string, value: PreviewEnvelope): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE], "readwrite");
      const store = tx.objectStore(STORE);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = (ev) =>
        reject((ev.target as IDBRequest).error ?? new Error("set failed"));
    });
  }

  private async idbClear(): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE], "readwrite");
      const store = tx.objectStore(STORE);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = (ev) =>
        reject((ev.target as IDBRequest).error ?? new Error("clear failed"));
    });
  }

  // Public API
  async get(versionKey: string): Promise<MaybeEnvelope> {
    // Try IDB fast-path if available; otherwise memory
    if (this.hasIDB()) {
      try {
        const res = await this.idbGet(versionKey);
        if (res) return res;
      } catch {
        // fallthrough to memory
      }
    }
    return this.memory.get(versionKey);
  }

  async set(versionKey: string, envelope: PreviewEnvelope): Promise<void> {
    // Privacy/safety: ensure we only store allowed fields
    // (Assumes envelope was constructed per design elsewhere.)
    this.memory.set(versionKey, envelope);
    if (!this.hasIDB()) return;
    try {
      await this.idbSet(versionKey, envelope);
    } catch {
      // keep memory fallback
    }
  }

  async clearAll(): Promise<void> {
    this.memory.clear();
    if (!this.hasIDB()) return;
    try {
      await this.idbClear();
    } catch {
      // ignore
    }
  }
}

export const PreviewCache = new PreviewCacheImpl();
