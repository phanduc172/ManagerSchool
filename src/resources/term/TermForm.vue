<template>
  <div class="row mt-2">
    <div class="col-md-2 col-lg-3 ms-3 mb-3 d-none d-md-block">
      <b-button href="/manager/term" variant="outline-secondary">
        <i class="bx bx-arrow-back"></i>
        Quay lại
      </b-button>
    </div>
    <div class="col-md-8 col-lg-6 p-4 border rounded shadow-lg bg-white">
      <h4 class="text-center text-success mb-3">
        {{ isEdit ? "Cập nhật môn học" : "Thêm môn học" }}
      </h4>
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
            :placeholder="
              isEdit ? 'Mã môn học không thể thay đổi' : 'Nhập mã môn học'
            "
            :readonly="isEdit"
            @focus="clearError('subjectCode')"
          />
          <div class="text-danger mb-2" v-if="errors.subjectCode">
            * {{ errors.subjectCode }}
          </div>
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
            @focus="clearError('subjectName')"
          />
          <div class="text-danger mb-2" v-if="errors.subjectName">
            * {{ errors.subjectName }}
          </div>
        </div>
        <div class="form-group mb-3">
          <label for="credit" class="form-label">
            Số tín chỉ <span class="text-danger">*</span>
          </label>
          <select
            id="credit"
            class="form-control"
            v-model="form.credits"
            @change="clearError('credit')"
          >
            <option value="" disabled selected>Chọn số tín chỉ...</option>
            <option
              v-for="credit in creditOptions"
              :key="credit"
              :value="credit"
            >
              {{ credit }}
            </option>
          </select>
          <div class="text-danger mb-2" v-if="errors.credits">
            * {{ errors.credits }}
          </div>
        </div>
        <div class="form-group mb-3">
          <label for="term_semester" class="form-label">
            Học kỳ <span class="text-danger">*</span>
          </label>
          <select
            id="term"
            class="form-control"
            v-model="form.term"
            @change="clearError('term')"
          >
            <option value="" disabled selected>Chọn học kỳ...</option>
            <option v-for="term in termOptions" :key="term" :value="term">
              {{ term }}
            </option>
          </select>
          <div class="text-danger mb-2" v-if="errors.term">
            * {{ errors.term }}
          </div>
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
              @change="clearError('academicYearStart')"
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
              @change="clearError('academicYearEnd')"
            >
              <option value="" disabled selected>Chọn năm kết thúc...</option>
              <option v-for="year in yearOptions" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          <div
            class="text-danger mb-2"
            v-if="errors.academicYearStart || errors.academicYearEnd"
          >
            * {{ errors.academicYearStart || errors.academicYearEnd }}
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
            <option value="" disabled selected>Chọn khoa...</option>
            <option
              v-for="department in departmentOptions"
              :key="department"
              :value="department"
            >
              {{ department }}
            </option>
          </select>
          <div class="text-danger mb-2" v-if="errors.department">
            * {{ errors.department }}
          </div>
        </div>
        <div class="form-group d-flex justify-content-start">
          <button type="submit" class="btn btn-success me-2">
            {{ isEdit ? "Cập nhật môn học" : "Thêm môn học" }}
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
import {
  showSuccessMessage,
  showSuccessUpdate,
} from "../../common/utils/notifications";
import { validateFormSubject } from "@/common/utils/validate";

export default {
  data() {
    return {
      form: {
        subjectCode: "",
        subjectName: "",
        credits: null,
        term: "",
        academicYearStart: "",
        academicYearEnd: "",
        department: "",
      },
      errors: {
        subjectCode: "",
        subjectName: "",
        credits: null,
        term: "",
        academicYearStart: "",
        academicYearEnd: "",
        department: "",
      },
      creditOptions: [1, 2, 3, 4, 5],
      yearOptions: Array.from({ length: 20 }, (_, i) => 2023 + i),
      departmentOptions: [
        "Khoa Công nghệ thông tin",
        "Khoa Lý luận - chính trị",
        "Khoa Toán",
      ],
      termOptions: ["Học kỳ I", "Học kỳ II"],
      isEdit: false,
    };
  },
  methods: {
    ...mapActions("subject", [
      "CreaterSubject",
      "UpdateSubject",
      "getSubjectById",
    ]),
    async fetchDetailSubject() {
      const id = this.$route.params.id;
      const response = await this.getSubjectById(id);
      this.setFormForEdit(response.data);
      console.log(response);
    },
    async onSubmit() {
      try {
        this.errors = validateFormSubject(this.form);
        if (Object.keys(this.errors).length > 0) {
          return;
        }
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
          await this.UpdateSubject({ data, id: this.$route.params.id });
          showSuccessMessage("Cập nhật môn học thành công!");
          // await this.UpdateSubject({ data, id: this.$route.params.id });
          // showSuccessMessage("Cập nhật môn học thành công!");
        } else {
          await this.CreaterSubject(data);
          showSuccessMessage("Thêm môn học thành công!");
        }
        this.onReset();
        window.location.href = "/manager/subjects";
      } catch (error) {
        alert(
          `Có lỗi xảy ra: ${
            error.response ? error.response.data.message : error.message
          }`
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

      this.errors = {
        subjectCode: "",
        subjectName: "",
        credits: null,
        term: "",
        academicYearStart: "",
        academicYearEnd: "",
        department: "",
      };
    },
    setFormForEdit(subject) {
      this.form.subjectCode = subject.subject_code;
      this.form.subjectName = subject.subject_name;
      this.form.credits = subject.credits;
      this.form.isMandatory = subject.is_mandatory;
      this.form.term = subject.term_id;
      const [academicYearStart, academicYearEnd] =
        subject.academic_year.split("-");
      this.form.academicYearStart = academicYearStart;
      this.form.academicYearEnd = academicYearEnd;
      this.form.department = subject.department;
      this.isEdit = true;
    },
    clearError(field) {
      this.$set(this.errors, field, "");
    },
  },

  created() {
    if (this.$route.params.id) {
      this.isEdit = true;
      this.fetchDetailSubject();
    }
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>
