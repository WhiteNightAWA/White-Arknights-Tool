<template>
  <v-card class="pa-5 overflow-hidden" outlined>

    <v-container class="addOpBg">
      <img class="refLogo" style="width: 10em; opacity: 0.75; position: absolute; left: 30px;" :src="`https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/factions/logo_${selectedOperators['nationId']}.png`" alt="nationLogo">
      <img
          :src="`https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/characters/${selectedOperators['id']}_${getElite}.png`"
          alt="bg"
          style="
              width: calc(100% - 40px);
              top: 50%;
              left: 50%;
              position: absolute;
              opacity: 0.5;
              z-index: 1;
              margin-top: -50%;
              margin-left: calc(-50% + 20px);
              "
      >
      <img class="refLogo" style="width: 10em; opacity: 0.75; position: absolute; right: 30px;" :src="require(`@/assets/${selectedOperators['profession']}.png`)" alt="classLogo">
      <img class="refLogo" style="width: 5em; opacity: 0.75; position: absolute; right: 30px; top: 12em" :src="`https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/ui/subclass/sub_${selectedOperators['subProfessionId']}_icon.png`" alt="subClassLogo">


      <v-card style="z-index: 2; background-color: rgba(0,0,0,0);" elevation="0">
        <v-container style="z-index: 2">
          <h1 class="text-center">
            {{ "★".repeat(selectedOperators["rarity"]+1) }}
          </h1>
          <h1 style="font-size: 6rem;" class="text-center">{{ selectedOperators["name"] }}</h1>
          <div style="display: flex; justify-content: space-evenly;">
            <p
                v-for="t in selectedOperators['appellation'].toUpperCase()"
                :key="t+Math.random().toString()"
                style="font-size: 2em"
            >
              {{ t }}
            </p>
          </div>
        </v-container>
        <v-container v-html="selectedOperators['description'].replaceAll('@ba.kw', 'strong').replaceAll('\\n', '<br/>')" class="pa-2 text-center desc">
          {{ selectedOperators["description"].replaceAll("@ba.kw", "strong").replaceAll("\n", "<br/>") }}
        </v-container>
        <v-card style="backdrop-filter: blur(3px); background: rgba(0,0,0,0.2);" class="ma-4 pa-6 text-center align-center justify-center" elevation="16" outlined>
          <v-row>
            <v-col style="display: flex; flex-direction: column;">
              <v-row class="justify-center align-center flex-nowrap">
                <v-col>
                  <v-hover v-slot="{ hover }">
                    <v-card style="display:flex; background-color: rgba(0,0,0,0); backdrop-filter: blur(10px); width: 5em; height: 5em;" class="align-center justify-center" elevation="0">
                      <img :src="require(`@/assets/elite${elite}.png`)" alt="potentialLevel" style="width: 4em">
                      <v-btn :class="{ show: !hover }" :disabled="!(elite < rarityElite[selectedOperators['rarity']].length-1)" style="position: absolute; top: 0; background-color: rgba(0,0,0,0)" @click="elite++;">
                        <v-icon>mdi-arrow-up-bold</v-icon>
                      </v-btn>
                      <v-btn :disabled="!(elite > 0)" :class="{ show: !hover }" style="position: absolute; bottom: 0; background-color: rgba(0,0,0,0)" @click="elite--; elite === 1 ? elite : (skills > 4 ? skills = 4 : skills); clearSkills();">
                        <v-icon>mdi-arrow-down-bold</v-icon>
                      </v-btn>
                    </v-card>
                  </v-hover>
                </v-col>
                <v-col>
                  <v-card style="display:flex; background-color: rgba(0,0,0,0); backdrop-filter: blur(10px); width: 5em; height: 5em;" class="align-center justify-center" elevation="0">
                    <v-progress-circular
                        :rotate="-90"
                        :size="100"
                        :value="level / selectedOperators['phases'][elite]['maxLevel'] *100"
                        color="amber"
                    >
                      <img :src="require(`@/assets/elite${elite}.png`)" alt="potentialLevel" style="position: absolute; z-index: 1; width: 6em; opacity: 0.5;">
                      <h1 style="font-size: 3em; z-index: 2; text-shadow: black 0 0 3px;">
                        {{ level }}
                      </h1>
                      <h5 style="position: absolute; bottom: 1.1em; z-index: 2; text-shadow: black 0 0 2px;">LV</h5>
                    </v-progress-circular>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card style="display:flex; background-color: rgba(0,0,0,0); backdrop-filter: blur(10px); width: 5em; height: 5em;" class="align-center justify-center" elevation="0">
                    <v-progress-circular
                        :rotate="-90"
                        :size="100"
                        :value="trust / 2"
                        color="deep-orange"
                    >
                      <v-icon style="position: absolute; z-index: 1; font-size: 4em; opacity: 0.5;">mdi-handshake-outline</v-icon>
                      <h1 style="font-size: 2.5em; z-index: 2; text-shadow: black 0 0 3px;">
                        {{ trust }}
                      </h1>
                      <h5 style="position: absolute; bottom: 1.1em; z-index: 2; text-shadow: black 0 0 3px;">TRUST</h5>
                    </v-progress-circular>
                  </v-card>
                </v-col>
                <v-col>
                  <v-hover v-slot="{ hover }">
                    <v-card style="display:flex; background-color: rgba(0,0,0,0); backdrop-filter: blur(10px); width: 5em; height: 5em;" elevation="0" class="align-center justify-center">
                      <img :src="require(`@/assets/poten${potential}.png`)" alt="potentialLevel" style="width: 4em">
                      <v-btn :disabled="!(potential < 6)" :class="{ show: !hover }" style="position: absolute; top: 0; background-color: rgba(0,0,0,0)" @click="potential++">
                        <v-icon>mdi-arrow-up-bold</v-icon>
                      </v-btn>
                      <v-btn :disabled="!(potential > 1)" :class="{ show: !hover }" style="position: absolute; bottom: 0; background-color: rgba(0,0,0,0)" @click="potential--">
                        <v-icon>mdi-arrow-down-bold</v-icon>
                      </v-btn>
                    </v-card>
                  </v-hover>
                </v-col>

              </v-row>
              <v-row>
                <v-slider
                    v-model="level"
                    class="align-center"
                    :max="selectedOperators['phases'][elite]['maxLevel']"
                    :min="1"
                    hide-details
                    style="width: 25em"
                    thumb-label
                    color="amber"
                    dense
                >
                  <template v-slot:append>
                    <v-text-field
                        v-model="level"
                        type="number"
                        style="width: 5em; height: 100%;"
                        label="Level"
                        class="textF"
                        :min="1"
                        :max="selectedOperators['phases'][elite]['maxLevel']"
                        hide-details
                        filled
                        dense
                    ></v-text-field>
                  </template>
                </v-slider>
              </v-row>
              <v-row>
                <v-slider
                    v-model="trust"
                    class="align-center"
                    :max="200"
                    :min="0"
                    hide-details
                    style="width: 25em"
                    thumb-label
                    color="deep-orange"
                    dense
                >
                  <template v-slot:append>
                    <v-text-field
                        v-model="trust"
                        type="number"
                        style="width: 5em; height: 100%;"
                        label="Trust"
                        class="textF"
                        :min="1"
                        :max="200"
                        hide-details
                        filled
                        dense
                    ></v-text-field>
                  </template>
                </v-slider>
              </v-row>
            </v-col>


            <v-col
                v-if="selectedOperators['rarity'] > 1"
            >
              <v-card
                  style="background-color: rgba(0,0,0,0)"
                  class="pa-2"
                  outlined
              >
                <div
                    style="display: flex; justify-content: space-evenly"
                    v-if="selectedOperators['skills'].length >= 1"
                >
                  <img style="width: 5em; border-radius: 0.25em" :src="`https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/skills/skill_icon_${selectedOperators['skills'][0]['skillId']}.png`" alt="skillIcon">
                  <v-hover v-slot="{ hover }">
                    <v-card style="display:flex; background-color: rgba(0,0,0,0.5); backdrop-filter: blur(10px); width:5em; height:5em;" class="align-center justify-center pa-0">
                      <img :src="require(`@/assets/skillLevel${skills + skill1}.png`)" alt="potentialLevel" style="width: 4em">
                      <v-btn :disabled="!(skills + skill1 < (elite === 0 ? 4 : (elite === 1 ? 7 : (selectedOperators['rarity']<3 ? 7 : 10))))" :class="{ show: !hover }" style="position: absolute; top: 0; background-color: rgba(0,0,0,0)" @click="skills === 7 ? skill1++ : skills++">
                        <v-icon>mdi-arrow-up-bold</v-icon>
                      </v-btn>
                      <v-btn :disabled="!(skills > 1)" :class="{ show: !hover }" style="position: absolute; bottom: 0; background-color: rgba(0,0,0,0)" @click="skills === 7 && skill1 !== 0 ? skill1-- : skills--; loadSkills(skill1)">
                        <v-icon>mdi-arrow-down-bold</v-icon>
                      </v-btn>
                    </v-card>
                  </v-hover>
                </div>
                <div
                    style="display: flex; justify-content: space-evenly"
                    v-if="selectedOperators['skills'].length >= 2 && elite >= 1"
                >
                  <img style="width: 5em; border-radius: 0.25em" :src="`https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/skills/skill_icon_${selectedOperators['skills'][1]['skillId']}.png`" alt="skillIcon">
                  <v-hover v-slot="{ hover }">
                    <v-card style="display:flex; background-color: rgba(0,0,0,0.5); backdrop-filter: blur(10px); width:5em; height:5em;" class="align-center justify-center pa-0">
                      <img :src="require(`@/assets/skillLevel${skills + skill2}.png`)" alt="potentialLevel" style="width: 4em">
                      <v-btn :disabled="!(skills + skill2 < (elite === 0 ? 4 : (elite === 1 ? 7 : (selectedOperators['rarity']<3 ? 7 : 10))))" :class="{ show: !hover }" style="position: absolute; top: 0; background-color: rgba(0,0,0,0)" @click="skills === 7 ? skill2++ : skills++">
                        <v-icon>mdi-arrow-up-bold</v-icon>
                      </v-btn>
                      <v-btn :disabled="!(skills + skill2 > 1)" :class="{ show: !hover }" style="position: absolute; bottom: 0; background-color: rgba(0,0,0,0)" @click="skills === 7 && skill2 !== 0 ? skill2-- : skills--; loadSkills(skill2)">
                        <v-icon>mdi-arrow-down-bold</v-icon>
                      </v-btn>
                    </v-card>
                  </v-hover>
                </div>
                <div
                    style="display: flex; justify-content: space-evenly"
                    v-if="selectedOperators['skills'].length >= 3 && elite >= 2"
                >
                  <img style="width: 5em; border-radius: 0.25em" :src="`https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/skills/skill_icon_${selectedOperators['skills'][2]['skillId']}.png`" alt="skillIcon">
                  <v-hover v-slot="{ hover }">
                    <v-card style="display:flex; background-color: rgba(0,0,0,0.5); backdrop-filter: blur(10px); width:5em; height:5em;" class="align-center justify-center pa-0">
                      <img :src="require(`@/assets/skillLevel${skills + skill3}.png`)" alt="potentialLevel" style="width: 4em">
                      <v-btn :disabled="!(skills + skill3 < (elite === 0 ? 4 : (elite === 1 ? 7 : (selectedOperators['rarity']<3 ? 7 : 10))))" :class="{ show: !hover }" style="position: absolute; top: 0; background-color: rgba(0,0,0,0)" @click="skills === 7 ? skill3++ : skills++">
                        <v-icon>mdi-arrow-up-bold</v-icon>
                      </v-btn>
                      <v-btn :disabled="!(skills + skill3 > 1)" :class="{ show: !hover }" style="position: absolute; bottom: 0; background-color: rgba(0,0,0,0)" @click="skills === 7 && skill3 !== 0 ? skill3-- : skills--; loadSkills(skill3)">
                        <v-icon>mdi-arrow-down-bold</v-icon>
                      </v-btn>
                    </v-card>
                  </v-hover>
                </div>

              </v-card>
            </v-col>
            <v-col>
              <v-simple-table dense style="background-color: rgba(0,0,0,0); backdrop-filter: blur(2px)">
                <template v-slot:default>
                  <tbody>
                  <tr>
                    <td>HP</td>
                    <td v-html="getData('maxHp')"> {{ getData("maxHp") }} </td>
                  </tr>
                  <tr>
                    <td>ATK</td>
                    <td v-html="getData('atk')"> {{ getData("atk") }} </td>
                  </tr>
                  <tr>
                    <td>DEF</td>
                    <td v-html="getData('def')"> {{ getData("def") }} </td>
                  </tr>
                  <tr>
                    <td>Arts Resists</td>
                    <td v-html="getData('magicResistance')+'%'"> {{ getData("magicResistance")+"%" }} </td>
                  </tr>
                  <tr>
                    <td>Redeploy Time</td>
                    <td v-html="getData('respawnTime')+'s'"> {{ getData("respawnTime")+"s" }} </td>
                  </tr>
                  <tr>
                    <td>DP COST</td>
                    <td v-html="getData('cost')"> {{ getData("cost") }} </td>
                  </tr>
                  <tr>
                    <td>Block</td>
                    <td v-html="getData('blockCnt')"> {{ getData("blockCnt") }} </td>
                  </tr>
                  <tr>
                    <td>Attack Speed</td>
                    <td v-html="getData('attackSpeed')+'/s'"> {{ getData("attackSpeed")+"/s" }}</td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-spacer style="height: 1em"/>
          <v-divider/>
          <v-spacer style="height: 1em"/>
          <v-btn color="success" @click="addOperators(false)" v-if="add">
            <v-icon>mdi-plus</v-icon>
            ADD TO MY OPERATORS
          </v-btn>
          <v-btn color="success" @click="addOperators(true)" v-else>
            <v-icon>mdi-content-save</v-icon>
            SAVE
          </v-btn>
        </v-card>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>

