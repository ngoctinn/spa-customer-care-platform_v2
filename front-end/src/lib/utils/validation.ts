import { z } from "zod";

/**
 * Schema xác thực cho form đăng nhập
 */
export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(128, "Mật khẩu tối đa 128 ký tự"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Schema xác thực cho form đăng ký
 */
export const registerSchema = z
  .object({
    email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(128, "Mật khẩu tối đa 128 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
    terms: z.boolean().refine((val) => val === true, {
      message: "Bạn phải chấp nhận điều khoản",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Schema xác thực cho form reset password (bước 1)
 */
export const passwordResetRequestSchema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
});

export type PasswordResetRequestData = z.infer<
  typeof passwordResetRequestSchema
>;

/**
 * Schema xác thực cho form đặt lại mật khẩu (bước 2)
 */
export const confirmPasswordResetSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(128, "Mật khẩu tối đa 128 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type ConfirmPasswordResetData = z.infer<
  typeof confirmPasswordResetSchema
>;

/**
 * Schema xác thực cho form xác minh email
 */
export const verifyEmailSchema = z.object({
  token: z.string().min(32, "Token không hợp lệ").optional().nullable(),
});

export type VerifyEmailData = z.infer<typeof verifyEmailSchema>;

// Customer schema
export const customerSchema = z.object({
  full_name: z.string().min(2, "Tên phải ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^(\+84|0)[0-9]{9,10}$/, "Số điện thoại không hợp lệ"),
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
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ hoa")
      .regex(/[a-z]/, "Mật khẩu phải có ít nhất một chữ thường")
      .regex(/[0-9]/, "Mật khẩu phải có ít nhất một số"),
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
    z.string().email("Email không hợp lệ").parse(email);
    return true;
  } catch {
    return false;
  }
};

export const validatePassword = (password: string): boolean => {
  try {
    z.string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ hoa")
      .regex(/[a-z]/, "Mật khẩu phải có ít nhất một chữ thường")
      .regex(/[0-9]/, "Mật khẩu phải có ít nhất một số")
      .parse(password);
    return true;
  } catch {
    return false;
  }
};

export const validatePhoneNumber = (phone: string): boolean => {
  try {
    z.string()
      .regex(/^(\+84|0)[0-9]{9,10}$/, "Số điện thoại không hợp lệ")
      .parse(phone);
    return true;
  } catch {
    return false;
  }
};
