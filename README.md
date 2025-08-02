# User Management System

A full-stack user management application built with Node.js, Express, TypeScript, and React.

## Features

- ✅ User registration with validation
- ✅ User authentication (login)
- ✅ Protected user listing (only authenticated users)
- ✅ Form validation with Yup
- ✅ Modern UI with CSS
- ✅ TypeScript for type safety
- ✅ In-memory storage (data resets on server restart)

## Project Structure

```
UserManagement/
├── server/                 # Backend (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── index.ts       # Server entry point
│   │   ├── routes/        # API routes
│   │   └── middleware/    # Authentication middleware
│   └── package.json
├── client/                # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── styles/        # CSS files
│   └── package.json
└── shared/                # Shared types
    └── types/
        └── user.ts        # User type definitions
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm

### Backend Setup
```bash
cd server
npm install
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Usage

1. **Start the backend server:**
   ```bash
   cd server && npm run dev
   ```
   Server will run on: http://localhost:3001

2. **Start the frontend:**
   ```bash
   cd client && npm run dev
   ```
   App will run on: http://localhost:5173

3. **Use the application:**
   - Register a new user at: http://localhost:5173/register
   - Login at: http://localhost:5173/login
   - View users at: http://localhost:5173/users (requires authentication)

## API Endpoints

### Public Endpoints
- `POST /api/users` - Register new user
- `POST /api/login` - User login

### Protected Endpoints
- `GET /api/users` - Get all users (requires authentication)

## Validation Rules

### Email
- Must be valid email format: `user@mail.com`

### Phone
- Must match pattern: `05x-xxxxxxx`

### Password
- Minimum 8 characters
- Must contain uppercase letter
- Must contain lowercase letter
- Must contain number
- Must contain special character

## Technologies Used

### Backend
- Node.js
- Express.js
- TypeScript
- Yup (validation)

### Frontend
- React
- TypeScript
- React Router
- Yup (validation)
- CSS (custom styling)

## Development

### Backend Commands
```bash
cd server
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
```

### Frontend Commands
```bash
cd client
npm run dev    # Start development server
npm run build  # Build for production
npm preview    # Preview production build
```

## Security Features

- ✅ API protection with authentication middleware
- ✅ Session management (in-memory)
- ✅ Input validation on both client and server
- ✅ Protected routes (only authenticated users can access user list)

## Notes

- Data is stored in-memory and will be lost when the server restarts
- Authentication is session-based (no persistent login)
- No logout functionality (as per requirements) 