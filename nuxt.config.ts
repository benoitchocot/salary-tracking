// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // SPA mode (SSR disabled)
  ssr: false,

  modules: [
    '@nuxt/ui'
  ],

  css: ['~/assets/css/main.css'],

  // Capacitor configuration
  app: {
    head: {
      title: 'Suivi de Salaires',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Application de suivi des salaires mensuels' }
      ]
    }
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false
  }
})
