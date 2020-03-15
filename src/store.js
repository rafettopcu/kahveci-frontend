import Vue from "vue";
import Vuex from "vuex";
import Storage from "vue-ls";
// import VueJwtDecode from "vue-jwt-decode";
import API from "./axios";

const options = {
  name: "ls",
  storage: "local"
};

Vue.use(Storage, options);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false
  },
  mutations: {
    updateAuth: (state, isAuth) => {
      state.isAuth = isAuth;
    },
    updateToken(state, token) {
      Vue.ls.set("token", token);
      state.token = token;
    }
  },
  actions: {
    doRegister: async ({ commit }, payload) => {
      const res = await API.post(`/v1/auth/register/`, {
        ...payload
      });
      commit("updateAuth", true);
      return res;
    },
    doLogin: async ({ commit }, payload) => {
      const res = await API.post(`/v1/auth/login/`, {
        ...payload
      });
      commit("updateToken", res.data.token);
      return res;
    }
  },
  modules: {}
});
