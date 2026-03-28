'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, ArrowLeft } from 'lucide-react'
import { useSubDepartmentsByMain, useDeleteSubDepartment, useMainDepartment } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import type { SubDepartment } from '@/services/api'

export default function SubDepartmentsPage({ params }: { params: { mainDepartmentId: string } }) {
  const router = useRouter()
  const { data: mainDepartment, isLoading: mainLoading } = useMainDepartment(params.mainDepartmentId)
  const { data: subDepartments, isLoading } = useSubDepartmentsByMain(params.mainDepartmentId)
  const deleteSubDepartment = useDeleteSubDepartment()
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedSubDepartment, setSelectedSubDepartment] = useState<SubDepartment | null>(null)

  const handleDeleteClick = (subDept: SubDepartment) => {
    setSelectedSubDepartment(subDept)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedSubDepartment?.subDepartmentId) {
      await deleteSubDepartment.mutateAsync(selectedSubDepartment.subDepartmentId)
      setDeleteDialogOpen(false)
      setSelectedSubDepartment(null)
    }
  }

  const columns: DataTableColumn<SubDepartment>[] = [
    {
      header: 'Sub Department Name',
      accessorKey: 'subDepartmentName',
    },
    {
      header: 'Description',
      cell: (dept) => dept.subDepartmentDescription || 'N/A',
    },
    {
      header: 'Status',
      cell: (dept) => (
        <StatusBadge 
          status={dept.isActive ? 'active' : 'inactive'} 
          label={dept.isActive ? 'Active' : 'Inactive'} 
        />
      ),
    },
  ]

  if (mainLoading) {
    return (
      <>
        <DashboardHero title="Loading..." />
        <ContentLayout>
          <Skeleton className="h-96 w-full" />
        </ContentLayout>
      </>
    )
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Departments', href: '/dashboard/departments/main' },
          { label: 'Main Departments', href: '/dashboard/departments/main' },
          { label: mainDepartment?.mainDepartmentName || 'Sub Departments', href: `/dashboard/departments/${params.mainDepartmentId}/sub` },
        ]}
        title={`Sub Departments - ${mainDepartment?.mainDepartmentName || ''}`}
      >
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/departments/main">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Main Departments
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/departments/${params.mainDepartmentId}/sub/add`}>
              <Plus className="mr-2 h-4 w-4" />
              Add Sub Department
            </Link>
          </Button>
        </div>
      </DashboardHero>

      <ContentLayout>
        <DataTable
          data={subDepartments || []}
          columns={columns}
          isLoading={isLoading}
          actions={[
            tableActions.delete(handleDeleteClick),
          ]}
          emptyState={{
            title: 'No sub departments found',
            description: 'Get started by creating your first sub department',
            action: {
              label: 'Add Sub Department',
              href: `/dashboard/departments/${params.mainDepartmentId}/sub/add`,
            },
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Sub Department"
        description={`Are you sure you want to delete "${selectedSubDepartment?.subDepartmentName}"? This action cannot be undone.`}
        isLoading={deleteSubDepartment.isPending}
      />
    </>
  )
}
