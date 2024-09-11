<template>
  <nav
    class="navbar navbar-expand navbar-light bg-success border-bottom shadow-sm"
  >
    <div class="container-fluid">
      <button class="btn btn-outline-success" @click="$emit('toggleSidebar')">
        <i class="bi bi-list chevron_color text-white fs-5"></i>
      </button>
      <div class="collapse navbar-collapse ms-3" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link text-white" href="/dashboard">Bảng điều khiển</a>
          </li>
        </ul>
        <ul v-if="!profile || !profile.token" class="navbar-nav ms-auto">
          <img
            :src="profile.avatar"
            alt="Admin"
            class="rounded-circle border"
            style="
              cursor: pointer;
              width: 40px;
              height: 40px;
              object-fit: cover;
            "
          />
          <b-dropdown
            :text="profile ? profile.name : ''"
            variant="transparent text-white fw-bold"
          >
            <b-dropdown-item href="changepassword"
              >Đổi mật khẩu</b-dropdown-item
            >
            <b-dropdown-item @click="logout">Đăng xuất</b-dropdown-item>
          </b-dropdown>
        </ul>
        <ul v-else class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link btn btn-outline-primary" href="/login"
              >Đăng nhập</a
            >
          </li>
          <li class="nav-item ms-2">
            <a class="nav-link btn btn-primary text-white" href="/register"
              >Đăng ký</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["profile"]),
  },
  methods: {
    ...mapActions("auth", ["handleLogout"]),
    async logout() {
      await this.handleLogout();
      this.$router.push("/login");
    },
  },
};
</script>



<style scoped>
.chevron_color {
  color: #44b97c;
}
.chevron_color:hover {
  color: #fff;
}
.navbar {
  width: 100%;
}
.nav-link {
  padding: 0.5rem 1rem;
  color: #44b97c;
  font-weight: 500;
}
.nav-link:hover {
  color: #176c40;
}

.btn-outline-primary {
  border: 1px solid #44b97c;
  color: #44b97c;
  background-color: transparent;
}

.btn-outline-primary:hover {
  background-color: #44b97c;
  color: #fff;
  border-color: #44b97c;
}

.btn-primary {
  background-color: #44b97c;
  border: none;
  color: #fff;
}

.btn-primary:hover {
  background-color: #237f4f;
  color: #fff;
}

.btn:first-child:active {
  background-color: var(--vt-c-green);
  border-color: var(--vt-c-green);
}
</style>
