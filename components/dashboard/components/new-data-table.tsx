// ============================================================================
// data-table.tsx - Main Component
// ============================================================================

'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Trash2,
    RefreshCw,
    Filter,
    Search,
    X
} from 'lucide-react'
import { cn } from '@/lib/utils'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ScrollArea, } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import type {
    DataTableProps,
    DataTableColumn,
    DataTableAction,
    SortDirection,
    DataTableTab,
    FilterResultConfig
} from './types'
import { DataTableFiltersResult, DataTableToolbar } from '.'

// ============================================================================
// Utility Components
// ============================================================================

function SortIcon({ direction }: { direction: SortDirection }) {
    if (!direction) return <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />
    if (direction === 'asc') return <ArrowUp className="h-3.5 w-3.5" />
    return <ArrowDown className="h-3.5 w-3.5" />
}

function TableSkeleton({ columns, rows = 5 }: { columns: number; rows?: number }) {
    return (
        <div className="space-y-1">
            <div className="flex gap-4 px-4 py-3 bg-muted/50">
                {Array.from({ length: columns }).map((_, i) => (
                    <Skeleton key={i} className="h-4 flex-1" />
                ))}
            </div>
            {Array.from({ length: rows }).map((_, rowIdx) => (
                <div key={rowIdx} className="flex gap-4 px-4 py-4 border-b last:border-0">
                    {Array.from({ length: columns }).map((_, colIdx) => (
                        <Skeleton
                            key={colIdx}
                            className={cn("h-4", colIdx === 0 ? "w-1/4" : "flex-1")}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

// ============================================================================
// Table Header Component
// ============================================================================

interface TableHeaderProps<T> {
    columns: DataTableColumn<T>[]
    sortable?: boolean
    sortColumn?: string | null
    sortDirection?: SortDirection
    onSort?: (column: string) => void
    enableSelection?: boolean
    selectedAll?: boolean
    indeterminate?: boolean
    onSelectAll?: (checked: boolean) => void
    columnWidths?: Record<string, number>
    onResize?: (columnId: string, width: number) => void
}

function DataTableHeader<T>({
    columns,
    sortable,
    sortColumn,
    sortDirection,
    onSort,
    enableSelection,
    selectedAll,
    indeterminate,
    onSelectAll,
}: TableHeaderProps<T>) {
    return (
        <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
                {enableSelection && (
                    <TableHead className="w-10 px-4">
                        <Checkbox
                            checked={selectedAll}
                            ref={(el) => {
                                if (el) (el as any).indeterminate = indeterminate || false
                            }}
                            onCheckedChange={onSelectAll}
                            aria-label="Select all"
                        />
                    </TableHead>
                )}
                {columns.map((column) => (
                    <TableHead
                        key={column.id}
                        className={cn(
                            "px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                            column.align === 'center' && "text-center",
                            column.align === 'right' && "text-right",
                            sortable && column.sortable !== false && "cursor-pointer hover:text-foreground select-none",
                            column.width && typeof column.width === 'number' && `w-[${column.width}px]`
                        )}
                        style={{
                            width: column.width,
                            minWidth: column.minWidth,
                            maxWidth: column.maxWidth
                        }}
                        onClick={() => sortable && column.sortable !== false && onSort?.(column.id)}
                    >
                        <div className={cn(
                            "flex items-center gap-1.5",
                            column.align === 'center' && "justify-center",
                            column.align === 'right' && "justify-end"
                        )}>
                            {column.label}
                            {sortable && column.sortable !== false && (
                                <SortIcon direction={sortColumn === column.id ? (sortDirection || 'asc') : 'asc'} />
                            )}
                        </div>
                    </TableHead>
                ))}
                <TableHead className="w-15 px-4" />
            </TableRow>
        </TableHeader>
    )
}

// ============================================================================
// Table Row Component
// ============================================================================

interface TableRowProps<T> {
    row: T
    columns: DataTableColumn<T>[]
    actions?: DataTableAction<T>[]
    enableSelection?: boolean
    selected?: boolean
    disabled?: boolean
    onSelect?: () => void
    onClick?: () => void
    className?: string
    getRowId: (row: T) => string
}

function DataTableRowComponent<T>({
    row,
    columns,
    actions,
    enableSelection,
    selected,
    disabled,
    onSelect,
    onClick,
    className,
}: TableRowProps<T>) {
    const [confirmAction, setConfirmAction] = useState<DataTableAction<T> | null>(null)

    const visibleActions = useMemo(() =>
        actions?.filter(action => !action.show || action.show(row)) || [],
        [actions, row])

    return (
        <>
            <TableRow
                className={cn(
                    "group border-b transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted",
                    onClick && "cursor-pointer",
                    className
                )}
                data-state={selected ? "selected" : undefined}
                onClick={onClick}
            >
                {enableSelection && (
                    <TableCell className=" py-3">
                        <Checkbox
                            checked={selected}
                            onCheckedChange={onSelect}
                            disabled={disabled}
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Select row"
                        />
                    </TableCell>
                )}
                {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        className={cn(
                            "py-3 text-sm",
                            column.align === 'center' && "text-center",
                            column.align === 'right' && "text-right"
                        )}
                    >
                        {column.render
                            ? column.render(row)
                            : (row as any)[column.id]}
                    </TableCell>
                ))}
                <TableCell className=" py-3 text-right">
                    {visibleActions.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                {visibleActions.map((action, idx) => (
                                    <div key={action.id}>
                                        {idx > 0 && visibleActions[idx - 1].variant !== action.variant && (
                                            <DropdownMenuSeparator />
                                        )}
                                        <DropdownMenuItem
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                if (action.confirmation) {
                                                    setConfirmAction(action)
                                                } else {
                                                    action.onClick(row)
                                                }
                                            }}
                                            disabled={action.disabled?.(row)}
                                            className={cn(
                                                "gap-2 cursor-pointer",
                                                action.variant === 'destructive' && "text-destructive focus:text-destructive focus:bg-destructive/10",
                                                action.variant === 'ghost' && "text-muted-foreground"
                                            )}
                                        >
                                            {action.icon}
                                            <span className="flex-1">{action.label}</span>
                                            {action.shortcut && (
                                                <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                                                    {action.shortcut}
                                                </kbd>
                                            )}
                                        </DropdownMenuItem>
                                    </div>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </TableCell>
            </TableRow>

            {/* Confirmation Dialog */}
            <AlertDialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{confirmAction?.confirmation?.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {typeof confirmAction?.confirmation?.description === 'function'
                                ? confirmAction.confirmation.description(row)
                                : confirmAction?.confirmation?.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            {confirmAction?.confirmation?.cancelLabel || 'Cancel'}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                confirmAction?.onClick(row)
                                setConfirmAction(null)
                            }}
                            className={cn(
                                confirmAction?.variant === 'destructive' && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            )}
                        >
                            {confirmAction?.confirmation?.confirmLabel || 'Confirm'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

// ============================================================================
// Mobile Card Component
// ============================================================================

interface MobileCardProps<T> {
    row: T
    columns: DataTableColumn<T>[]
    actions?: DataTableAction<T>[]
    enableSelection?: boolean
    selected?: boolean
    onSelect?: () => void
    onClick?: () => void
    index: number
    getRowId: (row: T) => string
}

function MobileCard<T>({
    row,
    columns,
    actions,
    enableSelection,
    selected,
    onSelect,
    onClick,
    index,
}: MobileCardProps<T>) {
    const [confirmAction, setConfirmAction] = useState<DataTableAction<T> | null>(null)

    const visibleColumns = columns.filter(c => !c.hidden)
    const primaryColumn = visibleColumns[0]
    const secondaryColumns = visibleColumns.slice(1)

    const visibleActions = useMemo(() =>
        actions?.filter(action => !action.show || action.show(row)) || [],
        [actions, row])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Card
                className={cn(
                    "overflow-hidden group transition-all duration-200 border-border/50",
                    selected && "border-primary bg-primary/5",
                    onClick && "active:scale-[0.99] cursor-pointer"
                )}
                onClick={onClick}
            >
                <CardContent className="p-0">
                    {/* Header with Primary Field */}
                    <div className="p-4 flex items-start justify-between gap-4 bg-linear-to-r from-muted/30 to-transparent">
                        <div className="flex-1 min-w-0">
                            {enableSelection && (
                                <div className="flex items-center gap-2 mb-2">
                                    <Checkbox
                                        checked={selected}
                                        onCheckedChange={(e: any) => {
                                            e?.stopPropagation?.()
                                            onSelect?.()
                                        }}
                                        aria-label="Select row"
                                    />
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        {primaryColumn.label}
                                    </span>
                                </div>
                            )}
                            {!enableSelection && (
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">
                                    {primaryColumn.label}
                                </span>
                            )}
                            <div className="font-semibold text-foreground truncate">
                                {primaryColumn.render
                                    ? primaryColumn.render(row)
                                    : (row as any)[primaryColumn.id]}
                            </div>
                        </div>
                        {visibleActions.length > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 -mr-2"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {visibleActions.map((action) => (
                                        <DropdownMenuItem
                                            key={action.id}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                if (action.confirmation) {
                                                    setConfirmAction(action)
                                                } else {
                                                    action.onClick(row)
                                                }
                                            }}
                                            disabled={action.disabled?.(row)}
                                            className={cn(
                                                action.variant === 'destructive' && "text-destructive focus:text-destructive"
                                            )}
                                        >
                                            {action.icon}
                                            {action.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>

                    {/* Secondary Fields */}
                    {secondaryColumns.length > 0 && (
                        <div className="px-4 pb-4 pt-2 grid grid-cols-2 gap-4">
                            {secondaryColumns.map((column) => (
                                <div key={column.id} className="space-y-1">
                                    <span className="text-xs text-muted-foreground block">
                                        {column.label}
                                    </span>
                                    <div className="text-sm text-foreground wrap-break-word">
                                        {column.render
                                            ? column.render(row)
                                            : (row as any)[column.id]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Mobile Action Bar */}
                    {visibleActions.length > 0 && (
                        <div className="flex border-t border-border/50 divide-x divide-border/50 bg-muted/20">
                            {visibleActions.slice(0, 3).map((action) => (
                                <Button
                                    key={action.id}
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "flex-1 rounded-none h-11 text-xs font-medium hover:bg-muted/50",
                                        action.variant === 'destructive' && "text-destructive hover:text-destructive hover:bg-destructive/10"
                                    )}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        if (action.confirmation) {
                                            setConfirmAction(action)
                                        } else {
                                            action.onClick(row)
                                        }
                                    }}
                                    disabled={action.disabled?.(row)}
                                >
                                    {action.icon && <span className="mr-1.5">{action.icon}</span>}
                                    {action.label}
                                </Button>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Mobile Confirmation Dialog */}
            <AlertDialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{confirmAction?.confirmation?.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {typeof confirmAction?.confirmation?.description === 'function'
                                ? confirmAction.confirmation.description(row)
                                : confirmAction?.confirmation?.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                confirmAction?.onClick(row)
                                setConfirmAction(null)
                            }}
                            className={cn(
                                confirmAction?.variant === 'destructive' && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            )}
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.div>
    )
}

// ============================================================================
// Pagination Component
// ============================================================================

interface PaginationProps {
    page: number
    pageSize: number
    totalElements: number
    onPageChange: (page: number) => void
    onPageSizeChange?: (pageSize: number) => void
    pageSizeOptions?: number[]
}

function DataTablePagination({
    page,
    pageSize,
    totalElements,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 25, 50, 100],
}: PaginationProps) {
    const totalPages = Math.ceil(totalElements / pageSize)
    const start = (page) * pageSize + 1
    const end = Math.min((page + 1) * pageSize, totalElements)

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t bg-muted/20">
            <div className="text-sm text-muted-foreground order-2 sm:order-1">
                Showing <span className="font-medium text-foreground">{start}</span> to{' '}
                <span className="font-medium text-foreground">{end}</span> of{' '}
                <span className="font-medium text-foreground">{totalElements}</span> results
            </div>

            <div className="flex items-center gap-2 order-1 sm:order-2">
                {onPageSizeChange && (
                    <Select
                        value={String(pageSize)}
                        onValueChange={(v) => onPageSizeChange(Number(v))}
                    >
                        <SelectTrigger className="h-8 w-17.5">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {pageSizeOptions.map(size => (
                                <SelectItem key={size} value={String(size)}>{size}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPageChange(0)}
                        disabled={page === 0}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 0}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <span className="text-sm mx-2">
                        Page <span className="font-medium">{page + 1}</span> of{' '}
                        <span className="font-medium">{totalPages}</span>
                    </span>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= totalPages - 1}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPageChange(totalPages - 1)}
                        disabled={page >= totalPages - 1}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

// ============================================================================
// Bulk Actions Bar
// ============================================================================

interface BulkActionsProps {
    selectedCount: number
    totalCount: number
    onSelectAll: (checked: boolean) => void
    onDelete?: () => void
    onClear: () => void
}

function BulkActionsBar({
    selectedCount,
    totalCount,
    onSelectAll,
    onDelete,
    onClear,
}: BulkActionsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between z-10"
        >
            <div className="flex items-center gap-4">
                <Checkbox
                    checked={selectedCount === totalCount}
                    onCheckedChange={onSelectAll}
                    className="border-primary-foreground data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
                />
                <span className="text-sm font-medium">
                    {selectedCount} selected
                </span>
            </div>
            <div className="flex items-center gap-2">
                {onDelete && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                        onClick={onDelete}
                    >
                        <Trash2 className="h-4 w-4 mr-1.5" />
                        Delete
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                    onClick={onClear}
                >
                    <X className="h-4 w-4 mr-1.5" />
                    Clear
                </Button>
            </div>
        </motion.div>
    )
}

// ============================================================================
// Empty State
// ============================================================================

function EmptyState({
    title,
    description,
    action,
}: {
    title: string
    description: string
    action?: { label: string; onClick: () => void }
}) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
            {action && (
                <Button onClick={action.onClick} variant="outline">
                    {action.label}
                </Button>
            )}
        </div>
    )
}

// ============================================================================
// Main DataTable Component
// ============================================================================

export function DataTable<T extends Record<string, any>, TFilters = any>({
    // Data
    data,
    columns,
    getRowId,

    // Loading
    isLoading,
    isFetching,
    error,

    // Selection
    enableSelection = false,
    selectedIds: controlledSelectedIds,
    onSelectionChange,
    disableSelection,

    // Bulk actions
    onDeleteRows,

    // Sorting
    sortable = false,
    defaultSortColumn,
    defaultSortDirection = 'asc',
    onSort,

    // Filtering - NEW: Built-in filter support
    filters,
    filterConfigs,
    applyFilters,
    searchPlaceholder = "Search...",
    showSearch = true,

    // Filter Results - NEW: Built-in filter results
    filterResultConfigs,
    showFilterResults = true,

    // Tabs
    tabs,
    currentTab,
    onTabChange,

    // Toolbar - NEW: Simplified API
    toolbarActions,
    hideDefaultToolbar = false,

    // Legacy: Custom toolbar (still supported for advanced use cases)
    toolbarContent: CustomToolbarContent,

    // Actions
    actions,
    enableRowActions = true,

    // Pagination
    page: controlledPage,
    pageSize: controlledPageSize = 10,
    totalElements: controlledTotalElements,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions,

    // Layout
    title,
    description,
    headerAction,

    // Empty state
    // emptyState,

    // Styling
    className,
    rowClassName,
    minWidth = 960,

    // Callbacks
    onRowClick,
    onRefresh,
}: DataTableProps<T, TFilters> & {
    // NEW props for simplified API
    filterResultConfigs?: FilterResultConfig<TFilters>[]
    toolbarActions?: React.ReactNode
    hideDefaultToolbar?: boolean
}) {
    // Internal state
    const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([])
    const [sortColumn, setSortColumn] = useState<string | null>(defaultSortColumn || null)
    const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSortDirection)
    const [internalPage, setInternalPage] = useState(0)

    // Use controlled or uncontrolled state
    const selectedIds = controlledSelectedIds ?? internalSelectedIds
    const setSelectedIds = (ids: string[]) => {
        if (controlledSelectedIds === undefined) {
            setInternalSelectedIds(ids)
        }
        onSelectionChange?.(ids)
    }

    const page = controlledPage ?? internalPage
    const setPage = (p: number) => {
        if (controlledPage === undefined) {
            setInternalPage(p)
        }
        onPageChange?.(p)
    }

    // Process data
    const processedData = useMemo(() => {
        let result = [...data]

        // Apply filters
        if (applyFilters && filters?.state) {
            result = applyFilters(result, filters.state)
        }

        // Apply sorting
        if (sortable && sortColumn && sortDirection) {
            result.sort((a, b) => {
                const aVal = a[sortColumn]
                const bVal = b[sortColumn]

                if (aVal === bVal) return 0
                if (aVal === null || aVal === undefined) return 1
                if (bVal === null || bVal === undefined) return -1

                const comparison = aVal < bVal ? -1 : 1
                return sortDirection === 'asc' ? comparison : -comparison
            })
        }

        return result
    }, [data, applyFilters, filters?.state, sortable, sortColumn, sortDirection])

    // Pagination
    const totalElements = controlledTotalElements ?? processedData.length
    const pageSize = controlledPageSize
    const paginatedData = useMemo(() => {
        if (onPageChange) {
            // Server-side pagination: data is already paginated
            return processedData
        }
        // Client-side pagination
        const start = page * pageSize
        return processedData.slice(start, start + pageSize)
    }, [processedData, page, pageSize, onPageChange])

    // Selection handlers
    const handleSelectAll = useCallback((checked: boolean) => {
        if (checked) {
            const selectableIds = processedData
                .filter(row => !disableSelection?.(row))
                .map(getRowId)
            setSelectedIds(selectableIds)
        } else {
            setSelectedIds([])
        }
    }, [processedData, disableSelection, getRowId, setSelectedIds])

    const handleSelectRow = useCallback((rowId: string) => {
        setSelectedIds(
            selectedIds.includes(rowId)
                ? selectedIds.filter(id => id !== rowId)
                : [...selectedIds, rowId]
        )
    }, [selectedIds, setSelectedIds])

    // Sort handler
    const handleSort = useCallback((column: string) => {
        let newDirection: SortDirection = 'asc'
        if (sortColumn === column) {
            if (sortDirection === 'asc') newDirection = 'desc'
            else if (sortDirection === 'desc') newDirection = null
        }

        setSortColumn(newDirection ? column : null)
        setSortDirection(newDirection)
        onSort?.(column, newDirection)
    }, [sortColumn, sortDirection, onSort])

    // Selection state
    const selectedAll = processedData.length > 0 &&
        processedData.every(row => selectedIds.includes(getRowId(row)) || disableSelection?.(row))
    const indeterminate = selectedIds.length > 0 && !selectedAll
    const showBuiltInToolbar = !hideDefaultToolbar && (showSearch || filterConfigs || filters)

    // Determine if we should show filter results
    const showBuiltInFilterResults = showFilterResults && filterResultConfigs && filters
    // Loading state
    if (isLoading) {
        return (
            <Card className={cn("overflow-hidden", className)}>
                <div className="hidden md:block">
                    <TableSkeleton columns={columns.length + (enableSelection ? 1 : 0) + 1} />
                </div>
                <div className="md:hidden p-4 space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i} className="p-4 space-y-3">
                            <Skeleton className="h-5 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </Card>
                    ))}
                </div>
            </Card>
        )
    }

    // Error state
    if (error) {
        return (
            <Card className={cn("p-8", className)}>
                <EmptyState
                    title="Error loading data"
                    description={error.message || "Something went wrong. Please try again."}
                    action={onRefresh ? { label: "Retry", onClick: onRefresh } : undefined}
                />
            </Card>
        )
    }

    // Empty state
    if (!paginatedData.length) {
        return (
            <Card className={cn("overflow-hidden", className)}>
                <EmptyState
                    title="No results found"
                    description="Try adjusting your filters or search query."
                    action={filters?.state ? {
                        label: "Clear filters",
                        onClick: () => filters.setState({} as TFilters)
                    } : undefined}
                />
            </Card>
        )
    }

    return (
        <TooltipProvider>
            <div className={cn("space-y-4", className)}>
                {/* Header */}
                {(title || description || headerAction) && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
                            {description && (
                                <p className="text-sm text-muted-foreground mt-1">{description}</p>
                            )}
                        </div>
                        {headerAction && <div className="flex items-center gap-2">{headerAction}</div>}
                    </div>
                )}

                {/* Tabs */}
                {tabs && tabs.length > 0 && (
                    <Tabs value={currentTab} onValueChange={onTabChange}>
                        <TabsList className="w-full justify-start overflow-x-auto">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="gap-2"
                                >
                                    {tab.icon}
                                    {tab.label}
                                    {tab.count !== undefined && (
                                        <Badge
                                            variant={currentTab === tab.value ? "default" : "secondary"}
                                            className="ml-1 h-5 min-w-5 px-1 text-xs"
                                        >
                                            {tab.count}
                                        </Badge>
                                    )}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                )}

                {/* Custom Toolbar */}
                {showBuiltInToolbar && filters && (
                    <DataTableToolbar
                        filters={filters}
                        onResetPage={() => setPage(0)}
                        searchPlaceholder={searchPlaceholder}
                        filterConfigs={filterConfigs}
                        actions={toolbarActions}
                    />
                )}
                {CustomToolbarContent && filters && (
                    <CustomToolbarContent
                        filters={filters}
                        onResetPage={() => setPage(0)}
                        searchPlaceholder={searchPlaceholder}
                        filterConfigs={filterConfigs}
                        actions={toolbarActions}
                    />
                )}
                {/* Table Card */}
                <Card className="relative overflow-hidden border-border/50 py-0 shadow-sm">
                    {/* Bulk Actions Overlay */}
                    <AnimatePresence>
                        {enableSelection && selectedIds.length > 0 && (
                            <BulkActionsBar
                                selectedCount={selectedIds.length}
                                totalCount={processedData.length}
                                onSelectAll={handleSelectAll}
                                onDelete={onDeleteRows ? () => onDeleteRows(selectedIds) : undefined}
                                onClear={() => setSelectedIds([])}
                            />
                        )}
                    </AnimatePresence>

                    {/* Refreshing Indicator */}
                    {isFetching && !isLoading && (
                        <div className="absolute top-2 right-2 z-20">
                            <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                    )}

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <Table>
                            <DataTableHeader
                                columns={columns}
                                sortable={sortable}
                                sortColumn={sortColumn}
                                sortDirection={sortDirection}
                                onSort={handleSort}
                                enableSelection={enableSelection}
                                selectedAll={selectedAll}
                                indeterminate={indeterminate}
                                onSelectAll={handleSelectAll}
                            />
                            <TableBody>
                                <AnimatePresence mode="wait">
                                    {paginatedData.map((row, index) => {
                                        const rowId = getRowId(row)
                                        return (
                                            <DataTableRowComponent
                                                key={rowId}
                                                row={row}
                                                columns={columns}
                                                actions={enableRowActions ? actions : undefined}
                                                enableSelection={enableSelection}
                                                selected={selectedIds.includes(rowId)}
                                                disabled={disableSelection?.(row)}
                                                onSelect={() => handleSelectRow(rowId)}
                                                onClick={onRowClick ? () => onRowClick(row) : undefined}
                                                className={rowClassName?.(row)}
                                                getRowId={getRowId}
                                            />
                                        )
                                    })}
                                </AnimatePresence>
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden p-4 space-y-3">
                        <AnimatePresence>
                            {paginatedData.map((row, index) => {
                                const rowId = getRowId(row)
                                return (
                                    <MobileCard
                                        key={rowId}
                                        row={row}
                                        columns={columns}
                                        actions={enableRowActions ? actions : undefined}
                                        enableSelection={enableSelection}
                                        selected={selectedIds.includes(rowId)}
                                        onSelect={() => handleSelectRow(rowId)}
                                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                                        index={index}
                                        getRowId={getRowId}
                                    />
                                )
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Pagination */}
                    {(onPageChange || processedData.length > pageSize) && (
                        <DataTablePagination
                            page={page}
                            pageSize={pageSize}
                            totalElements={totalElements}
                            onPageChange={setPage}
                            onPageSizeChange={onPageSizeChange}
                            pageSizeOptions={pageSizeOptions}
                        />
                    )}
                </Card>
                {showBuiltInFilterResults && (
                    <DataTableFiltersResult
                        filters={filters}
                        totalResults={processedData.length}
                        onResetPage={() => setPage(0)}
                        configs={filterResultConfigs}
                    />
                )}
            </div>
        </TooltipProvider>
    )
}