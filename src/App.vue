<template>
  <v-app>
    <v-main>

        <SideBar class="theme--dark">
          <router-view/>
          <footer>

          </footer>
        </SideBar>

    </v-main>
     <v-container style="padding: 0">
       <v-dialog
           v-model="languageDialog"
           :persistent="disabledButton"
       >
         <v-alert
             color="red"
             type="error"
             v-if="firstTime&&disabledButton"
         >This is your first time visiting this website. Please select your language first.</v-alert>
         <v-alert
             color="green"
             type="success"
             v-else-if="firstTime"
             >{{ $t("Settings.language.setLanguage") }}</v-alert>
         <v-card class="text-center justify-center" style="padding: 1em; ">
           <h1 >
             <i class="fa-solid fa-language" style="font-size: 2em"></i>
             <br>
              {{ $t("Settings.language.title") }}
           </h1>

           <v-divider/>

           <v-container fluid style="display: flex; align-items: center; justify-content: center">

             <v-radio-group v-model="lang">
               <v-radio
                   v-for="[lID, l] of Object.entries(langList)"
                   :value="lID"
                   :key="lID"
                   :label="l.name"
                   @click="changeLang(lID)"
               >

               </v-radio>
             </v-radio-group>
           </v-container>

           <v-card-actions>
             <v-spacer></v-spacer>

             <v-btn
                 color="green"
                 :disabled="disabledButton"
                 @click="languageDialog = false; firstTime=false"
             >
               <v-icon>mdi-check</v-icon>
               Done
             </v-btn>

           </v-card-actions>
         </v-card>
       </v-dialog>
     </v-container>
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar/SideBar.vue'
import { langList } from "@/i18n.js"

export default {
  name: 'App',

  data () {
    return {
      lang: this.$i18n.locale,
      langList: langList,
      languageDialog: window.localStorage.getItem("first")!=="false",
      disabledButton: window.localStorage.getItem("language")===null,
      firstTime: window.localStorage.getItem("language")===null,
    }
  },
  components: {
    SideBar
  },
  computed: {
  },
  methods: {
    changeLang(l){
      this.$i18n.locale = l;
      window.localStorage.setItem("language", l)
      window.localStorage.setItem("first", "false")
      this.disabledButton = false;
    }
  },
  mounted() {
    this.$root.$on("openLang", ()=> {
      this.disabledButton = false;
      this.languageDialog = true;
    })
  },
  created() {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
         this.$vuetify.theme.dark = e.matches
      });
  }
}
</script>

<style>
SideBar {

}
v-main {
  margin: 0 !important;
  padding: 0 !important;
}
.v-tooltip__content {
  height: auto !important;
  padding: 10px !important;
}
div.v-dialog {
  min-width: 50%;
  width: auto;
  max-width: 75%;
}
</style>

