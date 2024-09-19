<template>
  <div :class="['sidebar', { collapsed: collapsed }]">
    <div class="sidebar-heading bg-success text-white">Quản lý Trường học</div>
    <div class="list-group">
      <router-link
        class="list-group-item list-group-item-action"
        :class="{ active: isActive('/profile') }"
        to="/dashboard"
      >
        <i class="bx bxs-dashboard me-2 fs-5"></i>Bảng điều khiển
      </router-link>

      <a
        class="list-group-item list-group-item-action"
        href="#"
        @click.prevent="toggleManage"
      >
        <i class="bx bx-list-ul me-2 fs-5"></i>Quản lý
        <i
          :class="['bi', isManageOpen ? 'bi-chevron-up' : 'bi-chevron-down']"
          class="float-end"
        ></i>
      </a>

      <div v-if="isManageOpen" class="manage-links">
        <router-link
          class="list-group-item list-group-item-action"
          :class="{ active: isActive('/manager/teachers') }"
          to="/manager/teachers"
        >
          Giáo viên
        </router-link>
        <router-link
          class="list-group-item list-group-item-action"
          :class="{ active: isActive('/manager/students') }"
          to="/manager/students"
        >
          Học sinh
        </router-link>
        <router-link
          class="list-group-item list-group-item-action"
          :class="{ active: isActive('/manager/users') }"
          to="/manager/users"
        >
          Người dùng
        </router-link>
        <router-link
          class="list-group-item list-group-item-action"
          :class="{ active: isActive('/manager/restoreuser') }"
          to="/manager/restoreuser"
        >
          Khôi phục người dùng
        </router-link>
        <router-link
          class="list-group-item list-group-item-action"
          :class="{ active: isActive('/manager/subjects') }"
          to="/manager/subjects"
        >
          Môn học
        </router-link>
        <router-link
          class="list-group-item list-group-item-action"
          :class="{ active: isActive('/manager/major') }"
          to="/manager/major"
        >
          Ngành học
        </router-link>
        <router-link
          class="list-group-item list-group-item-action"
          :class="{ active: isActive('/manager/term') }"
          to="/manager/term"
        >
          Học kì
        </router-link>
      </div>

      <router-link
        class="list-group-item list-group-item-action"
        :class="{ active: isActive('/settings') }"
        to="/settings"
      >
        <i class="bx bxs-cog me-2 fs-5"></i> Cài đặt
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isManageOpen: true,
    };
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleManage() {
      this.isManageOpen = !this.isManageOpen;
    },
    isActive(path) {
      return this.$route.path === path;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  transition: transform 0.3s, width 0.3s;
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  transform: translateX(0);
}
.sidebar.collapsed {
  transform: translateX(-100%);
  width: 0;
}
.sidebar .sidebar-heading {
  padding: 16px 18px;
  background-color: #fff;
  border-bottom: 2px solid #2a9d8f;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  font-size: 1.1rem;
  text-align: center;
  color: #44b97c;
  font-weight: bold;
}
.sidebar .list-group-item {
  padding: 1rem;
  color: #44b97c;
  font-weight: 700;
}
.sidebar .list-group-item:hover {
  background-color: #f1f1f1;
}
.manage-links {
  padding-left: 1rem;
}
.manage-links .list-group-item {
  border-left: 2px solid #44b97c;
}
.float-end {
  float: right;
}
.list-group-item.active {
  z-index: 2;
  color: var(--bs-list-group-active-color);
  border-color: #44b97c;
  background-color: #44b97c;
}
.sidebar .list-group-item:hover {
  color: var(--vt-c-white);
  border-color: #44b97c;
  background-color: #44b97c;
}
.list-group-item.active {
  z-index: 2;
  color: #fff;
  border-color: #44b97c;
  background-color: #44b97c;
}
</style>
