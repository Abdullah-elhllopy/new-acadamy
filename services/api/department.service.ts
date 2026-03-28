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
    const response = await apiClient.get<{ data: MainDepartment[] }>(endpoints.departments.getAllMain);
    return response.data || [];
  }

  async getMainById(id: string): Promise<MainDepartment> {
    const response = await apiClient.get<{ data: MainDepartment }>(endpoints.departments.getMainById(id));
    return response.data;
  }

  async createMain(formData: FormData): Promise<MainDepartment> {
    const response = await apiClient.postFormData<{ data: MainDepartment }>(endpoints.departments.createMain, formData);
    return response.data;
  }

  async updateMain(formData: FormData): Promise<MainDepartment> {
    const response = await apiClient.postFormData<{ data: MainDepartment }>(endpoints.departments.updateMain, formData);
    return response.data;
  }

  async deleteMain(id: string): Promise<void> {
    await apiClient.delete<{ data: null }>(endpoints.departments.deleteMain(id));
  }

  async getAllSub(): Promise<SubDepartment[]> {
    const response = await apiClient.get<{ data: SubDepartment[] }>(endpoints.departments.getAllSub);
    return response.data || [];
  }

  async getSubById(id: string): Promise<SubDepartment> {
    const response = await apiClient.get<{ data: SubDepartment }>(endpoints.departments.getSubById(id));
    return response.data;
  }

  async getSubByMainId(mainId: string): Promise<SubDepartment[]> {
    const response = await apiClient.get<{ data: SubDepartment[] }>(endpoints.departments.getSubByMainId(mainId));
    return response.data || [];
  }

  async createSub(formData: FormData): Promise<SubDepartment> {
    const response = await apiClient.postFormData<{ data: SubDepartment }>(endpoints.departments.createSub, formData);
    return response.data;
  }

  async updateSub(formData: FormData): Promise<SubDepartment> {
    const response = await apiClient.postFormData<{ data: SubDepartment }>(endpoints.departments.updateSub, formData);
    return response.data;
  }

  async deleteSub(id: string): Promise<void> {
    await apiClient.delete<{ data: null }>(endpoints.departments.deleteSub(id));
  }
}

export const departmentService = new DepartmentService();
