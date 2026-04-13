'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { useAuth } from '@/shared/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField } from '@/components/forms'
import { Lock } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { newPasswordSchema, NewPasswordData } from '@/lib/validations'

export default function NewPasswordPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const router = useRouter()
  const { resetPassword } = useAuth()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const methods = useForm<NewPasswordData>({
    resolver: zodResolver(newPasswordSchema)
  })

  useEffect(() => {
    // Get email and code from sessionStorage
    const storedEmail = sessionStorage.getItem('reset_email')
    const storedCode = sessionStorage.getItem('reset_code')
    
    if (!storedEmail || !storedCode) {
      toast.error(isArabic ? 'الرجاء إكمال خطوات استعادة كلمة المرور' : 'Please complete password recovery steps')
      router.push('/forget-password')
      return
    }
    
    setEmail(storedEmail)
    setCode(storedCode)
  }, [router, isArabic])

  const handleSubmit = async (data: NewPasswordData) => {
    setLoading(true)
    try {
      const result = await resetPassword(email, code, data.newPassword, data.confirmPassword)
      
      if (result.success) {
        toast.success(isArabic ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully')
        // Clear sessionStorage
        sessionStorage.removeItem('reset_email')
        sessionStorage.removeItem('reset_code')
        setTimeout(() => {
          router.push('/login')
        }, 500)
      } else {
        toast.error(result.error || (isArabic ? 'فشل تغيير كلمة المرور' : 'Failed to change password'))
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
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {isArabic ? 'إنشاء كلمة مرور جديدة' : 'Create New Password'}
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            {isArabic
              ? 'أدخل كلمة المرور الجديدة الخاصة بك'
              : 'Enter your new password'}
          </p>
        </CardHeader>
        <CardContent>
          <Form methods={methods} onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              name="newPassword"
              label={isArabic ? 'كلمة المرور الجديدة' : 'New Password'}
              type="password"
              required
            />
            <FormField
              name="confirmPassword"
              label={isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
              type="password"
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (isArabic ? 'جاري التحديث...' : 'Updating...') : (isArabic ? 'تحديث كلمة المرور' : 'Update Password')}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
