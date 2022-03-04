<template>
  <div class="container">
    <img v-if="this.$vuetify.theme.dark" src="@/assets/logo_dark.png" alt="logo" class="center logo">
    <img v-else src="@/assets/logo_light.png" alt="logo" class="logo">
    <h1> {{ $t("HomePage.title") }} <small><sub>V0.1ß</sub></small></h1>
    <a href="https://github.com/WhiteNightAWA/White-Arknights-Tool" target="_blank">
      <v-btn><i class="fa-brands fa-github" style="font-size: 30px"></i>Github<i
          class="fa-solid fa-arrow-up-right-from-square"></i></v-btn>
    </a>
    <br>
    <v-divider class="v-divider"></v-divider>
    <div class="cards">

      <v-card
          elevation="9"
          class="card0"
      >
        <i class="fa-solid fa-circle-question" style="font-size: 50px"></i>
        <h1>{{ $t("HomePage.needHelp") }}</h1>
        <v-divider class="v-divider"></v-divider>
        <v-row>
          <v-col>
            <router-link to="/RaidersFinder">
              <v-card elevation="9" @mouseover="blur=true" @mouseleave="blur=false" :class="{ blur: blur }">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 30px;"></i>
                <h3>{{ $t("HomePage.beatLevels") }}</h3>
                <v-divider class="v-divider"></v-divider>
                <br>
                <p>
                  {{ $t("HomePage.try") }}
                  <strong>{{ $t("RF") }}</strong> !
                  <br>
                  {{ $t("HomePage.howToSolve") }}
                </p>
              </v-card>
            </router-link>
          </v-col>

          <v-col>
            <router-link to="" style="cursor: no-drop">
              <v-card elevation="9" @mouseover="blur=true" @mouseleave="blur=false" :class="{ blur: blur }">
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
                <h3>{{ $t("HomePage.developing") }}</h3>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
      </v-card>

    </div>
    <br>
    <v-divider></v-divider>
    <div class="cards2">
      <v-row>
        <v-col>
          <v-card class="cards2-1 theme">
            <h2><i class="fa-solid fa-handshake-angle"></i>
              {{ $t("HomePage.help") }}<del>{{ $t("HomePage.us") }}</del>{{ $t("HomePage.me") }}!
            </h2>
            <p>
              {{ $t("HomePage.plzCr") }}
              <a
                  href="https://github.com/WhiteNightAWA/White-Arknights-Tool/pulls" target="_blank">
                <v-btn color="primary" style="padding: 0 8px;"><i class="fa-solid fa-code-pull-request"></i> Pull Requests <i
                    class="fa-solid fa-arrow-up-right-from-square"></i></v-btn>
              </a>

              {{ $t("HomePage.contDC") }}
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span
                      v-bind="attrs"
                      v-on="on"
                  >
                    <a @click="snackbar1 = true; copy('White_Night_awa#1729')">
                <i class="fa-solid fa-copy"></i>
              </a>

                  </span>
                </template>
                <span>{{ $t("HomePage.copyID") }}</span>
              </v-tooltip>


              .
              <br>
              <small><sup>*{{ $t("HomePage.tip") }}</sup></small>
            </p>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="green">
            <h1><i class="fa-solid fa-scale-balanced"></i><br>{{ $t("HomePage.l") }}</h1>
            <p>{{ $t("HomePage.using") }}<code>CC BY-NC-SA 4.0</code>.</p>
            <div class="text-center;" style="height: auto; padding: 0;">
              <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                  <v-btn color="primary">
                    {{ $t("HomePage.show") }}
                    <i class="fa-solid fa-up-right-from-square"></i>
                  </v-btn>
              </a>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card class="light-pink">
            <h1><i class="fa-solid fa-heart red--text"></i>{{ $t("HomePage.ST") }}</h1>
            <small>{{ $t("HomePage.thanks") }}</small>
            <v-divider light/>
            <div class="chips">

              <v-tooltip bottom
                         v-for="p in sts"
                         :key="p">
                <template v-slot:activator="{ on, attrs }">
                  <a :href="p.url" target="_blank" style="cursor: pointer !important;">
                    <v-chip
                        pill
                        v-on="on"
                        v-bind="attrs"
                        style="cursor: pointer !important;"
                    >
                      <v-avatar left>
                        <v-img :src="p.icon"></v-img>
                      </v-avatar>
                      {{ p.name }}
                    </v-chip>
                  </a>

                </template>
                <span>{{ p.msg }}</span>
              </v-tooltip>


            </div>
          </v-card>

        </v-col>
        <v-col>
          <v-card class="warning_background">
            <h1>
              <i class="fa-solid fa-triangle-exclamation"></i>
              <br>{{ $t("HomePage.Issues") }}</h1>
            <br>
            <p>
              {{ $t("HomePage.ifFind") }}
              <strong style="text-shadow: 0 0 10px red; color: red">
                {{ $t("HomePage.Errors") }}
              </strong>
              {{ $t("HomePage.or") }}
              <strong style="text-shadow: 0 0 10px red; color: red">
                {{ $t("HomePage.Bugs") }}
              </strong>,
              {{ $t("HomePage.report") }}
              <a
                  href="https://github.com/WhiteNightAWA/White-Arknights-Tool/issues" target="_blank">
                <v-btn color="primary"  style="padding: 0 8px;"><i class="fa-regular fa-circle-dot"></i> GitHub Issues <i
                    class="fa-solid fa-arrow-up-right-from-square"></i></v-btn>
              </a>
              {{ $t("HomePage.fix") }}
            </p>
          </v-card>
        </v-col>
      </v-row>


    </div>

    <v-btn v-on:click="test"></v-btn>
    <v-snackbar
        v-model="snackbar1"
        timeout="2000"
        color="green"
    >
      {{ $t("Copied") }}: <code>White_Night_awa#1729</code>
    </v-snackbar>
  </div>
