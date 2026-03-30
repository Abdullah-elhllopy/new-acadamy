'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
import { useCreateImageGroup } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

const imageGroupSchema = z.object({
  groupName: z.string().min(2, 'Group name is required'),
  groupDescription: z.string().optional(),
  image: z.any().optional(),
})

type ImageGroupFormData = z.infer<typeof imageGroupSchema>

export default function AddImageGroupPage() {
  const router = useRouter()
  const createGroup = useCreateImageGroup()

  const form = useForm<ImageGroupFormData>({
    resolver: zodResolver(imageGroupSchema),
    defaultValues: {
      groupName: '',
      groupDescription: '',
    },
  })

  const onSubmit = async (data: ImageGroupFormData) => {
    const formData = new FormData()
    formData.append('GroupName', data.groupName)
    if (data.groupDescription) formData.append('GroupDescription', data.groupDescription)
    if (data.image?.[0]) formData.append('ImageFile', data.image[0])

    await createGroup.mutateAsync(formData)
    router.push('/dashboard/images-center')
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Images Center', href: '/dashboard/images-center' },
          { label: 'Add Group', href: '/dashboard/images-center/add' },
        ]}
        title="Add Image Group"
      >
        <BackButton href="/dashboard/images-center" />
      </DashboardHero>

      <ContentLayout>
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="groupName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter group name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="groupDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter group description" {...field} />
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
                      <FormLabel>Cover Image</FormLabel>
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
                    <Link href="/dashboard/images-center">Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={createGroup.isPending}>
                    {createGroup.isPending ? 'Creating...' : 'Create Group'}
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
