import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST_API,
  timeout: 30000,
  headers: {
    // Authorization: sessionStorage.getItem("token"),
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  }
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API error:", error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 401 || error.response && error.response.status === 500) {
      sessionStorage.removeItem("token");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

//

export default instance;
