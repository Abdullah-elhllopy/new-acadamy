// lib/metadata.ts
import { Metadata } from 'next';
import { SEO_CONFIG, Locale } from './seo-config';
import React from 'react';

interface MetadataParams {
  title: string;
  description: string;
  locale?: Locale;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  type?: 'website' | 'article' | 'profile';
}

/**
 * Generate complete metadata for a page with bilingual support
 */
export function generatePageMetadata({
  title,
  description,
  locale = 'ar',
  path = '',
  image,
  noIndex = false,
  keywords = [],
  publishedTime,
  modifiedTime,
  authors,
  type = 'website',
}: MetadataParams): Metadata {
  const siteName = SEO_CONFIG.siteName[locale];
  const fullTitle = `${title} | ${siteName}`;
  const url = `${SEO_CONFIG.baseUrl}${path}`;
  const ogImage = image || SEO_CONFIG.defaultOgImage;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${SEO_CONFIG.baseUrl}${ogImage}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: authors ? authors.map(name => ({ name })) : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_EG',
      type,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImageUrl],
      creator: SEO_CONFIG.twitterHandle,
    },
    alternates: {
      canonical: url,
      languages: {
        ar: `${SEO_CONFIG.baseUrl}/ar${path}`,
        en: `${SEO_CONFIG.baseUrl}/en${path}`,
        'x-default': url,
      },
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
      nocache: true,
    };
  }

  return metadata;
}

/**
 * Generate metadata for dashboard pages (noindex)
 */
export function generateDashboardMetadata(title: string): Metadata {
  return {
    title: `${title} | Dashboard`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

/**
 * Generate Course Schema.org JSON-LD
 */
export function generateCourseSchema(course: {
  name: string;
  description: string;
  provider: string;
  url: string;
  image?: string;
  price?: number;
  currency?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  instructor?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.provider,
      url: SEO_CONFIG.baseUrl,
    },
    url: course.url,
    ...(course.image && { image: course.image }),
    ...(course.price && {
      offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: course.currency || 'EGP',
        availability: 'https://schema.org/InStock',
      },
    }),
    ...(course.startDate && { startDate: course.startDate }),
    ...(course.endDate && { endDate: course.endDate }),
    ...(course.location && {
      location: {
        '@type': 'Place',
        name: course.location,
      },
    }),
    ...(course.instructor && {
      instructor: {
        '@type': 'Person',
        name: course.instructor,
      },
    }),
  };
}

/**
 * Generate Article Schema.org JSON-LD
 */
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image || SEO_CONFIG.defaultOgImage,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName.en,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

/**
 * Generate Breadcrumb Schema.org JSON-LD
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Person Schema.org JSON-LD (for trainer profiles)
 */
export function generatePersonSchema(person: {
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  url: string;
  email?: string;
  linkedin?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    ...(person.jobTitle && { jobTitle: person.jobTitle }),
    ...(person.description && { description: person.description }),
    ...(person.image && { image: person.image }),
    url: person.url,
    ...(person.email && { email: person.email }),
    ...(person.linkedin && {
      sameAs: [person.linkedin],
    }),
    worksFor: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName.en,
    },
  };
}

/**
 * Generate FAQ Schema.org JSON-LD
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Render JSON-LD script tag
 */
// export function renderJsonLd(data: object) {
//   return (
//     <script
//       type="application/ld+json"
//       dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
//     />
//   );
// }
// export function renderJsonLd(data: object) {
//   return React.createElement('script', {
//     type: 'application/ld+json',
//     dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
//   });
// }