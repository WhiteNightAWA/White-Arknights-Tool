<template>
    <v-card style="height: 100%; width: 100%; text-align: center;" elevation="10">
      <h1><v-icon style="font-size: 2em">mdi-cog</v-icon>
        <br>{{ $t("Settings.title") }}</h1>
      <v-divider/>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-center">
              <h2>{{ $t("Settings.title") }}</h2>
            </th>
            <th class="text-center">
              <h2>{{ $t("Settings.current") }}</h2>
            </th>
            <th class="text-center">
              <h2>{{ $t("Settings.change") }}</h2>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ $t("Settings.language.name") }}</td>
            <td>
              {{ $t("name") }} ({{ getNowLang }})
            </td>
            <td>
              <v-btn @click="openLangMenu" color="primary" small>
                {{ $t("Settings.change") }}
              </v-btn>
            </td>
          </tr>
          <tr>
            <td>{{ $t("Settings.color.name") }}</td>
            <td>
              <v-icon v-if="autoDark" style="font-size: 40px">mdi-brightness-auto</v-icon>
              <i style="font-size: 40px" class="fa-solid fa-moon" v-else-if="$vuetify.theme.dark" />
              <i style="font-size: 40px" class="fa-solid fa-sun" v-else></i>
            </td>
            <td style="display: flex; justify-content: center; align-items: center;">
              <div class="text-center align-center justify-space-around">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span
                        v-bind="attrs"
                        v-on="on"
                    ><v-checkbox
                        v-model="autoDark"
                        @click="changeAutoDark"
                    /></span>
                  </template>
                  <span>{{ $t("Settings.color.auto") }}</span>
                </v-tooltip>
              </div>

              <v-switch
                  :disabled="autoDark"
                  v-model="$vuetify.theme.dark"
                  inset
                  persistent-hint
                  class="darkControl"
                  color="dark "
                  @change="changeDarkTheme"
              ></v-switch>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
</template>

<script>


export default {
  name: "SettingMenu",
  data() {
    if (window.localStorage.getItem("autoDark")===null){
      window.localStorage.setItem("autoDark", "true")
    }
    if (window.localStorage.getItem("autoDark")==="true"){
      this.$vuetify.theme.dark = window.matchMedia("(prefers-color-scheme: dark)").matches
    } else this.$vuetify.theme.dark = window.localStorage.getItem("darkTheme") === "true";
    return {
      test: this.$i18n.locale,
      autoDark: window.localStorage.getItem("autoDark")==="true",
      darkTheme: this.$vuetify.theme.dark
    }
  },
  components: {

  },
  methods: {
    openLangMenu (){
      this.$root.$emit("openLang")
    },
    changeAutoDark(){
      window.localStorage.setItem("autoDark", this.autoDark.toString());
      if (this.autoDark) {
        this.$vuetify.theme.dark = window.matchMedia("(prefers-color-scheme: dark)").matches
      }
      window.localStorage.setItem("darkTheme", this.$vuetify.theme.dark.toString())

    },
    changeDarkTheme() {
      window.localStorage.setItem("darkTheme", this.$vuetify.theme.dark.toString())
    }
  },
  computed: {
    getNowLang () {
      return this.$i18n.locale
    },
    getDarkTheme () {
      return this.$vuetify.theme.dark
    }
  },
  props: {
  }
}

</script>

<style>
div.darkControl div.v-input__slot {
  justify-content: center;

}
</style>