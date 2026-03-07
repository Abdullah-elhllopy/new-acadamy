'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function ConfirmationMessagePage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className={isArabic ? 'text-right' : ''}>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {isArabic ? 'تم بنجاح!' : 'Success!'}
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            {isArabic
              ? 'تم تغيير كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة'
              : 'Your password has been changed successfully. You can now login with your new password'}
          </p>
        </CardHeader>
        <CardContent>
          <Button className="w-full" asChild>
            <Link href="/login">
              {isArabic ? 'تسجيل الدخول' : 'Login'}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
