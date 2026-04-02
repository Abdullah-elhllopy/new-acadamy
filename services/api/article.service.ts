import { apiClient } from './client';
import { endpoints } from './config';
import { Article } from '@/shared/types';

// TODO: Backend endpoints not yet implemented
// Expected endpoints as per task requirements:
// - GET /api/Article/All-Articles
// - GET /api/Article/get-Article/{id}
// - POST /api/Article/Create-Article
// - POST /api/Article/Update-Article
// - DELETE /api/Article/Delete-Article/{id}
// - GET /api/Article/Filter-Articles
// Waiting for backend team — do not remove this comment

export const articleService = {
  getAll: async (params?: { search?: string; categoryId?: string }): Promise<Article[]> => {
    let url: string = endpoints.articles.getAll;
    if (params?.search) {
      url = endpoints.articles.search(params.search);
    } else if (params?.categoryId) {
      url = endpoints.articles.getByCategory(params.categoryId);
    }
    const response :Article[] = await apiClient.get(url);
    return response;
  },

  getById: async (id: string): Promise<Article> => {
    const response :Article = await apiClient.get(endpoints.articles.getById(id));
    return response;
  },

  create: async (formData: FormData): Promise<Article> => {
    const response :Article = await apiClient.postFormData(endpoints.articles.create, formData);
    return response;
  },

  update: async (formData: FormData): Promise<Article> => {
    const response :Article = await apiClient.postFormData(endpoints.articles.update, formData);
    return response;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.get(endpoints.articles.delete(id));
  },
};
