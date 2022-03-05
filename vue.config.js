const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],

  publicPath: process.env.NODE_ENV === 'production'
      ? '/White-Arknights-Tool/'
      : '/',

  pluginOptions: {
    i18n: {
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false
    }
  },

})
