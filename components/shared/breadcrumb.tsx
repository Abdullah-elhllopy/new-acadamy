'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  isArabic?: boolean
  className?: string
}

export function Breadcrumb({ items, isArabic, className = '' }: BreadcrumbProps) {
  const Separator = () => (
    <ChevronRight className={`w-4 h-4 text-muted-foreground ${isArabic ? 'rotate-180' : ''}`} />
  )

  return (
    <nav className={`flex items-center gap-2 text-sm } ${className}`}>
      {items.map((item, index) => (
        <div key={index} className={`flex items-center gap-2 `}>
          {item.href ? (
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <span suppressHydrationWarning>{item.label}</span>
            </Link>
          ) : (
            <span className="text-foreground font-medium" suppressHydrationWarning>{item.label}</span>
          )}
          {index < items.length - 1 && <Separator />}
        </div>
      ))}
    </nav>
  )
}
