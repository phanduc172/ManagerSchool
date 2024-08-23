import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "*", redirect: "/" },
    {
      path: "/",
      name: "",
      component: () => import("../resources/Dashboard.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../resources/auth/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../resources/auth/Register.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../resources/Dashboard.vue"),
    },
    {
      path: "/manager/teachers",
      name: "teachers",
      component: () => import("../resources/teachers/ManagerTeacher.vue"),
    },
    {
      path: "/manager/students",
      name: "students",
      component: () => import("../resources/students/ManagerStudent.vue"),
    },
    {
      path: "/manager/users",
      name: "users",
      component: () => import("../resources/users/ManagerUser.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../resources/profile/UserProfile.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  let token =
    store.getters["auth/profile"]?.token || sessionStorage.getItem("token");
  if (!token) {
    if (to.name != "login") {
      return next("/login");
    } else {
      return next();
    }
  } else {
    if (to.name == "login" || !to.name) {
      return next("/dashboard");
    }
    await store.dispatch("auth/GetProfile");

    return next();
  }
});

export default router;
