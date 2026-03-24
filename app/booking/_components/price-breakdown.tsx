// components/booking/price-breakdown.tsx
'use client'

import { motion } from 'framer-motion'
import { Tag, Receipt, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'

interface PriceBreakdownProps {
    subtotal: number
    discount: number
    tax: number
    total: number
    currency: string
    discountCode?: string
    className?: string
}

export function PriceBreakdown({
    subtotal,
    discount,
    tax,
    total,
    currency,
    discountCode,
    className
}: PriceBreakdownProps) {
    const { isArabic } = useLanguage()


    return (
        <div className={cn("bg-muted rounded-xl p-6 space-y-4", className)}>
            <h4 className={cn(
                "font-bold text-foreground mb-4",
            )}>
                {isArabic ? 'ملخص التكلفة' : 'Price Breakdown'}
            </h4>

            {/* Subtotal */}
            <div className={cn(
                "flex justify-between text-muted-foreground",
            )}>
                <span>{isArabic ? 'المبلغ الفرعي' : 'Subtotal'}</span>
                <span>{subtotal.toLocaleString()} {currency}</span>
            </div>

            {/* Discount */}
            {discount > 0 && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                        "flex justify-between text-success",
                        
                    )}
                >
                    <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {isArabic ? `خصم (${discountCode})` : `Discount (${discountCode})`}
                    </span>
                    <span>-{discount.toLocaleString()} {currency}</span>
                </motion.div>
            )}

            {/* Tax */}
            <div className={cn(
                "flex justify-between text-muted-foreground",
                
            )}>
                <span className="flex items-center gap-1">
                    <Receipt className="w-4 h-4" />
                    {isArabic ? 'ضريبة القيمة المضافة (14%)' : 'VAT (14%)'}
                </span>
                <span>{tax.toLocaleString()} {currency}</span>
            </div>

            <div className="h-px bg-border" />

            {/* Total */}
            <div className={cn("flex justify-between items-center",)}>
                <span className={cn("font-bold text-lg text-foreground",)}>
                    {isArabic ? 'الإجمالي' : 'Total'}
                </span>
                <span className="text-2xl font-bold text-primary">
                    {total.toLocaleString()} {currency}
                </span>
            </div>

            <p className={cn(
                "text-xs text-muted-foreground flex items-start gap-1",
            )}>
                <Info className="w-3 h-3 mt-0.5 shrink-0" />
                {isArabic
                    ? 'الأسعار تشمل ضريبة القيمة المضافة. رسوم إضافية قد تنطبق على بعض طرق الدفع.'
                    : 'Prices include VAT. Additional fees may apply for certain payment methods.'
                }
            </p>
        </div>
    )
}