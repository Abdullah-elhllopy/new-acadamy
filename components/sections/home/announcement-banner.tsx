// components/sections/announcement-banner.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { BackButton, Button } from '@/components/ui/button'
import { X, Calendar, MapPin, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Announcement {
    id: number
    courseNameAr: string
    courseNameEn: string
    dateAr: string
    dateEn: string
    locationAr: string
    locationEn: string
    link: string
}

const announcements: Announcement[] = [
    {
        id: 1,
        courseNameAr: 'برنامج القيادة الاستراتيجية المتقدم',
        courseNameEn: 'Advanced Strategic Leadership Program',
        dateAr: '15 أبريل 2026',
        dateEn: 'April 15, 2026',
        locationAr: 'القاهرة، مصر',
        locationEn: 'Cairo, Egypt',
        link: '/programs/leadership-2026',
    },
    {
        id: 2,
        courseNameAr: 'إدارة المشاريع الاحترافية PMP',
        courseNameEn: 'Professional Project Management PMP',
        dateAr: '22 أبريل 2026',
        dateEn: 'April 22, 2026',
        locationAr: 'الرياض، السعودية',
        locationEn: 'Riyadh, KSA',
        link: '/programs/pmp-2026',
    },
    {
        id: 3,
        courseNameAr: 'التحول الرقمي للمؤسسات',
        courseNameEn: 'Digital Transformation for Organizations',
        dateAr: '1 مايو 2026',
        dateEn: 'May 1, 2026',
        locationAr: 'دبي، الإمارات',
        locationEn: 'Dubai, UAE',
        link: '/programs/digital-transformation',
    },
    {
        id: 4,
        courseNameAr: 'تطوير المهارات الإدارية',
        courseNameEn: 'Management Skills Development',
        dateAr: '10 مايو 2026',
        dateEn: 'May 10, 2026',
        locationAr: 'عمان، الأردن',
        locationEn: 'Amman, Jordan',
        link: '/programs/management-skills',
    },
]

export function AnnouncementBanner() {
    const { isArabic } = useLanguage()
    const [isVisible, setIsVisible] = useState(true)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        let animationId: number
        let scrollPos = 0
        const speed = 0.5

        const animate = () => {
            scrollPos += isArabic ? -speed : speed
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth

            if (isArabic) {
                if (Math.abs(scrollPos) >= maxScroll) scrollPos = 0
            } else {
                if (scrollPos >= maxScroll) scrollPos = 0
            }

            scrollContainer.scrollLeft = isArabic ? Math.abs(scrollPos) : scrollPos
            animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationId)
    }, [isArabic])

    if (!isVisible) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="bg-primary text-primary-foreground relative overflow-hidden z-50"
            >
                <div className="flex items-center">
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-hidden whitespace-nowrap py-3"
                    >
                        <div className="inline-flex items-center gap-12 px-4">
                            {[...announcements, ...announcements].map((item, index) => (
                                <div
                                    key={`${item.id}-${index}`}
                                    className="inline-flex items-center gap-4 text-sm"
                                >
                                    <span className="font-bold text-base">
                                        {isArabic ? item.courseNameAr : item.courseNameEn}
                                    </span>
                                    <span className="flex items-center gap-1 opacity-90">
                                        <Calendar className="w-4 h-4" />
                                        {isArabic ? item.dateAr : item.dateEn}
                                    </span>
                                    <span className="flex items-center gap-1 opacity-90">
                                        <MapPin className="w-4 h-4" />
                                        {isArabic ? item.locationAr : item.locationEn}
                                    </span>
                                    <BackButton
                                        variant="secondary"
                                        size={'sm'}
                                        asChild
                                        className="rounded-full h-8 px-4 text-xs bg-secondary hover:bg-secondary-hover"
                                        href={item.link}
                                        text={isArabic ? 'اعرف المزيد' : 'Learn More'}
                                    />

                                    <span className="mx-4 opacity-30">|</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="px-4 hover:bg-primary-hover transition-colors h-full flex items-center justify-center"
                        aria-label={isArabic ? 'إغلاق' : 'Close'}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}