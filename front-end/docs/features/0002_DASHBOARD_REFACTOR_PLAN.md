# 📊 KẾ HOẠCH KỸ THUẬT: REFACTOR DASHBOARD

**Phiên bản:** 1.0  
**Cập nhật:** 19/10/2025  
**Trạng thái:** Sẽ thực hiện

---

## 1. MÔ TẢ NGỮ CẢNH

Refactor dashboard hiện tại từ template mẫu `shadcn/ui` thành một dashboard thực tế phù hợp với **Nền Tảng Chăm Sóc Khách Hàng SPA**, hỗ trợ:

- **RBAC (Role-Based Access Control):** 5 vai trò khác nhau (Admin, Manager, Receptionist, Specialist, Customer)
- **Responsive Layout:** Desktop, tablet, mobile-first
- **Zustand Store Integration:** Lấy user info từ auth store
- **Dynamic Navigation:** Menu điều hướng dựa vào vai trò
- **Dashboard Widgets:** KPI, statistics, recent data
- **Real-time Updates:** Placeholder cho future WebSocket integration

**Scope:**

- Dashboard layout & structure (không trang nội dung)
- Sidebar navigation (role-based)
- Header + User menu
- Empty states & widgets structure
- TypeScript types & constants
- Responsive design

**Out of Scope:**

- Customer/Appointment/Service pages (Phase 3)
- API integration (Phase 3)
- Real data fetching
- Charts/graphs library (Phase 4)

---

## 2. CÁC TỆP VÀ HÀM LIÊN QUAN

### 2.1 Tệp Hiện Tại (Cần Refactor)

#### **src/app/(dashboard)/dashboard/page.tsx**

**Hiện tại:**

- Template mẫu với placeholder tiles
- Hardcoded breadcrumb
- No role-based content

**Cần thay đổi:**

- Xóa placeholder tiles
- Thêm role-specific content
- Integrate Zustand `authStore`
- Dynamic breadcrumb
- Pass user role để hiển thị widgets khác nhau

#### **src/components/dashboard/app-sidebar.tsx**

**Hiện tại:**

- Hardcoded data (teams, navMain, projects)
- Sample navigation items
- No RBAC logic

**Cần thay đổi:**

- Xóa sample data
- Tạo `navigationConfig` dựa vào roles
- Dynamic menu items (Admin thấy Settings, Manager thấy Reports, v.v.)
- Lấy user info từ `authStore`
- Active link detection

#### **src/components/dashboard/nav-main.tsx**

**Hiện tại:**

- Render hard-coded menu items

**Cần thay đổi:**

- Props type definition (TypeScript strict)
- Collapsible groups
- Active state tracking
- Icon rendering
- Accessibility improvements

#### **src/components/dashboard/nav-user.tsx**

**Hiện tại:**

- Sample user avatar + dropdown

**Cần thay đổi:**

- Lấy user data từ `authStore`
- Display real email/name
- Logout action (gọi logout từ authStore)
- Settings link
- Profile link (future)

#### **src/components/dashboard/team-switcher.tsx**

**Decision:**

- **Option 1:** Xóa component (SPA không cần team switcher)
- **Option 2:** Repurpose cho "Spa Locations" (multiple spa branches)
- **Recommendation:** Xóa trong Phase 2, add sau nếu cần

### 2.2 Tệp Cần TẠO MỚI

#### **src/config/navigation.ts**

Centralized navigation configuration dựa vào roles:

```typescript
interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
  items?: NavItem[];
  roles: UserRole[]; // Show only for these roles
}

interface NavigationConfig {
  admin: NavItem[];
  manager: NavItem[];
  receptionist: NavItem[];
  specialist: NavItem[];
  customer: NavItem[];
}
```

#### **src/components/dashboard/DashboardShell.tsx** (NEW)

Layout wrapper cho dashboard:

- Sidebar + Main content
- Header breadcrumb
- Responsive wrapper
- Error boundaries

