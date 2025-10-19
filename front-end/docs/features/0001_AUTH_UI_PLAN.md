# 📱 KẾ HOẠCH KỸ THUẬT: GIAO DIỆN XÁC THỰC (AUTH UI)

**Phiên bản:** 1.0  
**Cập nhật:** 19/10/2025  
**Trang thái:** Sẽ thực hiện

---

## 1. MÔ TẢ NGỮ CẢNH

Giao diện xác thực là bộ UI hoàn chỉnh cho phép người dùng:

- 🔐 **Đăng ký** tài khoản mới (Register)
- 📧 **Xác minh email** từ token trong email
- 🔑 **Đăng nhập** và nhận access token
- 🔄 **Làm mới token** tự động khi hết hạn
- 🚪 **Đăng xuất** an toàn
- 🔑 **Quên mật khẩu** - gửi email reset
- ✏️ **Đặt lại mật khẩu** từ token

**Yêu cầu Backend:**

- API URL: `http://localhost:8000`
- Token: JWT (Access + Refresh)
- Refresh Token: Lưu trong HTTP-only cookie (tự động từ backend)
- Access Token: Gửi trong `Authorization: Bearer <token>` header

---

## 2. CÁC TỆP VÀ HÀM LIÊN QUAN

### 2.1 Tệp Hiện Tại (Đã Có)

#### **src/lib/api/client.ts**

- ✅ Axios instance đã cấu hình
- ✅ Request interceptor: thêm Authorization header
- ✅ Response interceptor: xử lý 401, gọi refresh endpoint
- ✅ Base URL: từ `NEXT_PUBLIC_API_URL`

#### **src/store/authStore.ts**

- ✅ Zustand store cho state auth
- ✅ `user` state
- ✅ `isAuthenticated` state
- ✅ `loading` state
- ✅ Actions: `setUser`, `logout`, `setLoading`

#### **src/lib/auth/storage.ts**

- ✅ `getToken()` - Lấy access token từ localStorage
- ✅ `setToken()` - Lưu access token
- ✅ `clearTokens()` - Xóa tokens
- ✅ `isTokenExpired()` - Kiểm tra token hết hạn

#### **src/lib/hooks/useAuth.ts**

- ✅ Custom hook quản lý auth
- ✅ `isAuthenticated` state
- ✅ `user` state
- ✅ `login()` function
- ✅ `logout()` function
- ✅ `register()` function

#### **src/types/index.ts**

```typescript
-User -
  AuthTokens -
  LoginRequest -
  RegisterRequest -
  PasswordResetRequest -
  PasswordResetConfirm -
  ApiError -
  ApiResponse<T>;
```

#### **src/config/constants.ts**

```typescript
- ROUTES (LOGIN, REGISTER, FORGOT_PASSWORD, DASHBOARD)
- API_ENDPOINTS (AUTH.LOGIN, AUTH.REGISTER, AUTH.REFRESH, etc.)
- ERROR_MESSAGES (INVALID_CREDENTIALS, EMAIL_EXISTS, etc.)
- SUCCESS_MESSAGES
```

### 2.2 Tệp Cần TẠO MỚI

#### **src/app/(auth)/login/page.tsx**

- Trang đăng nhập
- Form với email & password
- Validation với React Hook Form + Zod
- Error display & loading state
- Link "Quên mật khẩu?"
- Link "Đăng ký"

#### **src/app/(auth)/register/page.tsx**

- Trang đăng ký
- Form với email & password confirm
- Validation: min 8 ký tự, confirm match
- Error display & loading state
- Link "Đăng nhập"
- Message xác minh email thành công

#### **src/app/(auth)/verify-email/page.tsx**

- Trang xác minh email
- Parse token từ URL query parameter (`?token=...`)
- Auto-verify khi page load
- Display status (loading, success, error)
- Button "Gửi lại email"
- Countdown timer gửi lại (60 giây)

#### **src/app/(auth)/forgot-password/page.tsx**

- Trang yêu cầu reset password
- Form với email
- Auto-submit hoặc button submit
- Message thành công (không tiết lộ email tồn tại)
- Link "Quay lại đăng nhập"

#### **src/app/(auth)/reset-password/page.tsx**

- Trang đặt lại mật khẩu
- Parse token từ URL query parameter (`?token=...`)
- Form với mật khẩu mới & confirm
- Validation: min 8 ký tự, confirm match
- Error handling cho token hết hạn
- Success redirect đến login

