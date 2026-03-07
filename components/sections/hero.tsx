'use client'

import Link from 'next/link'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="container mx-auto px-4 md:px-20 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Main heading */}
          <div className="max-w-4xl space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary">
              {isArabic
                ? 'تطوير مهاراتك مع برامج تدريب عالمية'
                : 'Elevate Your Skills with World-Class Training'}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {isArabic
                ? 'اكتشف برامج تدريب احترافية مصممة خصيصاً للشركات والحكومات والمنظمات غير الربحية لتحسين القدرات والمهارات.'
                : 'Discover professional training programs designed for corporates, governments, and NGOs to enhance capabilities and develop workforce expertise.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                className="rounded-full h-14 px-10 text-lg font-semibold bg-primary hover:bg-secondary"
                asChild
              >
                <Link href="/programs">
                  <span>{isArabic ? 'استكشف البرامج' : 'Explore Programs'}</span>
                  <ArrowRight className="w-5 h-5 mr-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-14 px-10 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white"
                asChild
              >
                <Link href="/contact">
                  {isArabic ? 'اطلب استشارة' : 'Request Consultation'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
