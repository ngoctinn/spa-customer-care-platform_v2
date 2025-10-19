"use client";

import { API_ENDPOINTS } from "@/config/constants";
import { apiClient } from "@/lib/api/client";
import { TokenStorage } from "@/lib/auth/storage";
import { useAuthStore } from "@/store/authStore";
import { AuthTokens, LoginRequest, RegisterRequest, User } from "@/types";
import { useEffect } from "react";

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setUser,
    setIsLoading,
  } = useAuthStore();

  // Initialize auth from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const hasToken = TokenStorage.hasTokens();
      if (hasToken) {
        try {
          setIsLoading(true);
          const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
          setUser(response.data);
        } catch (error) {
          console.error("Failed to initialize auth:", error);
          TokenStorage.clearTokens();
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();
  }, [setUser, setIsLoading]);

  // Login function
  const handleLogin = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post<{
        user: User;
        tokens: AuthTokens;
      }>(API_ENDPOINTS.AUTH.LOGIN, data);

      const { user, tokens } = response.data;
      TokenStorage.saveTokens(tokens);
      login(user, tokens);
      return { success: true };
    } catch (error: any) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const handleRegister = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post<{
        user: User;
        tokens: AuthTokens;
      }>(API_ENDPOINTS.AUTH.REGISTER, data);

      const { user, tokens } = response.data;
      TokenStorage.saveTokens(tokens);
      login(user, tokens);
      return { success: true };
    } catch (error: any) {
      console.error("Register failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      TokenStorage.clearTokens();
      logout();
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};
