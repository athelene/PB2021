(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78f95042"],{"3a4b":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"text-center"},[r("h1",{staticClass:"ml-5 headingColor"},[t._v("Players")]),r("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[1===t.user.user.userAdmin?r("v-btn",t._g(t._b({attrs:{color:"primary",dark:""}},"v-btn",n,!1),a),[t._v(" Send Invitation ")]):t._e()]}}]),model:{value:t.dialogInvitation,callback:function(e){t.dialogInvitation=e},expression:"dialogInvitation"}},[r("v-card",[r("v-card-subtitle",[r("span",{staticClass:"text-h5"},[t._v("Send Invitation")])]),r("v-card-text",[r("v-container",[t.invitationStatus?r("p",[t._v(t._s(t.invitationStatus))]):t._e(),r("v-row",[r("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[r("v-text-field",{attrs:{label:"Email Address",required:""},model:{value:t.invitePlayerEmail,callback:function(e){t.invitePlayerEmail=e},expression:"invitePlayerEmail"}})],1)],1)],1)],1),r("v-card-actions",[r("v-spacer"),r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){return t.closeInvitationDialog()}}},[t._v(" Close ")]),r("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){return t.invitePlayer()}}},[t._v(" Send ")])],1)],1)],1),t._l(t.players,(function(e){return r("v-card",{key:e.PlayerID,staticClass:"mx-auto mb-5 mt-3 cardBackground",attrs:{"max-width":"344",elevation:"2"}},[r("v-card-title",[t._v(" "+t._s(e.userLast)+", "+t._s(e.userFirst)+" "),r("br")]),r("v-card-text",[r("a",{attrs:{href:"mailto:"+e.userEmail}},[t._v(" "+t._s(e.userEmail)+" ")]),t._v(" "),r("br"),r("a",{attrs:{href:"tel:"+e.userPhone}},[t._v(t._s(e.userPhone))])]),1===t.user.user.userAdmin||t.user.user.UserID===e.userID?r("v-row",{staticClass:"mt-4 mr-4 ml-4"},[r("v-btn",{attrs:{icon:"",small:""},on:{click:function(r){return t.editPlayer(e.userID)}}},[r("v-icon",[t._v("mdi-pencil")])],1),r("v-spacer"),1===t.user.userAdmin?r("v-btn",{attrs:{icon:"",small:""},on:{click:function(r){return t.deletePlayer(e.userID)}}},[r("v-icon",[t._v("mdi-trash-can-outline")])],1):t._e()],1):t._e()],1)}))],2)},n=[],i=r("1da1"),s=(r("96cf"),r("ed42")),o={name:"Players",data:function(){return{players:[],switch1:!1,navTitle:"Players",dialog:!1,groupTypes:[],groupTypeID:" ",playerName:"",playerEmail:"",dialogInvitation:!1,invitePlayerEmail:"",invitationStatus:""}},computed:{user:function(){return this.$store.state.user}},mounted:function(){this.user&&0!==this.user.length||this.$router.push("/"),this.getPlayers()},methods:{getPlayers:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s["a"].getPlayers().then((function(e){t.players=e}));case 2:case"end":return e.stop()}}),e)})))()},deletePlayer:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,s["a"].deletePlayer(t).then((function(){e.getPlayers()}));case 2:case"end":return r.stop()}}),r)})))()},invitePlayer:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s["a"].invitePlayer(t.invitePlayerEmail,t.user.user.UserID).then((function(e){t.invitationStatus="duplicate"===e?"Duplicate email.":"Invitation sent"}));case 2:case"end":return e.stop()}}),e)})))()},closeInvitationDialog:function(){this.invitationStatus="",this.invitePlayerEmail="",this.dialogInvitation=!1},editPlayer:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.$router.push({path:"editPlayer",query:{ID:t}});case 1:case"end":return r.stop()}}),r)})))()}}},u=o,l=(r("da76"),r("2877")),c=r("6544"),d=r.n(c),v=r("8336"),m=r("b0af"),p=r("99d9"),f=r("62ad"),h=r("a523"),y=r("169a"),b=r("132d"),g=r("0fd9"),_=r("2fa4"),P=r("8654"),w=Object(l["a"])(u,a,n,!1,null,"b93d3470",null);e["default"]=w.exports;d()(w,{VBtn:v["a"],VCard:m["a"],VCardActions:p["a"],VCardSubtitle:p["b"],VCardText:p["c"],VCardTitle:p["d"],VCol:f["a"],VContainer:h["a"],VDialog:y["a"],VIcon:b["a"],VRow:g["a"],VSpacer:_["a"],VTextField:P["a"]})},"7add":function(t,e,r){},da76:function(t,e,r){"use strict";r("7add")}}]);
//# sourceMappingURL=chunk-78f95042.50dffd28.js.map