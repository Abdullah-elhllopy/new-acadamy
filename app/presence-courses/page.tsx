import { Metadata } from 'next'
import { CoursesTemplate } from "@/components/templates/courses-template";

export const metadata: Metadata = {
  title: 'In-Person Courses | الدورات الحضورية',
  description: 'Join our interactive in-person training sessions across major cities. انضم إلى جلسات التدريب الحضورية التفاعلية لدينا في المدن الرئيسية',
  openGraph: {
    title: 'In-Person Courses | الدورات الحضورية',
    description: 'Join our interactive in-person training sessions across major cities',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'In-Person Courses | الدورات الحضورية',
    description: 'Join our interactive in-person training sessions across major cities',
  },
}

export default function PresenceCoursesPage() {
  return (
    <CoursesTemplate
      type="presence"
      title={{ en: 'In-Person Courses', ar: 'الدورات الحضورية' }}
      description={{
        en: 'Join our interactive in-person training sessions across major cities',
        ar: 'انضم إلى جلسات التدريب الحضورية التفاعلية لدينا في المدن الرئيسية'
      }}
    />
  )
}