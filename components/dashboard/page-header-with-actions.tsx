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
  },
  actions?: {
    label: string
    href: string
    icon?: ReactNode,
    variant ?: 'outline' | 'default' | 'ghost'
  }[],
  children?: ReactNode
}

export function PageHeaderWithActions({
  title,
  description,
  action,
  children,
  actions
}: PageHeaderWithActionsProps) {
  return (
    <div className="mb-0 mt-2 container mx-auto px-4 md:px-6 lg:px-8 xl:px-20 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
        {actions && actions.map((act, index) => (
          <Button variant={act.variant ? act.variant : 'default'} key={index} asChild>
            <Link href={act.href}>
              {act.icon}
              {act.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
