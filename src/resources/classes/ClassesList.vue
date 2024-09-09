<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between align-items-center my-3">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm học sinh..."
      />
      <b-button href="/manager/classes/create" variant="success fw-bold">
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
            <h5 class="mb-0 text-center">Danh sách lớp học</h5>
          </div>
          <div class="table-responsive">
            <table class="table table-striped table-hover mb-0">
              <thead class="small text-uppercase bg-body text-muted">
                <tr class="text-center">
                  <th>STT</th>
                  <th>Tên lớp</th>
                  <th>Giáo viên chủ nhiệm</th>
                  <th>Tổng số học sinh</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(classes, index) in paginatedClasses"
                  :key="index"
                  class="align-middle text-center"
                >
                  <td class="text-center">
                    {{ (currentPage - 1) * perPage + index + 1 }}
                  </td>
                  <td class="h6">{{ classes.nameClass }}</td>
                  <td class="text-start">{{ classes.nameTeacher }}</td>
                  <td>{{ classes.totalClass }}</td>
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
                <tr v-if="paginatedClasses.length === 0">
                  <td colspan="9" class="text-center">Không có dữ liệu</td>
                </tr>
              </tbody>
            </table>
            <pagination
              :total="totalClasses"
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
import Pagination from "../../components/layout/Pagination.vue";
export default {
  components: { Pagination },
  data() {
    return {
      searchQuery: "",
      currentPage: 1,
      perPage: 5,
    };
  },
  computed: {
    ...mapGetters("classes", ["classes"]),
    filteredClasses() {
      if (!this.searchQuery) {
        return this.classes;
      }
      const query = this.searchQuery.toLowerCase();
      return this.classes.filter((student) => {
        return (
          student.nameClass.toLowerCase().includes(query) ||
          student.nameTeacher.toLowerCase().includes(query)
        );
      });
    },
    totalClasses() {
      return this.filteredClasses.length;
    },
    paginatedClasses() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredClasses.slice(start, end);
    },
  },
  methods: {
    ...mapActions("classes", ["ListClass"]),
    async getListClasses() {
      await this.ListClass();
    },
  },
  created() {
    this.getListClasses();
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
  word-break: break-word;
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
  