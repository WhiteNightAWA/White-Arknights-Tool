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
    mapData: JSON.parse(window.localStorage.getItem("stage_table"))
  },
  mutations: {
    doneSetup (state) {
      state.done = true
      window.localStorage.setItem("done", "true")
    },
    reloadMapData (state) {
      state.mapData =  JSON.parse(window.localStorage.getItem("stage_table"))
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
