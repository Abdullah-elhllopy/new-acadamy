'use client'

import { useState } from 'react'
import { useDeleteComment } from '@/hooks/api/use-comments'
import { DataTable, DataTableColumn } from '@/components/dashboard/data-table'
import { Button } from '@/components/ui/button'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { Badge } from '@/components/ui/badge'
import { Trash2, Check, X } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { format } from 'date-fns'
import type { ArticleComment } from '@/shared/types'

export default function CommentsPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  // TODO: Replace with actual hook that fetches all comments across all articles
  const comments: ArticleComment[] = []
  const isLoading = false
  const deleteComment = useDeleteComment()
  const [deleteData, setDeleteData] = useState<{ articleId: string; commentId: string } | null>(null)

  const columns: DataTableColumn<ArticleComment>[] = [
    {
      header: isArabic ? 'المستخدم' : 'User',
      accessorKey: 'userName',
    },
    {
      header: isArabic ? 'التعليق' : 'Comment',
      accessorKey: 'comment',
      cell: (row: ArticleComment) => (
        <div className="max-w-md truncate">{row.comment}</div>
      ),
    },
    {
      header: isArabic ? 'الحالة' : 'Status',
      accessorKey: 'approved',
      cell: (row: ArticleComment) => (
        <Badge variant={row.approved ? 'default' : 'secondary'}>
          {row.approved ? (isArabic ? 'موافق عليه' : 'Approved') : (isArabic ? 'قيد المراجعة' : 'Pending')}
        </Badge>
      ),
    },
    {
      header: isArabic ? 'التاريخ' : 'Date',
      accessorKey: 'createdAt',
      cell: (row: ArticleComment) => format(new Date(row.createdAt), 'PP'),
    },
    {
      header: isArabic ? 'الإجراءات' : 'Actions',
      cell: (row: ArticleComment) => (
        <div className="flex gap-2">
          {!row.approved && (
            <Button variant="ghost" size="sm">
              <Check className="h-4 w-4 text-green-600" />
            </Button>
          )}
          <Button variant="ghost" size="sm">
            <X className="h-4 w-4 text-orange-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteData({ articleId: row.articleId, commentId: row.id })}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">
        {isArabic ? 'إدارة التعليقات' : 'Comments Management'}
      </h1>

      <DataTable
        columns={columns}
        data={comments || []}
        isLoading={isLoading}
      />

      <ConfirmDeleteDialog
        open={!!deleteData}
        onOpenChange={(open) => !open && setDeleteData(null)}
        onConfirm={() => {
          if (deleteData) {
            deleteComment.mutate(deleteData)
            setDeleteData(null)
          }
        }}
        title={isArabic ? 'حذف التعليق' : 'Delete Comment'}
        description={isArabic ? 'هل أنت متأكد من حذف هذا التعليق؟' : 'Are you sure you want to delete this comment?'}
      />
    </div>
  )
}
