'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { useAuth } from '@/shared/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const { login, isLoading } = useAuth()
  const isArabic = language === 'ar'

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      toast.error(isArabic ? 'يرجى ملء جميع الحقول' : 'Please fill all fields')
      return
    }

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        toast.success(isArabic ? 'تم تسجيل الدخول بنجاح' : 'Logged in successfully!')
        setTimeout(() => {
          router.push('/dashboard')
        }, 500)
      } else {
        toast.error(result.error || (isArabic ? 'فشل تسجيل الدخول' : 'Login failed'))
      }
    } catch (err) {
      toast.error(isArabic ? 'فشل تسجيل الدخول' : 'Login failed')
    }
  }

  return (
    <div className="flex items-center justify-center py-16 px-4 bg-muted min-h-[calc(100vh-20rem)]">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-border">
          <CardHeader className={`space-y-4 pb-6 ${isArabic ? 'text-right' : ''}`}>
            <CardTitle className="text-3xl font-bold text-primary">
              {isArabic ? 'دخول' : 'Sign In'}
            </CardTitle>
            <CardDescription className="text-base">
              {isArabic
                ? 'أدخل بيانات اعتماداتك للوصول إلى حسابك'
                : 'Enter your credentials to access your account'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className={`space-y-2 ${isArabic ? 'text-right' : ''}`}>
                <Label htmlFor="email" className="text-base font-semibold">
                  {isArabic ? 'البريد الإلكتروني' : 'Email'}
                </Label>
                <div className="relative">
                  <Mail className={`w-5 h-5 absolute top-3 text-muted-foreground pointer-events-none ${isArabic ? 'right-3' : 'left-3'}`} />
                  <Input
                    id="email"
                    type="email"
                    placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'your@email.com'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`h-11 ${isArabic ? 'pr-10' : 'pl-10'}`}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className={`space-y-2 ${isArabic ? 'text-right' : ''}`}>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base font-semibold">
                    {isArabic ? 'كلمة المرور' : 'Password'}
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-secondary hover:underline font-semibold">
                    {isArabic ? 'هل نسيت كلمتك؟' : 'Forgot password?'}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className={`w-5 h-5 absolute top-3 text-muted-foreground pointer-events-none ${isArabic ? 'right-3' : 'left-3'}`} />
                  <Input
                    id="password"
                    type="password"
                    placeholder={isArabic ? 'أدخل كلمة مرورك' : 'Password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`h-11 ${isArabic ? 'pr-10' : 'pl-10'}`}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold rounded-full bg-primary hover:bg-secondary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>{isArabic ? 'جاري الدخول...' : 'Signing in...'}</span>
                ) : (
                  <>
                    <span>{isArabic ? 'دخول' : 'Sign In'}</span>
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </>
                )}
              </Button>

              <div className={`relative my-6 ${isArabic ? 'text-right' : ''}`}>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">
                    {isArabic ? 'أو' : 'OR'}
                  </span>
                </div>
              </div>

              <p className={`text-center text-base text-muted-foreground ${isArabic ? 'text-right' : ''}`}>
                {isArabic ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                <Link href="/signup" className="font-semibold text-secondary hover:underline">
                  {isArabic ? 'إنشاء حساب' : 'Sign Up'}
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>

        <div className={`mt-6 p-5 bg-muted rounded-xl text-sm text-muted-foreground border border-border ${isArabic ? 'text-right' : ''}`}>
          <p className="font-bold mb-3 text-primary text-base">
            {isArabic ? 'بيانات اختبار:' : 'Test Credentials:'}
          </p>
          <p className="text-sm mb-1">
            {isArabic ? 'البريد الإلكتروني: test@example.com' : 'Email: test@example.com'}
          </p>
          <p className="text-sm">
            {isArabic ? 'كلمة المرور: password123' : 'Password: password123'}
          </p>
        </div>
      </div>
    </div>
  )
}
