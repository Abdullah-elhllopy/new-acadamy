'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useSliders, useDeleteSlider } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Slider } from '@/services/api/common.service'

export default function SlidersPage() {
  const { data: sliders, isLoading } = useSliders()
  const deleteSlider = useDeleteSlider()
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedSlider, setSelectedSlider] = useState<Slider | null>(null)

  const handleDeleteClick = (slider: Slider) => {
    setSelectedSlider(slider)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedSlider?.id) {
      await deleteSlider.mutateAsync(`${selectedSlider.id}`)
      setDeleteDialogOpen(false)
      setSelectedSlider(null)
    }
  }

  const columns: DataTableColumn<Slider>[] = [
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Description',
      cell: (slider) => slider.description || '-',
    },
    {
      header: 'Image',
      cell: (slider) => slider.image || '-',
    }
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Sliders', href: '/dashboard/sliders' },
        ]}
        title="All Sliders"
      >
        <Button asChild>
          <Link href="/dashboard/sliders/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Slider
          </Link>
        </Button>
      </DashboardHero>

      <ContentLayout>
        <DataTable
          data={sliders || []}
          columns={columns}
          isLoading={isLoading}
          actions={[
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No sliders found',
            description: 'Get started by creating your first slider',
            action: {
              label: 'Add Slider',
              href: '/dashboard/sliders/add',
            },
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Slider"
        description={`Are you sure you want to delete "${selectedSlider?.title}"? This action cannot be undone.`}
        isLoading={deleteSlider.isPending}
      />
    </>
  )
}
