import { apiClient } from './client';
import { endpoints } from './config';

export interface MainDepartment {
  isActive?: boolean;
  name: string;
  departmentID?: string;
  description?: string;
  image?: string;
  nameAr?: string;
  descriptionAr?: string;
}

export interface SubDepartment {
  subDepartmentId?: string;
  subDepartmentName: string;
  subDepartmentDescription?: string;
  mainDepartmentId: string;
  isActive?: boolean;
  name?: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
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

  async getMainByIdDashboard(id: string): Promise<MainDepartment> {
    const response = await apiClient.get<{ data: MainDepartment }>(endpoints.departments.getMainByIdDashboard(id));
    return response.data;
  }

  async createMain(data: any): Promise<MainDepartment> {
    const response = await apiClient.post<{ data: MainDepartment }>(endpoints.departments.createMain, data);
    return response.data;
  }

  async updateMain(data: any): Promise<MainDepartment> {
    const response = await apiClient.post<{ data: MainDepartment }>(endpoints.departments.updateMain, data);
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

  async getSubByIdDashboard(id: string): Promise<SubDepartment> {
    const response = await apiClient.get<{ data: SubDepartment }>(endpoints.departments.getSubByIdDashboard(id));
    return response.data;
  }

  async getSubByMainId(mainId: string): Promise<SubDepartment[]> {
    const response = await apiClient.get<SubDepartment[]>(endpoints.departments.getSubByMainId(mainId));
    return response || [];
  }

  async createSub(data: any): Promise<SubDepartment> {
    const response = await apiClient.post<{ data: SubDepartment }>(endpoints.departments.createSub, data);
    return response.data;
  }

  async updateSub(data: any): Promise<SubDepartment> {
    const response = await apiClient.post<{ data: SubDepartment }>(endpoints.departments.updateSub, data);
    return response.data;
  }

  async deleteSub(id: string): Promise<void> {
    await apiClient.delete<{ data: null }>(endpoints.departments.deleteSub(id));
  }
}

export const departmentService = new DepartmentService();
