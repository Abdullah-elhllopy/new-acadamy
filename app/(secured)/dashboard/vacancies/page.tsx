'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

// Mock data - replace with actual API hook when available
const MOCK_VACANCIES = [
  {
    id: '1',
    title: 'Senior Training Consultant',
    department: 'Training & Development',
    location: 'Cairo, Egypt',
    type: 'Full-time',
    status: 'Active',
    postedDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Corporate Training Specialist',
    department: 'Corporate Services',
    location: 'Remote',
    type: 'Full-time',
    status: 'Active',
    postedDate: '2024-01-10',
  },
  {
    id: '3',
    title: 'Content Developer',
    department: 'Content & Curriculum',
    location: 'Cairo, Egypt',
    type: 'Part-time',
    status: 'Closed',
    postedDate: '2024-01-05',
  },
]

type Vacancy = typeof MOCK_VACANCIES[0]

export default function VacanciesPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selected, setSelected] = useState<Vacancy | null>(null)

  const handleDeleteClick = (vacancy: Vacancy) => {
    setSelected(vacancy)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    // TODO: Implement delete API call
    console.log('Delete vacancy:', selected?.id)
    setDeleteDialogOpen(false)
    setSelected(null)
  }

  const columns: DataTableColumn<Vacancy>[] = [
    { header: 'Title', accessorKey: 'title' },
    { header: 'Department', accessorKey: 'department' },
    { header: 'Location', accessorKey: 'location' },
    {
      header: 'Type',
      cell: (vacancy) => (
        <Badge variant="outline" className="font-normal">
          {vacancy.type}
        </Badge>
      ),
    },
    {
      header: 'Status',
      cell: (vacancy) => (
        <Badge
          variant={vacancy.status === 'Active' ? 'default' : 'secondary'}
          className="font-normal"
        >
          {vacancy.status}
        </Badge>
      ),
    },
    {
      header: 'Posted Date',
      cell: (vacancy) =>
        new Date(vacancy.postedDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
    },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Vacancies', href: '/dashboard/vacancies' },
        ]}
        title="Job Vacancies"
      >
        <Button asChild>
          <Link href="/dashboard/vacancies/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Vacancy
          </Link>
        </Button>
      </DashboardHero>

      <ContentLayout>
        <DataTable
          data={MOCK_VACANCIES}
          columns={columns}
          isLoading={false}
          error={null}
          onRetry={() => {}}
          actions={[
            tableActions.edit((vacancy) => `/dashboard/vacancies/${vacancy.id}`),
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No vacancies found',
            description: 'Get started by adding your first job vacancy',
            action: { label: 'Add Vacancy', href: '/dashboard/vacancies/add' },
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Vacancy"
        description={`Are you sure you want to delete "${selected?.title}"? This action cannot be undone.`}
        isLoading={false}
      />
    </>
  )
}
