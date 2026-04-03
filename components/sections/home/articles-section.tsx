'use client'


import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArticleCardProps, ArticleCard } from '../../cards/article-card';
import { useArticles } from '@/hooks/api/use-articles';
import { DataStateHandler } from '@/components/shared/data-state-handler';
import { EmptyState } from '@/components/states/empty-state';
import { useLanguage } from '@/shared/hooks/useLanguage';

export function ArticlesSection() {
  const { data: articles, isLoading, refetch, error } = useArticles()
  const { isArabic } = useLanguage()

  return (
    <section className="bg-muted text-center py-20 px-4 md:px-20">
      <h2 className="text-4xl font-bold text-primary mb-10">اقرا من مجلتنا</h2>
      <DataStateHandler listLoaderProps={{ showHeader: false, showFilters: false }} isLoading={isLoading} error={error} onRetry={refetch}>
        {!articles || articles.length === 0 ? (
          <EmptyState
            title={isArabic ? 'لا توجد مقالات' : 'No articles found'}
            description={isArabic ? 'لم يتم العثور على أي مقالات' : 'No articles match your search'}
          />
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
              />
            ))}
          </motion.div>
        )}
      </DataStateHandler>
      <Button className="bg-primary hover:bg-primary-hover text-white rounded-full px-8 py-6 text-base">
        جميع المدونات
      </Button>
    </section>
  )
}
