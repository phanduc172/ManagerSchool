
const api = {
  UserLogin: "/v1/user/login",
  UserRegiser: "/v1/user/create",
  FindEmail: "/v1/user/find-email",
  VerifyOTP: "/v1/user/otp/verify-otp",
  ChangePassword: "/v1/user/change-password",
  ForgotPassword: "/v1/user/forgot-password",

  GetProfile: "/v1/user/me", //Yêu cầu đặt lại tên api
  UpdateProfile: "/v1/user/me/update", // tương tự
  UpdateAvatar: "/v1/upload/image",

  ListAllAccount: "/v1/admin/all",
  ListAllAccountDeleted: "/v1/admin/user/pending-deletion",
  DeleteUser: "v1/admin/delete/{id}",
  CreateUser: "/v1/user/create",
  GetDetailUser: "",
  AddUserExcel: "/v1/admin/excel/upload/user",
  RestoreUser: "/v1/admin/user/restore/{id}",

  ListTeachers: "v1/admin/user/teacher/all",
  CreateTeacher: "/api/teachers",
  UpdateTeacher: "/api/teacher/{id}",
  DeleteTeacher: "/api/teacher/{id}",

  ListStudents: "/v1/admin/user/student/all",
  CreateStudent: "/api/students",
  UpdateStudent: "/api/students/{id}",
  DeleteStudent: "/api/students/{id}",

  ListClass: "/api/classes",
  CreateClass: "/api/classes",
  UpdateClass: "/api/classes/{id}",
  DeleteClass: "/api/classes/{id}",

  ListSubjects: "/v1/admin/subject/all",
  CreateSubject: "/v1/admin/subject/create",
  SubjectDetails: "/v1/admin/subject/details/{id}",
  UpdateSubject: "/v1/admin/subject/{id}",
  DeleteSubject: "/v1/admin/subject/{id}",

  ListMajor: "/v1/admin/major/all",
  CreateMajor: "/v1/admin/major/add",
  MajorDetails: "/v1/admin/major/details/{id}",
  UpdateMajor: "/v1/admin/major/{id}",
  DeleteMajor: "/v1/admin/major/{id}",

  ListTerm: "/v1/admin/term/all",
  CreateTerm: "/v1/admin/term/add",
  TermDetail: "/v1/admin/term/details/{id}",
  UpdateTerm: "/v1/admin/term/{id}",
  DeleteTerm: "/v1/admin/term/{id}",

  StaticsTerm: "/v1/admin/statistical/term",


  params(endpoint, params) {
    let url = this[endpoint];
    if (url) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const regex = new RegExp(`\\{${key}\\}`, 'g');
          url = url.replace(regex, encodeURIComponent(params[key]));
        }
      }
    }
    return url;
  },
};

export default api;
