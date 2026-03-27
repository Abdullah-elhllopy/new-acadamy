'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useCreateCourse } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { Button } from '@/components/ui/button'
import { courseSchema, type CourseFormData } from '@/lib/validations'
// import { CourseForm } from './_components/course-form'
import Link from 'next/link'
import { CourseForm } from '../_components/course-form'

export default function AddCoursePage() {
  const router = useRouter()
  const createCourse = useCreateCourse()
  const methods = useForm<CourseFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(courseSchema),
    defaultValues: {
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
  })

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

    await createCourse.mutateAsync(formData)
    router.push('/dashboard/courses')
  }

  return (
    <>
      <Hero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Courses', href: '/dashboard/courses' },
          { label: 'Add Course', href: '/dashboard/courses/add' },
        ]}
        title="Add New Course"
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
          isLoading={createCourse.isPending}
          isEdit={false}
        />
      </ContentLayout>
    </>
  )
}
