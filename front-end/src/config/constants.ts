// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000"),
} as const;

// Authentication
export const AUTH_CONFIG = {
  TOKEN_KEY: process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "auth_token",
  REFRESH_TOKEN_KEY:
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "refresh_token",
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || "Spa Customer Care Platform",
  URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
} as const;

// Feature Flags
export const FEATURES = {
  ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  NOTIFICATIONS: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === "true",
} as const;

// User Roles
export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  RECEPTIONIST = "receptionist",
  SPECIALIST = "specialist",
  CUSTOMER = "customer",
}

// Appointment Status
export enum AppointmentStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

// Service Status
export enum ServiceStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  CUSTOMERS: "/dashboard/customers",
  APPOINTMENTS: "/dashboard/appointments",
  SERVICES: "/dashboard/services",
  STAFF: "/dashboard/staff",
  SETTINGS: "/dashboard/settings",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    VERIFY_EMAIL: "/auth/verify-email",
    FORGOT_PASSWORD: "/auth/password-reset",
    RESET_PASSWORD: "/auth/confirm-password-reset",
  },
  CUSTOMERS: {
    LIST: "/customers",
    CREATE: "/customers",
    GET: (id: string) => `/customers/${id}`,
    UPDATE: (id: string) => `/customers/${id}`,
    DELETE: (id: string) => `/customers/${id}`,
  },
  APPOINTMENTS: {
    LIST: "/appointments",
    CREATE: "/appointments",
    GET: (id: string) => `/appointments/${id}`,
    UPDATE: (id: string) => `/appointments/${id}`,
    DELETE: (id: string) => `/appointments/${id}`,
  },
  SERVICES: {
    LIST: "/services",
    CREATE: "/services",
    GET: (id: string) => `/services/${id}`,
    UPDATE: (id: string) => `/services/${id}`,
    DELETE: (id: string) => `/services/${id}`,
  },
  STAFF: {
    LIST: "/staff",
    CREATE: "/staff",
    GET: (id: string) => `/staff/${id}`,
    UPDATE: (id: string) => `/staff/${id}`,
    DELETE: (id: string) => `/staff/${id}`,
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "Please login to continue.",
  FORBIDDEN: "You do not have permission to access this resource.",
  NOT_FOUND: "Resource not found.",
  INTERNAL_ERROR: "An error occurred. Please try again later.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  EMAIL_EXISTS: "This email is already registered.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  REGISTER_SUCCESS: "Registration successful! Please verify your email.",
  LOGOUT_SUCCESS: "Logout successful!",
  CREATE_SUCCESS: "Created successfully!",
  UPDATE_SUCCESS: "Updated successfully!",
  DELETE_SUCCESS: "Deleted successfully!",
} as const;
