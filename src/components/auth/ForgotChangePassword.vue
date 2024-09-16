<template>
  <div class="form-container">
    <b-card id="cardLogin" class="scale-in-bl">
      <h3 class="text-center mb-4 text-success">Khôi phục mật khẩu</h3>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Email">
          <b-form-input v-model="email" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="Nhập mật khẩu mới" class="fw-bold mb-2">
          <div class="input-group">
            <b-form-input
              v-model="newPassword"
              :type="passwordFieldType"
              placeholder="Nhập mật khẩu mới"
            ></b-form-input>
            <b-button
              type="button"
              class="eye-icon"
              @click="togglePasswordVisibility"
            >
              <font-awesome-icon :icon="passwordFieldIcon" />
            </b-button>
          </div>
        </b-form-group>

        <b-form-group label="Xác nhận mật khẩu" class="fw-bold mb-2">
          <div class="input-group">
            <b-form-input
              v-model="confirmPassword"
              :type="passwordFieldType"
              placeholder="Xác nhận mật khẩu"
            ></b-form-input>
            <b-button
              type="button"
              class="eye-icon"
              @click="togglePasswordVisibility"
            >
              <font-awesome-icon :icon="passwordFieldIcon" />
            </b-button>
          </div>
        </b-form-group>

        <b-form-group>
          <b-button type="submit" variant="success" class="w-100 mb-3">
            Lưu mật khẩu mới
          </b-button>
        </b-form-group>

        <b-alert v-if="successMessage" variant="success" show>
          {{ successMessage }}
        </b-alert>
        <b-alert v-if="errorMessage" variant="danger" show>
          {{ errorMessage }}
        </b-alert>
      </b-form>
    </b-card>
  </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  props: {
    email: String,
    token: String,
  },
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      passwordFieldType: "password",
      passwordFieldIcon: "eye",
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions("auth", ["handForgotPassword"]),
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
      this.passwordFieldIcon =
        this.passwordFieldType === "password" ? "eye" : "eye-slash";
    },
    async onSubmit() {
      this.successMessage = "";
      this.errorMessage = "";

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Mật khẩu mới và xác nhận mật khẩu không khớp.";
        return;
      }

      const response = await this.handForgotPassword({
        email: this.email,
        otp_token: this.token,
        new_password: this.newPassword,
        confirm_password: this.confirmPassword,
      });

      if (response.status === 200) {
        this.successMessage = "Mật khẩu đã được thay đổi thành công!";
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      }
    },
  },
};
</script>
<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(/src/assets/images/bg.jpg) no-repeat center center;
  background-size: cover;
}

#cardLogin {
  max-width: 500px;
  width: 100%;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.eye-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  color: #5f5f5f;
}

.eye-icon:hover {
  color: #37a571;
}

.btn-success {
  background-color: #44b97c;
  border-color: #44b97c;
  font-weight: bold;
}

.btn-success:hover {
  background-color: #37a571;
  border-color: #37a571;
}
</style>
