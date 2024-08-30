import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.3:3000",
  timeout: 5000,
  headers: {
    Authorization: sessionStorage.getItem("token"),
  }
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi khi nhận được phản hồi lỗi từ server
    console.error("API error:", error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
