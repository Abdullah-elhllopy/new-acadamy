'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ContentLayout } from '@/layout/page-layout'
import { SimpleAvatar } from '../shared/simple-avatar'

export function Testimonials() {
  const { isArabic } = useLanguage()
  const testimonials = [
    {
      nameEn: 'Sarah Johnson',
      nameAr: 'سارة جونسون',
      roleEn: 'HR Manager, TechCorp',
      roleAr: 'مدير الموارد البشرية، شركة تك كوربوريشن',
      contentEn: 'The leadership program transformed our team dynamics. The trainers were highly professional and the curriculum was extremely relevant to our business needs.',
      contentAr: 'غيّر برنامج القيادة ديناميكية فريقنا بشكل جذري. المدربون كانوا محترفين جداً والمنهج الدراسي كان ملائماً جداً لاحتياجات أعمالنا.',
      rating: 5,
      avatar: 'SJ',
    },
    {
      nameEn: 'Ahmed Al-Rashid',
      nameAr: 'أحمد الراشد',
      roleEn: 'Business Development Director, Gulf Industries',
      roleAr: 'مدير التطوير الأعمال، شركة الخليج للصناعات',
      contentEn: 'Outstanding quality of training delivered. The digital marketing program helped us increase our online presence significantly within just 3 months.',
      contentAr: 'جودة تدريب متميزة جداً. ساعدنا برنامج التسويق الرقمي على زيادة وجودنا على الإنترنت بشكل كبير في غضون 3 أشهر فقط.',
      rating: 5,
      avatar: 'AR',
    },
    {
      nameEn: 'Emma Thompson',
      nameAr: 'إيما تومسون',
      roleEn: 'Operations Manager, Global NGO',
      roleAr: 'مدير العمليات، منظمة عالمية غير ربحية',
      contentEn: 'Customized programs tailored to our organization\'s specific needs. The team was responsive and the training impact is still evident in our operations.',
      contentAr: 'برامج مخصصة ملائمة لاحتياجات منظمتنا المحددة. كان الفريق متجاوباً جداً وتأثير التدريب لا يزال واضحاً في عملياتنا.',
      rating: 5,
      avatar: 'ET',
    },
    {
      nameEn: 'Mohammed Al-Saeed',
      nameAr: 'محمد السعيد',
      roleEn: 'Training Coordinator, Government Ministry',
      roleAr: 'منسق التدريب، وزارة حكومية',
      contentEn: 'Professional approach with attention to detail. The project management course was comprehensive and the facilitators are industry experts.',
      contentAr: 'نهج احترافي مع الاهتمام بالتفاصيل. كان مقرر إدارة المشاريع شاملاً والميسرون خبراء في الصناعة.',
      rating: 5,
      avatar: 'MS',
    },
  ]

  return (
    <ContentLayout>
      {/* Section header */}
      <section className={`mb-12 `}>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {isArabic ? 'آراء عملائنا' : 'What Our Clients Say'}
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          {isArabic
            ? 'اسمع مباشرة من الشركات والمنظمات التي استفادت من برامجنا التدريبية'
            : 'Hear directly from organizations that have benefited from our training programs'}
        </p>
      </section>

      {/* Testimonials Carousel */}
      <Carousel
        opts={{
          loop: true,
          align: 'start',
          direction: isArabic ? 'rtl' : 'ltr',
          slidesToScroll: 1,
          containScroll: 'trimSnaps',
        }}
        className="relative"
      >
        {({ scrollPrev, scrollNext, canScrollPrev, canScrollNext }) => (
          <>
            <div className={cn('absolute -top-20 flex gap-3', isArabic ? 'left-0 flex-row-reverse' : 'right-0')}>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={cn(
                  'rounded-full w-12 h-12 border-foreground bg-white hover:bg-primary hover:text-primary-foreground transition-colors',
                  !canScrollPrev && 'opacity-50 cursor-not-allowed'
                )}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={cn(
                  'rounded-full w-12 h-12 border-foreground bg-white hover:bg-primary hover:text-primary-foreground transition-colors',
                  !canScrollNext && 'opacity-50 cursor-not-allowed'
                )}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <CarouselContent className="-ml-6">
              {testimonials.map((testimonial, idx) => (
                <CarouselItem key={idx} className="pl-6 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="hover:border-primary/50 transition-colors h-full">
                      <CardContent className="pt-0">
                        {/* Rating */}
                        <div className={`flex items-center gap-6 `}>
                          <SimpleAvatar alt={testimonial.avatar} src={testimonial.avatar} />
                          <div >
                            <p className="font-semibold text-foreground">
                              {isArabic ? testimonial.nameAr : testimonial.nameEn}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {isArabic ? testimonial.roleAr : testimonial.roleEn}
                            </p>
                          </div>
                        </div>
                        {/* <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        </div> */}

                        {/* Content */}
                        <p className={`text-muted-foreground  `}>
                          "{isArabic ? testimonial.contentAr : testimonial.contentEn}"
                        </p>

                        {/* Author */}
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </>
        )}
      </Carousel>

    </ContentLayout >
  )
}
