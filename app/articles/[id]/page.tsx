import { Metadata } from 'next'
import { articleService } from '@/services/api'
import ArticleDetailClient from './client'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  
  try {
    // TODO: Replace with actual API call when backend is ready
    const article = await articleService.getById(id)
    
    return {
      title: article.titleEn,
      description: article.contentEn.substring(0, 160),
      openGraph: {
        title: article.titleEn,
        description: article.contentEn.substring(0, 160),
        images: article.coverImage ? [{ url: article.coverImage }] : [],
        type: 'article',
        publishedTime: new Date(article.createdAt).toISOString(),
        authors: [article.authorName],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.titleEn,
        description: article.contentEn.substring(0, 160),
        images: article.coverImage ? [article.coverImage] : [],
      },
    }
  } catch {
    return {
      title: 'Article',
      description: 'Read our latest article',
    }
  }
}

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <ArticleDetailClient params={params} />
}
