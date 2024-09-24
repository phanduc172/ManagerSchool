<template>
  <div class="row p-3 m-3">
    <div class="col-2 mb-3 d-none d-md-block">
      <b-button href="/manager/students" variant="success">
        <i class="bx bx-arrow-back"></i>
      </b-button>
    </div>
    <div
      class="col-sm-8 offset-sm-2 col-md-6 offset-md-2 col-lg-5 offset-lg-2 p-4 border rounded shadow-lg bg-white"
    >
      <h4 class="d-block text-center fw-bold text-success">
        {{ isEdit ? "Cập nhật học sinh" : "Thêm học sinh" }}
      </h4>
      <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
        <b-form-group class="mb-2">
          <label for="name">Họ tên <span class="text-danger">*</span></label>
          <b-form-input
            class="mt-2"
            name="name"
            type="text"
            v-model="form.name"
            placeholder="Nhập họ tên"
            @focus="clearError('name')"
          ></b-form-input>
          <div class="text-danger" v-if="errors.name">
            *
            {{ errors.name }}
          </div>
        </b-form-group>
        <b-form-group id="input-group-2" label-for="email" class="mb-2">
          <label for="email" class="mb-2">
            Email<span class="text-danger fw-bold">*</span></label
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
        <b-form-group id="input-group-4" label-for="password" class="mb-2">
          <label for="password" class="mb-2">
            Mật khẩu<span class="text-danger fw-bold">*</span></label
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

        <b-form-group class="mb-2">
          <label for="gender"
            >Giới tính<span class="text-danger">*</span></label
          >
          <b-form-select
            class="mt-2"
            id="gender"
            v-model="form.gender"
            :options="optionsGender"
            @change="clearError('gender')"
          ></b-form-select>
          <div class="text-danger" v-if="errors.gender">
            *
            {{ errors.gender }}
          </div>
        </b-form-group>

        <b-form-group class="mb-2">
          <label for="birthdate">
            Ngày sinh <span class="text-danger">*</span>
          </label>
          <b-form-input
            class="mt-2"
            name="birthdate"
            v-model="formattedBirthdate"
            type="date"
            :max="maxDate"
            @change="clearError('birthdate')"
          ></b-form-input>
          <div class="text-danger" v-if="errors.birthdate">
            * {{ errors.birthdate }}
          </div>
        </b-form-group>

        <b-form-group class="mb-2">
          <label for="phone"
            >Số điện thoại <span class="text-danger">*</span></label
          >
          <b-form-input
            class="mt-2"
            name="phone"
            v-model="form.phone"
            type="text"
            placeholder="Nhập số điện thoại..."
            @focus="clearError('phone')"
          ></b-form-input>
          <div class="text-danger" v-if="errors.phone">
            *
            {{ errors.phone }}
          </div>
        </b-form-group>

        <b-form-group class="mb-2">
          <label for="address"
            >Địa chỉ <span class="text-danger">*</span></label
          >
          <b-form-input
            class="mt-2"
            name="address"
            v-model="form.address"
            type="text"
            placeholder="Nhập địa chỉ"
            @focus="clearError('address')"
          ></b-form-input>
          <div class="text-danger" v-if="errors.address">
            *
            {{ errors.address }}
          </div>
        </b-form-group>
        <b-form-group class="mt-4">
          <b-button type="submit" variant="success me-3 w-100">{{
            isEdit ? "Cập nhật" : "Thêm"
          }}</b-button>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getMaxDate } from "../../common/utils/validate";
import { showSuccessMessage } from "../../common/utils/notifications";
import { validateFormStudent } from "../../common/utils/validate";
import moment from "moment";
export default {
  data() {
    return {
      optionsGender: [
        { value: null, text: "Chọn giới tính", disabled: true },
        { value: "1", text: "Nam" },
        { value: "2", text: "Nữ" },
        { value: "3", text: "Khác" },
      ],
      form: {
        id: "",
        name: "",
        email: "",
        password: "",
        birthdate: null,
        gender: null,
        phone: "",
        address: "",
      },
      errors: {
        id: "",
        name: "",
        email: "",
        password: "",
        birthdate: null,
        gender: "",
        phone: "",
        address: "",
      },

      show: true,
      isEdit: false,
      maxDate: getMaxDate,
    };
  },
  methods: {
    ...mapActions("student", ["getStudentById", "UpdateStudent"]),
    ...mapActions("user", ["CreateUser"]),
    toVNTime(time) {
      return moment(time).utc(7).format("DD-MM-YYYY");
    },
    async onSubmit() {
      try {
        this.errors = validateFormStudent(this.form);
        if (Object.keys(this.errors).length > 0) {
          return;
        }
        const data = {
          name: this.form.name,
          gender: this.form.gender,
          email: this.form.email,
          password: this.form.password,
          phone: this.form.phone,
          address: this.form.address,
          role_type: "student",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s",
        };
        console.log("Payload", data);
        console.log("isEdit:", this.isEdit);
        if (this.isEdit) {
          await this.UpdateStudent({ data, id: this.$route.params.id });
          console.log("Cập nhật thành công");
          showSuccessMessage();
        } else {
          await this.CreateUser(data);
          console.log("Tạo thành công");
          showSuccessMessage();
        }
        this.$router.push({ name: "students" });
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.message
          : "Đã xảy ra lỗi trên máy chủ.";
      }
    },
    async getDetailStudent() {
      const id = this.$route.params.id;
      this.isEdit = true;
      const response = await this.getStudentById(id);
      this.setFormEdit(response.data);
      console.log("Chi tiết học sinh: ", response.data);
    },
    setFormEdit(student) {
      this.form.id = student.Id;
      this.form.name = student.name;
      this.form.email = student.email;
      this.form.gender = student.gender;
      this.form.birthdate = student.date_of_birth;
      this.form.phone = student.phone;
      this.form.address = student.address;
      this.isEdit = true;
    },
    onReset(event) {
      event.preventDefault();
      this.form.id = "";
      this.form.name = "";
      this.form.birthdate = "";
      this.form.email = "";
      this.form.address = "";
      this.form.checked = [];
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    clearError(field) {
      this.$set(this.errors, field, "");
    },
  },
  computed: {
    formattedBirthdate: {
      get() {
        if (!this.form.birthdate) return "";
        return moment(this.form.birthdate).format("YYYY-MM-DD");
      },
      set(value) {
        this.form.birthdate = moment(value, "YYYY-MM-DD").toISOString();
      },
    },
  },
  created() {
    this.maxDate = getMaxDate();
    if (this.$route.params.id) {
      this.isEdit = true;
      this.getDetailStudent();
    }
  },
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
select:focus-visible {
  border: none;
  box-shadow: none;
}
</style>
