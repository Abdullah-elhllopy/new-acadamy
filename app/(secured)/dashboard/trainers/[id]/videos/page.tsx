'use client'

import { use, useState } from 'react'
import { useTrainerVideosByTrainerId, useDeleteTrainerVideo } from '@/hooks/api/use-trainer-videos'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/dashboard/data-table'
// import { LoadingSpinner } from '@/components/states'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { TrainerVideoForm } from '@/components/forms/trainer-video-form'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/states/empty-state'
import { DetailPageLoader } from '@/components/shared/loader/detail-page-loader'

export default function TrainerVideosPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: videos, isLoading } = useTrainerVideosByTrainerId(id)
  const deleteVideo = useDeleteTrainerVideo()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingVideo, setEditingVideo] = useState<any>(null)

  const columns: any[] = [
    {
      header: 'Title',
      cell: (row: any) => (
        <div>
          <div className="font-medium">{row.titleEn}</div>
          <div className="text-sm text-muted-foreground">{row.titleAr}</div>
        </div>
      ),
    },
    {
      header: 'Duration',
      cell: (row: any) => row.duration ? `${row.duration} min` : 'N/A',
    },
    {
      header: 'Views',
      cell: (row: any) => row.views || 0,
    },
    {
      header: 'Status',
      cell: (row: any) => (
        <Badge variant={row.published ? 'default' : 'secondary'}>
          {row.published ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      cell: (row: any) => (
        <div className="flex justify-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => window.open(row.videoUrl, '_blank')}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setEditingVideo(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              if (confirm('Are you sure you want to delete this video?')) {
                deleteVideo.mutate(row.id)
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  if (isLoading) {
    return <DetailPageLoader />
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Trainers', href: '/dashboard/trainers' },
          { label: 'Videos', href: `/dashboard/trainers/${id}/videos` },
        ]}
        title="Trainer Videos"
      >
        <div className="flex gap-2">
          <BackButton href="/dashboard/trainers" text="Back to Trainers" />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Video
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Video</DialogTitle>
              </DialogHeader>
              <TrainerVideoForm
                trainerId={id}
                onSuccess={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </DashboardHero>

      <ContentLayout>
        <Card>
          <CardContent className="p-6">
            {videos && videos.length > 0 ? (
              <DataTable columns={columns} data={videos} />
            ) : (
              <EmptyState
                title="No videos yet"
                description="Start by adding your first video"
              />
            )}
          </CardContent>
        </Card>
      </ContentLayout>

      {editingVideo && (
        <Dialog open={!!editingVideo} onOpenChange={() => setEditingVideo(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Video</DialogTitle>
            </DialogHeader>
            <TrainerVideoForm
              trainerId={id}
              video={editingVideo}
              onSuccess={() => setEditingVideo(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
