
'use client'
import { motion } from 'framer-motion'
import { PROGRAM_SECTIONS } from '@/data/programs-data'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { GlobalSearch } from './_components/global-search'
import { ProgramSection } from './_components/program-section'
import { BookProgramSection } from './_components/book-program-section'
import { Hero } from '@/components/sections/hero'
import { ContentLayout, Layout } from '@/layout/page-layout'
import {  TitleContainer } from '@/components/shared/title'

export default function AllProgramsPage() {
    const { language, } = useLanguage()
    const isArabic = language === 'ar'

    const breadcrumbItems = [
        { label: isArabic ? 'الرئيسية' : 'Home', href: '/' },
        { label: isArabic ? 'جميع برامجنا' : 'All Programs' }
    ]

    return (
        <Layout >
            {/* Hero Section */}
            <Hero breadcrumbItems={breadcrumbItems}>
                <TitleContainer title={isArabic ? 'جميع برامجنا' : 'All Programs'}  >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className='mt-4'
                    >
                        <GlobalSearch />
                    </motion.div>
                </TitleContainer>
            </Hero>


            {/* Program Sections */}
            <ContentLayout className='py-0'>
                {PROGRAM_SECTIONS.map((section, index) => (
                    <ProgramSection
                        key={section.id}
                        section={section}
                        index={index}
                    />
                ))}
                <BookProgramSection />
            </ContentLayout>

            {/* CTA Section */}

        </Layout>
    )
}