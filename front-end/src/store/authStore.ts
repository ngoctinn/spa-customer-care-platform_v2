import { AuthTokens, User } from "@/types";
import { create } from "zustand";

interface AuthState {
  // State
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initial state
  user: null,
  tokens: null,
  isLoading: false,
  isAuthenticated: false,

  // Actions
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setTokens: (tokens) =>
    set({
      tokens,
    }),

  setIsLoading: (isLoading) =>
    set({
      isLoading,
    }),

  login: (user, tokens) =>
    set({
      user,
      tokens,
      isAuthenticated: true,
      isLoading: false,
    }),

  logout: () =>
    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  updateUser: (userData) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    })),
}));
