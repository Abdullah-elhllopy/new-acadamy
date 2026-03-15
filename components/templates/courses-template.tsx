// components/templates/courses-template.tsx
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { EmptyState } from '@/components/states/empty-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { useCourses } from '@/shared/hooks/use-courses'
import { ProgramCard } from '../cards/program-card'
import { Pagination } from '../shared/pagination'
import { SubDepartmentNav } from '../shared/sub-department-nav'
import Loader from '../shared/loader'
import { Hero } from '../sections/hero'
import { ContentLayout, Layout } from '@/layout/page-layout'
import { TitleContainer } from '../shared/title'

interface CoursesTemplateProps {
  type: 'presence' | 'online' | 'live'
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  showFilters?: boolean
  showBreadcrumb?: boolean
}


export function CoursesTemplate({
  type,
  title,
  description,
  showFilters = true,
  showBreadcrumb = true
}: CoursesTemplateProps) {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const {
    courses,
    departments,
    subDepartments,
    loading,
    error,
    pagination,
    activeDepartment,
    activeSubDepartment,
    setPage,
    selectDepartment,
    selectSubDepartment
  } = useCourses({ type })

  // Filter courses by search
  const filteredCourses = courses.filter(course => {
    const searchLower = searchQuery.toLowerCase()
    const title = isArabic ? course.titleAr : course.titleEn
    const titleMatch = title ? title.toLowerCase().includes(searchLower) : false
    const instructorMatch = course.trainer
      ? (isArabic ? course.trainer.nameAr : course.trainer.nameEn)?.toLowerCase().includes(searchLower) || false
      : false
    return titleMatch || instructorMatch
  })

  const handleTabChange = (value: string) => {
    if (value === 'all') {
      selectDepartment(null)
    } else {
      selectDepartment(value)
    }
  }

  const breadcrumbs = [
    { label: isArabic ? 'الرئيسية' : 'Home', href: '/' },
    { label: isArabic ? 'جميع البرامج' : 'All Programs', href: '/all-programs' },
    { label: isArabic ? title.ar : title.en }
  ]

  return (
    <Layout >
      {/* Header Section */}
      <Hero breadcrumbItems={breadcrumbs}>
        <React.Fragment>
          <TitleContainer title={isArabic ? title.ar : title.en} subtitle={isArabic ? description.ar : description.en}/>


          <Tabs
            value={activeDepartment || 'all'}
            onValueChange={handleTabChange}
            className="w-full mt-5"
          >
            <TabsList className="w-full justify-start overflow-x-auto no-scrollbar bg-transparent  h-auto p-0">
              <TabsTrigger value="all" className="rounded-full bg-background max-w-fit">
                <span suppressHydrationWarning>{isArabic ? 'جميع الدورات' : 'All Courses'}</span>
              </TabsTrigger>

              {departments.map(dept => (
                <TabsTrigger
                  key={dept.id}
                  value={dept.id}
                  className="rounded-full bg-background max-w-fit"
                >
                  <span suppressHydrationWarning>{isArabic ? dept.nameAr : dept.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </React.Fragment>
      </Hero>
      {/* Sub-Departments Navigation */}
      <AnimatePresence>
        {activeDepartment && subDepartments.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <SubDepartmentNav
              departments={subDepartments}
              activeId={activeSubDepartment || undefined}
              onSelect={selectSubDepartment}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <ContentLayout>
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className={cn(
              "absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground",
              isArabic ? 'right-3' : 'left-3'
            )} />
            <Input
              placeholder={isArabic ? 'ابحث عن دورة...' : 'Search for a course...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "h-12 text-base",
                isArabic ? 'pr-11 text-right' : 'pl-11'
              )}
              suppressHydrationWarning
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full",
                  isArabic ? 'left-3' : 'right-3'
                )}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {showFilters && (
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 px-6 gap-2 sm:w-auto w-full">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span suppressHydrationWarning>{isArabic ? 'الفلاتر' : 'Filters'}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={isArabic ? 'right' : 'left'} className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle suppressHydrationWarning>{isArabic ? 'فلترة الدورات' : 'Filter Courses'}</SheetTitle>
                </SheetHeader>
                {/* Filter content here */}
              </SheetContent>
            </Sheet>
          )}
        </div>

        {/* Results Count */}
        <div className={cn("mb-6 text-muted-foreground")} suppressHydrationWarning>
          {isArabic
            ? `عرض ${filteredCourses.length} من ${pagination.total} دورة`
            : `Showing ${filteredCourses.length} of ${pagination.total} courses`
          }
        </div>

        {/* Courses Grid */}
        {loading ? (
          <Loader />
        ) : filteredCourses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredCourses.map((course) => (
                <ProgramCard
                  key={course.id}
                  program={course}
                  language={isArabic ? 'ar' : 'en'}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        ) : (
          <EmptyState title={'مسح البحث'} description={''}            // type={searchQuery ? 'no-results' : 'no-courses'}
          />
        )}
      </ContentLayout>
    </Layout>
  )
}