#### **src/components/auth/LoginForm.tsx**

- Component form login tái sử dụng
- Props: `onSuccess?`, `onError?`
- React Hook Form setup
- Zod validation schema
- Input fields: email, password
- Button submit & loading state
- Error messages under each field

#### **src/components/auth/RegisterForm.tsx**

- Component form register
- Props: `onSuccess?`
- React Hook Form + Zod
- Fields: email, password, confirmPassword
- Password strength indicator (optional)
- Terms & conditions checkbox
- Error display

#### **src/components/auth/PasswordResetForm.tsx**

- Component form reset password
- Fields: newPassword, confirmPassword
- Validation
- Props: `token`, `onSuccess?`

#### **src/lib/api/services/authService.ts** (NEW)

```typescript
-loginUser(email, password) -
  registerUser(email, password) -
  verifyEmail(token) -
  resendVerificationEmail(email) -
  refreshToken() -
  logoutUser() -
  resetPasswordRequest(email) -
  confirmPasswordReset(token, newPassword) -
  getCurrentUser();
```

#### **src/lib/utils/validation.ts** (EXTEND)

```typescript
-loginSchema(Zod) -
  registerSchema(Zod) -
  passwordResetSchema(Zod) -
  confirmPasswordResetSchema(Zod);
```

#### **src/components/auth/ProtectedRoute.tsx** (NEW)

- HOC/Component bảo vệ routes
- Kiểm tra token hợp lệ
- Redirect về login nếu không auth
- Props: `children`, `requiredRoles?`

#### **src/components/common/AuthProvider.tsx** (NEW)

- Provider component
- Tự động refresh token khi app load
- Check session hợp lệ

#### **src/middleware.ts** (NEW)

- Next.js middleware
- Kiểm tra token trên protected routes
- Redirect unauthenticated users

---

## 3. THUẬT TOÁN / LOGIC CHI TIẾT

### 3.1 Luồng Đăng Ký (Register)

```
Step 1: User điền form
  - Email: EmailStr validation
  - Password: min 8, max 128 ký tự
  - Confirm Password: match với password

Step 2: Frontend validation (React Hook Form + Zod)
  - Valid? → Continue
  - Invalid? → Show error under field

Step 3: Call API POST /auth/register
  {
    "email": "user@example.com",
    "password": "SecurePass123"
  }

Step 4: Handle response
  - 201 Created:
    → Message: "Đăng ký thành công. Vui lòng xác minh email"
    → Store email trong session state
    → Redirect: /verify-email?email=...

  - 400 Bad Request:
    → Error detail: "Email đã tồn tại" hoặc validation error
    → Display error message

  - 422 Unprocessable Entity:
    → Schema validation error
    → Display field errors

Step 5: User nhận email xác minh
  - Email chứa link: /verify-email?token=<TOKEN>
  - Token có hạn (mặc định: 24 giờ)

Step 6: Auto-verify khi page load
  - Parse token từ URL
  - Call API POST /auth/verify-email
  - Handle success/error
```

### 3.2 Luồng Xác Minh Email (Verify Email)

```
Step 1: User click link từ email
  → Navigate: /verify-email?token=<TOKEN>

Step 2: Page load, auto-verify
  - Extract token từ query parameter
  - Show loading state

Step 3: Call API POST /auth/verify-email
  {
    "token": "<TOKEN_FROM_URL>"
  }

Step 4: Handle response
  - 200 OK:
    → Message: "Email xác minh thành công"
    → Auto-redirect: /login (after 2 seconds)
    → Display success message + timer

  - 400 Bad Request:
    → Error: "Link không hợp lệ hoặc đã hết hạn"
    → Show "Gửi lại email" button
    → Store email address từ query/state

Step 5: Gửi lại email verification
  - User click "Gửi lại email"
  - Call API POST /auth/resend-verification-email
  - Countdown timer 60s (disable button)
  - Message: "Email xác minh đã được gửi lại"

Step 6: User check email & click link mới
  → Repeat từ Step 1
```

### 3.3 Luồng Đăng Nhập (Login)

