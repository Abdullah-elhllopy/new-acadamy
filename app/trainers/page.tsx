'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Star } from 'lucide-react'
import Link from 'next/link'

const MOCK_TRAINERS = [
  {
    id: 1,
    name: 'Dr. Ahmed Al-Saud',
    nameAr: 'د. أحمد السعود',
    specialty: 'Leadership & Management',
    specialtyAr: 'القيادة والإدارة',
    rating: 4.8,
    courses: 25,
    students: 1200,
    initials: 'AS'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    nameAr: 'سارة جونسون',
    specialty: 'Digital Marketing',
    specialtyAr: 'التسويق الرقمي',
    rating: 4.9,
    courses: 18,
    students: 950,
    initials: 'SJ'
  },
  {
    id: 3,
    name: 'Mohammed Al-Rashid',
    nameAr: 'محمد الراشد',
    specialty: 'Project Management',
    specialtyAr: 'إدارة المشاريع',
    rating: 4.7,
    courses: 22,
    students: 1100,
    initials: 'MR'
  },
  {
    id: 4,
    name: 'Fatima Al-Zahrani',
    nameAr: 'فاطمة الزهراني',
    specialty: 'Human Resources',
    specialtyAr: 'الموارد البشرية',
    rating: 4.9,
    courses: 20,
    students: 1050,
    initials: 'FZ'
  },
  {
    id: 5,
    name: 'Omar Abdullah',
    nameAr: 'عمر عبدالله',
    specialty: 'Data Science',
    specialtyAr: 'علم البيانات',
    rating: 4.8,
    courses: 15,
    students: 800,
    initials: 'OA'
  },
  {
    id: 6,
    name: 'Layla Hassan',
    nameAr: 'ليلى حسن',
    specialty: 'Business Communication',
    specialtyAr: 'التواصل المهني',
    rating: 4.9,
    courses: 19,
    students: 980,
    initials: 'LH'
  }
]

export default function TrainersPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTrainers = MOCK_TRAINERS.filter((trainer) => {
    const name = isArabic ? trainer.nameAr : trainer.name
    const specialty = isArabic ? trainer.specialtyAr : trainer.specialty
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className={`max-w-2xl ${isArabic ? 'text-right' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isArabic ? 'مدربونا' : 'Our Trainers'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isArabic
                ? 'تعرف على نخبة من المدربين المحترفين والخبراء في مجالاتهم'
                : 'Meet our elite professional trainers and experts in their fields'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5`} />
              <Input
                placeholder={isArabic ? 'ابحث عن مدرب...' : 'Search for a trainer...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={isArabic ? 'pr-10 text-right' : 'pl-10'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainers.map((trainer) => (
              <Card key={trainer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-24 h-24 mb-4">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                          {trainer.initials}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-xl mb-1">
                        {isArabic ? trainer.nameAr : trainer.name}
                      </h3>
                      <Badge variant="secondary" className="mb-3">
                        {isArabic ? trainer.specialtyAr : trainer.specialty}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{trainer.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{trainer.courses}</p>
                        <p className="text-xs text-muted-foreground">
                          {isArabic ? 'دورة' : 'Courses'}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{trainer.students}</p>
                        <p className="text-xs text-muted-foreground">
                          {isArabic ? 'متدرب' : 'Students'}
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/trainers/${trainer.id}`}>
                        {isArabic ? 'عرض الملف الشخصي' : 'View Profile'}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTrainers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                {isArabic ? 'لم يتم العثور على مدربين' : 'No trainers found'}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
