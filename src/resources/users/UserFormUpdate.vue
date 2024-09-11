<template>
  <div class="row p-3 m-3">
    <div
      class="col-md-8 col-lg-6 offset-lg-3 offset-md-2 p-3 border rounded shadow-lg bg-white"
    >
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
          <label for="typeRole" class="mb-2">
            Vai trò <span class="text-danger">*</span></label
          >
        </b-form-group>

        <b-form-select
          v-model="selected"
          :options="optionsRole"
        ></b-form-select>
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
      ],
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        typeRole: "",
      },
      errors: {
        name: "",
        email: "",
        phone: "",
        password: "",
      },
      show: true,
    };
  },
  methods: {
    ...mapActions("user", ["CreateUser", "getUserById"]),
    async onSubmit() {
      this.errors = validateCreateUserForm(this.form);
      if (Object.keys(this.errors).length > 0) {
        return;
      }
      await this.CreateUser({
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
        phone: this.form.phone,
        role_type: "student",
        avatar:
          "http://localhost:3000/static/images/58ea0c03-c034-4a44-9120-6742ee665bb5.jpg",
      });
      showSuccessMessage();
      this.$router.push({ name: "users" });
    },
    async getDetailUser() {
      if (this.$route.params.id) {
        const response = await this.getUserById(this.$route.params.id);
        this.setFormForEdit(response.data);
        console.log("Set form", response.data);
      }
    },
    setFormForEdit(user) {
      this.form.name = user.name;
      this.form.email = user.email;
      this.form.phone = user.phone;
      this.form.password = user.password;
      this.form.typeRole = user.role_type;
    },

    onReset() {
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      this.form.phone = "";
      this.show = false;
      this.errors = {
        name: "",
        email: "",
        password: "",
        phone: "",
      };
      this.$nextTick(() => {
        this.show = true;
      });
    },
    clearError(field) {
      this.$set(this.errors, field, "");
    },
  },
  created() {
    this.getDetailUser();
  },
};
</script>
  
  <style scoped>
label {
  font-weight: bold;
}
</style>