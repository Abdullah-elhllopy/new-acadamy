'use client'

import { useMemo, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useCourse, useUpdateCourse } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { courseSchema, type CourseFormData } from '@/lib/validations'
import { CourseForm } from '../_components/course-form'
import Link from 'next/link'

export default function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)

  const { data: course, isLoading } = useCourse(id)
  const updateCourse = useUpdateCourse()

  const defaultValues = useMemo<CourseFormData>(
    () =>
      course
        ? {
            courseName: course.courseName || '',
            courseDescription: course.courseDescripTion || '',
            courseStartDate: course.courseStartDate?.split('T')[0] || '',
            place: course.place || '',
            placeSub: course.placeSub || '',
            courseType: course.courseType || '',
            courseCost: String(course.courseCost || ''),
            courseNumberOfHours: String(course.courseNumberOfHours || ''),
            language: course.language || '',
            numberOfWeeks: String(course.numberOfWeeks || ''),
            numberOfMonths: String(course.numberOfMonths || ''),
            courseContent: course.courseContent || '',
            now: course.now || false,
            soon: course.soon || false,
            recommended: course.recommended || false,
            mostSelling: course.mostSellenig || false,
          }
        : {
            courseName: '',
            courseDescription: '',
            courseStartDate: '',
            place: '',
            placeSub: '',
            courseType: '',
            courseCost: '',
            courseNumberOfHours: '',
            language: '',
            numberOfWeeks: '',
            numberOfMonths: '',
            courseContent: '',
            now: false,
            soon: false,
            recommended: false,
            mostSelling: false,
          },
    [course]
  )

  const methods = useForm<CourseFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(courseSchema),
    defaultValues,
  })

  useEffect(() => {
    if (course) {
      methods.reset(defaultValues)
    }
  }, [course, defaultValues, methods])

  const onSubmit = async (data: CourseFormData) => {
    const formData = new FormData()

    formData.append('CourseName', data.courseName)
    formData.append('CourseDescripTion', data.courseDescription)
    formData.append('CourseStartDate', data.courseStartDate)
    formData.append('Place', data.place)
    formData.append('Coursetype', data.courseType)
    formData.append('CourseCost', data.courseCost)
    formData.append('CourseNumberOfHours', data.courseNumberOfHours)

    if (data.placeSub) formData.append('PlaceSub', data.placeSub)
    if (data.language) formData.append('Language', data.language)
    if (data.numberOfWeeks) formData.append('NumberOfWeeks', data.numberOfWeeks)
    if (data.numberOfMonths) formData.append('NumberOfMonths', data.numberOfMonths)
    if (data.courseContent) formData.append('CourseContent', data.courseContent)

    formData.append('Now', data.now ? 'true' : 'false')
    formData.append('Soon', data.soon ? 'true' : 'false')
    formData.append('Recommended', data.recommended ? 'true' : 'false')
    formData.append('MostSellenig', data.mostSelling ? 'true' : 'false')

    if (data.image?.[0]) formData.append('img', data.image[0])
    if (data.video?.[0]) formData.append('vid', data.video[0])
    if (data.pdf?.[0]) formData.append('pdf', data.pdf[0])

    await updateCourse.mutateAsync({ courseId: id, formData })
    router.push('/dashboard/courses')
  }

  if (isLoading) {
    return (
      <>
        <Hero title="Loading..." />
        <ContentLayout>
          <Skeleton className="h-96 w-full" />
        </ContentLayout>
      </>
    )
  }

  if (!course) {
    return (
      <>
        <Hero title="Course Not Found" />
        <ContentLayout>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Course not found</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/courses">Back to Courses</Link>
            </Button>
          </div>
        </ContentLayout>
      </>
    )
  }

  return (
    <>
      <Hero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Courses', href: '/dashboard/courses' },
          { label: 'Edit Course', href: `/dashboard/courses/${id}` },
        ]}
        title={`Edit: ${course.courseName}`}
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/courses">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
        </Button>
      </Hero>

      <ContentLayout>
        <CourseForm
          methods={methods}
          onSubmit={onSubmit}
          isLoading={updateCourse.isPending}
          isEdit={true}
          currentFiles={{
            image: course.image,
            video: course.video,
            pdf: course.coursepdf,
          }}
        />
      </ContentLayout>
    </>
  )
}
