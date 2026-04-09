// components/shared/loader/list-page-loader.tsx
'use client';

import { motion } from 'framer-motion';

export interface ListPageLoaderProps {
    /** Number of skeleton items to show (default: 6) */
    itemCount?: number;
    /** Grid columns: 2, 3, or 4 (default: 3) */
    columns?: 2 | 3 | 4;
    /** Whether to show header section (default: true) */
    showHeader?: boolean;
    /** Whether to show filter/search bar (default: true) */
    showFilters?: boolean;
    /** Whether to show pagination (default: true) */
    showPagination?: boolean;
    /** Card aspect ratio: 'video' (16/10), 'square' (1/1), or 'portrait' (3/4) */
    cardAspect?: 'video' | 'square' | 'portrait';
    /** Additional CSS classes */
    className?: string;
}

export function ListPageLoader({
    itemCount = 6,
    columns = 3,
    showHeader = true,
    showFilters = true,
    showPagination = true,
    cardAspect = 'video',
    className = ''
}: ListPageLoaderProps) {
    const aspectClasses = {
        video: 'aspect-[16/10]',
        square: 'aspect-square',
        portrait: 'aspect-[3/4]'
    };

    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    };

    return (
        <div className={`min-h-screen bg-linear-to-b from-background via-background to-muted/30 ${className}`}>
            {/* Header Section */}
            {showHeader && (
                <div className="bg-linear-to-br from-primary/5 via-primary/3 to-transparent border-b border-primary/10 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-12 sm:py-16 md:py-20">
                    <div className="max-w-4xl">
                        {/* Breadcrumb */}
                        <motion.div
                            className="h-4 w-32 bg-linear-to-r from-muted-foreground/40 to-muted-foreground/10 rounded-full mb-4"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Title */}
                        <motion.div
                            className="h-10 sm:h-12 md:h-14 w-64 sm:w-80 bg-linear-to-r from-muted-foreground/50 via-muted-foreground/30 to-muted-foreground/10 rounded-xl mb-4"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                        />

                        {/* Description */}
                        <motion.div
                            className="h-5 sm:h-6 w-full max-w-xl bg-linear-to-r from-muted-foreground/30 to-muted-foreground/5 rounded-lg"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        />
                    </div>
                </div>
            )}

            {/* Content Section */}
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-10 sm:py-16">
                {/* Filter Bar */}
                {showFilters && (
                    <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12">
                        <motion.div
                            className="h-12 flex-1 max-w-md bg-linear-to-r from-muted/60 to-muted/30 rounded-xl border border-muted-foreground/10"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                        />
                        <div className="flex gap-3">
                            <motion.div
                                className="h-12 w-full sm:w-40 bg-linear-to-r from-muted/60 to-muted/30 rounded-xl border border-muted-foreground/10"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                            />
                            <motion.div
                                className="h-12 w-12 bg-linear-to-r from-primary/30 to-primary/10 rounded-xl hidden sm:block border border-primary/20"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
                            />
                        </div>
                    </div>
                )}

                {/* Grid */}
                <div className={`grid ${gridCols[columns]} gap-6 sm:gap-8`}>
                    {Array.from({ length: itemCount }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="bg-linear-to-br from-card to-card/80 rounded-2xl border border-primary/20 overflow-hidden shadow-lg"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.1 * i
                            }}
                        >
                            {/* Image Area */}
                            <div className={`${aspectClasses[cardAspect]} bg-linear-to-br from-muted/60 to-muted/30 relative overflow-hidden`}>
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-linear-to-r from-muted via-muted-foreground/10 to-muted bg-size-[200%_100%]"
                                    style={{
                                        backgroundPosition: '200% 0',
                                        animation: 'shimmer 2s infinite',
                                    }}
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5" />
                                
                                {/* Badge placeholder */}
                                <div className="absolute top-3 right-3">
                                    <motion.div
                                        className="h-6 w-20 bg-linear-to-r from-primary/40 to-primary/20 rounded-full border border-primary/30"
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 + (i * 0.1) }}
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-4">
                                {/* Title */}
                                <motion.div
                                    className="h-6 w-3/4 bg-linear-to-r from-muted-foreground/40 to-muted-foreground/10 rounded-lg"
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 + (i * 0.1) }}
                                />

                                {/* Meta row */}
                                <div className="flex gap-2">
                                    <motion.div
                                        className="h-5 px-2 bg-linear-to-r from-primary/20 to-primary/5 rounded-full border border-primary/20"
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 + (i * 0.1) }}
                                    />
                                    <motion.div
                                        className="h-5 px-2 bg-linear-to-r from-primary/20 to-primary/5 rounded-full border border-primary/20"
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.45 + (i * 0.1) }}
                                    />
                                </div>

                                {/* Description lines */}
                                <div className="space-y-2">
                                    <motion.div
                                        className="h-4 w-full bg-linear-to-r from-muted-foreground/30 to-muted-foreground/5 rounded"
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 + (i * 0.1) }}
                                    />
                                    <motion.div
                                        className="h-4 w-2/3 bg-linear-to-r from-muted-foreground/20 to-muted-foreground/5 rounded"
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.55 + (i * 0.1) }}
                                    />
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-3 border-t border-primary/10">
                                    <motion.div
                                        className="h-5 w-24 bg-linear-to-r from-muted-foreground/30 to-muted-foreground/5 rounded"
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 + (i * 0.1) }}
                                    />
                                    <motion.div
                                        className="h-9 w-28 bg-linear-to-r from-primary/30 to-primary/10 rounded-lg border border-primary/20"
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.65 + (i * 0.1) }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                {showPagination && (
                    <div className="flex justify-center mt-12 gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="h-10 w-10 rounded-full bg-linear-to-r from-muted/60 to-muted/30 border border-muted-foreground/10"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.7 + (i * 0.1)
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Shimmer animation keyframes */}
            <style>{`
                @keyframes shimmer {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }
            `}</style>
        </div>
    );
}
