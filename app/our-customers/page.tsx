'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Quote } from 'lucide-react'
import { ContentLayout, Layout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { TitleContainer } from '@/components/shared/title'

export const MOCK_CUSTOMERS = [
  {
    id: 1,
    name: 'Ministry of Education',
    nameAr: 'وزارة التعليم',
    type: 'Government',
    typeAr: 'حكومي',
    testimonial: 'Excellent training programs that significantly improved our staff capabilities',
    testimonialAr: 'برامج تدريبية ممتازة حسنت بشكل كبير من قدرات موظفينا'
  },
  {
    id: 2,
    name: 'Saudi Telecom Company',
    nameAr: 'شركة الاتصالات السعودية',
    type: 'Corporate',
    typeAr: 'شركات',
    testimonial: 'Professional and impactful training delivered by expert trainers',
    testimonialAr: 'تدريب احترافي ومؤثر قدمه مدربون خبراء'
  },
  {
    id: 3,
    name: 'King Faisal Hospital',
    nameAr: 'مستشفى الملك فيصل',
    type: 'Healthcare',
    typeAr: 'صحي',
    testimonial: 'The leadership programs transformed our management approach',
    testimonialAr: 'برامج القيادة غيرت نهج الإدارة لدينا'
  },
  {
    id: 4,
    name: 'Saudi Red Crescent',
    nameAr: 'الهلال الأحمر السعودي',
    type: 'NGO',
    typeAr: 'منظمات غير ربحية',
    testimonial: 'Customized training that perfectly matched our organizational needs',
    testimonialAr: 'تدريب مخصص يتناسب تماماً مع احتياجات منظمتنا'
  },
  {
    id: 5,
    name: 'National Commercial Bank',
    nameAr: 'البنك الأهلي التجاري',
    type: 'Banking',
    typeAr: 'بنوك',
    testimonial: 'High-quality content and excellent delivery methodology',
    testimonialAr: 'محتوى عالي الجودة ومنهجية تقديم ممتازة'
  },
  {
    id: 6,
    name: 'Saudi Electricity Company',
    nameAr: 'الشركة السعودية للكهرباء',
    type: 'Energy',
    typeAr: 'طاقة',
    testimonial: 'Practical training that we could immediately apply in our operations',
    testimonialAr: 'تدريب عملي استطعنا تطبيقه فوراً في عملياتنا'
  }
]

export default function OurCustomersPage() {
  const { isArabic } = useLanguage()

  return (
    <Layout>
      <Hero  >
        <TitleContainer title={isArabic ? 'عملاؤنا' : 'Our Customers'} subtitle={isArabic
          ? 'نخدم مجموعة متنوعة من المؤسسات الحكومية والشركات والمنظمات'
          : 'We serve a diverse range of government institutions, corporations, and organizations'} />
      </Hero>
      <ContentLayout className='flex flex-col gap-5'>
        <section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_CUSTOMERS.map((customer) => (
              <Card key={customer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                          {(isArabic ? customer.nameAr : customer.name).charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className={'flex-1'}>
                        <h3 className="font-bold text-lg text-foreground mb-1">
                          {isArabic ? customer.nameAr : customer.name}
                        </h3>
                        <p className="text-sm text-primary font-medium">
                          {isArabic ? customer.typeAr : customer.type}
                        </p>
                      </div>
                    </div>
                    <div className={`relative `}>
                      <Quote className={`w-8 h-8 text-primary/20 absolute -top-2`} />
                      <p className="text-sm text-muted-foreground pt-6 italic">
                        "{isArabic ? customer.testimonialAr : customer.testimonial}"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section  className="bg-primary text-primary-foreground py-16" >

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">150+</p>
              <p className="text-sm opacity-90">{isArabic ? 'عميل' : 'Clients'}</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-sm opacity-90">{isArabic ? 'برنامج تدريبي' : 'Training Programs'}</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">15K+</p>
              <p className="text-sm opacity-90">{isArabic ? 'متدرب' : 'Trainees'}</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">98%</p>
              <p className="text-sm opacity-90">{isArabic ? 'رضا العملاء' : 'Satisfaction Rate'}</p>
            </div>
          </div>
        </section>
      </ContentLayout>

    </Layout>
  )
}
