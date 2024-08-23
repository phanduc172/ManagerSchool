<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-12 mb-3 mb-lg-5">
        <div class="overflow-hidden card table-nowrap table-card">
          <div
            class="card-header d-flex justify-content-center align-items-center py-3 header-bordered"
          >
            <h5 class="mb-0 text-center">Danh sách học sinh</h5>
          </div>
          <div class="table-responsive">
            <table class="table table-striped table-hover mb-0">
              <thead class="small text-uppercase bg-body text-muted">
                <tr class="text-center">
                  <th>Họ tên</th>
                  <th>Giới tính</th>
                  <th>Ngày sinh</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Lớp học</th>
                  <th>Giáo viên chủ nhiệm</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="student in students"
                  :key="student.id"
                  class="align-middle"
                >
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
                  <td>{{ student.gender }}</td>
                  <td>{{ student.birthdate }}</td>
                  <td>{{ student.phone }}</td>
                  <td class="truncate" style="max-width: 500px;">{{ student.address }}</td>
                  <td>{{ student.class }}</td>
                  <td class="truncate">{{ student.homeroomTeacher }}</td>
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
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      entries: [],
    };
  },
  computed: {
    ...mapGetters("student",["students"]),
  },
  methods: {
    ...mapActions("student",['ListStudents']),
    async getListStudent() {
      const response = await this.ListStudents(this.$router.query);
      if(response?.status == 200) {
        this.entries = response?.data?.data ?? [];
      } else {
        this.entries = this.students;
      }
    }
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
</style>
