// components/gallery/gallery-grid.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { GalleryImage } from '@/types/gallery'
import { cn } from '@/lib/utils'


interface GalleryGridProps {
    images: GalleryImage[]
    onImageClick: (index: number) => void
}

export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {images.map((image, index) => (
                <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="relative aspect-4/3 overflow-hidden rounded-xl cursor-pointer group bg-muted"
                    onClick={() => onImageClick(index)}
                >
                    <Image
                        src={'/placeholder.jpg'} // Placeholder image, replace with actual image URL
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />

                    {/* Caption (if exists) */}
                    {image.caption && (
                        <div className={cn(
                            "absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300",
                            // isRTL ? "text-right" : "text-left"
                        )}>
                            <p className="text-white text-sm line-clamp-2">{image.caption}</p>
                        </div>
                    )}

                    {/* Click Indicator */}
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}