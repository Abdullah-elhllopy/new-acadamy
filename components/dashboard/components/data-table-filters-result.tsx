// ============================================================================
// data-table-filters-result.tsx - Filter Results Component
// ============================================================================

'use client'

import { useCallback } from 'react'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { UseSetStateReturn } from './types'


// ============================================================================
// Types
// ============================================================================

export interface FilterResultConfig<TFilters> {
    key: keyof TFilters
    label: string
    formatValue?: (value: any) => string
    resetValue?: any
}

interface DataTableFiltersResultProps<TFilters> {
    filters: UseSetStateReturn<TFilters>
    totalResults: number
    onResetPage: () => void
    configs: FilterResultConfig<TFilters>[]
    className?: string
}

// ============================================================================
// Component
// ============================================================================

export function DataTableFiltersResult<TFilters>({
    filters,
    totalResults,
    onResetPage,
    configs,
    className,
}: DataTableFiltersResultProps<TFilters>) {
    const { state, setState } = filters

    // Check if any filter is active
    const hasActiveFilters = configs.some(config => {
        const value = state[config.key]
        if (value === undefined || value === null) return false
        if (Array.isArray(value)) return value.length > 0
        if (typeof value === 'string') return value !== '' && value !== 'all'
        return true
    })

    if (!hasActiveFilters) return null

    // Handle individual filter removal
    const handleRemove = useCallback((config: FilterResultConfig<TFilters>) => {
        onResetPage()
        setState({
            ...state,
            [config.key]: config.resetValue !== undefined
                ? config.resetValue
                : Array.isArray(state[config.key]) ? [] : ''
        } as TFilters)
    }, [onResetPage, setState, state])

    // Handle reset all
    const handleResetAll = useCallback(() => {
        onResetPage()
        const resetState: any = {}
        configs.forEach(config => {
            resetState[config.key] = config.resetValue !== undefined
                ? config.resetValue
                : Array.isArray(state[config.key]) ? [] : ''
        })
        setState({ ...state, ...resetState } as TFilters)
    }, [onResetPage, setState, configs, state])

    return (
        <div className={cn("flex flex-wrap items-center gap-2 p-4 bg-muted/30 border-t", className)}>
            <span className="text-sm text-muted-foreground mr-2">
                <span className="font-medium text-foreground">{totalResults}</span> results found
            </span>

            <div className="flex flex-wrap items-center gap-2 flex-1">
                {configs.map((config) => {
                    const value = state[config.key]

                    // Skip if no value
                    if (value === undefined || value === null) return null
                    if (Array.isArray(value) && value.length === 0) return null
                    if (typeof value === 'string' && (value === '' || value === 'all')) return null

                    // Format display value
                    const displayValue = config.formatValue
                        ? config.formatValue(value)
                        : Array.isArray(value)
                            ? `${value.length} selected`
                            : String(value)

                    return (
                        <Badge
                            key={String(config.key)}
                            variant="secondary"
                            className="gap-1 px-2 py-1 text-xs"
                        >
                            <span className="text-muted-foreground">{config.label}:</span>
                            <span className="font-medium truncate max-w-37.5">{displayValue}</span>
                            <button
                                onClick={() => handleRemove(config)}
                                className="ml-1 hover:bg-muted rounded-full p-0.5 transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )
                })}
            </div>

            <Button
                variant="ghost"
                size="sm"
                onClick={handleResetAll}
                className="h-7 text-xs"
            >
                Reset all
            </Button>
        </div>
    )
}