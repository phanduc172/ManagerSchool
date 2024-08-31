<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between align-items-center my-3">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm học kì..."
      />
      <b-button href="/manager/term/create" variant="success fw-bold">
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
            <h5 class="mb-0 text-center">Danh sách học kì</h5>
          </div>
          <div class="table-responsive">
            <table class="table table-striped table-hover mb-0">
              <thead class="small text-uppercase bg-body text-muted">
                <tr class="text-center">
                  <th>STT</th>
                  <th>Học kì</th>
                  <th>Năm học</th>
                  <th>Tổng tín chỉ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(terms, index) in paginatedTerms"
                  :key="terms.id"
                  class="align-middle text-center"
                >
                  <td class="text-center">
                    {{ (currentPage - 1) * perPage + index + 1 }}
                  </td>
                  <td class="h6">{{ terms.term_semester }}</td>
                  <td class="text-center">{{ terms.term_from_year}} - {{ terms.term_to_year }}</td>
                  <td class="text-center">{{ terms.total_credits }}</td>
                  <td class="text-center">
                    <b-button-group>
                      <b-button
                        variant="transtration"
                        size="md"
                        :to="`/manager/term/edit/${terms.id}`"
                      >
                        <i class="bx bxs-edit-alt fs-4 text-info"></i>
                      </b-button>
                      <b-button
                        variant="transtration"
                        size="md"
                        @click="confirmDelete(terms.id)"
                      >
                        <i class="bx bxs-trash fs-4 text-danger"></i>
                      </b-button>
                    </b-button-group>
                  </td>
                </tr>
                <tr v-if="paginatedTerms?.length === 0 || !paginatedTerms">
                  <td colspan="8" class="text-center">Không có dữ liệu</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  showDeleteConfirmation,
  showErrorMessage,
  showSuccessMessage,
} from "../../common/utils/notifications";
import Pagination from "../../components/layout/Pagination.vue";
import { mapActions, mapGetters } from "vuex";

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
      totalSubjects: 0,
      loading: false,
    };
  },
  computed: {
    ...mapGetters("term", ["terms"]),
    filteredTerms() {
      if (!this.searchQuery) {
        return this.entries;
      }
      const query = this.searchQuery.toLowerCase();
      return this.entries.filter((entry) => {
        return entry.term_semester.toLowerCase().includes(query);
      });
    },
    paginatedTerms() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredTerms?.slice(start, end);
    },
  },
  methods: {
    ...mapActions("term", ["ListTerms", "DeleteTerm"]),
    async getAllTerms() {
      this.loading = true;
      try {
        const response = await this.ListTerms();
        if (response?.status === 200) {
          this.entries = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.getAllTerms();
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
