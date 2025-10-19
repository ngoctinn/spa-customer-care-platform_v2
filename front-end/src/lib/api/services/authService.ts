import { API_ENDPOINTS } from "@/config/constants";
import { apiClient } from "@/lib/api/client";
import { AuthTokens, UserResponse } from "@/types";

/**
 * Dịch vụ API cho module xác thực
 */

/**
 * Đăng nhập với email và mật khẩu
 */
export const authService = {
  /**
   * Đăng nhập với email và mật khẩu
   * @param email - Email người dùng
   * @param password - Mật khẩu người dùng
   * @returns Access token
   */
  async login(email: string, password: string): Promise<AuthTokens> {
    const response = await apiClient.post<AuthTokens>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        email,
        password,
      }
    );
    return response.data;
  },

  /**
   * Đăng ký tài khoản mới
   * @param email - Email người dùng
   * @param password - Mật khẩu người dùng
   * @returns Thông báo đăng ký thành công
   */
  async register(
    email: string,
    password: string
  ): Promise<{
    message: string;
    email: string;
  }> {
    const response = await apiClient.post<{
      message: string;
      email: string;
    }>(API_ENDPOINTS.AUTH.REGISTER, {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Xác minh email từ token
   * @param token - Token xác minh từ email
   * @returns Thông báo xác minh thành công
   */
  async verifyEmail(token: string): Promise<{
    message: string;
    email: string;
  }> {
    const response = await apiClient.post<{
      message: string;
      email: string;
    }>(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
      token,
    });
    return response.data;
  },

  /**
   * Gửi lại email xác minh
   * @param email - Email người dùng
   * @returns Thông báo gửi lại email
   */
  async resendVerificationEmail(email: string): Promise<{
    message: string;
    email?: string;
  }> {
    const response = await apiClient.post<{
      message: string;
      email?: string;
    }>(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
      email,
    });
    return response.data;
  },

  /**
   * Làm mới access token
   * @returns Access token mới
   */
  async refreshToken(): Promise<AuthTokens> {
    const response = await apiClient.post<AuthTokens>(
      API_ENDPOINTS.AUTH.REFRESH
    );
    return response.data;
  },

  /**
   * Đăng xuất
   * @returns Thông báo đăng xuất thành công
   */
  async logout(): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      API_ENDPOINTS.AUTH.LOGOUT
    );
    return response.data;
  },

  /**
   * Lấy thông tin người dùng hiện tại
   * @returns Thông tin người dùng (id, email, roles, is_active)
   */
  async getCurrentUser(): Promise<UserResponse> {
    const response = await apiClient.get<UserResponse>(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },

  /**
   * Yêu cầu đặt lại mật khẩu (bước 1)
   * @param email - Email người dùng
   * @returns Thông báo email đã được gửi
   */
  async requestPasswordReset(email: string): Promise<{
    message: string;
  }> {
    const response = await apiClient.post<{
      message: string;
    }>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      email,
    });
    return response.data;
  },

  /**
   * Xác nhận đặt lại mật khẩu (bước 2)
   * @param token - Token từ email
   * @param newPassword - Mật khẩu mới
   * @returns Thông báo mật khẩu đã được đặt lại
   */
  async confirmPasswordReset(
    token: string,
    newPassword: string
  ): Promise<{
    message: string;
    email: string;
  }> {
    const response = await apiClient.post<{
      message: string;
      email: string;
    }>(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      new_password: newPassword,
    });
    return response.data;
  },
};
