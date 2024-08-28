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
          <label for="teacher" class="form-label"
            >Giáo viên chủ nhiệm <span class="text-danger">*</span></label
          >
          <select
            id="teacher"
            class="form-control"
            v-model="form.teacher"
            @change="clearError('teacher')"
          >
            <option selected disabled>Chọn giáo viên...</option>
            <option
              v-for="teacher in teacherOptions"
              :key="teacher"
              :value="teacher"
            >
              {{ teacher }}
            </option>
          </select>
          <div class="text-danger mb-2" v-if="errors.teacher">
            *
            {{ errors.teacher }}
          </div>
        </div>

        <div class="form-group mb-4 d-none">
          <label for="totalStudents" class="form-label">Tổng số học sinh</label>
          <input
            type="number"
            class="form-control"
            id="totalStudents"
            min="0"
            v-model="form.totalStudents"
            placeholder="Nhập tổng số học sinh"
            @focus="clearError('totalStudents')"
          />
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
        teacher: null,
        totalStudents: "",
      },
      errors: {
        classId: "",
        className: "",
        teacher: null,
        totalStudents: "",
      },
      teacherOptions: ["Nguyễn Văn A", "Trần Thị B", "Phạm Văn C"],
    };
  },
  methods: {
    onSubmit() {
      // Gọi hàm validate và cập nhật errors
      this.errors = validateFormClass(this.form);

      // Kiểm tra nếu có lỗi
      if (Object.keys(this.errors).length > 0) {
        console.log("Form contains errors:", this.errors);
        return;
      }

      // Hiển thị alert khi không có lỗi
      alert(JSON.stringify(this.form));
    },
    onReset() {
      this.form.classId = "";
      this.form.className = "";
      this.form.teacher = null;
      this.form.totalStudents = "";

      this.errors = {
        classId: "",
        className: "",
        teacher: null,
        totalStudents: "",
      };
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
