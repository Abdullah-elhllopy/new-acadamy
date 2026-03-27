import { apiClient } from './client';
import { endpoints } from './config';

export interface User {
  userId?: string;
  fullName: string;
  email: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

class UserService {
  async getAll(): Promise<User[]> {
    return apiClient.get<User[]>(endpoints.users.getAll);
  }

  async getById(id: string): Promise<User> {
    return apiClient.get<User>(endpoints.users.getById(id));
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(endpoints.users.register, data);
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(endpoints.users.login, credentials);
    if (response.token) {
      this.setToken(response.token);
    }
    return response;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return apiClient.post<User>(endpoints.users.updateProfile, data);
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    return apiClient.post<void>(endpoints.users.changePassword, data);
  }

  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    return apiClient.post<void>(endpoints.users.forgotPassword, data);
  }

  async resetPassword(data: ResetPasswordData): Promise<void> {
    return apiClient.post<void>(endpoints.users.resetPassword, data);
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  logout(): void {
    this.removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
}

export const userService = new UserService();
