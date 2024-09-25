
const api = {
  UserLogin: "/v1/api/user/login",
  UserRegiser: "/v1/api/user/create",
  FindEmail: "/v1/api/user/find-email",
  VerifyOTP: "/v1/api/user/otp/verify-otp",
  ChangePassword: "/v1/api/user/change-password",
  ForgotPassword: "/v1/api/user/forgot-password",
  Logout: "/v1/api/user/logout",

  GetProfile: "/v1/api/user/me", //Yêu cầu đặt lại tên api
  UpdateProfile: "/v1/api/user/me/update", // tương tự
  UpdateAvatar: "/v1/api/upload/image",

  ListAllAccount: "/v1/api/admin/all",
  ListAllAccountDeleted: "/v1/api/admin/user/pending-deletion",
  DeleteUser: "/v1/api/admin/delete/{id}",
  CreateUser: "/v1/api/user/create",
  GetDetailUser: "/v1/api/user/{id}",
  AddUserExcel: "/v1/api/admin/excel/upload/user",
  RestoreUser: "/v1/api/admin/user/restore/{id}",
  SearchUser: "/v1/api/admin/user/search?name={keyword}",

  ListTeachers: "/v1/api/admin/user/teacher/all",
  CreateTeacher: "/api/teachers",
  UpdateTeacher: "/v1/api/admin/update/{id}",
  DeleteTeacher: "/api/teacher/{id}",

  ListStudents: "/v1/api/admin/user/student/all",
  CreateStudent: "/api/students",
  UpdateStudent: "/v1/api/admin/update/{id}",
  DeleteStudent: "/api/students/{id}",

  ListClass: "/api/classes",
  CreateClass: "/api/classes",
  UpdateClass: "/api/classes/{id}",
  DeleteClass: "/api/classes/{id}",

  ListSubjects: "/v1/api/admin/subject/all",
  CreateSubject: "/v1/api/admin/subject/create",
  SubjectDetails: "/v1/api/admin/subject/details/{id}",
  UpdateSubject: "/v1/api/admin/subject/{id}",
  DeleteSubject: "/v1/api/admin/subject/{id}",

  ListMajor: "/v1/api/admin/major/all",
  CreateMajor: "/v1/api/admin/major/add",
  MajorDetails: "/v1/api/admin/major/details/{id}",
  UpdateMajor: "/v1/api/admin/major/{id}",
  DeleteMajor: "/v1/api/admin/major/{id}",

  ListTerm: "/v1/api/admin/term/all",
  CreateTerm: "/v1/api/admin/term/add",
  TermDetail: "/v1/api/admin/term/details/{id}",
  UpdateTerm: "/v1/api/admin/term/{id}",
  DeleteTerm: "/v1/api/admin/term/{id}",

  StaticsTerm: "/v1/api/admin/statistical/term",

  ListSchedules: "/v1/api/admin/schedule/all",
  CreateSchedule: "/v1/api/admin/schedule/add",
  UpdateSchedule: "/v1/api/admin/schedule/{id}",
  DeleteSchedule: "/v1/api/admin/schedule/{id}",
  GetDetailSchedule: "/v1/api/admin/schedule/details/{id}",

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
