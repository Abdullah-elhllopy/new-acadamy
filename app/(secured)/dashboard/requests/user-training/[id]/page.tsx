'use client'

import { use, useState } from 'react'
import { useUserTrainingRequestsByCourse, useRemoveUserFromCourse } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { BackButton, Button } from '@/components/ui/button'
import Link from 'next/link'
import type { UserTrainingRequest } from '@/services/api'

export default function UserTrainingRequestsByCourse({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: requests, isLoading } = useUserTrainingRequestsByCourse(id)
  const removeUser = useRemoveUserFromCourse()
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<UserTrainingRequest | null>(null)

  const handleDeleteClick = (request: UserTrainingRequest) => {
    setSelectedRequest(request)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedRequest) {
      await removeUser.mutateAsync({ 
        courseId: id, 
        userId: selectedRequest.userId 
      })
      setDeleteDialogOpen(false)
      setSelectedRequest(null)
    }
  }

  const columns: DataTableColumn<UserTrainingRequest>[] = [
    {
      header: 'Name',
      accessorKey: 'userName',
    },
    {
      header: 'Email',
      cell: (request) => (
        <a href={`mailto:${request.userEmail}`} className="text-primary hover:underline">
          {request.userEmail}
        </a>
      ),
    },
    {
      header: 'Phone',
      cell: (request) => (
        <a href={`tel:${request.userPhone}`} className="hover:underline">
          {request.userPhone}
        </a>
      ),
    },
    {
      header: 'Course',
      accessorKey: 'courseName',
    },
    {
      header: 'Country',
      accessorKey: 'country',
    },
    {
      header: 'Number of Trainees',
      accessorKey: 'numberofPersones',
    },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Requests', href: '/dashboard/requests/user-training' },
          { label: 'User Training Requests', href: '/dashboard/requests/user-training' },
          { label: 'Course Requests', href: `/dashboard/requests/user-training/${id}` },
        ]}
        title="User Training Requests for Course"
      >
        <BackButton href="/dashboard/requests/user-training" text="Back to Courses" />
      </DashboardHero>

      <ContentLayout>
        <DataTable
          data={requests || []}
          columns={columns}
          isLoading={isLoading}
          actions={[
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No training requests found',
            description: 'No users have requested training for this course yet',
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Remove User from Course"
        description={`Are you sure you want to remove "${selectedRequest?.userName}" from this course? This action cannot be undone.`}
        isLoading={removeUser.isPending}
      />
    </>
  )
}
