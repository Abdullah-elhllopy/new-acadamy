'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import Partner from '../../cards/Partner'
import { usePartners } from '@/hooks/api/use-common'
import { Loader2 } from 'lucide-react'

export function OurPartners() {
  const { isArabic } = useLanguage()
  const { data: partners, isLoading } = usePartners()

  if (isLoading) {
    return (
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-20">
          <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-16">
            {isArabic ? 'شركاؤنا' : 'Our Partners'}
          </h2>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  if (!partners || partners.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-20">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-16">
          {isArabic ? 'شركاؤنا' : 'Our Partners'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <Partner key={partner.id} name={partner.name} image={partner.image} link={partner.link} />
          ))}
        </div>
      </div>
    </section>
  )
}
