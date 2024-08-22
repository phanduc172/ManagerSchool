<template>
  <div id="app" class="d-flex">
    <SideBar v-if="!isSidebarCollapsed && !isAuthPage" />
    <div id="page-content-wrapper" :class="{ 'collapsed': isSidebarCollapsed && !isAuthPage }" class="flex-grow-1">
      <NavBar v-if="!isAuthPage" @toggleSidebar="toggleSidebar" />
      <router-view />
    </div>    
  </div>
</template>

<script>
import SideBar from './components/layout/SideBar.vue';
import NavBar from './components/layout/NavBar.vue';

export default {
  name: 'App',
  components: {
    SideBar,
    NavBar,
  },
  data() {
    return {
      isSidebarCollapsed: JSON.parse(localStorage.getItem('sb|sidebar-toggle') || 'false'),
      isAuthPage: false,
    };
  },
  watch: {
    $route(to) {
      this.isAuthPage = ['login', 'register'].includes(to.name);
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      localStorage.setItem('sb|sidebar-toggle', JSON.stringify(this.isSidebarCollapsed));
    },
  },
  created() {
    this.isAuthPage = ['login', 'register'].includes(this.$route.name);
  },
};
</script>

<style>
#app {
  height: 100vh;
  display: flex;
  overflow: hidden;
}

#page-content-wrapper {
  transition: margin-left 0.3s, width 0.3s;
  margin-left: 250px;
  width: calc(100% - 250px);
}

#page-content-wrapper.collapsed {
  margin-left: 0;
  width: 100%;
}
</style>
