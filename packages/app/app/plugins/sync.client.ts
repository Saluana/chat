export default defineNuxtPlugin({
  name: "sync",
  async setup() {
    navigator.serviceWorker.register("SharedService_ServiceWorker.js");
    const sharedService = new SharedService(
      "sync-service",
      syncServiceProvider,
    );
    sharedService.activate();
    return {
      provide: {
        sync: {
          async setAuthInfo(endpoint: string, token: string) {
            return await sharedService.proxy["setAuthInfo"]!(endpoint, token);
          },
          async newThread(params: {
            messageContent: string;
            model: string;
            thinkingBudget: string;
          }) {
            return await sharedService.proxy["newThread"]!(params);
          },
          addThread: sharedService.proxy["addThread"],
          getThreads: sharedService.proxy["getThreads"],
          getMessagesForThread: sharedService.proxy["getMessagesForThread"],
          async updateThread(id: string, update: any) {
            return await sharedService.proxy["updateThread"]!(id, update);
          },
          async sendMessage(threadId: string, message: any, options: any) {
            return await sharedService.proxy["sendMessage"]!(
              threadId,
              message,
              options,
            );
          },
          async getKV(name: string) {
            return await sharedService.proxy["getKV"]!(name);
          },
          async setKV(name: string, value: string) {
            return await sharedService.proxy["setKV"]!(name, value);
          },
          async retryMessage(messageId: string, options?: { model?: string; thinkingBudget?: string }) {
            return await sharedService.proxy["retryMessage"]!(messageId, options);
          },
        },
      },
    };
  },
});
