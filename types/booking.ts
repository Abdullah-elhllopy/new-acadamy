// types/booking.ts
import { z } from 'zod'

export const bookingSchema = z.object({
    // Step 1: Course & Session
    courseId: z.string(),
    sessionId: z.string(),

    // Step 2: Trainee Information
    fullName: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    phone: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, 'رقم الهاتف غير صحيح'),
    employer: z.string().optional(),
    jobTitle: z.string().optional(),
    notes: z.string().optional(),

    // Step 3: Payment
    paymentMethod: z.enum(['online', 'bank_transfer', 'center']),
    discountCode: z.string().optional(),

    // Bank transfer specific
    transferReceipt: z.instanceof(File).optional(),
    transferDate: z.string().optional(),
    transferAmount: z.number().optional(),

    // Agreements
    agreeToTerms: z.boolean().refine(val => val === true, 'يجب الموافقة على الشروط'),
    agreeToCancellationPolicy: z.boolean().refine(val => val === true, 'يجب الموافقة على سياسة الإلغاء')
})

export type BookingFormData = z.infer<typeof bookingSchema>

export interface CourseSession {
    id: string
    courseId: string
    startDate: string
    endDate: string
    time: string
    availableSeats: number
    totalSeats: number
    location: string
    price: number
    isFull: boolean
    isAlmostFull: boolean // < 20% seats remaining
}

export interface BookingCourse {
    id: string
    title: string
    titleAr: string
    image: string
    description: string
    descriptionAr: string
    type: 'presence' | 'online' | 'live'
    duration: {
        hours: number
        months: number
    }
    instructor: {
        name: string
        nameAr: string
        image: string
    }
    sessions: CourseSession[]
    price: number
    currency: string
    taxRate: number
}