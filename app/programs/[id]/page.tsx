'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar, MapPin, ChevronDown, ChevronUp, Play, Star, Video, Download } from 'lucide-react'
import Image from 'next/image'
import { Breadcrumb } from '@/components/shared/breadcrumb'

const mockProgram = {
  id: '1',
  titleAr: 'مهارات قيادة الاجتماعات الافتراضية والواقعية (أونلاين)',
  descriptionAr: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.',
  price: 220,
  duration: '30 ساعة',
  sessions: '34 محاضرة',
  location: 'أونلاين',
  enrollmentDate: 'لقد اشتركت هذا الكورس في 8 ابريل 2021',
  rating: 4.5,
  reviewCount: 120,
  isEnrolled: false, // Change to true to test enrolled state
  learningPoints: [
    'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة',
    'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى',
    'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة',
    'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص',
  ],
  curriculum: [
    {
      id: 1,
      title: 'مقدمة',
      lessons: [
        { id: 1, title: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة', duration: '3 د' },
        { id: 2, title: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى', duration: '3 د' },
      ]
    },
    {
      id: 2,
      title: 'شباتر 2',
      lessons: [
        { id: 1, title: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة', duration: '3 د' },
        { id: 2, title: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة', duration: '3 د' },
      ]
    },
    { id: 3, title: 'ماذا بعد؟', lessons: [] },
    { id: 4, title: 'شباتر 4', lessons: [] },
    { id: 5, title: 'شباتر 5', lessons: [] },
    { id: 6, title: 'شباتر 6', lessons: [] },
  ],
  trainers: [
    { id: 1, name: 'أحمد محمد', title: 'ولقائه أو تخصص المدرب', image: '/placeholder-avatar.jpg' },
    { id: 2, name: 'أحمد محمد', title: 'ولقائه أو تخصص المدرب', image: '/placeholder-avatar.jpg' },
    { id: 3, name: 'أحمد محمد', title: 'ولقائه أو تخصص المدرب', image: '/placeholder-avatar.jpg' },
  ],
  provider: {
    name: 'كلية الدراسات العليا للتعليم',
    university: 'جامعة هارفارد',
    description: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.'
  },
  reviews: [
    { id: 1, author: 'أحمد محمد', rating: 5, date: '14 يونيو', text: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص.', avatar: '/placeholder-avatar.jpg' },
    { id: 2, author: 'أحمد محمد', rating: 5, date: '14 يونيو', text: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص.', avatar: '/placeholder-avatar.jpg' },
  ]
}

export default function ProgramDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [expandedSections, setExpandedSections] = useState<number[]>([1])

  const toggleSection = (id: number) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const handleEnroll = () => {
    router.push(`/booking/${params.id}`)
  }

  const handleGoToCourse = () => {
    router.push(`/online-courses/${params.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-hero-bg py-8 md:py-8">
        <div className="container mx-auto px-4 md:px-20">
          <Breadcrumb
            items={[
              { label: isArabic ? 'الرئيسية' : 'Home', href: '/' },
              { label: isArabic ? 'البرامج' : 'Programs', href: '/programs' },
              { label: mockProgram.titleAr }
            ]}
            isArabic={isArabic}
            className="text-white mb-6"
          />
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:justify-between">
            {/* Title and Info */}
            <div className="text-white flex-1">
              <Badge className="mb-4 bg-white text-slate-800 hover:bg-white">
                عبر الإنترنت
              </Badge>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {mockProgram.titleAr}
              </h1>
              <p className="text-white/90 leading-relaxed mb-6">
                {mockProgram.descriptionAr}
              </p>
              <Button className="bg-white text-slate-800 hover:bg-white/90">
                <Download className="w-4 h-4 ml-2" />
                تحميل بطاقات الدورة
              </Button>
            </div>

            {/* Video */}
            <div className="w-full lg:w-155 shrink-0">
              <div className="relative w-full h-50 md:h-70 lg:h-84.5 bg-slate-800 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder-course.jpg"
                  alt={mockProgram.titleAr}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-slate-800 mr-1" fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container px-4 py-8  md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            {/* What You'll Learn */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                ستتعلم في هذه الدورة
              </h2>
              <div className="space-y-3">
                {mockProgram.learningPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 shrink-0" />
                    <p className="text-muted-foreground text-sm md:text-base">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                محتوي هذه الدورة
              </h2>
              <div className="space-y-2">
                {mockProgram.curriculum.map((section) => (
                  <Card key={section.id} className="overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-accent/5 transition-colors text-right"
                    >
                      <span className="font-semibold text-foreground">{section.title}</span>
                      {expandedSections.includes(section.id) ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                      )}
                    </button>
                    {expandedSections.includes(section.id) && section.lessons.length > 0 && (
                      <div className="border-t bg-gray-50">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="px-4 py-3 flex items-start justify-between gap-4 border-b last:border-b-0"
                          >
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <Video className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                              <span className="text-sm text-muted-foreground wrap-break-word">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground whitespace-nowrap">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Trainers */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                المدربون
              </h2>
              <div className="space-y-4">
                {mockProgram.trainers.map((trainer) => (
                  <div key={trainer.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-200 overflow-hidden shrink-0">
                      <Image src={trainer.image} alt={trainer.name} width={64} height={64} className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{trainer.name}</h3>
                      <p className="text-sm text-muted-foreground">{trainer.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Provider */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                مقدمة من
              </h2>
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                      <span className="text-white text-xl md:text-2xl">H</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{mockProgram.provider.name}</h3>
                      <p className="text-sm text-muted-foreground">{mockProgram.provider.university}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {mockProgram.provider.description}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                آراء المتدربين
              </h2>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xl md:text-2xl font-bold">{mockProgram.rating}</span>
                <span className="text-sm md:text-base text-muted-foreground">({mockProgram.reviewCount} تقييماً)</span>
              </div>
              <div className="space-y-4">
                {mockProgram.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-start gap-3 md:gap-4 mb-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-200 overflow-hidden shrink-0">
                          <Image src={review.avatar} alt={review.author} width={48} height={48} className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-foreground truncate">{review.author}</h4>
                            <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">{review.date}</span>
                          </div>
                          <div className="flex gap-1 mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{review.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="lg:sticky lg:top-4">
              {mockProgram.isEnrolled ? (
                /* Enrolled State */
                <Card className="bg-muted/30">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{mockProgram.enrollmentDate}</span>
                    </div>

                    <Button
                      onClick={handleGoToCourse}
                      className="w-full bg-enrolled-btn hover:bg-enrolled-btn-hover text-white font-semibold py-6 text-lg"
                    >
                      اذهب الي الكورس
                    </Button>

                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">مدة الدورة</span>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{mockProgram.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">عدد المحاضرات</span>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{mockProgram.sessions}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">مكان الدورة</span>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">{mockProgram.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* Not Enrolled State */
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">
                        {mockProgram.price} جنيه مصري
                      </div>
                    </div>

                    <Button
                      onClick={handleEnroll}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg"
                    >
                      التحق بالدورة
                    </Button>

                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">مدة الدورة</span>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{mockProgram.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">عدد المحاضرات</span>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{mockProgram.sessions}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">مكان الدورة</span>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">{mockProgram.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t text-center text-sm text-muted-foreground">
                      ترغب في حجز مجموعة أو فريق؟ <br />
                      <Link href="/contact" className="text-primary hover:underline">
                        اطلب التواصل
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
