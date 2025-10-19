"use client";

import { RoleBadge } from "@/components/dashboard/RoleBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authService } from "@/lib/api/services/authService";
import { getPrimaryRole } from "@/lib/utils/dashboard";
import { useAuthStore } from "@/store/authStore";
import { NavUserProps } from "@/types/dashboard";
import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * NavUser Component
 * Hiển thị user menu với avatar, email, logout button
 */
export function NavUser({ user, onLogout, isLoggingOut }: NavUserProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { logout: logoutStore, user: currentUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  // Lấy initials từ name hoặc email
  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return email?.[0].toUpperCase() || "U";
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      setIsLoading(true);

      // Call API logout
      if (onLogout) {
        await onLogout();
      } else {
        await authService.logout();
      }

      // Clear local state
      logoutStore();

      // Redirect to login
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state and redirect on error
      logoutStore();
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const userRole = currentUser ? getPrimaryRole(currentUser.roles) : "customer";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {getInitials(user.name, user.email)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user.name || "User"}
                </span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* Dropdown Menu */}
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* User Info */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(user.name, user.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.name || "User"}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Role Badge */}
            <div className="px-2 py-1.5">
              <RoleBadge role={userRole} size="sm" showIcon={true} />
            </div>

            <DropdownMenuSeparator />

            {/* Account Menu Items */}
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <User className="mr-2 h-4 w-4" />
                Hồ sơ
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Settings className="mr-2 h-4 w-4" />
                Cài đặt
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Logout */}
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoading || isLoggingOut}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoading || isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
