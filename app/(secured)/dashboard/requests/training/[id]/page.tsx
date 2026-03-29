'use client'

import { ArrowLeft } from 'lucide-react'
import { useTrainingRequest } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { StatusBadge } from '@/components/dashboard/status-badge'
import Link from 'next/link'

export default function TrainingRequestDetailsPage({ params }: { params: { id: string } }) {
  const { data: request, isLoading } = useTrainingRequest(params.id)

  if (isLoading) {
    return (
      <>
        <Hero title="Loading..." />
        <ContentLayout>
          <Skeleton className="h-96 w-full" />
        </ContentLayout>
      </>
    )
  }

  if (!request) {
    return (
      <>
        <Hero title="Request Not Found" />
        <ContentLayout>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Training request not found</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/requests/training">Back to Requests</Link>
            </Button>
          </div>
        </ContentLayout>
      </>
    )
  }

  const statusMap = {
    pending: { status: 'pending' as const, label: 'Pending' },
    approved: { status: 'approved' as const, label: 'Approved' },
    rejected: { status: 'inactive' as const, label: 'Rejected' },
  }
  const { status, label } = statusMap[request.status || 'pending']

  return (
    <>
      <Hero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Requests', href: '/dashboard/requests/training' },
          { label: 'Training Requests', href: '/dashboard/requests/training' },
          { label: 'Details', href: `/dashboard/requests/training/${params.id}` },
        ]}
        title="Training Request Details"
      >
        <BackButton href="/dashboard/requests/training" text="Back to Requests" />
      </Hero>

      <ContentLayout>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="text-base">{request.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <StatusBadge status={status} label={label} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <a href={`mailto:${request.email}`} className="text-base text-primary hover:underline">
                    {request.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <a href={`tel:${request.phone}`} className="text-base hover:underline">
                    {request.phone}
                  </a>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Organization</p>
                  <p className="text-base">{request.organizationName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Number of Trainees</p>
                  <p className="text-base">{request.numberOfTrainees || 'N/A'}</p>
                </div>
              </div>

              {request.message && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Message</p>
                  <p className="text-base whitespace-pre-wrap">{request.message}</p>
                </div>
              )}

              {request.createdAt && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submitted On</p>
                  <p className="text-base">{new Date(request.createdAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  )
}
