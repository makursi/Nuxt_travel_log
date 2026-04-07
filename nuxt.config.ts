// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import "./app/lib/env";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["./app/assets/css/main.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@pinia/nuxt",
    "nuxt-csurf",
    "nuxt-maplibre",
    "@nuxtjs/color-mode",
    "@vee-validate",
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: { include: ["maplibre-gl"] },
  },
  colorMode: {
    dataValue: "theme",
  },
});
