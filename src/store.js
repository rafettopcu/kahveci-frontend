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
    cart: [
      {
        hasScore: true,
        _id: "5e63ab2f00ab3f6b788d0a48",
        name: "Espresso",
        price: 8,
        count: 1,
        photo:
          "https://www.tchibo.de/newmedia/art_img/MAIN-IMPORTED/f5e5f06b19deab34/barista-espresso-kasigi-4-adet.jpg",
        __v: 0
      },
      {
        hasScore: true,
        _id: "5e63a59c24f7754c1a168937",
        name: "Sütlü Kahve",
        price: 12,
        count: 1,
        photo:
          "https://iasbh.tmgrup.com.tr/554269/752/395/0/0/574/302?u=https://isbh.tmgrup.com.tr/sbh/2018/12/31/sutlu-kahve-nasil-yapilir-1546246095095.jpeg",
        __v: 0
      },
      {
        hasScore: true,
        _id: "5e6fa8fdff011ed771cedf22",
        name: "Cheesecake",
        price: 12.5,
        count: 2,
        photo:
          "https://www.thespruceeats.com/thmb/zXB9_pJ9Z40SUi75eRezebs5lTM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/gluten-free-new-york-cheesecake-1450985-hero-01-dc54f9daf38044238b495c7cefc191fa.jpg"
      }
    ]
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
    }
  },
  modules: {}
});
