'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OrderSummary } from '@/components/cards/order-summary'
import { Calendar, MapPin, User, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

const MOCK_ORDER = {
  course: {
    title: 'Leadership Skills Training',
    titleAr: 'تدريب مهارات القيادة',
    date: '2024-04-15',
    location: 'Riyadh Training Center',
    locationAr: 'مركز التدريب - الرياض',
    price: 2500
  },
  user: {
    name: 'Ahmed Al-Saud',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567'
  }
}

export default function OrderConfirmationPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const subtotal = MOCK_ORDER.course.price
  const tax = subtotal * 0.15
  const total = subtotal + tax

  return (
    <>
      <section className="bg-linear-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className={`max-w-2xl ${isArabic ? 'text-right' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isArabic ? 'تأكيد الطلب' : 'Order Confirmation'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isArabic
                ? 'راجع تفاصيل طلبك قبل المتابعة للدفع'
                : 'Review your order details before proceeding to payment'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className={isArabic ? 'text-right' : ''}>
                    {isArabic ? 'تفاصيل الدورة' : 'Course Details'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className={`text-xl font-bold ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? MOCK_ORDER.course.titleAr : MOCK_ORDER.course.title}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span>{MOCK_ORDER.course.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <span>{isArabic ? MOCK_ORDER.course.locationAr : MOCK_ORDER.course.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className={isArabic ? 'text-right' : ''}>
                    {isArabic ? 'معلومات المتدرب' : 'Trainee Information'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span>{MOCK_ORDER.user.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span>{MOCK_ORDER.user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span>{MOCK_ORDER.user.phone}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <OrderSummary
                language={language}
                items={[
                  {
                    title: MOCK_ORDER.course.title,
                    titleAr: MOCK_ORDER.course.titleAr,
                    price: MOCK_ORDER.course.price
                  }
                ]}
                subtotal={subtotal}
                tax={tax}
                total={total}
              />

              <Button className="w-full" asChild>
                <Link href="/payment-confirmation">
                  {isArabic ? 'المتابعة للدفع' : 'Proceed to Payment'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
