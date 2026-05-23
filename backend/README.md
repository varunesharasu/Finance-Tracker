# Finance Tracker Backend

A Node.js/Express backend for the Finance Tracker application with MongoDB integration.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

Or if you use pnpm:

```bash
pnpm install
```

### 2. Environment Configuration

The `.env` file is already configured with your MongoDB connection string. The current settings are:

```
MONGODB_URI=mongodb+srv://varunesh:varunesh@cluster1.lvoka.mongodb.net/finance-tracker?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

**Note:** For production, change the `JWT_SECRET` to a strong, random value.

### 3. Run the Backend

#### Development mode (with auto-reload):

```bash
npm run dev
```

#### Production mode:

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

#### Get Current User
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

### Transactions

All transaction endpoints require authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

#### Create Transaction
- **POST** `/api/transactions`
- **Body:**
  ```json
  {
    "type": "expense",
    "category": "Food",
    "amount": 25.50,
    "description": "Lunch",
    "date": "2024-05-23"
  }
  ```

#### Get All Transactions
- **GET** `/api/transactions`
- **Response:** Array of transactions

#### Get Transaction by ID
- **GET** `/api/transactions/:id`

#### Update Transaction
- **PUT** `/api/transactions/:id`
- **Body:** Same as create transaction

#### Delete Transaction
- **DELETE** `/api/transactions/:id`

#### Get Transaction Summary
- **GET** `/api/transactions/summary`
- **Response:**
  ```json
  {
    "totalIncome": 5000,
    "totalExpense": 1500,
    "balance": 3500,
    "byCategory": {
      "Salary": 5000,
      "Food": 500,
      "Transport": 1000
    }
  }
  ```

### Goals

All goal endpoints require authentication.

#### Create Goal
- **POST** `/api/goals`
- **Body:**
  ```json
  {
    "goalName": "Vacation Fund",
    "targetAmount": 5000,
    "currentAmount": 0,
    "deadline": "2025-12-31",
    "category": "Travel"
  }
  ```

#### Get All Goals
- **GET** `/api/goals`

#### Get Goal by ID
- **GET** `/api/goals/:id`

#### Update Goal
- **PUT** `/api/goals/:id`
- **Body:** Same as create goal

#### Delete Goal
- **DELETE** `/api/goals/:id`

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── transactionController.js # Transaction logic
│   └── goalController.js     # Goal logic
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── errorHandler.js      # Error handling
├── models/
│   ├── User.js              # User schema
│   ├── Transaction.js       # Transaction schema
│   └── Goal.js              # Goal schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── transactionRoutes.js # Transaction endpoints
│   └── goalRoutes.js        # Goal endpoints
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
└── server.js                # Main server file
```

## Testing the API

You can test the API using tools like Postman or cURL. Here's an example using cURL:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Create transaction (replace TOKEN with the token from login)
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "type": "expense",
    "category": "Food",
    "amount": 25.50,
    "description": "Lunch"
  }'
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Notes

- JWT tokens expire after 7 days
- All timestamps are stored in UTC
- Passwords are hashed using bcryptjs with 10 salt rounds
- MongoDB connection is configured with retry writes enabled
