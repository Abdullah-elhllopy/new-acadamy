'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface OrderItem {
  title: string
  titleAr: string
  price: number
  quantity?: number
}

interface OrderSummaryProps {
  language: string
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
}

export function OrderSummary({ language, items, subtotal, tax, total }: OrderSummaryProps) {
  const isArabic = language === 'ar'

  return (
    <Card>
      <CardHeader>
        <CardTitle className={isArabic ? 'text-right' : ''}>
          {isArabic ? 'ملخص الطلب' : 'Order Summary'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-sm">{isArabic ? item.titleAr : item.title}</span>
            <span className="font-medium">{item.price} {isArabic ? 'ر.س' : 'SAR'}</span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between text-sm">
          <span>{isArabic ? 'المجموع الفرعي' : 'Subtotal'}</span>
          <span>{subtotal} {isArabic ? 'ر.س' : 'SAR'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>{isArabic ? 'الضريبة' : 'Tax'}</span>
          <span>{tax} {isArabic ? 'ر.س' : 'SAR'}</span>
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-bold">
          <span>{isArabic ? 'الإجمالي' : 'Total'}</span>
          <span className="text-primary">{total} {isArabic ? 'ر.س' : 'SAR'}</span>
        </div>
      </CardContent>
    </Card>
  )
}
