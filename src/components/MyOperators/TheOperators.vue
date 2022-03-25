<template>
  <div>
    <v-expansion-panels multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2>{{ $t("MOP.my") }}</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-divider/>
          <myOperators></myOperators>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2>{{ $t("MOP.all") }}</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-divider/>

          <v-row class="ma-2">
            <v-col style="display: flex; justify-content: center; align-items: center;">
              <v-text-field :label="$t('MOP.search')" v-model="filterName"/>
            </v-col>
            <v-col style="display: flex; justify-content: center; align-items: center;">
              <div class="column">
                <v-btn-toggle multiple v-model="filterRarity" tile>
                  <div>
                    <v-btn class="ma-2" rounded v-for="r in [1,2,3,4,5,6]" :key="r" small outlined>
                      {{ r }}★
                    </v-btn>
                  </div>
                </v-btn-toggle>
                <v-btn-toggle multiple v-model="filterClass" tile>
                  <div>
                    <v-btn class="ma-2" fab v-for="c in classes" :key="c" small outlined :value="c">
                      <img class="refLogo" style="width: 3em" :src="require(`@/assets/${c}.png`)" alt="logo">
                    </v-btn>
                  </div>
                </v-btn-toggle>

              </div>
            </v-col>
            <div style="display: flex; justify-content: center; align-items: center;">
              <v-switch v-model="showAvatar" :label="$t('MOP.avatar')"/>
            </div>
          </v-row>

          <div class="AO">
            <div class="cCard"
                 v-for="(data, c) in character_table"
                 :key="c">
              <v-card
                  outlined
              >
                <img class="refLogo" :src="require(`@/assets/${data['profession']}.png`)" alt="professionLogo" style="width: 2em; position: absolute; right: 0; top: 0;">
                <v-btn icon rounded style="z-index: 2;" class="v-btn--absolute" @click="changeSelectedOperator(c, data)"><v-icon>mdi-plus</v-icon></v-btn>


                <v-card-title class="pa-3">

                  <v-list-item class="">
                    <v-list-item-content style="display: flex; justify-content: center; flex-direction: column;">
                      <div>
                        <v-chip small :class="rarity[data['rarity']]+'Star'">{{ data["rarity"]+1 }}★</v-chip>

                      </div>
                      <h5>{{ data.name }}</h5>
                      <v-list-item-subtitle small>{{ data.appellation }}</v-list-item-subtitle>
                    </v-list-item-content>
                    &nbsp;
                    <img
                        :src="`https://cdn.jsdelivr.net/gh/arkntools/arknights-toolbox@gh-pages/assets/img/avatar/${c.replace('char_', '')}.png`"
                        alt="avatar"
                        class="rounded-lg"
                        v-if="showAvatar"
                    >
                  </v-list-item>
                </v-card-title>
              </v-card>
            </div>

          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog v-model="addDialog" v-if="addDialog">

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
            <levelChecker :selectedOperators="selectedOperators"/>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import levelChecker from "@/components/MyOperators/levelChecker.vue"
import myOperators from "@/components/MyOperators/myOperators";

export default {
  name: "TheOperators",
  components: {
    levelChecker,
    myOperators
  },
  mounted() {
    this.$root.$on('closeDialog', () => {
      this.addDialog = false
    })
  },
  data() {
    return {
      rarity: ["zero", "one", "two", "three", "four", "five"],
      filterRarity: [],
      filterName: "",
      showAvatar: true,
      addDialog: false,
      selectedOperators: null,
      slider: 40,
      filterClass: [],
      classes: ["PIONEER", "SNIPER", "MEDIC", "CASTER", "WARRIOR", "TANK", "SUPPORT", "SPECIAL"]
    }
  },
  methods: {
    changeSelectedOperator: function (c, data) {
      this.$store.commit('setElite', {elite: 0})
      data["id"] = c
      this.selectedOperators = data
      this.addDialog = true
    },
  },
  computed: {
    getElite: function () {
      if (this.$store.state.elite === 2) {
        return 2
      } else {
        return 1
      }
    },
    character_table: function () {
      console.log("test")
      let ct = JSON.parse(JSON.stringify(this.$store.state.character_table));
      Object.keys(ct).forEach(c => {
        if (ct[c]["itemObtainApproach"] === null) {
          delete ct[c];
        } else if (!(this.filterClass.includes(ct[c]["profession"])) && (this.filterClass.length !== 0)) {
          delete ct[c]
        } else if (!(this.filterRarity.includes(ct[c]["rarity"])) && (this.filterRarity.length !== 0)) {
          delete ct[c]
        } else if (
            (ct[c].name.toLowerCase().match(this.filterName.toLowerCase()) === null)
            && (ct[c].appellation.toLowerCase().match(this.filterName.toLowerCase()) === null)
            && (ct[c].pinyinFull.match(this.filterName.toLowerCase()) === null)
            && (ct[c].pinyinHead.match(this.filterName.toLowerCase()) === null)
        ) {
          delete ct[c]
        }
      })

      return ct
    },
  }

}
</script>

<style>
div.AO {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
.cCard {
  margin: 5px;
}

.addOpBg {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}

.desc strong {
  color: #00b0ff !important;
}

.textF * {
  background-color: rgba(0,0,0,0) !important;;
}

.theme--light img.refLogo {
  -webkit-filter: invert(100%);
  filter: invert(100%);
}

.v-dialog.v-dialog--active {
  width: 90%;
}

.zeroStar {
  background-color: gray !important;
  color: white !important;
}
.oneStar {
  background-color: darkseagreen !important;
  color: white !important;
}
.twoStar {
  background-color: royalblue !important;
  color: white !important;
}
.threeStar {
  background-color: mediumpurple !important;
  color: white !important;
}
.fourStar {
  background-color: gold !important;
  color: black !important;
}
.fiveStar {
  background-color: orange !important;
  color: white !important;
}
</style>