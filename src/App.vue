<template>
  <v-app>
    <v-main>

        <SideBar class="theme--dark">
          <router-view/>
          <footer>

          </footer>
        </SideBar>

    </v-main>
     <languageSetting :dialog="languageDialog" :change.sync="languageDialog" />
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar/SideBar.vue'
import languageSetting from "@/components/Setting/languageSetting";

export default {
  name: 'App',

  data () {
    return {
      languageDialog: window.localStorage.getItem("language") === null,
    }
  },
  components: {
    SideBar,
    languageSetting
  },
  computed: {
  }
}
</script>

<style>
SideBar {

}
v-main {
  margin: 0 !important;
  padding: 0 !important;
}
.v-tooltip__content {
  height: auto !important;
  padding: 10px !important;
}
</style>

