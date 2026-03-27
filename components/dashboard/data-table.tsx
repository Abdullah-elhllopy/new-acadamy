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
      <Card>
        <div className="p-4 space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </Card>
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
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column.header}</TableHead>
            ))}
            {actions && actions.length > 0 && (
              <TableHead className="w-17.5">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {column.cell
                    ? column.cell(item)
                    : column.accessorKey
                    ? String(item[column.accessorKey])
                    : null}
                </TableCell>
              ))}
              {actions && actions.length > 0 && (
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {actions.map((action, actionIndex) => (
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
