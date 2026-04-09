'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddAboutUs } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AboutUs, OurValue } from '@/services/api'
import { AboutUsForm } from '@/components/forms/AboutUsForm'
import { aboutUsSchema } from '@/lib/validations/about-us'

export default function AddAboutUsPage() {
  const router = useRouter()
  const addAboutUs = useAddAboutUs()

  const form = useForm<AboutUs>({
    resolver: zodResolver(aboutUsSchema),
    defaultValues: {
      name: '', email: '', phone: '', aboutUs: '', address: '',
      ourVision: '', ourMessage: '', workingHours: '',
      facebook: 'https://', linkedin: 'https://', twitter: 'https://', instgram: 'https://',
    },
  })

  const onSubmit = async (data: AboutUs, ourValues: OurValue[]) => {
    const formData = new FormData()
    formData.append('Name', data.name)
    formData.append('Phone', data.phone)
    formData.append('Email', data.email)
    formData.append('AboutUs', data.aboutUs)
    formData.append('Address', data.address)
    if (data.ourVision) formData.append('OurVision', data.ourVision)
    if (data.ourMessage) formData.append('OurMessage', data.ourMessage)
    if (data.workingHours) formData.append('WorkingHours', data.workingHours)
    if (data.linkedin) formData.append('Linkedin', data.linkedin)
    if (data.facebook) formData.append('Facebook', data.facebook)
    if (data.twitter) formData.append('Twitter', data.twitter)
    if (data.instgram) formData.append('Instgram', data.instgram)
    if (data.image?.[0]) formData.append('Imagefile', data.image[0])
    if (data.pdf?.[0]) formData.append('PdfFile', data.pdf[0])
    
    ourValues.forEach(item => {
      formData.append('OurValues', JSON.stringify(item))
    })

    await addAboutUs.mutateAsync(formData)
    router.push('/dashboard/about-us')
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'About Us', href: '/dashboard/about-us' },
          { label: 'Add Info', href: '/dashboard/about-us/add' },
        ]}
        title="Add About Us Info"
      >
        <BackButton href="/dashboard/about-us" text="Back to About Us" />
      </DashboardHero>

      <ContentLayout>
        <Card>
          <CardContent className="pt-6">
            <AboutUsForm
              form={form}
              onSubmit={onSubmit}
              isSubmitting={addAboutUs.isPending}
              submitText="اضافة"
            />
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  )
}
