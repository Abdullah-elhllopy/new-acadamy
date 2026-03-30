'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Eye } from 'lucide-react'
import { useImageGroups, useDeleteImageGroup } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { ImageGroup } from '@/services/api/common.service'
import Image from 'next/image'

export default function ImagesCenterPage() {
  const router = useRouter()
  const { data: groups, isLoading } = useImageGroups()
  const deleteGroup = useDeleteImageGroup()
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<ImageGroup | null>(null)

  const handleViewImages = (group: ImageGroup) => {
    router.push(`/dashboard/images-center/${group.imageGroupId}`)
  }

  const handleDeleteClick = (group: ImageGroup) => {
    setSelectedGroup(group)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedGroup?.imageGroupId) {
      await deleteGroup.mutateAsync(selectedGroup.imageGroupId)
      setDeleteDialogOpen(false)
      setSelectedGroup(null)
    }
  }

  const columns: DataTableColumn<ImageGroup>[] = [
    {
      header: 'Group Name',
      cell: (group) => (
        <Link href={`/dashboard/images-center/${group.imageGroupId}`} className="text-blue-600 hover:underline">
          {group.groupName}
        </Link>
      ),
    },
    {
      header: 'Description',
      cell: (group) => group.groupDescription || '-',
    },
    {
      header: 'Cover Image',
      cell: (group) => group.groupImage ? (
        <Image 
          src={group.groupImage} 
          alt={group.groupName}
          className="h-12 w-12 object-cover rounded"
          width={48}
          height={24}
        />
      ) : '-',
    },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Images Center', href: '/dashboard/images-center' },
        ]}
        title="Images Center"
      >
        <Button asChild>
          <Link href="/dashboard/images-center/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Image Group
          </Link>
        </Button>
      </DashboardHero>

      <ContentLayout>
        <p className="text-sm text-muted-foreground mb-4">
          Select a group to view its images
        </p>

        <DataTable
          data={groups || []}
          columns={columns}
          isLoading={isLoading}
          actions={[
            {
              label: 'View Images',
              icon: <Eye className="mr-2 h-4 w-4" />,
              onClick: handleViewImages,
            },
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No image groups found',
            description: 'Get started by creating your first image group',
            action: {
              label: 'Add Image Group',
              href: '/dashboard/images-center/add',
            },
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Image Group"
        description={`Are you sure you want to delete "${selectedGroup?.groupName}"? This will also delete all images in this group. This action cannot be undone.`}
        isLoading={deleteGroup.isPending}
      />
    </>
  )
}
