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
        <div className="flex items-center gap-2">
          {row.userAvatar && (
            <img src={row.userAvatar} alt={row.userName} className="h-8 w-8 rounded-full" />
          )}
          <span>{row.userName}</span>
        </div>
      ),
    },
    {
      header: 'Rating',
      cell: (row: any) => (
        <div className="flex items-center gap-1">
          {'⭐'.repeat(row.rating)}
          <span className="ml-1 text-sm text-muted-foreground">({row.rating}/5)</span>
        </div>
      ),
    },
    {
      header: 'Comment',
      cell: (row: any) => (
        <div className="max-w-md truncate">{row.comment}</div>
      ),
    },
    {
      header: 'Course',
      cell: (row: any) => row.courseName || 'General',
    },
    {
      header: 'Status',
      cell: (row: any) => (
        <Badge variant={row.approved ? 'default' : 'secondary'}>
          {row.approved ? 'Approved' : 'Pending'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      cell: (row: any) => (
        <div className="flex gap-2">
          {!row.approved && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleApprove(row.id)}
              title="Approve"
            >
              <Check className="h-4 w-4 text-green-600" />
            </Button>
          )}
          {row.approved && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleReject(row.id)}
              title="Reject"
            >
              <X className="h-4 w-4 text-orange-600" />
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              if (confirm('Are you sure you want to delete this review?')) {
                deleteReview.mutate(row.id)
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
              <DataTable columns={columns} data={reviews} />
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
