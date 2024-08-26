<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-8 col-lg-6 p-4 border rounded shadow-lg bg-white">
      <h4 class="text-center text-success mb-4">Thêm lớp học</h4>
      <form @submit.prevent="onSubmit" @reset="onReset">
        <div class="form-group mb-3">
          <label for="classId" class="form-label"
            >Mã lớp <span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            id="classId"
            v-model="form.classId"
            placeholder="Nhập mã lớp"
            @focus="clearError('classId')"
          />
          <div class="text-danger mb-2" v-if="errors.classId">
            *
            {{ errors.classId }}
          </div>
        </div>
        <div class="form-group mb-3">
          <label for="className" class="form-label"
            >Tên lớp <span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            id="className"
            v-model="form.className"
            placeholder="Nhập tên lớp"
            @focus="clearError('className')"
          />
          <div class="text-danger mb-2" v-if="errors.className">
            *
            {{ errors.className }}
          </div>
        </div>

        <div class="form-group mb-3">
          <label for="teacher" class="form-label">
            Giáo viên chủ nhiệm <span class="text-danger">*</span>
          </label>
          <select
            id="teacher"
            class="form-control"
            v-model="form.teacher"
            @change="clearError('teacher')"
          >
            <option value="" disabled>Chọn giáo viên...</option>
            <option
              v-for="teacher in teacherOptions"
              :key="teacher"
              :value="teacher"
            >
              {{ teacher }}
            </option>
          </select>
          <div class="text-danger mb-2" v-if="errors.teacher">
            * {{ errors.teacher }}
          </div>
        </div>
        <div class="form-group d-flex justify-content-start">
          <button type="submit" class="btn btn-success me-2">Thêm lớp</button>
          <button type="reset" class="btn btn-outline-secondary">
            Làm mới
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { validateFormClass } from "../../common/utils/validate";
export default {
  data() {
    return {
      form: {
        classId: "",
        className: "",
        teacher: "",
      },
      errors: {
        classId: "",
        className: "",
        teacher: null,
      },
      teacherOptions: ["Nguyễn Văn A", "Trần Thị B", "Phạm Văn C"],
    };
  },
  methods: {
    onSubmit() {
      this.errors = validateFormClass(this.form);
      if (Object.keys(this.errors).length > 0) {
        return;
      }
      alert(JSON.stringify(this.form));
      this.onReset();
    },
    onReset() {
      form.classId = "";
      form.className = "";
      form.teacher = null;
    },
    clearError(field) {
      this.$set(this.errors, field, "");
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>
