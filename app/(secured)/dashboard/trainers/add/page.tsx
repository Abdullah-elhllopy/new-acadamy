'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateTrainer } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { Form, FormField } from '@/components/forms'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { trainerSchema, type TrainerFormData } from '@/lib/validations'
import Link from 'next/link'

export default function AddTrainerPage() {
  const router = useRouter()
  const createTrainer = useCreateTrainer()
  const methods = useForm<TrainerFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(trainerSchema),
    defaultValues: {
      instructorName: '',
      instructorBio: '',
      instructorEmail: '',
      instructorPhone: '',
      specialization: '',
      experience: '',
      linkedin: '',
      facebook: '',
      twitter: '',
      isActive: true,
    },
  })

  const onSubmit = async (data: TrainerFormData) => {
    const formData = new FormData()
    
    formData.append('Name', data.instructorName)
    formData.append('About', data.instructorBio)
    
    if (data.instructorEmail) formData.append('Email', data.instructorEmail)
    if (data.instructorPhone) formData.append('Phone', data.instructorPhone)
    if (data.specialization) formData.append('Job', data.specialization)
    if (data.experience) formData.append('Experience', data.experience)
    if (data.linkedin) formData.append('Linkedin', data.linkedin)
    if (data.facebook) formData.append('Facbook', data.facebook)
    if (data.twitter) formData.append('Twitter', data.twitter)
    
    formData.append('IsActive', data.isActive ? 'true' : 'false')

    if (data.image?.[0]) formData.append('Imagefile', data.image[0])
    if (data.cv?.[0]) formData.append('Pdffile', data.cv[0])

    await createTrainer.mutateAsync(formData)
    router.push('/dashboard/trainers')
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Trainers', href: '/dashboard/trainers' },
          { label: 'Add Trainer', href: '/dashboard/trainers/add' },
        ]}
        title="Add New Trainer"
      >
        <BackButton href="/dashboard/trainers" text="Back to Trainers" />
      </DashboardHero>

      <ContentLayout>
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
                    name="instructorName"
                    label="Trainer Name"
                    placeholder="Enter trainer name"
                    required
                  />
                  <FormField
                    name="specialization"
                    label="Specialization / Job Title"
                    placeholder="e.g., Senior Developer, Project Manager"
                  />
                </div>

                <FormField
                  name="instructorBio"
                  label="About Trainer"
                  type="textarea"
                  placeholder="Enter trainer biography"
                  rows={6}
                  required
                />
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    name="instructorEmail"
                    label="Email"
                    type="email"
                    placeholder="trainer@example.com"
                  />
                  <FormField
                    name="instructorPhone"
                    label="Phone"
                    type="tel"
                    placeholder="+966 XX XXX XXXX"
                  />
                </div>

                <FormField
                  name="experience"
                  label="Years of Experience"
                  placeholder="e.g., 5"
                />
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  name="linkedin"
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/username"
                />
                <FormField
                  name="facebook"
                  label="Facebook"
                  placeholder="https://facebook.com/username"
                />
                <FormField
                  name="twitter"
                  label="Twitter"
                  placeholder="https://twitter.com/username"
                />
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Checkbox id="isActive" {...methods.register('isActive')} defaultChecked />
                  <Label htmlFor="isActive" className="cursor-pointer">Active Trainer</Label>
                </div>
              </CardContent>
            </Card>

            {/* Media Files */}
            <Card>
              <CardHeader>
                <CardTitle>Media Files</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Trainer Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...methods.register('image')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cv">Trainer CV (PDF)</Label>
                  <Input
                    id="cv"
                    type="file"
                    accept=".pdf"
                    {...methods.register('cv')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-start gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/trainers">Cancel</Link>
              </Button>
              <Button type="submit" disabled={createTrainer.isPending}>
                {createTrainer.isPending ? 'Creating...' : 'Create Trainer'}
              </Button>
            </div>
          </div>
        </Form>
      </ContentLayout>
    </>
  )
}
