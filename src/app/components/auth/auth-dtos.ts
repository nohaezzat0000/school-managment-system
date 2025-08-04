export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date string (YYYY-MM-DD)
  email: string;
  password: string;
  phoneNumber: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string; // "Bearer "
}

export interface ApiError {
  message: string;
  status: number;
}

export interface UserResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
}