'use client'
import { use } from 'react'
import { useTrainerReviewsByTrainerId, useDeleteTrainerReview, useUpdateTrainerReview } from '@/hooks/api/use-trainer-reviews'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/dashboard/data-table'
import { Trash2, Check, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/states/empty-state'
import { DetailPageLoader } from '@/components/shared/loader/detail-page-loader'
import { SimpleAvatar } from '@/components/shared/simple-avatar'


export default function TrainerReviewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: reviews, isLoading } = useTrainerReviewsByTrainerId(id)
  const deleteReview = useDeleteTrainerReview()
  const updateReview = useUpdateTrainerReview()

  const handleApprove = (reviewId: string) => {
    updateReview.mutate({
      reviewId,
      approved: true,
    })
  }

  const handleReject = (reviewId: string) => {
    updateReview.mutate({
      reviewId,
      approved: false,
    })
  }

  const columns: any[] = [
    {
      header: 'User',
      cell: (row: any) => (
        <div className="flex items-center gap-2 min-w-37.5">
            <SimpleAvatar src={row.userAvatar} alt={row.userName} />
          <span className="whitespace-nowrap">{row.userName}</span>
        </div>
      ),
    },
    {
      header: 'Rating',
      cell: (row: any) => (
        <div className="flex items-center gap-1 min-w-30">
          {'⭐'.repeat(row.rating)}
          <span className="ml-1 text-sm text-muted-foreground whitespace-nowrap">({row.rating}/5)</span>
        </div>
      ),
    },
    {
      header: 'Comment',
      cell: (row: any) => (
        <div className="max-w-75 min-w-50 truncate" title={row.comment}>{row.comment}</div>
      ),
    },
    {
      header: 'Course',
      cell: (row: any) => <span className="whitespace-nowrap">{row.courseName || 'General'}</span>,
    },
    {
      header: 'Status',
      cell: (row: any) => (
        <Badge variant={row.approved ? 'default' : 'secondary'} className="whitespace-nowrap">
          {row.approved ? 'Approved' : 'Pending'}
        </Badge>
      ),
    },
  ]

  const actions = [
    {
      label: 'Approve',
      icon: <Check className="mr-2 h-4 w-4" />,
      onClick: (row: any) => handleApprove(row.id),
      show: (row: any) => !row.approved,
    },
    {
      label: 'Reject',
      icon: <X className="mr-2 h-4 w-4" />,
      onClick: (row: any) => handleReject(row.id),
      show: (row: any) => row.approved,
    },
    {
      label: 'Delete',
      icon: <Trash2 className="mr-2 h-4 w-4" />,
      onClick: (row: any) => {
        if (confirm('Are you sure you want to delete this review?')) {
          deleteReview.mutate(row.id)
        }
      },
      variant: 'destructive' as const,
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
          { label: 'Reviews', href: `/dashboard/trainers/${id}/reviews` },
        ]}
        title="Trainer Reviews"
      >
        <BackButton href="/dashboard/trainers" text="Back to Trainers" />
      </DashboardHero>

      <ContentLayout>
        <Card>
          <CardContent className="p-6">
            {reviews && reviews.length > 0 ? (
              <DataTable columns={columns} data={reviews} actions={actions} />
            ) : (
              <EmptyState
                title="No reviews yet"
                description="Reviews from users will appear here"
              />
            )}
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  )
}
