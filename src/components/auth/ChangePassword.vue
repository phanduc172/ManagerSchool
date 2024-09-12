<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-sm">
      <h3 class="text-center mb-4">Thay đổi mật khẩu</h3>
      <form @submit.prevent="onSubmit">
        <b-form-group>
          <label for="oldPassword" class="fw-bold mb-2">
            Nhập mật khẩu cũ <span class="text-danger">*</span>
          </label>
          <div class="input-group">
            <b-form-input
              id="oldPassword"
              v-model="oldPassword"
              :type="passwordFieldType"
              placeholder="Nhập mật khẩu cũ"
              class="password-input"
            ></b-form-input>
            <button
              type="button"
              class="eye-icon"
              @click="togglePasswordVisibility"
            >
              <font-awesome-icon :icon="passwordFieldIcon" />
            </button>
          </div>
        </b-form-group>
        <b-form-group>
          <label for="newPassword" class="fw-bold mb-2">
            Nhập mật khẩu mới <span class="text-danger">*</span>
          </label>
          <div class="input-group">
            <b-form-input
              id="newPassword"
              v-model="newPassword"
              :type="passwordFieldType"
              placeholder="Nhập mật khẩu mới"
              class="password-input"
            ></b-form-input>
            <button
              type="button"
              class="eye-icon"
              @click="togglePasswordVisibility"
            >
              <font-awesome-icon :icon="passwordFieldIcon" />
            </button>
          </div>
        </b-form-group>
        <b-form-group>
          <label for="confirmPassword" class="fw-bold mb-2">
            Xác nhận mật khẩu <span class="text-danger">*</span>
          </label>
          <div class="input-group">
            <b-form-input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="passwordFieldType"
              placeholder="Xác nhận mật khẩu mới"
              class="password-input"
            ></b-form-input>
            <button
              type="button"
              class="eye-icon"
              @click="togglePasswordVisibility"
            >
              <font-awesome-icon :icon="passwordFieldIcon" />
            </button>
          </div>
        </b-form-group>
        <!-- Nút lưu thay đổi -->
        <b-form-group>
          <b-button type="submit" variant="success" class="w-100">
            Lưu thay đổi
          </b-button>
        </b-form-group>
        <!-- Thông báo thành công hoặc lỗi -->
        <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { showSuccessMessage } from "../../common/utils/notifications";

export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      passwordFieldType: "password",
      passwordFieldIcon: "eye",
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions("auth", ["handleChangePassword"]),
    async onSubmit() {
      this.successMessage = "";
      this.errorMessage = "";

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Mật khẩu mới và xác nhận mật khẩu không khớp.";
        return;
      }

      try {
        const response = await this.handleChangePassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        });

        if (response.status === 200) {
          this.successMessage = response.message;
          showSuccessMessage();
          this.$router.push("/dashboard");
        }
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
      this.passwordFieldIcon =
        this.passwordFieldType === "password" ? "eye" : "eye-slash";
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 500px;
  margin: auto;
  border-radius: 0.75rem;
  padding: 2rem;
}

.card h3 {
  color: #44b97c;
  font-weight: bold;
}

.card .form-group {
  margin: 10px;
}

.input-group {
  position: relative;
}

.password-input {
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
}

.password-input:focus {
  border-color: #44b97c;
  box-shadow: 0 0 0 0.25rem rgba(68, 185, 124, 0.25);
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
