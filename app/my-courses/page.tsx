'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Video, Monitor, Users, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Program } from '@/shared/types'
import { ProgramCard } from '@/components/cards/program-card'
import { Layout } from '@/layout/page-layout'
import { Title, TitleContainer } from '@/components/shared/title'
import { Hero } from '@/components/sections/hero'
import { EmptyState } from '@/components/states/empty-state'


interface ProgramsData {
  presence: Program[]
  live: Program[]
  online: Program[]
}

// Mock data structure matching your old API
export const MOCK_PROGRAMS: ProgramsData = {
  presence: [
    {
      id: '1',
      titleEn: 'Leadership Skills',
      titleAr: 'مهارات القيادة',
      descriptionEn: 'Comprehensive leadership program for managers and team leaders',
      descriptionAr: 'برنامج شامل في القيادة للمديرين وقادة الفرق',
      category: 'leadership',
      trainer: {
        id: '1',
        nameEn: 'Ahmed Mohammed',
        nameAr: 'أحمد محمد',
        bio: 'Expert in leadership development with over 15 years of experience',
        qualifications: ['MBA', 'PMP', 'Certified Leadership Coach'],
        photo: '/images/instructors/ahmed.jpg',
        linkedIn: 'https://linkedin.com/in/ahmed-mohammed',
        rating: 4.8,
        reviewCount: 120
      },
      location: 'الرياض - مركز التدريب الرئيسي',
      price: 2500,
      duration: 40,
      capacity: 25,
      image: '/images/courses/leadership.jpg',
      objectives: [
        'Develop effective leadership skills',
        'Master team management techniques',
        'Learn strategic decision making',
        'Enhance communication abilities'
      ],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15'),
      status: 'upcoming',
      progress: 0,
      courseType: 'حضوري'
    },
    {
      id: '2',
      titleEn: 'Project Management',
      titleAr: 'إدارة المشاريع',
      descriptionEn: 'Professional project management program covering PMP methodologies',
      descriptionAr: 'برنامج احترافي في إدارة المشاريع يغطي منهجيات PMP',
      category: 'management',
      trainer: {
        id: '2',
        nameEn: 'Khalid Al-Omari',
        nameAr: 'خالد العمري',
        bio: 'Senior Project Manager with 20+ years in construction and IT projects',
        qualifications: ['PMP', 'PRINCE2', 'MSc in Project Management'],
        photo: '/images/instructors/khalid.jpg',
        linkedIn: 'https://linkedin.com/in/khalid-alomari',
        rating: 4.9,
        reviewCount: 200
      },
      location: 'جدة - فرع جدة',
      price: 3500,
      duration: 60,
      capacity: 20,
      image: '/images/courses/pm.jpg',
      objectives: [
        'Master project planning and scheduling',
        'Learn risk management strategies',
        'Understand project budgeting',
        'Apply PMP best practices'
      ],
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-20'),
      status: 'completed',
      progress: 100,
      courseType: 'حضوري'
    }
  ],
  live: [
    {
      id: '3',
      titleEn: 'Digital Marketing',
      titleAr: 'التسويق الرقمي',
      descriptionEn: 'Comprehensive digital marketing program with live sessions',
      descriptionAr: 'برنامج شامل في التسويق الرقمي مع جلسات مباشرة',
      category: 'marketing',
      trainer: {
        id: '3',
        nameEn: 'Sara Ahmed',
        nameAr: 'سارة أحمد',
        bio: 'Digital Marketing Specialist with expertise in social media and SEO',
        qualifications: ['Google Certified', 'Facebook Blueprint', 'MBA in Marketing'],
        photo: '/images/instructors/sara.jpg',
        linkedIn: 'https://linkedin.com/in/sara-ahmed',
        rating: 4.7,
        reviewCount: 85
      },
      location: 'اونلاين - بث مباشر',
      price: 1500,
      duration: 20,
      capacity: 50,
      image: '/images/courses/marketing.jpg',
      objectives: [
        'Understand digital marketing fundamentals',
        'Master social media strategies',
        'Learn SEO and content marketing',
        'Analyze marketing metrics'
      ],
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-10'),
      status: 'in-progress',
      progress: 60,
      courseType: 'مباشر'
    }
  ],
  online: [
    {
      id: '4',
      titleEn: 'Data Analysis with Python',
      titleAr: 'تحليل البيانات باستخدام بايثون',
      descriptionEn: 'Learn data analysis techniques using Python programming language',
      descriptionAr: 'تعلم تقنيات تحليل البيانات باستخدام لغة بايثون',
      category: 'programming',
      trainer: {
        id: '4',
        nameEn: 'Mohamed Ali',
        nameAr: 'محمد علي',
        bio: 'Data Scientist with extensive experience in Python and machine learning',
        qualifications: ['PhD in Computer Science', 'Data Science Certification', 'AWS Certified'],
        photo: '/images/instructors/mohamed.jpg',
        linkedIn: 'https://linkedin.com/in/mohamed-ali',
        rating: 4.9,
        reviewCount: 150
      },
      location: 'منصة التعلم - تعلم ذاتي',
      price: 2000,
      duration: 80,
      capacity: 100,
      image: '/images/courses/python.jpg',
      objectives: [
        'Master Python programming basics',
        'Learn data manipulation with Pandas',
        'Create data visualizations',
        'Perform statistical analysis'
      ],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-25'),
      status: 'in-progress',
      progress: 45,
      courseType: 'أونلاين'
    },
    {
      id: '5',
      titleEn: 'Business Communication',
      titleAr: 'التواصل في بيئة العمل',
      descriptionEn: 'Effective communication skills for professional environment',
      descriptionAr: 'مهارات التواصل الفعال في بيئة العمل المهنية',
      category: 'soft-skills',
      trainer: {
        id: '5',
        nameEn: 'Fatima Hassan',
        nameAr: 'فاطمة حسن',
        bio: 'Corporate Communication Expert with background in HR and training',
        qualifications: ['MA in Communication', 'Certified Trainer', 'HR Certification'],
        photo: '/images/instructors/fatima.jpg',
        linkedIn: 'https://linkedin.com/in/fatima-hassan',
        rating: 4.8,
        reviewCount: 95
      },
      location: 'منصة التعلم - تعلم ذاتي',
      price: 1200,
      duration: 30,
      capacity: 75,
      image: '/images/courses/communication.jpg',
      objectives: [
        'Master business writing skills',
        'Learn effective presentation techniques',
        'Improve interpersonal communication',
        'Handle difficult conversations'
      ],
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2023-12-15'),
      status: 'completed',
      progress: 100,
      courseType: 'أونلاين'
    }
  ]
}

