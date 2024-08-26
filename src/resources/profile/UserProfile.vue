<template>
<div class="container mt-3">
		<div class="main-body">
			<div class="row">
				<div class="col-lg-4">
					<div class="card">
						<div class="card-body">
							<div class="d-flex flex-column align-items-center text-center">
								<label for="upload-image" class="position-relative">
									<img 
									:src="`${profile.avatar}`" 
									alt="Admin" 
									class="rounded-circle p-1 border border-secondary border-2" 
									width="150" 
									style="cursor: pointer;">
									<input class="d-none"
									type="file" 
									id="upload-image" 
									accept="image/*" 
									onchange="previewImage(event)">
								</label>
								<div class="mt-3">
									<h4>{{ profile.name }}</h4>
									<p class="text-secondary mb-1">Front-End Developer</p>
								</div>
							</div>
							<hr class="my-4">
						</div>
					</div>
				</div>
				<div class="col-lg-8">
					<div class="card">
						<div class="card-body ">
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0 ">Mã sinh viên</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="20T1020019">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Họ tên</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" name="name" :value="profile.name">
								</div>
							</div>
                            <div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Giới tính</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<select name="" id="" class="w-100 p-1 border-1 rounded border-secondary">
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                        <option value="other">Khác</option>
                                    </select>
								</div>
							</div>
                            <div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Ngày sinh</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="date" :max="maxDate" class="form-control" value="">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Email</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" :value="profile.email">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Số điện thoại</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="0912151596">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Địa chỉ</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="Bùi Thị Xuân, phường Phường Đúc, Thành phố Huế">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Vai trò</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="Học sinh" disabled>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-3"></div>
								<div class="col-sm-9 text-secondary">
									<div class="d-flex justify-content-center">
										<input type="button" class="btn btn-outline-secondary px-4 me-3" value="Làm mới">
										<input type="button" class="btn btn-primary px-4" value="Cập nhật">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getMaxDate } from '../../common/utils/validate';
export default {
	data() {
		return {
			maxDate: getMaxDate(),
		}
	},
	computed: {
		...mapGetters("auth",['profile'])
	},
	methods: {

	},
	created() {
		this.maxDate = getMaxDate();
	}
}
</script>

<style scoped>
body{
    background: #f7f7ff;
    margin-top:20px;
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid transparent;
    border-radius: .25rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
}
.me-2 {
    margin-right: .5rem!important;
}
</style>