// components/booking/step-indicator.tsx
'use client'

import { motion } from 'framer-motion'
import { Check, Calendar, User, CreditCard, FileCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'

interface Step {
    id: number
    icon: typeof Calendar
    labelEn: string
    labelAr: string
}

const steps: Step[] = [
    { id: 1, icon: Calendar, labelEn: 'Select Session', labelAr: 'اختيار الموعد' },
    { id: 2, icon: User, labelEn: 'Your Details', labelAr: 'بياناتك' },
    { id: 3, icon: CreditCard, labelEn: 'Payment', labelAr: 'الدفع' },
    { id: 4, icon: FileCheck, labelEn: 'Confirmation', labelAr: 'التأكيد' }
]

interface StepIndicatorProps {
    currentStep: number
    className?: string
}

export function StepIndicator({ currentStep, className }: StepIndicatorProps) {
    const { isArabic } = useLanguage()
    return (
        <div className={cn("w-full", className)}>
            <div className={cn(
                "flex items-center justify-between relative",
            )}>
                {/* Connecting Line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted">
                    <motion.div
                        className="h-full bg-primary transition-all duration-500"
                        initial={{ width: '0%' }}
                        animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    />
                </div>

                {steps.map((step, index) => {
                    const Icon = step.icon
                    const isCompleted = currentStep > step.id
                    const isCurrent = currentStep === step.id
                    const isPending = currentStep < step.id

                    return (
                        <div key={step.id} className="relative flex flex-col items-center z-10">
                            {/* Circle */}
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isCurrent ? 1.1 : 1,
                                    backgroundColor: isCompleted || isCurrent ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                                    borderColor: isCompleted || isCurrent ? 'hsl(var(--primary))' : 'hsl(var(--border))'
                                }}
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
                                    isPending && "bg-muted border-border"
                                )}
                            >
                                {/* {isCompleted ? (
                                    <Check className="w-5 h-5" />
                                ) : ( */}
                                    <Icon className={cn(
                                        "w-5 h-5 bg-accent-foreground p-0 ",
                                        // isCurrent ? "text-primary-foreground" : "text-muted-foreground"
                                    )} />
                                {/* )} */}
                            </motion.div>

                            {/* Label */}
                            <span className={cn(
                                "mt-2 text-sm font-medium whitespace-nowrap",
                                isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground",
                            )}>
                                {isArabic ? step.labelAr : step.labelEn}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}