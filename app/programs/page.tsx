'use client'

import { useState, useMemo } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { ProgramCard } from '@/components/cards/program-card'
import { FilterSidebar, FilterState } from '@/components/filters/filter-sidebar'
import { EmptyState } from '@/components/states/empty-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Search, ListIcon } from 'lucide-react'
import { Program, Session } from '@/shared/types'

// Mock data
const mockPrograms: (Program & { sessions: Session[] })[] = [
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
  },
]

export default function ProgramsPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 10000],
    locations: [],
    trainers: [],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Filter programs based on search and filters
  const filteredPrograms = useMemo(() => {
    return mockPrograms.filter((program) => {
      const title = isArabic ? program.titleAr : program.titleEn
      const searchMatch = title.toLowerCase().includes(searchTerm.toLowerCase())

      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.some((cat) => program.category.toLowerCase().includes(cat))

      const priceMatch =
        program.sessions[0].price >= filters.priceRange[0] &&
        program.sessions[0].price <= filters.priceRange[1]

      const locationMatch =
        filters.locations.length === 0 ||
        filters.locations.some((loc) => program.location.toLowerCase().includes(loc))

      return searchMatch && categoryMatch && priceMatch && locationMatch
    })
  }, [searchTerm, filters, isArabic])

  // Pagination
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPrograms = filteredPrograms.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handleReset = () => {
    setSearchTerm('')
    setFilters({
      categories: [],
      priceRange: [0, 10000],
      locations: [],
      trainers: [],
    })
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        {/* Page header */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-20">
            <div className={isArabic ? 'text-right' : ''}>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                {isArabic ? 'البرامج التدريبية' : 'Training Programs'}
              </h1>
              <p className="text-lg text-muted-foreground">
                {isArabic
                  ? 'اكتشف برامجنا المتنوعة والمصممة بعناية'
                  : 'Discover our carefully curated training programs'}
              </p>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-20">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar filters - desktop */}
              <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                <FilterSidebar
                  filters={filters}
                  onChange={setFilters}
                  onReset={handleReset}
                />
              </aside>

              {/* Main content */}
              <div className="flex-1">
                {/* Search and mobile filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                  {/* Search */}
                  <div className={`flex-1 relative ${isArabic ? 'text-right' : ''}`}>
                    <Search className={`w-5 h-5 absolute top-3.5 text-muted-foreground pointer-events-none ${isArabic ? 'right-3' : 'left-3'}`} />
                    <Input
                      placeholder={isArabic ? 'ابحث عن برامج...' : 'Search programs...'}
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                      }}
                      className={`h-12 ${isArabic ? 'pr-11' : 'pl-11'}`}
                    />
                  </div>

                  {/* Mobile filter button */}
                  <Button
                    variant="outline"
                    className="lg:hidden h-12 rounded-lg"
                  >
                    <ListIcon className="w-5 h-5 ml-2" />
                    {isArabic ? 'المرشحات' : 'Filters'}
                  </Button>
                </div>

                {/* Results */}
                <div className={`mb-8 ${isArabic ? 'text-right' : ''}`}>
                  <p className="text-base text-muted-foreground font-medium">
                    {filteredPrograms.length}{' '}
                    {isArabic ? 'برنامج متاح' : 'programs available'}
                  </p>
                </div>

                {/* Programs grid */}
                {paginatedPrograms.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                      {paginatedPrograms.map((program) => (
                        <ProgramCard
                          key={program.id}
                          program={program}
                          session={program.sessions[0]}
                          language={language as 'en' | 'ar'}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center">
                        <Pagination>
                          <PaginationContent>
                            {currentPage > 1 && (
                              <PaginationItem>
                                <PaginationPrevious
                                  href="#"
                                  onClick={() => setCurrentPage(currentPage - 1)}
                                />
                              </PaginationItem>
                            )}

                            {[...Array(totalPages)].map((_, i) => {
                              const pageNum = i + 1
                              const shouldShow =
                                pageNum === 1 ||
                                pageNum === totalPages ||
                                Math.abs(pageNum - currentPage) <= 1

                              if (!shouldShow)
                                return <PaginationEllipsis key={pageNum} />

                              return (
                                <PaginationItem key={pageNum}>
                                  <PaginationLink
                                    href="#"
                                    onClick={() => setCurrentPage(pageNum)}
                                    isActive={pageNum === currentPage}
                                  >
                                    {pageNum}
                                  </PaginationLink>
                                </PaginationItem>
                              )
                            })}

                            {currentPage < totalPages && (
                              <PaginationItem>
                                <PaginationNext
                                  href="#"
                                  onClick={() => setCurrentPage(currentPage + 1)}
                                />
                              </PaginationItem>
                            )}
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </>
                ) : (
                  <EmptyState
                    title={isArabic ? 'لم يتم العثور على برامج' : 'No Programs Found'}
                    description={
                      isArabic
                        ? 'حاول تعديل معايير البحث أو المرشحات'
                        : 'Try adjusting your search criteria or filters'
                    }
                    language={language as 'en' | 'ar'}
                    action={{
                      label: isArabic ? 'إعادة تعيين' : 'Reset Filters',
                      href: '#',
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
