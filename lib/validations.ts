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
  fieldName: z.string().optional(),
  courseName: z.string().optional(),
  certificateName: z.string().optional()
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

export const courseSchema = z.object({
  courseName: z.string().min(2, 'Course name is required'),
  courseDescription: z.string().min(10, 'Description must be at least 10 characters'),
  courseStartDate: z.string().min(1, 'Start date is required'),
  place: z.string().min(2, 'Place is required'),
  placeSub: z.string().optional(),
  courseType: z.string().min(2, 'Course type is required'), // حضورى/مباشرة/عبر الإنترنت
  courseCost: z.string().min(1, 'Cost is required'),
  courseNumberOfHours: z.string().min(1, 'Number of hours is required'),
  language: z.string().optional(),
  numberOfWeeks: z.string().optional(),
  numberOfMonths: z.string().optional(),
  courseContent: z.string().optional(),
  mainDebId: z.string().optional(),
  subDebId: z.string().optional(),
  instructorIDs: z.array(z.string()).optional(),
  wwwlText: z.array(z.string()).optional(),
  now: z.boolean().optional(),
  soon: z.boolean().optional(),
  recommended: z.boolean().optional(),
  mostSelling: z.boolean().optional(),
  image: z.any().optional(),
  video: z.any().optional(),
  pdf: z.any().optional(),
})

export type CourseFormData = z.infer<typeof courseSchema>

export const trainerSchema = z.object({
  instructorName: z.string().min(2, 'Trainer name is required'),
  instructorBio: z.string().min(10, 'Bio must be at least 10 characters'),
  instructorEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  instructorPhone: z.string().optional(),
  specialization: z.string().optional(),
  experience: z.string().optional(),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  isActive: z.boolean().optional(),
  image: z.any().optional(),
  cv: z.any().optional(),
})

export type TrainerFormData = z.infer<typeof trainerSchema>

export const mainDepartmentSchema = z.object({
  mainDepartmentName: z.string().min(2, 'Department name is required'),
  mainDepartmentDescription: z.string().optional(),
  isActive: z.boolean().optional(),
  image: z.any().optional(),
})

export type MainDepartmentFormData = z.infer<typeof mainDepartmentSchema>

export const subDepartmentSchema = z.object({
  subDepartmentName: z.string().min(2, 'Sub department name is required'),
  subDepartmentDescription: z.string().optional(),
  mainDepartmentId: z.string().min(1, 'Main department is required'),
  isActive: z.boolean().optional(),
})

export type SubDepartmentFormData = z.infer<typeof subDepartmentSchema>

export const sliderSchema = z.object({
  title: z.string().min(2, 'Slider title is required'),
  description: z.string().optional(),
  // link: z.string().optional(),
  ImageFile: z.any().optional(),
})

export type SliderFormData = z.infer<typeof sliderSchema>

export const aboutUsSchema = z.object({
  name: z.string().min(2, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone is required'),
  aboutUs: z.string().min(10, 'About us text is required'),
  address: z.string().min(2, 'Address is required'),
  ourVision: z.string().optional(),
  ourMessage: z.string().optional(),
  workingHours: z.string().optional(),
  workingFrom: z.string().optional(),
  workingTo: z.string().optional(),
  link: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  instgram: z.string().optional(),
  image: z.any().optional(),
  pdf: z.any().optional(),
})

export type AboutUsFormData = z.infer<typeof aboutUsSchema>

export const teamMemberSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  job: z.string().min(2, 'Job title is required'),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  image: z.any().optional(),
})

export type TeamMemberFormData = z.infer<typeof teamMemberSchema>

export const partnerSchema = z.object({
  name: z.string().min(2, 'Partner name is required'),
  link: z.string().min(1, 'Link is required'),
  image: z.any().optional(),
})

export type PartnerFormData = z.infer<typeof partnerSchema>

export const userSchema = z.object({
  userFullName: z.string().min(2, 'Full name is required'),
  userEmail: z.string().email('Invalid email address'),
  userPassword: z.string().min(8, 'Password must be at least 8 characters').optional(),
  userConfirmPassword: z.string().optional(),
  userPhone: z.string().optional(),
  type: z.string().optional(),
}).refine((data) => !data.userPassword || data.userPassword === data.userConfirmPassword, {
  message: "Passwords don't match",
  path: ['userConfirmPassword'],
})

export type UserFormData = z.infer<typeof userSchema>

export const packageSchema = z.object({
  name: z.string().min(2, 'Package name is required'),
  description: z.string().optional(),
  price: z.string().min(1, 'Price is required'),
  type: z.string().optional(),
  coursesIds: z.array(z.string()).optional(),
})

export type PackageFormData = z.infer<typeof packageSchema>

export const imageGroupSchema = z.object({
  groupName: z.string().min(2, 'Group name is required'),
  groupDescription: z.string().optional(),
  cover: z.any().optional(),
})

export type ImageGroupFormData = z.infer<typeof imageGroupSchema>
