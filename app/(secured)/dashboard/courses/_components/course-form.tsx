'use client'

import { UseFormReturn } from 'react-hook-form'
import { CourseFormData } from '@/lib/validations'
import { Form, FormField } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
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
              <FormField
                name="courseType"
                label="Course Type"
                placeholder="e.g., Online, Offline, Hybrid"
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
              <FormField
                name="language"
                label="Language"
                placeholder="e.g., English, Arabic"
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
              <div className="flex items-center space-x-2">
                <Checkbox id="now" {...methods.register('now')} />
                <Label htmlFor="now" className="cursor-pointer">Available Now</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="soon" {...methods.register('soon')} />
                <Label htmlFor="soon" className="cursor-pointer">Coming Soon</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="recommended" {...methods.register('recommended')} />
                <Label htmlFor="recommended" className="cursor-pointer">Recommended</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="mostSelling" {...methods.register('mostSelling')} />
                <Label htmlFor="mostSelling" className="cursor-pointer">Best Seller</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media Files */}
        <Card>
          <CardHeader>
            <CardTitle>{isEdit ? 'Update Media Files' : 'Media Files'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
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

            <div className="space-y-2">
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

            <div className="space-y-2">
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
        <div className="flex justify-end gap-4">
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
