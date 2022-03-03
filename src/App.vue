<template>
  <v-app>
    <v-main>

        <SideBar class="theme--dark">
          <router-view/>
          <footer>

          </footer>
        </SideBar>

    </v-main>
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar/SideBar.vue'

export default {
  name: 'App',

  data: () => ({

  }),
  components: {
    SideBar
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

