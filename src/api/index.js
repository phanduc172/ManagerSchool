const api = {
  Listeachers: "/api/teachers",
  CreateTeacher: "/api/teachers",
  UpdateTeacher: "/api/teachers/{id}",
  DeleteTeacher: "/api/teachers/{id}",

  params(endpoint, params) {
   
    let url = this[endpoint];
    
    if (url) {
      for (const key in params) {
        url =  url.replace(`{${key}}`, params[key]);
      }
    }
    return url
  },
};

export default api;
