import { z } from "zod";

// Common validation schemas
export const emailSchema = z.string().email("Email không hợp lệ");

export const passwordSchema = z
  .string()
  .min(8, "Mật khẩu phải ít nhất 8 ký tự")
  .regex(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ hoa")
  .regex(/[a-z]/, "Mật khẩu phải có ít nhất một chữ thường")
  .regex(/[0-9]/, "Mật khẩu phải có ít nhất một số");

export const phoneSchema = z
  .string()
  .regex(/^(\+84|0)[0-9]{9,10}$/, "Số điện thoại không hợp lệ");

export const urlSchema = z.string().url("URL không hợp lệ");

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register schema
export const registerSchema = z
  .object({
    email: emailSchema,
    full_name: z.string().min(2, "Tên phải ít nhất 2 ký tự"),
    password: passwordSchema,
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Mật khẩu không trùng khớp",
    path: ["password_confirm"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Customer schema
export const customerSchema = z.object({
  full_name: z.string().min(2, "Tên phải ít nhất 2 ký tự"),
  email: emailSchema.optional().or(z.literal("")),
  phone: phoneSchema,
  skin_type: z.string().optional(),
  health_notes: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;

// Service schema
export const serviceSchema = z.object({
  name: z.string().min(2, "Tên dịch vụ phải ít nhất 2 ký tự"),
  description: z.string().min(10, "Mô tả phải ít nhất 10 ký tự"),
  price: z.number().positive("Giá phải là số dương"),
  duration_minutes: z.number().positive("Thời lượng phải là số dương"),
  image_url: z.string().url().optional().or(z.literal("")),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

// Appointment schema
export const appointmentSchema = z.object({
  customer_id: z.string().min(1, "Khách hàng là bắt buộc"),
  service_id: z.string().min(1, "Dịch vụ là bắt buộc"),
  staff_id: z.string().min(1, "Nhân viên là bắt buộc"),
  appointment_date: z.string().min(1, "Ngày hẹn là bắt buộc"),
  start_time: z.string().min(1, "Giờ bắt đầu là bắt buộc"),
  notes: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

// Password reset schema
export const passwordResetSchema = z
  .object({
    password: passwordSchema,
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Mật khẩu không trùng khớp",
    path: ["password_confirm"],
  });

export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;

// Validation helpers
export const validateEmail = (email: string): boolean => {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
};

export const validatePassword = (password: string): boolean => {
  try {
    passwordSchema.parse(password);
    return true;
  } catch {
    return false;
  }
};

export const validatePhoneNumber = (phone: string): boolean => {
  try {
    phoneSchema.parse(phone);
    return true;
  } catch {
    return false;
  }
};
