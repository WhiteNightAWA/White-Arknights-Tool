<template>
  <v-container>
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
      <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
        <v-switch v-model="showAvatar" :label="$t('MOP.avatar')"/>
        <v-switch v-model="table" label="table mode"/>

      </div>
    </v-row>

    <div class="AO justify-space-around" v-if="!table">
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
    <div v-else>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr
              v-for="(data, c) in character_table"
              :key="c"
            >
              <td >
                <img
                    :src="`https://cdn.jsdelivr.net/gh/arkntools/arknights-toolbox@gh-pages/assets/img/avatar/${c.replace('char_', '')}.png`"
                    alt="avatar"
                    class="rounded-lg mt-1"
                    v-if="showAvatar"
                >
                <v-spacer
                  v-else
                ></v-spacer>
              </td>
              <td>
                <div style="display: flex;" class="justify-center align-center">
                  <v-chip small :class="rarity[data['rarity']]+'Star'">{{ data["rarity"]+1 }}★</v-chip>

                  <img class="refLogo" :src="require(`@/assets/${character_table[c]['profession']}.png`)" alt="professionLogo" style="width: 5em; height: 5em">
                  <div style="display: flex; flex-direction: column">
                    <h2>
                      {{ data["name"] }}
                    </h2>
                    <v-list-item-subtitle>
                      {{ data["appellation"] }}
                    </v-list-item-subtitle>
                  </div>
                </div>
              </td>
              <td>
                <div style="display: flex;">
                  <v-spacer></v-spacer>
                  <v-btn icon rounded style="z-index: 2;" @click="changeSelectedOperator(c, data)"><v-icon>mdi-plus</v-icon></v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <v-dialog v-model="addDialog" v-if="addDialog">
      <lookOperators :selectedOperators="selectedOperators"></lookOperators>
    </v-dialog>

  </v-container>

</template>

<script>
import lookOperators from "@/components/MyOperators/lookOperators.vue";

export default {
  name: "allOperators",
  components: {
    lookOperators,
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
      table: false,
      selectedOperators: null,
      slider: 40,
      filterClass: [],
      classes: ["PIONEER", "SNIPER", "MEDIC", "CASTER", "WARRIOR", "TANK", "SUPPORT", "SPECIAL"]
    }
  },
  methods: {
    changeSelectedOperator: function (c, data) {
      data["id"] = c
      this.selectedOperators = data
      this.addDialog = true
    },
  },
  computed: {
    character_table: function () {
      console.log("test")
      let ct = JSON.parse(JSON.stringify(this.$store.state.character_table));
      Object.keys(ct).forEach(c => {
        if (ct[c]["itemObtainApproach"] === null) {
          delete ct[c];
        } else if (this.$store.state.myOperators === null ? false :  c in this.$store.state.myOperators) {
          delete ct[c]
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

<style >
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
