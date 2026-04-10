// components/search/global-search.tsx
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { useTranslate } from '@/locales/use-locales'
import { useCoursesFilterByName } from '@/hooks/api/use-courses'
import Link from 'next/link'
import { debounce } from 'lodash'

export function GlobalSearch() {
    const [query, setQuery] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('')
    const [showResults, setShowResults] = useState(false)
    const router = useRouter()
    const { isRTL } = useLanguage()
    const { t } = useTranslate('programs')
    const searchRef = useRef<HTMLDivElement>(null)

    const { data: courses = [], isError , isFetching } = useCoursesFilterByName(debouncedQuery)

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setDebouncedQuery(value)
        }, 500),
        []
    )

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            debouncedSearch.cancel()
        }
    }, [debouncedSearch])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        setShowResults(value.length > 0)
        debouncedSearch(value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/courses?search=${encodeURIComponent(query)}`)
            setShowResults(false)
        }
    }

    const handleCourseClick = () => {
        setShowResults(false)
        setQuery('')
        setDebouncedQuery('')
    }

    return (
        <div className="relative w-full" ref={searchRef}>
            <form onSubmit={handleSubmit} className="relative">
                <Input
                    type="search"
                    placeholder={t('searchCourseGlobal')}
                    value={query}
                    onChange={handleChange}
                    className={cn(
                        "h-14 w-full md:w-96 bg-white border-0 shadow-lg rounded-full text-base",
                        "focus-visible:ring-2 focus-visible:ring-primary",
                        isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                    )}
                />
                <Search className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none",
                    isRTL ? "right-4" : "left-4"
                )} />
            </form>

            {showResults && (
                <div
                    className={cn(
                        "absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border",
                        "max-h-100 overflow-y-auto",
                        "w-full md:w-96"
                    )}
                    style={{ zIndex: 9999 }}
                >
                    {isFetching || !debouncedQuery ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            جارى تحميل البيانات...
                        </div>
                    ) : courses.length > 0 ? (
                        <div className="divide-y">
                            {courses.map((course) => (
                                <Link
                                    key={course.courseId}
                                    href={`/courses/${course.courseId}`}
                                    onClick={handleCourseClick}
                                    className="block px-4 py-3 hover:bg-muted/50 transition-colors group"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="font-medium text-sm line-clamp-1 flex-1">
                                            {course.courseName}
                                        </p>
                                        <ArrowRight className={cn(
                                            "w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0",
                                            isRTL && "rotate-180"
                                        )} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : <div className="p-4 text-center text-sm text-destructive">
                        عفوا لا توجد دورة بهذا الاسم
                    </div>

                    }

                    {/* {!isLoading && isError  && (
                        <div className="p-4 text-center text-sm text-destructive">
                            عفوا لا توجد دورة بهذا الاسم
                        </div>
                    )} */}
                </div>
            )}
        </div>
    )
}
