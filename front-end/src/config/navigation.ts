import { NavItem } from "@/types/dashboard";
import {
  BarChart,
  Briefcase,
  Calendar,
  History,
  LayoutDashboard,
  Settings,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

/**
 * Centralized navigation configuration cho tất cả roles
 * Mỗi role có một tập menu items riêng
 */

// Dashboard menu items - accessible bởi tất cả roles
const dashboardItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "manager", "receptionist", "specialist", "customer"],
  },
];

// Admin-specific menu items
const adminItems: NavItem[] = [
  {
    title: "Quản lý nhân viên",
    url: "/dashboard/staff",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "Quản lý dịch vụ",
    url: "/dashboard/services",
    icon: Briefcase,
    roles: ["admin"],
  },
  {
    title: "Quản lý khách hàng",
    url: "/dashboard/customers",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "Quản lý người dùng",
    url: "/dashboard/admin/users",
    icon: Shield,
    roles: ["admin"],
  },
  {
    title: "Báo cáo",
    url: "/dashboard/admin/reports",
    icon: BarChart,
    roles: ["admin"],
  },
  {
    title: "Cài đặt hệ thống",
    url: "/dashboard/admin/settings",
    icon: Settings,
    roles: ["admin"],
  },
];

// Manager-specific menu items
const managerItems: NavItem[] = [
  {
    title: "Khách hàng",
    url: "/dashboard/customers",
    icon: Users,
    roles: ["manager"],
  },
  {
    title: "Lịch hẹn",
    url: "/dashboard/appointments",
    icon: Calendar,
    roles: ["manager"],
  },
  {
    title: "Dịch vụ",
    url: "/dashboard/services",
    icon: Briefcase,
    roles: ["manager"],
  },
  {
    title: "Nhân viên",
    url: "/dashboard/staff",
    icon: Users,
    roles: ["manager"],
  },
  {
    title: "Báo cáo",
    url: "/dashboard/reports",
    icon: BarChart,
    roles: ["manager"],
  },
  {
    title: "Phân tích",
    url: "/dashboard/analytics",
    icon: TrendingUp,
    roles: ["manager"],
  },
];

// Receptionist-specific menu items
const receptionistItems: NavItem[] = [
  {
    title: "Khách hàng",
    url: "/dashboard/customers",
    icon: Users,
    roles: ["receptionist"],
  },
  {
    title: "Lịch hẹn",
    url: "/dashboard/appointments",
    icon: Calendar,
    roles: ["receptionist"],
  },
  {
    title: "Dịch vụ",
    url: "/dashboard/services",
    icon: Briefcase,
    roles: ["receptionist"],
  },
];

// Specialist-specific menu items
const specialistItems: NavItem[] = [
  {
    title: "Lịch làm việc",
    url: "/dashboard/appointments",
    icon: Calendar,
    roles: ["specialist"],
  },
  {
    title: "Dịch vụ",
    url: "/dashboard/services",
    icon: Briefcase,
    roles: ["specialist"],
  },
];

// Customer-specific menu items
const customerItems: NavItem[] = [
  {
    title: "Lịch hẹn của tôi",
    url: "/dashboard/bookings",
    icon: Calendar,
    roles: ["customer"],
  },
  {
    title: "Lịch sử dịch vụ",
    url: "/dashboard/history",
    icon: History,
    roles: ["customer"],
  },
  {
    title: "Dịch vụ",
    url: "/dashboard/services",
    icon: Briefcase,
    roles: ["customer"],
  },
];

/**
 * Role-based navigation configuration
 * Mỗi role có một danh sách menu items riêng
 */
export const navigationConfig: Record<string, NavItem[]> = {
  admin: [...dashboardItems, ...adminItems],
  manager: [...dashboardItems, ...managerItems],
  receptionist: [...dashboardItems, ...receptionistItems],
  specialist: [...dashboardItems, ...specialistItems],
  customer: [...dashboardItems, ...customerItems],
};

/**
 * Default navigation khi role không rõ ràng
 */
export const defaultNavigation: NavItem[] = dashboardItems;

/**
 * Lấy navigation items dựa trên role
 * @param role - User role
 * @returns Array of navigation items cho role đó
 */
export function getNavigationForRole(role: string): NavItem[] {
  return navigationConfig[role] || defaultNavigation;
}
