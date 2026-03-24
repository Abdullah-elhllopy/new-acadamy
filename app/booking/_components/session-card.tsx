// components/booking/session-card.tsx
'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, AlertCircle } from 'lucide-react'
import { CourseSession } from '@/types/booking'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'

interface SessionCardProps {
    session: CourseSession
    isSelected: boolean
    onSelect: () => void
    index: number
}

export function SessionCard({ session, isSelected, onSelect, index }: SessionCardProps) {
    const {  isArabic } = useLanguage()
    const availabilityStatus = session.isFull
        ? { label: isArabic ? 'مكتمل' : 'Full', variant: 'destructive' as const }
        : session.isAlmostFull
            ? { label: isArabic ? 'الأماكن شبه مكتملة' : 'Almost Full', variant: 'warning' as const }
            : { label: isArabic ? 'متاح' : 'Available', variant: 'secondary' as const }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
                "relative rounded-xl border-2 p-5 transition-all duration-300",
                isSelected
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border bg-card hover:border-primary/50 hover:shadow-md",
                session.isFull && "opacity-60 cursor-not-allowed"
            )}
        >
            {/* Availability Badge */}
            <div className={cn(
                "absolute top-4 flex",
            )}>
                <Badge variant={availabilityStatus.variant as any}>
                    {availabilityStatus.label}
                </Badge>
            </div>

            {/* Date - Prominent */}
            <div className={"mb-4 mt-6"}>
                <div className="flex items-center gap-2 text-primary mb-1">
                    <Calendar className="w-5 h-5" />
                    <span className={cn(
                        "text-lg font-bold",
                    )}>
                        {session.startDate} - {session.endDate}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span >{session.time}</span>
                </div>
            </div>

            {/* Location */}
            <div className={cn(
                "flex items-start gap-2 mb-4 text-foreground",
            )}>
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
                <span >{session.location}</span>
            </div>

            {/* Seats & Price */}
            <div className="flex items-center justify-between mb-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className={cn(
                        "text-sm",
                        session.isAlmostFull && "text-warning font-medium",
                        
                    )}>
                        {isArabic
                            ? `${session.availableSeats} من ${session.totalSeats} متاح`
                            : `${session.availableSeats} of ${session.totalSeats} available`
                        }
                    </span>
                </div>

                <div>
                    <span className="text-2xl font-bold text-primary">
                        {session.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground mr-1">
                        {isArabic ? 'جنية' : 'EGP'}
                    </span>
                </div>
            </div>

            {/* Warning for almost full */}
            {session.isAlmostFull && !session.isFull && (
                <div className={cn(
                    "flex items-center gap-2 p-3 rounded-lg bg-warning/10 text-warning mb-4",
                )}>
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span className="text-sm">
                        {isArabic
                            ? 'الأماكن محدودة - احجز الآن لتأمين مقعدك'
                            : 'Limited seats - Book now to secure your spot'
                        }
                    </span>
                </div>
            )}

            {/* Select Button */}
            <Button
                onClick={onSelect}
                disabled={session.isFull}
                variant={isSelected ? "default" : "outline"}
                className={cn(
                    "w-full",
                    isSelected && "bg-primary hover:bg-primary-hover"
                )}
            >
                {session.isFull
                    ? (isArabic ? 'مكتمل' : 'Full')
                    : isSelected
                        ? (isArabic ? 'تم الاختيار ✓' : 'Selected ✓')
                        : (isArabic ? 'اختر هذا الموعد' : 'Select This Session')
                }
            </Button>
        </motion.div>
    )
}