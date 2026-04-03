'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { ArticleCategory } from '@/shared/types'
import { Loader2 } from 'lucide-react'

interface ArticleCategoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  category?: ArticleCategory | null
  isLoading?: boolean
}

interface FormData {
  nameEn: string
  nameAr: string
  descriptionEn?: string
  descriptionAr?: string
  slug: string
}

export function ArticleCategoryModal({
  open,
  onOpenChange,
  onSubmit,
  category,
  isLoading,
}: ArticleCategoryModalProps) {
  const { isArabic } = useLanguage()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nameEn: '',
      nameAr: '',
      descriptionEn: '',
      descriptionAr: '',
      slug: '',
    },
  })

  const nameEn = watch('nameEn')

  // Auto-generate slug from English name
  useEffect(() => {
    if (nameEn && !category) {
      const slug = nameEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setValue('slug', slug)
    }
  }, [nameEn, category, setValue])

  // Load category data when editing
  useEffect(() => {
    if (category) {
      reset({
        nameEn: category.nameEn,
        nameAr: category.nameAr,
        descriptionEn: category.descriptionEn || '',
        descriptionAr: category.descriptionAr || '',
        slug: category.slug,
      })
    } else {
      reset({
        nameEn: '',
        nameAr: '',
        descriptionEn: '',
        descriptionAr: '',
        slug: '',
      })
    }
  }, [category, reset])

  const handleFormSubmit = (data: FormData) => {
    onSubmit({
      ...data,
      id: category?.id,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {category
              ? isArabic
                ? 'تعديل الفئة'
                : 'Edit Category'
              : isArabic
                ? 'إضافة فئة جديدة'
                : 'Add New Category'}
          </DialogTitle>
          <DialogDescription>
            {category
              ? isArabic
                ? 'قم بتحديث معلومات الفئة أدناه'
                : 'Update the category information below'
              : isArabic
                ? 'أدخل معلومات الفئة الجديدة أدناه'
                : 'Enter the new category information below'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* English Name */}
            <div className="space-y-2">
              <Label htmlFor="nameEn" className="text-sm font-medium">
                {isArabic ? 'الاسم (إنجليزي)' : 'Name (English)'}
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="nameEn"
                {...register('nameEn', {
                  required: isArabic ? 'الاسم الإنجليزي مطلوب' : 'English name is required',
                })}
                placeholder={isArabic ? 'أدخل الاسم بالإنجليزية' : 'Enter English name'}
                className={errors.nameEn ? 'border-destructive' : ''}
              />
              {errors.nameEn && (
                <p className="text-sm text-destructive">{errors.nameEn.message}</p>
              )}
            </div>

            {/* Arabic Name */}
            <div className="space-y-2">
              <Label htmlFor="nameAr" className="text-sm font-medium">
                {isArabic ? 'الاسم (عربي)' : 'Name (Arabic)'}
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="nameAr"
                {...register('nameAr', {
                  required: isArabic ? 'الاسم العربي مطلوب' : 'Arabic name is required',
                })}
                placeholder={isArabic ? 'أدخل الاسم بالعربية' : 'Enter Arabic name'}
                className={errors.nameAr ? 'border-destructive' : ''}
                dir="rtl"
              />
              {errors.nameAr && (
                <p className="text-sm text-destructive">{errors.nameAr.message}</p>
              )}
            </div>
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug" className="text-sm font-medium">
              {isArabic ? 'الرابط المختصر' : 'Slug'}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id="slug"
              {...register('slug', {
                required: isArabic ? 'الرابط المختصر مطلوب' : 'Slug is required',
                pattern: {
                  value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                  message: isArabic
                    ? 'الرابط يجب أن يحتوي على أحرف صغيرة وأرقام وشرطات فقط'
                    : 'Slug must contain only lowercase letters, numbers, and hyphens',
                },
              })}
              placeholder={isArabic ? 'مثال: web-development' : 'e.g., web-development'}
              className={errors.slug ? 'border-destructive' : ''}
            />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {isArabic
                ? 'سيتم إنشاؤه تلقائياً من الاسم الإنجليزي'
                : 'Auto-generated from English name'}
            </p>
          </div>

          {/* English Description */}
          <div className="space-y-2">
            <Label htmlFor="descriptionEn" className="text-sm font-medium">
              {isArabic ? 'الوصف (إنجليزي)' : 'Description (English)'}
            </Label>
            <Textarea
              id="descriptionEn"
              {...register('descriptionEn')}
              placeholder={isArabic ? 'أدخل الوصف بالإنجليزية' : 'Enter English description'}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Arabic Description */}
          <div className="space-y-2">
            <Label htmlFor="descriptionAr" className="text-sm font-medium">
              {isArabic ? 'الوصف (عربي)' : 'Description (Arabic)'}
            </Label>
            <Textarea
              id="descriptionAr"
              {...register('descriptionAr')}
              placeholder={isArabic ? 'أدخل الوصف بالعربية' : 'Enter Arabic description'}
              rows={3}
              className="resize-none"
              dir="rtl"
            />
          </div>

          <DialogFooter className="gap-2 w-full flex justify-start sm:gap-0">
            <div className='flex gap-2 w-full  justify-start items-center'>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                {isArabic ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {category
                  ? isArabic
                    ? 'تحديث'
                    : 'Update'
                  : isArabic
                    ? 'إضافة'
                    : 'Add'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
