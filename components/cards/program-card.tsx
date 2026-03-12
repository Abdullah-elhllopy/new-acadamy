import Link from 'next/link'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Program, Session } from '@/shared/types'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgramCardProps {
  program: Program
  language: 'en' | 'ar'
}
const getStatusBadge = (course: Program) => {
  const status = course.status || (course.progress === 100 ? 'completed' : course.progress || 0 > 0 ? 'in-progress' : 'upcoming')

  const variants = {
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

  const info = variants[status]
  return (
    <Badge variant="outline" className={cn("font-bold", info.className)}>
      {info.label}
    </Badge>
  )
}
export function ProgramCard({ program, language }: ProgramCardProps) {
  const isArabic = language === 'ar'
  const title = isArabic ? program.titleAr : program.titleEn

  return (
    <Link href={`/programs/${program.id}`}>
      <Card className="overflow-hidden hover:shadow-xl gap-4 transition-all duration-300 cursor-pointer group py-0 pb-3">
        {/* Image */}
        <div className="relative w-full h-52 from-slate-700 to-slate-900 overflow-hidden">
          {/* <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" /> */}
          <div className="relative h-52 bg-muted">
            <Image src="/placeholder.jpg" alt={'title'} fill className="object-cover" />
          </div>
          <Badge className="absolute top-4 right-4 bg-white/90 text-slate-900 hover:bg-white">
            {program?.courseType || isArabic ? 'عبر الإنترنت' : 'Online'}
          </Badge>
          {program.status && <div className="absolute top-4 left-4">
            {getStatusBadge(program)}
          </div>}
        </div>

        <CardContent className="px-6 flex flex-col justify-between h-full space-y-3">
          {/* Title */}
          {program.progress !== undefined && <div className="space-y-2 pt-0">


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
              {/* <span className="text-muted-foreground">{isArabic ? 'التقدم' : 'Progress'}</span> */}
              <span className="text-primary">{program.progress || 0}%</span>
            </div>
          </div>}
          <h3 className={`text-lg font-bold text-slate-900  line-clamp-2  `}>
            {title}
          </h3>

          {/* Details */}
          <div className="space-y-3 mb-4">
            <div className={`flex items-center gap-2 text-sm text-slate-600 `}>
              <Calendar className="w-4 h-4" />
              <span>{isArabic ? '14 محاضرة' : '14 lectures'}</span>
            </div>
            <div className={`flex items-center gap-2 text-sm text-slate-600 `}>
              <Clock className="w-4 h-4" />
              <span>{isArabic ? '30 ساعة' : '30 hours'}</span>
            </div>
            <div className={`flex items-center gap-2 text-sm text-slate-600 `}>
              <MapPin className="w-4 h-4" />
              <span>{isArabic ? 'أونلاين' : 'Online'}</span>
            </div>
          </div>

          {/* Trainer and Price */}
          <div className={`flex items-center justify-between pt-4 border-t `}>
            <div className={`flex items-center gap-3 `}>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                  {program.trainer ? (isArabic ? program.trainer.nameAr : program.trainer.nameEn).split(' ').map(n => n[0]).join('') : 'T'}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-slate-700">
                {program.trainer ? (isArabic ? program.trainer.nameAr : program.trainer.nameEn) : (isArabic ? 'اسم المدرب' : 'Trainer Name')}
              </span>
            </div>
            <div >
              <p className="text-xl font-bold text-slate-900">
                {program.price.toLocaleString()}
                <span className="text-sm font-normal text-slate-600 mr-1">
                  {isArabic ? 'جنيه' : 'EGP'}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
