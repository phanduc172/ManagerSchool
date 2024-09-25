export function deleteCookie(name) {
  document.cookie = name + '=; Max-Age=0; path=/; domain=' + window.location.hostname;
}

export function getMaxDate() {
  return new Date().toISOString().split("T")[0];
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validatePhoneNumber(phone) {
  const phoneRegex = /^(0[2|3|5|7|8|9])+([0-9]{8,9})$/;
  return phoneRegex.test(phone);
}

function validateDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function validateFormProfile(form) {
  const errors = {};

  if (!form.name) {
    errors.nameUpdate = "Họ tên không được để trống";
  }

  if (!form.gender) {
    errors.gender = "Vui lòng chọn giới tính";
  }

  if (!form.date) {
    errors.date = "Vui lòng chọn ngày sinh";
  } else if (!validateDate(form.date)) {
    errors.date = "Ngày sinh không hợp lệ";
  }

  if (!form.phone) {
    errors.phoneUpdate = "Số điện thoại không được để trống";
  } else if (!validatePhoneNumber(form.phone)) {
    errors.phone = "Số điện thoại không hợp lệ";
  }

  return errors;
}

export function validateLoginForm(form) {
  const errors = {};

  if (!form.email) {
    errors.email = "Email không được để trống";
  } else {
    if (!emailPattern.test(form.email)) {
      errors.email = "Email không hợp lệ";
    }
  }

  if (!form.password) {
    errors.password = "Mật khẩu không được để trống";
  } else if (form.password.length < 6) {
    errors.password = "Mật khẩu phải có tối thiểu 6 ký tự";
  } else if (form.password.length > 30) {
    errors.password = "Mật khẩu không được vượt quá 30 ký tự";
  }

  return errors;
}

export function validateRecoverForm(form) {
  const errors = {};

  if (!form.email) {
    errors.email = "Email không được để trống";
  } else {
    if (!emailPattern.test(form.email)) {
      errors.email = "Email không hợp lệ";
    }
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
  } else {
    if (!emailPattern.test(form.email)) {
      errors.email = "Email không hợp lệ";
    }
  }

  if (!form.password) {
    errors.password = "Mật khẩu không được để trống";
  }

  return errors;
}

export function validateFormTeacher(form) {
  const errors = {};
  if (!form.name) {
    errors.name = "Họ tên không được để trống";
  }
  if (!form.email) {
    errors.email = "Email không được để trống";
  } else {
    if (!emailPattern.test(form.email)) {
      errors.email = "Email không hợp lệ";
    }
  }
  if (!form.phone) {
    errors.phone = "Số điện thoại không được để trống";
  } else if (!validatePhoneNumber(form.phone)) {
    errors.phone = "Số điện thoại không hợp lệ";
  }
  if (!form.password) {
    errors.password = "Mật khẩu không được để trống";
  } else if (form.password.length < 6) {
    errors.password = "Mật khẩu phải có tối thiểu 6 ký tự";
  } else if (form.password.length > 30) {
    errors.password = "Mật khẩu không được vượt quá 30 ký tự";
  }

  return errors;
}

export function validateFormStudent(form) {
  const errors = {};
  if (!form.name) {
    errors.name = "Họ tên không được để trống";
  }
  if (!form.email) {
    errors.email = "Email không được để trống";
  } else {
    if (!emailPattern.test(form.email)) {
      errors.email = "Email không hợp lệ";
    }
  }
  if (!form.phone) {
    errors.phone = "Số điện thoại không được để trống";
  } else if (!validatePhoneNumber(form.phone)) {
    errors.phone = "Số điện thoại không hợp lệ";
  }
  if (!form.password) {
    errors.password = "Mật khẩu không được để trống";
  } else if (form.password.length < 6) {
    errors.password = "Mật khẩu phải có tối thiểu 6 ký tự";
  } else if (form.password.length > 30) {
    errors.password = "Mật khẩu không được vượt quá 30 ký tự";
  }
  if (!form.address) {
    errors.address = "Địa chỉ không được để trống";
  }
  if (!form.birthdate) {
    errors.birthdate = "Vui lòng chọn ngày sinh";
  }
  if (!form.gender) {
    errors.gender = "Vui lòng chọn giới tính";
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
  if (!form.termSemester) {
    errors.termSemester = "Học kỳ không được để trống";
  }
  if (!form.academicYearStart || !form.academicYearEnd) {
    errors.academicYearStart = "Năm bắt đầu và kết thúc không được để trống";
  } else if (form.academicYearStart >= form.academicYearEnd) {
    errors.academicYearStart = "Năm bắt đầu phải nhỏ hơn năm kết thúc";
  }
  if (!form.department) {
    errors.department = "Khoa không được để trống";
  }

  return errors;
}

export function validateFormMajor(form) {
  const errors = {};

  if (!form.majorId) {
    errors.majorId = "Mã ngành học không được để trống";
  }

  if (!form.majorName) {
    errors.majorName = "Tên ngành học không được để trống";
  }

  return errors;
}

export function validateFormTerm(form) {
  const errors = {}

  if (!form.termSemester) {
    errors.termSemester = "Học kì không được để trống";
  }
  if (!form.academicYearStart || !form.academicYearEnd) {
    errors.academicYearStart = "Năm bắt đầu và kết thúc không được để trống";
  } else if (form.academicYearStart >= form.academicYearEnd) {
    errors.academicYearStart = "Năm bắt đầu phải nhỏ hơn năm kết thúc";
  }


  return errors;
}

export function validateFormSchedule(form) {
  const errors = {}

  if (!form.termSemester) {
    errors.termSemester = "Học kì không được để trống";
  }
  if (!form.dayOfWeek) {
    errors.dayOfWeek = "Thứ không được để trống";
  }
  if (!form.room) {
    errors.room = "Phòng học không được để trống";
  }
  if (!form.lessonStart || !form.lessonEnd) {
    errors.lessonStart = "Tiết học không được để trống";
  } else if (form.lessonStart >= form.lessonEnd) {
    errors.lessonStart = "Tiết học bắt đầu phải nhỏ hơn tiết học kết thúc"
  }


  return errors;
}

export function validateCreateUserForm(form) {
  const errors = {};

  if (!form.name) {
    errors.name = "Họ tên không được để trống";
  } else if (!/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯưẠ-ỹ\s]+$/.test(form.name)) {
    errors.name = "Họ tên không hợp lệ";
  } else if (form.name.length > 100) {
    errors.name = "Họ tên không quá 100 kí tự"
  }


  if (!form.email) {
    errors.email = "Email không được để trống";
  } else {
    if (!emailPattern.test(form.email)) {
      errors.email = "Email không hợp lệ";
    }
  }

  if (!form.password) {
    errors.password = "Mật khẩu không được để trống";
  } else if (form.password.length < 6) {
    errors.password = "Mật khẩu phải có tối thiểu 6 ký tự";
  } else if (form.password.length > 30) {
    errors.password = "Mật khẩu không được vượt quá 30 ký tự";
  }
  if (!form.phone) {
    errors.phone = "Số điện thoại không được để trống";
  } else if (!validatePhoneNumber(form.phone)) {
    errors.phone = "Số điện thoại không hợp lệ";
  }
  if (!form.role) {
    errors.role = "Vai trò không được để trống";
  }

  return errors;
}


export function validateUpdateMeForm(form) {
  const errors = {};

  if (!form.name) {
    errors.name = "Họ tên không được để trống";
  } else if (!/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯưẠ-ỹ\s]+$/.test(form.name)) {
    errors.name = "Họ tên không hợp lệ";
  }

  if (!form.gender) {
    errors.gender = "Vui lòng chọn giới tính";
  }

  if (!form.date_of_birth) {
    errors.date_of_birth = "Vui lòng chọn ngày sinh";
  }

  if (!form.email) {
    errors.email = "Email không được để trống";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Email không hợp lệ";
  }

  if (!form.phone) {
    errors.phone = "Số điện thoại không được để trống";
  } else if (!/^\d{10,11}$/.test(form.phone)) {
    errors.phone = "Số điện thoại không hợp lệ";
  }

  return errors;
}


