<template>
  <v-container>
    <v-row class="justify-space-around">
      <v-switch v-model="table" label="table mode"/>
      <v-switch v-model="showAvatar" label="show avatar"/>
    </v-row>
    <v-divider/>
    <div class="ma-5">
      <v-row>
        <v-spacer></v-spacer>
        <div>
          <v-btn icon @click="importOperators=true">
            <v-icon>
              mdi-file-import-outline
            </v-icon>
          </v-btn>
          <v-dialog v-model="importOperators">
            <v-card class="pa-5">
              <v-card-title>
                <h1>
                  Import Operators
                </h1>
              </v-card-title>
              <v-spacer/>
              <v-divider/>
              <v-spacer/>
              <v-card-text>
                <v-textarea :height="500" outlined :rules="[val => isJson(val) || 'This is not a JSON']" style="height: 75%" v-model="importText"/>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!isJson(importText)" color="error" @click="importF('cover')">
                  IMPORT with COVER
                </v-btn>
                <v-btn :disabled="!isJson(importText)" color="warning" @click="importF('replace')">
                  IMPORT with REPLACE
                </v-btn>
                <v-btn :disabled="!isJson(importText)" color="success" @click="importF('skip')">
                  IMPORT with SKIP
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div>
          <v-btn icon @click="exportOperators = true">
            <v-icon>
              mdi-export-variant
            </v-icon>
          </v-btn>
          <v-dialog v-model="exportOperators">
            <v-card>
              <v-card-title>
                <h1>
                  Export Operators
                </h1>
              </v-card-title>
              <v-spacer/>
              <v-divider/>
              <v-card-text class="pa-5">
                <v-textarea hide-details :height="500" :value="JSON.stringify(myOperators, null, 4)" outlined :rules="[val => isJson(val) || 'This is not a JSON']" style="height: 75%"/>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="success" @click="copy(JSON.stringify(myOperators, null, 4));">
                  <div v-if="!copied" class="align-center" style="display: flex;">
                    <v-icon>mdi-content-copy</v-icon>
                    COPY
                  </div>
                  <div v-else>
                    <v-icon>mdi-check</v-icon>
                    COPIED
                  </div>

                </v-btn>
                <v-btn color="primary" @click="downloadExport">
                  <v-icon>mdi-download</v-icon>
                  DOWNLOAD TXT
                </v-btn>
                <v-spacer/>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-row>
      <v-row>
        <v-container v-if="!table" class="AO justify-space-around">
            <div class="cCard"
                 v-for="(data, c) in myOperators"
                 :key="c">
              <v-card
                  outlined
                  style="display: flex"
              >

                <img class="refLogo" :src="require(`@/assets/${character_table[c]['profession']}.png`)" alt="professionLogo" style="width: 2.5em; position: absolute; left: 0; top: 0; z-index: 2">
                <v-card-title class="pa-3">
                  <v-list-item class="">
                    <v-card style="display:flex; background-color: rgba(0,0,0,0); backdrop-filter: blur(10px); width: 4em; height: 4em;" class="align-center justify-center mr-3" elevation="0">
                      <v-progress-circular
                          :rotate="-90"
                          :size="100"
                          :value="data.level / character_table[c]['phases'][data.elite]['maxLevel'] *100"
                          color="amber"
                      >
                        <img :src="require(`@/assets/elite${data.elite}.png`)" alt="potentialLevel" style="position: absolute; z-index: 1; width: 6em; opacity: 0.5;">
                        <h1 style="font-size: 3em; z-index: 2; text-shadow: black 0 0 3px;">
                          {{ data.level }}
                        </h1>
                        <h5 style="position: absolute; bottom: 0.5em; z-index: 2; text-shadow: black 0 0 2px;">LV</h5>
                      </v-progress-circular>
                    </v-card>
                    <v-list-item-content style="display: flex; justify-content: center; flex-direction: column;">
                      <div>
                        <v-chip small :class="rarity[character_table[c].rarity]+'Star'">{{ character_table[c].rarity+1 }}★</v-chip>

                      </div>
                      <h5>{{ character_table[c].name }}</h5>
                      <v-list-item-subtitle small>{{ character_table[c].appellation }}</v-list-item-subtitle>
                    </v-list-item-content>
                    &nbsp;
                    <img
                        :src="`https://cdn.jsdelivr.net/gh/arkntools/arknights-toolbox@gh-pages/assets/img/avatar/${c.replace('char_', '')}.png`"
                        alt="avatar"
                        class="rounded-lg"
                        v-if="showAvatar"
                    >
                  </v-list-item>
                  <img
                      :src="require(`@/assets/poten${data.potential}.png`)"
                      alt="potentialLevel"
                      style="width: 2em; position: absolute; right: 0; bottom: 0;"
                  >
                </v-card-title>
                <v-progress-linear
                    color="pink accent-1"
                    :value="data.trust/2"
                    style="position: absolute; bottom: 0"
                    rounded
                />

                <v-card style="display: flex; position: absolute; left: 0; bottom: 0; z-index: 2; background-color: rgba(0,0,0,0.5); backdrop-filter: blur(1px)" >
                  <img
                      v-for="s in getSkillCountList(c)"
                      :key="s.toString()"
                      :src="require(`@/assets/skillLevel${data.skills + getSkillAdd(data, s)}.png`)"
                      alt="potentialLevel"
                      style="width: 2em"
                  >
                </v-card>
                <v-btn @click="editOperatorF(c, character_table[c], data)" icon style="background-color: rgba(0,0,0,0); position: absolute; top: 0; right: 0; z-index: 2; font-size: 2em;">
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
              </v-card>
            </div>
        </v-container>
        <v-container v-else>
          <v-simple-table>
            <template v-slot:default>

              <tbody>
                <tr
                    v-for="(data, c) in myOperators"
                    :key="c"
                    class="justify-center align-center text-center"
                >
                  <td class="pa-1">
                    <div style="display: flex" class="justify-space-between">
                      <div style="display: flex;" class="justify-center">
                        <img
                            :src="`https://cdn.jsdelivr.net/gh/arkntools/arknights-toolbox@gh-pages/assets/img/avatar/${c.replace('char_', '')}.png`"
                            alt="avatar"
                            class="rounded-lg"
                            style="width: 5em; height: 5em;"
                            v-if="showAvatar"
                        >
                        <div style="display: flex;">
                          <img class="refLogo" :src="require(`@/assets/${character_table[c]['profession']}.png`)" alt="professionLogo" style="width: 5em; height: 5em">
                          <div style="display: flex; flex-direction: column" class="justify-center text-start">
                            <h3>
                              {{ character_table[c]["name"] }}
                            </h3>
                            {{ character_table[c]["appellation"] }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>

                      <div style="display: flex;">
                        <img
                            :src="require(`@/assets/poten${data.potential}.png`)"
                            alt="potentialLevel"
                            style="width: 5em; height: 5em"
                        >
                        <v-card style="display:flex; background-color: rgba(0,0,0,0); backdrop-filter: blur(10px); width: 5em; height: 5em;" class="align-center justify-center mr-3" elevation="0">
                          <v-progress-circular
                              :rotate="-90"
                              :size="100"
                              :value="data.level / character_table[c]['phases'][data.elite]['maxLevel'] *100"
                              color="amber"
                          >
                            <img :src="require(`@/assets/elite${data.elite}.png`)" alt="potentialLevel" style="position: absolute; z-index: 1; width: 7em; opacity: 0.5;">
                            <h1 style="font-size: 3em; z-index: 2; text-shadow: black 0 0 3px;">
                              {{ data.level }}
                            </h1>
                            <h5 style="position: absolute; bottom: 1.5em; z-index: 2; text-shadow: black 0 0 2px;">LV</h5>
                          </v-progress-circular>
                        </v-card>
                        <v-card style="display:flex; background-color: rgba(0,0,0,0); backdrop-filter: blur(10px); width: 5em; height: 5em;" class="align-center justify-center" elevation="0">
                          <v-progress-circular
                              :rotate="-90"
                              :size="100"
                              :value="data.trust / 2"
                              color="deep-orange"
                          >
                            <v-icon style="position: absolute; z-index: 1; font-size: 4em; opacity: 0.5;">mdi-handshake-outline</v-icon>
                            <h1 style="font-size: 3em; z-index: 2; text-shadow: black 0 0 3px;">
                              {{ data.trust }}
                            </h1>
                            <h5 style="position: absolute; bottom: 1.5em; z-index: 2; text-shadow: black 0 0 3px;">TRUST</h5>
                          </v-progress-circular>
                        </v-card>
                        <img
                            v-for="s in getSkillCountList(c)"
                            :key="s.toString()"
                            :src="require(`@/assets/skillLevel${data.skills + getSkillAdd(data, s)}.png`)"
                            alt="potentialLevel"
                            style="width: 5em"
                        >
                        <v-spacer></v-spacer>
                        <div style="display: flex;" class="justify-center align-center">

                          <v-btn @click="editOperatorF(c, character_table[c], data)" icon x-large>
                            <v-icon >mdi-cog</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </div>

                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-row>
    </div>
    <v-dialog v-model="openDialog">
      <lookOperators :selectedOperators="selectedOperators" :add="false"></lookOperators>
    </v-dialog>
    <v-snackbar
        v-model="imported"
        :timeout="2000"
        color="success"
        style="width: auto;"
        bottom
    >

      <h2 class="text-center">
        <v-icon>mdi-check</v-icon>
        IMPORTED
      </h2>
    </v-snackbar>
  </v-container>
</template>

<script>
import lookOperators from "@/components/MyOperators/lookOperators";

export default {
  name: "myOperators",
  data () {
    return {
      table: false,
      showAvatar: true,
      rarity: ["zero", "one", "two", "three", "four", "five"],
      openDialog: false,
      copied: false,
      imported: false,
      selectedOperators: null,
      importOperators: false,
      exportOperators: false,
      importText: ""
    }
  },
  components: {
    lookOperators
  },
  methods: {
    download: function (filename, text) {
      let element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    downloadExport: function () {
      this.download("Operators.txt", JSON.stringify(this.myOperators, null, 4));
    },
    copy: function (text) {
      navigator.clipboard.writeText(text);
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 2000)
    },
    importF: function (mode) {
      if (mode === "cover") {
        this.$store.commit("replaceOperators", {
          data: JSON.parse(this.importText)
        })
      } else if (mode === "replace") {
        let data = this.myOperators
        let operators = JSON.parse(this.importText)
        Object.keys(operators).forEach(o => {
          console.log(o)
          data[o] = operators[o]
        })
        this.$store.commit("replaceOperators", {
          data: data
        })
      } else if (mode === "skip") {
        let data = this.myOperators
        let operators = JSON.parse(this.importText)
        console.log(Object.keys(operators))
        Object.keys(operators).forEach(o => {
          if (!(o in data)) {
            data[o] = operators[o]
          }
        })
        this.$store.commit("replaceOperators", {
          data: data
        })
      }
      this.importOperators = false
      this.imported = true
    },
    isJson: function (str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    },
    editOperatorF: function (id, data, info) {
      data["id"] = id
      data["info"] = info
      this.selectedOperators = data
      this.openDialog = true
    },
    getSkillAdd: function (data, c) {
      if (c === 0) {
        return data.skill1
      } else if (c === 1) {
        return data.skill2
      } else {
        return data.skill3
      }
    },
    getSkillCountList: function (c) {
      return [...Array(this.character_table[c]['skills'].length).keys()]
    },

  },
  computed: {
    myOperators: function () {
      return this.$store.state.myOperators
    },
    character_table: function () {
      return this.$store.state.character_table
    },
  },
  mounted() {
    this.$root.$on('closeDialogF', () => {
      this.openDialog = false
    })
  },
}
</script>

<style scoped>

</style>