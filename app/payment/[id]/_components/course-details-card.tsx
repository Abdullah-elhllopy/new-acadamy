'use client'

import { useState, useRef } from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface CourseDetailsCardProps {
  course: {
    courseSpecies?: string
    courseName?: string
    courseDescripTion?: string
    courseStartDate?: string
    courseNumberOfHours?: number
    numberOfMonths?: number
    placeSub?: string
    place?: string
    courseCost?: number
  }
}

export function CourseDetailsCard({ course }: CourseDetailsCardProps) {
  const [discountCode, setDiscountCode] = useState('')
  const discountRef = useRef<HTMLInputElement>(null)

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value)
  }

  const handleActivateDiscount = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Activating discount:', discountCode)
  }

  const showActivateBtn = discountCode.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-muted border-0 overflow-hidden">
        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Type Badge */}
          <Badge
            variant="secondary"
            className="bg-white text-primary font-bold px-4 py-1.5 rounded-full"
          >
            {course.courseSpecies}
          </Badge>

          {/* Title */}
          <h2 className={cn(
            "text-2xl md:text-3xl font-bold text-foreground font-sans leading-tight",
          )}>
            {course.courseName}
          </h2>

          {/* Description */}
          <p className={cn(
            "text-muted-foreground text-lg leading-relaxed",
          )}>
            {course.courseDescripTion}
          </p>

          {/* Meta Info */}
          <div className="space-y-3 pt-4">
            <div className={cn(
              "flex items-center gap-3 text-foreground",
            )}>
              <Calendar className="w-5 h-5 text-primary shrink-0" />
              <span >
                تبدأ فى {course.courseStartDate}
              </span>
            </div>

            <div className={cn(
              "flex items-center gap-3 text-foreground",
            )}>
              <Clock className="w-5 h-5 text-primary shrink-0" />
              <span>
                الساعات {course.courseNumberOfHours} - الشهور {course.numberOfMonths}
              </span>
            </div>

            <div className={cn(
              "flex items-center gap-3 text-foreground",
            )}>
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>{course.placeSub} - {course.place}</span>
            </div>
          </div>
          <form onSubmit={handleActivateDiscount} className="mt-6">
            <Label htmlFor="discount" className="font-sans text-primary mb-2 block">
              كود الخصم
            </Label>
            <div className="flex">
              <Input
                id="discount"
                ref={discountRef}
                value={discountCode}
                onChange={handleDiscountChange}
                placeholder="ادخل كود الخصم"
                className="rounded-l-md border-muted-foreground focus-visible:ring-primary focus-visible:border-primary"
              />
              {showActivateBtn && (
                <Button
                  type="submit"
                  variant="outline"
                  className="border-primary bg-white text-primary rounded-r-md rounded-l-none border-l-0"
                >
                  تفعيل
                </Button>
              )}
            </div>
          </form>
          {/* Price */}
          <div className="pt-6 border-t border-border">
            <p className={cn(
              "text-sm text-muted-foreground mb-1",
            )}>
              {'سعر الدورة:'}
            </p>
            <p className={cn(
              "text-3xl font-bold text-primary",
            )}>
              <span className="text-base sm:text-lg lg:text-xl text-hero-bg">سعر الدورة : </span>
              {course.courseCost} ج.م
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
