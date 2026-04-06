import { Metadata } from 'next'
import { CoursesTemplate } from "@/components/templates/courses-template";

export const metadata: Metadata = {
  title: 'Online Courses | الدورات الأونلاين',
  description: 'Learn anytime, anywhere with our online training courses. تعلم في أي وقت ومن أي مكان مع دوراتنا التدريبية عبر الإنترنت',
  openGraph: {
    title: 'Online Courses | الدورات الأونلاين',
    description: 'Learn anytime, anywhere with our online training courses',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Courses | الدورات الأونلاين',
    description: 'Learn anytime, anywhere with our online training courses',
  },
}

export default function OnlineCoursesPage() {
  return (
    <CoursesTemplate
      type="online"
      title={{ en: 'Online Courses', ar: 'الدورات الأونلاين' }}
      description={{
        en: 'Learn anytime, anywhere with our online training courses',
        ar: 'تعلم في أي وقت ومن أي مكان مع دوراتنا التدريبية عبر الإنترنت'
      }}
    />
  )
}