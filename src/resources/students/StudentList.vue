<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between align-items-center my-3">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm học sinh..."
      />
      <!-- <b-button href="/manager/students/create" variant="success fw-bold">
        <i class="bx bx-plus"></i>
        Thêm mới
      </b-button> -->
    </div>
    <div class="row">
      <div class="col-12 mb-3 mb-lg-5">
        <div class="overflow-hidden card table-nowrap table-card">
          <div
            class="card-header d-flex justify-content-center align-items-center py-3 header-bordered"
          >
            <h5 class="mb-0 text-center">Danh sách học sinh</h5>
          </div>
          <div class="table-responsive">
            <table class="table table-striped table-hover mb-0 table-wrap">
              <thead class="small text-uppercase bg-body text-muted">
                <tr class="text-center">
                  <th>STT</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th style="min-width: 200px">Ngày sinh</th>
                  <th>Giới tính</th>
                  <th>Số điện thoại</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(student, index) in entries"
                  :key="student.id"
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
                        :src="student.avatar"
                        class="avatar sm rounded-pill me-3 flex-shrink-0"
                        :alt="student.name"
                      />
                      <div class="h6 mb-0 truncate">{{ student.name }}</div>
                    </div>
                  </td>
                  <td>{{ student.email }}</td>
                  <td class="text-center">
                    {{ toVNTime(student.date_of_birth) }}
                  </td>
                  <td class="text-center">
                    {{
                      student.gender === 1
                        ? "Nam"
                        : student.gender === 2
                        ? "Nữ"
                        : "Khác"
                    }}
                  </td>
                  <td>{{ student.phone }}</td>

                  <td class="text-center">
                    <b-button-group>
                      <b-button
                        variant="transtration"
                        size="md"
                        @click="confirmDelete(student.Id)"
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
            :total="totalStudents"
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
  showErrorMessage,
  showSuccessMessage,
} from "../../common/utils/notifications";
export default {
  components: { Pagination },
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
      entries: [],
      searchQuery: "",
      currentPage: this.page,
      perPage: this.limit,
      totalStudents: 0,
      isShowPagi: true,
    };
  },
  methods: {
    toVNTime(time) {
      return moment(time).utc(7).format("DD-MM-YYYY");
    },
    ...mapActions("student", ["ListStudents"]),
    ...mapActions("user", ["DeleteUser"]),
    async getListStudent(page = this.currentPage) {
      const response = await this.ListStudents({ page, limit: this.perPage });
      if (response?.status === 200) {
        this.entries = response.data.data;
        this.totalStudents = response.data.total;
      }
      console.log("List Student:", response.data.data);
    },
    async confirmDelete(id) {
      const isConfirmed = await showDeleteConfirmation();
      if (isConfirmed) {
        const response = await this.DeleteUser(id);
        if (response.status === 200) {
          showSuccessMessage();
        } else {
          showErrorMessage();
        }
        this.getListStudent();
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getListStudent(this.currentPage);
    },
  },
  watch: {
    searchQuery: {
      handler(newQuery) {
        if (newQuery.trim() === "") {
          this.getListStudent();
          this.isShowPagi = true;
        } else {
          this.isShowPagi = false;
          this.entries = this.entries.filter(
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
    this.getListStudent();
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
  background-color: #44b97c;
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
.btn-group:active {
  border: none !important;
}
</style>
