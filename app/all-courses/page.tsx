import { Metadata } from 'next'
import { CoursesTemplate } from "@/components/templates/courses-template";

export const metadata: Metadata = {
  title: 'All Courses | جميع الدورات',
  description: 'Browse all available courses including online and in-person options',
  openGraph: {
    title: 'All Courses | جميع الدورات',
    description: 'Browse all available courses including online and in-person options',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Courses | جميع الدورات',
    description: 'Browse all available courses including online and in-person options',
  },
}

export default function AllCourses() {
  return (
    <CoursesTemplate
      title={{ en: 'All Courses', ar: 'جميع الدورات' }}
      description={{
        en: 'Browse all available courses including online and in-person options',
        ar: 'تصفح جميع الدورات المتاحة بما في ذلك الأونلاين والحضوري'
      }}
    />
  )
}