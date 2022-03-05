<template>
  <div class="full">
    <div class="top">
      <v-row justify="center">
        <v-expansion-panels style="text-align: center;">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <h1>FILTERS</h1>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider/>
              <br>
                <v-tabs
                    v-model="mapTab"
                    fixed-tabs
                >
                  <v-tabs-slider color="secondary"></v-tabs-slider>

                  <v-tab
                      v-for="item in items"
                      :key="item"
                  >
                    {{ item }}
                  </v-tab>
                </v-tabs>
              <v-tabs-items v-model="mapTab">
                <v-tab-item key="MAP">
                  <v-card flat style="display: flex;flex-direction: row;" class="mapDisplay" :disabled="mapLoading">
                    <v-card class="mapSelect" style="width: 75%">
                      <v-btn-toggle
                          v-model="level"
                          color="primary"
                          group
                          :Rounded="false"
                          @change="getMapData(getLevel)"
                          style="width: 100%"
                      >
                      <v-expansion-panels style="width: 100%">
                        <v-expansion-panel
                          v-for="mode in maps"
                          :key="mode.key"
                          style="width: 100%"
                          >
                          <v-expansion-panel-header>
                            {{ $t(`RFP.map.${mode.name}.name`) }}
                          </v-expansion-panel-header>
                          <v-divider/>
                          <v-expansion-panel-content>
                            <v-tabs vertical v-model="mapCal">
                              <v-tab
                                v-for="cal in Object.keys(mode.data)"
                                :key="cal"
                                style="font-size: 10px"
                              >
                                {{ $t(`RFP.map.${mode.name}.cals.${cal}`) }}

                              </v-tab>
                              <v-tabs-items v-model="mapCal">
                                <v-tab-item
                                    v-for="cal in Object.keys(mode.data)"
                                    :key="cal"
                                    v
                                >
                                  <v-expansion-panels accordion>
                                    <v-expansion-panel
                                      v-for="ch in Object.keys(mode.data[cal].data)"
                                      :key="ch"
                                      >
                                        <v-expansion-panel-header>
                                          {{ $t(`RFP.map.${mode.name}.chs.${ch}.name`) }}
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <div
                                              v-for="levelMode in Object.keys(mode.data[cal].data[ch])"
                                              :key="levelMode"
                                          >
<!--                                            {{ mapLangData }}-->
                                            <v-btn
                                              v-for="lev in range(1, mode.data[cal].data[ch][levelMode])"
                                              :key="lev"
                                              :value="mode.name+'-'+levelMode+'-'+ch+'-'+lev"
                                              small
                                              style="text-align: center; margin: 5px"
                                              @click="mapLangData = `RFP.map.${mode.name}.chs.${ch}.lev.${levelMode}.${lev}`"
                                              >

                                              {{ $t(`RFP.map.${mode.name}.chs.${ch}.lev.${levelMode}.${lev}.id`) }}

                                            </v-btn>
                                          </div>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                  </v-expansion-panels>

                                </v-tab-item>
                              </v-tabs-items>
                            </v-tabs>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                      </v-expansion-panels>
                      </v-btn-toggle>
                      {{ getLevel }}
                      {{ level }}
                    </v-card>
                    <v-card class="levelInfo" style="width: 25%; align-items: center; justify-content: center;" elevation="8">
                        <div v-if="level===''">
                          <h1 class="noSelect" >No <br> Level <br> Selected</h1>
                        </div>
                        <div v-else-if="level===undefined">
                          <h1 class="noSelect" >No <br> Level <br> Selected</h1>
                        </div>
                        <div v-else-if="mapLoading">
                          <v-progress-circular
                              :size="70"
                              :width="7"
                              color="primary"
                              indeterminate
                          ></v-progress-circular>

                        </div>
                        <div v-else style="height: 100%; width: 100%; text-align: center">
                          <h1>{{ $t(mapLangData+".id") }}</h1>
                          <h3>{{ $t(mapLangData+".name") }}</h3>
                          <small class="text--secondary">{{ $t(mapLangData+".desc") }}</small>
                          <v-simple-table>
                            <template v-slot:default>
                              <tbody>
                              <tr>
                                <td>
                                  xd
                                </td>
                                <td>
                                  xd
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  xd
                                </td>
                                <td>
                                  xd
                                </td>
                              </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </div>
                    </v-card>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </div>
    <div class="results">

    </div>
  </div>
</template>

<script>
import maps from "../../../data/map.json"
import subFixData from "../../../data/subFixData.json"
import $ from 'jquery'

export default {
  name: "RaidersFinder",
  data(){
    return {
      mapTab: null,
      items: [
        "MAP", "VIDEO", "OPERATORS"
      ],
      maps: maps,
      level: "",
      mapData: null,
      mapLoading: false,
      mapCal: null,
      mapLangData: null
    }
  },
  methods: {
    range: function (start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
},

    getMapData: function (info){
      this.mapLoading = true

      let getData = {}

      console.log(info)

      if (info.length >= 5) {
        info[3] = info[3]+"-"+info[4]
      }

      let url = `https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/levels/obt/${info[0]}/level_${info[1]}_${info[2]}-${info[3]}.json`


      setTimeout(() => {
        $.ajax({
          url: url,
          async: false,
          dataType: 'json',
          success: function (json) {
            getData = json;
          }
        });

        this.mapData = getData

        this.mapLoading = false
      }, 2000);

    }
  },
  computed: {
    getLevel: function() {
      console.log(this.level)
      if (this.level !== undefined) {
        let l = this.level.toString().split("-")
        console.log(l)
        let ret = []
        l.forEach(i => {
          console.log(ret)
          if (i === "S") {
            ret.push("sub")
          } else if (i === "H") {
            ret = ["hard", "hard"]
          } else if (i.length <= 1) {
            ret.push("0" + i)
          } else {
            ret.push(i)
          }

        })
        if (ret[1] === "sub") {
          if (ret[2] !== "02") {
            ret = ["main", "sub"].concat(subFixData[(ret[2]+"-"+ret[3])])
          }

        }
        return ret
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
div.full {
  width: 100%;
  height: 100%;
  padding: 5em
}
div.mapDisplay>div {
  margin: 1em;
}
h1.noSelect {
  margin: 0;
}
div.levelInfo {
  display: flex;
  align-items: center;
}
</style>