// hooks/use-gallery.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { ImageGroup, ImageGroupDetail, GalleryImage } from '@/types/gallery'
import { DUMMY_IMAGE_GROUPS, DUMMY_GROUP_DETAILS } from '@/data/gallery-data'

interface UseGalleryReturn {
    groups: ImageGroup[]
    loading: boolean
    error: Error | null
    refresh: () => void
}

const simulateDelay = (ms: number = 400) =>
    new Promise(resolve => setTimeout(resolve, ms))

export function useGallery(): UseGalleryReturn {
    const [groups, setGroups] = useState<ImageGroup[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchGroups = useCallback(async () => {
        setLoading(true)
        try {
            await simulateDelay(500)
            setGroups(DUMMY_IMAGE_GROUPS.filter(g => g.imageCount > 0))
            setError(null)
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchGroups()
    }, [fetchGroups])

    return {
        groups,
        loading,
        error,
        refresh: fetchGroups
    }
}

interface UseGalleryDetailReturn {
    group: ImageGroupDetail | null
    loading: boolean
    error: Error | null
    lightboxIndex: number
    isLightboxOpen: boolean
    openLightbox: (index: number) => void
    closeLightbox: () => void
    goToNext: () => void
    goToPrev: () => void
}

export function useGalleryDetail(groupId: string): UseGalleryDetailReturn {
    const [group, setGroup] = useState<ImageGroupDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [lightboxIndex, setLightboxIndex] = useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    const fetchGroup = useCallback(async () => {
        setLoading(true)
        try {
            await simulateDelay(600)
            const data = DUMMY_GROUP_DETAILS[groupId]
            if (!data) {
                throw new Error('Group not found')
            }
            setGroup(data)
            setError(null)
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false)
        }
    }, [groupId])

    useEffect(() => {
        fetchGroup()
    }, [fetchGroup])

    const openLightbox = useCallback((index: number) => {
        setLightboxIndex(index)
        setIsLightboxOpen(true)
        document.body.style.overflow = 'hidden'
    }, [])

    const closeLightbox = useCallback(() => {
        setIsLightboxOpen(false)
        document.body.style.overflow = ''
    }, [])

    const goToNext = useCallback(() => {
        if (!group) return
        setLightboxIndex(prev => (prev + 1) % group.images.length)
    }, [group])

    const goToPrev = useCallback(() => {
        if (!group) return
        setLightboxIndex(prev => (prev - 1 + group.images.length) % group.images.length)
    }, [group])

    return {
        group,
        loading,
        error,
        lightboxIndex,
        isLightboxOpen,
        openLightbox,
        closeLightbox,
        goToNext,
        goToPrev
    }
}