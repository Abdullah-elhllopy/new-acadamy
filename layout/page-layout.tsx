'use client'

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ContentLayout({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <motion.main
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }} className={cn("py-12  container mx-auto px-4 md:px-6 lg:px-8 xl:px-20 relative", className)}>
            {children}
        </motion.main>
    )
}
export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background" >
            {
                children
            }
        </div >
    )
}