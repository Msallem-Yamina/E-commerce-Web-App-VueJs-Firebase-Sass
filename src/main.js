import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "bootstrap";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// numportu botstra^p men dist zeda
//import material-icon scss
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faStackOverflow,
  faGithub,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faBars,
  faTwitter,
  faFacebook,
  faStackOverflow,
  faGithub,
  faGoogle,
  faLinkedin
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
import "./assets/main.scss";
import firebase from "@/firebase";
import "firebase/firestore";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  firebase,
  render: (h) => h(App),
}).$mount("#app");
