"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { RegisterFormData, registerSchema } from "@/lib/utils/validation";

interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Component form đăng ký
 */
export const RegisterForm = ({ onSuccess, onError }: RegisterFormProps) => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // Xử lý submit form
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      // Gửi request đăng ký
      const result = await authService.register(data.email, data.password);

      // Hiển thị thông báo thành công
      setSuccessMessage(result.message);

      // Gọi callback success nếu có
      if (onSuccess) {
        onSuccess();
      }

      // Redirect đến trang xác minh email sau 2 giây
      setTimeout(() => {
        router.push(`${ROUTES.LOGIN}?registered=true`);
      }, 2000);
    } catch (error: any) {
      // Xử lý lỗi từ API
      const errorMessage =
        error?.response?.data?.detail ||
        error?.message ||
        "Lỗi đăng ký. Vui lòng thử lại";

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
          Đăng Ký
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
                      placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
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

            {/* Terms Checkbox */}
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Tôi chấp nhận{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Điều khoản dịch vụ
                    </Link>
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormMessage>{form.formState.errors.terms?.message}</FormMessage>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Đang đăng ký..." : "Đăng Ký"}
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm">
              Đã có tài khoản?{" "}
              <Link
                href={ROUTES.LOGIN}
                className="text-primary hover:underline font-medium"
              >
                Đăng nhập
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
