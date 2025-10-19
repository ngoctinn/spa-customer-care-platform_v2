"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";

/**
 * Trang đăng ký
 */
export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}

        {/* Register Form */}
        <RegisterForm />

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 Spa Customer Care Platform. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
}
