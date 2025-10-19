# 📱 BRIEF SẢN PHẨM - NỀN TẢNG CHĂM SÓC KHÁCH HÀNG SPA

**Phiên bản:** 1.0.0  
**Ngày cập nhật:** 19/10/2025  
**Trạng thái:** Sẵn sàng phát triển ✅

---

## 1️⃣ TỔNG QUAN / MÔ TẢ DỰ ÁN

### 📌 Mục Tiêu

**Xây dựng nền tảng quản lý khách hàng SPA hiện đại**, giúp các cơ sở SPA:

- 📊 Quản lý khách hàng & lịch hẹn hiệu quả
- 💼 Tối ưu hóa quy trình kinh doanh
- 📈 Tăng trải nghiệm khách hàng
- 🔐 Quản lý dữ liệu an toàn, có cấp độ truy cập

### 🎯 Phạm Vi

- **Frontend:** Ứng dụng web SPA (Single Page Application) với Next.js 15
- **Backend:** API REST được xây dựng trên FastAPI/Python
- **Cơ sở dữ liệu:** PostgreSQL với quản lý phiên bản schema qua Alembic

### 💡 Giá Trị Cốt Lõi

Cung cấp giao diện **thiết kế đơn giản, thân thiện** cho các chủ SPA Việt Nam, từ quản lý đội ngũ, khách hàng, dịch vụ cho đến lịch hẹn - tất cả từ **một dashboard tổng hợp**.

---

## 2️⃣ ĐỐI TƯỢNG MỤC TIÊU

### 👥 Người Dùng Chính

#### **A. Quản Trị Viên (Admin)**

- Người quản lý hệ thống chính của SPA
- Quản lý toàn bộ nhân viên, dịch vụ, khách hàng
- Xem báo cáo tổng hợp & thống kê doanh thu
- Quyền hạn cao nhất trên hệ thống

#### **B. Quản Lý (Manager)**

- Quản lý hoạt động hàng ngày
- Xem lịch lịch hẹn & phân công nhân viên
- Quản lý thông tin khách hàng
- Tạo & cập nhật dịch vụ

#### **C. Tiếp Tân (Receptionist)**

- Đón tiếp & ghi nhận thông tin khách hàng
- Đặt lịch hẹn cho khách
- Xem tình trạng dịch vụ & nhân viên
- Cập nhật ghi chú khách hàng

#### **D. Nhân Viên Chuyên Môn (Specialist)**

- Xem lịch làm việc của mình
- Cập nhật trạng thái dịch vụ
- Xem thông tin khách hàng chi tiết
- Quản lý chuyên môn & tài nguyên

#### **E. Khách Hàng (Tương lai)**

- Đặt & quản lý lịch hẹn
- Xem lịch sử dịch vụ
- Chọn nhân viên & dịch vụ yêu thích

---

## 3️⃣ LỢI ÍCH & TÍNH NĂNG CHÍNH

### ✨ Tính Năng Cốt Lõi

#### **🔐 Quản Lý Xác Thực & Phân Quyền**

- ✅ Đăng nhập/Đăng ký với email & mật khẩu
- ✅ JWT Token & Auto-Refresh Token
- ✅ 5 vai trò người dùng (Admin, Manager, Receptionist, Specialist, Customer)
- ✅ Kiểm soát truy cập dựa trên vai trò (RBAC)
- ✅ Quên mật khẩu & Đặt lại mật khẩu

#### **👥 Quản Lý Khách Hàng**

- ✅ Danh sách & Tìm kiếm khách hàng
- ✅ Thêm/Sửa/Xóa thông tin khách hàng
- ✅ Lưu loại da & ghi chú sức khỏe
- ✅ Gán thẻ & phân loại khách hàng
- ✅ Xem lịch sử dịch vụ & hẹn của khách

#### **📅 Quản Lý Lịch Hẹn**

- ✅ Xem lịch hẹn theo ngày/tuần/tháng
- ✅ Tạo/Chỉnh sửa/Hủy lịch hẹn
- ✅ Xác nhận hoặc hủy bỏ lịch hẹn
- ✅ Ghi chú & lịch sử lịch hẹn
- ✅ Kiểm tra xung đột thời gian

#### **💇 Quản Lý Dịch Vụ**

