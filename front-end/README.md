# Spa Customer Care Platform - Frontend

Modern web application built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** for managing spa customer care, appointments, and services.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-blue?logo=tailwind-css)
![License](https://img.shields.io/badge/License-Proprietary-red)

## 🎯 Features

### ✨ Core Features

- **Authentication & Authorization** - JWT-based auth with role-based access control (RBAC)
- **Dashboard** - Role-specific dashboards for 4 user types
- **Customer Management** - Full CRM for spa customers
- **Appointment Booking** - Online calendar-based appointment system
- **Service Management** - Service catalog with pricing & duration
- **Staff Management** - Employee management with scheduling
- **Responsive Design** - Mobile-first, works on all devices

### 🔐 Security

- JWT token-based authentication
- Automatic token refresh with interceptors
- Secure token storage (localStorage)
- Input validation & sanitization
- CSRF protection via SameSite cookies

### 📱 Responsive

- Mobile-first design approach
- Responsive breakpoints: 320px, 640px, 768px, 1024px, 1280px
- Touch-friendly UI components
- PWA-ready (Phase 2)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or 20+
- **pnpm** 9.0+
- **Backend API** running at `http://localhost:8000`

### Installation

1. **Clone & Navigate**

```bash
cd front-end
```

2. **Install Dependencies**

```bash
pnpm install
```

3. **Environment Setup**

```bash
# .env.local is already created with defaults
# Update NEXT_PUBLIC_API_URL if backend is on different address
```

4. **Start Development Server**

```bash
pnpm dev
```

Server runs at: **http://localhost:3000**

5. **Access Application**

- Open http://localhost:3000 in your browser
- Login with test credentials or register a new account

---

## 📦 Tech Stack

### Core Technologies

| Tech         | Version | Purpose                         |
| ------------ | ------- | ------------------------------- |
| Next.js      | 15.5.6  | React framework with App Router |
| React        | 19.1.0  | UI library                      |
| TypeScript   | 5.9.3   | Type safety                     |
| Tailwind CSS | 4.1.14  | Styling framework               |
| shadcn/ui    | Latest  | Pre-built UI components         |

### State & API

| Tech            | Version | Purpose          |
| --------------- | ------- | ---------------- |
| Zustand         | 5.0.8   | State management |
| Axios           | 1.12.2  | HTTP client      |
| React Hook Form | 7.65.0  | Form handling    |
| Zod             | 4.1.12  | Form validation  |

### Development Tools

| Tool       | Version  | Purpose       |
| ---------- | -------- | ------------- |
| ESLint     | 9        | Code linting  |
| Turbopack  | Built-in | Build tool    |
| TypeScript | 5.9.3    | Type checking |

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── (auth)/                  # Auth pages group
│   ├── (dashboard)/             # Protected dashboard routes
│   ├── globals.css
│   └── favicon.ico
│
├── components/                   # React components
│   ├── common/                  # Shared components
│   ├── auth/                    # Auth-related components
│   ├── dashboard/               # Dashboard components
│   ├── customers/               # Customer management
│   ├── appointments/            # Appointment components
│   ├── services/                # Service components
│   └── ui/                      # shadcn/ui components
│
├── lib/                         # Utilities & libraries
│   ├── api/
│   │   ├── client.ts           # Axios instance with interceptors
│   │   └── services/           # API service functions
│   ├── auth/
│   │   └── storage.ts          # Token storage utilities
│   ├── hooks/
│   │   ├── useAuth.ts          # Authentication hook
│   │   └── ...                 # Other custom hooks
│   ├── utils/
│   │   ├── format.ts           # Date, currency, phone formatting
│   │   ├── validation.ts       # Zod schemas & validation
│   │   └── ...
│   └── types/                  # TypeScript definitions
│
├── store/                       # Zustand stores
│   ├── authStore.ts            # Auth state management
│   ├── customerStore.ts        # Customer state
│   └── ...                     # Other stores
│
├── config/                      # Configuration
│   ├── constants.ts            # Constants, enums, endpoints
│   └── environment.ts          # Environment config
│
└── styles/                      # Global styles
    └── globals.css
```

---

## 🔧 Available Scripts

```bash
# Development
pnpm dev              # Start dev server with hot reload

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues

# Add shadcn/ui components
pnpm dlx shadcn@latest add [component-name]

# Package Management
pnpm add [package]           # Add dependency
pnpm add -D [package]        # Add dev dependency
pnpm remove [package]        # Remove dependency
```

---

## 🔐 Authentication Flow

1. **Register** → Email verification → Account created
2. **Login** → JWT access token + Refresh token issued
3. **API Calls** → Token automatically added to headers
4. **Token Expiry** → Auto-refresh using refresh token
5. **Logout** → Tokens cleared, session ended

### Token Management

- Access tokens stored in `localStorage`
- Refresh tokens stored in `localStorage`
- Automatic refresh on 401 responses
- Clear tokens on logout

---

## 🎨 UI Components

### shadcn/ui Setup

shadcn/ui is already initialized. To add components:

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add table
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add select
```

### Custom Components

Custom components are in `src/components/` organized by feature:

- `common/` - Shared components (Header, Sidebar, Footer)
- `auth/` - Login, Register, Password Reset
- `dashboard/` - Dashboard-specific components
- `customers/` - Customer list, detail, form
- `appointments/` - Appointment calendar, booking
- `services/` - Service catalog, details

---

## 📝 Environment Variables

Create `.env.local` in project root:

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

## 🏗️ Architecture

### Layered Architecture

```
┌─────────────────────────────────────┐
│     Pages (App Router)              │
├─────────────────────────────────────┤
│     Components (React + shadcn)     │
├─────────────────────────────────────┤
│     State (Zustand Stores)          │
├─────────────────────────────────────┤
│     API Layer (Axios + Services)    │
├─────────────────────────────────────┤
│     Backend API (FastAPI)           │
└─────────────────────────────────────┘
```

### State Management (Zustand)

- Centralized auth state
- Customer data store
- Appointment store
- UI state (modals, filters, etc.)

### API Integration (Axios)

- Configured client with base URL
- Request interceptors (token injection)
- Response interceptors (error handling, token refresh)
- Error handling with fallbacks

---

## 🧪 Testing (Phase 2)

```bash
# Test setup coming soon
# Jest + React Testing Library
```

---

## 📚 Documentation

- **[docs/PRODUCT_BRIEF.md](./docs/PRODUCT_BRIEF.md)** - Product overview & features
- **[docs/INDEX.md](./docs/INDEX.md)** - Documentation index
- **Backend Docs:** [../back-end/docs/](../back-end/docs/)

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@/...'"

**Solution:** Check `tsconfig.json` paths configuration

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue: Backend API connection failed

**Solution:** Verify `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Issue: Styles not loading

**Solution:** Restart dev server

```bash
pnpm dev
```

### Issue: Dependencies not found

**Solution:** Reinstall dependencies

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 🤝 Contributing

1. **Branch naming:** `feature/feature-name` or `bugfix/bug-name`
2. **Commit messages:** Follow conventional commits
   ```
   feat: add new feature
   fix: fix bug
   docs: update documentation
   style: format code
   ```
3. **Code standards:** TypeScript strict mode, follow ESLint rules
4. **Testing:** Test locally before pushing
5. **PR:** Create pull request with description

---

## 📋 Development Checklist

- [x] Next.js 14+ setup with TypeScript
- [x] Tailwind CSS configured
- [x] shadcn/ui initialized
- [x] Zustand state management setup
- [x] Axios HTTP client with interceptors
- [x] Authentication system (JWT + refresh tokens)
- [x] Folder structure organized
- [x] Constants & enums defined
- [x] Type definitions created
- [x] Validation schemas (Zod) set up
- [x] Utility functions (format, validation)
- [ ] Authentication pages (Login, Register, Reset)
- [ ] Dashboard pages & components
- [ ] Customer management pages
- [ ] Appointment system
- [ ] Service management
- [ ] Testing setup
- [ ] CI/CD pipeline

---

## 🚀 Deployment

### Development

```bash
pnpm dev
# Runs at http://localhost:3000
```

### Production Build

```bash
pnpm build
pnpm start
```

### Deployment Options

- **Vercel** (recommended) - Optimized for Next.js
- **Netlify** - Easy deployment
- **AWS Amplify** - Full AWS integration
- **Docker** - Container deployment

### Pre-deployment Checklist

- [ ] Environment variables configured
- [ ] Backend API URL correct
- [ ] HTTPS enabled
- [ ] Secure token storage
- [ ] CORS configured properly
- [ ] Error handling tested
- [ ] Performance optimized
- [ ] Security audit passed

---

## 📞 Support & Contact

For issues or questions:

1. Check documentation in `docs/` folder
2. Check existing GitHub issues
3. Create new issue with detailed description

---

## 📄 License

Proprietary - Spa Online CRM Project

---

## 👥 Team

- **Project Name:** Spa Customer Care Platform
- **Type:** KLTN (Capstone Project)
- **Frontend:** Next.js 14 + TypeScript
- **Backend:** FastAPI + PostgreSQL

---

**Last Updated:** October 19, 2025  
**Version:** 1.0.0 (MVP)  
**Status:** 🔄 In Development

---

## 🔗 Related Projects

- **Backend:** [../back-end/](../back-end/)
- **Project Root:** [../](../)
