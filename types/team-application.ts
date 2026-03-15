// types/team-application.ts
import { z } from 'zod'

export const teamApplicationSchema = z.object({
    fullName: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    phone: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, 'رقم الهاتف غير صحيح'),
    employer: z.string().min(2, 'جهة العمل مطلوبة'),
    jobTitle: z.string().min(2, 'المسمى الوظيفي مطلوب'),
    suggestedDate: z.string().min(1, 'التاريخ المقترح مطلوب'),
    language: z.enum(['ar', 'en'], {
        required_error: 'لغة التدريب مطلوبة'
    }),
    traineesCount: z.enum(['1-6', '6-12', '12-20', '20+'], {
        required_error: 'عدد المتدربين مطلوب'
    }),
    discountCode: z.string().optional(),
    additionalDetails: z.string().optional(),
    courseId: z.string(),
    courseName: z.string()
})

export type TeamApplicationFormData = z.infer<typeof teamApplicationSchema>

export interface CourseDetails {
    id: string
    name: string
    nameAr: string
    description: string
    descriptionAr: string
    type: 'presence' | 'online' | 'live'
    startDate: string
    duration: {
        hours: number
        months: number
    }
    location: {
        city: string
        venue: string
    }
    price: number
    currency: string
} 