"use client";

import { BreadcrumbItem, DashboardState } from "@/types/dashboard";
import { create } from "zustand";

/**
 * Zustand store cho dashboard state
 * Quản lý breadcrumbs, sidebar collapse state, active menu item, search query
 */
export const useDashboardStore = create<DashboardState>((set) => ({
  // Initial state
  breadcrumbs: [{ label: "Dashboard", href: "/dashboard" }],
  sidebarCollapsed: false,
  activeMenuItem: null,
  searchQuery: "",

  // Actions
  /**
   * Cập nhật breadcrumbs
   * @param items - Array of BreadcrumbItem
   */
  setBreadcrumbs: (items: BreadcrumbItem[]) =>
    set({
      breadcrumbs: items,
    }),

  /**
   * Toggle/set sidebar collapse state
   * @param collapsed - true nếu sidebar collapse, false nếu expanded
   */
  setSidebarCollapsed: (collapsed: boolean) =>
    set({
      sidebarCollapsed: collapsed,
    }),

  /**
   * Set active menu item (current navigation)
   * @param item - URL của active menu item, hoặc null nếu không có
   */
  setActiveMenuItem: (item: string | null) =>
    set({
      activeMenuItem: item,
    }),

  /**
   * Cập nhật search query
   * @param query - Search query string
   */
  setSearchQuery: (query: string) =>
    set({
      searchQuery: query,
    }),

  /**
   * Reset store về initial state
   */
  reset: () =>
    set({
      breadcrumbs: [{ label: "Dashboard", href: "/dashboard" }],
      sidebarCollapsed: false,
      activeMenuItem: null,
      searchQuery: "",
    }),
}));