export function validateChangePasswordForm(form) {
  const errors = {};

  if (!form.oldPassword) {
    errors.oldPassword = "Mật khẩu cũ không được để trống";
  } else if (form.oldPassword.length < 6) {
    errors.oldPassword = "Mật khẩu cũ phải có tối thiểu 6 ký tự";
  } else if (form.oldPassword.length > 30) {
    errors.oldPassword = "Mật khẩu cũ không được vượt quá 30 ký tự";
  }

  if (!form.newPassword) {
    errors.newPassword = "Mật khẩu mới không được để trống";
  } else if (form.newPassword.length < 6) {
    errors.newPassword = "Mật khẩu mới phải có tối thiểu 6 ký tự";
  } else if (form.newPassword.length > 30) {
    errors.newPassword = "Mật khẩu mới không được vượt quá 30 ký tự";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Xác nhận mật khẩu không được để trống";
  } else if (form.confirmPassword !== form.newPassword) {
    errors.confirmPassword = "Xác nhận mật khẩu không khớp với mật khẩu mới";
  } else if (form.confirmPassword.length < 6) {
    errors.confirmPassword = "Xác nhận mật khẩu phải có tối thiểu 6 ký tự";
  } else if (form.confirmPassword.length > 30) {
    errors.confirmPassword = "Xác nhận mật khẩu không được vượt quá 30 ký tự";
  }

  return errors;
}

export function validateRecoverPasswordForm(form) {
  const errors = {};

  if (!form.newPassword) {
    errors.newPassword = "Mật khẩu mới không được để trống";
  } else if (form.newPassword.length < 6) {
    errors.newPassword = "Mật khẩu mới phải có tối thiểu 6 ký tự";
  } else if (form.newPassword.length > 30) {
    errors.newPassword = "Mật khẩu mới không được vượt quá 30 ký tự";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Xác nhận mật khẩu không được để trống";
  } else if (form.confirmPassword !== form.newPassword) {
    errors.confirmPassword = "Xác nhận mật khẩu không khớp với mật khẩu mới";
  } else if (form.confirmPassword.length < 6) {
    errors.confirmPassword = "Xác nhận mật khẩu phải có tối thiểu 6 ký tự";
  } else if (form.confirmPassword.length > 30) {
    errors.confirmPassword = "Xác nhận mật khẩu không được vượt quá 30 ký tự";
  }

  return errors;
}
