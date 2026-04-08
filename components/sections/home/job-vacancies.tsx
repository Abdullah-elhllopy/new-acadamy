'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Mock data - will be replaced with API when available
const MOCK_VACANCIES = [
  {
    id: '1',
    title: 'Senior Training Consultant',
    titleAr: 'مستشار تدريب أول',
    department: 'Training & Development',
    departmentAr: 'التدريب والتطوير',
    location: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
    type: 'Full-time',
    typeAr: 'دوام كامل',
    postedDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Corporate Training Specialist',
    titleAr: 'أخصائي تدريب مؤسسي',
    department: 'Corporate Services',
    departmentAr: 'الخدمات المؤسسية',
    location: 'Remote',
    locationAr: 'عن بُعد',
    type: 'Full-time',
    typeAr: 'دوام كامل',
    postedDate: '2024-01-10',
  },
  {
    id: '3',
    title: 'Content Developer',
    titleAr: 'مطور محتوى تدريبي',
    department: 'Content & Curriculum',
    departmentAr: 'المحتوى والمناهج',
    location: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
    type: 'Part-time',
    typeAr: 'دوام جزئي',
    postedDate: '2024-01-05',
  },
]

export function JobVacancies() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="bg-gradient-to-br from-muted/30 to-background py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {isArabic ? 'الوظائف الشاغرة' : 'Job Vacancies'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isArabic
              ? 'انضم إلى فريقنا من الخبراء وساهم في تطوير قادة المستقبل'
              : 'Join our team of experts and help develop future leaders'}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {MOCK_VACANCIES.map((vacancy) => (
            <motion.div key={vacancy.id} variants={itemVariants}>
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/20">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium px-3 py-1 bg-secondary/20 text-secondary rounded-full">
                      {isArabic ? vacancy.typeAr : vacancy.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {isArabic ? vacancy.titleAr : vacancy.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4">
                    {isArabic ? vacancy.departmentAr : vacancy.department}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{isArabic ? vacancy.locationAr : vacancy.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Clock className="w-4 h-4" />
                    <span>
                      {isArabic ? 'نُشر في' : 'Posted'}{' '}
                      {new Date(vacancy.postedDate).toLocaleDateString(
                        isArabic ? 'ar-EG' : 'en-US',
                        { month: 'short', day: 'numeric', year: 'numeric' }
                      )}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <Link href={`/careers/${vacancy.id}`}>
                      <Button
                        variant="outline"
                        className="w-full group hover:bg-primary hover:text-white"
                      >
                        {isArabic ? 'عرض التفاصيل' : 'View Details'}
                        <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/careers">
            <Button size="lg" className="rounded-full h-14 px-10">
              {isArabic ? 'عرض جميع الوظائف' : 'View All Vacancies'}
              <ArrowRight className="w-5 h-5 mr-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
