import { apiClient } from './client';
import { endpoints } from './config';
import { ArticleCategory } from '@/shared/types';

// TODO: Backend endpoints not yet implemented
// Expected: GET/POST/DELETE /api/Article-Category/*
// Waiting for backend team — do not remove this comment

// MOCK DATA - Remove when backend is ready
const MOCK_CATEGORIES: ArticleCategory[] = [
  {
    id: 'cat-001',
    nameEn: 'Web Development',
    nameAr: 'تطوير الويب',
    descriptionEn: 'Articles about web development, frameworks, and best practices',
    descriptionAr: 'مقالات حول تطوير الويب والأطر وأفضل الممارسات',
    slug: 'web-development',
    articleCount: 15,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'cat-002',
    nameEn: 'Programming',
    nameAr: 'البرمجة',
    descriptionEn: 'Programming languages, algorithms, and software development',
    descriptionAr: 'لغات البرمجة والخوارزميات وتطوير البرمجيات',
    slug: 'programming',
    articleCount: 23,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'cat-003',
    nameEn: 'Cloud Computing',
    nameAr: 'الحوسبة السحابية',
    descriptionEn: 'Cloud platforms, services, and infrastructure',
    descriptionAr: 'منصات وخدمات وبنية تحتية سحابية',
    slug: 'cloud-computing',
    articleCount: 12,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'cat-004',
    nameEn: 'Mobile Development',
    nameAr: 'تطوير تطبيقات الجوال',
    descriptionEn: 'iOS, Android, and cross-platform mobile development',
    descriptionAr: 'تطوير تطبيقات iOS و Android والمنصات المتعددة',
    slug: 'mobile-development',
    articleCount: 8,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'cat-005',
    nameEn: 'Data Science',
    nameAr: 'علم البيانات',
    descriptionEn: 'Machine learning, AI, and data analysis',
    descriptionAr: 'التعلم الآلي والذكاء الاصطناعي وتحليل البيانات',
    slug: 'data-science',
    articleCount: 18,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'cat-006',
    nameEn: 'DevOps',
    nameAr: 'ديف أوبس',
    descriptionEn: 'CI/CD, automation, and infrastructure as code',
    descriptionAr: 'التكامل المستمر والأتمتة والبنية التحتية كرمز',
    slug: 'devops',
    articleCount: 10,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const articleCategoryService = {
  getAll: async (): Promise<ArticleCategory[]> => {
    // return await apiClient.get(endpoints.articleCategories.getAll);
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_CATEGORIES;
  },

  getById: async (id: string): Promise<ArticleCategory> => {
    // return await apiClient.get(endpoints.articleCategories.getById(id));
    await new Promise(resolve => setTimeout(resolve, 300));
    const category = MOCK_CATEGORIES.find(c => c.id === id);
    if (!category) throw new Error('Category not found');
    return category;
  },

  create: async (data: any): Promise<ArticleCategory> => {
    // return await apiClient.post(endpoints.articleCategories.create, data);
    await new Promise(resolve => setTimeout(resolve, 500));
    const newCategory: ArticleCategory = {
      id: `cat-${Date.now()}`,
      nameEn: data.nameEn,
      nameAr: data.nameAr,
      descriptionEn: data.descriptionEn,
      descriptionAr: data.descriptionAr,
      slug: data.slug || data.nameEn.toLowerCase().replace(/\s+/g, '-'),
      articleCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_CATEGORIES.push(newCategory);
    return newCategory;
  },

  update: async (data: any): Promise<ArticleCategory> => {
    // return await apiClient.post(endpoints.articleCategories.update, data);
    await new Promise(resolve => setTimeout(resolve, 500));
    const category = MOCK_CATEGORIES.find(c => c.id === data.id);
    if (!category) throw new Error('Category not found');
    category.nameEn = data.nameEn ?? category.nameEn;
    category.nameAr = data.nameAr ?? category.nameAr;
    category.descriptionEn = data.descriptionEn ?? category.descriptionEn;
    category.descriptionAr = data.descriptionAr ?? category.descriptionAr;
    category.slug = data.slug ?? category.slug;
    category.updatedAt = new Date();
    return category;
  },

  delete: async (id: string): Promise<void> => {
    // await apiClient.get(endpoints.articleCategories.delete(id));
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = MOCK_CATEGORIES.findIndex(c => c.id === id);
    if (index > -1) MOCK_CATEGORIES.splice(index, 1);
  },
};
