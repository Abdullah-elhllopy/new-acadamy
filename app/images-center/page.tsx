'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

const MOCK_IMAGE_GROUPS = [
  {
    id: 1,
    title: 'Leadership Training 2024',
    titleAr: 'تدريب القيادة 2024',
    imageCount: 24,
    date: '2024-02-15'
  },
  {
    id: 2,
    title: 'Digital Marketing Workshop',
    titleAr: 'ورشة التسويق الرقمي',
    imageCount: 18,
    date: '2024-02-10'
  },
  {
    id: 3,
    title: 'Project Management Seminar',
    titleAr: 'ندوة إدارة المشاريع',
    imageCount: 32,
    date: '2024-02-05'
  },
  {
    id: 4,
    title: 'Team Building Activities',
    titleAr: 'أنشطة بناء الفريق',
    imageCount: 45,
    date: '2024-01-28'
  },
  {
    id: 5,
    title: 'Annual Conference 2024',
    titleAr: 'المؤتمر السنوي 2024',
    imageCount: 56,
    date: '2024-01-20'
  },
  {
    id: 6,
    title: 'Graduation Ceremony',
    titleAr: 'حفل التخرج',
    imageCount: 38,
    date: '2024-01-15'
  }
]

export default function ImagesCenterPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className={`max-w-2xl ${isArabic ? 'text-right' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isArabic ? 'مركز الصور' : 'Images Center'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isArabic
                ? 'استعرض صور فعالياتنا وبرامجنا التدريبية'
                : 'Browse photos from our events and training programs'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_IMAGE_GROUPS.map((group) => (
              <Link key={group.id} href={`/images-center/${group.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-primary" />
                      </div>
                      <div className={isArabic ? 'text-right' : ''}>
                        <h3 className="font-bold text-lg mb-2">
                          {isArabic ? group.titleAr : group.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{group.imageCount} {isArabic ? 'صورة' : 'images'}</span>
                          <span>{group.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
