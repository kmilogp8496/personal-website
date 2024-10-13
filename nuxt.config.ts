// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  content: {
    sources: {
      content: {
        driver: 'fs',
        name: 'app',
        prefix: '/', // All contents inside this source will be prefixed with `/`
        base: 'app/content',
      },
    },
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai',
      },
    },
  },
  uiPro: {
    content: true,
  },
  extends: ['@nuxt/ui-pro'],

  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/ui'],

  eslint: {
    config: {
      stylistic: true,
    },
  },

  compatibilityDate: '2024-10-13',
})
