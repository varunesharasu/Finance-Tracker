# Finance Tracker

A full-stack finance management application with a Next.js frontend and Node.js/Express backend.

## Project Structure

```
Finance-Tracker/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and API client
│   ├── public/              # Static assets
│   ├── styles/              # CSS styles
│   ├── package.json         # Frontend dependencies
│   └── ...config files      # Next.js, Tailwind, PostCSS configs
│
├── backend/                 # Node.js/Express backend API
│   ├── config/              # Database configuration
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Express middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── package.json         # Backend dependencies
│   └── server.js            # Entry point
│
└── Documentation files
    ├── AUTHENTICATION_SETUP.md
    ├── SAVINGS_AND_ACCOUNTS_GUIDE.md
    └── SETUP_GUIDE.md
```

## Getting Started

### Frontend (Vercel Deployment Ready)

```bash
cd frontend
npm install
npm run dev
```

Frontend is configured to deploy on Vercel with environment-based API URLs:
- Local: `http://localhost:5000/api`
- Production: `https://finance-tracker-6li5.onrender.com/api`

### Backend

```bash
cd backend
npm install
npm start
```

Deployed at: https://finance-tracker-6li5.onrender.com

## Features

- User authentication (Login/Register)
- Transaction management
- Financial goals tracking
- Account and savings overview
- Dashboard with financial metrics

## Tech Stack

**Frontend:**
- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
