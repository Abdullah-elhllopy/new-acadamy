'use client'
import { PROGRAM_SECTIONS } from '@/data/programs-data'

import { ProgramSection } from './_components/program-section'
import { BookProgramSection } from './_components/book-program-section'
import { ContentLayout, Layout } from '@/layout/page-layout'
import { useCoursesFilterByCategory } from '@/hooks/api'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Hero } from '@/components/sections/hero'
import { TitleContainer } from '@/components/shared/title'
import { motion } from 'framer-motion'
import { GlobalSearch } from './_components/global-search'
import { useSearchParams } from 'next/navigation'


const AllProgramsClient = () => {
    const searchParams = useSearchParams()

    const search = searchParams.get('category')
    // console.log(search)
    const { isArabic } = useLanguage();
    useCoursesFilterByCategory({categoryIds : [search as string]})
    const breadcrumbItems = [
        { label: isArabic ? 'الرئيسية' : 'Home', href: '/' },
        { label: isArabic ? 'جميع برامجنا' : 'All Programs' }
    ]

    return (
        <Layout >
            {/* Hero Section */}
            <Hero className=' overflow-visible' breadcrumbItems={breadcrumbItems}>
                <TitleContainer title={isArabic ? 'جميع برامجنا' : 'All Programs'}  >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className='mt-4 relative z-50'
                    >
                        <GlobalSearch />
                    </motion.div>
                </TitleContainer>
            </Hero>


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

        </Layout>
    )
}

export default AllProgramsClient