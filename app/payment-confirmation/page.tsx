'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Download } from 'lucide-react'
import Link from 'next/link'

export default function PaymentConfirmationPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-12 pb-8">
          <div className={`text-center space-y-6 ${isArabic ? 'text-right' : ''}`}>
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {isArabic ? 'تم الدفع بنجاح!' : 'Payment Successful!'}
              </h1>
              <p className="text-muted-foreground">
                {isArabic
                  ? 'شكراً لك! تم استلام دفعتك وتأكيد تسجيلك'
                  : 'Thank you! Your payment has been received and your registration is confirmed'}
              </p>
            </div>

            <Card className="bg-muted">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className={isArabic ? 'text-right' : ''}>
                    <p className="text-muted-foreground mb-1">{isArabic ? 'رقم الطلب' : 'Order Number'}</p>
                    <p className="font-semibold">#ORD-2024-001</p>
                  </div>
                  <div className={isArabic ? 'text-right' : ''}>
                    <p className="text-muted-foreground mb-1">{isArabic ? 'التاريخ' : 'Date'}</p>
                    <p className="font-semibold">2024-03-15</p>
                  </div>
                  <div className={isArabic ? 'text-right' : ''}>
                    <p className="text-muted-foreground mb-1">{isArabic ? 'المبلغ' : 'Amount'}</p>
                    <p className="font-semibold">2,500 {isArabic ? 'ر.س' : 'SAR'}</p>
                  </div>
                  <div className={isArabic ? 'text-right' : ''}>
                    <p className="text-muted-foreground mb-1">{isArabic ? 'طريقة الدفع' : 'Payment Method'}</p>
                    <p className="font-semibold">{isArabic ? 'بطاقة ائتمان' : 'Credit Card'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                {isArabic ? 'تحميل الفاتورة' : 'Download Invoice'}
              </Button>
              <Button asChild>
                <Link href="/my-courses">
                  {isArabic ? 'عرض دوراتي' : 'View My Courses'}
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-4">
              {isArabic
                ? 'تم إرسال تأكيد بالبريد الإلكتروني إلى عنوان بريدك'
                : 'A confirmation email has been sent to your email address'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
