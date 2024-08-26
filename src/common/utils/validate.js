export function getMaxDate() {
  return new Date().toISOString().split("T")[0];
}

function validatePhoneNumber(phone) {
  const phoneRegex = /^(0[2|3|5|7|8|9])+([0-9]{8,9})$/;
  return phoneRegex.test(phone);
}

export function validateLoginForm(form) {
  const errors = {};

  if (!form.email) {
    errors.email = "Email không được để trống";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Email không hợp lệ";
  }

  if (!form.password) {
    errors.password = "Mật khẩu không được để trống";
  }

  return errors;
}

export function validateFormTeacher(form) {
  const errors = {};

  if (!form.id) {
    errors.id = "Mã giáo viên không được để trống";
  }

  if (!form.name) {
    errors.name = "Họ tên không được để trống";
  }

  if (!form.birthdate) {
    errors.birthdate = "Vui lòng chọn ngày sinh";
  }

  if (!form.phone) {
    errors.phone = "Số điện thoại không được để trống";
  } else if (!validatePhoneNumber(form.phone)) {
    errors.phone = "Số điện thoại không hợp lệ";
  }

  if (!form.address) {
    errors.address = "Địa chỉ không được để trống";
  }

  if (!form.classes) {
    errors.classes = "Vui lòng chọn lớp học";
  }

  return errors;
}

export function validateFormStudent(form) {
  const errors = {};

  if (!form.id) {
    errors.id = "Mã sinh viên không được để trống";
  }

  if (!form.name) {
    errors.name = "Họ tên không được để trống";
  }

  if (!form.gender) {
    errors.gender = "Vui lòng chọn giới tính";
  }

  if (!form.birthdate) {
    errors.birthdate = "Vui lòng chọn ngày sinh";
  }

  if (!form.phone) {
    errors.phone = "Số điện thoại không được để trống";
  } else if (!validatePhoneNumber(form.phone)) {
    errors.phone = "Số điện thoại không hợp lệ";
  }

  if (!form.address) {
    errors.address = "Địa chỉ không được để trống";
  }

  return errors;
}
