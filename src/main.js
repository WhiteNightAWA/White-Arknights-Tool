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
      if (get === null) {
        let data = {}
        data[payload.id] = payload.operator
        window.localStorage.setItem("myOperators", JSON.stringify(data))
        this.state.myOperators = (data)
      } else {
        get[payload.id] = payload.operator
        window.localStorage.setItem("myOperators", JSON.stringify(get))
        this.state.myOperators[payload.id] = payload.operator
      }
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
