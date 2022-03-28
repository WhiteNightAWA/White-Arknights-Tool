<template>
  <v-card class="pa-5">
    <v-card-title>
      <h1>Add Video</h1>
    </v-card-title>
    <v-divider class="ma-5"/>
    <v-card-text>
      <v-expansion-panels accordion multiple>
        <v-expansion-panel key="stage">
          <v-expansion-panel-header>
            Stage
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-5">
            <stateSelector :info="false" :selectedStage.sync="selectedStage"></stateSelector>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel key="operators">
          <v-expansion-panel-header>
            Operators
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-5">
            <v-autocomplete :label="$t('MOP.search')" :filter="filterObject" v-model="add" :items="operators" item-text="name" item-value="phases[0].characterPrefabKey">
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img
                        :src="`https://cdn.jsdelivr.net/gh/arkntools/arknights-toolbox@gh-pages/assets/img/avatar/${data.item['phases'][0]['characterPrefabKey'].replaceAll('char_', '')}.png`"
                        alt="avatar"
                        class="rounded-lg"
                    >
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.appellation"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
            {{ add }}
            <v-card v-if="add !== null" class="pa-3">
              <v-card-title class="align-center justify-center" style="display: flex;">
                <img
                    :src="`https://cdn.jsdelivr.net/gh/arkntools/arknights-toolbox@gh-pages/assets/img/avatar/${add.replaceAll('char_', '')}.png`"
                    alt="avatar"
                    class="rounded-lg"
                >
                <h1>
                  {{ character.name }}
                  <v-list-item-subtitle>
                    {{ character.appellation }}
                  </v-list-item-subtitle>
                </h1>
              </v-card-title>
              <v-card-text>
                <v-row class="text-center">
                  <v-col>
                    Elite
                  </v-col>
                  <v-col>
                    Level
                  </v-col>
                  <v-col>
                    Level
                  </v-col>
                  <v-col>
                    Skill Id
                  </v-col>
                  <v-col>
                    Skill Level
                  </v-col>
                  <v-col>
                    Potential
                  </v-col>
                  <v-col>
                    Trust
                  </v-col>
                  <v-col>
                    Trust
                  </v-col>
                  <v-col>
                    Trust
                  </v-col>
                </v-row>
                <v-row>
                  <v-otp-input
                      v-model="fastInput"
                      style="width: 100px"
                      length="9"
                  ></v-otp-input>
                </v-row>
                <v-radio-group v-model="kind">
                  <v-row>
                    <v-col>
                      <v-radio :value="0" label="Only"/>
                    </v-col>
                    <v-col>
                      <v-radio :value="1" label="Any"/>
                    </v-col>
                    <v-col>
                      <v-radio :value="2" label="Same Profession"/>
                    </v-col>
                    <v-col>
                      <v-radio :value="3" label="Same Sub Profession"/>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-spacer/>
                <v-btn color="success" @click="addChara" :disabled="fastInput.length !== 9">
                  <v-icon>mdi-plus</v-icon>
                  ADD
                </v-btn>
                <v-spacer/>
                <v-checkbox label="Support Unit" v-model="help"/>
                <v-spacer/>
                <v-spacer/>
              </v-card-actions>
           </v-card>

          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Video
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-5">

            <v-row>
              <v-text-field required v-model="url" :rules="[val => (val || '').startsWith('https://') || 'This is not a URL']">
                <template v-slot:label>
                  <img v-if="url" :src="`https:\/\/s2.googleusercontent.com/s2/favicons?domain_url=${url}`" alt="">
                  URL
                </template>
              </v-text-field>

            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="Author" v-model="author"/>
              </v-col>
              <v-col>
                <v-row>
                  <v-col>
                    <v-text-field label="min" v-model="time[0]"/>
                  </v-col>
                  <v-col>
                    <v-text-field label="s" v-model="time[1]"/>
                  </v-col>
                </v-row>
                {{ time }}
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-spacer/>
      <v-card class="pa-5" outlined>
        <v-card-title>
          <h1 v-if="String(stage['stageId']).endsWith('#f#')">Challenge&nbsp;</h1>
          <h1>{{ stage["code"] }}</h1>
        </v-card-title>
        <v-divider class="mt-5 mb-5"/>
        <v-card-text>
          <v-row>

            <v-col cols="9" style="display: flex; flex-wrap: wrap">
              <operatorsImg
                  v-for="c in group"
                  :key="c.id"
                  :c="c"
                  class="ma-3"
              >
                <v-btn icon @click="remove(c)" style="position: absolute; top: 0; right: 0;">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </operatorsImg>
              <operatorsImg v-if="Boolean(helpOperator)" :c="helpOperator">
                <v-btn :sup="false" icon @click="helpOperator=null" style="position: absolute; top: 0; right: 0;">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-card style="position: absolute; bottom: -10px; left: 0;">
                  <img src="@/assets/supportUnit.jpg" alt="supportUnit" height="30">
                </v-card>
              </operatorsImg>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-spacer/>
    <v-row>
      <v-spacer/>
      <v-btn @click="addVideo" color="success" :disabled="selectedStage === null || group === [] || !url.startsWith('https://')">
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
      <v-spacer/>
    </v-row>
    <v-spacer></v-spacer>
    <v-row v-if="err">
      <v-spacer></v-spacer>
      <v-alert type="error" dismissible >
        {{ err }}
      </v-alert>
      <v-spacer></v-spacer>
    </v-row>
  </v-card>
