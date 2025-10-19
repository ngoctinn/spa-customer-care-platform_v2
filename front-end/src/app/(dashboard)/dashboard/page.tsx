"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { RoleBadge } from "@/components/dashboard/RoleBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  formatBreadcrumb,
  getDefaultDashboardWidgets,
  getNavigationItems,
  getPrimaryRole,
} from "@/lib/utils/dashboard";
import { useAuthStore } from "@/store/authStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { BarChart3, Clock, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Dashboard Page
 * Trang chủ dashboard
 * Hiển thị role-based widgets và statistics
 */
export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();

  // Auth state
  const { user, isAuthenticated } = useAuthStore();

  // Dashboard state
  const { breadcrumbs, setBreadcrumbs, activeMenuItem, setActiveMenuItem } =
    useDashboardStore();

  // Redirect nếu chưa authenticate
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }
  }, [isAuthenticated, user, router]);

  // Update breadcrumb khi pathname thay đổi
  useEffect(() => {
    const newBreadcrumbs = formatBreadcrumb(pathname);
    setBreadcrumbs(newBreadcrumbs);
    setActiveMenuItem(pathname);
  }, [pathname, setBreadcrumbs, setActiveMenuItem]);

  if (!isAuthenticated || !user) {
    return null; // Show nothing while redirecting
  }

  // Lấy primary role
  const userRole = getPrimaryRole(user.roles);

  // Lấy navigation items cho role
  const navItems = getNavigationItems(userRole);

  // Lấy widgets cho role
  const widgets = getDefaultDashboardWidgets(userRole);

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, idx) => (
                  <div key={crumb.href} className="flex items-center gap-2">
                    {crumb.isActive ? (
                      <BreadcrumbItem>
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      </BreadcrumbItem>
                    ) : (
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink asChild>
                          <Link href={crumb.href}>{crumb.label}</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    )}

                    {idx < breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main Content */}
        <DashboardShell>
          {/* Welcome Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Chào mừng, {user.full_name || user.email}!
              </h1>
              <p className="text-gray-600 mt-1">
                Quản lý SPA của bạn từ một nơi duy nhất
              </p>
            </div>
            <RoleBadge role={userRole} size="lg" showIcon={true} />
          </div>

          {/* Widgets Grid */}
          {widgets.length > 0 ? (
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              {widgets.map((widget) => {
                if (widget.type === "stat") {
                  return (
                    <StatCard
                      key={widget.id}
                      title={widget.title}
                      value={widget.data?.value || 0}
                      icon={Users} // TODO: Lấy icon từ widget config
                      trend={widget.data?.trend}
                      trendValue={widget.data?.trendValue}
                    />
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <EmptyState
              icon={BarChart3}
              title="Không có dữ liệu"
              description="Chưa có thông tin để hiển thị cho vai trò của bạn"
            />
          )}

          {/* Content Area */}
          <div className="bg-muted/50 min-h-[400px] flex-1 rounded-xl md:min-h-min p-6">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Các tính năng khác sẽ sớm có mặt...
                </p>
              </div>
            </div>
          </div>
        </DashboardShell>
      </SidebarInset>
    </>
  );
}
