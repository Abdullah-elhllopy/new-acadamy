'use client'

import { useEmailSubscriptions } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { DataTable, type DataTableColumn } from '@/components/dashboard/data-table'
import type { EmailSubscription } from '@/services/api'

export default function EmailSubscriptionsPage() {
  const { data: subscriptions, isLoading } = useEmailSubscriptions()

  const columns: DataTableColumn<EmailSubscription>[] = [
    {
      header: 'Email',
      cell: (subscription) => (
        <a href={`mailto:${subscription.email}`} className="text-primary hover:underline">
          {subscription.email}
        </a>
      ),
    },
    {
      header: 'Subscribed On',
      cell: (subscription) => subscription.createdAt ? new Date(subscription.createdAt).toLocaleDateString() : 'N/A',
    },
  ]

  return (
    <>
      <Hero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Requests', href: '/dashboard/requests/email-subscriptions' },
          { label: 'Email Subscriptions', href: '/dashboard/requests/email-subscriptions' },
        ]}
        title="Email Subscriptions"
      />

      <ContentLayout>
        <DataTable
          data={subscriptions || []}
          columns={columns}
          isLoading={isLoading}
          emptyState={{
            title: 'No email subscriptions found',
            description: 'Email subscriptions will appear here when users subscribe',
          }}
        />
      </ContentLayout>
    </>
  )
}
