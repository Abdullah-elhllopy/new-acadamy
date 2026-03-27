import { apiClient } from './client';
import { endpoints } from './config';

export interface Trainer {
  instructorId?: string;
  instructorName: string;
  instructorEmail: string;
  instructorPhone?: string;
  instructorBio?: string;
  instructorImage?: string;
  instructorCV?: string;
  specialization?: string;
  experience?: number;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  isActive?: boolean;
}

class TrainerService {
  async getAll(): Promise<Trainer[]> {
    return apiClient.get<Trainer[]>(endpoints.trainers.getAll);
  }

  async getById(id: string): Promise<Trainer> {
    return apiClient.get<Trainer>(endpoints.trainers.getById(id));
  }

  async create(formData: FormData): Promise<Trainer> {
    return apiClient.postFormData<Trainer>(endpoints.trainers.create, formData);
  }

  async update(formData: FormData): Promise<Trainer> {
    return apiClient.postFormData<Trainer>(endpoints.trainers.update, formData);
  }

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(endpoints.trainers.delete(id));
  }
}

export const trainerService = new TrainerService();
