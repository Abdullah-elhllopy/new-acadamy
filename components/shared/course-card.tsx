'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Users, Star } from 'lucide-react'
import Link from 'next/link'

interface CourseCardProps {
  id: number
  title: string
  titleAr: string
  category: string
  categoryAr: string
  price: number
  duration: string
  durationAr: string
  students: number
  rating: number
  type: 'presence' | 'online'
  language: string
}

export function CourseCard({ course, language }: { course: CourseCardProps; language: string }) {
  const isArabic = language === 'ar'

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <Badge variant="secondary">{isArabic ? course.categoryAr : course.category}</Badge>
            <Badge variant="outline">{course.type === 'online' ? (isArabic ? 'أونلاين' : 'Online') : (isArabic ? 'حضوري' : 'Presence')}</Badge>
          </div>
          <h3 className={`font-bold text-lg ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? course.titleAr : course.title}
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{isArabic ? course.durationAr : course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{course.students} {isArabic ? 'متدرب' : 'students'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-2xl font-bold text-primary">{course.price} {isArabic ? 'ر.س' : 'SAR'}</span>
            <Button asChild>
              <Link href={`/${course.type === 'online' ? 'online-courses' : 'programs'}/${course.id}`}>
                {isArabic ? 'التفاصيل' : 'Details'}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
