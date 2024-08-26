<template>
  <div class="row justify-content-center mt-4">
    <div class="col-md-8 col-lg-6 p-4 border rounded bg-light shadow-sm">
      <h4 class="text-center text-success mb-4">Thêm lớp học</h4>
      <form @submit.prevent="onSubmit" @reset="onReset">
        <div class="form-group mb-3">
          <label for="classId" class="form-label">Mã lớp</label>
          <input
            type="text"
            class="form-control"
            id="classId"
            v-model="form.classId"
            placeholder="Nhập mã lớp"
          />
        </div>
        <div class="form-group mb-3">
          <label for="className" class="form-label">Tên lớp</label>
          <input
            type="text"
            class="form-control"
            id="className"
            v-model="form.className"
            placeholder="Nhập tên lớp"
          />
        </div>

        <div class="form-group mb-3">
          <label for="teacher" class="form-label">Giáo viên chủ nhiệm</label>
          <select id="teacher" class="form-control">
            <option selected disabled>Chọn giáo viên...</option>
            <option
              v-for="teacher in teacherOptions"
              :key="teacher"
              :value="teacher"
            >
              {{ teacher }}
            </option>
          </select>
        </div>

        <div class="form-group mb-4">
          <label for="totalStudents" class="form-label">Tổng số học sinh</label>
          <input
            type="number"
            class="form-control"
            id="totalStudents"
            min="0"
            v-model="form.totalStudents"
            placeholder="Nhập tổng số học sinh"
          />
        </div>

        <div class="form-group d-flex justify-content-end">
          <button type="reset" class="btn btn-secondary me-2">Làm mới</button>
          <button type="submit" class="btn btn-success">Thêm lớp</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
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
      alert(JSON.stringify(this.form));
    },
    onReset() {
      this.form.classId = "";
      this.form.className = "";
      this.form.teacher = null; // Reset this to null
      this.form.totalStudents = "";
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>
