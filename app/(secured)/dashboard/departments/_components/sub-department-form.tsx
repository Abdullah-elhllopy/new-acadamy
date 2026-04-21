'use client'

import { UseFormReturn } from 'react-hook-form'
import { SubDepartmentFormData } from '@/lib/validations'
import { Form, FormField } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

interface SubDepartmentFormProps {
  methods: UseFormReturn<SubDepartmentFormData>
  onSubmit: (data: SubDepartmentFormData) => Promise<void>
  isLoading?: boolean
  isEdit?: boolean
  mainDepartmentId: string
}

export function SubDepartmentForm({
  methods,
  onSubmit,
  isLoading = false,
  isEdit = false,
  mainDepartmentId
}: SubDepartmentFormProps) {
  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Sub Department Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="subDepartmentName"
                label="Sub Department Name (English)"
                placeholder="Enter sub department name"
                required
              />
              <FormField
                name="subDepartmentNameAr"
                label="Sub Department Name (Arabic)"
                placeholder="أدخل اسم القسم الفرعي"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="subDepartmentDescription"
                label="Description (English)"
                type="textarea"
                placeholder="Enter sub department description (optional)"
                rows={4}
              />
              <FormField
                name="subDepartmentDescriptionAr"
                label="Description (Arabic)"
                type="textarea"
                placeholder="أدخل وصف القسم الفرعي (اختياري)"
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
                Active Sub Department
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-start gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href={`/dashboard/departments/${mainDepartmentId}/sub`}>Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Sub Department' : 'Create Sub Department')}
          </Button>
        </div>
      </div>
    </Form>
  )
}
