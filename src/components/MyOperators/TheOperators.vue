<template>
  <div>
    <v-expansion-panels multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2>{{ $t("MOP.my") }}</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-divider/>
          <myOperators></myOperators>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2>{{ $t("MOP.all") }}</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-divider/>
          <allOperators></allOperators>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar
        v-model="done"
        :timeout="2000"
        color="success"
        style="width: auto;"
        top
    >

      <h2 class="text-center">
        <v-icon>mdi-check</v-icon>
        Added Successfully
      </h2>
    </v-snackbar>
  </div>
</template>

<script>
import myOperators from "@/components/MyOperators/myOperators.vue";
import allOperators from "@/components/MyOperators/allOperators";


export default {
  name: "TheOperators",
  components: {
    myOperators,
    allOperators
  },
  data () {
    return {
      done: false
    }
  },
  mounted() {
    this.$root.$on('snackbarOn', () => {
      this.done = true
    })
  },
}
</script>

<style>

</style>