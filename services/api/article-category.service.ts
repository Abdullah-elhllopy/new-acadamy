import { apiClient } from './client';
import { endpoints } from './config';
import { ArticleCategory } from '@/shared/types';

// TODO: Backend endpoints not yet implemented
// Expected: GET/POST/DELETE /api/Article-Category/*
// Waiting for backend team — do not remove this comment

export const articleCategoryService = {
  getAll: async (): Promise<ArticleCategory[]> => {
    return await apiClient.get(endpoints.articleCategories.getAll);
  },

  getById: async (id: string): Promise<ArticleCategory> => {
    return await apiClient.get(endpoints.articleCategories.getById(id));
  },

  create: async (data: any): Promise<ArticleCategory> => {
    return await apiClient.post(endpoints.articleCategories.create, data);
  },

  update: async (data: any): Promise<ArticleCategory> => {
    return await apiClient.post(endpoints.articleCategories.update, data);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.get(endpoints.articleCategories.delete(id));
  },
};
