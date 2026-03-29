'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateLecture } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField, Form } from '@/components/forms'
import Link from 'next/link'

const lectureSchema = z.object({
  name: z.string().min(2, 'Lecture name is required'),
  description: z.string().min(1, 'Description is required'),
  lectureIndex: z.string().min(1, 'Lecture number is required'),
})

type LectureFormData = z.infer<typeof lectureSchema>

export default function AddLecturePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id: courseId } = use(params)
  const createLecture = useCreateLecture()

  const methods = useForm<LectureFormData>({
    resolver: zodResolver(lectureSchema),
    defaultValues: {
      name: '',
      description: '',
      lectureIndex: '1',
    },
  })

  const onSubmit = async (data: LectureFormData) => {
    const formData = new FormData()
    formData.append('Name', data.name)
    formData.append('Description', data.description)
    formData.append('CourseId', courseId)
    formData.append('LectureIndex', data.lectureIndex)

    await createLecture.mutateAsync(formData)
    router.push(`/dashboard/lectures/${courseId}`)
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Lectures', href: '/dashboard/lectures' },
          { label: 'Course', href: `/dashboard/lectures/${courseId}` },
          { label: 'Add Lecture', href: `/dashboard/lectures/${courseId}/add` },
        ]}
        title="Add New Lecture"
      >
        <BackButton href={`/dashboard/lectures/${courseId}`} text="Back" />
      </DashboardHero>

      <ContentLayout>
        <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lecture Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  name="name"
                  label="Lecture Name"
                  placeholder="Enter lecture name"
                  required
                />

                <FormField
                  name="description"
                  label="Description"
                  type="textarea"
                  placeholder="Enter lecture description"
                  rows={4}
                  required
                />

                <FormField
                  name="lectureIndex"
                  label="Lecture Number"
                  type="number"
                  placeholder="Enter lecture number"
                  required
                />
              </CardContent>
            </Card>

            <div className="flex justify-start gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href={`/dashboard/lectures/${courseId}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={createLecture.isPending}>
                {createLecture.isPending ? 'Creating...' : 'Create Lecture'}
              </Button>
            </div>
          </div>
        </Form>
      </ContentLayout>
    </>
  )
}
