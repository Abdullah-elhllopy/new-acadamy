'use client'

import { use, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useLectureTopics, useDeleteTopic } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { BackButton, Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Topic } from '@/services/api/lecture.service'

export default function LectureTopicsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: lectureId } = use(params)
  const { data: topics, isLoading } = useLectureTopics(lectureId)
  const deleteTopic = useDeleteTopic()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

  const handleDeleteClick = (topic: Topic) => {
    setSelectedTopic(topic)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedTopic?.topicId) {
      await deleteTopic.mutateAsync(selectedTopic.topicId)
      setDeleteDialogOpen(false)
      setSelectedTopic(null)
    }
  }

  const columns: DataTableColumn<Topic>[] = [
    {
      header: 'Topic',
      accessorKey: 'topicText',
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
      cell: (topic) => new Date(topic.createdAt).toLocaleDateString(),
    },
  ]

  return (
    <>
      <Hero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Lectures', href: '/dashboard/lectures' },
          { label: 'Topics', href: `/dashboard/lectures/online-lecture-topics/${lectureId}` },
        ]}
        title="Lecture Topics & Notes"
      >
        <BackButton href={`/dashboard/lectures/online-lecture/${lectureId}`} text="Back to Lecture" />
      </Hero>

      <ContentLayout>
        <DataTable
          data={topics || []}
          columns={columns}
          isLoading={isLoading}
          actions={[
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No topics found',
            description: 'No topics or notes have been posted on this lecture yet',
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Topic"
        description="Are you sure you want to delete this topic? This action cannot be undone."
        isLoading={deleteTopic.isPending}
      />
    </>
  )
}
