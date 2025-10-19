"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardHeaderProps } from "@/types/dashboard";
import Link from "next/link";

/**
 * DashboardHeader Component
 * Hiển thị header với sidebar trigger, breadcrumb navigation
 */
export function DashboardHeader({
  breadcrumbs,
  userRole,
}: DashboardHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        {/* Sidebar Trigger */}
        <SidebarTrigger className="-ml-1" />

        {/* Separator */}
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        {/* Breadcrumb Navigation */}
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
  );
}
