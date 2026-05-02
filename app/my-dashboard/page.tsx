'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { useAuth } from '@/shared/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  BookOpen,
  Award,
  CreditCard,
  Settings,
  LogOut,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  FileText,
  Download
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserCourses } from '@/hooks/api/use-courses'
import { Course } from '@/services/api/course.service'
import { Layout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { EmptyState } from '@/components/states/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import CertificateCard from '@/components/cards/certificate-card'
import { useUserCertificates } from '@/hooks/api/use-certificates'
import { DataStateHandler } from '@/components/shared/data-state-handler'
import { downloadCertificatePDF } from '@/services/certificate-generator'
import { CertificateData } from '@/shared/types'

interface EnrolledCourse extends Course {
  enrollmentDate?: string
  progress?: number
  status?: 'upcoming' | 'in-progress' | 'completed'
}

interface BookingMock {
  id: string
  courseName: string
  courseNameAr: string
  bookingDate: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed'
  amount: number
}

export default function MyDashboardPage() {
  const { isArabic } = useLanguage()
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const userId = 'user-001'
  const { data: coursesData, isLoading: isLoadingCourses } = useUserCourses(user?.userId || '')
  const { data: certificates, isLoading, error, refetch } = useUserCertificates(userId)

  const enrolledCourses: EnrolledCourse[] = coursesData?.map(course => ({
    ...course,
    enrollmentDate: course.courseStartDate,
    progress: Math.floor(Math.random() * 100),
    status: Math.random() > 0.5 ? 'in-progress' : 'upcoming'
  })) || []


  const mockBookings: BookingMock[] = [
    {
      id: '1',
      courseName: 'Digital Marketing',
      courseNameAr: 'التسويق الرقمي',
      bookingDate: '2024-03-01',
      status: 'confirmed',
      paymentStatus: 'paid',
      amount: 1500
    },
    {
      id: '2',
      courseName: 'Data Analysis',
      courseNameAr: 'تحليل البيانات',
      bookingDate: '2024-03-10',
      status: 'pending',
      paymentStatus: 'pending',
      amount: 2000
    }
  ]

  if ( !isAuthenticated) {
    router.push('/login')
  }

  const handleLogout = () => {
    logout()
    router.push('/')
    toast.success(isArabic ? 'تم تسجيل الخروج بنجاح' : 'Logged out successfully')
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      upcoming: { label: isArabic ? 'قادم' : 'Upcoming', className: 'bg-blue-100 text-blue-800' },
      'in-progress': { label: isArabic ? 'جاري' : 'In Progress', className: 'bg-yellow-100 text-yellow-800' },
      completed: { label: isArabic ? 'مكتمل' : 'Completed', className: 'bg-green-100 text-green-800' },
      pending: { label: isArabic ? 'معلق' : 'Pending', className: 'bg-gray-100 text-gray-800' },
      confirmed: { label: isArabic ? 'مؤكد' : 'Confirmed', className: 'bg-green-100 text-green-800' },
      cancelled: { label: isArabic ? 'ملغي' : 'Cancelled', className: 'bg-red-100 text-red-800' },
      paid: { label: isArabic ? 'مدفوع' : 'Paid', className: 'bg-green-100 text-green-800' },
      failed: { label: isArabic ? 'فشل' : 'Failed', className: 'bg-red-100 text-red-800' }
    }
    const info = variants[status as keyof typeof variants] || variants.pending
    return <Badge className={cn('font-medium', info.className)}>{info.label}</Badge>
  }

  const handleDownload = async (cert: any) => {
    try {
      const certificateData: CertificateData = {
        certificateId: cert.id,
        certificateNumber: cert.certificateNumber,
        userName: cert.userName,
        userNameAr: cert.userNameAr,
        courseName: cert.courseName,
        courseNameAr: cert.courseNameAr,
        completionDate: cert.completionDate,
        issueDate: cert.issueDate,
        trainerName: cert.trainerName,
        trainerNameAr: cert.trainerNameAr,
        trainerSignature: cert.trainerSignature,
        directorSignature: cert.directorSignature,
      }

      await downloadCertificatePDF(certificateData)
      toast.success(isArabic ? 'تم تحميل الشهادة' : 'Certificate downloaded')
    } catch (error) {
      toast.error(isArabic ? 'فشل تحميل الشهادة' : 'Failed to download certificate')
    }
  }

  const handleViewQR = (certId: string) => {
    router.push(`/verify-certificate/${certId}`)
  }

  if ( !user) {
    return (
      <Layout>
        <div className="container py-20">
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Hero>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isArabic ? `مرحباً، ${user.name}` : `Welcome, ${user.name}`}
              </h1>
              <p className="text-muted-foreground mt-1">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/user-settings">
                <Settings className="w-4 h-4 mr-2" />
                {isArabic ? 'الإعدادات' : 'Settings'}
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              {isArabic ? 'تسجيل الخروج' : 'Logout'}
            </Button>
          </div>
        </div>
      </Hero>

      <section className="py-8 md:py-10">
        <div className="container px-4 md:px-6 lg:px-8 xl:px-20">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">{isArabic ? 'نظرة عامة' : 'Overview'}</span>
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">{isArabic ? 'دوراتي' : 'My Courses'}</span>
              </TabsTrigger>
              <TabsTrigger value="certificates" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">{isArabic ? 'الشهادات' : 'Certificates'}</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span className="hidden sm:inline">{isArabic ? 'الحجوزات' : 'Bookings'}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {isArabic ? 'الدورات المسجلة' : 'Enrolled Courses'}
                    </CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {isArabic ? 'دورة نشطة' : 'Active courses'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {isArabic ? 'الشهادات' : 'Certificates'}
                    </CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{certificates?.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {isArabic ? 'شهادة محصلة' : 'Earned certificates'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {isArabic ? 'الحجوزات' : 'Bookings'}
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockBookings.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {isArabic ? 'حجز نشط' : 'Active bookings'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? 'النشاط الأخير' : 'Recent Activity'}</CardTitle>
                </CardHeader>
                <CardContent>
                  {enrolledCourses.length > 0 ? (
                    <div className="space-y-4">
                      {enrolledCourses.slice(0, 3).map((course) => (
                        <div key={course.courseId} className="flex items-center justify-between border-b pb-4 last:border-0">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{course.courseName}</p>
                              <p className="text-sm text-muted-foreground">
                                {isArabic ? 'التقدم:' : 'Progress:'} {course.progress}%
                              </p>
                            </div>
                          </div>
                          {getStatusBadge(course.status || 'upcoming')}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      {isArabic ? 'لا يوجد نشاط حديث' : 'No recent activity'}
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {isArabic ? 'دوراتي التدريبية' : 'My Training Courses'}
                </h2>
                <Button asChild>
                  <Link href="/all-programs">
                    {isArabic ? 'تصفح المزيد' : 'Browse More'}
                  </Link>
                </Button>
              </div>

              {isLoadingCourses ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-64 w-full" />
                  ))}
                </div>
              ) : enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <Card key={course.courseId} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          {course.image && (
                            <div className="w-full h-40 rounded-lg overflow-hidden bg-muted">
                              <img
                                src={course.image}
                                alt={course.courseName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-lg mb-2">{course.courseName}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Clock className="w-4 h-4" />
                              <span>{course.courseNumberOfHours} {isArabic ? 'ساعة' : 'hours'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <MapPin className="w-4 h-4" />
                              <span>{course.place}</span>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              {getStatusBadge(course.status || 'upcoming')}
                              <span className="text-sm font-medium">
                                {course.progress}% {isArabic ? 'مكتمل' : 'Complete'}
                              </span>
                            </div>
                          </div>
                          <Button asChild className="w-full">
                            <Link href={`/programs/${course.courseId}`}>
                              {isArabic ? 'عرض التفاصيل' : 'View Details'}
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={BookOpen}
                  title={isArabic ? 'لا توجد دورات مسجلة' : 'No enrolled courses'}
                  description={isArabic ? 'ابدأ رحلتك التعليمية اليوم' : 'Start your learning journey today'}
                  action={{
                    label: isArabic ? 'تصفح البرامج' : 'Browse Programs',
                    href: '/all-programs'
                  }}
                // language={language}
                />
              )}
            </TabsContent>

            <TabsContent value="certificates" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {isArabic ? 'شهاداتي' : 'My Certificates'}
                </h2>
                <Button variant="outline" asChild>
                  <Link href="/verify-certificate">
                    {isArabic ? 'التحقق من شهادة' : 'Verify Certificate'}
                  </Link>
                </Button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>{isArabic ? 'ملاحظة:' : 'Note:'}</strong>{' '}
                  {isArabic
                    ? 'هذا القسم يستخدم بيانات تجريبية. سيتم ربطه بنظام الشهادات الرقمية قريباً.'
                    : 'This section uses mock data. It will be connected to the digital certificate system soon.'}
                </p>
              </div>
              <DataStateHandler isLoading={isLoading} error={error} onRetry={refetch} >
                {certificates ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                      <CertificateCard key={cert.id} cert={cert} handleDownload={handleDownload} handleViewQR={handleViewQR} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={Award}
                    title={isArabic ? 'لا توجد شهادات' : 'No certificates yet'}
                    description={isArabic ? 'أكمل دوراتك للحصول على الشهادات' : 'Complete your courses to earn certificates'}
                    action={{
                      label: isArabic ? 'تصفح الدورات' : 'Browse Courses',
                      href: '/all-programs'
                    }}
                  // language={language}
                  />
                )}
              </DataStateHandler>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {isArabic ? 'حجوزاتي' : 'My Bookings'}
                </h2>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>{isArabic ? 'ملاحظة:' : 'Note:'}</strong>{' '}
                  {isArabic
                    ? 'هذا القسم يستخدم بيانات تجريبية. سيتم ربطه بنظام الحجز والدفع قريباً.'
                    : 'This section uses mock data. It will be connected to the booking and payment system soon.'}
                </p>
              </div>

              {mockBookings.length > 0 ? (
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-2">
                              {isArabic ? booking.courseNameAr : booking.courseName}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(booking.bookingDate).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <span>{isArabic ? 'رقم الحجز:' : 'Booking ID:'} {booking.id}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-2xl font-bold">
                              {booking.amount} {isArabic ? 'ر.س' : 'SAR'}
                            </div>
                            <div className="flex gap-2">
                              {getStatusBadge(booking.status)}
                              {getStatusBadge(booking.paymentStatus)}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={CreditCard}
                  title={isArabic ? 'لا توجد حجوزات' : 'No bookings yet'}
                  description={isArabic ? 'احجز دورتك الأولى اليوم' : 'Book your first course today'}
                  action={{
                    label: isArabic ? 'تصفح البرامج' : 'Browse Programs',
                    href: '/all-programs'
                  }}
                // language={language}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  )
}