```
Step 1: User điền form
  - Email: EmailStr validation
  - Password: không để trống

Step 2: Frontend validation (React Hook Form + Zod)
  - Valid? → Continue
  - Invalid? → Show error

Step 3: Show loading spinner
  - Disable form inputs
  - Disable submit button

Step 4: Call API POST /auth/login
  {
    "email": "user@example.com",
    "password": "SecurePass123"
  }

Step 5: Handle response
  - 200 OK:
    → Response body: { "access_token": "<JWT>", "token_type": "bearer" }
    → Backend tự động set refresh_token trong HTTP-only cookie
    → Frontend:
      1. Extract access_token
      2. Save vào localStorage (key: NEXT_PUBLIC_AUTH_TOKEN_KEY)
      3. Update Zustand store: setUser(currentUser)
      4. Call GET /auth/me để lấy full user info
      5. Redirect: /dashboard

  - 401 Unauthorized:
    → Error detail: "Thông tin đăng nhập không hợp lệ"
    → Display error message
    → Keep form filled (except password)

  - 403 Forbidden:
    → Error detail: "Tài khoản chưa được kích hoạt"
    → Show message: "Vui lòng xác minh email"
    → Show link: "Gửi lại email xác minh"
    → Store email to resend later

Step 6: GET /auth/me (auto after login)
  - Lấy user info: { id, email, roles, is_active }
  - Update Zustand: setUser(userData)

Step 7: Axios interceptor auto-add token
  - Mỗi request:
    Header: "Authorization: Bearer <ACCESS_TOKEN>"
    (từ localStorage)
```

### 3.4 Luồng Làm Mới Token (Auto-Refresh)

```
Step 1: API request → Response 401 Unauthorized
  - Access token hết hạn

Step 2: Axios response interceptor trigger
  - Intercept error 401
  - Check if already retrying? → Yes → Return error (prevent loop)
  - No → Continue

Step 3: Call API POST /auth/refresh
  - Browser tự động gửi refresh_token từ HTTP-only cookie
  - No need thêm header (browser tự handle)

Step 4: Handle response
  - 200 OK:
    → Response: { "access_token": "<NEW_JWT>", "token_type": "bearer" }
    → Save new token: localStorage.setItem(TOKEN_KEY, newToken)
    → Retry original request với token mới
    → Return retry response

  - 401 Unauthorized:
    → Refresh token invalid/expired/revoked
    → Clear tokens: localStorage.removeItem(TOKEN_KEY)
    → Clear Zustand state: logout()
    → Delete HTTP-only cookie (browser tự handle)
    → Redirect: /login
    → Show message: "Session hết hạn. Vui lòng đăng nhập lại"

Step 5: Return response
  - From retry nếu refresh success
  - Từ error handler nếu refresh fail
```

### 3.5 Luồng Quên Mật Khẩu (Password Reset - Step 1)

```
Step 1: User vào /forgot-password
  - Form chỉ có 1 field: email

Step 2: User submit email
  - Frontend validation: email valid?

Step 3: Call API POST /auth/password-reset
  {
    "email": "user@example.com"
  }

Step 4: Handle response (luôn 200, không tiết lộ email tồn tại)
  - Response:
    {
      "message": "Nếu tài khoản tồn tại, email hướng dẫn đã được gửi",
      "email": null
    }

  - Behavior:
    → Nếu email tồn tại:
      - Backend gửi email với link: /reset-password?token=<TOKEN>
      - Token hết hạn (mặc định: 1 giờ)

    → Nếu email không tồn tại:
      - Backend delay 1-2 giây (chống enumeration attack)
      - Trả success message (giả mạo)

    → Frontend (không biết khác biệt):
      - Show success message
      - Instruction: "Vui lòng kiểm tra email"
      - Link: "Quay lại đăng nhập"

Step 5: Countdown timer
  - Show: "Gửi lại request sau 60 giây" (optional)
  - Disable button gửi lại trong 60s
```

### 3.6 Luồng Đặt Lại Mật Khẩu (Reset Password - Step 2)

