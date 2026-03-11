'use client'

import { CoursesTemplate } from '@/components/courses-template'
import { Program, Session } from '@/shared/types'

const mockOnlineCourses: (Program & { sessions: Session[] })[] = [
  {
    id: '1',
    titleEn: 'Data Analysis with Python',
    titleAr: 'تحليل البيانات باستخدام بايثون',
    descriptionEn: 'Master data analysis using Python',
    descriptionAr: 'إتقان تحليل البيانات باستخدام بايثون',
    category: 'Technology',
    trainer: {
      id: '1',
      nameEn: 'Dr. Ahmed Hassan',
      nameAr: 'د. أحمد حسن',
      rating: 4.8,
      reviewCount: 120,
    },
    location: 'Online',
    price: 2500,
    duration: 8,
    capacity: 50,
    objectives: ['Learn Python basics', 'Master data analysis', 'Create visualizations'],
    createdAt: new Date(),
    updatedAt: new Date(),
    sessions: [
      {
        id: 'ses1',
        programId: '1',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-05-26'),
        time: '7:00 PM - 9:00 PM',
        location: 'Online',
        availableSeats: 30,
        totalSeats: 50,
        price: 2500,
      },
    ],
    type: 'new',
  },
  {
    id: '2',
    titleEn: 'Digital Marketing Mastery',
    titleAr: 'إتقان التسويق الرقمي',
    descriptionEn: 'Learn modern digital marketing strategies',
    descriptionAr: 'تعلم استراتيجيات التسويق الرقمي الحديثة',
    category: 'Marketing',
    trainer: {
      id: '2',
      nameEn: 'Fatima Al-Shehri',
      nameAr: 'فاطمة الشهري',
      rating: 4.9,
      reviewCount: 95,
    },
    location: 'Online',
    price: 3000,
    duration: 6,
    capacity: 40,
    objectives: ['Master SEO', 'Learn social media marketing', 'Create campaigns'],
    createdAt: new Date(),
    updatedAt: new Date(),
    sessions: [
      {
        id: 'ses2',
        programId: '2',
        startDate: new Date('2024-04-05'),
        endDate: new Date('2024-05-17'),
        time: '6:00 PM - 8:00 PM',
        location: 'Online',
        availableSeats: 25,
        totalSeats: 40,
        price: 3000,
      },
    ],
    type: 'mostWanted',
  },
  {
    id: '3',
    titleEn: 'Web Development Bootcamp',
    titleAr: 'معسكر تطوير الويب',
    descriptionEn: 'Complete web development course',
    descriptionAr: 'دورة تطوير ويب شاملة',
    category: 'Technology',
    trainer: {
      id: '3',
      nameEn: 'Mohammed Ali',
      nameAr: 'محمد علي',
      rating: 4.7,
      reviewCount: 150,
    },
    location: 'Online',
    price: 4500,
    duration: 12,
    capacity: 60,
    objectives: ['Learn HTML/CSS', 'Master JavaScript', 'Build projects'],
    createdAt: new Date(),
    updatedAt: new Date(),
    sessions: [
      {
        id: 'ses3',
        programId: '3',
        startDate: new Date('2024-04-10'),
        endDate: new Date('2024-06-28'),
        time: '7:00 PM - 9:00 PM',
        location: 'Online',
        availableSeats: 40,
        totalSeats: 60,
        price: 4500,
      },
    ],
    type: 'new',
  },
]

export default function OnlineCoursesPage() {
  return (
    <CoursesTemplate
      courseType="online"
      programs={mockOnlineCourses}
      headerTitle={{
        en: 'Online Courses',
        ar: 'الدورات الأونلاين',
      }}
      headerDescription={{
        en: 'Learn anytime, anywhere with our online training courses',
        ar: 'تعلم في أي وقت ومن أي مكان مع دوراتنا التدريبية عبر الإنترنت',
      }}
      breadcrumbLabel={{
        en: 'Online Courses',
        ar: 'الدورات الأونلاين',
      }}
    />
  )
}
