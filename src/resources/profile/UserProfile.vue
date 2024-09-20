<template>
  <div class="container mt-3">
    <div class="main-body">
      <div class="row">
        <div class="offset-lg-1 col-lg-10">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <label
                  for="upload-image"
                  class="position-relative upload-image-label"
                >
                  <img
                    :src="profile.avatar"
                    alt="Admin"
                    class="rounded-circle p-1 border border-secondary border-2"
                    width="150"
                    style="
                      cursor: pointer;
                      width: 200px;
                      height: 200px;
                      object-fit: cover;
                    "
                    @error="handleImageError"
                  />

                  <div class="upload-overlay">
                    <span class="upload-icon"
                      ><i class="bx bxs-camera"></i
                    ></span>
                  </div>
                  <input
                    class="d-none"
                    type="file"
                    id="upload-image"
                    accept="image/*"
                    ref="fileInput"
                    @change="previewImage"
                  />
                </label>
                <div class="mt-3">
                  <h2 class="fw-bold">{{ profile.name }}</h2>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row mb-3 offset-1">
                <div class="col-sm-3">
                  <h6 class="my-sm-2">Họ tên</h6>
                </div>
                <div class="col-sm-8 text-secondary">
                  <input
                    type="text"
                    class="form-control"
                    v-model="profile.name"
                    disabled
                  />
                </div>
              </div>
              <div class="row mb-3 offset-1">
                <div class="col-sm-3">
                  <h6 class="my-sm-2">Ngày sinh</h6>
                </div>
                <div class="col-sm-8 text-secondary">
                  <input
                    :max="maxDate"
                    class="form-control"
                    :value="toVNTime(profile.date_of_birth)"
                    disabled
                  />
                </div>
              </div>
              <div class="row mb-3 offset-1">
                <div class="col-sm-3">
                  <h6 class="my-sm-2">Giới tính</h6>
                </div>
                <div class="col-sm-8 text-secondary">
                  <input
                    class="form-control"
                    :value="
                      profile.gender == 1
                        ? 'Nam'
                        : profile.gender == 2
                        ? 'Nữ'
                        : 'Khác'
                    "
                    disabled
                  />
                </div>
              </div>
              <div class="row mb-3 offset-1">
                <div class="col-sm-3">
                  <h6 class="my-sm-2">Email</h6>
                </div>
                <div class="col-sm-8 text-secondary">
                  <input
                    type="text"
                    class="form-control"
                    v-model="profile.email"
                    disabled
                  />
                </div>
              </div>
              <div class="row mb-3 offset-1">
                <div class="col-sm-3">
                  <h6 class="my-sm-2">Số điện thoại</h6>
                </div>
                <div class="col-sm-8 text-secondary">
                  <input
                    type="text"
                    class="form-control"
                    v-model="profile.phone"
                    disabled
                  />
                </div>
              </div>
              <div class="row mb-3 offset-1">
                <div class="col-sm-3">
                  <h6 class="my-sm-2">Vai trò</h6>
                </div>
                <div class="col-sm-8 text-secondary">
                  <input
                    type="text"
                    class="form-control"
                    :value="
                      profile.role_type == 'admin'
                        ? 'Quản trị viên'
                        : profile.role_type == 'teacher'
                        ? 'Giáo viên'
                        : 'Học sinh'
                    "
                    disabled
                  />
                </div>
                <div class="text-center mt-4">
                  <b-button
                    type="button"
                    variant="success"
                    @click="openUpdateModal"
                    >Cập nhật thông tin</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="update-profile-modal"
      title="Cập nhật thông tin"
      @ok="updateUserProfile"
      @hide="resetModal"
      size="md"
      scrollable
      class="custom-modal"
      hide-header
    >
      <form>
        <div class="row mb-3">
          <label for="name" class="col-sm-4 col-form-label"
            >Họ tên <span class="text-danger">*</span></label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="profile.name"
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="gender" class="col-sm-4 col-form-label">Giới tính </label>
          <div class="col-sm-8">
            <select class="form-select" id="gender" v-model="profile.gender">
              <option value="undefined" disabled>Chọn giới tính</option>
              <option :value="1">Nam</option>
              <option :value="2">Nữ</option>
              <option :value="3">Khác</option>
            </select>
          </div>
        </div>

        <div class="row mb-3">
          <label for="birthdate" class="col-sm-4 col-form-label"
            >Ngày sinh</label
          >
          <div class="col-sm-8">
            <input
              type="date"
              class="form-control"
              id="birthdate"
              :max="maxDate"
              :value="toVNTime(profile.date_of_birth)"
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="email" class="col-sm-4 col-form-label"
            >Email <span class="text-danger">*</span></label
          >
          <div class="col-sm-8">
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="profile.email"
            />
          </div>
          <div class="text-danger mb-2" v-if="errors.email">
            * {{ errors.email }}
          </div>
        </div>

        <div class="row mb-3">
          <label for="phone" class="col-sm-4 col-form-label"
            >Số điện thoại <span class="text-danger">*</span></label
          >
          <div class="col-sm-8">
            <input
              type="tel"
              class="form-control"
              id="phone"
              v-model="profile.phone"
            />
            <div class="text-danger mb-2" v-if="errors.phone">
              * {{ errors.phone }}
            </div>
          </div>
        </div>
      </form>

      <template v-slot:modal-footer>
        <b-button variant="outline-secondary" @click="resetModal">Hủy</b-button>
        <b-button variant="success" @click="updateUserProfile"
          >Cập nhật</b-button
        >
      </template>
    </b-modal>
    <b-modal
      id="image-preview-modal"
      hide-header
      @ok="handleFileUpload"
      @hide="resetPreview"
    >
      <div class="d-flex justify-content-center">
        <b-img
          :src="uploadedImage"
          alt="Image Preview"
          class="img-fluid rounded uploadAvt"
        />
      </div>
      <template v-slot:modal-footer>
        <b-button variant="outline-secondary" @click="cancelImage"
          >Hủy</b-button
        >
        <b-button variant="success" @click="handleFileUpload"
          >Cập nhật ảnh</b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { mapActions } from "vuex";
