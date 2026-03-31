// ============================================================================
// data-table-toolbar.tsx - Dynamic Toolbar Component
// ============================================================================

'use client'

import { useCallback } from 'react'
import { Search, X, Filter, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import type { DataTableToolbarProps, FilterConfig } from './types'

// ============================================================================
// Filter Chip Component
// ============================================================================

interface FilterChipProps {
    label: string
    value: string
    onRemove: () => void
}

function FilterChip({ label, value, onRemove }: FilterChipProps) {
    return (
        <Badge variant="secondary" className="gap-1 px-2 py-1">
            <span className="text-muted-foreground">{label}:</span>
            <span className="font-medium">{value}</span>
            <button
                onClick={onRemove}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
            >
                <X className="h-3 w-3" />
            </button>
        </Badge>
    )
}

// ============================================================================
// Filter Input Components
// ============================================================================

function TextFilter<T>({
    config,
    value,
    onChange,
}: {
    config: FilterConfig<T>
    value: string
    onChange: (value: string) => void
}) {
    return (
        <Input
            placeholder={config.placeholder || `Filter by ${config.label}...`}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 w-37.5 lg:w-62.5"
        />
    )
}

function SelectFilter<T>({
    config,
    value,
    onChange,
    multiple = false,
}: {
    config: FilterConfig<T>
    value: string | string[]
    onChange: (value: string | string[]) => void
    multiple?: boolean
}) {
    if (multiple) {
        const selectedValues = Array.isArray(value) ? value : value ? [value] : []

        return (
            <Select
                value={selectedValues as any}
                onValueChange={(v) => onChange(v as any)}
            >
                <SelectTrigger className="h-8 w-37.5">
                    <SelectValue placeholder={config.placeholder || config.label} />
                </SelectTrigger>
                <SelectContent>
                    {config.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        )
    }

    return (
        <Select
            value={(value as string) || 'all'}
            onValueChange={(v) => onChange(v === 'all' ? '' : v)}
        >
            <SelectTrigger className="h-8 w-37.5">
                <SelectValue placeholder={config.placeholder || config.label} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All {config.label}</SelectItem>
                {config.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

function DateFilter<T>({
    config,
    value,
    onChange,
}: {
    config: FilterConfig<T>
    value?: Date
    onChange: (value: Date | undefined) => void
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "h-8 w-37.5 justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    {config.icon || <Filter className="mr-2 h-3.5 w-3.5" />}
                    {value ? format(value, 'PPP') : config.placeholder || config.label}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

// ============================================================================
// Main Toolbar Component
// ============================================================================

export function DataTableToolbar<TFilters = any>({
    filters,
    onResetPage,
    searchPlaceholder = "Search...",
    filterConfigs = [],
    actions,
}: DataTableToolbarProps<TFilters>) {
    // Handle search
    const handleSearch = useCallback((value: string) => {
        onResetPage()
        filters.setState({ ...filters.state, search: value } as TFilters)
    }, [filters, onResetPage])

    // Handle filter change
    const handleFilterChange = useCallback((key: keyof TFilters, value: any) => {
        onResetPage()
        filters.setState({ ...filters.state, [key]: value } as TFilters)
    }, [filters, onResetPage])

    // Handle reset
    const handleReset = useCallback(() => {
        filters.setState({} as TFilters)
        onResetPage()
    }, [filters, onResetPage])

    // Check if any filters are active
    const hasActiveFilters = Object.entries(filters.state || {}).some(
        ([key, value]) => key !== 'search' && value &&
            (Array.isArray(value) ? value.length > 0 : value !== 'all' && value !== '')
    )

    const hasSearch = (filters.state as any)?.search && (filters.state as any).search !== ''

    return (
        <div className="flex flex-col gap-4">
            {/* Main Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-2 w-full sm:w-auto">
                    {/* Search Input */}
                    <div className="relative flex-1 sm:flex-none">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={(filters.state as any)?.search || ''}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-9 h-9 w-full sm:w-75"
                        />
                        {hasSearch && (
                            <button
                                onClick={() => handleSearch('')}
                                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Dynamic Filters */}
                    {filterConfigs.map((config) => {
                        const value = filters.state?.[config.key]

                        return (
                            <div key={String(config.key)} className="hidden sm:block">
                                {config.type === 'text' && (
                                    <TextFilter
                                        config={config}
                                        value={value as string}
                                        onChange={(v) => handleFilterChange(config.key, v)}
                                    />
                                )}
                                {config.type === 'select' && (
                                    <SelectFilter
                                        config={config}
                                        value={value as string | string[]}
                                        onChange={(v) => handleFilterChange(config.key, v)}
                                    />
                                )}
                                {config.type === 'multi-select' && (
                                    <SelectFilter
                                        config={config}
                                        value={value as string | string[]}
                                        onChange={(v) => handleFilterChange(config.key, v)}
                                        multiple
                                    />
                                )}
                                {config.type === 'date' && (
                                    <DateFilter
                                        config={config}
                                        value={value as Date | undefined}
                                        onChange={(v) => handleFilterChange(config.key, v)}
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleReset}
                            className="h-9"
                        >
                            Reset
                        </Button>
                    )}
                    {actions}
                </div>
            </div>

            {/* Active Filters Display */}
            {(hasActiveFilters || hasSearch) && (
                <div className="flex flex-wrap items-center gap-2">
                    {hasSearch && (
                        <FilterChip
                            label="Search"
                            value={(filters.state as any).search}
                            onRemove={() => handleSearch('')}
                        />
                    )}
                    {filterConfigs.map((config) => {
                        const value = filters.state?.[config.key]
                        if (!value || (Array.isArray(value) && value.length === 0)) return null

                        const displayValue = Array.isArray(value)
                            ? `${value.length} selected`
                            : config.options?.find(o => o.value === value)?.label || String(value)

                        return (
                            <FilterChip
                                key={String(config.key)}
                                label={config.label}
                                value={displayValue}
                                onRemove={() => handleFilterChange(config.key,
                                    config.type === 'multi-select' ? [] :
                                        config.type === 'select' ? 'all' : ''
                                )}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}