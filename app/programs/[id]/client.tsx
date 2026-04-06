'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CourseReviews } from './_components/course-reviews'
import { CourseDetailsHero } from './_components/course-details-hero'
import { CourseDetailsSidebar } from './_components/course-details-sidebar'
import { WhatYouWillLearn } from './_components/what-you-will-learn'
import { CourseLectures } from './_components/course-lectures'
import { CourseTrainers } from './_components/course-trainers'
import { RelatedCourses } from './_components/related-courses'
import { SimpleAvatar } from '@/components/shared/simple-avatar'
import { motion } from 'framer-motion'
import { ArticlesSection } from '@/components/sections/home/articles-section'
import { ContentLayout } from '@/layout/page-layout'
import { CertificateBadge } from '@/components/programs/certificate-badge'
import { SocialShareBar } from '@/components/programs/social-share-bar'
import { SessionsSection } from '@/components/programs/sessions-section'
import { LocationMap } from '@/components/programs/location-map'
import { PDFDownloadModal } from '@/components/programs/pdf-download-modal'
import { useTranslate } from '@/locales'
import { useLanguage } from '@/shared/hooks/useLanguage'

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
  },
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
  objectives: ['Master leadership styles', 'Develop strategic thinking', 'Improve team dynamics'],
  location: 'Riyadh',
  duration: 24,
  capacity: 20,
  trainer: {
    id: '2',
    nameEn: 'Fatima Al-Shehri',
    nameAr: 'فاطمة الشهري',
    rating: 4.9,
    reviewCount: 87,
  },
}

export default function CourseDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(true)
  const { isArabic } = useLanguage()
  const { t } = useTranslate('programs')
  const [showPDFModal, setShowPDFModal] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <CourseDetailsHero
        courseType="عبر الإنترنت"
        courseName={mockCourse.courseName}
        description={mockCourse.courseDescription}
        videoUrl={mockCourse.video}
        pdfUrl={mockCourse.coursepdf}
        handleOpenCLick={() => setShowPDFModal(true)}
      />

      <div className="px-4 md:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[44%_10%_45%] gap-8">
          <motion.div
            className="space-y-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <WhatYouWillLearn objectives={mockCourse.wwwl} />
            <CourseLectures lectures={mockCourse.courseLectures} />
            <CourseTrainers trainers={mockCourse.ourinstructors} />

            {/* Provider */}
            <div>
              <h2 className="text-4xl font-bold text-primary mb-10">مقدمة من</h2>
              <div className="flex items-start gap-6 mb-6">
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
          </motion.div>

          <div />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <CourseDetailsSidebar
              price={mockCourse.courseCost}
              currency="جنيه مصرى"
              startDate={mockCourse.courseStartDate}
              hours={mockCourse.courseNumberOfHours}
              months={mockCourse.numberOfMonths}
              location="عبر الإنترنت"
              isAuthenticated={currentUser}
              onEnroll={() => router.push('/payment/1')}
              onLogin={() => router.push('/login')}
              onRequestProgram={() => router.push(`/apply-for-program/${mockCourse.id}`)}
              courseId={mockCourse.id}
            />
          </motion.div>
        </div>
      </div>
      <ContentLayout>
        <div className="space-y-12">
          {/* Program Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">
              {mockCourse.courseName}
            </h1>
            <p className="text-lg text-gray-600">
              {mockCourse.courseDescription}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <CertificateBadge type="professional" />
              <span className="text-lg font-semibold text-primary">{mockCourse.courseCost} SR</span>
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="border-t border-b py-4">
            <SocialShareBar
              title={mockCourse.courseName}
            />
          </div>

          {/* Sessions Section */}
          <SessionsSection sessions={mockCourse.sessions} />

          {/* Location Map */}
          <LocationMap
            address={mockCourse.location}
            latitude={25.2048}
            longitude={55.2708}
          />

          {/* Program Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{t('details')}</h3>
              <ul className="space-y-3 text-gray-700">
                <li><strong>{t('duration')}:</strong> {mockCourse.duration} {t('hours')}</li>
                <li><strong>{t('capacity')}:</strong> {mockCourse.capacity} {t('seats')}</li>
                <li><strong>{t('instructor')}:</strong> {mockCourse.trainer.nameEn}</li>
                <li><strong>{t('location')}:</strong> {mockCourse.location}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t('objectives')}</h3>
              <ul className="space-y-2 text-gray-700">
                {mockCourse.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ContentLayout>
      <ArticlesSection />

      <RelatedCourses courses={mockCourse.relatedCourses} language="ar" />
      <PDFDownloadModal
        isOpen={showPDFModal}
        onClose={() => setShowPDFModal(false)}
        courseTitle={mockCourse.courseName}
      />
    </div>
  )
}
