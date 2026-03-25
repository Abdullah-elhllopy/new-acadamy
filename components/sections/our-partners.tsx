'use client'

import { MOCK_PARTNERS } from '@/app/our-partners/page'
import { useLanguage } from '@/shared/hooks/useLanguage'
import Partner from '../shared/Partner'

export function OurPartners() {
  const { isArabic } = useLanguage()
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-20">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-16">
          {isArabic ? 'شركاؤنا' : 'Our Partners'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {MOCK_PARTNERS.map((partner) => (
            <Partner key={partner.id} name={isArabic ? partner.nameAr : partner.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
