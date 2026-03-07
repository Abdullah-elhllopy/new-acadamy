'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KeyRound } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function CheckPasswordPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const router = useRouter()
  const [tempPassword, setTempPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      toast.success(isArabic ? 'تم التحقق بنجاح' : 'Verification successful')
      router.push('/new-password')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className={isArabic ? 'text-right' : ''}>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <KeyRound className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {isArabic ? 'أدخل كلمة المرور المؤقتة' : 'Enter Temporary Password'}
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            {isArabic
              ? 'تحقق من بريدك الإلكتروني وأدخل كلمة المرور المؤقتة'
              : 'Check your email and enter the temporary password'}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className={isArabic ? 'text-right block' : ''}>
                {isArabic ? 'كلمة المرور المؤقتة' : 'Temporary Password'}
              </Label>
              <Input
                type="text"
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                required
                className={isArabic ? 'text-right' : ''}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (isArabic ? 'جاري التحقق...' : 'Verifying...') : (isArabic ? 'تحقق' : 'Verify')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
