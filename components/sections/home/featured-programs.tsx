'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslate } from '@/locales/use-locales'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProgramCard } from '../../cards/program-card'
import { useCoursesFilterByBool } from '@/hooks/api/use-courses'
import { Loader2 } from 'lucide-react'
import RenderComponent from '@/components/performance/RenderComponent'

type TabType = 'new' | 'mostWanted' | 'soon' | 'recommended'

export function FeaturedPrograms() {
  const { t, currentLang } = useTranslate('programs')
  const [activeTab, setActiveTab] = useState<TabType>('new')
  const [loadedTabs, setLoadedTabs] = useState<Set<TabType>>(new Set(['new']))

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as TabType)
    setLoadedTabs(prev => new Set(prev).add(tab as TabType))
  }

  const { data: newCourses, isLoading: loadingNew } = useCoursesFilterByBool(
    {
      now: true,
      mostSelling: null,
      recommended: null,
      soon: null,
    },
    { enabled: loadedTabs.has('new') }
  )

  const { data: mostWantedCourses, isLoading: loadingMostWanted } = useCoursesFilterByBool(
    {
      now: null,
      mostSelling: true,
      recommended: null,
      soon: null,
    },
    { enabled: loadedTabs.has('mostWanted') }
  )

  const { data: soonCourses, isLoading: loadingSoon } = useCoursesFilterByBool(
    {
      now: null,
      mostSelling: null,
      recommended: null,
      soon: true,
    },
    { enabled: loadedTabs.has('soon') }
  )

  const { data: recommendedCourses, isLoading: loadingRecommended } = useCoursesFilterByBool(
    {
      now: null,
      mostSelling: null,
      recommended: true,
      soon: null,
    },
    { enabled: loadedTabs.has('recommended') }
  )
  const renderCourses = (courses: any[] | undefined, isLoading: boolean) => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )
    }

    if (!courses || courses.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          {t('comingSoon')}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.slice(0, 6).map((course) => (
          <RenderComponent key={`home_${course.courseId}`}>
            <ProgramCard
              program={course}
              language={currentLang.value as any}
            />
          </RenderComponent>
        ))}
      </div>
    )
  }

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-20">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-12">
          {t('title')}
        </h2>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-10">
            <TabsTrigger value="new" className="rounded-full">
              {t('new')}
            </TabsTrigger>
            <TabsTrigger value="mostWanted" className="rounded-full">
              {t('mostWanted')}
            </TabsTrigger>
            <TabsTrigger value="soon" className="rounded-full">
              {t('soon')}
            </TabsTrigger>
            <TabsTrigger value="recommended" className="rounded-full">
              {t('recommended')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="mt-0">
            {renderCourses(newCourses?.allCoursesDetails, loadingNew)}
          </TabsContent>

          <TabsContent value="mostWanted">
            {renderCourses(mostWantedCourses?.allCoursesDetails, loadingMostWanted)}
          </TabsContent>

          <TabsContent value="soon">
            {renderCourses(soonCourses?.allCoursesDetails, loadingSoon)}
          </TabsContent>

          <TabsContent value="recommended">
            {renderCourses(recommendedCourses?.allCoursesDetails, loadingRecommended)}
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button size="lg" className="rounded-full h-14 px-10 bg-primary hover:bg-secondary" asChild>
            <Link href="/programs">
              {t('browseAll')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
