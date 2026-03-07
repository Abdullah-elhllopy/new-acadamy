import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

export const forgetPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
})

export const checkPasswordSchema = z.object({
  tempPassword: z.string().min(1, 'Temporary password is required')
})

export const newPasswordSchema = z.object({
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

export const beTrainerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  jobTitle: z.string().min(2, 'Job title is required'),
  country: z.string().min(2, 'Country is required'),
  educationField: z.string().optional(),
  courseName: z.string().optional()
})

export const accountSettingsSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  country: z.string().min(2, 'Country is required')
})

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

export type ContactFormData = z.infer<typeof contactSchema>
export type ForgetPasswordData = z.infer<typeof forgetPasswordSchema>
export type CheckPasswordData = z.infer<typeof checkPasswordSchema>
export type NewPasswordData = z.infer<typeof newPasswordSchema>
export type BeTrainerData = z.infer<typeof beTrainerSchema>
export type AccountSettingsData = z.infer<typeof accountSettingsSchema>
export type PasswordChangeData = z.infer<typeof passwordChangeSchema>
