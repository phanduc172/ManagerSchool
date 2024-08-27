<template>
    <div class="row justify-content-center mt-5">
      <div class="col-md-8 col-lg-6 p-4 border rounded shadow-lg bg-white">
        <h4 class="text-center text-success mb-4">Thêm môn học</h4>
        <form @submit.prevent="onSubmit" @reset="onReset">
          <div class="form-group mb-3">
            <label for="subjectId" class="form-label">Mã môn học <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              id="subjectId"
              v-model="form.subjectId"
              placeholder="Nhập mã lớp"
            />
          </div>
          <div class="form-group mb-3">
            <label for="subjectName" class="form-label">Tên môn học <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              id="subjectName"
              v-model="form.subjectName"
              placeholder="Nhập tên lớp"
            />
          </div>
  
          <div class="form-group mb-3">
            <label for="teacher" class="form-label">Giáo viên chủ nhiệm <span class="text-danger">*</span></label>
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
          <div class="form-group d-flex justify-content-start">
            <button type="submit" class="btn btn-success me-2">Thêm lớp</button>
            <button type="reset" class="btn btn-outline-secondary">Làm mới</button>
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
          subjectId: "",
          subjectName: "",
          teacher: null,
        },
        teacherOptions: ["Nguyễn Văn A", "Trần Thị B", "Phạm Văn C"],
      };
    },
    methods: {
      onSubmit() {
        alert(JSON.stringify(this.form));
      },
      onReset() {
        this.form.subjectId = "";
        this.form.subjectName = "";
        this.form.teacher = null;
      },
    },
  };
  </script>
  
  <style scoped>
  label {
    font-weight: bold;
  }
  </style>
  