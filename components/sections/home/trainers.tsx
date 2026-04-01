'use client'

import { motion } from 'framer-motion'
import TeamMember from '../../cards/TeamMember'
import { ContentLayout } from '@/layout/page-layout'
import { useTrainers } from '@/hooks/api/use-trainers'
import { Loader2 } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'

export function TrainersSection() {
  const { data: trainers, isLoading } = useTrainers()
  const { isArabic } = useLanguage()

  if (isLoading) {
    return (
      <ContentLayout className="bg-muted">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-16">
          {isArabic ? 'مدربونا' : 'Our Trainers'}
        </h2>
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </ContentLayout>
    )
  }

  if (!trainers || trainers.length === 0) {
    return null
  }

  return (
    <ContentLayout className="bg-muted">
      <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-16">
        {isArabic ? 'مدربونا' : 'Our Trainers'}
      </h2>
      <motion.section
        className="grid gap-10 max-sm:gap-10 max-sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:max-md:gap-5 sm:max-md:grid-cols-[repeat(auto-fill,minmax(225px,1fr))] md:max-lg:gap-5 md:max-lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:max-xl:grid-cols-[repeat(auto-fill,minmax(225px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {trainers.slice(0, 4).map((trainer) => (
          <TeamMember key={`${trainer.instructorId}-trainer`} trainer={trainer} />
        ))}
      </motion.section>
    </ContentLayout>
  )
}
