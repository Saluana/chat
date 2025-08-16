export default defineNuxtPlugin(() => {
  if (typeof window === "undefined") return;
  // Kick off base warmup right after app boot
  queueMicrotask(async () => {
    try {
      const { warmupMarkdown } = await import("~/utils/markdown-lazy");
      // Base immediately; heavy on idle to avoid contention
      warmupMarkdown("base");
      const scheduleIdle = (cb: () => void) =>
        (window as any).requestIdleCallback
          ? (window as any).requestIdleCallback(cb, { timeout: 1500 })
          : setTimeout(cb, 500);
      scheduleIdle(() => warmupMarkdown("heavy"));
    } catch {}
  });
});
