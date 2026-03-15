'use client'

import { motion } from 'framer-motion'
import { Breadcrumb, BreadcrumbItem } from '@/components/shared/breadcrumb'
import { cn } from '@/lib/utils'


export function Hero({ breadcrumbItems, className, children }: { breadcrumbItems?: BreadcrumbItem[], className?: string, children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("relative bg-muted py-12  overflow-hidden container mx-auto px-4 md:px-6 lg:px-8 xl:px-20  flex flex-col gap-4", className)}
    >

      {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
      {children}

    </motion.section>
  )
}
