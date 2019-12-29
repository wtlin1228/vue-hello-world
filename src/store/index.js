import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);

const isDebug = process.env.NODE_ENV !== "production";

var store = new Vuex.Store({
  modules,
  strict: isDebug
});

export default store;
