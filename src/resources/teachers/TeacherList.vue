<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between my-3">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm giáo viên..."
      />
      <b-button href="/manager/teacher/create" variant="success fw-bold">
        <i class="bx bx-plus"></i>
        Thêm mới
      </b-button>
    </div>
    <div class="row">
      <div class="col-12 mb-3 mb-lg-5">
        <div class="overflow-hidden card table-nowrap table-card">
          <div
            class="card-header d-flex justify-content-center align-items-center py-3 header-bordered"
          >
            <h5 class="mb-0 text-center">Danh sách giáo viên</h5>
          </div>
          <div class="table-responsive">
            <table class="table table-striped table-hover mb-0 table-wrap">
              <thead class="small text-uppercase bg-body text-muted">
                <tr class="text-center">
                  <th>STT</th>
                  <th>Họ tên</th>
                  <th>Giới tính</th>
                  <th style="min-width: 200px">Ngày sinh</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Môn học giảng dạy</th>
                  <th>Lớp học</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(teacher, index) in entries"
                  :key="teacher.id"
                  class="align-middle"
                >
                  <td class="text-center">
                    {{
                      searchQuery
                        ? index + 1
                        : (currentPage - 1) * perPage + index + 1
                    }}
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        :src="teacher.avatar"
                        class="avatar sm rounded-pill me-3 flex-shrink-0"
                        alt="Giáo viên"
                        @error="handleImageError"
                      />
                      <div class="h6 mb-0 truncate">
                        {{ teacher.name }}
                      </div>
                    </div>
                  </td>
                  <td class="text-center">
                    {{
                      teacher.gender === 1
                        ? "Nam"
                        : teacher.gender === 2
                        ? "Nữ"
                        : "Khác"
                    }}
                  </td>
                  <td class="text-center">
                    {{ toVNTime(teacher.date_of_birth) }}
                  </td>
                  <td>{{ teacher.phone }}</td>
                  <td>{{ teacher.email }}</td>
                  <td></td>
                  <td></td>
                  <td class="text-center">
                    <b-button-group>
                      <b-button
                        variant="transtration"
                        size="md"
                        :to="`/manager/teacher/edit/${teacher.Id}`"
                      >
                        <i class="bx bxs-edit-alt fs-4 text-info"></i>
                      </b-button>
                      <b-button
                        variant="transtration"
                        size="md"
                        @click="confirmDelete(teacher.Id)"
                      >
                        <i class="bx bxs-trash fs-4 text-danger"></i>
                      </b-button>
                    </b-button-group>
                  </td>
                </tr>
                <tr v-if="entries?.length === 0 || !entries">
                  <td colspan="8" class="text-center">Không có dữ liệu</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination
            v-show="isShowPagi"
            :total="totalTeachers"
            :limit="perPage"
            :currentPage="currentPage"
            @page-changed="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Pagination from "../../components/layout/Pagination.vue";
import moment from "moment";
import {
  showDeleteConfirmation,
  showSuccessMessage,
} from "../../common/utils/notifications";

export default {
  data() {
    return {
      entries: [],
      listEntry: [],
      searchQuery: "",
      currentPage: this.page,
      perPage: this.limit,
      totalTeachers: 0,
      defaultAvatar: "/avt.jpg",
      isShowPagi: true,
    };
  },
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
  components: {
    Pagination,
  },
  methods: {
    ...mapActions("teacher", ["ListTeachers"]),
    ...mapActions("user", ["ListAllAccount", "DeleteUser"]),
    toVNTime(time) {
      return moment(time).utc(7).format("DD-MM-YYYY");
    },
    handleImageError(event) {
      event.target.src = this.defaultAvatar;
    },
    async getProfile() {
      const response = await this.GetProfile(this.$route.query);
      if (response?.status == 200) {
        this.entries = response.data.data;
      } else {
        this.entries = [];
      }
    },
    async getListTeachers(page = this.currentPage) {
      const response = await this.ListTeachers({ page, limit: this.perPage });
      const response2 = await this.ListTeachers({ limit: response.data.total });
      if (response2.status === 200) {
        this.listEntry = response2.data.data;
      }
      if (response?.status === 200) {
        this.entries = response.data.data;
        this.totalTeachers = response.data.total;
      }
    },
    async confirmDelete(id) {
      const isConfirmed = await showDeleteConfirmation();
      if (isConfirmed) {
        const response = await this.DeleteUser(id);
        this.getListTeachers();
        if (response.status === 200) {
          showSuccessMessage();
        } else {
          showErrorMessage();
        }
      }
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.getListTeachers();
    },
  },
  watch: {
    page(newPage) {
      this.currentPage = newPage;
      this.getListTeachers(newPage);
    },
    limit(newLimit) {
      this.perPage = newLimit;
      this.getListTeachers(this.currentPage);
    },
    searchQuery: {
      handler(newQuery) {
        if (newQuery.trim() === "") {
          this.getListTeachers();
          this.isShowPagi = true;
        } else {
          this.isShowPagi = false;
          this.entries = this.listEntry.filter(
            (entry) =>
              entry.name.toLowerCase().includes(newQuery.toLowerCase()) ||
              entry.email.toLowerCase().includes(newQuery.toLowerCase())
          );
        }
      },
      deep: true,
    },
  },
  created() {
    this.getListTeachers();
  },
};
</script>

<style scoped>
body {
  margin-top: 20px;
  background: #eee;
}
.card {
  box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
}
.avatar.sm {
  width: 2.25rem;
  height: 2.25rem;
  font-size: 0.818125rem;
}
.table-nowrap .table th {
  white-space: nowrap;
}
.table-wrap td {
  max-width: 400px;
  white-space: normal;
  word-wrap: break-word;
}
.table > :not(caption) > * > * {
  padding: 0.75rem 1.25rem;
  border-bottom-width: 1px;
}
table th {
  font-weight: 600;
  color: white;
  background-color: var(--vt-c-green) !important;
}
table td {
  line-height: 2;
}
.custom-select {
  padding: 2px 4px;
  border-radius: 5px;
  border-color: #a7a7a7;
}
.header-bordered {
  border: 2px solid #44b97c;
  padding: 15px;
}
.header-bordered h5 {
  font-size: 1.5rem;
  color: var(--vt-c-green);
  font-weight: bold;
  text-transform: uppercase;
}
input[type="text"] {
  width: 50%;
  border-radius: 0.375rem;
  border: 1px solid #ced4da;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

input[type="text"]:focus {
  border-color: #123252;
  outline: none;
  box-shadow: var(--bs-box-shadow-lg) !important;
}

.b-button {
  border-radius: 0.375rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.b-button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
