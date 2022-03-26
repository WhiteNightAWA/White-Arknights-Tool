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
    chapter_table: JSON.parse(window.localStorage.getItem("chapter_table")),
    character_table: JSON.parse(window.localStorage.getItem("character_table")),
    elite: 0,
    myOperators: JSON.parse(window.localStorage.getItem("myOperators"))
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
      state.character_table = JSON.parse(window.localStorage.getItem("character_table"))
    },
    setElite (state, payload) {
      state.elite = payload.elite
    },
    addOperators (state, payload) {
      let get = window.localStorage.getItem("myOperators");
      let data = {}
      if (get === null) {
        data[payload.id] = payload.operator
        window.localStorage.setItem("myOperators", JSON.stringify(data))
        state.myOperators = (data)
      } else {
        data = JSON.parse(get)
        data[payload.id] = payload.operator
        window.localStorage.setItem("myOperators", JSON.stringify(data))
        state.myOperators = data
      }
    },
    changeOperators (state, payload) {
      let data = JSON.parse(window.localStorage.getItem("myOperators"))
      data[payload.id] = payload.operator
      window.localStorage.setItem("myOperators", JSON.stringify(data))
      state.myOperators = data
    },
    replaceOperators (state, payload) {
      window.localStorage.setItem("myOperators", JSON.stringify(payload.data))
      state.myOperators = payload.data
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
