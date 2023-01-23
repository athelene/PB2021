(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c44d00f"],{"6c40":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-center"},[n("h1",{staticClass:"ml-5 headingColor"},[e._v("Diva Friends")]),n("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,r=t.attrs;return[n("v-btn",e._g(e._b({attrs:{color:"primary",dark:""}},"v-btn",r,!1),i),[e._v(" Add a Diva Friend ")])]}}]),model:{value:e.dialogInvitation,callback:function(t){e.dialogInvitation=t},expression:"dialogInvitation"}},[n("v-card",[n("v-card-subtitle",[n("span",{staticClass:"text-h5"},[e._v("Add a non-Diva to the Friends List")]),n("p",{staticClass:"pl-5"},[e._v("This is for people who are not members of the Divas but might want to play with us from time to time when we are short on players. "),n("br"),e._v(" "),n("br"),e._v(" "),n("span",{staticClass:"warning--text"},[e._v("PLEASE MAKE SURE YOU GET THEIR APPROVAL BEFORE YOU ADD THEM TO THE LIST.")])])]),e.invitationStatus?n("p",[e._v(" "+e._s(e.invitationStatus)+" ")]):e._e(),n("v-card-text",[n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[n("v-text-field",{attrs:{label:"Full Name",required:""},model:{value:e.friendName,callback:function(t){e.friendName=t},expression:"friendName"}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[n("v-text-field",{attrs:{label:"Email Address",required:""},model:{value:e.friendEmail,callback:function(t){e.friendEmail=t},expression:"friendEmail"}})],1)],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){return e.closeInvitationDialog()}}},[e._v(" Close ")]),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){return e.addFriend()}}},[e._v(" Send ")])],1)],1)],1),e._l(e.friends,(function(t){return n("v-card",{key:t.FriendID,staticClass:"mx-auto mb-5 mt-3 cardBackground",attrs:{"max-width":"344",elevation:"2"}},[n("v-row",{staticClass:"mt-4 mr-4 ml-4 pt-3 pb-3"},[e._v(" "+e._s(t.FriendName)+" "),1===e.user.user.userAdmin?n("span",[e._v(" ( "+e._s(t.FriendEmail)+" )")]):e._e(),1===e.user.user.userAdmin?n("v-btn",{attrs:{icon:"",small:""},on:{click:function(n){return e.deleteFriend(t.FriendID)}}},[n("v-icon",[e._v("mdi-trash-can-outline")])],1):e._e()],1)],1)}))],2)},r=[],a=n("1da1"),s=(n("96cf"),n("ed42")),o={name:"Friends",data:function(){return{friends:[],switch1:!1,navTitle:"Friends",dialog:!1,friendName:"",friendEmail:"",dialogInvitation:!1,invitePlayerEmail:"",invitationStatus:""}},computed:{user:function(){return this.$store.state.user}},mounted:function(){this.user&&0!==this.user.length||this.$router.push("/"),this.getFriends()},methods:{getFriends:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s["a"].getFriends().then((function(t){e.friends=t}));case 2:case"end":return t.stop()}}),t)})))()},deleteFriend:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,s["a"].deleteFriend(e).then((function(){t.getFriends()}));case 2:case"end":return n.stop()}}),n)})))()},addFriend:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(e.invitationStatus="",n=!1,i=0;i<e.friends.length;i++)e.friends[i].FriendEmail.toUpperCase()===e.friendEmail.toUpperCase()&&(n=!0);if(!0!==n){t.next=10;break}return e.invitationStatus="ATTENTION: "+e.friendName+" is already on the friend list.",e.friendName="",e.friendEmail="",t.abrupt("return");case 10:s["a"].addFriend(e.friendEmail,e.friendName,e.user.user.UserID).then((function(){e.dialogInvitation=!1,e.friendName="",e.friendEmail="",e.getFriends()}));case 11:case"end":return t.stop()}}),t)})))()},closeInvitationDialog:function(){this.invitationStatus="",this.invitePlayerEmail="",this.dialogInvitation=!1}}},d=o,c=(n("e590"),n("2877")),l=n("6544"),u=n.n(l),v=n("8336"),f=n("b0af"),m=n("99d9"),h=n("62ad"),p=n("a523"),b=n("169a"),g=n("132d"),w=n("0fd9"),E=n("2fa4"),_=n("8654"),x=Object(c["a"])(d,i,r,!1,null,"5de17e9e",null);t["default"]=x.exports;u()(x,{VBtn:v["a"],VCard:f["a"],VCardActions:m["a"],VCardSubtitle:m["b"],VCardText:m["c"],VCol:h["a"],VContainer:p["a"],VDialog:b["a"],VIcon:g["a"],VRow:w["a"],VSpacer:E["a"],VTextField:_["a"]})},e29d:function(e,t,n){},e590:function(e,t,n){"use strict";n("e29d")}}]);
//# sourceMappingURL=chunk-6c44d00f.38607edf.js.map