'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
import { useCreateLecture } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

const onlineLectureSchema = z.object({
  name: z.string().min(2, 'Lecture name is required'),
  description: z.string().optional(),
  lectureIndex: z.string().min(1, 'Lecture number is required'),
  video: z.any().optional(),
})

type OnlineLectureFormData = z.infer<typeof onlineLectureSchema>

export default function AddOnlineLecturePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id: chapterId } = use(params)
  const createLecture = useCreateLecture()

  const form = useForm<OnlineLectureFormData>({
    resolver: zodResolver(onlineLectureSchema),
    defaultValues: {
      name: '',
      description: '',
      lectureIndex: '1',
    },
  })

  const onSubmit = async (data: OnlineLectureFormData) => {
    const formData = new FormData()
    formData.append('Name', data.name)
    if (data.description) formData.append('Description', data.description)
    formData.append('CourseId', chapterId)
    formData.append('LectureIndex', data.lectureIndex)
    if (data.video?.[0]) formData.append('video', data.video[0])

    await createLecture.mutateAsync(formData)
    router.push(`/dashboard/lectures/online-lectures/${chapterId}`)
  }

  return (
    <>
      <Hero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Lectures', href: '/dashboard/lectures' },
          { label: 'Chapter', href: `/dashboard/lectures/online-lectures/${chapterId}` },
          { label: 'Add Lecture', href: `/dashboard/lectures/online-lectures/${chapterId}/add` },
        ]}
        title="Add New Online Lecture"
      >
        <BackButton href={`/dashboard/lectures/online-lectures/${chapterId}`} text="Back" />
      </Hero>

      <ContentLayout>
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lecture Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter lecture name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter lecture description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lectureIndex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lecture Number</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="Enter lecture number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="video"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Lecture Video</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="video/*"
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
                    <Link href={`/dashboard/lectures/online-lectures/${chapterId}`}>Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={createLecture.isPending}>
                    {createLecture.isPending ? 'Creating...' : 'Create Lecture'}
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
