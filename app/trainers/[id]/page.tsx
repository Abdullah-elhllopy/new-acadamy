'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, Facebook, Linkedin, Twitter } from 'lucide-react'
import { SimpleAvatar } from '@/components/shared/simple-avatar'
import { ProgramCard } from '@/components/cards/program-card'
import { mockPrograms } from '@/app/programs/page'

const MOCK_TRAINER = {
  id: 1,
  name: 'د. أحمد السعود',
  job: 'وظيفه او تخصص المدرب',
  image: '/placeholder-avatar.jpg',
  about: 'مدرب خبير بخبرة تزيد عن 15 عاماً في تطوير القيادة والإدارة التنظيمية. دكتوراه في إدارة الأعمال من جامعة هارفارد.',
  pdf: '/trainer-cv.pdf',
  facebook: 'https://facebook.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  courseDetails:mockPrograms
}

export default function TrainerProfilePage({ params }: { params: { id: string } }) {
  useEffect(() => {
    document.title = MOCK_TRAINER.name
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        className="bg-muted px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-8 sm:py-12 md:py-16 "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 text-start">
          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 bg-white sm:bg-transparent p-4 sm:p-0 rounded-lg sm:rounded-none">
            <SimpleAvatar
              src={MOCK_TRAINER.image}
              alt={MOCK_TRAINER.name}
              className="w-20 h-20 sm:w-32 md:w-25 md:h-25 xl:h-40 xl:w-40 rounded-full mx-auto sm:mx-0"
            />

            <div className="flex flex-col items-center sm:items-start gap-3">
              <h4 className="text-primary font-sans font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {MOCK_TRAINER.name}
              </h4>
              <p className="text-hero-bg font-sans text-sm sm:text-base md:text-lg text-center sm:text-start">
                {MOCK_TRAINER.job}
              </p>
              <div className='flex items-center gap-4'>
                <Link href={MOCK_TRAINER.linkedin} target="_blank" rel="noopener noreferrer" className="text-2xl text-hero-bg hover:text-primary no-underline ">
                  <Facebook />
                </Link>
                <Link href={MOCK_TRAINER.linkedin} target="_blank" rel="noopener noreferrer" className="text-2xl text-hero-bg hover:text-primary no-underline ">
                  <Linkedin />
                </Link>
                <Link href={MOCK_TRAINER.twitter} target="_blank" rel="noopener noreferrer" className="text-2xl text-hero-bg hover:text-primary no-underline">
                  <Twitter />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <Link
              href={MOCK_TRAINER.pdf}
              target="_blank"
              className="flex gap-2 items-center bg-white rounded-full px-4 sm:px-6 py-3 sm:py-4 no-underline text-primary hover:shadow-lg transition-shadow"
            >
              <span className="text-xs sm:text-sm font-sans">
                تحميل الملف الشخصى
              </span>
              <Download className="text-secondary w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="px-75 py-20 max-sm:px-2.5 max-sm:pt-20 max-sm:pb-0 sm:max-md:px-2.5 sm:max-md:pt-20 sm:max-md:pb-0 lg:max-xl:px-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div>
          <h1 className="font-sans text-4xl mb-10 text-primary text-center max-sm:text-[28px] max-sm:mb-10 sm:max-md:text-[28px] sm:max-md:mb-10">
            عن المدرب
          </h1>
          <p className="text-xl text-start max-sm:text-base sm:max-md:text-base">
            {MOCK_TRAINER.about}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="px-75 pb-20 pt-0 text-center max-sm:px-2.5 max-sm:py-10 sm:max-md:px-5 sm:max-md:py-10 md:max-lg:px-40 lg:max-xl:px-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div>
          <h1 className="font-sans text-4xl mb-20 text-primary text-center max-sm:text-[28px] max-sm:mb-15 sm:max-md:text-[28px] sm:max-md:mb-15">
            دورات المدرب
          </h1>
          <div className="text-start">
            <section className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-10 sm:max-md:grid-cols-[50%_50%] sm:max-md:gap-5 md:max-lg:grid-cols-[50%_50%] md:max-lg:gap-5">
              {MOCK_TRAINER.courseDetails.map((course) => (
                // <Link key={course.courseId} href={`/courses/${course.courseId}`}>
                //   <Card className="shadow-[0px_7px_16px_#0000001a] rounded-[15px] hover:[&_a]:underline">
                //     <div className="relative h-52.5">
                //       <img
                //         src={course.image}
                //         alt="صورة الدورة"
                //         className="h-52.5 w-full"
                //       />
                //       <p className="absolute top-6.25 right-6.25 sm:max-md:right-4.5 bg-white p-2.5 text-primary text-base font-sans rounded-3xl">
                //         <span>{course.courseType}</span>
                //       </p>
                //     </div>
                //     <CardContent className="p-[16px_30px_20px_30px] max-sm:p-[16px_20px_20px_20px] sm:max-md:p-[16px_20px_20px_20px] md:max-lg:p-[16px_20px_20px_20px] lg:max-xl:p-[16px_20px_20px_30px]">
                //       <h2 className="text-primary text-xl font-sans m-[4px_0_10px_0]">
                //         {/* <Link href={`/courses/${course.courseId}`}> */}
                //         {course.courseName}
                //         {/* </Link> */}
                //       </h2>
                //       <p className="text-muted-foreground mb-5 text-base text-start">
                //         <i className="ri-calendar-line ml-2.5 text-primary text-2xl relative top-1.25"></i>
                //         <span>تبدأ فى {course.courseStartDate}</span>
                //       </p>
                //       <p className="text-muted-foreground mb-5 text-base text-start">
                //         <i className="ri-time-line ml-2.5 text-primary text-2xl relative top-1.25"></i>
                //         <span>الساعات {course.courseNumberOfHours}</span> -
                //         <span>الشهور {course.numberOfMonths}</span>
                //       </p>
                //       <p className="text-muted-foreground mb-5 text-base text-start">
                //         <i className="ri-map-pin-2-line ml-2.5 text-primary text-2xl relative top-1.25"></i>
                //         <span>{course.placeSub}</span> -
                //         <span>{course.place}</span>
                //       </p>
                //       <hr />
                //       <div className="grid grid-cols-[25%_75%] pb-0" key={course.instructorid}>
                //         <div className="w-15">
                //           <img
                //             src={course.instructorimage}
                //             alt="صورة المدرب"
                //             className="w-15 h-15 rounded-full"
                //           />
                //         </div>
                //         <div className="pb-0 relative">
                //           <p className="m-[10px_-10px_10px_0px] text-primary max-sm:w-[80%] sm:max-md:w-[80%] md:max-lg:w-[80%] md:max-lg:m-[10px_0px_10px_0px] lg:max-xl:w-full">
                //             <span className="text-xl max-sm:text-base sm:max-md:text-base">{course.instructorname}</span>
                //             <span className="text-xl font-sans absolute left-0">{course.courseCost} جنيه</span>
                //           </p>
                //         </div>
                //       </div>
                //     </CardContent>
                //   </Card>
                // </Link>
                <ProgramCard
                  key={`courses_${course.id}`}
                  program={course}
                  language={'ar'}
                />
              ))}
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
