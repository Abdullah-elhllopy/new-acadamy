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

// MOCK DATA - Remove when backend is ready
export const MOCK_ARTICLES: Article[] = [
  {
    id: 'article-001',
    titleEn: 'The Future of Web Development',
    titleAr: 'مستقبل تطوير الويب',
    contentEn: 'Web development is constantly evolving with new technologies and frameworks emerging every year. In this article, we explore the trends shaping the future of web development...',
    contentAr: 'يتطور تطوير الويب باستمرار مع ظهور تقنيات وأطر عمل جديدة كل عام...',
    excerptEn: 'Exploring the trends shaping the future of web development',
    excerptAr: 'استكشاف الاتجاهات التي تشكل مستقبل تطوير الويب',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
    categoryId: 'cat-001',
    categoryName: 'Web Development',
    authorId: 'author-001',
    authorName: 'Dr. Sarah Johnson',
    views: 1250,
    published: true,
    featured: true,
    tags: ['Web Development', 'Technology', 'Future Trends'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'article-002',
    titleEn: 'Mastering TypeScript: Advanced Techniques',
    titleAr: 'إتقان تايب سكريبت: تقنيات متقدمة',
    contentEn: 'TypeScript has become an essential tool for modern JavaScript development. This comprehensive guide covers advanced TypeScript techniques...',
    contentAr: 'أصبح تايب سكريبت أداة أساسية لتطوير جافا سكريبت الحديث...',
    excerptEn: 'A comprehensive guide to advanced TypeScript techniques',
    excerptAr: 'دليل شامل لتقنيات تايب سكريبت المتقدمة',
    coverImage: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc',
    categoryId: 'cat-002',
    categoryName: 'Programming',
    authorId: 'author-002',
    authorName: 'Prof. Michael Chen',
    views: 890,
    published: true,
    featured: false,
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: 'article-003',
    titleEn: 'Building Scalable React Applications',
    titleAr: 'بناء تطبيقات ريأكت قابلة للتوسع',
    contentEn: 'Learn how to build scalable and maintainable React applications using best practices and modern patterns...',
    contentAr: 'تعلم كيفية بناء تطبيقات ريأكت قابلة للتوسع والصيانة...',
    excerptEn: 'Best practices for building scalable React applications',
    excerptAr: 'أفضل الممارسات لبناء تطبيقات ريأكت قابلة للتوسع',
    coverImage: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51',
    categoryId: 'cat-001',
    categoryName: 'Web Development',
    authorId: 'author-001',
    authorName: 'Dr. Sarah Johnson',
    views: 1540,
    published: true,
    featured: true,
    tags: ['React', 'JavaScript', 'Architecture'],
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05'),
  },
  {
    id: 'article-004',
    titleEn: 'Introduction to Cloud Computing',
    titleAr: 'مقدمة في الحوسبة السحابية',
    contentEn: 'Cloud computing has revolutionized how we build and deploy applications. This article provides an introduction to cloud computing concepts...',
    contentAr: 'أحدثت الحوسبة السحابية ثورة في كيفية بناء ونشر التطبيقات...',
    excerptEn: 'An introduction to cloud computing concepts and services',
    excerptAr: 'مقدمة لمفاهيم وخدمات الحوسبة السحابية',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    categoryId: 'cat-003',
    categoryName: 'Cloud Computing',
    authorId: 'author-003',
    authorName: 'Ahmed Al-Rashid',
    views: 720,
    published: true,
    featured: false,
    tags: ['Cloud', 'AWS', 'Infrastructure'],
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
  },
];

export const articleService = {
  getAll: async (params?: { search?: string; categoryId?: string }): Promise<Article[]> => {
    // let url: string = endpoints.articles.getAll;
    // if (params?.search) {
    //   url = endpoints.articles.search(params.search);
    // } else if (params?.categoryId) {
    //   url = endpoints.articles.getByCategory(params.categoryId);
    // }
    // const response :Article[] = await apiClient.get(url);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 300));
    let filtered = [...MOCK_ARTICLES];
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(a =>
        a.titleEn.toLowerCase().includes(searchLower) ||
        a.titleAr.includes(params.search!) ||
        a.contentEn.toLowerCase().includes(searchLower)
      );
    }
    if (params?.categoryId) {
      filtered = filtered.filter(a => a.categoryId === params.categoryId);
    }
    return filtered;
  },

  getById: async (id: string): Promise<Article> => {
    // const response :Article = await apiClient.get(endpoints.articles.getById(id));
    // return response;
    await new Promise(resolve => setTimeout(resolve, 300));
    const article = MOCK_ARTICLES.find(a => a.id === id);
    if (!article) throw new Error('Article not found');
    return article;
  },

  create: async (formData: FormData): Promise<Article> => {
    // const response :Article = await apiClient.postFormData(endpoints.articles.create, formData);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 500));
    const newArticle: Article = {
      id: `article-${Date.now()}`,
      titleEn: formData.get('titleEn') as string || 'New Article',
      titleAr: formData.get('titleAr') as string || 'مقال جديد',
      contentEn: formData.get('contentEn') as string || '',
      contentAr: formData.get('contentAr') as string || '',
      excerptEn: formData.get('excerptEn') as string,
      excerptAr: formData.get('excerptAr') as string,
      coverImage: '/articles/default.jpg',
      categoryId: formData.get('categoryId') as string,
      categoryName: formData.get('categoryName') as string || 'General',
      authorId: 'author-current',
      authorName: 'Current Author',
      views: 0,
      published: false,
      featured: false,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_ARTICLES.push(newArticle);
    return newArticle;
  },

  update: async (formData: FormData): Promise<Article> => {
    // const response :Article = await apiClient.postFormData(endpoints.articles.update, formData);
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
    // await apiClient.get(endpoints.articles.delete(id));
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = MOCK_ARTICLES.findIndex(a => a.id === id);
    if (index > -1) MOCK_ARTICLES.splice(index, 1);
  },

  getByTrainerId: async (trainerId: string): Promise<Article[]> => {
    // const response : Article[] = await apiClient.get(endpoints.trainers.articles.getByTrainerId(trainerId));
    // return response;
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_ARTICLES
  },

};
