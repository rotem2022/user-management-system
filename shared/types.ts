export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
}

export interface CreateUserRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
} 