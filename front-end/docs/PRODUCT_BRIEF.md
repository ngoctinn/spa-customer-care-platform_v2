# SPA CUSTOMER CARE PLATFORM - FRONTEND PRODUCT BRIEF

## 1. Tổng quan / Mô tả Dự án

**Spa Customer Care Platform Frontend** là ứng dụng web hiện đại xây dựng bằng **Next.js 14**, **TypeScript**, **Tailwind CSS** và **shadcn/ui**. Đây là giao diện người dùng cho hệ thống quản lý chăm sóc khách hàng spa (CRM), hỗ trợ **4 nhóm người dùng chính** với các tính năng và quyền hạn riêng biệt.

Ứng dụng cung cấp trải nghiệm người dùng mượt mà (smooth UX), responsive design cho mobile/tablet/desktop, và tích hợp hoàn toàn với Backend API FastAPI.

---

## 2. Đối tượng Mục tiêu & Phân Quyền

### 👥 4 Nhóm Người Dùng Chính

| Nhóm | Mô tả | Tính năng Chính |
|------|-------|-----------------|
| **Quản lý / Chủ spa** | Chủ sở hữu hoặc quản lý cao cấp spa | Dashboard tổng quan, quản lý nhân viên, dịch vụ, báo cáo doanh thu, phân tích KPI |
| **Lễ tân spa** | Nhân viên tiếp đón khách | Quản lý lịch hẹn, đăng ký khách mới, xử lý booking, hỗ trợ khách hàng |
| **Chuyên viên spa** | Nhân viên thực hiện dịch vụ | Xem lịch làm việc cá nhân, cập nhật trạng thái dịch vụ, ghi chú cho khách hàng |
| **Khách hàng** | Người sử dụng dịch vụ spa | Đăng ký/Đăng nhập, đặt lịch hẹn, xem lịch sử, quản lý hồ sơ, đánh giá dịch vụ |

---

## 3. Tính năng Chính theo Role

### 🔐 **Authentication & Authorization**

- ✅ Đăng ký tài khoản với xác minh email (OTP token)
- ✅ Đăng nhập với JWT + Refresh token (auto-renew)
- ✅ Đăng xuất an toàn
- ✅ Quên mật khẩu & Đặt lại mật khẩu
- ✅ Phân quyền theo role (RBAC)
- ✅ Protected routes & permission checks
- ✅ Persistent login (remember me)

### 📊 **Dashboard & Home**

#### Quản lý / Chủ spa
- Tổng quan kinh doanh (tổng doanh thu, khách hàng mới, lịch hẹn hôm nay)
- Biểu đồ thống kê (doanh thu theo tháng, dịch vụ phổ biến, khách hàng mất đi)
- Danh sách lịch hẹn sắp tới
- Quản lý nhân viên (trạng thái, ca làm việc)

#### Lễ tân spa
- Lịch hẹn hôm nay & tuần tới
- Danh sách khách hàng (search, filter)
- Nút nhanh: Tạo lịch hẹn, Đăng ký khách mới
- Thông báo booking mới/hủy

#### Chuyên viên spa
- Lịch làm việc hôm nay
- Danh sách khách hàng hôm nay
- Ghi chú & lịch sử khách hàng

#### Khách hàng
- Banner quảng cáo/khuyến mãi
- Nút nhanh: Đặt lịch hẹn, Xem lịch sử
- Thông báo nhắc lịch hẹn

### 👥 **Quản lý Khách hàng (CRM)**

- Danh sách khách hàng với search/filter/sort
- Chi tiết hồ sơ khách hàng (thông tin cá nhân, tình trạng da, tiền sử bệnh)
- Lịch sử điều trị chi tiết (dịch vụ, ngày tháng, ghi chú)
- Thêm/Sửa/Xóa khách hàng (permission)
- Import khách hàng từ CSV
- Gắn tag/phân loại khách hàng
- Tính năng email reminder tự động

### 📅 **Quản lý Lịch hẹn**

- **Lịch hẹn Online:**
  - Giao diện calendar trực quan
  - Chọn dịch vụ → Chọn ngày/giờ → Chọn nhân viên
  - Xác nhận & thanh toán (nếu cần)
  - Auto notification gửi email

- **Quản lý Lịch hẹn (Nội bộ):**
  - Calendar view (Ngày/Tuần/Tháng)
  - Kéo thả để thay đổi giờ
  - Status: Pending/Confirmed/Completed/Cancelled
  - Ghi chú & tệp đính kèm

