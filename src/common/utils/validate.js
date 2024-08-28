export function getMaxDate() {
  return new Date().toISOString().split("T")[0];
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
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

export function validateRegisterForm(form) {
  const errors = {};

  if (!form.usename) {
    errors.usename = "Họ tên không được để trống";
  }

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

export function validateFormClass(form) {
  const errors = {};

  if (!form.classId) {
    errors.classId = "Mã lớp không được để trống";
  }

  if (!form.className) {
    errors.className = "Tên lớp không được để trống";
  }

  if (!form.teacher) {
    errors.teacher = "Vui lòng chọn giáo viên";
  }

  return errors;
}

export function validateFormSubject(form) {
  const errors = {};

  if (!form.subjectCode) {
    errors.subjectCode = "Mã môn học không được để trống";
  }
  if (!form.subjectName) {
    errors.subjectName = "Tên môn học không được để trống";
  }
  if (!form.credits) {
    errors.credits = "Số tín chỉ không được để trống";
  }
  if (!form.term) {
    errors.term = "Học kỳ không được để trống";
  }
  if (!form.academicYearStart) {
    errors.academicYearStart = "Năm bắt đầu và kết thúc không được đển trống";
  }
  if (!form.academicYearEnd) {
    errors.academicYearEnd = "Năm kết thúc và kết thúc không được đển trống";
  }
  if (!form.department) {
    errors.department = "Khoa không được để trống";
  }

  return errors;
}
