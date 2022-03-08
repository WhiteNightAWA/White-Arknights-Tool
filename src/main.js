import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    done: window.localStorage.getItem("done")==="true",
    stage_table: JSON.parse(window.localStorage.getItem("stage_table")),
    zone_table: JSON.parse(window.localStorage.getItem("zone_table")),
    chapter_table: JSON.parse(window.localStorage.getItem("chapter_table"))
  },
  mutations: {
    doneSetup (state) {
      state.done = true
      window.localStorage.setItem("done", "true")
    },
    reloadData (state) {
      state.stage_table = JSON.parse(window.localStorage.getItem("stage_table"))
      state.zone_table = JSON.parse(window.localStorage.getItem("zone_table"))
      state.chapter_table = JSON.parse(window.localStorage.getItem("chapter_table"))
    }
  }
})

console.log(store.state.count)

new Vue({
  router,
  vuetify,
  i18n,
  el: '#app',
  store: store,
  render: h => h(App)
}).$mount('#app')
