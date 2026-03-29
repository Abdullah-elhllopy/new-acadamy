'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { useCourseWithLectures, useRemoveLectureFromCourse } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { BackButton, Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import type { Chapter } from '@/services/api/lecture.service'

export default function OnlineChaptersPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id: courseId } = use(params)
  
  const { data: course, isLoading } = useCourseWithLectures(courseId)
  const removeLecture = useRemoveLectureFromCourse()
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)

  const handleViewLectures = (chapter: Chapter) => {
    router.push(`/dashboard/lectures/online-lectures/${chapter.chapterId}`)
  }

  const handleDeleteClick = (chapter: Chapter) => {
    setSelectedChapter(chapter)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedChapter?.chapterId && courseId) {
      await removeLecture.mutateAsync({
        courseId,
        lectureId: selectedChapter.chapterId,
      })
      setDeleteDialogOpen(false)
      setSelectedChapter(null)
    }
  }

  const columns: DataTableColumn<Chapter>[] = [
    {
      header: 'Chapter Name',
      cell: (chapter) => (
        <button
          onClick={() => handleViewLectures(chapter)}
          className="text-primary hover:underline"
        >
          {chapter.chaptername}
        </button>
      ),
    },
    {
      header: 'Number of Lectures',
      cell: (chapter) => chapter.lectures?.length || 0,
    },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Lectures', href: '/dashboard/lectures' },
          { label: course?.courseName || 'Course', href: `/dashboard/lectures/online-chapters/${courseId}` },
        ]}
        title={course?.courseName || 'Course Chapters'}
      >
        <div className="flex gap-2">
          <BackButton href="/dashboard/lectures" text="Back" />
          <Button asChild>
            <Link href={`/dashboard/lectures/online-chapters/${courseId}/add`}>
              <Plus className="mr-2 h-4 w-4" />
              Add Chapter
            </Link>
          </Button>
        </div>
      </DashboardHero>

      <ContentLayout>
        {course && (
          <div className="mb-4">
            <Badge variant="outline">
              Course Type: {course.courseSpecies || course.courseType || 'N/A'}
            </Badge>
          </div>
        )}

        <DataTable
          data={(course?.courseLectures as Chapter[]) || []}
          columns={columns}
          isLoading={isLoading}
          actions={[
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No chapters found',
            description: 'Get started by adding your first chapter',
            action: {
              label: 'Add Chapter',
              href: `/dashboard/lectures/online-chapters/${courseId}/add`,
            },
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Chapter"
        description={`Are you sure you want to delete "${selectedChapter?.chaptername}"? This action cannot be undone.`}
        isLoading={removeLecture.isPending}
      />
    </>
  )
}
