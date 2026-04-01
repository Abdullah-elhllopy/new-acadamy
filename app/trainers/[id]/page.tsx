'use client'

import { use, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, Facebook, Linkedin, Twitter } from 'lucide-react'
import { SimpleAvatar } from '@/components/shared/simple-avatar'
import { ProgramCard } from '@/components/cards/program-card'
import { mockPrograms } from '@/app/programs/page'
import { useTrainer } from '@/hooks/api'
import Loader from '@/components/shared/loader'

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
  courseDetails: mockPrograms
}

export default function TrainerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, isLoading } = useTrainer(id)
  useEffect(() => {
    document.title = data?.name || 'ملف المدرب'
  }, [data?.name])
  if (isLoading) {
    return <Loader number={2} />
  }
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
              src={data?.image || MOCK_TRAINER.image}
              alt={data?.name || MOCK_TRAINER.name}
              className="w-20 h-20 sm:w-32 md:w-25 md:h-25 xl:h-40 xl:w-40 rounded-full mx-auto sm:mx-0"
            />

            <div className="flex flex-col items-center sm:items-start gap-3">
              <h4 className="text-primary font-sans font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {data?.name}
              </h4>
              <p className="text-hero-bg font-sans text-sm sm:text-base md:text-lg text-center sm:text-start">
                {data?.job || MOCK_TRAINER.job}
              </p>
              <div className='flex items-center gap-4'>
                <Link href={data?.facbook || '#'} target="_blank" rel="noopener noreferrer" className="text-2xl text-hero-bg hover:text-primary no-underline ">
                  <Facebook />
                </Link>
                <Link href={data?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-2xl text-hero-bg hover:text-primary no-underline ">
                  <Linkedin />
                </Link>
                <Link href={data?.twitter || '#'} target="_blank" rel="noopener noreferrer" className="text-2xl text-hero-bg hover:text-primary no-underline">
                  <Twitter />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <Link
              href={data?.pdf || MOCK_TRAINER.pdf}
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
            {data?.about || MOCK_TRAINER.about}
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
              {data?.courseDetails?.map((course) => (

                <ProgramCard
                  key={`courses_${course.courseId}`}
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
