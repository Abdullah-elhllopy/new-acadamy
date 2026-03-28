'use client'

import { useRouter } from 'next/navigation'
import { Eye } from 'lucide-react'
import { useCourses } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { DataTable, type DataTableColumn } from '@/components/dashboard/data-table'
import { Badge } from '@/components/ui/badge'
import type { Course } from '@/services/api'

export default function UserTrainingRequestsPage() {
  const router = useRouter()
  const { data: courses, isLoading } = useCourses()

  const handleView = (course: Course) => {
    router.push(`/dashboard/requests/user-training/${course.courseId}`)
  }

  const columns: DataTableColumn<Course>[] = [
    {
      header: 'Course Name',
      accessorKey: 'courseName',
    },
    {
      header: 'Type',
      cell: (course) => (
        <Badge variant="outline">{course.courseType}</Badge>
      ),
    },
    {
      header: 'Place',
      accessorKey: 'place',
    },
    {
      header: 'Start Date',
      cell: (course) => new Date(course.courseStartDate).toLocaleDateString(),
    },
  ]

  return (
    <>
      <Hero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Requests', href: '/dashboard/requests/user-training' },
          { label: 'User Training Requests', href: '/dashboard/requests/user-training' },
        ]}
        title="User Training Requests"
      >
        <p className="text-sm text-muted-foreground mt-2">
          Select a course to view training requests from users
        </p>
      </Hero>

      <ContentLayout>
        <DataTable
          data={courses?.allCoursesDetails || []}
          columns={columns}
          isLoading={isLoading}
          actions={[
            {
              label: 'View Requests',
              icon: <Eye className="mr-2 h-4 w-4" />,
              onClick: handleView,
            },
          ]}
          emptyState={{
            title: 'No courses found',
            description: 'Create courses to see user training requests',
          }}
        />
      </ContentLayout>
    </>
  )
}
