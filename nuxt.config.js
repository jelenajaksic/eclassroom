import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  mode: 'spa',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'e-classroom',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://localhost:8080',
    proxy: true
  },

  proxy: {
    '/api/': { target: 'http://localhost:8080', pathRewrite: { '^/api/': '' }, changeOrigin: true }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/common.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#627cda',
          // primary: '#54c1ed',
          accent: '#54c1ed',
          secondary: '#aac0f0',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass')
      },
      scss: {
        implementation: require('sass')
      }
    }
  }
}

// primary: '#54c1ed',
//   secondary: '#4bddc6',
//   white: '#e7eaef',
//   dark: '#2d495e',
//   warning: '#ffd15c',
//   error: '#f1543d',
//   success: '#abcc55'
