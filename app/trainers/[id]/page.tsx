'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const MOCK_TRAINER = {
  id: 1,
  name: 'د. أحمد السعود',
  job: 'القيادة والإدارة',
  image: '/placeholder-avatar.jpg',
  about: 'مدرب خبير بخبرة تزيد عن 15 عاماً في تطوير القيادة والإدارة التنظيمية. دكتوراه في إدارة الأعمال من جامعة هارفارد.',
  pdf: '/trainer-cv.pdf',
  facebook: 'https://facebook.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  courseDetails: [
    {
      courseId: 1,
      courseName: 'مهارات القيادة المتقدمة',
      image: '/placeholder.jpg',
      courseType: 'حضوري',
      courseStartDate: '2024-02-15',
      courseNumberOfHours: 40,
      numberOfMonths: 2,
      placeSub: 'الرياض',
      place: 'مركز التدريب',
      instructorname: 'د. أحمد السعود',
      instructorimage: '/placeholder-avatar.jpg',
      instructorid: 1,
      courseCost: 2500
    },
    {
      courseId: 2,
      courseName: 'الإدارة الاستراتيجية',
      image: '/placeholder.jpg',
      courseType: 'أونلاين',
      courseStartDate: '2024-03-01',
      courseNumberOfHours: 30,
      numberOfMonths: 1.5,
      placeSub: 'أونلاين',
      place: 'منصة التدريب',
      instructorname: 'د. أحمد السعود',
      instructorimage: '/placeholder-avatar.jpg',
      instructorid: 1,
      courseCost: 1800
    }
  ]
}

