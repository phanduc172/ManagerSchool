<template>
  <div class="row p-3 m-3">
    <div
      class="col-md-8 col-lg-6 offset-lg-3 offset-md-2 shadow-sm p-3 border rounded shadow-lg"
    >
      <h4 class="d-block text-center fw-bold text-success">Thêm giáo viên</h4>
      <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
        <b-form-group class="mb-2">
          <label for="id"
            >Mã giáo viên <span class="text-danger">*</span></label
          >
          <b-form-input
            class="mt-2"
            name="id"
            type="text"
            v-model="form.id"
            placeholder="Nhập mã giáo viên"
            @focus="clearError('id')"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.id"> *
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
          <div class="text-danger mb-2" v-if="errors.name"> * 
            {{ errors.name }}
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
            @focus="clearError('birthdate')"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.name"> * 
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
            placeholder="Nhập số điện thoại"
            @focus="clearError('phone')"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.phone"> *
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
          <div class="text-danger mb-2" v-if="errors.address"> *
            {{ errors.address }}
          </div>
        </b-form-group>

        <div class="form-group mb-3">
          <label for="department" class="form-label">Lớp học</label>
          <select id="department" class="form-control">
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

        <div class="form-group mb-3">
          <label for="department" class="form-label">Phòng ban</label>
          <select id="department" class="form-control">
            <option selected disabled>Chọn phòng ban...</option>
            <option
              v-for="department in departmentOptions"
              :key="department"
              :value="department"
            >
              {{ department }}
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
import { getMaxDate, validateFormTeacher } from "../../common/utils/validate";
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        birthdate: "",
        phone: "",
        address: "",
        classes: "",
        department: "",
        checked: [],
      },
      errors: {
        id: "",
        name: "",
        birthdate: "",
        phone: "",
        address: "",
        classes: "",
        department: "",
      },
      departmentOptions: ["Phòng A", "Phòng B", "Phòng C"],
      classesOptions: ["Lớp 1A", "Lớp 2B", "Lớp 3C"],
      show: true,
      maxDate: getMaxDate(),
    };
  },
  methods: {
    onSubmit() {
      this.errors = validateFormTeacher(this.form);
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
      this.form.phone = "";
      this.form.address = "";
      this.form.classes = "";
      this.form.department = "";
      this.form.checked = [];
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    clearError(field) {
      this.$set(this.errors, field, '');
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
</style>