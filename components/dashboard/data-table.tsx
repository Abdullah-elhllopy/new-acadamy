'use client'

import { ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/states/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
import { ListPageLoader } from '../shared/loader/list-page-loader'

export interface DataTableColumn<T> {
  header: string
  accessorKey?: keyof T
  cell?: (item: T) => ReactNode
}

export interface DataTableAction<T> {
  label: string
  icon?: ReactNode
  onClick: (item: T) => void
  variant?: 'default' | 'destructive'
}

interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  actions?: DataTableAction<T>[]
  isLoading?: boolean
  emptyState?: {
    title: string
    description: string
    action?: {
      label: string
      href: string
    }
  }
}

export function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  actions,
  isLoading,
  emptyState,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <ListPageLoader />
      // <Card>
      //   <div className="p-4 space-y-3">
      //     <Skeleton className="h-10 w-full" />
      //     <Skeleton className="h-10 w-full" />
      //     <Skeleton className="h-10 w-full" />
      //     <Skeleton className="h-10 w-full" />
      //   </div>
      // </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card className="p-8">
        <EmptyState
          title={emptyState?.title || 'No data found'}
          description={emptyState?.description || 'Get started by creating a new item'}
          action={emptyState?.action}
        />
      </Card>
    )
  }

  return (
    <Card className="w-full pt-0 overflow-hidden">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns?.map((column, index) => (
                <TableHead key={index} className="font-semibold">
                  {column.header}
                </TableHead>
              ))}
              {actions && actions.length > 0 && (
                <TableHead className="font-semibold">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-muted/50 transition-colors">
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className="py-4">
                    {column.cell
                      ? column.cell(item)
                      : column.accessorKey
                      ? String(item[column.accessorKey])
                      : null}
                  </TableCell>
                ))}
                {actions && actions.length > 0 && (
                  <TableCell className="py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {actions?.map((action, actionIndex) => (
                          <DropdownMenuItem
                            key={actionIndex}
                            onClick={() => action.onClick(item)}
                            className={
                              action.variant === 'destructive'
                                ? 'text-destructive focus:text-destructive'
                                : ''
                            }
                          >
                            {action.icon}
                            {action.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="md:hidden space-y-4 p-4">
        {data?.map((item, rowIndex) => (
          <div
            key={rowIndex}
            className="border rounded-lg p-4 space-y-3 bg-card hover:shadow-md transition-shadow"
          >
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col space-y-1">
                <span className="text-sm font-semibold text-muted-foreground">
                  {column.header}
                </span>
                <span className="text-sm text-foreground wrap-break-word">
                  {column.cell
                    ? column.cell(item)
                    : column.accessorKey
                    ? String(item[column.accessorKey])
                    : null}
                </span>
              </div>
            ))}
            {actions && actions.length > 0 && (
              <div className="flex gap-2 pt-2 border-t">
                {actions?.map((action, actionIndex) => (
                  <Button
                    key={actionIndex}
                    variant={action.variant === 'destructive' ? 'destructive' : 'outline'}
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => action.onClick(item)}
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}

// Predefined action helpers
export const tableActions = {
  view: (onClick: (item: any) => void): DataTableAction<any> => ({
    label: 'View',
    icon: <Eye className="mr-2 h-4 w-4" />,
    onClick,
  }),
  edit: (onClick: (item: any) => void): DataTableAction<any> => ({
    label: 'Edit',
    icon: <Pencil className="mr-2 h-4 w-4" />,
    onClick,
  }),
  delete: (onClick: (item: any) => void): DataTableAction<any> => ({
    label: 'Delete',
    icon: <Trash2 className="mr-2 h-4 w-4" />,
    onClick,
    variant: 'destructive',
  }),
}
