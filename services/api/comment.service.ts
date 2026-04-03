import { apiClient } from './client';
import { endpoints } from './config';
import { ArticleComment } from '@/shared/types';

// TODO: Backend endpoints not yet implemented
// Expected: GET/POST/DELETE /api/Article/{id}/Comments
// Waiting for backend team — do not remove this comment

// MOCK DATA - Remove when backend is ready
const MOCK_COMMENTS: ArticleComment[] = [
  {
    id: 'comment-001',
    articleId: 'article-001',
    userId: 'user-001',
    userName: 'Ahmed Hassan',
    userAvatar: '/avatars/user1.jpg',
    comment: 'Great article! Very informative and well-written.',
    approved: true,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: 'comment-002',
    articleId: 'article-001',
    userId: 'user-002',
    userName: 'Sara Mohammed',
    userAvatar: '/avatars/user2.jpg',
    comment: 'Thanks for sharing this valuable information.',
    approved: true,
    createdAt: new Date('2024-01-26'),
    updatedAt: new Date('2024-01-26'),
  },
  {
    id: 'comment-003',
    articleId: 'article-002',
    userId: 'user-003',
    userName: 'Omar Ali',
    userAvatar: '/avatars/user3.jpg',
    comment: 'Excellent explanation of the concepts!',
    approved: true,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: 'comment-004',
    articleId: 'article-001',
    userId: 'user-004',
    userName: 'Fatima Abdullah',
    comment: 'Looking forward to more articles like this.',
    approved: false,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
];

export const commentService = {
  getByArticleId: async (articleId: string): Promise<ArticleComment[]> => {
    // return await apiClient.get(endpoints.articles.comments.getByArticleId(articleId));
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_COMMENTS.filter(c => c.articleId === articleId && c.approved);
  },

  create: async (articleId: string, data: { comment: string }): Promise<ArticleComment> => {
    // return await apiClient.post(endpoints.articles.comments.create(articleId), data);
    await new Promise(resolve => setTimeout(resolve, 500));
    const newComment: ArticleComment = {
      id: `comment-${Date.now()}`,
      articleId,
      userId: 'user-current',
      userName: 'Current User',
      comment: data.comment,
      approved: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_COMMENTS.push(newComment);
    return newComment;
  },

  delete: async (articleId: string, commentId: string): Promise<void> => {
    // await apiClient.delete(endpoints.articles.comments.delete(articleId, commentId));
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = MOCK_COMMENTS.findIndex(c => c.id === commentId && c.articleId === articleId);
    if (index > -1) MOCK_COMMENTS.splice(index, 1);
  },
};
