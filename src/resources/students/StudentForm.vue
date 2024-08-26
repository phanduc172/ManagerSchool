<template>
  <div class="row p-3 m-3">
    <div
      class="col-md-8 offset-md-2 col-lg-6 offset-lg-3 p-3 border rounded shadow-lg bg-white"
    >
      <h4 class="d-block text-center fw-bold text-success">Thêm học sinh</h4>
      <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
        <b-form-group class="mb-2">
          <label for="id"
            >Mã sinh viên <span class="text-danger">*</span></label
          >
          <b-form-input
            class="mt-2"
            name="id"
            type="text"
            v-model="form.id"
            placeholder="Nhập mã sinh viên"
            @focus="clearError('id')"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.id">
            *
            {{ errors.id }}
          </div>
        </b-form-group>

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
          <div class="text-danger mb-2" v-if="errors.name">
            *
            {{ errors.name }}
          </div>
        </b-form-group>

        <b-form-group class="mb-2">
          <label for="gender"
            >Giới tính<span class="text-danger">*</span></label
          >
          <b-form-select
            id="gender"
            v-model="form.gender"
            :options="optionsGender"
            @change="clearError('gender')"
          ></b-form-select>
          <div class="text-danger mb-2" v-if="errors.gender">
            *
            {{ errors.gender }}
          </div>
        </b-form-group>

        <b-form-group class="mb-2">
          <label for="birthdate"
            >Ngày sinh <span class="text-danger">*</span></label
          >
          <b-form-input
            class="mt-2"
            name="birthdate"
            v-model="form.birthdate"
            type="date"
            :max="maxDate"
            @change="clearError('birthdate')"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.birthdate">
            *
            {{ errors.birthdate }}
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
            @focus="clearError('phone')"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.phone">
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
          <div class="text-danger mb-2" v-if="errors.address">
            *
            {{ errors.address }}
          </div>
        </b-form-group>
        <div class="form-group mb-3">
          <label for="classes" class="form-label">Lớp học</label>
          <select id="deparclassestment" class="form-control">
            <option selected disabled>Chọn lớp học...</option>
            <option
              v-for="classes in classesOptions"
              :key="classes"
              :value="classes"
            >
              {{ classes }}
            </option>
          </select>
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
import { getMaxDate, validateFormStudent } from "../../common/utils/validate";
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        gender: null,
        phone: "",
        address: "",
        classes: "",
        checked: [],
      },
      optionsGender: [
        { value: null, text: "Chọn giới tính", disabled: true },
        { value: "male", text: "Nam" },
        { value: "female", text: "Nữ" },
        { value: "other", text: "Khác" },
      ],
      errors: {
        id: "",
        name: "",
        gender: "",
        phone: "",
        address: "",
        classes: "",
      },
      classesOptions: ["Lớp 1A", "Lớp 2B", "Lớp 3C"],
      show: true,
      maxDate: getMaxDate,
    };
  },
  methods: {
    onSubmit() {
      this.errors = validateFormStudent(this.form);
      if (Object.keys(this.errors).length > 0) {
        return;
      }
      alert(JSON.stringify(this.form));
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
  created() {
    this.maxDate = getMaxDate();
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
</style>