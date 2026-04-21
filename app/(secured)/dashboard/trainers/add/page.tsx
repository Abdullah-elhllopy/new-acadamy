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
import TrainersForm from '../_components/trainer-form'

export default function AddTrainerPage() {
  const router = useRouter()
  const createTrainer = useCreateTrainer()
  const methods = useForm<TrainerFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(trainerSchema),
    defaultValues: {
      instructorName: '',
      instructorNameAr: '',
      instructorBio: '',
      instructorBioAr: '',
      specialization: '',
      specializationAr: '',
      instructorEmail: '',
      instructorPhone: '',
      videoUrl: '',
      experience: 0,
      linkedin: '',
      facebook: '',
      instagram: '',
      twitter: '',
      isActive: true,
    },
  })

  const onSubmit = async (data: TrainerFormData) => {
    const formData = new FormData()
    
    formData.append('Name', data.instructorName)
    formData.append('NameAr', data.instructorNameAr)
    formData.append('Job', data.specialization)
    formData.append('JobAr', data.specializationAr)
    formData.append('About', data.instructorBio)
    formData.append('AboutAr', data.instructorBioAr)
    formData.append('Email', data.instructorEmail)
    formData.append('Phone', data.instructorPhone)
    formData.append('Experience', String(data.experience))
    
    if (data.videoUrl) formData.append('VideoUrl', data.videoUrl)
    if (data.linkedin) formData.append('Linkedin', data.linkedin)
    if (data.facebook) formData.append('Facbook', data.facebook)
    if (data.instagram) formData.append('Instgram', data.instagram)
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
          <TrainersForm  isSubmitting ={createTrainer.isPending} />
        </Form>
      </ContentLayout>
    </>
  )
}
