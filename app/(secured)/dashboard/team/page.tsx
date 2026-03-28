'use client'

import { useState } from 'react'
import { Plus, Facebook, Twitter, Linkedin } from 'lucide-react'
import { useTeamMembers, useDeleteTeamMember } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, tableActions, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard/confirm-delete-dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { TeamMember } from '@/services/api'
import Image from 'next/image'

export default function TeamPage() {
  const { data: members, isLoading } = useTeamMembers()
  const deleteTeamMember = useDeleteTeamMember()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selected, setSelected] = useState<TeamMember | null>(null)

  const handleDeleteClick = (member: TeamMember) => {
    setSelected(member)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selected?.id) {
      await deleteTeamMember.mutateAsync(selected.id)
      setDeleteDialogOpen(false)
      setSelected(null)
    }
  }

  const SocialLinks = ({ member }: { member: TeamMember }) => {
    const links = [
      { icon: Facebook, url: member.facebook, label: 'Facebook' },
      { icon: Twitter, url: member.twitter, label: 'Twitter' },
      { icon: Linkedin, url: member.linkedIn, label: 'LinkedIn' },
    ].filter((link) => link.url)

    return links.length > 0 ? (
      <div className="flex gap-2">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.label}
              href={link.url || '#'}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title={link.label}
            >
              <Icon className="h-4 w-4" />
            </Link>
          )
        })}
      </div>
    ) : (
      <span className="text-muted-foreground text-sm">-</span>
    )
  }

  const columns: DataTableColumn<TeamMember>[] = [
    {
      header: 'Photo',
      cell: (member) =>
        member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            className="h-12 w-12 rounded-full object-cover bg-muted"
          />
        ) : (
          <div className=" rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
            No photo
          </div>
        ),
    },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Position', accessorKey: 'job' },
    {
      header: 'Social',
      cell: (member) => <SocialLinks member={member} />,
    },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Team', href: '/dashboard/team' },
        ]}
        title="Our Team"
      >
        <Button asChild>
          <Link href="/dashboard/team/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </Link>
        </Button>
      </DashboardHero>

      <ContentLayout>
        <DataTable
          data={members || []}
          columns={columns}
          isLoading={isLoading}
          actions={[tableActions.delete(handleDeleteClick)]}
          emptyState={{
            title: 'No team members found',
            description: 'Get started by adding your first team member',
            action: { label: 'Add Member', href: '/dashboard/team/add' },
          }}
        />
      </ContentLayout>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Team Member"
        description={`Are you sure you want to delete "${selected?.name}"? This action cannot be undone.`}
        isLoading={deleteTeamMember.isPending}
      />
    </>
  )
}
