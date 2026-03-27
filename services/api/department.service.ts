import { apiClient } from './client';
import { endpoints } from './config';

export interface MainDepartment {
  mainDepartmentId?: string;
  mainDepartmentName: string;
  mainDepartmentDescription?: string;
  mainDepartmentImage?: string;
  isActive?: boolean;
}

export interface SubDepartment {
  subDepartmentId?: string;
  subDepartmentName: string;
  subDepartmentDescription?: string;
  mainDepartmentId: string;
  isActive?: boolean;
}

class DepartmentService {
  async getAllMain(): Promise<MainDepartment[]> {
    return apiClient.get<MainDepartment[]>(endpoints.departments.getAllMain);
  }

  async getMainById(id: string): Promise<MainDepartment> {
    return apiClient.get<MainDepartment>(endpoints.departments.getMainById(id));
  }

  async createMain(formData: FormData): Promise<MainDepartment> {
    return apiClient.postFormData<MainDepartment>(endpoints.departments.createMain, formData);
  }

  async updateMain(formData: FormData): Promise<MainDepartment> {
    return apiClient.postFormData<MainDepartment>(endpoints.departments.updateMain, formData);
  }

  async deleteMain(id: string): Promise<void> {
    return apiClient.delete<void>(endpoints.departments.deleteMain(id));
  }

  async getAllSub(): Promise<SubDepartment[]> {
    return apiClient.get<SubDepartment[]>(endpoints.departments.getAllSub);
  }

  async getSubById(id: string): Promise<SubDepartment> {
    return apiClient.get<SubDepartment>(endpoints.departments.getSubById(id));
  }

  async createSub(formData: FormData): Promise<SubDepartment> {
    return apiClient.postFormData<SubDepartment>(endpoints.departments.createSub, formData);
  }

  async updateSub(formData: FormData): Promise<SubDepartment> {
    return apiClient.postFormData<SubDepartment>(endpoints.departments.updateSub, formData);
  }

  async deleteSub(id: string): Promise<void> {
    return apiClient.delete<void>(endpoints.departments.deleteSub(id));
  }
}

export const departmentService = new DepartmentService();
