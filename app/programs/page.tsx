'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslate } from '@/locales/use-locales'
import { ProgramCard } from '@/components/cards/program-card'
import { FilterSidebar, FilterState } from '@/components/filters/filter-sidebar'
import { EmptyState } from '@/components/states/empty-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/shared/pagination'
import { Search, X, Menu } from 'lucide-react'
import { Program, Session } from '@/shared/types'
import { Breadcrumb } from '@/components/shared/breadcrumb'
import { ContentLayout, Layout } from '@/layout/page-layout'
import { BookProgramSection } from '../all-programs/_components/book-program-section'
import { useLanguage } from '@/shared/hooks/useLanguage'

// Mock data
export const mockPrograms: (Program & { sessions: Session[] })[] = [
  {
    id: '1',
    titleEn: 'Leadership Development',
    titleAr: 'تطوير المهارات القيادية',
    descriptionEn: 'Comprehensive program for developing leadership skills and strategic thinking',
    descriptionAr: 'برنامج شامل لتطوير المهارات القيادية والتفكير الاستراتيجي',
    category: 'Leadership',
    trainer: {
      id: '1',
      nameEn: 'Dr. Mohammed Ahmed',
      nameAr: 'د. محمد أحمد',
      rating: 4.8,
      reviewCount: 124,
    },
    location: 'Riyadh',
    price: 2999,
    duration: 24,
    capacity: 20,
    objectives: ['Master leadership styles', 'Develop strategic thinking', 'Improve team dynamics'],
    createdAt: new Date(),
    updatedAt: new Date(),
    sessions: [
      {
        id: 'ses1',
        programId: '1',
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-17'),
        time: '9:00 AM - 5:00 PM',
        location: 'Riyadh Conference Center',
        availableSeats: 8,
        totalSeats: 20,
        price: 2999,
      },
    ],
    type: 'new',
  },
  {
    id: '2',
    titleEn: 'Digital Marketing Mastery',
    titleAr: 'إتقان التسويق الرقمي',
    descriptionEn: 'Learn modern digital marketing strategies and tools',
    descriptionAr: 'تعلم استراتيجيات التسويق الرقمي والأدوات الحديثة',
    category: 'Marketing',
    trainer: {
      id: '2',
      nameEn: 'Fatima Al-Shehri',
      nameAr: 'فاطمة الشهري',
      rating: 4.9,
      reviewCount: 87,
    },
    location: 'Jeddah',
    price: 3499,
    duration: 40,
    capacity: 25,
    objectives: ['Master SEO', 'Learn social media marketing', 'Create digital campaigns'],
    createdAt: new Date(),
    updatedAt: new Date(),
    sessions: [
      {
        id: 'ses2',
        programId: '2',
        startDate: new Date('2024-03-22'),
        endDate: new Date('2024-03-26'),
        time: '10:00 AM - 4:00 PM',
        location: 'Jeddah Business Hub',
        availableSeats: 12,
        totalSeats: 25,
        price: 3499,
      },
    ],
    type: 'mostWanted',
  },
  {
    id: '3',
    titleEn: 'Project Management Excellence',
    titleAr: 'التميز في إدارة المشاريع',
    descriptionEn: 'Master project management methodologies and best practices',
    descriptionAr: 'إتقان منهجيات إدارة المشاريع وأفضل الممارسات',
    category: 'Management',
    trainer: {
      id: '3',
      nameEn: 'A. Salman Al-Dosari',
      nameAr: 'أ. سلمان الدوسري',
      rating: 4.7,
      reviewCount: 156,
    },
    location: 'Dammam',
    price: 2799,
    duration: 32,
    capacity: 15,
    objectives: ['Learn PM methodologies', 'Master risk management', 'Improve stakeholder communication'],
    createdAt: new Date(),
    updatedAt: new Date(),
    sessions: [
      {
        id: 'ses3',
        programId: '3',
        startDate: new Date('2024-03-29'),
        endDate: new Date('2024-04-02'),
        time: '8:00 AM - 4:00 PM',
        location: 'Dammam Training Center',
        availableSeats: 5,
        totalSeats: 15,
        price: 2799,
      },
    ],
    type: 'new',
  },
]

