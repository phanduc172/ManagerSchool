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
      name: "home",
      component: () => import("../App.vue"),
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
  // Lấy token từ Vuex store hoặc sessionStorage
  let token = store.getters["auth/profile"]?.token || sessionStorage.getItem("token");

  // Nếu không có token (người dùng chưa đăng nhập)
  if (!token) {
    // Nếu trang truy cập là trang login hoặc register, cho phép tiếp tục
    if (to.name === "login" || to.name === "register") {
      return next();
    }

    // Nếu trang truy cập không phải là login hoặc register, cho phép truy cập trang dashboard
    if (to.name === "dashboard") {
      return next();
    }

    // Chuyển hướng đến trang login cho các trang khác
    return next("/login");
  } else {
    // Nếu người dùng đã đăng nhập
    if (to.name === "login" || to.name === "register") {
      // Nếu truy cập vào trang login hoặc register, chuyển hướng đến trang dashboard
      return next("/dashboard");
    }

    // Nếu là trang khác, kiểm tra và lấy profile từ Vuex store
    await store.dispatch("auth/getProfile");
    return next();
  }
});




export default router;
