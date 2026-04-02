'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateTrainerReview } from '@/hooks/api/use-trainer-reviews'
import { Form, FormField } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { trainerReviewSchema, type TrainerReviewFormData } from '@/lib/validations'
import { Star } from 'lucide-react'
import { useState } from 'react'

interface TrainerReviewFormProps {
  trainerId: string
  onSuccess?: () => void
}

export function TrainerReviewForm({ trainerId, onSuccess }: TrainerReviewFormProps) {
  const createReview = useCreateTrainerReview()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const methods = useForm<TrainerReviewFormData>({
    resolver: zodResolver(trainerReviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
      courseId: '',
    },
  })

  const onSubmit = async (data: TrainerReviewFormData) => {
    await createReview.mutateAsync({
      trainerId,
      rating: data.rating,
      comment: data.comment,
      courseId: data.courseId || undefined,
    })

    onSuccess?.()
  }

  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>التقييم</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setRating(value)
                  methods.setValue('rating', value)
                }}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    value <= (hoverRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          {methods.formState.errors.rating && (
            <p className="text-sm text-destructive">{methods.formState.errors.rating.message}</p>
          )}
        </div>

        <FormField
          name="comment"
          label="التعليق"
          type="textarea"
          placeholder="شاركنا تجربتك مع المدرب..."
          rows={4}
          required
        />

        <FormField
          name="courseId"
          label="الدورة (اختياري)"
          placeholder="اختر الدورة التي حضرتها"
        />

        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={createReview.isPending}
          >
            {createReview.isPending ? 'جاري الإرسال...' : 'إرسال التقييم'}
          </Button>
        </div>
      </div>
    </Form>
  )
}
