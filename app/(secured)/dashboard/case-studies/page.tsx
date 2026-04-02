'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCaseStudies, useDeleteCaseStudy } from '@/hooks/api/use-case-studies'
import { DataTable } from '@/components/dashboard/data-table'
import { Button } from '@/components/ui/button'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { format } from 'date-fns'
import type { CaseStudy } from '@/shared/types'

export default function CaseStudiesListPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const { data: caseStudies, isLoading } = useCaseStudies()
  const deleteCaseStudy = useDeleteCaseStudy()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const columns: any[] = [
    {
      header: isArabic ? 'العنوان' : 'Title',
      cell: (row: CaseStudy) => isArabic ? row.titleAr : row.titleEn,
    },
    {
      header: isArabic ? 'العميل' : 'Client',
      accessorKey: 'clientName',
    },
    {
      header: isArabic ? 'الصناعة' : 'Industry',
      accessorKey: 'industry',
    },
    {
      header: isArabic ? 'المشاهدات' : 'Views',
      accessorKey: 'views',
    },
    {
      header: isArabic ? 'الحالة' : 'Status',
      cell: (row: CaseStudy) => (
        <Badge variant={row.published ? 'default' : 'secondary'}>
          {row.published ? (isArabic ? 'منشور' : 'Published') : (isArabic ? 'مسودة' : 'Draft')}
        </Badge>
      ),
    },
    {
      header: isArabic ? 'التاريخ' : 'Date',
      cell: (row: CaseStudy) => format(new Date(row.createdAt), 'PP'),
    },
    {
      header: isArabic ? 'الإجراءات' : 'Actions',
      cell: (row: CaseStudy) => (
        <div className="flex gap-2">
          <Link href={`/dashboard/case-studies/${row.id}`}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteId(row.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">
          {isArabic ? 'دراسات الحالة' : 'Case Studies'}
        </h1>
        <Link href="/dashboard/case-studies/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {isArabic ? 'إضافة دراسة حالة' : 'Add Case Study'}
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={caseStudies || []}
        isLoading={isLoading}

      />

      <ConfirmDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteCaseStudy.mutate(deleteId)
            setDeleteId(null)
          }
        }}
        title={isArabic ? 'حذف دراسة الحالة' : 'Delete Case Study'}
        description={isArabic ? 'هل أنت متأكد من حذف دراسة الحالة؟' : 'Are you sure you want to delete this case study?'}
      />
    </div>
  )
}
