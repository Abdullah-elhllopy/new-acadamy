
import { ContentLayout } from '@/layout/page-layout';
import { UsersTable } from './users-table';
import { DashboardHero } from '@/components/sections/hero';

export default function UsersPage() {
  return (
    <>
      <DashboardHero
        title="Users Management"
        description="Manage all registered users"
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Users', href: '/dashboard/users' },
        ]}
      />
      <ContentLayout>
        <UsersTable />
      </ContentLayout>
    </>
  );
}
