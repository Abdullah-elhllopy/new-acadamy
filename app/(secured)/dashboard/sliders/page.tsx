'use client'

import { useCallback, useMemo } from 'react'
import { Plus, Trash2, Pencil, Eye } from 'lucide-react'
import { useSliders, useDeleteSlider } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
// import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from 'sonner'
import type { Slider } from '@/services/api/common.service'
import { DataTable } from '@/components/dashboard/components'
import { useSetState } from '@/hooks/use-set-state'

// Define filter interface
interface SliderFilters {
  search: string
  // status: string
}

export default function SlidersPage() {
  const { data: sliders = [], isLoading, isFetching } = useSliders()
  const deleteSlider = useDeleteSlider()

  // Filter state using your useSetState hook
  const filters = useSetState<SliderFilters>({
    search: '',
    // status: 'all',
  })

  // Handle delete with confirmation built into action
  const handleDelete = useCallback(async (slider: Slider) => {
    await deleteSlider.mutateAsync(`${slider.id}`)
    toast.success(`"${slider.title}" has been deleted`)
  }, [deleteSlider])

  // Columns - new format
  const columns = useMemo(() => [
    {
      id: 'title',
      label: 'Title',
      width: 300,
      sortable: true,
      align : 'center' as const,
    },
    {
      id: 'description',
      label: 'Description',
      align : 'center' as const,

      render: (slider: Slider) => (
        <span className="text-muted-foreground truncate  block">
          {slider.description || '-'}
        </span>
      ),
    },
    {
      id: 'image',
      label: 'Image',
      width: 120,
      align: 'center' as const,
      render: (slider: Slider) => slider.image ? (
        <img 
          src={slider.image} 
          alt="" 
          className="h-10 w-16 object-cover rounded-md mx-auto"
        />
      ) : (
        <span className="text-muted-foreground">-</span>
      ),
    },
  ], [])

  // Actions with inline confirmations
  const actions = useMemo(() => [
    {
      id: 'edit',
      label: 'Edit',
      icon: <Pencil className="h-4 w-4" />,
      onClick: (slider: Slider) => {
        window.location.href = `/dashboard/sliders/${slider.id}/edit`
      },
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive' as const,
      onClick: handleDelete,
      confirmation: {
        title: 'Delete Slider',
        description: (slider: Slider) => `Are you sure you want to delete "${slider.title}"? This action cannot be undone.`,
      },
    },
  ], [handleDelete])

  // Filter configurations for toolbar
  // const filterConfigs = useMemo(() => [
  //   {
  //     key: 'status' as const,
  //     label: 'Status',
  //     type: 'select' as const,
  //     options: [
  //       { label: 'Active', value: 'active' },
  //       { label: 'Inactive', value: 'inactive' },
  //     ],
  //   },
  // ], [])

  // Filter result configurations
  const filterResultConfigs = useMemo(() => [
    { key: 'search' as const, label: 'Search' },
    // { key: 'status' as const, label: 'Status', resetValue: 'all' },
  ], [])

  // Apply filters function
  const applyFilters = useCallback((data: Slider[], state: SliderFilters) => {
    return data.filter(slider => {
      const matchesSearch = !state.search || 
        slider.title.toLowerCase().includes(state.search.toLowerCase()) ||
        slider.description?.toLowerCase().includes(state.search.toLowerCase())
      
      // const matchesStatus = state.status === 'all' || 
      //   (state.status === 'active' ? slider.isActive : !slider.isActive)
      
      return matchesSearch 
    })
  }, [])

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Sliders', href: '/dashboard/sliders' },
        ]}
        title="All Sliders"
      >
        <Button asChild>
          <Link href="/dashboard/sliders/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Slider
          </Link>
        </Button>
      </DashboardHero>

      <ContentLayout>
        <DataTable
          data={sliders}
          columns={columns}
          getRowId={(s) => `${s.id}`}
          actions={actions}
          
          // Built-in filtering
          filters={filters}
          // filterConfigs={filterConfigs}
          applyFilters={applyFilters}
          filterResultConfigs={filterResultConfigs}
          searchPlaceholder="Search sliders..."
          
          // Actions in toolbar
          toolbarActions={
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Refresh
            </Button>
          }
          
          // Sorting
          sortable
          defaultSortColumn="title"
          
          // Loading
          isLoading={isLoading}
          isFetching={isFetching}
          
          // Empty state
        />
      </ContentLayout>
    </>
  )
}