export default {
  name: "lookOperators",
  components: {

  },
  props: {
    selectedOperators: Object,
    add: { type: Boolean, default: true }
  },
  data () {
    if (this.add) {
      return {
        elite: 0,
        level: 1,
        potential: 1,
        trust: 0,
        skills: 1,
        skill1: 0,
        skill2: 0,
        skill3: 0,
        rarityElite: [[0], [0], [0, 1], [0, 1, 2], [0, 1, 2], [0, 1, 2]],
        attributeType: {
          "0": "maxHp",
          "1": "atk",
          "2": "def",
          "3": "magicResistance",
          "4": "cost",
          "7": "attackSpeed",
          "21": "respawnTime"
        },
        done: false
      }
    } else {
      let data = this.selectedOperators["info"];
      return {
        elite: data.elite,
        level: data.level,
        potential: data.potential,
        trust: data.trust,
        skills: data.skills,
        skill1: data.skill1,
        skill2: data.skill2,
        skill3: data.skill3,
        rarityElite: [[0], [0], [0,1], [0,1,2], [0,1,2], [0,1,2]],
        attributeType: {
          "0": "maxHp",
          "1": "atk",
          "2": "def",
          "3": "magicResistance",
          "4": "cost",
          "7": "attackSpeed",
          "21": "respawnTime"
        },
        done: false
      }
    }
  },
  computed: {
    getElite: function () {
      if (this.elite === 2) {
        return 2
      } else {
        return 1
      }
    },
  },
  methods: {
    clearSkills: function () {
      this.skill1 = 0
      this.skill2 = 0
      this.skill3 = 0
    },
    loadSkills: function (skill) {
      if (this.skills === 6 && skill === 0) {
        this.skills = 6
        this.skill1 = 0
        this.skill2 = 0
        this.skill3 = 0
      }

    },
    addOperators: function (change) {
      if (change){
        this.$store.commit("changeOperators", {
          id: this.selectedOperators["id"],
          operator: {
            elite: this.elite,
            level: this.level,
            potential: this.potential,
            trust: this.trust,
            skills: this.skills,
            skill1: this.skill1,
            skill2: this.skill2,
            skill3: this.skill3,
            classes: this.selectedOperators["profession"],
            subClasses: this.selectedOperators["subProfessionId"],
            id: this.selectedOperators["phases"][0]["characterPrefabKey"]
          }
        })
        this.$root.$emit('closeDialogF');
        this.$root.$emit("snackbarOn");
      } else {
        this.$store.commit("addOperators", {
          id: this.selectedOperators["id"],
          operator: {
            elite: this.elite,
            level: this.level,
            potential: this.potential,
            trust: this.trust,
            skills: this.skills,
            skill1: this.skill1,
            skill2: this.skill2,
            skill3: this.skill3,
            classes: this.selectedOperators["profession"],
            subClasses: this.selectedOperators["subProfessionId"],
            id: this.selectedOperators["phases"][0]["characterPrefabKey"]
          }
        })
        this.elite = 0
        this.level = 1
        this.potential = 1
        this.trust = 0
        this.skills = 1
        this.skill1 = 0
        this.skill2 = 0
        this.skill3 = 0
        this.$root.$emit('closeDialog');
        this.$root.$emit("snackbarOn");
      }
    },
    getData: function (kind) {
      let value = this.selectedOperators["phases"][this.elite]["attributesKeyFrames"][0]["data"][kind] + Math.round(((this.selectedOperators["phases"][this.elite]["attributesKeyFrames"][1]["data"][kind] - this.selectedOperators["phases"][this.elite]["attributesKeyFrames"][0]["data"][kind]) / this.selectedOperators["phases"][this.elite]["maxLevel"])*(this.level-1))
      let ret = value
      let l = [...Array(this.potential-1).keys()]
      let add = 0
      let trustAdd = Math.round(this.selectedOperators["favorKeyFrames"][1]["data"][kind] / 100 * (this.trust < 100 ? this.trust : 100) )
      l.forEach(p => {
        if (this.selectedOperators["potentialRanks"][p]["buff"] !== null){
          this.selectedOperators["potentialRanks"][p]["buff"]["attributes"]["attributeModifiers"].forEach(e => {
            if (this.attributeType[e["attributeType"].toString()]===kind) {
              add += e["value"]
            }
          })
        }
      })

      if (trustAdd) {
        if (kind !== "attackSpeed") {
          ret = (value + trustAdd).toString() + ` <strong class="orangeText">(+${trustAdd})</strong>`
        }
      }
      if (add) {
        if (kind === "attackSpeed") {
          ret = ((100 + add)/value) + ` <strong class="blueText">(${add > 0 ? '+' : ''}${parseFloat((((100 + add) / value)-(100/value)).toPrecision(2))})</strong>`
        } else {
          ret = (value + add).toString() + ` <strong class="blueText">(${add > 0 ? '+' : ''}${add})</strong>`
        }
      } else if (kind === "attackSpeed") {
        ret = ((100 + add)/value)
      }

      if (trustAdd && add) {
        if (kind === "attackSpeed") {
          ret = ((100 + trustAdd + add)/value) + ` <strong class="blueText">(${add > 0 ? '+' : ''}${parseFloat((((100 + add) / value)-(100/value)).toPrecision(2))})</strong>` + ` <strong class="orangeText">(${trustAdd > 0 ? '+' : ''}${parseFloat((((100 + trustAdd) / value)-(100/value)).toPrecision(2))})</strong>`
        } else {
          ret = (value + trustAdd + add).toString() + ` <strong class="blueText">(${add > 0 ? '+' : ''}${add})</strong>` + ` <strong class="orangeText">(${trustAdd > 0 ? '+' : ''}${trustAdd})</strong>`
        }
      }

      return ret
    }
  },
}
</script>

<style>

.show {
  opacity: 0;
}

strong.blueText {
  color: #00b0ff !important;
}

strong.orangeText {
  color: orange !important;
}

</style>