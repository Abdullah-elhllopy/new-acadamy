'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'

interface CourseDetailsSidebarProps {
  price: number
  currency: string
  startDate: string
  hours: number
  months: number
  location: string
  isAuthenticated: boolean
  onEnroll: () => void
  onLogin: () => void
  onRequestProgram: () => void
  courseId: string
}

export function CourseDetailsSidebar({
  price,
  currency,
  startDate,
  hours,
  months,
  location,
  isAuthenticated,
  onEnroll,
  onLogin,
  onRequestProgram
}: CourseDetailsSidebarProps) {
  return (
    <Card className="bg-muted border-0 sticky top-4">
      <CardContent className="p-10">
        <h2 className="text-4xl font-bold text-primary text-center mb-8">
          {price} {currency}
        </h2>

        {isAuthenticated ? (
          <Button
            onClick={onEnroll}
            className="w-full bg-secondary hover:bg-secondary-hover text-white h-14 text-base font-bold rounded-full mb-5"
          >
            اذهب الي الكورس
          </Button>
        ) : (
          <Button
            onClick={onLogin}
            className="w-full bg-secondary hover:bg-secondary-hover text-white h-14 text-base font-bold rounded-full mb-5"
          >
            سجل الدخول للالتحاق بالدورة
          </Button>
        )}

        <div className="space-y-5 pt-5 border-t-2 border-border">
          <p className="flex items-center justify-between text-primary">
            <span className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              تبدأ فى {startDate}
            </span>
          </p>
          <p className="flex items-center justify-between text-primary">
            <span className="flex items-center gap-2">
              <Clock className="w-6 h-6" />
              الساعات {hours} - الشهور {months}
            </span>
          </p>
          <p className="flex items-center gap-2 text-primary">
            <MapPin className="w-6 h-6" />
            {location}
          </p>
        </div>

        <hr className="my-8 border-border" />

        <h4 className="text-xl font-bold text-primary mb-4">ترغب في تدريب مجموعة أو فريق؟</h4>
        <p className="text-primary mb-6 leading-relaxed">
          اختر الدورة التدريبية المناسبة لكم من بين العديد من الدورات<br />
          التدريبية في مختلف المجالات.
        </p>
        <Link href={`/apply-for-program/leadership-masterclass`} className="w-full">
          <Button
            // onClick={onRequestProgram}
            className="w-full border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white h-14 text-base font-bold rounded-full transition-base"
          >
            اطلب البرنامج
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