- ✅ Danh sách đầy đủ dịch vụ SPA
- ✅ Giá cả & Thời lượng dịch vụ
- ✅ Mô tả chi tiết & Hình ảnh dịch vụ
- ✅ Kích hoạt/Vô hiệu hóa dịch vụ
- ✅ Phân loại dịch vụ

#### **👔 Quản Lý Nhân Viên**

- ✅ Danh sách nhân viên & vai trò
- ✅ Chuyên môn & Chứng chỉ
- ✅ Trạng thái làm việc
- ✅ Liên hệ & Thông tin liên lạc
- ✅ Kích hoạt/Vô hiệu hóa nhân viên

#### **📊 Bảng Điều Khiển (Dashboard)**

- ✅ Thống kê tổng doanh thu
- ✅ Số lượng khách hàng mới
- ✅ Tổng lịch hẹn & Lịch hẹn chưa xử lý
- ✅ Widget widget theo vai trò
- ✅ Nhanh nhạy & Đáp ứng

### 🎨 Tính Năng Giao Diện

#### **Thiết Kế Thân Thiện Người Việt**

- ✅ Giao diện tiếng Việt 100%
- ✅ Định dạng tiền tệ VND
- ✅ Định dạng ngày tháng DD/MM/YYYY
- ✅ Số điện thoại Việt (09x, 08x, 07x, 05x)
- ✅ Icon trực quan & Hướng dẫn chi tiết

#### **Trải Nghiệm Người Dùng**

- ✅ Giao diện sạch, tối giản
- ✅ Điều hướng dễ dàng
- ✅ Tìm kiếm & Lọc nhanh chóng
- ✅ Modal & Thông báo hữu ích
- ✅ Phản hồi trực tiếp cho mỗi hành động
- ✅ Responsive trên máy tính & tablet

#### **Tối ưu Hiệu Năng**

- ✅ Tải trang nhanh (Next.js 15)
- ✅ Lazy Loading hình ảnh
- ✅ Cache thông minh
- ✅ Không đơn đặt hàng không cần thiết

### 🔧 Tính Năng Kỹ Thuật

#### **Quản Lý Trạng Thái & Dữ Liệu**

- ✅ State Management với Zustand
- ✅ Validation Form với React Hook Form + Zod
- ✅ HTTP Client với Axios & Interceptor
- ✅ Auto-retry khi lỗi mạng
- ✅ Token Refresh tự động

#### **An Toàn & Bảo Mật**

- ✅ HTTPS trên production
- ✅ JWT Token bảo mật
- ✅ CORS được cấu hình
- ✅ Input Validation
- ✅ Xử lý lỗi an toàn

#### **Hỗ Trợ & Khả Năng Mở Rộng**

- ✅ TypeScript strict mode
- ✅ ESLint cho code quality
- ✅ Component reusable
- ✅ Architecture scalable
- ✅ Environment config linh hoạt

---

## 4️⃣ CÔNG NGHỆ & KIẾN TRÚC CẤP CAO

### 🏗️ Stack Công Nghệ Frontend

#### **Core Framework**

| Công Nghệ      | Phiên Bản | Mục Đích                             |
| -------------- | --------- | ------------------------------------ |
| **Next.js**    | 15.5.6    | Framework React với App Router & SSR |
| **React**      | 19.1.0    | Thư viện UI chính                    |
| **TypeScript** | 5.9.3     | Type safety & Code quality           |
| **Node.js**    | 18+ LTS   | Runtime JavaScript                   |

#### **UI & Styling**

| Công Nghệ        | Phiên Bản | Mục Đích                                     |
| ---------------- | --------- | -------------------------------------------- |
| **Tailwind CSS** | 4.1.14    | Utility-first CSS framework                  |
| **shadcn/ui**    | Latest    | Component library dựa Headless UI + Radix UI |
| **Lucide Icons** | 0.546.0   | Icon library (1000+ icons)                   |
| **clsx**         | 2.1.1     | Conditional className                        |
| **CVA**          | 0.7.1     | Component Variants Authority                 |

#### **State Management & Form**

