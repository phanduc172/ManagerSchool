<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container-fluid">
      <button class="btn btn-outline-success" @click="$emit('toggleSidebar')">
        <i class="bi bi-list chevron_color"></i>
      </button>
      <div class="collapse navbar-collapse ms-3" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/dashboard">Bảng điều khiển</a>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link btn btn-outline-primary" href="/login">Đăng nhập</a>
          </li>
          <li class="nav-item ms-2">
            <a class="nav-link btn btn-primary text-white" href="/register">Đăng ký</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
};
</script>

<style scoped>
.chevron_color {
  color:#44B97C;
}
.chevron_color:hover {
  color:#fff;
}
.navbar {
  width: 100%;
}
.nav-link {
  padding: 0.5rem 1rem;
  color: #44B97C;
}
.nav-link:hover {
  color: #176c40;
}

.btn-outline-primary {
  border: 1px solid #44B97C;
  color: #44B97C;
  background-color: transparent;
}

.btn-outline-primary:hover {
  background-color: #44B97C;
  color: #fff;
  border-color: #44B97C;
}

.btn-primary {
  background-color: #44B97C;
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
