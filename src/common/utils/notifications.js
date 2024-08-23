import Swal from 'sweetalert2';

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
    icon: "success"
  });
};

export const showErrorMessage = () => {
  Swal.fire({
    title: "Thất bại!",
    icon: "warning"
  });
};