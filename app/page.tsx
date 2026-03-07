'use client'

import { HeaderCarousel } from '@/components/sections/header-carousel'
import { FeaturedPrograms } from '@/components/sections/featured-programs'
import { TrainersSection } from '@/components/sections/trainers'
import { OurPartners } from '@/components/sections/our-partners'
import { Testimonials } from '@/components/sections/testimonials'
import { EmailSubscription } from '@/components/sections/email-subscription'

export default function Home() {
  return (
    <>
      <HeaderCarousel />
      <FeaturedPrograms />
      <TrainersSection />
      <OurPartners />
      <Testimonials />
      <EmailSubscription />
    </>
  )
}
