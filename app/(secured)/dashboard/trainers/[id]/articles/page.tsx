'use client'

import { use, useState } from 'react'
import { useTrainerArticlesByTrainerId, useDeleteTrainerArticle } from '@/hooks/api/use-trainer-articles'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/dashboard/data-table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { TrainerArticleForm } from '@/components/forms/trainer-article-form'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/states/empty-state'
import { DetailPageLoader } from '@/components/shared/loader/detail-page-loader'

export default function TrainerArticlesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: articles, isLoading } = useTrainerArticlesByTrainerId(id)
  const deleteArticle = useDeleteTrainerArticle()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<any>(null)

  const columns: any[] = [
    {
      header: 'Title',
      cell: (row: any) => (
        <div>
          <div className="font-medium">{row.titleEn}</div>
          <div className="text-sm text-muted-foreground">{row.titleAr}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      cell: (row: any) => row.category || 'Uncategorized',
    },
    {
      header: 'Views',
      cell: (row: any) => row.views || 0,
    },
    {
      header: 'Status',
      cell: (row: any) => (
        <Badge variant={row.published ? 'default' : 'secondary'}>
          {row.published ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      cell: (row: any) => (
        <div className="flex justify-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setEditingArticle(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              if (confirm('Are you sure you want to delete this article?')) {
                deleteArticle.mutate(row.id)
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  if (isLoading) {
    return <DetailPageLoader />
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Trainers', href: '/dashboard/trainers' },
          { label: 'Articles', href: `/dashboard/trainers/${id}/articles` },
        ]}
        title="Trainer Articles"
      >
        <div className="flex gap-2">
          <BackButton href="/dashboard/trainers" text="Back to Trainers" />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Article</DialogTitle>
              </DialogHeader>
              <TrainerArticleForm
                trainerId={id}
                onSuccess={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </DashboardHero>

      <ContentLayout>
        <Card>
          <CardContent className="p-6">
            {articles && articles.length > 0 ? (
              <DataTable columns={columns} data={articles} />
            ) : (
              <EmptyState
                title="No articles yet"
                description="Start by adding your first article"
              />
            )}
          </CardContent>
        </Card>
      </ContentLayout>

      {editingArticle && (
        <Dialog open={!!editingArticle} onOpenChange={() => setEditingArticle(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Article</DialogTitle>
            </DialogHeader>
            <TrainerArticleForm
              trainerId={id}
              article={editingArticle}
              onSuccess={() => setEditingArticle(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
