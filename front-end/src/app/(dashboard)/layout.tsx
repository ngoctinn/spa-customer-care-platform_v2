import { AuthProvider } from "@/components/common/AuthProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Spa Customer Care Platform",
  description: "Manage your spa business with our comprehensive platform",
};

/**
 * Dashboard Layout
 * Protected layout cho tất cả dashboard routes
 * Bao gồm AuthProvider, SidebarProvider, error boundaries
 */
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </AuthProvider>
  );
}
