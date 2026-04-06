'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCaseStudy } from '@/hooks/api/use-case-studies'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Building2, Target, Lightbulb, TrendingUp } from 'lucide-react'

export default function CaseStudyDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const { data: caseStudy, isLoading } = useCaseStudy(id)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-12">
          <Skeleton className="h-8 w-64 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    )
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            {isArabic ? 'دراسة الحالة غير موجودة' : 'Case study not found'}
          </h1>
          <Link href="/case-studies" className="text-primary hover:underline">
            {isArabic ? 'العودة إلى دراسات الحالة' : 'Back to case studies'}
          </Link>
        </div>
      </div>
    )
  }

  const displayTitle = isArabic ? caseStudy.titleAr : caseStudy.titleEn
  const displayChallenge = isArabic ? caseStudy.challengeAr : caseStudy.challengeEn
  const displaySolution = isArabic ? caseStudy.solutionAr : caseStudy.solutionEn
  const displayResults = isArabic ? caseStudy.resultsAr : caseStudy.resultsEn

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-12">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                {isArabic ? 'الرئيسية' : 'Home'}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/case-studies">
                {isArabic ? 'دراسات الحالة' : 'Case Studies'}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{displayTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl mx-auto">
          {caseStudy.coverImage && (
            <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={caseStudy.coverImage}
                alt={displayTitle}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="mb-8">
            <Badge className="mb-4">{caseStudy.industry}</Badge>
            <h1 className="text-4xl font-bold text-primary mb-4">{displayTitle}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{caseStudy.clientName}</span>
            </div>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {isArabic ? 'التحدي' : 'Challenge'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{displayChallenge}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  {isArabic ? 'الحل' : 'Solution'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{displaySolution}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {isArabic ? 'النتائج' : 'Results'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{displayResults}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
