import { ref, shallowRef } from "vue";
import {
  PreviewCache,
  PREVIEW_CACHE_VERSION,
  versionKeyFor,
  type PreviewEnvelope,
  type ThreadPreview,
} from "../utils/preview-cache";

// Singleton state to ensure one source of truth across imports
const items = shallowRef<ThreadPreview[]>([]);
const ready = ref(false);
const isStale = ref(false);
let initialized = false;
let refreshing: Promise<void> | null = null;

const versionKey = versionKeyFor(PREVIEW_CACHE_VERSION);

function mark(name: string) {
  try {
    if (typeof performance !== "undefined" && performance.mark) {
      performance.mark(name);
    }
  } catch {
    /* no-op */
  }
}

function sanitizeSnippet(s: string): string {
  if (!s) return "";
  // cheap sanitize: collapse whitespace and strip code fences/markdown symbols
  return String(s)
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function readCacheOnce() {
  const start = import.meta.dev ? performance.now() : 0;
  const envelope = await PreviewCache.get(versionKey);
  if (envelope && Array.isArray(envelope.items)) {
    items.value = envelope.items;
  } else {
    items.value = [];
  }
  mark("preview_cache_read");
  if (import.meta.dev) {
    // eslint-disable-next-line no-console
    console.debug(
      "[threads-preview] cache read in",
      (performance.now() - start).toFixed(1),
      "ms; items:",
      items.value.length,
    );
  }
  ready.value = true;
}

async function doRefresh(force = false) {
  if (refreshing && !force) return refreshing;
  refreshing = (async () => {
    const t0 = import.meta.dev ? performance.now() : 0;
    isStale.value = true;
    try {
      // Ensure DB warms up off critical path (nuxt-workers global)
      await initDatabase();
      // Query directly via dbExec to avoid export mismatch issues
      const sql = `
        SELECT
          t.id,
          t.title,
          t.updated_at,
          t.last_message_at,
          t.pinned,
          t.deleted,
          SUBSTR(COALESCE((
            SELECT m2.content
            FROM messages m2
            WHERE m2.thread_id = t.id AND m2.deleted = 0
            ORDER BY m2.created_at DESC, m2.message_index DESC
            LIMIT 1
          ), ''), 1, 140) AS last_message_snippet,
          (
            SELECT COUNT(1)
            FROM messages m3
            WHERE m3.thread_id = t.id AND m3.deleted = 0
          ) AS message_count
        FROM threads t
        WHERE t.deleted = 0
        ORDER BY t.pinned DESC, t.last_message_at DESC, t.updated_at DESC;
      `;
      const res = await dbExec({ sql, bindings: null as any });
      const previews: ThreadPreview[] = (res.rows || []).map((row: any[]) => {
        const [
          id,
          title,
          updated_at,
          last_message_at,
          pinned,
          deleted,
          last_message_snippet,
          message_count,
        ] = row;
        return {
          id: String(id),
          title: String(title ?? ""),
          updated_at: Number(updated_at ?? 0),
          last_message_at: Number(last_message_at ?? 0),
          pinned: Number(pinned ?? 0) as 0 | 1,
          deleted: Number(deleted ?? 0) as 0 | 1,
          last_message_snippet: String(last_message_snippet ?? ""),
          message_count: Number(message_count ?? 0),
        } as ThreadPreview;
      });
      const mapped: ThreadPreview[] = previews.map((p) => ({
        ...p,
        last_message_snippet: sanitizeSnippet(p.last_message_snippet || ""),
      }));

      const envelope: PreviewEnvelope = {
        version: PREVIEW_CACHE_VERSION,
        generated_at: Date.now(),
        items: mapped,
      };

      await PreviewCache.set(versionKey, envelope);
      // Atomic swap
      items.value = mapped;
      mark("preview_refresh_done");
      if (import.meta.dev) {
        // eslint-disable-next-line no-console
        console.debug(
          "[threads-preview] refresh done in",
          (performance.now() - t0).toFixed(1),
          "ms; items:",
          items.value.length,
        );
      }
    } catch (err) {
      if (import.meta.dev) {
        // eslint-disable-next-line no-console
        console.warn("[threads-preview] refresh failed", err);
      }
      // Keep stale data; optional retry can be scheduled by caller
    } finally {
      isStale.value = false;
      refreshing = null;
    }
  })();
  return refreshing;
}

async function invalidateAll() {
  await PreviewCache.clearAll();
  return doRefresh(true);
}

export function useThreadsPreview() {
  if (!initialized) {
    initialized = true;
    // First touch: load cache immediately and kick refresh
    // Fire and forget; callers can await ready/isStale as needed
    readCacheOnce();
    doRefresh(false);
  }

  return {
    items,
    isStale,
    ready,
    refresh: (opts?: { force?: boolean }) => doRefresh(!!opts?.force),
    invalidateAll,
    // Best-effort patch: updates an item locally without forcing a full refresh
    upsertPreview: (partial: Partial<ThreadPreview> & { id: string }) => {
      const idx = items.value.findIndex((t) => t.id === partial.id);
      if (idx >= 0) {
        const merged = { ...items.value[idx], ...partial } as ThreadPreview;
        const next = items.value.slice();
        next[idx] = merged;
        // resort if time fields or pinned changed
        next.sort(
          (a, b) =>
            (b.pinned as number) - (a.pinned as number) ||
            (b.last_message_at || 0) - (a.last_message_at || 0) ||
            (b.updated_at || 0) - (a.updated_at || 0),
        );
        items.value = next;
      }
    },
  };
}