export default function ProgramsPage() {
  const { isArabic } = useLanguage()
  const { t } = useTranslate('programs')
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 10000],
    locations: [],
    trainers: [],
    fields: [],
    tracks: [],
    courseTypes: [],
    languages: [],
    dates: [],
  })
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const itemsPerPage = 9

  // Initialize filters from URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    const newFilters: FilterState = {
      categories: params.get('category')?.split(',').filter(Boolean) || [],
      priceRange: [0, 10000],
      locations: params.get('location')?.split(',').filter(Boolean) || [],
      trainers: params.get('instructor')?.split(',').filter(Boolean) || [],
      fields: params.get('field')?.split(',').filter(Boolean) || [],
      tracks: params.get('track')?.split(',').filter(Boolean) || [],
      courseTypes: params.get('courseType')?.split(',').filter(Boolean) || [],
      languages: params.get('language')?.split(',').filter(Boolean) || [],
      dates: params.get('date')?.split(',').filter(Boolean) || [],
    }
    if (params.get('minPrice') && params.get('maxPrice')) {
      newFilters.priceRange = [parseInt(params.get('minPrice')!), parseInt(params.get('maxPrice')!)]
    }
    setFilters(newFilters)
  }, [])

  // Update URL when filters change
  const updateURL = (newFilters: FilterState) => {
    const params = new URLSearchParams()
    if (newFilters.categories.length) params.set('category', newFilters.categories.join(','))
    if (newFilters.locations.length) params.set('location', newFilters.locations.join(','))
    if (newFilters.trainers.length) params.set('instructor', newFilters.trainers.join(','))
    if (newFilters.fields.length) params.set('field', newFilters.fields.join(','))
    if (newFilters.tracks.length) params.set('track', newFilters.tracks.join(','))
    if (newFilters.courseTypes.length) params.set('courseType', newFilters.courseTypes.join(','))
    if (newFilters.languages.length) params.set('language', newFilters.languages.join(','))
    if (newFilters.dates.length) params.set('date', newFilters.dates.join(','))
    if (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] < 10000) {
      params.set('minPrice', newFilters.priceRange[0].toString())
      params.set('maxPrice', newFilters.priceRange[1].toString())
    }
    router.push(`?${params.toString()}`)
  }

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    updateURL(newFilters)
    setCurrentPage(1)
  }

  const removeFilter = (type: 'category' | 'location' | 'instructor' | 'field' | 'track' | 'courseType' | 'language', value: string) => {
    const newFilters = { ...filters }
    if (type === 'category') newFilters.categories = newFilters.categories.filter(c => c !== value)
    if (type === 'location') newFilters.locations = newFilters.locations.filter(l => l !== value)
    if (type === 'instructor') newFilters.trainers = newFilters.trainers.filter(t => t !== value)
    if (type === 'field') newFilters.fields = newFilters.fields.filter(f => f !== value)
    if (type === 'track') newFilters.tracks = newFilters.tracks.filter(t => t !== value)
    if (type === 'courseType') newFilters.courseTypes = newFilters.courseTypes.filter(ct => ct !== value)
    if (type === 'language') newFilters.languages = newFilters.languages.filter(l => l !== value)
    handleFilterChange(newFilters)
  }

  const categories = [
    { id: 'all', labelEn: 'All', labelAr: 'الكل' },
    { id: 'leadership', labelEn: 'Leadership', labelAr: 'القيادة' },
    { id: 'marketing', labelEn: 'Marketing', labelAr: 'التسويق' },
    { id: 'management', labelEn: 'Management', labelAr: 'الإدارة' },
    { id: 'technology', labelEn: 'Technology', labelAr: 'التقنية' },
    { id: 'business', labelEn: 'Business', labelAr: 'الأعمال' },
  ]

  // Filter programs based on search and filters
  const filteredPrograms = useMemo(() => {
    return mockPrograms.filter((program) => {
      const title = isArabic ? program.titleAr : program.titleEn
      const searchMatch = title.toLowerCase().includes(searchTerm.toLowerCase())
      const categoryMatch = activeCategory === 'all' || program.category.toLowerCase() === activeCategory
      
      // Advanced filters
      const categoryFilterMatch = filters.categories.length === 0 || filters.categories.some(cat => program.category.toLowerCase() === cat.toLowerCase())
      const locationFilterMatch = filters.locations.length === 0 || filters.locations.some(loc => program.location.toLowerCase() === loc.toLowerCase())
      const trainerFilterMatch = filters.trainers.length === 0 || filters.trainers.some(trainer => program.trainer.nameEn.toLowerCase().includes(trainer.toLowerCase()))
      const priceFilterMatch = program.price >= filters.priceRange[0] && program.price <= filters.priceRange[1]
      
      return searchMatch && categoryMatch && categoryFilterMatch && locationFilterMatch && trainerFilterMatch && priceFilterMatch
    })
  }, [searchTerm, activeCategory, isArabic, filters])

  // Pagination
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPrograms = filteredPrograms.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handleReset = () => {
    setSearchTerm('')
    const resetFilters: FilterState = {
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
    setFilters(resetFilters)
    router.push('?')
    setCurrentPage(1)
  }

  const activeFilterCount = filters.categories.length + filters.locations.length + filters.trainers.length + filters.fields.length + filters.tracks.length + filters.courseTypes.length + filters.languages.length

  return (
    <Layout>
      {/* Top Navigation Bar */}
      <div className="bg-[#3d4f6b] text-white">
        <div className="container mx-auto px-4 md:px-20">
          <div className="flex items-center justify-between h-16">
            <Breadcrumb
              items={[
                { label: t('home'), href: '/' },
                { label: t('allCourses') }
              ]}
              isArabic={isArabic}
              className="text-white"
            />
            <Button className="bg-hero-bg hover:bg-hero-hover rounded-full px-6">
              {t('education')}
            </Button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-hero-bg text-white border-t border-gray-600">
        <div className="container mx-auto px-4 md:px-20">
          <div className="flex items-center gap-4 overflow-x-auto py-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setCurrentPage(1)
                }}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === cat.id
                  ? 'bg-white text-hero-bg'
                  : 'hover:bg-hero-hover'
                  }`}
              >
                {isArabic ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ContentLayout>
        <React.Fragment>
          {/* Active Filters Bar */}
          {activeFilterCount > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  {t('activeFilters')}
                </span>
                {filters.fields.map(field => (
                  <div key={`field-${field}`} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                    <span className="text-sm">{field}</span>
                    <button onClick={() => removeFilter('field', field)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {filters.tracks.map(track => (
                  <div key={`track-${track}`} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                    <span className="text-sm">{track}</span>
                    <button onClick={() => removeFilter('track', track)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {filters.categories.map(cat => (
                  <div key={`cat-${cat}`} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                    <span className="text-sm">{cat}</span>
                    <button onClick={() => removeFilter('category', cat)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {filters.locations.map(loc => (
                  <div key={`loc-${loc}`} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                    <span className="text-sm">{loc}</span>
                    <button onClick={() => removeFilter('location', loc)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {filters.courseTypes.map(courseType => (
                  <div key={`courseType-${courseType}`} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                    <span className="text-sm">{courseType}</span>
                    <button onClick={() => removeFilter('courseType', courseType)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {filters.languages.map(language => (
                  <div key={`language-${language}`} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                    <span className="text-sm">{language}</span>
                    <button onClick={() => removeFilter('language', language)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {filters.trainers.map(trainer => (
                  <div key={`trainer-${trainer}`} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                    <span className="text-sm">{trainer}</span>
                    <button onClick={() => removeFilter('instructor', trainer)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button onClick={handleReset} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  {t('clearAll')}
                </button>
              </div>
            </div>
          )}

          <section className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Menu className="w-4 h-4" />
                {t('filters')}
              </Button>
            </div>

            {/* Sidebar Filters */}
            <aside className={`lg:w-64 shrink-0 ${
              mobileDrawerOpen ? 'block' : 'hidden lg:block'
            }`}>
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleReset}
              />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search className={`w-5 h-5 absolute top-3.5 text-muted-foreground ${isArabic ? 'right-3' : 'left-3'}`} />
                  <Input
                    placeholder={t('searchCourse')}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className={`h-12 ${isArabic ? 'pr-11 ' : 'pl-11'}`}
                  />
                </div>
              </div>

              {/* Filter Label */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  {t('filterBy')}
                </h2>
              </div>

              {/* Programs Grid */}
              {paginatedPrograms.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                    {paginatedPrograms.map((program) => (
                      <ProgramCard
                        key={program.id}
                        program={program}
                        language={'ar'}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </>
              ) : (
                <EmptyState
                  title={isArabic ? 'لم يتم العثور على دورات' : 'No programs found'}
                  description={isArabic ? 'جرب تغيير معايير البحث' : 'Try changing your search criteria'}
                  language={'ar'}
                />
              )}
            </div>
          </section>

          {/* CTA Section */}
          <BookProgramSection />
        </React.Fragment>
      </ContentLayout>
    </Layout>
  )
}
