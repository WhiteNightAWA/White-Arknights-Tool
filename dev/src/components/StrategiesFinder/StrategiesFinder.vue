<template>
  <div class="full pa-8 fill-height">
    <v-row>
      <v-col>

        <div class="top">
          <v-expansion-panels popout v-model="exp" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-center" style="flex-direction: column;">
                <h1>Filters</h1>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-tabs fixed-tabs v-model="tabs">
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab key="stage">
                    {{ $t("RFP.stage.name") }}
                  </v-tab>
                  <v-tab key="video">
                    {{ $t("RFP.video.name") }}
                  </v-tab>
                  <v-tab key="operators">
                    {{ $t("RFP.operators.name") }}
                  </v-tab>
                </v-tabs>
                <v-divider/>
                <v-tabs-items v-model="tabs">
                  <v-tab-item key="stage">
                    <stateSelector :info="true" :selectedStage.sync="selectedState"></stateSelector>
                  </v-tab-item>
                  <v-tab-item key="video">
                    <v-card class="pa-8">
                      <v-row>
                        <v-col>
                          <v-text-field :label="$t('RFP.video.title')" v-model="titleFilter"/>
                        </v-col>
                        <v-col>
                          <v-text-field :label="$t('RFP.video.author')" v-model="authorFilter"/>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-select menu-props="auto" :label="$t('RFP.video.VL')" v-model="language" :items="languageList"/>
                        </v-col>
                        <v-col>
                          <v-select menu-props="auto" :label="$t('RFP.video.VS')" v-model="server" :items="serverList"/>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-btn-toggle multiple  style="display: flex;" class="justify-space-around" tile v-model="platformFilter">
                            <v-btn color="secondary" class="rounded" value="https://www.yout">
                              <img style="width: 15em;" src="https://www.freeiconspng.com/uploads/youtube-logo-png-transparent-image-5.png" alt="youtube logo">
                            </v-btn>
                            <v-btn color="secondary" class="rounded" value="https://www.bilibili">
                              <img style="width: 10em;" src="https://camo.githubusercontent.com/860a008daa89512e0ff896c0f0d754e2345cc00dcc75242dc1459b624556ab79/68747470733a2f2f63646e2e6b6167616d697a2e636f6d2f42696c6962696c692d546f6f6c6b69742f62696c6962696c692e706e67" alt="bilibili logo">
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-card class="pa-3">
                            {{ $t("RFP.from") }}
                            <v-row>
                              <v-col>
                                <v-text-field label="min" v-model="minTime[0]"/>
                              </v-col>
                              <v-col>
                                <v-text-field label="s" v-model="minTime[1]"/>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-col>

                        <v-col>
                          <v-card class="pa-3">
                            {{ $t("RFP.to") }}
                            <v-row>
                              <v-col>
                                <v-text-field label="min" v-model="maxTime[0]"/>
                              </v-col>
                              <v-col>
                                <v-text-field label="s" v-model="maxTime[1]"/>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item key="operators">
                    <v-card class="pa-8">
                      <v-row>
                        <v-col>
                          <v-card>
                            <v-card-title>
                              {{ $t("RFP.operators.rarityOf") }}
                            </v-card-title>
                            <v-card-text>
                              <v-btn-toggle multiple tile v-model="rarityFilter">
                                <div>
                                  <v-btn class="ma-2" v-for="r in [1,2,3,4,5,6]" :key="r" small outlined :value="r-1">
                                    {{ r }}★
                                  </v-btn>
                                </div>
                              </v-btn-toggle>
                            </v-card-text>
                          </v-card>
                        </v-col>
                        <v-col>
                          <v-card>
                            <v-card-title>
                              {{ $t("RFP.operators.numberOf") }}
                            </v-card-title>
                            <v-card-text>
                              <v-row>
                                <v-col>
                                  <v-text-field :label="$t('RFP.from')" type="number" min="1" max="13" v-model="minOperatorsNum"/>
                                </v-col>
                                <v-col>
                                  <v-text-field :label="$t('RFP.to')" type="number" min="1" max="13" v-model="maxOperatorsNum"/>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-expansion-panels v-model="planels" multiple>
                          <v-expansion-panel>
                            <v-expansion-panel-header :disabled="!operatorsFilter">
                              <v-card-title class="pa-0">
                                <h2>{{ $t("RFP.operators.filter.name") }}</h2>
                                <v-divider class="ma-2"/>
                                <span class="error--text">{{ $t("RFP.operators.warn") }}</span>
                                <v-divider class="ma-2"/>
                                <v-switch v-model="operatorsFilter" @change="operatorsFilter ? planels : planels = []"/>
                              </v-card-title>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-card-text>
                                  <v-row>
                                    <v-col style="display: flex;" class="justify-center">
                                      <v-checkbox v-model="sameClass" :label="$t('RFP.operators.filter.SC')"/>
                                    </v-col>
                                    <v-col style="display: flex;" class="justify-center">
                                      <v-checkbox v-model="sameSubClass" :label="$t('RFP.operators.filter.SS')"/>
                                    </v-col>
                                    <v-col style="display: flex;" class="justify-center">
                                      <v-checkbox v-model="useSupportUnit" :label="$t('RFP.operators.filter.CUSU')"/>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col>
                                      <v-container class="pa-3">
                                        <v-row>
                                          <v-select
                                              :label="$t('RFP.operators.filter.OLFM')"
                                              :items="operatorsLevelFilterModeItems"
                                              v-model="operatorsLevelFilterMode"
                                              :disabled="!operatorsFilter"
                                              item-text="name"
                                              item-value="id"
                                          />
                                        </v-row>
                                        <v-row v-if="operatorsLevelFilterMode === 'level'">
                                          <v-card class="pa-4" style="width: 100%">
                                            <v-card-title>
                                              {{ $t('RFP.operators.filter.NL') }}
                                            </v-card-title>
                                            <v-card-text>
                                              <v-row>
                                                <v-col>
                                                  <v-text-field :disabled="!operatorsFilter" v-model="smallLevelNumber" type="number" :label="$t('RFP.operators.filter.<level')"/>
                                                </v-col>
                                              </v-row>
                                            </v-card-text>
                                          </v-card>
                                        </v-row>
                                      </v-container>
                                    </v-col>
                                    <v-col>
                                      <v-container class="pa-3">
                                        <v-row>
                                          <v-select
                                              :label="$t('RFP.operators.filter.OSLFM')"
                                              :items="operatorsSkillFilterModeItems"
                                              v-model="operatorsSkillFilterMode"
                                              :disabled="!operatorsFilter"
                                              item-text="name"
                                              item-value="id"
                                          />
                                        </v-row>
                                        <v-row v-if="['level', 'same'].includes(operatorsSkillFilterMode)">
                                          <v-card class="pa-4" style="width: 100%">
                                            <v-card-title>
                                              {{ $t('RFP.operators.filter.NL') }}
                                            </v-card-title>
                                            <v-card-text>
                                              <v-row v-if="operatorsSkillFilterMode === 'level'">
                                                <v-text-field :disabled="!operatorsFilter" v-model="smallSkillNumber" type="number" :label="$t('RFP.operators.filter.<level')"/>
                                              </v-row>
                                              <v-row>
                                                <v-switch label="Can show if not Sure (?)" :disabled="!operatorsFilter" v-model="operatorsSkillFilterNotSure"/>
                                              </v-row>
                                            </v-card-text>
                                          </v-card>
                                        </v-row>
                                      </v-container>
                                    </v-col>
                                    <v-col>
                                      <v-container class="pa-3">
                                        <v-row>
                                          <v-select
                                              :label="$t('RFP.operators.filter.OTFM')"
                                              :items="operatorsTrustFilterModeItems"
                                              v-model="operatorsTrustFilterMode"
                                              :disabled="!operatorsFilter"
                                              item-text="name"
                                              item-value="id"
                                          />
                                        </v-row>
                                        <v-row v-if="['level', 'same'].includes(operatorsTrustFilterMode)">
                                          <v-card class="pa-4" style="width: 100%">
                                            <v-card-title>
                                              {{ $t('RFP.operators.filter.NL') }}
                                            </v-card-title>
                                            <v-card-text>
                                              <v-row v-if="operatorsTrustFilterMode === 'level'">
                                                <v-text-field :disabled="!operatorsFilter" v-model="smallTrustNumber" type="number" :label="$t('RFP.operators.filter.<trust')"/>
                                              </v-row>
                                              <v-row>
                                                <v-switch label="Can show if not Sure (?)" :disabled="!operatorsFilter" v-model="operatorsTrustFilterNotSure"/>
                                              </v-row>
                                            </v-card-text>
                                          </v-card>
                                        </v-row>
                                      </v-container>
                                    </v-col>
                                    <v-col>
                                      <v-container class="pa-3">
                                        <v-row>
                                          <v-select
                                              :label="$t('RFP.operators.filter.OPFM')"
                                              :items="operatorsPotentialFilterModeItems"
                                              v-model="operatorsPotentialFilterMode"
                                              :disabled="!operatorsFilter"
                                              item-text="name"
                                              item-value="id"
                                          />
                                        </v-row>
                                        <v-row v-if="operatorsPotentialFilterMode === 'level'">
                                          <v-card class="pa-4" style="width: 100%">
                                            <v-card-title>
                                              {{ $t('RFP.operators.filter.NL') }}
                                            </v-card-title>
                                            <v-card-text>
                                              <v-row>
                                                <v-col>
                                                  <v-text-field :disabled="!operatorsFilter" v-model="smallTrustNumber" type="number" :label="$t('RFP.operators.filter.<potential')"/>
                                                </v-col>
                                              </v-row>
                                            </v-card-text>
                                          </v-card>
                                        </v-row>
                                      </v-container>
                                    </v-col>
                                  </v-row>
                              </v-card-text>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-row>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn @click="getVideos" x-large style="width: 100%" color="success" :disabled="selectedState === null || selectedState === '' || getting">
          <h1>
            {{ $t("RFP.getResult") }}
          </h1>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>

        <v-card class="pa-5">
          <v-card-title>
            <h1>
              {{ $t("RFP.result") }}
            </h1><span v-if="times" class="grey--text">
            ({{ times }}s)
          </span>
            <v-spacer/>
            <v-spacer/>
            <v-spacer/>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                :label="$t('RFP.search')"
                single-line
                hide-details
            ></v-text-field>
          </v-card-title>
          <v-divider class="pa-3"/>
          <v-card-text>
            <v-data-table
                :headers="headers.filter(f => { return (devMode === true ? true : !['_id'].includes(f.value)) })"
                :items="videos"
                :search="search"
                class="resultTable"
            >
              <template slot="no-data">
                <h4>
                  {{ $t("RFP.noMore") }}<a @click='copy(`White_Night_awa#1729`); snackbar1=true'><v-icon>mdi-content-copy</v-icon></a>
                </h4>
              </template>

              <template v-slot:[`item._id`]="{ item }">
                <div class="grey--text">
                  {{ item._id }}
                </div>
              </template>
              <template v-slot:[`item.title`]="{ item }">
                <div style="min-width: 25em;">
                  {{ item.title }}
                </div>
              </template>
              <template v-slot:[`item.time`]="{ item }">
                <div v-if="item.time[0] === undefined">
                  -- : --
                </div>
                <div v-else>
                  {{ item.time[0] }} : {{ item.time[1] }}
                </div>
              </template>
              <template v-slot:[`item.group`]="{ item }">
                <v-row style="width: 320px;">
                  <v-col style="width: 240px; display: flex; flex-wrap: wrap;" class="pa-0">
                    <operatorsImg :width="40" :height="40" v-for="i in item.group" :key="i.id" :c="i"/>
                  </v-col>
                  <operatorsImg :width="80" :height="80" :c="item.help" v-if="item.help !== null">
                    <v-card style="position: absolute; bottom: -10px; left: 0;">
                      <img src="@/assets/supportUnit.jpg" alt="supportUnit" :height="30">
                    </v-card>
                  </operatorsImg>
                </v-row>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-icon
                    class="mr-2"
                    @click="play(item)"
                >
                  mdi-play-circle-outline
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>


    <v-dialog v-model="addVideoDialog">
      <addVideo></addVideo>
    </v-dialog>
    <v-btn
        elevation="2"
        fab
        style="position: fixed; bottom: 1em; right: 1em"
        @click="addVideoDialog=true"
        color="success"
        v-if="$store.state.devMode"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
    <v-snackbar
        v-model="snackbar1"
        timeout="2000"
        color="success"
    >
      {{ $t("Copied") }}: <code>White_Night_awa#1729</code>
    </v-snackbar>
    <v-overlay style="overflow: hidden;" v-model="loading">
      <v-progress-circular indeterminate size="500" v-if="loadings[0]" color="primary">
        <v-progress-circular indeterminate size="400" v-if="loadings[1]" color="secondary">
          <v-progress-circular indeterminate size="300" v-if="loadings[2]" color="accent">
            <v-progress-circular indeterminate size="200" v-if="loadings[3]" color="white"/>
          </v-progress-circular>
        </v-progress-circular>
      </v-progress-circular>
    </v-overlay>
    <v-dialog v-model="result" v-if="result">
      <v-card>
        <v-card-title>
          {{ results.title }}
          <v-divider/>
          <v-btn icon :href="results.url" target="_blank">
            <v-icon>
              mdi-open-in-new
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-subtitle>
          {{ results.author }}
        </v-card-subtitle>
        <v-card-text>
          <v-divider class="ma-3"/>
          <v-row>
            <v-col style="display: flex;" class="justify-center align-center">
              <v-progress-circular indeterminate style="z-index: 1; position: absolute;" size="100"/>
              <iframe v-if="results.url.startsWith('https://www.yout')" width="560" height="315" style="z-index: 2;" :src="`https://www.youtube.com/embed/${videoId}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
              <iframe v-if="results.url.startsWith('https://www.bilibili')" width="560" height="315" style="z-index: 2;" :src="`//player.bilibili.com/player.html?aid=62777567&bvid=${videoId}=109070800&page=1`" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card class="pa-3">
                <v-card-title>
                  {{ $t("RFP.operators.name") }}
                </v-card-title>
                <v-card-text style="display: flex;">
                  <v-row style="width: 640px; display: contents;">
                    <v-col style="display: flex; flex-wrap: wrap; width: 480px;" class="pa-0">
                      <operatorsImg v-for="i in results.group" :key="i.id" :c="i"/>
                    </v-col>
                    <operatorsImg class="pa-2" :c="results.help" v-if="results.help !== null" :height="160" :width="160">
                      <v-card style="position: absolute; bottom: -10px; left: 0;">
                        <img src="@/assets/supportUnit.jpg" alt="supportUnit" :height="50">
                      </v-card>
                    </operatorsImg>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-if="Boolean(err)">
      <v-alert type="error">
        {{ err }}
      </v-alert>
    </v-snackbar>
  </div>
