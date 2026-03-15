// data/team-application-data.ts
import { CourseDetails } from '@/types/team-application'

export const DUMMY_COURSE_DETAILS: Record<string, CourseDetails> = {
    'leadership-masterclass': {
        id: 'leadership-masterclass',
        name: 'Executive Leadership Masterclass',
        nameAr: 'دورة القيادة التنفيذية المتقدمة',
        description: 'Comprehensive program covering strategic leadership, team management, and organizational excellence. Designed for senior managers and executives.',
        descriptionAr: 'برنامج شامل يغطي القيادة الاستراتيجية وإدارة الفريق والتميز المؤسسي. مصمم للمدراء التنفيذيين والكبار.',
        type: 'presence',
        startDate: '2024-04-15',
        duration: { hours: 40, months: 2 },
        location: { city: 'الرياض', venue: 'مركز التدريب الرئيسي' },
        price: 4500,
        currency: 'EGP'
    },
    'project-management': {
        id: 'project-management',
        name: 'Project Management Professional',
        nameAr: 'محترف إدارة المشاريع PMP',
        description: 'Complete PMP certification preparation with practical case studies and exam preparation.',
        descriptionAr: 'تحضير كامل لشهادة PMP مع دراسات حالة عملية والتحضير للامتحان.',
        type: 'presence',
        startDate: '2024-05-01',
        duration: { hours: 56, months: 3 },
        location: { city: 'جدة', venue: 'مركز التدريب - جدة' },
        price: 5500,
        currency: 'EGP'
    },
    'digital-marketing': {
        id: 'digital-marketing',
        name: 'Digital Marketing Strategy',
        nameAr: 'استراتيجية التسويق الرقمي',
        description: 'Master modern digital marketing techniques including SEO, social media, and analytics.',
        descriptionAr: 'إتقان تقنيات التسويق الرقمي الحديثة بما في ذلك SEO ووسائل التواصل الاجتماعي والتحليلات.',
        type: 'online',
        startDate: '2024-04-20',
        duration: { hours: 36, months: 2 },
        location: { city: 'Online', venue: 'منصة التعلم' },
        price: 3200,
        currency: 'EGP'
    }
}