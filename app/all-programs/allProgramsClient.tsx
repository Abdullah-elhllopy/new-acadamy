'use client'
import { useState, useMemo } from 'react'
import { PROGRAM_SECTIONS, DUMMY_PROGRAMS } from '@/data/programs-data'
import { ProgramSection } from './_components/program-section'
import { BookProgramSection } from './_components/book-program-section'
import { FilterSidebar, FilterState } from '@/components/filters/filter-sidebar'
import { ContentLayout, Layout } from '@/layout/page-layout'
import { useCoursesFilterByCategory } from '@/hooks/api'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Hero } from '@/components/sections/hero'
import { TitleContainer } from '@/components/shared/title'
import { motion } from 'framer-motion'
import { GlobalSearch } from './_components/global-search'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

const DEFAULT_FILTERS: FilterState = {
    categories: [],
    priceRange: [0, 10000],
    locations: [],
    trainers: [],
    fields: [],
    tracks: [],
    courseTypes: [],
    languages: [],
    dates: [],
}

const AllProgramsClient = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('category')
    const { isArabic } = useLanguage()
    const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
    
    useCoursesFilterByCategory({categoryIds : [search as string]})
    
    const breadcrumbItems = [
        { label: isArabic ? 'الرئيسية' : 'Home', href: '/' },
        { label: isArabic ? 'جميع برامجنا' : 'All Programs' }
    ]

    // Filter and sort programs based on selected filters
    const filteredSections = useMemo(() => {
        return PROGRAM_SECTIONS.map(section => {
            let filteredCourses = [...section.courses]

            // Apply category filter
            if (filters.categories.length > 0) {
                // TODO: Filter by categories when API provides category IDs
            }

            // Apply fields filter
            if (filters.fields.length > 0) {
                // TODO: Filter by fields when API provides field data
            }

            // Apply tracks filter
            if (filters.tracks.length > 0) {
                // TODO: Filter by tracks when API provides track data
            }

            // Apply course type filter
            if (filters.courseTypes.length > 0) {
                filteredCourses = filteredCourses.filter(course =>
                    filters.courseTypes.includes(course.courseType)
                )
            }

            // Apply location filter
            if (filters.locations.length > 0) {
                filteredCourses = filteredCourses.filter(course => {
                    const locationValue = course.location.city.toLowerCase()
                    return filters.locations.some(loc => 
                        locationValue.includes(loc) || 
                        (loc === 'online' && course.courseType === 'online')
                    )
                })
            }

            // Apply instructor filter (trainers)
            if (filters.trainers.length > 0) {
                filteredCourses = filteredCourses.filter(course =>
                    filters.trainers.some(trainer => 
                        course.instructor.name.toLowerCase().includes(trainer.toLowerCase()) ||
                        course.instructor.nameAr.includes(trainer)
                    )
                )
            }

            // Apply price range filter
            filteredCourses = filteredCourses.filter(course =>
                course.price >= filters.priceRange[0] && course.price <= filters.priceRange[1]
            )

            // Apply language filter
            if (filters.languages.length > 0) {
                // TODO: Filter by language when API provides language field
            }

            // Apply date filter
            if (filters.dates.length > 0) {
                // TODO: Filter by dates when API provides date range
            }

            return {
                ...section,
                courses: filteredCourses
            }
        })
    }, [filters])

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters)
    }

    const handleResetFilters = () => {
        setFilters(DEFAULT_FILTERS)
    }

    // Count active filters
    const activeFiltersCount = 
        filters.categories.length +
        filters.fields.length +
        filters.tracks.length +
        filters.courseTypes.length +
        filters.locations.length +
        filters.trainers.length +
        filters.languages.length +
        filters.dates.length +
        (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 10000 ? 1 : 0)

    return (
        <Layout>
            {/* Hero Section */}
            <Hero className='overflow-visible' breadcrumbItems={breadcrumbItems}>
                <TitleContainer title={isArabic ? 'جميع برامجنا' : 'All Programs'}>
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

            <ContentLayout className='py-8'>
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden mb-4">
                        <Button
                            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2"
                        >
                            <Menu className="w-4 h-4" />
                            {isArabic ? 'الفلاتر' : 'Filters'}
                        </Button>
                    </div>

                    {/* Filters Sidebar */}
                    <aside className={`lg:sticky lg:top-24 lg:self-start ${
                        mobileDrawerOpen ? 'block' : 'hidden lg:block'
                    }`}>
                        <FilterSidebar
                            filters={filters}
                            onChange={handleFiltersChange}
                            onReset={handleResetFilters}
                        />
                    </aside>

                    {/* Programs Content */}
                    <div className="space-y-12">
                        {/* Active Filters Count */}
                        {activeFiltersCount > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-gray-600"
                            >
                                {isArabic ? `${activeFiltersCount} فلتر نشط` : `${activeFiltersCount} active filter${activeFiltersCount > 1 ? 's' : ''}`}
                            </motion.div>
                        )}

                        {filteredSections.map((section, index) => (
                            <ProgramSection
                                key={section.id}
                                section={section}
                                index={index}
                            />
                        ))}
                        <BookProgramSection />
                    </div>
                </div>
            </ContentLayout>
        </Layout>
    )
}

export default AllProgramsClient