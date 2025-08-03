# User Management System

## Project Structure

```
UserManagement/
├── server/                # Backend 
│   ├── src/
│   │   ├── index.ts       # Server entry point
│   │   ├── routes/        # API routes
│   └── package.json
├── client/                # Frontend 
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   └── package.json
└── shared/                # Shared types
        └── types.ts       # Type definitions
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm

## Quick Setup 
 Install all dependencies and start both servers
```bash
npm run install:all
npm run dev
```
## Application Flow
1. **Register** at: http://localhost:5173/register
2. **Login** at: http://localhost:5173/login
3. **View Users** at: http://localhost:5173/users (requires authentication)


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

### Frontend
- React
- TypeScript
- Vite (build tool)
- Yup (validation)
- CSS 

## Notes

- Data is stored in-memory and will be lost when the server restarts
- Authentication is session-based (no persistent login)
- No logout functionality (as per requirements)
- Environment variables are included in the repository for learning purposes (not recommended for production) 