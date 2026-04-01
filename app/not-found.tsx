// app/not-found.tsx
'use client';

import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, FileX } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-secondary blur-3xl"
      />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* 404 Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl" />
            <div className="relative w-32 h-32 rounded-2xl bg-muted flex items-center justify-center border border-border">
              <FileX className="w-16 h-16 text-muted-foreground" strokeWidth={1.5} />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-lg"
            >
              <span className="text-secondary-foreground font-bold text-lg">404</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight"
          style={{ fontFamily: 'Almarai-Bold, sans-serif' }}
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed"
        >
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          Please check the URL or navigate back to continue your learning journey.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium transition-base hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            Back to Home
          </Link>

          <button
            onClick={() => router.back()}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl font-medium transition-base hover:bg-muted-hover hover:shadow-md hover:-translate-y-0.5 border border-border w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Looking for something specific?
          </p>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-base hover:underline"
          >
            <Search className="w-4 h-4" />
            Browse our programs
          </Link>
        </motion.div>
      </div>
    </div>
  );
}