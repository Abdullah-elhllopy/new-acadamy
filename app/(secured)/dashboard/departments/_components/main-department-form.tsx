'use client'

import { UseFormReturn } from 'react-hook-form'
import { MainDepartmentFormData } from '@/lib/validations'
import { Form, FormField } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

interface MainDepartmentFormProps {
  methods: UseFormReturn<MainDepartmentFormData>
  onSubmit: (data: MainDepartmentFormData) => Promise<void>
  isLoading?: boolean
  isEdit?: boolean
}

export function MainDepartmentForm({
  methods,
  onSubmit,
  isLoading = false,
  isEdit = false
}: MainDepartmentFormProps) {
  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="mainDepartmentName"
                label="Department Name (English)"
                placeholder="Enter main department name"
                required
              />
              <FormField
                name="mainDepartmentNameAr"
                label="Department Name (Arabic)"
                placeholder="أدخل اسم القسم الرئيسي"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="mainDepartmentDescription"
                label="Description (English)"
                type="textarea"
                placeholder="Enter department description (optional)"
                rows={4}
              />
              <FormField
                name="mainDepartmentDescriptionAr"
                label="Description (Arabic)"
                type="textarea"
                placeholder="أدخل وصف القسم (اختياري)"
                rows={4}
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Department' : 'Create Department')}
          </Button>
        </div>
      </div>
    </Form>
  )
}
