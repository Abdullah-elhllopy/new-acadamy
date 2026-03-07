'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Video, Monitor } from 'lucide-react'
import Link from 'next/link'

const MOCK_COURSES = {
  presence: [
    {
      id: 1,
      title: 'Leadership Skills',
      titleAr: 'مهارات القيادة',
      date: '2024-03-15',
      location: 'Riyadh Training Center',
      locationAr: 'مركز التدريب - الرياض',
      status: 'upcoming',
      progress: 0
    },
    {
      id: 2,
      title: 'Project Management',
      titleAr: 'إدارة المشاريع',
      date: '2024-02-20',
      location: 'Jeddah Branch',
      locationAr: 'فرع جدة',
      status: 'completed',
      progress: 100
    }
  ],
  live: [
    {
      id: 3,
      title: 'Digital Marketing',
      titleAr: 'التسويق الرقمي',
      date: '2024-03-10',
      time: '6:00 PM',
      status: 'in-progress',
      progress: 60
    }
  ],
  online: [
    {
      id: 4,
      title: 'Data Analysis with Python',
      titleAr: 'تحليل البيانات باستخدام بايثون',
      enrolled: '2024-01-15',
      status: 'in-progress',
      progress: 45
    },
    {
      id: 5,
      title: 'Business Communication',
      titleAr: 'التواصل في بيئة العمل',
      enrolled: '2023-12-01',
      status: 'completed',
      progress: 100
    }
  ]
}

export default function MyCoursesPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [activeTab, setActiveTab] = useState('presence')

  const getStatusBadge = (status: string) => {
    const statusMap = {
      upcoming: { label: isArabic ? 'قادم' : 'Upcoming', variant: 'secondary' as const },
      'in-progress': { label: isArabic ? 'جاري' : 'In Progress', variant: 'default' as const },
      completed: { label: isArabic ? 'مكتمل' : 'Completed', variant: 'outline' as const }
    }
    const statusInfo = statusMap[status as keyof typeof statusMap]
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className={`max-w-2xl ${isArabic ? 'text-right' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isArabic ? 'دوراتي' : 'My Courses'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isArabic
                ? 'تابع تقدمك في الدورات التدريبية المسجل بها'
                : 'Track your progress in enrolled training courses'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="presence">{isArabic ? 'حضوري' : 'Presence'}</TabsTrigger>
              <TabsTrigger value="live">{isArabic ? 'مباشر' : 'Live'}</TabsTrigger>
              <TabsTrigger value="online">{isArabic ? 'أونلاين' : 'Online'}</TabsTrigger>
            </TabsList>

            <TabsContent value="presence" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_COURSES.presence.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <h3 className="font-bold text-lg">
                            {isArabic ? course.titleAr : course.title}
                          </h3>
                          {getStatusBadge(course.status)}
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{course.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{isArabic ? course.locationAr : course.location}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{isArabic ? 'التقدم' : 'Progress'}</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={`/programs/${course.id}`}>
                            {isArabic ? 'عرض التفاصيل' : 'View Details'}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="live" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_COURSES.live.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <h3 className="font-bold text-lg">
                            {isArabic ? course.titleAr : course.title}
                          </h3>
                          {getStatusBadge(course.status)}
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{course.date} - {course.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            <span>{isArabic ? 'بث مباشر' : 'Live Stream'}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{isArabic ? 'التقدم' : 'Progress'}</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <Button className="w-full">
                          {isArabic ? 'الانضمام للبث' : 'Join Live Session'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="online" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_COURSES.online.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <h3 className="font-bold text-lg">
                            {isArabic ? course.titleAr : course.title}
                          </h3>
                          {getStatusBadge(course.status)}
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4" />
                            <span>{isArabic ? 'تعلم ذاتي' : 'Self-paced'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{isArabic ? 'تاريخ التسجيل:' : 'Enrolled:'} {course.enrolled}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{isArabic ? 'التقدم' : 'Progress'}</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          {isArabic ? 'متابعة التعلم' : 'Continue Learning'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