#### **src/components/dashboard/DashboardHeader.tsx** (NEW)

Header component chứa:

- Sidebar trigger button
- Breadcrumb navigation
- User menu dropdown
- Search bar (future)
- Notifications bell (future)

#### **src/components/dashboard/RoleBadge.tsx** (NEW)

Component display user role:

- Vietnamese role labels
- Color-coded badges
- Icon representation

#### **src/components/dashboard/StatCard.tsx** (NEW)

Reusable widget cho KPI statistics:

- Title
- Value/Number
- Icon
- Trend (up/down)
- Loading state

#### **src/components/dashboard/EmptyState.tsx** (NEW)

Empty state component:

- Icon
- Message
- CTA button

#### **src/store/dashboardStore.ts** (NEW)

Zustand store cho dashboard state:

- Current breadcrumb
- Sidebar collapsed state
- Active menu item

#### **src/types/dashboard.ts** (NEW)

TypeScript types:

- NavItem interface
- DashboardWidget interface
- RoleConfig interface
- Dashboard props interfaces

#### **src/lib/utils/dashboard.ts** (NEW)

Utility functions:

- `getNavigationForRole(role)` → NavItem[]
- `getDefaultDashboardWidgets(role)` → Widget[]
- `formatBreadcrumb(route)` → BreadcrumbItem[]
- `isRouteAllowed(route, role)` → boolean

#### **src/middleware.ts** (UPDATE)

Next.js middleware:

- Kiểm tra authentication trước khi vào dashboard
- Redirect unauthenticated users đến /login
- (Currently placeholder)

#### **src/app/(dashboard)/layout.tsx** (NEW)

Dashboard layout wrapper:

- AuthProvider integration
- ProtectedRoute wrapper
- SidebarProvider
- Metadata

### 2.3 Tệp Cần CẬP NHẬT

#### **src/types/index.ts**

Thêm:

```typescript
type UserRole =
  | "admin"
  | "manager"
  | "receptionist"
  | "specialist"
  | "customer";

interface User {
  // ... existing
  roles: Array<{
    id: number;
    name: UserRole;
    description: string;
  }>;
}

interface DashboardWidget {
  id: string;
  title: string;
  type: "stat" | "chart" | "table" | "list";
  roles: UserRole[];
  data?: Record<string, any>;
}
```

#### **src/config/constants.ts**

Thêm:

```typescript
const ROLE_LABELS = {
  admin: "Quản trị viên",
  manager: "Quản lý",
  receptionist: "Tiếp tân",
  specialist: "Nhân viên chuyên môn",
  customer: "Khách hàng",
};

const ROLE_COLORS = {
  admin: "red",
  manager: "blue",
  receptionist: "green",
  specialist: "purple",
  customer: "gray",
};

const ROLE_ICONS = {
  admin: "Shield",
  manager: "Briefcase",
  receptionist: "Phone",
  specialist: "Hammer",
  customer: "User",
};

const DASHBOARD_ROUTES = {
  // Admin only
  ADMIN_SETTINGS: "/dashboard/admin/settings",
  USER_MANAGEMENT: "/dashboard/admin/users",
  STAFF_MANAGEMENT: "/dashboard/admin/staff",

  // Manager
  REPORTS: "/dashboard/reports",
  ANALYTICS: "/dashboard/analytics",

  // All roles
  CUSTOMERS: "/dashboard/customers",
  APPOINTMENTS: "/dashboard/appointments",
  SERVICES: "/dashboard/services",
  PROFILE: "/dashboard/profile",
};
```

---

## 3. THUẬT TOÁN / LOGIC CHI TIẾT

### 3.1 Luồng Tải Dashboard (Dashboard Load Flow)

