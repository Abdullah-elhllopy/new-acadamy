'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'

// Mock data - replace with actual API hook when available
const MOCK_ADVISORS = [
  {
    id: '1',
    name: 'Prof. Dr. Hassan Al-Mansour',
    nameAr: 'أ.د. حسن المنصور',
    job: 'Strategic Advisor - Leadership Development',
    initials: 'HM',
  },
  {
    id: '2',
    name: 'Dr. Nadia Ibrahim',
    nameAr: 'د. نادية إبراهيم',
    job: 'Advisor - Organizational Development',
    initials: 'NI',
  },
  {
    id: '3',
    name: 'Eng. Khalid Al-Otaibi',
    nameAr: 'م. خالد العتيبي',
    job: 'Technology & Innovation Advisor',
    initials: 'KO',
  },
]

type Advisor = typeof MOCK_ADVISORS[0]

export default function AdvisoryBoardDashboardPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selected, setSelected] = useState<Advisor | null>(null)

  const handleDeleteClick = (advisor: Advisor) => {
    setSelected(advisor)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    // TODO: Implement delete API call
    console.log('Delete advisor:', selected?.id)
    setDeleteDialogOpen(false)
    setSelected(null)
  }

  const columns: DataTableColumn<Advisor>[] = [
    {
      header: 'Avatar',
      cell: (advisor) => (
        <Avatar className="w-12 h-12">
          <AvatarFallback className="bg-primary/10 text-primary font-bold">
            {advisor.initials}
          </AvatarFallback>
        </Avatar>
      ),
    },
    { header: 'Name (English)', accessorKey: 'name' },
    { header: 'Name (Arabic)', accessorKey: 'nameAr' },
    { header: 'Position', accessorKey: 'job' },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Advisory Board', href: '/dashboard/advisory-board' },
        ]}
        title="Advisory Board"
      >
        <Button asChild>
          <Link href="/dashboard/advisory-board/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Advisor
          </Link>
        </Button>
      </DashboardHero>

      <ContentLayout>
        <DataTable
          data={MOCK_ADVISORS}
          columns={columns}
          isLoading={false}
          error={null}
          onRetry={() => {}}
          actions={[
            tableActions.edit((advisor) => `/dashboard/advisory-board/${advisor.id}`),
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No advisors found',
            description: 'Get started by adding your first advisory board member',
            action: { label: 'Add Advisor', href: '/dashboard/advisory-board/add' },
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Advisor"
        description={`Are you sure you want to delete "${selected?.name}"? This action cannot be undone.`}
        isLoading={false}
      />
    </>
  )
}
