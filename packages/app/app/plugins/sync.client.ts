export default defineNuxtPlugin({
  name: "sync",
  async setup() {
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
          _ready = await sharedService.proxy["isReady"]!();
          readyResolvers.forEach((res) => res());
        } catch (err) {
          console.log("err", err);
          // retry
        }
      }
      while (!_syncReady) {
        await new Promise((res) => setTimeout(res, 30));
        try {
          _syncReady = await sharedService.proxy["isSyncReady"]!();
          syncReadyResolvers.forEach((res) => res());
        } catch (err) {
          console.log("err", err);
          // retry
        }
      }
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
            messageContent: string;
            model: string;
            thinkingBudget: string;
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
          async sendMessage(threadId: string, message: any, options: any) {
            await isSyncReady();
            return await sharedService.proxy["sendMessage"]!(
              threadId,
              message,
              options,
            );
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
        },
      },
    };
  },
});
