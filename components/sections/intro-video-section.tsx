// components/sections/intro-video-section.tsx
'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Play, X } from 'lucide-react'
import { motion } from 'framer-motion'

export function IntroVideoSection() {
    const { isArabic } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <section className="py-20 md:py-24 bg-muted">
            <div className="container mx-auto px-4 md:px-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            {isArabic ? 'تعرف على أكاديميتنا' : 'Discover Our Academy'}
                        </h2>
                        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
                            {isArabic
                                ? 'شاهد الفيديو التعريفي للتعرف على رحلتنا وبرامجنا التدريبية المتميزة'
                                : 'Watch our introductory video to learn about our journey and distinguished training programs'}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        {/* Thumbnail Background */}
                        <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 bg-muted">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-full bg-[url('/placeholder.jpg')] bg-cover bg-center opacity-50" />
                            </div>
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                        {/* Play Button */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="relative">
                                {/* Pulse Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-white/30 rounded-full"
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                    <Play className="w-8 h-8 md:w-10 md:h-10 text-primary ml-1" fill="currentColor" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Video Label */}
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                            <span className="inline-block px-4 py-2 bg-black/60 text-white text-sm rounded-full backdrop-blur-sm">
                                {isArabic ? 'شاهد الفيديو التعريفي' : 'Watch Intro Video'}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Video Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-4xl p-0 bg-black border-none overflow-hidden">
                    <DialogTitle className="sr-only">
                        {isArabic ? 'الفيديو التعريفي' : 'Introductory Video'}
                    </DialogTitle>
                    <div className="relative aspect-video">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        {isOpen && (
                            <iframe
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                title={isArabic ? 'الفيديو التعريفي' : 'Introductory Video'}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}