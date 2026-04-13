'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { useAuth } from '@/shared/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField } from '@/components/forms'
import { Mail } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { forgetPasswordSchema, ForgetPasswordData } from '@/lib/validations'

export default function ForgetPasswordPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const router = useRouter()
  const { forgotPassword } = useAuth()
  const [loading, setLoading] = useState(false)
  const methods = useForm<ForgetPasswordData>({
    resolver: zodResolver(forgetPasswordSchema)
  })

  const handleSubmit = async (data: ForgetPasswordData) => {
    setLoading(true)
    try {
      const result = await forgotPassword(data.email)
      
      if (result.success) {
        toast.success(isArabic ? 'تم إرسال رمز التحقق إلى بريدك الإلكتروني' : 'Verification code sent to your email')
        // Store email in sessionStorage for next step
        sessionStorage.setItem('reset_email', data.email)
        router.push('/check-password')
      } else {
        toast.error(result.error || (isArabic ? 'فشل إرسال رمز التحقق' : 'Failed to send verification code'))
      }
    } catch (err) {
      toast.error(isArabic ? 'حدث خطأ ما' : 'Something went wrong')
    } finally {
      setLoading(false)
    }
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
          <Form methods={methods} onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              name="email"
              label={isArabic ? 'البريد الإلكتروني' : 'Email'}
              type="email"
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (isArabic ? 'جاري الإرسال...' : 'Sending...') : (isArabic ? 'إرسال الرابط' : 'Send Link')}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
