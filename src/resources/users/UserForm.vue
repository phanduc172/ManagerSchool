<template>
  <div class="row p-3 m-3">
    <div class="col-md-2 col-lg-3 ms-3 mb-3 d-none d-md-block">
      <b-button href="/manager/users" variant="outline-secondary">
        <i class="bx bx-arrow-back"></i>
        Quay lại
      </b-button>
    </div>
    <div class="col-md-8 col-lg-6 p-4 border rounded shadow-lg bg-white">
      <h4 class="d-block text-center fw-bold text-success">Thêm người dùng</h4>
      <hr />
      <b-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        v-if="show"
        id="formAddUser"
      >
        <b-form-group id="input-group-1" label-for="name" class="mb-2">
          <label for="name" class="mb-2">
            Họ tên <span class="text-danger">*</span></label
          >
          <b-form-input
            id="name"
            class="input"
            v-model="form.name"
            type="text"
            placeholder="Họ và tên"
            @focus="clearError('name')"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.name">
            *
            {{ errors.name }}
          </div>
        </b-form-group>

        <b-form-group id="input-group-2" label-for="email" class="mb-2">
          <label for="email" class="mb-2">
            Email <span class="text-danger">*</span></label
          >
          <b-form-input
            id="email"
            class="input"
            v-model="form.email"
            placeholder="Email"
            @focus="clearError('email')"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.email">
            *
            {{ errors.email }}
          </div>
        </b-form-group>
        <b-form-group id="input-group-3" label-for="phone" class="mb-2">
          <label for="phone" class="mb-2">
            Số điện thoại <span class="text-danger">*</span></label
          >
          <b-form-input
            id="phone"
            class="input"
            v-model="form.phone"
            placeholder="Số điện thoại"
            @focus="clearError('phone')"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.phone">
            *
            {{ errors.phone }}
          </div>
        </b-form-group>

        <b-form-group id="input-group-4" label-for="password" class="mb-2">
          <label for="password" class="mb-2">
            Mật khẩu <span class="text-danger">*</span></label
          >
          <b-form-input
            id="password"
            class="input"
            v-model="form.password"
            type="password"
            placeholder="Nhập mật khẩu..."
            @focus="clearError('password')"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.password">
            *
            {{ errors.password }}
          </div>
        </b-form-group>
        <b-form-group>
          <label for="role" class="mb-2">
            Vai trò <span class="text-danger">*</span></label
          >
          <b-form-select
            id="role"
            v-model="form.role"
            :options="optionsRole"
            @change="clearError('role')"
          ></b-form-select>
          <div class="text-danger mb-2" v-if="errors.role">
            {{ errors.role }}
          </div>
        </b-form-group>
        <div class="text-danger mt-2" v-if="errors.messageError">
          * {{ errors.messageError }}
        </div>
        <b-form-group class="mt-4">
          <b-button type="submit" variant="success me-3">Thêm</b-button>
          <b-button type="reset" variant="outline-secondary">Làm mới</b-button>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>
  
  <script>
import { mapActions } from "vuex/dist/vuex.common.js";
import { validateCreateUserForm } from "../../common/utils/validate";
import { showSuccessMessage } from "../../common/utils/notifications";
export default {
  data() {
    return {
      selected: null,
      optionsRole: [
        { value: null, text: "Chọn vai trò", disabled: true },
        { value: "student", text: "Học sinh" },
        { value: "teacher", text: "Giáo viên" },
        { value: "admin", text: "Quản trị viên" },
      ],
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        role: null,
      },
      errors: {
        name: "",
        email: "",
        phone: "",
        password: "",
        role: " ",
      },
      show: true,
    };
  },
  methods: {
    ...mapActions("user", ["CreateUser"]),
    async onSubmit() {
      try {
        this.errors = validateCreateUserForm(this.form);
        if (Object.keys(this.errors).length > 0) {
          return;
        }
        await this.CreateUser({
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          phone: this.form.phone,
          role_type: this.form.role,
          avatar:
            "http://192.168.1.9:3000/static/images/58ea0c03-c034-4a44-9120-6742ee665bb5.jpg",
        });
        showSuccessMessage();
        this.$router.push({ name: "users" });
      } catch (error) {
        this.errors = {
          messageError: error.response.data.message,
        };
      }
    },
    onReset() {
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      this.form.phone = "";
      this.form.role = null;
      this.show = false;
      this.errors = {
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "",
      };
      this.$nextTick(() => {
        this.show = true;
      });
    },
    clearError(field) {
      this.$set(this.errors, field, "");
    },
  },
  created() {},
};
</script>
  
  <style scoped>
label {
  font-weight: bold;
}
select {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: var(--bs-body-bg);
  background-clip: padding-box;
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>