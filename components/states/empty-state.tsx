import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
  language?: 'en' | 'ar'
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  language = 'en',
}: EmptyStateProps) {
  const isArabic = language === 'ar'

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${isArabic ? 'text-right' : ''}`}>
      {Icon && (
        <Icon className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
      )}
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground max-w-md mb-6">
        {description}
      </p>
      {action && (
        <Button asChild>
          <Link href={action.href}>
            {action.label}
          </Link>
        </Button>
      )}
    </div>
  )
}
