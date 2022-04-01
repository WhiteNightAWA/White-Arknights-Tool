import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage/HomePage.vue'
import SettingsPage from "@/views/SettingsPage/SettingsPage.vue"
import StrategiesFinderPage from "@/views/StrategiesFinder/StrategiesFinderPage";
import OperatorsPage from "@/views/OperatorsPage/OperatorsPage";
import NotFoundPage from "@/pages/NotFoundPage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Sidebar.Home',
    component: HomePage,
    icon: "mdi-home",
  }, {
    path: "/StrategiesFinder",
    name: "Sidebar.RF",
    component: StrategiesFinderPage,
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
  }, {
    path: "*",
    name: ":404 Page",
    component: NotFoundPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
