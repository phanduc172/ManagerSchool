import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "*", redirect: "/login" },

    // Auth Router
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
      path: "/changepassword",
      name: "changepassword",
      // component: () => import("../resources/auth/Register.vue"),
    },
    {
      path: "/recoverpassword",
      name: "recoverpassword",
      component: () => import("../components/auth/FormRecover.vue"),
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../resources/Dashboard.vue"),
    },

    // Router Teacher
    {
      path: "/manager/teachers",
      name: "teachers",
      component: () => import("../resources/teachers/ManagerTeacher.vue"),
    },
    {
      path: "/manager/teachers/create",
      name: "teachersCreate",
      component: () => import("../resources/teachers/TeacherForm.vue"),
    },

    // Router Student
    {
      path: "/manager/students",
      name: "students",
      component: () => import("../resources/students/ManagerStudent.vue"),
    },
    {
      path: "/manager/students/create",
      name: "studentCreate",
      component: () => import('../resources/students/StudentForm.vue'),
    },

    // Router User
    {
      path: "/manager/users",
      name: "users",
      component: () => import("../resources/users/ManagerUser.vue"),
    },

    // Router Class
    {
      path: "/manager/classes",
      name: "classes",
      component: () => import("../resources/classes/ManagerClasses.vue"),
    },
    {
      path: "/manager/classes/create",
      name: "classesCreate",
      component: () => import("../resources/classes/ClassesForm.vue"),
    },
    // Router Subject
    {
      path: "/manager/subjects",
      name: "subjects",
      component: () => import("../resources/subject/ManagerSubject.vue"),
      props: (route) => ({
        page: parseInt(route.query.page) || 1,
        limit: parseInt(route.query.limit) || 10,
      }),
    },
    {
      path: "/manager/subjects/create",
      name: "subjectsCreate",
      component: () => import("../resources/subject/SubjectForm.vue"),
    },
    {
      path: '/manager/subjects/edit/:id',
      name: "subjectsEdit",
      component: () => import("../resources/subject/SubjectForm.vue"),
      props: true,
    },
    //Router Major
    {
      path: "/manager/major",
      name: "major",
      component: () => import("../resources/major/ManagerMajor.vue"),
      props: (route) => ({
        page: parseInt(route.query.page) || 1,
        limit: parseInt(route.query.limit) || 10,
      }),
    },
    {
      path: "/manager/major/create",
      name: "majorCreate",
      component: () => import("../resources/major/MajorForm.vue"),
    },
    {
      path: '/manager/major/edit/:id',
      name: "majorEdit",
      component: () => import("../resources/major/MajorForm.vue"),
      props: true,
    },
    //Router Term
    {
      path: "/manager/term",
      name: "term",
      component: () => import("../resources/term/ManagerTerm.vue"),
    },
    {
      path: "/manager/term/create",
      name: "termCreate",
      component: () => import("../resources/term/TermForm.vue"),
    },
    {
      path: '/manager/term/edit/:id',
      name: "termEdit",
      component: () => import("../resources/term/TermForm.vue"),
      props: true,
    },

    //
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
    if (to.name === "login" || to.name === "register" || to.name === "recoverpassword") {
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
