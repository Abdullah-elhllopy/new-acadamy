'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

export function Testimonials() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

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
    <section className="bg-background py-16 md:py-24 border-b border-border">
      <div className="container px-4 md:px-6">
        {/* Section header */}
        <div className={`mb-12 ${isArabic ? 'text-right' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {isArabic ? 'آراء عملائنا' : 'What Our Clients Say'}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {isArabic
              ? 'اسمع مباشرة من الشركات والمنظمات التي استفادت من برامجنا التدريبية'
              : 'Hear directly from organizations that have benefited from our training programs'}
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className={`text-muted-foreground mb-6 ${isArabic ? 'text-right' : ''}`}>
                  "{isArabic ? testimonial.contentAr : testimonial.contentEn}"
                </p>

                {/* Author */}
                <div className={`flex items-center gap-4  `}>
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className={isArabic ? 'text-right' : ''}>
                    <p className="font-semibold text-foreground">
                      {isArabic ? testimonial.nameAr : testimonial.nameEn}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isArabic ? testimonial.roleAr : testimonial.roleEn}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
