'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { useCourses, useDeleteCourse } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Course } from '@/services/api'
import { PageHeaderWithActions } from '@/components/dashboard'

export default function CoursesPage() {
  const router = useRouter()
  const { data: courses, isLoading } = useCourses()
  const deleteCourse = useDeleteCourse()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const handleEdit = (course: Course) => {
    router.push(`/dashboard/courses/${course.courseId}`)
  }

  const handleDeleteClick = (course: Course) => {
    setSelectedCourse(course)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedCourse?.courseId) {
      await deleteCourse.mutateAsync(selectedCourse.courseId)
      setDeleteDialogOpen(false)
      setSelectedCourse(null)
    }
  }

  const columns: DataTableColumn<Course>[] = [
    {
      header: 'Course Name',
      accessorKey: 'courseName',
      cell: (course)  => (
        <Link href={`/dashboard/courses/${course.courseId}`} className="text-blue-600 hover:underline">
          {course.courseName}
        </Link>
      ),
    },
    {
      header: 'Type',
      cell: (course) => (
        <Badge variant="outline">{course.courseType}</Badge>
      ),
    },
    {
      header: 'Place',
      accessorKey: 'place',
    },
    {
      header: 'Cost',
      cell: (course) => `$${course.courseCost}`,
    },
    {
      header: 'Hours',
      accessorKey: 'courseNumberOfHours',
    },
    {
      header: 'Start Date',
      cell: (course) => course.courseStartDate,
    },
    {
      header: 'Status',
      cell: (course) => {
        if (course.now) return <StatusBadge status="active" label="Now" />
        if (course.soon) return <StatusBadge status="pending" label="Soon" />
        if (course.recommended) return <StatusBadge status="approved" label="Recommended" />
        if (course.mostSellenig) return <StatusBadge status="completed" label="Best Seller" />
        return <StatusBadge status="inactive" />
      },
    },
  ]

  return (
    <>
      <PageHeaderWithActions
        title="All Courses"
        description="Manage all training courses"
        action={{
          label: 'Add Course',
          href: '/dashboard/courses/add',
          icon: <Plus className="mr-2 h-4 w-4" />,
        }}
      />
      <ContentLayout>
        <DataTable
          data={courses?.allCoursesDetails || []}
          columns={columns}
          isLoading={isLoading}
          actions={[
            tableActions.edit(handleEdit),
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No courses found',
            description: 'Get started by creating your first course',
            action: {
              label: 'Add Course',
              href: '/dashboard/courses/add',
            },
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Course"
        description={`Are you sure you want to delete "${selectedCourse?.courseName}"? This action cannot be undone.`}
        isLoading={deleteCourse.isPending}
      />
    </>
  )
}
