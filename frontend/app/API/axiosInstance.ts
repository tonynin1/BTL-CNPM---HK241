import axios from "axios";
import { parseCookies, setCookie } from "nookies";
import { refreshAccessToken } from "./authService";

// Tạo một instance của axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8080",
});

// Interceptor cho requests
api.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const accessToken = cookies.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi là do accessToken hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Gán token mới vào header và thử lại request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