export default function TrainerProfilePage({ params }: { params: { id: string } }) {
  useEffect(() => {
    document.title = MOCK_TRAINER.name
  }, [])

  return (
    <div className="text-start">
      <motion.div
        className="bg-muted h-[260px] px-[300px] py-10 max-sm:h-[360px] max-sm:px-2.5 sm:max-md:h-[360px] sm:max-md:px-2.5 md:max-lg:px-10 lg:max-xl:px-[200px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-[65%_50%] text-start max-sm:grid-cols-1 sm:max-md:grid-cols-[70%_30%] md:max-lg:grid-cols-[70%_30%]">
          <div className="grid grid-cols-[37%_50%] max-sm:grid-cols-[30%_70%] max-sm:bg-white max-sm:p-[30px_10px] max-sm:rounded-[10px] sm:max-md:grid-cols-[30%_70%] sm:max-md:p-[30px_10px] sm:max-md:rounded-[10px]">
            <div>
              <img
                src={MOCK_TRAINER.image}
                alt="انتظر تحميل الصورة"
                className="w-[180px] h-[180px] rounded-full max-sm:w-20 max-sm:h-20 sm:max-md:w-[100px] sm:max-md:h-[100px]"
              />
            </div>
            <div>
              <h4 className="text-primary font-sans text-4xl mt-5 max-sm:text-xl max-sm:mt-2.5 sm:max-md:text-xl sm:max-md:mt-2.5 md:max-lg:text-[30px]">
                {MOCK_TRAINER.name}
              </h4>
              <p className="text-hero-bg text-xl text-start max-sm:text-base sm:max-md:text-base">
                {MOCK_TRAINER.job}
              </p>
              <div className="mt-2">
                <Link
                  href={MOCK_TRAINER.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary hover:no-underline mx-2.5"
                >
                  <i className="fab fa-facebook text-2xl max-sm:text-xl sm:max-md:text-xl"></i>
                </Link>
                <Link
                  href={MOCK_TRAINER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary hover:no-underline mx-2.5"
                >
                  <i className="fab fa-linkedin text-2xl max-sm:text-xl sm:max-md:text-xl"></i>
                </Link>
                <Link
                  href={MOCK_TRAINER.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary hover:no-underline mx-2.5"
                >
                  <i className="fab fa-twitter text-2xl max-sm:text-xl sm:max-md:text-xl"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center pt-[60px]">
            <Link
              href={MOCK_TRAINER.pdf}
              target="_blank"
              className="text-sm rounded-[20px] bg-white p-[20px_10px_10px_10px] no-underline text-primary inline-block"
            >
              <span className="relative text-sm bottom-[5px] font-sans">
                تحميل الملف الشخصى
              </span>
              <Download className="text-secondary mr-[5px] text-2xl inline-block" />
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="px-[300px] py-20 max-sm:px-2.5 max-sm:pt-20 max-sm:pb-0 sm:max-md:px-2.5 sm:max-md:pt-20 sm:max-md:pb-0 lg:max-xl:px-[200px]"
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
        className="px-[300px] pb-20 pt-0 text-center max-sm:px-2.5 max-sm:py-10 sm:max-md:px-5 sm:max-md:py-10 md:max-lg:px-[160px] lg:max-xl:px-[200px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div>
          <h1 className="font-sans text-4xl mb-20 text-primary text-center max-sm:text-[28px] max-sm:mb-[60px] sm:max-md:text-[28px] sm:max-md:mb-[60px]">
            دورات المدرب
          </h1>
          <div className="text-start">
            <section className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-10 sm:max-md:grid-cols-[50%_50%] sm:max-md:gap-5 md:max-lg:grid-cols-[50%_50%] md:max-lg:gap-5">
              {MOCK_TRAINER.courseDetails.map((course) => (
                <Link key={course.courseId} href={`/courses/${course.courseId}`}>
                  <Card className="shadow-[0px_7px_16px_#0000001a] rounded-[15px] hover:[&_a]:underline">
                    <div className="relative h-52.5">
                      <img
                        src={course.image}
                        alt="صورة الدورة"
                        className="h-52.5 w-full"
                      />
                      <p className="absolute top-[25px] right-[25px] sm:max-md:right-[18px] bg-white p-2.5 text-primary text-base font-sans rounded-[18px]">
                        <span>{course.courseType}</span>
                      </p>
                    </div>
                    <CardContent className="p-[16px_30px_20px_30px] max-sm:p-[16px_20px_20px_20px] sm:max-md:p-[16px_20px_20px_20px] md:max-lg:p-[16px_20px_20px_20px] lg:max-xl:p-[16px_20px_20px_30px]">
                      <h2 className="text-primary text-xl font-sans m-[4px_0_10px_0]">
                        <Link href={`/courses/${course.courseId}`}>
                          {course.courseName}
                        </Link>
                      </h2>
                      <p className="text-muted-foreground mb-5 text-base text-start">
                        <i className="ri-calendar-line ml-2.5 text-primary text-2xl relative top-[5px]"></i>
                        <span>تبدأ فى {course.courseStartDate}</span>
                      </p>
                      <p className="text-muted-foreground mb-5 text-base text-start">
                        <i className="ri-time-line ml-2.5 text-primary text-2xl relative top-[5px]"></i>
                        <span>الساعات {course.courseNumberOfHours}</span> -
                        <span>الشهور {course.numberOfMonths}</span>
                      </p>
                      <p className="text-muted-foreground mb-5 text-base text-start">
                        <i className="ri-map-pin-2-line ml-2.5 text-primary text-2xl relative top-[5px]"></i>
                        <span>{course.placeSub}</span> -
                        <span>{course.place}</span>
                      </p>
                      <hr />
                      <div className="grid grid-cols-[25%_75%] pb-0" key={course.instructorid}>
                        <div className="w-[60px]">
                          <img
                            src={course.instructorimage}
                            alt="صورة المدرب"
                            className="w-[60px] h-[60px] rounded-full"
                          />
                        </div>
                        <div className="pb-0 relative">
                          <p className="m-[10px_-10px_10px_0px] text-primary max-sm:w-[80%] sm:max-md:w-[80%] md:max-lg:w-[80%] md:max-lg:m-[10px_0px_10px_0px] lg:max-xl:w-full">
                            <span className="text-xl max-sm:text-base sm:max-md:text-base">{course.instructorname}</span>
                            <span className="text-xl font-sans absolute left-0">{course.courseCost} جنيه</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
