'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { useAuth } from '@/shared/hooks/useAuth'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TrainerCard } from '@/components/cards/trainer-card'
import { SessionCard } from '@/components/cards/session-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Clock, Users, MapPin, CheckCircle, Star, Share2, BookOpen } from 'lucide-react'
import { toast } from 'sonner'

// Mock program data
const mockProgram = {
  id: '1',
  titleEn: 'Leadership Development',
  titleAr: 'تطوير المهارات القيادية',
  descriptionEn: 'Comprehensive program for developing leadership skills and strategic thinking',
  descriptionAr: 'برنامج شامل لتطوير المهارات القيادية والتفكير الاستراتيجي',
  longDescriptionEn: 'This comprehensive 3-day leadership program is designed for mid to senior-level professionals who want to enhance their leadership capabilities. Through interactive workshops and real-world case studies, participants will develop critical leadership competencies including strategic thinking, decision-making, and team management.',
  longDescriptionAr: 'تم تصميم برنامج القيادة الشامل المدتد لثلاثة أيام للمهنيين على المستويات المتوسطة والعليا الذين يرغبون في تعزيز قدراتهم القيادية. من خلال ورش عمل تفاعلية ودراسات حالات واقعية، سيطور المشاركون الكفاءات القيادية الحاسمة.',
  category: 'Leadership',
  trainer: {
    id: '1',
    nameEn: 'Dr. Mohammed Ahmed',
    nameAr: 'د. محمد أحمد',
    rating: 4.8,
    reviewCount: 124,
    qualifications: ['PhD in Business Management', 'Executive Coach', 'Fortune 500 Consultant'],
    linkedIn: 'https://linkedin.com/in/mohammedahmed',
  },
  location: 'Riyadh',
  price: 2999,
  duration: 24,
  capacity: 20,
  objectives: [
    { en: 'Master different leadership styles', ar: 'إتقان أنماط القيادة المختلفة' },
    { en: 'Develop strategic thinking skills', ar: 'تطوير مهارات التفكير الاستراتيجي' },
    { en: 'Improve team dynamics and communication', ar: 'تحسين ديناميكية الفريق والتواصل' },
    { en: 'Learn conflict resolution techniques', ar: 'تعلم تقنيات حل النزاعات' },
  ],
  sessions: [
    {
      id: 'ses1',
      programId: '1',
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-03-17'),
      time: '9:00 AM - 5:00 PM',
      location: 'Riyadh Conference Center',
      availableSeats: 8,
      totalSeats: 20,
      price: 2999,
    },
    {
      id: 'ses2',
      programId: '1',
      startDate: new Date('2024-04-10'),
      endDate: new Date('2024-04-12'),
      time: '9:00 AM - 5:00 PM',
      location: 'Riyadh Business Hub',
      availableSeats: 15,
      totalSeats: 20,
      price: 2999,
    },
  ],
  reviews: [
    { author: 'Ahmed Al-Mansouri', rating: 5, text: 'Excellent program with practical insights' },
    { author: 'Sarah Johnson', rating: 5, text: 'Best leadership training I have attended' },
  ],
}

export default function ProgramDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { language } = useLanguage()
  const { isAuthenticated } = useAuth()
  const isArabic = language === 'ar'
  const program = mockProgram

  const title = isArabic ? program.titleAr : program.titleEn
  const description = isArabic ? program.descriptionAr : program.descriptionEn
  const longDescription = isArabic ? program.longDescriptionEn : program.longDescriptionAr

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success(isArabic ? 'تم نسخ الرابط' : 'Link copied to clipboard')
  }

  const handleBookNow = (sessionId: string) => {
    if (!isAuthenticated) {
      toast.info(isArabic ? 'يرجى تسجيل الدخول أولاً' : 'Please sign in first')
      router.push('/login')
      return
    }
    router.push(`/booking/${sessionId}`)
  }

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 md:py-16 border-b border-border">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/programs" className="hover:text-foreground transition-colors">
                  {isArabic ? 'البرامج' : 'Programs'}
                </Link>
                <span>/</span>
                <span>{title}</span>
              </div>

              {/* Title and info */}
              <div className={isArabic ? 'text-right' : ''}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {title}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  <Badge className="shrink-0">{program.category}</Badge>
                </div>

                {/* Quick info */}
                <div className="flex flex-wrap gap-4 md:gap-8 text-sm">
                  <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{program.duration} {isArabic ? 'ساعة' : 'hours'}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Users className="w-4 h-4 text-primary" />
                    <span>{program.capacity} {isArabic ? 'مقعد' : 'seats'}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{program.location}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span>{program.trainer.rating} ({program.trainer.reviewCount} {isArabic ? 'تقييم' : 'reviews'})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Overview */}
                <div className={isArabic ? 'text-right' : ''}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {isArabic ? 'نظرة عامة' : 'Overview'}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {longDescription}
                  </p>
                </div>

                <Separator />

                {/* Learning objectives */}
                <div className={isArabic ? 'text-right' : ''}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {isArabic ? 'الأهداف التعليمية' : 'Learning Objectives'}
                  </h2>
                  <div className="space-y-3">
                    {program.objectives.map((obj, idx) => {
                      const objText = isArabic ? obj.ar : obj.en
                      return (
                        <div
                          key={idx}
                          className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}
                        >
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{objText}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <Separator />

                {/* Trainer section */}
                <div className={isArabic ? 'text-right' : ''}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {isArabic ? 'المدرب' : 'Your Trainer'}
                  </h2>
                  <TrainerCard
                    trainer={program.trainer}
                    language={language as 'en' | 'ar'}
                  />
                </div>

                <Separator />

                {/* Reviews section */}
                <div className={isArabic ? 'text-right' : ''}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {isArabic ? 'آراء المتدربين' : 'Trainee Reviews'}
                  </h2>
                  <div className="space-y-4">
                    {program.reviews.map((review, idx) => (
                      <Card key={idx}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <p className="font-semibold text-foreground">{review.author}</p>
                            <div className="flex gap-0.5">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-accent text-accent"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.text}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar - Sessions and CTA */}
              <div className="lg:col-span-1 space-y-6 h-fit sticky top-4">
                {/* Pricing card */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isArabic ? 'اختر جلسة' : 'Select Session'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {program.sessions.map((session) => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        language={language as 'en' | 'ar'}
                        onBook={() => handleBookNow(session.id)}
                      />
                    ))}
                  </CardContent>
                </Card>

                {/* Share button */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {isArabic ? 'مشاركة' : 'Share'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
