<template>
  <div class="row p-3 m-3">
    <div class="col-2 mb-3 d-none d-md-block">
      <b-button href="/manager/teachers" variant="success">
        <i class="bx bx-arrow-back"></i>
      </b-button>
    </div>
    <div
      class="col-sm-8 offset-sm-2 col-md-6 offset-md-2 col-lg-4 offset-lg-2 p-4 border rounded shadow-lg bg-white"
    >
      <h4 class="text-center text-success mb-3">
        {{ isEdit ? "Cập nhật ngành học" : "Thêm ngành học" }}
      </h4>
      <form @submit.prevent="onSubmit" @reset="onReset">
        <div class="form-group mb-3">
          <label for="majorId" class="form-label">
            Mã ngành học <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="majorId"
            v-model="form.majorId"
            :placeholder="
              isEdit ? 'Mã ngành học không thể thay đổi' : 'Nhập mã ngành học'
            "
            :readonly="isEdit"
            :disabled="isEdit"
            @focus="clearError('majorId')"
          />
          <div class="text-danger mb-2" v-if="errors.majorId">
            * {{ errors.majorId }}
          </div>
        </div>
        <div class="form-group mb-3">
          <label for="majorName" class="form-label">
            Tên ngành học <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="majorName"
            v-model="form.majorName"
            placeholder="Nhập tên môn học"
            @focus="clearError('majorName')"
          />
          <div class="text-danger mb-2" v-if="errors.majorName">
            * {{ errors.majorName }}
          </div>
          <div class="text-danger my-2" v-if="errors.messageError">
            * {{ errors.messageError }}
          </div>
        </div>
        <div class="form-group d-flex justify-content-start">
          <button type="submit" class="btn btn-success me-2">
            {{ isEdit ? "Cập nhật ngành học" : "Thêm ngành học" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { showSuccessMessage } from "../../common/utils/notifications";
import { validateFormMajor } from "@/common/utils/validate";

export default {
  data() {
    return {
      form: {
        majorId: "",
        majorName: "",
      },
      errors: {
        majorId: "",
        majorName: "",
      },
      isEdit: false,
    };
  },
  methods: {
    ...mapActions("major", ["CreateMajor", "getMajorById", "UpdateMajor"]),
    async getDetailMajor() {
      const id = this.$route.params.id;
      const response = await this.getMajorById(id);
      this.setFormForEdit(response.data);
      console.log(response);
    },
    async onSubmit() {
      try {
        this.errors = validateFormMajor(this.form);
        if (Object.keys(this.errors).length > 0) {
          return;
        }
        const data = {
          major_id: this.form.majorId,
          major_name: this.form.majorName,
        };
        if (this.isEdit) {
          await this.UpdateMajor({ data, id: this.$route.params.id });
          showSuccessMessage("Cập nhật ngành học thành công!");
        } else {
          await this.CreateMajor(data);
          showSuccessMessage("Thêm ngành học thành công!");
        }
        this.onReset();
        setTimeout(() => {
          window.location.href = "/manager/major";
        }, 1000);
      } catch (error) {
        this.errors = {
          messageError: error.response.data.error,
        };
      }
    },
    onReset() {
      this.form.majorId = "";
      this.form.majorName = "";
      this.errors = {
        majorId: "",
        majorName: "",
      };
    },
    setFormForEdit(major) {
      this.form.majorId = major.major_id;
      this.form.majorName = major.major_name;
      this.isEdit = true;
    },
    clearError(field) {
      this.$set(this.errors, field, "");
    },
  },

  created() {
    if (this.$route.params.id) {
      this.isEdit = true;
      this.getDetailMajor();
    }
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>
