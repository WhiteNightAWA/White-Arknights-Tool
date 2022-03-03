<template>
  <div class="container">
    <img v-if="this.$vuetify.theme.dark" src="@/assets/logo_dark.png" alt="logo" class="center logo">
    <img v-else src="@/assets/logo_light.png" alt="logo" class="logo">
    <h1>White Arknights Tool <small><sub>V0.1ß</sub></small></h1>
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
        <h1>Need Help In Arknights?</h1>
        <v-divider class="v-divider"></v-divider>
        <v-row>
          <v-col>
            <router-link to="/RaidersFinder">
              <v-card elevation="9" @mouseover="blur=true" @mouseleave="blur=false" :class="{ blur: blur }">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 30px;"></i>
                <h3>Feeling hard to beat the levels?</h3>
                <v-divider class="v-divider"></v-divider>
                <br>
                <p>
                  Try
                  <strong>Raiders Finder</strong>!
                  <br>
                  Check who are also using your operators to olve the levels.
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
                <h3>More Function is developing...</h3>
                <!--                <v-divider class="v-divider"></v-divider>-->

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
            <h2>Help
              <del>Us</del>
              ME!
            </h2>
            <p>It's just me developing this page! So if you want to help me or you know anything can let these tools
              better,
              please create an
              <a
                  href="https://github.com/WhiteNightAWA/White-Arknights-Tool/pulls" target="_blank">
                <v-btn color="primary" style="padding: 0 8px;"><i class="fa-solid fa-code-pull-request"></i> pull requests <i
                    class="fa-solid fa-arrow-up-right-from-square"></i></v-btn>
              </a>

              or contact me on Discord
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span
                      v-bind="attrs"
                      v-on="on"
                  >
                    <a @click="snackbar1 = true; navigator.clipboard.writeText('White_Night_awa#1729');">
                <i class="fa-solid fa-copy"></i>
              </a>

                  </span>
                </template>
                <span>Copy ID</span>
              </v-tooltip>


              .
              <br>
              <small><sup>*there will be no money reward, but I will add you in the special thanks list</sup></small>
            </p>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="green">
            <h1>LICENSE</h1>
            <p>This Project is using <code>MIT license</code>.</p>
            <div class="text-center;" style="height: auto">
              <v-dialog
                  v-model="dialog1"
                  max-width="75%"
                  scrollable
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                  >
                    Show me
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title style="">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/440px-MIT_logo.svg.png"
                        alt="mit icon">
                  </v-card-title>

                  <v-divider></v-divider>
                  <br>
                  <v-card-text style="max-height: 50%">
                    <codeBox>
                      MIT License
                      <br>
                      Copyright (c) 2022 WhiteNightAWA
                      <br>
                      Permission is hereby granted, free of charge, to any person obtaining a copy
                      of this software and associated documentation files (the "Software"), to deal
                      in the Software without restriction, including without limitation the rights
                      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                      copies of the Software, and to permit persons to whom the Software is
                      furnished to do so, subject to the following conditions:
                      <br>
                      The above copyright notice and this permission notice shall be included in all
                      copies or substantial portions of the Software.
                      <br>
                      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                      SOFTWARE.
                    </codeBox>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="primary">
                      <a href="https://en.wikipedia.org/wiki/MIT_License" target="_blank" class="white--text">
                        <i class="fa-brands fa-wikipedia-w"></i>
                        Learn More in Wiki
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>

                      </a>

                    </v-btn>

                    <v-btn color="green white--text" @click="dialog1 = false">
                      <i class="fa-solid fa-check"></i>
                      Okay
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card class="light-pink">
            <h1><i class="fa-solid fa-heart red--text"></i>Special Thanks</h1>
            <small>Thank you very much!</small>
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
            <h1>Issues</h1>
            <br>
            <p>
              If you found that there are
              <strong style="text-shadow: 0 0 10px red; color: red">Errors</strong>
              or
              <strong style="text-shadow: 0 0 10px red; color: red">Bugs</strong>, please report it on
              <a
                  href="https://github.com/WhiteNightAWA/White-Arknights-Tool/issues" target="_blank">
                <v-btn color="primary"  style="padding: 0 8px;"><i class="fa-regular fa-circle-dot"></i> GitHub Issues <i
                    class="fa-solid fa-arrow-up-right-from-square"></i></v-btn>
              </a>
              . I will fix it as quickly as I can. Thanks!
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
      Copied: <code>White_Night_awa#1729</code>
    </v-snackbar>
  </div>
</template>

<script>
import codeBox from "@/components/Others/codeBox";

export default {
  name: "HomePage",
  methods: {
    test: function () {
      console.log(this.$vuetify.theme.dark)
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  },
  data() {
    return {
      blur: false,
      sts: [
        {
          name: "Penguin Stats",
          icon: "https://penguin-stats.s3.amazonaws.com/logos/penguin_stats_logo.png",
          msg: "Thanks for your website give me inspiration to design te UI.",
          url: "https://penguin-stats.io/"
        },
        {
          name: "Arknights Toolbox",
          icon: "https://cdn.jsdelivr.net/gh/arkntools/arknights-toolbox@gh-pages/favicon.ico",
          url: "https://arkn.lolicon.app/",
          msg: "Thanks for your website give me inspiration to design te UI."
        },
        {
          name: "PRTS",
          icon: "https://prts.wiki/ioslogo.png",
          msg: "Thanks for the information of the Operators.",
          url: "http://prts.wiki/"
        },
        {
          name: "Vue Cli",
          icon: "https://cli.vuejs.org/favicon.png",
          msg: "Thanks for the tools for building this website.",
          url: "https://cli.vuejs.org/"
        },
        {
          name: "Vuetify",
          icon: "https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-dark.svg",
          msg: "Thanks for the tools for building this website.",
          url: "https://vuetifyjs.com/"
        }
      ],
      snackbar1: false,
      dialog1: false
    }
  },
  components: {
    codeBox,
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