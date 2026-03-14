'use client'

import { motion } from 'framer-motion'
import { Breadcrumb, BreadcrumbItem } from '@/components/shared/breadcrumb'


export function Hero({ breadcrumbItems, children }: { breadcrumbItems: BreadcrumbItem[], children: React.ReactNode }) {


  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-muted py-12 flex flex-col gap-4 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-20 relative">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />
        {children}
      </div>
    </motion.section>
  )
}
