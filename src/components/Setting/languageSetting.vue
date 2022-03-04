<template>
<div>
  {{ inputData }}
  <v-container fluid>
    <p>{{ inputData || 'null' }}</p>
    <v-radio-group
        v-model="inputData"
        mandatory
        @change=""
    >
      <v-radio
          label="Radio 1"
          value="radio-1"
      ></v-radio>
      <v-radio
          label="Radio 2"
          value="radio-2"
      ></v-radio>
    </v-radio-group>
  </v-container>
</div>
</template>

<script>
// import { langList } from "@/i18n.js"


export default {
  name: "languageSetting",
  props: ["inputDataProp"],
  data() {
    return {
      inputData: this.inputDataProp
    }
  },
  methods: {
    updateData(){
      this.inputData = "zh"
      this.$i18n.locale = "zh"
    }
  }
}
</script>

<style scoped>

</style>