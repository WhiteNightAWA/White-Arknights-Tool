<template>
  <v-container>
    {{ myOperators }}
  </v-container>
</template>

<script>
export default {
  name: "myOperators",
  computed: {
    myOperators: function () {
      return this.$store.state.myOperators
    }
  }
}
</script>

<style scoped>

</style>