### 🛍️ **Quản lý Dịch vụ & Sản phẩm**

- Danh mục dịch vụ spa (Massage, Skincare, Nails, etc.)
- Chi tiết dịch vụ (mô tả, giá, thời lượng, hình ảnh)
- Quản lý sản phẩm bán ra
- Pricing & duration setup
- Status: Active/Inactive

### 👨‍💼 **Quản lý Nhân viên**

- Danh sách nhân viên
- Chi tiết profile (thông tin cá nhân, kỹ năng, chứng chỉ)
- Phân quyền & role management
- Lịch làm việc & ca trực
- Phân công dịch vụ
- Hiệu suất & đánh giá

### 💳 **Thanh toán & Hoá đơn** *(Phase 2)*

- Tích hợp payment gateway (Stripe, VNPay)
- Xem hoá đơn
- Lịch sử thanh toán

### 📱 **Mobile Responsive**

- Responsive design cho tất cả screen size
- Mobile-first approach
- Touch-friendly buttons & interactions

---

## 4. Công nghệ / Kiến trúc

### 🛠️ **Tech Stack**

| Tầng | Công nghệ | Phiên bản |
|-----|-----------|----------|
| **Framework** | Next.js App Router | 15.5.6 |
| **Language** | TypeScript | 5.9.3 |
| **UI Library** | React | 19.1.0 |
| **Styling** | Tailwind CSS | 4.1.14 |
| **UI Components** | shadcn/ui | Latest |
| **State Management** | Zustand | 4.5.0+ |
| **HTTP Client** | Axios | 1.7.2+ |
| **Authentication** | JWT + NextAuth.js | 4.24.13+ |
| **Icons** | Lucide React | 0.408.0+ |
| **Form Handling** | React Hook Form + Zod | Latest |
| **Date Picker** | Radix UI / Headless | Latest |
| **Build Tool** | Turbopack | Built-in |
| **Code Quality** | ESLint 9 | 9.0+ |
| **Dev Server** | Next.js Dev Server | 15.5.6 |

### 📂 **Kiến Trúc & Cấu Trúc Thư Mục**

```
front-end/
├── src/
│   ├── app/                    # App Router (Next.js 14+)
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── (auth)/             # Auth pages group
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── (dashboard)/        # Dashboard pages group (protected)
│   │   │   ├── layout.tsx      # Dashboard layout
│   │   │   ├── page.tsx        # Dashboard home
│   │   │   ├── customers/      # Customer management
│   │   │   ├── appointments/   # Appointment management
│   │   │   ├── services/       # Service management
│   │   │   ├── staff/          # Staff management
│   │   │   └── settings/       # User settings
│   │   ├── api/                # API routes (if needed)
│   │   └── globals.css         # Global styles
│   │
│   ├── components/             # Reusable React components
│   │   ├── common/             # Shared components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ...
│   │   ├── auth/               # Auth components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ...
│   │   ├── dashboard/          # Dashboard components
│   │   ├── customers/          # Customer components
│   │   ├── appointments/       # Appointment components
│   │   ├── services/           # Service components
│   │   └── ui/                 # shadcn/ui components (button, input, etc.)
│   │
│   ├── lib/                    # Utilities & helpers
│   │   ├── api/                # API client setup (Axios)
│   │   │   ├── client.ts       # Axios instance
│   │   │   ├── interceptors.ts # Request/response interceptors
│   │   │   └── services/       # API service functions
│   │   ├── auth/               # Authentication helpers
│   │   │   ├── jwt.ts
│   │   │   ├── storage.ts
│   │   │   └── ...
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useCustomers.ts
│   │   │   └── ...
│   │   ├── utils/              # Utility functions
│   │   │   ├── format.ts
│   │   │   ├── validation.ts
│   │   │   └── ...
│   │   └── types/              # TypeScript type definitions
│   │       ├── index.ts        # Common types
│   │       ├── auth.ts
│   │       ├── customer.ts
│   │       └── ...
│   │
│   ├── store/                  # Zustand stores (state management)
│   │   ├── authStore.ts        # Auth state
│   │   ├── customerStore.ts    # Customer state
│   │   ├── appointmentStore.ts
│   │   └── ...
│   │
│   ├── styles/                 # Tailwind config & custom styles
│   │   └── globals.css
│   │
│   └── config/                 # App configuration
│       ├── constants.ts        # Constants & enums
│       └── environment.ts      # Environment variables
│
├── public/                     # Static assets
│   ├── images/
│   ├── icons/
│   └── ...
│
├── docs/                       # Documentation
│   ├── PRODUCT_BRIEF.md        # This file
│   ├── INDEX.md
│   ├── FRONTEND_SETUP.md
│   ├── ARCHITECTURE.md
│   ├── API_INTEGRATION.md
│   └── COMPONENT_GUIDE.md
│
├── .env.local                  # Environment variables (local)
├── .env.example               # Environment template
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
├── eslint.config.mjs          # ESLint configuration
├── package.json               # Dependencies
├── pnpm-lock.yaml             # Lock file
└── README.md                  # Project README
```

