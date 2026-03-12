// app/[locale]/courses/presence/page.tsx
// import { CoursesTemplate } from '@/components/templates/courses-template'

import { CoursesTemplate } from "@/components/templates/courses-template";

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