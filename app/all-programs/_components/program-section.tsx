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

interface ProgramSectionProps {
    section: ProgramSectionType
    index: number
    className?: string
}

export function ProgramSection({ section, index, className }: ProgramSectionProps) {
    const hasBackground = section.id === 'special-packages' // if we add it later

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={cn(
                "py-16 md:py-20",
                hasBackground && "bg-muted",
                className
            )}
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-20 ">
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
                    <EmptyState title={section.emptyMessage?.ar || ''} description={''}                        // type="no-courses"
                    // title={section.emptyMessage?.ar}
                    // description={isArabic ? 'سيتم إضافة دورات قريباً' : 'Courses will be added soon'}
                    />
                )}
            </div>
        </motion.section>
    )
}