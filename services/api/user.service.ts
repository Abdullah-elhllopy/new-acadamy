import { apiClient } from './client';
import { endpoints } from './config';

export interface User {
  id: string;
  userFullName: string;
  userEmail: string;
  userPhone?: string;
  type?: string;
}

export interface UserFormData {
  userFullName: string;
  userEmail: string;
  userPassword?: string;
  userConfirmPassword?: string;
  userPhone?: string;
  type?: string;
}

export interface LoginRequest {
  userEmail: string;
  userPassword: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ForgotPasswordRequest {
  userEmail: string;
}

export interface CheckCodeRequest {
  userEmail: string;
  code: string;
}

export interface ResetPasswordRequest {
  userEmail: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdatePasswordRequest {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export const UserService = {
  async getAll(): Promise<User[]> {
    const response = await apiClient.get<User[]>(endpoints.users.getAll);
    return response;
  },

  async getById(id: string): Promise<User> {
    const response = await apiClient.get<User>(endpoints.users.getById(id));
    return response;
  },

  async register(data: UserFormData): Promise<void> {
    await apiClient.post(endpoints.users.register, data);
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(endpoints.users.login, data);
    return response;
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await apiClient.post(endpoints.users.forgotPassword, data);
  },

  async checkCode(data: CheckCodeRequest): Promise<{ isValid: boolean }> {
    const response = await apiClient.post<{ isValid: boolean }>(endpoints.users.checkCode, data);
    return response;
  },

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await apiClient.post(endpoints.users.resetPassword, data);
  },

  async updatePassword(data: UpdatePasswordRequest): Promise<void> {
    await apiClient.post(endpoints.users.updatePassword, data);
  },

  async delete(id: string): Promise<void> {
    await apiClient.get(endpoints.users.delete(id));
  },
};
