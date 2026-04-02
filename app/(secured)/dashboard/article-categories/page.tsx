'use client'

import { useState } from 'react'
import { useArticleCategories, useDeleteArticleCategory } from '@/hooks/api/use-article-categories'
import { DataTable, DataTableColumn } from '@/components/dashboard/data-table'
import { Button } from '@/components/ui/button'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import type { ArticleCategory } from '@/shared/types'

export default function ArticleCategoriesPage() {
  const { isArabic } = useLanguage()
  const { data: categories, isLoading ,refetch, error } = useArticleCategories()
  const deleteCategory = useDeleteArticleCategory()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const columns: DataTableColumn<ArticleCategory>[] = [
    {
      header: isArabic ? 'الاسم (إنجليزي)' : 'Name (English)',
      accessorKey: 'nameEn',
    },
    {
      header: isArabic ? 'الاسم (عربي)' : 'Name (Arabic)',
      accessorKey: 'nameAr',
    },
    {
      header: isArabic ? 'عدد المقالات' : 'Article Count',
      accessorKey: 'articleCount',
    },
    {
      header: isArabic ? 'الإجراءات' : 'Actions',
      cell: (row: ArticleCategory) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Pencil className="h-4 w-4" />
          </Button>
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
          {isArabic ? 'فئات المقالات' : 'Article Categories'}
        </h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {isArabic ? 'إضافة فئة' : 'Add Category'}
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={categories || []}
        isLoading={isLoading} 
        error={error}
        onRetry={refetch}
      />

      <ConfirmDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteCategory.mutate(deleteId)
            setDeleteId(null)
          }
        }}
        title={isArabic ? 'حذف الفئة' : 'Delete Category'}
        description={isArabic ? 'هل أنت متأكد من حذف هذه الفئة؟' : 'Are you sure you want to delete this category?'}
      />
    </div>
  )
}
