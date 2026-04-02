'use client'

import { useRouter } from 'next/navigation'
import { Eye } from 'lucide-react'
import { useBeTrainerRequests } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { DataTable, type DataTableColumn } from '@/components/dashboard/data-table'
import { StatusBadge } from '@/components/dashboard/status-badge'
import type { BeTrainerRequest } from '@/services/api'

export default function BeTrainerRequestsPage() {
  const router = useRouter()
  const { data: requests, isLoading, error, refetch } = useBeTrainerRequests()

  const handleView = (request: BeTrainerRequest) => {
    router.push(`/dashboard/requests/be-trainer/${request.requestId}`)
  }

  const columns: DataTableColumn<BeTrainerRequest>[] = [
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
      header: 'Specialization',
      accessorKey: 'specialization',
    },
    {
      header: 'Experience',
      cell: (request) => `${request.experience} years`,
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
          { label: 'Requests', href: '/dashboard/requests/be-trainer' },
          { label: 'Be Trainer Requests', href: '/dashboard/requests/be-trainer' },
        ]}
        title="Be Trainer Requests"
      />

      <ContentLayout>
        <DataTable
          data={requests || []}
          columns={columns}
          isLoading={isLoading}
          error={error}
          onRetry={() => refetch()}
          actions={[
            {
              label: 'View Details',
              icon: <Eye className="mr-2 h-4 w-4" />,
              onClick: handleView,
            },
          ]}
          emptyState={{
            title: 'No trainer applications found',
            description: 'Trainer applications will appear here when submitted',
          }}
        />
      </ContentLayout>
    </>
  )
}
