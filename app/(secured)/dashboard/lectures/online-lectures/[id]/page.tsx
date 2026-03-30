'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { useLecturesByChapter, useRemoveLectureFromCourse } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { BackButton, Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Lecture } from '@/services/api/lecture.service'

export default function OnlineLecturesPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id: chapterId } = use(params)

  const { data: lectures, isLoading } = useLecturesByChapter(chapterId)
  const removeLecture = useRemoveLectureFromCourse()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null)

  const handleViewLecture = (lecture: Lecture) => {
    router.push(`/dashboard/lectures/online-lecture/${lecture.lectureid}`)
  }

  const handleDeleteClick = (lecture: Lecture) => {
    setSelectedLecture(lecture)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedLecture?.lectureid && selectedLecture?.courseId) {
      await removeLecture.mutateAsync({
        courseId: selectedLecture.courseId,
        lectureId: selectedLecture.lectureid,
      })
      setDeleteDialogOpen(false)
      setSelectedLecture(null)
    }
  }

  const columns: DataTableColumn<Lecture>[] = [
    {
      header: 'Lecture Name',
      cell: (lecture) => (
        <button
          onClick={() => handleViewLecture(lecture)}
          className="text-primary hover:underline"
        >
          {lecture.lecturename}
        </button>
      ),
    },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Lectures', href: '/dashboard/lectures' },
          { label: 'Chapter', href: `/dashboard/lectures/online-lectures/${chapterId}` },
        ]}
        title="Chapter Lectures"
      >
        <div className="flex gap-2">
          <BackButton href="/dashboard/lectures" text="Back" />
          <Button asChild>
            <Link href={`/dashboard/lectures/online-lectures/${chapterId}/add`}>
              <Plus className="mr-2 h-4 w-4" />
              Add Lecture
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/lectures/online-lectures/${chapterId}/add-questions`}>
              <Plus className="mr-2 h-4 w-4" />
              Add Questions
            </Link>
          </Button>
        </div>
      </DashboardHero>

      <ContentLayout>
        <DataTable
          data={lectures || []}
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
              href: `/dashboard/lectures/online-lectures/${chapterId}/add`,
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
