import { AUTH_CONFIG } from "@/config/constants";
import { AuthTokens } from "@/types";

// Token storage utilities
export const TokenStorage = {
  // Save tokens
  saveTokens: (tokens: AuthTokens) => {
    try {
      localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, tokens.access_token);
      localStorage.setItem(AUTH_CONFIG.REFRESH_TOKEN_KEY, tokens.refresh_token);
    } catch (error) {
      console.error("Failed to save tokens", error);
    }
  },

  // Get access token
  getAccessToken: (): string | null => {
    try {
      return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    } catch {
      return null;
    }
  },

  // Get refresh token
  getRefreshToken: (): string | null => {
    try {
      return localStorage.getItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
    } catch {
      return null;
    }
  },

  // Clear all tokens
  clearTokens: () => {
    try {
      localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
      localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Failed to clear tokens", error);
    }
  },

  // Check if tokens exist
  hasTokens: (): boolean => {
    try {
      return !!localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    } catch {
      return false;
    }
  },
};
