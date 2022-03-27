<template>
  <v-tooltip
      top
  >
    <template v-slot:activator="{ on, attrs }">
      <span
          v-bind="attrs"
          v-on="on"
          style="width: fit-content; height: fit-content;"
      >
        <a
            style="width: fit-content; height: fit-content;"
        >

          <v-img
              :src="`https://cdn.jsdelivr.net/gh/arkntools/arknights-toolbox@gh-pages/assets/img/avatar/${c.id.replaceAll('char_', '')}.png`"
              alt="avatar"
              style="width: 80px; height: 80px;"
          >
            <slot/>
          </v-img>
        </a>
      </span>
    </template>
    <v-card  style="display:flex; background-color: rgba(0,0,0,0); backdrop-filter: blur(10px); flex-direction: column;" class="align-center justify-center" elevation="0">
      <div style="display: flex;">
        <v-card>
          <v-progress-circular
              v-if="c.level !== '??'"
              :rotate="-90"
              :size="100"
              :value="c.level / character['phases'][c.elite]['maxLevel'] *100"
              color="amber"
          >
            <img :src="require(`@/assets/elite${c.elite}.png`)" alt="potentialLevel" style="position: absolute; z-index: 1; width: 6em; opacity: 0.5;">
            <h1 style="font-size: 3em; z-index: 2; text-shadow: black 0 0 3px;">
              {{ c.level }}
            </h1>
            <h5 style="position: absolute; bottom: 1.1em; z-index: 2; text-shadow: black 0 0 2px;">LV</h5>
          </v-progress-circular>
          <v-progress-circular
              :rotate="-90"
              :size="100"
              :value="0"
              color="amber"
              v-else
          >
            <h1 style="font-size: 3em; z-index: 2; text-shadow: black 0 0 3px;">
              ?
            </h1>
            <h5 style="position: absolute; bottom: 1.1em; z-index: 2; text-shadow: black 0 0 2px;">LV</h5>
          </v-progress-circular>
        </v-card>
        <v-card>
          <v-progress-circular
              v-if="c.trust !== '???'"
              :rotate="-90"
              :size="100"
              :value="c.trust / 2"
              color="deep-orange"
          >
            <v-icon style="position: absolute; z-index: 1; font-size: 4em; opacity: 0.5;">mdi-handshake-outline</v-icon>
            <h1 style="font-size: 3em; z-index: 2; text-shadow: black 0 0 3px;">
              {{ c.trust }}
            </h1>
            <h5 style="position: absolute; bottom: 1.1em; z-index: 2; text-shadow: black 0 0 2px;">TRUST</h5>
          </v-progress-circular>
          <v-progress-circular
              :rotate="-90"
              :size="100"
              :value="0"
              color="deep-orange"
              v-else
          >
            <v-icon style="position: absolute; z-index: 1; font-size: 4em; opacity: 0.5;">mdi-handshake-outline</v-icon>
            <h1 style="font-size: 3em; z-index: 2; text-shadow: black 0 0 3px;">
              ?
            </h1>
            <h5 style="position: absolute; bottom: 1.1em; z-index: 2; text-shadow: black 0 0 2px;">TRUST</h5>
          </v-progress-circular>
        </v-card>
      </div>
      <div style="display: flex; ">
        <img v-if="c.potential !== '?'" :src="require(`@/assets/poten${c.potential}.png`)" alt="potentialLevel" style="width: 5em">
        <v-card style="width: 5em; height: 5em;display: flex;" class="justify-center align-center" v-else>
          <h1>?</h1>
        </v-card>
        <img v-if="c.skillId !== 0 && c.skillId !== '?'" style="width: 5em; border-radius: 0.25em" :src="`https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/skills/skill_icon_${character['skills'][c.skillId-1]['skillId']}.png`" alt="skillIcon">
        <v-card style="width: 5em; height: 5em;display: flex;" class="justify-center align-center" v-else-if="c.skillId === '?'">
          <h1>?</h1>
        </v-card>
        <img v-if="c.skillLevel !== 0 && c.skillId !== '?'" :src="require(`@/assets/skillLevel${c.skillLevel === 0 ? 10 : c.skillLevel}.png`)" alt="potentialLevel" style="width: 5em; height: 5em">
        <v-card style="width: 5em; height: 5em;display: flex;" class="justify-center align-center" v-else-if="c.skillId === '?'">
          <h1>?</h1>
        </v-card>

      </div>
    </v-card>
  </v-tooltip>
</template>

<script>
export default {
  name: "operatorsImg",
  props: {
    c: Object,
  },
  computed: {
    character: function () {
      return Object(this.$store.state.character_table[this.c.id])
    },
  }
}
</script>

<style scoped>

</style>