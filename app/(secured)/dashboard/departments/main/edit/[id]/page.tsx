'use client'

import { use, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMainDepartmentDashboard, useUpdateMainDepartment } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { mainDepartmentSchema, type MainDepartmentFormData } from '@/lib/validations'
import { MainDepartmentForm } from '../../../_components/main-department-form'
import Link from 'next/link'

export default function EditMainDepartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const { data: department, isLoading } = useMainDepartmentDashboard(id)
  const updateDepartment = useUpdateMainDepartment()

  const defaultValues = useMemo<MainDepartmentFormData>(
    () =>
      department
        ? {
            mainDepartmentName: department.name || '',
            mainDepartmentNameAr: department.nameAr || '',
            mainDepartmentDescription: department.description || '',
            mainDepartmentDescriptionAr: department.descriptionAr || '',
            isActive: true,
          }
        : {
            mainDepartmentName: '',
            mainDepartmentNameAr: '',
            mainDepartmentDescription: '',
            mainDepartmentDescriptionAr: '',
            isActive: true,
          },
    [department]
  )

  const methods = useForm<MainDepartmentFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(mainDepartmentSchema),
    defaultValues,
  })

  useEffect(() => {
    if (department) {
      methods.reset(defaultValues)
    }
  }, [department, defaultValues, methods])

  const onSubmit = async (data: MainDepartmentFormData) => {
    const payload = {
      departmentID: id,
      name: data.mainDepartmentName,
      nameAr: data.mainDepartmentNameAr,
      description: data.mainDepartmentDescription || '',
      descriptionAr: data.mainDepartmentDescriptionAr || '',
    }

    await updateDepartment.mutateAsync(payload)
    router.push('/dashboard/departments/main')
  }

  if (isLoading) {
    return (
      <>
        <DashboardHero
          breadcrumbItems={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Departments', href: '/dashboard/departments/main' },
            { label: 'Edit', href: `/dashboard/departments/main/edit/${id}` },
          ]}
          title="Loading..."
        >
          <BackButton href="/dashboard/departments/main" text="Back to Main Departments" />
        </DashboardHero>
        <ContentLayout>
          <Skeleton className="h-96 w-full" />
        </ContentLayout>
      </>
    )
  }

  if (!department) {
    return (
      <>
        <DashboardHero
          breadcrumbItems={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Departments', href: '/dashboard/departments/main' },
            { label: 'Edit', href: `/dashboard/departments/main/edit/${id}` },
          ]}
          title="Department Not Found"
        >
          <BackButton href="/dashboard/departments/main" text="Back to Main Departments" />
        </DashboardHero>
        <ContentLayout>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Department not found</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/departments/main">Back to Departments</Link>
            </Button>
          </div>
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
          { label: 'Edit', href: `/dashboard/departments/main/edit/${id}` },
        ]}
        title={`Edit: ${department.name}`}
      >
        <BackButton href="/dashboard/departments/main" text="Back to Main Departments" />
      </DashboardHero>

      <ContentLayout>
        <MainDepartmentForm
          methods={methods}
          onSubmit={onSubmit}
          isLoading={updateDepartment.isPending}
          isEdit={true}
        />
      </ContentLayout>
    </>
  )
}
