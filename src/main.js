import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
Vue.use(Antd);

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faCross,
  faWallet,
  faStar,
  faCoffee,
  faStore,
  faEnvelope,
  faShoppingCart,
  faSignOutAlt,
  faQrcode,
  faBars,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret);
library.add(faCross);
library.add(faWallet);
library.add(faStar);
library.add(faCoffee);
library.add(faStore);
library.add(faEnvelope);
library.add(faShoppingCart);
library.add(faSignOutAlt);
library.add(faQrcode);
library.add(faBars);
library.add(faClock);

Vue.component("font-awesome-icon", FontAwesomeIcon);

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAt1D2Ahsglbu3g2D_VIRx7X__LB0UUU-4",
    libraries: "places" // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
  installComponents: true
});

import VueQrcode from "@chenfengyuan/vue-qrcode";

Vue.component(VueQrcode.name, VueQrcode);
Vue.config.productionTip = false;
import Ripple from "vue-ripple-directive";

Vue.directive("ripple", Ripple);
import contenteditable from "vue-contenteditable";
Vue.use(contenteditable);

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
