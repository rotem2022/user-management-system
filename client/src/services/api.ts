import type { CreateUserRequest, UserResponse, LoginRequest } from '../../../shared/types/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const api = {
  // Create new user
  async createUser(userData: CreateUserRequest): Promise<{ message: string; user: UserResponse }> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create user');
    }

    return response.json();
  },

  // Get all users
  async getUsers(): Promise<UserResponse[]> {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-id': userId,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch users');
    }

    return response.json();
  },

  // Login user
  async login(loginData: LoginRequest): Promise<{ message: string; user: UserResponse }> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const result = await response.json();
    
    // Save user ID to localStorage for authentication
    localStorage.setItem('userId', result.user.id);
    
    return result;
  },
}; 