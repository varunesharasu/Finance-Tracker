import axios from 'axios';

// Use environment variable with fallback for development
const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL;
const normalizedBaseUrl = rawBaseUrl ? rawBaseUrl.replace(/\/+$/, '') : '';
const API_BASE_URL = normalizedBaseUrl
  ? normalizedBaseUrl.endsWith('/api')
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`
  : 'https://finance-tracker-6li5.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Allow cookies to be sent with requests
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  getCurrentUser: () => apiClient.get('/auth/me'),
};

// Transaction API
export const transactionAPI = {
  createTransaction: (data) => apiClient.post('/transactions', data),
  getTransactions: () => apiClient.get('/transactions'),
  getTransactionById: (id) => apiClient.get(`/transactions/${id}`),
  updateTransaction: (id, data) => apiClient.put(`/transactions/${id}`, data),
  deleteTransaction: (id) => apiClient.delete(`/transactions/${id}`),
  getTransactionSummary: () => apiClient.get('/transactions/summary'),
};

// Goal API
export const goalAPI = {
  createGoal: (data) => apiClient.post('/goals', data),
  getGoals: () => apiClient.get('/goals'),
  getGoalById: (id) => apiClient.get(`/goals/${id}`),
  updateGoal: (id, data) => apiClient.put(`/goals/${id}`, data),
  deleteGoal: (id) => apiClient.delete(`/goals/${id}`),
};

export default apiClient;
