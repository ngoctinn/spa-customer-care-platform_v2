"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { StatCardProps } from "@/types/dashboard";
import { ArrowDown, ArrowUp } from "lucide-react";

/**
 * StatCard Component
 * Hiển thị KPI statistics dưới dạng card
 * Hỗ trợ loading state, trend indicator, icon
 */
export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  loading = false,
  onClick,
  className,
}: StatCardProps) {
  if (loading) {
    return (
      <Card className={cn("p-6", className)}>
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-3 w-16" />
      </Card>
    );
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const TrendIcon =
    trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : null;

  return (
    <Card
      onClick={onClick}
      className={cn(
        "p-6 hover:shadow-lg transition-shadow",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {Icon && <Icon className="w-5 h-5 text-gray-400" />}
      </div>

      {/* Value */}
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>

        {/* Trend */}
        {trend && trendValue !== undefined && (
          <span
            className={cn(
              "flex items-center gap-1 text-sm font-medium mb-1",
              getTrendColor()
            )}
          >
            {TrendIcon && <TrendIcon className="w-4 h-4" />}
            {trendValue}%
          </span>
        )}
      </div>
    </Card>
  );
}
