'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Video, FileText, Star } from 'lucide-react'
import { useTrainers, useDeleteTrainer } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Trainer } from '@/services/api'

export default function TrainersPage() {
  const router = useRouter()
  const { data: trainers, isLoading } = useTrainers()
  const deleteTrainer = useDeleteTrainer()
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null)

  const handleEdit = (trainer: Trainer) => {
    router.push(`/dashboard/trainers/${trainer.instructorid}/edit`)
  }

  const handleDeleteClick = (trainer: Trainer) => {
    setSelectedTrainer(trainer)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedTrainer?.instructorid) {
      await deleteTrainer.mutateAsync(selectedTrainer.instructorid)
      setDeleteDialogOpen(false)
      setSelectedTrainer(null)
    }
  }

  const columns: DataTableColumn<Trainer>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Specialization',
      accessorKey: 'job',
    },
    {
      header: 'Manage',
      accessorKey: 'instructorid',
      cell: (row: Trainer) => (
        <div className="flex justify-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => router.push(`/dashboard/trainers/${row.instructorid}/videos`)}
            title="Manage Videos"
          >
            <Video className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => router.push(`/dashboard/trainers/${row.instructorid}/articles`)}
            title="Manage Articles"
          >
            <FileText className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => router.push(`/dashboard/trainers/${row.instructorid}/reviews`)}
            title="Manage Reviews"
          >
            <Star className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Trainers', href: '/dashboard/trainers' },
        ]}
        title="All Trainers"
      >
        <Button asChild>
          <Link href="/dashboard/trainers/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Trainer
          </Link>
        </Button>
      </DashboardHero>

      <ContentLayout>
        <DataTable
          data={trainers || []}
          columns={columns}
          isLoading={isLoading}
          actions={[
            tableActions.edit(handleEdit),
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No trainers found',
            description: 'Get started by adding your first trainer',
            action: {
              label: 'Add Trainer',
              href: '/dashboard/trainers/add',
            },
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Trainer"
        description={`Are you sure you want to delete "${selectedTrainer?.name}"? This action cannot be undone.`}
        isLoading={deleteTrainer.isPending}
      />
    </>
  )
}
