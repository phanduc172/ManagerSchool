<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <b-card id="cardLogin" class="scale-in-bl p-3">
      <h3 class="text-center mb-3 text-success">Khôi phục mật khẩu</h3>
      <b-form @submit.prevent="onSubmit">
        <b-form-group class="mb-2">
          <label for="email" class="fw-bold mb-2">
            Email<span class="text-danger">*</span>
          </label>
          <b-form-input v-model="email" disabled></b-form-input>
        </b-form-group>

        <b-form-group class="fw-bold mb-2">
          <label for="newPassword" class="fw-bold mb-2">
            Nhập mật khẩu mới<span class="text-danger">*</span>
          </label>
          <div class="input-container">
            <b-form-input
              id="newPassword"
              v-model="form.newPassword"
              :type="newPasswordFieldType"
              placeholder="Nhập mật khẩu mới"
              @focus="clearError('newPassword')"
            ></b-form-input>
            <b-button
              type="button"
              class="eye-icon"
              variant="bg-none"
              @click="toggleNewPasswordVisibility"
            >
              <font-awesome-icon :icon="newPasswordFieldIcon" />
            </b-button>
          </div>
          <div class="text-danger mt-2" v-if="errors.newPassword">
            * {{ errors.newPassword }}
          </div>
        </b-form-group>

        <b-form-group class="fw-bold mb-2">
          <label for="confirmPassword" class="fw-bold mb-2">
            Xác nhận mật khẩu<span class="text-danger">*</span>
          </label>
          <div class="input-container">
            <b-form-input
              id="confirmPassword"
              v-model="form.confirmPassword"
              :type="confirmPasswordFieldType"
              placeholder="Xác nhận mật khẩu"
              @focus="clearError('confirmPassword')"
            ></b-form-input>
            <b-button
              type="button"
              class="eye-icon"
              variant="bg-none"
              @click="toggleConfirmPasswordVisibility"
            >
              <font-awesome-icon :icon="confirmPasswordFieldIcon" />
            </b-button>
          </div>
          <div class="text-danger mt-2" v-if="errors.confirmPassword">
            * {{ errors.confirmPassword }}
          </div>
        </b-form-group>
        <div class="alert alert-danger" v-if="errors.messageError">
          * {{ errors.messageError }}
        </div>

        <b-form-group>
          <b-button type="submit" variant="success" class="w-100 my-2">
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
import { validateRecoverPasswordForm } from "../../common/utils/validate";

export default {
  props: {
    email: String,
    token: String,
  },
  data() {
    return {
      form: {
        newPassword: "",
        confirmPassword: "",
      },
      errors: {
        newPassword: "",
        confirmPassword: "",
      },
      newPasswordFieldType: "password",
      newPasswordFieldIcon: "eye",
      confirmPasswordFieldType: "password",
      confirmPasswordFieldIcon: "eye",
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions("auth", ["handForgotPassword"]),
    async onSubmit() {
      try {
        this.errors = validateRecoverPasswordForm(this.form);
        if (Object.keys(this.errors).length > 0) {
          return;
        }
        this.successMessage = "";
        this.errorMessage = "";

        if (this.newPassword !== this.confirmPassword) {
          this.errorMessage = "Mật khẩu mới và xác nhận mật khẩu không khớp.";
          return;
        }

        const response = await this.handForgotPassword({
          email: this.email,
          otp_token: this.token,
          new_password: this.form.newPassword,
          confirm_password: this.form.confirmPassword,
        });

        if (response.status === 200) {
          this.successMessage = "Mật khẩu đã được thay đổi thành công!";
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        }
      } catch (error) {
        this.errors = {
          messageError: error.response.data.message,
        };
      }
    },
    clearError(field) {
      this.$set(this.errors, field, "");
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
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/animations.scss";
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/font.scss";

#page-content-wrapper {
  margin: 0;
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
.input-container {
  position: relative;
  width: 100%;
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
  color: $gray;
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
.form-control:focus {
  border-color: #5a5a5a;
  box-shadow: none;
  border-color: #41b883;
}
.form-control:focus::placeholder {
  color: #41b883;
}
</style>
