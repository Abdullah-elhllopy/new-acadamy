'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useCreateSubDepartment, useMainDepartment } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { Form, FormField } from '@/components/forms'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { subDepartmentSchema, type SubDepartmentFormData } from '@/lib/validations'
import Link from 'next/link'
import { use } from 'react'

export default function AddSubDepartmentPage({ params }: { params: Promise<{ mainDepartmentId: string }> }) {
  const router = useRouter();
  const { mainDepartmentId } = use(params)
  const { data: mainDepartment, isLoading: mainLoading } = useMainDepartment(mainDepartmentId)
  const createSubDepartment = useCreateSubDepartment()

  const methods = useForm<SubDepartmentFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(subDepartmentSchema),
    defaultValues: {
      subDepartmentName: '',
      subDepartmentDescription: '',
      mainDepartmentId: mainDepartmentId,
      isActive: true,
    },
  })
  const onSubmit = async (data: SubDepartmentFormData) => {
    const formData = new FormData()
    const form_Data = {
      "name": data.subDepartmentName,
      "mainDeptId": mainDepartmentId,
      "description": data.subDepartmentDescription,
      "isActive": data.isActive
    }
    formData.append('name', data.subDepartmentName)
    formData.append('mainDeptId', mainDepartmentId)

    if (data.subDepartmentDescription) {
      formData.append('description', data.subDepartmentDescription)
    }

    formData.append('isActive', data.isActive ? 'true' : 'false')

    await createSubDepartment.mutateAsync(form_Data)
    router.push(`/dashboard/departments/${mainDepartmentId}/sub`)
  }

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
          { label: mainDepartment?.name || 'Sub Departments', href: `/dashboard/departments/${mainDepartmentId}/sub` },
          { label: 'Add', href: `/dashboard/departments/${mainDepartmentId}/sub/add` },
        ]}
        title={`Add Sub Department `}
      >
        <BackButton href={`/dashboard/departments/${mainDepartmentId}/sub`} text="Back to Sub Departments" />
      </DashboardHero>

      <ContentLayout>
        <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sub Department Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  name="subDepartmentName"
                  label="Sub Department Name"
                  placeholder="Enter sub department name"
                  required
                />

                <FormField
                  name="subDepartmentDescription"
                  label="Description"
                  type="textarea"
                  placeholder="Enter sub department description (optional)"
                  rows={4}
                />

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isActive"
                    {...methods.register('isActive')}
                    defaultChecked
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Active Sub Department
                  </Label>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-start gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href={`/dashboard/departments/${mainDepartmentId}/sub`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={createSubDepartment.isPending}>
                {createSubDepartment.isPending ? 'Creating...' : 'Create Sub Department'}
              </Button>
            </div>
          </div>
        </Form>
      </ContentLayout>
    </>
  )
}
