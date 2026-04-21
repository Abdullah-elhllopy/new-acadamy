'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateCourse } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton } from '@/components/ui/button'
import { courseSchema, type CourseFormData } from '@/lib/validations'
import { CourseForm } from '../_components/course-form'
import { Form } from '@/components/forms'

export default function AddCoursePage() {
  const router = useRouter()
  const createCourse = useCreateCourse()

  const methods = useForm<CourseFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseName: '',
      courseNameAr: '',
      courseDescription: '',
      courseDescriptionAr: '',
      courseStartDate: '',
      place: '',
      placeAr: '',
      placeSub: '',
      placeSubAr: '',
      placeLocationLat: undefined,
      placeLocationLong:undefined,
      courseType: '',
      courseCost: '',
      courseNumberOfHours: '',
      language: '',
      numberOfWeeks: '',
      numberOfMonths: '',
      courseContent: '',
      courseContentAr: '',
      mainDebId: '',
      subDebId: '',
      instructorIDs: [],
      wwwl: [],
      wwwlAr: [],
      now: false,
      soon: false,
      recommended: false,
      mostSelling: false,
    },
  })

  const onSubmit = async (data: CourseFormData) => {
    const formData = new FormData()

    formData.append('CourseName', data.courseName)
    formData.append('CourseNameAr', data.courseNameAr)
    formData.append('CourseDescripTion', data.courseDescription)
    formData.append('CourseDescripTionAr', data.courseDescriptionAr)
    formData.append('CourseStartDate', data.courseStartDate)
    formData.append('Place', data.place)
    formData.append('PlaceAr', data.placeAr)
    formData.append('Coursetype', data.courseType)
    formData.append('CourseCost', data.courseCost)
    formData.append('CourseNumberOfHours', data.courseNumberOfHours)

    if (data.placeSub) formData.append('PlaceSub', data.placeSub)
    if (data.placeSubAr) formData.append('PlaceSubAr', data.placeSubAr)
    if (data.placeLocationLat) formData.append('PlaceLocationLat', `${data.placeLocationLat}`)
    if (data.placeLocationLong) formData.append('PlaceLocationLong', `${data.placeLocationLong}`)
    if (data.language) formData.append('Language', data.language)
    if (data.numberOfWeeks) formData.append('NumberOfWeeks', data.numberOfWeeks)
    if (data.numberOfMonths) formData.append('NumberOfMonths', data.numberOfMonths)
    if (data.courseContent) formData.append('CourseContent', data.courseContent)
    if (data.courseContentAr) formData.append('CourseContentAr', data.courseContentAr)

    formData.append('Now', data.now ? 'true' : 'false')
    formData.append('Soon', data.soon ? 'true' : 'false')
    formData.append('Recommended', data.recommended ? 'true' : 'false')
    formData.append('MostSellenig', data.mostSelling ? 'true' : 'false')

    if (data.subDebId) formData.append('SubDebId', data.subDebId)

    if (data.instructorIDs && data.instructorIDs.length > 0) {
      data.instructorIDs.forEach(trainerId => {
        formData.append('InstructorIDs', trainerId)
      })
    }

    if (data.wwwl && data.wwwl.length > 0) {
      data.wwwl.forEach(item => {
        formData.append('WWWLText', item.text)
      })
    }

    if (data.wwwlAr && data.wwwlAr.length > 0) {
      data.wwwlAr.forEach(item => {
        formData.append('WWWLTextAr', item.text)
      })
    }

    if (data.image?.[0]) formData.append('img', data.image[0])
    if (data.video?.[0]) formData.append('vid', data.video[0])
    if (data.pdf?.[0]) formData.append('pdf', data.pdf[0])

    await createCourse.mutateAsync(formData)
    router.push('/dashboard/courses')
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Courses', href: '/dashboard/courses' },
          { label: 'Add Course', href: '/dashboard/courses/add' },
        ]}
        title="Add New Course"
      >
        <BackButton href="/dashboard/courses" text="Back to Courses" />
      </DashboardHero>

      <ContentLayout>
        <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
          <CourseForm
            isLoading={createCourse.isPending}
            isEdit={false}
          />
        </Form>
      </ContentLayout>
    </>
  )
}
