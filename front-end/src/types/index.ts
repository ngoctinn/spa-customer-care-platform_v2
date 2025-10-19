import { AppointmentStatus, ServiceStatus, UserRole } from "@/config/constants";

// User & Auth Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  // New: Array of user roles (một user có thể có nhiều roles)
  roles?: Array<{
    id: number;
    name: UserRole;
    description?: string;
  }>;

  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  password_confirm: string;
  full_name: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
  password_confirm: string;
}

// Customer Types
export interface Customer {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  avatar?: string;
  skin_type?: string;
  health_notes?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateCustomerRequest {
  full_name: string;
  email: string;
  phone: string;
  skin_type?: string;
  health_notes?: string;
}

export interface UpdateCustomerRequest extends Partial<CreateCustomerRequest> {}

// Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  image_url?: string;
  status: ServiceStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  image_url?: string;
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {}

// Appointment Types
export interface Appointment {
  id: string;
  customer_id: string;
  service_id: string;
  staff_id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAppointmentRequest {
  customer_id: string;
  service_id: string;
  staff_id: string;
  appointment_date: string;
  start_time: string;
  notes?: string;
}

export interface UpdateAppointmentRequest
  extends Partial<CreateAppointmentRequest> {}

// Staff Types
export interface Staff {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  specializations?: string[];
  certifications?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateStaffRequest {
  full_name: string;
  email: string;
  phone: string;
  role: UserRole;
  specializations?: string[];
}

export interface UpdateStaffRequest extends Partial<CreateStaffRequest> {}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// Dashboard Types
export interface DashboardStats {
  total_revenue: number;
  new_customers: number;
  total_appointments: number;
  pending_appointments: number;
}

/**
 * Dashboard Widget interface
 * Đại diện cho một widget trên dashboard
 */
export interface DashboardWidget {
  id: string;
  title: string;
  type: "stat" | "chart" | "table" | "list";
  roles: UserRole[]; // Roles có thể xem widget này
  data?: Record<string, any>; // Widget data (dynamic)
}

// Error Types
export interface ApiError {
  status: number;
  message: string;
  details?: Record<string, unknown>;
}

// Form Types
export interface FormError {
  field: string;
  message: string;
}
