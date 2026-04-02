'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useArticle } from '@/hooks/api/use-articles'
import { useArticleRating, useRateArticle } from '@/hooks/api/use-ratings'
import { useAuth } from '@/shared/hooks/useAuth'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { CommentsSection } from '@/components/shared/comments-section'
import { StarRating } from '@/components/ui/star-rating'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Calendar, User, Eye } from 'lucide-react'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import SimpleLoader from '@/components/shared/loader/simple-loader'

export default function ArticleDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const { isAuthenticated } = useAuth()

  const { data: article, isLoading } = useArticle(id)
  const { data: ratingData } = useArticleRating(id)
  const rateArticle = useRateArticle()

  const handleRate = (rating: number) => {
    if (isAuthenticated) {
      rateArticle.mutate({ articleId: id, rating })
    }
  }

  if (isLoading) {
    return (
      <SimpleLoader />
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            {isArabic ? 'المقال غير موجود' : 'Article not found'}
          </h1>
          <Link href="/articles" className="text-primary hover:underline">
            {isArabic ? 'العودة إلى المقالات' : 'Back to articles'}
          </Link>
        </div>
      </div>
    )
  }

  const displayTitle = isArabic ? article.titleAr : article.titleEn
  const displayContent = isArabic ? article.contentAr : article.contentEn

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: displayTitle,
              image: article.coverImage,
              author: {
                '@type': 'Person',
                name: article.authorName,
              },
              publisher: {
                '@type': 'Organization',
                name: 'ID Academy',
              },
              datePublished: article.createdAt,
              dateModified: article.updatedAt,
            }),
          }}
        />

        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                {isArabic ? 'الرئيسية' : 'Home'}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/articles">
                {isArabic ? 'المقالات' : 'Articles'}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{displayTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <article className="max-w-4xl mx-auto">
          {article.coverImage && (
            <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.coverImage}
                alt={displayTitle}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="mb-6">
            {article.categoryName && (
              <Badge variant="secondary" className="mb-4">
                {article.categoryName}
              </Badge>
            )}
            <h1 className="text-4xl font-bold text-primary mb-4">{displayTitle}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(new Date(article.createdAt), 'PPP', {
                    locale: isArabic ? ar : undefined,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{article.views} {isArabic ? 'مشاهدة' : 'views'}</span>
              </div>
            </div>
          </div>

          {ratingData && (
            <div className="mb-8 p-6 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={ratingData.averageRating} />
                    <span className="text-sm text-muted-foreground">
                      ({ratingData.averageRating.toFixed(1)}) - {ratingData.totalRatings} {isArabic ? 'تقييم' : 'ratings'}
                    </span>
                  </div>
                  {isAuthenticated && (
                    <div>
                      <p className="text-sm mb-2">
                        {isArabic ? 'قيّم هذا المقال:' : 'Rate this article:'}
                      </p>
                      <StarRating
                        rating={ratingData.userRating || 0}
                        interactive
                        onRatingChange={handleRate}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: displayContent }} />
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-4">
                {isArabic ? 'الوسوم' : 'Tags'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <CommentsSection articleId={id} />
        </article>
      </div>
    </div>
  )
}
