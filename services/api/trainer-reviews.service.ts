import { apiClient } from './client';
import { endpoints } from './config';
import { TrainerReview } from '@/shared/types';

export const trainerReviewService = {
  getAll: async (): Promise<TrainerReview[]> => {
    const response : TrainerReview[] = await apiClient.get(endpoints.trainers.reviews.getAll);
    return response;
  },

  getByTrainerId: async (trainerId: string): Promise<TrainerReview[]> => {
    const response : TrainerReview[] = await apiClient.get(endpoints.trainers.reviews.getByTrainerId(trainerId));
    return response;
  },

  getById: async (id: string): Promise<TrainerReview> => {
    const response : TrainerReview = await apiClient.get(`${endpoints.trainers.reviews.getAll}/${id}`);
    return response;
  },

  create: async (data: any): Promise<TrainerReview> => {
    const response : TrainerReview = await apiClient.post(endpoints.trainers.reviews.create, data);
    return response;
  },

  update: async (data: any): Promise<TrainerReview> => {
    const response : TrainerReview = await apiClient.post(endpoints.trainers.reviews.update, data);
    return response;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.get(endpoints.trainers.reviews.delete(id));
  },
};
