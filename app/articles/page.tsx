'use client'

import { useState } from 'react'
import { useArticles } from '@/hooks/api/use-articles'
import { useArticleCategories } from '@/hooks/api/use-article-categories'
import { ArticleCard } from '@/components/cards/article-card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/states/empty-state'
import { Search } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'

export default function ArticlesPage() {
  const { isArabic } = useLanguage()
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState<string>()

  const { data: articles, isLoading } = useArticles({ search, categoryId })
  const { data: categories } = useArticleCategories()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-12">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">
          {isArabic ? 'المقالات' : 'Articles'}
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={isArabic ? 'ابحث عن مقال...' : 'Search articles...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder={isArabic ? 'جميع الفئات' : 'All categories'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isArabic ? 'جميع الفئات' : 'All categories'}</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {isArabic ? category.nameAr : category.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!articles || articles.length === 0 ? (
          <EmptyState
            title={isArabic ? 'لا توجد مقالات' : 'No articles found'}
            description={isArabic ? 'لم يتم العثور على أي مقالات' : 'No articles match your search'}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.titleEn}
                titleAr={article.titleAr}
                category={article.categoryName || ''}
                categoryAr={article.categoryName || ''}
                description={article.excerptEn || ''}
                descriptionAr={article.excerptAr || ''}
                image={article.coverImage || '/placeholder-article.jpg'}
                author={{
                  id: article.authorId,
                  name: article.authorName,
                  nameAr: article.authorName,
                  role: 'Author',
                  roleAr: 'كاتب',
                }}
                href={`/articles/${article.id}`}
                language={isArabic ? 'ar' : 'en'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
