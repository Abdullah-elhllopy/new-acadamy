'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { usePartners, useDeletePartner } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Partner } from '@/services/api'
import Image from 'next/image'

export default function PartnersPage() {
  const { data: partners, isLoading, error, refetch } = usePartners()
  const deletePartner = useDeletePartner()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selected, setSelected] = useState<Partner | null>(null)

  const handleDeleteClick = (partner: Partner) => {
    setSelected(partner)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selected?.id) {
      await deletePartner.mutateAsync(selected.id)
      setDeleteDialogOpen(false)
      setSelected(null)
    }
  }

  const columns: DataTableColumn<Partner>[] = [
    {
      header: 'Logo',
      cell: (partner) =>
        partner.image ? (
          <div className="flex items-center justify-center">
            <Image
              src={partner.image}
              alt={partner.name}
              className="h-12 w-12 rounded-lg object-contain bg-muted p-1"
            />
          </div>
        ) : (
          <div className="rounded-lg bg-muted flex p-1 items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        ),
    },
    { header: 'Name', accessorKey: 'name' },
    {
      header: 'Website',
      cell: (partner) =>
        partner.link ? (
          <a href={partner.link} target="_blank" rel="noreferrer" className="text-primary underline truncate">
            {partner.link}
          </a>
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Partners', href: '/dashboard/partners' },
        ]}
        title="Our Partners"
      >
        <Button asChild>
          <Link href="/dashboard/partners/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Partner
          </Link>
        </Button>
      </DashboardHero>

      <ContentLayout>
        <DataTable
          data={partners || []}
          columns={columns}
          isLoading={isLoading}
          error={error}
          onRetry={() => refetch()}
          actions={[tableActions.delete(handleDeleteClick)]}
          emptyState={{
            title: 'No partners found',
            description: 'Get started by adding your first partner',
            action: { label: 'Add Partner', href: '/dashboard/partners/add' },
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Partner"
        description={`Are you sure you want to delete "${selected?.name}"? This action cannot be undone.`}
        isLoading={deletePartner.isPending}
      />
    </>
  )
}
