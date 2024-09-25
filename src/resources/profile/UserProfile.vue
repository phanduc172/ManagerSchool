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
                    :disabled="!isEditing"
                  />
                  <div class="text-danger mt-2" v-if="errors.name">
                    * {{ errors.name }}
                  </div>
                </div>
              </div>
              <div class="row mb-3 offset-1">
                <div class="col-sm-3">
                  <h6 class="my-sm-2">Ngày sinh</h6>
                </div>
                <div class="col-sm-8 text-secondary">
                  <input
                    type="date"
                    class="form-control"
                    v-model="profile.date_of_birth"
                    :disabled="!isEditing"
                    :max="maxDate"
                  />
                  <div class="text-danger mt-2" v-if="errors.date_of_birth">
                    * {{ errors.date_of_birth }}
                  </div>
                </div>
              </div>
              <div class="row mb-3 offset-1">
                <div class="col-sm-3">
                  <h6 class="my-sm-2">Giới tính</h6>
                </div>
                <div class="col-sm-8 text-secondary">
                  <select
                    class="form-select"
                    v-model="profile.gender"
                    :disabled="!isEditing"
                  >
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                    <option value="3">Khác</option>
                  </select>
                </div>
                <div class="text-danger mt-2" v-if="errors.gender">
                  * {{ errors.gender }}
                </div>
              </div>
              <div class="row mb-3 offset-1">
                <div class="col-sm-3">
                  <h6 class="my-sm-2">Email</h6>
                </div>
                <div class="col-sm-8 text-secondary">
                  <input
                    type="email"
                    class="form-control"
                    v-model="profile.email"
                    :disabled="!isEditing"
                  />
                  <div class="text-danger mt-2" v-if="errors.email">
                    * {{ errors.email }}
                  </div>
                </div>
              </div>
              <div class="row mb-3 offset-1">
                <div class="col-sm-3">
                  <h6 class="my-sm-2">Số điện thoại</h6>
                </div>
                <div class="col-sm-8 text-secondary">
                  <input
                    type="phone"
                    class="form-control"
                    v-model="profile.phone"
                    :disabled="!isEditing"
                  />
                  <div class="text-danger mt-2" v-if="errors.phone">
                    * {{ errors.phone }}
                  </div>
                </div>
              </div>

              <div class="text-center mt-4 d-flex justify-content-center">
                <b-button
                  v-if="!isEditing"
                  variant="success"
                  @click="isEditing = true"
                  >Cập nhật thông tin
                </b-button>
                <b-button
                  v-else
                  variant="outline-secondary me-4"
                  @click="cancelEditing"
                  >Hủy</b-button
                >
                <b-button
                  v-if="isEditing"
                  variant="success"
                  @click="updateUserProfile"
                  >Lưu thay đổi</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { mapActions, mapGetters } from "vuex";
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
      isEditing: false,
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
        this.profile.date_of_birth = this.toVNTime(this.profile.date_of_birth);
      }
    },

    async updateUserProfile() {
      console.log("Submit");
      this.errors = validateUpdateMeForm(this.profile);
      if (Object.keys(this.errors).length > 0) {
        return;
      }

      const userData = {
        name: this.profile.name,
        email: this.profile.email,
        gender: this.profile.gender,
        birthdate: moment(this.profile.date_of_birth)
          .utcOffset(7)
          .format("YYYY-MM-DDTHH:mm:ssZ"),
        phone: this.profile.phone,
        address: this.profile.address,
      };

      try {
        const response = await this.UpdateProfile(userData);
        console.log("Update: ", response);
        showSuccessMessage();
        this.isEditing = false;
        this.resetModal();
        this.GetProfile();
      } catch (error) {
        console.log("Lỗi cập nhật hồ sơ:", error);
      }
    },
    resetModal() {
      this.$bvModal.hide("update-profile-modal");
    },
    saveProfile() {
      this.updateUserProfile();
    },
    async handleFileUpload() {
      if (this.fileToUpload) {
        console.log(this.fileToUpload, "response");

        const formData = new FormData();
        formData.append("file", this.fileToUpload);
        const token = sessionStorage.getItem("token");
        if (!token) return;
        const response = await axios.post(
          "http://localhost:3000/v1/api/upload/image",
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
    cancelEditing() {
      this.isEditing = false;
      this.errors = {
        name: "",
        email: "",
        birthdate: "",
        gender: "",
        phone: "",
      };
      this.GetProfile();
    },
  },
  created() {
    this.GetProfile();
    this.maxDate = getMaxDate();
  },
};
</script>

<style scoped>
body {
  background: #f7f7ff;
  margin-top: 20px;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
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
