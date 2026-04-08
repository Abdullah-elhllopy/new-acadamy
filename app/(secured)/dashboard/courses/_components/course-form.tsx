'use client'

import { UseFormReturn } from 'react-hook-form'
import { CourseFormData } from '@/lib/validations'
import { Form, FormField, FormSelect, WhatWillLearn } from '@/components/forms'
import { FormCheckbox } from '@/components/forms/form-checkbox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMainDepartments, useSubDepartmentsByMain } from '@/hooks/api/use-departments'
import { useTrainers } from '@/hooks/api/use-trainers'
import { MultiSelect } from '@/components/ui/multi-select'
import Link from 'next/link'

interface CourseFormProps {
  methods: UseFormReturn<CourseFormData>
  onSubmit: (data: CourseFormData) => Promise<void>
  isLoading?: boolean
  isEdit?: boolean
  currentFiles?: {
    image?: string
    video?: string
    pdf?: string
  }
}

export function CourseForm({
  methods,
  onSubmit,
  isLoading = false,
  isEdit = false,
  currentFiles = {}
}: CourseFormProps) {
  const mainDepId = methods.watch('mainDebId')
  const subDepId = methods.watch('subDebId')
  const instructorIDs = methods.watch('instructorIDs') || []
  const wwwl = methods.watch('wwwl') || []

  const { data: mainDepartments } = useMainDepartments()
  const { data: subDepartments } = useSubDepartmentsByMain(mainDepId || '')
  const { data: trainers } = useTrainers()

  const trainersOptions = trainers?.map(trainer => ({
    value: trainer.instructorid,
    label: trainer.name,
    labelAr: trainer.name
  })) || []

  const mainDepsOptions = mainDepartments?.map(dep => ({
    value: dep.departmentID || '',
    label: dep.name || '',
    labelAr: dep.name || ''
  })) || []

  const subDepsOptions = subDepartments?.map(dep => ({
    value: dep.subDepartmentId || '',
    label: dep.subDepartmentName || '',
    labelAr: dep.subDepartmentName || ''
  })) || []

  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="courseName"
                label="Course Name"
                placeholder="Enter course name"
                required
              />
              <FormSelect
                name="courseType"
                label="Course Type"
                options={[{ value: 'Online', label: 'Online', labelAr: 'أونلاين' },
                { value: 'Offline', label: 'Offline', labelAr: 'محلية' },
                { value: 'Hybrid', label: 'Hybrid', labelAr: 'هجينة' }]}
                required
              />
            </div>

            <FormField
              name="courseDescription"
              label="Description"
              type="textarea"
              placeholder="Enter course description"
              rows={4}
              required
            />

            <FormField
              name="courseContent"
              label="Course Content"
              type="textarea"
              placeholder="Enter detailed course content"
              rows={6}
            />
          </CardContent>
        </Card>

        {/* Schedule & Location */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule & Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                name="courseStartDate"
                label="Start Date"
                type="date"
                required
              />
              <FormField
                name="numberOfWeeks"
                label="Number of Weeks"
                placeholder="0"
              />
              <FormField
                name="numberOfMonths"
                label="Number of Months"
                placeholder="0"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="place"
                label="Place"
                placeholder="Enter location"
                required
              />
              <FormField
                name="placeSub"
                label="Sub Location"
                placeholder="Enter sub location"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Duration */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Duration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                name="courseCost"
                label="Cost ($)"
                placeholder="0.00"
                required
              />
              <FormField
                name="courseNumberOfHours"
                label="Number of Hours"
                placeholder="0"
                required
              />
              <FormSelect
                name="language"
                label="Language"
                options={[{ value: 'English', label: 'English', labelAr: 'إنجليزي' },
                { value: 'Arabic', label: 'Arabic', labelAr: 'عربي' }]}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Departments & Trainers */}
        <Card>
          <CardHeader>
            <CardTitle>Departments & Trainers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormSelect
                name="mainDebId"
                label="Main Department"
                options={mainDepsOptions}
                required
                onChange={(value: string) => {
                  methods.setValue('mainDebId', value)
                  methods.setValue('subDebId', '')
                }}
              />

              <FormSelect
                name="subDebId"
                label="Sub Department"
                options={subDepsOptions}
                required
                disabled={!mainDepId}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trainers">Trainers *</Label>
              <MultiSelect
                options={trainersOptions}
                selected={instructorIDs}
                onChange={(selected) => methods.setValue('instructorIDs', selected)}
                placeholder="Select trainers..."
                searchPlaceholder="Search trainers..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Status Flags */}
        <Card>
          <CardHeader>
            <CardTitle>Course Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <FormCheckbox name="now" label="Available Now" />
              <FormCheckbox name="soon" label="Coming Soon" />
              <FormCheckbox name="recommended" label="Recommended" />
              <FormCheckbox name="mostSelling" label="Best Seller" />
            </div>
          </CardContent>
        </Card>

        {/* What Will You Learn */}
        <WhatWillLearn
          items={wwwl}
          onChange={(items) => methods.setValue('wwwl', items)}
        />

        {/* Media Files */}
        <Card>
          <CardHeader>
            <CardTitle>{isEdit ? 'Update Media Files' : 'Media Files'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex md:flex-row flex-col gap-2 ">
            <div className="space-y-2 flex-1">
              <Label htmlFor="image">
                Course Image {isEdit && '(leave empty to keep current)'}
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                {...methods.register('image')}
              />
              {isEdit && currentFiles.image && (
                <p className="text-sm text-muted-foreground">Current: {currentFiles.image}</p>
              )}
            </div>

            <div className="space-y-2 flex-1">
              <Label htmlFor="video">
                Course Video {isEdit && '(leave empty to keep current)'}
              </Label>
              <Input
                id="video"
                type="file"
                accept="video/*"
                {...methods.register('video')}
              />
              {isEdit && currentFiles.video && (
                <p className="text-sm text-muted-foreground">Current: {currentFiles.video}</p>
              )}
            </div>

            <div className="space-y-2 flex-1">
              <Label htmlFor="pdf">
                Course PDF {isEdit && '(leave empty to keep current)'}
              </Label>
              <Input
                id="pdf"
                type="file"
                accept=".pdf"
                {...methods.register('pdf')}
              />
              {isEdit && currentFiles.pdf && (
                <p className="text-sm text-muted-foreground">Current: {currentFiles.pdf}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-start gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/courses">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Course' : 'Create Course')}
          </Button>
        </div>
      </div>
    </Form>
  )
}
