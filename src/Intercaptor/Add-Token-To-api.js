import axios from "axios";
import { getCookie } from "../utils/cookieService";
const axiosInstance = axios.create({
  // baseURL: "https://gmark-v2-demo-api.greenmorph.net",
  baseURL: "https://192.168.1.16:7249",
});
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("token");
    if (accessToken) {
      if (config.headers)
        config.headers.authorization = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
