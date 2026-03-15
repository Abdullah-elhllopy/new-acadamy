// components/gallery/gallery-skeleton.tsx
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface GallerySkeletonProps {
    count?: number
    variant?: 'grid' | 'groups'
}

export function GallerySkeleton({ count = 6, variant = 'groups' }: GallerySkeletonProps) {
    if (variant === 'groups') {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: count }).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-52 w-full" />
                        <CardContent className="p-5">
                            <Skeleton className="h-6 w-3/4" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <Skeleton key={i} className="aspect-4/3 rounded-xl" />
            ))}
        </div>
    )
}