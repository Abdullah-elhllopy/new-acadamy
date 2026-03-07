'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/shared/form'
import { FormField } from '@/components/shared/form-field'
import { Lock } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { newPasswordSchema, NewPasswordData } from '@/lib/validations'

export default function NewPasswordPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: NewPasswordData) => {
    setLoading(true)
    setTimeout(() => {
      toast.success(isArabic ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully')
      router.push('/confirmation-message')
      setLoading(false)
    }, 1000)
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
          <Form schema={newPasswordSchema} onSubmit={handleSubmit} className="space-y-4">
            {(methods) => (
              <>
                <FormField
                  name="newPassword"
                  label={isArabic ? 'كلمة المرور الجديدة' : 'New Password'}
                  type="password"
                  methods={methods}
                  isArabic={isArabic}
                  required
                />
                <FormField
                  name="confirmPassword"
                  label={isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  type="password"
                  methods={methods}
                  isArabic={isArabic}
                  required
                />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (isArabic ? 'جاري التحديث...' : 'Updating...') : (isArabic ? 'تحديث كلمة المرور' : 'Update Password')}
                </Button>
              </>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
