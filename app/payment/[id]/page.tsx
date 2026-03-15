'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CourseDetailsCard, PaymentForm } from './_components'
import { ContentLayout, Layout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { Title } from '@/components/shared/title'
// import { PaymentForm } from '@/components/shared/payment/payment-form'
// import { CourseDetailsCard } from '@/components/shared/payment/course-details-card'

const MOCK_COURSE = {
  courseId: 1,
  courseSpecies: 'حضوري',
  courseName: 'مهارات القيادة المتقدمة',
  courseDescripTion: 'دورة تدريبية متقدمة في مهارات القيادة والإدارة الفعالة',
  courseStartDate: '2024-02-15',
  courseNumberOfHours: 40,
  numberOfMonths: 2,
  placeSub: 'الرياض',
  place: 'مركز التدريب',
  courseCost: 2500
}

export default function PaymentPage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState(MOCK_COURSE)

  useEffect(() => {
    // Fetch course data using params.id
    // const fetchCourse = async () => {
    //   const response = await axios.get(`/api/Course/get-Course/${params.id}`)
    //   setCourse(response.data)
    // }
    // fetchCourse()
  }, [params.id])

  return (
    <Layout>
      <Hero>
        <Title title='الدفع' />

      </Hero>
      <ContentLayout
        className="px-4 md:px-20 pb-20 pt-10 "
      >
        <section className="grid grid-cols-1 lg:grid-cols-[44%_10%_45%] gap-8">
          <PaymentForm />
          <div />
          <CourseDetailsCard course={course} />
        </section>
      </ContentLayout>
    </Layout>
  )
}
