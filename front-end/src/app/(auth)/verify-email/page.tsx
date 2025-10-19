"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ROUTES } from "@/config/constants";
import { authService } from "@/lib/api/services/authService";

/**
 * Trang xác minh email
 */
export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  // Auto-verify khi component mount
  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setErrorMessage("Token không hợp lệ");
        setIsLoading(false);
        return;
      }

      try {
        const result = await authService.verifyEmail(token);
        setSuccessMessage(result.message);

        // Redirect đến login sau 2 giây
        setTimeout(() => {
          router.push(ROUTES.LOGIN);
        }, 2000);
      } catch (error: any) {
        const errorMsg =
          error?.response?.data?.detail || "Link không hợp lệ hoặc đã hết hạn";
        setErrorMessage(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  // Countdown timer cho nút gửi lại
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Xử lý gửi lại email xác minh
  const handleResendEmail = async () => {
    if (!email || countdown > 0) return;

    setIsResending(true);
    try {
      await authService.resendVerificationEmail(email);
      setCountdown(60);
      setSuccessMessage("Email xác minh đã được gửi lại");
    } catch (error: any) {
      const errorMsg = error?.message || "Lỗi gửi lại email";
      setErrorMessage(errorMsg);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Xác Minh Email</h1>
          <p className="text-muted-foreground">
            Vui lòng chờ đang xác minh email của bạn...
          </p>
        </div>

        {/* Verification Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trạng Thái Xác Minh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Loading State */}
            {isLoading && (
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-muted border-t-primary rounded-full" />
                </div>
                <p className="text-muted-foreground">Đang xác minh...</p>
              </div>
            )}

            {/* Success State */}
            {successMessage && !isLoading && (
              <>
                <Alert variant="success">
                  <AlertDescription>✓ {successMessage}</AlertDescription>
                </Alert>
                <div className="text-center text-sm text-muted-foreground">
                  Bạn sẽ được chuyển hướng đến trang đăng nhập...
                </div>
              </>
            )}

            {/* Error State */}
            {errorMessage && (
              <>
                <Alert variant="destructive">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>

                {/* Resend Email Button */}
                {email && (
                  <div className="space-y-3 pt-2">
                    <p className="text-sm text-muted-foreground text-center">
                      Không nhận được email?
                    </p>
                    <Button
                      onClick={handleResendEmail}
                      disabled={countdown > 0 || isResending}
                      className="w-full"
                      variant="outline"
                    >
                      {countdown > 0
                        ? `Gửi lại sau ${countdown}s`
                        : isResending
                        ? "Đang gửi..."
                        : "Gửi Lại Email"}
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Action Links */}
            <div className="flex gap-2 text-sm text-center justify-center pt-2">
              <Link
                href={ROUTES.LOGIN}
                className="text-primary hover:underline"
              >
                Đăng nhập
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-primary hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 Spa Customer Care Platform. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
}
