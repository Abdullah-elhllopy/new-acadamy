'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  pageLimit?: number
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageLimit = 5,
  className
}: PaginationProps) {
  const { isRTL } = useLanguage()

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
    return Array.from({ length: pageLimit }, (_, i) => start + i + 1)
      .filter(num => num <= totalPages)
  }

  const showPrev = currentPage > 1
  const showNext = currentPage < totalPages

  if (totalPages <= 1) return null

  return (
    <nav className={cn("flex items-center justify-center gap-6", className)} aria-label="Pagination">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!showPrev}
        className="rounded-full w-10 h-10"
      >
        {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>

      <div className="flex items-center gap-3">
        {getPaginationGroup().map((num) => (
          <Button
            key={num}
            variant={currentPage === num ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(num)}
            className={cn(
              "rounded-full w-10 h-10 font-medium border-0 transition-all shadow-none justify-center items-center flex",
              currentPage === num
                ? "bg-primary text-primary-foreground border border-primary"
                : "hover:bg-primary/10"
            )}
          >
            {num}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!showNext}
        className="rounded-full w-10 h-10"
      >
        {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </Button>
    </nav>
  )
}
