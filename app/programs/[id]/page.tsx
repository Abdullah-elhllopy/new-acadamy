import { Metadata } from 'next'
import { courseService } from '@/services/api'
import CourseDetailClient from './client'


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  
  try {
    // TODO: Replace with actual API call when backend is ready
    const course = await courseService.getById(id)
    
    return {
      title: course.courseName,
      description: course.courseDescripTion?.substring(0, 160) || '',
      openGraph: {
        title: course.courseName,
        description: course.courseDescripTion?.substring(0, 160) || '',
        images: course.image ? [{ url: course.image }] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: course.courseName,
        description: course.courseDescripTion?.substring(0, 160) || '',
        images: course.image ? [course.image] : [],
      },
    }
  } catch {
    return {
      title: 'Course Details',
      description: 'View course details and enroll',
    }
  }
}

export default function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  return <CourseDetailClient params={params} />
}

