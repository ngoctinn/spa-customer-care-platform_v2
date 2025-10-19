# 📚 Tài Liệu Dự Án Frontend - Index

**Danh mục tài liệu cho dự án Spa Customer Care Platform Frontend.**

---

## 🎯 **ĐỌC TRƯỚC TIÊN**

### 📖 [PRODUCT_BRIEF.md](./PRODUCT_BRIEF.md) ⭐

**File tài liệu chính - Tổng quan & Kế hoạch dự án frontend.**

Bao gồm:

- ✅ Tổng quan dự án
- ✅ Đối tượng mục tiêu & Phân quyền (4 roles)
- ✅ Tính năng chính theo role
- ✅ Tech stack & Architecture
- ✅ Folder structure
- ✅ Development roadmap
- ✅ Getting started

---

## 📖 Tài Liệu Khác

| File                                                             | Mục Đích                                   |
| ---------------------------------------------------------------- | ------------------------------------------ |
| **[PRODUCT_BRIEF.md](./PRODUCT_BRIEF.md)**                       | Mô tả sản phẩm & business requirements     |
| **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** _(coming soon)_           | Hướng dẫn khởi động & cài đặt dependencies |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** _(coming soon)_         | Chi tiết kiến trúc & design patterns       |
| **[API_INTEGRATION.md](./API_INTEGRATION.md)** _(coming soon)_   | Hướng dẫn tích hợp API Backend             |
| **[COMPONENT_GUIDE.md](./COMPONENT_GUIDE.md)** _(coming soon)_   | Danh sách & hướng dùng components          |
| **[STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md)** _(coming soon)_ | Hướng dẫn Zustand & state management       |

---

## 🚀 Quick Start

### 1. Cài đặt Dependencies

```bash
cd front-end
pnpm install
```

### 2. Cấu hình Environment

```bash
# Sao chép .env.local (đã tạo sẵn)
# Mở file và cập nhật API_URL nếu cần
```

### 3. Khởi động Dev Server

```bash
pnpm dev
# Truy cập: http://localhost:3000
```

### 4. Build Production

```bash
pnpm build
pnpm start
```

---

## 📂 Cấu Trúc Thư Mục

```
front-end/
├── src/
│   ├── app/              # Next.js 14 App Router
│   ├── components/       # React components
│   ├── lib/              # Utilities & libraries
│   │   ├── api/         # Axios client & services
│   │   ├── auth/        # Auth helpers
│   │   ├── hooks/       # Custom hooks
│   │   ├── utils/       # Utilities (format, validation)
│   │   └── types/       # TypeScript types
│   ├── store/            # Zustand stores
│   ├── config/           # Configuration & constants
│   └── styles/           # Tailwind & CSS
├── public/               # Static assets
├── docs/                 # Documentation (thư mục này)
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── .env.local
```

---

## 🔧 Tech Stack

| Tầng                 | Công nghệ             |
| -------------------- | --------------------- |
| **Framework**        | Next.js 15.5.6        |
| **Language**         | TypeScript 5.9.3      |
| **UI Library**       | React 19.1.0          |
| **Styling**          | Tailwind CSS 4.1.14   |
| **UI Components**    | shadcn/ui             |
| **State Management** | Zustand 5.0.8         |
| **HTTP Client**      | Axios 1.12.2          |
| **Form Handling**    | React Hook Form + Zod |
| **Icons**            | Lucide React          |
| **Build Tool**       | Turbopack             |
| **Code Quality**     | ESLint 9              |

---

## 📚 Key Files & Folders

### `src/config/constants.ts`

- API endpoints
- Routes
- User roles & enums
- Error/Success messages
- Feature flags

### `src/types/index.ts`

- TypeScript interfaces
- User, Customer, Service, Appointment types
- API response types

### `src/lib/api/client.ts`

- Axios instance
- Request/Response interceptors
- Token management

### `src/lib/auth/storage.ts`

- Token storage utilities
- Session management

### `src/lib/utils/`

- `format.ts` - Date, currency, phone formatting
- `validation.ts` - Zod schemas & validation functions

### `src/store/authStore.ts`

- Zustand auth store
- User state management

### `src/lib/hooks/useAuth.ts`

- Custom authentication hook
- Login, Register, Logout logic

---

## 🎨 UI Components (shadcn/ui)

Các components shadcn/ui đã được setup. Để thêm components:

```bash
pnpm dlx shadcn@latest add [component-name]
```

Ví dụ:

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add modal
pnpm dlx shadcn@latest add table
```

---

## 🔄 Development Workflow

### 1. Branch Naming

```bash
git checkout -b feature/feature-name
git checkout -b bugfix/bug-name
```

### 2. Commit Convention

```bash
git commit -m "feat: add new feature"
git commit -m "fix: fix bug"
git commit -m "docs: update documentation"
git commit -m "style: format code"
```

### 3. Push & PR

```bash
git push origin feature/feature-name
# Tạo Pull Request trên GitHub
```

---

## 📝 Useful Commands

```bash
# Development
pnpm dev           # Start dev server

# Building
pnpm build         # Production build
pnpm start         # Start production server

# Code Quality
pnpm lint          # Run ESLint
pnpm lint:fix      # Fix ESLint issues

# Install shadcn components
pnpm dlx shadcn@latest add [component-name]

# Install new packages
pnpm add [package-name]
pnpm add -D [package-name]  # Dev dependency
```

---

## 🔗 Quick Links

- **API Documentation:** [Backend Docs](../back-end/docs/INDEX.md)
- **Project Root:** [Project README](../README.md)
- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **shadcn/ui:** https://ui.shadcn.com
- **Zustand:** https://github.com/pmndrs/zustand

---

## 👨‍💻 Development Tips

### VSCode Extensions Recommended

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Prettier - Code formatter
- ESLint

### Useful VSCode Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 🤝 Contributing

1. Tạo branch mới từ `main`
2. Implement feature theo kiến trúc đã định
3. Follow TypeScript strict mode
4. Test trên local
5. Commit với descriptive message
6. Push & tạo PR

---

## 📞 Support

Nếu gặp vấn đề:

1. Kiểm tra `.env.local` có cấu hình đúng không
2. Xóa `node_modules` & `pnpm-lock.yaml`, chạy `pnpm install` lại
3. Kiểm tra Backend API có chạy tại `http://localhost:8000` không

---

**Last Updated:** October 19, 2025  
**Version:** 1.0.0 (MVP)  
**Status:** 🔄 In Development
