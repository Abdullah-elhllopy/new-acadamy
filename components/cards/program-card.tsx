import Link from 'next/link'
import { ArrowUpRight, Calendar, Clock, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Program, Session } from '@/shared/types'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { API_BASE_URL } from '@/services/api/config'
import { Course } from '@/services/api/course.service'

interface ProgramCardProps {
  program: Program | Course | any
  language: 'en' | 'ar'
  className?: string
}

const getStatusBadge = (course: any) => {
  const status = course.status || (course.progress === 100 ? 'completed' : course.progress || 0 > 0 ? 'in-progress' : 'upcoming')

  const variants: Record<string, { label: string; className: string }> = {
    upcoming: {
      label: 'قادم',
      className: 'bg-secondary/10 text-secondary border-secondary/20'
    },
    'in-progress': {
      label: 'جاري',
      className: 'bg-primary/10 text-primary border-primary/20'
    },
    completed: {
      label: 'مكتمل',
      className: 'bg-muted text-muted-foreground border-border'
    }
  }

  const info = variants[status] || variants.upcoming
  return (
    <Badge variant="outline" className={cn("font-bold", info.className)}>
      {info.label}
    </Badge>
  )
}

export function ProgramCard({ program, language, className }: ProgramCardProps) {
  const isArabic = language === 'ar'
  
  // Handle both Program and Course types
  const id = program.id || program.courseId
  const title = program.titleAr || program.courseName || program.titleEn
  const image = program.image
  const courseType = program.courseType || program.coursetype || program.courseSpecies
  const price = program.price || program.courseCost || 0
  const hours = program.courseNumberOfHours
  const months = program.numberOfMonths
  const weeks = program.numberOfWeeks
  const place = program.place
  const placeSub = program.placeSub
  const startDate = program.courseStartDate
  
  // Instructor data
  const instructor = program.ourinstructors?.[0] || program.trainer
  const instructorName = instructor?.name || instructor?.instructorname || instructor?.nameAr || instructor?.nameEn
  const instructorImage = instructor?.image || instructor?.instructorimage

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Link href={`/programs/${id}`}>
        <Card className="overflow-hidden hover:shadow-xl gap-4 transition-all duration-300 cursor-pointer group py-0 pb-3">
          {/* Image */}
          <div className="relative w-full h-52 from-slate-700 to-slate-900 overflow-hidden">
            <div className="relative h-52 bg-muted">
              {image ? (
                <Image 
                  src={`${API_BASE_URL}/${image}`} 
                  alt={title} 
                  fill 
                  className="object-cover" 
                />
              ) : (
                <Image src="/placeholder.jpg" alt={title} fill className="object-cover" />
              )}
            </div>
            <Badge className="absolute top-4 right-4 bg-white/90 text-slate-900 hover:bg-white">
              {courseType || (isArabic ? 'عبر الإنترنت' : 'Online')}
            </Badge>
            {program.status && (
              <div className="absolute top-4 left-4">
                {getStatusBadge(program)}
              </div>
            )}
          </div>

          <CardContent className="px-6 flex flex-col justify-between h-full space-y-3">
            {/* Progress bar (only for enrolled courses) */}
            {program.progress !== undefined && (
              <div className="space-y-2 pt-0">
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${program.progress || 0}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={cn(
                      "h-full rounded-full transition-all",
                      program.progress === 100 ? "bg-secondary" : "bg-primary"
                    )}
                  />
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-primary">{program.progress || 0}%</span>
                </div>
              </div>
            )}
            
            {/* Title */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-900 line-clamp-2">
                {title}
              </h3>
              <ArrowUpRight
                className={cn(
                  "w-5 h-5 text-muted-foreground shrink-0 transition-transform",
                  isArabic ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
                )}
              />
            </div>
            
            {/* Details */}
            <div className="space-y-3 mb-4">
              {startDate && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>{isArabic ? `تبدأ في ${startDate}` : `Starts ${startDate}`}</span>
                </div>
              )}
              {hours && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>
                    {isArabic ? `${hours} ساعة` : `${hours} hours`}
                    {months && (isArabic ? ` - ${months} شهور` : ` - ${months} months`)}
                    {weeks && (isArabic ? ` - ${weeks} أسابيع` : ` - ${weeks} weeks`)}
                  </span>
                </div>
              )}
              {(place || placeSub) && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {placeSub && `${placeSub}`}
                    {place && placeSub && ' - '}
                    {place && `${place}`}
                  </span>
                </div>
              )}
            </div>

            {/* Trainer and Price */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  {instructorImage ? (
                    <AvatarImage src={`${API_BASE_URL}${instructorImage}`} alt={instructorName} />
                  ) : null}
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {instructorName ? instructorName.split(' ').map((n: string) => n[0]).join('').slice(0, 2) : 'T'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-slate-700">
                  {instructorName || (isArabic ? 'اسم المدرب' : 'Trainer Name')}
                </span>
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">
                  {price.toLocaleString()}
                  <span className="text-sm font-normal text-slate-600 mr-1">
                    {isArabic ? 'جنيه' : 'EGP'}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
