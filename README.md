# Authentication System Backend

A secure and robust Node.js/TypeScript authentication API built with Express.js and Prisma ORM. This backend provides comprehensive user authentication features including registration, login, password reset, and role-based access control.

## Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Password Reset**: Token-based password reset functionality
- **Role-Based Access Control**: Admin and user roles with middleware protection
- **Security Measures**: Rate limiting, input validation, and error handling
- **Database Management**: MySQL database with Prisma ORM
- **TypeScript**: Full type safety and better development experience

## Security Features

- bcrypt password hashing
- JWT token authentication
- Rate limiting to prevent abuse
- Input validation with Zod schemas
- Comprehensive error handling
- Role-based authorization middleware

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: Zod
- **Rate Limiting**: express-rate-limit
- **Environment**: dotenv

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MySQL database server
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Rahulstark2/authentication-system-backend/
cd authentication-system-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add the following configuration:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/auth_system"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="1d"

# Server Configuration
PORT=3000

```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## �� API Endpoints

### Authentication Routes (`/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register a new user | No |
| POST | `/login` | User login | No |
| GET | `/me` | Get current user profile | Yes |
| POST | `/request-password-reset` | Request password reset | No |
| POST | `/reset-password` | Reset password with token | No |
| GET | `/fetch-all-users` | Get all users (Admin only) | Yes (Admin) |

### Request Examples

#### User Registration
```bash
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### User Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Get User Profile
```bash
GET /auth/me
Authorization: Bearer <your-jwt-token>
```

#### Request Password Reset
```bash
POST /auth/request-password-reset
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```bash
POST /auth/reset-password
Content-Type: application/json

{
  "email": "john@example.com",
  "token": "reset-token-from-email",
  "newPassword": "newsecurepassword123"
}
```
