<template>
  <div class="full pa-8 fill-height">
    <div class="top">
      <v-expansion-panels popout>
        <v-expansion-panel>
          <v-expansion-panel-header class="text-center" style="flex-direction: column;">
            <h1>Filters</h1>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs fixed-tabs v-model="tabs">
              <v-tabs-slider></v-tabs-slider>
              <v-tab key="stage">
                {{ $t("RFP.stage.name") }}
              </v-tab>
              <v-tab key="video">
                {{ $t("RFP.video.name") }}
              </v-tab>
              <v-tab key="operators">
                {{ $t("RFP.operators.name") }}
              </v-tab>
            </v-tabs>
            <v-divider/>
            <v-tabs-items v-model="tabs">
              <v-tab-item key="stage">
                <stateSelector :info="true" :selectedStage.sync="selectedState"></stateSelector>
              </v-tab-item>
              <v-tab-item key="video">
                video
              </v-tab-item>
              <v-tab-item key="operators">
                operators
              </v-tab-item>
            </v-tabs-items>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-spacer/>
    <div style="display: flex; flex-direction: row;" class="align-center">
      <v-divider/>
      <h2>Results</h2>
      <v-divider/>
    </div>
    <div class="results">
      <v-data-table
          :headers="headers"
          :items="videos"
      >

      </v-data-table>
    </div>

    <v-dialog v-model="addVideoDialog">
      <addVideo></addVideo>
    </v-dialog>
    <v-btn
        elevation="2"
        fab
        style="position: fixed; bottom: 1em; right: 1em"
        @click="addVideoDialog=true"
        color="success"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import stateSelector from "@/components/RaidersFinder/stateSelector";
import addVideo from "@/pages/addVideo.vue";


export default {
  name: "RaidersFinder",
  data() {
    return {
      tabs: null,
      selectedState: null,
      addVideoDialog: false,
      headers: [
        {text: "ID", value: "id"},
        {text: "Title", value: "title"}
      ]

    }
  },
  components: {
    stateSelector,
    addVideo
  },
  computed: {
    videos: function () {
      let vs = []
      let datas = [

      ]
      datas.forEach(v => {
        if (v.id === 1){
          vs.push(v)
        }
      })

      return vs
    },
  }
}
</script>

<style>

</style>