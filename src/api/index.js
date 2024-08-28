const api = {
  UserLogin: "/v1/user/login",
  UserRegiser: "/v1/user/create",

  GetProfile: "/v1/user/me",
  ListAllAccount: "/v1/admin/all",

  ListTeachers: "/api/teachers",
  CreateTeacher: "/api/teachers",
  UpdateTeacher: "/api/teachers/{id}",
  DeleteTeacher: "/api/teachers/{id}",

  ListStudents: "/api/students",
  CreateStudent: "/api/students",
  UpdateStudent: "/api/students/{id}",
  DeleteStudent: "/api/students/{id}",

  ListClass: "/api/classes",
  CreateClass: "/api/classes",
  UpdateClass: "/api/classes/{id}",
  DeleteClass: "/api/classes/{id}",

  ListSubjects: "/v1/subject/all",
  CreateSubject: "/v1/admin/subject/add",
  SubjectDetails: "/v1/subject/details/{id}",
  UpdateSubject: "/v1/admin/subject/{id}",
  DeleteSubject: "/v1/admin/subject/{id}",

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
