const { defineConfig } = require('@vue/cli-service')
const Dotenv = require('dotenv-webpack');

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
  configureWebpack: {
    plugins: [
      new Dotenv()
    ],
    resolve: {
      fallback: {
        "child_process": false,
        "process": false,
        "fs": false,
        "util": false,
        "http": false,
        "https": false,
        "tls": false,
        "net": false,
        "crypto": false,
        "path": false,
        "os": false,
        "stream": false,
        "zlib": false,
        "url": false
      }
    }
  }
})
