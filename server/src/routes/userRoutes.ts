import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../../../shared/types/user';

const router = Router();

// In-memory storage for users
let users: User[] = [];

// In-memory storage for active sessions
let activeSessions: string[] = [];

// Authentication middleware
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['user-id'] as string;
  
  if (!userId) {
    return res.status(401).json({ error: 'User ID is required' });
  }

  if (!activeSessions.includes(userId)) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  next();
};

// POST /api/users - Create new user
router.post('/users', (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    // Basic validation
    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email already exists' 
      });
    }

    const newUser: User = {
      id: Date.now().toString(),
      fullName,
      email,
      phone,
      password
    };

    users.push(newUser);

    res.status(201).json({ 
      message: 'User created successfully',
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users - Get all users (without password and phone) - Protected route
router.get('/users', requireAuth, (req, res) => {
  try {
    const usersWithoutSensitiveData = users.map(user => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email
    }));

    res.json(usersWithoutSensitiveData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/login - Login user
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    // Find user by email
    const user = users.find(user => user.email === email);
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Add user to active sessions
    if (!activeSessions.includes(user.id)) {
      activeSessions.push(user.id);
    }

    // Return user data (without password)
    res.json({ 
      message: 'Login successful',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 