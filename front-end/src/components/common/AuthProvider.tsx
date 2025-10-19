"use client";

import { ROUTES } from "@/config/constants";
import { authService } from "@/lib/api/services/authService";
import { TokenStorage } from "@/lib/auth/storage";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider component cho authentication
 * Khởi tạo session và tự động làm mới token khi app load
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const { setUser, logout } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Kiểm tra xem có token trong localStorage
        const token = TokenStorage.getAccessToken();

        if (!token) {
          // Không có token, đảm bảo state được reset
          logout();
          return;
        }

        // Lấy thông tin người dùng hiện tại
        const user = await authService.getCurrentUser();
        setUser(user);
      } catch (error: any) {
        // Token không hợp lệ hoặc hết hạn
        TokenStorage.clearTokens();
        logout();

        // Redirect đến login nếu đang ở trang protected
        const currentPath = window.location.pathname;
        if (
          !currentPath.includes("/login") &&
          !currentPath.includes("/register") &&
          !currentPath.includes("/forgot-password") &&
          !currentPath.includes("/reset-password") &&
          !currentPath.includes("/verify-email")
        ) {
          router.push(ROUTES.LOGIN);
        }
      }
    };

    initializeAuth();
  }, [setUser, logout, router]);

  return <>{children}</>;
};
