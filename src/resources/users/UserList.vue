<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between mb-3">
      <div class="input-group w-50 shadow-sm">
        <input
          type="text"
          class="form-control"
          placeholder="Tìm kiếm người dùng..."
        />
      </div>
      <button class="btn btn-success border-2 shadow-sm">Thêm</button>
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
            <table class="table mb-0">
              <thead class="small text-uppercase bg-body text-muted">
                <tr class="text-center">
                  <th class="text-center">STT</th>
                  <th>Họ tên</th>
                  <th>Ngày sinh</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Phòng ban</th>
                  <th>Ngày nhập học</th>
                  <th>Ngày bắt đầu</th>
                  <th>Vai trò</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(user, index) in entries"
                  :key="user.id"
                  class="align-middle"
                >
                  <td class="text-center">{{ index + 1 }}</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        :src="user.avatar"
                        class="avatar sm rounded-pill me-3 flex-shrink-0"
                        alt="Giáo viên"
                      />
                      <div>
                        <div class="h6 mb-0 truncate">{{ user.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">{{ user.date_of_birth }}</td>
                  <td class="text-center">{{ user.email }}</td>
                  <td class="text-center">{{ user.phone }}</td>
                  <td class="text-center">{{ user.address }}</td>
                  <td class="text-center">{{ user.department }}</td>
                  <td class="text-center">{{ user.enrollment_date }}</td>
                  <td class="text-center">{{ user.hire_date }}</td>
                  <td class="text-center">{{ user.role_type }}</td>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapActions, mapGetters } from "vuex";
import { formatDate } from "@/common/utils/validate";
export default {
  data() {
    return {
      entries: [],
    };
  },
  computed: {
    ...mapGetters("user", ["users"]),
  },
  methods: {
    ...mapActions("user", ["ListAllAccount", "GetProfile"]),
    async getProfile() {
      const response = await this.GetProfile(this.$route.query);
      if (response?.status == 200) {
        this.entries = response?.data?.data ?? [];
      } else {
        this.entries = this.users;
      }
    },
    async getListAllAccount() {
      const response = await this.ListAllAccount(this.$route.query);
      if (response?.status == 200) {
        this.entries =
          response.data?.data.map((entry) => {
            return {
              ...entry,
              date_of_birth: formatDate(entry.date_of_birth),
              enrollment_date: formatDate(entry.enrollment_date),
              hire_date: formatDate(entry.hire_date),
              created_at: formatDate(entry.created_at),
              updated_at: formatDate(entry.updated_at),
            };
          }) ?? [];
      } else {
        this.entries = this.users;
      }
    },
  },
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
</style>
    
  