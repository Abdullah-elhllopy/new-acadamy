'use client'

import { MOCK_TRAINERS } from '@/app/trainers/page'
import { motion } from 'framer-motion'
import TeamMember from '../shared/TeamMember'
import { ContentLayout } from '@/layout/page-layout'

export function TrainersSection() {


  return (
    <ContentLayout className=' bg-muted'>
      <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-16">
        {'مدربونا'}
      </h2>
      <motion.section
        className="grid gap-10 max-sm:gap-10 max-sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:max-md:gap-5 sm:max-md:grid-cols-[repeat(auto-fill,minmax(225px,1fr))] md:max-lg:gap-5 md:max-lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:max-xl:grid-cols-[repeat(auto-fill,minmax(225px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {MOCK_TRAINERS.map((trainer) => (
          <TeamMember key={`${trainer.instructorid}-trainer`} trainer={trainer} />
        ))}
      </motion.section>
    </ContentLayout>
  )
}
