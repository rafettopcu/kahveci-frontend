import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Stores from "./views/Stores";
// import VueJwtDecode from "vue-jwt-decode";

Vue.use(VueRouter);

// const ifAuthenticated = (to, from, next) => {
//   const token = Vue.ls.get("token");

//   const authUser = Vue.ls.get("token");

//   if (to.meta.requiresAuth) {
//     if (authUser) {
//       const { role } = VueJwtDecode.decode(token);

//       if (to.meta.roles && to.meta.roles.length > 0) {
//         if (to.meta.roles.includes(role)) {
//           next();
//         } else {
//           next("/");
//         }
//       } else {
//         next();
//       }
//     } else {
//       Vue.ls.clear();
//       next({ name: "login" });
//     }
//   } else {
//     next();
//   }
// };

const ifNotAuthenticated = (to, from, next) => {
  const authUser = Vue.ls.get("token");
  if (!authUser) {
    next();
  } else {
    next("/");
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/register",
    name: "register",
    beforeEnter: ifNotAuthenticated,
    component: Register
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: ifNotAuthenticated,
    component: Login
  },
  {
    path: "/stores",
    name: "stores",

    component: Stores
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
