'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CourseDetailsCard, PaymentForm } from './_components'
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
    <div className="min-h-screen bg-background flex flex-col space-y-15">
      <motion.div
        className="bg-muted px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 md:py-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-5xl font-sans text-primary">الدفع</h1>
      </motion.div>
      <motion.div
        className="px-4 md:px-20 pb-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <section className="grid grid-cols-1 lg:grid-cols-[44%_10%_45%] gap-8">
          <PaymentForm />
          <div />
          <CourseDetailsCard course={course} />
        </section>
      </motion.div>
    </div>
  )
}