```
Step 1: User navigate đến /dashboard
  ↓
Step 2: Middleware kiểm tra
  - Has valid auth token?
  - Token expired? → Try refresh
  - No token? → Redirect /login
  ↓
Step 3: DashboardLayout render
  - Fetch user từ AuthStore (authStore.user)
  - Extract roles từ user.roles[]
  - Determine primary role (roles[0])
  ↓
Step 4: Initialize Dashboard
  - Get navigation config: getNavigationForRole(primaryRole)
  - Get dashboard widgets: getDefaultDashboardWidgets(primaryRole)
  - Set sidebar state: collapsed = false
  - Set initial breadcrumb: [{ label: "Dashboard", href: "/dashboard" }]
  ↓
Step 5: Render Components
  - <AppSidebar> with role-based navigation
  - <DashboardHeader> with breadcrumb
  - <DashboardContent> with widgets
  ↓
Step 6: Handle Updates
  - On route change: update breadcrumb
  - On sidebar toggle: save to dashboardStore
  - On user logout: redirect to /login
```

### 3.2 Navigation Config Generation (Role-Based)

```typescript
// Pseudocode
function getNavigationForRole(role: UserRole): NavItem[] {
  const baseNav: NavItem[] = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, roles: ALL }
    { title: "Customers", url: "/dashboard/customers", icon: Users, roles: [manager, receptionist] }
    { title: "Appointments", url: "/dashboard/appointments", icon: Calendar, roles: [manager, receptionist, specialist] }
    { title: "Services", url: "/dashboard/services", icon: Briefcase, roles: [manager, specialist] }
    { title: "Staff", url: "/dashboard/staff", icon: Users, roles: [admin, manager] }
  ];

  const roleSpecificNav: NavItem[] = {
    admin: [
      { title: "User Management", url: "/dashboard/admin/users", icon: Shield, roles: [admin] }
      { title: "System Settings", url: "/dashboard/admin/settings", icon: Settings, roles: [admin] }
      { title: "Reports", url: "/dashboard/admin/reports", icon: BarChart, roles: [admin] }
    ],
    manager: [
      { title: "Reports", url: "/dashboard/reports", icon: BarChart, roles: [manager] }
      { title: "Analytics", url: "/dashboard/analytics", icon: TrendingUp, roles: [manager] }
    ],
    receptionist: [],
    specialist: [],
    customer: [
      { title: "My Bookings", url: "/dashboard/bookings", icon: Calendar, roles: [customer] }
      { title: "Service History", url: "/dashboard/history", icon: History, roles: [customer] }
    ]
  };

  return [
    ...baseNav.filter(item => item.roles.includes(role)),
    ...roleSpecificNav[role] || []
  ];
}
```

### 3.3 Dynamic Dashboard Widgets

```typescript
function getDefaultDashboardWidgets(role: UserRole): DashboardWidget[] {
  switch (role) {
    case 'admin':
      return [
        { id: 'total_revenue', title: 'Tổng doanh thu', type: 'stat', data: { value: 0, trend: 'up' } }
        { id: 'total_users', title: 'Tổng người dùng', type: 'stat', data: { value: 0 } }
        { id: 'new_customers', title: 'Khách hàng mới', type: 'stat', data: { value: 0, period: 'month' } }
        { id: 'appointments_today', title: 'Lịch hẹn hôm nay', type: 'stat', data: { value: 0 } }
        { id: 'recent_users', title: 'Người dùng mới', type: 'table' }
        { id: 'system_health', title: 'Trạng thái hệ thống', type: 'stat' }
      ];

    case 'manager':
      return [
        { id: 'daily_revenue', title: 'Doanh thu hôm nay', type: 'stat', data: { value: 0 } }
        { id: 'active_appointments', title: 'Lịch hẹn đang diễn ra', type: 'stat', data: { value: 0 } }
        { id: 'pending_appointments', title: 'Lịch hẹn chưa xác nhận', type: 'stat', data: { value: 0 } }
        { id: 'customer_count', title: 'Tổng khách hàng', type: 'stat', data: { value: 0 } }
        { id: 'staff_schedule', title: 'Lịch làm việc nhân viên', type: 'table' }
        { id: 'revenue_chart', title: 'Doanh thu (7 ngày)', type: 'chart' }
      ];

    case 'receptionist':
      return [
        { id: 'today_appointments', title: 'Lịch hẹn hôm nay', type: 'stat', data: { value: 0 } }
        { id: 'pending_check_in', title: 'Chờ check-in', type: 'stat', data: { value: 0 } }
        { id: 'appointment_list', title: 'Danh sách lịch hẹn', type: 'table' }
        { id: 'customer_search', title: 'Tìm kiếm khách hàng', type: 'list' }
      ];

    case 'specialist':
      return [
        { id: 'my_appointments', title: 'Lịch làm việc của tôi', type: 'stat', data: { value: 0 } }
        { id: 'my_schedule', title: 'Lịch trình hôm nay', type: 'table' }
        { id: 'current_service', title: 'Dịch vụ hiện tại', type: 'stat', data: { status: 'idle' } }
      ];

    case 'customer':
      return [
        { id: 'my_bookings', title: 'Lịch hẹn của tôi', type: 'table' }
        { id: 'service_history', title: 'Lịch sử dịch vụ', type: 'table' }
        { id: 'favorite_services', title: 'Dịch vụ yêu thích', type: 'list' }
        { id: 'make_booking', title: 'Đặt lịch mới', type: 'stat' }
      ];

    default:
      return [];
  }
}
```

