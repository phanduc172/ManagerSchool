import * as Swal from 'sweetalert2';

export const showDeleteConfirmation = async () => {
  const result = await Swal.fire({
    title: "Bạn có chắc chắn xóa?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Hủy"
  });

  return result.isConfirmed;
};

export const showSuccessMessage = () => {
  Swal.fire({
    title: "Thành công!",
    icon: "success",
    confirmButtonText: "Đóng"
  });
};

export const showErrorMessage = () => {
  Swal.fire({
    title: "Thất bại!",
    icon: "error",
    confirmButtonText: "Đóng"
  });
};

export const showSuccessUpdate = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Cập nhật thành công!",
    showConfirmButton: false,
    timer: 1500
  });
};
