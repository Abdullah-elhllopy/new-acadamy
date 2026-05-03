'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { useAuth } from '@/shared/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KeyRound } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function CheckPasswordPage() {
  const { isArabic } = useLanguage()
  const router = useRouter()
  const { checkCode } = useAuth()
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // Get email from sessionStorage
    const storedEmail = sessionStorage.getItem('reset_email')
    if (!storedEmail) {
      toast.error(isArabic ? 'الرجاء البدء من صفحة نسيت كلمة المرور' : 'Please start from forgot password page')
      router.push('/forget-password')
      return
    }
    setEmail(storedEmail)
  }, [router, isArabic])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!code) {
      toast.error(isArabic ? 'الرجاء إدخال رمز التحقق' : 'Please enter verification code')
      return
    }

    setLoading(true)
    try {
      const result = await checkCode(email, code)
      
      if (result.success) {
        toast.success(isArabic ? 'تم التحقق بنجاح' : 'Verification successful')
        // Store code for next step
        sessionStorage.setItem('reset_code', code)
        router.push('/new-password')
      } else {
        toast.error(result.error || (isArabic ? 'رمز التحقق غير صحيح' : 'Invalid verification code'))
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
              <KeyRound className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {isArabic ? 'أدخل رمز التحقق' : 'Enter Verification Code'}
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            {isArabic
              ? 'تحقق من بريدك الإلكتروني وأدخل رمز التحقق'
              : 'Check your email and enter the verification code'}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className={isArabic ? 'text-right block' : ''}>
                {isArabic ? 'رمز التحقق' : 'Verification Code'}
              </Label>
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
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
