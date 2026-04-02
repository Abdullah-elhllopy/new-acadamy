import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const SimpleLoader = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-12">
                <Skeleton className="h-8 w-64 mb-8" />
                <Skeleton className="h-96 w-full mb-8" />
                <Skeleton className="h-12 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    )
}

export default SimpleLoader