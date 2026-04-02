'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateTrainerVideo, useUpdateTrainerVideo } from '@/hooks/api/use-trainer-videos'
import { Form, FormField } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { trainerVideoSchema, type TrainerVideoFormData } from '@/lib/validations'
import { useEffect } from 'react'

interface TrainerVideoFormProps {
  trainerId: string
  video?: any
  onSuccess?: () => void
}

export function TrainerVideoForm({ trainerId, video, onSuccess }: TrainerVideoFormProps) {
  const createVideo = useCreateTrainerVideo()
  const updateVideo = useUpdateTrainerVideo()
  const isEditing = !!video

  const methods = useForm<TrainerVideoFormData>({
    resolver: zodResolver(trainerVideoSchema),
    defaultValues: {
      titleEn: '',
      titleAr: '',
      descriptionEn: '',
      descriptionAr: '',
      videoUrl: '',
      duration: '',
      published: false,
    },
  })

  useEffect(() => {
    if (video) {
      methods.reset({
        titleEn: video.titleEn || '',
        titleAr: video.titleAr || '',
        descriptionEn: video.descriptionEn || '',
        descriptionAr: video.descriptionAr || '',
        videoUrl: video.videoUrl || '',
        duration: video.duration?.toString() || '',
        published: video.published || false,
      })
    }
  }, [video, methods])

  const onSubmit = async (data: TrainerVideoFormData) => {
    const formData = new FormData()

    if (isEditing) {
      formData.append('VideoId', video.id)
    }
    
    formData.append('TrainerId', trainerId)
    formData.append('TitleEn', data.titleEn)
    formData.append('TitleAr', data.titleAr)
    formData.append('VideoUrl', data.videoUrl)
    
    if (data.descriptionEn) formData.append('DescriptionEn', data.descriptionEn)
    if (data.descriptionAr) formData.append('DescriptionAr', data.descriptionAr)
    if (data.duration) formData.append('Duration', data.duration)
    if (data.thumbnail?.[0]) formData.append('ThumbnailFile', data.thumbnail[0])
    
    formData.append('Published', data.published ? 'true' : 'false')

    if (isEditing) {
      await updateVideo.mutateAsync(formData)
    } else {
      await createVideo.mutateAsync(formData)
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
            placeholder="Enter video title in English"
            required
          />
          <FormField
            name="titleAr"
            label="Title (Arabic)"
            placeholder="أدخل عنوان الفيديو بالعربية"
            required
          />
        </div>

        <FormField
          name="videoUrl"
          label="Video URL"
          placeholder="https://youtube.com/watch?v=..."
          required
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            name="descriptionEn"
            label="Description (English)"
            type="textarea"
            placeholder="Enter video description in English"
            rows={3}
          />
          <FormField
            name="descriptionAr"
            label="Description (Arabic)"
            type="textarea"
            placeholder="أدخل وصف الفيديو بالعربية"
            rows={3}
          />
        </div>

        <FormField
          name="duration"
          label="Duration (minutes)"
          type="number"
          placeholder="e.g., 45"
        />

        <div className="space-y-2">
          <Label htmlFor="thumbnail">Thumbnail Image</Label>
          <Input
            id="thumbnail"
            type="file"
            accept="image/*"
            {...methods.register('thumbnail')}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="published" {...methods.register('published')} />
          <Label htmlFor="published" className="cursor-pointer">
            Publish video
          </Label>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={createVideo.isPending || updateVideo.isPending}
          >
            {createVideo.isPending || updateVideo.isPending
              ? 'Saving...'
              : isEditing
              ? 'Update Video'
              : 'Add Video'}
          </Button>
        </div>
      </div>
    </Form>
  )
}
