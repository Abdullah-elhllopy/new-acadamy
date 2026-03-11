'use client'

import { CoursesTemplate } from '@/components/courses-template'
import { Program, Session } from '@/shared/types'

const mockInPersonCourses: (Program & { sessions: Session[] })[] = [
  {
    id: '1',
    titleEn: 'Leadership Development',
    titleAr: 'تطوير المهارات القيادية',
    descriptionEn: 'Comprehensive program for developing leadership skills',
    descriptionAr: 'برنامج شامل لتطوير المهارات القيادية',
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
    type: 'new',
  },
  {
    id: '2',
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
        programId: '2',
        startDate: new Date('2024-03-29'),
        endDate: new Date('2024-04-02'),
        time: '8:00 AM - 4:00 PM',
        location: 'Dammam Training Center',
        availableSeats: 5,
        totalSeats: 15,
        price: 2799,
      },
    ],
    type: 'new',
  },
  {
    id: '3',
    titleEn: 'Advanced Sales Techniques',
    titleAr: 'تقنيات البيع المتقدمة',
    descriptionEn: 'Learn advanced sales strategies and negotiation skills',
    descriptionAr: 'تعلم استراتيجيات البيع المتقدمة ومهارات التفاوض',
    category: 'Business',
    trainer: {
      id: '4',
      nameEn: 'Khalid Al-Rashid',
      nameAr: 'خالد الراشد',
      rating: 4.9,
      reviewCount: 98,
    },
    location: 'Jeddah',
    price: 2499,
    duration: 16,
    capacity: 25,
    objectives: ['Master sales techniques', 'Improve negotiation skills', 'Build client relationships'],
    createdAt: new Date(),
    updatedAt: new Date(),
    sessions: [
      {
        id: 'ses4',
        programId: '3',
        startDate: new Date('2024-04-12'),
        endDate: new Date('2024-04-14'),
        time: '9:00 AM - 5:00 PM',
        location: 'Jeddah Business Hub',
        availableSeats: 15,
        totalSeats: 25,
        price: 2499,
      },
    ],
    type: 'mostWanted',
  },
]

export default function InPersonCoursesPage() {
  return (
    <CoursesTemplate
      courseType="in-person"
      programs={mockInPersonCourses}
      headerTitle={{
        en: 'In-Person Courses',
        ar: 'الدورات الحضورية',
      }}
      headerDescription={{
        en: 'Join our interactive in-person training sessions across major cities',
        ar: 'انضم إلى جلسات التدريب الحضورية التفاعلية لدينا في المدن الرئيسية',
      }}
      breadcrumbLabel={{
        en: 'In-Person Courses',
        ar: 'الدورات الحضورية',
      }}
    />
  )
}
