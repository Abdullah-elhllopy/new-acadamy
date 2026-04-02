'use client'

import { useRouter } from 'next/navigation'
import { Eye } from 'lucide-react'
import { useCourses } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { DataTable, type DataTableColumn } from '@/components/dashboard/data-table'
import { Badge } from '@/components/ui/badge'
import type { Course } from '@/services/api'
import { TitleContainer } from '@/components/shared/title'
import Link from 'next/link'

export default function CoursesWithLecturesPage() {
  const router = useRouter()
  const { data: courses, isLoading, error, refetch } = useCourses()

  const handleViewLectures = (course: Course) => {
    // Route based on course type
    if (course.courseType === 'عبر الإنترنت' || course.courseType === 'Online') {
      router.push(`/dashboard/lectures/online-chapters/${course.courseId}`)
    } else {
      router.push(`/dashboard/lectures/${course.courseId}`)
    }
  }

  const columns: DataTableColumn<Course>[] = [
    {
      header: 'Course Name',
      accessorKey: 'courseName',
      cell: (course) => (
        <Link
          href={course.courseType === 'عبر الإنترنت' || course.courseType === 'Online' ?
            `/dashboard/lectures/online-chapters/${course.courseId}` :
            `/dashboard/lectures/${course.courseId}`}
          className="text-primary hover:underline"
        >
          {course.courseName}
        </Link>

      )
    },
    {
      header: 'Type',
      cell: (course) => (
        <Badge variant="outline">
          {course.courseType || course.courseSpecies || 'N/A'}
        </Badge>
      ),
    },
    {
      header: 'Number of Lectures',
      cell: (course) => course.courseLectures?.length || 0,
    },
  ]

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Lectures', href: '/dashboard/lectures' },
        ]}
      >
        <TitleContainer title='Lectures' subtitle=' Select a course to view its lectures' />
      </DashboardHero>

      <ContentLayout>
        <DataTable
          data={courses?.allCoursesDetails || []}
          columns={columns}
          isLoading={isLoading}
          error={error}
          onRetry={() => refetch()}
          actions={[
            {
              label: 'View Lectures',
              icon: <Eye className="mr-2 h-4 w-4" />,
              onClick: handleViewLectures,
            },
          ]}
          emptyState={{
            title: 'No courses found',
            description: 'Create courses to manage lectures',
          }}
        />
      </ContentLayout>
    </>
  )
}
