<template>
  <v-card
      class="mx-auto overflow-hidden"
  >
    <v-app-bar
        elevation="24"
        color="primary"
        style="position: fixed; z-index: 5;"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>White Arknights Tool{{ " - "+ $router.currentRoute.path.replace("/", "") }}</v-toolbar-title>

    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        style="position: fixed;"
    >
      <div style="display: flex; flex-direction: column" class="align-center justify-center ma-5">
        <img v-if="this.$vuetify.theme.dark" src="@/assets/logo_dark.png" alt="logo" class="center logo" style="width: 10em;">
        <img v-else src="@/assets/logo_light.png" alt="logo" class="logo" style="width: 10em;">
        <h3>White Arknights Tool</h3>
      </div>
      <v-divider/>
      <v-list
          nav
          dense
      >
        <div class="item"
             v-for="i in items.filter(i => {return !i.name.startsWith(':')})" :key="i.name"
             :class="{ selected: isActive(i.path) }"
        >
          <router-link :to="i.path">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>{{ i.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t(i.name) }}</v-list-item-title>
            </v-list-item>

          </router-link>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-card-text style="margin-top: 64px">
      <router-view/>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "PhonePage",
  data() {
    return {
      drawer: false,
      items: this.$router.options.routes,
    }
  },
  methods: {
    isActive: function (to) {
      return this.$router.currentRoute.path === to
    }
  }
}
</script>

<style scoped>

</style>