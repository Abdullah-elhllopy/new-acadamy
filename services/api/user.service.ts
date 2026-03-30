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

  async delete(id: string): Promise<void> {
    await apiClient.get(endpoints.users.delete(id));
  },
};
