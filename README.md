# User Management System

## Features

- ✅ User registration with validation
- ✅ User authentication (login)
- ✅ Protected user listing (only authenticated users)
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

### Quick Setup (Recommended)
```bash
# Install all dependencies and start both servers
npm run install:all
npm run dev
```

### Manual Setup

#### Backend Setup
```bash
cd server
npm install
npm run dev
```

#### Frontend Setup
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


## Technologies Used

### Backend
- Node.js
- Express.js
- TypeScript
- CORS (Cross-Origin Resource Sharing)
- dotenv (environment variables)
- ts-node (TypeScript execution)

### Frontend
- React
- TypeScript
- Vite (build tool)
- React Router
- Yup (validation)
- CSS (custom styling)

## Notes

- Data is stored in-memory and will be lost when the server restarts
- Authentication is session-based (no persistent login)
- No logout functionality (as per requirements) 