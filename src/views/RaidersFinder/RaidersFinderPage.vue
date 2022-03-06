<template>
<div>
  <v-alert
    type="error"
  >
    {{ $t("developing") }}
  </v-alert>
  <v-card disabled style="height: 100%;">
    <RaidersFinder/>

  </v-card>
</div>
</template>

<script>
import RaidersFinder from "@/components/RaidersFinder/RaidersFinder";

export default {
  name: "RaidersFinderPage",
  components: {
    RaidersFinder
  }
}
</script>

<style scoped>

</style>