<template>
  <div class="main-wrapper">
    <div class="preloader">
      <div class="lds-ripple">
        <div class="lds-pos"></div>
        <div class="lds-pos"></div>
      </div>
    </div>
    <div class="error-box">
      <div class="error-body text-center">
        <h1 class="error-title">404</h1>
        <h3 class="text-uppercase error-subtitle">PAGE NOT FOUND !</h3>
        <p class="text-muted mb-4 mt-4">
          YOU SEEM TO BE TRYING TO FIND HIS WAY HOME
        </p>
        <a
          href="/dashboard"
          class="btn btn-info btn-rounded waves-effect waves-light mb-4 text-white"
          >Back to home</a
        >
      </div>
      <footer class="footer text-center w-100">
        Copyright © 2024. Designed by Phan Đức
      </footer>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>