import { apiClient } from './client';
import { endpoints } from './config';

export interface Package {
  packageId: string;
  name: string;
  description?: string;
  price: number;
  type?: string;
  coursesIds?: string[];
}

export interface PackageFormData {
  name: string;
  description?: string;
  price: number;
  type?: string;
  coursesIds?: string[];
}

export const PackageService = {
  async getAll(): Promise<Package[]> {
    const response = await apiClient.get<Package[]>(endpoints.packages.getAll);
    return response;
  },

  async create(data: PackageFormData): Promise<void> {
    const formData = new FormData();
    formData.append('Name', data.name);
    if (data.description) formData.append('Description', data.description);
    formData.append('Price', data.price.toString());
    if (data.type) formData.append('Type', data.type);
    if (data.coursesIds) {
      data.coursesIds.forEach(id => formData.append('CoursesIds', id));
    }

    await apiClient.post(endpoints.packages.create, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async delete(id: string): Promise<void> {
    await apiClient.get(endpoints.packages.delete(id));
  },
};
