'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslate } from '@/locales/use-locales'
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
  const { t } = useTranslate('signup')
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
    { value: UserRole.TRAINEE, label: t('roles.trainee') },
    { value: UserRole.CORPORATE_MANAGER, label: t('roles.corporateManager') },
    { value: UserRole.TRAINER_APPLICANT, label: t('roles.trainerApplicant') },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error(t('errors.fillAllFields'))
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(t('errors.passwordMismatch'))
      return
    }

    if (formData.password.length < 6) {
      toast.error(t('errors.passwordTooShort'))
      return
    }

    if (formData.role === UserRole.CORPORATE_MANAGER && !formData.company) {
      toast.error(t('errors.companyRequired'))
      return
    }

    setIsLoading(true)
    try {
      // Simulate signup
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success(t('success.accountCreated'))
      router.push('/login')
    } catch (err) {
      toast.error(t('errors.accountCreationFailed'))
    } finally {
      setIsLoading(false)
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
                    <User className="w-4 h-4 absolute top-3 start-3 text-muted-foreground pointer-events-none" />
                    <Input
                      id="name"
                      placeholder={t('fullNamePlaceholder')}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
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
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Company (for corporate managers) */}
                {formData.role === UserRole.CORPORATE_MANAGER && (
                  <div className="space-y-2">
                    <Label htmlFor="company">
                      {t('companyName')}
                    </Label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 absolute top-3 start-3 text-muted-foreground pointer-events-none" />
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
                    <Mail className="w-4 h-4 absolute top-3 start-3 text-muted-foreground pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="ps-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {t('password')}
                  </Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute top-3 start-3 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      type="password"
                      placeholder={t('passwordPlaceholder')}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
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
                    <Lock className="w-4 h-4 absolute top-3 start-3 text-muted-foreground pointer-events-none" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder={t('confirmPasswordPlaceholder')}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
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
