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
            <table class="table table-striped table-hover mb-0 table-wrap">
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
                  v-for="(terms, index) in entries"
                  :key="terms.id"
                  class="align-middle text-center"
                >
                  <td class="text-center">
                    {{
                      searchQuery
                        ? index + 1
                        : (currentPage - 1) * perPage + index + 1
                    }}
                  </td>
                  <td class="text-start">Học kì {{ terms.term_semester }}</td>
                  <td class="text-center">
                    {{ terms.term_from_year }} - {{ terms.term_to_year }}
                  </td>
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
                      <!-- <b-button
                        variant="transtration"
                        size="md"
                        @click="confirmDelete(terms.id)"
                      >
                        <i class="bx bxs-trash fs-4 text-danger"></i>
                      </b-button> -->
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
            :total="totalTerms"
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
import {
  showDeleteConfirmation,
  showErrorLogin,
  showSuccessMessage,
} from "../../common/utils/notifications";
import Pagination from "../../components/layout/Pagination.vue";
import { mapActions } from "vuex";

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
      listEntry: [],
      searchQuery: "",
      currentPage: this.page,
      perPage: this.limit,
      totalTerms: 0,
      loading: false,
      isShowPagi: true,
    };
  },
  methods: {
    ...mapActions("term", ["ListTerms", "DeleteTerm"]),
    async getAllTerms(page = this.currentPage) {
      this.loading = true;
      const response = await this.ListTerms({ page, limit: this.perPage });
      const listEntryResponse = await this.ListTerms({
        limit: response.data.total,
      });
      if (response?.status === 200 || listEntryResponse?.status === 200) {
        this.entries = response.data.data;
        this.listEntry = listEntryResponse.data.data;
        this.totalTerms = listEntryResponse.data.total;
      } else {
        this.listEntry = [];
        this.entries = [];
      }
      this.loading = false;
    },
    async confirmDelete(id) {
      const isConfirmed = await showDeleteConfirmation();
      if (isConfirmed) {
        const response = await this.DeleteTerm(id);
        if (response?.status === 200) {
          showSuccessMessage();
          this.getAllTerms();
        } else {
          showErrorLogin();
        }
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getAllTerms(this.currentPage);
    },
  },
  watch: {
    page(newPage) {
      this.currentPage = newPage;
      this.getAllTerms(newPage);
    },
    limit(newLimit) {
      this.perPage = newLimit;
      this.getAllTerms(this.currentPage);
    },
    searchQuery: {
      handler() {
        if (this.searchQuery) {
          this.isShowPagi = false;
        } else {
          this.isShowPagi = true;
        }
        this.entries = this.listEntry.filter((entry) => {
          if (!this.searchQuery) {
            return true;
          }
          return entry.term_semester == this.searchQuery;
        });
      },
      deep: true,
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
.dropdown-item:active {
  background-color: #44b97c !important;
}
</style>
