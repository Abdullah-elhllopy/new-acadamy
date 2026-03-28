'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useAboutUs, useUpdateAboutUs } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { aboutUsSchema, type AboutUsFormData } from '@/lib/validations'
import Link from 'next/link'

export default function EditAboutUsPage() {
  const router = useRouter()
  const { data: company, isLoading } = useAboutUs()
  const updateAboutUs = useUpdateAboutUs()

  const form = useForm<AboutUsFormData>({
    resolver: zodResolver(aboutUsSchema),
    defaultValues: {
      name: '', email: '', phone: '', aboutUs: '', address: '',
      ourVision: '', ourMessage: '', workingHours: '', workingFrom: '', workingTo: '', link: '',
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
        workingFrom: company.workingFrom?.toString() || '',
        workingTo: company.workingTo?.toString() || '',
        link: company.link || '',
        facebook: company.facebook || 'https://',
        linkedin: company.linkedin || 'https://',
        twitter: company.twitter || 'https://',
        instgram: company.instgram || 'https://',
      })
    }
  }, [company, form])

  const onSubmit = async (data: AboutUsFormData) => {
    const formData = new FormData()
    formData.append('Name', data.name)
    formData.append('Email', data.email)
    formData.append('Phone', data.phone)
    formData.append('AboutUs', data.aboutUs)
    formData.append('Address', data.address)
    if (data.ourVision) formData.append('OurVision', data.ourVision)
    if (data.ourMessage) formData.append('OurMessage', data.ourMessage)
    if (data.workingHours) formData.append('WorkingHours', data.workingHours)
    if (data.workingFrom) formData.append('WorkingFrom', data.workingFrom)
    if (data.workingTo) formData.append('WorkingTo', data.workingTo)
    if (data.link) formData.append('Link', data.link)
    if (data.facebook) formData.append('Facebook', data.facebook)
    if (data.linkedin) formData.append('Linkedin', data.linkedin)
    if (data.twitter) formData.append('Twitter', data.twitter)
    if (data.instgram) formData.append('Instgram', data.instgram)
    if (data.image?.[0]) formData.append('Imagefile', data.image[0])
    if (data.pdf?.[0]) formData.append('PdfFile', data.pdf[0])

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
        <Button variant="outline" asChild>
          <Link href="/dashboard/about-us">
            <ArrowLeft className="arrow-left h-4 w-4" />
            Back
          </Link>
        </Button>
      </DashboardHero>

      <ContentLayout>
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(
                    [
                      { name: 'name', label: 'Company Name' },
                      { name: 'email', label: 'Email', type: 'email' },
                      { name: 'phone', label: 'Phone' },
                      { name: 'address', label: 'Address' },
                      { name: 'ourVision', label: 'Vision' },
                      { name: 'ourMessage', label: 'Message' },
                      { name: 'workingHours', label: 'Working Hours' },
                      { name: 'workingFrom', label: 'Working From (Time)' },
                      { name: 'workingTo', label: 'Working To (Time)' },
                      { name: 'link', label: 'Website Link' },
                      { name: 'facebook', label: 'Facebook' },
                      { name: 'linkedin', label: 'LinkedIn' },
                      { name: 'twitter', label: 'Twitter' },
                      { name: 'instgram', label: 'Instagram' },
                    ] as { name: keyof AboutUsFormData; label: string; type?: string }[]
                  ).map(({ name, label, type }) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            <Input type={type || 'text'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <FormField
                  control={form.control}
                  name="aboutUs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About Us</FormLabel>
                      <FormControl>
                        <Textarea rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {company?.image && (
                    <div>
                      <p className="text-sm font-medium mb-1">Current Logo</p>
                      <img src={company.image} alt="Logo" className="h-12 object-contain mb-2" />
                    </div>
                  )}
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Replace Logo</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pdf"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Replace Profile PDF</FormLabel>
                        <FormControl>
                          <Input type="file" accept=".pdf" onChange={(e) => onChange(e.target.files)} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/dashboard/about-us">Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={updateAboutUs.isPending}>
                    {updateAboutUs.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  )
}
