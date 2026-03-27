// components/sections/book-program-section.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { useTranslate } from '@/locales/use-locales'

export function BookProgramSection() {
    const { language } = useLanguage()
    const { t } = useTranslate('programs')

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-hero-bg text-white rounded-2xl p-12 text-center mt-12"
        >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl font-bold mb-4">
                {t('bookCustomProgram')}
            </h2>
            <p className="text-lg mb-6 opacity-90">
                {t('customProgramDescription')}
            </p>
            <Button asChild className="bg-white text-hero-bg hover:bg-hero-hover rounded-full px-8 py-6 text-lg">
                <Link href="/contact">
                    {t('contactUs')}
                </Link>
            </Button>
        </motion.section>
    )
}
