// data/booking-data.ts
import { BookingCourse, CourseSession } from '@/types/booking'

const generateSessions = (courseId: string, basePrice: number): CourseSession[] => [
    {
        id: `${courseId}-session-1`,
        courseId,
        startDate: '2024-04-15',
        endDate: '2024-04-17',
        time: '9:00 AM - 5:00 PM',
        availableSeats: 3,
        totalSeats: 20,
        location: 'مركز التدريب الرئيسي - الرياض',
        price: basePrice,
        isFull: false,
        isAlmostFull: true
    },
    {
        id: `${courseId}-session-2`,
        courseId,
        startDate: '2024-05-20',
        endDate: '2024-05-22',
        time: '9:00 AM - 5:00 PM',
        availableSeats: 12,
        totalSeats: 20,
        location: 'مركز التدريب الرئيسي - الرياض',
        price: basePrice,
        isFull: false,
        isAlmostFull: false
    },
    {
        id: `${courseId}-session-3`,
        courseId,
        startDate: '2024-06-10',
        endDate: '2024-06-12',
        time: '6:00 PM - 10:00 PM',
        availableSeats: 0,
        totalSeats: 15,
        location: 'بث مباشر - اونلاين',
        price: basePrice * 0.8, // Online discount
        isFull: true,
        isAlmostFull: false
    }
]

export const DUMMY_BOOKING_COURSES: Record<string, BookingCourse> = {
    'leadership-masterclass': {
        id: 'leadership-masterclass',
        title: 'Executive Leadership Masterclass',
        titleAr: 'دورة القيادة التنفيذية المتقدمة',
        image: '/images/courses/leadership-1.jpg',
        description: 'Comprehensive leadership program for senior executives',
        descriptionAr: 'برنامج شامل في القيادة للمدراء التنفيذيين',
        type: 'presence',
        duration: { hours: 40, months: 2 },
        instructor: {
            name: 'Dr. Ahmed Hassan',
            nameAr: 'د. أحمد حسن',
            image: '/images/instructors/ahmed.jpg'
        },
        sessions: generateSessions('leadership-masterclass', 4500),
        price: 4500,
        currency: 'EGP',
        taxRate: 0.14 // 14% VAT
    },
    'project-management': {
        id: 'project-management',
        title: 'Project Management Professional',
        titleAr: 'محترف إدارة المشاريع PMP',
        image: '/images/courses/pmp.jpg',
        description: 'Complete PMP certification preparation',
        descriptionAr: 'تحضير كامل لشهادة PMP',
        type: 'presence',
        duration: { hours: 56, months: 3 },
        instructor: {
            name: 'Khalid Al-Omari',
            nameAr: 'خالد العمري',
            image: '/images/instructors/khalid.jpg'
        },
        sessions: generateSessions('project-management', 5500),
        price: 5500,
        currency: 'EGP',
        taxRate: 0.14
    },
    'digital-marketing': {
        id: 'digital-marketing',
        title: 'Digital Marketing Strategy',
        titleAr: 'استراتيجية التسويق الرقمي',
        image: '/images/courses/marketing.jpg',
        description: 'Master modern digital marketing',
        descriptionAr: 'إتقان التسويق الرقمي الحديث',
        type: 'online',
        duration: { hours: 36, months: 2 },
        instructor: {
            name: 'Layla Mansour',
            nameAr: 'ليلى منصور',
            image: '/images/instructors/layla.jpg'
        },
        sessions: generateSessions('digital-marketing', 3200),
        price: 3200,
        currency: 'EGP',
        taxRate: 0.14
    }
}