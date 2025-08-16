// Lazy Markdown renderer: dynamically loads heavy deps on first use.
// Prefers a Web Worker to keep the main thread smooth, with an incremental in-thread fallback.
// Exposes a single function renderMarkdownChunk() with internal caching.

let worker: Worker | null = null;
let workerStatus: "idle" | "base" | "heavy" | "failed" = "idle";
// In-thread processors (fallback path)
let baseNoMathLocal: Promise<any> | null = null;
let baseWithMathLocal: Promise<any> | null = null;
let enhancedLocal: Promise<any> | null = null;
// In-memory cache for rendered chunks. Keep this bounded to avoid OOM.
const chunkCache = new Map<string, string>();
const CHUNK_CACHE_LIMIT = 200; // max number of cached chunks (reduced to curb memory)

// Worker idle shutdown to free memory when unused
let workerIdleTimer: any = null;
const WORKER_IDLE_MS = 60_000; // 60s of inactivity
const processingQueue = new Map<string, Promise<string>>();

async function markHeavyDepsReady() {
  try {
    const { useNuxtApp } = await import("#app");
    const { $perf } = useNuxtApp();
    ($perf as any)?.markHeavyDepsLoaded?.();
  } catch {
    try {
      window.dispatchEvent(new Event("perf:heavy_deps_loaded"));
    } catch {}
  }
}

function maybeInitWorker() {
  if (typeof window === "undefined") return;
  if (worker) return;
  try {
    // Use Vite-friendly worker creation
    worker = new Worker(new URL("../workers/markdown.ts", import.meta.url), {
      type: "module",
    });
    const onMessage = (e: MessageEvent) => {
      const t = e.data?.type;
      if (t === "base_ready") {
        // Consider base pipeline sufficient for responsiveness
        markHeavyDepsReady();
        try {
          window.dispatchEvent(new Event("markdown:base_ready"));
        } catch {}
        // After base is ready, warm up heavy deps when idle
        const scheduleIdle = (cb: () => void) =>
          (window as any).requestIdleCallback
            ? (window as any).requestIdleCallback(cb, { timeout: 1000 })
            : setTimeout(cb, 400);
        scheduleIdle(() => {
          try {
            worker!.postMessage({ type: "warmup", mode: "heavy" });
          } catch {}
        });
        workerStatus = "base";
      } else if (t === "heavy_ready") {
        try {
          window.dispatchEvent(new Event("markdown:heavy_ready"));
        } catch {}
        workerStatus = "heavy";
      }
    };
    worker.addEventListener("message", onMessage as any);
    worker.addEventListener("error", (err) => {
      console.warn("[markdown-worker] error, falling back", err);
      try {
        worker?.removeEventListener("message", onMessage as any);
      } catch {}
      workerStatus = "failed";
      worker = null;
    });
    worker.addEventListener("messageerror", (err) => {
      console.warn("[markdown-worker] messageerror", err);
    });
    // Idle warmup to initialize heavy deps sooner without blocking
    const scheduleIdle = (cb: () => void) =>
      (window as any).requestIdleCallback
        ? (window as any).requestIdleCallback(cb, { timeout: 500 })
        : setTimeout(cb, 200);
    scheduleIdle(() => {
      try {
        worker!.postMessage({ type: "warmup", mode: "base" });
      } catch {}
    });
  } catch {
    // Fallback: Vite-style ?worker import
    (async () => {
      try {
        const mod: any = await import("~/workers/markdown?worker");
        worker = new mod.default();
        workerStatus = "idle";
      } catch (e) {
        console.warn("[markdown-worker] creation failed, using fallback", e);
        worker = null;
        workerStatus = "failed";
      }
    })();
  }
}

