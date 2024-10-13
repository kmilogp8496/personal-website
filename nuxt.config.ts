// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  experimental: {
    componentIslands: true
  },
  site: {
    url: 'https://kmilo.dev',
    indexable: true,
  },
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

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    'nuxt-og-image',
    '@nuxtjs/seo',
    '@nuxt/image',
  ],

  eslint: {
    config: {
      stylistic: true,
    },
  },

  compatibilityDate: '2024-10-13',
})