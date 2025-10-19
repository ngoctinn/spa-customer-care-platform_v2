"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  ConfirmPasswordResetData,
  confirmPasswordResetSchema,
} from "@/lib/utils/validation";

interface PasswordResetFormProps {
  token: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Component form đặt lại mật khẩu (xác nhận bằng token)
 */
export const PasswordResetForm = ({
  token,
  onSuccess,
  onError,
}: PasswordResetFormProps) => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<ConfirmPasswordResetData>({
    resolver: zodResolver(confirmPasswordResetSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Xử lý submit form
  const onSubmit = async (data: ConfirmPasswordResetData) => {
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      // Gửi request xác nhận đặt lại mật khẩu
      const result = await authService.confirmPasswordReset(
        token,
        data.newPassword
      );

      // Hiển thị thông báo thành công
      setSuccessMessage(result.message);

      // Gọi callback success nếu có
      if (onSuccess) {
        onSuccess();
      }

      // Redirect đến login sau 2 giây
      setTimeout(() => {
        router.push(ROUTES.LOGIN);
      }, 2000);
    } catch (error: any) {
      // Xử lý lỗi từ API
      const errorMessage =
        error?.response?.data?.detail ||
        error?.message ||
        "Lỗi đặt lại mật khẩu. Vui lòng thử lại";

      setApiError(errorMessage);

      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Đặt Lại Mật Khẩu
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Hiển thị lỗi API */}
        {apiError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        {/* Hiển thị thông báo thành công */}
        {successMessage && (
          <Alert variant="success" className="mb-4">
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password Field */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
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
              {isLoading ? "Đang đặt lại..." : "Đặt Lại Mật Khẩu"}
            </Button>

            {/* Back to Login Link */}
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
  );
};
