import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
export const langList = {};

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      console.log(locales(key))
      const locale = matched[1]
      messages[locale] = locales(key)
      langList[locale] = locales(key)["name"]
    }
  })
  console.log(messages, langList)
  return messages
}

export default new VueI18n({
  locale: window.localStorage.getItem("language"),
  fallbackLocale: 'en',
  messages: loadLocaleMessages()
})
