'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, Award, Users, BookOpen, Facebook, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

const MOCK_TRAINER = {
  id: 1,
  name: 'Dr. Ahmed Al-Saud',
  nameAr: 'د. أحمد السعود',
  specialty: 'Leadership & Management',
  specialtyAr: 'القيادة والإدارة',
  bio: 'Expert trainer with over 15 years of experience in leadership development and organizational management. PhD in Business Administration from Harvard University.',
  bioAr: 'مدرب خبير بخبرة تزيد عن 15 عاماً في تطوير القيادة والإدارة التنظيمية. دكتوراه في إدارة الأعمال من جامعة هارفارد.',
  rating: 4.8,
  totalCourses: 25,
  totalStudents: 1200,
  initials: 'AS',
  social: {
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  }
}

const MOCK_COURSES = [
  {
    id: 1,
    title: 'Advanced Leadership Skills',
    titleAr: 'مهارات القيادة المتقدمة',
    students: 250,
    rating: 4.9
  },
  {
    id: 2,
    title: 'Strategic Management',
    titleAr: 'الإدارة الاستراتيجية',
    students: 180,
    rating: 4.8
  },
  {
    id: 3,
    title: 'Team Building Excellence',
    titleAr: 'التميز في بناء الفرق',
    students: 220,
    rating: 4.7
  }
]

const MOCK_REVIEWS = [
  {
    id: 1,
    name: 'Mohammed Ali',
    nameAr: 'محمد علي',
    rating: 5,
    comment: 'Excellent trainer with deep knowledge and practical experience',
    commentAr: 'مدرب ممتاز بمعرفة عميقة وخبرة عملية',
    date: '2024-02-15'
  },
  {
    id: 2,
    name: 'Sara Ahmed',
    nameAr: 'سارة أحمد',
    rating: 5,
    comment: 'Very engaging and informative sessions',
    commentAr: 'جلسات تفاعلية ومفيدة جداً',
    date: '2024-02-10'
  },
  {
    id: 3,
    name: 'Khalid Hassan',
    nameAr: 'خالد حسن',
    rating: 4,
    comment: 'Great content delivery and real-world examples',
    commentAr: 'تقديم رائع للمحتوى مع أمثلة واقعية',
    date: '2024-02-05'
  }
]

export default function TrainerProfilePage({ params }: { params: { id: string } }) {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-32 h-32">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-4xl">
                {MOCK_TRAINER.initials}
              </AvatarFallback>
            </Avatar>
            <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {isArabic ? MOCK_TRAINER.nameAr : MOCK_TRAINER.name}
              </h1>
              <Badge variant="secondary" className="mb-4">
                {isArabic ? MOCK_TRAINER.specialtyAr : MOCK_TRAINER.specialty}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{MOCK_TRAINER.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{MOCK_TRAINER.totalCourses} {isArabic ? 'دورة' : 'Courses'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{MOCK_TRAINER.totalStudents} {isArabic ? 'متدرب' : 'Students'}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <a href={MOCK_TRAINER.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href={MOCK_TRAINER.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={MOCK_TRAINER.social.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="about" className="w-full">
            <TabsList>
              <TabsTrigger value="about">{isArabic ? 'نبذة' : 'About'}</TabsTrigger>
              <TabsTrigger value="courses">{isArabic ? 'الدورات' : 'Courses'}</TabsTrigger>
              <TabsTrigger value="reviews">{isArabic ? 'التقييمات' : 'Reviews'}</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <p className={`text-muted-foreground leading-relaxed ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? MOCK_TRAINER.bioAr : MOCK_TRAINER.bio}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_COURSES.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <h3 className={`font-bold text-lg mb-3 ${isArabic ? 'text-right' : ''}`}>
                        {isArabic ? course.titleAr : course.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-4">
                {MOCK_REVIEWS.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {(isArabic ? review.nameAr : review.name).charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">
                              {isArabic ? review.nameAr : review.name}
                            </h4>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {isArabic ? review.commentAr : review.comment}
                          </p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
