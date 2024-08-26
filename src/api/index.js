const api = {
  UserLogin: "/v1/user/login",
  GetProfile: "/v1/user/me",

  ListAllUsers: "/v1/admin/all",

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

  ListSubjects: "/api/classes",
  CreateSubject: "/api/classes",
  UpdateSubject: "/api/classes/{id}",
  DeleteSubject: "/api/classes/{id}",


  params(endpoint, params) {
    let url = this[endpoint];
    console.log(this)
    if (url) {
      for (const key in params) {
        url =  url.replace(`{${key}}`, params[key]);
      }
    }
    return url;
  },
};

export default api;