### 🏗️ **Kiến Trúc Tầng**

```
┌─────────────────────────────────────────────┐
│           Next.js 14 App Router             │
│  (pages, layouts, api routes, middleware)   │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────┴──────────────────────────┐
│         React Components (shadcn/ui)        │
│  (Headers, Forms, Modals, Tables, etc.)     │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────┴──────────────────────────┐
│  Zustand Stores (State Management)          │
│  (authStore, customerStore, etc.)           │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────┴──────────────────────────┐
│  API Service Layer (Axios + Interceptors)   │
│  (HTTP calls, error handling, auth token)   │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────┴──────────────────────────┐
│    FastAPI Backend (API Endpoints)          │
│    http://localhost:8000                    │
└─────────────────────────────────────────────┘
```

---

## 5. Non-Functional Requirements (NFR)

### Performance
- Page load time < 2 seconds
- First Contentful Paint (FCP) < 1.5s
- Lazy loading for images & components
- API caching strategy (SWR, React Query)

### Security
- ✅ HTTPS in production
- ✅ JWT token management (secure storage)
- ✅ CSRF protection via SameSite cookies
- ✅ XSS prevention via React's built-in escaping
- ✅ CORS configuration
- ✅ Input validation & sanitization

### Accessibility (a11y)
- ✅ WCAG 2.1 Level AA compliance
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast ratios
- ✅ ARIA labels & roles

### Browser Support
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 (deprecated)

### Mobile Responsiveness
- ✅ Mobile-first design
- ✅ Responsive breakpoints: 320px, 640px, 768px, 1024px, 1280px
- ✅ Touch-friendly interactions

---

## 6. Phát Triển & Roadmap

### Phase 1 (MVP) - Hiện tại
- ✅ Project initialization
- 🔄 Authentication system (login/register/logout)
- 🔄 Dashboard & Role-based views
- 🔄 Customer management
- 🔄 Appointment booking & management
- 🔄 Service catalog

### Phase 2 (Enhancement)
- Thanh toán trực tuyến (Payment gateway)
- SMS/Email notifications
- Advanced reporting & analytics
- Staff performance tracking
- Customer reviews & ratings

### Phase 3 (Optimization)
- PWA support (offline mode)
- Real-time notifications (WebSocket)
- Analytics dashboard
- AI-powered recommendations
- Multi-language support

---

## 7. Environment Variables (.env.local)

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=30000

# Authentication
NEXT_PUBLIC_AUTH_TOKEN_KEY=auth_token
NEXT_PUBLIC_REFRESH_TOKEN_KEY=refresh_token

# App Configuration
NEXT_PUBLIC_APP_NAME=Spa Customer Care Platform
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

---

## 8. Getting Started

### Prerequisites
- Node.js 18+ hoặc 20+
- pnpm 9.0+

### Installation
```bash
cd front-end
pnpm install
pnpm dev
```

Ứng dụng sẽ chạy tại: **http://localhost:3000**

---

## 9. Development Guidelines

### Code Style
- TypeScript strict mode
- ESLint & Prettier configuration
- Component naming: PascalCase
- Files: camelCase (except components)
- Folder structure: kebab-case

### Git Workflow
```bash
git checkout -b feature/feature-name
git commit -m "feat: add feature description"
git push origin feature/feature-name
```

### Testing (Phase 2)
- Jest + React Testing Library
- Unit tests for utilities
- Component tests for UI
- E2E tests with Cypress/Playwright

---

## 10. Deployment

### Development
```bash
pnpm dev           # http://localhost:3000
```

### Production Build
```bash
pnpm build
pnpm start
```

### Deployment Platforms
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Self-hosted (VPS/Docker)

---

## 📚 Tham Khảo

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Axios Documentation](https://axios-http.com)

---

**Last Updated:** October 19, 2025  
**Version:** 1.0.0 (MVP)  
**Status:** 🔄 In Development
