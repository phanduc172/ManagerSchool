import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/",
  // baseURL: "http://192.168.1.10:8080/",
  timeout: 10000,
  headers: {
    Authorization: sessionStorage.getItem("token"),
  }
});
instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // if (error?.status === 401) {
  //   sessionStorage.removeItem("token")
  //   window.location.href = "/"
  // }
  console.log(response)
  return Promise.reject(error.message);
});

export default instance;
