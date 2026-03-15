// components/gallery/lightbox.tsx
'use client'

import { useEffect, useCallback } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Captions, Zoom, Thumbnails, Fullscreen } from 'yet-another-react-lightbox/plugins'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import { GalleryImage } from '@/types/gallery'
import { useLanguage } from '@/shared/hooks/useLanguage'


interface GalleryLightboxProps {
    images: GalleryImage[]
    index: number
    isOpen: boolean
    onClose: () => void
}

export function GalleryLightbox({ images, index, isOpen, onClose }: GalleryLightboxProps) {
    const { isRTL } = useLanguage()

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown)
            return () => window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    const slides = images.map(img => ({
        src: img.src,
        alt: img.alt,
        title: img.caption,
        width: img.width || 1200,
        height: img.height || 800
    }))

    return (
        <Lightbox
            open={isOpen}
            close={onClose}
            slides={slides}
            index={index}
            plugins={[Captions, Zoom, Thumbnails, Fullscreen]}
            captions={{
                showToggle: true,
                descriptionTextAlign: isRTL ? 'end' : 'start',
                descriptionMaxLines: 3
            }}
            zoom={{
                maxZoomPixelRatio: 3,
                zoomInMultiplier: 2
            }}
            thumbnails={{
                position: 'bottom',
                width: 120,
                height: 80,
                gap: 16,
                border: 2,
                borderRadius: 8,
                padding: 4
            }}
            animation={{
                fade: 300,
                swipe: 300,
                zoom: 300
            }}
            carousel={{
                finite: false,
                preload: 3
            }}
            render={{
                buttonPrev: images.length <= 1 ? () => null : undefined,
                buttonNext: images.length <= 1 ? () => null : undefined
            }}
            styles={{
                container: { backgroundColor: 'rgba(0, 22, 69, 0.95)' },
                // captionsContainer: { backgroundColor: 'rgba(255, 255, 255, 0.95)' },
                captionsTitle: { color: '#001645', fontWeight: 600 }
            }}
        />
    )
}