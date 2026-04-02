import { apiClient } from './client';
import { endpoints } from './config';
import { TrainerArticle } from '@/shared/types';

export const trainerArticleService = {
  getAll: async (): Promise<TrainerArticle[]> => {
    const response : TrainerArticle[] = await apiClient.get(endpoints.trainers.articles.getAll);
    return response;
  },

  getByTrainerId: async (trainerId: string): Promise<TrainerArticle[]> => {
    const response : TrainerArticle[] = await apiClient.get(endpoints.trainers.articles.getByTrainerId(trainerId));
    return response;
  },

  getById: async (id: string): Promise<TrainerArticle> => {
    const response : TrainerArticle = await apiClient.get(`${endpoints.trainers.articles.getAll}/${id}`);
    return response;
  },

  create: async (formData: FormData): Promise<TrainerArticle> => {
    const response : TrainerArticle = await apiClient.postFormData(endpoints.trainers.articles.create, formData);
    return response;
  },

  update: async (formData: FormData): Promise<TrainerArticle> => {
    const response : TrainerArticle = await apiClient.postFormData(endpoints.trainers.articles.update, formData);
    return response;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.get(endpoints.trainers.articles.delete(id));
  },
};