### 3.4 Breadcrumb Dynamic Generation

```typescript
function formatBreadcrumb(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Dashboard", href: "/dashboard" },
  ];

  let currentPath = "";
  for (const segment of segments) {
    if (segment === "dashboard") continue;
    currentPath += `/${segment}`;
    const label = segment
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase())
      .trim();

    breadcrumbs.push({
      label: ROUTE_LABELS[segment] || label,
      href: currentPath,
      isActive: pathname === currentPath,
    });
  }

  return breadcrumbs;
}
```

### 3.5 Responsive Sidebar Behavior

```
Desktop (≥ md: 768px):
  - Sidebar always visible
  - Toggle: collapse/expand (icon mode)
  - Trigger button visible
  - Main content adjusts

Tablet (md: 768px - lg: 1024px):
  - Sidebar collapsible by default
  - Toggle: show/hide
  - Trigger button visible

Mobile (< md: 768px):
  - Sidebar hidden by default
  - Toggle: drawer/overlay
  - Trigger button visible
  - Full-width content
```

### 3.6 User Logout Flow

```
Step 1: User clicks "Đăng xuất" in NavUser dropdown
  ↓
Step 2: Call logout action
  - authStore.logout() → Clear user, tokens, isAuthenticated
  - Call API POST /auth/logout (with refresh token in cookie)
  ↓
Step 3: Handle response
  - 200 OK:
    → Success → Redirect /login
    → Message: "Đã đăng xuất"

  - Any error:
    → Still redirect /login (already cleared local state)
    → Soft error handling (toast optional)
  ↓
Step 4: Cleanup
  - Clear localStorage
  - Clear Zustand stores
  - Reset dashboard state
```

### 3.7 Protected Route Logic (Middleware)

```typescript
// src/middleware.ts
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route is protected
  if (pathname.startsWith("/dashboard")) {
    const token =
      request.cookies.get("auth_token")?.value ||
      getFromLocalStorage("auth_token"); // Can't access localStorage from middleware!

    // Decision: Use cookie-based check only in middleware
    // For full check: do in component level (ProtectedRoute)

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Token validation (basic)
    if (isTokenExpired(token)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
```

---

## 4. COMPONENT STRUCTURE & COMPOSITION

### 4.1 Component Tree

