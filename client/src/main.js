import Vue from "vue";
import App from "./App.vue";
//import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import DatetimePicker from 'vuetify-datetime-picker';
const VueMask = require('v-mask');

Vue.config.productionTip = false;
Vue.use(DatetimePicker);
Vue.use(VueMask);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