| Công Nghệ               | Phiên Bản | Mục Đích                                   |
| ----------------------- | --------- | ------------------------------------------ |
| **Zustand**             | 5.0.8     | Global state management (Auth, User, etc.) |
| **React Hook Form**     | 7.65.0    | Form state & submission                    |
| **Zod**                 | 4.1.12    | Runtime validation & TypeScript schemas    |
| **@hookform/resolvers** | 5.2.2     | Integration Hook Form + Zod                |

#### **API & Communication**

| Công Nghệ | Phiên Bản | Mục Đích                      |
| --------- | --------- | ----------------------------- |
| **Axios** | 1.12.2    | HTTP client với interceptors  |
| **N/A**   | -         | WebSocket (future: socket.io) |

#### **Development Tools**

| Công Nghệ     | Phiên Bản | Mục Đích                      |
| ------------- | --------- | ----------------------------- |
| **ESLint**    | 9         | Code linting & best practices |
| **Turbopack** | Built-in  | Fast bundler                  |
| **pnpm**      | 8/9       | Package manager               |

### 📁 Kiến Trúc Folder

```
front-end/
├── src/
│   ├── app/                        # Next.js 15 App Router
│   │   ├── (auth)/                 # Auth pages group
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── (dashboard)/            # Dashboard pages group
│   │   │   ├── customers/
│   │   │   ├── appointments/
│   │   │   ├── services/
│   │   │   ├── staff/
│   │   │   └── settings/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   └── globals.css             # Global styles
│   │
│   ├── components/                 # React Components
│   │   ├── auth/                   # Auth components (Login, Register)
│   │   ├── customers/              # Customer management UI
│   │   ├── appointments/           # Appointment management UI
│   │   ├── services/               # Service management UI
│   │   ├── dashboard/              # Dashboard components
│   │   ├── common/                 # Shared components (Header, Sidebar)
│   │   └── ui/                     # shadcn/ui components
│   │
│   ├── lib/                        # Utilities & Libraries
│   │   ├── api/
│   │   │   ├── client.ts           # Axios instance + interceptors
│   │   │   └── services/           # API service layer (to create)
│   │   ├── auth/
│   │   │   └── storage.ts          # Token storage utils
│   │   ├── hooks/
│   │   │   └── useAuth.ts          # Custom auth hook
│   │   └── utils/
│   │       ├── format.ts           # Format date, currency, phone (VN)
│   │       ├── validation.ts       # Zod schemas
│   │       └── ...
│   │
│   ├── store/                      # Zustand State Management
│   │   ├── authStore.ts            # Auth state (user, token, login, logout)
│   │   ├── userStore.ts            # User profile (future)
│   │   └── ...
│   │
│   ├── config/                     # Configuration
│   │   └── constants.ts            # Routes, endpoints, enums, messages
│   │
│   ├── types/                      # TypeScript Types
│   │   └── index.ts                # All interfaces & types
│   │
│   └── middleware.ts               # Next.js middleware (future)
│
├── public/
│   ├── images/                     # Static images
│   └── icons/                      # Brand icons
│
├── docs/
│   ├── PRODUCT_BRIEF.md            # 📄 Tài liệu này
│   ├── INDEX.md                    # Documentation index
│   └── features/                   # Feature documentation
│
├── .env.local                      # Environment variables
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript config
├── tailwind.config.ts              # Tailwind CSS config
├── postcss.config.mjs              # PostCSS config
├── eslint.config.mjs               # ESLint config
├── components.json                 # shadcn/ui config
├── package.json
├── pnpm-lock.yaml
└── README.md
```

### 🔄 Luồng Dữ Liệu

```
User Interface (Component)
    ↓
React Hooks + Zustand Store
    ↓
Axios Client + Interceptors
    ↓
Backend API (FastAPI)
    ↓
PostgreSQL Database
```

### 🎯 Architecture Patterns

#### **1. Component-Based Architecture**

- Components tái sử dụng được
- Props-based configuration
- Separation of concerns

#### **2. Feature-Based Structure**

- Folder theo tính năng (auth, customers, etc.)
- Dễ bảo trì & mở rộng
- Dependency isolation

#### **3. Layered Architecture**

```
Presentation Layer (Components)
        ↓
Business Logic Layer (Hooks, Services)
        ↓
Data Access Layer (API Client, Store)
        ↓
Backend Layer
```

#### **4. State Management Strategy**

- **Global State:** Authentication (Zustand)
- **Local State:** Form state, UI state (React hooks)
- **Server State:** Data caching (future: React Query)

