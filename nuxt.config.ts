// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  extends: ["@nuxt/ui-pro"],
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  colorMode: {
    preference: "light",
  },
  runtimeConfig: {
    public: {
      directus: {
        url: "",
        readMe: "id, email, role, first_name, last_name",
      },
    },
  },
})
