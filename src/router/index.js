import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage/HomePage.vue'
import SettingsPage from "@/views/SettingsPage/SettingsPage.vue"
import RaidersFinderPage from "@/views/RaidersFinder/RaidersFinderPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    icon: "mdi-home",
  }, {
    path: "/RaidersFinder",
    name: "Raiders Finder",
    component: RaidersFinderPage,
    icon: "mdi-magnify"
  }, {
    path: "/settings",
    name: "Setting",
    component: SettingsPage,
    icon: "mdi-cog",
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
