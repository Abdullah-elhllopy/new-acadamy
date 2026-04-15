'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string;
  linkClassName?: string;
}

export function Breadcrumb({ items,  className = '',linkClassName }: BreadcrumbProps) {
  const { isRTL } = useLanguage()
  const Separator = () => (
    <ChevronRight className={`w-4 h-4 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`} />
  )

  return (
    <nav className={`flex items-center gap-2 text-sm } ${className}`}>
      {items.map((item, index) => (
        <div key={index} className={`flex items-center gap-2 `}>
          {item.href ? (
            <Link
              href={item.href}
              className={cn("text-muted-foreground hover:text-foreground transition-colors",linkClassName)}
            >
              <span suppressHydrationWarning>{item.label}</span>
            </Link>
          ) : (
            <span className={ ` ${linkClassName ? "text-muted-foreground " : "text-foreground"}  font-medium` }suppressHydrationWarning>{item.label}</span>
          )}
          {index < items.length - 1 && <Separator />}
        </div>
      ))}
    </nav>
  )
}
