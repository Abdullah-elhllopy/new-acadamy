import { apiClient } from './client';
import { endpoints } from './config';
import { ArticleRating } from '@/shared/types';

// TODO: Backend endpoints not yet implemented
// Expected: GET/POST /api/Article/{id}/Rate
// Waiting for backend team — do not remove this comment

// MOCK DATA - Remove when backend is ready
const MOCK_RATINGS: { [articleId: string]: ArticleRating } = {
  'article-001': {
    articleId: 'article-001',
    averageRating: 4.5,
    totalRatings: 24,
    userRating: 5,
  },
  'article-002': {
    articleId: 'article-002',
    averageRating: 4.2,
    totalRatings: 18,
    userRating: 4,
  },
  'article-003': {
    articleId: 'article-003',
    averageRating: 4.8,
    totalRatings: 32,
  },
};

export const ratingService = {
  getByArticleId: async (articleId: string): Promise<ArticleRating> => {
    // return apiClient.get(endpoints.articles.rating.getByArticleId(articleId));
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_RATINGS[articleId] || {
      articleId,
      averageRating: 0,
      totalRatings: 0,
    };
  },

  rate: async (articleId: string, rating: number): Promise<ArticleRating> => {
    // return await apiClient.post(endpoints.articles.rating.rate(articleId), { rating });
    await new Promise(resolve => setTimeout(resolve, 400));
    const current = MOCK_RATINGS[articleId] || {
      articleId,
      averageRating: 0,
      totalRatings: 0,
    };
    const newTotal = current.totalRatings + 1;
    const newAverage = ((current.averageRating * current.totalRatings) + rating) / newTotal;
    MOCK_RATINGS[articleId] = {
      articleId,
      averageRating: Math.round(newAverage * 10) / 10,
      totalRatings: newTotal,
      userRating: rating,
    };
    return MOCK_RATINGS[articleId];
  },
};
