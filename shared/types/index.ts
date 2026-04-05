import { UserRole } from '@/shared/constants/roles'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: UserRole
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Program {
  id: string
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  category: string
  trainer: Trainer
  location: string
  price: number
  duration: number // in hours
  capacity: number
  image?: string
  objectives: string[]
  createdAt: Date
  updatedAt: Date;
  status?: 'upcoming' | 'in-progress' | 'completed'
  progress?: number;
  courseType?: string;
  type ?: 'new' | 'mostWanted' | 'popular'
}

export interface Session {
  id: string
  programId: string
  startDate: Date
  endDate: Date
  time: string
  location: string
  availableSeats: number
  totalSeats: number
  price: number
}

export interface Booking {
  id: string
  userId: string
  sessionId: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paymentMethod: 'bank_transfer' | 'online' | 'on_site'
  paymentStatus: 'pending' | 'completed' | 'failed'
  amount: number
  createdAt: Date
  updatedAt: Date
}

export interface Trainer {
  id: string
  nameEn: string
  nameAr: string
  bio?: string
  qualifications?: string[]
  photo?: string
  linkedIn?: string
  rating: number
  reviewCount: number
}

export interface TrainerVideo {
  id: string
  trainerId: string
  titleEn: string
  titleAr: string
  descriptionEn?: string
  descriptionAr?: string
  videoUrl: string
  thumbnail?: string
  duration?: number
  views: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Article {
  id: string
  titleEn: string
  titleAr: string
  contentEn: string
  contentAr: string
  excerptEn?: string
  excerptAr?: string
  coverImage?: string
  categoryId?: string
  categoryName?: string
  authorId: string
  authorName: string
  views: number
  published: boolean
  featured: boolean
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface TrainerReview {
  id: string
  trainerId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  courseId?: string
  courseName?: string
  approved: boolean
  createdAt: Date
  updatedAt: Date
}


export interface ArticleCategory {
  id: string
  nameEn: string
  nameAr: string
  descriptionEn?: string
  descriptionAr?: string
  slug: string
  articleCount: number
  createdAt: Date
  updatedAt: Date
}

export interface ArticleComment {
  id: string
  articleId: string
  userId: string
  userName: string
  userAvatar?: string
  comment: string
  approved: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ArticleRating {
  articleId: string
  averageRating: number
  totalRatings: number
  userRating?: number
}

export interface CaseStudy {
  id: string
  titleEn: string
  titleAr: string
  clientName: string
  clientLogo?: string
  industry: string
  challengeEn: string
  challengeAr: string
  solutionEn: string
  solutionAr: string
  resultsEn: string
  resultsAr: string
  coverImage?: string
  images?: string[]
  published: boolean
  featured: boolean
  views: number
  createdAt: Date
  updatedAt: Date
}

// export interface Article {
//   id: string
//   titleEn: string
//   titleAr: string
//   contentEn: string
//   contentAr: string
//   authorId: string
//   category: string
//   views: number
//   rating: number
//   published: boolean
//   createdAt: Date
//   updatedAt: Date
// }

export interface Certificate {
  id: string
  userId: string
  courseId: string
  courseName: string
  courseNameAr: string
  userName: string
  userNameAr: string
  certificateNumber: string
  issueDate: Date
  completionDate: Date
  trainerName: string
  trainerNameAr: string
  trainerSignature?: string
  directorSignature?: string
  qrCode?: string
  verificationUrl?: string
  status: 'valid' | 'revoked' | 'expired'
  signed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CertificateData {
  certificateId?: string
  certificateNumber: string
  userName: string
  userNameAr: string
  courseName: string
  courseNameAr: string
  completionDate: Date
  issueDate: Date
  trainerName: string
  trainerNameAr: string
  trainerSignature?: string
  directorSignature?: string
  academyLogo?: string
  qrCodeData?: string
  verificationUrl?: string
}
