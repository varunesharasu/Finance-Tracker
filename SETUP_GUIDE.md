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

## 🎯 Features Implemented

### Authentication
- ✅ User registration with validation
- ✅ User login with JWT
- ✅ Protected routes (auto-redirect if not logged in)
- ✅ Persistent login (survives page refresh)
- ✅ Logout functionality
- ✅ User profile dropdown

### Transactions
- ✅ Add Transaction form connected to backend
- ✅ Save to MongoDB with automatic user association
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling

### Backend
- ✅ Express.js API
- ✅ MongoDB integration
- ✅ User authentication with bcrypt
- ✅ JWT tokens
- ✅ Transaction CRUD operations
- ✅ Goals CRUD operations
- ✅ Transaction summary endpoint

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Transactions (Protected)
- `POST /api/transactions` - Create transaction
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/summary` - Get summary
- `PUT /api/transactions/:id` - Update
- `DELETE /api/transactions/:id` - Delete

### Goals (Protected)
- `POST /api/goals` - Create goal
- `GET /api/goals` - Get all goals
- `PUT /api/goals/:id` - Update
- `DELETE /api/goals/:id` - Delete

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
- ✅ Backend not running? Start: `npm run dev` in `/Fin/backend`
- ✅ Port 5000 in use? Kill the process or change PORT in `.env`

### "Module not found: axios"
- ✅ Run: `npm install` in `/Fin` directory
- ✅ Or: `npm install axios`

### "Login/Register not working"
- ✅ Check browser console (F12 → Console)
- ✅ Check backend terminal for errors
- ✅ Make sure MongoDB connection works

### "Token not persisting"
- ✅ Check localStorage in DevTools (F12 → Application)
- ✅ Ensure localStorage is enabled
- ✅ Check browser privacy settings

### "Data not saving"
- ✅ Check network tab (F12 → Network) for failed requests
- ✅ Verify MongoDB connection string in `.env`
- ✅ Check backend terminal for database errors-transaction-form.tsx` - Backend integration
- ✅ `Fin/package.json` - Added axios
