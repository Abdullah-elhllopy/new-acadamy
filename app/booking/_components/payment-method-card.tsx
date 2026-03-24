// components/booking/payment-method-card.tsx
'use client'

import { motion } from 'framer-motion'
import { CreditCard, Building2, MapPin, Check, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'

type PaymentMethod = 'online' | 'bank_transfer' | 'center'

interface PaymentMethodCardProps {
    method: PaymentMethod
    isSelected: boolean
    onSelect: () => void
}

const methods = {
    online: {
        icon: CreditCard,
        titleEn: 'Online Payment',
        titleAr: 'دفع إلكتروني',
        descriptionEn: 'Secure payment via credit/debit card',
        descriptionAr: 'دفع آمن عبر بطاقة الائتمان/الخصم',
        badge: 'Instant'
    },
    bank_transfer: {
        icon: Building2,
        titleEn: 'Bank Transfer',
        titleAr: 'تحويل بنكي',
        descriptionEn: 'Upload transfer receipt for verification',
        descriptionAr: 'ارفع إيصال التحويل للتحقق',
        badge: '24h'
    },
    center: {
        icon: MapPin,
        titleEn: 'Pay at Center',
        titleAr: 'الدفع في المركز',
        descriptionEn: 'Visit our training center to complete payment',
        descriptionAr: 'زور مركز التدريب لإتمام الدفع',
        badge: null
    }
}

export function PaymentMethodCard({ method, isSelected, onSelect }: PaymentMethodCardProps) {
    const {  isRTL ,isArabic} = useLanguage()
    const config = methods[method]
    const Icon = config.icon

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className={cn(
                "relative w-full p-5 rounded-xl border-2 text-left transition-all duration-300",
                isSelected
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border bg-card hover:border-primary/30",
            )}
        >
            {/* Selection Indicator */}
            <div className={cn(
                "absolute top-4 w-6 h-6 rounded-full border-2 flex items-center justify-center",
                isSelected
                    ? "border-primary bg-primary"
                    : "border-muted-foreground",
                isRTL ? "left-4" : "right-4"
            )}>
                {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
            </div>

            <div className={cn(
                "flex items-start gap-4",
            )}>
                <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                    <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1">
                    <div className={cn(
                        "flex items-center gap-2 mb-1",
                    )}>
                        <h4 className={cn(
                            "font-bold text-foreground",
                            isArabic && "font-sans"
                        )}>
                            {isArabic ? config.titleAr : config.titleEn}
                        </h4>
                        {config.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                                {config.badge}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {isArabic ? config.descriptionAr : config.descriptionEn}
                    </p>
                </div>
            </div>

            {/* Security Badge for Online */}
            {method === 'online' && isSelected && (
                <div className={cn(
                    "mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground",
                )}>
                    <Shield className="w-4 h-4 text-success" />
                    <span>
                        {isArabic
                            ? 'مدفوعات آمنة مشفرة - نحن لا نخزن بيانات بطاقتك'
                            : 'Secure encrypted payments - We never store your card details'
                        }
                    </span>
                </div>
            )}
        </motion.button>
    )
}