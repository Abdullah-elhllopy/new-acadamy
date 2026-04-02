import { MetadataRoute } from 'next'
import { articleService } from '@/services/api'
import { caseStudyService } from '@/services/api'
import { Article, CaseStudy } from '@/shared/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://idacademy.com'

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trainers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/online-courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/presence-courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  try {
    // TODO: Replace with actual API calls when backend is ready
    // Fetch all published articles
    const articles: Article[] = await articleService.getAll()
    const articleRoutes: MetadataRoute.Sitemap = articles
      .filter((article) => article.published)
      .map((article) => ({
        url: `${baseUrl}/articles/${article.id}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      }))

    // Fetch all published case studies
    const caseStudies: CaseStudy[] = await caseStudyService.getAll()
    const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies
      .filter((caseStudy) => caseStudy.published)
      .map((caseStudy) => ({
        url: `${baseUrl}/case-studies/${caseStudy.id}`,
        lastModified: new Date(caseStudy.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      }))

    return [...staticRoutes, ...articleRoutes, ...caseStudyRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static routes if API fails
    return staticRoutes
  }
}
