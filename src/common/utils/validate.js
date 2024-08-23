export function getMaxDate() {
    return new Date().toISOString().split('T')[0];
}

export function validateLoginForm(form) {
    const errors = {};
  
    if (!form.email) {
      errors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Email không hợp lệ';
    }
  
    if (!form.password) {
      errors.password = 'Mật khẩu không được để trống';
    }
  
    return errors;
  }