"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmptyStateProps } from "@/types/dashboard";
import { FileQuestion } from "lucide-react";

/**
 * EmptyState Component
 * Hiển thị trạng thái rỗng khi không có dữ liệu
 */
export function EmptyState({
  icon: Icon = FileQuestion,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4",
        className
      )}
    >
      {/* Icon */}
      <Icon className="w-16 h-16 text-gray-300 mb-4" />

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600 mb-6 text-center max-w-sm">
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <Button onClick={action.onClick} variant="outline" className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}
