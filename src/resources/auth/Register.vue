<template>
  <b-container
    id="mainContainer"
    class="d-flex justify-content-center align-items-center vh-100"
  >
    <div class="w-50 w-100-sm">
      <register-form @submit="onSubmitRegister" ref="registerform" />
    </div>
    <!-- <b-col md="5">
        <b-img
          :src="require('@/assets/images/business-like.png')"
          fluid
          class="businessImg scale-in-bottom"
          center
        />
      </b-col> -->
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
import RegisterForm from "../../components/auth/RegisterForm.vue";
import { showSuccessMessage } from "../../common/utils/notifications";

export default {
  components: {
    RegisterForm,
  },
  methods: {
    ...mapActions("auth", ["handleRegister"]),
    async onSubmitRegister({ username, email, password, role_type }) {
      await this.handleRegister({ username, email, password, role_type });
      showSuccessMessage();
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
  background: url("../../assets/images/bg.jpg");
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