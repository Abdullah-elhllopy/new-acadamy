'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateMainDepartment } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton } from '@/components/ui/button'
import { mainDepartmentSchema, type MainDepartmentFormData } from '@/lib/validations'
import { MainDepartmentForm } from '../../_components/main-department-form'

export default function AddMainDepartmentPage() {
  const router = useRouter()
  const createDepartment = useCreateMainDepartment()
  const methods = useForm<MainDepartmentFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(mainDepartmentSchema),
    defaultValues: {
      mainDepartmentName: '',
      mainDepartmentNameAr: '',
      mainDepartmentDescription: '',
      mainDepartmentDescriptionAr: '',
      isActive: true,
    },
  })

  const onSubmit = async (data: MainDepartmentFormData) => {
    const payload = {
      name: data.mainDepartmentName,
      nameAr: data.mainDepartmentNameAr,
      description: data.mainDepartmentDescription || '',
      descriptionAr: data.mainDepartmentDescriptionAr || '',
    }

    await createDepartment.mutateAsync(payload)
    router.push('/dashboard/departments/main')
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Departments', href: '/dashboard/departments/main' },
          { label: 'Main Departments', href: '/dashboard/departments/main' },
          { label: 'Add', href: '/dashboard/departments/main/add' },
        ]}
        title="Add Main Department"
      >
        <BackButton href="/dashboard/departments/main" text="Back to Main Departments" />
      </DashboardHero>

      <ContentLayout>
        <MainDepartmentForm
          methods={methods}
          onSubmit={onSubmit}
          isLoading={createDepartment.isPending}
          isEdit={false}
        />
      </ContentLayout>
    </>
  )
}
