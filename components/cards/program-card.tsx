import Link from 'next/link'
import { Star, Clock, Users, MapPin, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Program, Session } from '@/shared/types'

interface ProgramCardProps {
  program: Program
  session: Session
  language: 'en' | 'ar'
  onViewDetails?: () => void
}

export function ProgramCard({ program, session, language, onViewDetails }: ProgramCardProps) {
  const isArabic = language === 'ar'
  const title = isArabic ? program.titleAr : program.titleEn
  const description = isArabic ? program.descriptionAr : program.descriptionEn
  const availableSeats = session.availableSeats

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-border rounded-xl">
      {/* Program image placeholder */}
      <div className="relative w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
        <div className="text-4xl font-bold text-primary/20">{program.category}</div>
        <Badge className="absolute top-4 right-4 bg-white text-primary border-none shadow-sm">
          {program.category}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-foreground">{program.trainer.rating.toFixed(1)}</span>
          </div>
        </div>
        <CardTitle className={`text-xl line-clamp-2 text-primary ${isArabic ? 'text-right' : ''}`}>
          {title}
        </CardTitle>
        <CardDescription className={`line-clamp-2 text-muted-foreground ${isArabic ? 'text-right' : ''}`}>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Trainer info */}
        <div className={isArabic ? 'text-right' : ''}>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{isArabic ? program.trainer.nameAr : program.trainer.nameEn}</span>
          </p>
        </div>

        {/* Program details */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <MapPin className="w-4 h-4" />
            <span>{program.location}</span>
          </div>
          <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Clock className="w-4 h-4" />
            <span>{program.duration} {isArabic ? 'ساعة' : 'hours'}</span>
          </div>
          <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Users className="w-4 h-4" />
            <span>
              {availableSeats} {isArabic ? 'مقاعد متاحة' : 'seats available'} / {session.totalSeats}
            </span>
          </div>
        </div>

        {/* Availability indicator */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-secondary h-2 rounded-full transition-all"
            style={{ width: `${(availableSeats / session.totalSeats) * 100}%` }}
          />
        </div>

        {/* Price and button */}
        <div className={`flex items-center justify-between pt-4 border-t border-border ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div>
            <p className="text-2xl font-bold text-primary">
              {session.price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">SR</span>
            </p>
          </div>
          <Button
            size="sm"
            className="rounded-full bg-primary hover:bg-secondary text-white"
            onClick={onViewDetails}
            asChild
          >
            <Link href={`/programs/${program.id}`}>
              {isArabic ? 'عرض التفاصيل' : 'View Details'}
              <ArrowRight className="w-4 h-4 mr-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
