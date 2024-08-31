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
        {{ isEdit ? "Cập nhật học kì" : "Thêm học kì" }}
      </h4>
      <form @submit.prevent="onSubmit" @reset="onReset">
        <div class="form-group mb-3">
          <label for="subjectName" class="form-label">
            Học kì <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="termSemester"
            v-model="form.termSemester"
            placeholder="Nhập học kì"
            @focus="clearError('termSemester')"
          />
          <div class="text-danger mb-2" v-if="errors.termSemester">
            * {{ errors.termSemester }}
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
        <div class="form-group d-flex justify-content-start">
          <button type="submit" class="btn btn-success me-2">
            {{ isEdit ? "Cập nhật học kì" : "Thêm học kì" }}
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
import { validateFormSubject } from "@/common/utils/validate";

export default {
  name: "UserProfile",
  data() {
    return {
      form: {
        termSemester: "",
        academicYearStart: "",
        academicYearEnd: "",
      },
      errors: {
        termSemester: "",
        academicYearStart: "",
        academicYearEnd: "",
      },
      yearOptions: Array.from({ length: 20 }, (_, i) => 2023 + i),
      isEdit: false,
    };
  },
  methods: {
    ...mapActions("term", [
      "CreaterSubject",
      "UpdateSubject",
      "getSubjectById",
    ]),
    async fetchDetailSubject() {
      const id = this.$route.params.id;
      const response = await this.getTermById(id);
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
          term_semester: this.form.termSemester,
          term_from_year: this.form.academicYearStart,
          term_to_year: this.form.academicYearEnd,
        };
        if (this.isEdit) {
          await this.UpdateTerm({ data, id: this.$route.params.id });
          showSuccessMessage("Cập nhật môn học thành công!");
        } else {
          await this.CreaterTerm(data);
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
      this.form.termSemester = "";
      this.form.academicYearStart = "";
      this.form.academicYearEnd = "";

      this.errors = {
        termSemester: "",
        academicYearStart: "",
        academicYearEnd: null,
      };
    },
    setFormForEdit(subject) {
      this.form.termSemester = subject.term_semester;
      this.form.academicYearStart = subject.term_from_year;
      this.form.academicYearEnd = subject.term_to_year;
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
