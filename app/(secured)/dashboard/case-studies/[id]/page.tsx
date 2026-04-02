'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCaseStudy, useUpdateCaseStudy } from '@/hooks/api/use-case-studies'
import { caseStudySchema } from '@/lib/validations'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { z } from 'zod'

export default function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const { data: caseStudy, isLoading } = useCaseStudy(id)
  const updateCaseStudy = useUpdateCaseStudy()

  const form = useForm<z.infer<typeof caseStudySchema>>({
    resolver: zodResolver(caseStudySchema),
    values: caseStudy ? {
      titleEn: caseStudy.titleEn,
      titleAr: caseStudy.titleAr,
      clientName: caseStudy.clientName,
      industry: caseStudy.industry,
      challengeEn: caseStudy.challengeEn,
      challengeAr: caseStudy.challengeAr,
      solutionEn: caseStudy.solutionEn,
      solutionAr: caseStudy.solutionAr,
      resultsEn: caseStudy.resultsEn,
      resultsAr: caseStudy.resultsAr,
      published: caseStudy.published,
      featured: caseStudy.featured,
    } : undefined,
  })

  const onSubmit = (data: z.infer<typeof caseStudySchema>) => {
    const formData = new FormData()
    formData.append('id', id)
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if ((key === 'coverImage' || key === 'clientLogo') && value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, String(value))
        }
      }
    })

    updateCaseStudy.mutate(formData, {
      onSuccess: () => router.push('/dashboard/case-studies'),
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96" />
      </div>
    )
  }

  if (!caseStudy) {
    return <div>{isArabic ? 'دراسة الحالة غير موجودة' : 'Case study not found'}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/case-studies">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-primary">
          {isArabic ? 'تعديل دراسة الحالة' : 'Edit Case Study'}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'المعلومات الأساسية' : 'Basic Information'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="titleEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? 'العنوان (إنجليزي)' : 'Title (English)'}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="titleAr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? 'العنوان (عربي)' : 'Title (Arabic)'}</FormLabel>
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? 'اسم العميل' : 'Client Name'}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? 'الصناعة' : 'Industry'}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'التحدي' : 'Challenge'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="challengeEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? 'التحدي (إنجليزي)' : 'Challenge (English)'}</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="challengeAr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? 'التحدي (عربي)' : 'Challenge (Arabic)'}</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'الحل' : 'Solution'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="solutionEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? 'الحل (إنجليزي)' : 'Solution (English)'}</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="solutionAr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? 'الحل (عربي)' : 'Solution (Arabic)'}</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'النتائج' : 'Results'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="resultsEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? 'النتائج (إنجليزي)' : 'Results (English)'}</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resultsAr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? 'النتائج (عربي)' : 'Results (Arabic)'}</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'الإعدادات' : 'Settings'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>{isArabic ? 'نشر دراسة الحالة' : 'Publish Case Study'}</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>{isArabic ? 'دراسة حالة مميزة' : 'Featured Case Study'}</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={updateCaseStudy.isPending}>
              {updateCaseStudy.isPending ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : (isArabic ? 'حفظ' : 'Save')}
            </Button>
            <Link href="/dashboard/case-studies">
              <Button type="button" variant="outline">
                {isArabic ? 'إلغاء' : 'Cancel'}
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
