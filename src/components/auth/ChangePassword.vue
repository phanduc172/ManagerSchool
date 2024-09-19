<template>
  <div class="container mt-5 m-0">
    <div class="col-md-3 ms-3 mb-3 d-none d-md-block">
      <b-button href="/manager/subjects" variant="outline-secondary ">
        <i class="bx bx-arrow-back pill"></i>
      </b-button>
    </div>
    <div class="col-12 col-sm-10 col-md-8 offset-sm-3 offset">
      <div class="card p-3 shadow-sm">
        <h3 class="text-center mb-4">Thay đổi mật khẩu</h3>
        <form @submit.prevent="onSubmit">
          <b-form-group>
            <label for="oldPassword" class="fw-bold mb-2">
              Nhập mật khẩu cũ <span class="text-danger">*</span>
            </label>
            <div class="input-group">
              <b-form-input
                id="oldPassword"
                v-model="form.oldPassword"
                :type="oldPasswordFieldType"
                placeholder="Nhập mật khẩu cũ"
                class="password-input"
                @focus="clearError('oldPassword')"
              ></b-form-input>
              <button
                type="button"
                class="eye-icon"
                @click="toggleOldPasswordVisibility"
              >
                <font-awesome-icon :icon="oldPasswordFieldIcon" />
              </button>
            </div>
            <div class="text-danger mt-2" v-if="errors.oldPassword">
              * {{ errors.oldPassword }}
            </div>
          </b-form-group>

          <b-form-group>
            <label for="newPassword" class="fw-bold mb-2">
              Nhập mật khẩu mới <span class="text-danger">*</span>
            </label>
            <div class="input-group">
              <b-form-input
                id="newPassword"
                v-model="form.newPassword"
                :type="newPasswordFieldType"
                placeholder="Nhập mật khẩu mới"
                class="password-input"
                @focus="clearError('newPassword')"
              ></b-form-input>
              <button
                type="button"
                class="eye-icon"
                @click="toggleNewPasswordVisibility"
              >
                <font-awesome-icon :icon="newPasswordFieldIcon" />
              </button>
            </div>
            <div class="text-danger mt-2" v-if="errors.newPassword">
              * {{ errors.newPassword }}
            </div>
          </b-form-group>

          <b-form-group>
            <label for="confirmPassword" class="fw-bold mb-2">
              Xác nhận mật khẩu <span class="text-danger">*</span>
            </label>
            <div class="input-group">
              <b-form-input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="confirmPasswordFieldType"
                placeholder="Xác nhận mật khẩu mới"
                class="password-input"
                @focus="clearError('confirmPassword')"
              ></b-form-input>
              <button
                type="button"
                class="eye-icon"
                @click="toggleConfirmPasswordVisibility"
              >
                <font-awesome-icon :icon="confirmPasswordFieldIcon" />
              </button>
            </div>
            <div class="text-danger mt-2" v-if="errors.confirmPassword">
              * {{ errors.confirmPassword }}
            </div>
          </b-form-group>

          <b-form-group>
            <b-button type="submit" variant="success" class="w-100">
              Lưu thay đổi
            </b-button>
          </b-form-group>

          <div v-if="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { showSuccessMessage } from "../../common/utils/notifications";
import { validateChangePasswordForm } from "../../common/utils/validate";

export default {
  data() {
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      errors: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      oldPasswordFieldType: "password",
      oldPasswordFieldIcon: "eye",
      newPasswordFieldType: "password",
      newPasswordFieldIcon: "eye",
      confirmPasswordFieldType: "password",
      confirmPasswordFieldIcon: "eye",
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions("auth", ["handleChangePassword"]),

    async onSubmit() {
      this.errors = validateChangePasswordForm(this.form);
      if (Object.keys(this.errors).length > 0) {
        return;
      }
      this.successMessage = "";
      this.errorMessage = "";
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Mật khẩu mới và xác nhận mật khẩu không khớp.";
        return;
      }

      const response = await this.handleChangePassword({
        oldPassword: this.form.oldPassword,
        newPassword: this.form.newPassword,
        confirmPassword: this.form.confirmPassword,
      });

      if (response.status === 200) {
        this.successMessage = response.message;
        showSuccessMessage();
        this.$router.push({ name: "dashboard" });
      }
    },

    toggleOldPasswordVisibility() {
      this.oldPasswordFieldType =
        this.oldPasswordFieldType === "password" ? "text" : "password";
      this.oldPasswordFieldIcon =
        this.oldPasswordFieldType === "password" ? "eye" : "eye-slash";
    },
    toggleNewPasswordVisibility() {
      this.newPasswordFieldType =
        this.newPasswordFieldType === "password" ? "text" : "password";
      this.newPasswordFieldIcon =
        this.newPasswordFieldType === "password" ? "eye" : "eye-slash";
    },
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordFieldType =
        this.confirmPasswordFieldType === "password" ? "text" : "password";
      this.confirmPasswordFieldIcon =
        this.confirmPasswordFieldType === "password" ? "eye" : "eye-slash";
    },

    clearError(field) {
      this.$set(this.errors, field, "");
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
  box-shadow: none;
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
  z-index: 5;
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
