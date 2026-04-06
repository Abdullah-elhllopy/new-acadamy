// app/[locale]/about/page.tsx
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { ContentLayout, Layout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { Title } from '@/components/shared/title'
import { useAboutUs } from '@/hooks/api/use-about-us'
import { ABOUT_US_DATA } from '@/data/about-data'

interface ValueCardProps {
  title: string
  description: string
  index: number
}

export function ValueCard({ title, description, index }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <div className={cn("flex gap-5")}>
        <div className="shrink-0">
          <div className="w-14 h-14 rounded-full flex items-center justify-center">
            <Check className="w-7 h-7 text-secondary" />
          </div>
        </div>
        <div className="space-y-3">
          <h4 className={cn("text-xl md:text-2xl font-bold text-foreground font-sans")}>
            {title}
          </h4>
          <p className={cn("text-muted-foreground leading-relaxed")}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutUsPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const { data: aboutData, isLoading } = useAboutUs()

  // Fallback to mock data if API fails
  const data = aboutData || ABOUT_US_DATA

  const breadcrumbs = [
    { label: 'Home', labelAr: 'الرئيسية', href: '/' },
    { label: 'About Us', labelAr: 'من نحن' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (isLoading) {
    return (
      <Layout>
        <Hero breadcrumbItems={breadcrumbs}>
          <Title title={isArabic ? 'من نحن' : 'About Us'} />
        </Hero>
        <ContentLayout className='flex items-center justify-center py-20'>
          <div className="text-center">Loading...</div>
        </ContentLayout>
      </Layout>
    )
  }

  return (
    <Layout>
      <Hero breadcrumbItems={breadcrumbs}>
        <Title title={isArabic ? 'من نحن' : 'About Us'} />
      </Hero>

      <ContentLayout className='flex flex-col items-center gap-12'>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <h2 className={cn("text-3xl md:text-4xl font-bold text-foreground font-sans")}>
            {aboutData?.name || data.name}
          </h2>
          <p className={cn("text-lg md:text-xl text-muted-foreground leading-relaxed")}>
            {aboutData?.aboutUs }
          </p>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24"
        >
          <motion.div variants={itemVariants} className={cn("space-y-4")}>
            <h3 className={cn("text-2xl md:text-3xl font-bold text-foreground font-sans")}>
              {isArabic ? 'رؤيتنا' : 'Our Vision'}
            </h3>
            <p className={cn("text-muted-foreground text-lg leading-relaxed")}>
              {aboutData?.ourVision }
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className={cn("space-y-4")}>
            <h3 className={cn("text-2xl md:text-3xl font-bold text-foreground font-sans")}>
              {isArabic ? 'رسالتنا' : 'Our Mission'}
            </h3>
            <p className={cn("text-muted-foreground text-lg leading-relaxed")}>
              {aboutData?.ourMessage }
            </p>
          </motion.div>
        </motion.section>
      </ContentLayout>

      <ContentLayout className="py-12 bg-muted">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className={cn("text-3xl md:text-4xl font-bold text-foreground font-sans")}>
            {isArabic ? 'قيمنا' : 'Our Values'}
          </h3>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {(aboutData?.ourValues && aboutData.ourValues.length > 0
            ? aboutData.ourValues.map((value, index) => (
              <ValueCard
                key={index}
                title={value.title || ''}
                description={value.description || ''}
                index={index}
              />
            )) 
            : null
          )}
        </div>
      </ContentLayout>

      <ContentLayout className="py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className={cn("text-3xl md:text-4xl font-bold text-foreground font-sans")}>
            {'الاحصاءات'}
          </h3>
        </motion.section>
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { valueEn: '15+', valueAr: '15+', labelEn: 'Years of Experience', labelAr: 'سنة خبرة' },
            { valueEn: '100+', valueAr: '100+', labelEn: 'Corporate Clients', labelAr: 'عميل مؤسسي' },
            { valueEn: '50+', valueAr: '50+', labelEn: 'Training Programs', labelAr: 'برنامج تدريبي' },
            { valueEn: '10K+', valueAr: '10K+', labelEn: 'Trainees Served', labelAr: 'متدرب تم تدريبهم' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center bg-hero-bg py-10 rounded-sm shadow-md text-muted ">
              <p className="text-4xl font-bold mb-2">
                {isArabic ? stat.valueAr : stat.valueEn}
              </p>
              <p className="text-sm">
                {isArabic ? stat.labelAr : stat.labelEn}
              </p>
            </div>
          ))}
        </section>
      </ContentLayout>
    </Layout>
  )
}