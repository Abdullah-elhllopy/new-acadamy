'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useArticle, useUpdateArticle } from '@/hooks/api/use-articles'
import { useArticleCategories } from '@/hooks/api/use-article-categories'
import { articleSchema } from '@/lib/validations'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { BackButton, Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/shared/hooks/useLanguage'
import Link from 'next/link'
import { z } from 'zod'
import { DashboardHero } from '@/components/sections/hero'
import { ContentLayout } from '@/layout/page-layout'

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const { data: article, isLoading } = useArticle(id)
  const updateArticle = useUpdateArticle()
  const { data: categories } = useArticleCategories()

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    values: article ? {
      titleEn: article.titleEn,
      titleAr: article.titleAr,
      contentEn: article.contentEn,
      contentAr: article.contentAr,
      excerptEn: article.excerptEn || '',
      excerptAr: article.excerptAr || '',
      categoryId: article.categoryId,
      published: article.published,
      featured: article.featured,
      tags: article.tags,
    } : undefined,
  })

  const onSubmit = (data: z.infer<typeof articleSchema>) => {
    const formData = new FormData()
    formData.append('id', id)
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'coverImage' && value instanceof File) {
          formData.append(key, value)
        } else if (key === 'tags' && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, String(value))
        }
      }
    })

    updateArticle.mutate(formData, {
      onSuccess: () => router.push('/dashboard/articles'),
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

  if (!article) {
    return <div>{isArabic ? 'المقال غير موجود' : 'Article not found'}</div>
  }

  return (
    <div className="space-y-6">
      <DashboardHero title={isArabic ? 'تعديل المقال' : 'Edit Article'} >
        <BackButton href="/dashboard/articles" text={isArabic ? 'العودة إلى المقالات' : 'Back to Articles'} />
      </DashboardHero>
      <ContentLayout>
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
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isArabic ? 'الفئة' : 'Category'}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={isArabic ? 'اختر الفئة' : 'Select category'} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {isArabic ? category.nameAr : category.nameEn}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>{isArabic ? 'صورة الغلاف' : 'Cover Image'}</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => onChange(e.target.files?.[0])}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? 'المحتوى' : 'Content'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="excerptEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isArabic ? 'المقتطف (إنجليزي)' : 'Excerpt (English)'}</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerptAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isArabic ? 'المقتطف (عربي)' : 'Excerpt (Arabic)'}</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contentEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isArabic ? 'المحتوى (إنجليزي)' : 'Content (English)'}</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={10} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contentAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isArabic ? 'المحتوى (عربي)' : 'Content (Arabic)'}</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={10} dir="rtl" />
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
                      <FormLabel>{isArabic ? 'نشر المقال' : 'Publish Article'}</FormLabel>
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
                      <FormLabel>{isArabic ? 'مقال مميز' : 'Featured Article'}</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="submit" disabled={updateArticle.isPending}>
                {updateArticle.isPending ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : (isArabic ? 'حفظ' : 'Save')}
              </Button>
              <Link href="/dashboard/articles">
                <Button type="button" variant="outline">
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </ContentLayout>
    </div>
  )
}
