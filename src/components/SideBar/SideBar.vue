<template>
  <div style="display: flex; height: 100%;">
    <v-card style="height: 100%; position: fixed; z-index: 99; top: 0;"  class="sidebar">
      <v-navigation-drawer class="sidebar"
          permanent
          expand-on-hover
          v-model="drawer"
          :mini-variant.sync="mini"
      >
        <v-list>

          <v-list-item>
            <v-list-item-content>
              <div v-if="mini">
                <h1 class="headingText">W</h1>
                <h1 class="headingText">A</h1>
                <h1 class="headingText">T</h1>
              </div>
              <div v-else>
                <h1 class="headingText">White</h1>
                <h1 class="headingText">Arknights</h1>
                <h1 class="headingText">Tool</h1>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
            nav
            dense
        >
          <div class="item"
               v-for="i in items" :key="i.name"
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
    </v-card>
    <v-card class="display" :class="{ opened: !mini }">
      <slot/>
    </v-card>
  </div>
</template>

<script>
// import SideBarLink from "@/components/SideBar/SideBarLink";

export default {
  components: {
   // SideBarLink
  },
  data () {

    return {
      drawer: null,
      mini: true,
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

<style>
h1.headingText {
  text-align: center;
}
a {
  text-decoration: none;
  color: white;
}
div.display {
  margin-left: 56px;
  width: 100%;
  height: 100%;
  transition: filter 0.5s;
}
div.opened {
  -webkit-filter: brightness(0.5);
  filter: brightness(0.5);
}
.v-list-item__title {
}
div.item {
  transition: background-color 1s, color 1s;
  border-radius: 5px;
  margin: 5px 0;
}
div.item.selected {
  background-color: #666;
}
div.item.selected i, div.item.selected div.v-list-item__title {
  color: #fff;

}
div.sidebar.theme--dark {
  box-shadow: 1px 0 5px white !important;
}
div.sidebar.theme--light {
  box-shadow: 1px 0 5px black !important;
}
div.sidebar.theme--dark:hover {
  box-shadow: 5px 0 10px white !important;
}
div.sidebar.theme--light:hover {
  box-shadow: 5px 0 10px black !important;
}
</style>
