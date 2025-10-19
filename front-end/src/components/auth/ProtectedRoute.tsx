"use client";

import { ROUTES } from "@/config/constants";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

/**
 * Component bảo vệ route - kiểm tra authentication và authorization
 */
export const ProtectedRoute = ({
  children,
  requiredRoles,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Kiểm tra nếu người dùng chưa được xác thực
    if (!isAuthenticated || !user) {
      router.push(ROUTES.LOGIN);
      return;
    }

    // Kiểm tra quyền hạn nếu có yêu cầu
    if (requiredRoles && requiredRoles.length > 0) {
      const userRoles =
        user.roles?.map((role) =>
          typeof role === "string" ? role : role.name
        ) || [];

      const hasRequiredRole = requiredRoles.some((role) =>
        userRoles.includes(role)
      );

      if (!hasRequiredRole) {
        // Redirect đến trang 403 hoặc dashboard
        router.push(ROUTES.DASHBOARD);
      }
    }
  }, [isAuthenticated, user, requiredRoles, router]);

  // Nếu chưa xác thực, không render
  if (!isAuthenticated || !user) {
    return null;
  }

  // Kiểm tra quyền hạn
  if (requiredRoles && requiredRoles.length > 0) {
    const userRoles =
      user.roles?.map((role) =>
        typeof role === "string" ? role : role.name
      ) || [];

    const hasRequiredRole = requiredRoles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasRequiredRole) {
      return null;
    }
  }

  return <>{children}</>;
};
