<template>
  <v-list class="codeBox">
    <slot/>
  </v-list>
</template>

<script>
export default {
  name: "codeBox"
}
</script>

<style >
div.codeBox {
  font-size: 85%;
  border-radius: 10px !important;
  font-family: monospace, monospace;
  text-decoration: none;
  text-align: left;
}
div.codeBox.theme--dark {
  background-color: rgba(255, 255, 255, 0.1);
}
div.codeBox.theme--light {
  background-color: rgba(0,0,0,0.05);
}
</style>