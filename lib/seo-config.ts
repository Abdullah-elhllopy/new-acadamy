// lib/seo-config.ts
export const SEO_CONFIG = {
  siteName: {
    en: 'ID Academy - Integrated Development Academy',
    ar: 'أكاديمية التنمية المتكاملة للقيادة والإدارة',
  },
  siteDescription: {
    en: 'Professional training and development programs in leadership, business, and technical skills for corporates, governments, and NGOs.',
    ar: 'برامج تدريبية احترافية في القيادة والأعمال والمهارات التقنية للشركات والحكومات والمنظمات غير الحكومية.',
  },
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://id-academy.com',
  defaultLocale: 'ar',
  locales: ['ar', 'en'] as const,
  defaultOgImage: '/images/og-default.jpg',
  twitterHandle: '@IDacademy',
  organizationSchema: {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Academy for Integrated Development in Leadership and Management',
    alternateName: 'ID Academy',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://id-academy.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://id-academy.com'}/logo.png`,
    description: 'Professional training and development programs in leadership, business, and technical skills',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Arabic', 'English'],
    },
  },
} as const;

export type Locale = typeof SEO_CONFIG.locales[number];

export const PAGE_PRIORITIES = {
  homepage: 1.0,
  courseDetail: 0.9,
  courseListing: 0.8,
  article: 0.8,
  trainerProfile: 0.7,
  staticPages: 0.6,
} as const;

export const CHANGE_FREQUENCIES = {
  homepage: 'daily',
  courseDetail: 'weekly',
  courseListing: 'daily',
  article: 'monthly',
  trainerProfile: 'monthly',
  staticPages: 'monthly',
} as const;
