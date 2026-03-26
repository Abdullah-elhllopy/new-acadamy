'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Download } from 'lucide-react'

interface CourseDetailsHeroProps {
  courseType: string
  courseName: string
  description: string
  videoUrl?: string
  pdfUrl?: string
}

export function CourseDetailsHero({
  courseType,
  courseName,
  description,
  videoUrl,
  pdfUrl
}: CourseDetailsHeroProps) {
  return (
    <section className="bg-hero-bg text-white py-10 px-4 md:px-20 mb-20">
      <nav className="flex items-center gap-2 text-white mb-8" dir="rtl">
        <Link href="/" className="hover:text-link-hover transition-base">
          الصفحة الرئيسية
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/programs" className="hover:text-link-hover transition-base">
          جميع برامجنا
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-muted-foreground">دورات عبر الإنترنت</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[45%_10%_45%] gap-8 items-start">
        <div>
          <Badge className="mb-5 bg-white text-primary hover:bg-white px-3 py-2 rounded-2xl">
            {courseType}
          </Badge>
          <h1 className="text-4xl font-bold mb-5">{courseName}</h1>
          <p className="text-white mb-8 leading-relaxed">{description}</p>
          {pdfUrl && (
            <Button className="bg-white text-primary hover:bg-white/90 rounded-full h-auto py-3 px-6">
              <span className="font-bold">تحميل بيانات الدورة</span>
              <Download className="w-5 h-5 mr-2 text-secondary" />
            </Button>
          )}
        </div>
        <div />
        <div>
          {videoUrl && (
            <div className="relative w-full h-[300px] md:h-[350px] bg-slate-800 rounded-lg overflow-hidden">
              <video controls className="w-full h-full object-cover">
                <source src={videoUrl} type="video/mp4" />
                هذا المتصفح لا يدعم هذا النوع من الفيديوهات
              </video>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
