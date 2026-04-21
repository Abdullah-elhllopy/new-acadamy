import { apiClient } from './client';
import { endpoints } from './config';
import { Course } from './course.service';

export interface Trainer {
  instructorid: string;
  name: string;
  nameAr: string;
  job: string;
  jobAr: string;
  about: string;
  aboutAr: string;
  email: string;
  phone: string;
  videoUrl: string;
  experience: number;
  image: string | null;
  linkedin: string | null;
  facbook: string | null;
  instgram: string | null;
  twitter: string | null;
  pdf: string;
  isActive: boolean;
  courseDetails?: Course[];
}

class TrainerService {
  async getAll(): Promise<Trainer[]> {
    return apiClient.get<Trainer[]>(endpoints.trainers.getAll);
  }

  async getById(id: string): Promise<Trainer> {
    return apiClient.get<Trainer>(endpoints.trainers.getById(id));
  }

  async getByIdDashboard(id: string): Promise<Trainer> {
    return apiClient.get<Trainer>(endpoints.trainers.getByIdDashboard(id));
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
