# 🚀 Finance Tracker - Complete Setup Guide

## What's Ready

✅ **Backend** (Node.js + MongoDB)
✅ **Frontend Authentication** (Next.js + React)
✅ **Database** (MongoDB Atlas - Connected)
✅ **API Integration** (Axios with JWT)

---

## 📦 Installation & Running

### Step 1: Install Fin Frontend Dependencies
```bash
cd d:\Projects\Expense-Tracker\Fin
npm install
```

### Step 2: Start Backend Server
In a NEW terminal:
```bash
cd d:\Projects\Expense-Tracker\Fin\backend
npm run dev
```
✅ Backend running at: **http://localhost:5000**

### Step 3: Start Frontend Server
In another NEW terminal:
```bash
cd d:\Projects\Expense-Tracker\Fin
npm run dev
```
✅ Frontend running at: **http://localhost:3000**

---

## 🔐 Test the Authentication

### 1. Create Account (Register)
- Go to: **http://localhost:3000/register**
- Fill form:
  - Name: `Test User`
  - Email: `test@example.com`
  - Password: `password123`
  - Confirm: `password123`
- Click "Sign Up"
- ✅ Auto-redirects to dashboard if successful

### 2. Login
- Go to: **http://localhost:3000/login**
- Enter email: `test@example.com`
- Enter password: `password123`
- Click "Sign In"
- ✅ Auto-redirects to dashboard

### 3. Test Protected Route
- While logged in: **http://localhost:3000** → Dashboard
- Logout (user menu top-right) → Auto-redirect to login
- Try accessing **http://localhost:3000** → Redirect to login

---

## 📝 How It Works

### Data Flow

```
User Registration/Login
        ↓
Frontend Form (/register or /login)
        ↓
API Request (axios) → Backend
        ↓
Backend validates → MongoDB stores user
        ↓
JWT Token returned
        ↓
Token stored in localStorage
        ↓
Auto-included in all API requests
```

### Component Structure

```
Fin/
├── app/
│   ├── layout.tsx           ← AuthProvider wrapper
│   ├── page.tsx             ← Dashboard (protected)
│   ├── login/page.tsx       ← Login page
│   └── register/page.tsx    ← Register page
├── components/
│   ├── navbar.tsx           ← Header with user menu
│   ├── user-nav.tsx         ← User dropdown/logout
│   ├── dashboard-page.tsx   ← Main dashboard
│   └── add-transaction-form.tsx ← Form to save transactions
├── lib/
│   ├── api.js               ← API client (axios)
│   └── auth-context.jsx     ← Auth state (Context API)
└── package.json             ← axios added
```

---
