'use client'

import { useState } from 'react'
import { useArticleCategories, useDeleteArticleCategory, useCreateArticleCategory, useUpdateArticleCategory } from '@/hooks/api/use-article-categories'
import { DataTable, DataTableColumn } from '@/components/dashboard/data-table'
import { Button } from '@/components/ui/button'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { ArticleCategoryModal } from '@/components/dashboard/article-category-modal'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import type { ArticleCategory } from '@/shared/types'
import { DashboardHero } from '@/components/sections/hero'
import { ContentLayout } from '@/layout/page-layout'

export default function ArticleCategoriesPage() {
  const { isArabic } = useLanguage()
  const { data: categories, isLoading, refetch, error } = useArticleCategories()
  const deleteCategory = useDeleteArticleCategory()
  const createCategory = useCreateArticleCategory()
  const updateCategory = useUpdateArticleCategory()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<ArticleCategory | null>(null)

  const handleEdit = (category: ArticleCategory) => {
    setEditingCategory(category)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setEditingCategory(null)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setEditingCategory(null)
  }

  const handleSubmit = (data: any) => {
    if (editingCategory) {
      updateCategory.mutate(data, {
        onSuccess: () => handleModalClose(),
      })
    } else {
      createCategory.mutate(data, {
        onSuccess: () => handleModalClose(),
      })
    }
  }

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
      header: isArabic ? 'الرابط المختصر' : 'Slug',
      accessorKey: 'slug',
    },
    {
      header: isArabic ? 'عدد المقالات' : 'Article Count',
      cell: (row: ArticleCategory) => (
        <span className="font-medium">{row.articleCount}</span>
      ),
    },
    {
      header: isArabic ? 'الإجراءات' : 'Actions',
      cell: (row: ArticleCategory) => (
        <div className="flex justify-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleEdit(row)}>
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

      <DashboardHero title={isArabic ? 'إدارة فئات المقالات' : 'Manage Article Categories'} description={isArabic ? 'قم بإدارة فئات مقالاتك هنا' : 'Manage your article categories here'} >
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          {isArabic ? 'إضافة فئة' : 'Add Category'}
        </Button>
      </DashboardHero>
      <ContentLayout>
        <DataTable
          columns={columns}
          data={categories || []}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />
      </ContentLayout>

      <ArticleCategoryModal
        open={modalOpen}
        onOpenChange={handleModalClose}
        onSubmit={handleSubmit}
        category={editingCategory}
        isLoading={createCategory.isPending || updateCategory.isPending}
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
