'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslate } from '@/locales/use-locales'
import { useAuth } from '@/shared/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Mail, Lock, User, Building2, ArrowRight, Phone } from 'lucide-react'
import { UserRole } from '@/shared/constants/roles'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function SignupPage() {
  const router = useRouter()
  const { t } = useTranslate('signup')
  const { register, isLoading } = useAuth()

  const [formData, setFormData] = useState({
    userFullName: '',
    userEmail: '',
    userPassword: '',
    userConfirmPassword: '',
    userPhone: '',
    type: UserRole.TRAINEE,
    company: '',
  })

  const roleOptions = [
    { value: UserRole.TRAINEE, label: t('roles.trainee') },
    { value: UserRole.CORPORATE_MANAGER, label: t('roles.corporateManager') },
    { value: UserRole.TRAINER_APPLICANT, label: t('roles.trainerApplicant') },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.userFullName || !formData.userEmail || !formData.userPassword || !formData.userConfirmPassword || !formData.userPhone) {
      toast.error(t('errors.fillAllFields'))
      return
    }

    if (formData.userPassword !== formData.userConfirmPassword) {
      toast.error(t('errors.passwordMismatch'))
      return
    }

    if (formData.userPassword.length < 6) {
      toast.error(t('errors.passwordTooShort'))
      return
    }

    if (formData.type === UserRole.CORPORATE_MANAGER && !formData.company) {
      toast.error(t('errors.companyRequired'))
      return
    }

    try {
      const result = await register({
        userFullName: formData.userFullName,
        userEmail: formData.userEmail,
        userPassword: formData.userPassword,
        userConfirmPassword: formData.userConfirmPassword,
        userPhone: formData.userPhone,
        type: formData.type,
      })
      
      if (result.success) {
        toast.success(t('success.accountCreated'))
        setTimeout(() => {
          router.push('/login')
        }, 500)
      } else {
        toast.error(result.error || t('errors.accountCreationFailed'))
      }
    } catch (err) {
      toast.error(t('errors.accountCreationFailed'))
    }
  }

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-3">
              <CardTitle className="text-2xl">
                {t('title')}
              </CardTitle>
              <CardDescription>
                {t('description')}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {t('fullName')}
                  </Label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute top-3 inset-s-3 text-muted-foreground pointer-events-none" />
                    <Input
                      id="userFullName"
                      placeholder={t('fullNamePlaceholder')}
                      value={formData.userFullName}
                      onChange={(e) =>
                        setFormData({ ...formData, userFullName: e.target.value })
                      }
                      className="ps-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* User Role */}
                <div className="space-y-2">
                  <Label htmlFor="role">
                    {t('accountType')}
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value as UserRole })
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Company (for corporate managers) */}
                {formData.type === UserRole.CORPORATE_MANAGER && (
                  <div className="space-y-2">
                    <Label htmlFor="company">
                      {t('companyName')}
                    </Label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 absolute top-3 inset-s-3 text-muted-foreground pointer-events-none" />
                      <Input
                        id="company"
                        placeholder={t('companyNamePlaceholder')}
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="ps-10"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t('email')}
                  </Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute top-3 inset-s-3 text-muted-foreground pointer-events-none" />
                    <Input
                      id="userEmail"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      value={formData.userEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, userEmail: e.target.value })
                      }
                      className="ps-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="userPhone">
                    {t('phone') || 'Phone Number'}
                  </Label>
                  <PhoneInput
                    country={'sa'}
                    value={formData.userPhone}
                    onChange={(phone) => setFormData({ ...formData, userPhone: phone })}
                    inputClass="w-full h-10 px-3 py-2 text-sm border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    containerClass="w-full"
                    buttonClass="bg-transparent border-r border-input"
                    dropdownClass="bg-background border border-input"
                    searchClass="bg-background border border-input"
                    disabled={isLoading}
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {t('password')}
                  </Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute top-3 inset-s-3 text-muted-foreground pointer-events-none" />
                    <Input
                      id="userPassword"
                      type="password"
                      placeholder={t('passwordPlaceholder')}
                      value={formData.userPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, userPassword: e.target.value })
                      }
                      className="ps-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">
                    {t('confirmPassword')}
                  </Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute top-3 inset-s-3 text-muted-foreground pointer-events-none" />
                    <Input
                      id="userConfirmPassword"
                      type="password"
                      placeholder={t('confirmPasswordPlaceholder')}
                      value={formData.userConfirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, userConfirmPassword: e.target.value })
                      }
                      className="ps-10"
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
                    <span>{t('creatingAccount')}</span>
                  ) : (
                    <>
                      <span>{t('createAccount')}</span>
                      <ArrowRight className="w-4 h-4 ms-2" />
                    </>
                  )}
                </Button>

                {/* Sign in link */}
                <p className="text-center text-sm text-muted-foreground">
                  {t('alreadyHaveAccount')}{' '}
                  <Link
                    href="/login"
                    className="font-semibold text-primary hover:underline"
                  >
                    {t('signIn')}
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
