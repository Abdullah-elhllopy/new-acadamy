'use client'

import { use } from 'react'
import { ArrowLeft, MessageSquare, FileText } from 'lucide-react'
import { useLecture } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero, Hero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export default function OnlineLectureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: lectureId } = use(params)
  const { data: lecture, isLoading } = useLecture(lectureId)

  if (isLoading) {
    return (
      <>
        <DashboardHero title="Loading..." />
        <ContentLayout>
          <Skeleton className="h-96 w-full" />
        </ContentLayout>
      </>
    )
  }

  if (!lecture) {
    return (
      <>
        <DashboardHero title="Lecture Not Found" />
        <ContentLayout>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Lecture not found</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/lectures">Back to Lectures</Link>
            </Button>
          </div>
        </ContentLayout>
      </>
    )
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Lectures', href: '/dashboard/lectures' },
          { label: lecture.lecturename, href: `/dashboard/lectures/online-lecture/${lectureId}` },
        ]}
        title={lecture.lecturename}
      >
        <div className="flex gap-2">
          <BackButton href="/dashboard/lectures" text="Back" />
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/lectures/online-lecture-comments/${lectureId}`}>
              <MessageSquare className="mr-2 h-4 w-4" />
              View Comments
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/lectures/online-lecture-topics/${lectureId}`}>
              <FileText className="mr-2 h-4 w-4" />
              View Topics
            </Link>
          </Button>
        </div>
      </DashboardHero>

      <ContentLayout>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lecture Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lecture.lecturedescription && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{lecture.lecturedescription}</p>
                </div>
              )}

              {lecture.video && (
                <div>
                  <h3 className="font-semibold mb-2">Video</h3>
                  <video controls className="w-full max-w-3xl rounded-lg">
                    <source src={lecture.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {lecture.lectureIndex && (
                <div>
                  <h3 className="font-semibold mb-2">Lecture Number</h3>
                  <p className="text-muted-foreground">{lecture.lectureIndex}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ContentLayout>
    </>
  )
}
