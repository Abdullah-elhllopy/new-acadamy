// app/page.tsx
'use client'

import { HeaderCarousel } from '@/components/sections/header-carousel'
import { FeaturedPrograms } from '@/components/sections/featured-programs'
import { TrainersSection } from '@/components/sections/trainers'
import { OurPartners } from '@/components/sections/our-partners'
import { Testimonials } from '@/components/sections/testimonials'
import { EmailSubscription } from '@/components/sections/email-subscription'
import { AnnouncementBanner } from '@/components/sections/announcement-banner'
import { IntroVideoSection } from '@/components/sections/intro-video-section'
import { PDFDownloadSection } from '@/components/sections/pdf-download-section'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { CustomersCarousel } from '@/components/sections/customers-carousel'

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <HeaderCarousel />
      <PDFDownloadSection />
      <FeaturedPrograms />
      <IntroVideoSection />
      <TrainersSection />
      <OurPartners />
      <Testimonials />
      <CustomersCarousel />
      <EmailSubscription />
      <WhatsAppButton />
    </>
  )
}