// Date formatting
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatTime = (time: string): string => {
  if (!time) return "";
  const [hour, minute] = time.split(":");
  return `${hour}:${minute}`;
};

// Currency formatting
export const formatCurrency = (
  amount: number,
  currency: string = "VND"
): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

// Phone number formatting
export const formatPhoneNumber = (phone: string): string => {
  // Vietnamese phone number format: +84 XXX XXX XXXX
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 9) {
    return `+84${cleaned}`;
  }
  if (cleaned.length === 10 && cleaned.startsWith("0")) {
    return `+84${cleaned.slice(1)}`;
  }
  return phone;
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// String truncation
export const truncateString = (
  text: string,
  maxLength: number = 50
): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

// Capitalize first letter
export const capitalizeFirst = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Convert status to display text
export const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: "Đang chờ",
    confirmed: "Đã xác nhận",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
    active: "Hoạt động",
    inactive: "Không hoạt động",
  };
  return statusMap[status] || capitalizeFirst(status);
};

// Convert role to display text
export const formatRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    admin: "Quản trị viên",
    manager: "Quản lý",
    receptionist: "Lễ tân",
    specialist: "Chuyên viên",
    customer: "Khách hàng",
  };
  return roleMap[role] || role;
};