</template>

<script>

export default {
  name: "HomePage",
  methods: {
    test: function () {
      console.log(this.$vuetify.theme.dark)
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    copy(text){
      navigator.clipboard.writeText(text);
    }
  },
  data() {
    return {
      blur: false,
      sts: [
        {
          name: this.$t("HomePage.thanksList.PS.name"),
          icon: "https://penguin-stats.s3.amazonaws.com/logos/penguin_stats_logo.png",
          msg: this.$t("HomePage.thanksList.PS.msg"),
          url: "https://penguin-stats.io/"
        },
        {
          name: this.$t("HomePage.thanksList.AT.name"),
          icon: "https://cdn.jsdelivr.net/gh/arkntools/arknights-toolbox@gh-pages/favicon.ico",
          msg: this.$t("HomePage.thanksList.AT.msg"),
          url: "https://arkn.lolicon.app/"
        },
        {
          name: this.$t("HomePage.thanksList.PRTS.name"),
          icon: "https://prts.wiki/ioslogo.png",
          msg: this.$t("HomePage.thanksList.PRTS.msg"),
          url: "http://prts.wiki/"
        },
        {
          name: this.$t("HomePage.thanksList.VC.name"),
          icon: "https://cli.vuejs.org/favicon.png",
          msg: this.$t("HomePage.thanksList.VC.msg"),
          url: "https://cli.vuejs.org/"
        },
        {
          name: this.$t("HomePage.thanksList.Vuetify.name"),
          icon: "https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-dark.svg",
          msg: this.$t("HomePage.thanksList.Vuetify.msg"),
          url: "https://vuetifyjs.com/"
        }
      ],
      snackbar1: false,
      dialog1: false
    }
  },
  components: {
  }
}
</script>

<style scoped>
div {
  padding: 20px;
  height: 100%;
}

.logo {
  width: 400px;
}

div.container {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.v-divider {
  width: 100% !important;
}

div.cards {
  width: 100%;
}

div.card0 {
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  /*box-shadow: 0 0 5px white !important;*/
  transition: box-shadow 0.5s;

}

div.card0:hover {
  /*box-shadow: 0 2px 10px white !important;*/
}

div.card0 div.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-around;

}

div.card0 div.container div.v-card {

}

div.col a div {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  transition: filter 0.5s;
}

div.col div strong {
  color: yellow;
  text-shadow: 0 0 10px yellow;
}

div.col > a > div.v-card {
  transition: all 0.5s;
}

div.col > a > div.v-card:hover {
  transform: scale(1.2);
  filter: blur(0px);
  opacity: 1;
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.125);
}

.blur {
  filter: blur(3px);
  opacity: .5;
  transform: scale(.98);
  box-shadow: none;
}

div.v-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
}

div.v-card a {
  text-decoration: none;
}

div.cards2-1.theme--dark {
  background: repeating-linear-gradient(-45deg, rgba(61, 61, 61, .98), rgba(61, 61, 61, .98) 45px, rgba(46, 46, 46, .9) 0, rgba(46, 46, 46, .9) 90px) !important
}

div.cards2-1.theme--light {
  background: repeating-linear-gradient(-45deg, hsla(0, 0%, 94.1%, .98), hsla(0, 0%, 94.1%, .98) 45px, hsla(0, 0%, 100%, .9) 0, hsla(0, 0%, 100%, .9) 90px) !important;
}

div.cards2 {
  display: flex;
  flex-direction: column;
}

div.cards2 div.v-card {
}

div.cards div.row {
  flex-wrap: nowrap;
}

.light-pink {
  background-color: pink;
  color: black;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.chips > a {
  margin: 5px;
}
div.warning_background {
  background: repeating-linear-gradient(-45deg, rgba(255, 165, 0, 0.5), rgba(255, 165, 0, 0.6) 45px, rgba(46, 46, 46, 0) 0, rgba(46, 46, 46, 0) 90px) !important

}
</style>