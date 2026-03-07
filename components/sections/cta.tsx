'use client'

import Link from 'next/link'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail } from 'lucide-react'

export function CTA() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <section className="bg-primary text-white">
      <div className="container mx-auto px-4 md:px-20 py-20 md:py-28">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl font-bold">
            {isArabic
              ? 'هل أنت مستعد للبدء؟'
              : 'Ready to Get Started?'}
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            {isArabic
              ? 'انضم إلى مئات الشركات التي طورت مهارات موظفيها معنا. اتصل بنا اليوم لمناقشة احتياجات التدريب الخاصة بك.'
              : 'Join hundreds of organizations that have elevated their teams with us. Contact us today to discuss your training needs.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              size="lg"
              className="rounded-full h-14 px-10 text-lg font-semibold bg-secondary hover:bg-secondary/90 text-white"
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
              className="rounded-full h-14 px-10 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link href="mailto:info@id-academy.com">
                <Mail className="w-5 h-5 ml-2" />
                {isArabic ? 'تواصل معنا' : 'Get In Touch'}
              </Link>
            </Button>
          </div>

          {/* Extra info */}
          <div className={`pt-10 border-t border-white/20 ${isArabic ? 'text-right' : ''}`}>
            <p className="text-base text-white/80">
              {isArabic
                ? 'استجابة سريعة في غضون 24 ساعة | استشارة مجانية وملزمة'
                : 'Quick response within 24 hours | Free and non-binding consultation'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
