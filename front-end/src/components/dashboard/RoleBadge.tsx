"use client";

import { ROLE_COLORS, ROLE_LABELS } from "@/config/constants";
import { cn } from "@/lib/utils";
import { RoleBadgeProps } from "@/types/dashboard";

/**
 * RoleBadge Component
 * Hiển thị user role dưới dạng badge có màu sắc khác nhau theo role
 */
export function RoleBadge({
  role,
  size = "md",
  showIcon = false,
  showLabel = true,
  className,
}: RoleBadgeProps) {
  const label = ROLE_LABELS[role as keyof typeof ROLE_LABELS] || role;
  const colors = ROLE_COLORS[role as keyof typeof ROLE_COLORS];

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-medium",
        sizeStyles[size],
        colors,
        className
      )}
    >
      {showIcon && (
        <span className="w-2 h-2 rounded-full bg-current opacity-70" />
      )}
      {showLabel && label}
    </span>
  );
}
