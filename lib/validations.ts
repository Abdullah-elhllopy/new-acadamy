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
  courseNameAr: z.string().min(2, 'Course name (Arabic) is required'),
  courseDescription: z.string().min(10, 'Description must be at least 10 characters'),
  courseDescriptionAr: z.string().min(10, 'Description (Arabic) must be at least 10 characters'),
  courseStartDate: z.string().min(1, 'Start date is required'),
  place: z.string().min(2, 'Place is required'),
  placeAr: z.string().min(2, 'Place (Arabic) is required'),
  placeSub: z.string().optional(),
  placeSubAr: z.string().optional(),
  placeLocationLat: z.number().optional().refine((val) => {
    if (!val) return true;
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return !isNaN(num) && num >= -90 && num <= 90;
  }, 'Latitude must be between -90 and 90'),
  placeLocationLong: z.number().optional().refine((val) => {
    if (!val) return true;
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return !isNaN(num) && num >= -180 && num <= 180;
  }, 'Longitude must be between -180 and 180'),
  courseType: z.string().min(1, 'Course type is required'),
  courseCost: z.string().min(1, 'Cost is required'),
  courseNumberOfHours: z.string().min(1, 'Number of hours is required'),
  language: z.string().optional(),
  numberOfWeeks: z.string().optional(),
  numberOfMonths: z.string().optional(),
  courseContent: z.string().optional(),
  courseContentAr: z.string().optional(),
  mainDebId: z.string().optional(),
  subDebId: z.string().min(1, 'Sub department is required'),
  instructorIDs: z.array(z.string()).optional(),
  wwwl: z.array(z.object({
    id: z.string(),
    text: z.string()
  })).optional(),
  wwwlAr: z.array(z.object({
    id: z.string(),
    text: z.string()
  })).optional(),
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

export const trainerVideoSchema = z.object({
  titleEn: z.string().min(2, 'Title (English) is required'),
  titleAr: z.string().min(2, 'Title (Arabic) is required'),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  videoUrl: z.string().url('Invalid video URL'),
  thumbnail: z.any().optional(),
  duration: z.string().optional(),
  published: z.boolean().optional(),
})

export type TrainerVideoFormData = z.infer<typeof trainerVideoSchema>

export const trainerArticleSchema = z.object({
  titleEn: z.string().min(2, 'Title (English) is required'),
  titleAr: z.string().min(2, 'Title (Arabic) is required'),
  contentEn: z.string().min(50, 'Content (English) must be at least 50 characters'),
  contentAr: z.string().min(50, 'Content (Arabic) must be at least 50 characters'),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  coverImage: z.any().optional(),
  published: z.boolean().optional(),
})

export type TrainerArticleFormData = z.infer<typeof trainerArticleSchema>

export const trainerReviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
  courseId: z.string().optional(),
})

export type TrainerReviewFormData = z.infer<typeof trainerReviewSchema>

export const articleSchema = z.object({
  titleEn: z.string().min(2, 'Title (English) is required'),
  titleAr: z.string().min(2, 'Title (Arabic) is required'),
  contentEn: z.string().min(50, 'Content (English) must be at least 50 characters'),
  contentAr: z.string().min(50, 'Content (Arabic) must be at least 50 characters'),
  excerptEn: z.string().optional(),
  excerptAr: z.string().optional(),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  coverImage: z.any().optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
})

export type ArticleFormData = z.infer<typeof articleSchema>

export const articleCategorySchema = z.object({
  nameEn: z.string().min(2, 'Category name (English) is required'),
  nameAr: z.string().min(2, 'Category name (Arabic) is required'),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  slug: z.string().min(2, 'Slug is required'),
})

export type ArticleCategoryFormData = z.infer<typeof articleCategorySchema>

export const caseStudySchema = z.object({
  titleEn: z.string().min(2, 'Title (English) is required'),
  titleAr: z.string().min(2, 'Title (Arabic) is required'),
  clientName: z.string().min(2, 'Client name is required'),
  industry: z.string().min(2, 'Industry is required'),
  challengeEn: z.string().min(50, 'Challenge (English) must be at least 50 characters'),
  challengeAr: z.string().min(50, 'Challenge (Arabic) must be at least 50 characters'),
  solutionEn: z.string().min(50, 'Solution (English) must be at least 50 characters'),
  solutionAr: z.string().min(50, 'Solution (Arabic) must be at least 50 characters'),
  resultsEn: z.string().min(50, 'Results (English) must be at least 50 characters'),
  resultsAr: z.string().min(50, 'Results (Arabic) must be at least 50 characters'),
  clientLogo: z.any().optional(),
  coverImage: z.any().optional(),
  images: z.array(z.any()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
})

export type CaseStudyFormData = z.infer<typeof caseStudySchema>

export const commentSchema = z.object({
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
})

export type CommentFormData = z.infer<typeof commentSchema>

export const ratingSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
})

export type RatingFormData = z.infer<typeof ratingSchema>

export const mainDepartmentSchema = z.object({
  mainDepartmentName: z.string().min(2, 'Department name is required'),
  mainDepartmentNameAr: z.string().min(2, 'Department name (Arabic) is required'),
  mainDepartmentDescription: z.string().optional(),
  mainDepartmentDescriptionAr: z.string().optional(),
  isActive: z.boolean().optional(),
})

export type MainDepartmentFormData = z.infer<typeof mainDepartmentSchema>

export const subDepartmentSchema = z.object({
  subDepartmentName: z.string().min(2, 'Sub department name is required'),
  subDepartmentNameAr: z.string().min(2, 'Sub department name (Arabic) is required'),
  subDepartmentDescription: z.string().optional(),
  subDepartmentDescriptionAr: z.string().optional(),
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
