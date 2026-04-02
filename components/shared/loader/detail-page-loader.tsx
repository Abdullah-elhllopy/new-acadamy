// components/shared/loader/detail-page-loader.tsx
'use client';

import { motion } from 'framer-motion';

export interface DetailPageLoaderProps {
    /** Hero layout: 'image-right' (default), 'image-left', 'image-top', 'avatar' */
    heroLayout?: 'image-right' | 'image-left' | 'image-top' | 'avatar';
    /** Whether to show sidebar (default: true) */
    hasSidebar?: boolean;
    /** Sidebar position: 'right' (default) or 'left' */
    sidebarPosition?: 'right' | 'left';
    /** Number of content sections (default: 3) */
    contentSections?: number;
    /** Whether hero has background color (default: true) */
    heroWithBg?: boolean;
    /** Additional CSS classes */
    className?: string;
}

export function DetailPageLoader({
    heroLayout = 'image-right',
    hasSidebar = true,
    sidebarPosition = 'right',
    contentSections = 3,
    heroWithBg = true,
    className = ''
}: DetailPageLoaderProps) {
    const isAvatar = heroLayout === 'avatar';
    const isImageTop = heroLayout === 'image-top';

    const heroGridClasses = {
        'image-right': 'grid-cols-1 lg:grid-cols-2',
        'image-left': 'grid-cols-1 lg:grid-cols-2',
        'image-top': 'grid-cols-1',
        'avatar': 'grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]'
    };

    const imageOrderClasses = {
        'image-right': 'order-2 lg:order-1',
        'image-left': 'order-2 lg:order-2',
        'image-top': 'order-1',
        'avatar': 'order-2 lg:order-1'
    };

    const contentOrderClasses = {
        'image-right': 'order-1 lg:order-2',
        'image-left': 'order-1 lg:order-1',
        'image-top': 'order-2',
        'avatar': 'order-1 lg:order-2'
    };

    const sidebarOrderClass = sidebarPosition === 'left' ? 'order-1' : 'order-2';

    return (
        <div className={`min-h-screen bg-gradient-to-b from-background via-background to-muted/30 ${className}`}>
            {/* Hero Section */}
            <div className={`${heroWithBg ? 'bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border-b border-primary/10' : ''} px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-8 sm:py-12 md:py-16`}>
                <div className={`grid ${heroGridClasses[heroLayout]} gap-6 lg:gap-12 items-center`}>
                    {/* Visual Element */}
                    <div className={imageOrderClasses[heroLayout]}>
                        <motion.div
                            className={`w-full relative overflow-hidden ${isAvatar
                                    ? 'aspect-square max-w-70 xl:max-w-[320px] mx-auto lg:mx-0 rounded-3xl'
                                    : isImageTop
                                        ? 'aspect-21/9 rounded-3xl'
                                        : 'aspect-video rounded-3xl'
                                }`}
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Shimmer background */}
                            <div className="absolute inset-0 bg-linear-to-r from-muted via-muted-foreground/10 to-muted bg-[length:200%_100%]"
                                style={{
                                    backgroundPosition: '200% 0',
                                    animation: 'shimmer 2s infinite',
                                }}
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-primary/10" />
                        </motion.div>
                    </div>

                    {/* Info Content */}
                    <div className={`${contentOrderClasses[heroLayout]} flex flex-col justify-center`}>
                        {/* Breadcrumb */}
                        <motion.div
                            className="h-4 w-40 bg-linear-to-r from-muted-foreground/40 to-muted-foreground/10 rounded-full mb-4"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Title */}
                        <motion.h1
                            className={`${isAvatar ? 'h-12 sm:h-14' : 'h-10 sm:h-12 md:h-14'} w-full max-w-lg bg-gradient-to-r from-muted-foreground/50 via-muted-foreground/30 to-muted-foreground/10 rounded-xl mb-4`}
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                            style={{ backgroundSize: '200% 100%' }}
                        />

                        {/* Subtitle */}
                        <motion.div
                            className="h-6 w-48 bg-linear-to-r from-muted-foreground/30 to-muted-foreground/5 rounded-lg mb-6"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        />

                        {/* Meta Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="h-8 px-3 bg-linear-to-r from-primary/20 to-primary/5 rounded-full border border-primary/20"
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 + (i * 0.1) }}
                                />
                            ))}
                        </div>

                        {/* Action Button */}
                        <motion.div
                            className="h-14 w-full sm:w-64 bg-linear-to-r from-primary/40 to-primary/20 rounded-xl border border-primary/30"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-10 sm:py-16">
                <div className={`grid grid-cols-1 ${hasSidebar ? 'lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]' : ''} gap-8 lg:gap-12`}>

                    {/* Main Content Area */}
                    <div className={`${hasSidebar ? 'order-2' : ''} ${sidebarPosition === 'left' ? 'lg:order-2' : ''} space-y-10`}>
                        {Array.from({ length: contentSections }).map((_, sectionIndex) => (
                            <section key={sectionIndex}>
                                <motion.div
                                    className="h-8 w-48 bg-linear-to-r from-muted-foreground/40 to-muted-foreground/10 rounded-lg mb-6"
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 + (sectionIndex * 0.1) }}
                                />

                                {/* Content variation based on section index */}
                                {sectionIndex === 0 ? (
                                    // Text paragraphs
                                    <div className="space-y-3">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="h-5 bg-linear-to-r from-muted-foreground/30 to-muted-foreground/5 rounded-lg"
                                                style={{ width: i === 3 ? '60%' : '100%' }}
                                                animate={{ opacity: [0.6, 1, 0.6] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 + (i * 0.05) }}
                                            />
                                        ))}
                                    </div>
                                ) : sectionIndex === 1 ? (
                                    // List items
                                    <div className="space-y-3">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="flex items-center gap-3 p-4 bg-linear-to-r from-muted/60 to-muted/30 rounded-xl border border-muted-foreground/10"
                                                animate={{ opacity: [0.6, 1, 0.6] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.7 + (i * 0.05) }}
                                            >
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 shrink-0" />
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-5 w-3/4 bg-gradient-to-r from-muted-foreground/30 to-muted-foreground/5 rounded" />
                                                    <div className="h-4 w-1/2 bg-gradient-to-r from-muted-foreground/20 to-muted-foreground/5 rounded" />
                                                </div>
                                                <div className="h-8 w-20 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg" />
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    // Grid or cards
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="p-4 bg-linear-to-br from-muted/50 to-muted/20 rounded-xl border border-muted-foreground/10 space-y-3"
                                                animate={{ opacity: [0.6, 1, 0.6] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 + (i * 0.05) }}
                                            >
                                                <div className="h-6 w-12 bg-linear-to-r from-primary/30 to-primary/10 rounded" />
                                                <div className="h-4 w-full bg-linear-to-r from-muted-foreground/30 to-muted-foreground/5 rounded" />
                                                <div className="h-4 w-2/3 bg-linear-to-r from-muted-foreground/20 to-muted-foreground/5 rounded" />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        ))}
                    </div>

                    {/* Sidebar */}
                    {hasSidebar && (
                        <div className={`${sidebarOrderClass} lg:sticky lg:top-24 h-fit space-y-6`}>
                            {/* Primary Card */}
                            <motion.div
                                className="bg-linear-to-br from-card to-card/80 border border-primary/20 rounded-2xl p-6 shadow-lg"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            >
                                <div className="space-y-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div className="h-5 w-24 bg-linear-to-r from-muted-foreground/30 to-muted-foreground/5 rounded" />
                                            <div className="h-5 w-32 bg-linear-to-r from-muted-foreground/20 to-muted-foreground/5 rounded" />
                                        </div>
                                    ))}
                                    <div className="h-12 w-full bg-linear-to-r from-primary/30 to-primary/10 rounded-xl mt-6 border border-primary/20" />
                                </div>
                            </motion.div>

                            {/* Secondary Card */}
                            <motion.div
                                className="bg-gradient-to-br from-muted/60 to-muted/30 rounded-2xl p-6 border border-muted-foreground/10"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                            >
                                <div className="h-6 w-32 bg-linear-to-r from-muted-foreground/40 to-muted-foreground/10 rounded mb-4" />
                                <div className="space-y-3">
                                    <div className="h-4 w-full bg-linear-to-r from-muted-foreground/30 to-muted-foreground/5 rounded" />
                                    <div className="h-4 w-3/4 bg-linear-to-r from-muted-foreground/20 to-muted-foreground/5 rounded" />
                                </div>
                                <div className="h-10 w-full bg-linear-to-r from-primary/20 to-primary/5 rounded-lg mt-4 border border-primary/20" />
                            </motion.div>

                            {/* Tertiary Card - Links/Share */}
                            <motion.div
                                className="bg-linear-to-br from-card to-card/80 border border-primary/20 rounded-2xl p-6 shadow-lg"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                            >
                                <div className="h-5 w-24 bg-linear-to-r from-muted-foreground/30 to-muted-foreground/5 rounded mb-4" />
                                <div className="flex gap-3">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="h-10 w-10 rounded-full bg-linear-to-br from-primary/30 to-primary/10 border border-primary/20" />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
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
