'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useUserTrainingRequestsByCourse, useRemoveUserFromCourse } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { UserTrainingRequest } from '@/services/api'

export default function UserTrainingRequestsByCourse({ params }: { params: { id: string } }) {
  const { data: requests, isLoading } = useUserTrainingRequestsByCourse(params.id)
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
        courseId: params.id, 
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
      <Hero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Requests', href: '/dashboard/requests/user-training' },
          { label: 'User Training Requests', href: '/dashboard/requests/user-training' },
          { label: 'Course Requests', href: `/dashboard/requests/user-training/${params.id}` },
        ]}
        title="User Training Requests for Course"
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/requests/user-training">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
        </Button>
      </Hero>

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
