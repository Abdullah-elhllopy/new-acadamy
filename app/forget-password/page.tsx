'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/shared/form'
import { FormField } from '@/components/shared/form-field'
import { Mail } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { forgetPasswordSchema, ForgetPasswordData } from '@/lib/validations'

export default function ForgetPasswordPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: ForgetPasswordData) => {
    setLoading(true)
    setTimeout(() => {
      toast.success(isArabic ? 'تم إرسال رابط إعادة تعيين كلمة المرور' : 'Password reset link sent')
      router.push('/check-password')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className={isArabic ? 'text-right' : ''}>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {isArabic ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            {isArabic
              ? 'أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور'
              : 'Enter your email and we will send you a password reset link'}
          </p>
        </CardHeader>
        <CardContent>
          <Form schema={forgetPasswordSchema} onSubmit={handleSubmit} className="space-y-4">
            {(methods) => (
              <>
                <FormField
                  name="email"
                  label={isArabic ? 'البريد الإلكتروني' : 'Email'}
                  type="email"
                  methods={methods}
                  isArabic={isArabic}
                  required
                />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (isArabic ? 'جاري الإرسال...' : 'Sending...') : (isArabic ? 'إرسال الرابط' : 'Send Link')}
                </Button>
              </>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
