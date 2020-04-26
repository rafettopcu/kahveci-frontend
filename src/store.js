import Vue from "vue";
import Vuex from "vuex";
import Storage from "vue-ls";
import VueJwtDecode from "vue-jwt-decode";
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
    cart: [],
    caffes: null,
    orders: null,
    addedPorduct: null,
    scannedUser: null
  },
  getters: {
    token() {
      console.log(Vue.ls.get("token"));

      return Vue.ls.get("token");
    },
    role(state, getters) {
      console.log(getters.token);

      return VueJwtDecode.decode(getters.token).role;
    }
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
      state.orders = orders;
    },
    updateCaffes(state, caffes) {
      state.caffes = caffes;
    },
    updateAddedProduct(state, product) {
      state.addedPorduct = product;
      state.products.unshift(product);
    },
    SET_SCANNED_USER(state, user) {
      state.scannedUser = user;
    },
    USE_SCORE(state, score) {
      state.scannedUser.score -= score;
    },
    DELETE_PRODUCT(state, id) {
      state.products = state.products.filter(x => x._id !== id);
    },
    ADD_CAFFE(state, caffe) {
      state.caffes.unshift(caffe);
    },
    DELETE_CAFFE(state, id) {
      state.caffes = state.caffes.filter(x => x._id !== id);
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
    getUser: async ({ commit }, userId) => {
      const res = await API.get(`/v1/user/${userId}`);
      commit("SET_SCANNED_USER", res.data.user);
      return res.data.user;
    },
    useScore: async ({ commit, state }, score) => {
      await API.patch(`/v1/user/${state.scannedUser._id}`);
      commit("USE_SCORE", score);
    },
    updateProduct: async ({ commit }, payload) => {
      await API.put(`/v1/product/${payload.id}`, {
        ...payload.changes
      });
      commit();
    },
    getMe: async ({ commit }) => {
      const res = await API.get(`/v1/user/me`);
      commit("updateUser", res.data.user);
      return res.data.user;
    },
    getMeOrders: async ({ commit }) => {
      const res = await API.get(`/v1/user/me/orders`);
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
      const products = res.data.products.map(x => {
        return {
          ...x,
          editMode: false
        };
      });
      commit("updateProducts", products);
      return products;
    },
    addProduct: async ({ commit }, payload) => {
      const res = await API.post("/v1/product/", { ...payload });
      const { product } = res.data;
      commit("updateAddedProduct", product);
      return product;
    },
    deleteProduct: async ({ commit }, id) => {
      await API.delete(`/v1/product/${id}`);
      commit("DELETE_PRODUCT", id);
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
    },
    getAllCaffes: async ({ commit }) => {
      const res = await API.get(`/v1/caffe/`);
      const caffes = res.data.caffes.map(x => {
        return {
          ...x,
          editMode: false
        };
      });
      console.log(caffes);

      commit("updateCaffes", caffes);
      return caffes;
    },
    addCaffe: async ({ commit }, payload) => {
      const res = await API.post("/v1/caffe", { ...payload });
      const caffe = res.data.caffe;
      commit("ADD_CAFFE", caffe);
    },
    updateCaffe: async ({ commit }, payload) => {
      await API.put("/v1/caffe/" + payload.id, {
        ...payload.changes
      });
      commit();
    },
    deleteCaffe: async ({ commit }, id) => {
      await API.delete("/v1/caffe/" + id);
      commit("DELETE_CAFFE");
    }
  },
  modules: {}
});
