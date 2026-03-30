'use client'

import { useContactMessages } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, type DataTableColumn } from '@/components/dashboard/data-table'
import type { ContactMessage } from '@/services/api'

export default function ContactMessagesPage() {
  const { data: messages, isLoading } = useContactMessages()

  const columns: DataTableColumn<ContactMessage>[] = [
    {
      header: 'Name',
      accessorKey: 'fullName',
    },
    {
      header: 'Email',
      cell: (message) => (
        <a href={`mailto:${message.email}`} className="text-primary hover:underline">
          {message.email}
        </a>
      ),
    },
    {
      header: 'Phone',
      cell: (message) => message.phone ? (
        <a href={`tel:${message.phone}`} className="hover:underline">
          {message.phone}
        </a>
      ) : 'N/A',
    },
    {
      header: 'Subject',
      accessorKey: 'subject',
    },
    {
      header: 'Message',
      cell: (message) => (
        <span className="line-clamp-2">{message.message}</span>
      ),
    },
    {
      header: 'Date',
      cell: (message) => message.createdAt ? new Date(message.createdAt).toLocaleDateString() : 'N/A',
    },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Requests', href: '/dashboard/requests/contact' },
          { label: 'Contact Messages', href: '/dashboard/requests/contact' },
        ]}
        title="Contact Messages"
      />

      <ContentLayout>
        <DataTable
          data={messages || []}
          columns={columns}
          isLoading={isLoading}
          emptyState={{
            title: 'No contact messages found',
            description: 'Contact messages will appear here when submitted',
          }}
        />
      </ContentLayout>
    </>
  )
}
