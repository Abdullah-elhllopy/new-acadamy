'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { trainerArticleSchema, type TrainerArticleFormData } from '@/lib/validations'
import { useEffect } from 'react'
import { Article } from '@/shared/types'
import { useCreateArticle , useUpdateArticle } from '@/hooks/api/use-articles'

interface TrainerArticleFormProps {
  trainerId: string
  article?: Article
  onSuccess?: () => void
}

export function TrainerArticleForm({ trainerId, article, onSuccess }: TrainerArticleFormProps) {
  const createArticle = useCreateArticle()
  const updateArticle = useUpdateArticle()
  const isEditing = !!article

  const methods = useForm<TrainerArticleFormData>({
    resolver: zodResolver(trainerArticleSchema),
    defaultValues: {
      titleEn: '',
      titleAr: '',
      contentEn: '',
      contentAr: '',
      excerpt: '',
      category: '',
      tags: [],
      published: false,
    },
  })

  useEffect(() => {
    if (article) {
      methods.reset({
        titleEn: article.titleEn || '',
        titleAr: article.titleAr || '',
        contentEn: article.contentEn || '',
        contentAr: article.contentAr || '',
        excerpt: article.excerptAr || '',
        category: article.categoryName || '',
        tags: article.tags || [],
        published: article.published || false,
      })
    }
  }, [article, methods])

  const onSubmit = async (data: TrainerArticleFormData) => {
    const formData = new FormData()

    if (isEditing) {
      formData.append('ArticleId', article.id)
    }
    
    formData.append('TrainerId', trainerId)
    formData.append('TitleEn', data.titleEn)
    formData.append('TitleAr', data.titleAr)
    formData.append('ContentEn', data.contentEn)
    formData.append('ContentAr', data.contentAr)
    
    if (data.excerpt) formData.append('Excerpt', data.excerpt)
    if (data.category) formData.append('Category', data.category)
    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag, index) => {
        formData.append(`Tags[${index}]`, tag)
      })
    }
    if (data.coverImage?.[0]) formData.append('CoverImageFile', data.coverImage[0])
    
    formData.append('Published', data.published ? 'true' : 'false')

    if (isEditing) {
      await updateArticle.mutateAsync(formData)
    } else {
      await createArticle.mutateAsync(formData)
    }

    onSuccess?.()
  }

  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            name="titleEn"
            label="Title (English)"
            placeholder="Enter article title in English"
            required
          />
          <FormField
            name="titleAr"
            label="Title (Arabic)"
            placeholder="أدخل عنوان المقال بالعربية"
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            name="contentEn"
            label="Content (English)"
            type="textarea"
            placeholder="Enter article content in English"
            rows={8}
            required
          />
          <FormField
            name="contentAr"
            label="Content (Arabic)"
            type="textarea"
            placeholder="أدخل محتوى المقال بالعربية"
            rows={8}
            required
          />
        </div>

        <FormField
          name="excerpt"
          label="Excerpt"
          type="textarea"
          placeholder="Brief summary of the article"
          rows={2}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            name="category"
            label="Category"
            placeholder="e.g., Technology, Business"
          />
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image</Label>
            <Input
              id="coverImage"
              type="file"
              accept="image/*"
              {...methods.register('coverImage')}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="published" {...methods.register('published')} />
          <Label htmlFor="published" className="cursor-pointer">
            Publish article
          </Label>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={createArticle.isPending || updateArticle.isPending}
          >
            {createArticle.isPending || updateArticle.isPending
              ? 'Saving...'
              : isEditing
              ? 'Update Article'
              : 'Add Article'}
          </Button>
        </div>
      </div>
    </Form>
  )
}
