// components/sections/program-section.tsx
'use client'

import { motion } from 'framer-motion'
import { ProgramSection as ProgramSectionType } from '@/types/programs'
import { SectionHeader } from './section-header'
import { CourseCarousel } from './course-carousel'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/states/empty-state'
import { ProgramCard } from '@/components/cards/program-card'
import { mockPrograms } from '@/app/programs/page'
import { ContentLayout } from '@/layout/page-layout'
import { useLanguage } from '@/shared/hooks/useLanguage'

interface ProgramSectionProps {
    section: ProgramSectionType
    index: number
    className?: string
}

export function ProgramSection({ section, index, className }: ProgramSectionProps) {
    const { isRTL } = useLanguage()
    const hasBackground = section.id === 'special-packages'

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={cn(
                "py-12",
                hasBackground && "bg-muted",
                className
            )}
        >
            <SectionHeader
                titleEn={section.titleEn}
                titleAr={section.titleAr}
                viewAllLink={section.variant === 'carousel' ? undefined : section.courses.length > 0 ? section.viewAllLink : undefined}
                viewAllLabel={section.viewAllLabel}
            />

            {section.courses.length > 0 ? (
                section.variant === 'carousel' ? (
                    <CourseCarousel courses={section.courses} />
                ) : (
                    <div className={cn(
                        "grid gap-6",
                        section.id === 'soon'
                            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    )}>
                        {mockPrograms.map((course, idx) => (
                            <ProgramCard
                                key={course.id}
                                program={course}
                                language={'ar'}
                                className={`animate-fade-in-up animation-delay-${idx * 100}`}
                            />
                        ))}
                    </div>
                )
            ) : (
                <EmptyState 
                    title={section.emptyMessage?.ar || ''} 
                    description={''}
                    language={'ar'}
                />
            )}
        </motion.section>
    )
}
