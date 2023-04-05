import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getAuth } from "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/Product/:id/:name/:image/:desc/:price",
    name: "Product",
    component: () => import("../views/ProdDet.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/navbar",
    name: "navbar",
    component: () => import("../components/global/navbar.vue"),
  },
  {
    path: "/TopBar",
    name: "TopBar",
    component: () => import("../components/global/TopBar.vue"),
  },
  {
    path: "/Dash",
    name: "Dash",
    component: () => import("../views/Admin/Dash.vue"),
    children: [
      {
        path: "/sidebar",
        name: "sidebar",
        component: () => import("../components/global/sidebarSettings.vue"),
        // meta: { requiresAuth: true },
        children: [
          {
            path: "category",
            component: () => import("../views/Admin/category.vue"),
            // meta: { requiresAuth: true },
          },
          {
            path: "Products",
            // name: "AllProd",
            component: () => import("../views/Admin/AllProd.vue"),
            // meta: { requiresAuth: true },
          },
          {
            path: "profile",
            // name: "profile",
            component: () => import("../views/profile.vue"),
            meta: { requiresAuth: true },
          },
        ],
      },
    ],
  },
  {
    path: "/HomeUser",
    name: "HomeUser",
    component: () => import("../views/User/HomeUser.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/cart/:cartItems",
    name: "cart",
    component: () => import("../views/cart.vue"),
  },
  {
    path: "/footer",
    name: "footer",
    component: () => import("../components/global/Footer.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});
export default router;
