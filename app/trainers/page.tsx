'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import TeamMember from '@/components/cards/TeamMember'
import { Layout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { Title } from '@/components/shared/title'
import { useTrainers } from '@/hooks/api'
import { DataStateHandler } from '@/components/shared/data-state-handler'

export default function TrainersPage() {
  const { data: trainers, isLoading, error, refetch } = useTrainers()

  useEffect(() => {
    document.title = 'مدربينا'
  }, [])

  const content = (
    <div className="px-10 py-20 md:px-20 max-sm:px-2.5">
      <motion.section
        className="grid gap-10 max-sm:gap-10 max-sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:max-md:gap-5 sm:max-md:grid-cols-[repeat(auto-fill,minmax(225px,1fr))] md:max-lg:gap-5 md:max-lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:max-xl:grid-cols-[repeat(auto-fill,minmax(225px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {trainers?.map((trainer) => (
          <TeamMember key={`${trainer.instructorid}-trainer`} trainer={trainer} />
        ))}
      </motion.section>
    </div>
  )

  return (
    <Layout>
      <Hero breadcrumbItems={[
        { label: 'الصفحة الرئيسية', href: '/' },
        { label: 'المدربين' }
      ]}>
        <Title title='المدربين' />
      </Hero>

      <DataStateHandler
        isLoading={isLoading}
        error={error}
        loaderType="list"
        onRetry={() => refetch()}
      >
        {content}
      </DataStateHandler>
    </Layout>
  )
}
