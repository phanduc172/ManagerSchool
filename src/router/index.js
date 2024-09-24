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
      component: () => import("../components/auth/ChangePassword.vue"),
    },
    {
      path: "/recoverpassword",
      name: "recoverpassword",
      component: () => import("../components/auth/FormRecover.vue"),
    },
    {
      path: "/forgot-change-password",
      name: "forgot-change-password",
      component: () => import("../components/auth/ForgotChangePassword.vue"),
      props: (route) => ({ email: route.query.e, token: route.query.token }),
    },

    {
      path: "/confirmpassword",
      name: "confirmpassword",
      component: () => import("../components/auth/ForgotChangePassword.vue"),
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
      path: "/manager/teacher/edit/:id",
      name: "teacherEdit",
      component: () => import("../resources/teachers/TeacherForm.vue"),
    },
    {
      path: "/manager/teacher/create",
      name: "teacherCreate",
      component: () => import("../resources/teachers/TeacherForm.vue"),
    },
    {
      path: "/v1/user/:id",
      name: "getDetailUser",
      // component: () => import("../resources/teachers/TeacherForm.vue"),
    },

    // Router Student
    {
      path: "/manager/students",
      name: "students",
      component: () => import("../resources/students/ManagerStudent.vue"),
    },
    {
      path: "/manager/student/create",
      name: "studentCreate",
      component: () => import('../resources/students/StudentForm.vue'),
    },
    {
      path: "/manager/student/edit/:id",
      name: "studentEdit",
      component: () => import('../resources/students/StudentForm.vue'),
    },

    // Router User
    {
      path: "/manager/users",
      name: "users",
      component: () => import("../resources/users/ManagerUser.vue"),
    },
    {
      path: "/manager/restoreuser",
      name: "restoreuser",
      component: () => import("../resources/users/RestoreUser.vue"),
      props: (route) => ({
        page: parseInt(route.query.page) || 1,
        limit: parseInt(route.query.limit) || 10,
      }),
    },
    {
      path: "/manager/users/create",
      name: "usersCreate",
      component: () => import("../resources/users/UserForm.vue"),
    },
    {
      path: "/manager/users/readexcel",
      name: "readExcel",
      component: () => import("../components/layout/ReadExcel.vue"),
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
      path: '/badpage',
      name: "badpage",
      component: () => import("../components/layout/404.vue"),
      props: true,
    },

    //
    {
      path: "/profile",
      name: "profile",
      component: () => import("../resources/profile/UserProfile.vue"),
    },

    // Schedule
    {
      path: "/manager/schedules",
      name: "schedules",
      component: () => import("../resources/schedule/ManagerSchedule.vue")
    },
    {
      path: "/manager/schedule/create",
      name: "scheduleCreate",
      component: () => import("../resources/schedule/ScheduleForm.vue")
    },
    {
      path: "/manager/schedule/edit/:id",
      name: "scheduleEdit",
      component: () => import("../resources/schedule/ScheduleForm.vue")
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  // Lấy token từ Vuex store hoặc sessionStorage
  let token = store.getters["auth/profile"]?.token || sessionStorage.getItem("token");

  // Danh sách các trang không yêu cầu đăng nhập
  const publicPages = ["login", "register", "recoverpassword", "confirmpassword", "forgot-change-password"];

  // Nếu người dùng không có token (chưa đăng nhập)
  if (!token) {
    // Cho phép truy cập các trang công khai
    if (publicPages.includes(to.name)) {
      return next();
    }

    // Chuyển hướng đến trang login cho các trang yêu cầu đăng nhập
    return next("/login");
  } else {
    // Nếu đã đăng nhập, không cho truy cập lại trang login và register
    if (to.name === "login" || to.name === "register") {
      return next("/dashboard");
    }
    // Nếu là trang khác, cho phép tiếp tục
    return next();
  }
});





export default router;
