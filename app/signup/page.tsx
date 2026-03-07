'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Mail, Lock, User, Building2, ArrowRight } from 'lucide-react'
import { UserRole } from '@/shared/constants/roles'

export default function SignupPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: UserRole.TRAINEE,
    company: '',
  })

  const roleOptions = [
    { value: UserRole.TRAINEE, labelEn: 'Individual Trainee', labelAr: 'متدرب فردي' },
    { value: UserRole.CORPORATE_MANAGER, labelEn: 'Corporate Manager', labelAr: 'مدير مؤسسي' },
    { value: UserRole.TRAINER_APPLICANT, labelEn: 'Trainer Applicant', labelAr: 'متقدم كمدرب' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error(isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(isArabic ? 'كلمات المرور غير متطابقة' : 'Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error(isArabic ? 'كلمة المرور قصيرة جداً' : 'Password is too short')
      return
    }

    if (formData.role === UserRole.CORPORATE_MANAGER && !formData.company) {
      toast.error(isArabic ? 'يرجى إدخال اسم الشركة' : 'Please enter company name')
      return
    }

    setIsLoading(true)
    try {
      // Simulate signup
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success(
        isArabic
          ? 'تم إنشاء الحساب بنجاح. يرجى تسجيل الدخول.'
          : 'Account created successfully. Please sign in.'
      )
      router.push('/login')
    } catch (err) {
      toast.error(isArabic ? 'فشل في إنشاء الحساب' : 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className={`space-y-3 ${isArabic ? 'text-right' : ''}`}>
              <CardTitle className="text-2xl">
                {isArabic ? 'إنشاء حساب' : 'Create Account'}
              </CardTitle>
              <CardDescription>
                {isArabic
                  ? 'انضم إلى أكاديمية ID واستمتع بفرص التدريب المتميزة'
                  : 'Join ID Academy and access premium training opportunities'}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className={`space-y-2 ${isArabic ? 'text-right' : ''}`}>
                  <Label htmlFor="name">
                    {isArabic ? 'الاسم الكامل' : 'Full Name'}
                  </Label>
                  <div className="relative">
                    <User className={`w-4 h-4 absolute top-3 text-muted-foreground pointer-events-none ${isArabic ? 'right-3' : 'left-3'}`} />
                    <Input
                      id="name"
                      placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Your full name'}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={isArabic ? 'pr-10' : 'pl-10'}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* User Role */}
                <div className={`space-y-2 ${isArabic ? 'text-right' : ''}`}>
                  <Label htmlFor="role">
                    {isArabic ? 'نوع الحساب' : 'Account Type'}
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value as UserRole })
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {isArabic ? option.labelAr : option.labelEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Company (for corporate managers) */}
                {formData.role === UserRole.CORPORATE_MANAGER && (
                  <div className={`space-y-2 ${isArabic ? 'text-right' : ''}`}>
                    <Label htmlFor="company">
                      {isArabic ? 'اسم الشركة' : 'Company Name'}
                    </Label>
                    <div className="relative">
                      <Building2 className={`w-4 h-4 absolute top-3 text-muted-foreground pointer-events-none ${isArabic ? 'right-3' : 'left-3'}`} />
                      <Input
                        id="company"
                        placeholder={isArabic ? 'اسم شركتك' : 'Your company name'}
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className={isArabic ? 'pr-10' : 'pl-10'}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className={`space-y-2 ${isArabic ? 'text-right' : ''}`}>
                  <Label htmlFor="email">
                    {isArabic ? 'البريد الإلكتروني' : 'Email'}
                  </Label>
                  <div className="relative">
                    <Mail className={`w-4 h-4 absolute top-3 text-muted-foreground pointer-events-none ${isArabic ? 'right-3' : 'left-3'}`} />
                    <Input
                      id="email"
                      type="email"
                      placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'your@email.com'}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={isArabic ? 'pr-10' : 'pl-10'}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className={`space-y-2 ${isArabic ? 'text-right' : ''}`}>
                  <Label htmlFor="password">
                    {isArabic ? 'كلمة المرور' : 'Password'}
                  </Label>
                  <div className="relative">
                    <Lock className={`w-4 h-4 absolute top-3 text-muted-foreground pointer-events-none ${isArabic ? 'right-3' : 'left-3'}`} />
                    <Input
                      id="password"
                      type="password"
                      placeholder={isArabic ? 'أدخل كلمة مرورك' : 'At least 6 characters'}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className={isArabic ? 'pr-10' : 'pl-10'}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className={`space-y-2 ${isArabic ? 'text-right' : ''}`}>
                  <Label htmlFor="confirm-password">
                    {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  </Label>
                  <div className="relative">
                    <Lock className={`w-4 h-4 absolute top-3 text-muted-foreground pointer-events-none ${isArabic ? 'right-3' : 'left-3'}`} />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder={isArabic ? 'أعد إدخال كلمة مرورك' : 'Confirm your password'}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                      className={isArabic ? 'pr-10' : 'pl-10'}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>{isArabic ? 'جاري الإنشاء...' : 'Creating account...'}</span>
                  ) : (
                    <>
                      <span>{isArabic ? 'إنشاء حساب' : 'Create Account'}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {/* Sign in link */}
                <p className={`text-center text-sm text-muted-foreground ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'هل لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
                  <Link
                    href="/login"
                    className="font-semibold text-primary hover:underline"
                  >
                    {isArabic ? 'دخول' : 'Sign In'}
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
