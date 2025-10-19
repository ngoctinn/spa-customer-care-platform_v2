"use client";

import { cn } from "@/lib/utils";
import { DashboardShellProps } from "@/types/dashboard";

/**
 * DashboardShell Component
 * Layout wrapper cho dashboard pages
 * Cung cấp consistent padding và styling cho dashboard content
 */
export function DashboardShell({
  children,
  currentBreadcrumbs,
  className,
}: DashboardShellProps & { className?: string }) {
  return (
    <div className={cn("flex flex-1 flex-col gap-4 p-4 pt-0", className)}>
      {children}
    </div>
  );
}
