(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06fb5b1c"],{"27fd":function(e,t,n){"use strict";n("662c")},"3fd1":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{attrs:{color:"basil"}},[n("v-card-title",{staticClass:"text-center justify-center py-6"},[n("h2",{staticClass:"font-weight-bold blue--text"},[e._v(" Sign Up ")])]),n("v-card",{attrs:{color:"basil",flat:""}},[n("v-card-text",[n("v-form",{model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"12",md:"4"}},[n("v-text-field",{attrs:{label:"Invitation Code",tabindex:"1",required:""},model:{value:e.invitationCode,callback:function(t){e.invitationCode=t},expression:"invitationCode"}})],1),n("v-col",{attrs:{cols:"12",md:"4"}},[n("v-text-field",{attrs:{rules:e.firstRules,counter:15,label:"First name",required:"",tabindex:"2"},model:{value:e.firstname,callback:function(t){e.firstname=t},expression:"firstname"}})],1),n("v-col",{attrs:{cols:"12",md:"4"}},[n("v-text-field",{attrs:{rules:e.lastRules,counter:15,label:"Last name",required:"",tabindex:"3"},model:{value:e.lastname,callback:function(t){e.lastname=t},expression:"lastname"}})],1),n("v-col",{attrs:{cols:"12",md:"4"}},[n("v-text-field",{attrs:{rules:e.displayRules,counter:40,label:"Name you want others to see",required:"",tabindex:"4"},model:{value:e.displayname,callback:function(t){e.displayname=t},expression:"displayname"}})],1),n("v-col",{attrs:{cols:"12",md:"4"}},[n("v-text-field",{attrs:{rules:e.emailRules,label:"E-mail",required:"",tabindex:"5"},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),n("v-col",{attrs:{cols:"6",md:"6"}},[e._v(" Phone "),n("br"),n("v-text-field",{attrs:{hint:"Numbers Only!",required:"",tabindex:"6"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1),n("v-col",{attrs:{cols:"12",md:"4"}},[n("v-text-field",{staticClass:"input-group--focused",attrs:{"append-icon":e.show1?"mdi-eye":"mdi-eye-off",rules:[e.rules.required,e.rules.min],type:e.show1?"text":"password",name:"passowrd",label:"Password",hint:"At least 8 characters",tabindex:"7"},on:{"click:append":function(t){e.show1=!e.show1}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),n("v-col",{attrs:{cols:"12",md:"4"}},[n("v-text-field",{staticClass:"input-group--focused",attrs:{"append-icon":e.show1?"mdi-eye":"mdi-eye-off",rules:[e.rules.required,e.rules.min],type:e.show1?"text":"password",name:"password2",label:"Re-enter your password",hint:"At least 8 characters",tabindex:"8"},on:{"click:append":function(t){e.show1=!e.show1}},model:{value:e.password2,callback:function(t){e.password2=t},expression:"password2"}})],1)],1),n("v-btn",{staticClass:"orange",attrs:{tabindex:"9"},on:{click:function(t){return e.register()}}},[n("v-icon",[e._v("mdi-check")])],1)],1)],1)],1)],1)],1)},a=[],i=n("1da1"),s=(n("96cf"),n("ed42")),o={name:"Registration",data:function(){return{valid:!1,firstname:"",lastname:"",phone:"",firstRules:[function(e){return!!e||"First name is required"},function(e){return e.length<=10||"Name must be less than 15 characters"}],lastRules:[function(e){return!!e||"Last name is required"},function(e){return e.length<=10||"Name must be less than 15 characters"}],displayRules:[function(e){return!!e||"Display name is required"},function(e){return e.length<=40||"Name must be less than 40 characters"}],phoneRules:[function(e){return!!e||"Phone number is required"},function(e){return e.length<=40||"Name must be less than 40 characters"}],displayname:"",userInfo:[],password:"",password2:"",show1:!1,message:"",invitationCode:"",email:"",emailRules:[function(e){return!!e||"E-mail is required"},function(e){return/.+@.+/.test(e)||"E-mail must be valid"}],rules:{required:function(e){return!!e||"Required."},min:function(e){return e.length>=8||"Min 8 characters"},emailMatch:function(){return"The email and password you entered don't match"}}}},methods:{register:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.phone.substr(0,3),r=e.phone.substr(3,3),a=e.phone.substr(6,4),t.next=5,s["a"].registration(e.email,e.firstname,e.lastname,e.displayname,e.password,n,r,a,e.invitationCode).then((function(t){"invalid"===t?e.regError="Invalid Invitation Code with this Email Address.":e.$router.push("/")}));case 5:case"end":return t.stop()}}),t)})))()}}},u=o,l=(n("27fd"),n("2877")),c=n("6544"),d=n.n(c),f=n("8336"),h=n("b0af"),m=n("99d9"),p=n("62ad"),b=n("a523"),v=n("4bd4"),w=n("132d"),g=n("0fd9"),x=n("8654"),y=Object(l["a"])(u,r,a,!1,null,null,null);t["default"]=y.exports;d()(y,{VBtn:f["a"],VCard:h["a"],VCardText:m["c"],VCardTitle:m["d"],VCol:p["a"],VContainer:b["a"],VForm:v["a"],VIcon:w["a"],VRow:g["a"],VTextField:x["a"]})},"4bd4":function(e,t,n){"use strict";var r=n("5530"),a=(n("caad"),n("2532"),n("07ac"),n("4de4"),n("159b"),n("7db0"),n("58df")),i=n("7e2b"),s=n("3206");t["a"]=Object(a["a"])(i["a"],Object(s["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(e){var t=this,n=function(e){return e.$watch("hasError",(function(n){t.$set(t.errorBag,e._uid,n)}),{immediate:!0})},r={_uid:e._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=e.$watch("shouldValidate",(function(a){a&&(t.errorBag.hasOwnProperty(e._uid)||(r.valid=n(e)))})):r.valid=n(e),r},validate:function(){return 0===this.inputs.filter((function(e){return!e.validate(!0)})).length},reset:function(){this.inputs.forEach((function(e){return e.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(e){return e.resetValidation()})),this.resetErrorBag()},register:function(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister:function(e){var t=this.inputs.find((function(t){return t._uid===e._uid}));if(t){var n=this.watchers.find((function(e){return e._uid===t._uid}));n&&(n.valid(),n.shouldValidate()),this.watchers=this.watchers.filter((function(e){return e._uid!==t._uid})),this.inputs=this.inputs.filter((function(e){return e._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:Object(r["a"])({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}})},"62ad":function(e,t,n){"use strict";var r=n("ade3"),a=n("5530"),i=(n("a9e3"),n("b64b"),n("ac1f"),n("5319"),n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("caad"),n("159b"),n("2ca0"),n("4b85"),n("2b0e")),s=n("d9f7"),o=n("80d2"),u=["sm","md","lg","xl"],l=function(){return u.reduce((function(e,t){return e[t]={type:[Boolean,String,Number],default:!1},e}),{})}(),c=function(){return u.reduce((function(e,t){return e["offset"+Object(o["y"])(t)]={type:[String,Number],default:null},e}),{})}(),d=function(){return u.reduce((function(e,t){return e["order"+Object(o["y"])(t)]={type:[String,Number],default:null},e}),{})}(),f={col:Object.keys(l),offset:Object.keys(c),order:Object.keys(d)};function h(e,t,n){var r=e;if(null!=n&&!1!==n){if(t){var a=t.replace(e,"");r+="-".concat(a)}return"col"!==e||""!==n&&!0!==n?(r+="-".concat(n),r.toLowerCase()):r.toLowerCase()}}var m=new Map;t["a"]=i["a"].extend({name:"v-col",functional:!0,props:Object(a["a"])(Object(a["a"])(Object(a["a"])(Object(a["a"])({cols:{type:[Boolean,String,Number],default:!1}},l),{},{offset:{type:[String,Number],default:null}},c),{},{order:{type:[String,Number],default:null}},d),{},{alignSelf:{type:String,default:null,validator:function(e){return["auto","start","end","center","baseline","stretch"].includes(e)}},tag:{type:String,default:"div"}}),render:function(e,t){var n=t.props,a=t.data,i=t.children,o=(t.parent,"");for(var u in n)o+=String(n[u]);var l=m.get(o);return l||function(){var e,t;for(t in l=[],f)f[t].forEach((function(e){var r=n[e],a=h(t,e,r);a&&l.push(a)}));var a=l.some((function(e){return e.startsWith("col-")}));l.push((e={col:!a||!n.cols},Object(r["a"])(e,"col-".concat(n.cols),n.cols),Object(r["a"])(e,"offset-".concat(n.offset),n.offset),Object(r["a"])(e,"order-".concat(n.order),n.order),Object(r["a"])(e,"align-self-".concat(n.alignSelf),n.alignSelf),e)),m.set(o,l)}(),e(n.tag,Object(s["a"])(a,{class:l}),i)}})},"662c":function(e,t,n){}}]);
//# sourceMappingURL=chunk-06fb5b1c.470ef41d.js.map