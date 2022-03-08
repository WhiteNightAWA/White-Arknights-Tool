<template>
  <v-card style="height: 100%; width: 100%; text-align: center;" elevation="10">
    <h1>
      <v-icon style="font-size: 2em" class="settingsIcon">mdi-cog</v-icon>
      <br>{{ $t("Settings.title") }}
    </h1>
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
        <tr>
          <td>
            {{ $t("Settings.data.name") }}
          </td>
          <td>
            {{ totalData }} KB
          </td>
          <td>
            <v-btn color="primary" @click="mangeData=true">
              {{ $t("Settings.data.manage") }}
            </v-btn>
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
        <v-btn v-if="finishDownload" color="success" @click="reload">
          <v-icon>mdi-check</v-icon>
        </v-btn>

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
        <p v-if="loading">Loading: <code>{{ nowLoading }}</code></p>

      </v-card>
    </v-dialog>
    <v-dialog v-model="mangeData" scrollable>
      <v-card class="text-center" style="padding: 1em;">
        <v-card-title class="justify-center">
          <h1>{{ $t("Settings.data.manage") }}</h1>
        </v-card-title>
        <h4 class="text--secondary">~ {{ totalData }} KB</h4>

        <v-card-text>

          <v-divider/>
          <v-expansion-panels accordion>
            <v-expansion-panel
                v-for="kind in dataKindList"
                :key="kind"
            >
              <v-expansion-panel-header>
                <v-col
                    cols="8"
                >
                  <h4>{{ $t(`Settings.data.${kind}`) }}</h4>

                </v-col>
                <v-col
                    cols="8"
                    class="text--secondary"
                >
                <span>
                {{ $t("Settings.data.total") }}: {{ totalStorage[kind]["total"] }} KB
              </span>
                </v-col>

              </v-expansion-panel-header>
              <v-divider/>
              <v-expansion-panel-content class="justify-center">
                <v-simple-table dense class="justify-center">
                  <template v-slot:default>
                    <tbody class="justify-center">
                    <tr
                        v-for="data in Object.keys(totalStorage[kind])"
                        :key="data"
                    >
                      <th class="text-center">
                        {{ data }}
                      </th>
                      <th class="text-center">
                        {{ totalStorage[kind][data] }} KB
                      </th>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-btn class="float-right" color="error" small @click="deleteData(kind)">
                    {{ $t("Settings.data.delete") }}
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="mangeData=false">
            {{ $t("Settings.data.cancel") }}
          </v-btn>
          <v-spacer/>
          <v-btn color="error" @click="deleteData('ALL DATA')">
            {{ $t("Settings.data.deleteAll") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="sureDelete" persistent>
      <v-card class="text-center pa-8 error">
        <v-card-title class="justify-center">
          <v-icon style="font-size: 10em">mdi-alert</v-icon>
        </v-card-title>
        <v-card-text>
          <h1 v-if="toDelete!==null" class="white--text">{{ $t("Settings.data.areUSure") }}<code>{{ toDelete }}</code>?</h1>
          *{{ $t("Settings.data.cannotUndo") }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="sureDelete = false">
            {{ $t("Settings.data.back") }}
          </v-btn>
          <v-spacer/>
          <v-text-field :label="$t('Settings.data.typeDelete')" v-model="sureText"/>
          <v-spacer/>
          <v-btn color="success" :disabled="sureTextCorrect" @click="sureDeleteData">
            {{ $t("Settings.data.sure") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>

</template>

<script>
import {langList} from "@/i18n.js"
import $ from "jquery";


export default {
  name: "SettingMenu",
  data() {
    return {
      test: this.$i18n.locale,
      autoDark: window.localStorage.getItem("autoDark") === "true",
      darkTheme: this.$vuetify.theme.dark,
      langList: langList,
      selectLang: {
        id: window.localStorage.getItem("language"),
        name: window.localStorage.getItem("langName")
      },
      selectServer: JSON.parse(window.localStorage.getItem("server")),
      upDateData: false,
      loading: false,
      finishDownload: false,
      loadingValue: 0,
      nowLoading: "...",
      mangeData: false,
      sureDelete: false,
      toDelete: null,
      sureText: "",
      dataKindList: [
        "localStorage", "caches"
      ]
    }
  },
  components: {},
  methods: {
    reload: function () {
      this.upDateData = false;
      this.finishDownload = false;
      this.loading = false;
      window.location.reload()
    },
    async deleteLocalStorage(){
      window.localStorage.clear()
    },
    async deleteCaches(){
      const cacheKeys = (await window.caches.keys()).filter(key => key.includes('runtime'));
      const cacheList = await Promise.all(cacheKeys.map(key => window.caches.open(key)));
      await Promise.all(
          cacheList.map(cache =>
              cache.keys().then(keys => Promise.all(keys.map(key => cache.delete(key)))),
          )
      );
      await Promise.all(cacheKeys.map(key => window.caches.delete(key)));
    },
    sureDeleteData: async function (){
      if (this.toDelete === "localStorage") {
        await this.deleteLocalStorage()
      } else if (this.toDelete === "caches") {
        await this.deleteCaches()
      } else if ( this.toDelete === "ALL DATA" ) {
        await this.deleteLocalStorage()
        await this.deleteCaches()
      }
      await this.$router.push('/')
      window.location.reload()
    },
    deleteData: function(data){
      this.toDelete = data
      this.sureDelete = true
    },
    resetUpdate: function () {
      this.loading = false
      this.finishDownload = false
    },
    openLangMenu() {
      this.$root.$emit("openLang")
    },
    changeAutoDark() {
      window.localStorage.setItem("autoDark", this.autoDark.toString());
      if (this.autoDark) {
        this.$vuetify.theme.dark = window.matchMedia("(prefers-color-scheme: dark)").matches
      }
      window.localStorage.setItem("darkTheme", this.$vuetify.theme.dark.toString())

    },
    changeDarkTheme() {
      window.localStorage.setItem("darkTheme", this.$vuetify.theme.dark.toString())
    },
    changeLang(l) {
      this.$i18n.locale = l;
      window.localStorage.setItem("language", l)
    },
    changeServer(s) {
      window.localStorage.setItem("server", JSON.stringify(s))
    },
    loadData: function (selectServer) {
      this.loadingValue = 0
      this.loading = true
      const urls = {
        "zone_table": `https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/${selectServer.id}/gamedata/excel/zone_table.json`,
        "stage_table": `https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/${selectServer.id}/gamedata/excel/stage_table.json`,
        "chapter_table": `https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/${selectServer.id}/gamedata/excel/chapter_table.json`
      }
      let now = 1;
      setTimeout(async () => {
        for (const k of Object.keys(urls)) {
          this.nowLoading = k.replace("_", " ")
          $.ajax({
            url: urls[k],
            async: false,
            dataType: 'json',
            success: function (json) {
              window.localStorage.setItem(k, JSON.stringify(json));
              console.log(json)
            }
          });
          this.loadingValue = (now / (Object.keys(urls).length + 1)) * 100

          now++
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        this.loadingValue = 100
        this.nowLoading = "Importing..."
        await new Promise(resolve => setTimeout(resolve, 3000));

        this.loading = false
        this.finishDownload = true
        this.$store.commit("reloadData")

      })
    },
  },
  computed: {
    totalData: function () {
      let total = 0
      let datas = this.totalStorage
      Object.keys(datas).forEach(d => {
        total += parseFloat(datas[d].total)
      })
      return total
    },
    totalStorage: function () {
     function checkNowStorage (kind) {
        let storages = {}
        let _lsTotal = 0,
            _xLen, _x;
        for (_x in kind) {
          if (!Object.prototype.hasOwnProperty.call(kind, _x)) {
            continue;
          }
          _xLen = ((kind[_x].length + _x.length) * 2);
          _lsTotal += _xLen;
          storages[_x.substr(0, 50)] = (_xLen / 1024).toFixed(2)
        }
        storages["total"] = (_lsTotal / 1024).toFixed(2)

        return storages
      }
      return {
        "localStorage": checkNowStorage(localStorage),
        "caches": checkNowStorage(caches)
      }
    },
    sureTextCorrect: function(){
      return this.sureText.toUpperCase()!=='DELETE'
    },
    getNowLang() {
      return this.$i18n.locale
    },
    getDarkTheme() {
      return this.$vuetify.theme.dark
    },
    getNowServer() {
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
    indexing: function () {
      return this.loadingValue === 100
    }
  },
  props: {}
}

</script>

<style>
div.darkControl div.v-input__slot {
  justify-content: center;

}

.settingsIcon {
  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;
  animation: spin 4s linear infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}


tr > td {
  width: 20%;
}
.warningBackground {
  background: repeating-linear-gradient(-45deg, red, red 45px, yellow 0, yellow 90px) !important

}
</style>