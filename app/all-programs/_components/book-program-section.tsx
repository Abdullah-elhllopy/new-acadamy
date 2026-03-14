// components/sections/book-program-section.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'

export function BookProgramSection() {
    const { language, isRTL } = useLanguage()
    const isArabic = language === 'ar'

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-16  bg-hero-bg"
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>

                    <h2 className={cn(
                        "text-3xl md:text-4xl font-bold text-white mb-4 font-sans",
                    )}>
                        {isArabic ? 'احجز برنامجك الخاص' : 'Book Your Custom Program'}
                    </h2>

                    <p className="text-lg text-white/80 mb-8 leading-relaxed">
                        {isArabic
                            ? 'هل تريد برنامج تدريبي مخصص لشركتك؟ نحن هنا لمساعدتك في تصميم وتنفيذ برامج تدريبية تلبي احتياجات مؤسستك'
                            : 'Want a custom training program for your company? We are here to help you design and implement training programs that meet your organization\'s needs'}
                    </p>

                    <Button
                        asChild
                        size="lg"
                        className="rounded-full px-8 py-6 text-lg bg-white text-primary hover:bg-white/90 font-medium"
                    >
                        <Link href="/contact">
                            {isArabic ? 'اتصل بنا' : 'Contact Us'}
                            <ArrowLeft className={cn(
                                "w-5 h-5",
                                'arrow-left',
                            )} />
                        </Link>
                    </Button>
                </div>
            </div>
        </motion.section>
    )
}