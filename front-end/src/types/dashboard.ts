import { UserRole } from "@/types";
import { LucideIcon } from "lucide-react";

/**
 * Breadcrumb item interface cho navigation breadcrumb
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

/**
 * Navigation item interface cho sidebar menu
 */
export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
  badge_count?: number;
  items?: NavItem[];
  roles: UserRole[]; // Show only cho các role này
}

/**
 * Role-based navigation config
 */
export interface RoleNavigationConfig {
  [key: string]: NavItem[];
}

/**
 * Dashboard layout component props
 */
export interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Dashboard header component props
 */
export interface DashboardHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  userRole: UserRole;
  onSidebarToggle?: () => void;
}

/**
 * Dashboard shell component props
 */
export interface DashboardShellProps {
  children: React.ReactNode;
  currentBreadcrumbs?: BreadcrumbItem[];
}

/**
 * Navigation main component props
 */
export interface NavMainProps {
  items: NavItem[];
  isCollapsed?: boolean;
  onItemClick?: (url: string) => void;
}

/**
 * Nav user component props
 */
export interface NavUserProps {
  user: {
    name?: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => Promise<void>;
  isLoggingOut?: boolean;
}

/**
 * Stat card component props
 */
export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: number;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Role badge component props
 */
export interface RoleBadgeProps {
  role: UserRole;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  showLabel?: boolean;
  className?: string;
}

/**
 * Empty state component props
 */
export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * Dashboard state from Zustand store
 */
export interface DashboardState {
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