export default function MyCoursesPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [activeTab, setActiveTab] = useState<'presence' | 'live' | 'online'>('presence')
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'in-progress' | 'completed'>('all')
  const [courses, setCourses] = useState<ProgramsData>(MOCK_PROGRAMS)

  // Filter logic matching old component behavior
  const getFilteredCourses = (type: 'presence' | 'live' | 'online') => {
    let filtered = courses[type]

    if (filter === 'upcoming') {
      filtered = filtered.filter(c => c.status === 'upcoming' || c.progress === 0)
    } else if (filter === 'in-progress') {
      filtered = filtered.filter(c => c.status === 'in-progress' || (c.progress || 0) > 0 && (c.progress || 0) < 100)
    } else if (filter === 'completed') {
      filtered = filtered.filter(c => c.status === 'completed' || c.progress === 100)
    }

    return filtered
  }

  const getStatusBadge = (course: Program) => {
    const status = course.status || (course.progress === 100 ? 'completed' : course.progress || 0 > 0 ? 'in-progress' : 'upcoming')

    const variants = {
      upcoming: {
        label: isArabic ? 'قادم' : 'Upcoming',
        className: 'bg-secondary/10 text-secondary border-secondary/20'
      },
      'in-progress': {
        label: isArabic ? 'جاري' : 'In Progress',
        className: 'bg-primary/10 text-primary border-primary/20'
      },
      completed: {
        label: isArabic ? 'مكتمل' : 'Completed',
        className: 'bg-muted text-muted-foreground border-border'
      }
    }

    const info = variants[status]
    return (
      <Badge variant="outline" className={cn("font-bold", info.className)}>
        {info.label}
      </Badge>
    )
  }

  // const EmptyState = () => (
  //   <motion.div
  //     initial={{ opacity: 0, scale: 0.95 }}
  //     animate={{ opacity: 1, scale: 1 }}
  //     className="text-center py-16 px-4"
  //   >
  //     <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
  //       <Calendar className="w-12 h-12 text-muted-foreground" />
  //     </div>
  //     <h3 className="text-xl font-bold text-foreground mb-2">
  //       {isArabic ? 'لا توجد دورات حاليا' : 'No courses available'}
  //     </h3>
  //     <p className="text-muted-foreground mb-6">
  //       {isArabic ? 'ابدأ رحلتك التعليمية معنا اليوم' : 'Start your learning journey with us today'}
  //     </p>
  //     <Button asChild className="bg-secondary hover:bg-secondary-hover text-secondary-foreground">
  //       <Link href="/all-programs">
  //         {isArabic ? 'تصفح الكورسات' : 'Browse Courses'}
  //       </Link>
  //     </Button>
  //   </motion.div>
  // )

  const FilterButtons = ({ type }: { type: 'presence' | 'live' | 'online' }) => {
    const buttons = type === 'online'
      ? [
        { key: 'upcoming', labelAr: 'لم تبدأ بعد', labelEn: 'Not Started' },
        { key: 'in-progress', labelAr: 'جاري المشاهدة', labelEn: 'Watching' },
        { key: 'completed', labelAr: 'تم الانتهاء', labelEn: 'Completed' }
      ]
      : [
        { key: 'upcoming', labelAr: 'القادم', labelEn: 'Upcoming' },
        { key: 'completed', labelAr: 'تم الانتهاء', labelEn: 'Completed' }
      ]

    return (
      <div className={cn(
        "flex flex-wrap gap-3 mb-8",
        isArabic ? 'justify-start' : 'justify-start'
      )}>
        {buttons.map((btn) => (
          <Button
            key={btn.key}
            variant={filter === btn.key ? "default" : "outline"}
            onClick={() => setFilter(filter === btn.key ? 'all' : btn.key as any)}
            className={cn(
              "rounded-full px-6 transition-all duration-300",
              filter === btn.key
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-transparent border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
            )}
          >
            {isArabic ? btn.labelAr : btn.labelEn}
          </Button>
        ))}
      </div>
    )
  }

  return (
    <Layout>
      {/* Header Section - Matching old design */}
      <Hero>
        <TitleContainer title={isArabic ? 'دوراتي' : 'My Courses'} subtitle={isArabic
          ? 'تابع تقدمك في الدورات التدريبية المسجل بها'
          : 'Track your progress in enrolled training courses'}
        />

      </Hero>

      {/* Main Content */}
      <section className="py-8 md:py-10">
        <div className="container px-4 md:px-6 lg:px-8 xl:px-20">
          <Tabs
            value={activeTab}
            onValueChange={(v) => {
              setActiveTab(v as any)
              setFilter('all')
            }}
            className="w-full"
          >
            {/* Custom Tabs List matching old nav-tabs design */}
            <div className="border-b border-border-light mb-8">
              <TabsList className="w-full max-w-md grid grid-cols-3 bg-transparent p-0 h-auto gap-8">
                {[
                  { key: 'presence', icon: Users, labelAr: 'حضوري', labelEn: 'Presence' },
                  { key: 'live', icon: Video, labelAr: 'مباشر', labelEn: 'Live' },
                  { key: 'online', icon: Monitor, labelAr: 'أونلاين', labelEn: 'Online' }
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.key}
                    value={tab.key}
                    className={cn(
                      "relative py-4 px-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent",
                      "text-muted-foreground font-bold transition-all duration-300",
                      "data-[state=active]:text-foreground data-[state=active]:font-bold",
                      "hover:text-foreground",
                      isArabic ? 'font-sans text-lg' : ''
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <tab.icon className="w-4 h-4" />
                      {isArabic ? tab.labelAr : tab.labelEn}
                    </span>
                    {/* Active indicator matching old border-bottom design */}
                    <span className={cn(
                      "absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full transition-all duration-300",
                      activeTab === tab.key ? "opacity-100" : "opacity-0"
                    )} />
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab Contents */}
            <AnimatePresence mode="wait">
              {(['presence', 'live', 'online'] as const).map((tabKey) => (
                <TabsContent
                  key={tabKey}
                  value={tabKey}
                  className="mt-0 focus-visible:outline-none focus-visible:ring-0"
                >
                  <motion.div
                    initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isArabic ? -20 : 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FilterButtons type={tabKey} />

                    {getFilteredCourses(tabKey).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getFilteredCourses(tabKey).map((course) => (
                          <ProgramCard key={course.id} program={course} language="ar" />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon={Calendar}
                        title={isArabic ? 'لا توجد دورات حاليا' : 'No courses available'}
                        description={isArabic ? 'ابدأ رحلتك التعليمية معنا اليوم' : 'Start your learning journey with us today'}
                        action={{
                          label: isArabic ? 'تصفح الكورسات' : 'Browse Courses',
                          href: '/all-programs'
                        }}
                        language={language}
                      />
                    )}
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </section>
    </Layout >
  )
}