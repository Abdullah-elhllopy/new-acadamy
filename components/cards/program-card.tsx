import Link from 'next/link'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Program, Session } from '@/shared/types'

interface ProgramCardProps {
  program: Program
  session: Session
  language: 'en' | 'ar'
}

export function ProgramCard({ program, session, language }: ProgramCardProps) {
  const isArabic = language === 'ar'
  const title = isArabic ? program.titleAr : program.titleEn

  return (
    <Link href={`/programs/${program.id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group py-0 pb-1">
        {/* Image */}
        <div className="relative w-full h-52 bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          <Badge className="absolute top-4 right-4 bg-white/90 text-slate-900 hover:bg-white">
            {isArabic ? 'عبر الإنترنت' : 'Online'}
          </Badge>
        </div>

        <CardContent className="px-6 flex flex-col justify-between h-full space-y-3">
          {/* Title */}
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
                  {(isArabic ? program.trainer.nameAr : program.trainer.nameEn).split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-slate-700">
                {isArabic ? 'اسم المدرب' : 'Trainer Name'}
              </span>
            </div>
            <div className={isArabic ? 'text-left' : 'text-right'}>
              <p className="text-xl font-bold text-slate-900">
                {session.price.toLocaleString()}
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
