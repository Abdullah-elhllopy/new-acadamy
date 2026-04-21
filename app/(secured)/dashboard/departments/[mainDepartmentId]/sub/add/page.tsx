'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateSubDepartment } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton } from '@/components/ui/button'
import { subDepartmentSchema, type SubDepartmentFormData } from '@/lib/validations'
import { SubDepartmentForm } from '../../../_components/sub-department-form'
import { use } from 'react'

export default function AddSubDepartmentPage({ params }: { params: Promise<{ mainDepartmentId: string }> }) {
  const router = useRouter();
  const { mainDepartmentId } = use(params)
  const createSubDepartment = useCreateSubDepartment()

  const methods = useForm<SubDepartmentFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(subDepartmentSchema),
    defaultValues: {
      subDepartmentName: '',
      subDepartmentNameAr: '',
      subDepartmentDescription: '',
      subDepartmentDescriptionAr: '',
      mainDepartmentId: mainDepartmentId,
      isActive: true,
    },
  })

  const onSubmit = async (data: SubDepartmentFormData) => {
    const payload = {
      name: data.subDepartmentName,
      nameAr: data.subDepartmentNameAr,
      description: data.subDepartmentDescription || '',
      descriptionAr: data.subDepartmentDescriptionAr || '',
      mainDepartmentId: mainDepartmentId,
    }

    await createSubDepartment.mutateAsync(payload)
    router.push(`/dashboard/departments/${mainDepartmentId}/sub`)
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Departments', href: '/dashboard/departments/main' },
          { label: 'Main Departments', href: '/dashboard/departments/main' },
          { label:  'Sub Departments', href: `/dashboard/departments/${mainDepartmentId}/sub` },
          { label: 'Add', href: `/dashboard/departments/${mainDepartmentId}/sub/add` },
        ]}
        title="Add Sub Department"
      >
        <BackButton href={`/dashboard/departments/${mainDepartmentId}/sub`} text="Back to Sub Departments" />
      </DashboardHero>

      <ContentLayout>
        <SubDepartmentForm
          methods={methods}
          onSubmit={onSubmit}
          isLoading={createSubDepartment.isPending}
          isEdit={false}
          mainDepartmentId={mainDepartmentId}
        />
      </ContentLayout>
    </>
  )
}
