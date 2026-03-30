'use client'

import {  Download } from 'lucide-react'
import { useBeTrainerRequest } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { StatusBadge } from '@/components/dashboard/status-badge'
import Link from 'next/link'
import { use } from 'react'

export default function BeTrainerRequestDetailsPage({ params }: { params:Promise<{ id: string }> }) {
    const { id } = use(params)
  
  const { data: request, isLoading } = useBeTrainerRequest(id)

  if (isLoading) {
    return (
      <>
        <DashboardHero title="Loading..." />
        <ContentLayout>
          <Skeleton className="h-96 w-full" />
        </ContentLayout>
      </>
    )
  }

  if (!request) {
    return (
      <>
        <DashboardHero title="Request Not Found" />
        <ContentLayout>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Trainer application not found</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/requests/be-trainer">Back to Requests</Link>
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
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Requests', href: '/dashboard/requests/be-trainer' },
          { label: 'Be Trainer Requests', href: '/dashboard/requests/be-trainer' },
          { label: 'Details', href: `/dashboard/requests/be-trainer/${id}` },
        ]}
        title="Trainer Application Details"
      >
        <BackButton href="/dashboard/requests/be-trainer" text="Back to Requests" />
      </DashboardHero>

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
                  <p className="text-sm font-medium text-muted-foreground">Specialization</p>
                  <p className="text-base">{request.specialization}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Years of Experience</p>
                  <p className="text-base">{request.experience} years</p>
                </div>
              </div>

              {request.linkedin && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">LinkedIn Profile</p>
                  <a 
                    href={request.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-base text-primary hover:underline"
                  >
                    {request.linkedin}
                  </a>
                </div>
              )}

              {request.message && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Message</p>
                  <p className="text-base whitespace-pre-wrap">{request.message}</p>
                </div>
              )}

              {request.cvFile && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">CV / Resume</p>
                  <Button variant="outline" asChild>
                    <a href={request.cvFile as any} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </a>
                  </Button>
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
