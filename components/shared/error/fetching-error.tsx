// components/shared/fetching-error.tsx
'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export interface FetchingErrorProps {
    /** Error object from API call */
    error?: any;
    /** Function to retry the fetch */
    refetch?: () => void;
    /** Custom title text */
    title?: string;
    /** Custom description text */
    description?: string;
    /** Show home button (default: true) */
    showHomeButton?: boolean;
    /** Additional CSS classes */
    className?: string;
}

export function FetchingError({
    error,
    refetch,
    title = 'حدث خطأ في التحميل',
    description = 'لا يمكن تحميل البيانات في الوقت الحالي، يرجى المحاولة مرة أخرى',
    showHomeButton = true,
    className = ''
}: FetchingErrorProps) {
    const errorMessage = error?.data?.message || error?.message || 'An unknown error occurred';

    return (
        <div className={`min-h-100 flex items-center justify-center px-4 sm:px-6 ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full text-center"
            >
                {/* Error Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="relative inline-flex items-center justify-center mb-6"
                >
                    <div className="absolute inset-0 bg-destructive/10 rounded-full blur-xl" />
                    <div className="relative w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                        <AlertTriangle className="w-10 h-10 text-destructive" strokeWidth={1.5} />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-3xl font-bold text-foreground mb-3"
                    style={{ fontFamily: 'Almarai-Bold, sans-serif' }}
                >
                    {title}
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-muted-foreground text-base sm:text-lg mb-2 leading-relaxed"
                >
                    {description}
                </motion.p>

                {/* Error Message (if available) */}
                {errorMessage && errorMessage !== 'An unknown error occurred' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                        className="mb-8 p-3 bg-muted rounded-lg border border-border"
                    >
                        <p className="text-sm text-muted-foreground font-mono break-all">
                            {errorMessage}
                        </p>
                    </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center items-center"
                >
                    {refetch && (
                        <button
                            onClick={refetch}
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium transition-base hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                        >
                            <RefreshCw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
                            إعادة المحاولة
                        </button>
                    )}

                    {showHomeButton && (
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl font-medium transition-base hover:bg-muted-hover hover:shadow-md border border-border w-full sm:w-auto justify-center"
                        >
                            <Home className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                            العودة للرئيسية
                        </Link>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}

// Default export for compatibility
export default FetchingError;