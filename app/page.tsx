// app/page.tsx
'use client'

import { HeaderCarousel } from '@/components/sections/home/header-carousel'
import { FeaturedPrograms } from '@/components/sections/home/featured-programs'
import { TrainersSection } from '@/components/sections/home/trainers'
import { OurPartners } from '@/components/sections/home/our-partners'
import { Testimonials } from '@/components/sections/home/testimonials'
import { EmailSubscription } from '@/components/sections/home/email-subscription'
import { AnnouncementBanner } from '@/components/sections/home/announcement-banner'
import { IntroVideoSection } from '@/components/sections/home/intro-video-section'
import { PDFDownloadSection } from '@/components/sections/home/pdf-download-section'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { CustomersCarousel } from '@/components/sections/home/customers-carousel'
import { AcademyStats } from '@/components/sections/home/academy-stats'
import { CourseCategoriesSection } from '@/components/sections/home/course-categories'
import { FAQSection } from '@/components/sections/home/faq-section'
import { JobVacancies } from '@/components/sections/home/job-vacancies'
import RenderComponent from '@/components/performance/RenderComponent'
import { Suspense } from 'react'

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <HeaderCarousel />

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <RenderComponent>
          <FeaturedPrograms />
        </RenderComponent>
      </Suspense>

      <RenderComponent>
        <CourseCategoriesSection />
      </RenderComponent>

      <RenderComponent>
        <IntroVideoSection />
      </RenderComponent>



      <RenderComponent>
        <TrainersSection />
      </RenderComponent>

      <RenderComponent>
        <OurPartners />
      </RenderComponent>
      <RenderComponent>
        <AcademyStats />
      </RenderComponent>
      <RenderComponent>
        <Testimonials />
      </RenderComponent>

      <RenderComponent>
        <CustomersCarousel />
      </RenderComponent>

      <RenderComponent>
        <EmailSubscription />
      </RenderComponent>

      <RenderComponent>
        <PDFDownloadSection />
      </RenderComponent>

      <RenderComponent>
        <FAQSection />
      </RenderComponent>

      <RenderComponent>
        <JobVacancies />
      </RenderComponent>

      <RenderComponent>
        <WhatsAppButton />
      </RenderComponent>
    </>
  )
}