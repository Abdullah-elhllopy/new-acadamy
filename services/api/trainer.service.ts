import { apiClient } from './client';
import { endpoints } from './config';
import { Course } from './course.service';

export interface Trainer {
  email: string;
  phone: string;
  experience: string;
  isActive: boolean;
  instructorid: string;
  name: string;
  image: string | null;
  job: string;
  about: string;
  linkedin: string | null;
  facbook: string | null;  // Note: "facebook" is misspelled in the data
  instgram: string | null;  // Note: "instagram" is misspelled in the data
  twitter: string | null;
  pdf: string;
  courseDetails ?: Course[];
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
