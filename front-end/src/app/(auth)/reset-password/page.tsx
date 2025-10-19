"use client";

import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ROUTES } from "@/config/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * Trang đặt lại mật khẩu (bước 2: xác nhận bằng token)
 */
export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Nếu không có token, hiển thị lỗi
  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Đặt Lại Mật Khẩu
            </h1>
          </div>

          <Alert variant="destructive">
            <AlertDescription>
              Link không hợp lệ hoặc đã hết hạn. Vui lòng{" "}
              <Link href={ROUTES.FORGOT_PASSWORD} className="underline">
                yêu cầu đặt lại mật khẩu
              </Link>{" "}
              lại.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Đặt Lại Mật Khẩu
          </h1>
          <p className="text-muted-foreground">Nhập mật khẩu mới của bạn</p>
        </div>

        {/* Password Reset Form */}
        <PasswordResetForm token={token} />

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 Spa Customer Care Platform. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
}
