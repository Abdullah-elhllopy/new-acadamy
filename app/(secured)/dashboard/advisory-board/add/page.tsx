'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'

export default function AddAdvisorPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement API call to create advisor
    const formData = new FormData(e.currentTarget)
    console.log('Form data:', Object.fromEntries(formData))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    router.push('/dashboard/advisory-board')
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Advisory Board', href: '/dashboard/advisory-board' },
          { label: 'Add Advisor', href: '/dashboard/advisory-board/add' },
        ]}
        title="Add Advisory Board Member"
      />

      <ContentLayout>
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name (English) *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Prof. Dr. Hassan Al-Mansour"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nameAr">Full Name (Arabic) *</Label>
                  <Input
                    id="nameAr"
                    name="nameAr"
                    placeholder="مثال: أ.د. حسن المنصور"
                    required
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job">Position/Title (English) *</Label>
                  <Input
                    id="job"
                    name="job"
                    placeholder="e.g., Strategic Advisor - Leadership Development"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobAr">Position/Title (Arabic) *</Label>
                  <Input
                    id="jobAr"
                    name="jobAr"
                    placeholder="مثال: مستشار استراتيجي - تطوير القيادة"
                    required
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="advisor@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">Bio/About (English) *</Label>
                <Textarea
                  id="about"
                  name="about"
                  placeholder="Enter advisor's biography and expertise..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aboutAr">Bio/About (Arabic) *</Label>
                <Textarea
                  id="aboutAr"
                  name="aboutAr"
                  placeholder="أدخل السيرة الذاتية والخبرة للمستشار..."
                  rows={4}
                  required
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Profile Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                />
                <p className="text-sm text-muted-foreground">
                  Upload a professional photo (recommended: 400x400px)
                </p>
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
                  {isSubmitting ? 'Adding...' : 'Add Advisor'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  )
}
