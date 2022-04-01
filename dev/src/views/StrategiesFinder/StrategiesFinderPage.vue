<template>
  <div>
    <v-alert
        type="error"
        class="ma-5"
        dismissible
    >
      {{ $t("developing") }}
      <v-btn small color="primary" href="https://github.com/WhiteNightAWA/White-Arknights-Tool/issues/new/choose" target="_blank" style="padding: 0 8px;"><i class="fa-regular fa-circle-dot"></i> GitHub Issues <i
          class="fa-solid fa-arrow-up-right-from-square"></i></v-btn>
    </v-alert>
    <v-alert
      type="warning"
      class="ma-5"
      dismissible
    >
      {{ $t("RFP.needHelp") }}
      <a @click='copy(`White_Night_awa#1729`); snackbar1=true'><v-icon>mdi-content-copy</v-icon></a>
    </v-alert>
    <StrategiesFinder/>
    <v-snackbar
        v-model="snackbar1"
        timeout="2000"
        color="success"
    >
      {{ $t("Copied") }}: <code>White_Night_awa#1729</code>
    </v-snackbar>
  </div>
</template>

<script>
import StrategiesFinder from "@/components/StrategiesFinder/StrategiesFinder";

export default {
  name: "StrategiesFinderPage",
  components: {
    StrategiesFinder
  },
  data() {
    return {
      snackbar1: false
    }
  },
  methods: {

    copy(text){
      navigator.clipboard.writeText(text);
    }
  }
}
</script>

<style scoped>

</style>