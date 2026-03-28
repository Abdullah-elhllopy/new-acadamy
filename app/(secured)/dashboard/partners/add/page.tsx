'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useCreatePartner } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero,  } from '@/components/sections/hero'
import { Form, FormField } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { partnerSchema, type PartnerFormData } from '@/lib/validations'
import Link from 'next/link'

export default function AddPartnerPage() {
  const router = useRouter()
  const createPartner = useCreatePartner()

  const methods = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: '',
      link: 'https://',
    },
  })

  const onSubmit = async (data: PartnerFormData) => {
    const formData = new FormData()
    formData.append('Name', data.name)
    formData.append('Link', data.link)
    if (data.image?.[0]) formData.append('Imagefile', data.image[0])

    await createPartner.mutateAsync(formData)
    router.push('/dashboard/partners')
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Partners', href: '/dashboard/partners' },
          { label: 'Add Partner', href: '/dashboard/partners/add' },
        ]}
        title="Add Partner"
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/partners">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Partners
          </Link>
        </Button>
      </DashboardHero>

      <ContentLayout>
        <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Partner Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField<PartnerFormData>
                  name="name"
                  label="Partner Name"
                  placeholder="Enter partner name"
                  required
                />
                <FormField<PartnerFormData>
                  name="link"
                  label="Website Link"
                  placeholder="https://example.com"
                  required
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="image">Partner Logo</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...methods.register('image')}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/partners">Cancel</Link>
              </Button>
              <Button type="submit" disabled={createPartner.isPending}>
                {createPartner.isPending ? 'Saving...' : 'Add Partner'}
              </Button>
            </div>
          </div>
        </Form>
      </ContentLayout>
    </>
  )
}
