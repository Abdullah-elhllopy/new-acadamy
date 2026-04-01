import React from 'react'

const Loader = ({ number }: { number?: number }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(number || 6)].map((_, i) => (
                <div key={`loader-${i}`} className="h-52 bg-muted animate-pulse rounded-xl" />
            ))}
        </div>
    )
}

export default Loader 