'use client'

import { useRouter } from 'next/navigation'
import { Eye } from 'lucide-react'
import { useTrainingRequests } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { DataTable, type DataTableColumn } from '@/components/dashboard/data-table'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'
import type { TrainingRequest } from '@/services/api'

export default function TrainingRequestsPage() {
  const router = useRouter()
  const { data: requests, isLoading } = useTrainingRequests()

  const handleView = (request: TrainingRequest) => {
    router.push(`/dashboard/requests/training/${request.requestId}`)
  }

  const columns: DataTableColumn<TrainingRequest>[] = [
    {
      header: 'Name',
      accessorKey: 'fullName',
    },
    {
      header: 'Email',
      cell: (request) => (
        <a href={`mailto:${request.email}`} className="text-primary hover:underline">
          {request.email}
        </a>
      ),
    },
    {
      header: 'Phone',
      cell: (request) => (
        <a href={`tel:${request.phone}`} className="hover:underline">
          {request.phone}
        </a>
      ),
    },
    {
      header: 'Organization',
      accessorKey: 'organizationName',
    },
    {
      header: 'Trainees',
      accessorKey: 'numberOfTrainees',
    },
    {
      header: 'Status',
      cell: (request) => {
        const statusMap = {
          pending: { status: 'pending' as const, label: 'Pending' },
          approved: { status: 'approved' as const, label: 'Approved' },
          rejected: { status: 'inactive' as const, label: 'Rejected' },
        }
        const { status, label } = statusMap[request.status || 'pending']
        return <StatusBadge status={status} label={label} />
      },
    },
    {
      header: 'Date',
      cell: (request) => request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'N/A',
    },
  ]

  return (
    <>
      <Hero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Requests', href: '/dashboard/requests/training' },
          { label: 'Training Requests', href: '/dashboard/requests/training' },
        ]}
        title="Training Requests"
      />

      <ContentLayout>
        <DataTable
          data={requests || []}
          columns={columns}
          isLoading={isLoading}
          actions={[
            {
              label: 'View Details',
              icon: <Eye className="mr-2 h-4 w-4" />,
              onClick: handleView,
            },
          ]}
          emptyState={{
            title: 'No training requests found',
            description: 'Training requests will appear here when submitted',
          }}
        />
      </ContentLayout>
    </>
  )
}