</template>

<script>
import stateSelector from "@/components/RaidersFinder/stateSelector";
import axios from "axios";
import operatorsImg from "@/components/RaidersFinder/operatorsImg";

export default {
  name: "addVideo",
  components: {
    stateSelector,
    operatorsImg
  },
  data () {
    return {
      selectedStage: null,
      fastInput: "",
      add: null,
      kind: 0,
      group: [],
      help: false,
      url: "",
      Videos: [],
      time: [],
      helpOperator: null,
      author: "",
      err: ""
    }
  },
  methods: {
    getVideos: async function (stage) {
      let data = await axios.get(`https://white-arknights-tool-back-end.vercel.app/data/${process.env.VUE_APP_BACKEND_KEY}/${stage}`)
      this.Videos = data["data"]
    },
    addVideo: async function () {
      let data = {
        stage: this.selectedStage,
        group: this.group,
        help: this.helpOperator,
        url: this.url,
        time: this.time
      }
      try {
        await axios.post(`https://white-arknights-tool-back-end.vercel.app/data/${process.env.VUE_APP_BACKEND_KEY}/`, data)
      } catch (err) {
        this.err = err
      }

    },
    remove: function (value) {
      let index = this.group.indexOf(value);
      if (index !== -1) {
        this.group.splice(index, 1);
      }
    },
    addChara: function () {
      let data = {
        id: this.add,
        elite: this.fastInput[0],
        level: this.fastInput[1] + this.fastInput[2],
        skillId: this.fastInput[3],
        skillLevel: this.fastInput[4],
        potential: this.fastInput[5],
        trust: this.fastInput[6] + this.fastInput[7] + this.fastInput[8],
        kind: this.kind
      }
      if (!this.help){
        this.group.push(data)
      } else {
        this.helpOperator = data
      }


      this.fastInput = ""
      this.kind = 0
    },
    filterObject: function (item, queryText) {
      return (
          item.name.toLowerCase().includes(queryText.toLowerCase())
          || item["appellation"].toLowerCase().includes(queryText.toLowerCase())
          || item.pinyinFull.toLowerCase().includes(queryText.toLowerCase())
          || item.pinyinHead.toLowerCase().includes(queryText.toLowerCase())
      )
    }
  },
  computed: {
    stage_table: function () {
      return this.$store.state.stage_table
    },
    character: function () {
      return Object(this.$store.state.character_table[this.add])
    },
    stage: function () {
      return Object(this.stage_table["stages"][this.selectedStage])
    },
    operators: function () {
      let ct = JSON.parse(JSON.stringify(this.$store.state.character_table));
      return Object.values(ct).filter(c => {
        return (
            c["itemObtainApproach"] !== null
        )
      })
    },
  }
}
</script>

<style scoped>

</style>