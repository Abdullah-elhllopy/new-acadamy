'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { useTrainers, useDeleteTrainer } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { StatusBadge } from '@/components/dashboard/status-badge'
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
    router.push(`/dashboard/trainers/${trainer.instructorId}`)
  }

  const handleDeleteClick = (trainer: Trainer) => {
    setSelectedTrainer(trainer)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedTrainer?.instructorId) {
      await deleteTrainer.mutateAsync(selectedTrainer.instructorId)
      setDeleteDialogOpen(false)
      setSelectedTrainer(null)
    }
  }

  const columns: DataTableColumn<Trainer>[] = [
    {
      header: 'Name',
      accessorKey: 'instructorName',
    },
    {
      header: 'Email',
      accessorKey: 'instructorEmail',
    },
    {
      header: 'Phone',
      accessorKey: 'instructorPhone',
    },
    {
      header: 'Specialization',
      accessorKey: 'specialization',
    },
    {
      header: 'Experience',
      cell: (trainer) => trainer.experience ? `${trainer.experience} years` : 'N/A',
    },
    {
      header: 'Status',
      cell: (trainer) => (
        <StatusBadge 
          status={trainer.isActive ? 'active' : 'inactive'} 
          label={trainer.isActive ? 'Active' : 'Inactive'} 
        />
      ),
    },
  ]

  return (
    <>
      <Hero
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
      </Hero>

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
        description={`Are you sure you want to delete "${selectedTrainer?.instructorName}"? This action cannot be undone.`}
        isLoading={deleteTrainer.isPending}
      />
    </>
  )
}
