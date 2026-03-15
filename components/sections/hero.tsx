'use client'

import { motion } from 'framer-motion'
import { Breadcrumb, BreadcrumbItem } from '@/components/shared/breadcrumb'


export function Hero({ breadcrumbItems, children }: { breadcrumbItems?: BreadcrumbItem[], children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-muted py-12  overflow-hidden container mx-auto px-4 md:px-6 lg:px-8 xl:px-20  flex flex-col gap-4"
    >

      {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
      {children}

    </motion.section>
  )
}
