export default defineNuxtPlugin((nuxtApp) => {
  // app_start: as soon as the client plugin runs
  try {
    performance.mark("app_start");
  } catch {}

  const state = {
    ready: false,
    firstInteractionMarked: false,
    heavyMarked: false,
  };

  // shell_painted: next microtask + next frame after plugin init
  // approximates "after mount/nextTick" without component hooks
  try {
    queueMicrotask(() => {
      requestAnimationFrame(() => {
        performance.mark("shell_painted");
        state.ready = true;
      });
    });
  } catch {
    // Fallback if queueMicrotask is not available
    setTimeout(() => {
      try {
        performance.mark("shell_painted");
        state.ready = true;
      } catch {}
    }, 0);
  }

  // first_click_ready: first user interaction AFTER we consider the shell painted/ready
  const markFirstInteraction = () => {
    if (!state.ready || state.firstInteractionMarked) return;
    state.firstInteractionMarked = true;
    try {
      performance.mark("first_click_ready");
    } catch {}
    cleanupInteractionListeners();
  };

  const cleanupInteractionListeners = () => {
    window.removeEventListener("pointerdown", markFirstInteraction, true);
    window.removeEventListener("keydown", markFirstInteraction, true);
    window.removeEventListener("click", markFirstInteraction, true);
  };

  window.addEventListener("pointerdown", markFirstInteraction, true);
  window.addEventListener("keydown", markFirstInteraction, true);
  window.addEventListener("click", markFirstInteraction, true);

  // heavy_deps_loaded: expose both an API and an event for external callers
  let devReport: (() => void) | undefined;

  const markHeavy = () => {
    if (state.heavyMarked) return;
    state.heavyMarked = true;
    try {
      performance.mark("heavy_deps_loaded");
    } catch {}
    if (import.meta.dev) devReport?.();
  };

  nuxtApp.provide("perf", {
    markHeavyDepsLoaded: markHeavy,
    mark: (name: string) => {
      try {
        performance.mark(name);
      } catch {}
    },
  });

  window.addEventListener("perf:heavy_deps_loaded", markHeavy, { once: true });

  // Dev-only console reporter
  if (import.meta.dev) {
    const BUDGETS = {
      shellPaintedMs: 1500,
      heavyReadyMs: 3000,
      previewCacheReadMs: 15,
      previewRefreshMs: 120,
      dbWorkerReadyMs: 800,
    };

    const getMark = (name: string) =>
      performance.getEntriesByName(name).at(-1) as PerformanceMark | undefined;

    const measureDelta = (start: string, end: string) => {
      const a = getMark(start);
      const b = getMark(end);
      return a && b ? Math.round(b.startTime - a.startTime) : undefined;
    };

    const report = () => {
      const appStart = getMark("app_start");
      const shell = getMark("shell_painted");
      const firstReady = getMark("first_click_ready");
      const heavy = getMark("heavy_deps_loaded");
      const cacheRead = getMark("preview_cache_read");
      const dbReady = getMark("db_worker_ready");
      const refreshDone = getMark("preview_refresh_done");

      const fromOrigin = (m?: PerformanceMark) =>
        m ? Math.round(m.startTime) : undefined;

      const dShell = measureDelta("app_start", "shell_painted");
      const dFirst = measureDelta("app_start", "first_click_ready");
      const dHeavy = measureDelta("app_start", "heavy_deps_loaded");
      const dCache = measureDelta("app_start", "preview_cache_read");
      const dDbReady = measureDelta("app_start", "db_worker_ready");
      const dRefresh = measureDelta("app_start", "preview_refresh_done");

      // eslint-disable-next-line no-console
      console.groupCollapsed("%cPerf marks", "color:#06f");
      // eslint-disable-next-line no-console
      console.table([
        { mark: "app_start", t_ms: fromOrigin(appStart) },
        {
          mark: "shell_painted",
          t_ms: fromOrigin(shell),
          delta_from_start_ms: dShell,
        },
        {
          mark: "first_click_ready",
          t_ms: fromOrigin(firstReady),
          delta_from_start_ms: dFirst,
        },
        {
          mark: "heavy_deps_loaded",
          t_ms: fromOrigin(heavy),
          delta_from_start_ms: dHeavy,
        },
        {
          mark: "preview_cache_read",
          t_ms: fromOrigin(cacheRead),
          delta_from_start_ms: dCache,
        },
        {
          mark: "db_worker_ready",
          t_ms: fromOrigin(dbReady),
          delta_from_start_ms: dDbReady,
        },
        {
          mark: "preview_refresh_done",
          t_ms: fromOrigin(refreshDone),
          delta_from_start_ms: dRefresh,
        },
      ]);
      // eslint-disable-next-line no-console
      console.groupEnd();

      if (typeof dShell === "number" && dShell > BUDGETS.shellPaintedMs) {
        console.warn(
          `[perf] shell_painted over budget: ${dShell}ms > ${BUDGETS.shellPaintedMs}ms`,
        );
      }
      if (typeof dHeavy === "number" && dHeavy > BUDGETS.heavyReadyMs) {
        console.warn(
          `[perf] heavy_deps_loaded over budget: ${dHeavy}ms > ${BUDGETS.heavyReadyMs}ms`,
        );
      }
      if (typeof dCache === "number" && dCache > BUDGETS.previewCacheReadMs) {
        console.warn(
          `[perf] preview_cache_read over budget: ${dCache}ms > ${BUDGETS.previewCacheReadMs}ms`,
        );
      }
      if (typeof dDbReady === "number" && dDbReady > BUDGETS.dbWorkerReadyMs) {
        console.warn(
          `[perf] db_worker_ready over budget: ${dDbReady}ms > ${BUDGETS.dbWorkerReadyMs}ms`,
        );
      }
      if (typeof dRefresh === "number" && dRefresh > BUDGETS.previewRefreshMs) {
        console.warn(
          `[perf] preview_refresh_done over budget: ${dRefresh}ms > ${BUDGETS.previewRefreshMs}ms`,
        );
      }
    };

    // expose to outer scope for markHeavy()
    devReport = report;

    // Fallback: print a report after 5s even if heavy mark never occurs
    setTimeout(report, 5000);

    // Also log once hydration is deemed ready
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        // small debounce
        setTimeout(report, 300);
      }
    });
  }
});
