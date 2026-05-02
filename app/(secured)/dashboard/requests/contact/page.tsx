'use client'

import  { useState } from 'react'
import { useContactMessages, useSearchContactMessages, useDeleteContactMessage } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, type DataTableColumn } from '@/components/dashboard/data-table'
import type { ContactMessage } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Trash2, Eye } from 'lucide-react'
import { ConfirmDeleteDialog } from '@/components/dashboard'

export default function ContactMessagesPage() {
  const { data: messages, isLoading, error, refetch } = useContactMessages()
  // const searchMessages = useSearchContactMessages()
  const deleteMessage = useDeleteContactMessage()
  const [deleteId, setDeleteId] = useState<string | null>(null)

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
      header: 'Actions',
      cell: (message) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // View message details - could open a modal or navigate
              alert(`Message from ${message.fullName}:\n\n${message.message}`)
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteId(message.id!)}
            disabled={deleteMessage.isPending}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
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
          error={error}
          onRetry={() => refetch()}
          emptyState={{
            title: 'No contact messages found',
            description: 'Contact messages will appear here when submitted',
          }}
        />
        <ConfirmDeleteDialog
          open={!!deleteId}
          onOpenChange={(open) => !open && setDeleteId(null)}
          onConfirm={() => {
            if (deleteId) {
              deleteMessage.mutate(deleteId)
              setDeleteId(null)
            }
          }}
          title="Delete Message"
          description="Are you sure you want to delete this message?"
        />
      </ContentLayout>
    </>
  )
}
