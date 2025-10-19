"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";

/**
 * Trang đăng nhập
 */
export default function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}

        {/* Registration Success Message */}
        {registered && (
          <Alert variant="success" className="mb-4">
            <AlertDescription>
              ✓ Đăng ký thành công! Vui lòng xác minh email của bạn trước khi
              đăng nhập.
            </AlertDescription>
          </Alert>
        )}

        {/* Login Form */}
        <LoginForm />

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 Spa Customer Care Platform. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
}