</template>

<script>
import stateSelector from "@/components/StrategiesFinder/stateSelector";
import addVideo from "@/pages/addVideo.vue";
import axios from "axios";
import operatorsImg from "@/components/StrategiesFinder/operatorsImg";


export default {
  name: "StrategiesFinder",
  data: function () {
    return {
      exp: [0],
      tabs: null,
      selectedState: null,
      addVideoDialog: false,
      snackbar1: false,
      platformFilter: [],
      titleFilter: "",
      authorFilter: "",
      search: "",
      headers: [
        {text: "ID", value: "_id"},
        {text: this.$t("RFP.video.title"), value: "title"},
        {text: this.$t("RFP.video.author"), value: "author"},
        {text: this.$t("RFP.video.VL"), value: "language"},
        {text: this.$t("RFP.video.VS"), value: "server"},
        {text: this.$t("RFP.CT"), value: "time"},
        {text: this.$t("RFP.operators.name"), value: "group"},
        {text: this.$t("RFP.action"), value: "action"}
      ],
      minTime: [],
      maxTime: [],
      videos: [],
      getting: false,
      language: "All",
      server: "All",
      languageList: ["All", "None", "普通话", "粵語", "English", "日本", "한국어", "Others"],
      serverList: ["All", "TW", "CN", "KO", "JP", "EN"],
      minOperatorsNum: 1,
      maxOperatorsNum: 13,
      rarityFilter: [],
      loading: false,
      loadings: [
        false, false, false, false
      ],
      operatorsFilter: false,
      result: false,
      videoId: "",
      err: "",
      results: {},
      operatorsLevelFilterMode: "level",
      operatorsLevelFilterModeItems: [
        {name: this.$t("RFP.filter.noLimit"), id: "not"},
        {name: this.$t("RFP.filter.elite"), id: "elite"},
        {name: this.$t("RFP.filter.bigger"), id: "level"},
        {name: this.$t("RFP.filter.same"), id: "same"}
      ],
      smallLevelNumber: 0,
      operatorsSkillFilterMode: "level",
      operatorsSkillFilterNotSure: true,
      operatorsSkillFilterModeItems: [
        {name: this.$t("RFP.filter.noLimit"), id: "not"},
        {name: this.$t("RFP.filter.bigger"), id: "level"},
        {name: this.$t("RFP.filter.same"), id: "same"}
      ],
      smallSkillNumber: 0,
      operatorsTrustFilterMode: "level",
      operatorsTrustFilterNotSure: true,
      operatorsTrustFilterModeItems: [
        {name: this.$t("RFP.filter.noLimit"), id: "not"},
        {name: this.$t("RFP.filter.bigger"), id: "level"},
        {name: this.$t("RFP.filter.same"), id: "same"}
      ],
      smallTrustNumber: 0,
      operatorsPotentialFilterMode: "level",
      operatorsPotentialFilterModeItems: [
        {name: this.$t("RFP.filter.noLimit"), id: "not"},
        {name: this.$t("RFP.filter.bigger"), id: "level"},
        {name: this.$t("RFP.filter.same"), id: "same"}
      ],
      smallPotentialNumber: 0,
      planels: [],
      sameClass: false,
      sameSubClass: true,
      times: "",
      useSupportUnit: false
    }
  },
  components: {
    stateSelector,
    addVideo,
    operatorsImg
  },
  methods: {
    startLoading: function () {
      this.loading = true
      this.loadings[0] = true
      setTimeout(() => this.loadings = [true, true, false, false], 250)
      setTimeout(() => this.loadings = [true, true, true, false], 500)
      setTimeout(() => this.loadings = [true, true, true, true], 750)
    },
    stopLoading: function () {
      setTimeout(() => this.loadings = [true, true, true, false])
      setTimeout(() => this.loadings = [true, true, false, false], 250)
      setTimeout(() => this.loadings = [true, false, false, false], 500)
      setTimeout(() => this.loadings = [false, false, false, false], 750)
      setTimeout(() => this.loading = false, 1000)
    },
    play: function (video) {
      if (video.url.startsWith("https://www.yout")) {
        let params = (new URL(video.url)).searchParams;
        this.videoId = params.get('v')
      } else if (video.url.startsWith("https://www.bilibili")) {
        let l = video.url.replace("https://www.bilibili.com/video/", "")
        this.videoId = l.slice(0, (l.search("\\?")))
      }
      this.results = video
      this.result = true
    },
    getVideos: async function () {
      let t = new Date()
      this.startLoading()
      this.getting = true
      this.exp = []
      let filters = {
        rarityFilter: this.rarityFilter,
        titleFilter: this.titleFilter,
        authorFilter: this.authorFilter,
        language: this.language,
        server: this.server,
        minTime: this.minTime,
        maxTime: this.maxTime,
        platformFilter: this.platformFilter,
        minOperatorsNum: this.minOperatorsNum,
        maxOperatorsNum: this.maxOperatorsNum,
        operatorsFilter: this.operatorsFilter,
        myOperators: this.myOperators,
        operatorsLevelFilterMode: this.operatorsLevelFilterMode,
        operatorsSkillFilterMode: this.operatorsSkillFilterMode,
        operatorsTrustFilterMode: this.operatorsTrustFilterMode,
        operatorsPotentialFilterMode: this.operatorsPotentialFilterMode,
        smallLevelNumber: this.smallLevelNumber,
        smallSkillNumber: this.smallSkillNumber,
        smallTrustNumber: this.smallTrustNumber,
        smallPotentialNumber: this.smallPotentialNumber,
        sameClass: this.sameClass,
        sameSubClass: this.sameSubClass,
        operatorsSkillFilterNotSure: this.operatorsSkillFilterNotSure,
        operatorsTrustFilterNotSure: this.operatorsTrustFilterNotSure,
        useSupportUnit: this.useSupportUnit ? 1 : 0
      }
      console.log(filters)
      try {
        await axios.post(`https://white-arknights-tool-back-end.vercel.app/data/376EONIGegnb337na6sOI7GIN74BeeghniLOS557457/${this.selectedState}`, filters).then(data => {
          this.videos = data["data"]
        })
      }
      catch (err) {
        this.err = err
      }
      finally {
        this.getting = false
        this.stopLoading()
        this.times = (new Date() - t)/1000
      }

    },
    copy(text){
      navigator.clipboard.writeText(text);
    }
  },
  computed: {
    character: function () {
      return Object(this.$store.state.character_table)
    },
    devMode: function () {
      return Boolean(this.$store.state.devMode)
    },
    myOperators: function () {
      return Object(this.$store.state.myOperators)
    }
  }
}
</script>

<style>
.resultTable tbody>tr {
  height: 100px !important;
}
</style>