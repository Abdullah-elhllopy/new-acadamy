'use client';

import { useUsers, useDeleteUser } from '@/hooks/api/use-users';
import { User } from '@/services/api/user.service';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DataTable, type DataTableColumn } from '@/components/dashboard/data-table'
import { ConfirmDeleteDialog } from '@/components/dashboard';
import Link from 'next/link';

export function UsersTable() {
  const { data: users, isLoading } = useUsers();
  const deleteUser = useDeleteUser();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns: DataTableColumn<User>[] = [
    {
      accessorKey: 'userFullName',
      header: 'Full Name',
    },
    {
      accessorKey: 'userEmail',
      header: 'Email',
      cell: (row) => (
        <a href={`mailto:${row.userEmail}`} className="text-primary hover:underline">
          {row.userEmail}
        </a>
      ),
    },
    {
      accessorKey: 'userPhone',
      header: 'Phone',
      cell: (row) =>
        row.userPhone ? (
          <a href={`tel:${row.userPhone}`} className="text-primary hover:underline">
            {row.userPhone}
          </a>
        ) : (
          '-'
        ),
    },
    {
      accessorKey: 'type',
      header: 'Role',
      cell: (row) => row.type || 'Trainee',
    },
    {
      // accessorKey: 'actions',
      header: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <Link href={`/dashboard/users/edit/${row.id}`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDeleteId(row.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={users || []}
        isLoading={isLoading}
      />
      <ConfirmDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteUser.mutate(deleteId);
            setDeleteId(null);
          }
        }}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />
    </>
  );
}
