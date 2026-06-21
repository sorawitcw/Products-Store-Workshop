import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "",
    name: "toolbar",
    component: () => import("../views/ToolBar.vue"),
    children: [
      {
        path: "/",
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "/mycard",
        component: () => import("../views/MyCard.vue"),
      },
      {
        path: "/productview",
        name: "productview",
        component: () => import("../views/product/ProductView.vue"),
      },
      {
        path: "/productdetail/:id",
        name: "productdetail",
        component: () => import("../views/product/ProductDetail.vue"),
      },
      {
        path: "/cart",
        name: "cart",
        component: () => import("../views/order/cart/cart.vue"),
      },
      {
        path: "/admin/products",
        name: "adminproducts",
        component: () => import("../views/AdminProducts.vue"),
      },
      {
        path: "/admin/orders",
        component: () => import("../views/AdminOrders.vue"),
      },
      {
        path: "/profile",
        component: () => import("../views/account/profile/profile.vue"),
      },
      {
        path: "/editprofile",
        component: () => import("../views/account/accountEdit/edit.vue"),
      },
      {
        path: "/myorder",
        component: () => import("../views/order/myorder/myorder.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
