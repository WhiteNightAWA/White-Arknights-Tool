<template>
  <div style="height: 100%; width: 100%;">
    <v-container style="height: 100%; width: 100%; padding: 50px">
      <SettingMenu/>
    </v-container>
  </div>
</template>

<script>
import SettingMenu from "@/components/Setting/SettingMenu";

export default {
  name: "SettingsPage",
  components: {
    SettingMenu
  }
}
</script>

<style scoped>

</style>