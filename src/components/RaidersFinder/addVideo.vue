<template>
  <v-card class="pa-5">
    <v-card-title>
      <h1>Add Video</h1>
    </v-card-title>
    <v-divider class="ma-5"/>
    <v-card-text>
      <v-tabs fixed-tabs v-model="tabs">
        <v-tabs-slider></v-tabs-slider>
        <v-tab key="stage">
          Stage
        </v-tab>
        <v-tab key="operators">
          Operators
        </v-tab>
      </v-tabs>
      <v-divider/>
      <v-tabs-items v-model="tabs">
        <v-tab-item key="stage" class="pa-5">
          <stateSelector :info="false" :selectedStage.sync="selectedStage"></stateSelector>
        </v-tab-item>
        <v-tab-item key="operators" class="pa-5">
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
              <v-btn color="success" @click="addChara" :disabled="fastInput.length !== 9">
                <v-icon>mdi-plus</v-icon>
                ADD
              </v-btn>
              <v-spacer/>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <v-card class="pa-5" outlined>
        <v-card-title>
          <h1 v-if="String(stage['stageId']).endsWith('#f#')">Challenge&nbsp;</h1>
          <h1>{{ stage["code"] }}</h1>
        </v-card-title>
        <v-divider class="mt-5 mb-5"/>
        <v-card-text>
          <v-row>

            <v-col cols="10" style="display: flex; flex-wrap: wrap">
                <v-tooltip
                    top
                    v-for="c in group"
                    :key="c.id"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <span
                        v-bind="attrs"
                        v-on="on"
                        style="width: fit-content; height: fit-content;"
                    >
                      <a
                          style="width: fit-content; height: fit-content;"
                      >

                        <v-img
                            :src="`https://cdn.jsdelivr.net/gh/arkntools/arknights-toolbox@gh-pages/assets/img/avatar/${c.id.replaceAll('char_', '')}.png`"
                            alt="avatar"
                            style="width: 80px; height: 80px;"
                        >
                        <v-btn icon @click="remove(c)" style="position: absolute; top: 0; right: 0;">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                        </v-img>
                      </a>
                    </span>
                  </template>
                  <v-card style="display:flex; background-color: rgba(0,0,0,0); backdrop-filter: blur(10px); flex-direction: column;" class="align-center justify-center" elevation="0">
                    <div style="display: flex;">
                      <v-card>
                        <v-progress-circular
                            :rotate="-90"
                            :size="100"
                            :value="c.level / character['phases'][c.elite]['maxLevel'] *100"
                            color="amber"
                        >
                          <img :src="require(`@/assets/elite${c.elite}.png`)" alt="potentialLevel" style="position: absolute; z-index: 1; width: 6em; opacity: 0.5;">
                          <h1 style="font-size: 3em; z-index: 2; text-shadow: black 0 0 3px;">
                            {{ c.level }}
                          </h1>
                          <h5 style="position: absolute; bottom: 1.1em; z-index: 2; text-shadow: black 0 0 2px;">LV</h5>
                        </v-progress-circular>
                      </v-card>
                      <v-card>
                        <v-progress-circular
                            :rotate="-90"
                            :size="100"
                            :value="c.trust / 2"
                            color="deep-orange"
                        >
                          <v-icon style="position: absolute; z-index: 1; font-size: 4em; opacity: 0.5;">mdi-handshake-outline</v-icon>
                          <h1 style="font-size: 3em; z-index: 2; text-shadow: black 0 0 3px;">
                            {{ c.trust }}
                          </h1>
                          <h5 style="position: absolute; bottom: 1.1em; z-index: 2; text-shadow: black 0 0 2px;">TRUST</h5>
                        </v-progress-circular>
                      </v-card>
                    </div>
                    <div style="display: flex; ">
                      <img :src="require(`@/assets/poten${c.potential}.png`)" alt="potentialLevel" style="width: 5em">

                      <img v-if="c.skillId !== 0" style="width: 5em; border-radius: 0.25em" :src="`https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/skills/skill_icon_${character['skills'][c.skillId-1]['skillId']}.png`" alt="skillIcon">
                      <img v-if="c.skillLevel !== 0" :src="require(`@/assets/skillLevel${c.skillLevel === 0 ? 10 : c.skillLevel}.png`)" alt="potentialLevel" style="width: 5em; height: 5em">

                    </div>
                  </v-card>
                </v-tooltip>
            </v-col>
            <v-col cols="2" >
              13
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import stateSelector from "@/components/RaidersFinder/stateSelector";

export default {
  name: "addVideo",
  components: {
    stateSelector
  },
  data () {
    return {
      selectedStage: null,
      tabs: null,
      fastInput: "",
      add: null,
      kind: 0,
      group: []
    }
  },
  methods: {
    remove: function (value) {
      let index = this.group.indexOf(value);
      if (index !== -1) {
        this.group.splice(index, 1);
      }
    },
    addChara: function () {
      this.group.push({
        id: this.add,
        elite: parseInt(this.fastInput[0]),
        level: parseInt(this.fastInput[1] + this.fastInput[2]),
        skillId: parseInt(this.fastInput[3]),
        skillLevel: parseInt(this.fastInput[4]),
        potential: parseInt(this.fastInput[5]),
        trust: parseInt(this.fastInput[6] + this.fastInput[7] + this.fastInput[8]),
        kind: parseInt(this.kind)
      })


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