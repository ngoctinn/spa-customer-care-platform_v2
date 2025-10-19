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
import { LoginFormData, loginSchema } from "@/lib/utils/validation";
import { useAuthStore } from "@/store/authStore";

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Component form đăng nhập
 */
export const LoginForm = ({ onSuccess, onError }: LoginFormProps) => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Xử lý submit form
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // Gửi request đăng nhập
      const tokens = await authService.login(data.email, data.password);

      // Lưu access token vào localStorage
      if (tokens.access_token) {
        localStorage.setItem(
          process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "auth_token",
          tokens.access_token
        );
      }

      // Lấy thông tin người dùng hiện tại
      const userInfo = await authService.getCurrentUser();
      setUser(userInfo);

      // Gọi callback success nếu có
      if (onSuccess) {
        onSuccess();
      }

      // Redirect đến dashboard
      router.push(ROUTES.DASHBOARD);
    } catch (error: any) {
      // Xử lý lỗi từ API
      const errorMessage =
        error?.response?.data?.detail ||
        error?.message ||
        "Lỗi đăng nhập. Vui lòng thử lại";

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
          Đăng Nhập
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Hiển thị lỗi API */}
        {apiError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu"
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
              {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </Button>

            {/* Links */}
            <div className="flex flex-col gap-2 text-sm text-center">
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-primary hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>

            {/* Register Link */}
            <div className="text-center text-sm">
              Chưa có tài khoản?{" "}
              <Link
                href={ROUTES.REGISTER}
                className="text-primary hover:underline font-medium"
              >
                Đăng ký ngay
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