```
Step 1: User click link từ email
  → Navigate: /reset-password?token=<TOKEN>

Step 2: Page load
  - Extract token từ query parameter
  - Show form: new password + confirm password

Step 3: User điền mật khẩu mới
  - Frontend validation (React Hook Form + Zod):
    - min 8 ký tự
    - confirm match

Step 4: User click "Đặt lại mật khẩu"
  - Show loading spinner

Step 5: Call API POST /auth/confirm-password-reset
  {
    "token": "<TOKEN>",
    "new_password": "NewSecurePass456"
  }

Step 6: Handle response
  - 200 OK:
    → Response:
      {
        "message": "Mật khẩu đã được đặt lại thành công",
        "email": "user@example.com"
      }
    → Backend:
      - Hash & update password
      - Thu hồi TẤT CẢ refresh tokens cũ (force re-login)
      - Delete reset token

    → Frontend:
      - Show success message
      - Auto-redirect: /login (after 2 seconds)
      - Clear tokens (logout)
      - Message: "Mật khẩu đã cập nhật. Vui lòng đăng nhập"

  - 400 Bad Request:
    → Reasons:
      - Token invalid: "Link không hợp lệ hoặc đã hết hạn"
      - Token expired: "Link không hợp lệ hoặc đã hết hạn"
      - Password too short: "Mật khẩu phải có ít nhất 8 ký tự"

    → Frontend:
      - Show error message
      - Show link: "Yêu cầu reset lại" → /forgot-password

Step 7: User login với mật khẩu mới
  → Use new password để đăng nhập
```

### 3.7 Luồng Đăng Xuất (Logout)

```
Step 1: User click "Đăng xuất" button
  - Show loading state

Step 2: Call API POST /auth/logout
  - Browser tự động send refresh_token trong HTTP-only cookie

Step 3: Handle response
  - 200 OK:
    → Response: { "message": "Đã đăng xuất" }
    → Backend:
      - Revoke refresh token cụ thể (mark is_revoked = True)
      - Delete HTTP-only cookie (set Max-Age=0)

    → Frontend:
      - Clear localStorage: removeItem(TOKEN_KEY)
      - Clear Zustand state: logout()
      - Redirect: /login
      - Optional: show message "Đã đăng xuất"

  - 401 Unauthorized:
    → Refresh token không tồn tại/không hợp lệ
    → Frontend: treat như logout success (clear local state)

Step 4: Cleanup
  - Clear all API interceptors state
  - Remove any session data
```

### 3.8 Luồng Lấy Thông Tin User (GET /auth/me)

```
Step 1: Call API GET /auth/me
  - Header: "Authorization: Bearer <ACCESS_TOKEN>"
  - (Axios interceptor tự thêm)

Step 2: Handle response
  - 200 OK:
    → Response:
      {
        "id": 1,
        "email": "user@example.com",
        "roles": [
          { "id": 1, "name": "user", "description": "..." }
        ],
        "is_active": true
      }
    → Frontend:
      - Update Zustand: setUser(response)

  - 401 Unauthorized:
    → Token invalid/expired
    → Trigger auto-refresh (see section 3.4)

Step 3: Use user data
  - Display user info: email, avatar, name
  - Check roles: if admin, show admin menu
```

---

## 4. EXCEPTION HANDLING & ERROR MESSAGES

### 4.1 Backend API Exceptions → HTTP Status Code

Từ file `auth_service.py`, `token_service.py`, `router.py`:

#### **ValueError → 400 Bad Request**

```python
# auth_service.py:
- "Email đã tồn tại" (register duplicate)
- "Thông tin đăng nhập không hợp lệ" (login invalid creds)
- "Mật khẩu phải có ít nhất 8 ký tự" (short password)

# token_service.py:
- "Link không hợp lệ hoặc đã hết hạn" (verify email / reset password)
- "Người dùng không tồn tại" (token references non-existent user)
```

#### **PermissionError → 403 Forbidden**

```python
# auth_service.py:
- "Tài khoản chưa được kích hoạt" (not verified email yet)
```

#### **401 Unauthorized (HTTPException)**

```python
# router.py:
- "Thiếu refresh token" (refresh endpoint)
- "Refresh token không hợp lệ" (invalid/revoked)
- "Token không hợp lệ" (get_current_user)
- "Thiếu token" (no Bearer in header)
- "Token thiếu sub" (JWT payload malformed)
- "Người dùng không tồn tại/không hoạt động" (user not found/inactive)
```

#### **404 Not Found (HTTPException)**

```python
# router.py (RBAC endpoints):
- "Người dùng không tồn tại"
- "Vai trò không tồn tại"
- "Quyền hạn không tồn tại"
```

#### **500 Internal Server Error (HTTPException)**

```python
# router.py:
- "Lỗi khi gửi email" (email service failure)
- "Lỗi: {exception_message}" (generic error)
```

### 4.2 Frontend Error Display Strategy

#### **Display Rules**

