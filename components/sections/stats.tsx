'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Users, BookOpen, Award, Building2 } from 'lucide-react'

export function StatsSection() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const stats = [
    {
      value: isArabic ? '5000+' : '5000+',
      label: isArabic ? 'متدرب سنوياً' : 'Trainees Yearly',
      icon: Users,
    },
    {
      value: isArabic ? '50+' : '50+',
      label: isArabic ? 'برنامج تدريبي' : 'Training Programs',
      icon: BookOpen,
    },
    {
      value: isArabic ? '98%' : '98%',
      label: isArabic ? 'معدل الرضا' : 'Satisfaction Rate',
      icon: Award,
    },
    {
      value: isArabic ? '100+' : '100+',
      label: isArabic ? 'عميل مؤسسي' : 'Corporate Clients',
      icon: Building2,
    },
  ]

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center space-y-4 p-8 rounded-xl bg-muted hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-base text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
