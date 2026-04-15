'use client'

import { motion } from 'framer-motion'
import { Breadcrumb, BreadcrumbItem } from '@/components/shared/breadcrumb'
import { cn } from '@/lib/utils'
import { Title, TitleContainer } from '../shared/title'


export function Hero({ breadcrumbItems, title, className, children ,linkClassName}: {linkClassName ?:string; breadcrumbItems?: BreadcrumbItem[], title?: string, className?: string, children?: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("relative bg-muted py-12  overflow-hidden container mx-auto px-4 md:px-6 lg:px-8 xl:px-20  flex flex-col gap-4", className)}
    >

      {breadcrumbItems && <Breadcrumb linkClassName={linkClassName}  items={breadcrumbItems} />}
      {title && <Title title={title} />}
      {children}

    </motion.section>
  )
}

export function DashboardHero({ breadcrumbItems, title, className, children, description }: { breadcrumbItems?: BreadcrumbItem[], description?: string, title?: string, className?: string, children?: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("relative bg-muted py-4  overflow-hidden container mx-auto px-4 md:px-6 lg:px-8 xl:px-20  flex flex-col gap-4", className)}
    >
      {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}

      <div className='flex justify-between items-center'>
        {description && title? <TitleContainer title={title} subtitle={description} /> : title ? <Title title={title} className='text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight' /> : null}
        {children}
      </div>
    </motion.section>
  )
}
