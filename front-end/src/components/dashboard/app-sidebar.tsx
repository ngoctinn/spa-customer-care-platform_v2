"use client";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { getNavigationItems, getPrimaryRole } from "@/lib/utils/dashboard";
import { useAuthStore } from "@/store/authStore";
import { Command } from "lucide-react";
import * as React from "react";

/**
 * AppSidebar Component
 * Main sidebar component cho dashboard
 * Hiển thị role-based navigation menu
 */
export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();
  const { state } = useSidebar();

  // Lấy primary role từ user
  const userRole = getPrimaryRole(user?.roles);

  // Lấy navigation items dựa trên role
  const navigationItems = getNavigationItems(userRole);

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header với logo */}
      <SidebarHeader>
        <div className="flex items-center gap-2 px-0.5 py-1.5">
          {/* Icon - luôn hiển thị */}
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground flex-shrink-0">
            <Command className="w-4 h-4" />
          </div>

          {/* Text - ẩn khi collapse */}
          {state === "expanded" && (
            <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
              <span className="truncate font-semibold">Spa Care</span>
              <span className="truncate text-xs">Platform</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent>
        <NavMain items={navigationItems} />
      </SidebarContent>

      {/* User Menu */}
      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: user.full_name,
              email: user.email,
              avatar: user.avatar,
            }}
          />
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
