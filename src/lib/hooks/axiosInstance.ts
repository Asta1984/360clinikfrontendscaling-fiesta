import axios from "axios";
import { useAuthStore } from "../../stores/authStore";

const axiosInstance = axios.create({
  baseURL: "https://three60clinicanimated-eureka.onrender.com/api/v1",
});

// Add the Authorization header to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
