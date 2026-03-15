// components/gallery/image-group-card.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ImageGroup } from '@/types/gallery'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'

interface ImageGroupCardProps {
    group: ImageGroup
    index: number
}

export function ImageGroupCard({ group, index }: ImageGroupCardProps) {
    const { language, isRTL } = useLanguage()
    const isArabic = language === 'ar'
    const title = isArabic ? group.nameAr : group.name

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Link href={`/images-center/${group.id}`}>
                <Card className="group overflow-hidden border-border-light pt-0 hover:shadow-card-hover transition-all duration-300 cursor-pointer h-full">
                    {/* Cover Image */}
                    <div className="relative h-52 overflow-hidden bg-muted">
                        <Image
                            src={'/placeholder.jpg'} // Placeholder image, replace with actual cover image if available
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                        {/* Image Count Badge */}
                        <div className={cn(
                            "absolute bottom-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-primary text-sm font-medium",
                            isRTL ? "right-3" : "left-3"
                        )}>
                            <ImageIcon className="w-4 h-4" />
                            <span>
                                {group.imageCount} {isArabic ? 'صورة' : 'images'}
                            </span>
                        </div>
                    </div>

                    <CardContent className="p-5">
                        <h3 className={cn(
                            "font-bold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors",
                            // isArabic && "text-right font-sans"
                        )}>
                            {title}
                        </h3>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    )
}