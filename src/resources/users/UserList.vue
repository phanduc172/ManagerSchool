<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between mb-3">
      <div class="input-group w-50 shadow-sm">
        <input
          type="text"
          class="form-control"
          v-model="searchQuery"
          placeholder="Tìm kiếm người dùng..."
        />
      </div>
      <b-button-group>
        <b-dropdown right variant="success fw-bold">
          <template #button-content>
            <i class="bx bx-plus"></i> Thêm mới
          </template>

          <b-dropdown-item
            variant="success fw-bold"
            href="/manager/users/create"
          >
            Thủ công
          </b-dropdown-item>

          <b-dropdown-item
            variant="success fw-bold"
            href="/manager/users/readexcel"
          >
            Nhập từ Excel
          </b-dropdown-item>
        </b-dropdown>
      </b-button-group>
    </div>
    <div class="row">
      <div class="col-12 mb-3 mb-lg-5">
        <div class="overflow-hidden card table-nowrap table-card">
          <div
            class="card-header d-flex justify-content-center align-items-center py-3 header-bordered"
          >
            <h5 class="mb-0 text-center">Danh sách người dùng</h5>
          </div>
          <div class="table-responsive">
            <table class="table table-striped table-hover mb-0 table-wrap">
              <thead class="small text-uppercase bg-body text-muted">
                <tr class="text-center">
                  <th class="text-center">STT</th>
                  <th>Họ tên</th>
                  <th>Ngày sinh</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <!-- <th>Địa chỉ</th>
                  <th>Phòng ban</th> -->
                  <th style="min-width: 140px">Vai trò</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(user, index) in entries"
                  :key="user.id"
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
                        :src="user.avatar"
                        class="avatar sm rounded-pill me-3 flex-shrink-0"
                        alt="Giáo viên"
                        @error="handleImageError"
                      />
                      <div class="h6 mb-0 truncate">
                        {{ user.name }}
                      </div>
                    </div>
                  </td>
                  <td class="text-center minwidth">
                    {{ toVNTime(user.date_of_birth) }}
                  </td>
                  <td class="text-start">{{ user.email }}</td>
                  <td class="text-center">{{ user.phone }}</td>
                  <!-- <td class="text-start">{{ user.address }}</td>
                  <td class="text-start">{{ user.department }}</td> -->
                  <td class="text-center">
                    {{
                      user.role_type == "admin"
                        ? "Quản trị viên"
                        : user.role_type == "teacher"
                        ? "Giáo viên"
                        : "Học sinh"
                    }}
                  </td>
                  <td class="text-center">
                    <b-button-group>
                      <b-button
                        variant="transtration"
                        size="md"
                        :to="`/manager/users/edit/${user.Id}`"
                      >
                        <i class="bx bxs-edit-alt fs-4 text-info"></i>
                      </b-button>
                      <b-button
                        variant="transtration"
                        size="md"
                        @click="confirmDelete(user.Id)"
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
            :total="totalUsers"
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
import { mapActions, mapGetters } from "vuex";
import Pagination from "@/components/layout/Pagination.vue";
import {
  showDeleteConfirmation,
  showErrorMessage,
  showSuccessMessage,
} from "@/common/utils/notifications";
import moment from "moment";
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
      entries: [],
      listEntry: [],
      searchQuery: "",
      currentPage: this.page,
      perPage: this.limit,
      totalUsers: 0,
      defaultAvatar: "/avt.jpg",
      isShowPagi: true,
    };
  },
  components: { Pagination },
  computed: {
    ...mapGetters("user", ["users"]),
  },
  methods: {
    ...mapActions("user", [
      "ListAllAccount",
      "GetProfile",
      "DeleteUser",
      "searchUser",
    ]),
    toVNTime(time) {
      return moment(time).utc(7).format("DD-MM-YYYY");
    },
    handleImageError(event) {
      event.target.src = this.defaultAvatar;
    },
    async searchUser(searchQuery) {
      const response = await this.SearchUser(searchQuery);
      if (response?.status === 200) {
        this.entries = response.data.data;
      } else {
        this.entries = [];
      }
    },
    async getProfile() {
      const response = await this.GetProfile(this.$route.query);
      if (response?.status == 200) {
        this.entries = response.data.data;
      } else {
        this.entries = [];
      }
    },
    async getListAllAccount(page = this.currentPage) {
      const response = await this.ListAllAccount({ page, limit: this.perPage });

      const response2 = await this.ListAllAccount({
        limit: response.data.total,
      });
      console.log(response2.data.data);
      if (response2.status === 200) {
        this.listEntry = response2.data.data;
      }

      if (response?.status === 200) {
        this.entries = response.data.data;
        this.totalUsers = response.data.total;
      } else {
        this.entries = [];
      }
    },
    async confirmDelete(id) {
      const isConfirmed = await showDeleteConfirmation();
      if (isConfirmed) {
        const response = await this.DeleteUser(id);
        if (response.status === 200) {
          showSuccessMessage();
        } else if (response.status === 400) {
          showErrorMessage();
        }
      }
      this.getListAllAccount();
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getListAllAccount(this.currentPage);
    },
  },
  // watch: {
  //   searchQuery: {
  //     handler(newQuery) {
  //       if (newQuery.trim() === "") {
  //         this.getListAllAccount();
  //         this.isShowPagi = true;
  //       } else {
  //         this.isShowPagi = false;
  //         this.entries = this.listEntry.filter(
  //           (entry) =>
  //             entry.name.toLowerCase().includes(newQuery.toLowerCase()) ||
  //             entry.email.toLowerCase().includes(newQuery.toLowerCase())
  //         );
  //       }
  //     },
  //     deep: true,
  //   },
  // },
  created() {
    this.getListAllAccount();
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
  max-width: 400px !important;
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
.minwidth {
  min-width: 200px !important;
}
.dropdown-menu .dropdown-item:active {
  background-color: #44b97c;
}
</style>
