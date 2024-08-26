<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between my-3">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm giáo viên..."
      />
      <b-button href="/manager/teachers/create" variant="success">
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
            <table class="table mb-0">
              <thead class="small text-uppercase bg-body text-muted">
                <tr class="text-center">
                  <th class="text-center">STT</th>
                  <th>Họ tên</th>
                  <th>Ngày sinh</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Lớp học</th>
                  <th>Phòng ban</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(teacher, index) in paginatedTeachers"
                  :key="index"
                  class="align-middle"
                >
                  <td class="text-center">{{ (currentPage -1) * perPage + index + 1 }}</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        :src="teacher.avatar"
                        class="avatar sm rounded-pill me-3 flex-shrink-0"
                        alt="Giáo viên"
                      />
                      <div>
                      <div class="h6 mb-0 truncate">{{ teacher.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">{{ teacher.birthday }}</td>
                  <td class="text-center">
                    <span class="d-inline-block align-middle">{{
                      teacher.phone
                    }}</span>
                  </td>
                  <td class="truncate" style="max-width: 500px">
                    {{ teacher.address }}
                  </td>
                  <td class="text-center">
                    <span class="d-inline-block align-middle">{{
                      teacher.class
                    }}</span>
                  </td>
                  <td class="text-center">
                    <span class="d-inline-block align-middle">{{
                      teacher.department
                    }}</span>
                  </td>
                  <td class="text-center">
                    <b-button-group>
                      <b-button variant="transtration" size="md">
                        <b-icon icon="eye" class="text-secondary"></b-icon>
                      </b-button>
                      <b-button variant="transtration" size="md">
                        <i class="bx bxs-edit-alt fs-4 text-info"></i>
                      </b-button>
                      <b-button variant="transtration" size="md">
                        <i class="bx bxs-trash fs-4 text-danger"></i>
                      </b-button>
                    </b-button-group>
                  </td>
                </tr>
                <tr v-if="filteredTeachers.length === 0">
                  <td colspan="9" class="text-center">Không có dữ liệu</td>
                </tr>
              </tbody>
            </table>
            <pagination
              :total="totalTeachers"
              :per-page="perPage"
              :current-page.sync="currentPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Pagination from '../../components/layout/Pagination.vue';
export default {
  data() {
    return {
      entries: [],
      searchQuery: "",
      currentPage: 1,
      perPage: 10,
    };
  },
  components: {
    Pagination,
  },
  computed: {
    ...mapGetters("teacher", ["teachers"]),
    filteredTeachers() {
      if (!this.searchQuery) {
        return this.teachers;
      }
      const query = this.searchQuery.toLowerCase();
      return this.teachers.filter((teacher) => {
        return (
          teacher.name.toLowerCase().includes(query) ||
          teacher.phone.toLowerCase().includes(query)
        );
      });
    },  
    totalTeachers() {
      return this.filteredTeachers.length;
    },
    paginatedTeachers() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredTeachers.slice(start, end);
    }
  },
  methods: {
    ...mapActions("teacher", ["ListTeachers", "UpdateTeacher"]),
    async getListTeachers() {
      const response = await this.ListTeachers(this.$route.query);
      if (response?.status == 200) {
        this.entries = response?.data?.data ?? [];
      } else {
        this.entries = this.teachers;
      }
    },
    async updateTeacher() {
      this.UpdateTeacher({ id: "", body: {} });
    },
    
  },
  created() {
    this.getListTeachers();
    this.updateTeacher();
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
.table-nowrap .table td,
.table-nowrap .table th {
  white-space: nowrap;
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
  
