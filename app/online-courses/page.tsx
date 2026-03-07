'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { CourseCard } from '@/components/shared/course-card'
import { FilterSidebar } from '@/components/shared/filter-sidebar'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const MOCK_ONLINE_COURSES = [
  {
    id: 1,
    title: 'Data Analysis with Python',
    titleAr: 'تحليل البيانات باستخدام بايثون',
    category: 'Technology',
    categoryAr: 'تقنية',
    price: 2500,
    duration: '8 weeks',
    durationAr: '8 أسابيع',
    students: 450,
    rating: 4.8,
    type: 'online' as const
  },
  {
    id: 2,
    title: 'Digital Marketing Mastery',
    titleAr: 'إتقان التسويق الرقمي',
    category: 'Marketing',
    categoryAr: 'تسويق',
    price: 3000,
    duration: '6 weeks',
    durationAr: '6 أسابيع',
    students: 380,
    rating: 4.9,
    type: 'online' as const
  },
  {
    id: 3,
    title: 'Web Development Bootcamp',
    titleAr: 'معسكر تطوير الويب',
    category: 'Technology',
    categoryAr: 'تقنية',
    price: 4500,
    duration: '12 weeks',
    durationAr: '12 أسبوع',
    students: 520,
    rating: 4.7,
    type: 'online' as const
  },
  {
    id: 4,
    title: 'Business Communication',
    titleAr: 'التواصل في بيئة العمل',
    category: 'Business',
    categoryAr: 'أعمال',
    price: 1800,
    duration: '4 weeks',
    durationAr: '4 أسابيع',
    students: 290,
    rating: 4.6,
    type: 'online' as const
  }
]

const CATEGORIES = ['Technology', 'Marketing', 'Business', 'Leadership']

export default function OnlineCoursesPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 10000])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const filteredCourses = MOCK_ONLINE_COURSES.filter(course => {
    const matchesSearch = (isArabic ? course.titleAr : course.title)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category)
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className={`max-w-2xl ${isArabic ? 'text-right' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isArabic ? 'الدورات الأونلاين' : 'Online Courses'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isArabic
                ? 'تعلم في أي وقت ومن أي مكان مع دوراتنا التدريبية عبر الإنترنت'
                : 'Learn anytime, anywhere with our online training courses'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5`} />
              <Input
                placeholder={isArabic ? 'ابحث عن دورة...' : 'Search for a course...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={isArabic ? 'pr-10 text-right' : 'pl-10'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FilterSidebar
                language={language}
                categories={CATEGORIES}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
              />
            </div>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} language={language} />
                ))}
              </div>
              {filteredCourses.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    {isArabic ? 'لم يتم العثور على دورات' : 'No courses found'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
