'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MOCK_CUSTOMERS } from '@/app/our-customers/page'
import { ContentLayout } from '@/layout/page-layout'

interface Customer {
  id: number
  name: string
  nameAr: string
  type: string
  typeAr: string
  testimonial: string
  testimonialAr: string
}

interface CustomersCarouselProps {
  customers: Customer[]
  className?: string
}

export function CustomersCarousel() {
  const { isArabic } = useLanguage()
  return (
    <ContentLayout className='bg-foreground'>
      <div className={cn('relative')}>
        <Carousel
          opts={{
            loop: true,
            align: 'start',
            direction: isArabic ? 'rtl' : 'ltr',
            slidesToScroll: 1,
            containScroll: 'trimSnaps',
          }}
          className="w-full"
        >
          {({ scrollPrev, scrollNext, canScrollPrev, canScrollNext }) => (
            <div className="relative">
              {/* Left Arrow */}
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={cn(
                  'absolute top-1/2 -translate-y-1/2 z-10 rounded-full w-12 h-12 border-foreground bg-white hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg',
                  isArabic ? 'right-0 translate-x-1/2 ' : 'left-0 -translate-x-1/2',
                  !canScrollPrev && 'opacity-50 cursor-not-allowed'
                )}
              >
                <ChevronLeft className="w-5 h-5 rotate-arrow" />
              </Button>

              {/* Carousel Content */}
              <CarouselContent className="-ml-6">
                {MOCK_CUSTOMERS.map((customer, idx) => (
                  <CarouselItem key={customer.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow h-full">
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            {/* Customer Header */}
                            <div className="flex items-start gap-4">
                              <Avatar className="w-16 h-16">
                                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                                  {(isArabic ? customer.nameAr : customer.name).charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className={ 'flex-1'}>
                                <h3 className="font-bold text-lg text-foreground mb-1">
                                  {isArabic ? customer.nameAr : customer.name}
                                </h3>
                                <p className="text-sm text-primary font-medium">
                                  {isArabic ? customer.typeAr : customer.type}
                                </p>
                              </div>
                            </div>

                            {/* Testimonial */}
                            <div className="relative">
                              <Quote className="w-8 h-8 text-primary/20 absolute -top-2" />
                              <p className={`text-sm text-muted-foreground pt-6 italic`}>
                                "{isArabic ? customer.testimonialAr : customer.testimonial}"
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Right Arrow */}
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={cn(
                  'absolute top-1/2 -translate-y-1/2 z-10 rounded-full w-12 h-12 border-foreground bg-white hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg',
                  isArabic ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2',
                  !canScrollNext && 'opacity-50 cursor-not-allowed'
                )}
              >
                <ChevronRight className="w-5 h-5 rotate-arrow" />
              </Button>
            </div>
          )}
        </Carousel>
      </div>
    </ContentLayout>
  )
}
