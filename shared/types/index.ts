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

export interface Article {
  id: string
  titleEn: string
  titleAr: string
  contentEn: string
  contentAr: string
  authorId: string
  category: string
  views: number
  rating: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Certificate {
  id: string
  bookingId: string
  certificateNumber: string
  issueDate: Date
  verificationId: string
}
