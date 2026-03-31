// ============================================================================
// types.ts - Core Type Definitions
// ============================================================================

import { ReactNode } from 'react'
// import { UseSetStateReturn } from '@/hooks/use-set-state'

// Base column definition - matches your existing format
export type UseSetStateReturn<T> = {
    state: T;
    canReset: boolean;
    onResetState: () => void;
    setState: (updateState: T | Partial<T>) => void;
    setField: (name: keyof T, updateValue: T[keyof T]) => void;
};
export type SortDirection = 'asc' | 'desc' | null;
export interface FilterResultConfig<TFilters> {
    key: keyof TFilters
    label: string
    formatValue?: (value: any) => string
    resetValue?: any
}

export interface DataTableColumn<T = any> {
    id: string
    label: string
    width?: number | string
    minWidth?: number
    maxWidth?: number
    align?: 'left' | 'center' | 'right'
    render?: (row: T) => ReactNode
    sortable?: boolean
    resizable?: boolean
    hidden?: boolean
    // For filters
    filterType?: 'text' | 'select' | 'multi-select' | 'date' | 'boolean'
    filterOptions?: { label: string; value: string }[]
    accessorFn?: (row: T) => any
}

// Action configuration
export interface DataTableAction<T = any> {
    id: string
    label: string
    icon: ReactNode
    onClick: (row: T) => void | Promise<void>
    variant?: 'default' | 'destructive' | 'ghost' | 'outline'
    show?: (row: T) => boolean
    disabled?: (row: T) => boolean
    shortcut?: string
    confirmation?: {
        title: string
        description: string | ((row: T) => string)
        confirmLabel?: string
        cancelLabel?: string
    }
}

// Tab configuration
export interface DataTableTab {
    value: string
    label: string
    count?: number
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
    icon?: ReactNode
}

// Filter configuration
export interface FilterConfig<TFilters = any> {
    key: keyof TFilters
    label: string
    type: 'text' | 'select' | 'multi-select' | 'date' | 'date-range' | 'boolean'
    placeholder?: string
    options?: { label: string; value: string }[]
    icon?: ReactNode
}

// Toolbar props
export interface DataTableToolbarProps<TFilters = any> {
    filters: UseSetStateReturn<TFilters>
    onResetPage: () => void
    searchPlaceholder?: string
    filterConfigs?: FilterConfig<TFilters>[]
    actions?: ReactNode
    searchFields?: string[]
}

// Main DataTable props
export interface DataTableProps<T = any, TFilters = any> {
    // Data
    data: T[]
    columns: DataTableColumn<T>[]
    getRowId: (row: T) => string

    // Loading & Error states
    isLoading?: boolean
    isFetching?: boolean
    error?: Error | null

    // Selection
    enableSelection?: boolean
    selectedIds?: string[]
    onSelectionChange?: (selectedIds: string[]) => void
    disableSelection?: (row: T) => boolean

    // Bulk actions
    onDeleteRows?: (ids: string[]) => Promise<void>

    // Sorting
    sortable?: boolean
    defaultSortColumn?: string
    defaultSortDirection?: 'asc' | 'desc'
    onSort?: (column: string, direction: 'asc' | 'desc' | null) => void

    // Filtering
    filters?: UseSetStateReturn<TFilters>
    filterConfigs?: FilterConfig<TFilters>[]
    applyFilters?: (data: T[], filters: TFilters) => T[]

    // Tabs
    tabs?: DataTableTab[]
    currentTab?: string
    onTabChange?: (tab: string) => void

    // Toolbar
    toolbarContent?: (props: DataTableToolbarProps<TFilters>) => ReactNode
    showSearch?: boolean
    searchPlaceholder?: string

    // Filter results display
    showFilterResults?: boolean

    // Actions
    actions?: DataTableAction<T>[]
    enableRowActions?: boolean

    // Pagination (manual/server-side)
    page?: number
    pageSize?: number
    totalElements?: number
    onPageChange?: (page: number) => void
    onPageSizeChange?: (pageSize: number) => void
    pageSizeOptions?: number[]

    // Layout
    title?: string
    description?: string
    headerAction?: ReactNode
    breadcrumbs?: Array<{ name: string; href?: string }>

    // Styling
    className?: string
    rowClassName?: (row: T) => string
    dense?: boolean
    minWidth?: number

    // Callbacks
    onRowClick?: (row: T) => void
    onRefresh?: () => void
}

// Pagination state
export interface PaginationState {
    page: number
    pageSize: number
    totalElements: number
    totalPages: number
}