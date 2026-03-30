'use client'

import { use, useState } from 'react'
import { Plus, ArrowLeft } from 'lucide-react'
import { useImagesByGroup, useDeleteImage, useImageGroup } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { BackButton, Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Image as ImageInterface } from '@/services/api/common.service'
import Image  from 'next/image'

export default function ImagesByGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: groupId } = use(params)
  const { data, isLoading } = useImagesByGroup(groupId)
  const deleteImage = useDeleteImage()
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageInterface | null>(null)

  const handleDeleteClick = (image: ImageInterface) => {
    setSelectedImage(image)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedImage?.imageId) {
      await deleteImage.mutateAsync(selectedImage.imageId)
      setDeleteDialogOpen(false)
      setSelectedImage(null)
    }
  }

  const columns: DataTableColumn<ImageInterface>[] = [
    {
      header: 'Image',
      cell: (image) => (
        <Image 
          src={image.imageSrc || '/placeholder.jpg'} 
          alt={image.text || 'Image'}
          className="h-16 w-16 object-cover rounded"
          width={48}
          height={24}
        />
      ),
    },
    {
      header: 'Title',
      cell: (image) => image.text || '-',
    },
    {
      header: 'Created At',
      cell: (image) => image.createdAt ? new Date(image.createdAt).toLocaleDateString() : '-',
    },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Images Center', href: '/dashboard/images-center' },
          { label: data?.groubName || 'Group', href: `/dashboard/images-center/${groupId}` },
        ]}
        title={data?.groubName || 'Group Images'}
      >
        <div className="flex gap-2">
          <BackButton href={`/dashboard/images-center`} />
          <Button asChild>
            <Link href={`/dashboard/images-center/${groupId}/add`}>
              <Plus className="mr-2 h-4 w-4" />
              Add Image
            </Link>
          </Button>
        </div>
      </DashboardHero>

      <ContentLayout>
        <DataTable
          data={data?.images || []}
          columns={columns}
          isLoading={isLoading}
          actions={[
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No images found',
            description: 'Get started by adding your first image to this group',
            action: {
              label: 'Add Image',
              href: `/dashboard/images-center/${groupId}/add`,
            },
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Image"
        description="Are you sure you want to delete this image? This action cannot be undone."
        isLoading={deleteImage.isPending}
      />
    </>
  )
}
