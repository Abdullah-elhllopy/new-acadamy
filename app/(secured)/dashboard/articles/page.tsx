'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useArticles, useDeleteArticle } from '@/hooks/api/use-articles'
import { DataTable, DataTableColumn } from '@/components/dashboard/data-table'
import { Button } from '@/components/ui/button'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { format } from 'date-fns'
import type { Article } from '@/shared/types'


export default function ArticlesListPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const { data: articles, isLoading , error, refetch } = useArticles()
  const deleteArticle = useDeleteArticle()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const columns: DataTableColumn<Article>[] = [
    {
      header: isArabic ? 'العنوان' : 'Title',
      accessorKey: 'titleEn',
      cell: (row: Article) => isArabic ? row.titleAr : row.titleEn,
    },
    {
      header: isArabic ? 'الفئة' : 'Category',
      accessorKey: 'categoryName',
    },
    {
      header: isArabic ? 'الكاتب' : 'Author',
      accessorKey: 'authorName',
    },
    {
      header: isArabic ? 'المشاهدات' : 'Views',
      accessorKey: 'views',
    },
    {
      header: isArabic ? 'الحالة' : 'Status',
      accessorKey: 'published',
      cell: (row: Article) => (
        <Badge variant={row.published ? 'default' : 'secondary'}>
          {row.published ? (isArabic ? 'منشور' : 'Published') : (isArabic ? 'مسودة' : 'Draft')}
        </Badge>
      ),
    },
    {
      header: isArabic ? 'التاريخ' : 'Date',
      accessorKey: 'createdAt',
      cell: (row: Article) => format(new Date(row.createdAt), 'PP'),
    },
    {
      header: isArabic ? 'الإجراءات' : 'Actions',
      cell: (row: Article) => (
        <div className="flex gap-2">
          <Link href={`/dashboard/articles/${row.id}`}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteId(row.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">
          {isArabic ? 'المقالات' : 'Articles'}
        </h1>
        <Link href="/dashboard/articles/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {isArabic ? 'إضافة مقال' : 'Add Article'}
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={articles || []}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />

      <ConfirmDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteArticle.mutate(deleteId)
            setDeleteId(null)
          }
        }}
        title={isArabic ? 'حذف المقال' : 'Delete Article'}
        description={isArabic ? 'هل أنت متأكد من حذف هذا المقال؟' : 'Are you sure you want to delete this article?'}
      />
    </div>
  )
}
