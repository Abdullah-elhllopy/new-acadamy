'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'

const MOCK_PARTNERS = [
  { id: 1, name: 'Saudi Aramco', nameAr: 'أرامكو السعودية' },
  { id: 2, name: 'SABIC', nameAr: 'سابك' },
  { id: 3, name: 'STC', nameAr: 'الاتصالات السعودية' },
  { id: 4, name: 'Al Rajhi Bank', nameAr: 'مصرف الراجحي' },
  { id: 5, name: 'Saudi Airlines', nameAr: 'الخطوط السعودية' },
  { id: 6, name: 'Mobily', nameAr: 'موبايلي' },
  { id: 7, name: 'Zain', nameAr: 'زين' },
  { id: 8, name: 'Almarai', nameAr: 'المراعي' },
  { id: 9, name: 'Saudi Electricity', nameAr: 'الكهرباء السعودية' },
  { id: 10, name: 'Etihad Etisalat', nameAr: 'اتحاد اتصالات' },
  { id: 11, name: 'NCB', nameAr: 'الأهلي' },
  { id: 12, name: 'Riyad Bank', nameAr: 'بنك الرياض' }
]

export default function OurPartnersPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className={`max-w-2xl ${isArabic ? 'text-right' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isArabic ? 'شركاؤنا' : 'Our Partners'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isArabic
                ? 'نفخر بشراكتنا مع أبرز المؤسسات والشركات الرائدة'
                : 'We are proud to partner with leading organizations and companies'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {MOCK_PARTNERS.map((partner) => (
              <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center h-24">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {(isArabic ? partner.nameAr : partner.name).charAt(0)}
                        </span>
                      </div>
                      <p className="font-semibold text-sm text-foreground">
                        {isArabic ? partner.nameAr : partner.name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container px-4 md:px-6">
          <div className={`text-center max-w-3xl mx-auto ${isArabic ? 'text-right' : ''}`}>
            <h2 className="text-3xl font-bold mb-4">
              {isArabic ? 'هل تريد أن تصبح شريكاً؟' : 'Want to become a partner?'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isArabic
                ? 'نحن دائماً نبحث عن شراكات استراتيجية جديدة. تواصل معنا لمناقشة فرص التعاون'
                : 'We are always looking for new strategic partnerships. Contact us to discuss collaboration opportunities'}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full h-11 px-8 bg-primary hover:bg-secondary text-white font-medium transition-colors"
            >
              {isArabic ? 'تواصل معنا' : 'Contact Us'}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
