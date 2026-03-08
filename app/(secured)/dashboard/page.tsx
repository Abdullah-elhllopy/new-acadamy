'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { useAuth } from '@/shared/hooks/useAuth'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Award, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

function DashboardContent() {
  const { language } = useLanguage()
  const { user } = useAuth()
  const isArabic = language === 'ar'

  const sidebarItems = [
    {
      label: isArabic ? 'لوحة التحكم' : 'Dashboard',
      href: '/dashboard',
      icon: <span>📊</span>,
    },
    {
      label: isArabic ? 'حجوزاتي' : 'My Bookings',
      href: '/dashboard/bookings',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      label: isArabic ? 'شهاداتي' : 'My Certificates',
      href: '/dashboard/certificates',
      icon: <Award className="w-4 h-4" />,
    },
    {
      label: isArabic ? 'البرامج' : 'Programs',
      href: '/programs',
      icon: <Clock className="w-4 h-4" />,
    },
  ]

  return (
    <DashboardLayout sidebarItems={sidebarItems} userEmail={user?.email}>
      <div className="container px-4 md:px-8 py-8">
        {/* Welcome section */}
        <div className={`mb-8 ${isArabic ? 'text-right' : ''}`}>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isArabic ? `أهلاً بك، ${user?.name}` : `Welcome back, ${user?.name}`}
          </h1>
          <p className="text-muted-foreground">
            {isArabic
              ? 'إليك ملخص نشاطك في منصة أكاديمية ID'
              : 'Here is a summary of your activity on ID Academy'}
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'البرامج المسجلة' : 'Enrolled Programs'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-xs text-muted-foreground mt-1">
                {isArabic ? 'برامج نشطة' : 'active programs'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'الشهادات المكتسبة' : 'Certificates Earned'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">2</p>
              <p className="text-xs text-muted-foreground mt-1">
                {isArabic ? 'شهادات معتمدة' : 'verified certificates'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'ساعات التدريب' : 'Training Hours'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">28</p>
              <p className="text-xs text-muted-foreground mt-1">
                {isArabic ? 'ساعات مكتملة' : 'hours completed'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active bookings */}
        <div className="space-y-6">
          <div className={isArabic ? 'text-right' : ''}>
            <h2 className="text-2xl font-bold text-foreground">
              {isArabic ? 'حجوزاتي النشطة' : 'Active Bookings'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                titleEn: 'Leadership Development',
                titleAr: 'تطوير المهارات القيادية',
                status: 'confirmed',
                dateEn: 'Mar 15, 2024',
                dateAr: '15 مارس، 2024',
              },
              {
                titleEn: 'Digital Marketing Mastery',
                titleAr: 'إتقان التسويق الرقمي',
                status: 'pending',
                dateEn: 'Mar 22, 2024',
                dateAr: '22 مارس، 2024',
              },
            ].map((booking, idx) => (
              <Card key={idx}>
                <CardHeader className={isArabic ? 'text-right' : ''}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle>
                        {isArabic ? booking.titleAr : booking.titleEn}
                      </CardTitle>
                    </div>
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                      {booking.status === 'confirmed'
                        ? isArabic ? 'مؤكد' : 'Confirmed'
                        : isArabic ? 'قيد الانتظار' : 'Pending'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className={isArabic ? 'text-right' : ''}>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isArabic ? booking.dateAr : booking.dateEn}
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/dashboard/bookings/${idx}`}>
                      {isArabic ? 'عرض التفاصيل' : 'View Details'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA to browse more programs */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className={`flex items-center justify-between gap-4  `}>
              <div className={isArabic ? 'text-right' : ''}>
                <h3 className="font-semibold text-foreground mb-1">
                  {isArabic ? 'استكشف المزيد من البرامج' : 'Explore More Programs'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isArabic
                    ? 'اكتشف برامج تدريبية جديدة تناسب احتياجاتك'
                    : 'Discover new training programs that match your goals'}
                </p>
              </div>
              <Button asChild>
                <Link href="/programs">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {isArabic ? 'استكشف' : 'Browse'}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
