import Vue from "vue";
import App from "./components/App.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
