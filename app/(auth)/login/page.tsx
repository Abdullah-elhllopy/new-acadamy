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
import { toast } from 'sonner'
import { Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { t } = useTranslate('login')
  const { login, isLoading } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      toast.error(t('errors.fillAllFields'))
      return
    }

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        toast.success(t('success.loggedIn'))
        setTimeout(() => {
          router.push('/dashboard')
        }, 500)
      } else {
        toast.error(result.error || t('errors.loginFailed'))
      }
    } catch (err) {
      toast.error(t('errors.loginFailed'))
    }
  }

  return (
    <div className="flex items-center justify-center py-16 px-4 bg-muted min-h-[calc(100vh-20rem)]">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-border">
          <CardHeader className="space-y-4 pb-6">
            <CardTitle className="text-3xl font-bold text-primary">
              {t('title')}
            </CardTitle>
            <CardDescription className="text-base">
              {t('description')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold">
                  {t('email')}
                </Label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute top-3 inset-s-3 text-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11 ps-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base font-semibold">
                    {t('password')}
                  </Label>
                  <Link href="/forget-password" className="text-sm text-secondary hover:underline font-semibold">
                    {t('forgotPassword')}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute top-3 inset-s-3 text-muted-foreground pointer-events-none" />
                  <Input
                    id="password"
                    type="password"
                    placeholder={t('passwordPlaceholder')}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-11 ps-10"
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
                  <span>{t('signingIn')}</span>
                ) : (
                  <>
                    <span>{t('signIn')}</span>
                    <ArrowRight className="w-5 h-5 ms-2" />
                  </>
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">
                    {t('or')}
                  </span>
                </div>
              </div>

              <p className="text-center text-base text-muted-foreground">
                {t('noAccount')}{' '}
                <Link href="/signup" className="font-semibold text-secondary hover:underline">
                  {t('signUp')}
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 p-5 bg-muted rounded-xl text-sm text-muted-foreground border border-border">
          <p className="font-bold mb-3 text-primary text-base">
            {t('testCredentials')}
          </p>
          <p className="text-sm mb-1">
            {t('testEmail')}
          </p>
          <p className="text-sm">
            {t('testPassword')}
          </p>
        </div>
      </div>
    </div>
  )
}
