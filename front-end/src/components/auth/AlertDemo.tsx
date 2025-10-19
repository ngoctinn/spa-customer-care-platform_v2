"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";

/**
 * Component demo cho tất cả Alert variants
 * Hiển thị: success, info, warning, destructive (error)
 */
export const AlertDemo = () => {
  return (
    <div className="space-y-4 p-6 bg-background">
      {/* ✅ Success Alert */}
      <Alert variant="success">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Thành công</AlertTitle>
        <AlertDescription>
          Hành động của bạn đã được hoàn thành thành công. Email xác minh sẽ
          được gửi tới địa chỉ của bạn.
        </AlertDescription>
      </Alert>

      {/* ℹ️ Info Alert */}
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertTitle>Thông tin</AlertTitle>
        <AlertDescription>
          Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.
        </AlertDescription>
      </Alert>

      {/* ⚠️ Warning Alert */}
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Cảnh báo</AlertTitle>
        <AlertDescription>
          Bạn sắp hết hạn link xác nhận. Vui lòng xác minh email trong vòng 24
          giờ tới.
        </AlertDescription>
      </Alert>

      {/* ❌ Error Alert (destructive) */}
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi</AlertTitle>
        <AlertDescription>
          Email hoặc mật khẩu không chính xác. Vui lòng thử lại.
        </AlertDescription>
      </Alert>

      {/* Default Alert */}
      <Alert variant="default">
        <Info className="h-4 w-4" />
        <AlertTitle>Thông báo mặc định</AlertTitle>
        <AlertDescription>
          Đây là alert với variant mặc định, dùng cho thông báo chung.
        </AlertDescription>
      </Alert>
    </div>
  );
};