### 🔐 Luồng Xác Thực

```
1. User submits login credentials
2. POST /auth/login → Get access_token + refresh_token
3. Store tokens in localStorage (via authStore)
4. Set user info in Zustand store
5. Redirect to dashboard
6. On token expiry: Auto-refresh using refresh_token
7. If refresh fails: Clear tokens & redirect to login
```

### 📡 Integration Points

#### **Backend API**

- Base URL: `http://localhost:8000` (configurable)
- Auth endpoints: Login, Register, Refresh
- Customer endpoints: CRUD operations
- Service endpoints: List, Create, Update
- Appointment endpoints: Booking, Scheduling
- Staff endpoints: Management, Assignment

#### **Configuration**

- API Base URL → `.env.local` (NEXT_PUBLIC_API_URL)
- Token keys → `.env.local` (NEXT_PUBLIC_AUTH_TOKEN_KEY)
- App name → `.env.local` (NEXT_PUBLIC_APP_NAME)
- Feature flags → `.env.local` (NEXT*PUBLIC_ENABLE*\*)

---

## 🚀 Roadmap Phát Triển

### Phase 1: Foundation ✅

- [x] Project setup (Next.js 15, TypeScript)
- [x] Tailwind CSS & shadcn/ui
- [x] Zustand store & Auth flow
- [x] Axios client & interceptors
- [x] Type definitions
- [x] Constants & Configuration

### Phase 2: Authentication & UI (Hiện tại)

- [ ] Auth pages (Login, Register, Reset Password)
- [ ] Dashboard layout & Navigation
- [ ] shadcn/ui components integration
- [ ] Form validation & Error handling
- [ ] Loading & Error states

### Phase 3: Core Features

- [ ] Customer management
- [ ] Service management
- [ ] Appointment scheduling
- [ ] Staff management
- [ ] Dashboard statistics

### Phase 4: Enhancement

- [ ] Image upload & media management
- [ ] Search & Advanced filters
- [ ] Export & Reports
- [ ] Notifications & Alerts
- [ ] Dark mode support

### Phase 5: Production Ready

- [ ] Testing (Jest + React Testing Library)
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Deployment automation
- [ ] Monitoring & Analytics

---

## 📋 Development Guidelines

### ✅ Code Standards

- **Language:** TypeScript strict mode
- **Component naming:** PascalCase (Button, CustomerCard)
- **File naming:** camelCase (authStore.ts, useAuth.ts)
- **Folder naming:** kebab-case (auth-module, customer-list)
- **Imports:** Use path alias `@/` (e.g., `@/components/Button`)

### ✅ UI Components

- **Source:** Only from shadcn/ui via `pnpm dlx shadcn@latest add <component>`
- **Installation:** `cd front-end && pnpm dlx shadcn@latest add button`
- **Example components:** Button, Input, Card, Dialog, Form, Table, etc.
- **Custom styling:** Extend via Tailwind CSS utility classes

### ✅ Code Organization

- Components: Feature-based organization
- Utilities: Centralized in `/lib/utils/`
- Types: Centralized in `/src/types/index.ts`
- Constants: Centralized in `/src/config/constants.ts`
- Stores: One store per domain in `/src/store/`

### ✅ Best Practices

- Use React Hook Form for form management
- Validate with Zod schemas at runtime
- Intercept API calls with Axios interceptors
- Store auth state in Zustand
- Keep components small & focused
- Reuse components from shadcn/ui
- Add error boundaries for graceful error handling

---

## 🎯 KPIs & Success Metrics

### Technical

- Page load time: < 2 seconds
- API response time: < 500ms
- Code coverage: > 80%
- Lighthouse score: > 85

### User Experience

- Task completion rate: > 95%
- User satisfaction: > 4.5/5
- Zero critical bugs on production

---

## 📞 Support & Contacts

- **Documentation:** `/front-end/docs/`
- **API Integration:** See `docs/INDEX.md`
- **Component Library:** shadcn/ui (https://ui.shadcn.com)
- **Installation:** `pnpm dlx shadcn@latest add <component>`

---

**🎉 Nền tảng SPA Customer Care Platform Frontend đã sẵn sàng cho phát triển!**

_Cập nhật lần cuối: 19/10/2025_
