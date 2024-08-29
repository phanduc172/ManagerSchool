<template>
  <div :class="['sidebar', { 'collapsed': collapsed }]">
    <div class="sidebar-heading">Quản lý Trường học</div>
    <div class="list-group">
      <a class="list-group-item list-group-item-action" href="/profile">
        <font-awesome-icon :icon="['fas', 'user']" class="me-2 fs-5"/>Hồ sơ cá nhân</a>
      <a 
        class="list-group-item list-group-item-action" 
        href="manage" 
        @click.prevent="toggleManage"
        :class="{ 'active': isManageOpen }"
      >
      <i class='bx bx-list-ul me-2 fs-5'></i>Quản lý
        <i :class="['bi', isManageOpen ? 'bi-chevron-up' : 'bi-chevron-down']" class="float-end"></i>
      </a>
      <div v-if="isManageOpen" class="manage-links">
        <a class="list-group-item list-group-item-action" href="/manager/teachers">Giáo viên</a>
        <a class="list-group-item list-group-item-action" href="/manager/students">Học sinh</a>
        <a class="list-group-item list-group-item-action" href="/manager/users">Người dùng</a>
        <a class="list-group-item list-group-item-action" href="/manager/classes">Lớp học</a>
        <a class="list-group-item list-group-item-action" href="/manager/subjects">Môn học</a>
        <a class="list-group-item list-group-item-action" href="/manager/major">Ngành học</a>
      </div>
      <a class="list-group-item list-group-item-action" href="settings">
        <i class='bx bxs-cog me-2 fs-5' ></i>
        Cài đặt
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isManageOpen: false,
    }
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
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f8f9fa;
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
  padding: 14px 18px;
    /* background-color: #e9ecef; */
    background-color: #fff;
    border-bottom: 2px solid #2a9d8f;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    letter-spacing: 0.8px;
    text-transform: uppercase;
    font-size: 1.1rem;
    text-align: center;
    color: #44B97C;
    font-weight: bold;
}
.sidebar .list-group-item {
  padding: 1rem;
  color: #44B97C;
  font-weight: 500;
}
.sidebar .list-group-item:hover {
  background-color: #f1f1f1;
}
.manage-links {
  padding-left: 1rem;
}
.manage-links .list-group-item {
  border-left: 2px solid #44B97C; 
}
.float-end {
  float: right;
}
.list-group-item.active {
    z-index: 2;
    color: var(--bs-list-group-active-color);
    border-color: #44B97C;
    background-color: #44B97C;
}
.sidebar .list-group-item:hover {
  color: var(--vt-c-white);
  border-color: #44B97C;
  background-color: #44B97C;
}
</style>