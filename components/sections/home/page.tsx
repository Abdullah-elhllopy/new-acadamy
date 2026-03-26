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