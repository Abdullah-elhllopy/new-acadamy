'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { useAuth } from '@/shared/hooks/useAuth'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { Layout } from '@/layout/page-layout'

type BookingStep = 'personal' | 'payment' | 'confirmation'

export default function BookingPage({ params }: { params: { sessionId: string } }) {
  const { language } = useLanguage()
  const { user } = useAuth()
  const isArabic = language === 'ar'

  const [currentStep, setCurrentStep] = useState<BookingStep>('personal')
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    jobTitle: '',
    company: '',
    paymentMethod: 'bank_transfer' as 'bank_transfer' | 'online' | 'on_site',
    agreedToTerms: false,
  })

  // Mock program and session data
  const program = {
    titleEn: 'Leadership Development',
    titleAr: 'تطوير المهارات القيادية',
    price: 2999,
  }
  
  const session = {
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-17'),
    time: '9:00 AM - 5:00 PM',
  }

  const steps = [
    { id: 'personal', labelEn: 'Personal Info', labelAr: 'البيانات الشخصية' },
    { id: 'payment', labelEn: 'Payment Method', labelAr: 'طريقة الدفع' },
    { id: 'confirmation', labelEn: 'Confirmation', labelAr: 'التأكيد' },
  ] as const

  const handleNext = () => {
    if (currentStep === 'personal') {
      if (!formData.firstName || !formData.email || !formData.phone) {
        toast.error(isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields')
        return
      }
      setCurrentStep('payment')
    } else if (currentStep === 'payment') {
      if (!formData.paymentMethod) {
        toast.error(isArabic ? 'يرجى اختيار طريقة دفع' : 'Please select a payment method')
        return
      }
      setCurrentStep('confirmation')
    }
  }

  const handleBack = () => {
    if (currentStep === 'payment') setCurrentStep('personal')
    else if (currentStep === 'confirmation') setCurrentStep('payment')
  }

  const handleSubmit = () => {
    if (!formData.agreedToTerms) {
      toast.error(isArabic ? 'يرجى الموافقة على الشروط' : 'Please agree to terms and conditions')
      return
    }
    
    toast.success(isArabic ? 'تم حجزك بنجاح!' : 'Your booking has been confirmed!')
    // Redirect to dashboard
    // router.push('/dashboard')
  }

  const getStepStatus = (stepId: typeof steps[number]['id']) => {
    const stepIndex = steps.findIndex(s => s.id === stepId)
    const currentIndex = steps.findIndex(s => s.id === currentStep)
    
    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return 'current'
    return 'pending'
  }

  return (
    // <ProtectedRoute>
      <Layout>

        <main className="flex-1 py-12 md:py-16">
          <div className="container px-4 md:px-6 max-w-2xl">
            {/* Page header */}
            <div className={`mb-12 ${isArabic ? 'text-right' : ''}`}>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {isArabic ? 'إكمال حجزك' : 'Complete Your Booking'}
              </h1>
              <p className="text-muted-foreground">
                {isArabic ? `برنامج: ${program.titleAr}` : `Program: ${program.titleEn}`}
              </p>
            </div>

            {/* Progress steps */}
            <div className="mb-8">
              <div className={`flex items-center justify-between  `}>
                {steps.map((step, idx) => {
                  const status = getStepStatus(step.id)
                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      {/* Step circle */}
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                        status === 'completed'
                          ? 'bg-primary text-primary-foreground'
                          : status === 'current'
                          ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>

                      {/* Connector line */}
                      {idx < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 ${
                          getStepStatus(steps[idx + 1].id) === 'completed'
                            ? 'bg-primary'
                            : 'bg-muted'
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Step labels */}
              <div className={`flex items-center justify-between mt-3 text-xs font-medium  `}>
                {steps.map((step) => (
                  <span key={step.id} className="text-muted-foreground">
                    {isArabic ? step.labelAr : step.labelEn}
                  </span>
                ))}
              </div>
            </div>

            {/* Form card */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 'personal'
                    ? isArabic ? 'بيانات شخصية' : 'Personal Information'
                    : currentStep === 'payment'
                    ? isArabic ? 'طريقة الدفع' : 'Select Payment Method'
                    : isArabic ? 'تأكيد الحجز' : 'Booking Confirmation'}
                </CardTitle>
                <CardDescription>
                  {currentStep === 'personal'
                    ? isArabic ? 'أدخل بيانات الاتصال الخاصة بك' : 'Please provide your contact details'
                    : currentStep === 'payment'
                    ? isArabic ? 'اختر طريقة الدفع المفضلة' : 'Choose your preferred payment method'
                    : isArabic ? 'تحقق من التفاصيل قبل التأكيد' : 'Review your booking details'}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Personal Info Step */}
                {currentStep === 'personal' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className={isArabic ? 'text-right' : ''}>
                        <Label htmlFor="firstName">{isArabic ? 'الاسم الأول' : 'First Name'}</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div className={isArabic ? 'text-right' : ''}>
                        <Label htmlFor="lastName">{isArabic ? 'الاسم الأخير' : 'Last Name'}</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className={isArabic ? 'text-right' : ''}>
                      <Label htmlFor="email">{isArabic ? 'البريد الإلكتروني' : 'Email Address'}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div className={isArabic ? 'text-right' : ''}>
                      <Label htmlFor="phone">{isArabic ? 'رقم الهاتف' : 'Phone Number'}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div className={isArabic ? 'text-right' : ''}>
                      <Label htmlFor="jobTitle">{isArabic ? 'المسمى الوظيفي' : 'Job Title'}</Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        placeholder={isArabic ? 'اختياري' : 'Optional'}
                        className="mt-1"
                      />
                    </div>

                    <div className={isArabic ? 'text-right' : ''}>
                      <Label htmlFor="company">{isArabic ? 'الشركة' : 'Company'}</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={isArabic ? 'اختياري' : 'Optional'}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {/* Payment Method Step */}
                {currentStep === 'payment' && (
                  <div className="space-y-4">
                    <RadioGroup value={formData.paymentMethod} onValueChange={(val) => setFormData({ ...formData, paymentMethod: val as any })}>
                      <div className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-primary cursor-pointer">
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                        <Label htmlFor="bank_transfer" className="flex-1 cursor-pointer">
                          <span className="font-semibold">{isArabic ? 'تحويل بنكي' : 'Bank Transfer'}</span>
                          <p className="text-xs text-muted-foreground">
                            {isArabic ? 'حول المبلغ المطلوب إلى حسابنا البنكي' : 'Transfer funds to our bank account'}
                          </p>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-primary cursor-pointer">
                        <RadioGroupItem value="online" id="online" />
                        <Label htmlFor="online" className="flex-1 cursor-pointer">
                          <span className="font-semibold">{isArabic ? 'دفع أونلاين' : 'Online Payment'}</span>
                          <p className="text-xs text-muted-foreground">
                            {isArabic ? 'ادفع باستخدام بطاقتك الائتمانية' : 'Pay with your credit card'}
                          </p>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-primary cursor-pointer">
                        <RadioGroupItem value="on_site" id="on_site" />
                        <Label htmlFor="on_site" className="flex-1 cursor-pointer">
                          <span className="font-semibold">{isArabic ? 'الدفع في الموقع' : 'On-site Payment'}</span>
                          <p className="text-xs text-muted-foreground">
                            {isArabic ? 'ادفع عند بداية البرنامج' : 'Pay when the program starts'}
                          </p>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Confirmation Step */}
                {currentStep === 'confirmation' && (
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4 space-y-3">
                      <div className={`flex justify-between  `}>
                        <span className="text-muted-foreground">{isArabic ? 'البرنامج' : 'Program'}</span>
                        <span className="font-semibold">{isArabic ? program.titleAr : program.titleEn}</span>
                      </div>
                      <Separator />
                      <div className={`flex justify-between  `}>
                        <span className="text-muted-foreground">{isArabic ? 'الاسم' : 'Name'}</span>
                        <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className={`flex justify-between  `}>
                        <span className="text-muted-foreground">{isArabic ? 'البريد الإلكتروني' : 'Email'}</span>
                        <span className="font-semibold text-sm">{formData.email}</span>
                      </div>
                      <div className={`flex justify-between  `}>
                        <span className="text-muted-foreground">{isArabic ? 'طريقة الدفع' : 'Payment Method'}</span>
                        <Badge>
                          {formData.paymentMethod === 'bank_transfer'
                            ? isArabic ? 'تحويل بنكي' : 'Bank Transfer'
                            : formData.paymentMethod === 'online'
                            ? isArabic ? 'دفع أونلاين' : 'Online Payment'
                            : isArabic ? 'الدفع في الموقع' : 'On-site'}
                        </Badge>
                      </div>
                      <Separator />
                      <div className={`flex justify-between text-lg  `}>
                        <span className="font-bold">{isArabic ? 'الإجمالي' : 'Total'}</span>
                        <span className="font-bold text-primary">{program.price} SR</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.agreedToTerms}
                        onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                        className="mt-1"
                      />
                      <Label htmlFor="terms" className="text-sm cursor-pointer">
                        {isArabic
                          ? 'أوافق على الشروط والأحكام وسياسة الخصوصية'
                          : 'I agree to the terms and conditions and privacy policy'}
                      </Label>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Navigation buttons */}
              <Separator />
              <div className="p-6">
                <div className={`flex gap-4  `}>
                  {currentStep !== 'personal' && (
                    <Button variant="outline" onClick={handleBack} className="flex-1">
                      <ArrowLeft className={`w-4 h-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                      {isArabic ? 'السابق' : 'Back'}
                    </Button>
                  )}

                  {currentStep !== 'confirmation' ? (
                    <Button onClick={handleNext} className="flex-1">
                      {isArabic ? 'التالي' : 'Next'}
                      <ArrowRight className={`w-4 h-4 ${isArabic ? 'mr-2' : 'ml-2'}`} />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className={`w-4 h-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                      {isArabic ? 'تأكيد الحجز' : 'Confirm Booking'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </main>
      </Layout>
    // </ProtectedRoute>
  )
}
