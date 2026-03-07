'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlayCircle, Clock, Users, Star, CheckCircle } from 'lucide-react'

const MOCK_COURSE = {
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
  description: 'Learn data analysis using Python, pandas, and visualization libraries',
  descriptionAr: 'تعلم تحليل البيانات باستخدام بايثون وباندا ومكتبات التصور',
  lectures: [
    { id: 1, title: 'Introduction to Python', titleAr: 'مقدمة في بايثون', duration: '45 min' },
    { id: 2, title: 'Data Structures', titleAr: 'هياكل البيانات', duration: '60 min' },
    { id: 3, title: 'Pandas Basics', titleAr: 'أساسيات باندا', duration: '75 min' }
  ]
}

export default function OnlineCourseDetailPage({ params }: { params: { id: string } }) {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={`lg:col-span-2 ${isArabic ? 'text-right' : ''}`}>
              <Badge variant="secondary" className="mb-4">
                {isArabic ? MOCK_COURSE.categoryAr : MOCK_COURSE.category}
              </Badge>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {isArabic ? MOCK_COURSE.titleAr : MOCK_COURSE.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {isArabic ? MOCK_COURSE.descriptionAr : MOCK_COURSE.description}
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{isArabic ? MOCK_COURSE.durationAr : MOCK_COURSE.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{MOCK_COURSE.students} {isArabic ? 'متدرب' : 'students'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{MOCK_COURSE.rating}</span>
                </div>
              </div>
            </div>
            <div>
              <Card>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                    <PlayCircle className="w-16 h-16 text-primary" />
                  </div>
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-primary">{MOCK_COURSE.price}</span>
                    <span className="text-muted-foreground"> {isArabic ? 'ر.س' : 'SAR'}</span>
                  </div>
                  <Button className="w-full">
                    {isArabic ? 'سجل الآن' : 'Enroll Now'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content">{isArabic ? 'المحتوى' : 'Content'}</TabsTrigger>
              <TabsTrigger value="about">{isArabic ? 'نبذة' : 'About'}</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {MOCK_COURSE.lectures.map((lecture) => (
                      <div key={lecture.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors">
                        <div className="flex items-center gap-4">
                          <PlayCircle className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{isArabic ? lecture.titleAr : lecture.title}</p>
                            <p className="text-sm text-muted-foreground">{lecture.duration}</p>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <p className={`text-muted-foreground ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? MOCK_COURSE.descriptionAr : MOCK_COURSE.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
