'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
import { useCreateImage, useImageGroup } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const imageSchema = z.object({
  imageTitle: z.string().min(2, 'Image title is required'),
  image: z.any().refine((files) => files?.length > 0, 'Image is required'),
})

type ImageFormData = z.infer<typeof imageSchema>

export default function AddImagePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id: groupId } = use(params)
  
  const { data: group } = useImageGroup(groupId)
  const createImage = useCreateImage()

  const form = useForm<ImageFormData>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      imageTitle: '',
    },
  })

  const onSubmit = async (data: ImageFormData) => {
    const formData = new FormData()
    formData.append('Text', data.imageTitle)
    formData.append('ImageGroupId', groupId)
    if (data.image?.[0]) formData.append('ImageFile', data.image[0])

    await createImage.mutateAsync(formData)
    router.push(`/dashboard/images-center/${groupId}`)
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Images Center', href: '/dashboard/images-center' },
          { label: group?.groupName || 'Group', href: `/dashboard/images-center/${groupId}` },
          { label: 'Add Image', href: `/dashboard/images-center/${groupId}/add` },
        ]}
        title="Add Image"
      >
        <BackButton href={`/dashboard/images-center/${groupId}`} />
      </DashboardHero>

      <ContentLayout>
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="imageTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Title/Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter image description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => onChange(e.target.files)}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-start gap-4">
                  <Button type="button" variant="outline" asChild>
                    <Link href={`/dashboard/images-center/${groupId}`}>Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={createImage.isPending}>
                    {createImage.isPending ? 'Uploading...' : 'Upload Image'}
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
