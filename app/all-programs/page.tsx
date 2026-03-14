// app/[locale]/all-programs/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ChevronLeft } from 'lucide-react'
import { PROGRAM_SECTIONS } from '@/data/programs-data'
// import { ProgramSection } from '@/components/sections/program-section'
// import { GlobalSearch } from '@/components/search/global-search'
// import { BookProgramSection } from '@/components/sections/book-program-section'

import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { GlobalSearch } from './_components/global-search'
import { ProgramSection } from './_components/program-section'
import { BookProgramSection } from './_components/book-program-section'
import { Hero } from '@/components/sections/hero'

export default function AllProgramsPage() {
    const { language, } = useLanguage()
    const isArabic = language === 'ar'

    const breadcrumbItems = [
        { label: isArabic ? 'الرئيسية' : 'Home', href: '/' },
        { label: isArabic ? 'جميع برامجنا' : 'All Programs' }
    ]

    return (
        <div className="min-h-screen bg-background" >
            {/* Hero Section */}
            <Hero breadcrumbItems={breadcrumbItems}>
                <div className={cn(
                    "max-w-2xl",
                )}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 font-sans"
                    >
                        {isArabic ? 'جميع برامجنا' : 'All Programs'}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <GlobalSearch />
                    </motion.div>
                </div>
            </Hero>


            {/* Program Sections */}
            {PROGRAM_SECTIONS.map((section, index) => (
                <ProgramSection
                    key={section.id}
                    section={section}
                    index={index}
                />
            ))}

            {/* CTA Section */}
            <BookProgramSection />
        </div>
    )
}