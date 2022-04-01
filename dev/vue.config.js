const { defineConfig } = require('@vue/cli-service')
const path = require("path");


module.exports = defineConfig({

  outputDir: path.resolve(__dirname, "./../docs"),

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
