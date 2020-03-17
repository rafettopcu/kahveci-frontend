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
    isAuth: false,
    user: null,
    token: null,
    products: null,
    cart: []
  },
  mutations: {
    updateAuth: (state, isAuth) => {
      state.isAuth = isAuth;
    },
    updateToken(state, token) {
      Vue.ls.set("token", token);
      state.token = token;
    },
    updateUser(state, user) {
      state.user = user;
    },
    increaseWallet(state, ammount) {
      state.user.wallet += ammount;
    },
    updateProducts(state, products) {
      state.products = products;
    },
    addCart(state, payload) {
      console.log(payload.product, payload.productCount);

      let found = false;
      state.cart = state.cart.map(element => {
        if (element._id === payload.product._id) {
          if (Object.keys(element).includes("count")) {
            element.count += payload.productCount;
          } else {
            element.count = payload.productCount;
          }
          found = true;
        }
        return element;
      });

      if (!found)
        state.cart.push({ ...payload.product, count: payload.productCount });
    },
    updateCartProductCount(state, payload) {
      state.cart.forEach(el => {
        if (el._id === payload.product._id) {
          el.count += payload.c;
          return;
        }
      });
    },
    removeProductFromCart(state, product) {
      state.cart = state.cart.filter(x => x._id !== product._id);
    },
    clearCart(state) {
      state.cart = [];
    },
    updateOrders(state, orders) {
      state.user.orders = orders;
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
    },
    doSignOut: async ({ commit }) => {
      await Vue.ls.clear();
      commit("updateAuth", false);
    },
    getMe: async ({ commit }) => {
      const res = await API.get(`/v1/user/me`);
      commit("updateUser", res.data.user);
      return res.data.user;
    },
    getMeOrders: async ({ commit }) => {
      const res = await API.get(`/v1/user/me/order`);
      commit("updateOrders", res.data.orders);
      return res.data.orders;
    },
    loadCredit: async ({ commit }, ammount) => {
      const res = await API.put(`/v1/user/me/load-credit`, { ammount });
      commit("increaseWallet", ammount);
      return res;
    },
    getProducts: async ({ commit }) => {
      const res = await API.get("/v1/product");
      const { products } = res.data;
      commit("updateProducts", products);
      return products;
    },
    postOrder: async ({ state, commit }) => {
      let arr = [];
      await state.cart.forEach(x => {
        for (let i = 0; i < x.count; i++) {
          arr.push(x._id);
        }
      });

      await API.post("/v1/order/", { products: arr });
      commit("clearCart");
    }
  },
  modules: {}
});
