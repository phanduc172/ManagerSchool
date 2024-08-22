<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-12 mb-3 mb-lg-5">
        <div class="overflow-hidden card table-nowrap table-card">
          <div
            class="card-header d-flex justify-content-center align-items-center py-3"
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
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr class="align-middle">
                  <td class="text-center">1</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        class="avatar sm rounded-pill me-3 flex-shrink-0"
                        alt="Giáo viên"
                      />
                      <div>
                        <div class="h6 mb-0 truncate">Nguyễn Văn A</div>
                      </div>
                    </div>
                  </td>
                  <td>01/01/1980</td>
                  <td>
                    <span class="d-inline-block align-middle">0909123456</span>
                  </td>
                  <td class="truncate" style="max-width: 500px;">123 Đường ABC, Quận 1, TP.HCM</td>
                  <td>Lớp 10A1</td>
                  <td>Khoa Toán</td>
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
                <tr class="align-middle">
                  <td class="text-center">1</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        class="avatar sm rounded-pill me-3 flex-shrink-0"
                        alt="Giáo viên"
                      />
                      <div>
                        <div class="h6 mb-0 lh-1 truncate">Trần Thị B</div>
                      </div>
                    </div>
                  </td>
                  <td>15/05/1985</td>
                  <td>
                    <span class="d-inline-block align-middle truncate">0918123456</span>
                  </td>
                  <td>456 Đường XYZ, Quận 3, TP.HCM</td>
                  <td>Lớp 11B2</td>
                  <td>Khoa Văn</td>
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
                <tr class="align-middle">
                  <td class="text-center">1</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        class="avatar sm rounded-pill me-3 flex-shrink-0"
                        alt="Giáo viên"
                      />
                      <div>
                        <div class="h6 mb-0 lh-1 truncate">Lê Văn C</div>
                      </div>
                    </div>
                  </td>
                  <td>22/09/1990</td>
                  <td>
                    <span class="d-inline-block align-middle">0922123456</span>
                  </td>
                  <td>789 Đường DEF, Quận 5, TP.HCM</td>
                  <td>Lớp 12C3</td>
                  <td>Khoa Hóa</td>
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
export default {};
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
</style>
  
