'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'

export function TrainersSection() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <section className="bg-muted py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-20">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-16">
          {isArabic ? 'مدربونا' : 'Our Trainers'}
        </h2>
        <div className="text-center text-muted-foreground">
          <p>{isArabic ? 'قريباً' : 'Coming Soon'}</p>
        </div>
      </div>
    </section>
  )
}
