<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-12 mb-3 mb-lg-5">
        <div class="overflow-hidden card table-nowrap table-card">
          <div
            class="card-header d-flex justify-content-center align-items-center py-3"
          >
            <h5 class="mb-0 text-center">Danh sách học sinh</h5>
          </div>
          <div class="table-responsive">
            <table class="table table-striped table-hover mb-0">
              <thead class="small text-uppercase bg-body text-muted">
                <tr>
                  <th>Họ tên</th>
                  <th>Ngày sinh</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Lớp học</th>
                  <th>Giáo viên chủ nhiệm</th>
                  <th class="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr class="align-middle">
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        class="avatar sm rounded-pill me-3 flex-shrink-0"
                        alt="Khách hàng"
                      />
                      <div>
                        <div class="h6 mb-0 lh-1">Mark Voldov</div>
                      </div>
                    </div>
                  </td>
                  <td>21 Tháng 9, 1990</td>
                  <td>(555) 123-4567</td>
                  <td>1234 Elm Street, Springfield</td>
                  <td>Lớp A</td>
                  <td>Cô Johnson</td>
                  <td class="text-end">
                    <div class="dropdown">
                      <a
                        data-bs-toggle="dropdown"
                        href="#"
                        class="btn p-1"
                        aria-expanded="false"
                      >
                        <i class="fa fa-bars" aria-hidden="true"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="#!" class="dropdown-item">Xem Chi Tiết</a>
                        <a href="#!" class="dropdown-item">Xóa Người Dùng</a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="align-middle">
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        class="avatar sm rounded-pill me-3 flex-shrink-0"
                        alt="Khách hàng"
                      />
                      <div>
                        <div class="h6 mb-0 lh-1">Topias Kantola</div>
                      </div>
                    </div>
                  </td>
                  <td>15 Tháng 5, 1995</td>
                  <td>(555) 987-6543</td>
                  <td>5678 Maple Avenue, Lincoln</td>
                  <td>Lớp B</td>
                  <td>Thầy Smith</td>
                  <td class="text-end">
                    <div class="dropdown">
                      <a data-bs-toggle="dropdown" href="#" class="btn p-1">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="#!" class="dropdown-item">Xem Chi Tiết</a>
                        <a href="#!" class="dropdown-item">Xóa Người Dùng</a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="align-middle">
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        class="avatar sm rounded-pill me-3 flex-shrink-0"
                        alt="Khách hàng"
                      />
                      <div>
                        <div class="h6 mb-0 lh-1">Anaiah Whitten</div>
                      </div>
                    </div>
                  </td>
                  <td>12 Tháng 6, 2000</td>
                  <td>(555) 234-5678</td>
                  <td>9101 Oak Street, Maplewood</td>
                  <td>Lớp C</td>
                  <td>Cô Davis</td>
                  <td class="text-end">
                    <div class="dropdown">
                      <a data-bs-toggle="dropdown" href="#" class="btn p-1">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="#!" class="dropdown-item">Xem Chi Tiết</a>
                        <a href="#!" class="dropdown-item">Xóa Người Dùng</a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="align-middle">
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar4.png"
                        class="avatar sm rounded-pill me-3 flex-shrink-0"
                        alt="Khách hàng"
                      />
                      <div>
                        <div class="h6 mb-0 lh-1">Wyatt Morris</div>
                      </div>
                    </div>
                  </td>
                  <td>04 Tháng 6, 1992</td>
                  <td>(555) 345-6789</td>
                  <td>1112 Birch Road, Oakdale</td>
                  <td>Lớp D</td>
                  <td>Thầy Brown</td>
                  <td class="text-end">
                    <div class="dropdown">
                      <a data-bs-toggle="dropdown" href="#" class="btn p-1">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="#!" class="dropdown-item">Xem Chi Tiết</a>
                        <a href="#!" class="dropdown-item">Xóa Người Dùng</a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="align-middle">
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar5.png"
                        class="avatar sm rounded-pill me-3 flex-shrink-0"
                        alt="Khách hàng"
                      />
                      <div>
                        <div class="h6 mb-0 lh-1">Eliana Stout</div>
                      </div>
                    </div>
                  </td>
                  <td>01 Tháng 6, 1994</td>
                  <td>(555) 456-7890</td>
                  <td>1314 Pine Lane, Brookside</td>
                  <td>Lớp E</td>
                  <td>Cô Wilson</td>
                  <td class="text-end">
                    <div class="dropdown">
                      <a data-bs-toggle="dropdown" href="#" class="btn p-1">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="#!" class="dropdown-item">Xem Chi Tiết</a>
                        <a href="#!" class="dropdown-item">Xóa Người Dùng</a>
                      </div>
                    </div>
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
  background-color: #44b97c;
}
</style>
