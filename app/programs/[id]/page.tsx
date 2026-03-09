'use client'

import { useState } from 'react'
// import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { CourseReviews } from '@/components/shared/course-reviews'
import { CourseDetailsHero } from '@/components/shared/course-details-hero'
import { CourseDetailsSidebar } from '@/components/shared/course-details-sidebar'
import { WhatYouWillLearn } from '@/components/shared/what-you-will-learn'
import { CourseLectures } from '@/components/shared/course-lectures'
import { CourseTrainers } from '@/components/shared/course-trainers'
import { RelatedCourses } from '@/components/shared/related-courses'
import { ArticlesSection } from '@/components/shared/articles-section'
import { SimpleAvatar } from '@/components/shared/simple-avatar'

const mockCourse = {
  id: '1',
  courseName: 'مهارات قيادة الاجتماعات الافتراضية والواقعية',
  courseDescription: 'هذا النص قابل للتعديل طبقاً لإحتياجات المحتوى و هو مجرد نص إفتراضى هذا النص قابل للتعديل طبقاً لإحتياجات المحتوى و هو مجرد نص إفتراضى',
  courseCost: 220,
  courseStartDate: '15 يناير 2024',
  courseNumberOfHours: 30,
  numberOfMonths: 3,
  video: '/placeholder-video.mp4',
  coursepdf: '/course-details.pdf',
  wwwl: [
    'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة',
    'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى',
    'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة',
    'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى',
  ],
  courseLectures: [
    {
      id: 1,
      lecturename: 'مقدمة',
      lectures: [
        { id: 1, title: 'عنوان المحاضرة', duration: '03:09', type: 'video' as const },
      ]
    },
    {
      id: 2,
      lecturename: 'شابتر 2',
      lectures: [
        { id: 1, title: 'عنوان المحاضرة', duration: '03:09', type: 'video' as const },
        { id: 2, title: 'هنا يكتب اسم او عنوان المحاضرة سواء كان هياخد سطر او اتنين او حتي تلاتة', duration: '03:09', type: 'video' as const },
        { id: 3, title: 'كويز أو سؤال', duration: '03:09', type: 'quiz' as const },
      ]
    },
  ],
  ourinstructors: [
    { instructorid: 1, instructorname: 'أحمد محمد', instructorfield: 'ولقائه أو تخصص المدرب', instructorimage: '/placeholder-avatar.jpg' },
    { instructorid: 2, instructorname: 'أحمد محمد', instructorfield: 'ولقائه أو تخصص المدرب', instructorimage: '/placeholder-avatar.jpg' },
  ],
  reviews: [
    { id: 1, author: 'أحمد محمد', date: '14 يونيه', rating: 4.5, comment: 'هذا النص قابل للتعديل طبقاً لإحتياجات المحتوى', avatar: '/placeholder-avatar.jpg' },
    { id: 2, author: 'أحمد محمد', date: '14 يونيه', rating: 4.5, comment: 'هذا النص قابل للتعديل طبقاً لإحتياجات المحتوى', avatar: '/placeholder-avatar.jpg' },
    { id: 3, author: 'أحمد محمد', date: '14 يونيه', rating: 4.5, comment: 'هذا النص قابل للتعديل طبقاً لإحتياجات المحتوى', avatar: '/placeholder-avatar.jpg' },
  ],
  relatedCourses: [
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
  ],
  provider: {
    name: 'كلية الدراسات العليا للتعليم',
    university: 'جامعة هارفارد',
    description: 'هذا النص قابل للتعديل طبقاً لإحتياجات المحتوى و هو مجرد نص إفتراضى هذا النص قابل للتعديل طبقاً لإحتياجات المحتوى و هو مجرد نص إفتراضى هذا النص قابل للتعديل طبقاً لإحتياجات المحتوى و هو مجرد نص إفتراضى هذا النص قابل للتعديل طبقاً لإحتياجات المحتوى و هو مجرد نص إفتراضى',
    avatar: '/placeholder-avatar.jpg'
  }
}

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(true) // Mock user state

  return (
    <div className="min-h-screen bg-background">
      <CourseDetailsHero
        courseType="عبر الإنترنت"
        courseName={mockCourse.courseName}
        description={mockCourse.courseDescription}
        videoUrl={mockCourse.video}
        pdfUrl={mockCourse.coursepdf}
      />

      <div className="px-4 md:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[44%_10%_45%] gap-8">
          <div className="space-y-20">
            <WhatYouWillLearn objectives={mockCourse.wwwl} />
            <CourseLectures lectures={mockCourse.courseLectures} />
            <CourseTrainers trainers={mockCourse.ourinstructors} />

            {/* Provider */}
            <div>
              <h2 className="text-4xl font-bold text-primary mb-10">مقدمة من</h2>
              <div className="flex items-start gap-6 mb-6">
                {/* <div className="w-24 h-24 rounded-full bg-muted-foreground overflow-hidden shrink-0">
                  <Image src={mockCourse.provider.avatar} alt={mockCourse.provider.name} width={100} height={100} className="object-cover" />
                </div> */}
                <SimpleAvatar
                  
                  src={mockCourse.provider.avatar}
                  alt={mockCourse.provider.name}
                  className="w-24 h-24 text-2xl  bg-muted-foreground"
                />
                <div>
                  <h4 className="text-3xl font-bold text-primary mb-1">{mockCourse.provider.name}</h4>
                  <p className="text-hero-bg text-lg">{mockCourse.provider.university}</p>
                </div>
              </div>
              <p className="text-primary leading-relaxed">{mockCourse.provider.description}</p>
            </div>

            <CourseReviews reviews={mockCourse.reviews} />
          </div>

          <div />

          <div>
            <CourseDetailsSidebar
              price={mockCourse.courseCost}
              currency="جنيه مصرى"
              startDate={mockCourse.courseStartDate}
              hours={mockCourse.courseNumberOfHours}
              months={mockCourse.numberOfMonths}
              location="عبر الإنترنت"
              isAuthenticated={currentUser}
              onEnroll={() => router.push('/online-videos/1')}
              onLogin={() => router.push('/login')}
              onRequestProgram={() => router.push(`/apply-for-program/${mockCourse.id}`)}
              courseId={mockCourse.id}
            />
          </div>
        </div>
      </div>

      <ArticlesSection />

      <RelatedCourses courses={mockCourse.relatedCourses} language="ar" />
    </div>
  )
}
