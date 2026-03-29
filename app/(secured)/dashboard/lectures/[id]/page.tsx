'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, ArrowLeft } from 'lucide-react'
import { useCourseWithLectures, useRemoveLectureFromCourse } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero, Hero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { BackButton, Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import type { Lecture } from '@/services/api/lecture.service'
import { PageHeaderWithActions } from '@/components/dashboard'

export default function CourseLecturesPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id: courseId } = use(params)

  const { data: course, isLoading } = useCourseWithLectures(courseId)
  const removeLecture = useRemoveLectureFromCourse()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null)

  const handleDeleteClick = (lecture: Lecture) => {
    setSelectedLecture(lecture)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedLecture?.lectureid && courseId) {
      await removeLecture.mutateAsync({
        courseId,
        lectureId: selectedLecture.lectureid,
      })
      setDeleteDialogOpen(false)
      setSelectedLecture(null)
    }
  }

  const columns: DataTableColumn<Lecture>[] = [
    {
      header: 'Lecture Name',
      accessorKey: 'lecturename',
    },
    {
      header: 'Description',
      cell: (lecture) => lecture.lecturedescription || '-',
    },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Lectures', href: '/dashboard/lectures' },
          { label: course?.courseName || 'Course', href: `/dashboard/lectures/${courseId}` },
        ]}
        title={course?.courseName || 'Course Lectures'}
      >
        <div className="flex gap-2">
          <BackButton href="/dashboard/lectures" text="Back" />
          <Button asChild>
            <Link href={`/dashboard/lectures/${courseId}/add`}>
              <Plus className="mr-2 h-4 w-4" />
              Add Lecture
            </Link>
          </Button>
        </div>
      </DashboardHero>
      <ContentLayout className='py-3'>
        {course && (
          <div className="mb-4">
            <Badge variant="outline">
              Course Type: {course.courseSpecies || course.courseType || 'N/A'}
            </Badge>
          </div>
        )}

        <DataTable
          data={(course?.courseLectures as Lecture[]) || []}
          columns={columns}
          isLoading={isLoading}
          actions={[
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No lectures found',
            description: 'Get started by adding your first lecture',
            action: {
              label: 'Add Lecture',
              href: `/dashboard/lectures/${courseId}/add`,
            },
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Lecture"
        description={`Are you sure you want to delete "${selectedLecture?.lecturename}"? This action cannot be undone.`}
        isLoading={removeLecture.isPending}
      />
    </>
  )
}
