'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { useAboutUs } from '@/hooks/api/use-about-us'
import { Users, Award, BookOpen, Building2 } from 'lucide-react'

export function AcademyStats() {
  const { isArabic } = useLanguage()
  const { data: aboutData } = useAboutUs()

  // Default stats if API doesn't provide them
  const stats = [
    {
      icon: Award,
      valueEn: '15+',
      valueAr: '15+',
      labelEn: 'Years of Excellence',
      labelAr: 'سنة من التميز',
      color: 'text-primary'
    },
    {
      icon: Building2,
      valueEn: '100+',
      valueAr: '100+',
      labelEn: 'Corporate Clients',
      labelAr: 'عميل مؤسسي',
      color: 'text-secondary'
    },
    {
      icon: BookOpen,
      valueEn: '50+',
      valueAr: '50+',
      labelEn: 'Training Programs',
      labelAr: 'برنامج تدريبي',
      color: 'text-success'
    },
    {
      icon: Users,
      valueEn: '10K+',
      valueAr: '10K+',
      labelEn: 'Trainees Served',
      labelAr: 'متدرب تم تدريبهم',
      color: 'text-warning'
    }
  ]

  return (
    <section className="py-20 md:py-24 bg-linear-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {isArabic ? 'إنجازاتنا بالأرقام' : 'Our Achievements in Numbers'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isArabic
              ? 'نفخر بما حققناه من إنجازات في مسيرتنا التدريبية'
              : 'We are proud of our achievements in our training journey'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 text-center group"
              >
                <div className={`w-16 h-16 ${stat.color} bg-current/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {isArabic ? stat.valueAr : stat.valueEn}
                </div>
                <div className="text-muted-foreground font-medium">
                  {isArabic ? stat.labelAr : stat.labelEn}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
