'use client'

import { useState, useMemo } from 'react'
import { useTranslate } from '@/locales/use-locales'
import { ProgramCard } from '@/components/cards/program-card'
import { FilterSidebar, FilterState } from '@/components/filters/filter-sidebar'
import { EmptyState } from '@/components/states/empty-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Search } from 'lucide-react'
import { Program, Session } from '@/shared/types'
import Link from 'next/link'
import { Breadcrumb } from '@/components/shared/breadcrumb'

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
  const { t, currentLang } = useTranslate('programs')
  const isArabic = currentLang.value === 'ar'
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 10000],
    locations: [],
    trainers: [],
  })
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

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
      return searchMatch && categoryMatch
    })
  }, [searchTerm, activeCategory, isArabic])

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-[#3d4f6b] text-white">
        <div className="container mx-auto px-4 md:px-20">
          <div className="flex items-center justify-between h-16">
            <Breadcrumb
              items={[
                { label: isArabic ? 'الرئيسية' : 'Home', href: '/' },
                { label: isArabic ? 'جميع الدورات' : 'All Courses' }
              ]}
              isArabic={isArabic}
              className="text-white"
            />
            <Button className="bg-[#2c3e56] hover:bg-[#1f2d3d] rounded-full px-6">
              {isArabic ? 'التعليم' : 'Education'}
            </Button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-[#2c3e56] text-white border-t border-gray-600">
        <div className="container mx-auto px-4 md:px-20">
          <div className="flex items-center gap-4 overflow-x-auto py-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setCurrentPage(1)
                }}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-white text-[#2c3e56]'
                    : 'hover:bg-[#3d4f6b]'
                }`}
              >
                {isArabic ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-20">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
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
                    placeholder={isArabic ? 'ابحث عن دورة...' : 'Search for a course...'}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className={`h-12 ${isArabic ? 'pr-11 text-right' : 'pl-11'}`}
                  />
                </div>
              </div>

              {/* Filter Label */}
              <div className={`mb-6 ${isArabic ? 'text-right' : ''}`}>
                <h2 className="text-xl font-bold text-foreground">
                  {isArabic ? 'التصنيف حسب' : 'Filter by'}
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
                        session={program.sessions[0]}
                        language={currentLang.value as 'en' | 'ar'}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mb-12">
                      <Pagination>
                        <PaginationContent>
                          {currentPage > 1 && (
                            <PaginationItem>
                              <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setCurrentPage(currentPage - 1)
                                }}
                              />
                            </PaginationItem>
                          )}

                          {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1
                            if (pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - currentPage) <= 1) {
                              return (
                                <PaginationItem key={pageNum}>
                                  <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setCurrentPage(pageNum)
                                    }}
                                    isActive={pageNum === currentPage}
                                  >
                                    {pageNum}
                                  </PaginationLink>
                                </PaginationItem>
                              )
                            }
                            return null
                          })}

                          {currentPage < totalPages && (
                            <PaginationItem>
                              <PaginationNext
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setCurrentPage(currentPage + 1)
                                }}
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
                  title={isArabic ? 'لم يتم العثور على دورات' : 'No programs found'}
                  description={isArabic ? 'جرب تغيير معايير البحث' : 'Try changing your search criteria'}
                  language={currentLang.value as 'en' | 'ar'}
                />
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-[#3d4f6b] text-white rounded-2xl p-12 text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">
              {isArabic ? 'احجز برنامجك الخاص' : 'Book Your Custom Program'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {isArabic
                ? 'هل تريد برنامج تدريبي مخصص لشركتك؟ نحن هنا لمساعدتك'
                : 'Want a custom training program for your company? We are here to help'}
            </p>
            <Button asChild className="bg-white text-[#3d4f6b] hover:bg-gray-100 rounded-full px-8 py-6 text-lg">
              <Link href="/contact">
                {isArabic ? 'اتصل بنا' : 'Contact Us'}
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
