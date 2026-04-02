import { apiClient } from './client';
import { endpoints } from './config';
import { ArticleRating } from '@/shared/types';

// TODO: Backend endpoints not yet implemented
// Expected: GET/POST /api/Article/{id}/Rate
// Waiting for backend team — do not remove this comment

export const ratingService = {
  getByArticleId: async (articleId: string): Promise<ArticleRating> => {
    return apiClient.get(endpoints.articles.rating.getByArticleId(articleId));
  },

  rate: async (articleId: string, rating: number): Promise<ArticleRating> => {
    return await apiClient.post(endpoints.articles.rating.rate(articleId), { rating });
  },
};
