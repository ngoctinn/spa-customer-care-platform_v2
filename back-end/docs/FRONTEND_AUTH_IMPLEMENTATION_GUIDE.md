# 📘 Hướng Dẫn Triển Khai Module Auth - Front-End

**Phiên bản:** 1.0  
**Cập nhật:** 2025-10-19  
**Đối tượng:** Frontend Developer

---

## 📋 Mục Lục

1. [Tổng Quan Hệ Thống](#tổng-quan-hệ-thống)
2. [Kiến Trúc Token & Authentication](#kiến-trúc-token--authentication)
3. [API Endpoints](#api-endpoints)
4. [Luồng Xử Lý Chi Tiết](#luồng-xử-lý-chi-tiết)
5. [Ví Dụ Triển Khai](#ví-dụ-triển-khai)
6. [Xử Lý Lỗi](#xử-lý-lỗi)
7. [Best Practices](#best-practices)

---

## 🎯 Tổng Quan Hệ Thống

Module `auth` cung cấp một hệ thống **xác thực & ủy quyền hoàn chỉnh** cho nền tảng SPA Customer Care Platform:

| Tính Năng         | Chi Tiết                                          |
| ----------------- | ------------------------------------------------- |
| **Đăng ký**       | Đăng ký tài khoản mới, tự động xác minh email     |
| **Đăng nhập**     | Xác thực user, cấp Access Token + Refresh Token   |
| **Token Refresh** | Tự động gia hạn Access Token khi hết hạn          |
| **Đăng xuất**     | Thu hồi token, xóa session                        |
| **Mật khẩu**      | Yêu cầu reset, xác nhận reset mật khẩu            |
| **RBAC**          | Quản lý vai trò (Roles) & quyền hạn (Permissions) |

---

## 🔐 Kiến Trúc Token & Authentication

### Mô Hình Token Hai Tầng

```
┌─────────────────────────────────────────────┐
│         CLIENT (BROWSER/MOBILE)             │
├─────────────────────────────────────────────┤
│ • Access Token (JWT)      - 15 phút         │
│   (Lưu trong Memory/State)                  │
│                                              │
│ • Refresh Token           - 7 ngày          │
│   (Lưu trong HttpOnly Cookie - tự động)    │
└─────────────────────────────────────────────┘
          │
          │ Authorization: Bearer <access_token>
          │
┌─────────────────────────────────────────────┐
│              SERVER (BACKEND)               │
├─────────────────────────────────────────────┤
│ Xác thực JWT, kiểm tra quyền hạn            │
│ Trả về dữ liệu hoặc lỗi 401/403            │
└─────────────────────────────────────────────┘
```

### Cấu Trúc Access Token (JWT)

```json
{
  "sub": "1", // User ID
  "roles": ["user", "staff"], // Danh sách vai trò
  "iat": 1697520000, // Thời điểm cấp
  "exp": 1697520900 // Thời điểm hết hạn
}
```

### Chu Kỳ Sử Dụng Token

```
1. Đăng nhập           → Cấp access_token + set refresh_token vào cookie
2. Gọi API             → Gửi access_token trong header
3. Token hết hạn (401) → Tự động gọi /refresh
4. Cấp token mới       → Dùng refresh_token từ cookie
5. Thử lại API cũ      → Gửi access_token mới
```

---

## 📡 API Endpoints

### Base URL

```
https://api.spastudio.local/api
```

### 1. Xác Thực Cơ Bản

#### 🔴 `POST /auth/register` - Đăng Ký

Tạo tài khoản mới, gửi email xác minh.

**Request:**

```bash
POST /auth/register
Content-Type: application/json

{
  "email": "customer@example.com",
  "password": "SecurePass123"
}
```

**Response (201 Created):**

```json
{
  "message": "Đăng ký thành công. Vui lòng xác minh email",
  "email": "customer@example.com"
}
```

**Lỗi:**

- `400`: Email đã tồn tại
- `422`: Dữ liệu không hợp lệ (password < 8 ký tự)

---

#### 🟡 `POST /auth/verify-email` - Xác Minh Email

Kích hoạt tài khoản bằng token từ email.

**Request:**

```bash
POST /auth/verify-email
Content-Type: application/json

{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response (200):**

```json
{
  "message": "Email xác minh thành công",
  "email": "customer@example.com"
}
```

**Lỗi:**

- `400`: Token không hợp lệ hoặc hết hạn

---

#### 🟢 `POST /auth/login` - Đăng Nhập

Xác thực, cấp JWT token.

**Request:**

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "customer@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

**Lỗi:**

- `401`: Email/password không hợp lệ
- `403`: Tài khoản chưa kích hoạt (chưa xác minh email)

**Headers Response:**

```
Set-Cookie: refresh_token=...; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800
```

---

#### 🔄 `POST /auth/refresh` - Gia Hạn Token

Cấp access token mới từ refresh token.

**Request:**

```bash
POST /auth/refresh
(Tự động gửi refresh_token từ cookie)
```

**Response (200):**

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

**Lỗi:**

- `401`: Refresh token không hợp lệ

---

#### 🚪 `POST /auth/logout` - Đăng Xuất

Thu hồi token, xóa session.

**Request:**

```bash
POST /auth/logout
(Tự động gửi refresh_token từ cookie)
```

**Response (200):**

```json
{
  "message": "Đã đăng xuất"
}
```

---

#### 👤 `GET /auth/me` - Lấy Thông Tin User

Truy vấn thông tin user hiện tại.

**Request:**

```bash
GET /auth/me
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": 1,
  "email": "customer@example.com",
  "is_active": true,
  "roles": [
    {
      "id": 1,
      "name": "user",
      "description": "Vai trò người dùng cơ bản"
    }
  ]
}
```

**Lỗi:**

- `401`: Token không hợp lệ

---

### 2. Đặt Lại Mật Khẩu

#### 📧 `POST /auth/password-reset` - Bước 1: Gửi Email

Gửi email reset password.

**Request:**

```bash
POST /auth/password-reset
Content-Type: application/json

{
  "email": "customer@example.com"
}
```

**Response (200):**

```json
{
  "message": "Nếu tài khoản tồn tại, email hướng dẫn đã được gửi"
}
```

**Lưu ý:** Không tiết lộ email tồn tại (vì bảo mật).

---

#### ✅ `POST /auth/confirm-password-reset` - Bước 2: Xác Nhận

Đặt lại mật khẩu bằng token + password mới.

**Request:**

```bash
POST /auth/confirm-password-reset
Content-Type: application/json

{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "new_password": "NewSecurePass456"
}
```

**Response (200):**

```json
{
  "message": "Mật khẩu đã được đặt lại thành công",
  "email": "customer@example.com"
}
```

**Lỗi:**

- `400`: Token không hợp lệ, hết hạn, hoặc password < 8 ký tự

---

#### 🔄 `POST /auth/resend-verification-email` - Gửi Lại Email Xác Minh

Gửi lại email xác minh nếu không nhận được.

**Request:**

```bash
POST /auth/resend-verification-email
Content-Type: application/json

{
  "email": "customer@example.com"
}
```

**Response (200):**

```json
{
  "message": "Email xác minh đã được gửi lại",
  "email": "customer@example.com"
}
```

---

### 3. Quản Lý Vai Trò & Quyền (Admin Only)

> ⚠️ **Yêu cầu quyền Admin** - Kiểm tra role của user trước

#### Quản lý Vai Trò (Roles)

```bash
# Tạo vai trò mới
POST /admin/roles
{
  "name": "staff",
  "description": "Nhân viên spa"
}

# Lấy danh sách vai trò
GET /admin/roles

# Gán vai trò cho user
POST /admin/users/{user_id}/roles/{role_id}

# Thu hồi vai trò từ user
DELETE /admin/users/{user_id}/roles/{role_id}
```

#### Quản lý Quyền Hạn (Permissions)

```bash
# Tạo quyền hạn
POST /admin/permissions
{
  "name": "products:create",
  "description": "Quyền tạo sản phẩm"
}

# Lấy danh sách quyền hạn
GET /admin/permissions

# Gán quyền cho vai trò
POST /admin/roles/{role_id}/permissions/{permission_id}

# Thu hồi quyền từ vai trò
DELETE /admin/roles/{role_id}/permissions/{permission_id}
```

---

## 🔄 Luồng Xử Lý Chi Tiết

### Luồng Đăng Ký

```
┌─────────────┐
│   START     │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│ Frontend: Nhập email │
│ & password           │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ POST /auth/register  │
└──────┬───────────────┘
       │
       ├─→ [Backend] Kiểm tra email trùng
       │
       ├─→ [Backend] Hash password
       │
       ├─→ [Backend] Tạo User (is_active=false)
       │
       ├─→ [Backend] Gán role "user" mặc định
       │
       ├─→ [Backend] Tạo Customer hồ sơ
       │
       ├─→ [Backend] Tạo verification token
       │
       ├─→ [Backend] Gửi email xác minh
       │
       ▼
┌──────────────────────┐
│ Frontend: Hiển thị   │
│ "Kiểm tra email"     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ User: Click link     │
│ trong email          │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ POST /auth/verify-   │
│ email?token=...      │
└──────┬───────────────┘
       │
       ├─→ [Backend] Kiểm tra token hợp lệ
       │
       ├─→ [Backend] Kiểm tra token chưa hết hạn
       │
       ├─→ [Backend] Set user.is_active = true
       │
       ├─→ [Backend] Xóa verification token
       │
       ▼
┌──────────────────────┐
│ Frontend: Hiển thị   │
│ "Email xác minh      │
│ thành công"          │
│ → Redirect /login    │
└──────────────────────┘
```

### Luồng Đăng Nhập

```
┌─────────────┐
│   START     │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│ Frontend: Nhập email │
│ & password           │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ POST /auth/login     │
└──────┬───────────────┘
       │
       ├─→ [Backend] Tìm user bằng email
       │   ├─→ Không tìm thấy? → 401 Error
       │
       ├─→ [Backend] Kiểm tra password
       │   ├─→ Sai password? → 401 Error
       │
       ├─→ [Backend] Kiểm tra is_active
       │   ├─→ Chưa kích hoạt? → 403 Error
       │
       ├─→ [Backend] Tạo access_token (JWT)
       │
       ├─→ [Backend] Tạo refresh_token (opaque)
       │
       ├─→ [Backend] Lưu refresh_token vào DB
       │
       ├─→ [Backend] Set refresh_token cookie (HttpOnly)
       │
       ▼
┌──────────────────────┐
│ Frontend: Lưu        │
│ access_token vào     │
│ state/memory         │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Frontend: Redirect   │
│ → /dashboard         │
└──────────────────────┘
```

### Luồng Gia Hạn Token

```
┌──────────────────────┐
│ Frontend: API trả    │
│ 401 Unauthorized     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ POST /auth/refresh   │
│ (Cookie tự động)     │
└──────┬───────────────┘
       │
       ├─→ [Backend] Lấy refresh_token từ cookie
       │   ├─→ Không có? → 401 Error
       │
       ├─→ [Backend] Kiểm tra token trong DB
       │   ├─→ Không tồn tại? → 401 Error
       │   ├─→ Bị revoke? → 401 Error
       │
       ├─→ [Backend] Tìm user
       │   ├─→ Không tồn tại? → 401 Error
       │   ├─→ Chưa active? → 401 Error
       │
       ├─→ [Backend] Tạo access_token mới
       │
       ▼
┌──────────────────────┐
│ Frontend: Lưu        │
│ access_token mới     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Frontend: Thử lại    │
│ API cũ               │
└──────────────────────┘
```

---

## 💻 Ví Dụ Triển Khai

### JavaScript/TypeScript (React/Vue)

#### Ví dụ 1: Hàm Đăng Ký

```typescript
// authService.ts

const API_BASE = "https://api.spastudio.local/api";

export const authService = {
  // Đăng ký
  async register(email: string, password: string) {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Cho phép gửi cookie
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Đăng ký thất bại");
    }

    return await response.json();
  },

  // Xác minh email
  async verifyEmail(token: string) {
    const response = await fetch(`${API_BASE}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Xác minh thất bại");
    }

    return await response.json();
  },

  // Đăng nhập
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Đăng nhập thất bại");
    }

    const data = await response.json();
    // Lưu access token vào state/localStorage
    localStorage.setItem("accessToken", data.access_token);
    return data;
  },

  // Gia hạn token
  async refresh() {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      // Refresh thất bại, xóa token và redirect login
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      throw new Error("Phiên làm việc hết hạn");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access_token);
    return data;
  },

  // Đăng xuất
  async logout() {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("accessToken");
  },

  // Lấy thông tin user hiện tại
  async getCurrentUser() {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      localStorage.removeItem("accessToken");
      return null;
    }

    return await response.json();
  },
};
```

---

#### Ví dụ 2: HTTP Interceptor (Axios)

```typescript
// axiosInstance.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.spastudio.local/api",
  withCredentials: true, // Cho phép gửi cookie
});

// Request Interceptor: Thêm access token vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Xử lý token hết hạn
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await apiClient.post("/auth/refresh");
        const { access_token } = response.data;
        localStorage.setItem("accessToken", access_token);

        processQueue(null, access_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

---

#### Ví dụ 3: React Component (Login Form)

```typescript
// LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./authService";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Đăng Nhập</h1>
      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>
      </form>
    </div>
  );
};
```

---

## ⚠️ Xử Lý Lỗi

| Mã Lỗi  | Nguyên Nhân                | Giải Pháp                                          |
| ------- | -------------------------- | -------------------------------------------------- |
| **400** | Dữ liệu không hợp lệ       | Kiểm tra lại request body (email, password length) |
| **401** | Token hết hạn/không hợp lệ | Gọi `/auth/refresh` để cấp token mới               |
| **403** | Tài khoản chưa kích hoạt   | Yêu cầu user xác minh email                        |
| **404** | Resource không tồn tại     | Kiểm tra URL và parameters                         |
| **500** | Lỗi server                 | Liên hệ support, kiểm tra logs backend             |

---

### Ví dụ Xử Lý Lỗi

```typescript
export async function handleApiError(error: any) {
  const status = error.response?.status;
  const detail = error.response?.data?.detail;

  switch (status) {
    case 400:
      return `Lỗi: ${detail || "Dữ liệu không hợp lệ"}`;

    case 401:
      // Token hết hạn, refresh tự động
      const newToken = await authService.refresh();
      return { retry: true, token: newToken };

    case 403:
      return "Bạn không có quyền truy cập tính năng này";

    case 409:
      return `Lỗi: ${detail || "Email đã tồn tại"}`;

    default:
      return "Có lỗi xảy ra, vui lòng thử lại";
  }
}
```

---

## 🚀 Best Practices

### 1. Quản Lý Token An Toàn

✅ **LÀM:**

- Lưu access token trong **Memory hoặc State** (không localStorage)
- Refresh token được browser tự động quản lý via HttpOnly cookie
- Xóa token khi đăng xuất

❌ **KHÔNG LÀM:**

- Lưu access token trong localStorage (dễ bị XSS)
- Lưu refresh token trong localStorage
- Để token in commit lên Git

### 2. Xử Lý Token Hết Hạn

✅ **LÀM:**

- Sử dụng HTTP Interceptor để tự động refresh token
- Xử lý race condition khi multiple requests gọi refresh cùng lúc
- Kiểm tra token trước khi gửi request

❌ **KHÔNG LÀM:**

- Bỏ qua lỗi 401 mà không refresh
- Refresh token nhiều lần liên tiếp

### 3. Bảo Mật

✅ **LÀM:**

- Sử dụng HTTPS cho tất cả request
- Set `credentials: 'include'` khi gửi request (cho phép cookie)
- Xác minh email trước khi kích hoạt tài khoản
- Validate dữ liệu trên cả front-end và back-end

❌ **KHÔNG LÀM:**

- Gửi password qua URL
- Lưu password trong memory
- Bỏ qua HTTPS

### 4. User Experience

✅ **LÀM:**

- Hiển thị loading state khi xử lý
- Thông báo lỗi rõ ràng bằng tiếng Việt
- Redirect tự động khi chưa đăng nhập
- Lưu thông tin user để hiển thị avatar/tên

❌ **KHÔNG LÀM:**

- Không phản hồi gì khi đang xử lý
- Hiển thị lỗi kỹ thuật cho user
- Để user stuck ở page sau khi token hết hạn

### 5. Testing

✅ **Kiểm thử:**

- Đăng ký, xác minh email, đăng nhập
- Token hết hạn & refresh
- Đăng xuất & xóa token
- Lỗi (invalid email, duplicate email, wrong password)
- Các vai trò & quyền hạn

```typescript
// Ví dụ unit test
describe("authService", () => {
  it("should login successfully", async () => {
    const result = await authService.login("user@example.com", "password123");
    expect(result.access_token).toBeDefined();
    expect(localStorage.getItem("accessToken")).toBeTruthy();
  });

  it("should refresh token on 401", async () => {
    // Mock 401 response, then check refresh
  });
});
```

---

## 📞 Hỗ Trợ & Liên Hệ

| Chủ Đề       | Liên Hệ                                      |
| ------------ | -------------------------------------------- |
| Lỗi API      | Xem logs backend, kiểm tra AUTH_API_GUIDE.md |
| Token Issues | Kiểm tra cookie settings và CORS             |
| RBAC         | Xem 0008_RBAC_MANAGEMENT_PLAN.md             |

---

**Created:** 2025-10-19  
**Last Updated:** 2025-10-19  
**Version:** 1.0
