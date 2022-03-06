<template>
    <v-card style="height: 100%; width: 100%; text-align: center;" elevation="10">
      <h1><v-icon style="font-size: 2em" class="settingsIcon">mdi-cog</v-icon>
        <br>{{ $t("Settings.title") }}</h1>
      <v-divider/>
      <v-simple-table>
        <template v-slot:default>

          <thead>

          <tr>
            <th class="text-center" style="font-size: 1em">
              <h2>{{ $t("Settings.title") }}</h2>
            </th>
            <th class="text-center" style="font-size: 1em">
              <h2>{{ $t("Settings.current") }}</h2>
            </th>
            <th class="text-center" style="font-size: 1em">
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
              <v-select
                  class="changeLang"
                  @change="changeLang(selectLang.id)"
                  v-model="selectLang"
                  :items="langList"
                  item-text="name"
                  prepend-icon="mdi-translate"
                  item-value="id"
                  menu-props="auto"
                  label="Select"
                  persistent-hint
                  return-object
                  single-line
              ></v-select>
            </td>
          </tr>
          <tr>
            <td>{{ $t("Settings.color.name") }}</td>
            <td>
              <v-icon v-if="autoDark" style="font-size: 40px">mdi-brightness-auto</v-icon>
              <v-icon style="font-size: 40px" v-else-if="$vuetify.theme.dark">mdi-weather-night</v-icon>
              <v-icon style="font-size: 40px" v-else>mdi-white-balance-sunny</v-icon>
            </td>
            <td>
              <div style="display: flex; justify-content: center">
                <div>
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
              </div>

            </td>
          </tr>
          <tr>
            <td>
              {{ $t("Settings.server.name") }}
            </td>
            <td>
              {{ $t(`setup.servers.${selectServer.id}`) }}
            </td>
            <td>
              <v-select
                  @change="changeServer(selectServer); upDateData=true"
                  v-model="selectServer"
                  :items="servers"
                  prepend-icon="mdi-server"
                  item-text="name"
                  item-value="id"
                  menu-props="auto"
                  label="Select"
                  persistent-hint
                  return-object
                  single-line
              ></v-select>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-dialog v-model="upDateData" persistent>
        <v-card
            class="text-center"
            style="padding: 60px;"
        >
          <h1>{{ $t("Settings.server.update") }}</h1>
          <br>
          <h3>{{ $t("setup.step3.desc", {server: $t(`setup.servers.${selectServer.id}`)}) }}</h3>
          <br>
          <v-btn v-if="finishDownload" color="success" @click="upDateData=false; finishDownload=false; loading=false">
            <v-icon
                    >mdi-check</v-icon>
          </v-btn>

          <v-btn v-else-if="!loading" @click="loadData(selectServer)">
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              v-else
          ></v-progress-linear>
        </v-card>
      </v-dialog>
    </v-card>

</template>

<script>
import { langList } from "@/i18n.js"
import $ from "jquery";


export default {
  name: "SettingMenu",
  data() {
    return {
      test: this.$i18n.locale,
      autoDark: window.localStorage.getItem("autoDark")==="true",
      darkTheme: this.$vuetify.theme.dark,
      langList: langList,
      selectLang: {
        id: window.localStorage.getItem("language"),
        name: window.localStorage.getItem("langName")
      },
      selectServer: JSON.parse(window.localStorage.getItem("server")),
      upDateData: false,
      loading: false,
      finishDownload: false
    }
  },
  components: {

  },
  methods: {
    resetUpdate: function() {
      this.loading = false
      this.finishDownload = false
    },
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
    },
    changeLang(l){
      this.$i18n.locale = l;
      window.localStorage.setItem("language", l)
    },
    changeServer(s){
      window.localStorage.setItem("server", JSON.stringify(s))
    },
    loadData (selectServer) {
      this.loading = true
      const urls = {
        "zone_table": `https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/${selectServer.id}/gamedata/excel/zone_table.json`,
        "stage_table": `https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/${selectServer.id}/gamedata/excel/stage_table.json`,
        "chapter_table": `https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/${selectServer.id}/gamedata/excel/chapter_table.json`
      }
      let now = 1;
      setTimeout(()=> {
        Object.keys(urls).forEach(k => {
          $.ajax({
            url: urls[k],
            async: false,
            dataType: 'json',
            success: function (json) {
              window.localStorage.setItem(k, JSON.stringify(json));
              console.log(json)
            }
          });
          this.loadingValue = now / Object.keys(urls).length

          now++

        })
        this.loadingValue = 100
        this.loading = false
        this.finishDownload = true
      }, 2000)


    }
  },
  computed: {
    getNowLang () {
      return this.$i18n.locale
    },
    getDarkTheme () {
      return this.$vuetify.theme.dark
    },
    getNowServer () {
      return JSON.parse(window.localStorage.getItem("server")).name
    },
    servers: function () {
      let servers = ["en_US", "ja_JP", "ko_KR", "zh_CN", "zh_TW"]
      let Servers = []
      servers.forEach(s => {
        Servers.push({
          id: s,
          name: this.$t(`setup.servers.${s}`)
        })
      })
      return Servers
    },
  },
  props: {
  }
}

</script>

<style>
div.darkControl div.v-input__slot {
  justify-content: center;

}
.settingsIcon {
  -webkit-animation:spin 4s linear infinite;
  -moz-animation:spin 4s linear infinite;
  animation:spin 4s linear infinite;
}

@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }



tr>td {
  width: 20%;
}
</style>