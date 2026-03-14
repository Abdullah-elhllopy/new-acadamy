// components/sections/section-header.tsx
'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'

interface SectionHeaderProps {
    titleEn: string
    titleAr: string
    viewAllLink?: string
    viewAllLabel?: { en: string; ar: string }
    className?: string
    action?: React.ReactNode
}

export function SectionHeader({
    titleEn,
    titleAr,
    viewAllLink,
    viewAllLabel = { en: 'Browse All', ar: 'تصفح الكل' },
    className,
    action
}: SectionHeaderProps) {
    const { isRTL } = useLanguage()
    const title = isRTL ? titleAr : titleEn

    return (
        <div className={cn(
            "flex items-center justify-between mb-10",
            className
        )}>
            <h2 className={cn(
                "text-3xl md:text-4xl font-bold text-foreground font-sans",
            )}>
                {title}
            </h2>

            {action ? (
                action
            ) : viewAllLink ? (
                <Button
                    asChild
                    className="rounded-full px-6 py-5 bg-primary hover:bg-secondary text-primary-foreground font-medium transition-colors"
                >
                    <Link href={viewAllLink}>
                        {isRTL ? viewAllLabel.ar : viewAllLabel.en}
                        <ArrowLeft className={cn(
                            "w-4 h-4",
                            'arrow-left',
                        )} />
                    </Link>
                </Button>
            ) : null}
        </div>
    )
}