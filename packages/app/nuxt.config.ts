// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  build: {
    transpile: ["wa-sqlite", "estree-walker"],
  },
  vite: {
    optimizeDeps: {
      exclude: ["wa-sqlite", "estree-walker"],
    },
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "nuxt-svgo",
    "@pinia/nuxt",
    "nuxt-workers",
  ],
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css",
          integrity:
            "sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: "http://localhost:8787",
      authUrl: "",
      authClientID: "nuxflare-chat",
    },
  },
  css: ["~/assets/css/main.css"],
  svgo: {
    componentPrefix: "icon",
    autoImportPath: "~/assets/icons",
  },
});
