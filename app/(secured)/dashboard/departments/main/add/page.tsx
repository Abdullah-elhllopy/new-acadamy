'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useCreateMainDepartment } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { Form, FormField } from '@/components/forms'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { mainDepartmentSchema, type MainDepartmentFormData } from '@/lib/validations'
import Link from 'next/link'

export default function AddMainDepartmentPage() {
  const router = useRouter()
  const createDepartment = useCreateMainDepartment()
  const methods = useForm<MainDepartmentFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(mainDepartmentSchema),
    defaultValues: {
      mainDepartmentName: '',
      mainDepartmentDescription: '',
      isActive: true,
    },
  })

  const onSubmit = async (data: MainDepartmentFormData) => {
    // const formData = new FormData()
    const form_Data = {
      "name": data.mainDepartmentName,
      "mainDeptId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "description": data.mainDepartmentDescription,
      "isActive": data.isActive
    }
    // formData.append('name', data.mainDepartmentName)
    // formData.append('mainDeptId', '3fa85f64-5717-4562-b3fc-2c963f66afa6')

    // if (data.mainDepartmentDescription) {
    //   formData.append('description', data.mainDepartmentDescription)
    // }

    // formData.append('isActive', data.isActive ? 'true' : 'false')

    // if (data.image?.[0]) {
    //   formData.append('image', data.image[0])
    // }

    await createDepartment.mutateAsync(form_Data)
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
        <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  name="mainDepartmentName"
                  label="Department Name"
                  placeholder="Enter main department name"
                  required
                />

                <FormField
                  name="mainDepartmentDescription"
                  label="Description"
                  type="textarea"
                  placeholder="Enter department description (optional)"
                  rows={4}
                />

                <div className="space-y-2">
                  <Label htmlFor="image">Department Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...methods.register('image')}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isActive"
                    {...methods.register('isActive')}
                    defaultChecked
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Active Department
                  </Label>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-start gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/departments/main">Cancel</Link>
              </Button>
              <Button type="submit" disabled={createDepartment.isPending}>
                {createDepartment.isPending ? 'Creating...' : 'Create Main Department'}
              </Button>
            </div>
          </div>
        </Form>
      </ContentLayout>
    </>
  )
}
