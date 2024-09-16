<template>
  <div class="row mt-2">
    <div class="col-md-2 col-lg-3 ms-3 mb-3 d-none d-md-block">
      <b-button href="/manager/subjects" variant="outline-secondary">
        <i class="bx bx-arrow-back"></i>
        Quay lại
      </b-button>
    </div>
    <div
      class="col-md-8 col-lg-6 p-4 border rounded shadow-lg bg-white"
      v-if="loading"
    >
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
            :disabled="isEdit"
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
          <label for="termSemester" class="form-label">
            Học kỳ <span class="text-danger">*</span>
          </label>
          <select
            id="termSemester"
            class="form-control"
            v-model="form.termSemester"
            @change="onTermSemesterChange"
          >
            <option value="" disabled>Chọn học kỳ...</option>
            <option
              v-for="(term, index) in termOptions"
              :key="index"
              :value="term.id"
            >
              Học kỳ {{ term.term_semester }} ({{ term.term_from_year }} -
              {{ term.term_to_year }})
            </option>
          </select>
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
              disabled
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
              disabled
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
          <div class="text-danger my-2" v-if="errors.messageError">
            * {{ errors.messageError }}
          </div>
        </div>
        <div class="form-group d-flex justify-content-start">
          <button type="submit" class="btn btn-success me-2">
            {{ isEdit ? "Cập nhật môn học" : "Thêm môn học" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { showSuccessMessage } from "../../common/utils/notifications";
import { validateFormSubject } from "@/common/utils/validate";

export default {
  props: {
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      form: {
        subjectCode: "",
        subjectName: "",
        credits: "",
        termSemester: "",
        academicYearStart: "",
        academicYearEnd: "",
        department: "",
      },
      errors: {
        subjectCode: "",
        subjectName: "",
        credits: "",
        termSemester: "",
        academicYearStart: "",
        academicYearEnd: "",
        department: "",
      },
      loading: false,
      creditOptions: [1, 2, 3, 4, 5],
      yearOptions: Array.from({ length: 20 }, (_, i) => 2020 + i),
      departmentOptions: [
        "Khoa Công nghệ thông tin",
        "Khoa Lý luận - chính trị",
        "Khoa Toán",
        "Khoa Hóa học",
        "Khoa Sinh học",
      ],
      termOptions: [],
      isEdit: false,
      currentPage: this.page,
      perPage: this.limit,
      totalTerms: 0,
    };
  },
  computed: {
    ...mapGetters("term", ["terms"]),
  },
  methods: {
    ...mapActions("term", ["ListTerms"]),
    ...mapActions("subject", [
      "CreaterSubject",
      "UpdateSubject",
      "getSubjectById",
    ]),

    async getAllTerms(page = this.currentPage) {
      const data = await this.ListTerms({ page, limit: this.perPage });
      const term = await this.ListTerms({
        limit: data.data.total,
      });
      this.termOptions = term.data.data;
      console.log("Dữ liệu các học kỳ:", this.termOptions);
    },

    async getDetailSubject() {
      this.loading = false;
      if (this.$route.params.id) {
        this.isEdit = true;
        const response = await this.getSubjectById(this.$route.params.id);
        this.setFormForEdit(response.data);
      }
      this.loading = true;
    },

    async onSubmit() {
      try {
        this.errors = validateFormSubject(this.form);
        if (Object.keys(this.errors).length > 0) {
          return;
        }
        const term = this.termOptions.find(
          (t) => t.id == this.form.termSemester
        );
        if (!term) {
          throw new Error("Học kỳ không tồn tại trong hệ thống!");
        }

        const data = {
          term_id: term.id,
          subject_code: this.form.subjectCode,
          subject_name: this.form.subjectName,
          credits: parseInt(this.form.credits),
          is_mandatory: this.form.isMandatory || false,
          term_semester: parseInt(term.term_semester),
          term_from_year: term.term_from_year,
          term_to_year: term.term_to_year,
          department: this.form.department,
        };

        console.log("Payload Data:", data);

        if (this.isEdit) {
          await this.UpdateSubject({ data, id: this.$route.params.id });
          showSuccessMessage("Cập nhật môn học thành công!");
        } else {
          await this.CreaterSubject(data);
          showSuccessMessage("Thêm môn học thành công!");
        }
        this.$router.push({ name: "subjects" });
      } catch (error) {
        this.errors = {
          messageError: error.response.data.error,
        };
      }
    },

    async onReset() {
      this.getDetailSubject();
      this.errors = {
        subjectCode: "",
        subjectName: "",
        credits: "",
        termSemester: "",
        academicYearStart: "",
        academicYearEnd: "",
        department: "",
      };
    },

    setFormForEdit(subject) {
      let subjectTerm = this.termOptions.find(
        ({ id }) => subject.term_id === id
      );
      if (subjectTerm) {
        this.form.termSemester = subjectTerm.id;
        this.form.academicYearStart = subjectTerm.term_from_year;
        this.form.academicYearEnd = subjectTerm.term_to_year;
      } else {
        this.form.termSemester = "";
        this.form.academicYearStart = "";
        this.form.academicYearEnd = "";
        console.warn("Không tìm thấy học kỳ cho môn học này.");
      }
      this.form.subjectCode = subject.subject_code;
      this.form.subjectName = subject.subject_name;
      this.form.credits = subject.credits;
      this.form.isMandatory = subject.is_mandatory;
      this.form.department = subject.department;
      this.isEdit = true;
    },

    clearError(field) {
      this.$set(this.errors, field, "");
    },

    onTermSemesterChange() {
      const selectedTerm = this.termOptions.find(
        (t) => t.id == this.form.termSemester
      );
      console.log("Select Term: ", selectedTerm);

      if (selectedTerm) {
        this.form.academicYearStart = selectedTerm.term_from_year;
        this.form.academicYearEnd = selectedTerm.term_to_year;
      } else {
        this.form.academicYearStart = "";
        this.form.academicYearEnd = "";
      }
    },
  },
  async created() {
    await this.getAllTerms();
    await this.getDetailSubject();
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
}
.form-control:disabled {
  background-color: var(--bs-secondary-bg);
  opacity: 1;
}
</style>
