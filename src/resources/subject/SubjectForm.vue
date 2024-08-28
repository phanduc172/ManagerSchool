<template>
  <div class="row justify-content-center mt-2">
    <div class="d-flex justify-content-between align-items-center my-3 ms-5">
      <b-button href="/manager/subjects" variant="outline-secondary">
        <i class="bx bx-arrow-back"></i>
        Quay lại
      </b-button>
    </div>
    <div class="col-md-8 col-lg-6 p-4 border rounded shadow-lg bg-white">
      <h4 class="text-center text-success mb-4">{{ isEdit ? 'Cập nhật môn học' : 'Thêm môn học' }}</h4>
      <form @submit.prevent="onSubmit" @reset="onReset">
        <div class="form-group mb-3">
          <label for="subjectCode" class="form-label">
            Mã môn học <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="subjectCode"
            v-model="form.subjectCode"
            :placeholder="isEdit ? 'Mã môn học không thể thay đổi' : 'Nhập mã môn học'"
            :readonly="isEdit"
          />
        </div>
        <div class="form-group mb-3">
          <label for="subjectName" class="form-label">
            Tên môn học <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="subjectName"
            v-model="form.subjectName"
            placeholder="Nhập tên môn học"
          />
        </div>
        <div class="form-group mb-3">
          <label for="credits" class="form-label">
            Số tín chỉ <span class="text-danger">*</span>
          </label>
          <select
            id="credits"
            class="form-control"
            v-model="form.credits"
          >
            <option v-for="credit in creditOptions" :key="credit" :value="credit">
              {{ credit }}
            </option>
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="term" class="form-label">
            Học kỳ <span class="text-danger">*</span>
          </label>
          <select id="term" class="form-control" v-model="form.term">
            <option selected disabled>Chọn học kỳ...</option>
            <option v-for="term in termOptions" :key="term" :value="term">
              {{ term }}
            </option>
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="academicYearStart" class="form-label">
            Năm học <span class="text-danger">*</span>
          </label>
          <div class="d-flex">
            <select
              id="academicYearStart"
              class="form-control me-2"
              v-model="form.academicYearStart"
            >
              <option value="" disabled selected>Chọn năm bắt đầu...</option>
              <option v-for="year in yearOptions" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
            <span class="align-self-center">-</span>
            <select
              id="academicYearEnd"
              class="form-control ms-2"
              v-model="form.academicYearEnd"
            >
              <option value="" disabled selected>Chọn năm kết thúc...</option>
              <option v-for="year in yearOptions" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group mb-3">
          <label for="department" class="form-label">
            Khoa <span class="text-danger">*</span>
          </label>
          <select
            id="department"
            class="form-control"
            v-model="form.department"
          >
            <option selected disabled>Chọn khoa...</option>
            <option v-for="department in departmentOptions" :key="department" :value="department">
              {{ department }}
            </option>
          </select>
        </div>
        <div class="form-group d-flex justify-content-start">
          <button type="submit" class="btn btn-success me-2">
            {{ isEdit ? 'Cập nhật môn học' : 'Thêm môn học' }}
          </button>
          <button type="reset" class="btn btn-outline-secondary">
            Làm mới
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { showSuccessMessage } from "../../common/utils/notifications";

export default {
  data() {
    return {
      form: {
        subjectCode: "",
        subjectName: "",
        credits: null,
        isMandatory: true,
        term: "",
        academicYearStart: "",
        academicYearEnd: "",
        department: "",
      },
      creditOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      yearOptions: Array.from({ length: 20 }, (_, i) => 2023 + i),
      departmentOptions: [
        "Khoa Công nghệ thông tin",
        "Khoa Lý luận - chính trị",
        "Khoa Toán",
      ],
      termOptions: ["Học kỳ I", "Học kỳ II"],
      isEdit: false, // Trạng thái để xác định là cập nhật hay thêm mới
    };
  },
  methods: {
    ...mapActions("subject", ["CreaterSubject", "UpdateSubject"]),
    async onSubmit() {
      try {
        const data = {
          subject_code: this.form.subjectCode,
          subject_name: this.form.subjectName,
          credits: parseInt(this.form.credits),
          is_mandatory: this.form.isMandatory,
          term: this.form.term,
          academic_year: `${this.form.academicYearStart}-${this.form.academicYearEnd}`,
          department: this.form.department,
        };

        if (this.isEdit) {
          await this.UpdateSubject(data);
          showSuccessMessage("Cập nhật môn học thành công!");
        } else {
          await this.CreaterSubject(data);
          showSuccessMessage("Thêm môn học thành công!");
        }

        this.onReset();
      } catch (error) {
        alert(
          `Có lỗi xảy ra: ${error.response ? error.response.data.message : error.message}`
        );
      }
    },
    onReset() {
      this.form.subjectCode = "";
      this.form.subjectName = "";
      this.form.credits = null;
      this.form.term = "";
      this.form.academicYearStart = "";
      this.form.academicYearEnd = "";
      this.form.department = "";
    },
    setFormForEdit(subject) {
      this.form = { ...subject, credits: subject.credits.toString() };
      this.isEdit = true;
    },
  },
  watch: {
    '$route.params.id': {
      async handler(id) {
        if (id) {
          // Fetch subject data by id if editing
          // this.fetchSubjectById(id);
        }
      },
      immediate: true,
    },
  },
};
</script>


<style scoped>
label {
  font-weight: bold;
}
</style>
