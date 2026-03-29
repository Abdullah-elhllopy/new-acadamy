'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateChapter } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const chapterSchema = z.object({
  name: z.string().min(2, 'Chapter name is required'),
})

type ChapterFormData = z.infer<typeof chapterSchema>

export default function AddChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id: courseId } = use(params)
  const createChapter = useCreateChapter()

  const form = useForm<ChapterFormData>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: ChapterFormData) => {
    const formData = new FormData()
    formData.append('Name', data.name)
    formData.append('CourseId', courseId)

    await createChapter.mutateAsync(formData)
    router.push(`/dashboard/lectures/online-chapters/${courseId}`)
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Lectures', href: '/dashboard/lectures' },
          { label: 'Chapters', href: `/dashboard/lectures/online-chapters/${courseId}` },
          { label: 'Add Chapter', href: `/dashboard/lectures/online-chapters/${courseId}/add` },
        ]}
        title="Add New Chapter"
      >
        <BackButton href={`/dashboard/lectures/online-chapters/${courseId}`} text="Back" />
      </DashboardHero>

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
                      <FormLabel>Chapter Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter chapter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-start gap-4">
                  <Button type="button" variant="outline" asChild>
                    <Link href={`/dashboard/lectures/online-chapters/${courseId}`}>Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={createChapter.isPending}>
                    {createChapter.isPending ? 'Creating...' : 'Create Chapter'}
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
