'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCaseStudies } from '@/hooks/api/use-case-studies'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/states/empty-state'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/shared/hooks/useLanguage'
import Image from 'next/image'

export default function CaseStudiesPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [industry, setIndustry] = useState<string>()

  const { data: caseStudies, isLoading } = useCaseStudies({ industry })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-12">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">
          {isArabic ? 'دراسات الحالة' : 'Case Studies'}
        </h1>

        <div className="mb-8">
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder={isArabic ? 'جميع الصناعات' : 'All industries'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isArabic ? 'جميع الصناعات' : 'All industries'}</SelectItem>
              <SelectItem value="technology">{isArabic ? 'التكنولوجيا' : 'Technology'}</SelectItem>
              <SelectItem value="healthcare">{isArabic ? 'الرعاية الصحية' : 'Healthcare'}</SelectItem>
              <SelectItem value="finance">{isArabic ? 'المالية' : 'Finance'}</SelectItem>
              <SelectItem value="education">{isArabic ? 'التعليم' : 'Education'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!caseStudies || caseStudies.length === 0 ? (
          <EmptyState
            title={isArabic ? 'لا توجد دراسات حالة' : 'No case studies found'}
            description={isArabic ? 'لم يتم العثور على أي دراسات حالة' : 'No case studies match your filter'}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((caseStudy) => (
              <Link key={caseStudy.id} href={`/case-studies/${caseStudy.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  {caseStudy.coverImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={caseStudy.coverImage}
                        alt={isArabic ? caseStudy.titleAr : caseStudy.titleEn}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <Badge className="w-fit mb-2">{caseStudy.industry}</Badge>
                    <CardTitle className="line-clamp-2">
                      {isArabic ? caseStudy.titleAr : caseStudy.titleEn}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {isArabic ? 'العميل:' : 'Client:'} {caseStudy.clientName}
                    </p>
                    <p className="text-sm line-clamp-3">
                      {isArabic ? caseStudy.challengeAr : caseStudy.challengeEn}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
