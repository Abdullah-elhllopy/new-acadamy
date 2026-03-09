import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Session } from '@/shared/types'

interface SessionCardProps {
  session: Session
  language: 'en' | 'ar'
  onBook?: () => void
}

export function SessionCard({ session, language, onBook }: SessionCardProps) {
  const isArabic = language === 'ar'
  const occupancyRate = ((session.totalSeats - session.availableSeats) / session.totalSeats) * 100
  const isFull = session.availableSeats === 0

  const dateLocale = isArabic ? ar : undefined
  const formattedDate = format(
    new Date(session.startDate),
    isArabic ? 'PPP' : 'PPP',
    { locale: dateLocale }
  )

  return (
    <Card className="hover:border-primary/50 transition-all">
      <CardHeader >
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg">
              {isArabic ? 'جلسة تدريب' : 'Training Session'}
            </CardTitle>
          </div>
          <Badge variant={isFull ? 'destructive' : 'default'}>
            {isFull ? (isArabic ? 'ممتلئة' : 'Full') : (isArabic ? 'متاحة' : 'Available')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date and time */}
        <div className={`space-y-2 `}>
          <div className={`flex items-center gap-2 text-sm text-muted-foreground  `}>
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm text-muted-foreground  `}>
            <Clock className="w-4 h-4" />
            <span>{session.time}</span>
          </div>
        </div>

        {/* Location */}
        <div className={`flex items-center gap-2 text-sm text-muted-foreground  `}>
          <MapPin className="w-4 h-4" />
          <span>{session.location}</span>
        </div>

        {/* Occupancy */}
        <div >
          <div className={`flex items-center justify-between text-sm mb-2  `}>
            <span className="text-muted-foreground">
              {isArabic ? 'المقاعد المتاحة' : 'Available Seats'}
            </span>
            <span className={`font-semibold ${isFull ? 'text-destructive' : 'text-primary'}`}>
              {session.availableSeats}/{session.totalSeats}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
        </div>

        {/* Price and button */}
        <div className={`flex items-center justify-between pt-4 border-t border-border  `}>
          <div>
            <p className="text-2xl font-bold text-primary">
              {session.price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">SR</span>
            </p>
          </div>
          <Button
            onClick={onBook}
            disabled={isFull}
            className="font-semibold"
          >
            {isArabic ? 'احجز الآن' : 'Book Now'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
