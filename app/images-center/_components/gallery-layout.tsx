'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Hero } from '@/components/sections/hero'
import { ContentLayout, Layout } from '@/layout/page-layout'
import { Title } from '@/components/shared/title'

interface GalleryLayoutProps {
    title: string
    titleAr: string
    breadcrumbs: { label: string; labelAr: string; href?: string }[]
    children: React.ReactNode
}

export function GalleryLayout({ title, titleAr, breadcrumbs, children }: GalleryLayoutProps) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const displayTitle = isArabic ? titleAr : title

    return (
        <Layout  >
            {/* Header */}
            <Hero
                breadcrumbItems={breadcrumbs}
            >
                <Title title={displayTitle} />
            </Hero>

            {/* Content */}
            <ContentLayout>

                {children}
            </ContentLayout>
        </Layout >
    )
}