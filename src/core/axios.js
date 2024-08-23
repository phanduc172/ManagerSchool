import axios from "axios";
const instance = axios.create({
  baseURL: "http://192.168.1.10:8080/",
  timeout: 10000,
});

export default instance;
