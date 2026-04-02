'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  className?: string
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value)
    }
  }

  return (
    <div className={cn('flex gap-1', className)}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= rating
        const isPartial = starValue > rating && starValue - 1 < rating

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(starValue)}
            disabled={!interactive}
            className={cn(
              'focus:outline-none transition-colors',
              interactive && 'cursor-pointer hover:scale-110',
              !interactive && 'cursor-default'
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                isFilled && 'fill-yellow-400 text-yellow-400',
                !isFilled && 'text-gray-300'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
