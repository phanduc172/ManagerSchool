<template>
  <div id="app" class="d-flex">
    <SideBar v-if="!isSidebarCollapsed" />
    <div
      id="page-content-wrapper"
      :class="[isSidebarCollapsed && !isAuthPage ? 'collapsed' : '']"
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
  },
  created() {
    this.isAuthPage = [
      "login",
      "register",
      "recoverpassword",
      "confirmpassword",
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
    ].includes(this.$route.name);
  },
};
</script>

<style>
#app {
  min-width: 375px;
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
@media screen and (max-width: 576px) {
  #page-content-wrapper {
    margin-left: 0;
  }
}
</style>
