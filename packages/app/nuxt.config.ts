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
    "@nuxtjs/mdc",
  ],
  runtimeConfig: {
    public: {
      apiUrl: "http://localhost:8787",
      authUrl: "https://auth.prodemo.nuxflare.com",
    },
  },
  css: ["~/assets/css/main.css"],
  svgo: {
    componentPrefix: "icon",
    autoImportPath: "~/assets/icons",
  },
});
