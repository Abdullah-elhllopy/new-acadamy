'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'

export function OurPartners() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const partners = [
    { id: 1, name: 'Partner 1', logo: '/placeholder.jpg' },
    { id: 2, name: 'Partner 2', logo: '/placeholder.jpg' },
    { id: 3, name: 'Partner 3', logo: '/placeholder.jpg' },
    { id: 4, name: 'Partner 4', logo: '/placeholder.jpg' },
    { id: 5, name: 'Partner 5', logo: '/placeholder.jpg' },
    { id: 6, name: 'Partner 6', logo: '/placeholder.jpg' },
  ]

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-20">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-16">
          {isArabic ? 'شركاؤنا' : 'Our Partners'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
