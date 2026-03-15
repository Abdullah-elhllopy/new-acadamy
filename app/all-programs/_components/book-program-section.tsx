// components/sections/book-program-section.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'

export function BookProgramSection() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

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
                {isArabic ? 'احجز برنامجك الخاص' : 'Book Your Custom Program'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
                {isArabic
                    ? 'هل تريد برنامج تدريبي مخصص لشركتك؟ نحن هنا لمساعدتك'
                    : 'Want a custom training program for your company? We are here to help'}
            </p>
            <Button asChild className="bg-white text-hero-bg hover:bg-hero-hover rounded-full px-8 py-6 text-lg">
                <Link href="/contact">
                    {isArabic ? 'اتصل بنا' : 'Contact Us'}
                </Link>
            </Button>
            {/* </div> */}
        </motion.section>
    )
}