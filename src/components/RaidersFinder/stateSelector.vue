<template>
  <v-row color="primary">
    <v-col class="pa-8" id="stageSelector">
      <v-btn-toggle v-model="stage" style="width: 100%">
        <v-expansion-panels accordion>
          <v-row class="justify-end">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                              <span
                                  v-bind="attrs"
                                  v-on="on"
                              >
                                <v-switch
                                    v-model="showChallenge"
                                    color="red"
                                />
                              </span>
              </template>
              <span style="">{{ $t("RFP.stage.showChallenge") }}</span>
            </v-tooltip>                          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                              <span
                                  v-bind="attrs"
                                  v-on="on"
                              >
                                <v-switch
                                    v-model="showStory"
                                />
                              </span>
            </template>
            <span style="">{{ $t("RFP.stage.showStory") }}</span>
          </v-tooltip>
          </v-row>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <h4>{{ $t("RFP.stage.main") }}</h4>
            </v-expansion-panel-header>
            <v-divider/>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="4">
                  <v-tabs vertical v-model="mainTabs" class="mainTabs">
                    <v-tab
                        v-for="chapter in chapter_table"
                        :key="chapter['chapter_id']"
                        :id="chapter['chapter_id']"
                    >
                      {{ chapter["chapterName"] }}
                    </v-tab>
                  </v-tabs>
                </v-col>
                <v-col cols="8" >
                  <v-expansion-panels accordion>

                    <v-tabs-items vertical v-model="mainTabs"
                                  style="width: 100%"
                    >
                      <v-tab-item
                          v-for="chapter in chapter_table"
                          :key="chapter['chapter_id']"
                          :id="chapter['chapter_id']"
                      >
                        <v-expansion-panel
                            v-for="zone in getList(zone_table['mainlineAdditionInfo'], chapter['startZoneId'], chapter['endZoneId'])"
                            :key="zone['zoneId']"
                        >
                          <v-expansion-panel-header>
                            {{ zone_table['zones'][zone['zoneId']]["zoneNameFirst"] }} - {{ zone_table['zones'][zone['zoneId']]["zoneNameSecond"] }}
                          </v-expansion-panel-header>
                          <v-expansion-panel-content class="inSideButtonList">
                                          <span
                                              v-for="stage in getList(stage_table['stages'], zone['startStageId'], zone['endStageId'], zone_table['zones'][zone['zoneId']]['zoneNameTitleCurrent'])"
                                              :key="stage['stageId']"
                                          >
                                               <v-btn
                                                   v-if="shouldShow(stage)"
                                                   small
                                                   style="margin: 0.5em"
                                                   class="stageButton"
                                                   :class="{ predefined: stage['isPredefined'], hilight: stage['hilightMark'], challenge: stage['stageId'].endsWith('#f#'), subStage: stage['stageId'].startsWith('sub_') , hardState: stage['stageId'].startsWith('hard_') }"
                                                   :value="stage"
                                                   @click="changeStage(stage['stageId'])"
                                               >
                                                   {{ stage.code }}

                                              <img style="width: 5em; position: absolute; opacity: 0.4;" src="@/assets/bossMark_white.png" alt="bossMark" v-if="stage['bossMark']">
                                              <img style="width: 5em; position: absolute; opacity: 0.4;" src="@/assets/openBook_white.png" alt="openBook" v-if="stage['stageId'].startsWith('tr')">
                                              <img style="width: 4em; position: absolute; opacity: 0.4;" src="@/assets/story.png" alt="story" v-if="stage['isStoryOnly']">
                                              <img style="width: 5em; position: absolute; opacity: 0.4;" src="@/assets/originiums.png" alt="story" v-if="stage['stageId'].startsWith('hard_')">

                                            </v-btn>

                                          </span>
                          </v-expansion-panel-content>
                          <v-divider/>
                        </v-expansion-panel>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-expansion-panels>
                </v-col>
              </v-row>

            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ $t("RFP.stage.side") }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>

            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-btn-toggle>
    </v-col>
    <v-col class="pa-8" :cols="4" v-if="info">
      <v-card
          color="secondary"
          class="pa-8 text-center justify-center align-center"
          v-if="typeof(stage) === 'object'"
      >
        <div>
          <strong v-if="stage['stageId'].endsWith('#f#')" class="red--text">{{ $t("RFP.stage.challenge") }}</strong>
          <h1>{{ stage.code }}</h1>
          <h2>{{ stage.name }}</h2>
          <p
              style="font-size: 0.75em; white-space: pre-line;"
              class="text--secondary mb-0"
              v-for="line in removeUseLess(stage.description.toString()).split('\\n')"
              :key="line"
          >
            {{ line }}
          </p>


          <img style="width: 3em; top:0;right: 0; position: absolute; opacity: 0.4;" src="@/assets/bossMark_white.png" alt="openBook" v-if="stage['bossMark']">
          <img style="width: 3em; top:0;right: 0; position: absolute; opacity: 0.4;" src="@/assets/openBook_white.png" alt="openBook" v-if="stage['stageId'].startsWith('tr')">
          <img style="width: 3em; top:0;right: 0; position: absolute; opacity: 0.4;" src="@/assets/story.png" alt="story" v-if="stage['isStoryOnly']">
          <img style="width: 3em; top:0;right: 0; position: absolute; opacity: 0.4;" src="@/assets/originiums.png" alt="story" v-if="stage['stageId'].startsWith('hard_')">
          <v-divider/>
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
              <tr>
                <td>
                  {{ $t("RFP.stage.dangerLevel") }}
                </td>
                <td>
                  {{ stage["dangerLevel"] }}
                </td>
              </tr>
              <tr
                  v-for="(data, i) in getLevelData['options']"
                  :key="i"
              >
                <td>
                  {{ $t(`RFP.stage.${i}`) }}
                </td>
                <td>{{ data }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-divider/>
          <v-btn :href="'https://penguin-stats.io/result/stage/'+stage['zoneId']+'/'+stage['stageId']" target="_blank" block large style="height: 3em">
            <v-icon left>mdi-package-variant</v-icon>
            {{ $t("RFP.stage.p-s") }}
            <v-icon right>mdi-open-in-new</v-icon>
          </v-btn>
          <v-btn :href="'https://map.ark-nights.com/map/'+stage['stageId']" target="_blank" block large style="height: 3em">
            <v-icon left>mdi-map</v-icon>
            {{ $t("RFP.stage.map") }}
            <v-icon right>mdi-open-in-new</v-icon>
          </v-btn>
          <v-menu
              open-on-hover
              bottom
              offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-card
                  block
                  large
                  class="justify-center text-center align-center"
                  v-bind="attrs"
                  v-on="on"
                  style="height: 3em;  display: flex;"
              >
                <div>
                  <v-icon left>mdi-wikipedia</v-icon>
                  WIKI
                  <v-icon right>mdi-open-in-new</v-icon>
                </div>
              </v-card>
            </template>

            <v-list style="font-size: 1em">
              <v-list-item>
                <v-btn block target="_blank" :href="'https://gamepress.gg/arknights/search?query='+stage['code']">
                  GamePress (EN)
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn block target="_blank" :href="'https://arknights.fandom.com/wiki/'+stage['code']">
                  Fandom (EN)
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn block target="_blank" :href="'https://wiki.biligame.com/arknights/'+stage['code']">
                  BiliBili (CN)
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn block target="_blank" :href="'https://prts.wiki/w/'+stage['code']">
                  PRTS (CN)
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>

        </div>
      </v-card>
      <v-card color="secondary" class="pa-8 text-center justify-center align-center" v-else>
        <div>
          <h1>No</h1>
          <h1>Stage</h1>
          <h1>Selected</h1>
        </div>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import $ from "jquery";

export default {
  name: "stateSelector",
  props: {
    info: { type: Boolean, default: false },
    selectedStage: String
  },
  data() {
    return {
      stage: "",
      mainTabs: null,
      showChallenge: false,
      showStory: false,
      showInfo: [],
      levelData: null,
    }
  },
  methods: {
    changeStage: function (id) {
      this.$emit('update:selectedStage', id)
    },
    getYouTubeInfo: function (videoId) {
      let data = {};
      $.ajax({
        url: `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.VUE_APP_APIKEY}`,
        async: false,
        dataType: 'json',
        success: function (json) {
          data = json.items[0]
        }
      })
      return data
    },
    removeUseLess: function (text){
      text = text.toString().replace("</>", " ")
      let lf = false
      let ad = false
      let c = 0
      let texts = ""
      Array.from(text).forEach(t => {
        if (t === "<" || lf){
          lf = true
          if (t === "@" || ad){
            ad = true
            if (t === ">") {
              lf = false
              ad = false
              c = 0
            }
          } else if (c === 1){
            texts += t
            c = 0
            lf = false
            ad = true
          }
          c++

        } else {
          texts += t
        }

      })
      return texts
    },
    shouldShow: function (stage) {
      let ret = true
      if (!this.showChallenge && stage["stageId"].toString().endsWith("#f#")) {
        ret = false
      }
      if (!this.showStory && stage["isStoryOnly"]) {
        ret = false
      }
      return ret
    },
    getList: function (dict, _from, _to, addSub="-") {
      let retList = []
      let start = false
      let end = true

      Object.keys(dict).forEach(k => {
        if ((k === _from || start) && end) {
          start = true
          retList.push(dict[k])
          if (k === _to) {
            end = false
          }
        } else if (k.startsWith("sub_"+addSub) || k.startsWith("hard_"+addSub)) {
          retList.push(dict[k])
        }

      })

      return retList
    },
  },
  computed: {
    getLevelData: function () {
      if (this.stage["levelId"] !== null){
        let data = {}
        $.ajax({
          url: `https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/${this.getNowServer['id']}/gamedata/levels/${this.stage["levelId"].toString().toLowerCase()}.json`,
          async: false,
          dataType: 'json',
          success: function (json) {
            data = json
          }
        })
        return data
      } else {
        return {
          "options":{}
        }
      }

    },
    getNowServer() {
      return JSON.parse(window.localStorage.getItem("server"))
    },
    zones: function () {
      return this.getList(this.zone_table.zones, "main_0", "main_1")
    },
    chapter_table: function(){
      return this.$store.state.chapter_table
    },
    zone_table: function () {
      return this.$store.state.zone_table
    },
    stage_table: function () {
      return this.$store.state.stage_table
    },

  }

}
</script>

<style>
div.mainTabs .v-tabs-bar__content *{
}
.predefined {
  background-color: black !important;
}
.predefined span {
  color: white;
}
.hilight {
  background-color: red !important;
}
.hilight span {
  color: white;
}
.challenge {
  background-color: darkred !important;
}
.challenge span {
  color: white;
}
.subStage {
  background-color: slategray !important;
}
.stageButton.v-btn--active {
  filter: brightness(1.5);
}
.inSideButtonList .v-expansion-panel-content__wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.hardState {
  background: repeating-linear-gradient(-45deg, darkred, darkred 5px, rgba(46, 46, 46, 0) 0, rgba(46, 46, 46, 0) 10px) !important
}

</style>