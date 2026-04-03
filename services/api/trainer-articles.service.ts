import { apiClient } from './client';
import { endpoints } from './config';
import { TrainerArticle } from '@/shared/types';

// TODO: Backend endpoints not yet implemented
// Waiting for backend team — do not remove this comment

// MOCK DATA - Remove when backend is ready
const MOCK_ARTICLES: TrainerArticle[] = [
  {
    id: 'article-001',
    trainerId: 'trainer-001',
    titleEn: 'Best Practices in Modern Web Development',
    titleAr: 'أفضل الممارسات في تطوير الويب الحديث',
    contentEn: 'In this comprehensive guide, we explore the best practices for modern web development...',
    contentAr: 'في هذا الدليل الشامل، نستكشف أفضل الممارسات لتطوير الويب الحديث...',
    excerpt: 'Learn the essential best practices for modern web development',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    category: 'Web Development',
    tags: ['JavaScript', 'React', 'Best Practices'],
    views: 450,
    published: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 'article-002',
    trainerId: 'trainer-001',
    titleEn: 'Understanding TypeScript Generics',
    titleAr: 'فهم الأنواع العامة في تايب سكريبت',
    contentEn: 'TypeScript generics provide a way to create reusable components...',
    contentAr: 'توفر الأنواع العامة في تايب سكريبت طريقة لإنشاء مكونات قابلة لإعادة الاستخدام...',
    excerpt: 'Deep dive into TypeScript generics and their practical applications',
    coverImage: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51',
    category: 'TypeScript',
    tags: ['TypeScript', 'Generics', 'Advanced'],
    views: 320,
    published: true,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: 'article-003',
    trainerId: 'trainer-002',
    titleEn: 'State Management in React Applications',
    titleAr: 'إدارة الحالة في تطبيقات ريأكت',
    contentEn: 'Effective state management is crucial for building scalable React applications...',
    contentAr: 'إدارة الحالة الفعالة أمر بالغ الأهمية لبناء تطبيقات ريأكت قابلة للتوسع...',
    excerpt: 'Master state management patterns in React',
    coverImage: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc',
    category: 'React',
    tags: ['React', 'State Management', 'Redux'],
    views: 580,
    published: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
];

export const trainerArticleService = {
  getAll: async (): Promise<TrainerArticle[]> => {
    // const response : TrainerArticle[] = await apiClient.get(endpoints.trainers.articles.getAll);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_ARTICLES;
  },

  getByTrainerId: async (trainerId: string): Promise<TrainerArticle[]> => {
    // const response : TrainerArticle[] = await apiClient.get(endpoints.trainers.articles.getByTrainerId(trainerId));
    // return response;
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_ARTICLES
  },

  getById: async (id: string): Promise<TrainerArticle> => {
    // const response : TrainerArticle = await apiClient.get(`${endpoints.trainers.articles.getAll}/${id}`);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 300));
    const article = MOCK_ARTICLES.find(a => a.id === id);
    if (!article) throw new Error('Article not found');
    return article;
  },

  create: async (formData: FormData): Promise<TrainerArticle> => {
    // const response : TrainerArticle = await apiClient.postFormData(endpoints.trainers.articles.create, formData);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 500));
    const newArticle: TrainerArticle = {
      id: `article-${Date.now()}`,
      trainerId: formData.get('trainerId') as string || 'trainer-001',
      titleEn: formData.get('titleEn') as string || 'New Article',
      titleAr: formData.get('titleAr') as string || 'مقال جديد',
      contentEn: formData.get('contentEn') as string || '',
      contentAr: formData.get('contentAr') as string || '',
      excerpt: formData.get('excerpt') as string,
      coverImage: '/articles/default.jpg',
      category: formData.get('category') as string,
      tags: [],
      views: 0,
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_ARTICLES.push(newArticle);
    return newArticle;
  },

  update: async (formData: FormData): Promise<TrainerArticle> => {
    // const response : TrainerArticle = await apiClient.postFormData(endpoints.trainers.articles.update, formData);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 500));
    const id = formData.get('id') as string;
    const article = MOCK_ARTICLES.find(a => a.id === id);
    if (!article) throw new Error('Article not found');
    article.titleEn = formData.get('titleEn') as string || article.titleEn;
    article.titleAr = formData.get('titleAr') as string || article.titleAr;
    article.contentEn = formData.get('contentEn') as string || article.contentEn;
    article.contentAr = formData.get('contentAr') as string || article.contentAr;
    article.updatedAt = new Date();
    return article;
  },

  delete: async (id: string): Promise<void> => {
    // await apiClient.get(endpoints.trainers.articles.delete(id));
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = MOCK_ARTICLES.findIndex(a => a.id === id);
    if (index > -1) MOCK_ARTICLES.splice(index, 1);
  },
};
