'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

export default function AddVacancyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement API call to create vacancy
    const formData = new FormData(e.currentTarget)
    console.log('Form data:', Object.fromEntries(formData))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    router.push('/dashboard/vacancies')
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Vacancies', href: '/dashboard/vacancies' },
          { label: 'Add Vacancy', href: '/dashboard/vacancies/add' },
        ]}
        title="Add Job Vacancy"
      />

      <ContentLayout>
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title (English) *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Senior Training Consultant"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titleAr">Job Title (Arabic) *</Label>
                  <Input
                    id="titleAr"
                    name="titleAr"
                    placeholder="مثال: مستشار تدريب أول"
                    required
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department (English) *</Label>
                  <Input
                    id="department"
                    name="department"
                    placeholder="e.g., Training & Development"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="departmentAr">Department (Arabic) *</Label>
                  <Input
                    id="departmentAr"
                    name="departmentAr"
                    placeholder="مثال: التدريب والتطوير"
                    required
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location (English) *</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Cairo, Egypt"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locationAr">Location (Arabic) *</Label>
                  <Input
                    id="locationAr"
                    name="locationAr"
                    placeholder="مثال: القاهرة، مصر"
                    required
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Job Type *</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select name="status" defaultValue="Active" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description (English) *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter detailed job description..."
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionAr">Job Description (Arabic) *</Label>
                <Textarea
                  id="descriptionAr"
                  name="descriptionAr"
                  placeholder="أدخل وصف الوظيفة التفصيلي..."
                  rows={6}
                  required
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements (English)</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="Enter job requirements..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirementsAr">Requirements (Arabic)</Label>
                <Textarea
                  id="requirementsAr"
                  name="requirementsAr"
                  placeholder="أدخل متطلبات الوظيفة..."
                  rows={4}
                  dir="rtl"
                />
              </div>

              <div className="flex gap-4 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Vacancy'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  )
}
