export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      turnstileSiteKey: ''
    }
  },

  nitro: {
    externals: {
      traceInclude: [
        './public/Images/**'
      ]
    }
  }
})