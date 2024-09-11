import * as Swal from "sweetalert2";

export const showDeleteConfirmation = async () => {
  const result = await Swal.fire({
    title: "Bạn có chắc chắn xóa?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Hủy",
  });

  return result.isConfirmed;
};

export const showToastSuccess = () => {
  Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "success",
    title: "Thành công",
  });
};

export const showSuccessMessage = () => {
  Swal.fire({
    title: "Thành công!",
    icon: "success",
    confirmButtonText: "Đóng",
  });
};

export const showErrorMessage = () => {
  Swal.fire({
    title: "Thất bại!",
    icon: "error",
    confirmButtonText: "Đóng",
  });
};

export const showErrorLogin = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Tài khoản hoặc mật khẩu không chính xác!",
    showConfirmButton: false,
    timer: 5000,
  });
};
