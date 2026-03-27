// components/search/global-search.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { useTranslate } from '@/locales/use-locales'

export function GlobalSearch() {
    const [query, setQuery] = useState('')
    const router = useRouter()
    const { isRTL } = useLanguage()
    const { t } = useTranslate('programs')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/courses?search=${encodeURIComponent(query)}`)
        }
    }

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="relative">
                <Input
                    type="search"
                    placeholder={t('searchCourseGlobal')}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={cn(
                        "h-14 w-full md:w-96 bg-white border-0 shadow-lg rounded-full text-base",
                        "focus-visible:ring-2 focus-visible:ring-primary",
                        isRTL ? "pr-12 pl-4 " : "pl-12 pr-4"
                    )}
                />
                <Search className="absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground right-4 left-4" />
            </form>
        </div>
    )
}
