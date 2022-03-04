<template>
<div>
  <v-dialog
      v-model="this.thisChange"
      persistent
      max-width="75%"
  >
    <v-alert
        v-if="!set"
        border="top"
        color="red"
        type="error"
    >This Is the first time you enter this website, please set you language first!</v-alert>
    <v-alert
        v-else
        border="top"
        color="green"
        type="success"
    >{{ $t("setLanguage") }}</v-alert>

    <v-card style="height: 100%; width: 100%; text-align: center;" elevation="10">
      <h1 style="display: flex;flex-direction: column"><i class="fa-solid fa-language" style="font-size: 2em">
      </i>{{ $t("Settings.language.title") }}</h1>
      <v-divider/>
      <v-container fluid style="display: flex; align-items: center; justify-content: center">
        <v-radio-group v-model="radios">
          <v-radio
              v-for="[lID, l] of Object.entries(langList)"
              :value="lID"
              :key="l"
              @click="changeLang"
          >
            <template v-slot:label>
              <strong>{{ l }}</strong>
            </template>
          </v-radio>
        </v-radio-group>
      </v-container>
      <v-divider/>

      <v-card-actions>
        <v-spacer/>
        <v-btn color="green" :disabled="this.thisDialog" @click="close">
          <i class="fa-solid fa-check"></i>Done
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>

</template>

<script>
import { langList } from "@/i18n.js"

export default {
  name: "languageSetting",
  props: {
    dialog: { type: Boolean, default: false },
    change: { type: Boolean }
  },
  data () {
    return {
      radios: this.$i18n.locale,
      langList: langList,
      set: false,
      thisDialog: this.dialog,
      thisChange: this.change
    }
  },
  methods: {
    changeLang(){
      this.$i18n.locale = this.radios;
      window.localStorage.setItem("language", this.radios)
      this.set = true
      this.thisDialog = false
    },
    close(){
      this.thisChange = false
    }
  }
}
</script>

<style scoped>

</style>