// components/shared/whatsapp-button.tsx
'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { PhoneCall , } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP_NUMBER = '+201234567890' // Replace with actual academy number
const WHATSAPP_MESSAGE = {
    ar: 'مرحباً، أود الاستفسار عن برامجكم التدريبية',
    en: 'Hello, I would like to inquire about your training programs',
}

export function WhatsAppButton() {
    const { isArabic } = useLanguage()
    const [isVisible, setIsVisible] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling 100px
            setIsVisible(window.scrollY > 100)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check initial position
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        // Show tooltip after 2 seconds when button becomes visible
        if (isVisible) {
            const timer = setTimeout(() => setShowTooltip(true), 2000)
            const hideTimer = setTimeout(() => setShowTooltip(false), 6000)
            return () => {
                clearTimeout(timer)
                clearTimeout(hideTimer)
            }
        }
    }, [isVisible])

    const handleClick = () => {
        const message = encodeURIComponent(isArabic ? WHATSAPP_MESSAGE.ar : WHATSAPP_MESSAGE.en)
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0, x: isArabic ? -20 : 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0, x: isArabic ? -20 : 20 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className={`fixed bottom-6 z-50  ${!isArabic ? 'left-6' : 'right-6'}`}
                >
                    <div className="relative">
                        {/* Tooltip */}
                        <AnimatePresence>
                            {showTooltip && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    className={`absolute bottom-full mb-3  w-48 bg-white text-foreground text-sm p-3 rounded-lg shadow-lg border border-border`}
                                >
                                    <div className="relative">
                                        {isArabic ? 'تواصل معنا عبر واتساب' : 'Contact us on WhatsApp'}
                                        <div
                                            className={`absolute -bottom-5  w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white`}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Button */}
                        <motion.button
                            onClick={handleClick}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg hover:shadow-xl transition-colors flex items-center justify-center"
                            aria-label={isArabic ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
                        >
                            <PhoneCall className="w-7 h-7" fill="currentColor" />
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}