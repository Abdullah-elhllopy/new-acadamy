import { apiClient } from './client';
import { endpoints } from './config';
import { TrainerVideo } from '@/shared/types';

export const trainerVideoService = {
  getAll: async (): Promise<TrainerVideo[]> => {
    const response : TrainerVideo[] = await apiClient.get(endpoints.trainers.videos.getAll);
    return response;
  },

  getByTrainerId: async (trainerId: string): Promise<TrainerVideo[]> => {
    const response : TrainerVideo[]   = await apiClient.get(endpoints.trainers.videos.getByTrainerId(trainerId));
    return response;
  },

  getById: async (id: string): Promise<TrainerVideo> => {
    const response : TrainerVideo = await apiClient.get(`${endpoints.trainers.videos.getAll}/${id}`);
    return response;
  },

  create: async (formData: FormData): Promise<TrainerVideo> => {
    const response : TrainerVideo = await apiClient.postFormData(endpoints.trainers.videos.create, formData);
    return response;
  },

  update: async (formData: FormData): Promise<TrainerVideo> => {
    const response : TrainerVideo = await apiClient.postFormData(endpoints.trainers.videos.update, formData);
    return response;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.get(endpoints.trainers.videos.delete(id));
  },
};