import { getMaxDate, validateUpdateMeForm } from "../../common/utils/validate";
import { showSuccessMessage } from "../../common/utils/notifications";

export default {
  data() {
    return {
      profile: {
        name: "",
        email: "",
        birthdate: "",
        gender: "",
        phone: "",
      },
      errors: {
        name: "",
        email: "",
        birthdate: "",
        gender: "",
        phone: "",
      },
      maxDate: getMaxDate(),
      uploadedImage: null,
      fileToUpload: null,
      defaultAvatar: "/avt.jpg",
    };
  },
  methods: {
    ...mapActions("user", ["UploadImage", "UpdateProfile"]),
    ...mapActions("auth", ["getProfile"]),
    toVNTime(time) {
      return moment(time).utc(7).format("yyy-MM-DD");
    },
    openUpdateModal() {
      this.$bvModal.show("update-profile-modal");
    },

    async GetProfile() {
      const response = await this.getProfile();
      if (response?.status === 200) {
        this.profile = response.data.data;
      }
    },

    async updateUserProfile() {
      // this.errors = validateUpdateMeForm(this.form);
      // if (Object.keys(this.errors).length > 0) {
      //   return;
      // }
      const userData = {
        name: this.profile.name,
        email: this.profile.email,
        gender: this.profile.gender,
        birthdate: moment(this.profile.date_of_birth)
          .zone(7)
          .format("YYYY-MM-DDTHH:mm:ssZ"),
        phone: this.profile.phone,
        address: this.profile.address,
      };
      await this.UpdateProfile(userData);
      showSuccessMessage();
      this.resetModal();
      this.GetProfile();
    },
    resetModal() {
      this.$bvModal.hide("update-profile-modal");
    },
    async handleFileUpload() {
      if (this.fileToUpload) {
        console.log(this.fileToUpload, "response");

        const formData = new FormData();
        formData.append("file", this.fileToUpload);
        const token = sessionStorage.getItem("token");
        if (!token) return;
        const response = await axios.post(
          "http://localhost:3000/v1/upload/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newAvt = response.data.data;
        this.UpdateProfile({ avatar: newAvt });
        console.log(newAvt);
        this.cancelImage();
        showSuccessMessage();
        this.GetProfile();
      } else {
        console.error("Không có file nào được chọn");
      }
    },
    handleImageError(event) {
      event.target.src = this.defaultAvatar;
    },
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadedImage = URL.createObjectURL(file);
        this.fileToUpload = file;
        this.$nextTick(() => {
          this.$bvModal.show("image-preview-modal");
        });
      }
    },

    cancelImage() {
      this.resetPreview();
    },

    resetPreview() {
      this.uploadedImage = null;
      this.fileToUpload = null;
      this.$bvModal.hide("image-preview-modal");
    },
  },
  created() {
    this.GetProfile();
    this.maxDate = getMaxDate();
  },
};
</script>

<style scoped>
h6 {
  text-wrap: inherit;
}
body {
  background: #f7f7ff;
  margin-top: 20px;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  word-wrap: break-word;
  /* background-color: #fff; */
  background-color: #ffffffed;
  background-clip: border-box;
  border: 0 solid transparent;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%),
    0 2px 6px 0 rgb(206 206 238 / 54%);
}
.me-2 {
  margin-right: 0.5rem !important;
}
.custom-modal .modal-content {
  border-radius: 0.5rem;
  border: 1px solid #dee2e6;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.custom-modal .modal-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  position: relative;
}

.custom-modal .modal-header .close {
  display: none; /* Ẩn dấu "x" */
}

.custom-modal .modal-footer {
  border-top: 1px solid #dee2e6;
}

.custom-modal .form-control {
  border-radius: 0.25rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
}

.custom-modal .form-label {
  font-weight: 500;
}

.custom-modal .form-group {
  margin-bottom: 1rem;
}

.custom-modal .btn {
  border-radius: 0.25rem;
}

.uploadAvt {
  width: 300px;
  height: 300px;
  object-fit: cover;
}
.upload-image-label {
  position: relative;
  display: inline-block;
}

.upload-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
  cursor: pointer;
}

.upload-icon {
  color: white;
  font-size: 48px;
}

.upload-image-label:hover .upload-overlay {
  opacity: 1;
}
</style>
