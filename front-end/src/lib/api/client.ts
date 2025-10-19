import { API_CONFIG } from "@/config/constants";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

// Create Axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // For cookies if needed
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token to headers
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && originalRequest) {
      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const response = await axios.post(
            `${API_CONFIG.BASE_URL}/auth/refresh`,
            { refresh_token: refreshToken }
          );

          const { access_token } = response.data;
          localStorage.setItem("auth_token", access_token);

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Clear storage and redirect to login
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
