'use client'

import { use, useState } from 'react'
import { useLectureComments, useDeleteComment } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { BackButton } from '@/components/ui/button'
import Link from 'next/link'
import type { Comment } from '@/services/api/lecture.service'

export default function LectureCommentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: lectureId } = use(params)
  const { data: comments, isLoading } = useLectureComments(lectureId)
  const deleteComment = useDeleteComment()
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  const handleDeleteClick = (comment: Comment) => {
    setSelectedComment(comment)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedComment?.commentId) {
      await deleteComment.mutateAsync(selectedComment.commentId)
      setDeleteDialogOpen(false)
      setSelectedComment(null)
    }
  }

  const columns: DataTableColumn<Comment>[] = [
    {
      header: 'Comment',
      accessorKey: 'commentText',
    },
    {
      header: 'User',
      accessorKey: 'userName',
    },
    {
      header: 'Email',
      accessorKey: 'userEmail',
    },
    {
      header: 'Date',
      cell: (comment) => new Date(comment.createdAt).toLocaleDateString(),
    },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Lectures', href: '/dashboard/lectures' },
          { label: 'Comments', href: `/dashboard/lectures/online-lecture-comments/${lectureId}` },
        ]}
        title="Lecture Comments"
      >
        <BackButton  href={`/dashboard/lectures/online-lecture/${lectureId}`} text="Back to Lecture" /> 
      </DashboardHero>

      <ContentLayout>
        <DataTable
          data={comments || []}
          columns={columns}
          isLoading={isLoading}
          actions={[
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No comments found',
            description: 'No comments have been posted on this lecture yet',
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        isLoading={deleteComment.isPending}
      />
    </>
  )
}
