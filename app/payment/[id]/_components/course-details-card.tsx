'use client'

import { useState, useRef } from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
    <Card className="bg-muted p-6 sm:p-8 h-158.5 lg:p-10 text-start">
      <p className="bg-white font-sans text-primary py-1 px-3 w-fit mb-4 rounded-[25px] text-sm">
        {course.courseSpecies}
      </p>
      <h2 className="text-primary text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 font-sans">
        {course.courseName}
      </h2>
      <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-hero-bg">
        {course.courseDescripTion}
      </p>
      <div className="space-y-3 mb-4">
        <p className="text-hero-bg flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          تبدأ فى {course.courseStartDate}
        </p>
        <p className="text-hero-bg flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          الساعات {course.courseNumberOfHours} - الشهور {course.numberOfMonths}
        </p>
        <p className="text-primary flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span>{course.placeSub} - {course.place}</span>
        </p>
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
      <h3 className="text-primary text-xl sm:text-2xl lg:text-[28px] mt-6 font-sans">
        <span className="text-base sm:text-lg lg:text-xl text-hero-bg">سعر الدورة : </span>
        {course.courseCost} ج.م
      </h3>
    </Card>
  )
}
