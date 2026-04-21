'use client'

import { use, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSubDepartmentDashboard, useUpdateSubDepartment } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { subDepartmentSchema, type SubDepartmentFormData } from '@/lib/validations'
import { SubDepartmentForm } from '../../../../_components/sub-department-form'
import Link from 'next/link'

export default function EditSubDepartmentPage({ 
  params 
}: { 
  params: Promise<{ mainDepartmentId: string; subId: string }> 
}) {
  const router = useRouter()
  const { mainDepartmentId, subId } = use(params)
  const { data: subDepartment, isLoading } = useSubDepartmentDashboard(subId)
  const updateSubDepartment = useUpdateSubDepartment()

  const defaultValues = useMemo<SubDepartmentFormData>(
    () =>
      subDepartment
        ? {
            subDepartmentName: subDepartment.name || '',
            subDepartmentNameAr: subDepartment.nameAr || '',
            subDepartmentDescription: subDepartment.description || '',
            subDepartmentDescriptionAr: subDepartment.descriptionAr || '',
            mainDepartmentId: mainDepartmentId,
            isActive: true,
          }
        : {
            subDepartmentName: '',
            subDepartmentNameAr: '',
            subDepartmentDescription: '',
            subDepartmentDescriptionAr: '',
            mainDepartmentId: mainDepartmentId,
            isActive: true,
          },
    [subDepartment, mainDepartmentId]
  )

  const methods = useForm<SubDepartmentFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(subDepartmentSchema),
    defaultValues,
  })

  useEffect(() => {
    if (subDepartment) {
      methods.reset(defaultValues)
    }
  }, [subDepartment, defaultValues, methods])

  const onSubmit = async (data: SubDepartmentFormData) => {
    const payload = {
      subDepartmentId: subId,
      name: data.subDepartmentName,
      nameAr: data.subDepartmentNameAr,
      description: data.subDepartmentDescription || '',
      descriptionAr: data.subDepartmentDescriptionAr || '',
      mainDepartmentId: mainDepartmentId,
    }

    await updateSubDepartment.mutateAsync(payload)
    router.push(`/dashboard/departments/${mainDepartmentId}/sub`)
  }

  if (isLoading) {
    return (
      <>
        <DashboardHero
          breadcrumbItems={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Departments', href: '/dashboard/departments/main' },
            { label: 'Sub Departments', href: `/dashboard/departments/${mainDepartmentId}/sub` },
            { label: 'Edit', href: `/dashboard/departments/${mainDepartmentId}/sub/edit/${subId}` },
          ]}
          title="Loading..."
        >
          <BackButton href={`/dashboard/departments/${mainDepartmentId}/sub`} text="Back to Sub Departments" />
        </DashboardHero>
        <ContentLayout>
          <Skeleton className="h-96 w-full" />
        </ContentLayout>
      </>
    )
  }

  if (!subDepartment) {
    return (
      <>
        <DashboardHero
          breadcrumbItems={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Departments', href: '/dashboard/departments/main' },
            { label: 'Sub Departments', href: `/dashboard/departments/${mainDepartmentId}/sub` },
            { label: 'Edit', href: `/dashboard/departments/${mainDepartmentId}/sub/edit/${subId}` },
          ]}
          title="Sub Department Not Found"
        >
          <BackButton href={`/dashboard/departments/${mainDepartmentId}/sub`} text="Back to Sub Departments" />
        </DashboardHero>
        <ContentLayout>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Sub department not found</p>
            <Button asChild className="mt-4">
              <Link href={`/dashboard/departments/${mainDepartmentId}/sub`}>Back to Sub Departments</Link>
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
          { label: 'Sub Departments', href: `/dashboard/departments/${mainDepartmentId}/sub` },
          { label: 'Edit', href: `/dashboard/departments/${mainDepartmentId}/sub/edit/${subId}` },
        ]}
        title={`Edit: ${subDepartment.name}`}
      >
        <BackButton href={`/dashboard/departments/${mainDepartmentId}/sub`} text="Back to Sub Departments" />
      </DashboardHero>

      <ContentLayout>
        <SubDepartmentForm
          methods={methods}
          onSubmit={onSubmit}
          isLoading={updateSubDepartment.isPending}
          isEdit={true}
          mainDepartmentId={mainDepartmentId}
        />
      </ContentLayout>
    </>
  )
}
