export default defineNuxtPlugin({
  name: "sync",
  setup() {
    const isClient = typeof window !== "undefined";
    const hasServiceWorker =
      isClient && "serviceWorker" in navigator && window.isSecureContext;

    // Fallback provider for environments without SW (e.g., iOS over HTTP)
    if (!hasServiceWorker) {
      console.warn(
        "Service Worker not available (insecure context or unsupported). Running in fallback mode without sync.",
      );
      const fallbackKVGet = (k: string) =>
        (typeof localStorage !== "undefined" && localStorage.getItem(k)) ||
        null;
      const fallbackKVSet = (k: string, v: string) => {
        if (typeof localStorage !== "undefined") localStorage.setItem(k, v);
        return true;
      };
      return {
        provide: {
          sync: {
            async setAuthInfo(_endpoint: string, _token: string) {
              /* no-op */
            },
            async newThread(_params: {
              content: string;
              attachments?: any[];
              options: { name: string; thinkingBudget: string };
            }) {
              throw new Error("Sync not available in this environment");
            },
            async getThreads() {
              return [];
            },
            async getMessagesForThread(_threadId: string) {
              return [];
            },
            async updateThread(_id: string, _update: any) {
              /* no-op */
            },
            async sendMessage(_params: {
              threadId: string;
              content: string;
              attachments?: any[];
              options: { name: string; thinkingBudget: string };
            }) {
              throw new Error("Sync not available in this environment");
            },
            async getKV(name: string) {
              return fallbackKVGet(name);
            },
            async setKV(name: string, value: string) {
              return fallbackKVSet(name, value);
            },
            async retryMessage(
              _messageId: string,
              _options?: { model?: string; thinkingBudget?: string },
            ) {
              /* no-op */
            },
            async branchThread(
              _threadId: string,
              _messageId: string,
              _newThreadId: string,
            ) {
              /* no-op */
            },
            async updateMessage(
              _id: string,
              _update: { data?: any; deleted?: boolean },
            ) {
              /* no-op */
            },
            async searchThreads(_query: string) {
              return [];
            },
            async clear() {
              if (typeof localStorage !== "undefined") localStorage.clear();
              return true;
            },
          },
        },
      };
    }

    // Non-blocking initialization state and call queue
    type Level = "provider" | "sync";
    type QueuedCall = {
      level: Level;
      method: string;
      args: any[];
      resolve: (v: any) => void;
      reject: (e: any) => void;
    };

    const queue: QueuedCall[] = [];
    let sharedService: any | null = null;
    let providerReady = false;
    let syncReady = false;

    let resolveProviderReady: (() => void) | null = null;
    const providerReadyPromise = new Promise<void>((res) => {
      resolveProviderReady = res;
    });
    let resolveSyncReady: (() => void) | null = null;
    const syncReadyPromise = new Promise<void>((res) => {
      resolveSyncReady = res;
    });

    function flushQueue() {
      if (!sharedService) return;
      const readyNow: QueuedCall[] = [];
      const rest: QueuedCall[] = [];
      for (const item of queue) {
        const ok =
          (item.level === "provider" && providerReady) ||
          (item.level === "sync" && syncReady);
        (ok ? readyNow : rest).push(item);
      }
      queue.length = 0;
      queue.push(...rest);
      for (const item of readyNow) {
        Promise.resolve(sharedService.proxy[item.method]!(...item.args))
          .then(item.resolve)
          .catch(item.reject);
      }
    }

    function startReadinessWatchers() {
      if (!sharedService) return;
      // Provider readiness: poll lightly with backoff without blocking setup
      const checkProvider = (delay = 50) => {
        Promise.resolve(sharedService.proxy["isReady"]!())
          .then((val: any) => {
            if (val && !providerReady) {
              providerReady = true;
              resolveProviderReady?.();
              flushQueue();
              console.log("[sync] provider ready");
            } else if (!providerReady) {
              setTimeout(
                () => checkProvider(Math.min(delay * 1.5, 1000)),
                delay,
              );
            }
          })
          .catch(() =>
            setTimeout(() => checkProvider(Math.min(delay * 1.5, 1000)), delay),
          );
      };
      checkProvider();

      // Sync readiness follows provider readiness
      const checkSync = (delay = 100) => {
        if (!providerReady) {
          setTimeout(() => checkSync(delay), delay);
          return;
        }
        Promise.resolve(sharedService.proxy["isSyncReady"]!())
          .then((val: any) => {
            if (val && !syncReady) {
              syncReady = true;
              resolveSyncReady?.();
              flushQueue();
              console.log("[sync] sync ready");
            } else if (!syncReady) {
              setTimeout(() => checkSync(Math.min(delay * 1.5, 1500)), delay);
            }
          })
          .catch(() =>
            setTimeout(() => checkSync(Math.min(delay * 1.5, 1500)), delay),
          );
      };
      checkSync();
    }

    function ensureInit() {
      if (sharedService) return;

      const init = () => {
        // Kick off SW registration without awaiting
        navigator.serviceWorker
          .register("SharedService_ServiceWorker.js")
          .catch((e) => console.warn("SW registration failed", e));

        sharedService = new SharedService("sync-service", syncServiceProvider);
        sharedService.activate();
        startReadinessWatchers();
      };

      // Kick off immediately in a microtask to avoid delaying first $sync calls
      queueMicrotask(init);
    }

    const READ_THROUGH_METHODS = new Set([
      "getThreads",
      "getMessagesForThread",
      "searchThreads",
    ]);

    function enqueue(level: Level, method: string, args: any[]) {
      ensureInit();
      return new Promise((resolve, reject) => {
        const canCallNow =
          sharedService &&
          ((level === "provider" && providerReady) ||
            (level === "sync" && syncReady));

        // For read-only provider calls, attempt a direct call even if providerReady flag
        // hasn’t flipped yet. The proxy will wait for the provider port when it’s ready.
        const tryDirect =
          sharedService &&
          level === "provider" &&
          READ_THROUGH_METHODS.has(method);

        if (canCallNow || tryDirect) {
          Promise.resolve(sharedService!.proxy[method]!(...args))
            .then(resolve)
            .catch((err) => {
              // If it still fails (e.g., provider port not ready), fall back to queueing.
              queue.push({ level, method, args, resolve, reject });
              // Re-try flush soon to recover quickly
              setTimeout(flushQueue, 50);
            });
        } else {
          queue.push({ level, method, args, resolve, reject });
        }
      });
    }

    return {
      provide: {
        sync: {
          async setAuthInfo(endpoint: string, token: string) {
            return enqueue("provider", "setAuthInfo", [endpoint, token]);
          },
          async newThread(params: {
            content: string;
            attachments?: any[];
            options: { name: string; thinkingBudget: string };
          }) {
            return enqueue("sync", "newThread", [params]);
          },
          async getThreads() {
            return enqueue("provider", "getThreads", []);
          },
          async getMessagesForThread(threadId: string) {
            return enqueue("provider", "getMessagesForThread", [threadId]);
          },
          async updateThread(id: string, update: any) {
            return enqueue("sync", "updateThread", [id, update]);
          },
          async sendMessage(params: {
            threadId: string;
            content: string;
            attachments?: any[];
            options: { name: string; thinkingBudget: string };
          }) {
            return enqueue("sync", "sendMessage", [params]);
          },
          async getKV(name: string) {
            return enqueue("sync", "getKV", [name]);
          },
          async setKV(name: string, value: string) {
            return enqueue("sync", "setKV", [name, value]);
          },
          async retryMessage(
            messageId: string,
            options?: { model?: string; thinkingBudget?: string },
          ) {
            return enqueue("sync", "retryMessage", [messageId, options]);
          },
          async branchThread(
            threadId: string,
            messageId: string,
            newThreadId: string,
          ) {
            return enqueue("sync", "branchThread", [
              threadId,
              messageId,
              newThreadId,
            ]);
          },
          async updateMessage(
            id: string,
            update: { data?: any; deleted?: boolean },
          ) {
            return enqueue("sync", "updateMessage", [id, update]);
          },
          async searchThreads(query: string) {
            return enqueue("provider", "searchThreads", [query]);
          },
          async clear() {
            return enqueue("provider", "clear", []);
          },
        },
      },
    };
  },
});
