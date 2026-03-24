'use client'

import { motion } from 'framer-motion'
import { Breadcrumb, BreadcrumbItem } from '@/components/shared/breadcrumb'
import { cn } from '@/lib/utils'
import { Title } from '../shared/title'


export function Hero({ breadcrumbItems, title, className, children }: { breadcrumbItems?: BreadcrumbItem[], title?: string, className?: string, children?: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("relative bg-muted py-12  overflow-hidden container mx-auto px-4 md:px-6 lg:px-8 xl:px-20  flex flex-col gap-4", className)}
    >

      {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
      {title && <Title title={title} />}
      {children}

    </motion.section>
  )
}
