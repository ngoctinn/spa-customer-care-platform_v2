"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ROUTES } from "@/config/constants";
import { authService } from "@/lib/api/services/authService";
import {
  PasswordResetRequestData,
  passwordResetRequestSchema,
} from "@/lib/utils/validation";

/**
 * Trang yêu cầu đặt lại mật khẩu (bước 1)
 */
export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<PasswordResetRequestData>({
    resolver: zodResolver(passwordResetRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  // Xử lý submit form
  const onSubmit = async (data: PasswordResetRequestData) => {
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      // Gửi request yêu cầu reset password
      const result = await authService.requestPasswordReset(data.email);

      // Hiển thị thông báo thành công (không tiết lộ email tồn tại)
      setSuccessMessage(
        result.message || "Nếu tài khoản tồn tại, email hướng dẫn sẽ được gửi."
      );

      // Reset form sau 3 giây
      setTimeout(() => {
        form.reset();
      }, 3000);
    } catch (error: any) {
      // Xử lý lỗi từ API (giả mạo thành công để chống enumeration attack)
      setSuccessMessage("Nếu tài khoản tồn tại, email hướng dẫn sẽ được gửi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Yêu Cầu Đặt Lại Mật Khẩu</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Success Message */}
            {successMessage && (
              <Alert variant="success" className="mb-4">
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            {/* Error Message */}
            {apiError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Đang gửi..." : "Gửi Hướng Dẫn Đặt Lại"}
                </Button>

                {/* Back to Login */}
                <div className="text-center text-sm">
                  <Link
                    href={ROUTES.LOGIN}
                    className="text-primary hover:underline"
                  >
                    Quay lại đăng nhập
                  </Link>
                </div>
              </form>
            </Form>
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