function hasCodeFences(text: string): boolean {
  return /```|~~~/.test(text);
}
function hasMath(text: string): boolean {
  return /(\$\$[^]*?\$\$)|(\$[^\n$]+\$)|(\\\(|\\\)|\\\[|\\\])/.test(text);
}

async function initBaseNoMathLocalProc() {
  if (!baseNoMathLocal) {
    baseNoMathLocal = (async () => {
      const [
        { unified },
        remarkParse,
        remarkGfm,
        remarkRehype,
        rehypeStringify,
      ] = await Promise.all([
        import("unified"),
        import("remark-parse"),
        import("remark-gfm"),
        import("remark-rehype"),
        import("rehype-stringify"),
      ]);
      const proc = (unified as any)()
        .use((remarkParse as any).default || (remarkParse as any))
        .use((remarkGfm as any).default || (remarkGfm as any))
        .use((remarkRehype as any).default || (remarkRehype as any))
        .use((rehypeStringify as any).default || (rehypeStringify as any));
      // Mark responsive-ready when base is available
      markHeavyDepsReady();
      return proc;
    })();
  }
  return baseNoMathLocal;
}

async function initBaseWithMathLocalProc() {
  if (!baseWithMathLocal) {
    baseWithMathLocal = (async () => {
      const [
        { unified },
        remarkParse,
        remarkGfm,
        remarkMath,
        remarkRehype,
        rehypeKatex,
        rehypeStringify,
      ] = await Promise.all([
        import("unified"),
        import("remark-parse"),
        import("remark-gfm"),
        import("remark-math"),
        import("remark-rehype"),
        import("rehype-katex"),
        import("rehype-stringify"),
      ]);
      const proc = (unified as any)()
        .use((remarkParse as any).default || (remarkParse as any))
        .use((remarkGfm as any).default || (remarkGfm as any))
        .use((remarkMath as any).default || (remarkMath as any))
        .use((remarkRehype as any).default || (remarkRehype as any))
        .use((rehypeKatex as any).default || (rehypeKatex as any))
        .use((rehypeStringify as any).default || (rehypeStringify as any));
      markHeavyDepsReady();
      return proc;
    })();
  }
  return baseWithMathLocal;
}

async function initEnhancedLocalProc() {
  if (!enhancedLocal) {
    enhancedLocal = (async () => {
      const [
        { unified },
        remarkParse,
        remarkGfm,
        remarkMath,
        remarkRehype,
        rehypeKatex,
        rehypeStringify,
        rehypeShiki,
      ] = await Promise.all([
        import("unified"),
        import("remark-parse"),
        import("remark-gfm"),
        import("remark-math"),
        import("remark-rehype"),
        import("rehype-katex"),
        import("rehype-stringify"),
        import("@shikijs/rehype"),
      ]);
      const proc = (unified as any)()
        .use((remarkParse as any).default || (remarkParse as any))
        .use((remarkGfm as any).default || (remarkGfm as any))
        .use((remarkMath as any).default || (remarkMath as any))
        .use((remarkRehype as any).default || (remarkRehype as any))
        .use((rehypeShiki as any).default || (rehypeShiki as any), {
          defaultLanguage: "txt",
          fallbackLanguage: "txt",
          themes: { light: "vitesse-light", dark: "vitesse-dark" },
        })
        .use((rehypeKatex as any).default || (rehypeKatex as any))
        .use((rehypeStringify as any).default || (rehypeStringify as any));
      return proc;
    })();
  }
  return enhancedLocal;
}

async function sha1(text: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-1",
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function renderMarkdownChunk(chunk: string): Promise<string> {
  if (!chunk) return "";
  const hash = await sha1(chunk);
  const cached = chunkCache.get(hash);
  if (cached) return cached;

  const existing = processingQueue.get(hash);
  if (existing) return existing;

  // Prefer worker path; initialize it if possible
  maybeInitWorker();
  let p: Promise<string>;
  if (worker) {
    p = new Promise<string>((resolve, reject) => {
      const id = crypto.randomUUID();
      const onMsg = (e: MessageEvent) => {
        const d = e.data;
        if (!d || d.id !== id) return;
        if (d.type === "result") {
          worker?.removeEventListener("message", onMsg as any);
          resolve(String(d.html || ""));
        } else if (d.type === "error") {
          worker?.removeEventListener("message", onMsg as any);
          reject(new Error(String(d.error)));
        }
      };
      worker!.addEventListener("message", onMsg as any);
      resetWorkerIdleTimer();
      worker!.postMessage({ type: "render", id, text: chunk });
      resetWorkerIdleTimer();
    }).catch(async (err) => {
      // Fallback to in-thread processing on worker failure
      console.warn("[markdown-worker] render failed, using fallback", err);
      let file: any;
      if (hasCodeFences(chunk)) {
        // Try fast base first to avoid blocking
        const base = hasMath(chunk)
          ? await initBaseWithMathLocalProc()
          : await initBaseNoMathLocalProc();
        try {
          file = await base.process(chunk);
        } catch {
          const enh = await initEnhancedLocalProc();
          file = await enh.process(chunk);
        }
      } else {
        const base = hasMath(chunk)
          ? await initBaseWithMathLocalProc()
          : await initBaseNoMathLocalProc();
        file = await base.process(chunk);
      }
      return String(file);
    });
  } else {
    // No worker (or failed): use incremental local pipeline
    if (hasCodeFences(chunk)) {
      const proc =
        workerStatus === "failed"
          ? await initBaseNoMathLocalProc()
          : await initBaseNoMathLocalProc();
      try {
        const file = await proc.process(chunk);
        p = Promise.resolve(String(file));
      } catch {
        const enh = await initEnhancedLocalProc();
        const file = await enh.process(chunk);
        p = Promise.resolve(String(file));
      }
    } else {
      const base = hasMath(chunk)
        ? await initBaseWithMathLocalProc()
        : await initBaseNoMathLocalProc();
      const file = await base.process(chunk);
      p = Promise.resolve(String(file));
    }
  }

  function resetWorkerIdleTimer() {
    try {
      if (!worker) return;
      if (workerIdleTimer) clearTimeout(workerIdleTimer);
      workerIdleTimer = setTimeout(() => {
        try {
          worker?.terminate();
        } catch {}
        worker = null;
        workerStatus = "idle";
        // clear any heavy local processors to free memory if possible
        enhancedLocal = null;
        baseWithMathLocal = null;
      }, WORKER_IDLE_MS);
    } catch {}
  }

  processingQueue.set(hash, p);
  const result = await p;
  processingQueue.delete(hash);
  // Insert into cache and enforce LRU limit
  // If the rendered HTML is extremely large, avoid caching to limit memory
  if (result && result.length > 200_000) {
    // >200KB html per chunk likely from huge code blocks; skip cache
  } else {
    chunkCache.set(hash, result);
  }
  try {
    if (chunkCache.size > CHUNK_CACHE_LIMIT) {
      // Evict oldest entries (Map preserves insertion order)
      const toRemove = chunkCache.size - CHUNK_CACHE_LIMIT;
      const it = chunkCache.keys();
      for (let i = 0; i < toRemove; i++) {
        const k = it.next().value as string;
        chunkCache.delete(k);
      }
    }
  } catch (e) {
    console.warn("[markdown-lazy] cache eviction failed", e);
  }
  return result;
}

// Public warmup entrypoint: initialize base pipeline early and optionally heavy
export async function warmupMarkdown(mode: "base" | "heavy" = "base") {
  if (typeof window === "undefined") return;
  try {
    maybeInitWorker();
    if (worker) {
      // Always warm base first
      worker.postMessage({ type: "warmup", mode: "base" });
      if (mode === "heavy") {
        const scheduleIdle = (cb: () => void) =>
          (window as any).requestIdleCallback
            ? (window as any).requestIdleCallback(cb, { timeout: 1000 })
            : setTimeout(cb, 300);
        scheduleIdle(() => {
          try {
            worker!.postMessage({ type: "warmup", mode: "heavy" });
          } catch {}
        });
      }
      return;
    }
    // No worker: prepare local base pipeline to reduce first-use cost
    await initBaseNoMathLocalProc();
    if (mode === "heavy") {
      const scheduleIdle = (cb: () => void) =>
        (window as any).requestIdleCallback
          ? (window as any).requestIdleCallback(cb, { timeout: 1000 })
          : setTimeout(cb, 300);
      scheduleIdle(() => {
        initEnhancedLocalProc().catch(() => {});
      });
    }
  } catch {
    // ignore
  }
}
