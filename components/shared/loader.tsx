import React from 'react'

const Loader = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={`loader-${i}`} className="h-96 bg-muted animate-pulse rounded-xl" />
            ))}
        </div>
    )
}

export default Loader 