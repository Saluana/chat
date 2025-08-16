export default defineNuxtPlugin({
  name: "sync",
  async setup() {
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
            async setAuthInfo() {
              /* no-op */
            },
            async newThread() {
              throw new Error("Sync not available in this environment");
            },
            async getThreads() {
              return [];
            },
            async getMessagesForThread() {
              return [];
            },
            async updateThread() {
              /* no-op */
            },
            async sendMessage() {
              throw new Error("Sync not available in this environment");
            },
            async getKV(name: string) {
              return fallbackKVGet(name);
            },
            async setKV(name: string, value: string) {
              return fallbackKVSet(name, value);
            },
            async retryMessage() {
              /* no-op */
            },
            async branchThread() {
              /* no-op */
            },
            async updateMessage() {
              /* no-op */
            },
            async searchThreads() {
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

    await navigator.serviceWorker
      .register("SharedService_ServiceWorker.js")
      .then(() => navigator.serviceWorker.ready);
    const sharedService = new SharedService(
      "sync-service",
      syncServiceProvider,
    );
    sharedService.activate();

    let _ready = false;
    let _syncReady = false;
    const readyResolvers: Function[] = [];
    const syncReadyResolvers: Function[] = [];
    (async () => {
      while (!_ready) {
        await new Promise((res) => setTimeout(res, 30));
        try {
          _ready = await Promise.race([
            new Promise((res) => setTimeout(res, 100)),
            sharedService.proxy["isReady"]!(),
          ]);
        } catch (err) {
          console.log("err", err);
          // retry
        }
      }
      console.log("_ready");
      readyResolvers.forEach((res) => res());
      while (!_syncReady) {
        await new Promise((res) => setTimeout(res, 30));
        try {
          _syncReady = await sharedService.proxy["isSyncReady"]!();
        } catch {
          // retry
        }
      }
      console.log("_syncReady");
      syncReadyResolvers.forEach((res) => res());
    })();

    async function isReady() {
      if (_ready) return true;
      return new Promise((res) => {
        readyResolvers.push(res);
      });
    }
    async function isSyncReady() {
      if (_syncReady) return true;
      return new Promise((res) => {
        syncReadyResolvers.push(res);
      });
    }

    return {
      provide: {
        sync: {
          async setAuthInfo(endpoint: string, token: string) {
            await isReady();
            return await sharedService.proxy["setAuthInfo"]!(endpoint, token);
          },
          async newThread(params: {
            content: string;
            attachments?: any[];
            options: { name: string; thinkingBudget: string };
          }) {
            await isSyncReady();
            return await sharedService.proxy["newThread"]!(params);
          },
          async getThreads() {
            await isReady();
            return await sharedService.proxy["getThreads"]!();
          },
          async getMessagesForThread(threadId: string) {
            await isReady();
            return await sharedService.proxy["getMessagesForThread"]!(threadId);
          },
          async updateThread(id: string, update: any) {
            await isSyncReady();
            return await sharedService.proxy["updateThread"]!(id, update);
          },
          async sendMessage(params: {
            threadId: string;
            content: string;
            attachments?: any[];
            options: { name: string; thinkingBudget: string };
          }) {
            await isSyncReady();
            return await sharedService.proxy["sendMessage"]!(params);
          },
          async getKV(name: string) {
            await isSyncReady();
            return await sharedService.proxy["getKV"]!(name);
          },
          async setKV(name: string, value: string) {
            await isSyncReady();
            return await sharedService.proxy["setKV"]!(name, value);
          },
          async retryMessage(
            messageId: string,
            options?: { model?: string; thinkingBudget?: string },
          ) {
            await isSyncReady();
            return await sharedService.proxy["retryMessage"]!(
              messageId,
              options,
            );
          },
          async branchThread(
            threadId: string,
            messageId: string,
            newThreadId: string,
          ) {
            await isSyncReady();
            return await sharedService.proxy["branchThread"]!(
              threadId,
              messageId,
              newThreadId,
            );
          },
          async updateMessage(
            id: string,
            update: { data?: any; deleted?: boolean },
          ) {
            await isSyncReady();
            return await sharedService.proxy["updateMessage"]!(id, update);
          },
          async searchThreads(query: string) {
            await isReady();
            return await sharedService.proxy["searchThreads"]!(query);
          },
          async clear() {
            await isReady();
            return await sharedService.proxy["clear"]!();
          },
        },
      },
    };
  },
});
