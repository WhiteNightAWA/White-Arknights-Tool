<template>
  <v-app>
    <v-main>
        <SideBar class="theme--dark">
          <router-view/>
          <footer>

          </footer>
        </SideBar>

    </v-main>
      <v-dialog
        v-model="setup"
        persistent
        >
        <v-card class="text-center">
          <h1>{{ $t("setup.title") }}</h1>
          <v-stepper v-model="e1" style="padding-bottom: 1em;">
            <v-stepper-header>

              <v-stepper-step
                  :complete="e1 > 1"
                  step="1"
              >
                {{ $t("setup.step1.title") }}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                  :complete="e1 > 2"
                  step="2"
              >
                {{ $t("setup.step2.title") }}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 3" step="3">
                {{ $t("setup.step3.title") }}
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card
                    class="mb-12"
                    height="200px"
                    style="padding: 60px;"
                >
                  <v-select
                      @change="changeLang(selectLang)"
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
                </v-card>
                <v-btn
                    v-if="e1 < 2"
                    color="primary"
                    @click="e1 += 1"
                    :disabled="selectLang === null"
                >
                  {{ $t("setup.next") }}
                </v-btn>
                <br>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card
                    class="mb-12"
                    height="200px"
                    style="padding: 60px;"
                >
                  <v-select
                      @change="changeServer(selectServer)"
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
                </v-card>
                <v-btn
                    v-if="e1 < 3"
                    color="primary"
                    @click="e1 += 1"
                    :disabled="selectServer === null"
                >
                  {{ $t("setup.next") }}
                </v-btn>
                <br>

              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card
                    class="mb-12"
                    height="200px"
                    style="padding: 60px;"

                >

                  <h3>{{ $t("setup.step3.desc", {server: getServerName}) }}</h3>
                  <br>
                    <v-icon v-if="finishDownload"
                            color="success">mdi-check</v-icon>
                  <v-btn v-else-if="!loading" @click="loadData(selectServer)">
                    <v-icon>mdi-play</v-icon>
                  </v-btn>
                  <v-progress-linear
                      :active="loading"
                      :value="loadingValue"
                      rounded
                      v-else
                      :indeterminate="indexing"
                  ></v-progress-linear>
                  <br>
                  <p v-if="loading">Loading: <code>{{ nowLoading }}</code> </p>


                </v-card>
                <v-btn
                    v-if="e1 < 4"
                    color="success"
                    @click="doneSetup"
                    :disabled="!finishDownload"
                >
                  {{ $t("setup.done") }}
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar/SideBar.vue'
import { langList } from "@/i18n.js"
import $ from "jquery";
import {pinyin} from "pinyin-pro";

export default {
  name: 'App',

  data () {
    return {
      lang: this.$i18n.locale,
      langList: langList,
      e1: 1,
      selectLang: null,
      selectServer: null,
      downloaded: null,
      loading: false,
      finishDownload: false,
      loadingValue: 0,
      nowLoading: "..."


    }
  },
  components: {
    SideBar
  },
  computed: {
    setup: function () {
      return !this.$store.state.done
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
    getServerName: function () {
      if (this.selectServer!== null){
        return this.selectServer.name
      }
      return null
    },
    indexing: function() {
      return this.loadingValue === 100
    }
  },
  methods: {
    changeLang(l){
      this.$i18n.locale = l.id;
      window.localStorage.setItem("language", l.id)
      window.localStorage.setItem("langName", l.name)
    },
    changeServer(s){
      window.localStorage.setItem("server", JSON.stringify(s))
    },
    doneSetup () {
      this.$store.commit("doneSetup")
      this.$store.commit("reloadData")
    },
    loadData: function (selectServer) {
      this.loadingValue = 0
      this.loading = true
      const urls = {
        "zone_table": `https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/${selectServer.id}/gamedata/excel/zone_table.json`,
        "stage_table": `https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/${selectServer.id}/gamedata/excel/stage_table.json`,
        "chapter_table": `https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/${selectServer.id}/gamedata/excel/chapter_table.json`,
        "character_table": `https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/${selectServer.id}/gamedata/excel/character_table.json`
      }
      let now = 1;
      setTimeout(async ()=> {
        for (const k of Object.keys(urls)) {
          this.nowLoading = k.replace("_", " ")
          $.ajax({
            url: urls[k],
            async: false,
            dataType: 'json',
            success: function (json) {
              if (k === "character_table") {
                Object.keys(json).forEach(c => {
                  json[c]["pinyinFull"] = pinyin(json[c].name, {toneType: "none", type: "array"}).join("")
                  json[c]["pinyinHead"] = pinyin(json[c].name, {toneType: "none", pattern: "initial", type: "array"}).join("")
                })
              }
              window.localStorage.setItem(k, JSON.stringify(json));
              console.log(json)
            }
          });
          this.loadingValue = (now / (Object.keys(urls).length+1))*100

          now++
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        this.loadingValue = 100
        this.nowLoading = "Importing..."
        await new Promise(resolve => setTimeout(resolve, 3000));

        this.loading = false
        this.finishDownload = true

      })
    },
  },
  mounted() {
    this.$root.$on("openLang", ()=> {

    })
  },
  created() {
    this.$root.$refs.App = this;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
       this.$vuetify.theme.dark = e.matches
    });
    if (window.localStorage.getItem("autoDark")===null){
      window.localStorage.setItem("autoDark", "true")
    }
    if (window.localStorage.getItem("autoDark")==="true"){
      this.$vuetify.theme.dark = window.matchMedia("(prefers-color-scheme: dark)").matches
    } else this.$vuetify.theme.dark = window.localStorage.getItem("darkTheme") === "true";

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
div.v-dialog {
  min-width: 50%;
  width: auto;
  max-width: 75%;
}
</style>

