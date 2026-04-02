'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTrainer, useUpdateTrainer } from '@/hooks/api'
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
import { use, useEffect } from 'react'
import { DetailPageLoader } from '@/components/shared/loader/detail-page-loader'

export default function EditTrainerPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params)
  const { data: trainer, isLoading } = useTrainer(id)
  const updateTrainer = useUpdateTrainer()

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

  useEffect(() => {
    if (trainer) {
      methods.reset({
        instructorName: trainer.name || '',
        instructorBio: trainer.about || '',
        instructorEmail: trainer.email || '',
        instructorPhone: trainer.phone || '',
        specialization: trainer.job || '',
        experience: trainer.experience || '',
        linkedin: trainer.linkedin || '',
        facebook: trainer.facbook || '',
        twitter: trainer.twitter || '',
        isActive: trainer.isActive ?? true,
      })
    }
  }, [trainer, methods])

  const onSubmit = async (data: TrainerFormData) => {
    const formData = new FormData()

    formData.append('InstructorId', id)
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
    else if (trainer?.pdf) formData.append('Pdf', trainer.pdf)
    if (trainer?.image && !data.image?.[0]) formData.append('image', trainer.image)

    await updateTrainer.mutateAsync(formData)
    router.push('/dashboard/trainers')
  }

  if (isLoading) {
    return <DetailPageLoader />
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Trainers', href: '/dashboard/trainers' },
          { label: 'Edit Trainer', href: `/dashboard/trainers/${id}/edit` },
        ]}
        title="Edit Trainer"
      >
        <BackButton href="/dashboard/trainers" text="Back to Trainers" />
      </DashboardHero>

      <ContentLayout>
        <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="space-y-6">
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

            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Checkbox id="isActive" {...methods.register('isActive')} />
                  <Label htmlFor="isActive" className="cursor-pointer">Active Trainer</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media Files</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Trainer Image</Label>
                  {trainer?.image && (
                    <div className="mb-2">
                      <img src={trainer.image} alt="Current" className="h-20 w-20 rounded object-cover" />
                    </div>
                  )}
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...methods.register('image')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cv">Trainer CV (PDF)</Label>
                  {trainer?.pdf && (
                    <div className="mb-2">
                      <a href={trainer.pdf} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                        View Current CV
                      </a>
                    </div>
                  )}
                  <Input
                    id="cv"
                    type="file"
                    accept=".pdf"
                    {...methods.register('cv')}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-start gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/trainers">Cancel</Link>
              </Button>
              <Button type="submit" disabled={updateTrainer.isPending}>
                {updateTrainer.isPending ? 'Updating...' : 'Update Trainer'}
              </Button>
            </div>
          </div>
        </Form>
      </ContentLayout>
    </>
  )
}
