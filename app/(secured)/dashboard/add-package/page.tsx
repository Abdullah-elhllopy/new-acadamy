
import { DashboardHero } from '@/components/sections/hero';
import { AddPackageForm } from './add-package-form';
import { ContentLayout } from '@/layout/page-layout';

export default function AddPackagePage() {
  return (
    <>
      <DashboardHero
        title="Add Package"
        description="Create a new course package"
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Add Package', href: '/dashboard/add-package' },
        ]}
      />
      <ContentLayout>
        <AddPackageForm />
      </ContentLayout>
    </>
  );
}
