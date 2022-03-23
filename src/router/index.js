import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage/HomePage.vue'
import SettingsPage from "@/views/SettingsPage/SettingsPage.vue"
import RaidersFinderPage from "@/views/RaidersFinder/RaidersFinderPage";
import OperatorsPage from "@/views/OperatorsPage/OperatorsPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Sidebar.Home',
    component: HomePage,
    icon: "mdi-home",
  }, {
    path: "/RaidersFinder",
    name: "Sidebar.RF",
    component: RaidersFinderPage,
    icon: "mdi-magnify"
  }, {
    path: "/operators",
    name: "Sidebar.Operators",
    component: OperatorsPage,
    icon: "mdi-account-multiple",
  }, {
    path: "/settings",
    name: "Sidebar.Settings",
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
