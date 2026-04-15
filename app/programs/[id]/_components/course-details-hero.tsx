'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Download } from 'lucide-react'
import { Hero } from '@/components/sections/hero'
import { TitleContainer } from '@/components/shared/title'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

interface CourseDetailsHeroProps {
  courseType: string
  courseName: string
  description: string
  videoUrl?: string
  pdfUrl?: string;
  handleOpenCLick?: () => void;
}

export function CourseDetailsHero({
  courseType,
  courseName,
  description,
  videoUrl,
  pdfUrl,
  handleOpenCLick
}: CourseDetailsHeroProps) {
  return (
    <Hero className='bg-hero-bg  mb-20 text-white' linkClassName = {'text-white hover:text-white'} breadcrumbItems={[
      { label: 'الرئيسية', href: '/' },
      { label: 'جميع برامجنا', href: '/programs' },
      { label: courseName },
    ]}>
      <div className="flex justify-between">
        <div className='flex flex-col gap-5'>
          <Badge className=" bg-white text-primary hover:bg-white px-3 py-2 rounded-2xl">
            {courseType}
          </Badge>
          <TitleContainer titleClassName='text-white' subtitleClassName='text-white' title={courseName} subtitle={description} />
          {pdfUrl && (
            <Button onClick={handleOpenCLick} className="bg-white text-primary hover:bg-white/90 rounded-full h-auto py-3 px-6">
              <span className="font-bold">تحميل بيانات الدورة</span>
              <Download className="w-5 h-5 mr-2 text-secondary" />
            </Button>
          )}
        </div>
        {/* <div /> */}
        <div>
          {videoUrl && (
            <div className="relative w-full md:w-150 h-75 md:h-87.5 bg-slate-800 rounded-lg overflow-hidden">
              {/* <video src={videoUrl} controls className="w-full h-full object-cover"> */}
              <iframe
                src={videoUrl}
                title={courseName}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />

            </div>
          )}
        </div>
      </div>
    </Hero>
  )
}
