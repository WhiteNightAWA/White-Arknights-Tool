<template>
  <div>
    <v-expansion-panels multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2>{{ $t("MOP.my") }}</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-divider/>
          <v-container>
            <v-card

            >

            </v-card>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2>{{ $t("MOP.all") }}</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-divider/>

          <v-row class="ma-2">
            <v-col style="display: flex; justify-content: center">
              <v-text-field :label="$t('MOP.search')" v-model="filterName"/>
            </v-col>
            <v-col style="display: flex; justify-content: center; align-items: center;">
              <v-btn-toggle multiple v-model="filterRarity" tile>
                <div>
                  <v-btn class="ma-2" v-for="r in [1,2,3,4,5,6]" :key="r" small>
                    {{ r }}★
                  </v-btn>
                </div>
              </v-btn-toggle>
            </v-col>
            <v-col style="display: flex; justify-content: center; align-items: center;">
              <v-switch v-model="showAvatar" :label="$t('MOP.avatar')"/>
            </v-col>
          </v-row>
          {{ filterName }}

          <div class="AO">
            <div class="cCard"
                 v-for="(data, c) in character_table"
                 :key="c">
              <v-card
                  outlined
                  v-if="!filterRarity.includes(c['rarity'])"
              >
                <v-btn icon rounded class="v-btn--absolute"><v-icon>mdi-plus</v-icon></v-btn>


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
  </div>
</template>

<script>

export default {
  name: "MyOperators",
  components: {},
  data() {
    return {
      rarity: ["zero", "one", "two", "three", "four", "five"],
      filterRarity: [0,1,2,3,4,5],
      filterName: "",
      showAvatar: true
    }
  },
  computed: {
    character_table: function () {
      console.log("test")
      let ct = JSON.parse(JSON.stringify(this.$store.state.character_table));
      Object.keys(ct).forEach(c => {
        if (ct[c]["itemObtainApproach"] === null) {
          delete ct[c]
        } else if (!(this.filterRarity.includes(ct[c]["rarity"]))) {
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

<style scoped>
div.AO {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
.cCard {
  margin: 5px;
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