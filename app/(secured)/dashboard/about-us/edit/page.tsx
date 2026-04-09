'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAboutUs, useUpdateAboutUs } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AboutUs, OurValue } from '@/services/api'
import { AboutUsForm } from '@/components/forms/AboutUsForm'
import { aboutUsSchema } from '@/lib/validations/about-us'

export default function EditAboutUsPage() {
  const router = useRouter()
  const { data: company, isLoading } = useAboutUs()
  const updateAboutUs = useUpdateAboutUs()

  const form = useForm<AboutUs>({
    resolver: zodResolver(aboutUsSchema),
    defaultValues: {
      name: '', email: '', phone: '', aboutUs: '', address: '',
      ourVision: '', ourMessage: '', workingHours: '',
      facebook: 'https://', linkedin: 'https://', twitter: 'https://', instgram: 'https://',
    },
  })

  useEffect(() => {
    if (company) {
      form.reset({
        name: company.name || '',
        email: company.email || '',
        phone: company.phone || '',
        aboutUs: company.aboutUs || '',
        address: company.address || '',
        ourVision: company.ourVision || '',
        ourMessage: company.ourMessage || '',
        workingHours: company.workingHours || '',
        facebook: company.facebook || 'https://',
        linkedin: company.linkedin || 'https://',
        twitter: company.twitter || 'https://',
        instgram: company.instgram || 'https://',
      })
    }
  }, [company, form])

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

    await updateAboutUs.mutateAsync(formData)
    router.push('/dashboard/about-us')
  }

  if (isLoading) return <p className="p-8 text-muted-foreground">Loading...</p>

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'About Us', href: '/dashboard/about-us' },
          { label: 'Edit', href: '/dashboard/about-us/edit' },
        ]}
        title="Edit About Us Info"
      >
        <BackButton href="/dashboard/about-us" text="Back to About Us" />
      </DashboardHero>

      <ContentLayout>
        <Card>
          <CardContent className="pt-6">
            <AboutUsForm
              form={form}
              onSubmit={onSubmit}
              isSubmitting={updateAboutUs.isPending}
              submitText="تحديث"
              currentImage={company?.image}
              currentPdf={company?.pdf}
              initialOurValues={company?.ourValues?.map((value, index) => ({
                id: index,
                title: value.title,
                description: value.description
              })) || []}
            />
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  )
}
