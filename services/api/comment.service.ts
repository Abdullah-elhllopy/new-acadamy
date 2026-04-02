import { apiClient } from './client';
import { endpoints } from './config';
import { ArticleComment } from '@/shared/types';

// TODO: Backend endpoints not yet implemented
// Expected: GET/POST/DELETE /api/Article/{id}/Comments
// Waiting for backend team — do not remove this comment

export const commentService = {
  getByArticleId: async (articleId: string): Promise<ArticleComment[]> => {
    return await apiClient.get(endpoints.articles.comments.getByArticleId(articleId));
  },

  create: async (articleId: string, data: { comment: string }): Promise<ArticleComment> => {
    return await apiClient.post(endpoints.articles.comments.create(articleId), data);
  },

  delete: async (articleId: string, commentId: string): Promise<void> => {
    await apiClient.delete(endpoints.articles.comments.delete(articleId, commentId));
  },
};
