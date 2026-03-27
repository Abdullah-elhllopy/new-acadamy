import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PageHeaderWithActionsProps {
  title: string
  description?: string
  action?: {
    label: string
    href: string
    icon?: ReactNode
  }
  children?: ReactNode
}

export function PageHeaderWithActions({
  title,
  description,
  action,
  children,
}: PageHeaderWithActionsProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}
        {action && (
          <Button asChild>
            <Link href={action.href}>
              {action.icon}
              {action.label}
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