```
(dashboard) [Protected Route]
├── layout.tsx [DashboardLayout]
│   ├── <AuthProvider />
│   ├── <SidebarProvider />
│   └── children
│       └── page.tsx
│           ├── <DashboardShell>
│           │   ├── <AppSidebar>
│           │   │   ├── <SidebarHeader>
│           │   │   │   └── <SpaLogo> (replace team-switcher)
│           │   │   ├── <SidebarContent>
│           │   │   │   └── <NavMain> (role-based items)
│           │   │   └── <SidebarFooter>
│           │   │       └── <NavUser> (user info + logout)
│           │   └── <SidebarInset>
│           │       ├── <DashboardHeader>
│           │       │   ├── <SidebarTrigger>
│           │       │   ├── <Breadcrumb>
│           │       │   └── <UserMenu>
│           │       └── <DashboardContent>
│           │           ├── <StatCard /> (per role)
│           │           ├── <RecentActivity />
│           │           └── <EmptyStates />
```

### 4.2 Component Props & Types

**DashboardHeader.tsx**

```typescript
interface DashboardHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  onSidebarToggle?: () => void;
  userRole: UserRole;
}
```

**NavMain.tsx**

```typescript
interface NavMainProps {
  items: NavItem[];
  isCollapsed?: boolean;
  onItemClick?: (url: string) => void;
}
```

**StatCard.tsx**

```typescript
interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: number;
  loading?: boolean;
  onClick?: () => void;
}
```

---

## 5. STATE MANAGEMENT

### 5.1 Zustand authStore (ALREADY EXISTS)

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  // ...
  logout: () => void;
}
```

### 5.2 Zustand dashboardStore (NEW)

```typescript
interface DashboardState {
  // State
  breadcrumbs: BreadcrumbItem[];
  sidebarCollapsed: boolean;
  activeMenuItem: string | null;
  searchQuery: string;

  // Actions
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActiveMenuItem: (item: string | null) => void;
  setSearchQuery: (query: string) => void;
  reset: () => void;
}
```

### 5.3 Data Flow

```
User logs in → authStore.setUser(user)
               ↓
User navigates to /dashboard
               ↓
DashboardLayout loads
  - Read authStore.user
  - Extract roles
  - Generate navigation config
  - Set breadcrumbs
               ↓
Render role-specific dashboard
  - Show NavMain with filtered items
  - Show role-specific widgets
  - Show user info in NavUser
               ↓
User interacts (sidebar toggle, menu click)
               ↓
dashboardStore.setSidebarCollapsed()
dashboardStore.setActiveMenuItem()
               ↓
Component re-renders with new state
```

---

## 6. FILE CREATION CHECKLIST

### Phase 2A: Core Files

- [ ] `src/types/dashboard.ts` - Type definitions
- [ ] `src/config/navigation.ts` - Navigation config
- [ ] `src/lib/utils/dashboard.ts` - Utility functions
- [ ] `src/store/dashboardStore.ts` - Zustand store

### Phase 2B: Components (Refactor)

- [ ] Refactor `src/components/dashboard/app-sidebar.tsx`
- [ ] Refactor `src/components/dashboard/nav-main.tsx`
- [ ] Refactor `src/components/dashboard/nav-user.tsx`
- [ ] Delete or repurpose `src/components/dashboard/team-switcher.tsx`

### Phase 2C: Components (New)

- [ ] Create `src/components/dashboard/DashboardShell.tsx`
- [ ] Create `src/components/dashboard/DashboardHeader.tsx`
- [ ] Create `src/components/dashboard/RoleBadge.tsx`
- [ ] Create `src/components/dashboard/StatCard.tsx`
- [ ] Create `src/components/dashboard/EmptyState.tsx`

### Phase 2D: Layout & Middleware

- [ ] Create `src/app/(dashboard)/layout.tsx`
- [ ] Update `src/app/(dashboard)/dashboard/page.tsx`
- [ ] Create/Update `src/middleware.ts`

### Phase 2E: Configuration

- [ ] Update `src/types/index.ts` - Add User.roles, UserRole, DashboardWidget
- [ ] Update `src/config/constants.ts` - Add ROLE_LABELS, ROLE_COLORS, DASHBOARD_ROUTES

---

## 7. DEPENDENCIES & LIBRARIES

### Already Available ✅

- ✅ Next.js 15 (App Router)
- ✅ React 19
- ✅ TypeScript 5.9
- ✅ Zustand 5.0
- ✅ Tailwind CSS 4.1
- ✅ shadcn/ui (Sidebar, Button, Dropdown Menu, etc.)
- ✅ Lucide Icons

### May Need

- Optional: `next-themes` (for dark mode - Phase 4)
- Optional: `recharts` or `visx` (for charts - Phase 4)

---

## 8. ENVIRONMENT & CONFIGURATION

No new env variables needed. Use existing:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_AUTH_TOKEN_KEY=auth_token
```

