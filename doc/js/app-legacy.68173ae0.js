(function(){"use strict";var t={2962:function(t,e,i){i(6992),i(8674),i(9601),i(7727);var a=i(144),s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",[i("v-main",[i("SideBar",{staticClass:"theme--dark"},[i("router-view"),i("footer")],1)],1)],1)},r=[],n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{display:"flex",height:"100%"}},[i("v-card",{staticClass:"sidebar",staticStyle:{height:"100%",position:"fixed","z-index":"99",top:"0"}},[i("v-navigation-drawer",{staticClass:"sidebar",attrs:{permanent:"","expand-on-hover":"","mini-variant":t.mini},on:{"update:miniVariant":function(e){t.mini=e},"update:mini-variant":function(e){t.mini=e}},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[i("v-list",[i("v-list-item",[i("v-list-item-content",[t.mini?i("div",[i("h1",{staticClass:"headingText"},[t._v("W")]),i("h1",{staticClass:"headingText"},[t._v("A")]),i("h1",{staticClass:"headingText"},[t._v("T")])]):i("div",[i("h1",{staticClass:"headingText"},[t._v("White")]),i("h1",{staticClass:"headingText"},[t._v("Arknights")]),i("h1",{staticClass:"headingText"},[t._v("Tool")])])])],1)],1),i("v-divider"),i("v-list",{attrs:{nav:"",dense:""}},t._l(t.items,(function(e){return i("div",{key:e.name,staticClass:"item",class:{selected:t.isActive(e.path)}},[i("router-link",{attrs:{to:e.path}},[i("v-list-item",{attrs:{link:""}},[i("v-list-item-icon",[i("v-icon",[t._v(t._s(e.icon))])],1),i("v-list-item-title",[t._v(t._s(e.name))])],1)],1)],1)})),0)],1)],1),i("v-card",{staticClass:"display",class:{opened:!t.mini}},[t._t("default")],2)],1)},o=[],l={components:{},data:function(){return{drawer:null,mini:!0,items:this.$router.options.routes}},methods:{isActive:function(t){return this.$router.currentRoute.path===t}}},c=l,u=i(1001),v=i(3453),d=i.n(v),h=i(26),p=i(1418),f=i(6428),g=i(6816),m=i(7620),_=i(751),b=i(459),T=i(1360),k=(0,u.Z)(c,n,o,!1,null,null,null),y=k.exports;d()(k,{VCard:h.Z,VDivider:p.Z,VIcon:f.Z,VList:g.Z,VListItem:m.Z,VListItemContent:_.km,VListItemIcon:b.Z,VListItemTitle:_.V9,VNavigationDrawer:T.Z});var C={name:"App",data:function(){return{}},components:{SideBar:y}},w=C,S=i(7524),I=i(7877),x=(0,u.Z)(w,s,r,!1,null,null,null),A=x.exports;d()(x,{VApp:S.Z,VMain:I.Z});var O=i(8345),E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[this.$vuetify.theme.dark?a("img",{staticClass:"center logo",attrs:{src:i(3269),alt:"logo"}}):a("img",{staticClass:"logo",attrs:{src:i(2851),alt:"logo"}}),t._m(0),a("a",{attrs:{href:"https://github.com/WhiteNightAWA/White-Arknights-Tool",target:"_blank"}},[a("v-btn",[a("i",{staticClass:"fa-brands fa-github",staticStyle:{"font-size":"30px"}}),t._v("Github"),a("i",{staticClass:"fa-solid fa-arrow-up-right-from-square"})])],1),a("br"),a("v-divider",{staticClass:"v-divider"}),a("div",{staticClass:"cards"},[a("v-card",{staticClass:"card0",attrs:{elevation:"9"}},[a("i",{staticClass:"fa-solid fa-circle-question",staticStyle:{"font-size":"50px"}}),a("h1",[t._v("Need Help In Arknights?")]),a("v-divider",{staticClass:"v-divider"}),a("v-row",[a("v-col",[a("router-link",{attrs:{to:"/RaidersFinder"}},[a("v-card",{class:{blur:t.blur},attrs:{elevation:"9"},on:{mouseover:function(e){t.blur=!0},mouseleave:function(e){t.blur=!1}}},[a("i",{staticClass:"fa-solid fa-magnifying-glass",staticStyle:{"font-size":"30px"}}),a("h3",[t._v("Feeling hard to beat the levels?")]),a("v-divider",{staticClass:"v-divider"}),a("br"),a("p",[t._v(" Try "),a("strong",[t._v("Raiders Finder")]),t._v("! "),a("br"),t._v(" Check who are also using your operators to olve the levels. ")])],1)],1)],1),a("v-col",[a("router-link",{staticStyle:{cursor:"no-drop"},attrs:{to:""}},[a("v-card",{class:{blur:t.blur},attrs:{elevation:"9"},on:{mouseover:function(e){t.blur=!0},mouseleave:function(e){t.blur=!1}}},[a("v-progress-circular",{attrs:{size:70,width:7,color:"primary",indeterminate:""}}),a("h3",[t._v("More Function is developing...")])],1)],1)],1)],1)],1)],1),a("br"),a("v-divider"),a("div",{staticClass:"cards2"},[a("v-row",[a("v-col",[a("v-card",{staticClass:"cards2-1 theme"},[a("h2",[t._v("Help "),a("del",[t._v("Us")]),t._v(" ME! ")]),a("p",[t._v("It's just me developing this page! So if you want to help me or you know anything can let these tools better, please create an "),a("a",{attrs:{href:"https://github.com/WhiteNightAWA/White-Arknights-Tool/pulls",target:"_blank"}},[a("v-btn",{staticStyle:{padding:"0 8px"},attrs:{color:"primary"}},[a("i",{staticClass:"fa-solid fa-code-pull-request"}),t._v(" pull requests "),a("i",{staticClass:"fa-solid fa-arrow-up-right-from-square"})])],1),t._v(" or contact me on Discord "),a("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on,s=e.attrs;return[a("span",t._g(t._b({},"span",s,!1),i),[a("a",{on:{click:function(e){t.snackbar1=!0,t.navigator.clipboard.writeText("White_Night_awa#1729")}}},[a("i",{staticClass:"fa-solid fa-copy"})])])]}}])},[a("span",[t._v("Copy ID")])]),t._v(" . "),a("br"),a("small",[a("sup",[t._v("*there will be no money reward, but I will add you in the special thanks list")])])],1)])],1),a("v-col",[a("v-card",{staticClass:"green"},[a("h1",[t._v("LICENSE")]),a("p",[t._v("This Project is using "),a("code",[t._v("MIT license")]),t._v(".")]),a("div",{staticClass:"text-center;",staticStyle:{height:"auto"}},[a("v-dialog",{attrs:{"max-width":"75%",scrollable:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on,s=e.attrs;return[a("v-btn",t._g(t._b({attrs:{color:"primary",dark:""}},"v-btn",s,!1),i),[t._v(" Show me ")])]}}]),model:{value:t.dialog1,callback:function(e){t.dialog1=e},expression:"dialog1"}},[a("v-card",[a("v-card-title",{},[a("img",{attrs:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/440px-MIT_logo.svg.png",alt:"mit icon"}})]),a("v-divider"),a("br"),a("v-card-text",{staticStyle:{"max-height":"50%"}},[a("codeBox",[t._v(" MIT License "),a("br"),t._v(" Copyright (c) 2022 WhiteNightAWA "),a("br"),t._v(' Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: '),a("br"),t._v(" The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. "),a("br"),t._v(' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. ')])],1),a("v-divider"),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary"}},[a("a",{staticClass:"white--text",attrs:{href:"https://en.wikipedia.org/wiki/MIT_License",target:"_blank"}},[a("i",{staticClass:"fa-brands fa-wikipedia-w"}),t._v(" Learn More in Wiki "),a("i",{staticClass:"fa-solid fa-arrow-up-right-from-square"})])]),a("v-btn",{attrs:{color:"green white--text"},on:{click:function(e){t.dialog1=!1}}},[a("i",{staticClass:"fa-solid fa-check"}),t._v(" Okay ")])],1)],1)],1)],1)])],1)],1),a("v-row",[a("v-col",[a("v-card",{staticClass:"light-pink"},[a("h1",[a("i",{staticClass:"fa-solid fa-heart red--text"}),t._v("Special Thanks")]),a("small",[t._v("Thank you very much!")]),a("v-divider",{attrs:{light:""}}),a("div",{staticClass:"chips"},t._l(t.sts,(function(e){return a("v-tooltip",{key:e,attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(i){var s=i.on,r=i.attrs;return[a("a",{staticStyle:{cursor:"pointer !important"},attrs:{href:e.url,target:"_blank"}},[a("v-chip",t._g(t._b({staticStyle:{cursor:"pointer !important"},attrs:{pill:""}},"v-chip",r,!1),s),[a("v-avatar",{attrs:{left:""}},[a("v-img",{attrs:{src:e.icon}})],1),t._v(" "+t._s(e.name)+" ")],1)],1)]}}],null,!0)},[a("span",[t._v(t._s(e.msg))])])})),1)],1)],1),a("v-col",[a("v-card",{staticClass:"warning_background"},[a("h1",[t._v("Issues")]),a("br"),a("p",[t._v(" If you found that there are "),a("strong",{staticStyle:{"text-shadow":"0 0 10px red",color:"red"}},[t._v("Errors")]),t._v(" or "),a("strong",{staticStyle:{"text-shadow":"0 0 10px red",color:"red"}},[t._v("Bugs")]),t._v(", please report it on "),a("a",{attrs:{href:"https://github.com/WhiteNightAWA/White-Arknights-Tool/issues",target:"_blank"}},[a("v-btn",{staticStyle:{padding:"0 8px"},attrs:{color:"primary"}},[a("i",{staticClass:"fa-regular fa-circle-dot"}),t._v(" GitHub Issues "),a("i",{staticClass:"fa-solid fa-arrow-up-right-from-square"})])],1),t._v(" . I will fix it as quickly as I can. Thanks! ")])])],1)],1)],1),a("v-btn",{on:{click:t.test}}),a("v-snackbar",{attrs:{timeout:"2000",color:"green"},model:{value:t.snackbar1,callback:function(e){t.snackbar1=e},expression:"snackbar1"}},[t._v(" Copied: "),a("code",[t._v("White_Night_awa#1729")])])],1)},R=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h1",[t._v("White Arknights Tool "),i("small",[i("sub",[t._v("V0.1ß")])])])}],N=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-list",{staticClass:"codeBox"},[t._t("default")],2)},Z=[],V={name:"codeBox"},W=V,H=(0,u.Z)(W,N,Z,!1,null,null,null),L=H.exports;d()(H,{VList:g.Z});var M={name:"HomePage",methods:{test:function(){console.log(this.$vuetify.theme.dark),this.$vuetify.theme.dark=!this.$vuetify.theme.dark}},data:function(){return{blur:!1,sts:[{name:"Penguin Stats",icon:"https://penguin-stats.s3.amazonaws.com/logos/penguin_stats_logo.png",msg:"Thanks for your website give me inspiration to design te UI.",url:"https://penguin-stats.io/"},{name:"Arknights Toolbox",icon:"https://cdn.jsdelivr.net/gh/arkntools/arknights-toolbox@gh-pages/favicon.ico",url:"https://arkn.lolicon.app/",msg:"Thanks for your website give me inspiration to design te UI."},{name:"PRTS",icon:"https://prts.wiki/ioslogo.png",msg:"Thanks for the information of the Operators.",url:"http://prts.wiki/"},{name:"Vue Cli",icon:"https://cli.vuejs.org/favicon.png",msg:"Thanks for the tools for building this website.",url:"https://cli.vuejs.org/"},{name:"Vuetify",icon:"https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-dark.svg",msg:"Thanks for the tools for building this website.",url:"https://vuetifyjs.com/"}],snackbar1:!1,dialog1:!1}},components:{codeBox:L}},F=M,P=i(6370),j=i(3150),D=i(7118),$=i(5424),B=i(2102),U=i(914),q=i(7047),G=i(624),z=i(2877),Y=i(3202),K=i(3631),X=i(6053),J=(0,u.Z)(F,E,R,!1,null,"0bcd6495",null),Q=J.exports;d()(J,{VAvatar:P.Z,VBtn:j.Z,VCard:h.Z,VCardActions:D.h7,VCardText:D.ZB,VCardTitle:D.EB,VChip:$.Z,VCol:B.Z,VDialog:U.Z,VDivider:p.Z,VImg:q.Z,VProgressCircular:G.Z,VRow:z.Z,VSnackbar:Y.Z,VSpacer:K.Z,VTooltip:X.Z});var tt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("SettingMenu")},et=[],it=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("p",[t._v("test")])},at=[],st={name:"SettingMenu"},rt=st,nt=(0,u.Z)(rt,it,at,!1,null,"1e65a60d",null),ot=nt.exports,lt={name:"SettingsPage",components:{SettingMenu:ot}},ct=lt,ut=(0,u.Z)(ct,tt,et,!1,null,"5afde456",null),vt=ut.exports,dt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},ht=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("h1",[t._v("Hello")])])}],pt={name:"RaidersFinderPage"},ft=pt,gt=(0,u.Z)(ft,dt,ht,!1,null,"50a025d2",null),mt=gt.exports;a.Z.use(O.Z);var _t=[{path:"/",name:"Home",component:Q,icon:"mdi-home"},{path:"/RaidersFinder",name:"Raiders Finder",component:mt,icon:"mdi-magnify"},{path:"/settings",name:"Setting",component:vt,icon:"mdi-cog"}],bt=new O.Z({mode:"history",base:"/White-Arknights-Tool/",routes:_t}),Tt=bt,kt=i(5591);a.Z.use(kt.Z);var yt=new kt.Z({theme:{dark:!0}});a.Z.config.productionTip=!1,new a.Z({router:Tt,vuetify:yt,render:function(t){return t(A)}}).$mount("#app")},3269:function(t,e,i){t.exports=i.p+"img/logo_dark.f167e955.png"},2851:function(t,e,i){t.exports=i.p+"img/logo_light.5233fb93.png"}},e={};function i(a){var s=e[a];if(void 0!==s)return s.exports;var r=e[a]={exports:{}};return t[a](r,r.exports,i),r.exports}i.m=t,function(){var t=[];i.O=function(e,a,s,r){if(!a){var n=1/0;for(u=0;u<t.length;u++){a=t[u][0],s=t[u][1],r=t[u][2];for(var o=!0,l=0;l<a.length;l++)(!1&r||n>=r)&&Object.keys(i.O).every((function(t){return i.O[t](a[l])}))?a.splice(l--,1):(o=!1,r<n&&(n=r));if(o){t.splice(u--,1);var c=s();void 0!==c&&(e=c)}}return e}r=r||0;for(var u=t.length;u>0&&t[u-1][2]>r;u--)t[u]=t[u-1];t[u]=[a,s,r]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var a in e)i.o(e,a)&&!i.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){i.p="/White-Arknights-Tool/"}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,a){var s,r,n=a[0],o=a[1],l=a[2],c=0;if(n.some((function(e){return 0!==t[e]}))){for(s in o)i.o(o,s)&&(i.m[s]=o[s]);if(l)var u=l(i)}for(e&&e(a);c<n.length;c++)r=n[c],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(u)},a=self["webpackChunkdev"]=self["webpackChunkdev"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=i.O(void 0,[998],(function(){return i(2962)}));a=i.O(a)})();
//# sourceMappingURL=app-legacy.68173ae0.js.map