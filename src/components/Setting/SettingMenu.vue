<template>
    <v-card style="height: 100%; width: 100%; text-align: center;" elevation="10">
      <h1><v-icon style="font-size: 1em">mdi-cog</v-icon>{{ $t("Settings.title") }}</h1>
      <v-divider/>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-center">
              <h2>{{ $t("Settings.title") }}</h2>
            </th>
            <th class="text-center">
              <h2>{{ $t("Settings.current") }}</h2>
            </th>
            <th class="text-center">
              <h2>{{ $t("Settings.change") }}</h2>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ $t("Settings.language.name") }}</td>
            <td>
              {{ $t("name") }} ({{ getNowLang }})
            </td>
            <td>
              <v-btn @click="openLangMenu" color="primary">
                Change
              </v-btn>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
</template>

<script>


export default {
  name: "SettingMenu",
  data() {
    return {
      test: this.$i18n.locale
    }
  },
  components: {

  },
  methods: {
    openLangMenu (){
      this.$root.$emit("openLang")
    }
  },
  computed: {
    getNowLang () {
      return this.$i18n.locale
    }
  },
  props: {
    show: { type: Boolean, default: false },
    defaultShow: { type: Boolean, default: false },
    reloadLang: { type: Boolean, default: false }
  }
}
</script>

<style scoped>

</style>