---

## 9. ERROR HANDLING

### Common Errors & Solutions

1. **User not found in authStore:**

   - Redirect to /login
   - Message: "Session expired"

2. **Invalid role:**

   - Default to 'customer' role
   - Show limited UI

3. **Navigation config generation fails:**

   - Fallback to empty nav
   - Show error boundary

4. **Logout fails (API error):**
   - Still clear local state
   - Redirect to /login
   - Soft error notification

---

## 10. TESTING CONSIDERATIONS

### Manual Testing by Role

- [ ] Admin: See all menu items, admin widgets
- [ ] Manager: See manager-specific items, manager widgets
- [ ] Receptionist: See receptionist items, limited widgets
- [ ] Specialist: See personal schedule, service status
- [ ] Customer: See bookings, service history

### Responsive Testing

- [ ] Desktop (1024px+): Sidebar visible, toggleable
- [ ] Tablet (768px-1023px): Sidebar collapsed by default
- [ ] Mobile (<768px): Sidebar drawer/overlay

### Edge Cases

- [ ] User with multiple roles (use first role as primary)
- [ ] User with no roles (fallback to 'customer')
- [ ] Fast logout/login sequence
- [ ] Browser back button after logout

---

## 11. PHẠM VI & GIỚI HẠN

### Trong Phạm Vi ✅

- Dashboard layout & structure
- Role-based navigation & widgets
- Sidebar responsive behavior
- User dropdown menu & logout
- TypeScript types & constants
- Breadcrumb navigation
- Empty states

### Ngoài Phạm Vi (Phase 3+) ❌

- Real data fetching
- Customer/Appointment/Service pages
- Charts & analytics
- Search functionality
- Notifications & real-time updates
- Dark mode toggle
- Customer-facing portal

---

## 12. SECURITY & PERMISSIONS

1. **Route Protection:**

   - Middleware checks auth token
   - Component-level ProtectedRoute wrapper
   - Redirect unauthenticated users

2. **Role-Based Access:**

   - Navigation filtered by role
   - Invalid routes show 403 or redirect
   - Backend API enforce permissions (already done)

3. **User Data:**
   - Display only authenticated user info
   - Don't expose other users' data in UI
   - Logout clear all sensitive state

---

## 13. MIGRATION NOTES (From Current Template)

**Remove:**

- Team switcher component (app-sidebar.tsx)
- Sample hardcoded data (teams, projects, navMain)
- Placeholder tiles in dashboard page

**Keep:**

- shadcn/ui Sidebar components
- Responsive design patterns
- Header/Footer structure

**Add:**

- RBAC logic
- User info integration
- Real navigation config
- Type safety

---

## 14. NOTES FOR DEVELOPERS

1. **Use path aliases:** Always import from `@/` (e.g., `@/types`, `@/lib/utils`)
2. **TypeScript strict:** All files must pass strict mode
3. **Component reusability:** Create generic StatCard, EmptyState for reuse
4. **Role handling:** Always default to 'customer' if role is unknown
5. **Breadcrumb:** Automatically update on route change in layout
6. **LSP:** Use Next.js Link component for navigation, not `<a>` tags
7. **Accessibility:** Include `aria-` attributes for menus, roles, labels

---

_Generated: 19/10/2025 | Status: Technical Plan Ready for Phase 2B Implementation_
