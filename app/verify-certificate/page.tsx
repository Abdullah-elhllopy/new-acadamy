'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Search } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const verificationSchema = z.object({
  certificateNumber: z.string().min(1, 'Certificate number is required'),
})

type VerificationForm = z.infer<typeof verificationSchema>

export default function VerifyCertificatePage() {
  const router = useRouter()
  const { isArabic } = useLanguage()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
  })

  const onSubmit = (data: VerificationForm) => {
    router.push(`/verify-certificate/${data.certificateNumber}`)
  }

  return (
    <>
      <section className="bg-linear-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className={`max-w-2xl mx-auto text-center`}>
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isArabic ? 'التحقق من الشهادة' : 'Verify Certificate'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isArabic
                ? 'تحقق من صحة الشهادة باستخدام رقم الشهادة'
                : 'Verify the authenticity of a certificate using the certificate number'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className={isArabic ? 'text-right' : ''}>
                {isArabic ? 'أدخل رقم الشهادة' : 'Enter Certificate Number'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certificateNumber" className={isArabic ? 'text-right block' : ''}>
                    {isArabic ? 'رقم الشهادة' : 'Certificate Number'}
                  </Label>
                  <Input
                    id="certificateNumber"
                    placeholder={
                      isArabic ? 'مثال: CERT-2024-001' : 'e.g., CERT-2024-001'
                    }
                    {...register('certificateNumber')}
                    className={isArabic ? 'text-right' : ''}
                  />
                  {errors.certificateNumber && (
                    <p className="text-sm text-destructive">
                      {errors.certificateNumber.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  {isArabic ? 'تحقق' : 'Verify'}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground text-center">
                  {isArabic
                    ? 'يمكنك أيضاً مسح رمز QR الموجود على الشهادة للتحقق منها'
                    : 'You can also scan the QR code on the certificate to verify it'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
