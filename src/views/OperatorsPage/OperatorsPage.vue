<template>
  <div class="OperatorsPage">
    <MyOperators/>
  </div>
</template>

<script>
import MyOperators from "@/components/MyOperators/TheOperators.vue";

export default {
  name: "OperatorsPage",
  components: {
    MyOperators
  }
}
</script>

<style scoped>
div.OperatorsPage {
  padding: 50px;
}
</style>