```typescript
1. Field-level errors (React Hook Form):
   - Show under input field
   - Red text, small font
   - Example: "Email không hợp lệ"

2. Form-level errors (API response):
   - Show in error alert box (red background)
   - At top of form
   - Example: "Email đã tồn tại"

3. Connection errors (Network):
   - Show toast notification
   - Red background
   - Example: "Lỗi kết nối. Vui lòng kiểm tra mạng"

4. Loading state:
   - Show spinner
   - Disable inputs & button
   - Disable pointer events

5. Success state:
   - Show green toast
   - Auto-dismiss after 2-3 seconds
   - Example: "Đã gửi email. Vui lòng kiểm tra hộp thư"
```

#### **Error Message Mapping (Frontend)**

```typescript
const ERROR_MAP = {
  // 400 - Bad Request
  400: {
    "Email đã tồn tại": "Email này đã được đăng ký",
    "Thông tin đăng nhập không hợp lệ": "Email hoặc mật khẩu không chính xác",
    "Link không hợp lệ hoặc đã hết hạn":
      "Link xác minh hết hạn. Vui lòng gửi lại",
    "Mật khẩu phải có ít nhất 8 ký tự": "Mật khẩu quá ngắn (tối thiểu 8 ký tự)",
  },
  // 401 - Unauthorized
  401: {
    "Thiếu token": "Vui lòng đăng nhập",
    "Refresh token không hợp lệ": "Session hết hạn. Vui lòng đăng nhập lại",
    "Người dùng không tồn tại/không hoạt động":
      "Tài khoản không tồn tại hoặc đã bị vô hiệu hóa",
  },
  // 403 - Forbidden
  403: {
    "Tài khoản chưa được kích hoạt":
      "Vui lòng xác minh email để kích hoạt tài khoản",
  },
  // 500 - Server Error
  500: {
    "Lỗi khi gửi email": "Lỗi hệ thống. Vui lòng thử lại sau",
  },
};
```

---

## 5. RESPONSE SCHEMAS & DATA MODELS

### 5.1 Request Schemas (Zod Validation)

#### **LoginRequest**

```typescript
{
  email: string (EmailStr)
  password: string (min: 8, max: 128)
}
```

#### **RegisterRequest**

```typescript
{
  email: string (EmailStr)
  password: string (min: 8, max: 128)
  confirmPassword: string (must match password)
}
```

#### **VerifyEmailRequest**

```typescript
{
  token: string (min: 32)
}
```

#### **PasswordResetRequest**

```typescript
{
  email: string(EmailStr);
}
```

#### **ConfirmPasswordResetRequest**

```typescript
{
  token: string (min: 32)
  newPassword: string (min: 8, max: 128)
  confirmPassword: string (must match newPassword)
}
```

### 5.2 Response Schemas

#### **TokenResponse**

```typescript
{
  access_token: string;
  token_type: "bearer";
}
```

#### **UserResponse**

```typescript
{
  id: number;
  email: string;
  roles: Array<{
    id: number;
    name: string;
    description: string;
  }>;
  is_active: boolean;
}
```

#### **MessageResponse**

```typescript
{
  message: string
  email?: string (optional)
}
```

---

## 6. UI COMPONENTS ARCHITECTURE

### 6.1 Component Tree

```
(auth) [Layout]
  ├── login/
  │   └── page.tsx
  │       └── <LoginForm /> (from components/auth/)
  │
  ├── register/
  │   └── page.tsx
  │       └── <RegisterForm />
  │
  ├── verify-email/
  │   └── page.tsx
  │       ├── Show token status
  │       └── <ResendEmailButton />
  │
  ├── forgot-password/
  │   └── page.tsx
  │       └── <PasswordResetRequestForm />
  │
  └── reset-password/
      └── page.tsx
          └── <PasswordResetForm />

(dashboard) [Protected Layout]
  ├── Header (with logout)
  ├── Sidebar
  └── [Feature Pages]
```

### 6.2 Form Component Structure

**LoginForm.tsx**

```
┌─────────────────────────┐
│   "Đăng Nhập"           │
├─────────────────────────┤
│ Email Input             │
│ [x] invalid error       │
├─────────────────────────┤
│ Password Input          │
│ [x] error message       │
├─────────────────────────┤
│ [ ] Ghi nhớ             │
│ [Quên mật khẩu?]        │
├─────────────────────────┤
│ [⏳ Đang đăng nhập...]  │
├─────────────────────────┤
│ Chưa có tài khoản?      │
│ [Đăng ký ngay]          │
└─────────────────────────┘
```

