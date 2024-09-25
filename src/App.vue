<template>
  <div id="app" class="d-flex">
    <SideBar v-if="!isSidebarCollapsed && !isAuthPage" />
    <div
      id="page-content-wrapper"
      :class="[
        isSidebarCollapsed && !isAuthPage ? 'collapsed' : '',
        isAuthPage ? 'auth-page' : '',
      ]"
      class="flex-grow-1"
    >
      <NavBar v-if="!isAuthPage" @toggleSidebar="toggleSidebar" />
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from "./components/layout/SideBar.vue";
import NavBar from "./components/layout/NavBar.vue";

export default {
  name: "App",
  components: {
    SideBar,
    NavBar,
  },
  data() {
    return {
      isSidebarCollapsed: JSON.parse(
        localStorage.getItem("sb|sidebar-toggle") || "false"
      ),
      isAuthPage: false,
    };
  },
  watch: {
    $route(to) {
      this.isAuthPage = [
        "login",
        "register",
        "recoverpassword",
        "confirmpassword",
        "changepassword",
        "forgot-change-password",
        "usersCreate",
        "classesCreate",
        "subjectsCreate",
        "majorCreate",
        "termCreate",
        "teachersCreate",
        "badpage",
        "teacherCreate",
        "teacherEdit",
        "studentCreate",
        "studentEdit",
        "scheduleCreate",
        "scheduleEdit",
        "termCreate",
        "termEdit",
      ].includes(to.name);
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      localStorage.setItem(
        "sb|sidebar-toggle",
        JSON.stringify(this.isSidebarCollapsed)
      );
    },
    checkWindowSize() {
      if (window.innerWidth < 375) {
        this.isSidebarCollapsed = true;
        localStorage.setItem("sb|sidebar-toggle", "true");
      } else if (window.innerWidth < 768) {
        this.isSidebarCollapsed = false;
        localStorage.setItem("sb|sidebar-toggle", "false");
      } else {
        this.isSidebarCollapsed = JSON.parse(
          localStorage.getItem("sb|sidebar-toggle") || "false"
        );
      }
    },
  },
  mounted() {
    this.checkWindowSize();
    window.addEventListener("resize", this.checkWindowSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkWindowSize);
  },
  created() {
    this.isAuthPage = [
      "login",
      "register",
      "recoverpassword",
      "confirmpassword",
      "changepassword",
      "forgot-change-password",
      "usersCreate",
      "classesCreate",
      "subjectsCreate",
      "majorCreate",
      "termCreate",
      "teachersCreate",
      "badpage",
      "teacherCreate",
      "teacherEdit",
      "studentCreate",
      "studentEdit",
      "scheduleCreate",
      "scheduleEdit",
      "term",
      "termCreate",
      "termEdit",
      "major",
      "majorCreate",
      "majorEdit",
      "subjects",
      "subjectsCreate",
      "subjectsEdit",
      "classes",
      "classesCreate",
      "usersCreate",
      "restoreuser",
      "studentEdit",
      "studentCreate",
    ].includes(this.$route.name);
  },
};
</script>


<style>
#app {
  min-height: 100vh;
  display: flex;
  overflow: hidden;
}

#page-content-wrapper {
  transition: margin-left 0.3s, width 0.3s;
  margin-left: 250px;
  width: calc(100% - 250px);
  background: url(/src/assets/images/bg.jpg) no-repeat center center;
  background-size: cover;
}

#page-content-wrapper.collapsed {
  margin-left: 0;
  width: 100%;
}

#page-content-wrapper.auth-page {
  margin-left: 0;
  width: 100%;
  background: none;
  /* background-color: #f8f9fa; */
  background: url(/src/assets/images/bg.jpg) no-repeat center center;
  background-size: cover;
}
@media screen and (max-width: 375px) {
  #page-content-wrapper {
    margin-left: 0;
  }
}
</style>
