import { ROUTE_LABELS } from "@/config/constants";
import { getNavigationForRole } from "@/config/navigation";
import { DashboardWidget, UserRole } from "@/types";
import { BreadcrumbItem, NavItem } from "@/types/dashboard";

/**
 * Lấy danh sách navigation items dựa trên role của người dùng
 * @param role - User role
 * @returns Array of NavItem cho role đó
 */
export function getNavigationItems(role: UserRole): NavItem[] {
  return getNavigationForRole(role);
}

/**
 * Tạo danh sách dashboard widgets dựa trên role
 * Mỗi role có một bộ widgets khác nhau phù hợp với chức năng của họ
 * @param role - User role
 * @returns Array of DashboardWidget cho role đó
 */
export function getDefaultDashboardWidgets(role: UserRole): DashboardWidget[] {
  switch (role) {
    case "admin":
      return [
        {
          id: "total_revenue",
          title: "Tổng doanh thu",
          type: "stat",
          roles: ["admin"],
          data: { value: 0, trend: "up", currency: "VND" },
        },
        {
          id: "total_users",
          title: "Tổng người dùng",
          type: "stat",
          roles: ["admin"],
          data: { value: 0 },
        },
        {
          id: "new_customers",
          title: "Khách hàng mới",
          type: "stat",
          roles: ["admin"],
          data: { value: 0, period: "month" },
        },
        {
          id: "appointments_today",
          title: "Lịch hẹn hôm nay",
          type: "stat",
          roles: ["admin"],
          data: { value: 0 },
        },
        {
          id: "recent_users",
          title: "Người dùng mới",
          type: "table",
          roles: ["admin"],
        },
        {
          id: "system_health",
          title: "Trạng thái hệ thống",
          type: "stat",
          roles: ["admin"],
        },
      ];

    case "manager":
      return [
        {
          id: "daily_revenue",
          title: "Doanh thu hôm nay",
          type: "stat",
          roles: ["manager"],
          data: { value: 0, currency: "VND" },
        },
        {
          id: "active_appointments",
          title: "Lịch hẹn đang diễn ra",
          type: "stat",
          roles: ["manager"],
          data: { value: 0 },
        },
        {
          id: "pending_appointments",
          title: "Lịch hẹn chưa xác nhận",
          type: "stat",
          roles: ["manager"],
          data: { value: 0, badge_color: "warning" },
        },
        {
          id: "customer_count",
          title: "Tổng khách hàng",
          type: "stat",
          roles: ["manager"],
          data: { value: 0 },
        },
        {
          id: "staff_schedule",
          title: "Lịch làm việc nhân viên",
          type: "table",
          roles: ["manager"],
        },
        {
          id: "revenue_chart",
          title: "Doanh thu (7 ngày)",
          type: "chart",
          roles: ["manager"],
        },
      ];

    case "receptionist":
      return [
        {
          id: "today_appointments",
          title: "Lịch hẹn hôm nay",
          type: "stat",
          roles: ["receptionist"],
          data: { value: 0 },
        },
        {
          id: "pending_check_in",
          title: "Chờ check-in",
          type: "stat",
          roles: ["receptionist"],
          data: { value: 0, badge_color: "info" },
        },
        {
          id: "appointment_list",
          title: "Danh sách lịch hẹn",
          type: "table",
          roles: ["receptionist"],
        },
        {
          id: "customer_search",
          title: "Tìm kiếm khách hàng",
          type: "list",
          roles: ["receptionist"],
        },
      ];

    case "specialist":
      return [
        {
          id: "my_appointments",
          title: "Lịch làm việc của tôi",
          type: "stat",
          roles: ["specialist"],
          data: { value: 0 },
        },
        {
          id: "my_schedule",
          title: "Lịch trình hôm nay",
          type: "table",
          roles: ["specialist"],
        },
        {
          id: "current_service",
          title: "Dịch vụ hiện tại",
          type: "stat",
          roles: ["specialist"],
          data: { status: "idle" },
        },
      ];

    case "customer":
      return [
        {
          id: "my_bookings",
          title: "Lịch hẹn của tôi",
          type: "table",
          roles: ["customer"],
        },
        {
          id: "service_history",
          title: "Lịch sử dịch vụ",
          type: "table",
          roles: ["customer"],
        },
        {
          id: "favorite_services",
          title: "Dịch vụ yêu thích",
          type: "list",
          roles: ["customer"],
        },
        {
          id: "make_booking",
          title: "Đặt lịch mới",
          type: "stat",
          roles: ["customer"],
        },
      ];

    default:
      return [];
  }
}

/**
 * Chuyển đổi pathname thành breadcrumb items
 * Tự động cập nhật breadcrumb khi route thay đổi
 * @param pathname - Current URL path
 * @returns Array of BreadcrumbItem
 */
export function formatBreadcrumb(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Dashboard", href: "/dashboard" },
  ];

  let currentPath = "";
  for (const segment of segments) {
    if (segment === "dashboard") continue;

    currentPath += `/${segment}`;

    // Lấy label từ ROUTE_LABELS hoặc tạo từ segment name
    const label =
      ROUTE_LABELS[segment as keyof typeof ROUTE_LABELS] ||
      segment
        .replace(/([A-Z])/g, " $1")
        .replace(/-/g, " ")
        .replace(/^./, (char) => char.toUpperCase())
        .trim();

    breadcrumbs.push({
      label,
      href: currentPath,
      isActive: pathname === currentPath,
    });
  }

  return breadcrumbs;
}

/**
 * Kiểm tra xem một route có được phép truy cập bởi role không
 * @param route - Route path
 * @param role - User role
 * @returns true nếu route được phép, false nếu không
 */
export function isRouteAllowed(route: string, role: UserRole): boolean {
  // Lấy danh sách navigation items cho role
  const navItems = getNavigationItems(role);

  // Hàm đệ quy để tìm route trong menu items
  function findRoute(items: NavItem[]): boolean {
    return items.some((item) => {
      if (item.url === route) return true;
      if (item.items) return findRoute(item.items);
      return false;
    });
  }

  return findRoute(navItems);
}

/**
 * Lấy role chính từ danh sách roles
 * Nếu user có nhiều roles, sử dụng role đầu tiên (thường là admin/manager)
 * @param roles - Array of user roles
 * @returns Primary role hoặc 'customer' nếu roles trống
 */
export function getPrimaryRole(
  roles?: Array<{ id: number; name: UserRole; description: string }>
): UserRole {
  if (!roles || roles.length === 0) {
    return "customer"; // Default role
  }
  return roles[0].name;
}

/**
 * Flatten danh sách navigation items (tất cả items cả nested)
 * Hữu ích để kiểm tra tất cả routes
 * @param items - Navigation items
 * @returns Flat array of all NavItems
 */
export function flattenNavItems(items: NavItem[]): NavItem[] {
  let flattened: NavItem[] = [];
  items.forEach((item) => {
    flattened.push(item);
    if (item.items) {
      flattened = flattened.concat(flattenNavItems(item.items));
    }
  });
  return flattened;
}

/**
 * Tìm active navigation item dựa trên current pathname
 * @param items - Navigation items
 * @param pathname - Current URL path
 * @returns Active NavItem hoặc undefined
 */
export function findActiveNavItem(
  items: NavItem[],
  pathname: string
): NavItem | undefined {
  const flattened = flattenNavItems(items);
  return flattened.find(
    (item) => item.url === pathname || pathname.startsWith(item.url + "/")
  );
}
