// app/[locale]/booking/[courseId]/page.tsx
'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema, BookingFormData } from '@/types/booking'
import { useBooking, useSubmitBooking } from '../_hooks/use-booking'
import { StepIndicator } from '../_components/step-indicator'
import { SessionCard } from '../_components/session-card'
import { PriceBreakdown } from '../_components/price-breakdown'
import { PaymentMethodCard } from '../_components/payment-method-card'
import { FormInput } from '@/components/forms/form-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { cn } from '@/lib/utils'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  Calendar
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Hero } from '@/components/sections/hero'
import { ContentLayout, Layout } from '@/layout/page-layout'
import { Form } from '@/components/forms'

export default function BookingPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const { isArabic } = useLanguage()
  const {
    course,
    selectedSession,
    step,
    setStep,
    selectSession,
    calculatePrice
  } = useBooking(courseId)

  const [discountCode, setDiscountCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<BookingFormData['paymentMethod']>('online')

  const methods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      courseId,
      paymentMethod: 'online',
      agreeToTerms: false,
      agreeToCancellationPolicy: false
    }
  })

  const { handleSubmit, formState: { errors }, watch, setValue, register } = methods
  // const submitMutation = useSubmitBooking()

  const priceBreakdown = calculatePrice(appliedDiscount)

  const onSubmit = async (data: BookingFormData) => {
    try {
      // const result = await submitMutation.mutateAsync({
      //   ...data,
      //   sessionId: selectedSession!.id,
      //   discountCode: appliedDiscount,
      //   paymentMethod
      // })

      // Redirect to confirmation
      // router.push(`/booking/confirmation?bookingId=${result.bookingId}`)
    } catch (error) {
      // Error handled by mutation
    }
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">
          {isArabic ? 'الدورة غير موجودة' : 'Course not found'}
        </p>
      </div>
    )
  }

  const breadcrumbs = [
    { label: 'Courses', labelAr: 'الدورات', href: '/courses' },
    { label: isArabic ? course.titleAr : course.title, href: `/courses/${course.id}` },
    { label: 'Booking', labelAr: 'الحجز' }
  ]

  return (
    <Layout>
      <Hero breadcrumbItems={breadcrumbs} title='Book Your Course' />
      <ContentLayout>
        {/* Step Indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <StepIndicator currentStep={step} />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12",
          )}>
            {/* Main Content */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <Form methods={methods} onSubmit={handleSubmit(onSubmit)} >
                <AnimatePresence mode="wait">
                  {/* Step 1: Select Session */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className={cn(
                        "text-2xl font-bold text-foreground mb-6",
                      )}>
                        {isArabic ? 'اختر موعد الدورة' : 'Select Your Session'}
                      </h2>

                      <div className="grid gap-4">
                        {course.sessions.map((session, index) => (
                          <SessionCard
                            key={session.id}
                            session={session}
                            isSelected={selectedSession?.id === session.id}
                            onSelect={() => selectSession(session)}
                            index={index}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Personal Details */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className={cn(
                        "flex items-center justify-between mb-6",
                      )}>
                        <h2 className={cn(
                          "text-2xl font-bold text-foreground",
                        )}>
                          {isArabic ? 'بياناتك الشخصية' : 'Your Details'}
                        </h2>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setStep(1)}
                          className="text-muted-foreground"
                        >
                          <ArrowLeft className={cn("w-4 h-4")} />
                          {isArabic ? 'تعديل الموعد' : 'Change Session'}
                        </Button>
                      </div>

                      <Card>
                        <CardContent className="p-6 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                              name="fullName"
                              label="Full Name"
                              labelAr="الاسم بالكامل"
                              required
                            />
                            <FormInput
                              name="email"
                              type="email"
                              label="Email"
                              labelAr="البريد الإلكتروني"
                              required
                            />
                          </div>

                          <FormInput
                            name="phone"
                            type="tel"
                            label="Phone Number"
                            labelAr="رقم الهاتف"
                            placeholder="01xxxxxxxxx"
                            required
                          />

                          <Separator />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                              name="employer"
                              label="Employer (Optional)"
                              labelAr="جهة العمل (اختياري)"
                            />
                            <FormInput
                              name="jobTitle"
                              label="Job Title (Optional)"
                              labelAr="المسمى الوظيفي (اختياري)"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className={cn("font-bold")}>
                              {isArabic ? 'ملاحظات إضافية' : 'Additional Notes'}
                            </Label>
                            <textarea
                              {...register('notes')}
                              rows={4}
                              className={cn(
                                "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              )}
                              placeholder={isArabic ? 'أي متطلبات خاصة...' : 'Any special requirements...'}
                            />
                          </div>

                          {/* Save for later hint */}
                          <div className={cn(
                            "flex items-center gap-2 p-4 rounded-lg bg-muted text-sm text-muted-foreground",
                          )}>
                            <Calendar className="w-4 h-4" />
                            <span>
                              {isArabic
                                ? 'سيتم حفظ بياناتك تلقائياً. يمكنك العودة لاحقاً لإكمال الحجز.'
                                : 'Your data is auto-saved. You can return later to complete your booking.'
                              }
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <div className={cn(
                        "flex justify-end",
                      )}>
                        <Button
                          type="button"
                          onClick={() => setStep(3)}
                          className="rounded-full px-8"
                        >
                          {isArabic ? 'متابعة' : 'Continue'}
                          <ArrowRight className={cn("w-4 h-4")} />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Payment */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className={cn(
                        "text-2xl font-bold text-foreground mb-6",
                      )}>
                        {isArabic ? 'طريقة الدفع' : 'Payment Method'}
                      </h2>

                      {/* Discount Code */}
                      <Card className="mb-6">
                        <CardContent className="p-6">
                          <Label className={cn("font-bold mb-3 block",)}>
                            {isArabic ? 'كود الخصم' : 'Discount Code'}
                          </Label>
                          <div className="flex gap-3">
                            <Input
                              value={discountCode}
                              onChange={(e) => setDiscountCode(e.target.value)}
                              placeholder={isArabic ? 'أدخل الكود' : 'Enter code'}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setAppliedDiscount(discountCode)}
                              disabled={!discountCode}
                            >
                              {isArabic ? 'تطبيق' : 'Apply'}
                            </Button>
                          </div>
                          {appliedDiscount && (
                            <p className="text-success text-sm mt-2">
                              ✓ {isArabic ? 'تم تطبيق الخصم' : 'Discount applied'}: {appliedDiscount}
                            </p>
                          )}
                        </CardContent>
                      </Card>

                      {/* Payment Methods */}
                      <div className="space-y-4 mb-8">
                        <PaymentMethodCard
                          method="online"
                          isSelected={paymentMethod === 'online'}
                          onSelect={() => {
                            setPaymentMethod('online')
                            setValue('paymentMethod', 'online')
                          }}
                        />
                        <PaymentMethodCard
                          method="bank_transfer"
                          isSelected={paymentMethod === 'bank_transfer'}
                          onSelect={() => {
                            setPaymentMethod('bank_transfer')
                            setValue('paymentMethod', 'bank_transfer')
                          }}
                        />
                        <PaymentMethodCard
                          method="center"
                          isSelected={paymentMethod === 'center'}
                          onSelect={() => {
                            setPaymentMethod('center')
                            setValue('paymentMethod', 'center')
                          }}
                        />
                      </div>

                      {/* Bank Transfer Upload (conditional) */}
                      {paymentMethod === 'bank_transfer' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mb-6"
                        >
                          <Card className='py-0'>
                            <CardContent className="p-6 space-y-4">
                              <h4 className={cn("font-bold",)}>
                                {isArabic ? 'تفاصيل التحويل البنكي' : 'Bank Transfer Details'}
                              </h4>

                              <div className="p-4 bg-muted rounded-lg">
                                <p className={cn("font-medium mb-2",)}>
                                  {isArabic ? 'البنك: بنك القاهرة' : 'Bank: Banque du Caire'}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                  {isArabic ? 'الحساب: 1234567890' : 'Account: 1234567890'}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                  {isArabic ? 'IBAN: EG123456789012345678901234' : 'IBAN: EG123456789012345678901234'}
                                </p>
                              </div>

                              <div className="space-y-2">
                                <Label>{isArabic ? 'إيصال التحويل' : 'Transfer Receipt'}</Label>
                                <Input type="file" accept="image/*,.pdf" />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>{isArabic ? 'تاريخ التحويل' : 'Transfer Date'}</Label>
                                  <Input type="date" />
                                </div>
                                <div className="space-y-2">
                                  <Label>{isArabic ? 'المبلغ المحول' : 'Amount Transferred'}</Label>
                                  <Input type="number" placeholder="0.00" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}

                      {/* Agreements */}
                      <Card className="mb-6">
                        <CardContent className="p-6 space-y-4">
                          <div className={cn(
                            "flex items-start gap-3",
                          )}>
                            <Checkbox
                              id="terms"
                              checked={watch('agreeToTerms')}
                              onCheckedChange={(checked) => setValue('agreeToTerms', checked as boolean)}
                            />
                            <div className="space-y-1">
                              <Label htmlFor="terms" className={cn("font-medium cursor-pointer",)}>
                                {isArabic ? 'أوافق على شروط الخدمة وسياسة الخصوصية' : 'I agree to the Terms of Service and Privacy Policy'}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {isArabic
                                  ? 'بالحجز، أؤكد موافقتي على جميع الشروط والأحكام.'
                                  : 'By booking, I confirm my agreement to all terms and conditions.'
                                }
                              </p>
                            </div>
                          </div>

                          <div className={cn(
                            "flex items-start gap-3",
                          )}>
                            <Checkbox
                              id="cancellation"
                              checked={watch('agreeToCancellationPolicy')}
                              onCheckedChange={(checked) => setValue('agreeToCancellationPolicy', checked as boolean)}
                            />
                            <div className="space-y-1">
                              <Label htmlFor="cancellation" className={cn("font-medium cursor-pointer",)}>
                                {isArabic ? 'أوافق على سياسة الإلغاء والاسترداد' : 'I agree to the Cancellation and Refund Policy'}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {isArabic
                                  ? 'إلغاء قبل 7 أيام: استرداد كامل. إلغاء قبل 3 أيام: استرداد 50%. إلغاء قبل يوم واحد: لا يوجد استرداد.'
                                  : 'Cancel 7+ days before: Full refund. 3-6 days: 50% refund. 1-2 days: No refund.'
                                }
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        // disabled={submitMutation.isPending || !watch('agreeToTerms') || !watch('agreeToCancellationPolicy')}
                        className={cn(
                          "w-full h-14 rounded-full text-lg",
                          // submitMutation.isPending && "opacity-70"
                        )}
                      >
                        {/* {submitMutation.isPending ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin mr-2" />
                              {isArabic ? 'جاري إتمام الحجز...' : 'Completing Booking...'}
                            </>
                          ) : ( */}
                        <>
                          {isArabic ? 'تأكيد الحجز' : 'Confirm Booking'}
                          <CheckCircle2 className={cn("w-5 h-5",)} />
                        </>
                        {/* )} */}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Form>
            </div>

            {/* Sidebar - Course Summary */}
            <div className="lg:col-span-4 order-1 lg:order-2">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Course Card */}
                <Card className='p-0'>
                  <CardContent className="p-0">
                    <div className="relative h-40">
                      <Image
                        src={'/placeholder.jpg'}
                        alt={isArabic ? course.titleAr : course.title}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className={cn(
                        "font-bold text-lg text-foreground line-clamp-2",
                      )}>
                        {isArabic ? course.titleAr : course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {isArabic ? course.instructor.nameAr : course.instructor.name}
                      </p>

                      {selectedSession && (
                        <div className="pt-3 border-t border-border space-y-2">
                          <div className={cn(
                            "flex items-center gap-2 text-sm",
                          )}>
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{selectedSession.startDate}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {selectedSession.location}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Price Breakdown (shown when session selected) */}
                {selectedSession && (
                  <PriceBreakdown
                    subtotal={priceBreakdown.subtotal}
                    discount={priceBreakdown.discount}
                    tax={priceBreakdown.tax}
                    total={priceBreakdown.total}
                    currency={course.currency}
                    discountCode={appliedDiscount}
                  />
                )}

                {/* Support Card */}
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-5">
                    <div className={cn(
                      "flex items-start gap-3",
                    )}>
                      <MessageCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className={cn("font-bold mb-1",)}>
                          {isArabic ? 'تحتاج مساعدة؟' : 'Need Help?'}
                        </h4>
                        <p className="text-sm text-primary-foreground/80 mb-3">
                          {isArabic
                            ? 'تواصل معنا عبر الواتساب للاستفسارات'
                            : 'Contact us on WhatsApp for inquiries'
                          }
                        </p>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="rounded-full"
                          asChild
                        >
                          <Link href="https://wa.me/201234567890">
                            {isArabic ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </Layout >
  )
}