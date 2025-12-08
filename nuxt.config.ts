// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css : ['~/styles/main.scss'],
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/sanity'
  ],
  
  sanity: {
    projectId: 'nhw1hulo',
    dataset: 'production'
  },

  typescript: {
    typeCheck: true
  },

  runtimeConfig: {
    public: {
      apiUrl:''
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/styles/foundations/_variables.scss" as *;
                        @use "~/styles/foundations/_mixins.scss" as *;
                        @use "~/styles/foundations/_functions.scss" as *;`
        }
      }
    }
  }
})