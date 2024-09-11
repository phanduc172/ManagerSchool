<template>
  <b-container
    id="mainContainer"
    class="d-flex justify-content-center align-items-center vh-100"
  >
    <div class="w-50 w-100-sm">
      <login-form @submit.prevent="onSubmitLogin" ref="loginform" />
    </div>
  </b-container>
</template>
  

<script>
import { mapActions } from "vuex";
import LoginForm from "@/components/auth/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
  methods: {
    ...mapActions("auth", ["handleLogin"]),
    async onSubmitLogin({ email, password }) {
      await this.handleLogin({ email, password });
    },
  },
};
</script>

<style lang="scss">
#mainContainer {
  width: 100%;
  height: auto;
  position: relative;
}
#page-content-wrapper {
  margin: 0;
  background: url("@/assets/images/bg.jpg") no-repeat center center;
  background-size: cover;
}
.w-100-sm {
  @media (max-width: 992px) {
    width: 70% !important;
  }
  @media (max-width: 450px) {
    width: 1000% !important;
    padding: 5px;
  }
}
</style>