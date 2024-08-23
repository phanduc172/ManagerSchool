<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between mb-3">
      <div class="input-group w-50 shadow-sm">
        <input type="text" class="form-control" placeholder="Tìm kiếm giáo viên...">
      </div>  
      <button class="btn btn-outline-success border-2 shadow-sm">Thêm</button>
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
                  v-for="(teacher, index) in teachers"
                  :key="teacher.id"
                  class="align-middle"
                >
                  <td class="text-center">{{ index + 1 }}</td>
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
                      <b-button variant="success" size="sm">
                        <b-icon icon="eye" class="small"></b-icon>
                      </b-button>
                      <b-button variant="warning" size="sm">
                        <b-icon icon="pencil" class="small text-white"></b-icon>
                      </b-button>
                      <b-button variant="danger" size="sm">
                        <b-icon icon="trash" class="small"></b-icon>
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
export default {
  data() {
    return {
      entries: [],
    };
  },
  computed: {
    ...mapGetters("teacher", ["teachers"]),
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
</style>
  
