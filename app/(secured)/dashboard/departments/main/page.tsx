'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Eye } from 'lucide-react'
import { useMainDepartments, useDeleteMainDepartment } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { MainDepartment } from '@/services/api'

export default function MainDepartmentsPage() {
  const router = useRouter()
  const { data: departments, isLoading, error, refetch } = useMainDepartments()
  const deleteDepartment = useDeleteMainDepartment()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<MainDepartment | null>(null)

  const handleViewSub = (department: MainDepartment) => {
    router.push(`/dashboard/departments/${department.departmentID}/sub`)
  }
  const handleEdit = useCallback((department: MainDepartment)=>{
    router.push(`/dashboard/departments/main/edit/${department.departmentID}`)

  },[router])
  const handleDeleteClick = (department: MainDepartment) => {
    setSelectedDepartment(department)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedDepartment?.departmentID) {
      await deleteDepartment.mutateAsync(selectedDepartment.departmentID)
      setDeleteDialogOpen(false)
      setSelectedDepartment(null)
    }
  }

  const columns: DataTableColumn<MainDepartment>[] = [
    {
      header: 'Department Name',
      accessorKey: 'name',
      cell: (dept) => (
        <Link href={`/dashboard/departments/${dept.departmentID}/sub`}>
          {dept.name}
        </Link>

      ),
    },
    {
      header: 'Description',
      cell: (dept) => dept.description || 'N/A',
    },
    // {
    //   header: 'Status',
    //   cell: (dept) => (
    //     <StatusBadge
    //       status={dept.isActive ? 'active' : 'inactive'}
    //       label={dept.isActive ? 'Active' : 'Inactive'}
    //     />
    //   ),
    // },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Departments', href: '/dashboard/departments/main' },
          { label: 'Main Departments', href: '/dashboard/departments/main' },
        ]}
        title="Main Departments"
      >
        <Button asChild>
          <Link href="/dashboard/departments/main/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Main Department
          </Link>
        </Button>
      </DashboardHero>

      <ContentLayout>
        <p className="text-sm text-muted-foreground mb-4">
          Select a main department to view its sub departments
        </p>

        <DataTable
          data={departments || []}
          columns={columns}
          isLoading={isLoading}
          error={error}
          onRetry={() => refetch()}
          actions={[
            {
              label: 'View Sub Departments',
              icon: <Eye className="mr-2 h-4 w-4" />,
              onClick: handleViewSub,
            },
            tableActions.edit(handleEdit),
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No main departments found',
            description: 'Get started by creating your first main department',
            action: {
              label: 'Add Main Department',
              href: '/dashboard/departments/main/add',
            },
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Main Department"
        description={`Are you sure you want to delete "${selectedDepartment?.name}"? This will also delete all sub departments under it. This action cannot be undone.`}
        isLoading={deleteDepartment.isPending}
      />
    </>
  )
}