**RegisterForm.tsx**

```
┌─────────────────────────┐
│   "Đăng Ký"             │
├─────────────────────────┤
│ Email Input             │
│ [x] error              │
├─────────────────────────┤
│ Password Input          │
│ ⚡ Strength indicator   │
├─────────────────────────┤
│ Confirm Password Input  │
│ [x] error              │
├─────────────────────────┤
│ ☐ Chấp nhận Điều khoản  │
├─────────────────────────┤
│ [⏳ Đang đăng ký...]   │
├─────────────────────────┤
│ Đã có tài khoản?        │
│ [Đăng nhập]             │
└─────────────────────────┘
```

---

## 7. STATE MANAGEMENT FLOW

### 7.1 Zustand authStore

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  setUser: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email, password) => Promise<void>;
  register: (email, password) => Promise<void>;
  verifyEmail: (token) => Promise<void>;
}
```

### 7.2 useAuth Hook

```typescript
const useAuth = () => {
  const { user, isAuthenticated, loading } = useAuthStore()

  return {
    user,
    isAuthenticated,
    loading,
    login: async (email, password) => { ... },
    register: async (email, password) => { ... },
    logout: () => { ... },
    verifyEmail: async (token) => { ... },
    requestPasswordReset: async (email) => { ... },
    resetPassword: async (token, password) => { ... },
  }
}
```

---

## 8. ENVIRONMENT VARIABLES

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_AUTH_TOKEN_KEY=auth_token
NEXT_PUBLIC_REFRESH_TOKEN_KEY=refresh_token
NEXT_PUBLIC_APP_NAME=Spa Customer Care Platform
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 9. DEPENDENCIES & LIBRARIES

### Required (Đã có)

- ✅ Next.js 15
- ✅ React 19
- ✅ TypeScript 5.9
- ✅ Axios 1.12
- ✅ React Hook Form 7.65
- ✅ Zod 4.1
- ✅ Zustand 5.0
- ✅ Tailwind CSS 4.1
- ✅ shadcn/ui (components)

### shadcn/ui Components Needed

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add alert
pnpm dlx shadcn@latest add spinner (or loading indicator)
pnpm dlx shadcn@latest add checkbox
pnpm dlx shadcn@latest add label
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add toast
```

---

## 10. PHẠM VI & GIỚI HẠN

### Trong Phạm Vi ✅

- Login/Register/Logout flow
- Email verification
- Password reset
- Token refresh auto
- Error handling & display
- Form validation
- Loading states
- Responsive design

### Ngoài Phạm Vi (Phase 2) ❌

- Social login (Google, Facebook)
- Two-factor authentication (2FA)
- OAuth2 integration
- Dark mode toggle
- Localization (i18n)
- Password strength meter (advanced)
- Account deletion

---

## 11. SECURITY CONSIDERATIONS

1. **Token Storage:**

   - Access token: localStorage (for XSS protection via CSP)
   - Refresh token: HTTP-only cookie (chống XSS, browser tự handle)

2. **Password Rules:**

   - Min 8 ký tự (backend enforce)
   - No special characters required (user-friendly)

3. **Rate Limiting:**

   - Backend implement rate limiting (future)
   - Frontend: show retry timer

4. **Email Enumeration:**

   - Password reset: always return success (chống leak email tồn tại)
   - Backend: add delay nếu email không tồn tại

5. **CSRF Protection:**

   - SameSite=Lax cookie (backend config)
   - CORS configured (backend)

6. **Logout:**
   - Revoke refresh token on server
   - Clear localStorage on client
   - Auto-redirect to login

---

## 12. SUCCESS CRITERIA

✅ **Technical Success**

- [ ] All endpoints integrated & working
- [ ] Error messages match backend responses
- [ ] Auto-refresh token works without user notice
- [ ] Forms validate before submit
- [ ] Loading/error states display correctly
- [ ] URLs include proper query parameters
- [ ] Redirects happen at right times

✅ **UX Success**

- [ ] Forms are clean & intuitive
- [ ] Error messages are helpful
- [ ] Page load time < 2 seconds
- [ ] No 404 errors on auth pages
- [ ] Logout works immediately
- [ ] Can handle slow network

---

_Generated: 19/10/2025 | Status: Technical Plan Ready for Implementation_
