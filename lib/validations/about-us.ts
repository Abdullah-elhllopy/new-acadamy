import * as z from 'zod'

export const aboutUsSchema = z.object({
  name: z.string().min(1, 'من فضلك أدخل اسم الشركة'),
  email: z.string().email('من فضلك أدخل بريد إلكتروني صحيح'),
  phone: z.string().min(1, 'من فضلك أدخل رقم الشركة'),
  aboutUs: z.string().min(1, 'من فضلك أدخل معلومات عن الشركة'),
  address: z.string().min(1, 'من فضلك أدخل عنوان الشركة'),
  ourVision: z.string().optional(),
  ourMessage: z.string().optional(),
  workingHours: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  instgram: z.string().optional(),
  image: z.any().optional(),
  pdf: z.any().optional(),
})
export type AboutUsFormData = z.infer<typeof aboutUsSchema>
